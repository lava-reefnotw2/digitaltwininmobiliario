from pathlib import Path
import json,csv,zipfile,hashlib
OUT=Path(__file__).parent;ROOT=OUT.parents[1]
files={}
def add(path,arc=None):files[arc or path.relative_to(ROOT).as_posix()]=path.read_bytes()
for n in ['evaluar.py','verificar_resultados.py','resultados.json','predicciones_prueba.csv','metricas.csv','auditoria_datos.json','diagnosticos.png']:
 add(OUT/n)
for n in ['core/__init__.py','core/ai_experiment.py','core/ai_ml_models.py','core/explainability.py','core/statistical_testing.py','views/__init__.py','views/ai_engine_view.py','scripts/test_ai_experiment.py','outputs/sjl_prueba/reporte_SJL_ampliado_prueba.csv','outputs/sjl_prueba/preparar.py','data_json/real_urban_dataset_peru.csv']:
 add(ROOT/n)
add(Path(r'C:/Users/USUARIO/Downloads/reporte.xlsx'),'fuentes/reporte.xlsx')
req=(OUT/'requirements_experimento.txt').read_text(encoding='utf-8')+'\njoblib==1.6.0\nopenpyxl==3.1.5\nstreamlit==1.66.0\nplotly==7.1.0\n'
files['requirements.txt']=req.encode()
files['README.md']='''# Experimento computacional del prototipo

Revisión del 25 de octubre de 2026. Este paquete conserva una ejecución nueva;
no reproduce de forma retrospectiva la tabla de la versión anterior del artículo.
El objetivo y los atributos territoriales son simulados. Solo los tres conteos
se cotejaron con la exportación censal local incluida en fuentes/reporte.xlsx.
No hay coordenadas verificadas, validación espacial ni resultados de residentes.

## Comprobación sin dependencias externas

Desde la raíz descomprimida, con Python 3.12:

    python outputs/revision_articulo/verificar_resultados.py

Comprueba métricas desde predicciones, identidad R²–RMSE y separación de índices.

## Reentrenamiento

Crear un entorno aislado e instalar requirements.txt. Después:

    python outputs/revision_articulo/evaluar.py

El script lee el CSV incluido y vuelve a escribir resultados en su carpeta.
La configuración está en el propio script y en resultados.json. Mantener una
copia de este paquete para conservar la evidencia inicial. Se pueden producir
pequeñas diferencias entre plataformas o versiones de bibliotecas numéricas.

    python -m unittest discover -s scripts -p test_ai_experiment.py

La suite existente ejecutó cinco pruebas con resultado OK durante la revisión.
No constituye una auditoría completa de la plataforma.

## Procedencia y generación

El generador original se conserva en outputs/sjl_prueba/preparar.py, con su ruta
histórica al Excel; no hace falta ejecutarlo para reproducir el experimento ML.
Para regenerar los atributos en una carpeta nueva:

    python regenerar_datos.py

Esta adaptación solo cambia rutas y exporta el resultado del generador a CSV.
No modifica el CSV utilizado en el entrenamiento. Los identificadores se extraen
del campo textual de manzana, evitando el código numérico de Excel que pierde
precisión. Las distribuciones y llamadas aleatorias mantienen el orden original.

diccionario_variables.csv documenta las 23 columnas. resultados.json contiene
los parámetros completos, versiones, índices y métricas; predicciones_prueba.csv
permite recalcular las métricas sin entrenar. Los IC de bootstrap son condicionales
a modelos fijos y no cubren variación entre generaciones sintéticas.

## Alcance de distribución

Paquete local para revisión de los autores. No se ha publicado ni depositado en
Zenodo y no tiene DOI. Los autores deben formalizar las licencias de código y
datos y verificar derechos de redistribución antes de publicarlo. Las etiquetas
heredadas "real" u "oficial" en nombres del código no acreditan origen oficial.
'''.encode('utf-8')
files['regenerar_datos.py']='''from pathlib import Path
import csv, json, tempfile
root=Path(__file__).resolve().parent
source=(root/'outputs/sjl_prueba/preparar.py').read_text(encoding='utf-8-sig')
source=source.replace("source = Path(r'C:\\\\Users\\\\USUARIO\\\\Downloads\\\\reporte.xlsx')", "source = root/'fuentes/reporte.xlsx'")
# Use explicit line replacements to avoid platform-dependent escaping.
lines=source.splitlines()
lines=["source = root/'fuentes/reporte.xlsx'" if line.startswith('source = Path(') else line for line in lines]
lines=["out = root/'regeneracion'" if line.startswith('out = Path(') else line for line in lines]
lines=[line.replace('Path.cwd()', 'root') for line in lines]
(root/'regeneracion').mkdir(exist_ok=True)
exec(compile('\\n'.join(lines),'generador_adaptado','exec'),{'root':root,'__file__':str(root/'outputs/sjl_prueba/preparar.py')})
data=json.loads((root/'regeneracion/intermedio.json').read_text(encoding='utf-8'))
with (root/'regeneracion/datos.csv').open('w',newline='',encoding='utf-8') as f:
 w=csv.writer(f);w.writerow(data['headers']);w.writerows(data['rows'])
with (root/'outputs/sjl_prueba/reporte_SJL_ampliado_prueba.csv').open(encoding='utf-8-sig') as f:original=list(csv.DictReader(f))
assert len(original)==len(data['rows'])
for original_row,new_row in zip(original,data['rows']):
 for key,new in zip(data['headers'],new_row):
  if isinstance(new,(float,int)):assert abs(float(original_row[key])-new)<1e-8
  else:assert original_row[key]==new
print('OK: regeneracion coincide con CSV evaluado')
'''.encode('utf-8')
import io
s=io.StringIO();w=csv.writer(s);w.writerow(['variable','procedencia','papel'])
R=json.loads((OUT/'resultados.json').read_text(encoding='utf-8'))
with (ROOT/'outputs/sjl_prueba/reporte_SJL_ampliado_prueba.csv').open(encoding='utf-8-sig') as f:headers=next(csv.reader(f))
for col in headers:
 provenance='Simulada; no medición territorial'
 if col in ['viviendas_inei','hogares_inei','poblacion_inei']:provenance='Conteo conservado de reporte.xlsx'
 elif col=='densidad_hab_ha':provenance='Mixta: población / área simulada'
 elif col=='area_manzana_m2_simulada':provenance='Simulada a partir del conteo de viviendas y supuestos'
 elif col in ['manzana_id','distrito','ciudad','anio_censo','tipo_datos']:provenance='Identificador o metadato'
 role='Predictor' if col in R['features'] else ('Objetivo sintético' if col=='valor_suelo_usd_m2' else 'Excluida')
 w.writerow([col,provenance,role])
files['diccionario_variables.csv']=s.getvalue().encode('utf-8-sig')
files['MANIFEST_SHA256.json']=json.dumps({n:hashlib.sha256(b).hexdigest() for n,b in files.items()},indent=2).encode()
with zipfile.ZipFile(OUT/'Material_reproducible.zip','w',zipfile.ZIP_DEFLATED) as z:
 for n,b in files.items():z.writestr(n,b)
test=OUT/'comprobacion_paquete';test.mkdir(exist_ok=True)
with zipfile.ZipFile(OUT/'Material_reproducible.zip') as z:z.extractall(test)
print('ZIP creado:',len(files),'archivos')
