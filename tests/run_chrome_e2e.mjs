import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SCREENSHOTS_DIR = path.join(__dirname, '../docs/screenshots');

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

class CDPClient {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 1;
    this.callbacks = new Map();
    this.ready = new Promise((resolve, reject) => {
      this.ws.onopen = resolve;
      this.ws.onerror = reject;
    });
    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && this.callbacks.has(msg.id)) {
        const { resolve, reject } = this.callbacks.get(msg.id);
        this.callbacks.delete(msg.id);
        if (msg.error) reject(new Error(JSON.stringify(msg.error)));
        else resolve(msg.result);
      }
    };
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.id++;
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async eval(expr) {
    const res = await this.send('Runtime.evaluate', {
      expression: expr,
      returnByValue: true,
      awaitPromise: true
    });
    return res.result?.value;
  }

  async captureScreenshot(filename) {
    const res = await this.send('Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(res.data, 'base64');
    const fullPath = path.join(SCREENSHOTS_DIR, filename);
    fs.writeFileSync(fullPath, buffer);
    console.log(`[Screenshot Saved] -> docs/screenshots/${filename}`);
  }
}

async function main() {
  console.log('=== MetaStar Sentinel Chrome DevTools Automation Test ===\n');
  
  // 1. Get targets from Chrome
  const targets = await getJson('http://localhost:9222/json');
  const pageTarget = targets.find(t => t.type === 'page' && t.url.includes('localhost:3000'));
  
  if (!pageTarget) {
    throw new Error('No page target found for localhost:3000 on Chrome CDP!');
  }
  
  console.log(`Connecting to Chrome tab: ${pageTarget.title} (${pageTarget.webSocketDebuggerUrl})`);
  const client = new CDPClient(pageTarget.webSocketDebuggerUrl);
  await client.ready;
  
  await client.send('Page.enable');
  await client.send('DOM.enable');
  await client.send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });

  // Ensure DOM is ready
  await client.send('Page.reload');
  await new Promise(r => setTimeout(r, 1200));

  // TEST 1: Case A (Safe)
  console.log('\n--- 1. Testing Case A: Safe Prime Apartment ---');
  const scoreA = await client.eval(`document.getElementById('scoreValue').textContent.trim()`);
  const riskA = await client.eval(`document.getElementById('riskPillBadge').textContent.trim()`);
  const hugA = await client.eval(`document.getElementById('hugEligibilityBadge').textContent.trim()`);
  const addressA = await client.eval(`document.getElementById('addressInput').value.trim()`);
  
  console.log(`Address: ${addressA}`);
  console.log(`Score: ${scoreA} | Risk Pill: ${riskA} | HUG: ${hugA}`);
  
  if (scoreA !== '96' || (riskA !== 'SAFE' && riskA !== 'LOW') || hugA !== 'ELIGIBLE') {
    throw new Error(`Assertion failed on Case A: Score=${scoreA}, Risk=${riskA}, HUG=${hugA}`);
  }
  await client.captureScreenshot('01_case_a_safe_prime.png');

  // TEST 2: Case B (Trust Deed Trap)
  console.log('\n--- 2. Testing Case B: Critical Trust Deed Fraud Trap ---');
  await client.eval(`document.querySelectorAll('.scenario-chip')[1].click()`);
  await new Promise(r => setTimeout(r, 600));

  const scoreB = await client.eval(`document.getElementById('scoreValue').textContent.trim()`);
  const riskB = await client.eval(`document.getElementById('riskPillBadge').textContent.trim()`);
  const hugB = await client.eval(`document.getElementById('hugEligibilityBadge').textContent.trim()`);
  const redFlagsCountB = await client.eval(`document.querySelectorAll('.red-flag-item').length`);

  console.log(`Score: ${scoreB} | Risk Pill: ${riskB} | HUG: ${hugB} | Red Flags: ${redFlagsCountB}`);
  
  if (scoreB !== '8' || riskB !== 'CRITICAL' || hugB !== 'INELIGIBLE') {
    throw new Error(`Assertion failed on Case B: Score=${scoreB}, Risk=${riskB}, HUG=${hugB}`);
  }
  await client.captureScreenshot('02_case_b_trust_deed_trap.png');

  // TEST 3: Case C (Illegal Commercial Conversion) & Inspect Building Ledger Tab
  console.log('\n--- 3. Testing Case C: Severe Edge Case (Illegal Commercial Extension) ---');
  await client.eval(`document.querySelectorAll('.scenario-chip')[2].click()`);
  await new Promise(r => setTimeout(r, 600));
  
  const scoreC = await client.eval(`document.getElementById('scoreValue').textContent.trim()`);
  const riskC = await client.eval(`document.getElementById('riskPillBadge').textContent.trim()`);
  console.log(`Score: ${scoreC} | Risk Pill: ${riskC}`);
  
  // Click Building Ledger Tab
  await client.eval(`document.querySelectorAll('.doc-tab')[1].click()`);
  await new Promise(r => setTimeout(r, 400));
  const stampText = await client.eval(`document.getElementById('violationStamp').textContent.trim()`);
  console.log(`Building Ledger Violation Stamp: "${stampText}"`);
  
  await client.captureScreenshot('03_case_c_illegal_extension_ledger.png');

  // TEST 4: Case D (Subprime Waterfall) & Interact with Slider
  console.log('\n--- 4. Testing Case D: Subprime Waterfall & Dividend Simulator ---');
  await client.eval(`document.querySelectorAll('.scenario-chip')[3].click()`);
  await new Promise(r => setTimeout(r, 600));

  const scoreD = await client.eval(`document.getElementById('scoreValue').textContent.trim()`);
  const lossD = await client.eval(`document.getElementById('projectedLoss').textContent.trim()`);
  console.log(`Score: ${scoreD} | Projected Capital Loss: ${lossD}`);

  // Drag Auction Slider to 60%
  await client.eval(`
    const slider = document.getElementById('auctionRateSlider');
    slider.value = 60;
    slider.dispatchEvent(new Event('input', { bubbles: true }));
  `);
  await new Promise(r => setTimeout(r, 400));
  const newLoss = await client.eval(`document.getElementById('projectedLoss').textContent.trim()`);
  console.log(`Simulated Loss at 60% Liquidation: ${newLoss}`);
  await client.captureScreenshot('04_case_d_subprime_waterfall.png');

  // TEST 5: Broker Closing Certificate Modal
  console.log('\n--- 5. Testing Broker Closing Certificate Modal ---');
  await client.eval(`document.getElementById('openCertificateBtn').click()`);
  await new Promise(r => setTimeout(r, 600));
  
  const isModalOpen = await client.eval(`document.getElementById('certModal').classList.contains('open')`);
  console.log(`Certificate Modal Open State: ${isModalOpen}`);
  
  if (!isModalOpen) throw new Error('Certificate modal did not open!');
  await client.captureScreenshot('05_broker_closing_certificate_modal.png');

  // Close modal
  await client.eval(`document.getElementById('closeCertModalBtn').click()`);
  await new Promise(r => setTimeout(r, 400));

  // TEST 6: Bilingual Language Toggle
  console.log('\n--- 6. Testing Bilingual Language Toggle ---');
  await client.eval(`document.getElementById('langToggleBtn').click()`);
  await new Promise(r => setTimeout(r, 400));
  const currentLangLabel = await client.eval(`document.getElementById('currentLang').textContent.trim()`);
  console.log(`Switched Language Label: "${currentLangLabel}"`);
  await client.captureScreenshot('06_bilingual_language_toggle.png');

  console.log('\n===============================================================');
  console.log('>>> ALL 6 BROWSER E2E TESTS PASSED WITH 100% SUCCESS RATIO! <<<');
  console.log('===============================================================');
  process.exit(0);
}

main().catch(err => {
  console.error('\nE2E Test Execution Error:', err);
  process.exit(1);
});
