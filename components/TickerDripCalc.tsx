'use client';

import Calculator, { type CalcRow } from './Calculator';
import { dripCalculator } from '@/lib/dividend';
import { formatMoney, formatNumber } from '@/lib/format';
import DripResultsExtra from './DripResultsExtra';

const toInput = (v: Record<string, number>) => ({
  initialInvestment: v.initial, price: v.price, dividendYieldPct: v.yield,
  dividendGrowthPct: v.divGrowth, priceGrowthPct: v.priceGrowth,
  monthlyContribution: v.monthly, years: v.years,
});

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
  /** 默认值出处透明化(NN/g 计算器准则 #4):一行 as-of 说明,由页面(server 侧)生成传入。 */
  prefillNote?: string;
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
  prefillNote,
}: TickerDripProps) {
  return (
    <>
      {prefillNote && <p className="calc-prefill-note">{prefillNote}</p>}
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
        const r = dripCalculator(toInput(v));
        const gain = r.finalValue - r.totalInvested;
        return [
          { label: 'Final portfolio value', value: formatMoney(r.finalValue), highlight: true },
          { label: 'Total invested', value: formatMoney(r.totalInvested) },
          { label: `Total ${ticker} distributions received`, value: formatMoney(r.totalDividends) },
          { label: 'Investment gain (value − invested)', value: formatMoney(gain) },
          { label: 'Shares owned at end', value: formatNumber(r.shares, 1) },
          { label: 'Final annual income', value: formatMoney(r.finalAnnualDividendIncome), highlight: true },
        ];
      }}
      kpis={(v) => {
        const r = dripCalculator(toInput(v));
        return [
          { label: 'Final portfolio value', value: formatMoney(r.finalValue) },
          { label: `Total ${ticker} distributions`, value: formatMoney(r.totalDividends), tone: 'green' as const },
          { label: 'Final annual income', value: formatMoney(r.finalAnnualDividendIncome), sub: formatMoney(r.finalAnnualDividendIncome / 12) + '/mo', tone: 'green' as const },
        ];
      }}
      extra={(v) => <DripResultsExtra input={toInput(v)} />}
      footnote={`DRIP compounding for ${ticker}: distributions buy more shares, which pay more distributions next period. Growth rates are planning assumptions, not predictions.`}
    />
    </>
  );
}
