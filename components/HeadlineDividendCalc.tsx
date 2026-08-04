'use client';

import Calculator, { type CalcRow } from './Calculator';
import {
  annualizeDividend,
  dividendYield,
  dividendPerShareFromYield,
  futureDividend,
  monthlyDividendIncome,
} from '@/lib/dividend';
import { formatMoney, formatPercent, formatNumber } from '@/lib/format';

/** Homepage headline calculator: yield + future growth + monthly income in one. */
export default function HeadlineDividendCalc() {
  return (
    <Calculator
      fields={[
        { key: 'price', label: 'Current share price', prefix: '$', defaultValue: 100, help: 'Price per share (USD)' },
        { key: 'dividend', label: 'Annual dividend per share', prefix: '$', defaultValue: 2, help: 'Annualized dividend; use the toggle if paid monthly' },
        { key: 'isMonthly', label: 'Dividend paid monthly', suffix: 'Yes=1', defaultValue: 0, step: 1, help: '1 = the dividend you entered is monthly (×12)' },
        { key: 'growth', label: 'Dividend growth rate', suffix: '%', defaultValue: 5, help: 'Expected annual dividend growth' },
        { key: 'years', label: 'Years held', suffix: 'yrs', defaultValue: 10, step: 1 },
        { key: 'investment', label: 'Amount to invest', prefix: '$', defaultValue: 10000, help: 'Total amount you plan to invest' },
      ]}
      compute={(v): CalcRow[] => {
        const annual = annualizeDividend(v.dividend, v.isMonthly >= 1);
        const yieldPct = dividendYield({ annualDividendPerShare: annual, price: v.price });
        const dpsFuture = futureDividend({ currentDividend: annual, growthRatePct: v.growth, years: v.years });
        const monthIncome = monthlyDividendIncome({ investment: v.investment, dividendYieldPct: yieldPct });
        const yieldNow = dividendPerShareFromYield(v.price, yieldPct);
        return [
          { label: 'Current dividend yield', value: formatPercent(yieldPct), highlight: true },
          { label: 'Annual dividend per share', value: formatMoney(yieldNow) },
          { label: `Annual dividend in ${v.years} yrs`, value: formatMoney(dpsFuture) },
          { label: `Monthly income on ${formatNumber(v.investment, 0)}`, value: formatMoney(monthIncome), highlight: true },
        ];
      }}
      footnote="Example: $100 price, $2 annual dividend → 2% yield. Yield plus growth drives long-term compounding — don't judge a stock on yield alone."
    />
  );
}
