"""Regression checks for session experiments and the Streamlit workflow."""
import sys
import unittest
from pathlib import Path
from unittest.mock import patch
import numpy as np
import pandas as pd
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from core.ai_experiment import train_experiment, predictor_options, fingerprint, TARGET, DATASET_PATH

CONFIG = dict(models=['random_forest', 'gnn'], n_estimators=20, max_depth=3, learning_rate=.05, test_size=.2, folds=3, seed=42)

class ExperimentTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.df = pd.DataFrame({'manzana_id': range(80), 'constant': 1, 'x': np.arange(80, dtype=float), 'category': ['a', 'b'] * 40, TARGET: np.arange(80) * 2. + 3})
        cls.df.loc[::7, 'x'] = np.nan
        cls.raw = cls.df.to_csv(index=False).encode()
        cls.experiment = train_experiment(cls.df, cls.raw, ['x', 'category'], CONFIG)

    def test_partitions_are_disjoint_and_shared(self):
        r = self.experiment
        self.assertFalse(set(r.train_rows) & set(r.evaluation_rows))
        for train, validation in r.folds:
            self.assertFalse(set(train) & set(validation))
            self.assertFalse(set(train + validation) & set(r.evaluation_rows))
        for result in r.models.values():
            self.assertEqual(result['X_eval'].index.tolist(), r.evaluation_rows)
            np.testing.assert_allclose(result['prediction'], result['pipeline'].predict(result['X_eval']))
            median = self.df.loc[r.train_rows, 'x'].median()
            self.assertEqual(result['pipeline'].named_steps['prepare'].named_transformers_['numeric'].statistics_[0], median)

    def test_selection_and_fingerprints(self):
        r = self.experiment
        winner = min(r.models, key=lambda k: r.models[k]['validation']['rmse'])
        self.assertEqual(r.winner, winner)
        for name in r.models:
            r.select(name)
            self.assertIs(r.result, r.models[name])
        r.select(r.winner)
        with self.assertRaises(ValueError):
            r.select('historical')
        self.assertNotEqual(r.signature, fingerprint(self.raw + b'\n', r.features, CONFIG))
        self.assertNotEqual(r.signature, fingerprint(self.raw, r.features, {**CONFIG, 'seed': 43}))
        self.assertNotIn('manzana_id', predictor_options(self.df)[0])
        self.assertNotIn('constant', predictor_options(self.df)[0])

    def test_failed_model_does_not_discard_success_or_use_fallback(self):
        r = train_experiment(self.df, self.raw, ['x'], {**CONFIG, 'models': ['random_forest', 'missing']})
        self.assertEqual(list(r.models), ['random_forest'])
        self.assertIn('missing', r.failures)
        self.assertEqual(r.active, 'random_forest')

    def test_fold_imputation_is_fitted_only_on_training_rows(self):
        from sklearn.impute import SimpleImputer
        seen = []
        original = SimpleImputer.fit
        def record(imputer, X, y=None):
            if isinstance(X, pd.DataFrame) and 'x' in X:
                seen.append(X.index.tolist())
            return original(imputer, X, y)
        with patch.object(SimpleImputer, 'fit', record):
            run = train_experiment(self.df, self.raw, ['x'], {**CONFIG, 'models': ['random_forest']})
        self.assertEqual(seen, [train for train, validation in run.folds] + [run.train_rows])

    def test_view_shared_selection_and_invalidation(self):
        from streamlit.testing.v1 import AppTest
        app = AppTest.from_string('from views.ai_engine_view import render_ai_engine_view\nrender_ai_engine_view({}, "test")', default_timeout=120)
        app.run()
        self.assertEqual(len(app.exception), 0)
        self.assertEqual(len(app.tabs), 9)
        next(item for item in app.radio if item.label == 'Modo de entrenamiento').set_value('quick')
        for item in app.slider:
            if item.label == 'Número de árboles / iteraciones': item.set_value(20)
        for item in app.selectbox:
            if item.label == 'Particiones de validación cruzada': item.set_value(3)
        app.run()
        next(b for b in app.button if b.label == 'Entrenar y comparar').click().run()
        self.assertEqual(len(app.exception), 0)
        run = app.session_state['ai_experiment']
        self.assertEqual(run.active, run.winner)
        other = next(k for k in run.models if k != run.winner)
        next(s for s in app.selectbox if s.label.startswith('Modelo activo')).set_value(other).run()
        self.assertEqual(app.session_state['ai_experiment'].active, other)
        self.assertEqual(len(app.exception), 0)
        next(b for b in app.button if b.label == 'Volver al ganador').click().run()
        self.assertEqual(app.session_state['ai_experiment'].active, run.winner)
        next(s for s in app.slider if s.label == 'Profundidad máxima').set_value(4).run()
        self.assertIsNone(app.session_state['ai_experiment'])
        self.assertEqual(len(app.exception), 0)
        next(b for b in app.button if b.label == 'Entrenar y comparar').click().run()
        self.assertEqual(len(app.exception), 0)
        fresh = app.session_state['ai_experiment']
        self.assertNotEqual(fresh.id, run.id)
        self.assertEqual(fresh.active, fresh.winner)
        next(b for b in app.button if b.label == 'Calcular importancia por permutación').click().run()
        self.assertIn('permutation', app.session_state['ai_experiment'].result)
        next(b for b in app.button if b.label == 'Estimar USD/m²').click().run()
        self.assertEqual(len(app.exception), 0)
        self.assertTrue(any(m.label == 'Estimación experimental (USD/m²)' for m in app.metric))
        from tempfile import TemporaryDirectory
        with TemporaryDirectory() as folder:
            source = Path(folder) / 'changed.csv'
            source.write_bytes(DATASET_PATH.read_bytes() + b'\n')
            with patch('views.ai_engine_view.DATASET_PATH', source):
                app.run()
                self.assertIsNone(app.session_state['ai_experiment'])
                self.assertEqual(len(app.exception), 0)

if __name__ == '__main__':
    unittest.main()

