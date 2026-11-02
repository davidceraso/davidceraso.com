/**
 * Capture templates catalog (light) — National and OTV sidebar filters.
 */
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PREVIEW_ROOT =
  process.env.ABCNEWS_PREVIEW_ROOT ||
  path.join(process.env.HOME || '', 'workspace/abc-news-design-system/preview');
const OUT = path.join(__dirname, '../assets/abc-news-design-mcp');
const PORT = 8767;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.json': 'application/json',
};

const FILTERS = [
  ['national', 'templates-national-light.png', 'National'],
  ['otv', 'templates-otv-light.png', 'OTV'],
];

function startPreviewServer(root) {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      const url = new URL(req.url || '/', `http://127.0.0.1:${PORT}`);
      let filePath = path.join(root, decodeURIComponent(url.pathname));
      if (!filePath.startsWith(root)) {
        res.writeHead(403);
        res.end();
        return;
      }
      if (!existsSync(filePath)) {
        res.writeHead(404);
        res.end();
        return;
      }
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
      res.end(readFileSync(filePath));
    });
    server.listen(PORT, '127.0.0.1', () => resolve(server));
  });
}

async function waitForBrandLogo(page) {
  await page.waitForFunction(
    () => {
      const img = document.querySelector('.nav-brand .nav-logo');
      return img && img.complete && img.naturalWidth > 0;
    },
    null,
    { timeout: 15000 }
  );
}

async function setLightTheme(page) {
  await page.evaluate(() => {
    try {
      localStorage.setItem('abcnews-theme', 'light');
    } catch {
      /* ignore */
    }
  });
  const btn = page.locator('button.theme-mode-btn[data-theme-mode="light"]');
  await btn.waitFor({ state: 'visible', timeout: 15000 });
  await btn.click();
  await page.waitForTimeout(500);
  await waitForBrandLogo(page);
}

async function main() {
  if (!existsSync(PREVIEW_ROOT)) {
    throw new Error(`Preview not found: ${PREVIEW_ROOT}`);
  }
  await mkdir(OUT, { recursive: true });
  const server = await startPreviewServer(PREVIEW_ROOT);
  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage({
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: 2,
  });

  await page.goto(`http://127.0.0.1:${PORT}/templates.html`, { waitUntil: 'networkidle' });
  await setLightTheme(page);

  for (const [filter, outfile] of FILTERS) {
    await page.locator(`a.doc-sidebar-link[data-template="${filter}"]`).click();
    await page.waitForTimeout(600);
    await waitForBrandLogo(page);
    await page.screenshot({ path: path.join(OUT, outfile), fullPage: false });
    console.log('saved', outfile);
  }

  await browser.close();
  server.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
