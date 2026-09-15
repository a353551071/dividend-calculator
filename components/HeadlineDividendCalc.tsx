'use client';

import Calculator, { type CalcRow } from './Calculator';
import {
  dividendYield,
  dividendPerShareFromYield,
  futureDividend,
  monthlyDividendIncome,
  type DripInput,
} from '@/lib/dividend';
import { formatMoney, formatPercent, formatNumber } from '@/lib/format';
import DripResultsExtra from './DripResultsExtra';

const toInput = (v: Record<string, number>): DripInput => {
  const multiplier = v.frequency || 1;
  const annualDiv = v.dividend * multiplier;
  const yieldPct = v.price > 0 ? (annualDiv / v.price) * 100 : 0;
  return {
    initialInvestment: v.investment,
    price: v.price,
    dividendYieldPct: Number.isFinite(yieldPct) ? yieldPct : 0,
    dividendGrowthPct: v.growth,
    priceGrowthPct: v.priceGrowth ?? 5,
    monthlyContribution: v.monthly ?? 0,
    years: v.years,
  };
};

/** Homepage headline calculator: yield + future growth + monthly income + full DRIP compound table & chart. */
export default function HeadlineDividendCalc() {
  return (
    <Calculator
      fields={[
        { key: 'price', label: 'Current share price', prefix: '$', defaultValue: 100, help: 'Price per share (USD)' },
        { key: 'dividend', label: 'Dividend per share', prefix: '$', defaultValue: 4, help: 'Dividend amount per share per payout' },
        {
          key: 'frequency',
          label: 'Dividend payout frequency',
          defaultValue: 1,
          options: [
            { label: 'Annually (1x / year)', value: 1 },
            { label: 'Quarterly (4x / year — US standard)', value: 4 },
            { label: 'Monthly (12x / year — e.g. QQQI/JEPI)', value: 12 },
            { label: 'Semi-Annually (2x / year)', value: 2 },
          ],
          help: 'Select how often dividends are paid',
        },
        { key: 'growth', label: 'Dividend growth rate', suffix: '%', defaultValue: 5, help: 'Expected annual dividend growth' },
        { key: 'priceGrowth', label: 'Share price growth rate', suffix: '%', defaultValue: 5, help: 'Expected annual stock appreciation (0 = flat)' },
        { key: 'monthly', label: 'Monthly contribution', prefix: '$', defaultValue: 100, help: 'Optional recurring savings added every month (can be 0)' },
        { key: 'years', label: 'Years held', suffix: 'yrs', defaultValue: 10, step: 1 },
        { key: 'investment', label: 'Initial investment', prefix: '$', defaultValue: 10000, help: 'Initial capital invested' },
      ]}
      compute={(v): CalcRow[] => {
        const multiplier = v.frequency || 1;
        const annual = v.dividend * multiplier;
        const yieldPct = dividendYield({ annualDividendPerShare: annual, price: v.price });
        const dpsFuture = futureDividend({ currentDividend: annual, growthRatePct: v.growth, years: v.years });
        const monthIncome = monthlyDividendIncome({ investment: v.investment, dividendYieldPct: yieldPct });
        const yieldNow = dividendPerShareFromYield(v.price, yieldPct);
        return [
          { label: 'Current dividend yield', value: formatPercent(yieldPct), highlight: true },
          { label: 'Annual dividend per share (Year 1)', value: formatMoney(yieldNow) },
          { label: `Annual dividend per share (Year ${v.years})`, value: formatMoney(dpsFuture) },
          { label: `Initial monthly income on ${formatNumber(v.investment, 0)}`, value: formatMoney(monthIncome), highlight: true },
        ];
      }}
      kpis={(v) => {
        const multiplier = v.frequency || 1;
        const annual = v.dividend * multiplier;
        const yieldPct = dividendYield({ annualDividendPerShare: annual, price: v.price });
        const monthIncome = monthlyDividendIncome({ investment: v.investment, dividendYieldPct: yieldPct });
        return [
          { label: 'Current dividend yield', value: formatPercent(yieldPct) },
          { label: 'Monthly income', value: formatMoney(monthIncome), sub: `on ${formatNumber(v.investment, 0)}`, tone: 'green' as const },
        ];
      }}
      extra={(v) => <DripResultsExtra input={toInput(v)} />}
      footnote="Compounding simulation assumes dividends are reinvested at prevailing share prices. Yield on Cost highlights the growing return on your original principal over time."
    />
  );
}
