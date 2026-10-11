// Normaliseert Notion-rijen en versleutelt met AES-256-GCM (PBKDF2-SHA256, 310000 iteraties).
const fs=require('fs'),crypto=require('crypto');
const [,,inF,outF,pwF]=process.argv;
const pw=fs.readFileSync(pwF,'utf8').trim();
let raw=JSON.parse(fs.readFileSync(inF,'utf8'));
const logos=fs.existsSync('private/logos.json')?JSON.parse(fs.readFileSync('private/logos.json','utf8')):{};
const dom=w=>{try{return new URL(/:\/\//.test(w)?w:'https://'+w).hostname.toLowerCase().replace(/^www\./,'')}catch(e){return null}};
const rows0=(Array.isArray(raw)?raw:raw.results||[]).map(r=>{const o={};for(const[k,v]of Object.entries(r)){let key=k,val=v;
 if(k.startsWith('date:')){if(!k.endsWith(':start'))continue;key=k.split(':')[1];}
 if(typeof val==='string'&&val.startsWith('[')){try{val=JSON.parse(val)}catch(e){}}
 if(val!==null&&val!=='')o[key]=val;}return o;});
const rows=rows0.map(o=>{const d=dom(o.Website||'');if(d){o._domain=d;if(logos[d])o._logo=logos[d];}return o;});
const templates=fs.existsSync('private/templates.json')?JSON.parse(fs.readFileSync('private/templates.json','utf8')):{};
const payload=Buffer.from(JSON.stringify({updated:new Date().toISOString(),rows,templates}));
const salt=crypto.randomBytes(16),iv=crypto.randomBytes(12),iter=310000;
const key=crypto.pbkdf2Sync(pw,salt,iter,32,'sha256');
const c=crypto.createCipheriv('aes-256-gcm',key,iv);
const ct=Buffer.concat([c.update(payload),c.final(),c.getAuthTag()]);
fs.writeFileSync(outF,JSON.stringify({v:1,kdf:'PBKDF2-SHA256',iter,salt:salt.toString('base64'),iv:iv.toString('base64'),ct:ct.toString('base64')}));
console.log(`Versleuteld: ${rows.length} rijen -> ${outF}`);
