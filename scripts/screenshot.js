const puppeteer = require('puppeteer');
const path = require('path');

const URL = process.env.URL || 'http://127.0.0.1:9123';
const OUT = path.resolve(__dirname, '..', 'screenshots');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    protocolTimeout: 180000,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  page.setDefaultTimeout(60000);

  // Use 'load' (not networkidle0) — the marquee CSS animation keeps the
  // network from ever going fully idle on some hosts.
  await page.goto(URL, { waitUntil: 'load', timeout: 60000 });

  // Best-effort wait for web fonts (don't let a stuck font hang us forever)
  await Promise.race([
    page.evaluate(() => document.fonts && document.fonts.ready ? document.fonts.ready : null),
    new Promise(r => setTimeout(r, 5000)),
  ]);
  await new Promise(r => setTimeout(r, 800));

  // Pause CSS animations so they don't fight the screenshot pipeline
  await page.addStyleTag({
    content: `*,*::before,*::after{animation:none!important;transition:none!important;}`
  });

  // Hero — viewport at top
  await page.evaluate(() => window.scrollTo(0, 0));
  const heroPath = path.join(OUT, 'screenshot-hero.png');
  await page.screenshot({ path: heroPath, fullPage: false, captureBeyondViewport: false });
  console.log('hero ok');

  // Full page
  const fullPath = path.join(OUT, 'screenshot-full.png');
  await page.screenshot({ path: fullPath, fullPage: true });
  console.log('full ok');

  await browser.close();

  console.log('OK');
  console.log(heroPath);
  console.log(fullPath);
})().catch(err => {
  console.error('ERROR:', err && err.message ? err.message : err);
  process.exit(1);
});
