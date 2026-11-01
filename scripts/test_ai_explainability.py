"""Regresiones para explicaciones basadas en los datos visibles del motor local.

Ejecutar: python -m unittest discover -s scripts -p test_ai_explainability.py
"""
import ast
import sys
import unittest
import tempfile
from pathlib import Path
from unittest.mock import patch

import numpy as np
import pandas as pd
from sklearn.dummy import DummyRegressor
from sklearn.metrics import mean_absolute_error, r2_score

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from core import explainability as xai
from core.statistical_testing import evaluate_model_statistics


def entry(model=None, cached=None):
    return {
        'id': 'test', 'algo_name': 'Test', 'raw_model_type': 'test',
        'target': 'target', 'features': ['x'],
        'cached_metrics': cached or {},
        'loaded_object': {'model': model, 'features': ['x']},
    }


class ExplanationTests(unittest.TestCase):
    def test_fit_uses_visible_points_not_fold_averages(self):
        with patch.object(xai, 'render_explainability_card') as render:
            xai.explain_ml_fit([1., 2., 3.], [2., 3., 4.], 'objetivo', .99, 50., 40.)
        args = render.call_args.kwargs
        self.assertIn('MAE = <b>1.00</b>', args['diagnosis'])
        self.assertIn('R² = <b>-0.5000</b>', args['diagnosis'])
        self.assertIn('+1.00', args['diagnosis'])
        self.assertNotIn('generalización sólida', str(args))

    def test_importance_normalizes_old_max_scaled_models(self):
        values = xai.normalize_feature_importance([{'name': 'a', 'val': 100}, {'name': 'b', 'val': 50}])
        self.assertAlmostEqual(sum(v['val'] for v in values), 100)
        self.assertAlmostEqual(values[0]['val'], 200/3)
        self.assertEqual(xai.normalize_feature_importance([{'val': 0}]), [])

    def test_scatter_same_column_and_constant_are_explained(self):
        df = pd.DataFrame({'x': [1., 1., 1.], 'y': [2., 3., 4.]})
        with patch.object(xai.st, 'info') as info:
            xai.explain_scatter(df, 'x', 'x')
            xai.explain_scatter(df, 'x', 'y')
        self.assertEqual(info.call_count, 2)

    def test_single_split_does_not_claim_cross_fold_stability(self):
        with patch.object(xai, 'render_explainability_card') as render:
            xai.explain_cv_folds([{'r2': -.5}])
        self.assertIn('única separación', render.call_args.kwargs['urban_context'])

    def test_histogram_uses_iqr_fences(self):
        with patch.object(xai, 'render_explainability_card') as render:
            xai.explain_histogram(pd.DataFrame({'x': [1., 2., 3., 4., 100.]}), 'x')
        self.assertIn('[-1.00, 7.00]', render.call_args.kwargs['diagnosis'])

    def test_missing_evaluation_does_not_generate_synthetic_samples(self):
        with self.assertRaisesRegex(ValueError, 'pares reales'):
            evaluate_model_statistics(entry())

    def test_null_targets_keep_prediction_alignment(self):
        model = DummyRegressor(strategy='constant', constant=3).fit([[0], [1]], [3., 3.])
        df = pd.DataFrame({'x': range(8), 'target': [1., np.nan, 3., 4., 5., 6., 7., 8.]})
        result = evaluate_model_statistics(entry(model), df)
        self.assertTrue(result['evaluated_on_live'])
        self.assertEqual(result['y_true'], [1., 3., 4., 5., 6., 7., 8.])
        self.assertAlmostEqual(result['mae'], round(mean_absolute_error(result['y_true'], result['y_pred']), 2))

    def test_cached_source_and_metrics_match_points(self):
        cached = {'y_true_sample': [1., 2., 3., 4., 5.], 'y_pred_sample': [2., 3., 4., 5., 6.]}
        result = evaluate_model_statistics(entry(cached=cached), pd.DataFrame({'other': [1]}))
        self.assertFalse(result['evaluated_on_live'])
        self.assertAlmostEqual(result['r2'], r2_score(cached['y_true_sample'], cached['y_pred_sample']))

    def test_training_saves_percentage_weights_and_live_category_schema(self):
        import joblib
        from core import ai_ml_models as ml
        df = pd.DataFrame({'x': np.arange(30, dtype=float), 'group': ['a', 'b', 'c'] * 10, 'target': np.arange(30, dtype=float) ** 1.5})
        with tempfile.TemporaryDirectory() as folder, patch.object(ml, 'MODELS_DIR', folder):
            engine = ml.LocalAIEngine()
            metrics = engine.train_on_custom_dataset(df, ['x', 'group'], 'target', n_estimators=10, use_kfold=False)
            self.assertAlmostEqual(sum(f['val'] for f in metrics['feature_importance']), 100)
            saved = joblib.load(engine.model_filepath)
            self.assertEqual(saved['categorical_levels']['group'], ['a', 'b', 'c'])
            model_entry = entry(cached=metrics)
            model_entry['loaded_object'] = saved
            subset = df.loc[df['group'] != 'a']
            result = evaluate_model_statistics(model_entry, subset)
            self.assertTrue(result['evaluated_on_live'])
            encoded = pd.get_dummies(df[['x', 'group']], drop_first=True).loc[subset.index]
            expected = engine.current_model.predict(engine.imputer.transform(encoded))
            np.testing.assert_allclose(result['y_pred'], expected)

    def test_classification_f1_is_not_accuracy_or_regression(self):
        cached = {'is_classification': True, 'y_true_sample': [0., 0., 0., 0., 1.], 'y_pred_sample': [0.] * 5}
        result = evaluate_model_statistics(entry(cached=cached))
        self.assertAlmostEqual(result['accuracy'], .8)
        self.assertNotEqual(result['f1'], result['accuracy'])
        self.assertNotIn('residuals', result)

    def test_diagnostic_cards_share_evaluation_source(self):
        cached = {'y_true_sample': [1., 2., 3., 4., 8.], 'y_pred_sample': [2., 3., 4., 5., 6.]}
        result = evaluate_model_statistics(entry(cached=cached))
        with patch.object(xai, 'render_explainability_card') as render:
            for kind in ['histogram', 'fitted', 'qq']:
                xai.explain_residual_diagnostic(result, kind)
        self.assertEqual(render.call_count, 3)
        for call in render.call_args_list:
            self.assertIn('muestra guardada de validación', call.args[2])

    def test_benchmark_separates_targets_and_evaluation_sources(self):
        df = pd.DataFrame([
            {'Variable Objetivo': 'precio', 'Evaluación': 'activo', 'R² Score': .8, 'Algoritmo': 'A', 'Archivo': 'a'},
            {'Variable Objetivo': 'densidad', 'Evaluación': 'activo', 'R² Score': .9, 'Algoritmo': 'B', 'Archivo': 'b'},
            {'Variable Objetivo': 'precio', 'Evaluación': 'guardado', 'R² Score': .99, 'Algoritmo': 'C', 'Archivo': 'c'},
        ])
        with patch.object(xai, 'render_explainability_card') as render:
            xai.explain_benchmark(df)
        self.assertEqual(render.call_count, 3)

    def test_every_local_chart_has_an_adjacent_explanation(self):
        source = (Path(__file__).resolve().parents[1] / 'views' / 'ai_engine_view.py').read_text(encoding='utf-8')
        tree = ast.parse(source)
        lines = source.splitlines()
        charts = [node for node in ast.walk(tree) if isinstance(node, ast.Call) and isinstance(node.func, ast.Name) and node.func.id == 'chart']
        self.assertGreaterEqual(len(charts), 10)
        for chart in charts:
            following = '\n'.join(lines[chart.lineno:chart.lineno + 3])
            self.assertTrue(any(token in following for token in ('st.caption(', 'st.write(')), f'Gráfico sin explicación cerca de línea {chart.lineno}')


if __name__ == '__main__':
    unittest.main()
