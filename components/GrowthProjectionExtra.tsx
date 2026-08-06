'use client';

import { cumulativeDividends, futureDividend } from '@/lib/dividend';
import { formatMoney, formatPercent } from '@/lib/format';
import ResultsChart from './ResultsChart';

interface GrowthProjectionExtraProps {
  currentDividend: number;
  growthRatePct: number;
  years: number;
}

/**
 * 股息增长逐年投影:每股年股息(DPS)+ 累计股息,柱状图 + 明细表。
 * 复用 lib/dividend 的 futureDividend / cumulativeDividends。
 */
export default function GrowthProjectionExtra({ currentDividend, growthRatePct, years }: GrowthProjectionExtraProps) {
  const n = Math.max(1, Math.floor(years));
  if (currentDividend < 0 || growthRatePct < -100 || n > 60) {
    return <p className="results-empty">Enter valid inputs to see the projection.</p>;
  }

  const labels: number[] = [];
  const dps: number[] = [];
  const cum: number[] = [];
  for (let y = 1; y <= n; y++) {
    labels.push(y);
    dps.push(futureDividend({ currentDividend, growthRatePct, years: y }));
    cum.push(cumulativeDividends({ currentDividend, growthRatePct, years: y }));
  }

  return (
    <>
      <div>
        <h3 className="results-title">Dividend per share, projected</h3>
        <ResultsChart
          labels={labels}
          series={[
            { label: 'Div / share', color: '#2563eb', values: dps },
            { label: 'Cumulative', color: '#10b981', values: cum },
          ]}
        />
      </div>
      <div className="results-table-wrap">
        <table className="results-table">
          <thead>
            <tr>
              <th>Year</th>
              <th>Div / share</th>
              <th>YoY growth</th>
              <th>Cumulative</th>
            </tr>
          </thead>
          <tbody>
            {labels.map((yr, i) => (
              <tr key={yr}>
                <td>{yr}</td>
                <td>{formatMoney(dps[i])}</td>
                <td>{i === 0 ? '—' : formatPercent(((dps[i] / dps[i - 1]) - 1) * 100)}</td>
                <td>{formatMoney(cum[i])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
