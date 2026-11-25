'use client';

import Calculator, { type CalcRow } from './Calculator';
import { formatMoney, formatNumber } from '@/lib/format';

/** Simple Dividend Calculator:
 * Instant dividend payout estimation: Total Investment + Dividend Yield + Share Price.
 */
export default function SimpleDividendCalc() {
  return (
    <Calculator
      fields={[
        { key: 'investment', label: 'Total Investment', prefix: '$', defaultValue: 10000, help: 'Total dollar amount invested or portfolio value' },
        { key: 'yield', label: 'Dividend Yield', suffix: '%', defaultValue: 4.5, help: 'Annual dividend yield percentage' },
        { key: 'price', label: 'Current Share Price (optional)', prefix: '$', defaultValue: 100, help: 'Used to calculate share count & dividend per share' },
      ]}
      compute={(v): CalcRow[] => {
        const annualIncome = v.investment * (v.yield / 100);
        const monthlyIncome = annualIncome / 12;
        const dailyIncome = annualIncome / 365;
        const shares = v.price > 0 ? v.investment / v.price : 0;
        const dps = v.price > 0 ? v.price * (v.yield / 100) : 0;

        return [
          { label: 'Annual Dividend Income', value: formatMoney(annualIncome), highlight: true },
          { label: 'Monthly Dividend Income', value: formatMoney(monthlyIncome) },
          { label: 'Daily Dividend Income', value: formatMoney(dailyIncome) },
          { label: 'Estimated Shares Owned', value: formatNumber(shares, 2) },
          { label: 'Annual Dividend Per Share', value: formatMoney(dps) },
        ];
      }}
      footnote="Simple calculation: Annual Dividend Income = Investment × (Dividend Yield ÷ 100). Monthly = Annual ÷ 12. Daily = Annual ÷ 365."
    />
  );
}
