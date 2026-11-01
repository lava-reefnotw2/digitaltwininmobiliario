from pathlib import Path
import json, math
from collections import Counter
import openpyxl

p=Path(__file__).parent
original=json.loads((p/'intermedio.json').read_text(encoding='utf-8'))
w=openpyxl.load_workbook(p/'reporte_SJL_ampliado_prueba.xlsx',read_only=True,data_only=True)
data=list(w['Dataset_prueba'].values)
assert list(data[0])==original['headers']
assert len(data)==8029
assert len(set(r[0] for r in data[1:]))==8028
for got,expected in zip(data[1:],original['rows']):
    assert list(got)==expected
    assert isinstance(got[0],str)
    assert all(math.isfinite(v) for v in got if isinstance(v,(int,float)))
source_rows=list(w['INEI_original'].values)
assert len(source_rows)==len(original['raw'])
for got,expected in zip(source_rows,original['raw']):
    for j,(a,b) in enumerate(zip(got,expected)):
        # XLSX may serialize an already imprecise float code as integer digits.
        if j==1 and isinstance(b,(int,float)):
            assert float(a)==float(b)
        else:
            assert a==b
assert set(original['headers'][:17]).issubset(data[0])
print(json.dumps({'filas':len(data)-1,'columnas':len(data[0]),'conteos_inei_intactos':True,
 'ids_texto_unicos':True,'hoja_original_preservada':True,
 'riesgo_simulado':dict(Counter(r[16] for r in data[1:])),
 'rango_precio_simulado':[min(r[14] for r in data[1:]),max(r[14] for r in data[1:])]},ensure_ascii=False))
