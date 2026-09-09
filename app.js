// MetaStar Sentinel — Core Application Logic & Autonomous Verification Engine
(function() {
  'use strict';

  // Fallback / Preloaded Data (ensures zero-latency local execution)
  const SCENARIOS = [
    {
      id: "case-safe",
      title: "Case A: Safe Apartment (마포 래미안 푸르지오 84㎡)",
      titleEn: "Case A: Prime Apartment (Mapo Raemian Prugio 84㎡)",
      category: "SAFE",
      riskLevel: "LOW",
      score: 96,
      address: "서울특별시 마포구 아현동 777 마포래미안푸르지오 105동 1402호",
      addressEn: "105-1402, 777 Ahyeon-dong, Mapo-gu, Seoul",
      propertyType: "아파트 (집합건물)",
      propertyTypeEn: "Apartment (Multi-unit Residential)",
      exclusiveArea: "84.95㎡ (전용 25.7평)",
      marketPrice: 1600000000,
      jeonseDeposit: 800000000,
      jeonseRatio: 50.0,
      courtAuctionRatio: 74.5,
      estimatedAuctionPrice: 1192000000,
      publicPrice: 1120000000,
      txRange: "₩ 1.55B ~ 1.68B",
      registry: {
        pyojebu: [
          { rank: "1", date: "2014-09-30", location: "마포구 아현동 777 105동 1402호", details: "철근콘크리트구조 84.95㎡", landRatio: "45.23/15420.5" }
        ],
        gapgu: [
          { rank: "1", type: "소유권이전", date: "2018-11-20", cause: "매매", detail: "소유자 이*원 (830415-1******)" }
        ],
        eulgu: [
          { rank: "1", type: "근저당권설정", date: "2018-11-20", maxAmount: 120000000, creditor: "신한은행 마포지점 (채무자 이*원)" }
        ]
      },
      buildingLedger: {
        type: "집합건축물대장 (전유부)",
        legalUse: "공동주택 (아파트)",
        isViolating: false,
        fineStatus: "없음 (해당사항 없음)",
        violationNotes: "위반사항 없음. 공부상 기재와 현황 일치."
      },
      hugEligibility: {
        eligible: true,
        reasonKo: "전세가율 50%(HUG 기준 90% 이하 충족), 선순위채권 7.5%(기준 60% 이하 충족), 위반건축물 이력 전무.",
        reasonEn: "Jeonse ratio 50% (under HUG 90% cap), Senior debt 7.5% (under 60% cap), zero building violations."
      },
      redFlags: [],
      aiVerdictKo: "우수한 권리안정성을 갖춘 우량 매물입니다. 선순위 근저당권(채권최고액 1.2억)과 전세보증금(8억)의 합계가 시세의 57.5%로 안전 마진이 두터우며, 경매 배당 시 100% 전액 회수가 보장됩니다.",
      aiVerdictEn: "Prime asset with institutional-grade title safety. Senior collateral debt (₩120M) + Jeonse deposit (₩800M) total only 57.5% of market value. 100% capital recovery guaranteed in auction liquidation.",
      brokerActionKo: "계약 체결 시 잔금 지급일 익일까지 현재 등기부 권리상태 유지 특약을 기재하고, HUG 전세보증보험 가입을 즉시 안내하십시오.",
      brokerActionEn: "Insert standard title maintenance clause through day following final settlement, and advise tenant to bind HUG deposit guarantee.",
      recommendedClauses: [
        "임대인은 잔금 지급일 익일까지 현재의 등기부등본 권리상태를 유지하며, 추가적인 담보권 설정이나 소유권 이전을 일체 하지 않는다.",
        "임대인은 임차인의 주택도시보증공사(HUG) 전세보증금 반환보증보험 가입에 전적으로 협조하며 거부 시 계약을 해제한다."
      ],
      timeline: [
        { rank: "1순위", title: "경매집행비용 (우선공제)", amount: "₩ 4,000,000", desc: "법원 감정평가 및 공매 집행비용 (법정 우선공제)" },
        { rank: "2순위", title: "신한은행 근저당권", amount: "₩ 100,000,000", desc: "2018-11-20 설정 (채권최고액 1.2억원 중 실제 잔액 1.0억원)" },
        { rank: "3순위", title: "임차인 확정일자 보증금", amount: "₩ 800,000,000", desc: "전입신고 및 확정일자 대항력 확보 시 전액 100% 배당 회수" }
      ]
    },
    {
      id: "case-trust",
      title: "Case B: Critical Trust Deed Trap (강서구 화곡동 골든빌 신탁사기)",
      titleEn: "Case B: Critical Trust Deed Trap (Gangseo-gu Golden Ville 302)",
      category: "FRAUD_TRAP",
      riskLevel: "CRITICAL",
      score: 8,
      address: "서울특별시 강서구 화곡동 340-12 골든빌 302호",
      addressEn: "302, 340-12 Hwagok-dong, Gangseo-gu, Seoul",
      propertyType: "다세대주택 (빌라)",
      propertyTypeEn: "Multi-family Villa",
      exclusiveArea: "42.15㎡ (전용 12.7평)",
      marketPrice: 260000000,
      jeonseDeposit: 220000000,
      jeonseRatio: 84.6,
      courtAuctionRatio: 65.0,
      estimatedAuctionPrice: 169000000,
      publicPrice: 175000000,
      txRange: "₩ 2.40B ~ 2.65B",
      registry: {
        pyojebu: [
          { rank: "1", date: "2023-02-15", location: "강서구 화곡동 340-12 302호", details: "철근콘크리트구조 42.15㎡", landRatio: "18.4/210.0" }
        ],
        gapgu: [
          { rank: "1", type: "소유권보존", date: "2023-02-15", cause: "신축", detail: "소유자 김*호 (건축시행자)" },
          { rank: "2", type: "소유권이전(신탁)", date: "2023-04-10", cause: "신탁", detail: "수탁자 국민부동산신탁(주), 신탁원부 제2023-4819호" }
        ],
        eulgu: [
          { rank: "-", type: "기록사항 없음", date: "-", maxAmount: 0, creditor: "등기부상 깨끗함 (단, 신탁담보대출은 신탁원부에 은닉)" }
        ]
      },
      buildingLedger: {
        type: "집합건축물대장 (전유부)",
        legalUse: "다세대주택",
        isViolating: false,
        fineStatus: "없음",
        violationNotes: "건축물대장 정상. 단, 권리관계(신탁등기) 결격 확인 요망."
      },
      hugEligibility: {
        eligible: false,
        reasonKo: "신탁등기 물건: 신탁사 및 우선수익 금융기관의 공식 서면 임대차 동의서 원본 없이는 HUG 전세보증보험 가입 절대 불가.",
        reasonEn: "Trust Deed Trap: Strict prohibition on HUG guarantee without formal tripartite written consent from trustee and beneficiary lender."
      },
      redFlags: [
        {
          severity: "CRITICAL",
          titleKo: "신탁등기 물건 — 임대권한 부존재 (신탁사기 전형)",
          titleEn: "Trust Deed Registered — Landlord Lacks Legal Authority to Lease",
          descKo: "신탁법 제22조에 의거 소유권이 신탁회사로 완전히 이전되었습니다. 위탁자(김*호)와 단독 계약 시 불법점유자가 되어 보증금 2.2억원 전액 몰수 위험이 있습니다.",
          descEn: "Under Trust Act Art. 22, legal ownership belongs to the Trust Co. Signing a contract solely with the consignor voids tenant occupancy rights, resulting in 100% deposit loss."
        },
        {
          severity: "HIGH",
          titleKo: "을구 착시 함정 — 신탁대출 은닉",
          titleEn: "Eulgu Clean Illusion — Concealed Institutional Trust Debt",
          descKo: "등기부 을구에 근저당이 없어 깨끗해 보이나, 실제 PF 담보대출은 '신탁원부'에 숨겨져 있어 일반 임차인에게 치명적 착시를 유발합니다.",
          descEn: "The mortgage register (Eulgu) appears blank, but the multi-billion won project financing debt is concealed inside the offline Trust Deed register."
        }
      ],
      aiVerdictKo: "【경고: 전세사기 전형적 고위험 함정】 본 물건은 소유권이 신탁사로 완전히 넘어간 '신탁등기' 물건입니다. 을구가 깨끗하여 안전해 보이는 착시가 있으나, 위탁자와 체결한 임대차계약은 주택임대차보호법상 법적 대항력이 전무하여 경매 시 0원 배당(전액 손실) 처리됩니다.",
      aiVerdictEn: "【CRITICAL ALERT: Classic Trust Deed Jeonse Fraud】 Ownership belongs to the Trust Company. While the mortgage ledger appears clear, an unauthorized lease signed with the consignor grants zero legal occupancy rights under the Housing Lease Act, causing a complete 100% loss in liquidation.",
      brokerActionKo: "신탁원부 제2023-4819호를 직접 열람하여 신탁사 및 우선수익자의 정식 서면 동의 및 신탁사 공식 계좌 입금이 증명되지 않는 한 계약을 중개해서는 안 됩니다.",
      brokerActionEn: "Do NOT broker this transaction unless the official Trust Deed register (No. 2023-4819) is verified with written consent from both the Trustee and Beneficiary bank, with deposit paid directly to Trustee bank account.",
      recommendedClauses: [
        "본 계약은 수탁자(국민부동산신탁) 및 1순위 우선수익자의 정식 서면 동의를 득하는 조건부 계약이며, 잔금일까지 동의서 원본이 교부되지 않을 경우 즉시 무효로 하고 계약금 전액을 반환한다.",
        "임차보증금 일체는 위탁자 개인 계좌가 아닌 수탁자(신탁사)의 공식 법인 계좌로 직접 송금한다."
      ],
      timeline: [
        { rank: "1순위", title: "경매집행비용", amount: "₩ 3,500,000", desc: "법원 공매 비용" },
        { rank: "2순위", title: "신탁 1순위 우선수익자 (PF 대출은행)", amount: "₩ 165,500,000", desc: "신탁원부상 최우선 변제권자 전액 흡수" },
        { rank: "3순위 (불가)", title: "임차인 보증금 (불법점유 간주)", amount: "₩ 0 (전액 손실 ₩2.2억)", desc: "신탁사 무단 계약으로 대항력 부존재 -> 배당금 0원" }
      ]
    },
    {
      id: "case-illegal",
      title: "Case C: Severe Edge Case (관악구 신림동 위반건축물 근생빌라)",
      titleEn: "Case C: Severe Edge Case (Gwanak-gu Illegal Commercial Conversion)",
      category: "ILLEGAL_STRUCTURE",
      riskLevel: "SEVERE",
      score: 24,
      address: "서울특별시 관악구 신림동 1420-5 그린하우스 401호",
      addressEn: "401, 1420-5 Sillim-dong, Gwanak-gu, Seoul",
      propertyType: "다세대/근생 (불법용도변경)",
      propertyTypeEn: "Illegal Commercial-to-Residential Conversion",
      exclusiveArea: "28.50㎡ (전용 8.6평)",
      marketPrice: 180000000,
      jeonseDeposit: 140000000,
      jeonseRatio: 77.8,
      courtAuctionRatio: 60.0,
      estimatedAuctionPrice: 108000000,
      publicPrice: 110000000,
      txRange: "₩ 1.70B ~ 1.85B",
      registry: {
        pyojebu: [
          { rank: "1", date: "2021-08-14", location: "관악구 신림동 1420-5 401호", details: "철근콘크리트구조 28.50㎡", landRatio: "12.3/180.0" }
        ],
        gapgu: [
          { rank: "1", type: "소유권이전", date: "2021-08-14", cause: "매매", detail: "소유자 박*수 (750912-1******)" }
        ],
        eulgu: [
          { rank: "1", type: "근저당권설정", date: "2021-08-14", maxAmount: 50000000, creditor: "우리은행 신림역지점" }
        ]
      },
      buildingLedger: {
        type: "집합건축물대장 (전유부)",
        legalUse: "제2종 근린생활시설 (사무소)",
        isViolating: true,
        fineStatus: "연간 이행강제금 약 380만원 부과 중",
        violationNotes: "위반건축물 표재: 4층 사무소를 무단 주거용(방, 씽크대, 욕실)으로 불법 용도변경 및 테라스 무단증축 (적발일자: 2022-03-15)"
      },
      hugEligibility: {
        eligible: false,
        reasonKo: "건축물대장상 '위반건축물' 등재 및 주택 외 용도(제2종근생): HUG/SGI 보증보험 가입 법적 원천 불가 및 전세대출 100% 거절.",
        reasonEn: "Registered Building Violation & Commercial Zoning: HUG/SGI guarantee insurance legally barred; bank lease loan denied."
      },
      redFlags: [
        {
          severity: "CRITICAL",
          titleKo: "건축물대장 '위반건축물' 등재 (근생빌라 무단용도변경)",
          titleEn: "Official Building Violation Registered (Illegal Commercial Studio)",
          descKo: "공부상 용도가 상가(사무소)이나 주거용으로 불법 개조되었습니다. 구청의 위반건축물 표기로 인해 1금융권 전세대출 및 보증보험 가입이 100% 거부됩니다.",
          descEn: "Zoned as commercial office but illegally outfitted with residential amenities. Violation stamp triggers automatic rejection of bank loans and deposit insurance."
        },
        {
          severity: "HIGH",
          titleKo: "이행강제금 체납에 따른 구청 압류 리스크",
          titleEn: "Annual Municipal Enforcement Fines & Foreclosure Risk",
          descKo: "연간 약 380만원 상당의 이행강제금이 부과 중이며 체납 시 관할 구청에 의한 부동산 직권 압류 위험이 있습니다.",
          descEn: "Owner is subject to ~₩3.8M recurring annual fines; non-payment triggers tax seizure and public tax auction."
        }
      ],
      aiVerdictKo: "【주의: 불법개조 근생빌라】 등기부등본은 주택처럼 보이나 건축물대장상 상가로 허가받은 후 주거용으로 불법 쪼개기 증축된 위반건축물입니다. 은행 전세대출이 전면 거절되며 보증보험 가입이 원천 차단됩니다.",
      aiVerdictEn: "【SEVERE ALERT: Illegal Commercial Studio】 Outwardly residential, but officially zoned commercial office with illegal expansion. Banks refuse Jeonse loans, and deposit guarantee insurance is completely unattainable.",
      brokerActionKo: "중개대상물 확인설명서에 위반건축물 및 상가 용도임을 반드시 적시해야 하며, 누락 시 공인중개사 자격정지 및 민사 손해배상 책임을 집니다.",
      brokerActionEn: "Broker MUST explicitly disclose the illegal violation and commercial zoning in the statutory explanation document to avoid civil liability and license suspension.",
      recommendedClauses: [
        "임대인은 본 목적물이 건축물대장상 제2종근린생활시설 위반건축물임을 고지하였으며, 이행강제금 일체는 임대인이 전액 부담한다.",
        "위반건축물 사유로 임차인의 전세자금대출 심사가 반려될 경우 본 계약은 위약금 없이 즉시 무효로 하고 계약금 전액을 반환한다."
      ],
      timeline: [
        { rank: "1순위", title: "경매집행비용", amount: "₩ 3,000,000", desc: "법원 감정비용" },
        { rank: "2순위", title: "소액임차인 최우선변제금", amount: "₩ 55,000,000", desc: "주택임대차보호법상 법정 최우선변제 (서울 기준)" },
        { rank: "3순위", title: "우리은행 근저당", amount: "₩ 41,000,000", desc: "선순위 담보대출 잔액" },
        { rank: "4순위", title: "임차인 잔여 배당금", amount: "₩ 9,000,000 (총 ₩64M 회수)", desc: "원 보증금 1.4억원 중 7,600만원 손실 (회수율 45.7%)" }
      ]
    },
    {
      id: "case-subprime",
      title: "Case D: High Risk Waterfall (인천 미추홀구 깡통전세·경매위험)",
      titleEn: "Case D: Subprime Waterfall (Incheon Michuhol Insolvent Debt)",
      category: "SUBPRIME_WATERFALL",
      riskLevel: "HIGH",
      score: 18,
      address: "인천광역시 미추홀구 숭의동 289 행복팰리스 501호",
      addressEn: "501, 289 Sungui-dong, Michuhol-gu, Incheon",
      propertyType: "다세대주택 (나홀로아파트)",
      propertyTypeEn: "Multi-unit Apartment Building",
      exclusiveArea: "59.82㎡ (전용 18.1평)",
      marketPrice: 210000000,
      jeonseDeposit: 170000000,
      jeonseRatio: 81.0,
      courtAuctionRatio: 66.0,
      estimatedAuctionPrice: 138600000,
      publicPrice: 135000000,
      txRange: "₩ 1.95B ~ 2.15B",
      registry: {
        pyojebu: [
          { rank: "1", date: "2020-03-25", location: "인천 미추홀구 숭의동 289 501호", details: "철근콘크리트구조 59.82㎡", landRatio: "21.5/350.0" }
        ],
        gapgu: [
          { rank: "1", type: "소유권이전", date: "2020-03-25", cause: "매매", detail: "소유자 남*우 (다주택 갭투자자)" },
          { rank: "2", type: "가압류", date: "2023-11-04", cause: "카드대금 채무불이행", detail: "채권자 현대카드(주) 청구금액 12,000,000원" }
        ],
        eulgu: [
          { rank: "1", type: "근저당권설정", date: "2020-03-25", maxAmount: 156000000, creditor: "미추홀새마을금고" }
        ]
      },
      buildingLedger: {
        type: "집합건축물대장",
        legalUse: "공동주택",
        isViolating: false,
        fineStatus: "없음",
        violationNotes: "건축물대장 정상. 단, 금융부채 과다 상태."
      },
      hugEligibility: {
        eligible: false,
        reasonKo: "선순위채권(1.56억) + 전세금(1.7억) = 3.26억으로 매매시세(2.1억)의 155% 초과. 부채비율 초과로 보증보험 가입 불가.",
        reasonEn: "Combined Senior Debt + Deposit equals 155% of property value (exceeds 90% cap). Guarantee denied."
      },
      redFlags: [
        {
          severity: "CRITICAL",
          titleKo: "부채총액 시세 초과 (깡통전세 심각 단계)",
          titleEn: "Total Liabilities Exceed Market Value (Subprime Jeonse)",
          descKo: "선순위 근저당(1.56억)과 보증금(1.7억)의 합산 부채비율이 시세 대비 155%에 달해 임대인의 보증금 자체 상환 능력이 없습니다.",
          descEn: "Senior mortgage (₩156M) + Jeonse deposit (₩170M) represents 155% debt-to-value ratio. Landlord is functionally insolvent."
        },
        {
          severity: "HIGH",
          titleKo: "갑구 가압류 등재 (신용파탄 징후)",
          titleEn: "Provisional Seizure in Gapgu (Imminent Foreclosure Risk)",
          descKo: "카드사 가압류(1,200만원)가 등재되어 있어 임대인의 다중 채무불이행 및 조기 임의경매 개시 가능성이 매우 높습니다.",
          descEn: "Credit card company has registered a provisional seizure, signaling acute credit default and imminent court foreclosure."
        }
      ],
      aiVerdictKo: "【위험: 전형적인 깡통전세 및 배당손실 매물】 선순위 근저당권에 더해 신용카드사 가압류까지 등재된 고위험 매물입니다. 경매 낙찰 시 소액임차인 최우선변제금(4,800만원)을 제외한 나머지 1억 2,200만원은 전액 떼이게 됩니다.",
      aiVerdictEn: "【HIGH HAZARD: Subprime Insolvency Waterfall】 Mortgages exceed equity and an active credit card seizure is registered. Upon court auction, tenant faces an immediate ₩122M capital deficit after statutory deductions.",
      brokerActionKo: "계약 체결을 적극 만류해야 합니다. 중개 강행 시 공인중개사법 제30조(손해배상책임)에 의거하여 배당 손실에 대한 연대배상책임 판결을 받을 위험이 매우 높습니다.",
      brokerActionEn: "Advise tenant against signing. Brokering this contract exposes the agent to joint civil liability for damages under Article 30 of the Licensed Real Estate Agents Act.",
      recommendedClauses: [
        "임대인은 잔금 지급 전까지 갑구 2번 가압류(현대카드)를 전액 변제하고 말소 등기 접수증을 교부한다.",
        "가압류 말소 미이행 시 본 계약은 즉시 무효로 하고 임대인은 계약금의 배액을 위약금으로 지급한다."
      ],
      timeline: [
        { rank: "1순위", title: "경매집행비용", amount: "₩ 3,600,000", desc: "법원 집행비용" },
        { rank: "2순위", title: "소액임차인 최우선변제금", amount: "₩ 48,000,000", desc: "주택임대차보호법상 법정 최우선 보호금 (인천 기준)" },
        { rank: "3순위", title: "미추홀새마을금고 근저당", amount: "₩ 87,000,000", desc: "경매 잔여금 전액 흡수 (원채권 잔액 1.3억원 중 일부만 회수)" },
        { rank: "4순위", title: "임차인 일반 배당금", amount: "₩ 0 (회수율 28.2%)", desc: "소액임차인 4,800만원 외 잔여보증금 1억 2,200만원 전액 손실" }
      ]
    }
  ];

  // Translations
  const I18N = {
    ko: {
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
    },
    en: {
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
      title_pyojebu: "Property Identification & Description (Pyojebu)",
      title_gapgu: "Ownership Rights & Encumbrances (Gapgu)",
      title_eulgu: "Senior Mortgages & Liens (Eulgu)",
      lbl_permitted_use: "Permitted Legal Use:",
      lbl_enforcement_fine: "Enforcement Penalty Status:",
      lbl_violation_notes: "Violation Particulars:",
      lbl_kb_price: "KB / MOLIT Verified Price",
      lbl_public_price: "Public Assessment Price (MOLIT)",
      lbl_recent_transactions: "3-Month Transaction Range",
      graph_title: "Chronological Lien Sequencing & Distribution Hierarchy",
      graph_sub: "Statutory liquidation order under Article 3 of the Housing Lease Protection Act.",
      title_broker_clauses: "AI Deal Closing Clauses & Broker Protection Addenda",
      sub_broker_clauses: "Copy-paste special provisions (특약사항) for the lease contract to close deals safely and eliminate liability.",
      btn_copy_all: "Copy All Clauses",
      lbl_broker_action: "Broker Closing Directive:"
    }
  };

  // Application State
  let currentLang = 'ko';
  let activeIndex = 0;
  let customAuctionRatio = null;

  // DOM Elements
  const scenarioChipsContainer = document.getElementById('scenarioChipsContainer');
  const addressInput = document.getElementById('addressInput');
  const metaPropType = document.getElementById('metaPropType');
  const metaMarketPrice = document.getElementById('metaMarketPrice');
  const metaDeposit = document.getElementById('metaDeposit');
  const metaJeonseRatio = document.getElementById('metaJeonseRatio');

  const riskPillBadge = document.getElementById('riskPillBadge');
  const scoreValue = document.getElementById('scoreValue');
  const scoreVerdictText = document.getElementById('scoreVerdictText');
  const gaugeProgressPath = document.getElementById('gaugeProgressPath');

  const hugEligibilityBadge = document.getElementById('hugEligibilityBadge');
  const hugReasonText = document.getElementById('hugReasonText');

  const auctionRateSlider = document.getElementById('auctionRateSlider');
  const auctionRateDisplay = document.getElementById('auctionRateDisplay');
  const courtProceedsVal = document.getElementById('courtProceedsVal');
  const waterfallBar = document.getElementById('waterfallBar');
  const netTenantRecovered = document.getElementById('netTenantRecovered');
  const projectedLoss = document.getElementById('projectedLoss');
  const recoveryRateBadge = document.getElementById('recoveryRateBadge');

  const aiSummaryBox = document.getElementById('aiSummaryBox');
  const redFlagsContainer = document.getElementById('redFlagsContainer');

  const pyojebuBody = document.getElementById('pyojebuBody');
  const gapguBody = document.getElementById('gapguBody');
  const eulguBody = document.getElementById('eulguBody');

  const ledgerTypeDisplay = document.getElementById('ledgerTypeDisplay');
  const ledgerAddressDisplay = document.getElementById('ledgerAddressDisplay');
  const violationStamp = document.getElementById('violationStamp');
  const ledgerLegalUse = document.getElementById('ledgerLegalUse');
  const ledgerFineStatus = document.getElementById('ledgerFineStatus');
  const ledgerViolationNotes = document.getElementById('ledgerViolationNotes');

  const mVerifiedPrice = document.getElementById('mVerifiedPrice');
  const mPublicPrice = document.getElementById('mPublicPrice');
  const mTxRange = document.getElementById('mTxRange');
  const marketNoteText = document.getElementById('marketNoteText');

  const timelineTree = document.getElementById('timelineTree');
  const brokerActionText = document.getElementById('brokerActionText');
  const clausesList = document.getElementById('clausesList');

  const langToggleBtn = document.getElementById('langToggleBtn');
  const currentLangLabel = document.getElementById('currentLang');
  const toastNotification = document.getElementById('toastNotification');

  const certModal = document.getElementById('certModal');
  const openCertificateBtn = document.getElementById('openCertificateBtn');
  const closeCertModalBtn = document.getElementById('closeCertModalBtn');

  // Format currency in Korean Won (KRW)
  function formatKRW(val) {
    if (val >= 100000000) {
      const eok = (val / 100000000).toFixed(val % 100000000 === 0 ? 0 : 1);
      return `₩ ${eok}억 (${val.toLocaleString()}원)`;
    }
    return `₩ ${val.toLocaleString()}원`;
  }

  function formatShortKRW(val) {
    if (val >= 100000000) {
      const eok = (val / 100000000).toFixed(val % 100000000 === 0 ? 0 : 1);
      return `₩ ${eok}억원`;
    }
    if (val >= 10000) {
      return `₩ ${(val / 10000).toLocaleString()}만원`;
    }
    return `₩ ${val.toLocaleString()}원`;
  }

  // Toast Helper
  function showToast(msg) {
    toastNotification.textContent = msg;
    toastNotification.classList.add('show');
    setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 2400);
  }

  // Render Scenario Chips
  function renderScenarioChips() {
    scenarioChipsContainer.innerHTML = '';
    SCENARIOS.forEach((item, idx) => {
      const chip = document.createElement('div');
      chip.className = `scenario-chip ${idx === activeIndex ? 'active' : ''}`;
      
      const tagClass = item.riskLevel.toLowerCase();
      const title = currentLang === 'ko' ? item.title : item.titleEn;
      const addr = currentLang === 'ko' ? item.address : item.addressEn;

      chip.innerHTML = `
        <div class="chip-header">
          <span class="chip-tag ${tagClass}">${item.riskLevel}</span>
          <span class="chip-score" style="color: ${getScoreColor(item.score)}">${item.score}/100</span>
        </div>
        <div class="chip-title">${title}</div>
        <div class="chip-sub">${addr}</div>
      `;

      chip.addEventListener('click', () => {
        if (activeIndex !== idx) {
          activeIndex = idx;
          customAuctionRatio = null; // reset custom slider
          updateView();
        }
      });

      scenarioChipsContainer.appendChild(chip);
    });
  }

  function getScoreColor(score) {
    if (score >= 85) return '#10b981';
    if (score >= 60) return '#f59e0b';
    if (score >= 20) return '#ef4444';
    return '#ec4899';
  }

  function updateGauge(score) {
    // Semi-circle SVG arc circumference for radius 80 is approx 251.2
    const circumference = 251.2;
    const offset = circumference - (score / 100) * circumference;
    gaugeProgressPath.style.strokeDashoffset = offset;
    gaugeProgressPath.style.stroke = getScoreColor(score);
    scoreValue.textContent = score;

    riskPillBadge.className = 'risk-pill';
    const c = SCENARIOS[activeIndex];
    riskPillBadge.classList.add(c.riskLevel.toLowerCase());
    riskPillBadge.textContent = c.riskLevel;

    if (score >= 85) {
      scoreVerdictText.textContent = currentLang === 'ko' 
        ? "안전 우량 매물. 정상 계약 체결 적격 판정." 
        : "Prime safe asset. Approved for standard execution.";
    } else if (score >= 60) {
      scoreVerdictText.textContent = currentLang === 'ko'
        ? "주의 요망. 선순위 부채비율 확인 필요."
        : "Moderate risk. Verification of senior lien ratio advised.";
    } else if (score >= 20) {
      scoreVerdictText.textContent = currentLang === 'ko'
        ? "고위험 매물. 보증금 미반환 및 대출 거절 위험 농후."
        : "Severe risk. High likelihood of capital deficit / loan refusal.";
    } else {
      scoreVerdictText.textContent = currentLang === 'ko'
        ? "치명적 결격 사유. 전세사기 및 권리 부존재 위험."
        : "Critical hazard. Potential fraud / lack of legal leasing rights.";
    }
  }

  // Calculate Auction Waterfall Dynamically
  function calculateWaterfall(c, liquidationRate) {
    const saleProceeds = Math.round(c.marketPrice * (liquidationRate / 100));
    const courtCost = 3800000; // ~3.8M court auction cost
    const netProceeds = Math.max(0, saleProceeds - courtCost);

    let seniorRepayment = 0;
    let tenantDividend = 0;
    let tenantLoss = 0;

    if (c.id === 'case-trust') {
      // In trust fraud, tenant is legally an unauthorized occupant relative to trustee
      seniorRepayment = netProceeds; // goes to trust beneficiary bank
      tenantDividend = 0;
      tenantLoss = c.jeonseDeposit;
    } else if (c.id === 'case-safe') {
      const seniorMax = c.registry.eulgu[0].maxAmount || 0;
      seniorRepayment = Math.min(netProceeds, 100000000); // 100M actual debt
      const afterSenior = Math.max(0, netProceeds - seniorRepayment);
      tenantDividend = Math.min(afterSenior, c.jeonseDeposit);
      tenantLoss = Math.max(0, c.jeonseDeposit - tenantDividend);
    } else if (c.id === 'case-illegal') {
      // Seoul small tenant priority (소액임차인) 55M
      const smallTenant = 55000000;
      seniorRepayment = 41000000;
      const afterSmallAndSenior = Math.max(0, netProceeds - smallTenant - seniorRepayment);
      tenantDividend = smallTenant + afterSmallAndSenior;
      if (tenantDividend > c.jeonseDeposit) tenantDividend = c.jeonseDeposit;
      tenantLoss = c.jeonseDeposit - tenantDividend;
    } else if (c.id === 'case-subprime') {
      // Incheon small tenant priority 48M
      const smallTenant = 48000000;
      const seniorLienActual = 130000000;
      const afterSmall = Math.max(0, netProceeds - smallTenant);
      seniorRepayment = Math.min(afterSmall, seniorLienActual);
      const remainingForTenant = Math.max(0, afterSmall - seniorRepayment);
      tenantDividend = smallTenant + remainingForTenant;
      if (tenantDividend > c.jeonseDeposit) tenantDividend = c.jeonseDeposit;
      tenantLoss = c.jeonseDeposit - tenantDividend;
    }

    const recoveryPercent = Number(((tenantDividend / c.jeonseDeposit) * 100).toFixed(1));

    return {
      saleProceeds,
      courtCost,
      seniorRepayment,
      tenantDividend,
      tenantLoss,
      recoveryPercent
    };
  }

  function renderWaterfall(c) {
    const rate = customAuctionRatio !== null ? customAuctionRatio : c.courtAuctionRatio;
    auctionRateSlider.value = rate;
    auctionRateDisplay.textContent = `${rate.toFixed(1)}%`;

    const wf = calculateWaterfall(c, rate);

    courtProceedsVal.textContent = formatShortKRW(wf.saleProceeds);
    netTenantRecovered.textContent = formatShortKRW(wf.tenantDividend);
    
    if (wf.tenantLoss === 0) {
      projectedLoss.textContent = `₩ 0 (0.0%)`;
      projectedLoss.className = 'rec-val safe-text';
    } else {
      projectedLoss.textContent = `${formatShortKRW(wf.tenantLoss)} (-${(100 - wf.recoveryPercent).toFixed(1)}%)`;
      projectedLoss.className = 'rec-val danger-text';
    }

    recoveryRateBadge.textContent = `${wf.recoveryPercent}% ${currentLang === 'ko' ? '배당 회수율' : 'Recovery'}`;
    recoveryRateBadge.style.color = wf.recoveryPercent >= 90 ? '#34d399' : (wf.recoveryPercent >= 50 ? '#fbbf24' : '#f87171');

    // Calculate segment widths relative to total capital at stake (sale proceeds or deposit)
    const baseTotal = Math.max(wf.saleProceeds, c.jeonseDeposit + wf.seniorRepayment);
    const pCourt = ((wf.courtCost / baseTotal) * 100).toFixed(1);
    const pSenior = ((wf.seniorRepayment / baseTotal) * 100).toFixed(1);
    const pTenant = ((wf.tenantDividend / baseTotal) * 100).toFixed(1);
    const pLoss = ((wf.tenantLoss / baseTotal) * 100).toFixed(1);

    waterfallBar.innerHTML = `
      <div class="wf-segment color-court" style="width: ${pCourt}%" data-tooltip="Court Cost: ${formatShortKRW(wf.courtCost)}"></div>
      <div class="wf-segment color-senior" style="width: ${pSenior}%" data-tooltip="Senior Liens: ${formatShortKRW(wf.seniorRepayment)}"></div>
      <div class="wf-segment color-tenant" style="width: ${pTenant}%" data-tooltip="Tenant Recovered: ${formatShortKRW(wf.tenantDividend)}"></div>
      <div class="wf-segment color-loss" style="width: ${pLoss}%" data-tooltip="Tenant Capital Loss: ${formatShortKRW(wf.tenantLoss)}"></div>
    `;
  }

  function renderMultiDocs(c) {
    // Registry: Pyojebu
    pyojebuBody.innerHTML = c.registry.pyojebu.map(r => `
      <tr>
        <td>${r.rank}</td>
        <td>${r.date}</td>
        <td>${r.location}</td>
        <td>${r.details}</td>
        <td>${r.landRatio}</td>
      </tr>
    `).join('');

    // Registry: Gapgu
    gapguBody.innerHTML = c.registry.gapgu.map(r => `
      <tr>
        <td><strong>${r.rank}</strong></td>
        <td><span class="badge-tag">${r.type}</span></td>
        <td>${r.date}</td>
        <td>${r.cause}</td>
        <td>${r.detail}</td>
      </tr>
    `).join('');

    // Registry: Eulgu
    eulguBody.innerHTML = c.registry.eulgu.map(r => `
      <tr>
        <td><strong>${r.rank}</strong></td>
        <td><span class="badge-tag">${r.type}</span></td>
        <td>${r.date}</td>
        <td>${r.maxAmount ? formatShortKRW(r.maxAmount) : '-'}</td>
        <td>${r.creditor}</td>
      </tr>
    `).join('');

    // Building Ledger
    ledgerTypeDisplay.textContent = c.buildingLedger.type;
    ledgerAddressDisplay.textContent = currentLang === 'ko' ? c.address : c.addressEn;
    ledgerLegalUse.textContent = c.buildingLedger.legalUse;
    ledgerFineStatus.textContent = c.buildingLedger.fineStatus;
    ledgerViolationNotes.textContent = c.buildingLedger.violationNotes;

    if (c.buildingLedger.isViolating) {
      violationStamp.className = 'violation-stamp violation';
      violationStamp.textContent = currentLang === 'ko' ? '위반건축물 등재' : 'VIOLATION REGISTERED';
    } else {
      violationStamp.className = 'violation-stamp normal';
      violationStamp.textContent = currentLang === 'ko' ? '정상 (위반사항 없음)' : 'NORMAL (COMPLIANT)';
    }

    // Market Valuation
    mVerifiedPrice.textContent = formatShortKRW(c.marketPrice);
    mPublicPrice.textContent = formatShortKRW(c.publicPrice);
    mTxRange.textContent = c.txRange;
    marketNoteText.textContent = currentLang === 'ko'
      ? `전세가율은 ${c.jeonseRatio}%입니다. KB부동산 시세 대비 안전마진을 상시 점검하십시오.`
      : `Current Jeonse ratio is ${c.jeonseRatio}%. Monitor valuation margins against bank assessment ratios.`;

    // Timeline Tree
    timelineTree.innerHTML = c.timeline.map((t, idx) => {
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

  function renderRedFlagsAndClauses(c) {
    // AI Summary
    aiSummaryBox.textContent = currentLang === 'ko' ? c.aiVerdictKo : c.aiVerdictEn;

    // Red Flags
    if (c.redFlags.length === 0) {
      redFlagsContainer.innerHTML = `
        <div class="clean-flag-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          <span>${currentLang === 'ko' ? '위험 등기 및 법적 결격사유가 발견되지 않았습니다 (클린 타이틀).' : 'Zero title encumbrances or statutory violations detected (Clean Title).'}</span>
        </div>
      `;
    } else {
      redFlagsContainer.innerHTML = c.redFlags.map(rf => `
        <div class="red-flag-item">
          <div class="red-flag-icon">⚠️</div>
          <div class="flag-content">
            <h4>${currentLang === 'ko' ? rf.titleKo : rf.titleEn}</h4>
            <p>${currentLang === 'ko' ? rf.descKo : rf.descEn}</p>
          </div>
        </div>
      `).join('');
    }

    // Broker Directives & Clauses
    brokerActionText.textContent = currentLang === 'ko' ? c.brokerActionKo : c.brokerActionEn;

    clausesList.innerHTML = c.recommendedClauses.map((clause, idx) => `
      <div class="clause-item">
        <span class="clause-text"><strong>[특약 ${idx + 1}]</strong> ${clause}</span>
        <button class="clause-copy-btn" data-clause="${encodeURIComponent(clause)}">${currentLang === 'ko' ? '복사' : 'Copy'}</button>
      </div>
    `).join('');

    // Attach individual copy listener
    document.querySelectorAll('.clause-copy-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const text = decodeURIComponent(e.currentTarget.getAttribute('data-clause'));
        navigator.clipboard.writeText(text).then(() => {
          showToast(currentLang === 'ko' ? '특약 조항이 클립보드에 복사되었습니다!' : 'Clause copied to clipboard!');
        });
      });
    });
  }

  function renderHUG(c) {
    if (c.hugEligibility.eligible) {
      hugEligibilityBadge.className = 'hug-badge approved';
      hugEligibilityBadge.textContent = currentLang === 'ko' ? '가입 승인 적격' : 'ELIGIBLE';
    } else {
      hugEligibilityBadge.className = 'hug-badge rejected';
      hugEligibilityBadge.textContent = currentLang === 'ko' ? '가입 거절 대상' : 'INELIGIBLE';
    }
    hugReasonText.textContent = currentLang === 'ko' ? c.hugEligibility.reasonKo : c.hugEligibility.reasonEn;
  }

  function updateCertificateModal(c) {
    document.getElementById('certAddress').textContent = currentLang === 'ko' ? c.address : c.addressEn;
    document.getElementById('certType').textContent = currentLang === 'ko' ? c.propertyType : c.propertyTypeEn;
    document.getElementById('certArea').textContent = c.exclusiveArea;
    document.getElementById('certMarketVal').textContent = formatKRW(c.marketPrice);
    document.getElementById('certDepositVal').textContent = formatKRW(c.jeonseDeposit);
    document.getElementById('certSealScore').textContent = c.score;

    document.getElementById('certTitleStatus').textContent = c.category === 'SAFE' 
      ? (currentLang === 'ko' ? '정상 단독소유 (소유권 안전)' : 'Clear Sole Ownership')
      : (currentLang === 'ko' ? '신탁등기 / 가압류 등재' : 'Trust / Seizure Encumbered');
    
    const seniorRatio = ((c.registry.eulgu[0].maxAmount || 0) / c.marketPrice * 100).toFixed(1);
    document.getElementById('certSeniorRatio').textContent = `${seniorRatio}% (${c.category === 'SAFE' ? '안전' : '주의'})`;
    document.getElementById('certBuildingStatus').textContent = c.buildingLedger.isViolating 
      ? (currentLang === 'ko' ? '위반건축물 표재 (근생불법)' : 'Violation Registered')
      : (currentLang === 'ko' ? '정상 (위반 없음)' : 'Compliant');
    
    document.getElementById('certHugStatus').textContent = c.hugEligibility.eligible
      ? (currentLang === 'ko' ? 'HUG 보증 가입 가능' : 'Guarantee Eligible')
      : (currentLang === 'ko' ? 'HUG 보증 가입 불가' : 'Ineligible');

    document.getElementById('certSummaryText').textContent = currentLang === 'ko' ? c.aiVerdictKo : c.aiVerdictEn;

    const clausesBox = document.getElementById('certClausesBox');
    clausesBox.innerHTML = c.recommendedClauses.map((cl, i) => `<div><strong>제${i+1}조.</strong> ${cl}</div>`).join('');
  }

  function updateView() {
    const c = SCENARIOS[activeIndex];

    // Meta Header Bar
    addressInput.value = currentLang === 'ko' ? c.address : c.addressEn;
    metaPropType.textContent = currentLang === 'ko' ? c.propertyType : c.propertyTypeEn;
    metaMarketPrice.textContent = formatShortKRW(c.marketPrice);
    metaDeposit.textContent = formatShortKRW(c.jeonseDeposit);
    metaJeonseRatio.textContent = `${c.jeonseRatio}%`;

    // Gauge & Score
    updateGauge(c.score);

    // HUG Status
    renderHUG(c);

    // Waterfall
    renderWaterfall(c);

    // Multi Docs
    renderMultiDocs(c);

    // Red Flags & Clauses
    renderRedFlagsAndClauses(c);

    // Certificate sync
    updateCertificateModal(c);

    // Scenario Chips Sync
    renderScenarioChips();
  }

  function applyLanguage(lang) {
    currentLang = lang;
    currentLangLabel.textContent = lang === 'ko' ? '한국어 (KR)' : 'English (EN)';

    const dict = I18N[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    updateView();
  }

  // Event Listeners
  function setupEventListeners() {
    // Language Toggle
    langToggleBtn.addEventListener('click', () => {
      applyLanguage(currentLang === 'ko' ? 'en' : 'ko');
      showToast(currentLang === 'ko' ? '언어가 한국어로 전환되었습니다.' : 'Language changed to English.');
    });

    // Auction Rate Slider
    auctionRateSlider.addEventListener('input', (e) => {
      customAuctionRatio = parseFloat(e.target.value);
      const c = SCENARIOS[activeIndex];
      renderWaterfall(c);
    });

    // Re-Analyze Button
    document.getElementById('reRunAuditBtn').addEventListener('click', () => {
      showToast(currentLang === 'ko' ? '등기부 및 건축물대장 재검증을 완료했습니다.' : 'Title & Building Ledgers re-verified.');
      updateView();
    });

    // Copy All Clauses
    document.getElementById('copyAllClausesBtn').addEventListener('click', () => {
      const c = SCENARIOS[activeIndex];
      const allText = c.recommendedClauses.map((cl, i) => `[특약 ${i+1}] ${cl}`).join('\n\n');
      navigator.clipboard.writeText(allText).then(() => {
        showToast(currentLang === 'ko' ? '모든 특약 조항이 복사되었습니다.' : 'All protective clauses copied!');
      });
    });

    // Tab Navigation
    document.querySelectorAll('.doc-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        document.querySelectorAll('.doc-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

        const targetTab = e.currentTarget;
        targetTab.classList.add('active');
        const tabId = targetTab.getAttribute('data-tab');
        const pane = document.getElementById(`pane-${tabId}`);
        if (pane) pane.classList.add('active');
      });
    });

    // Modal Certificate Handlers
    openCertificateBtn.addEventListener('click', () => {
      certModal.classList.add('open');
    });

    closeCertModalBtn.addEventListener('click', () => {
      certModal.classList.remove('open');
    });

    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) {
        certModal.classList.remove('open');
      }
    });

    document.getElementById('copyShareLinkBtn').addEventListener('click', () => {
      const dummyUrl = `https://metastar.io/sentinel/cert?id=MS-2026-${SCENARIOS[activeIndex].id}&v=verified`;
      navigator.clipboard.writeText(dummyUrl).then(() => {
        showToast(currentLang === 'ko' ? '카카오톡 전송용 안심링크가 복사되었습니다!' : 'KakaoTalk shareable link copied!');
      });
    });
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    applyLanguage('ko');
  });

})();
