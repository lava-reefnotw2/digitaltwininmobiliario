from pathlib import Path
import json,sys,shutil,zipfile,hashlib
from docx import Document
from docx.shared import Cm,Pt,RGBColor
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.enum.table import WD_TABLE_ALIGNMENT,WD_CELL_VERTICAL_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH
OUT=Path(__file__).parent
ROOT=OUT.parents[1]
R=json.loads((OUT/'resultados.json').read_text(encoding='utf-8'))
def num(v,n=2):return f'{v:.{n}f}'.replace('.',',')
def metric(k,m,n=2):
 r=R['results'][k];a,b=r['ci95'][m]
 if k=='media_entrenamiento' and m=='r2':n=6
 return f"{num(r['test'][m],n)} [{num(a,n)}; {num(b,n)}]"
def doc(title):
 d=Document();s=d.sections[0];s.page_height=Cm(29.7);s.page_width=Cm(21);s.top_margin=s.bottom_margin=Cm(2.2);s.left_margin=s.right_margin=Cm(2.3)
 for name in ['Normal','Title','Subtitle','Heading 1','Heading 2','Caption']:
  st=d.styles[name];st.font.name='Times New Roman';st.font.color.rgb=RGBColor(0,0,0)
  rf=st.element.find(qn('w:rPr')).find(qn('w:rFonts'))
  if rf is not None:
   for att in ['asciiTheme','hAnsiTheme','eastAsiaTheme','cstheme']:
    rf.attrib.pop(qn('w:'+att),None)
 for st in d.styles:
  for b in list(st.element.iter(qn('w:pBdr'))):b.getparent().remove(b)
 d.styles['Normal'].font.size=Pt(11);d.styles['Normal'].paragraph_format.line_spacing=1.12;d.styles['Normal'].paragraph_format.space_after=Pt(6)
 for name,size in [('Title',18),('Heading 1',14),('Heading 2',12)]:
  st=d.styles[name];st.font.size=Pt(size);st.font.bold=True;st.paragraph_format.space_before=Pt(10);st.paragraph_format.space_after=Pt(6)
 d.styles['Caption'].font.size=Pt(10);d.styles['Caption'].font.italic=False
 d.add_paragraph(title,'Title')
 footer=s.footer.paragraphs[0];footer.alignment=WD_ALIGN_PARAGRAPH.CENTER
 f=OxmlElement('w:fldSimple');f.set(qn('w:instr'),'PAGE');footer._p.append(f)
 d.core_properties.author='Anthony Daniel Bardales Leon; José Aaron Rodríguez Silva'
 return d
def p(d,t):return d.add_paragraph(t)
def h(d,t):return d.add_paragraph(t,'Heading 1')
def h2(d,t):return d.add_paragraph(t,'Heading 2')
def table(d,headers,rows,widths=None):
 t=d.add_table(rows=1,cols=len(headers));t.alignment=WD_TABLE_ALIGNMENT.CENTER;t.autofit=False
 if widths:
  for col,w in zip(t.columns,widths):col.width=Cm(w)
 for c,txt in zip(t.rows[0].cells,headers):c.text=txt
 rep=OxmlElement('w:tblHeader');t.rows[0]._tr.get_or_add_trPr().append(rep)
 for row in rows:
  for c,txt in zip(t.add_row().cells,row):c.text=str(txt)
 for i,row in enumerate(t.rows):
  trpr=row._tr.get_or_add_trPr();ns=OxmlElement('w:cantSplit');trpr.append(ns)
  for j,c in enumerate(row.cells):
   if widths:c.width=Cm(widths[j])
   c.vertical_alignment=WD_CELL_VERTICAL_ALIGNMENT.CENTER
   pr=c._tc.get_or_add_tcPr();border=OxmlElement('w:tcBorders')
   for side in ['top','left','bottom','right']:
    el=OxmlElement('w:'+side);el.set(qn('w:val'),'single');el.set(qn('w:sz'),'4');el.set(qn('w:color'),'D9D9D9');border.append(el)
   pr.append(border);m=OxmlElement('w:tcMar')
   for side in ['top','left','bottom','right']:
    el=OxmlElement('w:'+side);el.set(qn('w:w'),'85');el.set(qn('w:type'),'dxa');m.append(el)
   pr.append(m)
   if i==0:
    sh=OxmlElement('w:shd');sh.set(qn('w:fill'),'E7EDF2');pr.append(sh)
   for para in c.paragraphs:
    para.paragraph_format.space_after=Pt(3);para.paragraph_format.line_spacing=1.05
    para.paragraph_format.keep_with_next=i<len(t.rows)-1
    for r in para.runs:r.font.size=Pt(9);r.bold=(i==0)
 p(d,'')
 return t
def cap(d,t):
 q=d.add_paragraph(t,'Caption');q.paragraph_format.keep_with_next=True
def page(d):d.add_page_break()

d=doc('Desarrollo de un prototipo de gemelo digital comunitario para vivienda social y evaluación computacional con datos mixtos')
p(d,'Development of a community digital twin prototype for social housing and computational evaluation with mixed data')
p(d,'Bardales Leon, Anthony Daniel; Rodríguez Silva, José Aaron')
p(d,'Universidad Nacional de Trujillo, Guadalupe, Perú')
h(d,'Resumen')
p(d,'El estudio presenta el desarrollo de un prototipo de gemelo digital comunitario orientado a explorar escenarios de vivienda social y una evaluación computacional de su módulo de aprendizaje automático. Se integraron componentes de visualización 2D/3D, representación de escenarios, deliberación y evaluación multicriterio. El experimento empleó 8.028 registros de manzanas de San Juan de Lurigancho, con conteos censales de población, hogares y viviendas y atributos territoriales simulados. El valor del suelo utilizado como objetivo fue generado mediante una fórmula explícita y no corresponde a precios observados de mercado. Se compararon Random Forest, Gradient Boosting, XGBoost, LightGBM y CatBoost mediante cinco particiones aleatorias en 6.422 registros de desarrollo y un conjunto independiente de 1.606 registros de prueba. CatBoost obtuvo el menor RMSE medio de validación. En prueba alcanzó R² = 0,7392, RMSE = 91,56 USD/m² y MAE = 68,49 USD/m²; el intervalo bootstrap del 95 % para el RMSE fue [87,32; 95,97]. Estos resultados describen la recuperación de relaciones del generador sintético y permiten comprobar el flujo de entrenamiento, selección y evaluación. No constituyen una validación inmobiliaria, espacial ni participativa. La contribución es un prototipo y un experimento reproducible que delimitan los requisitos para una posterior evaluación con datos georreferenciados observados y residentes.')
p(d,'Palabras clave: prototipo de gemelo digital; simulación urbana; aprendizaje automático; datos sintéticos; vivienda social; reproducibilidad.')
h(d,'Abstract')
p(d,'This study presents the development of a community digital twin prototype intended to explore social housing scenarios and a computational evaluation of its machine learning module. The prototype integrates 2D/3D visualization, scenario representation, deliberation, and multicriteria assessment components. The experiment used 8,028 census-block records from San Juan de Lurigancho, combining census counts of population, households, and dwellings with simulated territorial attributes. The land value target was generated through an explicit formula and does not represent observed market prices. Random Forest, Gradient Boosting, XGBoost, LightGBM, and CatBoost were compared using five random folds within 6,422 development records and an independent test set of 1,606 records. CatBoost achieved the lowest mean validation RMSE. Its test performance was R² = 0.7392, RMSE = 91.56 USD/m², and MAE = 68.49 USD/m²; the 95% bootstrap interval for RMSE was [87.32, 95.97]. These findings describe recovery of relationships embedded in the synthetic generator and support verification of the training, selection, and evaluation workflow. They do not constitute real-estate, spatial, or participatory validation. The contribution is a prototype and a reproducible experiment that identify requirements for subsequent evaluation with observed georeferenced data and residents.')
p(d,'Keywords: digital twin prototype; urban simulation; machine learning; synthetic data; social housing; reproducibility.')
h(d,'1 Introducción')
p(d,'Los gemelos digitales urbanos ofrecen entornos para representar componentes de una ciudad, explorar intervenciones y comunicar alternativas a distintos actores. El prototipo de Herrenberg muestra una aplicación de estas capacidades a la planificación y visualización urbana (Dembski et al., 2020). White et al. (2021) incorporan un mecanismo de retroalimentación ciudadana sobre cambios proyectados. Estos antecedentes vinculan representación digital y participación, aunque la disponibilidad de una interfaz no demuestra, por sí sola, que los residentes comprendan sus resultados o influyan en las decisiones.')
p(d,'En vivienda social, la comparación de escenarios requiere distinguir tres clases de información: características observadas del territorio, supuestos de simulación y preferencias expresadas por las personas. Mezclarlas puede atribuir a un indicador calculado una autoridad que sus datos no justifican. La integración social de los gemelos digitales exige considerar las relaciones entre representación, actores y procesos de decisión, además del funcionamiento técnico (Qanazi et al., 2025).')
p(d,'Este trabajo aborda una etapa de desarrollo tecnológico previa a la evaluación con residentes. Su objetivo es describir un prototipo que reúne visualización, escenarios y herramientas de comparación, y evaluar de forma reproducible el componente de aprendizaje automático en un entorno de datos mixtos. La aplicación se contextualiza en San Juan de Lurigancho, Lima, pero el experimento predictivo utiliza atributos territoriales y valores del suelo simulados. Por tanto, su alcance es computacional y no una estimación empírica del mercado inmobiliario distrital.')
p(d,'Se plantean dos preguntas: ¿cómo organizar el prototipo para separar datos, reglas de evaluación y módulos de interacción?, y ¿qué desempeño presentan cinco modelos de ensamble al recuperar una variable sintética bajo un procedimiento común de evaluación? La primera se aborda mediante la descripción de la arquitectura y sus límites; la segunda, mediante un experimento con separación entre desarrollo y prueba. La usabilidad, la inclusión digital y la incidencia comunitaria se reservan para una evaluación posterior y no se presentan como resultados alcanzados.')
h(d,'2 Antecedentes y contribución')
p(d,'Los trabajos de Dembski et al. (2020) y White et al. (2021) sustentan la utilidad de estudiar conjuntamente representación urbana e interacción. Qanazi et al. (2025) revisan la incorporación de dimensiones sociales y proponen un marco para gemelos digitales sociales. El presente prototipo retoma esa orientación como propósito de diseño; no pretende demostrar una ventaja participativa sobre esos sistemas ni sustituir sus procesos de evaluación.')
cap(d,'Tabla 1. Relación con antecedentes y alcance de la contribución')
table(d,['Antecedente','Componente pertinente','Alcance del presente estudio'],[
['Dembski et al. (2020)','Representación y visualización de un gemelo urbano para planificación.','Integra una representación de escenarios y un módulo predictivo experimental.'],
['White et al. (2021)','Retroalimentación ciudadana sobre cambios urbanos.','Incluye componentes de deliberación; su uso por residentes no se evalúa aquí.'],
['Qanazi et al. (2025)','Integración conceptual de dimensiones sociales.','Distingue el objetivo comunitario de la validación técnica realizada.']],[3.5,6,6.9])
p(d,'Para el componente predictivo se emplean familias consolidadas de ensambles. Random Forest combina árboles de decisión (Breiman, 2001); XGBoost incorpora procedimientos de optimización y regularización (Chen y Guestrin, 2016); LightGBM introduce mejoras para entrenar árboles con eficiencia (Ke et al., 2017); y CatBoost desarrolla técnicas de boosting y tratamiento de variables categóricas (Prokhorenkova et al., 2018). En este experimento todas las variables categóricas se codifican mediante one-hot antes del estimador, incluido CatBoost. En consecuencia, no se evalúa la ventaja específica de su tratamiento nativo de categorías.')
p(d,'La contribución no consiste en un algoritmo nuevo. Consiste en integrar componentes de software para explorar escenarios, documentar la separación entre observación y simulación y proporcionar un procedimiento verificable de comparación. Un buen ajuste a la variable sintética indica que el estimador recupera relaciones presentes en el generador; no demuestra causalidad, validez territorial o capacidad de tasación.')
h(d,'3 Metodología')
h2(d,'3.1 Diseño y alcance')
p(d,'Se realizó un estudio de desarrollo tecnológico acompañado de un experimento computacional. La unidad de registro es la manzana identificada en el archivo censal de referencia. No se reclutaron participantes, no se realizaron talleres y no se evaluaron decisiones reales de vivienda. El término prototipo de gemelo digital describe la orientación del sistema: la versión evaluada no acredita sincronización continua con el territorio ni retroalimentación operativa desde intervenciones físicas.')
p(d,'El proceso se organiza según las seis fases de CRISP-DM: comprensión del problema, comprensión de los datos, preparación de los datos, modelado, evaluación y despliegue (IBM, s. f.). La comprensión del problema delimitó el uso experimental; la comprensión y preparación separaron conteos de atributos generados; el modelado comparó cinco estimadores; la evaluación utilizó particiones comunes y análisis de incertidumbre; y el despliegue corresponde a la integración local del módulo en el prototipo, sin afirmar una implantación municipal.')
h2(d,'3.2 Arquitectura e implementación')
p(d,'La aplicación utiliza Python y Streamlit para la interfaz; Three.js y componentes cartográficos para la representación 3D y 2D; pandas y NumPy para el manejo de datos; y bibliotecas de aprendizaje automático para el entrenamiento local. Los escenarios se almacenan en archivos JSON y la base experimental en CSV. La arquitectura revisada no requiere PostGIS para ejecutar el experimento. La presencia de ejemplos de infraestructura en una sección de la interfaz no equivale a una base espacial desplegada.')
cap(d,'Tabla 2. Componentes del prototipo y límites de la evidencia')
table(d,['Componente','Función implementada en el código','Límite de la evaluación'],[
['Representación','Visualización 2D/3D y selección de escenarios.','No se cuantifica exactitud geométrica ni fidelidad topográfica.'],
['Escenarios e indicadores','Conteos, costos agregados e indicadores calculados mediante reglas.','Los índices ambientales y de accesibilidad son heurísticos; no son mediciones de campo.'],
['Deliberación','Interfaz para propuestas y distribución de presupuesto.','No existen resultados de participación real en este estudio.'],
['Evaluación multicriterio','Ponderación de criterios y comparación de escenarios.','Su implementación y sensibilidad requieren validación específica.'],
['Aprendizaje automático','Preprocesamiento, entrenamiento, selección, prueba y exportación.','Evaluado con un objetivo sintético, sin validación geográfica externa.']],[3.1,6.7,6.6])
p(d,'El cálculo de indicadores y el modelo predictivo son componentes distintos. La estimación de valor del suelo no valida automáticamente indicadores de accesibilidad, riesgo, confort o calidad de vida. En particular, las distancias y tiempos simplificados no deben interpretarse como un análisis completo de rutas peatonales. La explicación de predicciones mediante SHAP o LIME puede explorarse posteriormente; no se atribuyen resultados de estos métodos al experimento presentado.')
h2(d,'3.3 Datos y trazabilidad')
p(d,'La fuente censal declarada es el sistema REDATAM del INEI para los Censos Nacionales 2017, que permite consultar información de población y vivienda (INEI, 2024). Se utilizó una exportación titulada “SJL – Población, viviendas y hogares por manzana – 2017”. La comprobación fila a fila confirmó que el archivo experimental conserva los 8.028 identificadores y los tres conteos del Excel de origen. Los totales son 314.581 viviendas, 274.657 hogares y 1.038.495 habitantes. Esta comprobación verifica la consistencia entre archivos, sin constituir una nueva consulta independiente al servicio del INEI.')
p(d,'El CSV contiene 23 columnas, 8.028 identificadores únicos y ningún valor faltante. Sus registros están etiquetados como datos mixtos. Los conteos se complementaron con atributos generados mediante una semilla de 20261017. La asignación a perfiles consolidados, intermedios y de ladera fue aleatoria, con probabilidades de 0,40, 0,38 y 0,22; no se infirió a partir de la ubicación real de cada manzana.')
cap(d,'Tabla 3. Procedencia de las variables del experimento')
table(d,['Grupo','Variables','Procedencia y uso'],[
['Conteos','Viviendas, hogares y población.','Conservados de la exportación censal; incluidos como predictores.'],
['Identificación','Código de manzana, distrito, ciudad, año y tipo de datos.','Metadatos; excluidos como identificadores o constantes.'],
['Atributos simulados','Área de lote, distancias a vías, salud y escuela; pendiente; vulnerabilidad; área verde; estrato; material y antigüedad.','Generados por perfiles y distribuciones; incluidos como predictores.'],
['Variables mixtas','Área de manzana y densidad.','Área simulada a partir de viviendas; densidad calculada con población y área simulada.'],
['Objetivo','valor_suelo_usd_m2.','Resultado de una fórmula sintética; no observado en el mercado.'],
['Otros resultados','Viabilidad y riesgo de deslizamiento.','Generados; excluidos de los predictores para reducir el uso de resultados derivados.']],[3.1,6.1,7.2])
p(d,'El nombre heredado indice_vulnerabilidad_cenepred no convierte esa columna en un indicador oficial de CENEPRED: sus valores fueron simulados. Tampoco se utilizaron capas GHSL, indicadores observados de ONU-Hábitat o valores catastrales como fuentes efectivas de entrenamiento en esta ejecución. Los elementos cartográficos de la interfaz no acreditan una vinculación geográfica de las filas del CSV.')
h2(d,'3.4 Generación de la variable objetivo')
p(d,'La variable objetivo se construyó en la escala nominal USD/m² mediante la siguiente regla, implementada en el script de preparación:')
p(d,'y = redondear₂{limitar[(500 − 5s − 0,11d − 1,1v + 9g + bₑ) × exp(ε), 35, 1100]}.')
p(d,'En la expresión, s es la pendiente simulada, d la distancia simulada a la vía principal, v el índice de vulnerabilidad simulado y g el área verde simulada por habitante. El término bₑ toma los valores −45, 0, 90 y 200 para los estratos Muy Bajo, Bajo, Medio y Medio Alto. El error ε se genera con una distribución normal de media 0 y desviación estándar 0,22. limitar restringe el resultado al intervalo [35; 1100] y redondear₂ conserva dos decimales. El generador usa la pendiente antes del redondeo con que se exporta al CSV; la reproducción exacta requiere ejecutar el script original y respetar el orden de las llamadas aleatorias.')
p(d,'Los coeficientes son supuestos del generador y no parámetros estimados con transacciones. La media del objetivo es 383,93 y su rango es [35; 1100]. La unidad nominal se mantiene para describir la simulación, sin interpretar los valores como precios actualizados. El diseño incorpora relaciones entre los predictores y el objetivo de forma deliberada; por ello, el ajuste de los modelos mide principalmente la recuperación de esas relaciones.')
h2(d,'3.5 Preparación y comparación de modelos')
p(d,'La nueva ejecución del 25 de octubre de 2026 utilizó 15 predictores. Se excluyeron identificadores, columnas constantes, la variable objetivo y las dos salidas derivadas de viabilidad y riesgo. Se reservó el 20 % de las observaciones como prueba final: 1.606 registros; los 6.422 restantes conformaron el conjunto de desarrollo. La partición aleatoria utilizó la semilla 42. Dentro del desarrollo se aplicó KFold de cinco particiones con mezcla aleatoria y la misma semilla. Todos los modelos utilizaron los mismos índices.')
p(d,'El preprocesamiento forma parte del pipeline de cada ajuste. Las variables numéricas se imputan mediante la mediana y las categóricas mediante la moda y codificación one-hot, ignorando categorías desconocidas al predecir. Aunque el CSV no contiene ausencias, este diseño evita que futuras imputaciones utilicen información del conjunto de prueba. En cada partición, los transformadores se ajustan exclusivamente con las observaciones de entrenamiento.')
p(d,'Se utilizó una configuración fija por familia, definida antes de consultar los resultados de prueba: 150 árboles o iteraciones, profundidad máxima de 6 y tasa de aprendizaje 0,05 para boosting. No se realizó búsqueda de hiperparámetros. La selección del modelo de referencia se basó en el menor RMSE medio de validación dentro del desarrollo; posteriormente cada modelo se reajustó con los 6.422 registros y se evaluó una vez en el conjunto reservado. Se añadió un predictor constante igual a la media del objetivo en desarrollo como línea base.')
cap(d,'Tabla 4. Configuración principal de los estimadores')
table(d,['Estimador','Parámetros explícitos','Tratamiento común'],[
['Random Forest','n_estimators=150; max_depth=6; random_state=42; n_jobs=2.','Imputación y one-hot dentro del pipeline.'],
['Gradient Boosting','n_estimators=150; max_depth=6; learning_rate=0,05; random_state=42.','Estimador estándar; sin redes de grafos ni estructura espacial.'],
['XGBoost','n_estimators=150; max_depth=6; learning_rate=0,05; random_state=42; n_jobs=2.','La prueba final no interviene en el ajuste.'],
['LightGBM','n_estimators=150; max_depth=6; learning_rate=0,05; random_state=42; n_jobs=2.','Mismas particiones y predictores.'],
['CatBoost','iterations=150; depth=6; learning_rate=0,05; random_seed=42; thread_count=2.','Entrada ya codificada; sin categorías nativas.']],[3.1,8.1,5.2])
p(d,'Los parámetros no modificados corresponden a los valores por defecto de las versiones registradas y se exportan completos en resultados.json. El entorno utilizó Python '+R['python']+', '+', '.join(f'{k} {v}' for k,v in R['versions'].items())+'. Esta configuración permite comparar implementaciones concretas; no representa una optimización exhaustiva ni un presupuesto equivalente de complejidad entre familias.')
h2(d,'3.6 Métricas e incertidumbre')
p(d,'Se calcularon R², RMSE y MAE a partir de las mismas referencias y predicciones de prueba. R² se define como 1 − Σ(y − ŷ)²/Σ(y − ȳ)²; RMSE como la raíz de la media de (y − ŷ)²; y MAE como la media de |y − ŷ|. Las métricas de error se expresan en la escala nominal USD/m² y R² no tiene unidades.')
p(d,'Se estimaron intervalos percentiles del 95 % mediante 2.000 remuestras bootstrap de los 1.606 pares referencia–predicción, con semilla 20261025 y los mismos índices para todos los modelos. Los intervalos son condicionales a los modelos ajustados y a la muestra sintética; no incluyen la variabilidad de volver a entrenar, de elegir otra semilla de generación ni de cambiar los supuestos del generador.')
p(d,'Como análisis exploratorio, se compararon los errores absolutos del modelo seleccionado con los de las otras cuatro familias. Se calcularon diferencias pareadas de MAE, sus intervalos bootstrap y pruebas bilaterales de aleatorización por intercambio del signo de cada diferencia, con 10.000 permutaciones Monte Carlo. Se aplicó la corrección de Holm a las cuatro comparaciones. Estas pruebas presuponen intercambiabilidad bajo la hipótesis nula y no respaldan inferencias sobre población o territorio reales.')
h2(d,'3.7 Alcance de la validación y reproducibilidad')
p(d,'La validación es aleatoria, no espacial. El CSV no contiene geometrías o coordenadas verificadas que permitan construir bloques geográficos contiguos. Agrupar por un identificador único de manzana no garantiza separación territorial. La evaluación con datos observados requerirá unir geometrías fiables, definir bloques y distancias de separación, y mantener esa estructura tanto en el ajuste como en la evaluación, conforme a las precauciones discutidas por Roberts et al. (2017).')
p(d,'El material complementario conserva el CSV evaluado, el código utilizado, las predicciones por observación, los índices de partición, los parámetros completos, las versiones y la huella SHA-256 del conjunto. Las métricas pueden recalcularse sin volver a entrenar. La ejecución se identifica por su fecha y configuración; no se presenta como una reproducción exacta de ejecuciones históricas.')
h(d,'4 Resultados')
h2(d,'4.1 Verificación técnica')
p(d,'Los cinco modelos completaron las cinco particiones de desarrollo y el ajuste final, para un total de 30 ajustes de estimadores. La comprobación del archivo confirmó 8.028 registros completos y correspondencia de los tres conteos con el Excel de origen. Además, una suite de cinco pruebas automatizadas del módulo de experimentos finalizó correctamente. Estas pruebas cubren, entre otros aspectos, separación de particiones, selección compartida, aislamiento de la imputación y manejo de fallos; no equivalen a una evaluación integral de la plataforma ni a pruebas de usabilidad.')
h2(d,'4.2 Desempeño en desarrollo y prueba')
cap(d,'Tabla 5. Evaluación sobre 1.606 registros de prueba con intervalos bootstrap del 95 %')
order=['catboost','lightgbm','random_forest','gnn','xgboost','media_entrenamiento']
table(d,['Modelo','R² [IC 95 %]','RMSE [IC 95 %]','MAE [IC 95 %]'],[[R['results'][k]['label'],metric(k,'r2',4),metric(k,'rmse'),metric(k,'mae')] for k in order],[3.5,4.3,4.3,4.0])
p(d,'Nota. RMSE y MAE se expresan en USD/m² de la simulación. La tabla se ordena por RMSE de prueba para facilitar la lectura; la selección se efectuó previamente con la validación de desarrollo. Los intervalos corresponden al remuestreo de observaciones de prueba con modelos fijos.')
p(d,'Los RMSE medios de validación fueron '+ '; '.join(f"{R['results'][k]['label']}: {num(R['results'][k]['cv']['rmse'])}" for k in order[:-1])+'. CatBoost fue el modelo de referencia seleccionado. En prueba redujo el RMSE en 1,88 unidades frente a LightGBM, aproximadamente un 2,01 %, y presentó un error considerablemente menor que la línea base constante. La magnitud de la ventaja entre ensambles es pequeña en relación con el error absoluto del problema simulado.')
cap(d,'Tabla 6. Comparaciones exploratorias pareadas con CatBoost')
table(d,['Comparación','Δ MAE [IC 95 %]','p ajustado por Holm'],[[f"CatBoost − {R['results'][x['other']]['label']}",f"{num(x['delta_mae'])} [{num(x['ci95'][0])}; {num(x['ci95'][1])}]",num(x['p_holm'],4)] for x in R['paired_comparisons']],[6.0,6.1,4.3])
p(d,'Nota. Un valor negativo de Δ MAE favorece a CatBoost en esta muestra. Los valores p se derivan de pruebas de aleatorización sobre errores absolutos y no de comparaciones de RMSE entre particiones. Aunque los cuatro contrastes arrojan p ajustado < 0,01, su interpretación queda limitada a los modelos fijos y al mecanismo sintético utilizado; no demuestra superioridad general ni relevancia para decisiones inmobiliarias.')
h2(d,'4.3 Diagnóstico de errores')
cap(d,'Figura 1. Diagnósticos de CatBoost en el conjunto de prueba')
d.add_picture(str(OUT/'diagnosticos.png'),width=Cm(16.2))
p(d,'Nota. Residuo = referencia simulada − predicción. Los cuatro paneles se calcularon con las mismas 1.606 observaciones utilizadas en la Tabla 5. Elaboración propia.')
p(d,'La dispersión de residuos aumenta en los valores predichos más altos y el gráfico cuantil-cuantil muestra desviaciones en las colas, especialmente en la positiva. Este patrón es compatible con el ruido multiplicativo incluido en el generador. Los promedios por decil siguen aproximadamente la diagonal, pero esa correspondencia agregada no elimina los errores individuales ni prueba calibración fuera de la distribución simulada. No se presupone normalidad de los residuos para calcular las métricas o los intervalos bootstrap.')
h(d,'5 Discusión')
p(d,'El experimento demuestra que el flujo de preparación, comparación y prueba produce resultados verificables bajo una configuración común. La mejora frente a la media de entrenamiento confirma que los predictores contienen información sobre el objetivo generado. Este hallazgo era esperable porque la fórmula del objetivo utiliza algunos de esos atributos. La comparación entre ensambles resulta útil para comprobar el módulo, pero no basta para afirmar una contribución novedosa en valoración del suelo.')
p(d,'La integración del prototipo ofrece una base para estudiar la relación entre escenarios, indicadores y preferencias. Sin embargo, la literatura sobre participación y gemelos digitales no autoriza a inferir beneficios sociales a partir del rendimiento predictivo (Dembski et al., 2020; White et al., 2021; Qanazi et al., 2025). La facilidad de uso por personas con baja alfabetización digital, la comprensión de la incertidumbre y la capacidad de modificar prioridades son hipótesis de diseño que necesitan observación directa.')
p(d,'La validez interna está limitada por una sola generación de datos, una sola partición final y configuraciones fijas. Los intervalos y contrastes no incluyen la variabilidad del reentrenamiento. La validez de constructo se restringe porque los indicadores de vulnerabilidad, accesibilidad y valor son aproximaciones generadas. La validez externa es especialmente limitada: no se emplearon transacciones, avalúos independientes o atributos territoriales medidos, y no existe evaluación espacial o temporal fuera de la muestra.')
p(d,'La composición de datos requiere especial atención al comunicar resultados. Un nombre de columna asociado a una institución no acredita su procedencia oficial. Del mismo modo, la escala USD/m² no transforma una simulación en tasación. La interfaz debe mostrar la condición simulada de entradas y salidas, las reglas de cálculo y sus límites, de manera que una comparación de escenarios no se confunda con una recomendación normativa o una decisión automatizada sobre los residentes.')
p(d,'La ausencia de evaluación participativa delimita el alcance de la contribución. El estudio no mide representatividad, equidad en la deliberación, confianza, consenso o cambios en políticas. Tampoco acredita que una visualización 3D reproduzca fielmente la topografía o que un índice heurístico equivalga a una medición ambiental. Estos componentes requieren validación independiente antes de emplearse en decisiones de inversión, seguridad o planificación.')
h(d,'6 Plan de evaluación posterior')
p(d,'La siguiente fase deberá separar validación territorial y evaluación con usuarios. Para la primera, se requiere una base de precios observados que identifique fuente, fecha, unidad, localización y tipo de registro; los precios de oferta deberán distinguirse de transacciones o avalúos. Las geometrías de manzana deberán vincularse mediante identificadores verificados. El protocolo definirá bloques geográficos, un conjunto externo y, si procede, separación temporal antes del ajuste de hiperparámetros. También deberá comparar resultados con modelos de referencia e incluir análisis de sensibilidad a las variables simuladas que se sustituyan.')
p(d,'Para la evaluación con residentes se propone un estudio piloto de factibilidad, seguido de una evaluación comparativa cuyo tamaño muestral se determine a partir del desenlace principal y la variabilidad del piloto. Las tareas incluirán localizar un servicio, modificar un escenario, interpretar un indicador y expresar una preferencia. Se registrarán éxito por tarea, tiempo, errores, ayuda requerida y comprensión de la condición simulada de los resultados. Una comparación posterior podrá utilizar un procedimiento convencional de mapas y fichas como referencia, con asignación o contrabalanceo previamente definidos.')
p(d,'La selección deberá explicitar edad, residencia, experiencia digital y necesidades de accesibilidad; la baja alfabetización digital no se inferirá a partir del ingreso. Se establecerán consentimiento informado, resguardo de datos y la revisión institucional aplicable antes del reclutamiento. Las entrevistas sobre comprensión y deliberación complementarán los resultados cuantitativos. El piloto permitirá ajustar instrumentos, pero no se utilizará por sí solo para afirmar efectos comunitarios generalizables.')
h(d,'7 Conclusiones')
p(d,'Se desarrolló un prototipo orientado a la exploración de escenarios de vivienda social y se evaluó su módulo predictivo mediante un experimento reproducible con 8.028 registros mixtos. La trazabilidad distingue conteos censales conservados de atributos y objetivos simulados. CatBoost presentó el menor RMSE medio de validación y alcanzó R² = 0,7392, RMSE = 91,56 y MAE = 68,49 en el conjunto independiente de prueba, bajo la configuración estudiada.')
p(d,'Estos resultados respaldan el funcionamiento del procedimiento de entrenamiento y evaluación en un entorno sintético. No permiten afirmar precisión inmobiliaria real, generalización espacial, eficacia del co-diseño ni accesibilidad para residentes. La contribución establece una base técnica documentada y delimita las verificaciones necesarias para avanzar hacia una plataforma territorial y participativa evaluada con evidencia observada.')
h(d,'Declaraciones')
h2(d,'Uso de inteligencia artificial')
p(d,'Se utilizaron Claude para apoyar la reorganización y redacción del manuscrito, Consensus como apoyo a la búsqueda bibliográfica y Antigravity y Google AI Studio para asistir en la construcción del código. En la revisión se utilizó Codex para auditar archivos, preparar una nueva ejecución computacional y editar el texto. Las métricas proceden de la ejecución de algoritmos sobre los archivos documentados. La selección de fuentes, la interpretación científica, la comprobación del código y la aprobación de la versión final son responsabilidad de los autores. Estas herramientas no figuran como autoras.')
h2(d,'Financiación y conflictos de intereses')
p(d,'El estudio no recibió financiación externa. Los autores declaran no tener conflictos de intereses.')
h2(d,'Disponibilidad de código y datos')
p(d,'El material complementario incluye los archivos del experimento, las predicciones y su configuración. El repositorio del proyecto indicado por los autores es https://github.com/lava-reefnotw2/digitaltwininmobiliario. La publicación de una versión archivada con identificador persistente y licencias explícitas de código y datos forma parte de las acciones de disponibilidad pendientes; no se declara un DOI ni una licencia todavía no formalizados.')
page(d)
h(d,'Referencias')
refs=[
'Breiman, L. (2001). Random forests. Machine Learning, 45, 5–32. https://doi.org/10.1023/A:1010933404324',
'Chen, T., & Guestrin, C. (2016). XGBoost: A scalable tree boosting system. En Proceedings of the 22nd ACM SIGKDD International Conference on Knowledge Discovery and Data Mining (pp. 785–794). ACM. https://doi.org/10.1145/2939672.2939785',
'Dembski, F., Wössner, U., Letzgus, M., Ruddat, M., & Yamu, C. (2020). Urban digital twins for smart cities and citizens: The case study of Herrenberg, Germany. Sustainability, 12(6), 2307. https://doi.org/10.3390/su12062307',
'IBM. (s. f.). CRISP-DM help overview. IBM Documentation. https://www.ibm.com/docs/en/spss-modeler/saas?topic=dm-crisp-help-overview',
'Instituto Nacional de Estadística e Informática. (2024, 7 de febrero). Consultar base de datos de los censos nacionales 2017 – Redatam. Plataforma del Estado Peruano. https://www.gob.pe/24120-consultar-base-de-datos-de-los-censos-nacionales-2017-redatam',
'Ke, G., Meng, Q., Finley, T., Wang, T., Chen, W., Ma, W., Ye, Q., & Liu, T.-Y. (2017). LightGBM: A highly efficient gradient boosting decision tree. Advances in Neural Information Processing Systems, 30. https://proceedings.neurips.cc/paper_files/paper/2017/hash/6449f44a102fde848669bdd9eb6b76fa-Abstract.html',
'Prokhorenkova, L., Gusev, G., Vorobev, A., Dorogush, A. V., & Gulin, A. (2018). CatBoost: Unbiased boosting with categorical features. Advances in Neural Information Processing Systems, 31. https://proceedings.neurips.cc/paper/7898-catboost-unbiased-boosting-with-categorical-features.pdf',
'Qanazi, S., Leclerc, E., & Bosredon, P. (2025). Integrating social dimensions into urban digital twins: A review and proposed framework for social digital twins. Smart Cities, 8(1), 23. https://doi.org/10.3390/smartcities8010023',
'Roberts, D. R., Bahn, V., Ciuti, S., Boyce, M. S., Elith, J., Guillera-Arroita, G., Hauenstein, S., Lahoz-Monfort, J. J., Schröder, B., Thuiller, W., Warton, D. I., Wintle, B. A., Hartig, F., & Dormann, C. F. (2017). Cross-validation strategies for data with temporal, spatial, hierarchical, or phylogenetic structure. Ecography, 40(8), 913–929. https://doi.org/10.1111/ecog.02881',
'White, G., Zink, A., Codecá, L., & Clarke, S. (2021). A digital twin smart city for citizen feedback. Cities, 110, 103064. https://doi.org/10.1016/j.cities.2020.103064']
for ref in refs:
 q=p(d,ref);q.paragraph_format.left_indent=Cm(.6);q.paragraph_format.first_line_indent=Cm(-.6)
d.save(OUT/'Articulo_corregido_Bardales_Rodriguez.docx')

c=doc('Correcciones del manuscrito y opciones de publicación')
p(c,'Bardales Leon y Rodríguez Silva · Revisión del 25 de octubre de 2026')
p(c,'La revisión reorienta el manuscrito como desarrollo de un prototipo con evaluación computacional de datos mixtos. Se reemplazaron las cifras históricas por una ejecución nueva y documentada. El artículo no debe considerarse listo para envío hasta cerrar la disponibilidad pública, confirmar las declaraciones de autoría y adaptar el formato a la revista elegida. La validación territorial y participativa siguen siendo fases posteriores.')
h(c,'1 Cambios principales')
p(c,'Se alinearon título, resumen, abstract, objetivos, método, resultados y conclusiones. Se eliminaron afirmaciones de evaluación comunitaria completada, entrenamiento con GHSL o ONU-Hábitat no acreditado, PostGIS como infraestructura efectiva y Gradient Boosting como algoritmo espacial o red de grafos. La teoría se concentró en antecedentes directamente relacionados con el alcance actual y se retiraron citas incompletas o sin función en el argumento revisado.')
p(c,'El cotejo con reporte.xlsx confirmó 8.028 identificadores y coincidencia de viviendas, hogares y población. El valor del suelo y buena parte de los atributos son simulados. Se documentaron fórmula, semilla, perfiles y límites. Se verificó que el CSV contiene 23 columnas, no presenta faltantes y utiliza 15 predictores después de las exclusiones.')
p(c,'Se ejecutó nuevamente la comparación de los cinco algoritmos con cinco particiones internas y una prueba reservada común. Se añadieron una línea base, intervalos bootstrap del 95 %, contrastes pareados exploratorios y gráficos calculados con las mismas predicciones. La nueva tabla sustituye a la anterior: no constituye su reproducción histórica, cuya configuración exacta no se ha identificado.')
h(c,'2 Respuesta al punto 9 del informe de revisión')
p(c,'Los identificadores siguientes corresponden al plan detallado de correcciones del informe. “Resuelto” indica una modificación comprobada en esta revisión; “parcial” identifica trabajo realizado y un requisito todavía abierto. No se marca como ejecutada ninguna evaluación con participantes, validación espacial, publicación en Zenodo o asignación de DOI.')
items=[
('FON-01','Resuelto mediante reencuadre','Título, resúmenes y secciones 1 y 3.1. Se adopta un artículo de desarrollo tecnológico con experimento computacional. Se elimina la denominación de protocolo del artículo completo y se reserva un plan prospectivo en la sección 6. La descripción no promete evaluación completa de la plataforma.'),
('FON-02','Resuelto para el alcance sintético','Secciones 3.3 y 3.4 y Tabla 3. Se identifica el objetivo como generado por fórmula, se separan conteos y atributos simulados, se aclara la ausencia de precios observados y se retira la atribución de variables sintéticas a instituciones. Para valorar suelo real se necesitará otra base empírica.'),
('FON-03','Resuelto para la nueva ejecución','Secciones 3.5 y 3.6, Tablas 4–6 y Figura 1. Se guardan predicciones y particiones; se calculan intervalos de 2.000 remuestras y comparaciones pareadas con corrección de Holm. Se sustituye “ganador” por modelo de referencia seleccionado. Se usa una prueba de aleatorización sobre errores absolutos en lugar de aplicar Wilcoxon mecánicamente a cinco folds dependientes. La inferencia queda condicionada a los modelos y datos sintéticos.'),
('FON-04','Parcial y alcance corregido','Secciones 3.2, 4.1, 5 y 6. Se describe evidencia del módulo computacional y el resultado de cinco pruebas automatizadas. Se incorpora un plan de usabilidad y comprensión con residentes; no se inventan participantes, instrumentos aplicados o efectos sociales. La eficacia del co-diseño sigue sin estar evaluada.'),
('FON-05','Resuelto','Sección 3.1. Se describen las seis fases de CRISP-DM y se precisa qué significa despliegue en este prototipo.'),
('FON-06','Parcial y justificación explícita','Secciones 3.5, 3.7 y 6. Se declara KFold aleatorio y se elimina la afirmación de validación espacial realizada. Sin coordenadas o geometrías verificadas no se puede formar una partición espacial válida. GroupKFold por identificador único no resolvería por sí solo la proximidad entre manzanas. Quedan pendientes geometrías, bloques y prueba geográfica externa.'),
('FON-07','Resuelto','Resumen y abstract. Ambos describen idéntico objetivo, 8.028 registros, 6.422 de desarrollo, 1.606 de prueba, métricas nuevas y límites de interpretación.'),
('FON-08','Parcial','Sección 3.7 y disponibilidad de datos. Se prepara un paquete local con datos, código, configuraciones, versiones y resultados. No se afirma que ya exista depósito público. Deben acordarse licencias, comprobar derechos de redistribución y crear una versión archivada y un DOI antes del envío si la revista lo exige.'),
('FON-09','Parcial hasta confirmación de los autores','Declaración de IA. Se distinguen apoyos en redacción, búsqueda, programación y revisión. Se añade el uso de Codex en esta revisión y se eliminan números de modelo no confirmados. Los autores deben comprobar nombres/versiones efectivamente usados y detallar su intervención humana sin atribuir revisiones que no realizaron.'),
('FON-10','Resuelto en la bibliografía retenida','Se revisó correspondencia entre citas y entradas. Kuhn y Schäfer ya estaban correctamente escritos en la versión recibida; no se aplicaron las erratas que el informe les atribuía. La nueva bibliografía es más corta y pertinente al alcance. Se retiraron citas sin entrada completa en lugar de inventar referencias.'),
('FON-11','Resuelto','Corrección integral de gramática, registro, términos y repeticiones. Se eliminan “información sensual”, “redichos”, “or” y “PosrGIS”. SHAP se escribe correctamente en la mención a trabajo futuro; no se afirma haberlo aplicado.'),
('FON-12','Resuelto','Discusión y conclusiones. Se limita el resultado al prototipo y al experimento sintético. Se explicita que no se ha demostrado usabilidad, inclusión, incidencia comunitaria o precisión inmobiliaria real.')]
for ident,status,body in items:
 h2(c,ident+' '+status);p(c,body)
h2(c,'Correcciones de forma FOR-01 a FOR-05')
table(c,['ID','Corrección aplicada','Estado'],[
['FOR-01','Reescritura lingüística y uniformidad de términos.','Resuelto'],
['FOR-02','Bibliografía autor–año normalizada; referencias retenidas citadas en el cuerpo.','Resuelto para esta versión; adaptar al destino.'],
['FOR-03','Abstract alineado con el resumen.','Resuelto'],
['FOR-04','Tablas con IC para R², RMSE, MAE y diferencias de MAE.','Resuelto'],
['FOR-05','Título centrado en prototipo y datos mixtos.','Resuelto']],[2,10,4.4])
h(c,'3 Evidencia y material reproducible')
p(c,'La ejecución nueva obtuvo para CatBoost R² = 0,7392, RMSE = 91,56 y MAE = 68,49. Los IC del 95 % fueron [0,7181; 0,7585], [87,32; 95,97] y [65,62; 71,67], respectivamente. Los resultados antiguos no se conservaron como si fueran verificables. En la tabla anterior, los pares de R² y RMSE eran incompatibles con una única muestra bajo las definiciones estándar; la nueva ejecución cumple esa identidad y guarda la evidencia por fila.')
p(c,'El paquete de reproducción contiene el CSV evaluado, los módulos de entrenamiento, el script de evaluación, el generador original, los índices de partición, parámetros y predicciones. Se incluyen huellas SHA-256 para identificar los archivos y versiones exactas del entorno. La comprobación automática existente ejecutó cinco pruebas y finalizó correctamente. Los avisos de compatibilidad de Streamlit no se interpretaron como validación completa de todas las vistas.')
p(c,'No se modificó el código funcional de la aplicación durante esta revisión. La auditoría identificó riesgos que requieren una tarea de software aparte: etiquetas que atribuyen realidad u oficialidad a datos de demostración; índices ambientales o de accesibilidad heurísticos; y una tabla de índices aleatorios del módulo AHP cuya indexación debe revisarse. Estos componentes no se presentan como validados en el manuscrito.')
h(c,'4 Recursos pendientes antes del envío')
table(c,['Recurso o decisión','Acción concreta','Responsable'],[
['Revista de destino','Elegir alcance, idioma, plantilla y presupuesto.','Autores'],
['Revisión científica final','Aprobar resultados nuevos, declaración de IA, nombres, afiliación, contribuciones y autor de correspondencia.','Autores'],
['Disponibilidad pública','Crear una versión estable; elegir licencia de código; verificar condiciones de los datos; depositar y obtener DOI.','Autores con apoyo técnico'],
['Trazabilidad del INEI','Conservar consulta REDATAM, filtros, fecha de extracción y metadatos del archivo original.','Autores'],
['Validación territorial','Conseguir geometrías verificadas y precios observados con fuente y fecha; definir bloques antes de entrenar.','Equipo de investigación'],
['Evaluación comunitaria','Preparar instrumentos, protocolo, tamaño muestral justificado, revisión institucional y reclutamiento.','Equipo de investigación']],[4,8.4,4])
p(c,'Los dos últimos recursos son necesarios para ampliar las conclusiones a territorio y participación. No se han convertido en requisitos ficticiamente cumplidos por reescritura. Para el enfoque actual deben mantenerse como límites expresos, y la revista decidirá si la contribución tecnológica preliminar resulta suficiente.')
h(c,'5 Revistas con mejor afinidad temática')
p(c,'La selección siguiente se basa en los alcances y guías oficiales consultados el 25 de octubre de 2026. La afinidad es una valoración editorial, no una predicción de aceptación. El cuerpo actual está más próximo a software de investigación, informática urbana y evaluación computacional que a una investigación empírica sobre procesos de urbanización.')
h2(c,'Primera opción SoftwareX si se centra en el software')
p(c,'Elsevier describe SoftwareX como una revista dedicada a software de investigación y sus aplicaciones. Es la opción más coherente si la contribución principal será la herramienta reutilizable. Para ese destino conviene reducir la revisión general de urbanismo, demostrar instalación y uso, aportar un caso reproducible, comparar funciones con herramientas existentes y formalizar una versión pública con licencia. La guía y la plantilla deben consultarse antes de adaptar extensión y estructura. El acceso directo a la guía devolvió una restricción durante esta revisión; no se atribuyen aquí un límite de palabras ni una tarifa concreta no comprobados.')
p(c,'Fuente oficial: https://www.elsevier.com/researcher/author/tools-and-resources/research-elements-journals')
h2(c,'Segunda opción Ingeniería de la Universidad Distrital')
p(c,'Su alcance comprende investigación y desarrollo en ingeniería y tecnología. Es una alternativa si se enfatiza integración de software, evaluación reproducible y límites técnicos. La guía consultada acepta artículos únicamente en inglés, con un máximo de 6.000 palabras, y declara que no cobra APC. Requiere su plantilla, resumen estructurado y referencias numéricas; por ello, el Word en español entregado es una base de revisión científica y no una adaptación final para esta revista.')
p(c,'Fuente oficial: https://revistas.udistrital.edu.co/index.php/reving/about/submissions')
h2(c,'Tercera opción ISPRS International Journal of Geo Information')
p(c,'Su alcance incluye GeoAI, geosimulación, geovisualización, informática urbana y gemelos digitales. La afinidad temática es alta, pero el artículo debe fortalecer su componente geográfico: una tabla sintética sin geometrías verificadas limita el aporte geoespacial. Antes de priorizarla se recomienda añadir un caso georreferenciado y evaluación por bloques, o una contribución metodológica de geoinformación claramente demostrada. Tiene cargos de publicación; consultar la tarifa vigente y descuentos aplicables.')
p(c,'Fuentes oficiales: https://www.mdpi.com/journal/ijgi/about y https://www.mdpi.com/about/apc')
h2(c,'Cuarta opción Urban Science si se refuerza la aplicación urbana')
p(c,'Publica investigación urbana y regional con métodos cuantitativos y cualitativos. Permite mantener más contexto de vivienda y planificación que una revista centrada en software. Para mejorar su encaje haría falta demostrar cómo la herramienta cambia o esclarece una comparación de escenarios urbanos, más allá de predecir una variable sintética. La lista oficial consultada indica un APC básico de 1.800 CHF, sujeto a condiciones y cambios; no se ha contratado ni pagado ningún servicio.')
p(c,'Fuentes oficiales: https://www.mdpi.com/journal/urbansci y https://www.mdpi.com/about/apc')
h2(c,'Alternativa exigente Journal of Spatial Information Science')
p(c,'JOSIS cubre computación geoespacial, interfaces geográficas y modelos de información espacial, y declara no cobrar a autores ni lectores. Sería una opción si se desarrolla una contribución original en ciencia de la información geográfica. No la priorizaría para la versión actual: sus criterios exigen una evaluación convincente y una contribución cuya novedad exceda ensamblar componentes conocidos.')
p(c,'Fuente oficial: https://josis.org/index.php/josis/about')
p(c,'Recomendación: priorizar SoftwareX si se quiere publicar la plataforma como software de investigación; considerar Ingeniería si se busca un artículo de ingeniería aplicada sin APC y se puede traducir íntegramente al inglés. IJGI y Urban Science ganan pertinencia al incorporar evidencia territorial. Cambiar de revista no resuelve por sí solo la falta de datos observados o evaluación comunitaria.')
h(c,'6 Comprobación del envío anterior')
p(c,'Antes de enviar a otro destino, confirmar que la evaluación en Revista de Urbanismo de la Universidad de Chile terminó o que el manuscrito fue retirado. Esta revisión no envía documentos, no contacta editores y no publica datos. La versión corregida mantiene un formato académico general para permitir la elección del destino sin confundirlo con una adaptación editorial ya completada.')
c.save(OUT/'Respuesta_revision_y_revistas.docx')
print('Documentos creados')
