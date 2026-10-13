# Werkwijze IJS Hagellijst

## 🎯 Doel
Alleen gegevens verzamelen voor It's Just Software. Bots benaderen niemand: geen e-mails, geen LinkedIn-berichten, geen telefoontjes. Achmed bepaalt zelf wie hij mailt.

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
- **Vervolgactie**: voorgestelde volgende stap voor Achmed.
- **Mailstatus**: Nog niet, Gemaild, Reactie, Proefaccount, Demo, Geen interesse (alleen Achmed wijzigt dit).
- **Datum onderzoek**: datum waarop het kantoor is onderzocht.

## 🔎 Bronnen en betrouwbaarheid
- Elke schatting en elke claim krijgt een bron-URL.
- Onbekend = "Onbekend"/leeg laten. Nooit gegevens verzinnen of raden zonder dat te vermelden.
- Alleen zakelijke contactgegevens (algemeen kantooradres of zakelijk adres van een beslisser), geen privégegevens.

## 🔄 Proces
1. **IJS Scout** zoekt in rondes van ~25 kantoren en schrijft ze naar Notion (IJS Hagellijst) met status "Te controleren".
2. **IJS Verifier** controleert: bestaat het kantoor (KVK/website), heeft het een samenstelpraktijk, klopt de omvang, klopt het contact, kloppen de bronnen. Zet daarna Goedgekeurd / Goedgekeurd met correcties / Afgewezen.
3. **Sync**: de Notion-rijen worden versleuteld naar deze site gezet.

## 🔁 Sync-methode (sinds 12-10-2026)
- De rijen komen uit de opgeslagen weergave **"Default view"** van IJS Hagellijst: `view://31deaab4-e04b-4381-bd3d-a2bdff5ac9f7` (database https://app.notion.com/p/a35522cf5dd2464ea351a5435872ceba, data source `collection://a079827b-1782-4eca-975f-37a02b20761f`). Die view heeft geen filters en toont alle kolommen.
- Ophalen met `notion-query-data-sources` in **view-modus** (`page_size` 100, pagineren met `next_cursor` tot `has_more` false is). View-modus heeft geen eigen query-limiet; de oude SQL-methode liep steeds tegen `usage_limit_reached`.
- `normalize_view.py` zet de pagina's om naar `private/hagellijst.json` in het vaste formaat (Markdown-links terug naar tekst). Daarna `./sync.sh`.
- Wordt ook de view-modus geblokkeerd, dan wordt er niets gepusht en volgt een melding.

## 🔒 Privacy en AVG
- De data op de site is versleuteld (AES-256-GCM), niet vindbaar voor zoekmachines (noindex) en alleen te openen met het wachtwoord.
- Ga je zelf mailen: let op de AVG en de Telecommunicatiewet. Gebruik zakelijke adressen, een duidelijke afzender en een afmeldlink.

## ✉️ E-mail, contactstatus en synchronisatie
- E-mailadressen (Notion-veld **E-mail**) staan in de tabel, op de mobiele kaarten en in het detailpaneel: klikbaar als mailto, met kopieerknop. Geen adres = "–" of "niet publiek gevonden" als de Verifier dat noteerde. De site verstuurt nooit zelf mail.
- **Contactstatus** (Notion select: Niet benaderd / Klaar voor contact / Benaderd / Reactie ontvangen / Gesprek gepland / Afgerond) en **Laatst benaderd** (Notion datum) zijn de waarheid en gelden op al Achmeds apparaten. Leeg in Notion: de site leidt de status af van het oude veld Mailstatus (Nog niet → Niet benaderd, Gemaild → Benaderd, Reactie → Reactie ontvangen, Demo → Gesprek gepland, Proefaccount/Geen interesse → Afgerond).
- Prioriteit (kans A/B/C), Status verificatie en Contactstatus zijn drie gescheiden velden.
- Wijzig je de status op de site, dan verschijnt hij meteen, gemarkeerd als **"lokaal, nog niet gesynct"** (opgeslagen in localStorage `ijs-contactstatus`, alleen in die browser). Onderaan verschijnt **"Kopieer wijzigingen (n)"**: dat kopieert een korte tekst (kantoor, Notion-id, nieuwe status, datum). Stuur die naar je assistent; die werkt Notion bij. Na de volgende sync is Notion gelijk aan de lokale waarde en verdwijnt de markering vanzelf.
- Er staat bewust **geen Notion-token in de browser**; de site kan Notion dus niet zelf schrijven.
- Actieknop per rij: Te controleren → *Controleren*; Goedgekeurd en niet benaderd → *Contact voorbereiden* (paneel met e-mail + kopieerknop, verstuurt niets); Benaderd → *Reactie registreren* (lokale status Reactie ontvangen); Afgewezen → *Reden bekijken*.
- **Volledigheid**: per kantoor een score over 11 kernvelden (Klanten, Software, Aanleiding, Contact, Functie, E-mail, Telefoon, Website, Dienstverlening, Plaats, LinkedIn). Filter volledig/onvolledig en KPI "% volledig" (= 11/11). Telefoon telt mee maar is geen tabelkolom. LinkedIn (persoonlijk profiel of bedrijfspagina) telt mee, met icoon in de lijst en filter "Met LinkedIn".
- "niet publiek gevonden" verschijnt i.p.v. "–" als de Opmerking verificatie/Vervolgactie dat voor dat veld vermeldt; "schatting" bij klanten als Bron aantal klanten met "schatting" begint.
- Layout: fluid tot 2400px, nooit horizontale scroll. Standaardkolommen: Kantoor, Kans, Aanleiding, Verificatie, Contactpersoon, E-mail, Contactstatus, Volledigheid, Actie; via **Kolommen aanpassen** extra velden (keuze in localStorage `ijs-cols`). Past de tabel niet, dan worden automatisch eerst extra kolommen, dan Aanleiding, Contactpersoon, Volledigheid, Verificatie en E-mail verborgen (staan altijd in het detailpaneel).
- Detailpaneel rechts (38% breed vanaf 1200px, tabel blijft zichtbaar). Toetsen: Enter opent, ↑/↓ volgende/vorige kantoor, Esc sluit, / zoeken. Schakelaar Compact/Comfortabel (localStorage `ijs-density`).

## 📨 Campagnemail per kantoor
- Notion-velden (alleen IJS Hagellijst): **Campagne code** (select: MLE-1, CONTRACT-1, SUPPORT-1), **Campagne onderwerp** (tekst), **Campagne tekst** (tekst).
- Is *Campagne tekst* gevuld, dan toont het dossier die als **Definitief**. Anders maakt de site een **Concept uit sjabloon**: MLE-uitfasering → MLE-1; heroverweegt software/contract of weerstand grote leverancier → CONTRACT-1; anders SUPPORT-1 (wisselen kan met de selector; Campagne code in Notion gaat voor de automatische keuze).
- Placeholders: {voornaam} = eerste woord van de contactnaam, alleen als dat een persoonsnaam is (anders aanhef "Goedendag,"); {kantoor}; {aanleiding} = één neutrale zin op basis van het signaal (leeg als er geen signaal is).
- Opvolgmails FU5-1 en FU12-1 staan inklapbaar eronder. Kopieerknoppen voor onderwerp, tekst en "Kopieer alles". De site verstuurt niets.
- Bron sjablonen: Notion-pagina "IJS Campagne-concepten". Bij elke sync haalt de agent die op (notion-fetch → private/campagne-concepten.md); parse_templates.py maakt private/templates.json, die versleuteld in de payload gaat. LinkedIn-posts worden niet meegenomen.
- De notion-fetch-tekst is JSON-geëscaped (`\"`, `\n`, `\\{`). parse_templates.py zet dat sinds 13-10-2026 zelf terug, zodat placeholders als {voornaam} echt worden ingevuld (daarvoor bleven ze als `\{voornaam\}` in het concept staan).
- Kolomkoppen en filterlabels hebben een i-icoon met uitleg (hover, focus of tik; Esc sluit).

## 📡 Signalen (IJS Signalen)
- Notion-velden **Laatste signaal** (tekst, met bron-URL) en **Datum laatste signaal** (datum), gevuld door IJS Signalen. Ontbreken ze, dan toont de site niets.
- "Nieuw signaal" = signaal met datum in de laatste 14 dagen: label bij het kantoor, sectie *Signalen* in het dossier (datum, bron, samenvatting, toelichting), filter *Signalen: recente signalen* en de kleine KPI *Recente signalen*.

## 🚫 Uitsluitingen en dubbelcheck (alle bots)
- Vóór het toevoegen van een kantoor controleert de bot **IJS Uitsluitingen** (Notion, collection://64ed9e44-8355-4ec5-bc6a-d421778ee47b) op **domein** (zonder www/https) én op **naam**, en daarnaast de bestaande rijen in **IJS Hagellijst** (ook afgewezen rijen). Bij een match: overslaan, niet toevoegen.
- Redenen in IJS Uitsluitingen: Bestaande klant, In onderhandeling, Afgewezen/geen interesse, Concurrent/partner, Overig. Achmed vult zelf bestaande klanten en lopende gesprekken in. Kantoren die de Verifier op profiel afwees staan erin met reden *Overig* ("Afgewezen door verifier: …").

## 🎯 Focusregel scout
- IJS Scout zoekt primair kantoren met een **echt, bronvermeld signaal**: MLE-uitfasering, weerstand tegen NUMBERS/grote leverancier of contract, heroverweging van software, of een support-drempel.
- Kantoren die alleen op profiel passen (prioriteit C, geen signaal) zijn **maximaal 20% van een batch**.

## 🌐 Wie pusht de website
- Alleen **IJS Webbeheer** (agent e2fde750-b841-4ba7-9894-fe468ccadf40) bouwt en pusht de website.
- Scout, Verifier, Signalen en Campagne schrijven **alleen in Notion** en melden wijzigingen aan IJS Webbeheer.

## 📈 Resultaten meten
- Velden in IJS Hagellijst: **Mailstatus** (Nog niet / Gemaild / Reactie / Proefaccount / Demo / Klant / Geen interesse), **Datum gemaild**, **Gebruikte variant** (bijv. MLE-1), **Datum laatste reactie**, **Resultaat notitie**.
- Achmed vult deze velden zelf in; bots wijzigen ze niet.
- Notion-views **Resultaten per aanleiding** en **Resultaten per provincie** (alle kantoren met Mailstatus ≠ Nog niet).
- Zodra er genoeg data is (richtlijn: ≥ 30 gemailde kantoren), weegt de scout zijn zoektocht naar de aanleiding en provincie met de beste resultaten (Reactie/Proefaccount/Demo/Klant).

## 📈 Resultaten
- Notion-velden: **Mailstatus** (Nog niet / Gemaild / Reactie / Proefaccount / Demo / Klant / Geen interesse), **Datum gemaild**, **Gebruikte variant**, **Datum laatste reactie**, **Resultaat notitie**. Alleen Achmed vult ze.
- In de lijst is er één kolom **Status**: staat Mailstatus op iets anders dan "Nog niet", dan is Mailstatus uit Notion leidend en wordt die getoond; anders de Contactstatus (Niet benaderd / Klaar voor contact / ..., incl. lokale wijzigingen).
- Tab **Resultaten**: funnel Gemaild → Reactie → Proefaccount → Demo → Klant (een kantoor telt mee in elke stap die het bereikt heeft; Geen interesse telt als gemaild en staat apart), conversie per Overstapaanleiding, per Provincie en per Gebruikte variant. Zonder gemailde kantoren een lege staat.
- Tab **Hoe het werkt**: team, flow, wat al automatisch gaat en ideeën.

## 🚫 Uitsluitingen en de site
- De Hagellijst-collectie heeft **geen relatie- of uitsluitingsveld** naar IJS Uitsluitingen. Uitsluiten gebeurt alleen bij het toevoegen: IJS Scout controleert IJS Uitsluitingen op domein en naam en voegt een match niet toe.
- Gevolg: komt een kantoor pas later op IJS Uitsluitingen terwijl het al in de Hagellijst staat, dan blijft het op de site staan tot de rij in Notion wordt afgewezen of de site een uitsluitingscheck krijgt (bv. de sync die IJS Uitsluitingen op domein/naam vergelijkt en die kantoren verbergt).
