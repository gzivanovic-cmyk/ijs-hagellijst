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

## ✉️ E-mail en mailstatus op de site
- E-mailadressen komen uit het Notion-veld **E-mail** en staan in de tabel, op de mobiele kaarten en in het detailpaneel (klikbaar als mailto, met kopieerknop). Geen adres = "–".
- De knop in de kolom **Mail** wisselt tussen *Nog niet* en *Gemaild* (met datum). Omdat de site statisch is, wordt dit opgeslagen in **localStorage van je browser** (sleutel `ijs-mailstatus`, per Notion-rij-id). Andere browsers/apparaten zien deze lokale status niet.
- Voorrang: een lokale wijziging wint altijd van het Notion-veld **Mailstatus** (Notion heeft geen tijdstempel per wijziging, en een lokale klik is altijd een bewuste, recente actie van Goran). Zonder lokale wijziging toont de site de Notion-status (bijv. Reactie, Demo). Wijkt Notion af van de lokale status, dan staat de Notion-waarde er klein onder.
- Wil je de status overal hetzelfde hebben: zet hem ook in Notion (Mailstatus). Lokale status wissen = browsergegevens voor deze site wissen.
- Filter **Mail: gemaild / nog niet** gebruikt dezelfde effectieve status.
