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
    a: 'Roughly 30–60% is considered healthy for most companies. It returns meaningful cash while leaving enough profit to grow the business and keep the dividend safe through an earnings dip.',
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
];

export default function PayoutRatioPage() {
  return (
    <>
      <h1>Dividend Payout Ratio Calculator</h1>
      <p className="lead">
        The payout ratio measures how much of a company&apos;s earnings it hands back as dividends. It
        is the first thing to check before trusting a dividend — even a high yield is worthless if the
        payout cannot be sustained.
      </p>

      <div className="card">
        <PayoutRatioCalc />
      </div>

      <FinanceNote />

      <AdBanner slot="payout" />

      <div className="prose">
        <h2>What is the payout ratio?</h2>
        <p>
          The dividend payout ratio tells you what fraction of a company&apos;s profit is returned to
          shareholders as cash dividends. A company that earns $4 per share and pays $2 per share in
          dividends has a 50% payout ratio — half its profit goes out as cash, half stays inside the
          business. That single number is the quickest gauge of whether a dividend is safe,
          stretching, or in danger.
        </p>

        <h2>The payout ratio formula</h2>
        <p>
          <code>payout ratio (%) = dividend per share &divide; earnings per share &times; 100</code>
        </p>
        <p>
          The calculator above applies this directly and labels the result. Earnings per share (EPS)
          is net income divided by shares outstanding; dividend per share (DPS) is the annual cash
          dividend. Both are usually reported quarterly, so you annualize them before dividing.
        </p>

        <h2>How to use this calculator</h2>
        <ul>
          <li>Enter the annual dividend per share (DPS) the company pays.</li>
          <li>Enter the annual earnings per share (EPS) from its income statement.</li>
          <li>Read the verdict and the sustainability gauge, which colour-codes the ratio into bands.</li>
          <li>Check the ratio over several years, not just one — a single low year can hide a trend.</li>
        </ul>

        <h2>What the number means</h2>
        <ul>
          <li><strong>Below 30%</strong> — low: the company retains most earnings, so dividends have ample room to grow.</li>
          <li><strong>30–60%</strong> — healthy: a meaningful payout with enough left to reinvest in the business.</li>
          <li><strong>60–100%</strong> — high: little room for growth; an earnings dip could pressure the dividend.</li>
          <li><strong>Above 100%</strong> — the company pays out more than it earns, often funded by debt or reserves. Usually unsustainable.</li>
        </ul>

        <h2>The retention ratio — the flip side</h2>
        <p>
          Whatever is not paid out is <em>retained</em> inside the business to fund growth, pay down
          debt or buy back stock. Retention ratio = 100% − payout ratio. A 40% payout ratio means a
          60% retention ratio. High-growth companies tend to have low payout (high retention)
          ratios because they need their capital to expand; mature, slow-growth businesses tend to
          pay out more because they have fewer places to reinvest profitably.
        </p>

        <h2>Payout ratio vs dividend yield</h2>
        <p>
          These two get confused but measure completely different things.{' '}
          <Link href="/calculators/dividend-yield-calculator">Dividend yield</Link> divides the
          dividend by the <em>share price</em> — it tells investors the income return they get for
          buying the stock. The payout ratio divides the dividend by <em>earnings</em> — it tells
          you whether the company can actually afford to keep paying that dividend. A stock can have
          a tempting yield and a dangerous payout ratio at the same time.
        </p>

        <h2>What makes a payout sustainable</h2>
        <p>
          A payout ratio is sustainable when earnings comfortably cover the dividend across the
          business cycle, not just in a good year. Look for stable or rising EPS, modest debt, and
          strong free cash flow that tracks or exceeds reported earnings. Companies in cyclical
          industries (energy, industrials) should run lower payout ratios so they can keep paying
          through downturns; stable consumer-staples businesses can prudently pay out a higher share.
        </p>

        <h2>Why payout ratios creep up</h2>
        <p>
          A payout ratio rises for one of two reasons: the dividend grew, or the earnings fell. The
          dangerous case is the second — a company holds its dividend flat while profits slide,
          quietly pushing the ratio from 50% toward 80% and beyond. Watch the trend, not just the
          latest number. A ratio marching upward over several years is an early warning that a cut is
          coming, even if the dividend has not been reduced yet.
        </p>

        <h2>Cash payout ratio vs earnings payout ratio</h2>
        <p>
          This calculator uses the earnings-based payout ratio, the most common version. Some
          investors prefer the <strong>cash payout ratio</strong> — dividends divided by free cash
          flow — because earnings can be distorted by accounting items. The two usually tell a
          similar story, but when they diverge sharply it pays to find out why. Use this tool for a
          quick read on sustainability, then confirm with cash flow before any real decision.
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
          <Link href="/calculators/monthly-dividend-calculator">Monthly Dividend Income Calculator</Link>
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
