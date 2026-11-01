"""Integration test: all five required algorithms must train on the SJL CSV."""
import io
import sys
import unittest
from pathlib import Path
import numpy as np
import pandas as pd
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from core.ai_experiment import DATASET_PATH, available_models, predictor_options, train_experiment

class RequiredAlgorithmsTests(unittest.TestCase):
    def test_all_five_estimators_train_without_fallback(self):
        expected = {
            'random_forest': 'RandomForestRegressor',
            'gnn': 'GradientBoostingRegressor',
            'xgboost': 'XGBRegressor',
            'lightgbm': 'LGBMRegressor',
            'catboost': 'CatBoostRegressor',
        }
        self.assertEqual(set(available_models()), set(expected))
        from streamlit.testing.v1 import AppTest
        from core.ai_experiment import LABELS
        app = AppTest.from_string('from views.ai_engine_view import render_ai_engine_view\nrender_ai_engine_view({}, \"test\")', default_timeout=60).run()
        self.assertFalse(app.exception)
        self.assertTrue(all(any(w.label == 'Entrenar ' + label for w in app.button) for label in LABELS.values()))
        raw = DATASET_PATH.read_bytes()
        df = pd.read_csv(io.BytesIO(raw), dtype={'manzana_id': str})
        features, _ = predictor_options(df)
        config = dict(models=list(expected), n_estimators=20, max_depth=3,
                      learning_rate=.05, test_size=.2, folds=3, seed=42)
        run = train_experiment(df, raw, features, config)
        self.assertFalse(run.failures, run.failures)
        self.assertEqual(set(run.models), set(expected))
        for name, result in run.models.items():
            with self.subTest(algorithm=name):
                run.select(name)
                self.assertEqual(type(result['pipeline'].named_steps['model']).__name__, expected[name])
                self.assertTrue(np.isfinite(result['evaluation']['rmse']))
                self.assertEqual(result['X_eval'].index.tolist(), run.evaluation_rows)
                predicted = run.result['pipeline'].predict(result['X_eval'].iloc[:3])
                np.testing.assert_allclose(predicted, result['prediction'][:3])
                print(f'{name}: RMSE={result["evaluation"]["rmse"]:.4f}; estimator={expected[name]}')
        self.assertEqual(run.winner, min(run.models, key=lambda k: run.models[k]['validation']['rmse']))

if __name__ == '__main__':
    unittest.main()
