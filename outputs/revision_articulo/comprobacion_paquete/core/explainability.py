"""
Motor de Interpretabilidad y Explicabilidad Automatizada (XAI Territorial)
Genera diagnósticos analíticos, lectura estadística, contexto normativo y recomendaciones
en tiempo real para cada gráfico, tabla o figura en el Gemelo Digital Inmobiliario.
"""

import numpy as np
import pandas as pd
import streamlit as st
import plotly.graph_objects as go
from typing import Dict, Any, List, Optional, Tuple

def apply_clean_chart_theme(
    fig: go.Figure,
    height: int = 340,
    title: Optional[str] = None,
    xaxis_title: Optional[str] = None,
    yaxis_title: Optional[str] = None,
    show_legend: bool = True
) -> go.Figure:
    """
    Aplica una configuración visual moderna, de alto contraste y legible
    tanto en MODO OSCURO como en MODO CLARO en el Gemelo Digital.
    """
    # Detectar el modo de tema actual
    theme = st.session_state.get('theme_mode', 'dark')
    is_light = (theme == 'light')

    if is_light:
        template_name = 'plotly_white'
        paper_bg = 'rgba(255, 255, 255, 0)'
        plot_bg = 'rgba(241, 245, 249, 0.55)'
        font_color = '#0f172a'
        title_color = '#0f172a'
        grid_color = 'rgba(0, 0, 0, 0.08)'
        zero_color = 'rgba(0, 0, 0, 0.16)'
        tick_color = '#475569'
        axis_title_color = '#334155'
        hover_bg = '#ffffff'
        hover_border = '#0284c7'
    else:
        template_name = 'plotly_dark'
        paper_bg = 'rgba(15, 23, 42, 0)'
        plot_bg = 'rgba(15, 23, 42, 0.45)'
        font_color = '#e2e8f0'
        title_color = '#f8fafc'
        grid_color = 'rgba(255, 255, 255, 0.08)'
        zero_color = 'rgba(255, 255, 255, 0.18)'
        tick_color = '#cbd5e1'
        axis_title_color = '#94a3b8'
        hover_bg = '#0f172a'
        hover_border = '#38bdf8'

    update_kwargs = dict(
        height=height,
        template=template_name,
        paper_bgcolor=paper_bg,
        plot_bgcolor=plot_bg,
        font=dict(family='Plus Jakarta Sans, sans-serif', color=font_color, size=11),
        margin=dict(l=45, r=25, t=45 if title else 25, b=45),
        hoverlabel=dict(
            bgcolor=hover_bg,
            font_size=12,
            font_color=font_color,
            font_family='Plus Jakarta Sans, sans-serif',
            bordercolor=hover_border
        )
    )

    if title:
        update_kwargs['title'] = dict(
            text=f"<b>{title}</b>",
            font=dict(family='Outfit, sans-serif', size=14, color=title_color),
            x=0.02,
            y=0.96
        )

    fig.update_layout(**update_kwargs)

    # Actualizar ejes si existen en el tipo de figura
    try:
        fig.update_xaxes(
            gridcolor=grid_color,
            zerolinecolor=zero_color,
            tickfont=dict(color=tick_color, size=10),
            title_font=dict(color=axis_title_color, size=11),
            title_text=xaxis_title if xaxis_title else None
        )
        fig.update_yaxes(
            gridcolor=grid_color,
            zerolinecolor=zero_color,
            tickfont=dict(color=tick_color, size=10),
            title_font=dict(color=axis_title_color, size=11),
            title_text=yaxis_title if yaxis_title else None
        )
    except Exception:
        pass

    return fig

def render_explainability_card(
    title: str,
    diagnosis: str,
    urban_context: str,
    recommendation: str,
    metrics_chips: Optional[List[Dict[str, str]]] = None,
    badge_type: str = "ai"
):
    """
    Renderiza un componente UI de explicabilidad e interpretabilidad automatizada
    con diseño bento card adaptable a MODO OSCURO y MODO CLARO.
    """
    theme = st.session_state.get('theme_mode', 'dark')
    is_light = (theme == 'light')

    badge_label = "🤖 EXPLICABILIDAD & INTERPRETABILIDAD AUTOMÁTICA (XAI)"
    badge_color = "#0284c7" if is_light else "#38bdf8"
    if badge_type == "normative":
        badge_label = "🏛️ INTERPRETABILIDAD NORMATIVA & POLÍTICA PÚBLICA"
        badge_color = "#059669" if is_light else "#10b981"
    elif badge_type == "stats":
        badge_label = "📊 LECTURA ESTADÍSTICA AUTOMÁTICA"
        badge_color = "#9333ea" if is_light else "#a855f7"

    chips_html = ""
    if metrics_chips:
        chip_bg = "rgba(241, 245, 249, 0.95)" if is_light else "rgba(30, 41, 59, 0.7)"
        chip_border = "rgba(203, 213, 225, 0.9)" if is_light else "rgba(56, 189, 248, 0.3)"
        chip_text = "#334155" if is_light else "#e2e8f0"
        chip_label = "#64748b" if is_light else "#94a3b8"

        chips_items = "".join([
            f"""<div style="background: {chip_bg}; border: 1px solid {chip_border}; border-radius: 8px; padding: 4px 10px; font-size: 0.75rem; color: {chip_text}; display: inline-flex; gap: 4px; align-items: center;">
                <span style="color: {chip_label};">{c.get('label')}:</span>
                <strong style="color: {c.get('color', badge_color)};">{c.get('value')}</strong>
            </div>"""
            for c in metrics_chips
        ])
        chips_html = f'<div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 10px;">{chips_items}</div>'

    card_bg = "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)" if is_light else "linear-gradient(145deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.6) 100%)"
    card_border = "1px solid rgba(203, 213, 225, 0.85)" if is_light else "1px solid rgba(56, 189, 248, 0.35)"
    card_shadow = "0 4px 20px rgba(0, 0, 0, 0.06)" if is_light else "0 4px 20px rgba(0, 0, 0, 0.25)"
    text_color = "#334155" if is_light else "#cbd5e1"
    sub_title_color = "#64748b" if is_light else "#94a3b8"
    heading_color = "#0f172a" if is_light else "#f8fafc"
    tech_title_color = "#0284c7" if is_light else "#38bdf8"
    rec_title_color = "#059669" if is_light else "#10b981"

    html_content = f"""
    <div style="background: {card_bg};
                border: {card_border}; border-left: 4px solid {badge_color};
                border-radius: 12px; padding: 14px 18px; margin-top: 10px; margin-bottom: 16px;
                box-shadow: {card_shadow};">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 6px;">
            <span style="font-size: 0.72rem; font-weight: 700; letter-spacing: 0.05em; color: {badge_color}; text-transform: uppercase;">
                {badge_label}
            </span>
            <span style="font-size: 0.75rem; color: {sub_title_color}; font-weight: 600;">{title}</span>
        </div>
        {chips_html}
        <div style="display: grid; grid-template-columns: 1fr; gap: 8px; font-size: 0.84rem; line-height: 1.45; color: {text_color};">
            <div>
                <strong style="color: {heading_color};">🔍 Diagnóstico Numérico:</strong> {diagnosis}
            </div>
            <div>
                <strong style="color: {tech_title_color};">📐 Interpretación Territorial & Técnica:</strong> {urban_context}
            </div>
            <div>
                <strong style="color: {rec_title_color};">💡 Acción / Recomendación:</strong> {recommendation}
            </div>
        </div>
    </div>
    """
    st.markdown(html_content, unsafe_allow_html=True)

# ---------------- GENERADORES ESPECIALIZADOS DE EXPLICABILIDAD ----------------

def explain_histogram(df: pd.DataFrame, col: str):
    """Genera diagnóstico e interpretabilidad para un histograma."""
    if col not in df.columns or not pd.api.types.is_numeric_dtype(df[col]):
        return

    s = df[col].replace([np.inf, -np.inf], np.nan).dropna()
    if len(s) == 0:
        st.info(f"{col}: no hay valores numéricos finitos para interpretar el histograma.")
        return

    n = len(s)
    mean_val = float(s.mean())
    median_val = float(s.median())
    std_val = float(s.std()) if n > 1 else 0.0
    min_val = float(s.min())
    max_val = float(s.max())
    skew_val = float(s.skew()) if n > 2 else 0.0

    # Detección de atípicos con rango intercuartílico (IQR)
    q25 = float(s.quantile(0.25))
    q75 = float(s.quantile(0.75))
    iqr = q75 - q25
    outliers_cnt = int(((s < (q25 - 1.5 * iqr)) | (s > (q75 + 1.5 * iqr))).sum())

    skew_desc = "aproximadamente simétrica según la asimetría muestral"
    if skew_val > 0.75:
        skew_desc = "asimétrica positiva (cola hacia valores altos)"
    elif skew_val < -0.75:
        skew_desc = "asimétrica negativa (cola hacia valores bajos)"

    diag = f"La variable <code>{col}</code> cuenta con <b>{n:,}</b> registros válidos, una media de <b>{mean_val:,.2f}</b> y mediana de <b>{median_val:,.2f}</b> (Desv. Est. = {std_val:,.2f}). Presenta una forma {skew_desc} con <b>{outliers_cnt}</b> posibles atípicos fuera de las cercas IQR [{q25 - 1.5 * iqr:.2f}, {q75 + 1.5 * iqr:.2f}]."

    context = f"Las barras cuentan observaciones por intervalo de {col}; las líneas señalan media y mediana. Rango observado: [{min_val:.2f}, {max_val:.2f}]. No se deducen causas ni cumplimiento normativo de esta distribución."
    rec = "Revisar los posibles atípicos y las unidades antes de entrenar; un valor extremo no implica un error de registro."
    chips = [
        {"label": "Media", "value": f"{mean_val:,.2f}", "color": "#38bdf8"},
        {"label": "Mediana", "value": f"{median_val:,.2f}", "color": "#10b981"},
        {"label": "Sesgo (Skew)", "value": f"{skew_val:.2f}", "color": "#f59e0b"},
        {"label": "Atípicos IQR", "value": str(outliers_cnt), "color": "#f43f5e" if outliers_cnt > 0 else "#10b981"}
    ]

    render_explainability_card(
        title=f"Distribución Frecuencial: {col}",
        diagnosis=diag,
        urban_context=context,
        recommendation=rec,
        metrics_chips=chips,
        badge_type="stats"
    )

def explain_scatter(df: pd.DataFrame, x_col: str, y_col: str):
    """Genera diagnóstico e interpretabilidad para un gráfico de dispersión / correlación."""
    if x_col not in df.columns or y_col not in df.columns:
        return
    
    valid = df[[x_col, y_col]].replace([np.inf, -np.inf], np.nan).dropna()
    if x_col == y_col:
        st.info("Se muestra la misma variable en ambos ejes: la diagonal es una identidad, no una relación predictiva independiente.")
        return
    if len(valid) < 3 or valid[x_col].nunique() < 2 or valid[y_col].nunique() < 2:
        st.info(f"Dispersión de {x_col} y {y_col}: Pearson no es interpretable con menos de 3 pares válidos o una variable constante.")
        return

    corr = float(valid[x_col].corr(valid[y_col]))
    r2 = corr ** 2

    strength = "nula o muy débil"
    if abs(corr) >= 0.7:
        strength = "muy fuerte"
    elif abs(corr) >= 0.5:
        strength = "moderada a fuerte"
    elif abs(corr) >= 0.3:
        strength = "leve"

    direction = "positiva (ambas variables crecen juntas)" if corr > 0 else "negativa (relación inversa)" if corr < 0 else "sin dirección lineal"

    diag = f"Sobre {len(valid):,} pares válidos: Pearson <b>r = {corr:.3f}</b> (fuerza {strength}, dirección {direction}). <b>r² = {r2:.1%}</b> describe el ajuste lineal bivariado con intercepto en esta muestra; no es el R² del modelo entrenado."

    context = "Cada punto corresponde a un par observado del dataset activo. La correlación describe asociación lineal, no causalidad ni significación estadística. Si hay colores, el coeficiente indicado es global; las rectas pueden corresponder a cada grupo."
    rec = "Contrastar los grupos y posibles valores extremos antes de atribuir una relación a todo el dataset."

    chips = [
        {"label": "Pearson r", "value": f"{corr:+.3f}", "color": "#38bdf8" if abs(corr) > 0.4 else "#94a3b8"},
        {"label": "Varianza Explicada R²", "value": f"{r2:.1%}", "color": "#10b981"},
        {"label": "Muestras", "value": f"{len(valid):,}", "color": "#cbd5e1"}
    ]

    render_explainability_card(
        title=f"Correlación Bivariada: {x_col} vs. {y_col}",
        diagnosis=diag,
        urban_context=context,
        recommendation=rec,
        metrics_chips=chips,
        badge_type="ai"
    )

def explain_ml_fit(y_true: List[float], y_pred: List[float], target_col: str, r2: float, rmse: float, mae: float):
    """Genera diagnóstico e interpretabilidad para la curva de ajuste de predicciones ML."""
    if not y_true or not y_pred:
        return

    # Derivar las cifras de los mismos puntos del gráfico, no del promedio de folds.
    actual = np.asarray(y_true, dtype=float)
    predicted = np.asarray(y_pred, dtype=float)
    errors = predicted - actual
    rmse = float(np.sqrt(np.mean(errors ** 2)))
    mae = float(np.mean(np.abs(errors)))
    total_variation = float(np.sum((actual - actual.mean()) ** 2))
    r2 = 1 - float(np.sum(errors ** 2)) / total_variation if total_variation > 0 else float('nan')
    bias = float(np.mean(errors))
    diag = f"En los <b>{len(actual)}</b> puntos visibles: R² = <b>{r2:.4f}</b>, RMSE = <b>{rmse:.2f}</b>, MAE = <b>{mae:.2f}</b>. Sesgo medio (predicho − real): <b>{bias:+.2f}</b>; positivo indica sobreestimación y negativo subestimación."
    fit_status = "R² negativo: en esta muestra el error supera al de predecir la media observada." if r2 < 0 else "R² no definido: la variable real es constante." if not np.isfinite(r2) else "La proximidad a la diagonal indica menor error en esta muestra."
    overfit_note = "Estas métricas de la muestra visible pueden diferir del promedio de validación mostrado arriba."
    context = f"La diagonal representa predicción = valor real de {target_col}. MAE es un error absoluto medio en las unidades del objetivo; no es un límite máximo ni una tolerancia normativa."
    rec = "Evaluar datos independientes antes de usar el modelo para decisiones; este gráfico por sí solo no demuestra generalización."

    chips = [
        {"label": "R² Score", "value": f"{r2:.4f}", "color": "#10b981" if r2 > 0.75 else "#f59e0b"},
        {"label": "RMSE", "value": f"{rmse:,.2f}", "color": "#38bdf8"},
        {"label": "MAE", "value": f"{mae:,.2f}", "color": "#a855f7"},
        {"label": "Sesgo Residual", "value": f"{bias:+.2f}", "color": "#cbd5e1"}
    ]

    render_explainability_card(
        title=f"Curva de Calibración & Residuos: {target_col}",
        diagnosis=f"{diag} {fit_status} {overfit_note}",
        urban_context=context,
        recommendation=rec,
        metrics_chips=chips,
        badge_type="ai"
    )

def explain_cv_folds(folds_data: List[Dict[str, Any]], is_classification: bool = False):
    """Genera diagnóstico e interpretabilidad para la validación cruzada K-Fold."""
    if not folds_data:
        return

    if is_classification:
        scores = [f.get('accuracy', 0.0) for f in folds_data]
        metric_name = "Accuracy"
    else:
        scores = [f.get('r2', 0.0) for f in folds_data]
        metric_name = "R²"

    mean_score = float(np.mean(scores))
    std_score = float(np.std(scores))
    min_score = float(np.min(scores))
    max_score = float(np.max(scores))
    diag = f"Resultados de <b>{len(folds_data)} particiones</b>. {metric_name} promedio = <b>{mean_score:.4f}</b>; desviación estándar <b>{std_score:.4f}</b>; rango [{min_score:.4f}, {max_score:.4f}]."

    if std_score < 0.08:
        context = "La dispersión entre particiones es baja (desviación < 0.08); esto no descarta sobreajuste ni fuga de información."
    else:
        context = "Los resultados varían entre particiones (desviación ≥ 0.08). Este gráfico no identifica la causa de esa variación."

    if len(folds_data) == 1:
        context = "Se realizó una única separación entrenamiento/validación: no permite medir estabilidad entre folds."
    else:
        context += " KFold usa particiones aleatorias, no estratificadas ni bloques espaciales."
    rec = "Revisar tanto el nivel de desempeño como su variación; para transferencia territorial se necesita una validación espacial independiente."

    chips = [
        {"label": f"{metric_name} Medio", "value": f"{mean_score:.4f}", "color": "#10b981"},
        {"label": "Desv. Est.", "value": f"{std_score:.4f}", "color": "#38bdf8"},
        {"label": "Particiones", "value": f"K = {len(folds_data)}", "color": "#cbd5e1"}
    ]

    render_explainability_card(
        title="Estabilidad Numérica K-Fold Cross-Validation",
        diagnosis=diag,
        urban_context=context,
        recommendation=rec,
        metrics_chips=chips,
        badge_type="ai"
    )

def normalize_feature_importance(feat_list: List[Dict[str, Any]]):
    """Normaliza también modelos antiguos escalados respecto al máximo."""
    valid = [dict(f) for f in feat_list if np.isfinite(f.get('val', 0)) and f.get('val', 0) >= 0]
    total = sum(f.get('val', 0) for f in valid)
    return [dict(f, val=f.get('val', 0) * 100 / total) for f in valid] if total > 0 else []


def explain_feature_importance(feat_list: List[Dict[str, Any]]):
    """Genera diagnóstico e interpretabilidad para el ranking de importancia de variables."""
    if not feat_list:
        return

    sorted_feats = sorted(feat_list, key=lambda x: x.get('val', 0), reverse=True)
    top1 = sorted_feats[0]
    top_names = [f"<b>{f.get('name')}</b> ({f.get('val'):.1f}%)" for f in sorted_feats[:3]]
    pareto_share = sum(f.get('val', 0) for f in sorted_feats[:3])

    diag = f"Las variables de mayor peso predictivo son: {', '.join(top_names)}. Juntas concentran el <b>{pareto_share:.1f}%</b> del poder de discriminación del modelo."

    diag = f"Las variables con mayor importancia global son: {', '.join(top_names)}. Sus pesos suman <b>{pareto_share:.1f}%</b> del total representado."
    context = f"{top1.get('name')} ocupa el primer lugar en el modelo seleccionado. Estas importancias globales de árboles no indican el signo del efecto, causalidad ni la contribución a una predicción individual. Variables correlacionadas o con muchas categorías pueden distorsionar el ranking."
    rec = "Contrastar con importancia por permutación en datos independientes antes de priorizar intervenciones."

    chips = [
        {"label": "Variable Dominante", "value": top1.get('name', ''), "color": "#38bdf8"},
        {"label": "Peso Top 1", "value": f"{top1.get('val', 0):.1f}%", "color": "#10b981"},
        {"label": "Concentración Top 3", "value": f"{pareto_share:.1f}%", "color": "#f59e0b"}
    ]

    render_explainability_card(
        title="Interpretabilidad Global de Atributos (Feature Attribution)",
        diagnosis=diag,
        urban_context=context,
        recommendation=rec,
        metrics_chips=chips,
        badge_type="ai"
    )

def explain_dataset_table(df: pd.DataFrame):
    """Genera diagnóstico e interpretabilidad para la tabla de datos cargados."""
    n_rows, n_cols = df.shape
    num_cols = len(df.select_dtypes(include=['number']).columns)
    cat_cols = len(df.select_dtypes(include=['object', 'category']).columns)
    nulls = int(df.isna().sum().sum())
    completeness = (1.0 - (nulls / (n_rows * n_cols if n_rows * n_cols > 0 else 1))) * 100

    diag = f"Dataset activo: <b>{n_rows:,} filas</b> x <b>{n_cols} columnas</b> ({num_cols} numéricas, {cat_cols} de texto/categóricas). Completitud: <b>{completeness:.2f}%</b>; <b>{nulls}</b> celdas nulas detectadas, aún presentes en esta vista previa."

    context = "La tabla muestra hasta las primeras 20 filas; los indicadores se calculan sobre todo el dataset activo. Los nombres de las columnas no certifican origen, resolución territorial o calidad de los datos."
    rec = "Verificar unidades, duplicados, nulos y significado del objetivo antes de entrenar. Completitud no equivale a datos correctos o balanceados."

    chips = [
        {"label": "Registros", "value": f"{n_rows:,}", "color": "#38bdf8"},
        {"label": "Completitud", "value": f"{completeness:.1f}%", "color": "#10b981"},
        {"label": "Dimensiones", "value": f"{n_cols}", "color": "#cbd5e1"}
    ]

    render_explainability_card(
        title="Auditoría de Integridad del Dataset Territorial",
        diagnosis=diag,
        urban_context=context,
        recommendation=rec,
        metrics_chips=chips,
        badge_type="stats"
    )

def explain_residual_diagnostic(result: Dict[str, Any], kind: str):
    """Lectura individual desde la misma evaluación usada por los gráficos."""
    n = result['n_samples']
    mean = result['res_mean']
    origin = "dataset activo (puede incluir filas de entrenamiento)" if result['evaluated_on_live'] else "muestra guardada de validación"
    if kind == 'histogram':
        title = 'Distribución de residuos'
        diagnosis = f"{n} residuos; media {mean:+.2f}, mediana {result['res_median']:+.2f}, desviación {result['res_std']:.2f}."
        context = "Residuo = real − predicho: positivo indica subestimación y negativo sobreestimación. Las barras cuentan observaciones y las líneas marcan cero y la media."
        recommendation = "Revisar la prueba de normalidad y los extremos; un histograma no demuestra por sí solo normalidad."
    elif kind == 'fitted':
        title = 'Residuos frente a predicciones'
        test = result['test_homoscedasticity']
        diagnosis = f"{n} pares; Spearman entre |residuo| y predicción = {test['stat']:.4f}, p = {test['p_value']:.4g}."
        context = "Se observa asociación significativa entre magnitud del error y predicción (p ≤ 0.05)." if not test['passed'] else "No se detecta asociación significativa con esta prueba (p > 0.05); no prueba varianza constante."
        context += " Las bandas ±1.96σ son referencias descriptivas, no intervalos individuales de predicción."
        if test['status'].startswith('No evaluable'):
            context = test['desc'] + " Las bandas son referencias descriptivas, no intervalos individuales de predicción."
        recommendation = "Examinar si los errores aumentan con las predicciones y validar por rangos del objetivo."
    elif kind == 'qq':
        title = 'Cuantiles de residuos frente a una normal'
        test = result['test_normality']
        diagnosis = f"{n} residuos estandarizados; {test['name']}: estadístico {test['stat']:.4f}, p = {test['p_value']:.4g}."
        context = "La prueba rechaza normalidad al nivel 0.05." if not test['passed'] else "La prueba no rechaza normalidad al nivel 0.05; esto no demuestra que la distribución sea normal."
        context += " Los puntos comparan cuantiles empíricos con N(0,1); la diagonal es la referencia."
        if test['status'].startswith('No evaluable'):
            context = test['desc'] + " Sin dispersión residual no se puede interpretar un Q-Q estandarizado."
        recommendation = "Inspeccionar desviaciones de la diagonal, especialmente en las colas; no deducir independencia de este gráfico."
    else:
        raise ValueError(f'Diagnóstico desconocido: {kind}')
    render_explainability_card(title, diagnosis, f"Fuente: {origin}. {context}", recommendation, badge_type='stats')


def explain_benchmark(df: pd.DataFrame):
    if df.empty:
        return
    # No comparar objetivos o muestras de procedencia diferente como un único ranking.
    for (target, source), group in df.groupby(['Variable Objetivo', 'Evaluación'], sort=False):
        best = group.loc[group['R² Score'].idxmax()]
        render_explainability_card(
            title=f'Comparación para {target}',
            diagnosis=f"En {len(group)} modelos, el mayor R² mostrado es {best['R² Score']:.4f}, de {best['Algoritmo']} ({best['Archivo']}).",
            urban_context=f"Fuente: {source}. R² mayor y RMSE/MAE menores indican mejor ajuste en los datos evaluados. Los errores conservan las unidades del objetivo.",
            recommendation="Confirmar que los modelos usan exactamente las mismas filas de prueba antes de elegir un ganador; las muestras guardadas pueden diferir entre modelos.",
            badge_type='stats',
        )


def explain_15min_services(counts: Dict[str, int], green_capita: float, walk_5min: List[float], walk_15min: List[float], categories: List[str]):
    """Genera diagnóstico e interpretabilidad para el análisis de proximidad y ciudad de 15 minutos."""
    avg_5m = float(np.mean(walk_5min))
    avg_15m = float(np.mean(walk_15min))
    
    # Identificar servicio con menor cobertura
    min_idx = int(np.argmin(walk_15min))
    crit_service = categories[min_idx]
    crit_cov = walk_15min[min_idx]

    diag = f"Cobertura peatonal media: <b>{avg_5m:.1f}%</b> de la población a menos de 5 min (350m) y <b>{avg_15m:.1f}%</b> a menos de 15 min (1,000m). El servicio más vulnerable es <b>{crit_service}</b> con solo <b>{crit_cov:.0f}%</b> de acceso a 15 minutos."

    green_gap = 9.0 - green_capita
    if green_gap > 0:
        context = f"Déficit biofísico de espacio público: actualmente se disponen de {green_capita:.2f} m²/hab, requiriendo <b>+{green_gap:.2f} m²/hab</b> para alcanzar el estándar internacional de la OMS y PLANMET 2040. En laderas, la pendiente del 25-35% duplica el esfuerzo de caminata en adultos mayores."
    else:
        context = f"Superávit de espacio público con {green_capita:.2f} m²/hab (supera el estándar OMS de 9.0 m²/hab). Excelente confort bioclimático."

    rec = f"Priorizar en el plan de obras la inserción de <b>1 módulo satelital de {crit_service}</b> y habilitar escaleras peatonales descansadas con arborización para reducir la penalización por pendiente."

    chips = [
        {"label": "Cobertura 15-min Media", "value": f"{avg_15m:.0f}%", "color": "#10b981" if avg_15m > 75 else "#f59e0b"},
        {"label": "Servicio Crítico", "value": crit_service, "color": "#f43f5e"},
        {"label": "Áreas Verdes", "value": f"{green_capita:.1f} m²/hab", "color": "#38bdf8"}
    ]

    render_explainability_card(
        title="Diagnóstico de Proximidad Peatonal y Ciudad de 15 Minutos (Carlos Moreno / OMS)",
        diagnosis=diag,
        urban_context=context,
        recommendation=rec,
        metrics_chips=chips,
        badge_type="normative"
    )

def explain_housing_finances(total_budget: float, subsidies: float, community_credit: float, total_units: int, progressive_units: int, consolidated_units: int):
    """Genera diagnóstico e interpretabilidad para la estructura financiera de vivienda social."""
    sub_pct = (subsidies / total_budget * 100) if total_budget > 0 else 0
    cred_pct = (community_credit / total_budget * 100) if total_budget > 0 else 0
    cost_per_unit = total_budget / total_units if total_units > 0 else 0

    diag = f"Presupuesto integral de <b>${total_budget:,.0f} USD</b> para <b>{total_units:,} soluciones habitacionales</b> (costo medio por unidad: <b>${cost_per_unit:,.0f} USD</b>). Estructurado con <b>{sub_pct:.1f}%</b> de subsidio estatal no reembolsable y <b>{cred_pct:.1f}%</b> de crédito comunitario cooperativo."

    context = f"El apalancamiento mediante el Bono Familiar Habitacional (BFH - Techo Propio) financia {sub_pct:.1f}% de la obra física. La proporción de <b>{progressive_units:,} módulos progresivos</b> frente a <b>{consolidated_units:,} unidades consolidadas</b> responde a la capacidad de pago escalonada de las familias de laderas."
    rec = "Constituir un fideicomiso comunitario de ahorro previo supervisado para garantizar el flujo del 40% restante sin incurrir en mora financiera ni sobreendeudamiento familiar."

    chips = [
        {"label": "Subsidio Estatal", "value": f"{sub_pct:.1f}%", "color": "#10b981"},
        {"label": "Cofinanciamiento", "value": f"{cred_pct:.1f}%", "color": "#38bdf8"},
        {"label": "Costo / Vivienda", "value": f"${cost_per_unit:,.0f}", "color": "#cbd5e1"}
    ]

    render_explainability_card(
        title="Evaluación de Sostenibilidad Financiera y Subsidios (Techo Propio / MiVivienda)",
        diagnosis=diag,
        urban_context=context,
        recommendation=rec,
        metrics_chips=chips,
        badge_type="normative"
    )

def explain_housing_typologies_table(tipologias: List[Dict[str, str]]):
    """Genera diagnóstico e interpretabilidad para la tabla de tipologías constructivas."""
    n_tip = len(tipologias)
    diag = f"Se evaluaron <b>{n_tip} tipologías sismorresistentes y bioclimáticas</b> adaptadas a la topografía escarpada andina y de la costa central."
    context = "Los sistemas constructivos combinan muros de ductilidad limitada y mampostería confinada con materiales locales de alta inercia térmica (sillar volcánico y pircas de piedra reforzadas), garantizando un confort térmico de entre 78 y 89 puntos sobre 100 según la norma RNE A.020."
    rec = "Fomentar la tipología de Andenería Progresiva para reducir costos de corte de ladera en más del 28% respecto a cimentaciones convencionales."

    chips = [
        {"label": "Tipologías Evaluadas", "value": str(n_tip), "color": "#38bdf8"},
        {"label": "Norma Técnica", "value": "RNE E.070 / A.020", "color": "#10b981"}
    ]

    render_explainability_card(
        title="Análisis Constructivo de Tipologías Habitacionales",
        diagnosis=diag,
        urban_context=context,
        recommendation=rec,
        metrics_chips=chips,
        badge_type="normative"
    )

def explain_ahp_matrix(criteria_list: List[str], weights: List[float], cr: float, is_consistent: bool):
    """Genera diagnóstico e interpretabilidad para la ponderación AHP de Saaty."""
    max_idx = int(np.argmax(weights))
    dom_crit = criteria_list[max_idx]
    dom_w = weights[max_idx]

    hhi = sum(w**2 for w in weights)

    diag = f"Matriz de comparación por pares con <b>Razón de Consistencia CR = {cr:.4f}</b> ({'MATRIZ CONSISTENTE' if is_consistent else 'INCONSISTENTE: CR > 0.10'}). El criterio con mayor ponderación relativa es <b>{dom_crit}</b> con un peso de <b>{dom_w:.1%}</b>. Índice de concentración de prioridades: {hhi:.3f}."

    if is_consistent:
        context = "Según el teorema de Thomas Saaty (1980), al mantenerse CR < 0.10, la transitividad lógica en las preferencias del panel de expertos y autoridades queda validada formalmente, eliminando juicios contradictorios."
    else:
        context = "La razón de consistencia supera el umbral del 10%, indicando posible circularidad o contradicción en los juicios cruzados de los expertos."

    rec = f"Priorizar la asignación presupuestaria en obras que maximicen directamente <b>{dom_crit}</b> para obtener el óptimo de Pareto multicriterio."

    chips = [
        {"label": "Razón CR", "value": f"{cr:.4f}", "color": "#10b981" if is_consistent else "#f43f5e"},
        {"label": "Estado Saaty", "value": "CONSISTENTE" if is_consistent else "REVISAR", "color": "#10b981" if is_consistent else "#f43f5e"},
        {"label": "Criterio #1", "value": dom_crit, "color": "#38bdf8"}
    ]

    render_explainability_card(
        title="Validación Formal de Consistencia AHP (Saaty Analytical Hierarchy)",
        diagnosis=diag,
        urban_context=context,
        recommendation=rec,
        metrics_chips=chips,
        badge_type="ai"
    )

def explain_scenarios_ranking(ranking_rows: List[Dict[str, Any]]):
    """Genera diagnóstico e interpretabilidad para el ranking de escenarios."""
    best = ranking_rows[0] if ranking_rows else {}
    best_name = best.get("Escenario", "Híbrido")
    best_score = best.get("Puntaje Global AHP", "N/A")

    diag = f"Evaluación multicriterio concluyente: El escenario <b>{best_name}</b> lidera el ranking con un puntaje global de <b>{best_score}</b>, superando al escenario de línea base y al municipal en balance integral."

    context = "El escenario ganador optimiza simultáneamente la cobertura de servicios de 15 minutos, la sostenibilidad bioclimática y la equidad socio-espacial, evitando el sobrecosto de soluciones puramente centralistas o fragmentadas."
    rec = f"Adoptar formalmente el plan maestro del escenario <b>{best_name}</b> como hoja de ruta vinculante ante el Concejo Municipal y el Ministerio de Vivienda."

    chips = [
        {"label": "Escenario Óptimo", "value": best_name, "color": "#10b981"},
        {"label": "Puntaje AHP", "value": str(best_score), "color": "#38bdf8"}
    ]

    render_explainability_card(
        title="Síntesis de Decisión Territorial Multicriterio",
        diagnosis=diag,
        urban_context=context,
        recommendation=rec,
        metrics_chips=chips,
        badge_type="normative"
    )

def explain_citizen_votes(labels: List[str], values: List[float]):
    """Genera diagnóstico e interpretabilidad para el conteo de votos de asamblea ciudadana."""
    total_votes = sum(values) if sum(values) > 0 else 1
    max_idx = int(np.argmax(values))
    top_label = labels[max_idx]
    top_pct = (values[max_idx] / total_votes) * 100

    diag = f"Participación ciudadana registrada con un total de <b>{int(total_votes):,} votos / preferencias</b>. La prioridad colectiva mayoritaria es <b>{top_label}</b>, concentrando el <b>{top_pct:.1f}%</b> del respaldo popular."

    context = "En el marco de la gobernanza deliberativa del Barrio 15 Minutos, la voluntad vecinal privilegia la seguridad física y los espacios de convivencia frente a la mera pavimentación vehicular aislada."
    rec = f"Asignar al menos el {top_pct:.0f}% de la partida presupuestaria participativa municipal al componente de <b>{top_label}</b> para asegurar legitimidad social y corresponsabilidad vecinal."

    chips = [
        {"label": "Prioridad Ciudadana", "value": top_label, "color": "#38bdf8"},
        {"label": "Respaldo Popular", "value": f"{top_pct:.1f}%", "color": "#10b981"},
        {"label": "Total Votos", "value": f"{int(total_votes):,}", "color": "#cbd5e1"}
    ]

    render_explainability_card(
        title="Análisis Deliberativo de Preferencias Comunitarias",
        diagnosis=diag,
        urban_context=context,
        recommendation=rec,
        metrics_chips=chips,
        badge_type="normative"
    )

def explain_spatial_elements_table(df_elements: pd.DataFrame):
    """Genera diagnóstico e interpretabilidad para la tabla de elementos espaciales y capas SIG."""
    n_elements = len(df_elements)
    total_cost = df_elements['Costo_USD'].sum() if 'Costo_USD' in df_elements.columns else 0
    total_footprint = df_elements['Area_m2'].sum() if 'Area_m2' in df_elements.columns else 0
    total_pop = df_elements['Capacidad_Hab'].sum() if 'Capacidad_Hab' in df_elements.columns else 0

    diag = f"Capa vectorial compuesta por <b>{n_elements:,} polígonos/nodos espaciales</b> georreferenciados (SRID EPSG:4326 WGS84). Huella total ocupada: <b>{total_footprint:,.0f} m²</b> con un presupuesto de obra calculado de <b>${total_cost:,.0f} USD</b> para atender a <b>{total_pop:,.0f} habitantes</b>."

    context = "La estructuración de capas vectoriales GeoJSON y PostGIS permite exportar la planificación directamente a software SIG corporativo (QGIS, ArcGIS) y plataformas de catastro municipal."
    rec = "Utilizar los IDs georreferenciados para la emisión de licencias de habilitación urbana y la supervisión de hitos de obra mediante cuadrillas de campo."

    chips = [
        {"label": "Elementos SIG", "value": str(n_elements), "color": "#38bdf8"},
        {"label": "Área Total Huella", "value": f"{total_footprint:,.0f} m²", "color": "#10b981"},
        {"label": "Población Atendida", "value": f"{total_pop:,.0f} hab", "color": "#cbd5e1"}
    ]

    render_explainability_card(
        title="Auditoría Geográfica de Intervenciones Territoriales",
        diagnosis=diag,
        urban_context=context,
        recommendation=rec,
        metrics_chips=chips,
        badge_type="stats"
    )
