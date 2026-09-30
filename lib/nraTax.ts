/**
 * NRA (Non-Resident Alien) & Foreign Investor Dividend Tax Calculation Engine.
 *
 * Implements U.S. Internal Revenue Code (IRC) Chapter 3 withholding calculations
 * and the compounding impact (Tax Drag) on DRIP reinvestment over time.
 * Pure functions, fully testable.
 */

export interface NraTaxInput {
  /** Initial investment amount ($) */
  initialInvestment: number;
  /** Share price ($) */
  price: number;
  /** Annual dividend yield (% numerical, e.g. 3.5) */
  dividendYieldPct: number;
  /** Annual dividend growth rate (% numerical, e.g. 10) */
  dividendGrowthPct: number;
  /** Annual share price appreciation (% numerical, e.g. 7) */
  priceGrowthPct: number;
  /** Monthly recurring contribution ($) */
  monthlyContribution: number;
  /** Investment horizon in years */
  years: number;
  /** IRS Withholding Tax Rate (% numerical, e.g. 10 for China, 15 for UK, 30 for non-treaty) */
  withholdingRatePct: number;
}

export interface NraSnapshotResult {
  grossYieldPct: number;
  netYieldPct: number;
  grossAnnualPerShare: number;
  taxWithheldPerShare: number;
  netAnnualPerShare: number;
  withholdingRatePct: number;
}

export interface NraYearResult {
  year: number;
  startShares: number;
  sharePrice: number;
  startBalance: number;
  grossDividend: number;
  taxWithheld: number;
  netDividend: number;
  reinvestedShares: number;
  endShares: number;
  endBalance: number;
  cumulativeGrossDividends: number;
  cumulativeTaxWithheld: number;
  cumulativeNetDividends: number;
}

export interface NraDripSimulation {
  summary: {
    finalShares: number;
    finalPrice: number;
    finalValue: number;
    totalInvested: number;
    totalGrossDividends: number;
    totalTaxWithheld: number;
    totalNetDividends: number;
    finalAnnualGrossIncome: number;
    finalAnnualNetIncome: number;
    /** Value if 0% withholding tax occurred (Gross benchmark) */
    noTaxBenchmarkValue: number;
    /** Total dollar loss to tax drag (difference in compounding final portfolio value) */
    taxDragDollars: number;
    /** Effective tax drag percentage on ending wealth */
    taxDragPct: number;
  };
  yearly: NraYearResult[];
}

/**
 * Calculate per-share first-year snapshot metrics for non-resident alien investors.
 */
export function calculateNraSnapshot(
  price: number,
  yieldPct: number,
  withholdingRatePct: number
): NraSnapshotResult {
  if (price <= 0 || yieldPct < 0 || withholdingRatePct < 0) {
    return {
      grossYieldPct: NaN,
      netYieldPct: NaN,
      grossAnnualPerShare: NaN,
      taxWithheldPerShare: NaN,
      netAnnualPerShare: NaN,
      withholdingRatePct: NaN,
    };
  }

  const effectiveWithholdingPct = Math.min(100, Math.max(0, withholdingRatePct));
  const grossAnnualPerShare = price * (yieldPct / 100);
  const taxWithheldPerShare = grossAnnualPerShare * (effectiveWithholdingPct / 100);
  const netAnnualPerShare = grossAnnualPerShare - taxWithheldPerShare;
  const netYieldPct = yieldPct * (1 - effectiveWithholdingPct / 100);

  return {
    grossYieldPct: yieldPct,
    netYieldPct,
    grossAnnualPerShare,
    taxWithheldPerShare,
    netAnnualPerShare,
    withholdingRatePct: effectiveWithholdingPct,
  };
}

/**
 * Simulate multi-year DRIP with IRS dividend tax withheld at source.
 * In NRA DRIP, only the NET dividend (after Chapter 3 withholding) is reinvested to buy more shares.
 */
export function simulateNraDrip(input: NraTaxInput, reinvest = true): NraDripSimulation {
  const invalid =
    input.initialInvestment < 0 ||
    input.price <= 0 ||
    input.years < 0 ||
    !Number.isFinite(input.years);

  if (invalid) {
    return {
      summary: {
        finalShares: NaN,
        finalPrice: NaN,
        finalValue: NaN,
        totalInvested: NaN,
        totalGrossDividends: NaN,
        totalTaxWithheld: NaN,
        totalNetDividends: NaN,
        finalAnnualGrossIncome: NaN,
        finalAnnualNetIncome: NaN,
        noTaxBenchmarkValue: NaN,
        taxDragDollars: NaN,
        taxDragPct: NaN,
      },
      yearly: [],
    };
  }

  const taxRate = Math.min(100, Math.max(0, input.withholdingRatePct)) / 100;
  let shares = input.initialInvestment / input.price;
  let price = input.price;
  let yieldPct = input.dividendYieldPct;
  let totalGrossDividends = 0;
  let totalTaxWithheld = 0;
  let totalNetDividends = 0;
  let totalInvested = input.initialInvestment;
  const yearly: NraYearResult[] = [];

  // Also simulate 0% tax benchmark in parallel to quantify compounding tax drag
  let noTaxShares = input.initialInvestment / input.price;

  for (let y = 1; y <= input.years; y++) {
    const startShares = shares;
    const startPrice = price;
    const startBalance = startShares * startPrice;

    // Gross dividend earned in year
    const grossDiv = startShares * startPrice * (yieldPct / 100);
    const taxWithheld = grossDiv * taxRate;
    const netDiv = grossDiv - taxWithheld;

    totalGrossDividends += grossDiv;
    totalTaxWithheld += taxWithheld;
    totalNetDividends += netDiv;

    const annualContribution = input.monthlyContribution * 12;
    totalInvested += annualContribution;

    // In NRA DRIP, only net dividend is reinvested into shares
    const reinvestedShares = reinvest ? netDiv / startPrice : 0;
    const contributionShares = annualContribution / startPrice;
    shares += reinvestedShares + contributionShares;

    // Benchmark calculation (if 0% tax was withheld)
    const benchmarkReinvestedShares = reinvest ? (noTaxShares * startPrice * (yieldPct / 100)) / startPrice : 0;
    noTaxShares += benchmarkReinvestedShares + contributionShares;

    // Year-end price and dividend growth
    price *= 1 + input.priceGrowthPct / 100;
    yieldPct *= 1 + input.dividendGrowthPct / 100;

    yearly.push({
      year: y,
      startShares,
      sharePrice: startPrice,
      startBalance,
      grossDividend: grossDiv,
      taxWithheld,
      netDividend: netDiv,
      reinvestedShares,
      endShares: shares,
      endBalance: shares * price,
      cumulativeGrossDividends: totalGrossDividends,
      cumulativeTaxWithheld: totalTaxWithheld,
      cumulativeNetDividends: totalNetDividends,
    });
  }

  const finalValue = shares * price;
  const noTaxBenchmarkValue = noTaxShares * price;
  const taxDragDollars = Math.max(0, noTaxBenchmarkValue - finalValue);
  const taxDragPct = noTaxBenchmarkValue > 0 ? (taxDragDollars / noTaxBenchmarkValue) * 100 : 0;

  const finalAnnualGrossIncome = shares * price * (yieldPct / 100);
  const finalAnnualNetIncome = finalAnnualGrossIncome * (1 - taxRate);

  return {
    summary: {
      finalShares: shares,
      finalPrice: price,
      finalValue,
      totalInvested,
      totalGrossDividends,
      totalTaxWithheld,
      totalNetDividends,
      finalAnnualGrossIncome,
      finalAnnualNetIncome,
      noTaxBenchmarkValue,
      taxDragDollars,
      taxDragPct,
    },
    yearly,
  };
}
