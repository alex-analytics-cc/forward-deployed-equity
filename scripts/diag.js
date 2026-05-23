const puppeteer = require('puppeteer');
(async () => {
  console.log('launching...');
  const b = await puppeteer.launch({
    headless: true,
    protocolTimeout: 60000,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });
  console.log('launched, version:', await b.version());
  const p = await b.newPage();
  console.log('newPage ok');
  await p.setViewport({ width: 800, height: 600 });
  console.log('viewport set');
  await p.setContent('<h1>hi</h1>');
  console.log('content set');
  await p.screenshot({ path: '/tmp/fde_test.png' });
  console.log('screenshot ok');
  await b.close();
  console.log('DONE');
})().catch(e => { console.error('DIAG ERR:', e.message); process.exit(1); });
