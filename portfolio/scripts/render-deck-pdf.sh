#!/usr/bin/env bash
# Render DCM case-study pages from deck.pdf (must already be in repo).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
DEST="$ROOT/portfolio/assets/disney-campaign-manager/deck.pdf"
OUT="$ROOT/portfolio/assets/disney-campaign-manager/slides"
PDFTOPPM="$(command -v pdftoppm || true)"
[[ -x /opt/homebrew/bin/pdftoppm ]] && PDFTOPPM=/opt/homebrew/bin/pdftoppm

if [[ ! -f "$DEST" ]]; then
  echo "Missing $DEST" >&2
  echo "Copy your Desktop PDF there as deck.pdf, then re-run this script." >&2
  exit 1
fi
if [[ -z "$PDFTOPPM" ]]; then
  echo "Install poppler: brew install poppler" >&2
  exit 2
fi

mkdir -p "$OUT"
# page:output-base-name (without .png)
SLIDES=(
  "20:dcm-externalization-title"
  "24:dcm-problem"
  "30:dcm-advertiser-controlled"
  "36:dcm-unified-destination"
  "41:dcm-externalization-map"
  "46:dcm-external-reporting"
  "52:dcm-content-packages"
  "58:dcm-audiences"
  "65:dcm-dxc-unified"
  "72:dcm-results"
)

for entry in "${SLIDES[@]}"; do
  page="${entry%%:*}"
  base="${entry##*:}"
  "$PDFTOPPM" -png -r 144 -singlefile -f "$page" -l "$page" "$DEST" "$OUT/$base"
  echo "Page $page -> $OUT/$base.png"
done
