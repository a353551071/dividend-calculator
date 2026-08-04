import type { Metadata } from 'next';
import Link from 'next/link';
import PayoutRatioCalc from '@/components/PayoutRatioCalc';
import FinanceNote from '@/components/FinanceNote';
import AdBanner from '@/components/AdBanner';

export const metadata: Metadata = {
  title: 'Dividend Payout Ratio Calculator',
  description:
    'Check if a dividend is sustainable: calculate the payout ratio (dividends ÷ earnings) and understand what the number means.',
};

export default function PayoutRatioPage() {
  return (
    <>
      <h1>Dividend Payout Ratio Calculator</h1>
      <p className="lead">
        The payout ratio measures how much of a company&apos;s earnings it hands back as dividends. It
        is the first thing to check before trusting a dividend.
      </p>

      <div className="card">
        <PayoutRatioCalc />
      </div>

      <FinanceNote />

      <AdBanner slot="payout" />

      <div className="prose">
        <h2>What the number means</h2>
        <ul>
          <li><strong>Below 30%</strong> — low: the company retains most earnings, so dividends have room to grow.</li>
          <li><strong>30–60%</strong> — healthy: meaningful payout with room to reinvest.</li>
          <li><strong>60–100%</strong> — high: little room for growth; a cut could hurt.</li>
          <li><strong>Above 100%</strong> — the company is paying out more than it earns, often funded by debt or cash reserves. Usually unsustainable.</li>
        </ul>
        <h2>Related calculators</h2>
        <p>
          <Link href="/">Dividend Calculator</Link> ·{' '}
          <Link href="/calculators/dividend-yield-calculator">Dividend Yield Calculator</Link> ·{' '}
          <Link href="/calculators/dividend-growth-calculator">Dividend Growth Calculator</Link>
        </p>
      </div>
    </>
  );
}
