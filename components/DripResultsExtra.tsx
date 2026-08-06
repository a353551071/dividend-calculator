'use client';

import { simulateDrip, type DripInput } from '@/lib/dividend';
import ResultsTable from './ResultsTable';
import ResultsChart from './ResultsChart';

interface DripResultsExtraProps {
  input: DripInput;
}

/**
 * DRIP 逐年明细表 + DRIP-vs-取现 分组柱状图。
 * 由 DripCalc / TickerDripCalc 共享,simulateDrip 跑两遍(reinvest true/false)做对比。
 */
export default function DripResultsExtra({ input }: DripResultsExtraProps) {
  const drip = simulateDrip(input, true);
  const cash = simulateDrip(input, false);
  if (!drip.yearly.length) {
    return <ResultsTable yearly={[]} />;
  }

  const labels = drip.yearly.map((r) => r.year);
  const annualContribution = input.monthlyContribution * 12;
  const invested = drip.yearly.map(
    (r) => input.initialInvestment + annualContribution * r.year
  );

  return (
    <>
      <div>
        <h3 className="results-title">Year-by-year breakdown (with DRIP)</h3>
        <ResultsTable yearly={drip.yearly} />
      </div>
      <div>
        <h3 className="results-title">With DRIP vs taking cash</h3>
        <ResultsChart
          labels={labels}
          series={[
            { label: 'With DRIP', color: '#2563eb', values: drip.yearly.map((r) => r.endBalance) },
            { label: 'Take cash', color: '#f59e0b', values: cash.yearly.map((r) => r.endBalance) },
            { label: 'Invested', color: '#94a3b8', values: invested },
          ]}
        />
      </div>
    </>
  );
}
