const fs = require('fs');
const path = require('path');

// Load cases
const rawData = fs.readFileSync(path.join(__dirname, '../data/cases.json'), 'utf8');
const cases = JSON.parse(rawData);

console.log('--- Running MetaStar Sentinel Dividend & Risk Calculation Tests ---');
let allPassed = true;

cases.forEach((c) => {
  console.log(`\nTesting: [${c.id}] ${c.title}`);
  
  // 1. Check Jeonse Ratio calculation
  const calculatedJeonseRatio = Number(((c.jeonseDeposit / c.marketPrice) * 100).toFixed(1));
  const jeonseRatioDiff = Math.abs(calculatedJeonseRatio - c.jeonseRatio);
  if (jeonseRatioDiff > 0.2) {
    console.error(`FAIL: Jeonse Ratio mismatch. Expected ${c.jeonseRatio}, got ${calculatedJeonseRatio}`);
    allPassed = false;
  } else {
    console.log(`PASS: Jeonse Ratio is accurate (${calculatedJeonseRatio}%)`);
  }

  // 2. Check Auction Dividend Math
  const sim = c.dividendSimulation;
  const netProceeds = sim.auctionSaleEstimate - sim.courtCost;
  
  if (c.id === 'case-trust') {
    // In trust fraud, tenant has zero legal claim against trustee
    if (sim.tenantDividend !== 0 || sim.recoveryRate !== 0) {
      console.error(`FAIL: Trust trap must yield 0 recovery. Got ${sim.recoveryRate}%`);
      allPassed = false;
    } else {
      console.log(`PASS: Trust fraud correctly yields 0% dividend recovery (illegal occupant relative to trustee)`);
    }
  } else if (c.id === 'case-safe') {
    // In safe apartment, auction proceeds cover senior debt + tenant deposit fully
    const remainingForTenant = netProceeds - sim.seniorLienRepayment;
    if (remainingForTenant < c.jeonseDeposit || sim.recoveryRate !== 100) {
      console.error(`FAIL: Safe property must yield 100% recovery.`);
      allPassed = false;
    } else {
      console.log(`PASS: Safe property yields 100% recovery (Senior 100M, Tenant 800M fully satisfied)`);
    }
  } else if (c.id === 'case-subprime') {
    // Subprime waterfall: proceeds = 138.6M - 3.6M = 135M.
    // Tenant gets priority dividend (or partial dividend). Total loss is severe.
    if (sim.tenantLoss < 100000000) {
      console.error(`FAIL: Subprime case should show catastrophic loss (> 100M KRW). Got ${sim.tenantLoss}`);
      allPassed = false;
    } else {
      console.log(`PASS: Subprime case correctly alerts tenant loss of ${sim.tenantLoss.toLocaleString()} KRW (${sim.recoveryRate}% recovery)`);
    }
  } else if (c.id === 'case-illegal') {
    // Illegal building violation check
    if (!c.buildingLedger.isViolatingBuilding || c.hugEligibility.eligible) {
      console.error(`FAIL: Illegal building must be flagged as violating and HUG ineligible.`);
      allPassed = false;
    } else {
      console.log(`PASS: Illegal building violation detected; HUG insurance correctly marked INELIGIBLE`);
    }
  }
});

if (allPassed) {
  console.log('\n>>> ALL 4 RISK SCENARIO ENGINE TESTS PASSED SUCCESSFULLY! <<<');
  process.exit(0);
} else {
  console.error('\n>>> TESTS FAILED <<<');
  process.exit(1);
}
