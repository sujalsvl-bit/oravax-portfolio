import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.resolve('./screenshots');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const views = [
  { name: 'gate', hash: '#gate' },
  { name: 'services', hash: '#services' },
  { name: 'pricing', hash: '#pricing' },
  { name: 'contact', hash: '#contact' },
];

const viewports = [
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'mobile-360', width: 360, height: 740 },
];

for (const vp of viewports) {
  for (const v of views) {
    const outFile = path.join(outDir, `${v.name}-${vp.name}.png`);
    const url = `http://localhost:5173/${v.hash}`;
    console.log(`Capturing ${v.name} (${vp.name})...`);
    
    const cmd = `"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=2500 --window-size=${vp.width},${vp.height} --screenshot="${outFile}" "${url}"`;
    try {
      execSync(cmd, { stdio: 'pipe', timeout: 15000 });
      console.log(`Saved ${outFile} (${fs.statSync(outFile).size} bytes)`);
    } catch (err) {
      console.error(`Error capturing ${outFile}:`, err.message);
    }
  }
}
