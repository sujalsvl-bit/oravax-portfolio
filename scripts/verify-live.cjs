const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.resolve('./screenshots-live');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function verifyLive() {
  const port = 9550;
  const userDataDir = path.join(process.env.TEMP, `chrome-live-test-${Date.now()}`);

  const cp = spawn(chromePath, [
    '--headless=new',
    '--enable-webgl',
    '--ignore-gpu-blocklist',
    `--user-data-dir=${userDataDir}`,
    `--remote-debugging-port=${port}`,
    '--window-size=1280,800',
    'https://sujalsvl-bit.github.io/oravax-portfolio/',
  ]);

  let pages = null;
  for (let attempt = 0; attempt < 15; attempt++) {
    await new Promise((r) => setTimeout(r, 600));
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/list`);
      if (res.ok) {
        pages = await res.json();
        break;
      }
    } catch {}
  }

  if (!pages) throw new Error(`Could not connect to Chrome debugging port ${port}`);

  try {
    const targetPage = pages.find((p) => p.type === 'page');
    if (!targetPage) throw new Error('No page target found');

    const ws = new WebSocket(targetPage.webSocketDebuggerUrl);
    await new Promise((resolve) => ws.addEventListener('open', resolve));

    let msgId = 1;
    function send(method, params = {}) {
      return new Promise((resolve) => {
        const id = msgId++;
        const handler = (e) => {
          const msg = JSON.parse(e.data);
          if (msg.id === id) {
            ws.removeEventListener('message', handler);
            resolve(msg.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    const failedRequests = [];
    const consoleLogs = [];

    ws.addEventListener('message', (e) => {
      const msg = JSON.parse(e.data);
      if (msg.method === 'Network.responseReceived') {
        const resp = msg.params.response;
        if (resp.status >= 400) {
          failedRequests.push(`${resp.status} ${resp.url}`);
        }
      }
      if (msg.method === 'Network.loadingFailed') {
        failedRequests.push(`FAILED: ${msg.params.errorText} (${msg.params.requestId})`);
      }
      if (msg.method === 'Runtime.consoleAPICalled') {
        const text = msg.params.args.map((a) => a.value || a.description).join(' ');
        consoleLogs.push(`[${msg.params.type}] ${text}`);
      }
      if (msg.method === 'Runtime.exceptionThrown') {
        consoleLogs.push(`[EXCEPTION] ${msg.params.exceptionDetails.text}`);
      }
    });

    await send('Page.enable');
    await send('Network.enable');
    await send('Runtime.enable');

    console.log('Waiting 5s for live page, 3D canvas, and fonts to load...');
    await new Promise((r) => setTimeout(r, 5000));

    // Check title and canvas in DOM
    const evalResult = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const canvas = document.querySelector('canvas');
          const title = document.title;
          const reviews = document.querySelectorAll('article').length;
          return {
            title,
            hasCanvas: !!canvas,
            canvasWidth: canvas ? canvas.width : 0,
            canvasHeight: canvas ? canvas.height : 0,
            articlesCount: reviews
          };
        })()
      `,
      returnByValue: true
    });

    console.log('Live DOM inspection:', evalResult.result.value);

    // Capture screenshot at Gate
    const gateShot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'live-gate.png'), Buffer.from(gateShot.data, 'base64'));
    console.log('Saved live-gate.png');

    // Scroll to reviews
    await send('Runtime.evaluate', {
      expression: `
        (() => {
          const el = document.getElementById('reviews');
          if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
        })()
      `
    });
    await new Promise((r) => setTimeout(r, 1500));

    const reviewsShot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'live-reviews.png'), Buffer.from(reviewsShot.data, 'base64'));
    console.log('Saved live-reviews.png');

    console.log('Failed requests count:', failedRequests.length);
    if (failedRequests.length > 0) {
      console.log('Failed requests:', failedRequests);
    }

    console.log('Console logs count:', consoleLogs.length);
    if (consoleLogs.length > 0) {
      console.log('Console logs sample:', consoleLogs.slice(0, 10));
    }

    ws.close();
  } catch (err) {
    console.error('Error during verification:', err);
  } finally {
    cp.kill();
    try {
      fs.rmSync(userDataDir, { recursive: true, force: true });
    } catch {}
  }
}

verifyLive().catch(console.error);
