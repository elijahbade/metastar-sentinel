// MetaStar Sentinel — Verified Public Registry Scenarios & Ground Truth Datasets
import { PropertyScenario } from '../types';

export const PROPERTY_SCENARIOS: PropertyScenario[] = [
  {
    id: "case-safe",
    titleEn: "Case A: Prime Apartment (Mapo Raemian Prugio 84㎡)",
    titleKo: "Case A: 정상 안전 아파트 (마포 래미안 푸르지오 84㎡)",
    category: "SAFE",
    riskLevel: "LOW",
    score: 96,
    addressEn: "105-1402, 777 Ahyeon-dong, Mapo-gu, Seoul",
    addressKo: "서울특별시 마포구 아현동 777 마포래미안푸르지오 105동 1402호",
    propertyTypeEn: "Apartment (Multi-unit Residential)",
    propertyTypeKo: "아파트 (집합건물)",
    exclusiveArea: "84.95㎡ (25.7 Pyeong)",
    marketPrice: 1600000000, // ₩1.6B (~$1.2M USD)
    jeonseDeposit: 800000000, // ₩800M
    jeonseRatio: 50.0,
    courtAuctionRatio: 74.5,
    estimatedAuctionPrice: 1192000000,
    publicPrice: 1120000000,
    txRange: "₩ 1.55B ~ 1.68B",
    registry: {
      pyojebu: [
        {
          rank: "1",
          date: "2014-09-30",
          location: "Bldg 105 Unit 1402, 777 Ahyeon-dong, Mapo-gu",
          details: "Reinforced Concrete 28F Apartment, Area: 84.95㎡",
          landRatio: "Appurtenant Land Share: 45.23 / 15,420.5"
        }
      ],
      gapgu: [
        {
          rank: "1",
          type: "Ownership Transfer",
          date: "2018-11-20",
          cause: "Sale & Purchase",
          detail: "Registered Sole Owner: Lee Won (ID: 830415-1******)"
        }
      ],
      eulgu: [
        {
          rank: "1",
          type: "Collateral Mortgage (Geun-jeodang)",
          date: "2018-11-20",
          maxAmount: 120000000,
          creditor: "Shinhan Bank (Mapo Branch) — Debt: Lee Won"
        }
      ]
    },
    buildingLedger: {
      type: "Official Building Ledger (Gov24 Unit Extract)",
      legalUse: "Multi-family Residential (Apartment)",
      isViolating: false,
      fineStatus: "None (Fully Compliant)",
      violationNotes: "No illegal extensions or structural violations registered."
    },
    hugEligibility: {
      eligible: true,
      reasonEn: "Jeonse ratio is 50% (well below the 90% cap); Senior mortgage is only 7.5% of value (below 60% cap); Zero architectural violations.",
      reasonKo: "전세가율 50%(기준 90% 이하 충족), 선순위채권 7.5%(기준 60% 이하 충족), 위반건축물 이력 전무."
    },
    redFlags: [],
    aiVerdictEn: "Institutional-grade title safety. Senior collateral debt (₩120M maximum claim) plus the proposed Jeonse deposit (₩800M) represent only 57.5% of verified market value. In a court liquidation scenario, the tenant has 100% capital recovery insulation.",
    aiVerdictKo: "우수한 권리안정성을 갖춘 우량 매물입니다. 선순위 근저당권(채권최고액 1.2억)과 전세보증금(8억)의 합계가 시세의 57.5%로 안전 마진이 두터우며, 경매 배당 시 100% 전액 회수가 보장됩니다.",
    brokerActionEn: "Safe for standard transaction. Advise client to insert a standard title maintenance clause and immediately bind HUG deposit guarantee insurance upon contract signing.",
    brokerActionKo: "계약 체결 시 잔금 지급일 익일까지 현재 등기부 권리상태 유지 특약을 기재하고, HUG 전세보증보험 가입을 즉시 안내하십시오.",
    recommendedClausesEn: [
      "The Lessor shall maintain the property's public registry title in its current unencumbered condition through the day following full balance payment, creating no new liens, mortgages, or transfers.",
      "The Lessor agrees to fully cooperate with the Lessee's application for HUG/SGI Jeonse Deposit Guarantee Insurance. Failure to secure insurance due to lessor fault triggers immediate cancellation and full deposit refund."
    ],
    recommendedClausesKo: [
      "임대인은 잔금 지급일 익일까지 현재의 등기부등본 권리상태를 유지하며, 추가적인 담보권 설정이나 소유권 이전을 일체 하지 않는다.",
      "임대인은 임차인의 주택도시보증공사(HUG) 전세보증금 반환보증보험 가입에 전적으로 협조하며 거부 시 계약을 해제한다."
    ],
    timeline: [
      { rank: "Priority 1", title: "Court Execution Fees (Statutory First Deduction)", amount: "₩ 4,000,000", desc: "Court appraisal and auction administration fees (Civil Execution Act)" },
      { rank: "Priority 2", title: "Senior Bank Mortgage (Shinhan Bank)", amount: "₩ 100,000,000", desc: "Registered 2018-11-20 (Max claim ₩120M, actual principal ₩100M satisfied)" },
      { rank: "Priority 3", title: "Tenant Jeonse Deposit", amount: "₩ 800,000,000", desc: "100% full dividend recovery under statutory confirmed date (Hakjeong-ilja)" }
    ]
  },
  {
    id: "case-trust",
    titleEn: "Case B: Critical Trust Deed Trap (Gangseo-gu Golden Ville 302)",
    titleKo: "Case B: 신탁등기 전세사기 함정 (강서구 화곡동 골든빌 302호)",
    category: "FRAUD_TRAP",
    riskLevel: "CRITICAL",
    score: 8,
    addressEn: "302, 340-12 Hwagok-dong, Gangseo-gu, Seoul",
    addressKo: "서울특별시 강서구 화곡동 340-12 골든빌 302호",
    propertyTypeEn: "Multi-family Villa (Trust Encumbered)",
    propertyTypeKo: "다세대주택 (신탁등기)",
    exclusiveArea: "42.15㎡ (12.7 Pyeong)",
    marketPrice: 260000000, // ₩260M
    jeonseDeposit: 220000000, // ₩220M (84.6% ratio)
    jeonseRatio: 84.6,
    courtAuctionRatio: 65.0,
    estimatedAuctionPrice: 169000000,
    publicPrice: 175000000,
    txRange: "₩ 2.40B ~ 2.65B",
    registry: {
      pyojebu: [
        {
          rank: "1",
          date: "2023-02-15",
          location: "Unit 302, 340-12 Hwagok-dong, Gangseo-gu",
          details: "Reinforced Concrete 5F Villa, Area: 42.15㎡",
          landRatio: "Appurtenant Land Share: 18.4 / 210.0"
        }
      ],
      gapgu: [
        {
          rank: "1",
          type: "Ownership Preservation",
          date: "2023-02-15",
          cause: "New Construction",
          detail: "Initial Consignor: Kim Ho (Developer)"
        },
        {
          rank: "2",
          type: "Ownership Transfer (Trust Deed)",
          date: "2023-04-10",
          cause: "Real Estate Trust",
          detail: "Trustee: Kookmin Real Estate Trust Co., Ltd. (Trust Deed Ledger No. 2023-4819)"
        }
      ],
      eulgu: [
        {
          rank: "-",
          type: "No Entries Recorded",
          date: "-",
          maxAmount: 0,
          creditor: "Ledger appears clear (Note: Multi-million dollar debt is hidden in offline Trust Register)"
        }
      ]
    },
    buildingLedger: {
      type: "Official Building Ledger (Gov24 Unit Extract)",
      legalUse: "Multi-family Residential (Villa)",
      isViolating: false,
      fineStatus: "None",
      violationNotes: "Building structure compliant. High legal title disqualification."
    },
    hugEligibility: {
      eligible: false,
      reasonEn: "Trust Deed Registered: Strict statutory ban on HUG guarantee without tripartite written consent and direct deposit to the Trustee bank account.",
      reasonKo: "신탁등기 물건: 신탁사 및 우선수익 금융기관의 공식 서면 임대차 동의서 원본 없이는 HUG 전세보증보험 가입 절대 불가."
    },
    redFlags: [
      {
        severity: "CRITICAL",
        code: "TRUST_DEED_UNAUTHORIZED_RISK",
        titleEn: "Trust Deed Registered — Landlord Has Zero Legal Authority to Lease",
        titleKo: "신탁등기 물건 — 임대권한 부존재 (신탁사기 전형)",
        descEn: "Under Article 22 of the Korean Trust Act, legal ownership belongs entirely to the Trust Company. Signing with the consignor (Kim Ho) renders the tenant an illegal occupant, resulting in 100% loss of the ₩220M deposit with zero legal standing in eviction.",
        descKo: "신탁법 제22조에 의거 소유권이 신탁회사로 완전히 이전되었습니다. 위탁자(김*호)와 단독 계약 시 불법점유자가 되어 보증금 2.2억원 전액 몰수 위험이 있습니다."
      },
      {
        severity: "HIGH",
        code: "EULGU_BLIND_SPOT",
        titleEn: "Clean Mortgage Register Illusion (Concealed Project Financing Debt)",
        titleKo: "을구 착시 함정 — 신탁대출 은닉",
        descEn: "Section B (Eulgu) appears deceptively blank, but institutional senior debt is legally concealed inside the offline court Trust Register (Shintak Wonbu).",
        descKo: "등기부 을구에 근저당이 없어 깨끗해 보이나, 실제 PF 담보대출은 '신탁원부'에 숨겨져 있어 일반 임차인에게 치명적 착시를 유발합니다."
      }
    ],
    aiVerdictEn: "CRITICAL FRAUD TRAP: Classic predatory trust scheme. While the mortgage register appears clean to an untrained buyer, legal ownership belongs to the Trust Company. Any contract signed with the individual consignor without tripartite written approval conveys ZERO statutory tenant protection under the Housing Lease Protection Act, causing a 100% capital forfeiture in liquidation.",
    aiVerdictKo: "【경고: 전세사기 전형적 고위험 함정】 본 물건은 소유권이 신탁사로 완전히 넘어간 '신탁등기' 물건입니다. 을구가 깨끗하여 안전해 보이는 착시가 있으나, 위탁자와 체결한 임대차계약은 주택임대차보호법상 법적 대항력이 전무하여 경매 시 0원 배당(전액 손실) 처리됩니다.",
    brokerActionEn: "HALT TRANSACTION: Licensed broker must immediately pull Trust Deed Ledger No. 2023-4819. Brokering without official written consent from both the Trustee and Beneficiary Bank constitutes professional malpractice under the Licensed Real Estate Agents Act.",
    brokerActionKo: "신탁원부 제2023-4819호를 직접 열람하여 신탁사 및 우선수익자의 정식 서면 동의 및 신탁사 공식 계좌 입금이 증명되지 않는 한 계약을 중개해서는 안 됩니다.",
    recommendedClausesEn: [
      "This lease contract is strictly conditional upon obtaining formal written tripartite lease consent from Trustee (Kookmin Real Estate Trust) and 1st Priority Beneficiary Bank prior to final balance; failure to furnish original seals automatically voids contract with immediate full deposit restitution.",
      "All deposit payments and rent shall be remitted exclusively to the designated corporate bank account of Kookmin Real Estate Trust, and NEVER to the consignor's personal account."
    ],
    recommendedClausesKo: [
      "본 계약은 수탁자(국민부동산신탁) 및 1순위 우선수익자의 정식 서면 동의를 득하는 조건부 계약이며, 잔금일까지 동의서 원본이 교부되지 않을 경우 즉시 무효로 하고 계약금 전액을 반환한다.",
      "임차보증금 일체는 위탁자 개인 계좌가 아닌 수탁자(신탁사)의 공식 법인 계좌로 직접 송금한다."
    ],
    timeline: [
      { rank: "Priority 1", title: "Court Execution Expenses", amount: "₩ 3,500,000", desc: "Court auction administrative costs" },
      { rank: "Priority 2", title: "Trust 1st Beneficiary Bank (Project Financing)", amount: "₩ 165,500,000", desc: "Absorbs 100% of remaining liquidation proceeds under trust deed" },
      { rank: "Priority 3 (VOID)", title: "Tenant Deposit (Illegal Occupant)", amount: "₩ 0 (Total Loss: ₩220M)", desc: "Unauthorized lease provides ZERO dividend entitlement under Supreme Court precedent" }
    ]
  },
  {
    id: "case-illegal",
    titleEn: "Case C: Severe Edge Case (Gwanak-gu Illegal Commercial Conversion)",
    titleKo: "Case C: 위반건축물 근생빌라 함정 (관악구 신림동 401호)",
    category: "ILLEGAL_STRUCTURE",
    riskLevel: "SEVERE",
    score: 24,
    addressEn: "401, 1420-5 Sillim-dong, Gwanak-gu, Seoul",
    addressKo: "서울특별시 관악구 신림동 1420-5 그린하우스 401호",
    propertyTypeEn: "Illegal Commercial-to-Residential Studio",
    propertyTypeKo: "다세대/근생 (불법용도변경)",
    exclusiveArea: "28.50㎡ (8.6 Pyeong)",
    marketPrice: 180000000,
    jeonseDeposit: 140000000,
    jeonseRatio: 77.8,
    courtAuctionRatio: 60.0,
    estimatedAuctionPrice: 108000000,
    publicPrice: 110000000,
    txRange: "₩ 1.70B ~ 1.85B",
    registry: {
      pyojebu: [
        {
          rank: "1",
          date: "2021-08-14",
          location: "Unit 401, 1420-5 Sillim-dong, Gwanak-gu",
          details: "Reinforced Concrete 4F Building, Area: 28.50㎡",
          landRatio: "Appurtenant Land Share: 12.3 / 180.0"
        }
      ],
      gapgu: [
        {
          rank: "1",
          type: "Ownership Transfer",
          date: "2021-08-14",
          cause: "Sale & Purchase",
          detail: "Registered Owner: Park Soo (ID: 750912-1******)"
        }
      ],
      eulgu: [
        {
          rank: "1",
          type: "Collateral Mortgage (Geun-jeodang)",
          date: "2021-08-14",
          maxAmount: 50000000,
          creditor: "Woori Bank (Sillim Branch) — Senior Claim: ₩50M"
        }
      ]
    },
    buildingLedger: {
      type: "Official Building Ledger (Gov24 Unit Extract)",
      legalUse: "Type 2 Neighborhood Living Facility (Commercial Office)",
      isViolating: true,
      fineStatus: "Recurring Annual Enforcement Fine: ~₩3.8M / yr",
      violationNotes: "VIOLATION REGISTERED: Commercial office illegally partitioned into residential studio with unauthorized plumbing, kitchen, and 12.4㎡ terrace expansion (Flagged: 2022-03-15)."
    },
    hugEligibility: {
      eligible: false,
      reasonEn: "Registered Building Violation & Commercial Zoning: HUG/SGI/HF guarantee insurance legally prohibited; Commercial zoning triggers automatic bank lease loan denial.",
      reasonKo: "건축물대장상 '위반건축물' 등재 및 주택 외 용도(제2종근생): HUG/SGI 보증보험 가입 법적 원천 불가 및 전세대출 100% 거절."
    },
    redFlags: [
      {
        severity: "CRITICAL",
        code: "BUILDING_VIOLATION_REGISTERED",
        titleEn: "Official Building Violation Registered (Geun-saeng Studio)",
        titleKo: "건축물대장 '위반건축물' 등재 (근생빌라 무단용도변경)",
        descEn: "Zoned as commercial office but illegally fitted with residential amenities. The municipal yellow violation stamp triggers automatic rejection of tier-1 bank loans and deposit insurance.",
        descKo: "공부상 용도가 상가(사무소)이나 주거용으로 불법 개조되었습니다. 구청의 위반건축물 표기로 인해 1금융권 전세대출 및 보증보험 가입이 100% 거부됩니다."
      },
      {
        severity: "HIGH",
        code: "ENFORCEMENT_FINE_LIEN_RISK",
        titleEn: "Recurring Enforcement Fines & Municipal Tax Seizure Risk",
        titleKo: "이행강제금 체납에 따른 구청 압류 리스크",
        descEn: "Owner is subject to ~₩3.8M in recurring fines; non-payment triggers tax liens and municipal auction.",
        descKo: "연간 약 380만원 상당의 이행강제금이 부과 중이며 체납 시 관할 구청에 의한 부동산 직권 압류 위험이 있습니다."
      }
    ],
    aiVerdictEn: "SEVERE VIOLATION EDGE CASE: The property appears to be an ordinary residential studio, but official government building ledgers classify it as a commercial retail facility with an illegal violation stamp. Standard bank Jeonse financing is impossible, and deposit guarantee insurance is completely unavailable, leaving the tenant exposed to a ₩76M loss in forced liquidation.",
    aiVerdictKo: "【주의: 불법개조 근생빌라】 등기부등본은 주택처럼 보이나 건축물대장상 상가로 허가받은 후 주거용으로 불법 쪼개기 증축된 위반건축물입니다. 은행 전세대출이 전면 거절되며 보증보험 가입이 원천 차단됩니다.",
    brokerActionEn: "MANDATORY DISCLOSURE: Licensed broker must disclose the violation in the statutory explanation document. Failure to disclose triggers suspension of broker license and full civil liability for the tenant's deposit deficit.",
    brokerActionKo: "중개대상물 확인설명서에 위반건축물 및 상가 용도임을 반드시 적시해야 하며, 누락 시 공인중개사 자격정지 및 민사 손해배상 책임을 집니다.",
    recommendedClausesEn: [
      "The Lessor confirms that this unit is registered as a Commercial Facility with an active municipal violation notice, and explicitly assumes full financial responsibility for all current and future enforcement fines.",
      "If the Lessee's bank Jeonse loan or guarantee insurance is rejected due to the building's commercial status or municipal violation, this agreement shall be terminated immediately with zero penalty and immediate full refund of all deposits."
    ],
    recommendedClausesKo: [
      "임대인은 본 목적물이 건축물대장상 제2종근린생활시설 위반건축물임을 고지하였으며, 이행강제금 일체는 임대인이 전액 부담한다.",
      "위반건축물 사유로 임차인의 전세자금대출 심사가 반려될 경우 본 계약은 위약금 없이 즉시 무효로 하고 계약금 전액을 반환한다."
    ],
    timeline: [
      { rank: "Priority 1", title: "Court Execution Expenses", amount: "₩ 3,000,000", desc: "Court liquidation appraisal" },
      { rank: "Priority 2", title: "Small Tenant Statutory Priority Deposit", amount: "₩ 55,000,000", desc: "Mandatory statutory protection (Seoul ceiling under Housing Lease Act)" },
      { rank: "Priority 3", title: "Senior Woori Bank Mortgage", amount: "₩ 41,000,000", desc: "Senior collateral debt settlement" },
      { rank: "Priority 4", title: "Tenant Residual Dividend", amount: "₩ 9,000,000 (Total Rec: ₩64M)", desc: "₩76M capital loss incurred out of ₩140M deposit (45.7% recovery rate)" }
    ]
  },
  {
    id: "case-subprime",
    titleEn: "Case D: Subprime Waterfall (Incheon Michuhol Insolvent Debt)",
    titleKo: "Case D: 깡통전세 배당손실 (인천 미추홀구 행복팰리스 501호)",
    category: "SUBPRIME_WATERFALL",
    riskLevel: "HIGH",
    score: 18,
    addressEn: "501, 289 Sungui-dong, Michuhol-gu, Incheon",
    addressKo: "인천광역시 미추홀구 숭의동 289 행복팰리스 501호",
    propertyTypeEn: "Multi-unit Apartment Building (Gap-Investor)",
    propertyTypeKo: "다세대주택 (나홀로아파트)",
    exclusiveArea: "59.82㎡ (18.1 Pyeong)",
    marketPrice: 210000000,
    jeonseDeposit: 170000000,
    jeonseRatio: 81.0,
    courtAuctionRatio: 66.0,
    estimatedAuctionPrice: 138600000,
    publicPrice: 135000000,
    txRange: "₩ 1.95B ~ 2.15B",
    registry: {
      pyojebu: [
        {
          rank: "1",
          date: "2020-03-25",
          location: "Unit 501, 289 Sungui-dong, Michuhol-gu, Incheon",
          details: "Reinforced Concrete 9F Multi-unit, Area: 59.82㎡",
          landRatio: "Appurtenant Land Share: 21.5 / 350.0"
        }
      ],
      gapgu: [
        {
          rank: "1",
          type: "Ownership Transfer",
          date: "2020-03-25",
          cause: "Sale & Purchase",
          detail: "Owner: Nam Woo (High-volume gap investor profile)"
        },
        {
          rank: "2",
          type: "Provisional Seizure (Ga-amnyu)",
          date: "2023-11-04",
          cause: "Credit Card Default",
          detail: "Creditor: Hyundai Card Co., Ltd. (Claim: ₩12,000,000)"
        }
      ],
      eulgu: [
        {
          rank: "1",
          type: "Collateral Mortgage (Geun-jeodang)",
          date: "2020-03-25",
          maxAmount: 156000000,
          creditor: "Michuhol Saemaeul Geumgo (Senior Mortgage: ₩156M)"
        }
      ]
    },
    buildingLedger: {
      type: "Official Building Ledger (Gov24 Unit Extract)",
      legalUse: "Multi-family Residential",
      isViolating: false,
      fineStatus: "None",
      violationNotes: "Building structure compliant. Severe financial insolvency detected."
    },
    hugEligibility: {
      eligible: false,
      reasonEn: "Combined Senior Debt (₩156M) + Proposed Deposit (₩170M) = ₩326M, representing 155% of the property's ₩210M market value. Exceeds debt ceiling; guarantee rejected.",
      reasonKo: "선순위채권(1.56억) + 전세금(1.7억) = 3.26억으로 매매시세(2.1억)의 155% 초과. 부채비율 초과로 보증보험 가입 불가."
    },
    redFlags: [
      {
        severity: "CRITICAL",
        code: "INSOLVENT_DEBT_RATIO",
        titleEn: "Total Liabilities Exceed Market Value (Subprime Jeonse)",
        titleKo: "부채총액 시세 초과 (깡통전세 심각 단계)",
        descEn: "Senior mortgage (₩156M) + Jeonse deposit (₩170M) total ₩326M against a ₩210M market valuation (155% LTV). The landlord has zero equity to repay the deposit.",
        descKo: "선순위 근저당(1.56억)과 보증금(1.7억)의 합산 부채비율이 시세 대비 155%에 달해 임대인의 보증금 자체 상환 능력이 없습니다."
      },
      {
        severity: "HIGH",
        code: "GAPGU_PROVISIONAL_SEIZURE",
        titleEn: "Provisional Seizure in Gapgu (Imminent Foreclosure Risk)",
        titleKo: "갑구 가압류 등재 (신용파탄 징후)",
        descEn: "Credit card company has seized the property title for unpaid debts, indicating acute personal insolvency and high probability of imminent court auction.",
        descKo: "카드사 가압류(1,200만원)가 등재되어 있어 임대인의 다중 채무불이행 및 조기 임의경매 개시 가능성이 매우 높습니다."
      }
    ],
    aiVerdictEn: "HIGH FINANCIAL HAZARD: Textbook subprime 'tin-can' Jeonse (깡통전세). The combination of a heavy senior bank mortgage and active credit card seizure indicates an insolvent landlord. Upon court auction, after court costs and the senior lender absorb proceeds, the tenant faces a catastrophic ₩122M capital deficit (recovering only the statutory small tenant allowance of ₩48M).",
    aiVerdictKo: "【위험: 전형적인 깡통전세 및 배당손실 매물】 선순위 근저당권에 더해 신용카드사 가압류까지 등재된 고위험 매물입니다. 경매 낙찰 시 소액임차인 최우선변제금(4,800만원)을 제외한 나머지 1억 2,200만원은 전액 떼이게 됩니다.",
    brokerActionEn: "DECLINE TRANSACTION: Advise prospective tenant against executing this lease. Under Article 30 of the Licensed Real Estate Agents Act, brokers facilitating contracts with evident subprime debt deficits face direct joint civil liability for resulting dividend shortfalls.",
    brokerActionKo: "계약 체결을 적극 만류해야 합니다. 중개 강행 시 공인중개사법 제30조(손해배상책임)에 의거하여 배당 손실에 대한 연대배상책임 판결을 받을 위험이 매우 높습니다.",
    recommendedClausesEn: [
      "The Lessor shall provide certified proof of full payment and deregistration receipt for the Gapgu Item 2 Provisional Seizure (Hyundai Card) prior to balance payment.",
      "Failure to cancel all provisional seizures prior to balance settlement triggers immediate contract nullification with mandatory double-restitution of deposit."
    ],
    recommendedClausesKo: [
      "임대인은 잔금 지급 전까지 갑구 2번 가압류(현대카드)를 전액 변제하고 말소 등기 접수증을 교부한다.",
      "가압류 말소 미이행 시 본 계약은 즉시 무효로 하고 임대인은 계약금의 배액을 위약금으로 지급한다."
    ],
    timeline: [
      { rank: "Priority 1", title: "Court Execution Expenses", amount: "₩ 3,600,000", desc: "Court auction administration fees" },
      { rank: "Priority 2", title: "Statutory Small Tenant Priority Deposit", amount: "₩ 48,000,000", desc: "Incheon metropolitan small tenant statutory protection" },
      { rank: "Priority 3", title: "Senior Saemaeul Geumgo Mortgage", amount: "₩ 87,000,000", desc: "Absorbs all remaining proceeds (leaving bank with partial loss as well)" },
      { rank: "Priority 4", title: "Tenant General Dividend (Unsatisfied)", amount: "₩ 0 (Total Recovery: ₩48M)", desc: "₩122,000,000 capital loss incurred out of ₩170M deposit (28.2% recovery rate)" }
    ]
  }
];
