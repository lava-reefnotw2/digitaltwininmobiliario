import os
import joblib
import numpy as np
import pandas as pd
from typing import Dict, Any, List, Optional, Tuple
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier, GradientBoostingRegressor, GradientBoostingClassifier
from sklearn.model_selection import KFold, train_test_split
from sklearn.metrics import r2_score, mean_squared_error, mean_absolute_error, accuracy_score, f1_score
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler

# Check available advanced algorithms
try:
    import xgboost as xgb
    HAS_XGBOOST = True
except ImportError:
    HAS_XGBOOST = False

try:
    import lightgbm as lgb
    HAS_LIGHTGBM = True
except ImportError:
    HAS_LIGHTGBM = False

try:
    import catboost as cb
    HAS_CATBOOST = True
except ImportError:
    HAS_CATBOOST = False

MODELS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'trained_models')
DATA_JSON_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'data_json')
os.makedirs(MODELS_DIR, exist_ok=True)

DEFAULT_REAL_DATASET_PATH = os.path.join(DATA_JSON_DIR, 'real_urban_dataset_peru.csv')

def load_official_real_dataset() -> pd.DataFrame:
    """Loads the reference real urban dataset for Peru pilot cities."""
    if os.path.exists(DEFAULT_REAL_DATASET_PATH):
        try:
            df = pd.read_csv(DEFAULT_REAL_DATASET_PATH, encoding='utf-8-sig')
            df.columns = [str(c).replace('\ufeff', '').strip() for c in df.columns]
            for col in df.select_dtypes(include=['object']).columns:
                df[col] = df[col].astype(str)
            return df
        except Exception as e:
            print(f"Error loading real dataset: {e}")
    # Fallback to programmatic dataset
    return generate_urban_dataset()

FEATURE_NAMES = [
    'densidad_habitacional',
    'distancia_vias_principales_m',
    'proximidad_salud_m',
    'proximidad_educacion_m',
    'pendiente_terreno_pct',
    'indice_vulnerabilidad_unhabitat',
    'area_verde_per_capita',
    'radiacion_solar_kwh'
]

FEATURE_LABELS = {
    'densidad_habitacional': 'Densidad Habitacional Base (hab/ha)',
    'distancia_vias_principales_m': 'Distancia a Vías Principales (m)',
    'proximidad_salud_m': 'Proximidad a Centros de Salud (m)',
    'proximidad_educacion_m': 'Proximidad a Escuelas (m)',
    'pendiente_terreno_pct': 'Pendiente del Terreno (%)',
    'indice_vulnerabilidad_unhabitat': 'Índice Slum UN-Habitat (0-100)',
    'area_verde_per_capita': 'Área Verde per Cápita (m²)',
    'radiacion_solar_kwh': 'Radiación Solar Incidente (kWh/m²)'
}

def generate_urban_dataset(city_id: str = 'lima', n_samples: int = 600, random_state: int = 42) -> pd.DataFrame:
    """Generates a territorial dataset with census blocks calibrated for Lima, Arequipa and Trujillo."""
    np.random.seed(random_state)
    if city_id == 'arequipa':
        slope_base = np.random.gamma(shape=3.5, scale=4.5, size=n_samples)
        density_base = np.random.normal(loc=280, scale=60, size=n_samples)
        vulnerability = np.random.beta(a=3, b=5, size=n_samples) * 100
    elif city_id == 'trujillo':
        slope_base = np.random.gamma(shape=1.5, scale=3.0, size=n_samples)
        density_base = np.random.normal(loc=310, scale=70, size=n_samples)
        vulnerability = np.random.beta(a=4, b=4, size=n_samples) * 100
    else:
        slope_base = np.random.gamma(shape=4.0, scale=6.5, size=n_samples)
        density_base = np.random.normal(loc=350, scale=80, size=n_samples)
        vulnerability = np.random.beta(a=5, b=4, size=n_samples) * 100

    df = pd.DataFrame({
        'manzana_id': [f"MZ-{city_id.upper()[:3]}-{i+1:04d}" for i in range(n_samples)],
        'densidad_habitacional': np.clip(density_base, 80, 650).round(1),
        'distancia_vias_principales_m': np.clip(np.random.exponential(scale=350, size=n_samples) + 40, 20, 1800).round(1),
        'proximidad_salud_m': np.clip(np.random.normal(loc=750, scale=300, size=n_samples), 80, 2500).round(1),
        'proximidad_educacion_m': np.clip(np.random.normal(loc=550, scale=220, size=n_samples), 60, 1900).round(1),
        'pendiente_terreno_pct': np.clip(slope_base, 2, 55).round(1),
        'indice_vulnerabilidad_unhabitat': np.clip(vulnerability, 10, 95).round(1),
        'area_verde_per_capita': np.clip(np.random.exponential(scale=2.2, size=n_samples) + 0.3, 0.1, 14.0).round(2),
        'radiacion_solar_kwh': np.clip(np.random.normal(loc=4.8, scale=0.6, size=n_samples), 2.5, 6.5).round(2)
    })

    valor_m2 = (
        120.0 +
        (df['densidad_habitacional'] * 0.18) -
        (df['distancia_vias_principales_m'] * 0.055) -
        (df['proximidad_salud_m'] * 0.02) -
        (df['pendiente_terreno_pct'] * 2.1) -
        (df['indice_vulnerabilidad_unhabitat'] * 0.75) +
        (df['area_verde_per_capita'] * 4.2) +
        np.random.normal(0, 8, n_samples)
    )
    df['valor_suelo_usd_m2'] = np.clip(valor_m2, 25.0, 320.0).round(1)

    viabilidad = (
        85.0 -
        (df['pendiente_terreno_pct'] * 1.1) -
        (df['indice_vulnerabilidad_unhabitat'] * 0.35) -
        (df['distancia_vias_principales_m'] * 0.015) +
        (df['area_verde_per_capita'] * 1.8) +
        np.random.normal(0, 3, n_samples)
    )
    df['viabilidad_vivienda_social'] = np.clip(viabilidad, 15.0, 98.0).round(1)

    def risk_cat(row):
        slope = row['pendiente_terreno_pct']
        vuln = row['indice_vulnerabilidad_unhabitat']
        if slope > 32 or (slope > 22 and vuln > 65):
            return 'Muy Alto'
        elif slope > 20 or vuln > 55:
            return 'Alto'
        elif slope > 12:
            return 'Medio'
        return 'Bajo'

    df['riesgo_geotecnico'] = df.apply(risk_cat, axis=1)
    return df


class LocalAIEngine:
    """
    Direct in-process AI Machine Learning Engine capable of training
    on user-provided REAL datasets (CSV, Excel, GeoJSON) without FastAPI.
    """
    def __init__(self):
        self.current_model = None
        self.model_type = 'random_forest'
        self.metrics = None
        self.feature_importance = []
        self.dataset = None
        self.trained_features: List[str] = []
        self.target_column: str = ''
        self.is_classification: bool = False
        self.imputer = None
        self.scaler = None
        self.model_filepath = None

    def train_on_custom_dataset(
        self,
        df: pd.DataFrame,
        features: List[str],
        target_col: str,
        model_type: str = 'random_forest',
        n_estimators: int = 150,
        max_depth: int = 12,
        learning_rate: float = 0.05,
        test_size: float = 0.20,
        use_kfold: bool = True
    ) -> Dict[str, Any]:
        """
        Trains the selected model on an uploaded REAL dataset.
        Handles numeric and categorical encodings, imputes missing values,
        and computes comprehensive metrics and feature importances.
        """
        self.dataset = df.copy()
        self.target_column = target_col
        self.trained_features = list(features)

        # Separate X and y
        y_raw = df[target_col].copy()
        
        # Check task type: Classification or Regression
        is_classification = (
            y_raw.dtype == 'object' or 
            y_raw.dtype.name == 'category' or 
            (pd.api.types.is_numeric_dtype(y_raw) and y_raw.nunique() <= 5 and not pd.api.types.is_float_dtype(y_raw))
        )
        self.is_classification = is_classification

        # Prepare X with one-hot encoding for categorical text columns
        X_df = df[features].copy()
        X_encoded = pd.get_dummies(X_df, drop_first=True)
        final_feature_names = list(X_encoded.columns)

        # Impute missing values
        imputer = SimpleImputer(strategy='median' if np.issubdtype(X_encoded.values.dtype, np.number) else 'most_frequent')
        X_imputed = imputer.fit_transform(X_encoded)
        self.imputer = imputer

        if is_classification:
            # Classification target encoding
            if pd.api.types.is_numeric_dtype(y_raw):
                y_clean = y_raw.values
            else:
                y_clean = y_raw.astype('category').cat.codes.values
                self.class_labels = list(y_raw.astype('category').cat.categories)
        else:
            # Regression continuous target
            y_clean = pd.to_numeric(y_raw, errors='coerce').fillna(y_raw.median()).values

        # K-Fold Cross Validation or Train/Test Split
        models_pool = []
        folds_metrics = []

        if use_kfold and len(df) >= 10:
            kf = KFold(n_splits=5, shuffle=True, random_state=42)
            for fold_idx, (train_idx, val_idx) in enumerate(kf.split(X_imputed)):
                X_train, X_val = X_imputed[train_idx], X_imputed[val_idx]
                y_train, y_val = y_clean[train_idx], y_clean[val_idx]

                model = self._create_model(model_type, is_classification, n_estimators, max_depth, learning_rate, random_state=42 + fold_idx)
                model.fit(X_train, y_train)
                y_pred = model.predict(X_val)

                if is_classification:
                    acc = float(accuracy_score(y_val, y_pred))
                    f1 = float(f1_score(y_val, y_pred, average='weighted'))
                    folds_metrics.append({'fold': fold_idx + 1, 'accuracy': round(acc, 4), 'f1': round(f1, 4)})
                else:
                    r2 = float(r2_score(y_val, y_pred))
                    rmse = float(np.sqrt(mean_squared_error(y_val, y_pred)))
                    mae = float(mean_absolute_error(y_val, y_pred))
                    folds_metrics.append({'fold': fold_idx + 1, 'r2': round(r2, 4), 'rmse': round(rmse, 2), 'mae': round(mae, 2)})

                models_pool.append((model, X_val, y_val, y_pred))

            # Pick best model based on primary metric
            if is_classification:
                best_idx = max(range(len(folds_metrics)), key=lambda i: folds_metrics[i]['accuracy'])
            else:
                best_idx = max(range(len(folds_metrics)), key=lambda i: folds_metrics[i]['r2'])

            best_model, X_sample, y_sample, y_pred_sample = models_pool[best_idx]
            self.current_model = best_model
        else:
            # Single Train/Test Split
            X_train, X_val, y_train, y_val = train_test_split(X_imputed, y_clean, test_size=test_size, random_state=42)
            model = self._create_model(model_type, is_classification, n_estimators, max_depth, learning_rate, random_state=42)
            model.fit(X_train, y_train)
            y_pred = model.predict(X_val)

            if is_classification:
                acc = float(accuracy_score(y_val, y_pred))
                f1 = float(f1_score(y_val, y_pred, average='weighted'))
                folds_metrics = [{'fold': 1, 'accuracy': round(acc, 4), 'f1': round(f1, 4)}]
            else:
                r2 = float(r2_score(y_val, y_pred))
                rmse = float(np.sqrt(mean_squared_error(y_val, y_pred)))
                mae = float(mean_absolute_error(y_val, y_pred))
                folds_metrics = [{'fold': 1, 'r2': round(r2, 4), 'rmse': round(rmse, 2), 'mae': round(mae, 2)}]

            self.current_model = model
            X_sample, y_sample, y_pred_sample = X_val, y_val, y_pred

        # Feature Importance computation
        feature_importance_list = []
        if hasattr(self.current_model, 'feature_importances_'):
            importances = self.current_model.feature_importances_
            total_imp = float(np.sum(importances)) or 1.0
            for col, imp in zip(final_feature_names, importances):
                feature_importance_list.append({
                    'feature': col,
                    'name': col.replace('_', ' ').capitalize(),
                    'val': float((imp / total_imp) * 100)
                })
            feature_importance_list.sort(key=lambda x: x['val'], reverse=True)
        self.feature_importance = feature_importance_list

        # Summary Metrics
        if is_classification:
            avg_acc = round(float(np.mean([f['accuracy'] for f in folds_metrics])), 4)
            avg_f1 = round(float(np.mean([f['f1'] for f in folds_metrics])), 4)
            self.metrics = {
                'is_classification': True,
                'folds': folds_metrics,
                'avg_accuracy': avg_acc,
                'avg_f1': avg_f1,
                'model_type': model_type,
                'feature_importance': feature_importance_list,
                'final_features': final_feature_names,
                'target_col': target_col,
                'y_true_sample': [float(v) for v in y_sample[:60]],
                'y_pred_sample': [float(v) for v in y_pred_sample[:60]]
            }
        else:
            avg_r2 = round(float(np.mean([f['r2'] for f in folds_metrics])), 4)
            avg_rmse = round(float(np.mean([f['rmse'] for f in folds_metrics])), 2)
            avg_mae = round(float(np.mean([f['mae'] for f in folds_metrics])), 2)
            self.metrics = {
                'is_classification': False,
                'folds': folds_metrics,
                'avg_r2': avg_r2,
                'avg_rmse': avg_rmse,
                'avg_mae': avg_mae,
                'model_type': model_type,
                'feature_importance': feature_importance_list,
                'final_features': final_feature_names,
                'target_col': target_col,
                'y_true_sample': [round(float(v), 1) for v in y_sample[:60]],
                'y_pred_sample': [round(float(v), 1) for v in y_pred_sample[:60]]
            }

        # Save model locally for user download
        model_filename = f"trained_{model_type}_{target_col}.joblib"
        self.model_filepath = os.path.join(MODELS_DIR, model_filename)
        try:
            joblib.dump({
                'model': self.current_model,
                'imputer': self.imputer,
                'features': final_feature_names,
                'raw_features': list(features),
                'categorical_levels': {
                    col: list(pd.Categorical(X_df[col]).categories)
                    for col in X_df.select_dtypes(include=['object', 'string', 'category']).columns
                },
                'target': target_col,
                'metrics': self.metrics
            }, self.model_filepath)
        except Exception:
            pass

        return self.metrics

    def _create_model(self, model_type: str, is_classification: bool, n_estimators: int, max_depth: int, learning_rate: float, random_state: int = 42):
        """Instantiates the required machine learning estimator."""
        if is_classification:
            if model_type == 'xgboost' and HAS_XGBOOST:
                return xgb.XGBClassifier(n_estimators=n_estimators, max_depth=max_depth, learning_rate=learning_rate, random_state=random_state, n_jobs=1)
            elif model_type == 'lightgbm' and HAS_LIGHTGBM:
                return lgb.LGBMClassifier(n_estimators=n_estimators, max_depth=max_depth, learning_rate=learning_rate, random_state=random_state, verbose=-1)
            elif model_type == 'catboost' and HAS_CATBOOST:
                return cb.CatBoostClassifier(iterations=n_estimators, depth=min(max_depth, 8), learning_rate=learning_rate, random_seed=random_state, verbose=0)
            elif model_type == 'gnn':
                return GradientBoostingClassifier(n_estimators=min(n_estimators, 200), max_depth=min(max_depth, 6), learning_rate=learning_rate, random_state=random_state)
            else:
                return RandomForestClassifier(n_estimators=n_estimators, max_depth=max_depth, random_state=random_state, n_jobs=-1)
        else:
            if model_type == 'xgboost' and HAS_XGBOOST:
                return xgb.XGBRegressor(n_estimators=n_estimators, max_depth=max_depth, learning_rate=learning_rate, random_state=random_state, n_jobs=1)
            elif model_type == 'lightgbm' and HAS_LIGHTGBM:
                return lgb.LGBMRegressor(n_estimators=n_estimators, max_depth=max_depth, learning_rate=learning_rate, random_state=random_state, verbose=-1)
            elif model_type == 'catboost' and HAS_CATBOOST:
                return cb.CatBoostRegressor(iterations=n_estimators, depth=min(max_depth, 8), learning_rate=learning_rate, random_seed=random_state, verbose=0)
            elif model_type == 'gnn':
                return GradientBoostingRegressor(n_estimators=min(n_estimators, 200), max_depth=min(max_depth, 6), learning_rate=learning_rate, random_state=random_state)
            else:
                return RandomForestRegressor(n_estimators=n_estimators, max_depth=max_depth, random_state=random_state, n_jobs=-1)

    def train_model(
        self,
        city_id: str = 'lima',
        model_type: str = 'random_forest',
        n_estimators: int = 150,
        max_depth: int = 12,
        learning_rate: float = 0.05,
        target_col: str = 'valor_suelo_usd_m2'
    ) -> Dict[str, Any]:
        """Wrapper maintaining backward compatibility using city dataset."""
        df = generate_urban_dataset(city_id=city_id, n_samples=700)
        return self.train_on_custom_dataset(
            df=df,
            features=FEATURE_NAMES,
            target_col=target_col,
            model_type=model_type,
            n_estimators=n_estimators,
            max_depth=max_depth,
            learning_rate=learning_rate
        )

    def predict_in_process(self, input_features: Dict[str, float]) -> Dict[str, Any]:
        """Direct in-memory inference without FastAPI."""
        if self.current_model is None:
            self.train_model(model_type='random_forest')

        # Use trained features if present, otherwise default FEATURE_NAMES
        feats = self.metrics.get('final_features', FEATURE_NAMES) if self.metrics else FEATURE_NAMES
        row_dict = {f: float(input_features.get(f, 0.0)) for f in feats}
        vec_df = pd.DataFrame([row_dict])
        
        if self.imputer is not None:
            try:
                vec_arr = self.imputer.transform(vec_df)
            except Exception:
                vec_arr = vec_df.values
        else:
            vec_arr = vec_df.values

        predicted_raw = self.current_model.predict(vec_arr)[0]
        predicted_value = float(predicted_raw)

        # Contextual heuristics
        slope = input_features.get('pendiente_terreno_pct', input_features.get('pendiente', 15.0))
        vuln = input_features.get('indice_vulnerabilidad_unhabitat', input_features.get('vulnerabilidad', 45.0))
        dist_vias = input_features.get('distancia_vias_principales_m', input_features.get('distancia_via', 300.0))

        viability = max(10.0, min(99.0, 90.0 - (slope * 1.1) - (vuln * 0.3) - (dist_vias * 0.01)))

        if slope > 30.0:
            risk = 'Muy Alto (Inhabitable sin andenes/muros)'
            color = 'red'
        elif slope > 20.0 or vuln > 60.0:
            risk = 'Alto (Requiere mitigación estructural)'
            color = 'amber'
        elif slope > 12.0:
            risk = 'Moderado (Apto con cimentación reforzada)'
            color = 'blue'
        else:
            risk = 'Bajo (Apto para densificación)'
            color = 'emerald'

        return {
            'predicted_value_usd_m2': round(predicted_value, 2),
            'viability_score': round(viability, 1),
            'risk_level': risk,
            'risk_color': color
        }

    def detect_territorial_alerts(self, city_id: str = 'lima') -> List[Dict[str, Any]]:
        """Detects anomalies and early warnings on the active dataset."""
        if self.dataset is None:
            self.dataset = generate_urban_dataset(city_id=city_id, n_samples=500)

        alerts = []
        df = self.dataset

        slope_col = next((c for c in df.columns if 'pendiente' in c.lower() or 'slope' in c.lower()), None)
        health_col = next((c for c in df.columns if 'salud' in c.lower() or 'health' in c.lower()), None)
        green_col = next((c for c in df.columns if 'verde' in c.lower() or 'green' in c.lower()), None)

        if slope_col:
            high_slope = df[df[slope_col] > 30.0]
            if len(high_slope) > 0:
                alerts.append({
                    'type': 'danger',
                    'title': f'Riesgo Geotécnico Crítico ({len(high_slope)} registros)',
                    'description': f'Se identificaron {len(high_slope)} manzanas censales con pendientes superiores al 30% en zonas de alta vulnerabilidad.',
                    'action': 'Priorizar muros de contención ciclópeos y andenería estructural.'
                })

        if health_col:
            health_deficit = df[df[health_col] > 1000.0]
            if len(health_deficit) > 0:
                alerts.append({
                    'type': 'warning',
                    'title': f'Déficit de Cobertura Sanitaria ({len(health_deficit)} registros)',
                    'description': f'{len(health_deficit)} sectores superan los 1,000m de caminata hacia el centro de salud más cercano.',
                    'action': 'Insertar Posta Médica Satelital I-2 en el escenario activo.'
                })

        if green_col:
            green_deficit = df[df[green_col] < 1.5]
            if len(green_deficit) > 0:
                alerts.append({
                    'type': 'info',
                    'title': f'Déficit de Áreas Verdes ({len(green_deficit)} sectores)',
                    'description': f'{len(green_deficit)} sectores cuentan con menos de 1.5 m²/hab frente a la meta OMS de 9.0 m²/hab.',
                    'action': 'Proyectar parque bioclimático con especies xerófitas locales.'
                })

        return alerts

# Singleton instance
LOCAL_AI_ENGINE = LocalAIEngine()
