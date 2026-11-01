import json, random, math, csv
from pathlib import Path
import openpyxl

out = Path(__file__).parent
source = Path(r'C:\Users\USUARIO\Downloads\reporte.xlsx')
ws = openpyxl.load_workbook(source, read_only=True, data_only=True).active
raw = [list(r[:6]) for r in ws.values]
records = [r for r in raw[6:] if isinstance(r[2], str) and ',Mza:' in r[2]]
headers = next(csv.reader(open(Path.cwd()/'data_json/real_urban_dataset_peru.csv', encoding='utf-8-sig')))
headers += ['viviendas_inei', 'hogares_inei', 'poblacion_inei', 'area_manzana_m2_simulada', 'anio_censo', 'tipo_datos']
rng = random.Random(20261017)
clip = lambda x, a, b: max(a, min(b, x))
round2 = lambda x: round(x, 2)
rows = []
for r in records:
    code = r[2].split(',')[0].strip()
    viviendas, hogares, poblacion = r[3:6]
    # Latent profiles are invented, never inferred from actual locations or codes.
    perfil = rng.choices(['consolidado', 'intermedio', 'ladera'], [0.4, 0.38, 0.22])[0]
    slope = clip(rng.gauss({'consolidado':5,'intermedio':15,'ladera':33}[perfil], 5), 0, 55)
    access = clip(rng.gauss({'consolidado':0.22,'intermedio':0.48,'ladera':0.76}[perfil], .15), .02, .98)
    lot = round2(clip(rng.lognormvariate(math.log(125), .33), 55, 420))
    # Area per dwelling varies by invented building intensity and common-space share.
    floors = rng.uniform(1.05, {'consolidado':3.3,'intermedio':2.6,'ladera':1.7}[perfil])
    area = round2(max(250, viviendas * lot / floors * rng.uniform(1.15, 1.65)))
    density = round2(poblacion * 10000 / area)
    via = round2(clip(25 + access*1050 + rng.gauss(0, 100), 15, 1800))
    salud = round2(clip(120 + access*1900 + rng.gauss(0, 240), 70, 3500))
    escuela = round2(clip(70 + access*1050 + rng.gauss(0, 140), 40, 2000))
    vulnerability = round2(clip(10 + .9*slope + 35*access + rng.gauss(0, 10), 5, 95))
    green = round2(clip(rng.lognormvariate(math.log(1.6), .65) * (1-.5*access), .1, 12))
    estrato = rng.choices(['Muy Bajo','Bajo','Medio','Medio Alto'],
        [5,25,55,15] if perfil=='consolidado' else [20,50,28,2] if perfil=='intermedio' else [55,38,7,0])[0]
    material = rng.choices(['Ladrillo y Cemento','Adobe y Madera','Madera','Estera'],
        [91,5,3,1] if perfil=='consolidado' else [72,16,9,3] if perfil=='intermedio' else [43,25,22,10])[0]
    age = int(clip(round(rng.gauss({'consolidado':29,'intermedio':19,'ladera':10}[perfil], 8)), 1, 65))
    # Targets have independent noise; synthetic scores have no official validity.
    price = round2(clip((500 - 5*slope - .11*via - 1.1*vulnerability + 9*green +
        {'Muy Bajo':-45,'Bajo':0,'Medio':90,'Medio Alto':200}[estrato]) * math.exp(rng.gauss(0,.22)), 35, 1100))
    viability = round2(clip(94 - .75*slope - .30*vulnerability - .008*via + rng.gauss(0,8), 5, 98))
    risk_score = .7*slope + .23*vulnerability + rng.gauss(0,4)
    risk = 'Bajo' if risk_score<13 else 'Medio' if risk_score<25 else 'Alto' if risk_score<38 else 'Muy Alto'
    rows.append([code, 'San Juan de Lurigancho', 'Lima', lot, density, via, salud, escuela,
        round2(slope), vulnerability, green, estrato, material, age, price, viability, risk,
        viviendas, hogares, poblacion, area, 2017, 'MIXTO: conteos INEI + atributos SIMULADOS'])

assert len(rows)==8028 and len(set(r[0] for r in rows))==8028
assert [sum(r[i] for r in rows) for i in (17,18,19)]==[314581,274657,1038495]
assert all(all(v is not None for v in r) and len(r)==len(headers) for r in rows)
assert all(abs(r[4] - r[19]*10000/r[20])<=.0051 for r in rows)
out.joinpath('intermedio.json').write_text(json.dumps({'headers':headers,'rows':rows,'raw':raw},ensure_ascii=False),encoding='utf-8')
print(json.dumps({'rows':len(rows),'columns':len(headers),'totals_preserved':True,'seed':20261017}))
