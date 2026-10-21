/* export.js — 'Exporteer naar Excel' voor de IJS Hagellijst. Werkt alleen lokaal in de browser
   op de al ontsleutelde data; verstuurt niets. Gebruikt assets/xlsx-lite.js. */
(function(g){
'use strict';
// [sleutel, kolomnaam, type (t=tekst, w=lange tekst, d=datum, p=prioriteit, n=getal), breedte, uitleg]
const COLS=[
['Kantoor','Kantoor','t',30,'Naam van het administratiekantoor.'],
['Plaats','Plaats','t',16,'Vestigingsplaats.'],
['Prioriteit','Prioriteit','p',11,'Kans: A = sterkste kans, B = goede kans, C = profiel past.'],
['_status','Status','t',18,'Contactstatus: Mailstatus uit Notion, anders de contactstatus.'],
['Bron','Bron','t',22,'Herkomst: Alleen hagellijst, Uit IJS-lijst (nieuw uit de eigen IJS-prospectlijst) of Aangevuld met IJS-info. IJS-relaties niet koud mailen.'],
['IJS status','IJS status','w',30,'Status van de lopende relatie volgens de IJS-lijst.'],
['IJS volgende actie','IJS volgende actie','w',30,'Volgende actie volgens de IJS-lijst.'],
['IJS laatste gesprek','IJS laatste gesprek','d',14,'Datum laatste gesprek volgens de IJS-lijst.'],
['IJS wie','IJS wie','t',9,'Wie bij IJS de relatie heeft (initialen).'],
['IJS demo','IJS demo','d',14,'Datum demo volgens de IJS-lijst.'],
['IJS klant/kans','IJS klant/kans','t',13,'Klant of kans volgens de IJS-lijst (Ja, Nee, Potentieel).'],
['IJS prioriteit','IJS prioriteit','t',12,'Prioriteit volgens de IJS-lijst (Hoog, Midden, Laag).'],
['IJS software','IJS software','t',18,'Software volgens de IJS-lijst.'],
['IJS opmerking','IJS opmerking','w',40,'Opmerking / context uit de IJS-lijst.'],
['Info uit IJS-lijst','Info uit IJS-lijst','w',45,'Welke velden uit de IJS-lijst komen of zijn aangevuld, en twijfelgevallen.'],
['Contactpersoon','Contactpersoon','t',22,'Naam van de beslisser of contactpersoon.'],
['E-mail','E-mailadres','t',30,'E-mailadres van het kantoor of de contactpersoon.'],
['Telefoon','Telefoonnummer','t',16,'Telefoonnummer.'],
['Website','Website','t',28,'Website van het kantoor.'],
['Laatste signaal','Signaal','w',45,'Laatste openbare signaal (bijv. vacature, nieuws).'],
['Bron aanleiding','Bron signaal','w',40,'Waar het signaal of de aanleiding vandaan komt.'],
['Datum gemaild','Datum gemaild','d',14,'Datum waarop het kantoor is gemaild.'],
['Resultaat notitie','Notities','w',45,'Notitie over reactie of resultaat.'],
['Provincie','Provincie','t',14,'Provincie.'],
['Functie','Functie contactpersoon','t',20,'Functie van de contactpersoon.'],
['Rol','Rol','t',16,'Rol in de beslissing.'],
['Huidige software','Huidige software','t',22,'Pakket dat het kantoor nu gebruikt.'],
['Bron software','Bron software','w',35,'Waar de software-informatie vandaan komt.'],
['Geschat aantal klanten','Geschat aantal klanten','n',12,'Schatting van het aantal klanten.'],
['Bron aantal klanten','Bron aantal klanten','w',35,'Bron van die schatting.'],
['Dienstverlening','Dienstverlening','w',35,'Diensten van het kantoor.'],
['Overstapaanleiding','Overstapaanleiding','t',22,'Waarom overstappen nu logisch is (bijv. MLE-uitfasering).'],
['Status verificatie','Status verificatie','t',20,'Uitkomst van de controle door IJS Verifier.'],
['Opmerking verificatie','Opmerking verificatie','w',40,'Toelichting of correcties van IJS Verifier.'],
['Mailstatus','Mailstatus','t',14,'Mailstatus in Notion (Nog niet, Gemaild, Reactie, ...).'],
['Contactstatus','Contactstatus','t',16,'Contactstatus in Notion.'],
['Gebruikte variant','Gebruikte mailvariant','t',16,'Welke mailvariant is gebruikt.'],
['Laatst benaderd','Laatst benaderd','d',14,'Datum van het laatste contact.'],
['Datum laatste reactie','Datum laatste reactie','d',14,'Datum van de laatste reactie van het kantoor.'],
['Datum laatste signaal','Datum laatste signaal','d',14,'Datum van het laatste signaal.'],
['Datum onderzoek','Datum onderzoek','d',14,'Datum waarop het kantoor is onderzocht.'],
['Vervolgactie','Vervolgactie','w',35,'Geplande volgende stap.'],
['Campagne code','Campagnecode','t',13,'Code van de campagne (MLE-1, CONTRACT-1, SUPPORT-1).'],
['Campagne onderwerp','Campagne onderwerp','w',35,'Onderwerpregel van de campagnemail.'],
['Campagne tekst','Campagne tekst','w',60,'Tekst van de campagnemail.'],
['LinkedIn','LinkedIn','t',30,'LinkedIn-profiel van de contactpersoon.'],
['url','Notion-link','t',30,'Link naar de rij in Notion.'],
['id','Notion-ID','t',20,'Technische ID in Notion.'],
['createdTime','Aangemaakt op','d',14,'Datum waarop de rij is aangemaakt.']];
const txt=v=>v==null?'':Array.isArray(v)?v.join(', '):typeof v==='object'?JSON.stringify(v):v;
const isDate=v=>typeof v==='string'&&/^\d{4}-\d{2}-\d{2}/.test(v);
function make(rows,opt){opt=opt||{};const st=opt.status||(r=>r.Mailstatus||r.Contactstatus||'');
 const known=new Set(COLS.map(c=>c[0])),extra=[];
 rows.forEach(r=>Object.keys(r).forEach(k=>{if(k[0]!=='_'&&!known.has(k)&&!extra.includes(k))extra.push(k)}));
 const C=COLS.concat(extra.map(k=>[k,k,'t',20,'Overig veld uit Notion.']));
 const body=rows.map((r,i)=>{const a=i%2===1;return C.map(([k,,t])=>{const v=k==='_status'?st(r):k==='Bron'?(r.Bron||'Alleen hagellijst'):r[k];
  if(t==='p'){const p=String(txt(v)).trim().toUpperCase().charAt(0);return{v:txt(v),s:{A:7,B:8,C:9}[p]||(a?4:0)}}
  if(t==='d'&&isDate(v))return{v,d:true,s:a?5:2};
  if(t==='n'&&v!==''&&v!=null&&!isNaN(+v))return{v:+v,s:a?4:0};
  return{v:txt(v),s:t==='w'?(a?6:3):(a?4:0)}})});
 const now=opt.now||new Date(),ymd=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
 const info=[[{v:'Exportdatum',s:10},{v:ymd,d:true,s:2}],[{v:'Aantal kantoren',s:10},rows.length],[{v:'Inhoud',s:10},{v:opt.selectie?'Huidige selectie (tab, filters en zoekopdracht)':'Alles (de hele lijst)',s:3}],[{v:'Bron',s:10},{v:'IJS Hagellijst (Notion), alleen gegevens verzamelen voor It\'s Just Software.',s:3}],[{v:'Let op',s:10},{v:'Kantoren met Bron "Uit IJS-lijst" of "Aangevuld met IJS-info" zijn lopende IJS-relaties: niet als koude prospect mailen.',s:3}],['',''],[{v:'Kolom',s:10},{v:'Uitleg',s:10}],...C.map(c=>[c[1],{v:c[4],s:3}])];
 const blob=g.XLSXLite.build([
  {name:'Kantoren',headers:C.map(c=>c[1]),rows:body,widths:C.map(c=>c[3]),filter:true,freeze:true},
  {name:'Info',headers:['Info',''],rows:info,widths:[24,80],filter:false,freeze:false}]);
 return{blob,name:`IJS-Hagellijst-${ymd}${opt.selectie?'-selectie':''}.xlsx`}}
g.IJSExport={make,COLS};
})(typeof window!=='undefined'?window:globalThis);
