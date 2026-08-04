import type { Metadata } from 'next';
import Link from 'next/link';
import DividendYieldCalc from '@/components/DividendYieldCalc';
import FinanceNote from '@/components/FinanceNote';
import AdBanner from '@/components/AdBanner';

export const metadata: Metadata = {
  title: 'Dividend Yield Calculator',
  description:
    'Calculate dividend yield instantly: annual dividend per share ÷ current share price. Free, no sign-up, works for any stock.',
};

export default function DividendYieldPage() {
  return (
    <>
      <h1>Dividend Yield Calculator</h1>
      <p className="lead">
        Dividend yield is the annual dividend per share divided by the current share price. It tells
        you the cash return you earn per dollar invested.
      </p>

      <div className="card">
        <DividendYieldCalc />
      </div>

      <FinanceNote />

      <AdBanner slot="yield" />

      <div className="prose">
        <h2>How to use this tool</h2>
        <ul>
          <li>Enter the current share price and the annual dividend per share.</li>
          <li>If the stock pays monthly dividends, switch to the monthly option — the tool annualizes it.</li>
          <li>Compare the yield against its own history: a yield far above the average is often a warning, not an opportunity.</li>
        </ul>
        <h2>Related calculators</h2>
        <p>
          <Link href="/calculators/dividend-growth-calculator">Dividend Growth Calculator</Link> ·{' '}
          <Link href="/calculators/drip-calculator">DRIP Calculator</Link> ·{' '}
          <Link href="/calculators/monthly-dividend-calculator">Monthly Dividend Income Calculator</Link> ·{' '}
          <Link href="/calculators/dividend-payout-ratio-calculator">Payout Ratio Calculator</Link>
        </p>
      </div>
    </>
  );
}
