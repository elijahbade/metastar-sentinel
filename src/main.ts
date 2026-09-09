// MetaStar Sentinel — Main TypeScript Application Controller
import { PROPERTY_SCENARIOS } from './data/cases';
import { DividendEngine } from './engine/dividendEngine';
import { PropertyScenario } from './types';

class SentinelApp {
  private scenarios: PropertyScenario[] = PROPERTY_SCENARIOS;
  private activeIndex: number = 0;
  private currentLang: 'en' | 'ko' = 'en'; // Default to English as requested
  private customAuctionRatio: number | null = null;

  // Cached DOM elements
  private scenarioChipsContainer!: HTMLElement;
  private addressInput!: HTMLInputElement;
  private metaPropType!: HTMLElement;
  private metaMarketPrice!: HTMLElement;
  private metaDeposit!: HTMLElement;
  private metaJeonseRatio!: HTMLElement;

  private riskPillBadge!: HTMLElement;
  private scoreValue!: HTMLElement;
  private scoreVerdictText!: HTMLElement;
  private gaugeProgressPath!: SVGPathElement;

  private hugEligibilityBadge!: HTMLElement;
  private hugReasonText!: HTMLElement;

  private auctionRateSlider!: HTMLInputElement;
  private auctionRateDisplay!: HTMLElement;
  private courtProceedsVal!: HTMLElement;
  private waterfallBar!: HTMLElement;
  private netTenantRecovered!: HTMLElement;
  private projectedLoss!: HTMLElement;
  private recoveryRateBadge!: HTMLElement;

  private aiSummaryBox!: HTMLElement;
  private redFlagsContainer!: HTMLElement;

  private pyojebuBody!: HTMLElement;
  private gapguBody!: HTMLElement;
  private eulguBody!: HTMLElement;

  private ledgerTypeDisplay!: HTMLElement;
  private ledgerAddressDisplay!: HTMLElement;
  private violationStamp!: HTMLElement;
  private ledgerLegalUse!: HTMLElement;
  private ledgerFineStatus!: HTMLElement;
  private ledgerViolationNotes!: HTMLElement;

  private mVerifiedPrice!: HTMLElement;
  private mPublicPrice!: HTMLElement;
  private mTxRange!: HTMLElement;
  private marketNoteText!: HTMLElement;

  private timelineTree!: HTMLElement;
  private brokerActionText!: HTMLElement;
  private clausesList!: HTMLElement;

  private langToggleBtn!: HTMLButtonElement;
  private currentLangLabel!: HTMLElement;
  private toastNotification!: HTMLElement;

  private certModal!: HTMLElement;
  private openCertificateBtn!: HTMLButtonElement;
  private closeCertModalBtn!: HTMLButtonElement;

  constructor() {
    this.initDOMElements();
    this.setupEventListeners();
    this.applyLanguage(this.currentLang);
  }

  private initDOMElements(): void {
    this.scenarioChipsContainer = document.getElementById('scenarioChipsContainer')!;
    this.addressInput = document.getElementById('addressInput') as HTMLInputElement;
    this.metaPropType = document.getElementById('metaPropType')!;
    this.metaMarketPrice = document.getElementById('metaMarketPrice')!;
    this.metaDeposit = document.getElementById('metaDeposit')!;
    this.metaJeonseRatio = document.getElementById('metaJeonseRatio')!;

    this.riskPillBadge = document.getElementById('riskPillBadge')!;
    this.scoreValue = document.getElementById('scoreValue')!;
    this.scoreVerdictText = document.getElementById('scoreVerdictText')!;
    this.gaugeProgressPath = document.getElementById('gaugeProgressPath') as unknown as SVGPathElement;

    this.hugEligibilityBadge = document.getElementById('hugEligibilityBadge')!;
    this.hugReasonText = document.getElementById('hugReasonText')!;

    this.auctionRateSlider = document.getElementById('auctionRateSlider') as HTMLInputElement;
    this.auctionRateDisplay = document.getElementById('auctionRateDisplay')!;
    this.courtProceedsVal = document.getElementById('courtProceedsVal')!;
    this.waterfallBar = document.getElementById('waterfallBar')!;
    this.netTenantRecovered = document.getElementById('netTenantRecovered')!;
    this.projectedLoss = document.getElementById('projectedLoss')!;
    this.recoveryRateBadge = document.getElementById('recoveryRateBadge')!;

    this.aiSummaryBox = document.getElementById('aiSummaryBox')!;
    this.redFlagsContainer = document.getElementById('redFlagsContainer')!;

    this.pyojebuBody = document.getElementById('pyojebuBody')!;
    this.gapguBody = document.getElementById('gapguBody')!;
    this.eulguBody = document.getElementById('eulguBody')!;

    this.ledgerTypeDisplay = document.getElementById('ledgerTypeDisplay')!;
    this.ledgerAddressDisplay = document.getElementById('ledgerAddressDisplay')!;
    this.violationStamp = document.getElementById('violationStamp')!;
    this.ledgerLegalUse = document.getElementById('ledgerLegalUse')!;
    this.ledgerFineStatus = document.getElementById('ledgerFineStatus')!;
    this.ledgerViolationNotes = document.getElementById('ledgerViolationNotes')!;

    this.mVerifiedPrice = document.getElementById('mVerifiedPrice')!;
    this.mPublicPrice = document.getElementById('mPublicPrice')!;
    this.mTxRange = document.getElementById('mTxRange')!;
    this.marketNoteText = document.getElementById('marketNoteText')!;

    this.timelineTree = document.getElementById('timelineTree')!;
    this.brokerActionText = document.getElementById('brokerActionText')!;
    this.clausesList = document.getElementById('clausesList')!;

    this.langToggleBtn = document.getElementById('langToggleBtn') as HTMLButtonElement;
    this.currentLangLabel = document.getElementById('currentLang')!;
    this.toastNotification = document.getElementById('toastNotification')!;

    this.certModal = document.getElementById('certModal')!;
    this.openCertificateBtn = document.getElementById('openCertificateBtn') as HTMLButtonElement;
    this.closeCertModalBtn = document.getElementById('closeCertModalBtn') as HTMLButtonElement;
  }

  private showToast(msg: string): void {
    this.toastNotification.textContent = msg;
    this.toastNotification.classList.add('show');
    setTimeout(() => {
      this.toastNotification.classList.remove('show');
    }, 2400);
  }

  private getScoreColor(score: number): string {
    if (score >= 85) return '#10b981';
    if (score >= 60) return '#f59e0b';
    if (score >= 20) return '#ef4444';
    return '#ec4899';
  }

  private renderScenarioChips(): void {
    this.scenarioChipsContainer.innerHTML = '';
    this.scenarios.forEach((item, idx) => {
      const chip = document.createElement('div');
      chip.className = `scenario-chip ${idx === this.activeIndex ? 'active' : ''}`;

      const tagClass = item.riskLevel.toLowerCase();
      const title = this.currentLang === 'en' ? item.titleEn : item.titleKo;
      const addr = this.currentLang === 'en' ? item.addressEn : item.addressKo;

      chip.innerHTML = `
        <div class="chip-header">
          <span class="chip-tag ${tagClass}">${item.riskLevel}</span>
          <span class="chip-score" style="color: ${this.getScoreColor(item.score)}">${item.score}/100</span>
        </div>
        <div class="chip-title">${title}</div>
        <div class="chip-sub">${addr}</div>
      `;

      chip.addEventListener('click', () => {
        if (this.activeIndex !== idx) {
          this.activeIndex = idx;
          this.customAuctionRatio = null;
          this.updateView();
        }
      });

      this.scenarioChipsContainer.appendChild(chip);
    });
  }

  private updateGauge(score: number): void {
    const circumference = 251.2;
    const offset = circumference - (score / 100) * circumference;
    this.gaugeProgressPath.style.strokeDashoffset = offset.toString();
    this.gaugeProgressPath.style.stroke = this.getScoreColor(score);
    this.scoreValue.textContent = score.toString();

    this.riskPillBadge.className = 'risk-pill';
    const c = this.scenarios[this.activeIndex];
    this.riskPillBadge.classList.add(c.riskLevel.toLowerCase());
    this.riskPillBadge.textContent = c.riskLevel;

    if (score >= 85) {
      this.scoreVerdictText.textContent = this.currentLang === 'en'
        ? "Prime safe asset. Approved for standard lease execution."
        : "안전 우량 매물. 정상 계약 체결 적격 판정.";
    } else if (score >= 60) {
      this.scoreVerdictText.textContent = this.currentLang === 'en'
        ? "Moderate risk. Verification of senior debt ratio advised."
        : "주의 요망. 선순위 부채비율 확인 필요.";
    } else if (score >= 20) {
      this.scoreVerdictText.textContent = this.currentLang === 'en'
        ? "Severe risk. High probability of loan rejection and capital deficit."
        : "고위험 매물. 보증금 미반환 및 대출 거절 위험 농후.";
    } else {
      this.scoreVerdictText.textContent = this.currentLang === 'en'
        ? "Critical hazard. Predatory scheme / absolute lack of leasing authority."
        : "치명적 결격 사유. 전세사기 및 권리 부존재 위험.";
    }
  }

  private renderWaterfall(c: PropertyScenario): void {
    const rate = this.customAuctionRatio !== null ? this.customAuctionRatio : c.courtAuctionRatio;
    this.auctionRateSlider.value = rate.toString();
    this.auctionRateDisplay.textContent = `${rate.toFixed(1)}%`;

    const wf = DividendEngine.calculate(c, rate);

    this.courtProceedsVal.textContent = DividendEngine.formatShortKRW(wf.saleProceeds);
    this.netTenantRecovered.textContent = DividendEngine.formatShortKRW(wf.tenantDividend);

    if (wf.tenantLoss === 0) {
      this.projectedLoss.textContent = `₩ 0 (0.0%)`;
      this.projectedLoss.className = 'rec-val safe-text';
    } else {
      this.projectedLoss.textContent = `${DividendEngine.formatShortKRW(wf.tenantLoss)} (-${(100 - wf.recoveryPercent).toFixed(1)}%)`;
      this.projectedLoss.className = 'rec-val danger-text';
    }

    this.recoveryRateBadge.textContent = `${wf.recoveryPercent}% ${this.currentLang === 'en' ? 'Recovery' : '배당 회수율'}`;
    this.recoveryRateBadge.style.color = wf.recoveryPercent >= 90 ? '#34d399' : (wf.recoveryPercent >= 50 ? '#fbbf24' : '#f87171');

    const baseTotal = Math.max(wf.saleProceeds, c.jeonseDeposit + wf.seniorRepayment);
    const pCourt = ((wf.courtCost / baseTotal) * 100).toFixed(1);
    const pSenior = ((wf.seniorRepayment / baseTotal) * 100).toFixed(1);
    const pTenant = ((wf.tenantDividend / baseTotal) * 100).toFixed(1);
    const pLoss = ((wf.tenantLoss / baseTotal) * 100).toFixed(1);

    this.waterfallBar.innerHTML = `
      <div class="wf-segment color-court" style="width: ${pCourt}%" data-tooltip="Court Costs: ${DividendEngine.formatShortKRW(wf.courtCost)}"></div>
      <div class="wf-segment color-senior" style="width: ${pSenior}%" data-tooltip="Senior Mortgages: ${DividendEngine.formatShortKRW(wf.seniorRepayment)}"></div>
      <div class="wf-segment color-tenant" style="width: ${pTenant}%" data-tooltip="Tenant Recovered: ${DividendEngine.formatShortKRW(wf.tenantDividend)}"></div>
      <div class="wf-segment color-loss" style="width: ${pLoss}%" data-tooltip="Tenant Capital Loss: ${DividendEngine.formatShortKRW(wf.tenantLoss)}"></div>
    `;
  }

  private renderMultiDocs(c: PropertyScenario): void {
    // Registry Pyojebu
    this.pyojebuBody.innerHTML = c.registry.pyojebu.map(r => `
      <tr>
        <td>${r.rank}</td>
        <td>${r.date}</td>
        <td>${r.location}</td>
        <td>${r.details}</td>
        <td>${r.landRatio}</td>
      </tr>
    `).join('');

    // Registry Gapgu
    this.gapguBody.innerHTML = c.registry.gapgu.map(r => `
      <tr>
        <td><strong>${r.rank}</strong></td>
        <td><span class="badge-tag">${r.type}</span></td>
        <td>${r.date}</td>
        <td>${r.cause}</td>
        <td>${r.detail}</td>
      </tr>
    `).join('');

    // Registry Eulgu
    this.eulguBody.innerHTML = c.registry.eulgu.map(r => `
      <tr>
        <td><strong>${r.rank}</strong></td>
        <td><span class="badge-tag">${r.type}</span></td>
        <td>${r.date}</td>
        <td>${r.maxAmount ? DividendEngine.formatShortKRW(r.maxAmount) : '-'}</td>
        <td>${r.creditor}</td>
      </tr>
    `).join('');

    // Building Ledger
    this.ledgerTypeDisplay.textContent = c.buildingLedger.type;
    this.ledgerAddressDisplay.textContent = this.currentLang === 'en' ? c.addressEn : c.addressKo;
    this.ledgerLegalUse.textContent = c.buildingLedger.legalUse;
    this.ledgerFineStatus.textContent = c.buildingLedger.fineStatus;
    this.ledgerViolationNotes.textContent = c.buildingLedger.violationNotes;

    if (c.buildingLedger.isViolating) {
      this.violationStamp.className = 'violation-stamp violation';
      this.violationStamp.textContent = this.currentLang === 'en' ? 'VIOLATION REGISTERED' : '위반건축물 등재';
    } else {
      this.violationStamp.className = 'violation-stamp normal';
      this.violationStamp.textContent = this.currentLang === 'en' ? 'NORMAL (COMPLIANT)' : '정상 (위반 없음)';
    }

    // Market Valuation
    this.mVerifiedPrice.textContent = DividendEngine.formatShortKRW(c.marketPrice);
    this.mPublicPrice.textContent = DividendEngine.formatShortKRW(c.publicPrice);
    this.mTxRange.textContent = c.txRange;
    this.marketNoteText.textContent = this.currentLang === 'en'
      ? `The proposed Jeonse deposit represents ${c.jeonseRatio}% of verified market value. Monitor valuation margins against bank assessment ratios.`
      : `전세가율은 ${c.jeonseRatio}%입니다. KB부동산 시세 대비 안전마진을 상시 점검하십시오.`;

    // Timeline Tree
    this.timelineTree.innerHTML = c.timeline.map((t, idx) => {
      let nodeClass = 'tree-node';
      if (idx === 0) nodeClass += ' priority-first';
      else if (idx === 1) nodeClass += ' priority-senior';
      else nodeClass += ' priority-tenant';

      return `
        <div class="${nodeClass}">
          <div class="node-header">
            <span class="node-rank">${t.rank}</span>
            <span class="node-amount">${t.amount}</span>
          </div>
          <strong style="font-size:0.86rem; color:#f8fafc;">${t.title}</strong>
          <p class="node-desc">${t.desc}</p>
        </div>
      `;
    }).join('');
  }

  private renderRedFlagsAndClauses(c: PropertyScenario): void {
    // AI Summary
    this.aiSummaryBox.textContent = this.currentLang === 'en' ? c.aiVerdictEn : c.aiVerdictKo;

    // Red Flags
    if (c.redFlags.length === 0) {
      this.redFlagsContainer.innerHTML = `
        <div class="clean-flag-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          <span>${this.currentLang === 'en' ? 'Zero title encumbrances or statutory violations detected (Clean Title).' : '위험 등기 및 법적 결격사유가 발견되지 않았습니다 (클린 타이틀).'}</span>
        </div>
      `;
    } else {
      this.redFlagsContainer.innerHTML = c.redFlags.map(rf => `
        <div class="red-flag-item">
          <div class="red-flag-icon">⚠️</div>
          <div class="flag-content">
            <h4>${this.currentLang === 'en' ? rf.titleEn : rf.titleKo}</h4>
            <p>${this.currentLang === 'en' ? rf.descEn : rf.descKo}</p>
          </div>
        </div>
      `).join('');
    }

    // Broker Directives
    this.brokerActionText.textContent = this.currentLang === 'en' ? c.brokerActionEn : c.brokerActionKo;

    const clauses = this.currentLang === 'en' ? c.recommendedClausesEn : c.recommendedClausesKo;
    this.clausesList.innerHTML = clauses.map((clause, idx) => `
      <div class="clause-item">
        <span class="clause-text"><strong>[Clause ${idx + 1}]</strong> ${clause}</span>
        <button class="clause-copy-btn" data-clause="${encodeURIComponent(clause)}">${this.currentLang === 'en' ? 'Copy' : '복사'}</button>
      </div>
    `).join('');

    // Attach copy listeners
    document.querySelectorAll('.clause-copy-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const text = decodeURIComponent((e.currentTarget as HTMLElement).getAttribute('data-clause') || '');
        navigator.clipboard.writeText(text).then(() => {
          this.showToast(this.currentLang === 'en' ? 'Protective clause copied to clipboard!' : '특약 조항이 복사되었습니다!');
        });
      });
    });
  }

  private renderHUG(c: PropertyScenario): void {
    if (c.hugEligibility.eligible) {
      this.hugEligibilityBadge.className = 'hug-badge approved';
      this.hugEligibilityBadge.textContent = this.currentLang === 'en' ? 'ELIGIBLE' : '가입 승인 적격';
    } else {
      this.hugEligibilityBadge.className = 'hug-badge rejected';
      this.hugEligibilityBadge.textContent = this.currentLang === 'en' ? 'INELIGIBLE' : '가입 거절 대상';
    }
    this.hugReasonText.textContent = this.currentLang === 'en' ? c.hugEligibility.reasonEn : c.hugEligibility.reasonKo;
  }

  private updateCertificateModal(c: PropertyScenario): void {
    document.getElementById('certAddress')!.textContent = this.currentLang === 'en' ? c.addressEn : c.addressKo;
    document.getElementById('certType')!.textContent = this.currentLang === 'en' ? c.propertyTypeEn : c.propertyTypeKo;
    document.getElementById('certArea')!.textContent = c.exclusiveArea;
    document.getElementById('certMarketVal')!.textContent = DividendEngine.formatKRW(c.marketPrice);
    document.getElementById('certDepositVal')!.textContent = DividendEngine.formatKRW(c.jeonseDeposit);
    document.getElementById('certSealScore')!.textContent = c.score.toString();

    document.getElementById('certTitleStatus')!.textContent = c.category === 'SAFE'
      ? (this.currentLang === 'en' ? 'Clear Sole Ownership' : '정상 단독소유 (안전)')
      : (this.currentLang === 'en' ? 'Trust / Seizure Encumbered' : '신탁등기 / 가압류 등재');

    const seniorRatio = ((c.registry.eulgu[0].maxAmount || 0) / c.marketPrice * 100).toFixed(1);
    document.getElementById('certSeniorRatio')!.textContent = `${seniorRatio}% (${c.category === 'SAFE' ? 'Safe' : 'High Alert'})`;
    document.getElementById('certBuildingStatus')!.textContent = c.buildingLedger.isViolating
      ? (this.currentLang === 'en' ? 'Violation Registered' : '위반건축물 표재')
      : (this.currentLang === 'en' ? 'Compliant' : '정상 (위반 없음)');

    document.getElementById('certHugStatus')!.textContent = c.hugEligibility.eligible
      ? (this.currentLang === 'en' ? 'Guarantee Eligible' : 'HUG 보증 가입 가능')
      : (this.currentLang === 'en' ? 'Ineligible' : 'HUG 보증 가입 불가');

    document.getElementById('certSummaryText')!.textContent = this.currentLang === 'en' ? c.aiVerdictEn : c.aiVerdictKo;

    const clausesBox = document.getElementById('certClausesBox')!;
    const clauses = this.currentLang === 'en' ? c.recommendedClausesEn : c.recommendedClausesKo;
    clausesBox.innerHTML = clauses.map((cl, i) => `<div><strong>Article ${i + 1}.</strong> ${cl}</div>`).join('');
  }

  public updateView(): void {
    const c = this.scenarios[this.activeIndex];

    this.addressInput.value = this.currentLang === 'en' ? c.addressEn : c.addressKo;
    this.metaPropType.textContent = this.currentLang === 'en' ? c.propertyTypeEn : c.propertyTypeKo;
    this.metaMarketPrice.textContent = DividendEngine.formatShortKRW(c.marketPrice);
    this.metaDeposit.textContent = DividendEngine.formatShortKRW(c.jeonseDeposit);
    this.metaJeonseRatio.textContent = `${c.jeonseRatio}%`;

    this.updateGauge(c.score);
    this.renderHUG(c);
    this.renderWaterfall(c);
    this.renderMultiDocs(c);
    this.renderRedFlagsAndClauses(c);
    this.updateCertificateModal(c);
    this.renderScenarioChips();
  }

  public applyLanguage(lang: 'en' | 'ko'): void {
    this.currentLang = lang;
    this.currentLangLabel.textContent = lang === 'en' ? 'English (EN)' : '한국어 (KR)';

    const dict: Record<string, string> = lang === 'en' ? {
      btn_closing_cert: "Broker Closing Certificate",
      badge_scenarios: "Test Scenarios & Real Estate Records",
      scenario_hint: "Select a real-world case study or enter a Korean address to trigger autonomous due diligence:",
      btn_reanalyze: "Re-Analyze Title",
      label_prop_type: "Type:",
      label_market_val: "Market Value:",
      label_deposit: "Jeonse Deposit:",
      label_jeonse_ratio: "Jeonse Ratio:",
      title_sentinel_score: "Sentinel Safety Score",
      label_hug_check: "Housing & Urban Guarantee (HUG)",
      title_auction_sim: "Auction Dividend Recovery Simulator",
      label_auction_rate: "Estimated Auction Liquidation Ratio:",
      label_court_proceeds: "Court Sale Proceeds:",
      leg_court_cost: "Court Costs",
      leg_senior_debt: "Senior Mortgages",
      leg_tenant_recovered: "Tenant Recovered",
      leg_tenant_loss: "Tenant Unrecovered Loss",
      label_net_recovered: "Net Tenant Recovered:",
      label_estimated_loss: "Projected Capital Loss:",
      title_ai_assessment: "AI Sentinel Executive Assessment",
      ai_sub: "Grounded in Korean Supreme Court precedents & Public Registry Ingestion",
      tab_registry: "Supreme Court Registry",
      tab_building: "Gov24 Building Ledger",
      tab_market: "Market Valuation & KB Trend",
      tab_graph: "AI Lien Priority Graph",
      title_pyojebu: "Property Description (Pyojebu)",
      title_gapgu: "Ownership Rights & Encumbrances (Gapgu)",
      title_eulgu: "Senior Mortgages & Collateral (Eulgu)",
      lbl_permitted_use: "Permitted Legal Use:",
      lbl_enforcement_fine: "Enforcement Penalty Status:",
      lbl_violation_notes: "Violation Particulars:",
      lbl_kb_price: "KB / MOLIT Verified Price",
      lbl_public_price: "Public Assessment Price (MOLIT)",
      lbl_recent_transactions: "3-Month Transaction Range",
      graph_title: "Chronological Lien Sequencing & Distribution Hierarchy",
      graph_sub: "Statutory liquidation order under Article 3 of the Housing Lease Protection Act.",
      title_broker_clauses: "AI Deal Closing Clauses & Broker Protection Addenda",
      sub_broker_clauses: "Copy-paste protective provisions for the lease contract to close deals safely and eliminate broker liability.",
      btn_copy_all: "Copy All Clauses",
      lbl_broker_action: "Broker Closing Directive:"
    } : {
      btn_closing_cert: "공인중개사 안심계약서 (인증서)",
      badge_scenarios: "실제 검증 시나리오 및 부동산 공적장부",
      scenario_hint: "실제 전세사기 및 권리분석 사례를 선택하거나 주소를 조회하여 AI 권리분석을 실행하십시오:",
      btn_reanalyze: "권리 재분석",
      label_prop_type: "용도:",
      label_market_val: "시세:",
      label_deposit: "전세보증금:",
      label_jeonse_ratio: "전세가율:",
      title_sentinel_score: "센티넬 안전도 종합지수",
      label_hug_check: "HUG 전세보증보험 적격심사",
      title_auction_sim: "법원 경매 배당금 회수 시뮬레이터",
      label_auction_rate: "예상 경매 낙찰가율 (시세 대비):",
      label_court_proceeds: "경매 낙찰 예상 대금:",
      leg_court_cost: "법원 집행비용",
      leg_senior_debt: "선순위 근저당",
      leg_tenant_recovered: "임차인 배당금",
      leg_tenant_loss: "임차인 보증금 손실",
      label_net_recovered: "임차인 실배당 회수금:",
      label_estimated_loss: "보증금 손실 위험액:",
      title_ai_assessment: "AI 센티넬 종합 심사 의견",
      ai_sub: "대법원 판례 및 5대 공적장부 교차검증 기반",
      tab_registry: "대법원 등기부등본",
      tab_building: "정부24 건축물대장",
      tab_market: "시세 및 KB부동산 트렌드",
      tab_graph: "AI 권리순위 타임라인",
      title_pyojebu: "부동산 표시 및 물리적 현황 (표제부)",
      title_gapgu: "소유권 및 권리제한 사항 (갑구)",
      title_eulgu: "선순위 근저당권 및 담보권 (을구)",
      lbl_permitted_use: "허가 용도:",
      lbl_enforcement_fine: "이행강제금 부과현황:",
      lbl_violation_notes: "위반건축물 상세내역:",
      lbl_kb_price: "KB부동산 / 국토부 실거래가",
      lbl_public_price: "공시가격 (국토교통부)",
      lbl_recent_transactions: "최근 3개월 실거래가 범위",
      graph_title: "시간순 권리순위 및 배당 우선순서 계층도",
      graph_sub: "주택임대차보호법 제3조 및 부동산등기법에 의거한 법정 배당순서입니다.",
      title_broker_clauses: "AI 계약 특약사항 및 공인중개사 면책 지침",
      sub_broker_clauses: "계약 체결 시 특약란에 복사하여 임차인 보증금을 보호하고 공인중개사 설명의무 법적 분쟁을 방지합니다.",
      btn_copy_all: "전체 특약 복사",
      lbl_broker_action: "공인중개사 실무 행동 지침:"
    };

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key && dict[key]) {
        el.textContent = dict[key];
      }
    });

    this.updateView();
  }

  private setupEventListeners(): void {
    // Language Toggle
    this.langToggleBtn.addEventListener('click', () => {
      this.applyLanguage(this.currentLang === 'en' ? 'ko' : 'en');
      this.showToast(this.currentLang === 'en' ? 'Language switched to English.' : '언어가 한국어로 전환되었습니다.');
    });

    // Auction Rate Slider
    this.auctionRateSlider.addEventListener('input', (e) => {
      this.customAuctionRatio = parseFloat((e.target as HTMLInputElement).value);
      const c = this.scenarios[this.activeIndex];
      this.renderWaterfall(c);
    });

    // Re-Analyze Button
    document.getElementById('reRunAuditBtn')!.addEventListener('click', () => {
      this.showToast(this.currentLang === 'en' ? 'Title & Building Ledgers re-verified.' : '등기부 및 건축물대장 재검증을 완료했습니다.');
      this.updateView();
    });

    // Copy All Clauses
    document.getElementById('copyAllClausesBtn')!.addEventListener('click', () => {
      const c = this.scenarios[this.activeIndex];
      const clauses = this.currentLang === 'en' ? c.recommendedClausesEn : c.recommendedClausesKo;
      const allText = clauses.map((cl, i) => `[Clause ${i + 1}] ${cl}`).join('\n\n');
      navigator.clipboard.writeText(allText).then(() => {
        this.showToast(this.currentLang === 'en' ? 'All protective clauses copied to clipboard!' : '모든 특약 조항이 복사되었습니다.');
      });
    });

    // Document Tabs
    document.querySelectorAll('.doc-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        document.querySelectorAll('.doc-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

        const targetTab = e.currentTarget as HTMLElement;
        targetTab.classList.add('active');
        const tabId = targetTab.getAttribute('data-tab');
        const pane = document.getElementById(`pane-${tabId}`);
        if (pane) pane.classList.add('active');
      });
    });

    // Certificate Modal
    this.openCertificateBtn.addEventListener('click', () => {
      this.certModal.classList.add('open');
    });

    this.closeCertModalBtn.addEventListener('click', () => {
      this.certModal.classList.remove('open');
    });

    this.certModal.addEventListener('click', (e) => {
      if (e.target === this.certModal) {
        this.certModal.classList.remove('open');
      }
    });

    document.getElementById('copyShareLinkBtn')!.addEventListener('click', () => {
      const dummyUrl = `https://metastar.io/sentinel/cert?id=MS-2026-${this.scenarios[this.activeIndex].id}&v=verified`;
      navigator.clipboard.writeText(dummyUrl).then(() => {
        this.showToast(this.currentLang === 'en' ? 'Shareable Title Safety Link copied!' : '안심링크가 복사되었습니다!');
      });
    });
  }
}

// Boot application
document.addEventListener('DOMContentLoaded', () => {
  new SentinelApp();
});
