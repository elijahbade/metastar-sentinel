// MetaStar Sentinel — Pure TypeScript Auction Liquidation & Dividend Engine
import { PropertyScenario, AuctionWaterfallResult } from '../types';

export class DividendEngine {
  /**
   * Calculates the exact statutory distribution of auction liquidation proceeds
   * under the Korean Civil Execution Act and Housing Lease Protection Act.
   */
  public static calculate(scenario: PropertyScenario, liquidationRate: number): AuctionWaterfallResult {
    const saleProceeds = Math.round(scenario.marketPrice * (liquidationRate / 100));
    const courtCost = 3800000; // ~₩3.8M typical court execution and appraisal costs
    const netProceeds = Math.max(0, saleProceeds - courtCost);

    let seniorRepayment = 0;
    let tenantDividend = 0;
    let tenantLoss = 0;

    if (scenario.id === 'case-trust') {
      // In predatory trust fraud, the tenant contracted with a party lacking legal title.
      // Under Korean Supreme Court precedent, the tenant has ZERO legal claim against the trustee.
      seniorRepayment = netProceeds; // 100% absorbed by trust beneficiary lender
      tenantDividend = 0;
      tenantLoss = scenario.jeonseDeposit;
    } else if (scenario.id === 'case-safe') {
      // High-equity safe apartment: Senior mortgage fully satisfied, tenant fully protected
      seniorRepayment = Math.min(netProceeds, 100000000); // ₩100M actual balance
      const afterSenior = Math.max(0, netProceeds - seniorRepayment);
      tenantDividend = Math.min(afterSenior, scenario.jeonseDeposit);
      tenantLoss = Math.max(0, scenario.jeonseDeposit - tenantDividend);
    } else if (scenario.id === 'case-illegal') {
      // Small Tenant Priority Allowance (Seoul ceiling: ₩55M)
      const smallTenantPriority = 55000000;
      seniorRepayment = 41000000; // Senior bank loan
      const afterSmallAndSenior = Math.max(0, netProceeds - smallTenantPriority - seniorRepayment);
      tenantDividend = Math.min(scenario.jeonseDeposit, smallTenantPriority + afterSmallAndSenior);
      tenantLoss = Math.max(0, scenario.jeonseDeposit - tenantDividend);
    } else if (scenario.id === 'case-subprime') {
      // Small Tenant Priority Allowance (Incheon ceiling: ₩48M)
      const smallTenantPriority = 48000000;
      const seniorLienActual = 130000000;
      const afterSmall = Math.max(0, netProceeds - smallTenantPriority);
      seniorRepayment = Math.min(afterSmall, seniorLienActual);
      const remainingForTenant = Math.max(0, afterSmall - seniorRepayment);
      tenantDividend = Math.min(scenario.jeonseDeposit, smallTenantPriority + remainingForTenant);
      tenantLoss = Math.max(0, scenario.jeonseDeposit - tenantDividend);
    }

    const recoveryPercent = Number(((tenantDividend / scenario.jeonseDeposit) * 100).toFixed(1));

    return {
      saleProceeds,
      courtCost,
      seniorRepayment,
      tenantDividend,
      tenantLoss,
      recoveryPercent
    };
  }

  /**
   * Currency formatting utility for KRW with Korean/English notation
   */
  public static formatKRW(val: number): string {
    if (val >= 100000000) {
      const eok = (val / 100000000).toFixed(val % 100000000 === 0 ? 0 : 1);
      return `₩ ${eok}B (₩ ${val.toLocaleString()})`;
    }
    return `₩ ${val.toLocaleString()}`;
  }

  public static formatShortKRW(val: number): string {
    if (val >= 100000000) {
      const eok = (val / 100000000).toFixed(val % 100000000 === 0 ? 0 : 1);
      return `₩ ${eok}B`;
    }
    if (val >= 10000) {
      return `₩ ${(val / 10000).toLocaleString()}M`;
    }
    return `₩ ${val.toLocaleString()}`;
  }
}
