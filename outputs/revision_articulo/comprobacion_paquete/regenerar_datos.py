from pathlib import Path
import csv, json, tempfile
root=Path(__file__).resolve().parent
source=(root/'outputs/sjl_prueba/preparar.py').read_text(encoding='utf-8-sig')
source=source.replace("source = Path(r'C:\\Users\\USUARIO\\Downloads\\reporte.xlsx')", "source = root/'fuentes/reporte.xlsx'")
# Use explicit line replacements to avoid platform-dependent escaping.
lines=source.splitlines()
lines=["source = root/'fuentes/reporte.xlsx'" if line.startswith('source = Path(') else line for line in lines]
lines=["out = root/'regeneracion'" if line.startswith('out = Path(') else line for line in lines]
lines=[line.replace('Path.cwd()', 'root') for line in lines]
(root/'regeneracion').mkdir(exist_ok=True)
exec(compile('\n'.join(lines),'generador_adaptado','exec'),{'root':root,'__file__':str(root/'outputs/sjl_prueba/preparar.py')})
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
