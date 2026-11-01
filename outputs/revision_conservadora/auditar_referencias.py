from pathlib import Path
from docx import Document
import re,json,urllib.request,concurrent.futures,sys
sys.stdout.reconfigure(encoding='utf-8')
out=Path(__file__).parent
d=Document(r'C:/Users/USUARIO/OneDrive/Documentos/Bardales_Rodriguez_Articulo_gemelos_digitales_de_urbanismo_revista4.docx')
refs=[p.text for p in d.paragraphs[136:]]
extra=['10.1080/15710882.2024.2339496','10.1177/23998083251323671','10.1080/10630732.2026.2634808','10.1080/25741292.2026.2617723','10.1177/14614448251338280']
dois=list(dict.fromkeys([m.group(1).strip() for t in refs for m in re.finditer(r'https://doi.org/(\S+)',t)]+extra))
def get(doi):
 try:
  with urllib.request.urlopen('https://api.crossref.org/works/'+doi,timeout=25) as r: data=json.load(r)['message']
  return doi,{k:data.get(k) for k in ['title','author','published','published-print','published-online','container-title','volume','issue','page','article-number','DOI','URL']}
 except Exception as e:return doi,{'error':str(e)}
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool: data=dict(pool.map(get,dois))
(out/'referencias_verificadas.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
for doi,v in data.items():print(doi, v.get('title'),v.get('published'),v.get('volume'),v.get('page'),v.get('error',''))
