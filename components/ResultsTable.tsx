'use client';

import type { DripYearResult } from '@/lib/dividend';
import { formatMoney, formatNumber, formatPercent } from '@/lib/format';

interface ResultsTableProps {
  /** 逐年明细(来自 simulateDrip)。 */
  yearly: DripYearResult[];
  /** 可选空态文案。 */
  emptyText?: string;
}

/**
 * DRIP 逐年明细表 — 11 列完整对标 dripcalc。
 * 核心亮点: 单列 Yield on Cost 高亮呈现长期复利爬升效果。
 */
export default function ResultsTable({ yearly, emptyText }: ResultsTableProps) {
  if (!yearly.length) {
    return <p className="results-empty">{emptyText ?? 'Enter valid inputs to see the year-by-year breakdown.'}</p>;
  }

  return (
    <div className="results-table-wrap" role="region" aria-label="Year-by-year breakdown">
      <table className="results-table">
        <thead>
          <tr>
            <th>Year</th>
            <th>Start Balance</th>
            <th>Start Shares</th>
            <th>Share Price</th>
            <th>Div / Share</th>
            <th>Div Yield</th>
            <th className="col-yoc">Yield on Cost</th>
            <th>Annual Div</th>
            <th>Total Divs</th>
            <th>End Shares</th>
            <th>End Balance</th>
          </tr>
        </thead>
        <tbody>
          {yearly.map((r) => (
            <tr key={r.year}>
              <td>{r.year}</td>
              <td>{formatMoney(r.startBalance)}</td>
              <td>{formatNumber(r.startShares, 2)}</td>
              <td>{formatMoney(r.sharePrice)}</td>
              <td>{formatMoney(r.dividendPerShare)}</td>
              <td>{formatPercent(r.dividendYield)}</td>
              <td className="col-yoc">{formatPercent(r.yieldOnCost)}</td>
              <td>{formatMoney(r.annualDividend)}</td>
              <td>{formatMoney(r.cumulativeDividends)}</td>
              <td>{formatNumber(r.endShares, 2)}</td>
              <td>{formatMoney(r.endBalance)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
