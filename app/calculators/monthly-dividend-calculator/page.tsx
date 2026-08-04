import type { Metadata } from 'next';
import Link from 'next/link';
import MonthlyIncomeCalc from '@/components/MonthlyIncomeCalc';
import FinanceNote from '@/components/FinanceNote';
import AdBanner from '@/components/AdBanner';

export const metadata: Metadata = {
  title: 'Monthly Dividend Income Calculator',
  description:
    'How much monthly passive income will your portfolio generate? Enter your investment and dividend yield to find out.',
};

export default function MonthlyDividendPage() {
  return (
    <>
      <h1>Monthly Dividend Income Calculator</h1>
      <p className="lead">
        Work backwards from your goal: enter the money you have invested and the dividend yield, and
        see exactly how much monthly passive income it generates.
      </p>

      <div className="card">
        <MonthlyIncomeCalc />
      </div>

      <FinanceNote />

      <AdBanner slot="monthly" />

      <div className="prose">
        <h2>How much do you need for $1,000/month?</h2>
        <p>
          At a 4% dividend yield, $1,000 a month of passive income needs roughly $300,000 invested. A
          higher yield lowers the bar, but an unusually high yield is often a sign of risk — check the{' '}
          <Link href="/calculators/dividend-payout-ratio-calculator">payout ratio</Link> before
          chasing it.
        </p>
        <h2>Related calculators</h2>
        <p>
          <Link href="/">Dividend Calculator</Link> ·{' '}
          <Link href="/calculators/drip-calculator">DRIP Calculator</Link> ·{' '}
          <Link href="/calculators/dividend-yield-calculator">Dividend Yield Calculator</Link>
        </p>
      </div>
    </>
  );
}
