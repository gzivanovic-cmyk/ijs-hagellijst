#!/usr/bin/env python3
"""Zet Notion view-mode pagina's om naar private/hagellijst.json (zelfde formaat als de oude SQL-export).
Gebruik: python3 normalize_view.py pagina1.txt pagina2.txt ...  (ruwe tool-output met {"results":[...]})"""
import json, re, sys, os
KEYS = ['Bron aanleiding','Bron aantal klanten','Bron software','Campagne code','Campagne onderwerp','Campagne tekst',
 'Contactpersoon','Contactstatus','Dienstverlening','E-mail','Functie','Gebruikte variant','Geschat aantal klanten',
 'Huidige software','Kantoor','Laatste signaal','LinkedIn','Mailstatus','Opmerking verificatie','Overstapaanleiding',
 'Plaats','Prioriteit','Provincie','Resultaat notitie','Rol','Status verificatie','Telefoon','Vervolgactie','Website',
 'createdTime','id','url',
 'Bron','IJS status','IJS volgende actie','IJS wie','IJS klant/kans','IJS opmerking','IJS prioriteit','IJS software','Info uit IJS-lijst']
for d in ['Datum gemaild','Datum laatste reactie','Datum laatste signaal','Datum onderzoek','Laatst benaderd','IJS laatste gesprek','IJS demo']:
    KEYS += [f'date:{d}:start', f'date:{d}:end', f'date:{d}:is_datetime']
OUT = 'private/hagellijst.json'
old = {}
if os.path.exists(OUT):
    old = {r.get('id'): r for r in json.load(open(OUT)).get('results', [])}
BR = re.compile(r'\s*<br\s*/?>\s*', re.I)
MDLINK = re.compile(r'\[([^\]]*)\]\((?:[^()]|\([^()]*\))*\)')
def plain(v):
    # view-modus geeft Markdown terug: [tekst](url) -> tekst, \X -> X
    if not isinstance(v, str): return v
    if re.search(r'</?p>', v): v = re.sub(r'\s*</?p>\s*', ' ', v).strip()  # Notion-HTML-alinea's weg
    v = BR.sub(' | ', v)  # <br>, <br/>, <br /> -> ' | ' (zelfde scheiding als de andere rijen)
    v = MDLINK.sub(lambda m: m.group(1), v)
    return re.sub(r'\\([\\`*_{}\[\]()#+\-.!|:<>~=$&])', r'\1', v)
rows, seen = [], set()
for f in sys.argv[1:]:
    t = open(f).read(); d = json.loads(t[t.index('{"results"'):t.rindex('}')+1])
    for r in d['results']:
        h = re.search(r'([0-9a-f]{32})', r['url'].replace('-', '')).group(1)
        rid = f'{h[:8]}-{h[8:12]}-{h[12:16]}-{h[16:20]}-{h[20:]}'
        if rid in seen: continue
        seen.add(rid)
        n = {k: plain(r.get(k)) for k in KEYS}
        n['id'] = rid; n['url'] = 'https://app.notion.com/' + h
        n['createdTime'] = r.get('createdTime') or (old.get(rid) or {}).get('createdTime')
        rows.append(n)
json.dump({'results': rows}, open(OUT, 'w'), ensure_ascii=False)
print(f'{len(rows)} rijen naar {OUT}')
