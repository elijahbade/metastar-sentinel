// MetaStar Sentinel — Core TypeScript Definitions & Domain Interfaces

export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL' | 'SEVERE';

export type PropertyCategory = 'SAFE' | 'FRAUD_TRAP' | 'ILLEGAL_STRUCTURE' | 'SUBPRIME_WATERFALL';

export interface PyojebuEntry {
  rank: string;
  date: string;
  location: string;
  details: string;
  landRatio: string;
}

export interface GapguEntry {
  rank: string;
  type: string;
  date: string;
  cause: string;
  detail: string;
}

export interface EulguEntry {
  rank: string;
  type: string;
  date: string;
  maxAmount: number;
  creditor: string;
}

export interface RegistryRecord {
  pyojebu: PyojebuEntry[];
  gapgu: GapguEntry[];
  eulgu: EulguEntry[];
}

export interface BuildingLedgerRecord {
  type: string;
  legalUse: string;
  isViolating: boolean;
  fineStatus: string;
  violationNotes: string;
}

export interface HUGEligibility {
  eligible: boolean;
  reasonEn: string;
  reasonKo: string;
}

export interface RedFlag {
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  code: string;
  titleEn: string;
  titleKo: string;
  descEn: string;
  descKo: string;
}

export interface TimelineNode {
  rank: string;
  title: string;
  amount: string;
  desc: string;
}

export interface AuctionWaterfallResult {
  saleProceeds: number;
  courtCost: number;
  seniorRepayment: number;
  tenantDividend: number;
  tenantLoss: number;
  recoveryPercent: number;
}

export interface PropertyScenario {
  id: string;
  titleEn: string;
  titleKo: string;
  category: PropertyCategory;
  riskLevel: RiskLevel;
  score: number;
  addressEn: string;
  addressKo: string;
  propertyTypeEn: string;
  propertyTypeKo: string;
  exclusiveArea: string;
  marketPrice: number;
  jeonseDeposit: number;
  jeonseRatio: number;
  courtAuctionRatio: number;
  estimatedAuctionPrice: number;
  publicPrice: number;
  txRange: string;
  registry: RegistryRecord;
  buildingLedger: BuildingLedgerRecord;
  hugEligibility: HUGEligibility;
  redFlags: RedFlag[];
  aiVerdictEn: string;
  aiVerdictKo: string;
  brokerActionEn: string;
  brokerActionKo: string;
  recommendedClausesEn: string[];
  recommendedClausesKo: string[];
  timeline: TimelineNode[];
}
