import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { Workbook, SpreadsheetFile } from '@oai/artifact-tool';
const out = new URL('.', import.meta.url);
const d = JSON.parse(await fs.readFile(new URL('intermedio.json',out),'utf8'));
const wb = Workbook.create();
const data = wb.worksheets.add('Dataset_prueba');
const source = wb.worksheets.add('INEI_original');
const doc = wb.worksheets.add('Diccionario');
data.getRange(`A1:W${d.rows.length+1}`).values=[d.headers,...d.rows];
data.getRange(`A2:A${d.rows.length+1}`).setNumberFormat('@');
data.getRange(`D2:K${d.rows.length+1}`).setNumberFormat('#,##0.00');
data.getRange(`N2:N${d.rows.length+1}`).setNumberFormat('0');
data.getRange(`O2:P${d.rows.length+1}`).setNumberFormat('#,##0.00');
data.getRange(`R2:T${d.rows.length+1}`).setNumberFormat('#,##0');
data.getRange(`U2:U${d.rows.length+1}`).setNumberFormat('#,##0.00');
data.tables.add(`A1:W${d.rows.length+1}`,true,'DatasetSJLPrueba');
data.getRange('A1:W1').format.rowHeight=48;
data.getRange('A1:W1').format.wrapText=true;
data.getRange(`A1:W${d.rows.length+1}`).format.columnWidth=22;
data.getRange('A1:A8029').format.columnWidth=27;
data.getRange('B1:B8029').format.columnWidth=28;
data.getRange('W1:W8029').format.columnWidth=52;
data.freezePanes.freezeRows(1);
data.freezePanes.freezeColumns(1);
source.getRange(`A1:F${d.raw.length}`).values=d.raw;
source.getRange(`B1:B${d.raw.length}`).format.columnWidth=25;
source.getRange(`C1:C${d.raw.length}`).format.columnWidth=110;
source.getRange(`D1:F${d.raw.length}`).format.columnWidth=17;
source.getRange('B6:F6').format.rowHeight=30;
source.freezePanes.freezeRows(6);
const info = [
 ['Campo / asunto','Origen y significado'],
 ['Uso','Dataset de prueba de carga y entrenamiento. No valida precision para decisiones reales.'],
 ['Base real','Fuente: reporte.xlsx aportado por el usuario; INEI, Censo 2017, SJL urbano.'],
 ['Integridad','Se conservan 8.028 registros y los conteos originales de viviendas, hogares y poblacion.'],
 ['Identificador','manzana_id se extrae como texto de Manzana, antes de la primera coma.'],
 ['Codigo original','La columna numerica Codigo del reporte puede haber perdido precision. No se usa para unir.'],
 ['Simulacion','Semilla 20261017. Perfiles inventados: consolidado 40%, intermedio 38%, ladera 22%.'],
 ['Ubicacion','Los perfiles no identifican ubicaciones reales ni delimitan quebrada Huascar.'],
 ['Dependencias','Perfiles relacionan pendiente, accesibilidad, materiales, antiguedad y precio; se agrega ruido.'],
 ['Evaluacion','Un buen resultado del modelo solo mide aprendizaje de estas reglas simuladas.'],
 ['Entrenamiento','Cargar la primera hoja Dataset_prueba. Objetivo recomendado: valor_suelo_usd_m2.'],
 ['Predictores iniciales','area_lote_m2, densidad_hab_ha, distancia_via_principal_m, distancia_salud_m, distancia_escuela_m, pendiente_terreno_pct, indice_vulnerabilidad_cenepred, area_verde_per_capita_m2'],
 ['Excluir al predecir precio','Excluir viabilidad_vivienda_pct y riesgo_deslizamiento para evitar indicadores derivados del mismo mecanismo; excluir metadatos e identificadores.'],
 ['Conteos','314581 viviendas; 274657 hogares; 1038495 personas.'],
 ['manzana_id','REAL: identificador censal completo almacenado como texto.'],
 ['distrito / ciudad','REAL: San Juan de Lurigancho / Lima.'],
 ['viviendas_inei / hogares_inei / poblacion_inei','REAL: conteos de la exportacion, sin alteracion.'],
 ['anio_censo','REAL: 2017; no es la fecha de observacion de los atributos inventados.'],
 ['area_lote_m2','SIMULADO: lote representativo de 55 a 420 m2; no es superficie de la manzana.'],
 ['area_manzana_m2_simulada','SIMULADO: viviendas x lote / intensidad edificada x factor de espacio comun; minimo 250 m2.'],
 ['densidad_hab_ha','MIXTO: poblacion real / superficie simulada en hectareas; no es densidad oficial.'],
 ['distancia_via_principal_m','SIMULADO: 15 a 1800 metros. Sin calculo GIS.'],
 ['distancia_salud_m','SIMULADO: 70 a 3500 metros. Sin calculo GIS.'],
 ['distancia_escuela_m','SIMULADO: 40 a 2000 metros. Sin calculo GIS.'],
 ['pendiente_terreno_pct','SIMULADO: 0 a 55%; sin medicion de elevaciones.'],
 ['indice_vulnerabilidad_cenepred','SIMULADO: escala 5 a 95. Nombre compatible con el proyecto; NO proviene de CENEPRED ni aplica su metodologia.'],
 ['area_verde_per_capita_m2','SIMULADO: 0.1 a 12 m2 por habitante.'],
 ['estrato_socioeconomico','SIMULADO: Muy Bajo, Bajo, Medio o Medio Alto. No clasificacion oficial.'],
 ['material_paredes','SIMULADO: categoria representativa de prueba; no observacion censal de la manzana.'],
 ['antiguedad_construccion_anios','SIMULADO: antiguedad representativa de 1 a 65 anios, sin fecha real de referencia.'],
 ['valor_suelo_usd_m2','SIMULADO: 35 a 1100 USD/m2; precio condicionado por acceso, pendiente, estrato y ruido. No tasacion.'],
 ['viabilidad_vivienda_pct','SIMULADO: puntaje de prueba entre 5 y 98; no probabilidad calibrada ni dictamen tecnico.'],
 ['riesgo_deslizamiento','SIMULADO: Bajo, Medio, Alto, Muy Alto segun pendiente/vulnerabilidad y ruido; no mapa de peligros.'],
 ['tipo_datos','MIXTO: conteos INEI + atributos SIMULADOS; identifica la naturaleza del archivo en cada fila.'],
 ['Reproducibilidad','Scripts de preparacion y construccion conservados junto a esta copia del proyecto.']
];
doc.getRange(`A1:B${info.length}`).values=info;
doc.getRange(`A1:A${info.length}`).format.columnWidth=43;
doc.getRange(`B1:B${info.length}`).format.columnWidth=112;
doc.getRange(`A1:B${info.length}`).format.wrapText=true;
doc.getRange(`A1:B${info.length}`).format.rowHeight=44;
for (const s of [data,source,doc]) {
 s.showGridLines=false;
 s.getUsedRange().format.font.name='Arial';
 s.getUsedRange().format.font.size=10;
 s.getUsedRange().format.verticalAlignment='center';
}
for (const [s,range] of [[data,'A1:W1'],[source,'B6:F6'],[doc,'A1:B1']]) {
 s.getRange(range).format.fill='#183750';
 s.getRange(range).format.font.color='#FFFFFF';
 s.getRange(range).format.font.bold=true;
}
data.getRange('D1:Q1').format.fill='#825A20';
doc.freezePanes.freezeRows(1);
wb.recalculate();
console.log((await wb.inspect({kind:'table',range:'Dataset_prueba!A1:F4',tableMaxRows:4,tableMaxCols:6})).ndjson);
for (const [sheetName,range,file] of [['Dataset_prueba','A1:F8','vista_dataset.png'],['INEI_original','B6:F12','vista_fuente.png'],['Diccionario','A1:B8','vista_diccionario.png']]) {
 const p=await wb.render({sheetName,range,scale:1.3,format:'png'});
 await fs.writeFile(new URL(file,out),new Uint8Array(await p.arrayBuffer()));
}
const xlsx=await SpreadsheetFile.exportXlsx(wb);
await xlsx.save(fileURLToPath(new URL('reporte_SJL_ampliado_prueba.xlsx',out)));
console.log('Exportado: 8028 registros, 23 columnas.');
