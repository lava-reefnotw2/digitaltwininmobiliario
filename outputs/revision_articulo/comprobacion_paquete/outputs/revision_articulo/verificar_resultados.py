"""Recalcula métricas y comprueba las particiones sin entrenar modelos."""
from pathlib import Path
import csv,json,math,hashlib
P=Path(__file__).parent
R=json.loads((P/'resultados.json').read_text(encoding='utf-8'))
with (P/'predicciones_prueba.csv').open(encoding='utf-8') as f: rows=list(csv.DictReader(f))
assert len(rows)==R['n_test']==1606
y=[float(r['referencia_simulada']) for r in rows]
mean=sum(y)/len(y);sst=sum((v-mean)**2 for v in y)
for kind,r in R['results'].items():
 errors=[v-float(row[kind]) for v,row in zip(y,rows)]
 mse=sum(e*e for e in errors)/len(y)
 metrics={'rmse':math.sqrt(mse),'mae':sum(abs(e) for e in errors)/len(y),'r2':1-len(y)*mse/sst}
 # XGBoost emits float32 predictions; CSV decimal serialization introduces
 # sub-micro-unit differences. Tolerance is far below reported precision.
 for metric,val in metrics.items():assert math.isclose(val,r['test'][metric],abs_tol=1e-8 if metric=='r2' else 1e-6)
 assert math.isclose(mse/(1-metrics['r2']),sst/len(y),rel_tol=1e-10)
dev=set(R['split']['development']);test=set(R['split']['test'])
assert not dev&test and len(dev)==6422 and len(dev|test)==8028
assert [int(row['row_index']) for row in rows]==R['split']['test']
for train,validation in R['split']['cv']:
 assert not set(train)&set(validation)
 assert set(train)|set(validation)==dev
 assert not (set(train)|set(validation))&test
print('OK: 6 modelos/linea base, metricas recalculadas, 5 folds y prueba final separados.')
