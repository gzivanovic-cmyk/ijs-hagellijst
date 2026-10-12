/* xlsx-lite.js — minimale .xlsx-schrijver voor de IJS Hagellijst.
   Eigen code (geen externe bibliotheek), MIT-licentie, (c) 2026 It's Just Software.
   Ondersteunt: meerdere bladen, gekleurde vette kopregel, datums, terugloop, vulkleuren, autofilter, bevroren bovenste rij, kolombreedtes.
   Werkt volledig lokaal in de browser; maakt geen netwerkverbindingen. */
(function(g){
'use strict';
const enc=new TextEncoder();
const CRC=(()=>{const t=new Uint32Array(256);for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;t[n]=c>>>0}return t})();
function crc32(b){let c=0xFFFFFFFF;for(let i=0;i<b.length;i++)c=CRC[(c^b[i])&255]^(c>>>8);return(c^0xFFFFFFFF)>>>0}
function zip(files){/* STORE (geen compressie) */const parts=[],cd=[];let off=0;const d=new Date(),dt=((d.getHours()<<11)|(d.getMinutes()<<5)|(d.getSeconds()>>1))&0xFFFF,dd=(((d.getFullYear()-1980)<<9)|((d.getMonth()+1)<<5)|d.getDate())&0xFFFF;
 for(const[name,str]of files){const nb=enc.encode(name),data=enc.encode(str),c=crc32(data);
  const h=new DataView(new ArrayBuffer(30));h.setUint32(0,0x04034b50,true);h.setUint16(4,20,true);h.setUint16(6,0x0800,true);h.setUint16(8,0,true);h.setUint16(10,dt,true);h.setUint16(12,dd,true);h.setUint32(14,c,true);h.setUint32(18,data.length,true);h.setUint32(22,data.length,true);h.setUint16(26,nb.length,true);h.setUint16(28,0,true);
  parts.push(new Uint8Array(h.buffer),nb,data);
  const e=new DataView(new ArrayBuffer(46));e.setUint32(0,0x02014b50,true);e.setUint16(4,20,true);e.setUint16(6,20,true);e.setUint16(8,0x0800,true);e.setUint16(10,0,true);e.setUint16(12,dt,true);e.setUint16(14,dd,true);e.setUint32(16,c,true);e.setUint32(20,data.length,true);e.setUint32(24,data.length,true);e.setUint16(28,nb.length,true);e.setUint32(42,off,true);
  cd.push(new Uint8Array(e.buffer),nb);off+=30+nb.length+data.length}
 const cdl=cd.reduce((a,b)=>a+b.length,0),z=new DataView(new ArrayBuffer(22));z.setUint32(0,0x06054b50,true);z.setUint16(8,files.length,true);z.setUint16(10,files.length,true);z.setUint32(12,cdl,true);z.setUint32(16,off,true);
 return new Blob([...parts,...cd,new Uint8Array(z.buffer)],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})}
const x=s=>String(s).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g,'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
function col(n){let s='';n++;while(n>0){const m=(n-1)%26;s=String.fromCharCode(65+m)+s;n=Math.floor((n-1)/26)}return s}
/* Stijlen (cellXfs-index):
   0 normaal | 1 kop (paars, vet wit, terugloop) | 2 datum dd-mm-jjjj | 3 terugloop
   4-6 = 0/2/3 met wisselende rijkleur | 7 prio A | 8 prio B | 9 prio C | 10 vet label
   Cel: waarde, of {v, s, d:true (Date of 'JJJJ-MM-DD' -> echte Excel-datum)}. */
function serial(v){const d=v instanceof Date?v:new Date(String(v).slice(0,10)+'T00:00:00Z');if(isNaN(d))return null;return Math.round((Date.UTC(d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate())-Date.UTC(1899,11,30))/864e5)}
function sheetXml(sh){const H=sh.headers,R=sh.rows,nc=H.length,nr=R.length+1,ref='A1:'+col(Math.max(nc-1,0))+nr;
 const cell=(c,ci,ri)=>{let v=c,s=0,d=false;if(c&&typeof c==='object'&&!(c instanceof Date)){v=c.v;s=c.s||0;d=!!c.d}const a=col(ci)+ri;
  if(d&&v!=null&&v!==''){const n=serial(v);if(n!=null)return`<c r="${a}" s="${s}"><v>${n}</v></c>`}
  if(v==null||v==='')return s?`<c r="${a}" s="${s}"/>`:'';if(typeof v==='number'&&isFinite(v))return`<c r="${a}" s="${s}"><v>${v}</v></c>`;
  return`<c r="${a}" t="inlineStr" s="${s}"><is><t xml:space="preserve">${x(v)}</t></is></c>`};
 let sd=`<row r="1">${H.map((h,i)=>cell({v:h,s:1},i,1)).join('')}</row>`;R.forEach((r,ri)=>{sd+=`<row r="${ri+2}">${r.map((v,i)=>cell(v,i,ri+2)).join('')}</row>`});
 const pane=sh.freeze?`<pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/><selection pane="bottomLeft" activeCell="A2" sqref="A2"/>`:'';
 return{ref,nc,nr,xml:`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><dimension ref="${ref}"/><sheetViews><sheetView workbookViewId="0">${pane}</sheetView></sheetViews><sheetFormatPr defaultRowHeight="15"/><cols>${sh.widths.map((v,i)=>`<col min="${i+1}" max="${i+1}" width="${v}" customWidth="1"/>`).join('')}</cols><sheetData>${sd}</sheetData>${sh.filter?`<autoFilter ref="${ref}"/>`:''}</worksheet>`}}
function build(sheets,opt){opt=opt||{};const hdr=(opt.header||'FF5B49D6').replace('#','FF').toUpperCase(),alt='FFF4F2FE';
 const xs=sheets.map((sh,i)=>({...sh,name:(sh.name||'Blad'+(i+1)).replace(/[\\\/?*\[\]:]/g,' ').slice(0,31),...sheetXml(sh)}));
 const fill=c=>`<fill><patternFill patternType="solid"><fgColor rgb="${c}"/><bgColor indexed="64"/></patternFill></fill>`;
 const al='<alignment vertical="top"/>',wr='<alignment vertical="top" wrapText="1"/>';
 const xf=(f,fi,n,a)=>`<xf numFmtId="${n}" fontId="${f}" fillId="${fi}" borderId="0" xfId="0" applyFont="1" applyFill="1" applyNumberFormat="1" applyAlignment="1">${a}</xf>`;
 const styles=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><numFmts count="1"><numFmt numFmtId="164" formatCode="dd\\-mm\\-yyyy"/></numFmts><fonts count="3"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Calibri"/></font><font><b/><sz val="11"/><name val="Calibri"/></font></fonts><fills count="7"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill>${fill(hdr)}${fill(alt)}${fill('FFD1FAE5')}${fill('FFFEF3C7')}${fill('FFE5E7EB')}</fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="11">${xf(0,0,0,al)}${xf(1,2,0,'<alignment vertical="center" wrapText="1"/>')}${xf(0,0,164,al)}${xf(0,0,0,wr)}${xf(0,3,0,al)}${xf(0,3,164,al)}${xf(0,3,0,wr)}${xf(2,4,0,'<alignment horizontal="center" vertical="top"/>')}${xf(2,5,0,'<alignment horizontal="center" vertical="top"/>')}${xf(2,6,0,'<alignment horizontal="center" vertical="top"/>')}${xf(2,0,0,wr)}</cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>`;
 const defs=xs.map((s,i)=>s.filter?`<definedName name="_xlnm._FilterDatabase" localSheetId="${i}" hidden="1">'${x(s.name).replace(/'/g,"''")}'!$A$1:$${col(s.nc-1)}$${s.nr}</definedName>`:'').join('');
 const files=[
 ['[Content_Types].xml',`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>${xs.map((s,i)=>`<Override PartName="/xl/worksheets/sheet${i+1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join('')}<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>`],
 ['_rels/.rels','<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>'],
 ['xl/workbook.xml',`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>${xs.map((s,i)=>`<sheet name="${x(s.name)}" sheetId="${i+1}" r:id="rId${i+1}"/>`).join('')}</sheets>${defs?`<definedNames>${defs}</definedNames>`:''}</workbook>`],
 ['xl/_rels/workbook.xml.rels',`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${xs.map((s,i)=>`<Relationship Id="rId${i+1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i+1}.xml"/>`).join('')}<Relationship Id="rIdS" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`],
 ['xl/styles.xml',styles],...xs.map((s,i)=>[`xl/worksheets/sheet${i+1}.xml`,s.xml])];
 return zip(files)}
function download(blob,name){const u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),4000)}
g.XLSXLite={build,download};
})(typeof window!=='undefined'?window:globalThis);
