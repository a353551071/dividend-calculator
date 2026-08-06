'use client';

import Calculator, { type CalcRow } from './Calculator';
import { futureDividend, cumulativeDividends } from '@/lib/dividend';
import { formatMoney } from '@/lib/format';
import GrowthProjectionExtra from './GrowthProjectionExtra';

/** Dividend growth calculator: future dividend + cumulative income. */
export default function DividendGrowthCalc() {
  return (
    <Calculator
      fields={[
        { key: 'dividend', label: 'Current annual dividend per share', prefix: '$', defaultValue: 2, help: 'D0 — what one share pays today' },
        { key: 'growth', label: 'Annual dividend growth rate', suffix: '%', defaultValue: 8, help: 'e.g. SCHD ~10%, JNJ ~6%' },
        { key: 'years', label: 'Number of years', suffix: 'yrs', defaultValue: 10, step: 1 },
      ]}
      compute={(v): CalcRow[] => {
        const input = { currentDividend: v.dividend, growthRatePct: v.growth, years: v.years };
        return [
          { label: `Annual dividend in ${v.years} yrs`, value: formatMoney(futureDividend(input)), highlight: true },
          { label: `Cumulative dividends in ${v.years} yrs`, value: formatMoney(cumulativeDividends(input)) },
          { label: 'Years to double (Rule of 72)', value: `${v.growth > 0 ? Math.ceil(72 / v.growth) : '—'} yrs` },
        ];
      }}
      extra={(v) => <GrowthProjectionExtra currentDividend={v.dividend} growthRatePct={v.growth} years={v.years} />}
      footnote="Dividend growth compounds. Example: D0 = $2 at 8% annual growth → $4.32 per share in 10 years (more than double)."
    />
  );
}
