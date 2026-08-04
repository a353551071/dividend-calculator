import type { Metadata } from 'next';
import Link from 'next/link';
import DripCalc from '@/components/DripCalc';
import FinanceNote from '@/components/FinanceNote';
import AdBanner from '@/components/AdBanner';

export const metadata: Metadata = {
  title: 'DRIP Calculator — Dividend Reinvestment',
  description:
    'Simulate a Dividend Reinvestment Plan: see how reinvesting dividends compounds your portfolio value, shares and annual income over time.',
};

export default function DripPage() {
  return (
    <>
      <h1>DRIP Calculator (Dividend Reinvestment)</h1>
      <p className="lead">
        A DRIP automatically buys more shares with your dividends — so next year&apos;s dividends are
        paid on more shares. This calculator simulates that compounding year by year.
      </p>

      <div className="card">
        <DripCalc />
      </div>

      <FinanceNote />

      <AdBanner slot="drip" />

      <div className="prose">
        <h2>Why reinvest dividends?</h2>
        <p>
          Take a $10,000 position at 4% yield with 5% dividend growth and a $100 monthly contribution.
          After 15 years you own far more than what you put in — and your <em>annual dividend income</em>{' '}
          from those reinvested shares keeps rising even if the stock price stalls.
        </p>
        <p>
          A note on growth rates: dividend growth compounds, so small differences add up. This tool is
          a planning estimate, not a prediction.
        </p>
        <h2>Related calculators</h2>
        <p>
          <Link href="/">Dividend Calculator</Link> ·{' '}
          <Link href="/calculators/monthly-dividend-calculator">Monthly Dividend Income Calculator</Link> ·{' '}
          <Link href="/calculators/dividend-growth-calculator">Dividend Growth Calculator</Link>
        </p>
      </div>
    </>
  );
}
