#!/usr/bin/env bash
# IJS Hagellijst sync
# Er is geen Notion-CLI. Werkwijze voor een agent:
#  1. Haal ALLE rijen op via de opgeslagen databaseweergave (view-modus, GEEN SQL: SQL loopt tegen
#     usage_limit_reached; view-modus heeft geen eigen query-limiet). Notion-connector user-Notion,
#     tool notion-query-data-sources met:
#       {"data":{"mode":"view","view_url":"view://31deaab4-e04b-4381-bd3d-a2bdff5ac9f7","page_size":100}}
#     (view "Default view" van IJS Hagellijst, collection://a079827b-1782-4eca-975f-37a02b20761f;
#      geen filters, alle kolommen). Zolang has_more=true: opnieuw met "start_cursor": <next_cursor>.
#     Sla elke pagina op (write_to_file) en draai: python3 normalize_view.py pagina1.txt pagina2.txt ...
#     Dat zet Markdown-links terug naar platte tekst, vult id/url en lege velden aan en schrijft
#     private/hagellijst.json in het vaste formaat. Controleer het aantal rijen (>= vorige sync).
#     Geblokkeerd? Dan NIETS pushen en melden.
#  1b. Haal de Notion-pagina 'IJS Campagne-concepten' (3f61769e5e8881bf809ae134fe236740) op met notion-fetch en schrijf
#      de inhoud (<content>) naar private/campagne-concepten.md; parse_templates.py maakt daar private/templates.json van.
#  2. private/hagellijst.json is plaintext en gitignored.
#  3. Draai: ./sync.sh   -> versleutelt naar data/hagellijst.enc en pusht naar GitHub Pages.
# Plaintext en .password worden NOOIT gecommit.
set -euo pipefail
cd "$(dirname "$0")"
[ -f private/hagellijst.json ] || { echo "private/hagellijst.json ontbreekt"; exit 1; }
[ -f .password ] || { echo ".password ontbreekt"; exit 1; }
python3 parse_templates.py || echo 'Sjablonen parsen mislukt'
python3 fetch_logos.py || echo "Logo-ophalen mislukt, ga door zonder"
node encrypt.js private/hagellijst.json data/hagellijst.enc .password
git add -A
if git ls-files | grep -Eq '^(private/|\.password)'; then echo "FOUT: geheime bestanden gestaged"; exit 1; fi
git diff --cached --quiet && { echo "Geen wijzigingen"; exit 0; }
git commit -qm "Sync hagellijst $(date '+%Y-%m-%d %H:%M')"
git push -q origin HEAD:main
echo "Gepusht. Live: https://gzivanovic-cmyk.github.io/ijs-hagellijst/"
