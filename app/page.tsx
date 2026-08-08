import type { Metadata } from 'next';
import Link from 'next/link';
import HeadlineDividendCalc from '@/components/HeadlineDividendCalc';
import FinanceNote from '@/components/FinanceNote';
import AdBanner from '@/components/AdBanner';
import { faqJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: { absolute: 'Dividend Payout Calculator 2026 — Yield, DRIP & Income' },
  description:
    'Free dividend payout calculator: compute dividend yield, dividend growth, DRIP reinvestment returns, monthly income and payout ratio in seconds.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  const faq = [
    {
      q: 'How is dividend yield calculated?',
      a: 'Dividend yield is the annual dividend per share divided by the current share price, expressed as a percentage. For example, a stock paying $2 per share annually at a $100 price has a 2% dividend yield.',
    },
    {
      q: 'What is a DRIP calculator?',
      a: 'A DRIP (Dividend Reinvestment Plan) calculator simulates how reinvesting your dividends compounds your investment over time — dividends buy more shares, which then pay more dividends next year.',
    },
    {
      q: 'How much do I need to earn $1,000 a month in dividends?',
      a: 'At a 4% dividend yield you would need roughly $300,000 invested. Higher yields or dividend growth can reduce the amount needed, but very high yields often signal risk.',
    },
    {
      q: 'What is a good dividend payout ratio?',
      a: 'A payout ratio between 30% and 60% is generally considered healthy — the company returns meaningful cash to shareholders while retaining enough to reinvest in growth. Above 100% is usually unsustainable.',
    },
  ];
  const faqLd = faqJsonLd(faq);

  return (
    <>
      <section>
        <h1>Dividend Payout Calculator</h1>
        <p className="lead">
          Estimate your dividend income in seconds. This free dividend payout calculator shows
          your dividend yield, future dividend growth, DRIP reinvestment returns and monthly
          dividend income — enter a share price and dividend to start.
        </p>
      </section>

      <section className="trust-badges" aria-label="Site highlights">
        <span>Free</span>
        <span aria-hidden="true">·</span>
        <span>No sign-up</span>
        <span aria-hidden="true">·</span>
        <span>Built for 2026 dividends</span>
      </section>

      <div className="card">
        <HeadlineDividendCalc />
      </div>

      <FinanceNote />

      <AdBanner slot="home-top" />

      <section>
        <h2>What is a dividend?</h2>
        <p>
          A dividend is a cash payment a company distributes to its shareholders, usually drawn
          from profits. Mature, cash-generating businesses — consumer staples, utilities, banks,
          healthcare, REITs — pay them regularly, most often quarterly in the U.S. The board sets
          the amount per share; as an investor, your dividend income equals dividends per share
          times the number of shares you own.
        </p>
        <p>
          Dividends matter for two reasons. First, they are real cash that hits your account
          whether the market is up or down. Second, a long history of <em>growing</em> dividends is
          one of the clearest signals that a business is genuinely profitable and compounding.
          This dividend calculator turns those ideas into numbers you can see in seconds.
        </p>
      </section>

      <section>
        <h2>How to use this dividend payout calculator</h2>
        <p>
          Enter a share price and an annual dividend per share, and the calculator returns your
          dividend yield instantly. From there you can layer on a dividend growth rate to project
          future income, toggle DRIP to see how reinvesting each payment compounds your position,
          and switch to monthly mode for portfolios that pay monthly. Every input is editable —
          change the yield from 3% to 6% and watch how the 10-year income curve reshapes.
        </p>
        <p>
          A realistic example: a $50,000 portfolio at a blended 4% yield pays about $2,000 a year,
          or roughly $167 a month. Push yield growth to 7% and reinvest, and the year-10 income
          projection is dramatically higher — not because the yield doubled, but because you own
          many more shares by then. That compounding effect is the whole point of the DRIP view.
        </p>
      </section>

      <section>
        <h2>Dividend payout vs dividend yield</h2>
        <p>
          These two terms get confused often, and a dividend payout calculator is built to keep
          them straight. <strong>Dividend yield</strong> measures the annual dividend relative to
          the share price — the return you earn for what you pay. <strong>Dividend payout</strong>{' '}
          (the payout ratio) measures the dividend relative to the company&rsquo;s earnings — how much
          profit the company actually hands back. A stock can show a tempting high yield while
          paying out more than it earns, which is exactly the kind of sustainability risk this
          calculator helps you spot. Pair the{' '}
          <Link href="/calculators/dividend-yield-calculator">dividend yield calculator</Link> with
          the{' '}
          <Link href="/calculators/dividend-payout-ratio-calculator">payout ratio calculator</Link>{' '}
          to see both the return and the safety of a dividend.
        </p>
      </section>

      <section>
        <h2>Who needs a dividend payout calculator</h2>
        <p>
          This dividend payout calculator is built for income-focused investors: retirees living
          off portfolio cash, long-term holders comparing ETFs like SCHD and QQQI, and anyone
          mapping out how long it takes to reach a target monthly income. If you have ever asked
          &ldquo;how much do I need to invest to earn $1,000 a month in dividends&rdquo;, the dividend payout
          calculator answers it directly — set a yield, a starting amount and a growth rate, then
          read off the monthly and yearly projections. The math mirrors what your brokerage
          statement reports, just faster and forward-looking. The{' '}
          <a
            href="https://www.investor.gov/introduction-investing/investing-basics/investment-products/stocks"
            target="_blank"
            rel="noopener noreferrer"
          >
            U.S. SEC guide to dividend stocks
          </a>{' '}
          is a trustworthy reference for how dividends are declared, recorded and paid.
        </p>
      </section>

      <section>
        <h2>Reading your dividend payout calculator results</h2>
        <p>
          A few numbers deserve extra attention when you use the dividend payout calculator. The{' '}
          <strong>yield on cost</strong> — your yield based on the price you actually paid, not the
          current price — climbs over time when a company grows its dividend, which is why
          long-time holders of consistently raising stocks often show yields far above today&rsquo;s
          market yield. The <strong>DRIP projection</strong> shows how reinvesting each payment
          buys more shares, accelerating both your share count and future income; the gap between
          &ldquo;reinvest&rdquo; and &ldquo;take cash&rdquo; is the clearest illustration of compounding most people will
          see. Finally, remember that very high yields (often above 8–10%) can signal a struggling
          share price or an unsustainable payout — a number this calculator surfaces but never
          endorses. Past dividends do not guarantee future ones; treat every projection as an
          estimate, not a promise.
        </p>
      </section>

      <section>
        <h2>Common dividend payout scenarios</h2>
        <p>
          The dividend payout calculator adapts to several real situations. A retiree drawing 4%
          from a $500,000 portfolio models about $1,667 a month in cash flow. A younger saver
          reinvesting a 3.5% yield on a dividend growth ETF like SCHD watches the year-10 balance
          pull ahead of the take-cash path by a wide margin. An income hunter comparing a
          high-yield covered-call ETF like QQQI against a slower-growing index fund uses the same
          inputs to weigh monthly cash now against long-term compounding. Switch the yield, growth
          and starting amount to match your own case — every projection updates instantly.
        </p>
      </section>

      <section>
        <h2>Dividend Tools</h2>
        <div className="tool-grid">
          <Link href="/calculators/dividend-yield-calculator" className="tool-card">
            <h3>Dividend Yield Calculator</h3>
            <p>Annual dividend per share ÷ price. See your real yield.</p>
          </Link>
          <Link href="/calculators/dividend-growth-calculator" className="tool-card">
            <h3>Dividend Growth Calculator</h3>
            <p>Project future dividends with a compound growth rate.</p>
          </Link>
          <Link href="/calculators/drip-calculator" className="tool-card">
            <h3>DRIP Calculator</h3>
            <p>Simulate dividend reinvestment compounding over years.</p>
          </Link>
          <Link href="/calculators/monthly-dividend-calculator" className="tool-card">
            <h3>Monthly Dividend Calculator</h3>
            <p>How much monthly dividend income your portfolio generates.</p>
          </Link>
          <Link href="/calculators/dividend-payout-ratio-calculator" className="tool-card">
            <h3>Payout Ratio Calculator</h3>
            <p>Check if a dividend is sustainable against earnings.</p>
          </Link>
          <Link href="/calculators/schd-dividend-calculator" className="tool-card">
            <h3>SCHD Dividend Calculator</h3>
            <p>Yield, DRIP and projections for the Schwab dividend ETF.</p>
          </Link>
          <Link href="/calculators/qqqi-dividend-calculator" className="tool-card">
            <h3>QQQI Dividend Calculator</h3>
            <p>Monthly income and yield for the Nasdaq-100 covered-call ETF.</p>
          </Link>
        </div>
      </section>

      <section>
        <h2>Frequently Asked Questions</h2>
        <div className="faq">
          {faq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqLd }}
      />
    </>
  );
}
