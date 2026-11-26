import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.resolve('./screenshots');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function captureViewport(vpName, width, height) {
  const port = 9440 + (vpName === 'desktop' ? 0 : 2);
  const userDataDir = path.join(process.env.TEMP, `chrome-snap-${vpName}-${Date.now()}`);

  const cp = spawn(chromePath, [
    '--headless=new',
    '--enable-webgl',
    '--ignore-gpu-blocklist',
    `--user-data-dir=${userDataDir}`,
    `--remote-debugging-port=${port}`,
    `--window-size=${width},${height}`,
    'http://localhost:5173/',
  ]);

  // Wait for Chrome remote debugging port with retry loop
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

    await send('Page.enable');
    await send('DOM.enable');
    // Allow initial 3D scene to mount and load textures
    await new Promise((r) => setTimeout(r, 3000));

    const targets = [
      { id: 'gate', name: 'gate' },
      { id: 'services', name: 'services' },
      { id: 'pricing', name: 'pricing' },
      { id: 'reviews', name: 'reviews' },
      { id: 'contact', name: 'contact' },
    ];

    for (const t of targets) {
      console.log(`Scrolling to ${t.name} (${vpName})...`);

      // Scroll precisely to section's offsetTop
      await send('Runtime.evaluate', {
        expression: `
          (() => {
            const el = document.getElementById('${t.id}');
            if (el) {
              window.scrollTo({ top: el.offsetTop, behavior: 'instant' });
              window.dispatchEvent(new Event('scroll'));
            }
          })()
        `,
      });

      // Wait 1600ms for camera Catmull-Rom spline damping & Three.js render
      await new Promise((r) => setTimeout(r, 1600));

      const screenshot = await send('Page.captureScreenshot', { format: 'png' });
      if (screenshot && screenshot.data) {
        const filePath = path.join(outDir, `${t.name}-${vpName}.png`);
        fs.writeFileSync(filePath, Buffer.from(screenshot.data, 'base64'));
        const stats = fs.statSync(filePath);
        console.log(`Saved ${filePath} (${stats.size} bytes)`);
      }
    }

    ws.close();
  } catch (err) {
    console.error(`Error capturing ${vpName}:`, err);
  } finally {
    cp.kill();
    try {
      fs.rmSync(userDataDir, { recursive: true, force: true });
    } catch {}
  }
}

async function main() {
  console.log('Capturing desktop screenshots (1280x800)...');
  await captureViewport('desktop', 1280, 800);

  console.log('Capturing mobile screenshots (360x740)...');
  await captureViewport('mobile-360', 360, 740);

  console.log('Done capturing all acceptance screenshots.');
}

main().catch(console.error);
