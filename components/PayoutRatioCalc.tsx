'use client';

import Calculator, { type CalcRow } from './Calculator';
import { payoutRatio } from '@/lib/dividend';
import { formatPercent } from '@/lib/format';
import PayoutGauge from './PayoutGauge';

/** Dividend payout ratio calculator: dividends ÷ earnings, checks sustainability. */
export default function PayoutRatioCalc() {
  return (
    <Calculator
      fields={[
        { key: 'dps', label: 'Dividend per share', prefix: '$', defaultValue: 2, help: 'DPS — annual cash dividend per share' },
        { key: 'eps', label: 'Earnings per share', prefix: '$', defaultValue: 4, help: 'EPS — net income ÷ shares outstanding' },
      ]}
      compute={(v): CalcRow[] => {
        const ratio = payoutRatio({ dividendPerShare: v.dps, earningsPerShare: v.eps });
        let verdict = '—';
        if (!Number.isNaN(ratio)) {
          if (ratio > 100) verdict = '⚠️ Pays out more than it earns — usually unsustainable';
          else if (ratio > 75) verdict = 'High: little room for dividend growth';
          else if (ratio > 35) verdict = 'Healthy: balances payout and reinvestment';
          else verdict = 'Low: most earnings retained, dividends may grow fast';
        }
        return [
          { label: 'Dividend payout ratio', value: formatPercent(ratio), highlight: true },
          { label: 'Retention ratio (reinvested)', value: formatPercent(100 - ratio) },
          { label: 'Verdict', value: verdict },
        ];
      }}
      extra={(v) => {
        const ratio = payoutRatio({ dividendPerShare: v.dps, earningsPerShare: v.eps });
        return <PayoutGauge ratio={ratio} />;
      }}
      footnote="A payout ratio above 100% means the company pays out more than it earns — usually funded by debt or reserves. 35–75% is typically the healthiest range."
    />
  );
}
