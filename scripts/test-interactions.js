import { spawn } from 'child_process';
import path from 'path';

const chromePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';

async function testInteractions() {
  const port = 9550;
  const userDataDir = path.join(process.env.TEMP, 'chrome-test-int-' + Date.now());

  const cp = spawn(chromePath, [
    '--headless=new',
    '--enable-webgl',
    '--ignore-gpu-blocklist',
    `--user-data-dir=${userDataDir}`,
    `--remote-debugging-port=${port}`,
    'http://localhost:5173/',
  ]);

  await new Promise((r) => setTimeout(r, 2000));

  try {
    const pages = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
    const targetPage = pages.find((p) => p.type === 'page');
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
    await send('Input.enable');
    await new Promise((r) => setTimeout(r, 2000));

    // Verify contact links in Contact section and Footer
    const contactLinks = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const links = Array.from(document.querySelectorAll('a[href^="tel:"], a[href^="mailto:"], a[href*="wa.me"]'));
          return links.map(a => ({
            href: a.getAttribute('href'),
            text: a.innerText.trim(),
            visible: a.offsetParent !== null
          }));
        })()
      `,
      returnByValue: true,
    });

    console.log('Contact links verified:', JSON.stringify(contactLinks?.result?.value, null, 2));

    // Simulate mouse wheel scrolling through the whole page
    console.log('Simulating mouse wheel scroll across the full page...');
    for (let i = 0; i < 20; i++) {
      await send('Input.dispatchMouseEvent', {
        type: 'mouseWheel',
        x: 640,
        y: 400,
        deltaX: 0,
        deltaY: 800,
      });
      await new Promise((r) => setTimeout(r, 100));
    }

    const finalScroll = await send('Runtime.evaluate', {
      expression: '({ scrollY: window.scrollY, scrollHeight: document.documentElement.scrollHeight })',
      returnByValue: true,
    });

    console.log('Wheel scroll completed:', JSON.stringify(finalScroll?.result?.value));
    ws.close();
  } catch (err) {
    console.error('Interaction test error:', err);
  } finally {
    cp.kill();
    try {
      fs.rmSync(userDataDir, { recursive: true, force: true });
    } catch {}
  }
}

testInteractions();
