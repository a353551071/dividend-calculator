'use client';

import Calculator, { type CalcRow } from './Calculator';
import { dripCalculator } from '@/lib/dividend';
import { formatMoney, formatNumber } from '@/lib/format';

interface TickerDripProps {
  /** Ticker symbol, e.g. "SCHD" / "QQQI". Drives labels and result rows. */
  ticker: string;
  defaultPrice: number;
  /** Annual dividend/distribution yield, % (e.g. 3.5). */
  defaultYield: number;
  /** Annual dividend growth rate, % (e.g. 10 for SCHD, 0 for QQQI). */
  defaultDivGrowth: number;
  /** Annual share-price growth assumption, %. */
  defaultPriceGrowth: number;
  /** Default monthly contribution. */
  defaultMonthly?: number;
  /** Projection horizon, years. */
  defaultYears?: number;
}

/**
 * Reusable per-ticker DRIP calculator.
 * Wraps the generic <Calculator> shell; the math lives in lib/dividend.ts
 * `dripCalculator()`. SCHD, QQQI and future per-ticker pages share this one
 * component — pass ticker-specific defaults via props.
 */
export default function TickerDripCalc({
  ticker,
  defaultPrice,
  defaultYield,
  defaultDivGrowth,
  defaultPriceGrowth,
  defaultMonthly = 100,
  defaultYears = 15,
}: TickerDripProps) {
  return (
    <Calculator
      fields={[
        { key: 'initial', label: 'Initial investment', prefix: '$', defaultValue: 10000, help: 'Buy amount in year one' },
        { key: 'price', label: `${ticker} share price`, prefix: '$', defaultValue: defaultPrice },
        { key: 'yield', label: `${ticker} annual yield`, suffix: '%', defaultValue: defaultYield, help: 'Current annual dividend / distribution yield' },
        { key: 'divGrowth', label: 'Yield growth rate', suffix: '%', defaultValue: defaultDivGrowth, help: `${ticker} historical growth (0 if distributions are flat)` },
        { key: 'priceGrowth', label: 'Share price growth', suffix: '%', defaultValue: defaultPriceGrowth, help: 'Annual price appreciation assumption' },
        { key: 'monthly', label: 'Monthly contribution', prefix: '$', defaultValue: defaultMonthly, help: 'Recurring investment, can be 0' },
        { key: 'years', label: 'Years', suffix: 'yrs', defaultValue: defaultYears, step: 1 },
      ]}
      compute={(v): CalcRow[] => {
        const r = dripCalculator({
          initialInvestment: v.initial, price: v.price, dividendYieldPct: v.yield,
          dividendGrowthPct: v.divGrowth, priceGrowthPct: v.priceGrowth,
          monthlyContribution: v.monthly, years: v.years,
        });
        const gain = r.finalValue - r.totalInvested;
        return [
          { label: 'Final portfolio value', value: formatMoney(r.finalValue), highlight: true },
          { label: 'Total invested', value: formatMoney(r.totalInvested) },
          { label: `Total ${ticker} distributions received`, value: formatMoney(r.totalDividends) },
          { label: 'Investment gain (value − invested)', value: formatMoney(gain) },
          { label: `Shares owned at end`, value: formatNumber(r.shares, 1) },
          { label: 'Final annual income', value: formatMoney(r.finalAnnualDividendIncome), highlight: true },
        ];
      }}
      footnote={`DRIP compounding for ${ticker}: distributions buy more shares, which pay more distributions next period. Growth rates are planning assumptions, not predictions.`}
    />
  );
}
