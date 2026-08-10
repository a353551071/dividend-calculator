import type { Metadata } from 'next';
import Link from 'next/link';
import TickerDripCalc from '@/components/TickerDripCalc';
import FinanceNote from '@/components/FinanceNote';
import AdBanner from '@/components/AdBanner';
import { webAppJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/lib/schema';

const PATH = '/calculators/qqqi-dividend-calculator';

export const metadata: Metadata = {
  title: { absolute: 'QQQI Dividend Calculator 2026: Monthly Income' },
  description:
    'This QQQI dividend calculator projects NEOS Nasdaq-100 High Income ETF monthly income, yield and DRIP reinvestment, with tax and NAV trade-offs explained.',
  alternates: { canonical: PATH },
};

const faqs = [
  {
    q: 'What is QQQI’s current dividend yield?',
    a: 'QQQI’s distribution yield has recently been in the 12–14% range, but it comes from option premiums, not ordinary dividends. The exact figure fluctuates month to month with volatility and fund performance; verify current numbers with NEOS or your broker.',
  },
  {
    q: 'How often does QQQI pay dividends?',
    a: 'QQQI pays distributions monthly — the core appeal for income seekers. That contrasts with quarterly payers like SCHD.',
  },
  {
    q: 'Is QQQI’s dividend qualified?',
    a: 'QQQI distributions are mixed: part qualified dividends, part ordinary income, part return of capital, and part Section 1256 contract gains (taxed 60% long-term / 40% short-term). The mix changes yearly. Consult a tax professional for your situation.',
  },
  {
    q: 'QQQI vs QYLD: what’s the difference?',
    a: 'Both sell covered calls on the Nasdaq-100. QYLD sells options covering nearly 100% of the portfolio, capping almost all upside. QQQI targets roughly 50% coverage, so it keeps more upside in strong rallies while still generating high income.',
  },
  {
    q: 'Is QQQI safe?',
    a: '“Safe” is relative. QQQI delivers high monthly income but carries real risks: upside is capped by the option strategy, fund NAV can erode when distributions exceed growth, and payouts vary with market volatility. It is not a cash substitute.',
  },
];

export default function QqqiPage() {
  return (
    <>
      <h1>QQQI Dividend Calculator (2026)</h1>
      <p className="lead">
        QQQI (NEOS Nasdaq-100 High Income ETF) pays <strong>monthly</strong> income by selling
        covered calls on the Nasdaq-100. This calculator projects your cash flow, yield and DRIP
        reinvestment — with the trade-offs explained honestly.
      </p>

      <h2>Calculate your QQQI monthly income</h2>
      <div className="card">
        <TickerDripCalc
          ticker="QQQI"
          defaultPrice={50}
          defaultYield={13}
          defaultDivGrowth={0}
          defaultPriceGrowth={4}
          defaultMonthly={0}
          defaultYears={10}
        />
      </div>

      <FinanceNote />

      <AdBanner slot="qqqi" />

      <div className="prose">
        <h2>How this QQQI dividend calculator works</h2>
        <p>
          QQQI holds the Nasdaq-100 and sells call options on a portion of it. The{' '}
          <strong>option premiums</strong> become your monthly distribution, which is why the yield
          is much higher than a plain index fund.
        </p>
        <p>
          The trade-off: upside above the option strike is given up. In a sharp rally, QQQI will
          likely <strong>underperform QQQ</strong> — you trade price growth for cash income.
        </p>

        <h2>⚠️ QQQI risks you must know</h2>
        <ul>
          <li>
            <strong>High yield is not free money.</strong> It comes from selling options, not just
            company dividends.
          </li>
          <li>
            <strong>NAV can erode.</strong> If distributions consistently exceed fund growth, the
            share price drifts down over time.
          </li>
          <li>
            <strong>Upside is capped</strong> in strong bull markets by the covered-call strategy.
          </li>
          <li>
            Distributions <strong>fluctuate</strong> with volatility — there is no guaranteed or
            steadily rising payout. That is why this calculator defaults yield growth to 0%.
          </li>
        </ul>

        <h2>How QQQI is taxed</h2>
        <p>
          QQQI distributions are a <strong>mix</strong>: qualified dividends, ordinary income,
          return of capital, and Section 1256 contract gains (taxed 60% long-term / 40% short-term).
          Return of capital lowers your cost basis and is taxed later as a capital gain. This is
          more complex than a plain dividend ETF — consult a tax professional before assuming any
          rate.
        </p>

        <h2>A worked QQQI example</h2>
        <p>
          Suppose you put $10,000 into QQQI at $50/share with a 13% distribution yield, no
          distribution growth and 4% price growth, reinvesting each monthly payment. Month one
          delivers roughly $108 in distributions; reinvested, that buys about 2 extra shares. After
          a year you hold more shares than you started with, but because distribution growth is set
          to 0%, your per-share payout does not rise the way SCHD&rsquo;s does — the income grows
          only because you own more shares. Use the calculator above to test what happens if yield
          drops to 10% or NAV growth turns negative: the income line bends fast.
        </p>

        <h2>QQQI vs QQQ vs QYLD</h2>
        <p>
          <strong>QQQ</strong> simply holds the Nasdaq-100 — full upside, full downside, a yield
          near 0.6%. <strong>QQQI</strong> holds the same index but sells covered calls on roughly
          half of it, converting some upside into ~13% monthly income. <strong>QYLD</strong> sells
          calls on nearly 100% of the portfolio, generating even higher income but capping almost
          all upside — its NAV has historically drifted down over time. QQQI sits in the middle:
          more income than QQQ, more upside than QYLD, with the same Nasdaq-100 exposure at the
          core.
        </p>
        <p>
          If your goal is long-term wealth, QQQ usually wins on total return. If your goal is
          monthly cash flow today and you accept capped upside, QQQI is the compromise. This
          calculator helps you see the income side clearly — it does not predict NAV erosion.
        </p>

        <h2>QQQI vs SCHD</h2>
        <p>
          Two very different tools. <strong>SCHD</strong> (~3.5% yield, quarterly, ~10% dividend
          growth) is a <em>dividend-growth</em> holding. <strong>QQQI</strong> (~13% yield, monthly,
          flat growth, capped upside) is an <em>income</em> holding. Many investors blend the two:
          growth at the core, a smaller high-income sleeve for cash flow.
        </p>
        <p>
          See the <Link href="/calculators/schd-dividend-calculator">SCHD Dividend Calculator</Link>{' '}
          for the growth-oriented comparison, or the{' '}
          <Link href="/calculators/monthly-dividend-calculator">Monthly Dividend Income Calculator</Link>{' '}
          for monthly cash-flow math.
        </p>

        <h2>Related calculators</h2>
        <p>
          <Link href="/">Dividend Calculator</Link> ·{' '}
          <Link href="/calculators/schd-dividend-calculator">SCHD Dividend Calculator</Link> ·{' '}
          <Link href="/calculators/monthly-dividend-calculator">Monthly Income Calculator</Link> ·{' '}
          <Link href="/calculators/drip-calculator">DRIP Calculator</Link>
        </p>
        <p>
          For a similar monthly-pay covered-call ETF, see the{' '}
          <Link href="/blog/jepi-dividend-calendar">JEPI dividend calendar</Link>.
        </p>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: webAppJsonLd('QQQI Dividend Calculator', PATH) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'QQQI Dividend Calculator', path: PATH },
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
