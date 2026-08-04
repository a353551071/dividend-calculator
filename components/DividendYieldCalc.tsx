'use client';

import Calculator, { type CalcRow } from './Calculator';
import { annualizeDividend, dividendYield, dividendPerShareFromYield } from '@/lib/dividend';
import { formatMoney, formatPercent } from '@/lib/format';

/** 股息率计算器:每股年息 ÷ 股价。 */
export default function DividendYieldCalc() {
  return (
    <Calculator
      fields={[
        { key: 'price', label: '当前股价', prefix: '$', defaultValue: 120, help: '每股价格(美元)' },
        { key: 'dividend', label: '每股年股息', prefix: '$', defaultValue: 3, help: '年化每股股息' },
        { key: 'isMonthly', label: '按月付股息', suffix: '是=1', defaultValue: 0, step: 1, help: '1=输入的是每月股息' },
      ]}
      compute={(v): CalcRow[] => {
        const annual = annualizeDividend(v.dividend, v.isMonthly >= 1);
        const y = dividendYield({ annualDividendPerShare: annual, price: v.price });
        return [
          { label: '股息率', value: formatPercent(y), highlight: true },
          { label: '年化每股股息', value: formatMoney(annual) },
          { label: '月股息/股', value: formatMoney(annual / 12) },
        ];
      }}
      footnote="股息率 = 年化每股股息 ÷ 股价。同股息的股票股价越低,买入时的股息率越高。"
    />
  );
}
