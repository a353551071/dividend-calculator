'use client';

import Calculator, { type CalcRow } from './Calculator';
import {
  annualizeDividend,
  dividendYield,
  dividendPerShareFromYield,
  futureDividend,
  monthlyDividendIncome,
} from '@/lib/dividend';
import { formatMoney, formatPercent, formatNumber } from '@/lib/format';

/** 首页头词计算器:综合「收益率 + 未来增长 + 月收入」一体。 */
export default function HeadlineDividendCalc() {
  return (
    <Calculator
      fields={[
        { key: 'price', label: '当前股价', prefix: '$', defaultValue: 100, help: '每股价格(美元)' },
        { key: 'dividend', label: '每股年股息', prefix: '$', defaultValue: 2, help: '年化每股股息;若按月付请用下方开关' },
        { key: 'isMonthly', label: '按月付股息', suffix: '是=1', defaultValue: 0, step: 1, help: '1=输入的是每月股息,将 ×12' },
        { key: 'growth', label: '股息年增长率', suffix: '%', defaultValue: 5, help: '预计每年股息增长百分比' },
        { key: 'years', label: '持有年数', suffix: '年', defaultValue: 10, step: 1 },
        { key: 'investment', label: '投入本金', prefix: '$', defaultValue: 10000, help: '想投入的总金额' },
      ]}
      compute={(v): CalcRow[] => {
        const annual = annualizeDividend(v.dividend, v.isMonthly >= 1);
        const yieldPct = dividendYield({ annualDividendPerShare: annual, price: v.price });
        const dpsFuture = futureDividend({ currentDividend: annual, growthRatePct: v.growth, years: v.years });
        const monthIncome = monthlyDividendIncome({ investment: v.investment, dividendYieldPct: yieldPct });
        const yieldNow = dividendPerShareFromYield(v.price, yieldPct);
        return [
          { label: '当前股息率', value: formatPercent(yieldPct), highlight: true },
          { label: '每股年股息', value: formatMoney(yieldNow) },
          { label: `${v.years} 年后每股年股息`, value: formatMoney(dpsFuture) },
          { label: `月股息收入(本金 ${formatNumber(v.investment, 0)})`, value: formatMoney(monthIncome), highlight: true },
        ];
      }}
      footnote="示例:股价 $100、年息 $2 → 股息率 2%。股息率 + 增长决定长期复利,别只看单年。"
    />
  );
}
