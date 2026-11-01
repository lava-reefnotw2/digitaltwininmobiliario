"""Validate export resolution, all chart types, and workbook data fidelity."""
import io
import sys
import unittest
from pathlib import Path
from types import SimpleNamespace

import numpy as np
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from PIL import Image
from openpyxl import load_workbook

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from core.ai_exports import publication_images, excel_bytes, experiment_tables


class ExportTests(unittest.TestCase):
    def test_all_ui_chart_types_and_resolution(self):
        frame = pd.DataFrame({'x': [1., 2., 3., 4.], 'y': [2., 3., 4., 6.], 'n': [5, 9, 7, 2]})
        scatter = px.scatter(frame, x='x', y='y', size='n', opacity=.4)
        scatter.add_trace(go.Scatter(x=[1, 4], y=[1, 4], mode='lines', name='Referencia'))
        figures = [scatter, px.histogram(frame, x='y', nbins=35),
                   px.bar(frame, x='x', y='y', error_y='x'),
                   px.line(frame, x='x', y='y', markers=True),
                   px.imshow(frame.corr(), zmin=-1, zmax=1)]
        for fig in figures:
            original = fig.to_json()
            images = publication_images(fig)
            self.assertEqual(fig.to_json(), original)
            for ext, data in images.items():
                with self.subTest(chart=fig.data[0].type, extension=ext), Image.open(io.BytesIO(data)) as image:
                    self.assertEqual(image.size, (3900, 2700))
                    for dpi in image.info['dpi']:
                        self.assertAlmostEqual(dpi, 600, delta=.1)
                    low, high = image.convert('L').getextrema()
                    self.assertLess(low, high)

    def test_workbook_separates_metrics_and_keeps_numeric_values(self):
        result = {'validation': {'rmse': 7., 'mae': 5., 'r2': .8},
            'evaluation': {'rmse': 9., 'mae': 6., 'r2': .7}, 'mode': 'quick',
            'folds': [{'fold': 1, 'rmse': 7.}], 'seconds': 1.5,
            'best_params': {'depth': 6}, 'search_history': [{'params': {'depth': 6}}],
            'y_eval': np.array([10., 20.]), 'prediction': np.array([11., 18.])}
        run = SimpleNamespace(models={'rf': result}, id='test', dataset_hash='hash',
            winner='rf', active='rf', train_rows=[0, 1, 2], evaluation_rows=[3, 4],
            features=['x'], config={'seed': 42}, states={'rf': 'completed'}, failures={})
        tables = experiment_tables(run, {'rf': 'Random Forest'})
        tables['Literal'] = pd.DataFrame({'texto': ['=1+1'], 'numero': [2.5]})
        book = load_workbook(io.BytesIO(excel_bytes(tables)))
        self.assertEqual(book['Validacion']['B2'].value, 7.)
        self.assertEqual(book['Prueba_final']['B2'].value, 9.)
        self.assertEqual(book['Predicciones']['E2'].value, -1.)
        self.assertEqual(book['Predicciones']['E3'].value, 2.)
        self.assertEqual(book['Literal']['A2'].data_type, 's')
        self.assertEqual(book['Literal']['B2'].data_type, 'n')
        self.assertEqual(book['Validacion'].freeze_panes, 'A2')


if __name__ == '__main__':
    unittest.main()
