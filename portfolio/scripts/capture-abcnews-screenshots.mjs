import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE = 'https://abc-news-design-system-82ae7e.pages.gitlab.disney.com';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '../assets/abc-news-design-mcp');

async function setTheme(page, mode) {
  const btn = page.locator(`button.theme-mode-btn[data-theme-mode="${mode}"]`);
  await btn.waitFor({ state: 'visible', timeout: 15000 });
  await btn.click();
  await page.waitForTimeout(400);
}

async function shot(page, name) {
  await page.screenshot({
    path: path.join(OUT, name),
    fullPage: false,
  });
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: 2,
  });

  const modes = [
    { mode: 'light', file: 'home-light.png' },
    { mode: 'dark', file: 'home-dark.png' },
    { mode: 'dark-blue', file: 'home-dark-blue.png' },
  ];

  await page.goto(`${BASE}/index.html`, { waitUntil: 'networkidle' });
  for (const { mode, file } of modes) {
    await setTheme(page, mode);
    await shot(page, file);
  }

  const sections = [
    {
      path: 'foundations.html',
      light: 'foundations-light.png',
      dark: 'foundations-dark.png',
      darkBlue: 'foundations-dark-blue.png',
    },
    {
      path: 'components.html',
      light: 'components-light.png',
      dark: 'components-dark.png',
      darkBlue: 'components-dark-blue.png',
    },
    {
      path: 'templates.html',
      light: 'templates-light.png',
      dark: 'templates-dark.png',
      darkBlue: 'templates-dark-blue.png',
    },
  ];

  for (const section of sections) {
    const { path: pagePath, light, dark, darkBlue } = section;
    await page.goto(`${BASE}/${pagePath}`, { waitUntil: 'networkidle' });
    await setTheme(page, 'light');
    await shot(page, light);
    await setTheme(page, 'dark');
    await shot(page, dark);
    if (darkBlue) {
      await setTheme(page, 'dark-blue');
      await shot(page, darkBlue);
    }
  }

  await page.goto(`${BASE}/abcnews-mcp-output.html`, { waitUntil: 'networkidle' });
  await setTheme(page, 'light');
  await shot(page, 'mcp-docs.png');

  await browser.close();
  console.log('Saved screenshots to', OUT);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
