"""Search isolation, nested validation, and independent model-card regressions."""
import sys
import unittest
from pathlib import Path
from unittest.mock import patch
import numpy as np
import pandas as pd
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from core.ai_experiment import (create_experiment, train_model_in_experiment, train_experiment,
                               LABELS, TARGET, search_space, candidate_parameters)

BASE = dict(models=list(LABELS), n_estimators=20, max_depth=3, learning_rate=.05,
            test_size=.2, folds=3, inner_folds=3, seed=42, trials=2, workers=1)

# Keep integration searches small while exercising real estimator parameters.
REAL_SPACES = {kind: search_space(kind) for kind in LABELS}
def small_space(kind):
    space = dict(REAL_SPACES[kind])
    space['iterations' if kind == 'catboost' else 'n_estimators'] = [12]
    return space

class TrainingModesTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        rng = np.random.default_rng(7)
        cls.df = pd.DataFrame({'x': rng.normal(size=100), 'category': ['a', 'b'] * 50})
        cls.df[TARGET] = 100 + 5 * cls.df.x + rng.normal(size=100)
        cls.df.loc[::9, 'x'] = np.nan
        cls.raw = cls.df.to_csv(index=False).encode()

    def test_all_five_algorithms_in_both_search_modes(self):
        with patch('core.ai_experiment.search_space', side_effect=small_space):
            for mode in ['optimized', 'rigorous']:
                run = train_experiment(self.df, self.raw, ['x', 'category'], {**BASE, 'mode': mode})
                self.assertFalse(run.failures, run.failures)
                self.assertEqual(set(run.models), set(LABELS))
                for name, result in run.models.items():
                    self.assertEqual(run.states[name], 'completed')
                    self.assertEqual(result['mode'], mode)
                    self.assertTrue(result['best_params'])
                    self.assertTrue(np.isfinite(result['evaluation']['rmse']))
                    self.assertEqual(len(result['search_history']), 2 if mode == 'optimized' else 8)
                    self.assertTrue(all(row['status'] == 'completed' for row in result['search_history']))
                    np.testing.assert_allclose(result['pipeline'].predict(run.X_final), result['prediction'])
                    for split in result['nested_splits']:
                        external = set(split['outer_validation']) | set(run.evaluation_rows)
                        for a, b in split['inner']:
                            self.assertFalse(set(a) & set(b))
                            self.assertFalse((set(a) | set(b)) & external)
                            self.assertTrue((set(a) | set(b)).issubset(split['outer_train']))

    def test_final_targets_cannot_influence_search_or_predictions(self):
        with patch('core.ai_experiment.search_space', side_effect=small_space):
            for mode in ['optimized', 'rigorous']:
                config = {**BASE, 'models': ['random_forest'], 'mode': mode}
                run = train_experiment(self.df, self.raw, ['x'], config)
                changed = self.df.copy()
                changed.loc[run.evaluation_rows, TARGET] += 100000
                other = train_experiment(changed, changed.to_csv(index=False).encode(), ['x'], config)
                self.assertEqual(run.result['best_params'], other.result['best_params'])
                self.assertEqual(run.result['validation'], other.result['validation'])
                np.testing.assert_allclose(run.result['prediction'], other.result['prediction'])
                self.assertNotEqual(run.result['evaluation'], other.result['evaluation'])

    def test_individual_retry_preserves_other_models_and_clears_failure(self):
        run = create_experiment(self.df, self.raw, ['x'], {**BASE, 'mode': 'quick'})
        train_model_in_experiment(run, 'random_forest')
        saved = run.models['random_forest']
        train_model_in_experiment(run, 'gnn')
        with patch('core.ai_experiment.make_pipeline', side_effect=RuntimeError('Intentional failure')):
            train_model_in_experiment(run, 'gnn')
        self.assertNotIn('gnn', run.models)
        self.assertEqual(run.states['gnn'], 'failed')
        self.assertIs(run.models['random_forest'], saved)
        self.assertEqual(run.winner, 'random_forest')
        train_model_in_experiment(run, 'gnn')
        self.assertNotIn('gnn', run.failures)
        self.assertEqual(run.states['gnn'], 'completed')
        self.assertIs(run.models['random_forest'], saved)
        self.assertEqual(run.active, run.winner)

    def test_interruption_never_leaves_completed_results(self):
        run = create_experiment(self.df, self.raw, ['x'], {**BASE, 'mode': 'quick'})
        def stop_at_completion(fraction, label):
            if fraction == 1:
                raise KeyboardInterrupt()
        with self.assertRaises(KeyboardInterrupt):
            train_model_in_experiment(run, 'random_forest', stop_at_completion)
        self.assertNotIn('random_forest', run.models)
        self.assertEqual(run.states['random_forest'], 'interrupted')
        self.assertEqual(run.winner, '')

    def test_ui_cards_finish_green_independently_and_invalidate_on_mode_change(self):
        from streamlit.testing.v1 import AppTest
        app = AppTest.from_string('from views.ai_engine_view import render_ai_engine_view\nrender_ai_engine_view({}, "test")', default_timeout=120).run()
        next(w for w in app.radio if w.label == 'Modo de entrenamiento').set_value('quick')
        next(w for w in app.slider if w.label == 'Número de árboles / iteraciones').set_value(20)
        next(w for w in app.slider if w.label == 'Profundidad máxima').set_value(3)
        next(w for w in app.selectbox if w.label == 'Particiones de validación cruzada').set_value(3)
        app.run()
        app.button(key='train_random_forest').click().run()
        self.assertFalse(app.exception)
        run = app.session_state['ai_experiment']
        first_id, first_attempt = run.id, run.models['random_forest']['attempt_id']
        def green_cards():
            return [w.value for w in app.markdown if 'model-card-completed' in w.value]
        self.assertEqual(len(green_cards()), 1)
        self.assertIn('#064e3b', green_cards()[0])
        app.button(key='train_gnn').click().run()
        self.assertFalse(app.exception)
        run = app.session_state['ai_experiment']
        self.assertEqual(run.id, first_id)
        self.assertEqual(run.models['random_forest']['attempt_id'], first_attempt)
        self.assertEqual(len(green_cards()), 2)
        next(w for w in app.radio if w.label == 'Modo de entrenamiento').set_value('optimized').run()
        self.assertIsNone(app.session_state['ai_experiment'])
        self.assertEqual(len(green_cards()), 0)
        next(w for w in app.number_input if w.label == 'Configuraciones por búsqueda (incluye la base)').set_value(2)
        with patch('core.ai_experiment.search_space', side_effect=small_space):
            app.button(key='train_random_forest').click().run()
        self.assertFalse(app.exception)
        self.assertEqual(len(green_cards()), 1)
        self.assertEqual(app.session_state['ai_experiment'].result['mode'], 'optimized')
        self.assertEqual(len(app.session_state['ai_experiment'].result['search_history']), 2)

if __name__ == '__main__':
    unittest.main()
