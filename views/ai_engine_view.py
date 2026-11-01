"""Local land-value workflow sharing one session experiment across all tabs."""
import io
import html
import json
import hashlib
import joblib
import numpy as np
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import streamlit as st
from scipy import stats
from sklearn.inspection import permutation_importance
from core.ai_experiment import DATASET_PATH, TARGET, LABELS, available_models, predictor_options, fingerprint, create_experiment, train_model_in_experiment, training_fit_budget, MODES
from core.ai_exports import publication_images, excel_bytes, experiment_tables


def chart(fig):
    st.plotly_chart(fig, use_container_width=True)
    identity = hashlib.sha256(fig.to_json().encode()).hexdigest()[:16]
    with st.expander('Descargar imagen para informe · 600 dpi'):
        st.caption('PNG y TIFF sin pérdida · 3900 × 2700 píxeles · 16,51 × 11,43 cm. Se reconstruye el gráfico con fondo blanco a partir de los mismos datos; no se vuelve a entrenar.')
        if st.button('Preparar imágenes', key=f'prepare_{identity}'):
            try:
                with st.spinner('Preparando imágenes a 600 dpi…'):
                    # Keep only the latest prepared chart to bound session memory.
                    st.session_state['ai_prepared_image'] = (identity, publication_images(fig))
            except Exception as exc:
                st.error(f'No se pudo exportar el gráfico: {exc}')
        prepared = st.session_state.get('ai_prepared_image')
        if prepared and prepared[0] == identity:
            for extension, mime in [('png', 'image/png'), ('tiff', 'image/tiff')]:
                st.download_button(f'Descargar {extension.upper()} · 600 dpi', prepared[1][extension],
                    f'grafico_{identity}_600dpi.{extension}', mime, key=f'image_{identity}_{extension}')


def excel_download(tables, filename, key, label='Descargar tabla en Excel'):
    try:
        st.download_button(label, excel_bytes(tables), filename,
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', key=key)
    except Exception as exc:
        st.error(f'No se pudo preparar el Excel: {exc}')


def model_card_html(kind, state, result=None):
    palette = {
        'pending': ('#182235', '#64748b', '○ Pendiente'),
        'running': ('#422f0c', '#f59e0b', '◷ Entrenando…'),
        'completed': ('#064e3b', '#34d399', '✓ Completado'),
        'failed': ('#450a0a', '#f87171', '✕ Falló · puedes reintentar'),
        'interrupted': ('#422f0c', '#f59e0b', '◷ Interrumpido · vuelve a entrenar'),
        'unavailable': ('#182235', '#64748b', 'Dependencia no disponible'),
    }
    background, border, label = palette.get(state, palette['pending'])
    details = ''
    if result:
        details = f"<p>RMSE validación: <b>{result['validation']['rmse']:.2f} USD/m²</b><br>Tiempo: {result['seconds']:.1f} s · {MODES[result['mode']]}</p>"
    return f'<div class="model-card model-card-{state}" style="background:{background};border:2px solid {border};border-radius:12px;padding:18px;min-height:154px;color:#f8fafc"><h3 style="margin:0;color:#f8fafc">{html.escape(LABELS[kind])}</h3><p style="color:{border};font-weight:700">{label}</p>{details}</div>'


def render_ai_engine_view(city, scenario_id):
    st.title('IA local · Estimación de valor del suelo')
    st.caption('Estimación experimental en USD/m². Conteos censales combinados con atributos simulados; el valor del suelo fue generado mediante una fórmula con ruido.')
    try:
        raw = DATASET_PATH.read_bytes()
        df = pd.read_csv(io.BytesIO(raw), dtype={'manzana_id': str})
        if TARGET not in df:
            raise ValueError(f'Falta la columna {TARGET}')
    except Exception as exc:
        st.error(f'No se pudo cargar el CSV de outputs: {exc}')
        return
    options, excluded = predictor_options(df)
    header = st.container()
    tabs = st.tabs(['1. Objetivo y dataset', '2. Análisis exploratorio', '3. Preparación y validación de datos', '4. Entrenamiento y comparación', '5. Evaluación del modelo', '6. Explicabilidad', '7. Pruebas estadísticas', '8. Estimación de valor del suelo', '9. Alertas tempranas'])
    with tabs[0]:
        st.subheader(f'Objetivo fijo: {TARGET} (USD/m²)')
        st.code(str(DATASET_PATH))
        st.write(f'{len(df):,} registros · {len(df.columns)} columnas · {df["manzana_id"].nunique() if "manzana_id" in df else "sin identificador"} manzanas distintas')
        st.info('Conteos censales: viviendas_inei, hogares_inei y poblacion_inei. El resto de atributos de modelado, incluido el objetivo, es simulado. Los identificadores y metadatos describen la fuente. No representa una tasación con precios de mercado observados.')
        units = {'valor_suelo_usd_m2': 'USD/m²', 'densidad_hab_ha': 'habitantes/ha', 'area_verde_per_capita_m2': 'm²/habitante', 'indice_vulnerabilidad_cenepred': 'índice 0–100', 'viviendas_inei': 'viviendas', 'hogares_inei': 'hogares', 'poblacion_inei': 'personas', 'antiguedad_construccion_anios': 'años'}
        st.dataframe(pd.DataFrame([{'campo': c, 'unidad': units.get(c, 'm' if c.endswith('_m') else 'm²' if '_m2' in c else '%' if c.endswith('_pct') else 'categoría / metadato'), 'procedencia': 'conteo censal' if c in {'viviendas_inei', 'hogares_inei', 'poblacion_inei'} else 'identificador / metadato' if c in {'manzana_id', 'distrito', 'ciudad', 'anio_censo', 'tipo_datos'} else 'simulado o derivado con atributos simulados'} for c in df]), hide_index=True)
        st.dataframe(df, use_container_width=True)
    with tabs[2]:
        st.subheader('Preparación reproducible')
        # Remove obsolete selections when the CSV schema changes.
        if 'ai_features' in st.session_state:
            st.session_state.ai_features = [c for c in st.session_state.ai_features if c in options]
        features = st.multiselect('Predictores', options, default=options, key='ai_features')
        st.dataframe(pd.DataFrame({'variable': df.columns, 'nulos': df.isna().sum().values, 'valores_distintos': df.nunique().values, 'exclusión': [excluded.get(c, '' if c in features else 'No seleccionado') for c in df]}), hide_index=True)
        y_valid = pd.to_numeric(df[TARGET], errors='coerce').replace([np.inf, -np.inf], np.nan)
        st.write(f'Duplicados exactos: {df.duplicated().sum()} · Objetivos inválidos excluidos: {y_valid.isna().sum()}')
        st.caption('Los duplicados se muestran para revisión y no se eliminan automáticamente. Los valores infinitos se tratan como ausentes. La imputación y la codificación categórica se ajustan exclusivamente con el entrenamiento de cada partición; el objetivo nunca se imputa.')
        test_size = st.slider('Fracción reservada para evaluación final', .1, .4, .2, .05)
        folds = st.selectbox('Particiones de validación cruzada', [3, 5], index=1)
        seed = st.number_input('Semilla de particiones', min_value=0, max_value=2147483647, value=42, step=1)
        st.info('Separación aleatoria: validación cruzada dentro del conjunto de desarrollo y evaluación final reservada. No es validación espacial. Consultar repetidamente la evaluación para ajustar parámetros puede sesgarla.')
    with tabs[3]:
        st.subheader('Panel de entrenamiento · cinco modelos')
        mode = st.radio('Modo de entrenamiento', list(MODES), index=1, format_func=lambda k: MODES[k], horizontal=True)
        mode_help = {
            'quick': 'Rápido: una configuración manual por algoritmo y validación cruzada. No realiza búsqueda de hiperparámetros.',
            'optimized': 'Optimizado: búsqueda aleatoria independiente por algoritmo, incluyendo la configuración base. Selección por RMSE medio de validación.',
            'rigorous': 'Riguroso: búsqueda dentro de cada partición externa. El ranking usa la evaluación externa; una búsqueda final en desarrollo elige los parámetros del pipeline definitivo.'
        }
        st.info(mode_help[mode])
        if mode != 'quick':
            trials = st.number_input('Configuraciones por búsqueda (incluye la base)', min_value=2, max_value=100, value=30, step=1)
        else:
            trials = 1
        inner_folds = st.selectbox('Particiones internas de búsqueda', [3, 5]) if mode == 'rigorous' else 3
        with st.expander('Configuración base y recursos', expanded=mode == 'quick'):
            n_estimators = st.slider('Número de árboles / iteraciones', 20, 300, 100, 20)
            max_depth = st.slider('Profundidad máxima', 2, 16, 8)
            learning_rate = st.number_input('Tasa de aprendizaje', min_value=.001, max_value=1., value=.05, format='%.3f')
            workers = st.select_slider('Hilos de CPU por entrenamiento', options=[1, 2, 4], value=2)
            st.caption('La configuración base limita Gradient Boosting a profundidad 6 y 200 iteraciones, y CatBoost a profundidad 8. La búsqueda utiliza sus propios rangos. Random Forest no utiliza tasa de aprendizaje. Los ajustes se ejecutan de forma secuencial con los hilos indicados.')
    models = list(LABELS)
    config = dict(models=models, mode=mode, trials=int(trials), inner_folds=inner_folds, workers=workers, n_estimators=n_estimators, max_depth=max_depth, learning_rate=learning_rate, test_size=test_size, folds=folds, seed=int(seed))
    signature = fingerprint(raw, features, config)
    run = st.session_state.get('ai_experiment')
    if run is not None and run.signature != signature:
        st.session_state.ai_experiment = None
        st.session_state.ai_invalidated = True
        run = None
    with tabs[3]:
        st.caption(f'Presupuesto por modelo: hasta {training_fit_budget(config):,} ajustes. Cada botón entrena solo ese modelo. Las tarjetas verdes corresponden a esta configuración y dataset.')
        missing = [LABELS[k] for k in models if k not in available_models()]
        if missing:
            st.warning('Faltan dependencias de ' + ', '.join(missing) + '. Instala requirements.txt en el entorno del servicio y reinícialo para habilitarlas.')
        requested = []
        card_slots, card_containers = {}, {}
        for offset in (0, 3):
            columns = st.columns(3 if offset == 0 else 2)
            for column, kind in zip(columns, models[offset:offset + (3 if offset == 0 else 2)]):
                with column:
                    card_container = st.container(border=True)
                    with card_container:
                        card_containers[kind] = card_container
                        state = run.states.get(kind, 'pending') if run else 'pending'
                        result_for_card = run.models.get(kind) if run else None
                        if kind not in available_models():
                            state = 'unavailable'
                        card_slots[kind] = st.empty()
                        card_slots[kind].markdown(model_card_html(kind, state, result_for_card), unsafe_allow_html=True)
                        if st.button(('Reentrenar ' if result_for_card else 'Entrenar ') + LABELS[kind], key=f'train_{kind}', disabled=not features or kind not in available_models(), use_container_width=True):
                            requested = [kind]
                        if result_for_card:
                            with st.expander('Parámetros y búsqueda'):
                                st.json(result_for_card['best_params'])
                                history = pd.DataFrame(result_for_card['search_history'])
                                history['params'] = history['params'].map(lambda value: json.dumps(value, ensure_ascii=False))
                                st.dataframe(history, hide_index=True)
                                st.download_button('Descargar historial', history.to_csv(index=False).encode(), f'busqueda_{run.id}_{kind}.csv', 'text/csv', key=f'history_{kind}')
                                excel_download({'Historial': history}, f'busqueda_{run.id}_{kind}.xlsx', f'history_excel_{kind}')
                        if run and kind in run.failures:
                            st.error(run.failures[kind])
        if st.button('Entrenar y comparar', type='primary', disabled=not features or not available_models()):
            requested = available_models()
        if requested:
            try:
                if run is None:
                    run = create_experiment(df, raw, features, config)
                    st.session_state.ai_experiment = run
                st.session_state.ai_invalidated = False
                for kind in requested:
                    card_slots[kind].markdown(model_card_html(kind, 'running'), unsafe_allow_html=True)
                    with card_containers[kind]:
                        progress_bar = st.progress(0., text='Preparando entrenamiento…')
                        def on_fit(fraction, message):
                            progress_bar.progress(fraction, text=message)
                        train_model_in_experiment(run, kind, progress=on_fit)
                    card_slots[kind].markdown(model_card_html(kind, run.states[kind], run.models.get(kind)), unsafe_allow_html=True)
                # A new successful training selects the current winner in every tab.
                st.session_state.pop(f'ai_active_{run.id}', None)
                st.rerun()
            except Exception as exc:
                st.error(f'No se pudo iniciar el entrenamiento: {exc}')
        if run:
            st.write(f'{len(run.models)} algoritmos completados; {len(run.failures)} fallidos; {sum(s == "pending" for s in run.states.values())} pendientes.')
            if run.models:
                ranking = pd.DataFrame([{'modelo': LABELS[k], **v['validation'], 'RMSE base': v['baseline_validation']['rmse'] if v['baseline_validation'] else None, 'segundos': round(v['seconds'], 1)} for k, v in run.models.items()]).sort_values('rmse')
                st.dataframe(ranking, hide_index=True)
                excel_download({'Validacion': ranking}, f'comparacion_{run.id}.xlsx', 'ranking_excel')
                chart(px.bar(ranking, x='modelo', y='rmse', title='RMSE medio de validación cruzada (USD/m²)'))
                st.caption(f'Ganador entre {len(run.models)} modelos completados: {LABELS[run.winner]}. Menor RMSE medio sobre particiones comunes. MAE en USD/m²; R² sin unidades. La evaluación final no interviene en el ranking.')
                if mode == 'optimized':
                    st.caption('El RMSE de búsqueda interviene en la selección y puede ser optimista. Consulta la evaluación final reservada para medir el desempeño del modelo elegido.')
                elif mode == 'rigorous':
                    st.caption('El ranking usa los pliegues externos de la validación anidada. Los mejores parámetros mostrados proceden de la búsqueda final en todo el conjunto de desarrollo.')
    with header:
        if run and run.models:
            key = f'ai_active_{run.id}'
            if st.button('Volver al ganador'):
                st.session_state[key] = run.winner
            selected = st.selectbox('Modelo activo para todas las pestañas', list(run.models), index=list(run.models).index(run.active), format_func=lambda k: LABELS[k], key=key)
            run.select(selected)
            st.write(f'Dataset: SJL ({run.dataset_hash[:10]}) · Ejecución: {run.id} · Ganador: {LABELS[run.winner]} · Activo: {LABELS[run.active]} · Evaluación final: {len(run.evaluation_rows)} registros')
        else:
            st.info('Resultados pendientes de reentrenamiento: cambiaron los datos o la configuración.' if st.session_state.get('ai_invalidated') else 'Sin modelo activo. Configura los predictores y entrena en la pestaña 4.')
    if run and run.models:
        with tabs[3]:
            payload = io.BytesIO()
            joblib.dump(run, payload)
            st.download_button('Exportar ejecución y pipelines', payload.getvalue(), f'ejecucion_{run.id}.joblib')
            excel_download(experiment_tables(run, LABELS), f'resultados_modelos_{run.id}.xlsx',
                'report_excel', 'Descargar reporte completo en Excel')
            st.caption('Excel: validación y prueba final en hojas separadas, particiones, parámetros, historial de búsqueda, predicciones y datos de la ejecución. Incluye los modelos completados de la configuración actual.')
    with tabs[1]:
        numeric = df[features + [TARGET]].select_dtypes(include='number').columns.tolist()
        variable = st.selectbox('Variable del histograma', numeric)
        values = df[variable].replace([np.inf, -np.inf], np.nan).dropna()
        chart(px.histogram(values, x=variable, nbins=35, title=f'Distribución de {variable}'))
        st.caption(f'{variable}: {len(values):,} observaciones válidas; mediana {values.median():.2f}; rango {values.min():.2f}–{values.max():.2f}.')
        x = st.selectbox('Variable explicativa de dispersión', numeric)
        points = df[[x, TARGET] if x != TARGET else [TARGET]].replace([np.inf, -np.inf], np.nan).dropna()
        chart(px.scatter(points, x=x, y=TARGET, opacity=.35))
        correlation = points[x].corr(points[TARGET]) if len(points) > 1 and points[x].nunique() > 1 and points[TARGET].nunique() > 1 else np.nan
        st.caption(f'{len(points):,} pares válidos; Pearson r = {correlation:.3f}. Asociación descriptiva; no demuestra causalidad. Comparar el objetivo consigo mismo produce identidad.')
        chart(px.imshow(df[numeric].corr(), zmin=-1, zmax=1, color_continuous_scale='RdBu_r', title='Correlación de Pearson · predictores numéricos seleccionados y objetivo'))
        st.caption('Correlaciones por pares completos; las variables categóricas no participan. Una correlación alta no demuestra causalidad.')
    ready = run is not None and bool(run.models)
    if ready:
        result = run.result
        actual, pred = result['y_eval'], result['prediction']
        residual = actual - pred
        evaluated = pd.DataFrame({'real': actual, 'predicho': pred, 'residuo': residual}, index=run.evaluation_rows)
    for idx in [4, 5, 6, 7]:
        if not ready:
            with tabs[idx]:
                st.info('No hay resultados válidos de la ejecución actual. Entrena en la pestaña 4.')
    if ready:
        with tabs[4]:
            st.subheader(f'Evaluación · {LABELS[run.active]}')
            st.dataframe(pd.DataFrame(result['folds']), hide_index=True)
            excel_download({'Particiones': pd.DataFrame(result['folds']),
                'Prueba_final': pd.DataFrame([result['evaluation']]),
                'Predicciones': evaluated.rename(columns={'real': 'referencia_simulada'}).rename_axis('fila_csv').reset_index()},
                f'evaluacion_{run.id}_{run.active}.xlsx', 'evaluation_excel', 'Descargar evaluación en Excel')
            chart(px.line(pd.DataFrame(result['folds']), x='fold', y='rmse', markers=True, title='RMSE por partición de validación'))
            st.write(f'Desviación del RMSE entre particiones: {np.std([m["rmse"] for m in result["folds"]], ddof=1):.2f} USD/m².')
            st.caption('Cada punto evalúa una búsqueda completa en una partición externa que no participó en esa búsqueda. El pipeline final usa los parámetros de la búsqueda en todo el desarrollo.' if result['mode'] == 'rigorous' else 'Cada punto usa un pipeline ajustado sin los registros de su partición de validación. En modo Optimizado, estas métricas también seleccionaron los hiperparámetros y pueden ser optimistas.')
            st.write('Evaluación final reservada, fuera del ajuste y de la selección automática:', result['evaluation'])
            st.caption('Usar repetidamente esta evaluación para decidir cambios puede sesgarla; una comparación definitiva requiere mantenerla fuera de esas decisiones.')
            fig = px.scatter(evaluated, x='real', y='predicho', opacity=.4)
            limits = [float(min(actual.min(), pred.min())), float(max(actual.max(), pred.max()))]
            fig.add_trace(go.Scatter(x=limits, y=limits, mode='lines', name='Ajuste perfecto'))
            chart(fig)
            st.caption(f'{len(actual)} registros reservados. RMSE {result["evaluation"]["rmse"]:.2f}, MAE {result["evaluation"]["mae"]:.2f} USD/m²; R² {result["evaluation"]["r2"]:.3f}. Métricas calculadas sobre estos mismos puntos.')
            st.download_button('Descargar predicciones de evaluación', evaluated.to_csv(index_label='fila_csv').encode(), f'evaluacion_{run.id}_{run.active}.csv', 'text/csv')
        with tabs[5]:
            model = result['pipeline'].named_steps['model']
            if hasattr(model, 'feature_importances_'):
                names = result['pipeline'].named_steps['prepare'].get_feature_names_out()
                importance = pd.DataFrame({'variable': names, 'importancia': model.feature_importances_}).sort_values('importancia', ascending=False)
                chart(px.bar(importance, x='variable', y='importancia', title='Importancia interna del estimador'))
                excel_download({'Importancia': importance}, f'importancia_{run.id}_{run.active}.xlsx', 'importance_excel')
                st.write('Variables con mayor importancia interna: ' + ', '.join(importance.head(3).variable.tolist()))
                st.caption('Método interno del algoritmo: reducción de impureza/ganancia o importancia propia de CatBoost; categorías codificadas por separado. No implica causalidad ni es comparable directamente entre algoritmos.')
            if st.button('Calcular importancia por permutación'):
                with st.spinner('Permutando variables sobre la evaluación final…'):
                    imp = permutation_importance(result['pipeline'], result['X_eval'], actual, scoring='neg_root_mean_squared_error', n_repeats=5, random_state=run.config['seed'])
                    result['permutation'] = pd.DataFrame({'variable': run.features, 'aumento_rmse': imp.importances_mean, 'desviación': imp.importances_std})
            if 'permutation' in result:
                chart(px.bar(result['permutation'].sort_values('aumento_rmse', ascending=False), x='variable', y='aumento_rmse', error_y='desviación'))
                excel_download({'Permutacion': result['permutation']}, f'permutacion_{run.id}_{run.active}.xlsx', 'permutation_excel')
                st.caption('Aumento del RMSE en USD/m² al permutar cada predictor original (5 repeticiones). Mayor aumento indica mayor dependencia predictiva; variables correlacionadas pueden compartir importancia. Este diagnóstico no cambia el ganador.')
        with tabs[6]:
            st.caption(f'Mismos {len(actual)} registros de evaluación y predicciones del modelo activo. Residuo = real − predicho; positivo significa subestimación.')
            chart(px.histogram(evaluated, x='residuo', nbins=35, title='Distribución de residuos'))
            st.write(f'Sesgo medio: {residual.mean():.2f} USD/m² · Desviación: {residual.std(ddof=1):.2f} USD/m²')
            residual_plot = px.scatter(evaluated, x='predicho', y='residuo', opacity=.4,
                title='Residuos frente a predicciones', labels={'predicho': 'Predicción (USD/m², escala simulada)',
                    'residuo': 'Referencia simulada − predicción (USD/m²)'})
            residual_plot.add_trace(go.Scatter(x=[float(pred.min()), float(pred.max())],
                y=[0, 0], mode='lines', name='Error cero'))
            chart(residual_plot)
            st.caption('La concentración alrededor de cero y la amplitud del error permiten inspeccionar sesgo y varianza; no prueban independencia territorial.')
            (theoretical, ordered), (slope, intercept, _) = stats.probplot(residual, dist='norm')
            qq = px.scatter(x=theoretical, y=ordered, labels={'x': 'Cuantiles normales teóricos', 'y': 'Residuos ordenados'}, title='Q-Q de residuos')
            qq.add_trace(go.Scatter(x=theoretical, y=intercept + slope * theoretical,
                mode='lines', name='Recta de referencia'))
            chart(qq)
            st.caption('Desviaciones de una línea recta sugieren residuos no normales; las colas permiten observar errores extremos.')
            test = stats.normaltest(residual) if len(residual) >= 8 and residual.std() > 0 else None
            if test:
                st.write(f'Normalidad D’Agostino-Pearson: estadístico {test.statistic:.3f}; p={test.pvalue:.4g}.')
                st.caption('p < 0.05 es evidencia contra normalidad; p ≥ 0.05 no la demuestra. La normalidad no es un requisito para usar modelos de árboles; estos diagnósticos no certifican aptitud para tasación.')
            bins = evaluated.groupby(pd.qcut(evaluated.predicho, 10, duplicates='drop'), observed=True).agg(real=('real', 'mean'), predicho=('predicho', 'mean'), n=('real', 'size'))
            calibration = px.scatter(bins, x='predicho', y='real', size='n', title='Calibración por deciles de predicción')
            calibration.add_trace(go.Scatter(x=limits, y=limits, mode='lines', name='Calibración perfecta'))
            chart(calibration)
            excel_download({'Residuos': evaluated.rename(columns={'real': 'referencia_simulada'}).rename_axis('fila_csv').reset_index(),
                'Deciles': bins.rename(columns={'real': 'referencia_simulada'}).reset_index(drop=True),
                'Normalidad': pd.DataFrame([{'prueba': 'D’Agostino-Pearson',
                    'estadistico': float(test.statistic) if test else None,
                    'p': float(test.pvalue) if test else None}])},
                f'diagnosticos_{run.id}_{run.active}.xlsx', 'diagnostics_excel', 'Descargar diagnósticos en Excel')
            st.caption('Cada punto compara las medias real y predicha dentro de un decil; el tamaño indica el número de registros.')
        with tabs[7]:
            st.caption(f'Pipeline de {LABELS[run.active]} · ejecución {run.id}. Se conservan imputación, categorías y orden de predictores.')
            inputs = {}
            with st.form(f'inference_{run.id}_{run.active}'):
                for c in run.features:
                    series = result['training_X'][c].dropna()
                    if pd.api.types.is_numeric_dtype(result['training_X'][c]):
                        inputs[c] = st.number_input(c, value=float(series.median()) if len(series) else 0.)
                    else:
                        inputs[c] = st.selectbox(c, series.unique().tolist() or ['Sin dato'])
                submitted = st.form_submit_button('Estimar USD/m²')
            if submitted:
                value = float(result['pipeline'].predict(pd.DataFrame([inputs], columns=run.features))[0])
                st.metric('Estimación experimental (USD/m²)', f'{value:,.2f}')
                st.json(inputs)
                outside = [c for c in run.features if pd.api.types.is_numeric_dtype(result['training_X'][c]) and not result['training_X'][c].min() <= inputs[c] <= result['training_X'][c].max()]
                if outside:
                    st.warning('Entradas fuera del rango de entrenamiento: ' + ', '.join(outside))
                st.info('Aprende un objetivo simulado. No sustituye una tasación ni incluye un intervalo de incertidumbre validado.')
    with tabs[8]:
        st.subheader('Alertas territoriales basadas en reglas')
        st.caption('Reglas exploratorias sobre atributos simulados del CSV; independientes del estimador. Los umbrales no constituyen diagnóstico de riesgo certificado.')
        for c, threshold, above in [('pendiente_terreno_pct', 30., True), ('distancia_salud_m', 1000., True), ('area_verde_per_capita_m2', 1.5, False)]:
            if c in df:
                mask = df[c] > threshold if above else df[c] < threshold
                st.write(f'{c} {">" if above else "<"} {threshold}: {int(mask.sum())} registros afectados; {int(df[c].isna().sum())} sin dato.')
                with st.expander(f'Datos que sustentan la regla: {c}'):
                    st.dataframe(df.loc[mask, [k for k in ['manzana_id', c] if k in df]])
        st.subheader('Alertas del estimador')
        if ready:
            cutoff = 2 * result['evaluation']['rmse']
            flagged = evaluated.loc[evaluated.residuo.abs() > cutoff]
            st.write(f'Error absoluto > 2 × RMSE final ({cutoff:.2f} USD/m²): {len(flagged)} registros de evaluación.')
            st.dataframe(flagged)
            st.caption('Regla descriptiva del error observado, no intervalo predictivo ni alerta territorial.')
        else:
            st.info('Sin evaluación actual para calcular alertas del estimador.')
