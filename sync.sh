#!/usr/bin/env bash
# IJS Hagellijst sync
# Er is geen Notion-CLI. Werkwijze voor een agent:
#  1. Query met de Notion-connector (namespace user-Notion, notion-query-data-sources) ALLE rijen van
#     collection://a079827b-1782-4eca-975f-37a02b20761f , bv. SELECT * FROM "collection://a079827b-1782-4eca-975f-37a02b20761f"
#     (bij has_more: verder pagineren en alles samenvoegen).
#  2. Schrijf het ruwe resultaat ({"results":[...]} of een array) als plaintext naar private/hagellijst.json (gitignored).
#  3. Draai: ./sync.sh   -> versleutelt naar data/hagellijst.enc en pusht naar GitHub Pages.
# Plaintext en .password worden NOOIT gecommit.
set -euo pipefail
cd "$(dirname "$0")"
[ -f private/hagellijst.json ] || { echo "private/hagellijst.json ontbreekt"; exit 1; }
[ -f .password ] || { echo ".password ontbreekt"; exit 1; }
node encrypt.js private/hagellijst.json data/hagellijst.enc .password
git add -A
if git ls-files | grep -Eq '^(private/|\.password)'; then echo "FOUT: geheime bestanden gestaged"; exit 1; fi
git diff --cached --quiet && { echo "Geen wijzigingen"; exit 0; }
git commit -qm "Sync hagellijst $(date '+%Y-%m-%d %H:%M')"
git push -q origin HEAD:main
echo "Gepusht. Live: https://gzivanovic-cmyk.github.io/ijs-hagellijst/"
