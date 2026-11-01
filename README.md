# 🏙️ Gemelo Digital Comunitario — Vivienda Social y Hábitat Popular

Plataforma integral de **co-diseño espacial, modelado 3D, simulación participativa y aprendizaje automático** para proyectos de vivienda social, urbanismo táctico y mejoramiento de hábitats populares en América Latina.

> **Stack Tecnológico:** Migrado a **Python** y **Streamlit**, integrando **Three.js** para visualización 3D orográfica y consumiendo los motores de Inteligencia Artificial (ML/DL) **directamente en memoria (in-process) sin intermediación de FastAPI**.

---

## ✨ Características Principales (100% Preservadas)

### 🗺️ 1. Gemelo Digital 3D & Cartografía GIS 2D (Three.js en Streamlit)
- **Visualización 3D Interactiva con Three.js:** Terreno orográfico adaptativo modelado para ciudades piloto (Lima - Quebrada Huáscar / San Juan de Lurigancho, Arequipa - Cono Norte, Trujillo - Alto Trujillo).
- **Cartografía GIS 2D:** Visualización cartográfica con capas de radiación solar, isócronas de 15 minutos, zonas de riesgo CENEPRED y zonificación comunitaria.
- **Simulación Solar Diurna / Nocturna:** Controles interactivos de ángulo de azimut (0° a 360°) y elevación solar (5° a 90°) para estudio dinámico de asoleamiento y sombras proyectadas.
- **Sistema Vial Interactivo:** Trazado de vías adaptadas al relieve, cálculo de huella en m², sardineles de contención y presupuesto estimado.

### 🧠 2. Motores de Inteligencia Artificial & Entrenamiento con Datasets Reales (¡Sin FastAPI!)
- **Consumo Directo en Python:** Modelos de Machine Learning entrenados y ejecutados en memoria local con `scikit-learn`, `xgboost`, `lightgbm` y `catboost`, eliminando dependencias, latencia y puertos de microservicios externos como FastAPI.
- **Entrenamiento con Datasets Reales:**
  - **Carga de Archivos Reales:** Soporte directo para arrastrar y soltar datasets en formatos **CSV, Excel (.xlsx/.xls) y GeoJSON**.
  - **Dataset Oficial de Referencia:** Base censal geo-referenciada de manzanas urbanas con indicadores de INEI, CENEPRED y ONU-Hábitat para Lima (San Juan de Lurigancho), Arequipa y Trujillo.
  - **Plantilla Descargable:** Opción de descargar la plantilla CSV oficial para completar con datos propios de cualquier municipio o territorio.
  - **Mapeo Dinámico de Variables:** Selector interactivo de la variable objetivo (*Target*) a predecir y multiselección de variables predictoras (*Features*), con codificación One-Hot automática para variables categóricas (estrato, materiales, etc.) e imputación de nulos.
- **Algoritmos Soportados:**
  - *Random Forest* (Ensemble con árboles paralelos).
  - *XGBoost* (Extreme Gradient Boosting con GPU/CPU).
  - *LightGBM* (Gradient Boosting optimizado por hojas).
  - *CatBoost* (Boosting categórico de alta precisión).
  - *Gradient Boosting Espacial* (Proxy GNN con topología territorial).
- **Métricas Reales & Gráficos de Ajuste:**
  - Cálculo de $R^2$, RMSE, MAE y F1-Score / Accuracy mediante validación cruzada 5-Fold o Train/Test Split.
  - Gráfico interactivo de dispersión: **Valores Reales vs. Predichos** con línea de 45°.
  - **Importancia de Variables (Feature Importance):** Identificación visual de los factores de mayor impacto sobre tu dataset real.
  - *Exportación:* Descarga del modelo entrenado en formato serializado `.joblib`.
- **Módulo de Pruebas Estadísticas & Auditoría de Modelos Entrenados (Pestaña 8):**
  - **Dropdown de Modelos Entrenados:** Selección dinámica de cualquier modelo serializado `.joblib` en `trained_models/` o generado en sesión.
  - **Métricas de Rendimiento:** $R^2$, RMSE, MAE, MAPE (%), correlación de Pearson ($r$ y p-valor) y varianza explicada.
  - **Batería de Pruebas de Hipótesis:**
    - *Test de Normalidad (Shapiro-Wilk / Jarque-Bera):* Validación de distribución gaussiana en residuos.
    - *Test de Homocedasticidad (Breusch-Pagan / Spearman):* Verificación de varianza constante del error.
    - *Test de Autocorrelación (Durbin-Watson):* Independencia estocástica de errores espaciales.
    - *Test de Insesgadez (Student's t-test):* Verificación de media de error $\mu_e = 0$.
    - *Intervalos de Confianza al 95%:* Estimación de margen de error $\pm 1.96 \cdot SE$.
  - **Gráficos Diagnósticos Interactivos:** Histograma de residuos con curva KDE normal, Residuos vs. Fitted, Q-Q Plot normal y Calibración Real vs. Predicho.
  - **Cross-Model Benchmark:** Tabla comparativa y ranking de $R^2$ entre todos los modelos guardados.
- **Inferencia Predictiva en Vivo:** Simulador interactivo que adapta automáticamente sus entradas a las variables reales del modelo entrenado.
- **Alertas Tempranas Automáticas:** Detección de sectores críticos con riesgo de deslizamiento o déficit de salud a más de 15 min.

### 🤖 3. Copiloto Espacial RAG (Normativa Urbana Peruana)
- **Asistente Spatial RAG:** Consulta en tiempo real de ordenanzas municipales (PLANMET 2040, PDM Arequipa, PLANDET Trujillo), normas sismorresistentes y de habitabilidad (RNE A.020, E.030) y mapas de riesgo CENEPRED.
- **Recomendación e Inserción Territorial:** El asistente evalúa pendientes y accesibilidad peatonal a 15 min, proponiendo equipamientos (postas I-2, escuelas, parques bioclimáticos, vivienda incremental).

### 🏠 4. Simulación de Vivienda Social y Déficit Habitacional
- Cálculo de déficit cualitativo y cuantitativo según datos de ONU-Hábitat e INEI.
- Sliders de densificación, porcentaje de vivienda incremental progresiva, costos de obra y cálculo del Bono Familiar Habitacional (BFH - Techo Propio).

### 🚶 5. Servicios y Ciudad de 15 Minutos
- Isócronas peatonales (5, 10 y 15 minutos) con penalización por pendiente orográfica.
- Diagnóstico de cobertura en salud, educación, transporte público y áreas verdes.

### 🗳️ 6. Participación Ciudadana y Presupuesto Participativo
- Votación comunitaria interactiva con distribución porcentual de presupuestos.
- Hilos de deliberación vecinal para recepción y votación de propuestas barriales.

### 📊 7. Evaluación Multicriterio AHP (Saaty)
- Ponderación de criterios urbanos: Confort Bioclimático, Accesibilidad 15m, Sostenibilidad Ambiental, Calidad de Vida y Equidad Espacial.
- Cálculo de vector de prioridades, consistencia $CI$ y Razón de Consistencia $CR < 0.10$.
- Gráfico Radar (Spider Chart) comparativo entre escenarios: Base, Municipal, Comunitario e Híbrido.

### 🔀 8. Langflow AI Studio & Orquestador Low-Code
- Lienzo visual con nodos interactivos (Inputs, LLMs, Vector Stores, Spatial Tools, Outputs).
- Simulación de ejecución de cadenas en Python y exportador JSON compatible con Langflow 1.0+.

### 🗄️ 9. Data Hub & Andamiaje Backend
- Exportación directa de capas espaciales a formatos GeoJSON y CSV.
- Visor de código backend (GeoDjango, PostGIS SRID 4326, QGIS y Docker).

### 💾 10. Perfiles de Propuestas Personalizadas
- Guardado y carga de hasta 3 propuestas personalizadas (`custom_1`, `custom_2`, `custom_3`) con persistencia de modificaciones urbanas.

---

## 🛠️ Tecnologías del Nuevo Stack

- **Lenguaje Base:** Python 3.10+ / 3.13
- **Framework de Aplicación:** [Streamlit](https://streamlit.io/)
- **Motores de Machine Learning (In-Process):** [scikit-learn](https://scikit-learn.org/), [XGBoost](https://xgboost.readthedocs.io/), [joblib](https://joblib.readthedocs.io/)
- **Análisis de Datos:** [Pandas](https://pandas.pydata.org/), [NumPy](https://numpy.org/)
- **Motor 3D:** [Three.js](https://threejs.org/) (embebido en componente WebGL de alto rendimiento)
- **Visualización Interactiva:** [Plotly](https://plotly.com/python/)
- **Estilos:** Glassmorphism UI tokens, tipografías Google Fonts Outfit & Plus Jakarta Sans, Dark/Light mode responsive.

---

## 🚀 Instalación y Puesta en Marcha

### Prerrequisitos
- Python 3.10 o superior instalado.

### Pasos

1. **Instalar dependencias de Python:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Ejecutar la suite de pruebas de verificación (opcional):**
   ```bash
   python scripts/test_python_stack.py
   ```

3. **Iniciar la aplicación Streamlit:**
   ```bash
   streamlit run app.py
   ```
   La aplicación se abrirá automáticamente en tu navegador en `http://localhost:8501`.

---

## 📂 Estructura del Proyecto

```
├── app.py                     # Punto de entrada principal Streamlit (Sidebar, Configuración, Router)
├── requirements.txt           # Dependencias de Python
├── core/                      # Módulos centrales de cálculo y lógica territorial
│   ├── data_manager.py        # Gestor de escenarios, ciudades piloto y perfiles guardados
│   ├── gis_engine.py          # Motor de KPIs urbanos, distancias y tiempos de caminata
│   ├── ahp_solver.py          # Algoritmo de Saaty (AHP) con cálculo de consistencia CR
│   ├── ai_ml_models.py        # Motor de ML (Random Forest, XGBoost, GNN) IN-PROCESS (sin FastAPI)
│   └── copilot_engine.py      # Motor RAG de normativas urbanas peruanas y asistente espacial
├── views/                     # Componentes y vistas de la interfaz
│   ├── map_3d_view.py         # Visor 3D Three.js orográfico, simulación solar y trazado vial
│   ├── housing_view.py        # Simulación de vivienda social y déficit habitacional
│   ├── services_15m_view.py   # Accesibilidad a 15 min e isócronas peatonales
│   ├── deliberation_view.py   # Participación ciudadana, foros y presupuesto participativo
│   ├── evaluation_ahp_view.py # Evaluación multicriterio y radar de escenarios
│   ├── ai_engine_view.py      # Panel interactivo de Machine Learning y alertas tempranas
│   ├── langflow_view.py       # Langflow AI Studio & diseñador low-code
│   └── scaffolding_view.py    # Data Hub y exportaciones GeoJSON/CSV
├── data_json/                 # Datasets territoriales y de conocimiento normativo
└── static/
    └── custom_styles.css      # Sistema de diseño con tokens Glassmorphism Dark/Light
```

---

## 📄 Licencia

Este proyecto se distribuye bajo fines de investigación académica, co-diseño comunitario y desarrollo urbano participativo.

## IA local: ejecución compartida

La vista de IA usa `outputs/sjl_prueba/reporte_SJL_ampliado_prueba.csv` directamente y fija el objetivo en `valor_suelo_usd_m2`. Los conteos INEI se combinan con atributos simulados y el objetivo también es simulado: las estimaciones son experimentales.

`core/ai_experiment.py` conserva una ejecución por sesión con hash del CSV, configuración, predictores, índices de partición, pipelines y predicciones. La selección usa el menor RMSE medio de validación cruzada dentro del conjunto de desarrollo. El conjunto final queda fuera del ajuste y de la selección. La imputación y codificación se ajustan dentro de cada partición. No se denomina validación espacial.

Las nueve pestañas de `views/ai_engine_view.py` comparten el modelo activo. Cambiar datos o parámetros invalida la ejecución, incluso si luego se restablece la configuración. No se recuperan archivos históricos automáticamente. Los cinco algoritmos previstos son Random Forest, Gradient Boosting, XGBoost, LightGBM y CatBoost, y sus dependencias están declaradas en `requirements.txt`. Los algoritmos avanzados aparecen cuando sus bibliotecas están instaladas; los fallos se registran sin sustituir silenciosamente un algoritmo por otro. Gradient Boosting no se presenta como una red neuronal de grafos.

La exportación contiene el pipeline y toda la ejecución; las predicciones finales también se descargan como CSV. La importancia por permutación se calcula bajo demanda y se conserva por modelo. Las alertas territoriales usan reglas explícitas sobre el CSV y las del estimador usan sus errores de evaluación.

Cada gráfico de Motor IA local ofrece «Descargar imagen para informe · 600 dpi». Al pulsar «Preparar imágenes» se reconstruyen sus trazas con fondo blanco desde los datos actuales, sin reentrenar, y se habilitan PNG y TIFF con compresión LZW, de 3900 × 2700 píxeles (16,51 × 11,43 cm). Es una composición estática para publicación; no conserva el zoom ni las selecciones interactivas. Solo se mantiene la última imagen preparada para limitar la memoria.

«Descargar reporte completo en Excel» exporta los modelos completados de la ejecución actual. Incluye hojas separadas de validación y prueba final, particiones, parámetros, historial, predicciones, estado de los modelos y metadatos. Las tablas de historial, evaluación, importancia y diagnósticos también tienen descarga individual en Excel. La columna de RMSE de configuración base corresponde al estimador con parámetros base, no a una predicción constante. Los archivos se generan en memoria y requieren Matplotlib, Pillow y XlsxWriter, incluidos en requirements.txt. Pruebas de exportación: `python scripts/test_ai_exports.py`.

Pruebas: `python -m unittest discover -s scripts -p test_ai_experiment.py`. Incluyen entrenamiento, separación de datos, selección compartida y navegación con Streamlit AppTest. Se requiere el entorno de `requirements.txt`; SciPy está declarado explícitamente para los diagnósticos estadísticos.

Verificación de los cinco algoritmos con el CSV de SJL: `python -m unittest discover -s scripts -p test_ai_algorithms.py`. Comprueba la disponibilidad, la clase real de cada estimador, el entrenamiento, la evaluación y la inferencia con particiones comunes.


### Entrenamiento individual y modos

La pestaña 4 muestra cinco tarjetas con botones individuales y una acción opcional para entrenar todos. Cada tarjeta está gris mientras está pendiente, ámbar durante el entrenamiento, verde al completar el pipeline y sus métricas, o roja si falla. Reentrenar una tarjeta conserva los otros modelos de la misma ejecución. Cambiar datos, predictores, modo o configuración invalida todos los resultados.

- **Rápido:** una configuración manual por modelo, validación cruzada y ajuste final.
- **Optimizado (predeterminado):** búsqueda aleatoria específica por algoritmo; el presupuesto incluye la configuración base. Se conserva la mejor configuración por RMSE medio, el historial, tiempos, desviación entre particiones y la comparación con la base. El RMSE de selección puede ser optimista.
- **Riguroso:** búsqueda interna independiente para cada partición externa; el ranking utiliza los errores externos. Otra búsqueda sobre todo el desarrollo obtiene los parámetros del pipeline final. Se guardan los índices de las particiones internas y externas para auditar su aislamiento.

La evaluación final reservada nunca participa en la búsqueda ni en el ranking automático. Todas las tarjetas usan las mismas particiones de desarrollo/evaluación. El número de ajustes previsto aparece antes de entrenar; los ajustes son secuenciales y el usuario limita los hilos del estimador a 1, 2 o 4. El modelo activo se actualiza al ganador entre los algoritmos completados. Los historiales de búsqueda se pueden descargar por tarjeta.

Pruebas de los modos, estados de tarjetas y ausencia de influencia del objetivo final en la búsqueda: `python -m unittest discover -s scripts -p test_ai_training_modes.py`. La suite completa de IA se ejecuta con `python -m unittest discover -s scripts -p "test_ai_*.py"`.
