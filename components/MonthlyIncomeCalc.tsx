'use client';

import Calculator, { type CalcRow } from './Calculator';
import { monthlyDividendIncome } from '@/lib/dividend';
import { formatMoney, formatPercent } from '@/lib/format';

/** 月股息收入计算器:本金 × 年收益率 ÷ 12。 */
export default function MonthlyIncomeCalc() {
  return (
    <Calculator
      fields={[
        { key: 'investment', label: '投入本金', prefix: '$', defaultValue: 50000, help: '总投入金额' },
        { key: 'yield', label: '年股息率', suffix: '%', defaultValue: 4 },
        { key: 'growth', label: '股息年增长率', suffix: '%', defaultValue: 0, help: '0=只看当前月收入' },
        { key: 'years', label: '持有年数', suffix: '年', defaultValue: 0, step: 1, help: '0=不预测未来' },
      ]}
      compute={(v): CalcRow[] => {
        const now = monthlyDividendIncome({ investment: v.investment, dividendYieldPct: v.yield });
        let future = now;
        if (v.years > 0 && v.growth > 0) {
          const futureYield = v.yield * Math.pow(1 + v.growth / 100, v.years);
          future = monthlyDividendIncome({ investment: v.investment, dividendYieldPct: futureYield });
        }
        return [
          { label: '当前月股息收入', value: formatMoney(now), highlight: true },
          { label: '年股息收入', value: formatMoney(now * 12) },
          ...(v.years > 0 ? [{ label: `${v.years} 年后月股息收入`, value: formatMoney(future) }] : []),
        ];
      }}
      footnote="要达到 $1,000/月被动收入,按 4% 股息率需要 $300,000 本金;靠股息增长率能显著缩短进程。"
    />
  );
}
