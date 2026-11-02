#!/usr/bin/env bash
# Copy deck PDF from Desktop (OneDrive) into repo and render DCM case-study slides.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
SRC="${1:-$HOME/Library/CloudStorage/OneDrive-TheWaltDisneyCompany/Desktop/David Ceraso _ Neha Singh.pdf}"
DEST="$ROOT/case-studies/assets/disney-campaign-manager/deck.pdf"
OUT="$ROOT/case-studies/assets/disney-campaign-manager/slides"
mkdir -p "$(dirname "$DEST")" "$OUT"

if [[ ! -f "$SRC" ]]; then
  echo "PDF not found: $SRC" >&2
  echo "Usage: $0 [path-to-deck.pdf]" >&2
  exit 1
fi

cp "$SRC" "$DEST"
echo "Copied to $DEST"

PDFTOPPM="$(command -v pdftoppm || true)"
[[ -x /opt/homebrew/bin/pdftoppm ]] && PDFTOPPM=/opt/homebrew/bin/pdftoppm

if [[ -z "$PDFTOPPM" ]]; then
  echo "Install poppler: brew install poppler" >&2
  exit 2
fi

# DCM case study pages (1-based, match deck slide numbers)
PAGES=(20 24 30 36 41 46 52 58 65 72)
for p in "${PAGES[@]}"; do
  out="$OUT/dcm-$(printf '%02d' "$p")-page.png"
  "$PDFTOPPM" -png -r 144 -f "$p" -l "$p" "$DEST" "$OUT/dcm-$(printf '%02d' "$p")"
  rendered=$(ls "$OUT/dcm-$(printf '%02d' "$p")-"*.png 2>/dev/null | head -1)
  if [[ -n "$rendered" && "$rendered" != "$out" ]]; then
    mv "$rendered" "$out"
  fi
  echo "Rendered page $p -> $out"
done
