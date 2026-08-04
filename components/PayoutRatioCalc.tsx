'use client';

import Calculator, { type CalcRow } from './Calculator';
import { payoutRatio } from '@/lib/dividend';
import { formatPercent } from '@/lib/format';

/** 股息支付率计算器:股息 ÷ 盈利,判断可持续性。 */
export default function PayoutRatioCalc() {
  return (
    <Calculator
      fields={[
        { key: 'dps', label: '每股年股息', prefix: '$', defaultValue: 2, help: 'DPS' },
        { key: 'eps', label: '每股收益', prefix: '$', defaultValue: 4, help: 'EPS(净利润/股本)' },
      ]}
      compute={(v): CalcRow[] => {
        const ratio = payoutRatio({ dividendPerShare: v.dps, earningsPerShare: v.eps });
        let verdict = '—';
        if (!Number.isNaN(ratio)) {
          if (ratio > 100) verdict = '⚠️ 股息超过盈利,不可持续(可能借钱发息)';
          else if (ratio > 70) verdict = '偏高:派息空间有限,增长可能放缓';
          else if (ratio > 30) verdict = '健康:留足再投资空间';
          else verdict = '低:大量利润留存,股息可能快速增长';
        }
        return [
          { label: '股息支付率', value: formatPercent(ratio), highlight: true },
          { label: '留存率(再投资比例)', value: formatPercent(100 - ratio) },
          { label: '判断', value: verdict },
        ];
      }}
      footnote="支付率 > 100% 意味着公司用借债/存量现金发息,长期不可持续;30-60% 通常最健康。"
    />
  );
}
