# Standard Operating Procedure (SOP)
## MetaStar Sentinel: AI-Native Real Estate Due Diligence & Jeonse Risk Engine

**Document Ref:** SOP-MS-2026-01  
**Version:** 2.0 (TypeScript Edition)  
**Effective Date:** 2026-09-09  
**Owner:** AI-Native Product Owner (MUST Company / MSQUARE Global)  
**Target Audience:** Licensed Real Estate Brokers (공인중개사), Property Operations Teams, Risk Officers, and Escrow Managers.

---

### 1. Purpose & Scope
This Standard Operating Procedure defines the mandatory workflow for conducting automated title due diligence, detecting predatory encumbrances (such as deceptive trust deeds, concealed project finance debt, and unauthorized commercial-to-residential conversions), and issuing legally protective contract addenda using **MetaStar Sentinel**.

---

### 2. System Architecture & File Structure

```
metastar-sentinel/
├── index.html              # Core English-first responsive interface
├── style.css               # Glassmorphic dark-mode design system
├── vite.config.ts          # Vite bundler & local dev server configuration
├── tsconfig.json           # TypeScript strict compiler configuration
├── package.json            # NPM project dependencies and execution scripts
├── SOP.md                  # This operational runbook
├── src/
│   ├── types/
│   │   └── index.ts        # TypeScript domain interfaces (Registry, Ledger, Waterfall, HUG)
│   ├── data/
│   │   └── cases.ts        # Verified test cases & public registry ground truth
│   ├── engine/
│   │   └── dividendEngine.ts # Pure TypeScript statutory auction liquidation engine
│   └── main.ts             # Application controller, state synchronization, and UI binding
└── tests/
    └── test_dividend_engine.js # Automated verification test suite
```

---

### 3. Standard Operational Workflow

#### Step 1: Input & Data Retrieval
1. Enter the standardized Korean property address into the Sentinel search bar (or select one of the 4 benchmark test scenarios).
2. The system triggers multi-agency public document synthesis:
   - **Supreme Court of Korea (대법원 인터넷등기소):** Ingests Real Estate Comprehensive Certificate (*Deunggi-bu Deungbon*), extracting:
     - Section 1 (*Pyojebu*): Building designation, exclusive area, and appurtenant land ratio.
     - Section 2 (*Gapgu*): Ownership history, trust deeds (*Shintak*), provisional seizures (*Ga-amnyu*), and auction notices.
     - Section 3 (*Eulgu*): Collateral mortgages (*Geun-jeodang*), charter rights, and private liens.
   - **Government24 (정부24):** Ingests the Official Building Ledger (*Geonchukmul Daejang*), verifying zoning compliance, legal use, and municipal violation stamps.
   - **MOLIT / KB Real Estate (국토부 / KB부동산):** Pulls verified 3-month comparable transactions and official public assessment values (*Gongsi Gakyeok*).

#### Step 2: Automated Risk Scoring & Tier Classification
The Sentinel Engine computes a composite score (0–100) based on four weighted vectors:
- **Title Encumbrance Risk (35%):** Penalizes trust deeds lacking tripartite consent, provisional attachments, and secondary liens.
- **Auction Capital Recovery Margin (30%):** Simulates net proceeds under court liquidation; checks whether tenant recovery is 100% or impaired.
- **HUG Guarantee Eligibility (20%):** Enforces statutory debt caps (LTV ≤ 90%, senior debt ≤ 60%).
- **Architectural & Zoning Compliance (15%):** Flags illegal structural expansions and commercial conversions.

| Score Range | Risk Tier | Action Directive |
| :--- | :--- | :--- |
| **85 – 100** | **LOW (Safe)** | Proceed with standard lease execution. Issue Broker Closing Certificate. |
| **60 – 84** | **MODERATE** | Verify senior mortgage payoff receipt prior to balance settlement. |
| **20 – 59** | **SEVERE** | **Halt standard execution.** Bank lease loans and HUG insurance unavailable. |
| **0 – 19** | **CRITICAL** | **Decline transaction immediately.** High probability of predatory fraud scheme. |

#### Step 3: Interactive Auction Liquidation Simulation
1. Adjust the **Estimated Auction Liquidation Ratio** slider (default calibrated to regional historical averages: 74.5% for Seoul Apartments, 60–66% for Villas).
2. Review the **Capital Waterfall Bar**:
   - Priority 1: Court administrative & appraisal costs (statutory prior deduction).
   - Priority 2: Statutory Small Tenant Priority Deposit (*Choe-useon Byeonje-geum*).
   - Priority 3: Senior registered bank collateral mortgages.
   - Priority 4: Tenant Jeonse deposit recovery vs. Projected Capital Deficit.

#### Step 4: Special Protective Clause Generation
1. In the **AI Deal Closing Clauses** drawer, review the generated special contract terms (*Teuk-yak Sahang*).
2. Click **"Copy All Clauses"** to copy the clauses directly into the standard lease contract.
3. Verify that the mandatory liability-shifting clauses are included:
   - *Title Preservation:* Landlord prohibited from registering new liens until after tenant registration.
   - *HUG Contingency:* Immediate contract nullification if deposit insurance is rejected.
   - *Violation Indemnification:* Landlord assumes 100% of municipal enforcement fines.

#### Step 5: Broker Closing Certificate Issuance
1. Click **"Broker Closing Certificate"** in the top navigation bar.
2. Verify property identification, seal score, and multi-registry verdict.
3. Click **"Print / Save PDF Certificate"** to append the certified title report to the statutory property explanation statement (*Junggae Daesang-mul Hwag-in Seolmyeong-seo*).
4. Click **"Copy Shareable Closing Link"** to transmit the verified summary directly to the prospective tenant via mobile messaging.

---

### 4. Critical Exception Handling & Escalation Matrix

#### Exception A: Registered Trust Deed (*Shintak Deunggi*)
- **Trigger:** Gapgu contains an entry of type "Ownership Transfer (Trust)" to a trust corporation.
- **Operational Rule:** The individual claiming to be the landlord (consignor) has **zero legal authority** to sign lease contracts.
- **Mandatory Procedure:**
  1. Halt execution immediately.
  2. Require the lessor to provide the official **Trust Deed Ledger (*Shintak Wonbu*)**.
  3. Obtain original written consent stamped with corporate seals from both the **Trustee** and the **1st Priority Beneficiary Bank**.
  4. Ensure all deposit payments are wired **exclusively to the Trustee's corporate bank account**.

#### Exception B: Building Ledger Violation Stamp (*Wiban Geonchukmul*)
- **Trigger:** Building ledger displays yellow stamp: "VIOLATION REGISTERED" (e.g., commercial office partitioned into residential studio).
- **Operational Rule:** Tier-1 bank Jeonse loans and public deposit guarantee insurance are **strictly prohibited by law**.
- **Mandatory Procedure:**
  1. Explicitly disclose the commercial zoning and violation in the statutory broker explanation statement.
  2. Advise the tenant that bank financing is impossible.
  3. If proceeding, require lessor to execute a written indemnity agreement covering all municipal enforcement fines.

#### Exception C: Subprime Senior Liens & Insolvent LTV (*Kkangtong Jeonse*)
- **Trigger:** Senior mortgage maximum claim + Proposed Jeonse deposit > 90% of verified market value.
- **Operational Rule:** High probability of deposit shortfall upon liquidation.
- **Mandatory Procedure:**
  1. Mandate that lessor pay down senior bank debt prior to contract signing and produce bank satisfaction receipt.
  2. If lessor refuses, broker must formally decline transaction to avoid civil co-liability under Article 30 of the Licensed Real Estate Agents Act.

---

### 5. Verification Runbook

To execute automated validation of the underlying calculation engine:
```bash
# Run standalone unit test suite
node tests/test_dividend_engine.js

# Launch local development environment
npm run dev
```
Confirm that:
- Case A yields Score 96, 100% dividend recovery, HUG Eligible.
- Case B yields Score 8, 0% recovery (unauthorized lease), HUG Ineligible.
- Case C yields Score 24, building violation flagged, HUG Ineligible.
- Case D yields Score 18, ₩122M capital deficit, LTV 155% flagged.
