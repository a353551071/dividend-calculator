import type { Metadata } from 'next';
import Link from 'next/link';
import DividendGrowthCalc from '@/components/DividendGrowthCalc';
import FinanceNote from '@/components/FinanceNote';
import AdBanner from '@/components/AdBanner';
import { webAppJsonLd, breadcrumbJsonLd } from '@/lib/schema';

const PATH = '/calculators/dividend-growth-calculator';

export const metadata: Metadata = {
  title: 'Dividend Growth Calculator 2026',
  description:
    'Project future dividend income with a compound annual growth rate. See what a dividend will pay in 10 or 20 years.',
  alternates: { canonical: PATH },
};

export default function DividendGrowthPage() {
  return (
    <>
      <h1>Dividend Growth Calculator</h1>
      <p className="lead">
        Dividend growth is the engine of long-term passive income. Enter your current dividend and an
        annual growth rate to see how much it will pay in the future — and what it earns you over time.
      </p>

      <div className="card">
        <DividendGrowthCalc />
      </div>

      <FinanceNote />

      <AdBanner slot="growth" />

      <div className="prose">
        <h2>The Rule of 72 for dividends</h2>
        <p>
          Divide 72 by your annual dividend growth rate to find how many years until your dividend
          doubles. At 8% growth, a dividend doubles roughly every 9 years — 20 years of that turns a
          $2 dividend into over $9.
        </p>
        <h2>Related calculators</h2>
        <p>
          <Link href="/">Dividend Calculator</Link> ·{' '}
          <Link href="/calculators/drip-calculator">DRIP Calculator</Link> ·{' '}
          <Link href="/calculators/dividend-yield-calculator">Dividend Yield Calculator</Link>
        </p>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: webAppJsonLd('Dividend Growth Calculator', PATH) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Dividend Growth Calculator', path: PATH },
          ]),
        }}
      />
    </>
  );
}
