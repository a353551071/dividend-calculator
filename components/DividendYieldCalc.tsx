'use client';

import Calculator, { type CalcRow } from './Calculator';
import { annualizeDividend, dividendYield, dividendPerShareFromYield } from '@/lib/dividend';
import { formatMoney, formatPercent } from '@/lib/format';

/** Dividend yield calculator: annual dividend per share ÷ share price. */
export default function DividendYieldCalc() {
  return (
    <Calculator
      fields={[
        { key: 'price', label: 'Current share price', prefix: '$', defaultValue: 120, help: 'Price per share (USD)' },
        { key: 'dividend', label: 'Annual dividend per share', prefix: '$', defaultValue: 3, help: 'Annualized dividend per share' },
        { key: 'isMonthly', label: 'Dividend paid monthly', suffix: 'Yes=1', defaultValue: 0, step: 1, help: '1 = the dividend you entered is monthly' },
      ]}
      compute={(v): CalcRow[] => {
        const annual = annualizeDividend(v.dividend, v.isMonthly >= 1);
        const y = dividendYield({ annualDividendPerShare: annual, price: v.price });
        return [
          { label: 'Dividend yield', value: formatPercent(y), highlight: true },
          { label: 'Annual dividend per share', value: formatMoney(annual) },
          { label: 'Monthly dividend per share', value: formatMoney(annual / 12) },
        ];
      }}
      footnote="Dividend yield = annualized dividend per share ÷ share price. At the same dividend, a lower price means a higher buying yield."
    />
  );
}
