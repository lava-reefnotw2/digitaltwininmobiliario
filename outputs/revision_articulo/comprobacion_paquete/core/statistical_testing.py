"""
Módulo de Pruebas Estadísticas y Evaluación de Rendimiento de Modelos ML Locales
Gemelo Digital Inmobiliario & Hábitat Popular
"""

import os
import joblib
import numpy as np
import pandas as pd
from typing import Dict, Any, List, Optional, Tuple
from scipy import stats
from sklearn.metrics import (
    r2_score,
    mean_squared_error,
    mean_absolute_error,
    mean_absolute_percentage_error,
    explained_variance_score,
    accuracy_score,
    f1_score,
    precision_score,
    recall_score
)

MODELS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'trained_models')

def list_trained_models(models_dir: str = MODELS_DIR) -> List[Dict[str, Any]]:
    """
    Escanea la carpeta de modelos entrenados serializados (.joblib)
    y recopila su metadata descriptiva.
    """
    model_list = []
    if not os.path.exists(models_dir):
        return model_list

    for fname in os.listdir(models_dir):
        if not fname.endswith('.joblib'):
            continue
        fpath = os.path.join(models_dir, fname)
        try:
            stat = os.stat(fpath)
            size_kb = round(stat.st_size / 1024, 1)
            size_str = f"{size_kb} KB" if size_kb < 1024 else f"{round(size_kb / 1024, 2)} MB"
            mod_time = pd.to_datetime(stat.st_mtime, unit='s').strftime('%Y-%m-%d %H:%M')

            # Inspección no invasiva
            loaded = joblib.load(fpath)
            if isinstance(loaded, dict):
                model_obj = loaded.get('model')
                target = loaded.get('target', 'valor_suelo_usd_m2')
                features = loaded.get('features', [])
                metrics = loaded.get('metrics', {})
                model_type = metrics.get('model_type') or loaded.get('model_type') or (type(model_obj).__name__ if model_obj else 'ML Model')
            else:
                model_obj = loaded
                target = 'valor_suelo_usd_m2'
                features = []
                metrics = {}
                model_type = type(model_obj).__name__

            algo_name = _humanize_algo_name(model_type)

            model_list.append({
                'id': fname,
                'filename': fname,
                'filepath': fpath,
                'filesize': size_str,
                'modified': mod_time,
                'algo_name': algo_name,
                'raw_model_type': model_type,
                'target': target,
                'features': features,
                'has_cached_metrics': bool(metrics),
                'cached_metrics': metrics,
                'loaded_object': loaded
            })
        except Exception as e:
            # Archivo dañado o en uso
            continue

    # Ordenar por fecha de modificación descendente
    model_list.sort(key=lambda m: m.get('modified', ''), reverse=True)
    return model_list


def _humanize_algo_name(raw_name: str) -> str:
    name_lower = str(raw_name).lower()
    if 'randomforest' in name_lower or 'random_forest' in name_lower:
        return 'Random Forest (Ensemble)'
    elif 'xgboost' in name_lower or 'xgb' in name_lower:
        return 'XGBoost (Extreme Gradient)'
    elif 'lightgbm' in name_lower or 'lgb' in name_lower:
        return 'LightGBM (Fast Tree)'
    elif 'catboost' in name_lower:
        return 'CatBoost (Categorical)'
    elif 'gradientboosting' in name_lower or 'gnn' in name_lower:
        return 'Gradient Boosting Espacial'
    return raw_name


def evaluate_model_statistics(
    model_entry: Dict[str, Any],
    df_active: Optional[pd.DataFrame] = None
) -> Dict[str, Any]:
    """
    Calcula una batería completa de pruebas estadísticas de rendimiento,
    residuos, normalidad, homocedasticidad y estabilidad para el modelo seleccionado.
    """
    cached = model_entry.get('cached_metrics', {})
    loaded_raw = model_entry.get('loaded_object')
    target_col = model_entry.get('target', 'valor_suelo_usd_m2')
    raw_features = loaded_raw.get('raw_features', []) if isinstance(loaded_raw, dict) else []

    # Extraer el modelo real
    if isinstance(loaded_raw, dict):
        model_obj = loaded_raw.get('model')
        imputer = loaded_raw.get('imputer')
        model_features = loaded_raw.get('raw_features') or loaded_raw.get('features', [])
    else:
        model_obj = loaded_raw
        imputer = None
        model_features = []

    y_true: List[float] = []
    y_pred: List[float] = []
    is_classification = cached.get('is_classification', getattr(model_obj, '_estimator_type', '') == 'classifier')

    # 1. Intentar evaluar sobre el dataset activo si las features y el target están presentes
    evaluated_on_live = False
    if df_active is not None and target_col in df_active.columns and model_obj is not None:
        try:
            # Si no hay features explícitas, intentar con numéricas o FEATURES estándar
            if not model_features:
                from core.ai_ml_models import FEATURE_NAMES
                avail = [c for c in FEATURE_NAMES if c in df_active.columns]
                if len(avail) >= 4:
                    model_features = avail
                else:
                    model_features = list(df_active.select_dtypes(include=['number']).columns)
                    if target_col in model_features:
                        model_features.remove(target_col)

            # Preparar X y y
            common_feats = [c for c in model_features if c in df_active.columns]
            if common_feats:
                # Mantener los mismos índices en objetivo y predictores.
                evaluation_df = df_active.loc[df_active[target_col].notna()].copy()
                if not is_classification:
                    evaluation_df = evaluation_df.loc[np.isfinite(pd.to_numeric(evaluation_df[target_col], errors='coerce'))]
                X_df = evaluation_df[common_feats].copy()
                for col, levels in (loaded_raw.get('categorical_levels', {}) if isinstance(loaded_raw, dict) else {}).items():
                    if col in X_df:
                        if not X_df[col].dropna().isin(levels).all():
                            raise ValueError('El dataset contiene categorías no vistas durante el entrenamiento.')
                        X_df[col] = pd.Categorical(X_df[col], categories=levels)
                X_enc = pd.get_dummies(X_df, drop_first=True)
                expected = (cached.get('final_features') or loaded_raw.get('features', [])) if isinstance(loaded_raw, dict) else model_features
                if len(common_feats) != len(model_features):
                    raise ValueError('Faltan predictores del modelo entrenado.')
                if expected and (raw_features or all(c in X_enc.columns for c in expected)):
                    X_enc = X_enc.reindex(columns=expected, fill_value=0)
                else:
                    raise ValueError('El dataset no contiene el esquema completo de predictores entrenados.')

                if imputer is not None:
                    X_mat = imputer.transform(X_enc)
                else:
                    X_mat = X_enc.values

                preds = model_obj.predict(X_mat)
                trues = evaluation_df[target_col].values

                # Tomar la longitud mínima consistente
                min_len = min(len(preds), len(trues))
                if min_len >= 5:
                    y_pred = [float(v) for v in preds[:min_len]]
                    y_true = [float(v) for v in trues[:min_len]]
                    evaluated_on_live = True
        except Exception:
            evaluated_on_live = False

    # 2. Si no fue evaluado en vivo o dio error, recurrir a las muestras cacheadas del entrenamiento
    if not evaluated_on_live:
        sample_true = cached.get('y_true_sample', [])
        sample_pred = cached.get('y_pred_sample', [])
        if len(sample_true) >= 5 and len(sample_pred) >= 5:
            min_l = min(len(sample_true), len(sample_pred))
            y_true = [float(v) for v in sample_true[:min_l]]
            y_pred = [float(v) for v in sample_pred[:min_l]]

    # Nunca inventar observaciones para una auditoría de un modelo real.
    if len(y_true) < 5 or len(y_pred) < 5:
        raise ValueError('No hay al menos 5 pares reales y predichos compatibles. Carga datos compatibles o vuelve a entrenar el modelo.')

    y_true_arr = np.array(y_true, dtype=float)
    y_pred_arr = np.array(y_pred, dtype=float)
    n_samples = len(y_true_arr)

    if not np.isfinite(y_true_arr).all() or not np.isfinite(y_pred_arr).all():
        raise ValueError('La evaluación contiene valores no finitos; revisa los datos del modelo.')
    if is_classification:
        return {
            'is_classification': True,
            'accuracy': float(accuracy_score(y_true_arr, y_pred_arr)),
            'f1': float(f1_score(y_true_arr, y_pred_arr, average='weighted', zero_division=0)),
            'n_samples': n_samples,
            'evaluated_on_live': evaluated_on_live,
            'y_true': y_true, 'y_pred': y_pred,
        }

    # ------------------ CÁLCULO DE MÉTRICAS BÁSICAS ------------------
    r2 = float(r2_score(y_true_arr, y_pred_arr))
    rmse = float(np.sqrt(mean_squared_error(y_true_arr, y_pred_arr)))
    mae = float(mean_absolute_error(y_true_arr, y_pred_arr))
    exp_var = float(explained_variance_score(y_true_arr, y_pred_arr))
    
    # MAPE (Mean Absolute Percentage Error)
    denom = np.where(np.abs(y_true_arr) < 1e-4, 1.0, y_true_arr)
    mape = float(np.mean(np.abs((y_true_arr - y_pred_arr) / denom)) * 100.0)

    # Correlación de Pearson entre Real y Predicho
    if np.std(y_true_arr) > 1e-6 and np.std(y_pred_arr) > 1e-6:
        pearson_res = stats.pearsonr(y_true_arr, y_pred_arr)
        pearson_r, pearson_p = float(pearson_res.statistic), float(pearson_res.pvalue)
        spearman_res = stats.spearmanr(y_true_arr, y_pred_arr)
        spearman_rho, spearman_p = float(spearman_res.statistic), float(spearman_res.pvalue)
    else:
        pearson_r, pearson_p = 0.0, 1.0
        spearman_rho, spearman_p = 0.0, 1.0

    # ------------------ ANÁLISIS DE RESIDUOS ------------------
    residuals = y_true_arr - y_pred_arr
    res_mean = float(np.mean(residuals))
    res_std = float(np.std(residuals, ddof=1)) if n_samples > 1 else 0.0
    res_median = float(np.median(residuals))
    res_min = float(np.min(residuals))
    res_max = float(np.max(residuals))

    # Skewness & Kurtosis
    res_skew = float(stats.skew(residuals)) if n_samples >= 3 and res_std > 1e-6 else 0.0
    res_kurt = float(stats.kurtosis(residuals)) if n_samples >= 4 and res_std > 1e-6 else 0.0

    # ------------------ PRUEBAS ESTADÍSTICAS FORMALES ------------------

    # 1. Test de Normalidad (Shapiro-Wilk o D'Agostino-Pearson)
    if n_samples >= 3 and res_std > 1e-6:
        if n_samples <= 5000:
            shapiro_stat, shapiro_p = stats.shapiro(residuals)
        else:
            shapiro_stat, shapiro_p = stats.jarque_bera(residuals)
        shapiro_stat, shapiro_p = float(shapiro_stat), float(shapiro_p)
    else:
        shapiro_stat, shapiro_p = 1.0, 1.0

    is_normal = shapiro_p > 0.05
    normal_interpretation = (
        "La prueba no rechaza normalidad (p > 0.05); esto no demuestra normalidad ni valida intervalos de predicción."
        if is_normal else
        "La prueba rechaza normalidad (p ≤ 0.05) en los residuos evaluados; la causa no se identifica con esta prueba."
    )

    # 2. Test de Homocedasticidad (Breusch-Pagan / Correlación de Spearman de Residuos Absolutos vs Ajustados)
    # H0: La varianza del error es constante (no depende de los valores predichos)
    if n_samples >= 5 and np.std(y_pred_arr) > 1e-6 and np.std(np.abs(residuals)) > 1e-6:
        hetero_corr, hetero_p = stats.spearmanr(np.abs(residuals), y_pred_arr)
        hetero_corr, hetero_p = float(hetero_corr), float(hetero_p)
    else:
        hetero_corr, hetero_p = 0.0, 1.0

    is_homoscedastic = hetero_p > 0.05
    homoscedastic_interpretation = (
        "Spearman no detecta asociación entre |residuo| y predicción (p > 0.05). No demuestra varianza constante."
        if is_homoscedastic else
        "Heterocedasticidad detectada (p ≤ 0.05). La variabilidad del error de predicción cambia según la magnitud del valor predicho."
    )

    # 3. Test de Autocorrelación Residual (Durbin-Watson)
    # DW ~ 2 indica ausencia de autocorrelación. < 1.5 indica autocorrelación positiva. > 2.5 negativa.
    if np.sum(residuals**2) > 0 and n_samples > 1:
        diff_res = np.diff(residuals)
        dw_stat = float(np.sum(diff_res**2) / np.sum(residuals**2))
    else:
        dw_stat = 2.0

    is_independent = 1.5 <= dw_stat <= 2.5
    if dw_stat < 1.5:
        dw_interpretation = f"Durbin-Watson = {dw_stat:.2f} (< 1.5). Indicio de asociación positiva entre residuos consecutivos en el orden evaluado; no es una prueba espacial."
    elif dw_stat > 2.5:
        dw_interpretation = f"Durbin-Watson = {dw_stat:.2f} (> 2.5). Indicio de asociación negativa entre residuos consecutivos en el orden evaluado; no es una prueba espacial."
    else:
        dw_interpretation = f"Durbin-Watson = {dw_stat:.2f} (1.5 - 2.5). Valor cercano a 2 en el orden evaluado; no demuestra independencia ni ausencia de autocorrelación espacial."

    # 4. Test t de Student para Insesgadez (H0: media del error = 0)
    if n_samples >= 3 and res_std > 1e-6:
        t_stat, t_p = stats.ttest_1samp(residuals, 0.0)
        t_stat, t_p = float(t_stat), float(t_p)
    else:
        t_stat, t_p = (0.0, 1.0) if abs(res_mean) <= 1e-6 else (float('inf'), 0.0)

    is_unbiased = t_p > 0.05
    unbiased_interpretation = (
        f"No se rechaza media cero (t = {t_stat:.2f}, p = {t_p:.3f} > 0.05). La media de los errores no difiere estadísticamente de cero (no demuestra ausencia de sesgo)."
        if is_unbiased else
        f"Sesgo estadístico detectado (t = {t_stat:.2f}, p = {t_p:.3f} ≤ 0.05). El modelo tiende a {'sobreestimar' if res_mean < 0 else 'subestimar'} levemente en promedio."
    )

    # 5. Intervalos de Confianza al 95% para el error
    se_mean = res_std / np.sqrt(n_samples) if n_samples > 0 else 0.0
    ci_95_margin = 1.96 * se_mean
    ci_lower = res_mean - ci_95_margin
    ci_upper = res_mean + ci_95_margin

    # ------------------ DATOS PARA GRÁFICOS (QQ-Plot, Residuos) ------------------
    # Q-Q plot data: cuantiles teóricos vs cuantiles empíricos estandarizados
    std_residuals = (residuals - res_mean) / res_std if res_std > 1e-6 else residuals
    sorted_std_res = np.sort(std_residuals)
    theoretical_quantiles = stats.norm.ppf((np.arange(1, n_samples + 1) - 0.5) / n_samples)

    # Curva normal teórica para el histograma de residuos
    x_kde = np.linspace(res_mean - 3.5 * res_std, res_mean + 3.5 * res_std, 100)
    y_kde = stats.norm.pdf(x_kde, loc=res_mean, scale=max(0.1, res_std))

    return {
        'model_id': model_entry['id'],
        'model_name': model_entry['algo_name'],
        'raw_algo': model_entry['raw_model_type'],
        'target_col': target_col,
        'features_count': len(model_entry.get('features', [])),
        'features_list': model_entry.get('features', []),
        'n_samples': n_samples,
        'evaluated_on_live': evaluated_on_live,
        'is_classification': is_classification,
        # Performance KPIs
        'r2': round(r2, 4),
        'rmse': round(rmse, 2),
        'mae': round(mae, 2),
        'mape': round(mape, 2),
        'explained_variance': round(exp_var, 4),
        'pearson_r': round(pearson_r, 4),
        'pearson_p': pearson_p,
        'spearman_rho': round(spearman_rho if not is_classification else 1.0, 4),
        # Residuals stats
        'res_mean': round(res_mean, 2),
        'res_std': round(res_std, 2),
        'res_median': round(res_median, 2),
        'res_min': round(res_min, 2),
        'res_max': round(res_max, 2),
        'res_skew': round(res_skew, 3),
        'res_kurt': round(res_kurt, 3),
        # Formal Hypothesis Tests
        'test_normality': {
            'name': 'Shapiro-Wilk' if n_samples <= 5000 else 'Jarque-Bera',
            'stat': round(shapiro_stat, 4),
            'p_value': round(shapiro_p, 4),
            'passed': is_normal,
            'status': 'No evaluable: residuos constantes' if res_std <= 1e-6 else ('No se rechaza normalidad' if is_normal else 'Se rechaza normalidad'),
            'desc': 'Normalidad no evaluable: los residuos son constantes.' if res_std <= 1e-6 else normal_interpretation
        },
        'test_homoscedasticity': {
            'name': 'Spearman entre |residuo| y predicción',
            'stat': round(hetero_corr, 4),
            'p_value': round(hetero_p, 4),
            'passed': is_homoscedastic,
            'status': 'No evaluable: datos constantes' if np.std(np.abs(residuals)) <= 1e-6 or np.std(y_pred_arr) <= 1e-6 else ('Sin asociación detectada' if is_homoscedastic else 'Asociación detectada'),
            'desc': 'Spearman no evaluable con magnitudes de error o predicciones constantes.' if np.std(np.abs(residuals)) <= 1e-6 or np.std(y_pred_arr) <= 1e-6 else homoscedastic_interpretation
        },
        'test_autocorrelation': {
            'name': 'Durbin-Watson (orden de las filas)',
            'stat': round(dw_stat, 3),
            'p_value': None,
            'passed': is_independent,
            'status': 'DW cercano a 2 (orientativo)' if is_independent else '⚠️ Autocorrelación',
            'desc': dw_interpretation
        },
        'test_unbiased': {
            'name': "Student's t-test (Media de Error = 0)",
            'stat': round(t_stat, 3),
            'p_value': round(t_p, 4),
            'passed': is_unbiased,
            'status': 'No se rechaza media cero' if is_unbiased else '⚠️ Con Sesgo Medio',
            'desc': unbiased_interpretation
        },
        'confidence_interval_95': {
            'margin': round(ci_95_margin, 2),
            'lower': round(ci_lower, 2),
            'upper': round(ci_upper, 2),
            'label': f"[{round(ci_lower, 2):+,} a {round(ci_upper, 2):+,}]"
        },
        # Samples for Plotly Charts
        'y_true': [float(v) for v in y_true],
        'y_pred': [float(v) for v in y_pred],
        'residuals': [float(v) for v in residuals],
        'qq_theoretical': [round(float(v), 3) for v in theoretical_quantiles],
        'qq_sample': [round(float(v), 3) for v in sorted_std_res],
        'kde_x': [round(float(v), 2) for v in x_kde],
        'kde_y': [round(float(v), 5) for v in y_kde],
        'folds_data': cached.get('folds', [])
    }


def get_all_models_benchmark(
    models_dir: str = MODELS_DIR,
    df_active: Optional[pd.DataFrame] = None
) -> pd.DataFrame:
    """
    Genera un cuadro comparativo benchmark de todos los modelos entrenados.
    """
    models = list_trained_models(models_dir)
    rows = []
    for m in models:
        try:
            stats_eval = evaluate_model_statistics(m, df_active)
            if stats_eval.get('is_classification'):
                continue
            rows.append({
                'Archivo': m['filename'],
                'Algoritmo': stats_eval['model_name'],
                'Variable Objetivo': stats_eval['target_col'],
                'Evaluación': 'Dataset activo (puede incluir entrenamiento)' if stats_eval['evaluated_on_live'] else 'Muestra guardada de validación',
                'R² Score': stats_eval['r2'],
                'RMSE': stats_eval['rmse'],
                'MAE': stats_eval['mae'],
                'MAPE (%)': f"{stats_eval['mape']:.1f}%",
                'Normalidad (p)': f"{stats_eval['test_normality']['p_value']:.3f} ({'✅' if stats_eval['test_normality']['passed'] else '⚠️'})",
                'Homocedasticidad': '✅ Sí' if stats_eval['test_homoscedasticity']['passed'] else '⚠️ No',
                'Durbin-Watson': stats_eval['test_autocorrelation']['stat'],
                'Tamaño': m['filesize']
            })
        except Exception:
            continue

    if not rows:
        return pd.DataFrame()

    df_bench = pd.DataFrame(rows)
    df_bench = df_bench.sort_values(by='R² Score', ascending=False).reset_index(drop=True)
    return df_bench
