"""Reproducible, session-owned experiments with per-model training and tuning."""
from dataclasses import dataclass, field
from pathlib import Path
import hashlib
import json
import time
import uuid
import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.model_selection import KFold, train_test_split, ParameterSampler
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
from core.ai_ml_models import LocalAIEngine, HAS_XGBOOST, HAS_LIGHTGBM, HAS_CATBOOST

DATASET_PATH = Path(__file__).resolve().parents[1] / 'outputs/sjl_prueba/reporte_SJL_ampliado_prueba.csv'
TARGET = 'valor_suelo_usd_m2'
LABELS = {'random_forest': 'Random Forest', 'gnn': 'Gradient Boosting', 'xgboost': 'XGBoost', 'lightgbm': 'LightGBM', 'catboost': 'CatBoost'}
MODES = {'quick': 'Rápido', 'optimized': 'Optimizado', 'rigorous': 'Riguroso'}
SCHEMA_VERSION = 2


def available_models():
    return ['random_forest', 'gnn'] + [k for k, ok in [('xgboost', HAS_XGBOOST), ('lightgbm', HAS_LIGHTGBM), ('catboost', HAS_CATBOOST)] if ok]


def predictor_options(df):
    excluded = {}
    for c in df:
        if c == TARGET:
            excluded[c] = 'Objetivo'
        elif c.lower().endswith('_id') or c.lower() in {'id', 'ubigeo', 'codigo', 'cod_manzana'}:
            excluded[c] = 'Identificador'
        elif df[c].nunique(dropna=True) <= 1:
            excluded[c] = 'Constante o sin valores'
        elif c in {'viabilidad_vivienda_pct', 'riesgo_deslizamiento'}:
            excluded[c] = 'Resultado derivado; excluido para evitar proxies del objetivo'
    return [c for c in df if c not in excluded], excluded


def fingerprint(raw, features, config):
    return hashlib.sha256(raw + json.dumps({'version': SCHEMA_VERSION, 'features': features, 'config': config}, sort_keys=True).encode()).hexdigest()


def scores(y, pred):
    return {'rmse': float(np.sqrt(mean_squared_error(y, pred))), 'mae': float(mean_absolute_error(y, pred)), 'r2': float(r2_score(y, pred))}


def average_scores(metrics):
    return {k: float(np.mean([m[k] for m in metrics])) for k in ('rmse', 'mae', 'r2')}


def search_space(kind):
    """Native estimator parameter names; each family has its own search domain."""
    trees = [80, 150, 300, 500]
    rate = [.02, .05, .1, .2]
    return {
        'random_forest': dict(n_estimators=trees, max_depth=[None, 6, 12, 20], min_samples_leaf=[1, 2, 5, 10], max_features=[.5, .8, 1.]),
        'gnn': dict(n_estimators=trees, learning_rate=rate, max_depth=[2, 3, 5, 6], min_samples_leaf=[2, 5, 10], subsample=[.7, .85, 1.]),
        'xgboost': dict(n_estimators=trees, learning_rate=rate, max_depth=[3, 5, 7, 10], min_child_weight=[1, 5, 10], subsample=[.7, .85, 1.], colsample_bytree=[.7, .85, 1.], reg_lambda=[1., 5., 10.], reg_alpha=[0., .1, 1.]),
        'lightgbm': dict(n_estimators=trees, learning_rate=rate, num_leaves=[15, 31, 63], max_depth=[-1, 6, 10], min_child_samples=[10, 20, 40], colsample_bytree=[.7, .85, 1.], reg_lambda=[0., 1., 5.]),
        'catboost': dict(iterations=trees, learning_rate=rate, depth=[4, 6, 8], l2_leaf_reg=[1., 3., 10.], random_strength=[.1, 1., 3.]),
    }[kind]


def make_pipeline(X, kind, config, params=None):
    numeric = X.select_dtypes(include='number').columns.tolist()
    categorical = [c for c in X if c not in numeric]
    prep = ColumnTransformer([
        ('numeric', SimpleImputer(strategy='median', keep_empty_features=True), numeric),
        ('categorical', Pipeline([('impute', SimpleImputer(strategy='most_frequent', keep_empty_features=True)), ('encode', OneHotEncoder(handle_unknown='ignore', sparse_output=False))]), categorical)
    ])
    model = LocalAIEngine()._create_model(kind, False, config['n_estimators'], config['max_depth'], config['learning_rate'], config['seed'])
    workers = int(config.get('workers', 2))
    if kind == 'catboost':
        model.set_params(allow_writing_files=False, thread_count=workers)
    elif 'n_jobs' in model.get_params():
        model.set_params(n_jobs=workers)
    if params:
        model.set_params(**params)
    return Pipeline([('prepare', prep), ('model', model)])


@dataclass
class Experiment:
    signature: str
    config: dict
    features: list
    dataset_hash: str
    id: str = field(default_factory=lambda: uuid.uuid4().hex[:12])
    models: dict = field(default_factory=dict)
    failures: dict = field(default_factory=dict)
    states: dict = field(default_factory=dict)
    winner: str = ''
    active: str = ''
    train_rows: list = field(default_factory=list)
    evaluation_rows: list = field(default_factory=list)
    folds: list = field(default_factory=list)
    X_dev: object = field(default=None, repr=False)
    y_dev: object = field(default=None, repr=False)
    X_final: object = field(default=None, repr=False)
    y_final: object = field(default=None, repr=False)
    cv: list = field(default_factory=list, repr=False)

    def select(self, name):
        if name not in self.models:
            raise ValueError('Modelo ajeno a esta ejecución')
        self.active = name

    def refresh_winner(self):
        self.winner = min(self.models, key=lambda k: self.models[k]['validation']['rmse']) if self.models else ''
        self.active = self.winner

    @property
    def result(self):
        return self.models[self.active]


def create_experiment(df, raw, features, config):
    allowed, _ = predictor_options(df)
    if not features or not set(features).issubset(allowed):
        raise ValueError('Selecciona predictores válidos.')
    if config.get('mode', 'quick') not in MODES:
        raise ValueError('Modo de entrenamiento desconocido.')
    if not 1 <= int(config.get('trials', 30)) <= 100:
        raise ValueError('El presupuesto debe estar entre 1 y 100 configuraciones.')
    y = pd.to_numeric(df[TARGET], errors='coerce').replace([np.inf, -np.inf], np.nan)
    clean = df.loc[y.notna()].copy()
    clean[TARGET] = y.loc[y.notna()]
    X = clean[features].replace([np.inf, -np.inf], np.nan)
    y = clean[TARGET]
    if len(clean) < 20:
        raise ValueError('Se requieren al menos 20 objetivos numéricos válidos.')
    dev, final = train_test_split(np.arange(len(clean)), test_size=config['test_size'], random_state=config['seed'])
    folds = list(KFold(n_splits=config['folds'], shuffle=True, random_state=config['seed']).split(dev))
    run = Experiment(fingerprint(raw, features, config), dict(config), list(features), hashlib.sha256(raw).hexdigest())
    run.train_rows = clean.index[dev].tolist()
    run.evaluation_rows = clean.index[final].tolist()
    run.folds = [(clean.index[dev[a]].tolist(), clean.index[dev[b]].tolist()) for a, b in folds]
    run.X_dev, run.y_dev = X.iloc[dev].copy(), y.iloc[dev].copy()
    run.X_final, run.y_final = X.iloc[final].copy(), y.iloc[final].copy()
    run.cv = folds
    run.states = {kind: 'pending' for kind in config['models']}
    return run


def candidate_parameters(X, kind, config):
    space = search_space(kind)
    defaults = make_pipeline(X, kind, config).named_steps['model'].get_params()
    base = {k: defaults[k] for k in space if k in defaults}
    candidates = [base]
    if config.get('mode', 'quick') != 'quick':
        count = int(config.get('trials', 30))
        if count == 1:
            return candidates
        for sampled in ParameterSampler(space, n_iter=count, random_state=config['seed']):
            if sampled not in candidates:
                candidates.append(sampled)
            if len(candidates) >= count:
                break
    return candidates


def fit_cv(X, y, splits, kind, config, params, tick, label):
    metrics = []
    for i, (a, b) in enumerate(splits):
        pipeline = make_pipeline(X, kind, config, params)
        pipeline.fit(X.iloc[a], y.iloc[a])
        metrics.append({'fold': i + 1, **scores(y.iloc[b], pipeline.predict(X.iloc[b]))})
        tick(f'{label} · partición {i + 1}/{len(splits)}')
    return metrics


def search_candidates(X, y, splits, kind, config, candidates, tick, stage, history):
    best = None
    base_metrics = None
    for i, params in enumerate(candidates):
        started = time.perf_counter()
        entry = {'stage': stage, 'trial': i + 1, 'params': params, 'status': 'completed'}
        try:
            metrics = fit_cv(X, y, splits, kind, config, params, tick, f'{stage} · configuración {i + 1}/{len(candidates)}')
            entry.update(average_scores(metrics))
            entry['rmse_std'] = float(np.std([m['rmse'] for m in metrics], ddof=1))
            if i == 0:
                base_metrics = metrics
            if best is None or entry['rmse'] < best[0]:
                best = (entry['rmse'], params, metrics)
        except Exception as exc:
            entry.update(status='failed', error=f'{type(exc).__name__}: {exc}')
        entry['seconds'] = time.perf_counter() - started
        history.append(entry)
    if best is None:
        raise ValueError(f'Todas las configuraciones fallaron en {stage}: {history[-1].get("error", "")}')
    return best[1], best[2], base_metrics


def training_fit_budget(config):
    folds = int(config['folds'])
    trials = 1 if config.get('mode', 'quick') == 'quick' else int(config.get('trials', 30))
    if config.get('mode') == 'rigorous':
        inner = int(config.get('inner_folds', 3))
        return folds * (trials * inner + 2) + trials * inner + 1
    return trials * folds + 1


def train_model_in_experiment(run, kind, progress=None):
    """Train one card atomically; keep other completed models in the same experiment."""
    if kind not in run.config['models']:
        raise ValueError('El algoritmo no pertenece a la configuración de esta ejecución.')
    run.models.pop(kind, None)
    run.failures.pop(kind, None)
    run.states[kind] = 'running'
    run.refresh_winner()
    started = time.perf_counter()
    history, nested_splits = [], []
    total, done = training_fit_budget(run.config), 0
    def tick(label):
        nonlocal done
        done += 1
        if progress:
            progress(min(done / total, .99), label)
    try:
        if kind not in available_models():
            raise ValueError('Algoritmo no disponible en este entorno')
        X, y, config = run.X_dev, run.y_dev, run.config
        mode = config.get('mode', 'quick')
        candidates = candidate_parameters(X, kind, config)
        if mode == 'rigorous':
            metrics, base_metrics = [], []
            for i, (a, b) in enumerate(run.cv):
                inner = list(KFold(n_splits=config.get('inner_folds', 3), shuffle=True, random_state=config['seed']).split(a))
                nested_splits.append({'outer_train': X.index[a].tolist(), 'outer_validation': X.index[b].tolist(), 'inner': [(X.index[a[ia]].tolist(), X.index[a[ib]].tolist()) for ia, ib in inner]})
                params, _, _ = search_candidates(X.iloc[a], y.iloc[a], inner, kind, config, candidates, tick, f'Externa {i + 1}', history)
                pipeline = make_pipeline(X, kind, config, params)
                pipeline.fit(X.iloc[a], y.iloc[a])
                metrics.append({'fold': i + 1, **scores(y.iloc[b], pipeline.predict(X.iloc[b]))})
                tick(f'Evaluación externa {i + 1}')
                baseline = make_pipeline(X, kind, config, candidates[0])
                baseline.fit(X.iloc[a], y.iloc[a])
                base_metrics.append({'fold': i + 1, **scores(y.iloc[b], baseline.predict(X.iloc[b]))})
                tick(f'Referencia base externa {i + 1}')
            final_inner = list(KFold(n_splits=config.get('inner_folds', 3), shuffle=True, random_state=config['seed']).split(X))
            params, _, _ = search_candidates(X, y, final_inner, kind, config, candidates, tick, 'Búsqueda final en desarrollo', history)
        else:
            params, metrics, base_metrics = search_candidates(X, y, run.cv, kind, config, candidates, tick, 'Validación de desarrollo', history)
        pipeline = make_pipeline(X, kind, config, params)
        pipeline.fit(X, y)
        tick('Ajuste final con todo el desarrollo')
        pred = pipeline.predict(run.X_final)
        run.models[kind] = {
            'pipeline': pipeline, 'folds': metrics, 'validation': average_scores(metrics),
            'evaluation': scores(run.y_final, pred), 'X_eval': run.X_final.copy(),
            'y_eval': run.y_final.to_numpy().copy(), 'prediction': pred, 'training_X': X.copy(),
            'mode': mode, 'best_params': params, 'search_history': history,
            'baseline_validation': average_scores(base_metrics) if base_metrics else None,
            'nested_splits': nested_splits, 'seconds': time.perf_counter() - started,
            'attempt_id': uuid.uuid4().hex[:12], 'fits_completed': done,
        }
        run.states[kind] = 'completed'
        if progress:
            progress(1., 'Entrenamiento completado')
    except Exception as exc:
        run.models.pop(kind, None)
        run.failures[kind] = f'{type(exc).__name__}: {exc}'
        run.states[kind] = 'failed'
    except BaseException:
        # Streamlit interruptions must never leave a green card or a stale result.
        run.models.pop(kind, None)
        run.states[kind] = 'interrupted'
        raise
    finally:
        run.refresh_winner()
    return run


def train_experiment(df, raw, features, config, progress=None):
    """Compatibility entry point for a complete batch using the same per-card trainer."""
    run = create_experiment(df, raw, features, config)
    for kind in config['models']:
        train_model_in_experiment(run, kind)
        if progress:
            progress(kind)
    return run
