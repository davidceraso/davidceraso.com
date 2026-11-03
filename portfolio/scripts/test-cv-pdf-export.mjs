import { chromium } from 'playwright';
import { writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { tmpdir } from 'os';
import { join } from 'path';

const PY = join(process.cwd(), '../../.venv-cv/bin/python');

async function clickDownload(page, outPath) {
  const downloadPromise = page.waitForEvent('download', { timeout: 45000 });
  await page.click('[data-cv-export]');
  const download = await downloadPromise;
  await download.saveAs(outPath);
}

async function verifyPdf(path) {
  const script = join(tmpdir(), 'cv-pdf-verify.py');
  writeFileSync(
    script,
    `import pymupdf, sys
path = sys.argv[1]
d = pymupdf.open(path)
print('pages', len(d))
p = d[0]
imgs = p.get_images(full=True)
print('images', len(imgs))
for im in imgs:
    r = p.get_image_rects(im[0])[0]
    print('rect', tuple(r))
    print('within_page', r.x0 >= 0, r.y0 >= 0, r.x1 <= 612, r.y1 <= 792)
    pix = pymupdf.Pixmap(d, im[0])
    blue = sum(1 for y in range(0, pix.height, 5) for x in range(0, pix.width, 5)
               if pix.pixel(x, y)[2] > 200 and pix.pixel(x, y)[0] < 80)
    left = sum(1 for y in range(80, 400, 4) for x in range(0, 220, 4)
               if pix.pixel(x, y)[2] > 200 and pix.pixel(x, y)[0] < 80)
    print('blue_samples', blue, 'left_band', left)
    if blue < 500:
        raise SystemExit('PDF image looks empty')
`
  );
  execSync(`${PY} ${script} ${path}`, { stdio: 'inherit' });
}

const browser = await chromium.launch();
const page = await browser.newPage();

for (const [url, slug] of [
  ['http://localhost:8000/portfolio/', 'portfolio'],
  ['http://localhost:8000/CV/', 'cv'],
]) {
  await page.goto(url, { waitUntil: 'networkidle' });
  if (slug === 'portfolio') {
    await page.evaluate(() => {
      sessionStorage.setItem('case_studies_auth', 'true');
      sessionStorage.setItem('portfolio_project', 'cv');
    });
    await page.reload({ waitUntil: 'networkidle' });
  } else {
    await page.waitForSelector('[data-cv-export]', { timeout: 10000 });
  }

  const out = `/tmp/cv-export-test-${slug}.pdf`;
  await clickDownload(page, out);
  console.log('---', url, '->', out);
  verifyPdf(out);
}

await browser.close();
