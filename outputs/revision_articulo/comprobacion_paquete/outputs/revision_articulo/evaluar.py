from pathlib import Path
import sys, json, hashlib, platform, importlib.metadata, time
ROOT=Path(__file__).resolve().parents[2]
sys.path.insert(0,str(ROOT))
import numpy as np
import pandas as pd
from sklearn.dummy import DummyRegressor
from core.ai_experiment import create_experiment, train_model_in_experiment, predictor_options, scores, LABELS
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from scipy import stats
OUT=Path(__file__).parent
raw=(ROOT/'outputs/sjl_prueba/reporte_SJL_ampliado_prueba.csv').read_bytes()
df=pd.read_csv(ROOT/'outputs/sjl_prueba/reporte_SJL_ampliado_prueba.csv')
features,excluded=predictor_options(df)
config=dict(mode='quick',test_size=.2,seed=42,folds=5,n_estimators=150,max_depth=6,learning_rate=.05,workers=2,trials=1,models=['random_forest','gnn','xgboost','lightgbm','catboost'])
run=create_experiment(df,raw,features,config)
results={}
predictions=pd.DataFrame({'row_index':run.evaluation_rows,'manzana_id':df.loc[run.evaluation_rows,'manzana_id'].values,'referencia_simulada':run.y_final.values})
for kind in config['models']:
    print('Entrenando',kind,flush=True)
    train_model_in_experiment(run,kind)
    if kind not in run.models: raise RuntimeError(run.failures)
    r=run.models[kind]
    results[kind]={'label':LABELS[kind],'cv':r['validation'],'test':r['evaluation'],'folds':r['folds'],'params':r['pipeline'].named_steps['model'].get_params(),'seconds':r['seconds']}
    predictions[kind]=r['prediction']
    print(kind,r['evaluation'],flush=True)
base=DummyRegressor(strategy='mean').fit(run.X_dev,run.y_dev)
bp=base.predict(run.X_final)
predictions['media_entrenamiento']=bp
results['media_entrenamiento']={'label':'Media del entrenamiento','test':scores(run.y_final,bp)}
rng=np.random.default_rng(20261025)
y=run.y_final.to_numpy(); n=len(y)
idx=rng.integers(0,n,(2000,n))
for k,r in results.items():
    p=predictions[k].to_numpy(); err=y[idx]-p[idx]
    mse=np.mean(err**2,axis=1)
    denom=np.sum((y[idx]-y[idx].mean(axis=1,keepdims=True))**2,axis=1)
    boot={'rmse':np.sqrt(mse),'mae':np.mean(abs(err),axis=1),'r2':1-n*mse/denom}
    r['ci95']={m:np.quantile(a,[.025,.975]).tolist() for m,a in boot.items()}
selected=run.winner
pair=[]
for k in config['models']:
    if k==selected:continue
    a=np.abs(y-predictions[selected].to_numpy()); b=np.abs(y-predictions[k].to_numpy()); d=a-b
    bs=d[idx].mean(axis=1)
    # Paired randomization on absolute errors; exploratory and conditional on fixed models.
    extreme=0
    for _ in range(100):
        signs=rng.choice([-1,1],size=(100,n))
        extreme+=int(np.sum(np.abs((signs*d).mean(axis=1))>=abs(d.mean())))
    pair.append({'reference':selected,'other':k,'delta_mae':float(d.mean()),'ci95':np.quantile(bs,[.025,.975]).tolist(),'p':(extreme+1)/10001})
ordered=sorted(pair,key=lambda p:p['p']); prev=0
for i,p in enumerate(ordered):
    prev=max(prev,min(1,(len(ordered)-i)*p['p']));p['p_holm']=prev
versions={p:importlib.metadata.version(p) for p in ['numpy','pandas','scikit-learn','scipy','catboost','lightgbm','xgboost','matplotlib']}
payload={'date':'2026-10-25','dataset_sha256':hashlib.sha256(raw).hexdigest(),'n':len(df),'n_dev':len(run.y_dev),'n_test':n,'features':features,'excluded':excluded,'config':config,'versions':versions,'python':platform.python_version(),'selected_by_cv':selected,'results':results,'paired_comparisons':pair,'bootstrap_replicates':2000,'bootstrap_seed':20261025,'split':{'development':run.train_rows,'test':run.evaluation_rows,'cv':run.folds},'data_summary':{'missing_cells':int(df.isna().sum().sum()),'unique_ids':int(df.manzana_id.nunique()),'target_min':float(df.valor_suelo_usd_m2.min()),'target_max':float(df.valor_suelo_usd_m2.max()),'target_mean':float(df.valor_suelo_usd_m2.mean())}}
(OUT/'resultados.json').write_text(json.dumps(payload,ensure_ascii=False,indent=2,default=str),encoding='utf-8')
predictions.to_csv(OUT/'predicciones_prueba.csv',index=False)
pd.DataFrame([{'modelo':r['label'],**r['test']} for r in results.values()]).to_csv(OUT/'metricas.csv',index=False)
(OUT/'requirements_experimento.txt').write_text('\n'.join(f'{p}=={v}' for p,v in versions.items()),encoding='utf-8')
p=predictions[selected].to_numpy();e=y-p
fig,ax=plt.subplots(2,2,figsize=(10,7),layout='constrained')
ax[0,0].scatter(p,e,s=5,alpha=.3);ax[0,0].axhline(0,c='black',lw=.8);ax[0,0].set(xlabel='Predicción simulada (USD/m²)',ylabel='Residuo (USD/m²)',title='A  Residuos frente a predicción')
ax[0,1].hist(e,bins=35,color='#4a647b');ax[0,1].set(xlabel='Residuo (USD/m²)',ylabel='Frecuencia',title='B  Distribución de residuos')
stats.probplot(e,dist='norm',plot=ax[1,0]);ax[1,0].set(title='C  Gráfico cuantil-cuantil',xlabel='Cuantil normal teórico',ylabel='Residuo ordenado')
q=pd.DataFrame({'p':p,'y':y});q['bin']=pd.qcut(q.p,10,duplicates='drop');means=q.groupby('bin',observed=True)[['p','y']].mean()
ax[1,1].plot(means.p,means.y,'o-');bounds=[min(means.p.min(),means.y.min()),max(means.p.max(),means.y.max())];ax[1,1].plot(bounds,bounds,'--',c='gray');ax[1,1].set(title='D  Promedios por decil',xlabel='Predicción media (USD/m²)',ylabel='Referencia simulada media (USD/m²)')
fig.savefig(OUT/'diagnosticos.png',dpi=220);plt.close(fig)
print('COMPLETO',selected,flush=True)
