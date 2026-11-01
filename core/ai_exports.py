"""Publication images and Excel reports from the current experiment, without fitting."""
import io
import json
import re

import numpy as np
import pandas as pd


def excel_bytes(tables):
    """Keep numeric cells numeric and untrusted strings literal (never formulas)."""
    output = io.BytesIO()
    with pd.ExcelWriter(output, engine='xlsxwriter', engine_kwargs={'options': {
        'strings_to_formulas': False, 'strings_to_urls': False,
    }}) as writer:
        for name, table in tables.items():
            frame = table.copy()
            for column in frame:
                frame[column] = frame[column].map(lambda v: json.dumps(v, ensure_ascii=False, default=str)
                    if isinstance(v, (dict, list, tuple)) else v)
            sheet = re.sub(r'[\[\]:*?/\\]', '_', name)[:31]
            frame.to_excel(writer, sheet_name=sheet, index=False)
            ws = writer.sheets[sheet]
            ws.freeze_panes(1, 0)
            if len(frame.columns):
                ws.autofilter(0, 0, len(frame), len(frame.columns) - 1)
                for i, col in enumerate(frame):
                    width = max([len(str(col))] + [len(str(v)) for v in frame[col].head(100)])
                    ws.set_column(i, i, min(55, max(14, width + 2)))
    return output.getvalue()


def experiment_tables(run, labels):
    validation, evaluation, folds, history, params, predictions, importance = [], [], [], [], [], [], []
    for kind, result in run.models.items():
        model = labels[kind]
        validation.append({'modelo': model, **result['validation'],
            'rmse_configuracion_base': (result.get('baseline_validation') or {}).get('rmse'),
            'segundos': result['seconds'], 'modo': result['mode']})
        evaluation.append({'modelo': model, **result['evaluation']})
        folds.extend({'modelo': model, **row} for row in result['folds'])
        history.extend({'modelo': model, **row} for row in result['search_history'])
        params.extend({'modelo': model, 'parametro': key, 'valor': value}
                      for key, value in result['best_params'].items())
        predictions.append(pd.DataFrame({'modelo': model, 'fila_csv': run.evaluation_rows,
            'referencia_simulada': result['y_eval'], 'prediccion': result['prediction'],
            'residuo': np.asarray(result['y_eval']) - np.asarray(result['prediction'])}))
        if 'permutation' in result:
            importance.append(result['permutation'].assign(modelo=model))
    metadata = {'ejecucion': run.id, 'dataset_sha256': run.dataset_hash,
        'ganador_validacion': labels[run.winner], 'modelo_activo': labels[run.active],
        'n_desarrollo': len(run.train_rows), 'n_prueba': len(run.evaluation_rows),
        'predictores': run.features, 'configuracion': run.config,
        'alcance': 'Objetivo sintético; USD/m² nominales. No son precios de mercado observados.',
        'seleccion': 'Ganador por RMSE de validación; prueba final separada.',
        'base': 'rmse_configuracion_base corresponde al modelo base, no a un predictor constante.'}
    tables = {'Metadatos': pd.DataFrame(metadata.items(), columns=['campo', 'valor']),
        'Validacion': pd.DataFrame(validation).sort_values('rmse'),
        'Prueba_final': pd.DataFrame(evaluation), 'Particiones': pd.DataFrame(folds),
        'Parametros': pd.DataFrame(params), 'Historial_busqueda': pd.DataFrame(history),
        'Predicciones': pd.concat(predictions, ignore_index=True),
        'Estado_modelos': pd.DataFrame([{'modelo': labels[k], 'estado': state,
            'error': run.failures.get(k, '')} for k, state in run.states.items()])}
    if importance:
        tables['Permutacion'] = pd.concat(importance, ignore_index=True)
    return tables


def publication_images(plotly_figure):
    """Rebuild supported UI traces as a white 6.5 × 4.5 inch, 600 dpi figure."""
    from matplotlib.figure import Figure
    from matplotlib.backends.backend_agg import FigureCanvasAgg
    fig = Figure(figsize=(6.5, 4.5), layout='constrained', facecolor='white')
    FigureCanvasAgg(fig)
    ax = fig.add_subplot()
    colors = ['#285878', '#a64d35', '#456d87']
    for i, trace in enumerate(plotly_figure.data):
        color = colors[i % len(colors)]
        label = trace.name if trace.showlegend is not False else None
        if trace.type == 'histogram':
            values = np.asarray(trace.x, dtype=float)
            ax.hist(values[np.isfinite(values)], bins=trace.nbinsx or 35,
                    color=color, edgecolor='white', linewidth=.5)
        elif trace.type in ('scatter', 'scattergl'):
            x, y = np.asarray(trace.x), np.asarray(trace.y)
            mode = trace.mode or 'markers'
            if 'lines' in mode:
                ax.plot(x, y, color=color, linewidth=1.2,
                        marker='o' if 'markers' in mode else None, markersize=4, label=label)
            else:
                size = trace.marker.size
                sizes = np.asarray(size, dtype=float) if size is not None else np.asarray(12.)
                if sizes.ndim and sizes.size and np.nanmax(sizes) > 0:
                    sizes = 65 * sizes / np.nanmax(sizes)
                opacity = trace.opacity if trace.opacity is not None else trace.marker.opacity
                opacity = float(opacity) if isinstance(opacity, (int, float)) else .5
                ax.scatter(x, y, s=sizes, alpha=opacity, color=color, edgecolors='none', label=label)
        elif trace.type == 'bar':
            error = trace.error_y.array
            ax.bar(trace.x, trace.y, color=color, yerr=error, capsize=3 if error is not None else 0)
            if len(trace.x) > 5:
                ax.tick_params(axis='x', labelrotation=65, labelsize=7)
        elif trace.type == 'heatmap':
            z = np.asarray(trace.z, dtype=float)
            im = ax.imshow(z, cmap='RdBu_r', vmin=-1, vmax=1, aspect='auto')
            ax.set_xticks(range(z.shape[1]), labels=list(trace.x), rotation=75, fontsize=6)
            ax.set_yticks(range(z.shape[0]), labels=list(trace.y), fontsize=6)
            fig.colorbar(im, ax=ax, shrink=.8)
        else:
            raise ValueError(f'Tipo de gráfico no soportado para publicación: {trace.type}')
    layout = plotly_figure.layout
    ax.set_xlabel(layout.xaxis.title.text or '')
    ax.set_ylabel(layout.yaxis.title.text or '')
    ax.set_title(layout.title.text or '', fontsize=10, wrap=True)
    ax.spines[['top', 'right']].set_visible(False)
    ax.tick_params(colors='#333333')
    handles, labels = ax.get_legend_handles_labels()
    if handles:
        ax.legend(frameon=False, fontsize=8)
    images = {}
    for extension in ('png', 'tiff'):
        output = io.BytesIO()
        options = {'pil_kwargs': {'compression': 'tiff_lzw'}} if extension == 'tiff' else {}
        fig.savefig(output, format=extension, dpi=600, facecolor='white', **options)
        images[extension] = output.getvalue()
    fig.clear()
    return images
