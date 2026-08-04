'use client';

import Calculator, { type CalcRow } from './Calculator';
import { futureDividend, cumulativeDividends } from '@/lib/dividend';
import { formatMoney } from '@/lib/format';

/** 股息增长计算器:未来股息 + 累计收益。 */
export default function DividendGrowthCalc() {
  return (
    <Calculator
      fields={[
        { key: 'dividend', label: '当前每股年股息', prefix: '$', defaultValue: 2, help: 'D0(美元)' },
        { key: 'growth', label: '年股息增长率', suffix: '%', defaultValue: 8, help: '历史股息复合增长率' },
        { key: 'years', label: '年数', suffix: '年', defaultValue: 10, step: 1 },
      ]}
      compute={(v): CalcRow[] => {
        const input = { currentDividend: v.dividend, growthRatePct: v.growth, years: v.years };
        return [
          { label: `${v.years} 年后每股年股息`, value: formatMoney(futureDividend(input)), highlight: true },
          { label: `${v.years} 年累计每股股息`, value: formatMoney(cumulativeDividends(input)) },
          { label: '股息翻倍所需年数(72法则)', value: `${v.growth > 0 ? Math.ceil(72 / v.growth) : '—'} 年` },
        ];
      }}
      footnote="股息复合增长是长期财富的核心。例:D0=$2、年增 8%,10 年后每股年息 ≈ $4.32(翻倍以上)。"
    />
  );
}
