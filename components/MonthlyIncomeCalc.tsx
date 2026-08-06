'use client';

import Calculator, { type CalcRow } from './Calculator';
import { monthlyDividendIncome } from '@/lib/dividend';
import { formatMoney } from '@/lib/format';
import MonthlyProjectionExtra from './MonthlyProjectionExtra';

/** Monthly dividend income calculator: investment × annual yield ÷ 12. */
export default function MonthlyIncomeCalc() {
  return (
    <Calculator
      fields={[
        { key: 'investment', label: 'Investment amount', prefix: '$', defaultValue: 50000, help: 'Total amount invested' },
        { key: 'yield', label: 'Annual dividend yield', suffix: '%', defaultValue: 4, help: 'e.g. SCHD ~3.5%, JEPI ~7%' },
        { key: 'growth', label: 'Dividend growth rate', suffix: '%', defaultValue: 0, help: '0 = current income only' },
        { key: 'years', label: 'Years held', suffix: 'yrs', defaultValue: 0, step: 1, help: '0 = no projection' },
      ]}
      compute={(v): CalcRow[] => {
        const now = monthlyDividendIncome({ investment: v.investment, dividendYieldPct: v.yield });
        let future = now;
        if (v.years > 0 && v.growth > 0) {
          const futureYield = v.yield * Math.pow(1 + v.growth / 100, v.years);
          future = monthlyDividendIncome({ investment: v.investment, dividendYieldPct: futureYield });
        }
        return [
          { label: 'Current monthly dividend income', value: formatMoney(now), highlight: true },
          { label: 'Annual dividend income', value: formatMoney(now * 12) },
          ...(v.years > 0 ? [{ label: `Monthly income in ${v.years} yrs`, value: formatMoney(future) }] : []),
        ];
      }}
      extra={(v) =>
        v.years > 0 && v.growth > 0 ? (
          <MonthlyProjectionExtra investment={v.investment} yieldPct={v.yield} growthPct={v.growth} years={v.years} />
        ) : null
      }
      footnote="$1,000 a month of passive income at 4% yield needs roughly $300,000 invested; dividend growth can shorten the path significantly."
    />
  );
}
