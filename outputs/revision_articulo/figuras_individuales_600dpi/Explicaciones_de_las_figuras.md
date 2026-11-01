# Figuras individuales de la evaluación de CatBoost

Las figuras se reconstruyeron desde los 1.606 pares de referencia simulada y predicción del conjunto de prueba guardado. Corresponden a R² = 0,7392, RMSE = 91,56 y MAE = 68,49. No se volvió a entrenar ni se modificaron las predicciones. La escala USD/m² corresponde al objetivo sintético y no a precios de mercado observados.

Cada figura se entrega como PNG y TIFF con compresión sin pérdida, en 3.900 × 2.700 píxeles a 600 dpi. A esa resolución su tamaño de impresión es de 16,51 × 11,43 cm. Las dos versiones muestran el mismo gráfico. La numeración 3–6 conserva la del artículo; las figuras 1 y 2 de arquitectura y diseño no se modificaron.

## Figura 3

**Gráfico de residuos frente a valores predichos.** Cada punto representa una observación del conjunto de prueba. El residuo se calcula como el valor de referencia simulado menos la predicción: un valor positivo indica subestimación y uno negativo indica sobreestimación. La línea horizontal marca el error cero. El gráfico permite examinar cambios en la dispersión y posibles patrones de error a lo largo de las predicciones. El residuo medio es 0.31 USD/m² y el intervalo entre los percentiles 2,5 y 97,5 de los residuos es [-156.86; 227.74] USD/m². Este intervalo describe los residuos; no es un intervalo de confianza ni de predicción.

Nota. Elaboración propia a partir de las predicciones de CatBoost sobre 1.606 registros de prueba con objetivo simulado.

## Figura 4

**Gráfico de distribución de residuos.** El histograma muestra la frecuencia de los errores agrupados en 35 intervalos. La línea vertical identifica el residuo cero y permite examinar la concentración, asimetría y presencia de errores extremos. La mediana de los residuos es -11.27 USD/m². La cercanía de parte de los errores a cero debe interpretarse junto con la amplitud de su distribución y no como prueba de exactitud inmobiliaria.

Nota. Elaboración propia. Residuo = referencia simulada − predicción.

## Figura 5

**Gráfico cuantil-cuantil de residuos.** Se comparan los residuos ordenados con los cuantiles teóricos de una distribución normal. La recta de referencia se ajusta a los puntos del gráfico; no representa el error cero. Las desviaciones respecto de ella permiten examinar diferencias con la distribución normal, especialmente en las colas. El gráfico es un diagnóstico descriptivo y no constituye por sí solo una prueba formal de normalidad ni un requisito de normalidad para utilizar CatBoost.

Nota. Elaboración propia a partir de los residuos del conjunto de prueba.

## Figura 6

**Gráfico de calibración por deciles de predicción.** Las observaciones se agrupan en diez deciles según el valor predicho. Cada punto compara la predicción media con la referencia simulada media del mismo grupo. La diagonal representa igualdad entre ambos promedios. Los puntos por encima de ella indican subestimación media y los situados por debajo indican sobreestimación media. La agrupación resume el comportamiento promedio y puede ocultar errores individuales; no demuestra calibración frente a precios de mercado reales. Los valores utilizados se incluyen en promedios_por_decil.csv.

Nota. Elaboración propia. Los deciles se construyen con las predicciones del conjunto de prueba.
