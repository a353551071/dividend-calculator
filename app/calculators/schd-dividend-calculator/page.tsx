import type { Metadata } from 'next';
import Link from 'next/link';
import TickerDripCalc from '@/components/TickerDripCalc';
import FinanceNote from '@/components/FinanceNote';
import AdBanner from '@/components/AdBanner';
import { webAppJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/lib/schema';

const PATH = '/calculators/schd-dividend-calculator';

export const metadata: Metadata = {
  title: 'SCHD Dividend Calculator 2026 — DRIP & Yield',
  description:
    'Project SCHD dividend income and DRIP reinvestment year by year. See yield, annual income and portfolio value for the Schwab U.S. Dividend Equity ETF.',
  alternates: { canonical: PATH },
};

const faqs = [
  {
    q: 'What is SCHD’s current dividend yield?',
    a: 'SCHD’s yield fluctuates with its share price but has recently been around 3.5%. Yield equals annual dividends per share divided by price, times 100. Always verify the latest figure with Schwab or your broker.',
  },
  {
    q: 'How often does SCHD pay dividends?',
    a: 'SCHD pays dividends quarterly — typically in March, June, September and December. It is not a monthly payer.',
  },
  {
    q: 'Is SCHD’s dividend growing?',
    a: 'Yes. SCHD has historically increased its dividend roughly 10% per year since its 2011 inception, reflecting the dividend growth of its underlying holdings. Past growth is not a guarantee of future increases.',
  },
  {
    q: 'How is SCHD taxed?',
    a: 'Most of SCHD’s distributions are classified as qualified dividends, which are taxed at the lower long-term capital-gains rate for U.S. investors. Tax treatment depends on your jurisdiction; consult a tax professional.',
  },
  {
    q: 'Does SCHD offer a DRIP?',
    a: 'Most brokers support dividend reinvestment (DRIP) for SCHD. The calculator above shows how reinvesting quarterly dividends compounds your position over time.',
  },
];

export default function SchdPage() {
  return (
    <>
      <h1>SCHD Dividend Calculator (2026)</h1>
      <p className="lead">
        SCHD (Schwab U.S. Dividend Equity ETF) is one of the most popular dividend ETFs. This
        calculator projects your SCHD dividend income and DRIP reinvestment growth year by year,
        using a starting yield near 3.5% and historical dividend growth near 10%.
      </p>

      <div className="card">
        <TickerDripCalc
          ticker="SCHD"
          defaultPrice={80}
          defaultYield={3.5}
          defaultDivGrowth={10}
          defaultPriceGrowth={7}
        />
      </div>

      <FinanceNote />

      <AdBanner slot="schd" />

      <div className="prose">
        <h2>What is SCHD’s dividend yield?</h2>
        <p>
          SCHD’s yield has recently been near <strong>3.5%</strong>, varying as the share price
          moves. Yield follows the formula:
        </p>
        <p>
          <code>yield = annual dividend per share &divide; price &times; 100</code>
        </p>
        <p>
          See the <Link href="/calculators/dividend-yield-calculator">Dividend Yield Calculator</Link>{' '}
          for the exact math on any stock or ETF.
        </p>

        <h2>How SCHD DRIP works</h2>
        <p>
          SCHD pays <strong>quarterly</strong>. When you reinvest each payment, your share count
          rises, so the next quarter’s dividend is paid on more shares. With historical dividend
          growth near 10% per year, the compounding effect is meaningful over a decade or more.
        </p>
        <p>
          Model any starting yield or growth rate in the{' '}
          <Link href="/calculators/drip-calculator">DRIP Calculator</Link>.
        </p>

        <h2>SCHD dividend history (recent, approximate)</h2>
        <p>
          SCHD has grown its annual distribution every full year since launch. Distributions rise as
          the underlying companies raise their dividends. Treat the figures below as approximate and
          verify current values with Schwab.
        </p>

        <h2>SCHD vs QQQI</h2>
        <p>
          SCHD is a <strong>dividend-growth</strong> story (lower ~3.5% yield, quarterly, rising
          payouts). If you want a high <strong>monthly</strong> cash flow instead, QQQI uses covered
          calls to target ~13% yield — at the cost of capped upside and different tax treatment. See
          the <Link href="/calculators/qqqi-dividend-calculator">QQQI Dividend Calculator</Link> for
          that comparison.
        </p>

        <h2>Related calculators</h2>
        <p>
          <Link href="/">Dividend Calculator</Link> ·{' '}
          <Link href="/calculators/qqqi-dividend-calculator">QQQI Dividend Calculator</Link> ·{' '}
          <Link href="/calculators/drip-calculator">DRIP Calculator</Link> ·{' '}
          <Link href="/calculators/dividend-growth-calculator">Dividend Growth Calculator</Link>
        </p>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: webAppJsonLd('SCHD Dividend Calculator', PATH) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'SCHD Dividend Calculator', path: PATH },
          ]),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqJsonLd(faqs) }}
      />
    </>
  );
}
