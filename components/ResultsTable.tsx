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
 * DRIP 逐年明细表 — 对标 dripcalc 的逐年表。
 * 复用 simulateDrip 输出 + lib/format,零新依赖。
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
            <th>Shares</th>
            <th>Price</th>
            <th>Div / share</th>
            <th>Annual Div</th>
            <th>Yield on Cost</th>
            <th>End Balance</th>
          </tr>
        </thead>
        <tbody>
          {yearly.map((r) => (
            <tr key={r.year}>
              <td>{r.year}</td>
              <td>{formatMoney(r.startBalance)}</td>
              <td>{formatNumber(r.endShares, 2)}</td>
              <td>{formatMoney(r.sharePrice)}</td>
              <td>{formatMoney(r.dividendPerShare)}</td>
              <td>{formatMoney(r.annualDividend)}</td>
              <td>{formatPercent(r.yieldOnCost)}</td>
              <td>{formatMoney(r.endBalance)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
