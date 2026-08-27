import type { Metadata } from 'next';
import Link from 'next/link';
import PayoutRatioCalc from '@/components/PayoutRatioCalc';
import FinanceNote from '@/components/FinanceNote';
import AdBanner from '@/components/AdBanner';
import { webAppJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/lib/schema';

const PATH = '/calculators/dividend-payout-ratio-calculator';

export const metadata: Metadata = {
  title: { absolute: 'Dividend Payout Ratio Calculator 2026 — Is It Safe?' },
  description:
    'Check if a dividend is sustainable: calculate the payout ratio (dividends ÷ earnings) and understand what the number means.',
  alternates: { canonical: PATH },
};

const faqs = [
  {
    q: 'What is the dividend payout ratio?',
    a: 'It is the share of a company’s earnings paid out as dividends: dividend per share divided by earnings per share. A 50% payout ratio means the company returns half its profit as cash dividends and keeps the other half to reinvest.',
  },
  {
    q: 'What is a healthy payout ratio?',
    a: 'Roughly 35–75% is healthy for most companies. It returns meaningful cash while leaving enough profit to grow the business and keep the dividend safe through an earnings dip. Below 35% is very safe; above 75% leaves little room for error.',
  },
  {
    q: 'Is a payout ratio above 100% always bad?',
    a: 'It is a serious warning sign. Paying out more than 100% of earnings means the dividend is funded by debt, reserves or asset sales rather than profit, and a cut is likely unless earnings recover quickly.',
  },
  {
    q: 'What is the retention ratio?',
    a: 'It is the flip side of the payout ratio — the percentage of earnings the company keeps. Retention ratio = 100% − payout ratio. A 40% payout ratio means a 60% retention ratio.',
  },
  {
    q: 'Can the payout ratio be negative?',
    a: 'Yes, when a company has negative earnings (a loss) but still pays a dividend. A negative or undefined payout ratio is a red flag that the dividend is being paid out of cash reserves rather than profit.',
  },
  {
    q: 'What does a 0% payout ratio mean?',
    a: 'The company paid no dividend at all that year. It could be a young business reinvesting everything into growth, or a mature company that suspended its payout — check the dividend history to tell which.',
  },
  {
    q: 'Where do I find the numbers to calculate it?',
    a: 'On the income statement for net income and shares outstanding, and on the cash flow statement (or statement of shareholders’ equity) for cash dividends paid. Many companies also publish dividend per share and EPS directly in their investor-relations sections.',
  },
];

export default function PayoutRatioPage() {
  return (
    <>
      <h1>Dividend Payout Ratio Calculator</h1>
      <p className="lead">
        The payout ratio measures how much of a company&apos;s earnings it hands back as dividends. It
        is the first thing to check before trusting a dividend — even a high yield is worthless if the
        payout cannot be sustained. This page walks through what it is, how to calculate it from a
        real annual report, what a good number looks like, and a worked example.
      </p>

      <div className="card">
        <PayoutRatioCalc />
      </div>

      <FinanceNote />

      <AdBanner slot="payout" />

      <div className="prose">
        <h2>What is the payout ratio?</h2>
        <p>
          The dividend payout ratio is the share of profit a company returns to shareholders as cash
          dividends. A company that earns $4 per share and pays $2 per share has a 50% payout ratio —
          half its profit goes out as cash, half stays inside the business. That single number is the
          quickest gauge of whether a dividend is safe, stretching, or in danger. The higher it
          climbs, the less cushion the dividend has.
        </p>

        <h2>The payout ratio formula</h2>
        <p>
          <code>payout ratio (%) = dividend per share &divide; earnings per share &times; 100</code>
        </p>
        <p>
          The calculator above applies this directly and labels the result. Both numbers come from
          the company&apos;s own reports:
        </p>
        <ul>
          <li><strong>Dividend per share (DPS)</strong> — the annual cash dividend each share receives.</li>
          <li><strong>Earnings per share (EPS)</strong> — net income divided by shares outstanding.</li>
        </ul>
        <p>
          Because both are reported quarterly, you annualize them before dividing (multiply the
          latest quarter by four, or add up the trailing four quarters).
        </p>

        <h2>How to calculate it step by step</h2>
        <p>
          You don&apos;t need the formula memorized — you need to know where the two numbers live.
          Both come from public filings, and the whole calculation takes about two minutes:
        </p>
        <ol>
          <li>
            <strong>Open the income statement</strong> — find <strong>net income</strong> for the year
            and <strong>shares outstanding</strong> (usually on the same page or in the notes).
            Divide net income by shares to get <strong>EPS</strong>.
          </li>
          <li>
            <strong>Find the dividend</strong> — the <strong>cash dividends paid</strong> line, on the
            cash flow statement (or the statement of shareholders&apos; equity). Divide annual
            dividends by shares outstanding to get <strong>DPS</strong>.
          </li>
          <li><strong>Divide DPS by EPS</strong> — that&apos;s the payout ratio.</li>
        </ol>
        <p>
          If the company reports dividends per share directly (many do, in the investor-relations
          section or press releases), you can skip step 2 and start from the formula.
        </p>

        <h2>What is a good payout ratio?</h2>
        <p>Roughly speaking — and these are the same bands the gauge above uses:</p>
        <ul>
          <li><strong>0–35% — Safe:</strong> the dividend is covered several times over, with plenty of profit left to reinvest or raise the payout.</li>
          <li><strong>35–75% — Healthy:</strong> a meaningful payout with enough retained profit to grow the business and ride out a rough year.</li>
          <li><strong>75–100% — High:</strong> little room to raise the dividend; an earnings dip could pressure it.</li>
          <li><strong>Above 100% — Unsustainable:</strong> the company pays out more than it earns. The extra usually comes from debt, reserves, or asset sales.</li>
        </ul>
        <p>
          A useful rule of thumb for the &quot;safe and growing&quot; profile: a payout comfortably
          below the top of the healthy band, a dividend growing more than 5% a year, and return on
          equity above 12% — covered <em>and</em> rising at the same time.
        </p>

        <h2>Real example — Pfizer in 2019</h2>
        <p>
          In 2019 Pfizer reported net income of about <strong>$16.27 billion</strong> and paid{' '}
          <strong>$8.04 billion</strong> in cash dividends:
        </p>
        <p>
          <code>8,043 &divide; 16,273 &asymp; 49.4% payout ratio</code>
        </p>
        <p>
          That lands in the middle of the healthy band. Pfizer had been paying a dividend without
          interruption for decades, and earnings comfortably covered the payout. One honest caveat:
          2019 earnings included large one-time gains from business divestitures — which is exactly
          why you should check the ratio over several years instead of trusting any single year. The
          payout ratio is not an opinion; it is arithmetic on two reported figures, and this is how
          you reproduce it yourself from an annual report.
        </p>

        <h2>When the payout breaks — the other side of 100%</h2>
        <p>
          The mirror image is a company paying out more than it earns. Imagine a manufacturer that
          earns <strong>$2.00 a share</strong> but pays <strong>$2.30</strong> in dividends — a{' '}
          <strong>115% payout ratio</strong>. The extra $0.30 has to come from somewhere: borrowed
          money, cash reserves, or selling assets. None of those can last forever, which is why a
          payout above 100% is the loudest single warning that a dividend cut is coming.
          <em> (Hypothetical example for illustration — not a real company.)</em>
        </p>

        <h2>The retention ratio — the flip side</h2>
        <p>
          Whatever is not paid out is <em>retained</em> inside the business to fund growth, pay down
          debt, or buy back stock. Retention ratio = 100% − payout ratio. A 40% payout ratio means a
          60% retention ratio. High-growth companies tend to keep more (low payout) because they need
          the capital to expand; mature, slow-growth businesses tend to pay out more because they
          have fewer places to reinvest profitably.
        </p>

        <h2>Payout ratio vs dividend yield</h2>
        <p>
          These two get confused but measure completely different things.{' '}
          <Link href="/calculators/dividend-yield-calculator">Dividend yield</Link> divides the
          dividend by the <em>share price</em> — the income return you get for buying the stock. The
          payout ratio divides the dividend by <em>earnings</em> — whether the company can actually
          afford to keep paying it. A stock can have a tempting yield and a dangerous payout ratio at
          the same time, and a{' '}
          <Link href="/calculators/dividend-yield-calculator">crashing share price inflates the yield</Link>{' '}
          while the payout ratio stays honest.
        </p>

        <h2>What makes a payout sustainable</h2>
        <p>
          A payout is sustainable when earnings cover the dividend across the whole business cycle,
          not just in a good year. Look for stable or rising EPS, modest debt, and free cash flow
          that tracks or exceeds reported earnings. Cyclical industries (energy, industrials) should
          run lower payouts so they can keep paying through downturns; stable consumer-staples
          businesses can prudently pay out more. If you&apos;re evaluating the compounding picture,
          the{' '}
          <Link href="/calculators/drip-calculator">DRIP calculator</Link> shows how a sustainable
          payout turns into growth over decades.
        </p>

        <h2>Why payout ratios creep up</h2>
        <p>
          A payout ratio rises for one of two reasons: the dividend grew, or the earnings fell. The
          dangerous case is the second — a company holds its dividend flat while profits slide,
          quietly pushing the ratio from 50% toward 80% and beyond. Watch the trend, not just the
          latest number. A ratio marching upward over several years is an early warning that a cut is
          coming, even if the dividend has not been reduced yet.
        </p>

        <h2>Frequently Asked Questions</h2>
        <div className="faq">
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>

        <h2>Related calculators</h2>
        <p>
          <Link href="/">Dividend Calculator</Link> ·{' '}
          <Link href="/calculators/dividend-yield-calculator">Dividend Yield Calculator</Link> ·{' '}
          <Link href="/calculators/dividend-growth-calculator">Dividend Growth Calculator</Link> ·{' '}
          <Link href="/calculators/monthly-dividend-calculator">Monthly Dividend Income Calculator</Link> ·{' '}
          <Link href="/calculators/drip-calculator">DRIP Calculator</Link>
        </p>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: webAppJsonLd('Dividend Payout Ratio Calculator', PATH) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Dividend Payout Ratio Calculator', path: PATH },
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
