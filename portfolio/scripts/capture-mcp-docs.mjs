/**
 * Capture MCP docs page in light mode (portfolio Agent tooling figure).
 */
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PREVIEW_ROOT =
  process.env.ABCNEWS_PREVIEW_ROOT ||
  path.join(process.env.HOME || '', 'workspace/abc-news-design-system/preview');
const OUT = path.join(__dirname, '../assets/abc-news-design-mcp/mcp-docs.png');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.json': 'application/json',
};

function startPreviewServer(root) {
  return new Promise((resolve, reject) => {
    const server = createServer((req, res) => {
      const { port } = server.address();
      const url = new URL(req.url || '/', `http://127.0.0.1:${port}`);
      let filePath = path.join(root, decodeURIComponent(url.pathname));
      if (!filePath.startsWith(root) || !existsSync(filePath)) {
        res.writeHead(404);
        res.end();
        return;
      }
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
      res.end(readFileSync(filePath));
    });
    server.on('error', reject);
    server.listen(0, '127.0.0.1', () => resolve(server));
  });
}

async function main() {
  if (!existsSync(PREVIEW_ROOT)) {
    throw new Error(`Preview not found: ${PREVIEW_ROOT}`);
  }

  const server = await startPreviewServer(PREVIEW_ROOT);
  const port = server.address().port;
  const browser = await chromium.launch({ channel: 'chrome' });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: 2,
  });
  await context.addInitScript(() => {
    try {
      localStorage.setItem('abcnews-theme', 'light');
    } catch {
      /* ignore */
    }
  });

  const page = await context.newPage();
  await page.goto(`http://127.0.0.1:${port}/abcnews-mcp-output.html`, { waitUntil: 'networkidle' });

  const lightBtn = page.locator('button.theme-mode-btn[data-theme-mode="light"]');
  await lightBtn.waitFor({ state: 'visible', timeout: 15000 });
  await lightBtn.click();

  await page.waitForFunction(() => document.documentElement.getAttribute('data-theme') === 'light');
  await page.waitForFunction(() => {
    const btn = document.querySelector('button.theme-mode-btn[data-theme-mode="light"]');
    return btn && btn.getAttribute('aria-pressed') === 'true';
  });

  await page.waitForFunction(() => {
    const img = document.querySelector('.nav-brand .nav-logo');
    return img && img.complete && img.naturalWidth > 0;
  });

  await page.waitForTimeout(400);
  await page.screenshot({ path: OUT, fullPage: false });
  console.log('saved', OUT);

  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
