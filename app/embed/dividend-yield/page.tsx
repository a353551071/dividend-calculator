import type { Metadata } from 'next';
import DividendYieldCalc from '@/components/DividendYieldCalc';

export const metadata: Metadata = {
  title: 'Dividend Yield Calculator Widget',
  description: 'Free embeddable dividend yield calculator widget for financial blogs and websites.',
  robots: { index: false, follow: true },
};

export default function EmbedDividendYieldPage() {
  return (
    <div className="embed-widget-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>
          Dividend Yield Calculator
        </span>
        <span style={{ fontSize: '0.7rem', color: '#64748b' }}>
          Live 2026
        </span>
      </div>
      <DividendYieldCalc />
      <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px solid #f1f5f9', textAlign: 'center', fontSize: '0.75rem', color: '#64748b' }}>
        Free Widget by{' '}
        <a
          href="https://www.dividendpayoutcalculator.com"
          target="_blank"
          rel="noopener"
          style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}
        >
          DividendPayoutCalculator.com
        </a>
      </div>
    </div>
  );
}
