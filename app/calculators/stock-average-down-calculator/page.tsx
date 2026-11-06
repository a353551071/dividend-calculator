import type { Metadata } from 'next';
import Link from 'next/link';
import StockAverageDownCalc from '@/components/StockAverageDownCalc';
import FinanceNote from '@/components/FinanceNote';
import AdBanner from '@/components/AdBanner';
import DividendTrackerPromo from '@/components/DividendTrackerPromo';
import FaqAccordion from '@/components/FaqAccordion';
import { webAppJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/lib/schema';

const PATH = '/calculators/stock-average-down-calculator';

export const metadata: Metadata = {
  title: { absolute: 'Stock Average Down Calculator 2026: Cost Basis & Breakeven Solver' },
  description:
    'Free stock average down calculator: calculate your new average price per share after buying the dip, or solve how many shares you need to hit your target cost basis. Instant, free, no signup.',
  alternates: { canonical: PATH },
};

const faqs = [
  {
    q: 'What does it mean to average down on a stock?',
    a: 'Averaging down is an investing strategy where an investor purchases additional shares of a stock they already own after its price has declined. This lowers the average cost basis per share, meaning the stock needs to recover by a smaller percentage to break even or produce a profit.',
  },
  {
    q: 'What is the formula to calculate average down price?',
    a: 'The formula is: New Average Cost = (Total Cost of Original Shares + Total Cost of New Shares) / (Total Original Shares + Total New Shares). For example, if you own 100 shares at $50 ($5,000) and buy 100 more at $30 ($3,000), your new average is $8,000 / 200 = $40 per share.',
  },
  {
    q: 'How many shares do I need to buy to reach a target average price?',
    a: 'Use our Target Average Price Solver tab above. The formula is: Needed Shares = Current Shares × (Original Price - Target Price) / (Target Price - Current Market Price). Your target price must be between your original cost and the current lower market price.',
  },
  {
    q: 'Is averaging down a good investment strategy?',
    a: 'Averaging down can be very effective for high-quality, fundamentally sound businesses or broad index ETFs (like VOO or SCHD) during market pullbacks. However, it is dangerous for speculative or failing companies with deteriorating fundamentals, where adding money risks "catching a falling knife".',
  },
  {
    q: 'How does averaging down affect dividend yield on cost?',
    a: 'When you average down on a dividend-paying stock whose dividend remains secure, your personal Yield on Cost (YOC) increases significantly. Because you are acquiring more shares at a cheaper price, each invested dollar generates a higher forward cash yield.',
  },
];

export default function StockAverageDownPage() {
  const webAppLd = webAppJsonLd('Stock Average Down Calculator', PATH);

  const breadcrumbsLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Calculators', path: '/calculators/dividend-yield-calculator' },
    { name: 'Stock Average Down Calculator', path: PATH },
  ]);

  const faqLd = faqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/calculators/dividend-yield-calculator">Calculators</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Stock Average Down</span>
      </nav>

      <section>
        <h1>Stock Average Down Calculator (2026)</h1>
        <p className="lead">
          Calculate your new weighted average cost basis when buying a dip, or solve exactly how many
          shares you need to buy to hit your desired target price. Includes a breakeven rally
          comparison to see how much easier recovery becomes.
        </p>
      </section>

      <section className="trust-badges" aria-label="Tool highlights">
        <span>Forward & Reverse Solver</span>
        <span aria-hidden="true">·</span>
        <span>Free & Instant</span>
        <span aria-hidden="true">·</span>
        <span>No signup required</span>
      </section>

      <div className="card">
        <StockAverageDownCalc />
      </div>

      <FinanceNote />

      <AdBanner slot="calc-top" />

      {/* Promotional banner for our $9.90 Google Sheets Portfolio Tracker */}
      <DividendTrackerPromo />

      <section>
        <h2>What is averaging down in stock investing?</h2>
        <p>
          <strong>Averaging down</strong> is the practice of buying more shares of an asset after its
          market price has fallen below your original purchase price. By adding cheaper shares,
          your <em>weighted average purchase price</em> drops closer to the current market price.
        </p>
        <p>
          The primary psychological and financial advantage is that it significantly lowers the
          recovery hurdle. For example, if you buy a stock at $100 and it falls to $50, you need a
          massive <strong>+100% gain</strong> just to get back to even. But if you double your
          position at $50, your average cost drops to $75, meaning you only need a <strong>+50% gain</strong> to
          break even.
        </p>
      </section>

      <section>
        <h2>The mathematical formula explained</h2>
        <p>
          The weighted average cost basis is calculated using the following arithmetic formula:
        </p>
        <div className="bg-slate-100 p-4 rounded-xl font-mono text-xs md:text-sm my-3 border border-slate-200">
          New Average Cost = (S₁ × P₁ + S₂ × P₂) ÷ (S₁ + S₂)
        </div>
        <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
          <li><strong>S₁</strong> = Number of initial shares owned</li>
          <li><strong>P₁</strong> = Initial price paid per share</li>
          <li><strong>S₂</strong> = Number of new shares bought on the dip</li>
          <li><strong>P₂</strong> = Purchase price of the new shares</li>
        </ul>
      </section>

      <section>
        <h2>When should you average down — and when should you avoid it?</h2>
        <p>
          Averaging down is not universally sound; its effectiveness depends entirely on the
          fundamental health of the underlying asset:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-xs md:text-sm text-emerald-950">
            <h3 className="font-bold text-emerald-800 text-sm mb-1">
              ✓ Good times to average down:
            </h3>
            <ul className="list-disc list-inside space-y-1 text-emerald-900">
              <li>Broad market-index ETFs (e.g., S&P 500, VOO, SCHD) during market corrections.</li>
              <li>Profitable companies with strong balance sheets and intact moats.</li>
              <li>High-quality dividend aristocrats whose cash flow easily covers their dividend.</li>
            </ul>
          </div>

          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-xs md:text-sm text-rose-950">
            <h3 className="font-bold text-rose-800 text-sm mb-1">
              ✕ Dangerous times (The &ldquo;Falling Knife&rdquo; trap):
            </h3>
            <ul className="list-disc list-inside space-y-1 text-rose-900">
              <li>Unprofitable growth companies running out of cash.</li>
              <li>Stocks experiencing structural decline, fraud, or loss of competitive edge.</li>
              <li>When the additional purchase exceeds your overall portfolio risk tolerance.</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2>Frequently asked questions (FAQ)</h2>
        <FaqAccordion faqs={faqs} />
      </section>

      <section>
        <h2>Related tools & calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
          <Link
            href="/calculators/drip-calculator"
            className="card p-4 hover:border-blue-500 transition-colors no-underline block"
          >
            <span className="font-bold text-sm text-slate-900 block">DRIP Reinvestment Calculator</span>
            <span className="text-xs text-slate-500 mt-1 block">
              Simulate compounding returns by reinvesting payouts.
            </span>
          </Link>
          <Link
            href="/calculators/monthly-dividend-calculator"
            className="card p-4 hover:border-blue-500 transition-colors no-underline block"
          >
            <span className="font-bold text-sm text-slate-900 block">Monthly Dividend Income</span>
            <span className="text-xs text-slate-500 mt-1 block">
              Convert total portfolio yields into monthly cashflow.
            </span>
          </Link>
          <Link
            href="/calculators/schd-dividend-calculator"
            className="card p-4 hover:border-blue-500 transition-colors no-underline block"
          >
            <span className="font-bold text-sm text-slate-900 block">SCHD Dividend Calculator</span>
            <span className="text-xs text-slate-500 mt-1 block">
              Model Schwab US Dividend Equity ETF yield and growth.
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
