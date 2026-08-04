'use client';

import Calculator, { type CalcRow } from './Calculator';
import { dripCalculator } from '@/lib/dividend';
import { formatMoney, formatNumber } from '@/lib/format';

/** DRIP / dividend reinvestment calculator: year-by-year compounding simulation. */
export default function DripCalc() {
  return (
    <Calculator
      fields={[
        { key: 'initial', label: 'Initial investment', prefix: '$', defaultValue: 10000, help: 'Buy amount in year one' },
        { key: 'price', label: 'Current share price', prefix: '$', defaultValue: 100 },
        { key: 'yield', label: 'Annual dividend yield', suffix: '%', defaultValue: 4, help: 'Yield at your initial purchase' },
        { key: 'divGrowth', label: 'Dividend growth rate', suffix: '%', defaultValue: 5 },
        { key: 'priceGrowth', label: 'Share price growth rate', suffix: '%', defaultValue: 5, help: '0 = flat price, dividends only' },
        { key: 'monthly', label: 'Monthly contribution', prefix: '$', defaultValue: 100, help: 'Recurring investment, can be 0' },
        { key: 'years', label: 'Years', suffix: 'yrs', defaultValue: 15, step: 1 },
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
          { label: 'Total dividends received', value: formatMoney(r.totalDividends) },
          { label: 'Investment gain (value − invested)', value: formatMoney(gain) },
          { label: 'Shares owned at end', value: formatNumber(r.shares, 1) },
          { label: 'Final annual dividend income', value: formatMoney(r.finalAnnualDividendIncome), highlight: true },
        ];
      }}
      footnote="DRIP compounding: dividends buy more shares, which pay more dividends next year. Dividend growth plus regular contributions beat a high starting yield."
    />
  );
}
