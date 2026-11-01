# Experimento computacional del prototipo

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
