# Werkwijze IJS Hagellijst

## 🎯 Doel
Alleen gegevens verzamelen voor Gorans eigen overzicht. Bots benaderen niemand: geen e-mails, geen LinkedIn-berichten, geen telefoontjes. Goran bepaalt zelf wie hij mailt.

## 👥 Doelgroep en inclusiecriteria
- Nederlandse accountants-, boekhoud- en administratiekantoren.
- 10 tot 1.000 klanten (schatting met bron).
- Stellen zelf jaarrekeningen samen, doen risicogericht samenstellen en/of deponeren bij de KVK.
- Hebben zelf invloed op hun softwarekeuze.

## 🚫 Uitsluitingen
- Geen samenstelpraktijk (bijv. alleen loonadministratie of alleen belastingaangiften).
- Onderdeel van een grote keten zonder eigen softwarekeuze.
- Eenmanszaak zonder zakelijke klanten voor jaarrekeningen.
- Gevestigd buiten Nederland.
- Dubbelingen (al in de lijst; check op naam, website en KVK).

## 📡 Signalen / aanleidingen
- MLE-uitfasering: kantoor gebruikt MLE en moet een vervolgstap kiezen.
- Heroverweegt software/contract.
- Weerstand tegen grote leverancier / traditionele contracten (bijv. NUMBERS van Visma).
- Drempel/support: ervaart drempels bij starten met software of mist toegankelijke ondersteuning.
Signalen hoeven niet allemaal aanwezig te zijn. Geen signaal bekend = "Geen bekend".

## 🏷️ Prioriteit A/B/C
- **A**: past volledig op het profiel + sterk signaal met bronvermelding (URL) + beslisser (eigenaar/vennoot/directeur) bekend.
- **B**: past op het profiel, maar het signaal is zwak of afgeleid, of de contactgegevens zijn onvolledig.
- **C**: past op het profiel, maar er is geen signaal bekend.
Past een kantoor niet op het profiel, dan komt het niet in de lijst (of wordt het Afgewezen).

## 🧑‍💼 Contactrollen
- **Beslisser**: eigenaar, vennoot of directeur die over software en contracten beslist.
- **Samenstelpraktijk**: accountant/verantwoordelijke die de inhoudelijke geschiktheid beoordeelt.
- **Automatisering/Operatie**: bij grotere kantoren de verantwoordelijke voor software, automatisering of processen.

## 🗂️ Velden per kantoor
- **Kantoor**: officiële handelsnaam.
- **Website**: hoofdwebsite van het kantoor.
- **Plaats / Provincie**: vestigingsplaats (hoofdvestiging) en provincie.
- **Geschat aantal klanten**: schatting van het aantal klanten.
- **Bron aantal klanten**: URL of uitleg waarop de schatting is gebaseerd.
- **Dienstverlening**: relevante diensten (jaarrekening samenstellen, risicogericht samenstellen, KVK-deponering, belastingaangifte, loonadministratie, advies, overig).
- **Huidige software**: bekende software (MLE, NUMBERS (Visma), Caseware, Nmbrs, Unit4, Exact, AFAS, Twinfield, SnelStart, Onbekend, Overig).
- **Bron software**: URL waar de software blijkt (vacature, website, case, LinkedIn).
- **Overstapaanleiding**: gevonden signalen (zie boven).
- **Bron aanleiding**: URL/uitleg bij het signaal.
- **Contactpersoon / Functie / Rol**: naam, functietitel en rol (zie contactrollen).
- **LinkedIn**: zakelijk LinkedIn-profiel van de contactpersoon of het kantoor.
- **Telefoon / E-mail**: alleen zakelijke contactgegevens.
- **Prioriteit**: A, B of C (zie definitie).
- **Status verificatie**: Te controleren, Goedgekeurd, Goedgekeurd met correcties, Afgewezen.
- **Opmerking verificatie**: toelichting van de Verifier (wat gecorrigeerd of waarom afgewezen).
- **Vervolgactie**: voorgestelde volgende stap voor Goran.
- **Mailstatus**: Nog niet, Gemaild, Reactie, Proefaccount, Demo, Geen interesse (alleen Goran wijzigt dit).
- **Datum onderzoek**: datum waarop het kantoor is onderzocht.

## 🔎 Bronnen en betrouwbaarheid
- Elke schatting en elke claim krijgt een bron-URL.
- Onbekend = "Onbekend"/leeg laten. Nooit gegevens verzinnen of raden zonder dat te vermelden.
- Alleen zakelijke contactgegevens (algemeen kantooradres of zakelijk adres van een beslisser), geen privégegevens.

## 🔄 Proces
1. **IJS Scout** zoekt in rondes van ~25 kantoren en schrijft ze naar Notion (IJS Hagellijst) met status "Te controleren".
2. **IJS Verifier** controleert: bestaat het kantoor (KVK/website), heeft het een samenstelpraktijk, klopt de omvang, klopt het contact, kloppen de bronnen. Zet daarna Goedgekeurd / Goedgekeurd met correcties / Afgewezen.
3. **Sync**: de Notion-rijen worden versleuteld naar deze site gezet.

## 🔒 Privacy en AVG
- De data op de site is versleuteld (AES-256-GCM), niet vindbaar voor zoekmachines (noindex) en alleen te openen met het wachtwoord.
- Ga je zelf mailen: let op de AVG en de Telecommunicatiewet. Gebruik zakelijke adressen, een duidelijke afzender en een afmeldlink.

## ✉️ E-mail, contactstatus en synchronisatie
- E-mailadressen (Notion-veld **E-mail**) staan in de tabel, op de mobiele kaarten en in het detailpaneel: klikbaar als mailto, met kopieerknop. Geen adres = "–" of "niet publiek gevonden" als de Verifier dat noteerde. De site verstuurt nooit zelf mail.
- **Contactstatus** (Notion select: Niet benaderd / Klaar voor contact / Benaderd / Reactie ontvangen / Gesprek gepland / Afgerond) en **Laatst benaderd** (Notion datum) zijn de waarheid en gelden op al Gorans apparaten. Leeg in Notion: de site leidt de status af van het oude veld Mailstatus (Nog niet → Niet benaderd, Gemaild → Benaderd, Reactie → Reactie ontvangen, Demo → Gesprek gepland, Proefaccount/Geen interesse → Afgerond).
- Prioriteit (kans A/B/C), Status verificatie en Contactstatus zijn drie gescheiden velden.
- Wijzig je de status op de site, dan verschijnt hij meteen, gemarkeerd als **"lokaal, nog niet gesynct"** (opgeslagen in localStorage `ijs-contactstatus`, alleen in die browser). Onderaan verschijnt **"Kopieer wijzigingen (n)"**: dat kopieert een korte tekst (kantoor, Notion-id, nieuwe status, datum). Stuur die naar je assistent; die werkt Notion bij. Na de volgende sync is Notion gelijk aan de lokale waarde en verdwijnt de markering vanzelf.
- Er staat bewust **geen Notion-token in de browser**; de site kan Notion dus niet zelf schrijven.
- Actieknop per rij: Te controleren → *Controleren*; Goedgekeurd en niet benaderd → *Contact voorbereiden* (paneel met e-mail + kopieerknop, verstuurt niets); Benaderd → *Reactie registreren* (lokale status Reactie ontvangen); Afgewezen → *Reden bekijken*.
- **Volledigheid**: per kantoor een score over 10 kernvelden (Klanten, Software, Aanleiding, Contact, Functie, E-mail, Telefoon, Website, Dienstverlening, Plaats). Filter volledig/onvolledig en KPI "% volledig" (= 10/10). Telefoon telt mee maar is geen tabelkolom.
- "niet publiek gevonden" verschijnt i.p.v. "–" als de Opmerking verificatie/Vervolgactie dat voor dat veld vermeldt; "schatting" bij klanten als Bron aantal klanten met "schatting" begint.
- Layout: fluid tot 2400px, nooit horizontale scroll. Standaardkolommen: Kantoor, Kans, Aanleiding, Verificatie, Contactpersoon, E-mail, Contactstatus, Volledigheid, Actie; via **Kolommen aanpassen** extra velden (keuze in localStorage `ijs-cols`). Past de tabel niet, dan worden automatisch eerst extra kolommen, dan Aanleiding, Contactpersoon, Volledigheid, Verificatie en E-mail verborgen (staan altijd in het detailpaneel).
- Detailpaneel rechts (38% breed vanaf 1200px, tabel blijft zichtbaar). Toetsen: Enter opent, ↑/↓ volgende/vorige kantoor, Esc sluit, / zoeken. Schakelaar Compact/Comfortabel (localStorage `ijs-density`).
