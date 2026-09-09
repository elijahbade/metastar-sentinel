# MetaStar Sentinel 🛡️
### AI-Native Real Estate Due Diligence & Jeonse Risk Engine
> *Autonomous Title Verification, Deceptive Trust Detection, Auction Dividend Recovery Simulation, and Deal-Closing Acceleration for the Korean Real Estate Market.*

[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.2-646CFF.svg)](https://vitejs.dev/)
[![MSQUARE Ecosystem](https://img.shields.io/badge/Ecosystem-MUST%20Company%20%2F%20MSQUARE-indigo.svg)](https://globalmsq.com/)

---

## 📌 Executive Overview

**MetaStar Sentinel** extends MUST Company's flagship PropTech platform—**MetaStar**—from a passive document retrieval service (downloading 5 official registry records via a single address) into an **AI-native due diligence, fraud prevention, and deal-closing acceleration platform**.

Grounding this product in real-world commercial real estate transaction experience—specifically driving acquisition funnels and closing high-ticket property transactions—Sentinel addresses the root cause of deal failure: **closing table friction and title ambiguity**.

In South Korea, this friction is existential. Over **30,000 verified victims** have lost their life savings to the **Jeonse Fraud (전세사기) crisis**, while licensed real estate brokers (*Gong-in Joong-gae-sa*) face strict civil liability for missed encumbrances under amended verification laws. Sentinel converts a 45-minute, liability-ridden manual title search into an instantaneous, trust-building closing asset.

---

## 🚀 Key Capabilities

1. **Autonomous Multi-Registry Synthesis:** Cross-verifies the Supreme Court Registry (*Deunggi-bu Deungbon*: Pyojebu, Gapgu, Eulgu), Government24 Building Ledger (*Geonchukmul Daejang*), and MOLIT/KB transaction valuations in < 3 seconds.
2. **1–100 Sentinel Safety Score:** A composite, weighted risk index providing an instant, objective verdict on title health.
3. **Deceptive Trust Deed Detection (*Shintak Deunggi*):** Catches predatory ownership transfers where the landlord lacks legal leasing authority under Article 22 of the Trust Act—preventing 100% deposit forfeiture.
4. **Interactive Auction Dividend Recovery Simulator (*Baedang Simyulreiteo*):** Mathematically models statutory court liquidation proceeds under the Korean Civil Execution Act, dynamically calculating court fees, small tenant statutory priority (*Choe-useon Byeonje-geum*), senior bank mortgages, and tenant recovery vs. capital deficit.
5. **HUG / SGI Deposit Guarantee Insurance Underwriting Check:** Real-time eligibility evaluation against strict 90% LTV and senior debt thresholds.
6. **Actionable Special Lease Addenda (*Teuk-yak Sahang*):** Generates copy-paste protective clauses that shift liability to the landlord and insulate brokers from legal disputes.
7. **Broker Closing Certificate:** An official, printable and shareable certificate (PDF / KakaoTalk link) that brokers attach to statutory disclosures to resolve client hesitation and accelerate deal velocity.

---

## 🧪 Benchmark Test Scenarios

The system includes 4 verified ground-truth datasets:

- **Case A: Prime Apartment (Mapo Raemian Prugio 84㎡)** — *Score: 96/100 (Safe)*. 50% Jeonse ratio, 100% auction dividend recovery, HUG Guarantee approved.
- **Case B: Critical Trust Deed Trap (Gangseo-gu Golden Ville 302)** — *Score: 8/100 (Critical Hazard)*. Concealed project financing debt, consignor lacks leasing authority, 0% recovery in liquidation.
- **Case C: Severe Edge Case (Gwanak-gu Illegal Commercial Conversion)** — *Score: 24/100 (Severe Risk)*. Registered commercial office illegally outfitted as residential studio; official municipal violation stamp; bank loans blocked.
- **Case D: Subprime Waterfall (Incheon Michuhol Insolvent Debt)** — *Score: 18/100 (High Hazard)*. 155% LTV, active credit card provisional seizure, ₩122M capital loss in court liquidation.

---

## 🛠️ Technology Stack & Architecture

- **Language:** TypeScript 5.4 (Strict Mode)
- **Frontend / Bundler:** Vite 5.2 (770ms build time)
- **Styling:** Vanilla CSS with glassmorphic dark-mode design system, responsive grid layouts, and animated SVG gauges
- **Testing:** Node.js statutory dividend calculation test suite
- **Localization:** English-first default with full bilingual Korean support

---

## 📂 Project Structure

```
metastar-sentinel/
├── index.html                  # English-first web interface
├── style.css                   # Glassmorphic design system
├── vite.config.ts              # Vite server & build configuration
├── tsconfig.json               # TypeScript strict configuration
├── package.json                # Project dependencies and npm scripts
├── SOP.md                      # Standard Operating Procedure & Broker Runbook
├── docs/
│   ├── case_study_and_handoff.md # 8-Page Portfolio Case Study & Product Handoff
│   └── demo_video_script.md    # 5-Minute Timed Loom Video Presentation Script
├── src/
│   ├── types/
│   │   └── index.ts            # TypeScript domain interfaces
│   ├── data/
│   │   └── cases.ts            # Verified public registry test cases
│   ├── engine/
│   │   └── dividendEngine.ts   # Statutory auction liquidation calculation engine
│   └── main.ts                 # Main application controller & state manager
└── tests/
    └── test_dividend_engine.js # Dividend engine unit tests
```

---

## ⚡ Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation & Local Run
```bash
# 1. Clone the repository
git clone https://github.com/elijahbade/metastar-sentinel.git
cd metastar-sentinel

# 2. Install dependencies
npm install

# 3. Run unit tests
npm test

# 4. Start local development server
npm run dev
```

Open `http://localhost:3000` in your browser to explore the live application.

---

## 📄 Documentation Links
- **[Portfolio Case Study & Handoff Document](docs/case_study_and_handoff.md):** Comprehensive 8-page document covering Problem Discovery, Unit Economics (54.8% contribution margin), AI Architecture, Error Analysis, and Post-Launch 60-Day Validation Plan with Proceed/Iterate/Stop criteria.
- **[Standard Operating Procedure (SOP)](SOP.md):** Broker operational runbook and exception escalation matrix.
- **[5-Minute Demo Video Script](docs/demo_video_script.md):** Timed executive presentation script.

---

## 👤 Author
**Elijah** — AI-Native Product Owner Candidate  
Specializing in high-ticket real estate closing psychology, digital acquisition funnels, and AI-native operational automation.
