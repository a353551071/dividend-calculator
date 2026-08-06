'use client';

import { formatMoney } from '@/lib/format';
import ResultsChart from './ResultsChart';

interface MonthlyProjectionExtraProps {
  investment: number;
  yieldPct: number;
  growthPct: number;
  years: number;
}

/**
 * 月度股息收入逐年投影(仅当 years>0 且 growth>0 时有意义)。
 * 复用 lib/dividend 的月收入公式按年推进。
 */
export default function MonthlyProjectionExtra({ investment, yieldPct, growthPct, years }: MonthlyProjectionExtraProps) {
  const n = Math.floor(years);
  if (n <= 0 || investment < 0 || yieldPct < 0) {
    return null;
  }

  const labels: number[] = [];
  const monthly: number[] = [];
  for (let y = 0; y <= n; y++) {
    const effYield = yieldPct * Math.pow(1 + growthPct / 100, y);
    const m = (investment * (effYield / 100)) / 12;
    labels.push(y);
    monthly.push(m);
  }

  return (
    <div>
      <h3 className="results-title">Monthly income over {n} years</h3>
      <ResultsChart
        labels={labels}
        series={[{ label: 'Monthly income', color: '#2563eb', values: monthly }]}
      />
      <p className="calc-footnote">
        Year {n} monthly income: <strong>{formatMoney(monthly[n])}</strong> · annual{' '}
        <strong>{formatMoney(monthly[n] * 12)}</strong>
      </p>
    </div>
  );
}
