"""Exporta diagnósticos individuales desde las predicciones guardadas, sin reentrenar."""
from pathlib import Path
import json, hashlib, zipfile, os
os.environ.setdefault('MPLCONFIGDIR', str(Path(__file__).parent / '.matplotlib_cache'))
import numpy as np
import pandas as pd
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from scipy import stats
from PIL import Image

BASE = Path(__file__).resolve().parent
OUT = BASE / 'figuras_individuales_600dpi'
OUT.mkdir(exist_ok=True)
data = pd.read_csv(BASE / 'predicciones_prueba.csv')
result = json.loads((BASE / 'resultados.json').read_text(encoding='utf-8'))
y = data['referencia_simulada'].to_numpy()
p = data['catboost'].to_numpy()
e = y - p
assert len(y) == result['n_test'] == 1606
assert np.isfinite([y, p]).all()
assert abs(np.sqrt(np.mean(e**2)) - result['results']['catboost']['test']['rmse']) < 1e-8

plt.rcParams.update({'font.family': 'DejaVu Sans', 'font.size': 11,
                     'axes.spines.top': False, 'axes.spines.right': False,
                     'axes.labelcolor': '#222222', 'xtick.color': '#333333',
                     'ytick.color': '#333333', 'axes.edgecolor': '#777777',
                     'savefig.facecolor': 'white'})
manifest = []
def canvas():
    return plt.subplots(figsize=(6.5, 4.5), layout='constrained')
def save(fig, number, name):
    stem = f'Figura_{number}_{name}'
    fig.savefig(OUT / (stem + '.png'), dpi=600)
    fig.savefig(OUT / (stem + '.tiff'), dpi=600, pil_kwargs={'compression': 'tiff_lzw'})
    plt.close(fig)
    for ext in ['png', 'tiff']:
        path = OUT / (stem + '.' + ext)
        with Image.open(path) as im:
            dpi = im.info['dpi']
            assert im.size == (3900, 2700)
            assert all(abs(v - 600) < .1 for v in dpi)
            manifest.append({'archivo': path.name, 'pixeles': list(im.size),
                             'dpi': [float(v) for v in dpi], 'sha256': hashlib.sha256(path.read_bytes()).hexdigest()})

fig, ax = canvas()
ax.scatter(p, e, s=12, alpha=.42, color='#285878', edgecolors='none', rasterized=True)
ax.axhline(0, color='#333333', linewidth=1, linestyle='--')
ax.set(xlabel='Valor predicho (USD/m², escala simulada)',
       ylabel='Residuo: referencia − predicción (USD/m²)')
save(fig, 3, 'residuos_vs_prediccion')

fig, ax = canvas()
ax.hist(e, bins=35, color='#456d87', edgecolor='white', linewidth=.5)
ax.axvline(0, color='#333333', linewidth=1, linestyle='--')
ax.set(xlabel='Residuo: referencia − predicción (USD/m²)', ylabel='Frecuencia')
save(fig, 4, 'distribucion_residuos')

fig, ax = canvas()
(q, ordered), (slope, intercept, correlation) = stats.probplot(e, dist='norm')
ax.scatter(q, ordered, s=12, color='#285878', alpha=.65, edgecolors='none')
ax.plot(q, intercept + slope*q, color='#a64d35', linewidth=1.3)
ax.set(xlabel='Cuantil normal teórico', ylabel='Residuo ordenado (USD/m²)')
save(fig, 5, 'cuantil_cuantil_residuos')

dec = pd.DataFrame({'prediccion': p, 'referencia': y})
dec['decil'] = pd.qcut(dec.prediccion, 10, labels=False, duplicates='drop') + 1
means = dec.groupby('decil')[['prediccion', 'referencia']].mean()
means['n'] = dec.groupby('decil').size()
means.to_csv(OUT / 'promedios_por_decil.csv', index=True)
fig, ax = canvas()
low = min(means.prediccion.min(), means.referencia.min()) - 15
high = max(means.prediccion.max(), means.referencia.max()) + 15
ax.plot([low, high], [low, high], '--', color='#777777', linewidth=1.1, label='Igualdad entre promedios')
ax.plot(means.prediccion, means.referencia, 'o-', color='#285878', markersize=5,
        linewidth=1.2, label='Promedios por decil')
ax.set(xlabel='Predicción media (USD/m², escala simulada)',
       ylabel='Referencia simulada media (USD/m²)', xlim=(low, high), ylim=(low, high))
ax.legend(frameon=False, loc='upper left', fontsize=9)
save(fig, 6, 'calibracion_por_deciles')

descriptions = f'''# Figuras individuales de la evaluación de CatBoost

Las figuras se reconstruyeron desde los 1.606 pares de referencia simulada y predicción del conjunto de prueba guardado. Corresponden a R² = 0,7392, RMSE = 91,56 y MAE = 68,49. No se volvió a entrenar ni se modificaron las predicciones. La escala USD/m² corresponde al objetivo sintético y no a precios de mercado observados.

Cada figura se entrega como PNG y TIFF con compresión sin pérdida, en 3.900 × 2.700 píxeles a 600 dpi. A esa resolución su tamaño de impresión es de 16,51 × 11,43 cm. Las dos versiones muestran el mismo gráfico. La numeración 3–6 conserva la del artículo; las figuras 1 y 2 de arquitectura y diseño no se modificaron.

## Figura 3

**Gráfico de residuos frente a valores predichos.** Cada punto representa una observación del conjunto de prueba. El residuo se calcula como el valor de referencia simulado menos la predicción: un valor positivo indica subestimación y uno negativo indica sobreestimación. La línea horizontal marca el error cero. El gráfico permite examinar cambios en la dispersión y posibles patrones de error a lo largo de las predicciones. El residuo medio es {e.mean():.2f} USD/m² y el intervalo entre los percentiles 2,5 y 97,5 de los residuos es [{np.quantile(e,.025):.2f}; {np.quantile(e,.975):.2f}] USD/m². Este intervalo describe los residuos; no es un intervalo de confianza ni de predicción.

Nota. Elaboración propia a partir de las predicciones de CatBoost sobre 1.606 registros de prueba con objetivo simulado.

## Figura 4

**Gráfico de distribución de residuos.** El histograma muestra la frecuencia de los errores agrupados en 35 intervalos. La línea vertical identifica el residuo cero y permite examinar la concentración, asimetría y presencia de errores extremos. La mediana de los residuos es {np.median(e):.2f} USD/m². La cercanía de parte de los errores a cero debe interpretarse junto con la amplitud de su distribución y no como prueba de exactitud inmobiliaria.

Nota. Elaboración propia. Residuo = referencia simulada − predicción.

## Figura 5

**Gráfico cuantil-cuantil de residuos.** Se comparan los residuos ordenados con los cuantiles teóricos de una distribución normal. La recta de referencia se ajusta a los puntos del gráfico; no representa el error cero. Las desviaciones respecto de ella permiten examinar diferencias con la distribución normal, especialmente en las colas. El gráfico es un diagnóstico descriptivo y no constituye por sí solo una prueba formal de normalidad ni un requisito de normalidad para utilizar CatBoost.

Nota. Elaboración propia a partir de los residuos del conjunto de prueba.

## Figura 6

**Gráfico de calibración por deciles de predicción.** Las observaciones se agrupan en diez deciles según el valor predicho. Cada punto compara la predicción media con la referencia simulada media del mismo grupo. La diagonal representa igualdad entre ambos promedios. Los puntos por encima de ella indican subestimación media y los situados por debajo indican sobreestimación media. La agrupación resume el comportamiento promedio y puede ocultar errores individuales; no demuestra calibración frente a precios de mercado reales. Los valores utilizados se incluyen en promedios_por_decil.csv.

Nota. Elaboración propia. Los deciles se construyen con las predicciones del conjunto de prueba.
'''
(OUT / 'Explicaciones_de_las_figuras.md').write_text(descriptions, encoding='utf-8')
(OUT / 'verificacion.json').write_text(json.dumps({'modelo': 'CatBoost', 'n_prueba': len(y),
    'sha256_predicciones': hashlib.sha256((BASE / 'predicciones_prueba.csv').read_bytes()).hexdigest(),
    'metricas': result['results']['catboost']['test'], 'imagenes': manifest}, ensure_ascii=False, indent=2), encoding='utf-8')
with zipfile.ZipFile(BASE / 'Figuras_3_a_6_600dpi.zip', 'w', zipfile.ZIP_DEFLATED) as z:
    for path in sorted(OUT.iterdir()):
        if path.is_file(): z.write(path, path.name)
print(json.dumps({'carpeta':str(OUT), 'imagenes_verificadas':len(manifest), 'n':len(y),
                  'residuo_medio':float(e.mean()), 'residuo_mediano':float(np.median(e))},ensure_ascii=False))
