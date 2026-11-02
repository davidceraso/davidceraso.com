/**
 * Render selected deck PDF pages to PNG for the DCM case study.
 * Requires: deck.pdf in case-studies/assets/disney-campaign-manager/
 * Run after: bash case-studies/scripts/import-deck-pdf.sh
 */
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSET_DIR = path.join(__dirname, '../assets/disney-campaign-manager');
const PDF = path.join(ASSET_DIR, 'deck.pdf');
const OUT_DIR = path.join(ASSET_DIR, 'slides');

/** 1-based PDF page numbers for DCM case study (align with deck slide numbers). */
const DCM_PAGES = [
  { page: 20, name: 'dcm-20-externalization-title.png' },
  { page: 24, name: 'dcm-24-problem.png' },
  { page: 30, name: 'dcm-30-advertiser-controlled.png' },
  { page: 36, name: 'dcm-36-unified-destination.png' },
  { page: 41, name: 'dcm-41-externalization-map.png' },
  { page: 46, name: 'dcm-46-external-reporting.png' },
  { page: 52, name: 'dcm-52-content-packages.png' },
  { page: 58, name: 'dcm-58-audiences.png' },
  { page: 65, name: 'dcm-65-dxc-unified.png' },
  { page: 72, name: 'dcm-72-results.png' },
];

function renderWithPyMuPDF() {
  const py = `
import fitz, sys, os
pdf = sys.argv[1]
out = sys.argv[2]
pages = sys.argv[3:]
doc = fitz.open(pdf)
os.makedirs(out, exist_ok=True)
for spec in pages:
    num, name = spec.split(',', 1)
    i = int(num) - 1
    if i < 0 or i >= doc.page_count:
        print('skip', num, 'of', doc.page_count)
        continue
    pix = doc.load_page(i).get_pixmap(matrix=fitz.Matrix(2, 2))
    path = os.path.join(out, name)
    pix.save(path)
    print('wrote', path)
doc.close()
`;
  const args = [PDF, OUT_DIR, ...DCM_PAGES.map(({ page, name }) => `${page},${name}`)];
  const r = spawnSync('python3', ['-c', py, ...args], { encoding: 'utf8' });
  if (r.status !== 0) {
    console.error(r.stderr || r.stdout);
    return false;
  }
  console.log(r.stdout);
  return true;
}

function main() {
  if (!existsSync(PDF)) {
    console.error(`Missing ${PDF}. Run: bash case-studies/scripts/import-deck-pdf.sh`);
    process.exit(1);
  }
  mkdirSync(OUT_DIR, { recursive: true });
  if (!renderWithPyMuPDF()) {
    console.error('Install PyMuPDF: pip3 install --user pymupdf');
    process.exit(2);
  }
}

main();
