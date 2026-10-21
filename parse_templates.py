#!/usr/bin/env python3
"""Leest private/campagne-concepten.md (Notion-pagina 'IJS Campagne-concepten', door de agent opgehaald met notion-fetch)
en schrijft de mailsjablonen (MLE-1, CONTRACT-1, SUPPORT-1, FU5-1, FU12-1) naar private/templates.json (gitignored).
LinkedIn-posts worden overgeslagen. encrypt.js neemt templates.json versleuteld op in de payload."""
import re,json,os,sys
SRC='private/campagne-concepten.md';OUT='private/templates.json'
if not os.path.exists(SRC): print('Geen campagne-concepten.md, sjablonen ongewijzigd');sys.exit(0)
md=open(SRC,encoding='utf8').read()
# notion-fetch levert JSON-geëscapete tekst (\\" \\n \\\\{). Is dat zo opgeslagen, dan eerst terugzetten,
# anders blijven placeholders als \\{voornaam\\} staan en worden ze niet ingevuld.
if '\\"' in md or '\\\\{' in md:
    md=md.replace('\\\\','\x00').replace('\\"','"').replace('\\t','\t').replace('\\n','\n').replace('\x00','\\')
md=md.split('## 4.')[0]
# Notion levert soms HTML-opmaak (<b>, <i>, <strong>, <em>) i.p.v. Markdown: omzetten naar Markdown.
md=re.sub(r'</?(b|strong)>','**',md);md=re.sub(r'</?(i|em)>','*',md)
def clean(s):
    s=s.replace('\\{','{').replace('\\}','}').replace('\\[','[').replace('\\]',']')
    s=re.sub(r'\[([^\]]+)\]\(([^)]+)\)',lambda m:m[1] if m[1].startswith('http') or m[2].startswith('mailto') and '@' in m[1] else m[1],s)
    s=re.sub(r'\*\*([^*]+)\*\*',r'\1',s);s=re.sub(r'(?<![\w*])\*([^*\n]+)\*(?!\w)',r'\1',s)
    return s.strip()
def fmt(L):
    g=next((i for i,l in enumerate(L) if l.startswith('Groet')),len(L))
    sig=L[g:];foot=[l for l in sig if 'afmelden' in l];sig=[l for l in sig if l not in foot]
    return '\n\n'.join(L[:g]+(['\n'.join(sig)] if sig else [])+foot)
T={}
for m in re.finditer(r'^### ([A-Z0-9]+-\d+) — ([^\n]+)\n(.*?)(?=^### |^## |\Z)',md,re.S|re.M):
    code,title,body=m[1],m[2].strip(),m[3]
    sub=re.search(r'^\*\*Onderwerp:\*\*\s*(.+)$',body,re.M)
    text=re.sub(r'^\*\*Onderwerp:\*\*.*\n?','',body,flags=re.M)
    lines=[clean(l) for l in text.strip().split('\n')]
    T[code]={'titel':title,'onderwerp':clean(sub[1]) if sub else '','tekst':fmt([l for l in lines if l])}
json.dump(T,open(OUT,'w',encoding='utf8'),ensure_ascii=False,indent=1)
print('Sjablonen:',', '.join(T))
