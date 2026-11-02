/**
 * Capture Disney Campaign Manager marketing site sections for portfolio case study.
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '../assets/disney-campaign-manager');
const BASE = 'https://www.disneycampaignmanager.com';

const SHOTS = [
  { name: 'hero-home.png', url: `${BASE}/`, selector: 'main, body', fullPage: false },
  { name: 'how-it-works.png', url: `${BASE}/`, selector: '#how-it-works, [id*="how"]', fullPage: false },
  { name: 'capabilities.png', url: `${BASE}/`, selector: 'section:nth-of-type(2)', fullPage: false },
];

async function capture(page, { name, url, selector, fullPage }) {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(1500);
  const loc = page.locator(selector).first();
  const box = await loc.boundingBox().catch(() => null);
  const out = path.join(OUT_DIR, name);
  if (box && box.width > 100 && box.height > 100) {
    await loc.screenshot({ path: out });
  } else {
    await page.screenshot({ path: out, fullPage: Boolean(fullPage) });
  }
  console.log('wrote', out);
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const browser = await chromium.launch({ channel: 'chrome' });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  for (const shot of SHOTS) {
    await capture(page, shot);
  }

  await page.goto(`${BASE}/faq/campaigns/`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({
    path: path.join(OUT_DIR, 'campaign-model-faq.png'),
    fullPage: true,
  });
  console.log('wrote campaign-model-faq.png');

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
