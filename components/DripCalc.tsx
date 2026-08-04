'use client';

import Calculator, { type CalcRow } from './Calculator';
import { dripCalculator } from '@/lib/dividend';
import { formatMoney, formatNumber } from '@/lib/format';

/** DRIP / 股息再投资计算器:逐年复利模拟。 */
export default function DripCalc() {
  return (
    <Calculator
      fields={[
        { key: 'initial', label: '初始投入', prefix: '$', defaultValue: 10000, help: '第一年买入金额' },
        { key: 'price', label: '当前股价', prefix: '$', defaultValue: 100 },
        { key: 'yield', label: '年股息率', suffix: '%', defaultValue: 4, help: '初始买入时的股息率' },
        { key: 'divGrowth', label: '股息年增长率', suffix: '%', defaultValue: 5 },
        { key: 'priceGrowth', label: '股价年增长率', suffix: '%', defaultValue: 5, help: '0=股价不变,只吃股息' },
        { key: 'monthly', label: '每月追加投入', prefix: '$', defaultValue: 100, help: '定投,可为 0' },
        { key: 'years', label: '年数', suffix: '年', defaultValue: 15, step: 1 },
      ]}
      compute={(v): CalcRow[] => {
        const r = dripCalculator({
          initialInvestment: v.initial, price: v.price, dividendYieldPct: v.yield,
          dividendGrowthPct: v.divGrowth, priceGrowthPct: v.priceGrowth,
          monthlyContribution: v.monthly, years: v.years,
        });
        const gain = r.finalValue - r.totalInvested;
        return [
          { label: `期末组合市值`, value: formatMoney(r.finalValue), highlight: true },
          { label: '累计投入本金', value: formatMoney(r.totalInvested) },
          { label: '累计收到股息', value: formatMoney(r.totalDividends) },
          { label: '投资回报(市值−本金)', value: formatMoney(gain) },
          { label: '期末股份数', value: formatNumber(r.shares, 1) },
          { label: `期末年股息收入`, value: formatMoney(r.finalAnnualDividendIncome), highlight: true },
        ];
      }}
      footnote="DRIP 的精髓:股息再投资 → 股份增加 → 下年股息更多,复利滚雪球。股息增长率 + 定投比单纯高股息率更关键。"
    />
  );
}
