import type { Metadata } from 'next';
import Link from 'next/link';
import TickerDripCalc from '@/components/TickerDripCalc';
import TickerStatsBar from '@/components/TickerStatsBar';
import DistributionHistory from '@/components/DistributionHistory';
import ScenarioCards from '@/components/ScenarioCards';
import FinanceNote from '@/components/FinanceNote';
import AdBanner from '@/components/AdBanner';
import { getDividendsAsOf, getTickerData } from '@/lib/dividendData';
import { webAppJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/lib/schema';
import FaqAccordion from '@/components/FaqAccordion';

const PATH = '/calculators/qqqi-dividend-calculator';

// 动态真数默认值(AdSense 整改 A1):build 时读 dividends.json,无数据回退静态值。
const qqqi = getTickerData('QQQI');
const asOf = getDividendsAsOf();
const livePrice = qqqi?.price != null ? Math.round(qqqi.price * 100) / 100 : 50;
const liveYield = qqqi?.ttmYieldPct != null ? Math.round(qqqi.ttmYieldPct * 10) / 10 : 13;
const lastAmt = qqqi?.lastAmount != null ? qqqi.lastAmount : 0.65;
// Bing 已验证长问句(what does 10k get me in qqqi dividends / 40000 into qqqi)的场景数,
// 与 prefill 同源(dividends.json),月度刷新构建时自动跟随。
const shares10k = Math.round(10000 / livePrice);
const shares40k = Math.round(40000 / livePrice);
const monthly10k = Math.round(shares10k * lastAmt);
const monthly40k = Math.round(shares40k * lastAmt);
const yearly10k = Math.round((monthly10k * 12) / 100) * 100;
const monthly40kByYield = Math.round((40000 * liveYield) / 100 / 12);
const asOfText = asOf
  ? new Date(asOf + 'T00:00:00Z').toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC',
    })
  : 'Aug 2026';
const prefillNote = `Inputs are prefilled with QQQI's actual share price ($${livePrice.toFixed(
  2
)}) and TTM distribution yield (${liveYield.toFixed(
  1
)}%) as of ${asOfText} — edit any field to model your own scenario.`;

export const metadata: Metadata = {
  title: { absolute: 'QQQI Dividend Calculator 2026: Monthly Income' },
  description:
    'QQQI pays roughly $0.65 per share monthly with a ~14% yield (as of Aug 2026) and the next ex-dividend date projected near mid-September. This calculator projects NEOS Nasdaq-100 High Income ETF income, yield and DRIP reinvestment, with tax and NAV trade-offs explained.',
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
    q: 'What does $10,000 in QQQI pay per month?',
    a: `At the live numbers above ($${livePrice.toFixed(2)}/share, recent monthly payments around $${lastAmt.toFixed(
      3
    )}), $10,000 buys about ${shares10k} shares — roughly $${monthly10k} per month, or about $${yearly10k.toLocaleString(
      'en-US'
    )} a year at recent rates. Two honest caveats: the per-share amount wobbles (QQQI paid $0.635–$0.657 across its last three distributions), and part of each payment is typically return of capital rather than pure income. Model your own inputs in the calculator above.`,
  },
  {
    q: 'How much monthly income does $40,000 in QQQI generate?',
    a: `Counting shares, about $${monthly40k} a month (${shares40k} shares at $${livePrice.toFixed(
      2
    )}, each paying around $${lastAmt.toFixed(
      3
    )}); estimating from the ~${liveYield.toFixed(
      1
    )}% TTM distribution yield instead gives $${monthly40kByYield} — so the honest range is roughly $${monthly40kByYield}–$${monthly40k} a month. Neither number is guaranteed: payouts move with option premiums, and part of each payment can be return of capital. Toggle DRIP in the calculator above to see compounding instead of flat cash flow.`,
  },
  {
    q: 'Is QQQI’s dividend qualified?',
    a: 'QQQI distributions are mixed: part qualified dividends, part ordinary income, part return of capital, and part Section 1256 contract gains (taxed 60% long-term / 40% short-term). The mix changes yearly. Consult a tax professional for your situation.',
  },
  {
    q: 'If I DRIP QQQI, how does return of capital affect my cost basis?',
    a: 'Each QQQI distribution has multiple parts; the return-of-capital (ROC) part is not taxed when received — instead it reduces the cost basis of the shares you hold, converting the tax into a bigger capital gain (or smaller loss) when you eventually sell. DRIP makes the bookkeeping layered: every reinvested payment buys a new lot with its own full basis, while ROC chips away at the basis of lots you already own. If your basis ever reaches zero, later ROC payouts become immediately taxable capital gains. Your broker’s lot records plus NEOS’s per-distribution Section 19a notices (final mix confirmed after year-end) are the source of truth — worth an hour with a tax professional before assuming anything.',
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
        QQQI (NEOS Nasdaq-100 High Income ETF) pays <strong>monthly</strong> — roughly{' '}
        <strong>$0.65 per share</strong> — and yields around <strong>14% a year</strong> as of Aug
        2026, with the next ex-dividend date projected near <strong>mid-September</strong>. This
        calculator projects your cash flow, yield and DRIP reinvestment — with the trade-offs
        explained honestly.
      </p>

      <TickerStatsBar ticker="QQQI" />

      <h2>Calculate your QQQI monthly income</h2>
      <div className="card">
        <TickerDripCalc
          ticker="QQQI"
          defaultPrice={livePrice}
          defaultYield={liveYield}
          defaultDivGrowth={0}
          defaultPriceGrowth={4}
          defaultMonthly={0}
          defaultYears={10}
          prefillNote={prefillNote}
        />
      </div>

      <FinanceNote />

      <AdBanner slot="qqqi" />

      <div className="prose">
        <h2>How this QQQI dividend calculator works</h2>
        <p>
          QQQI holds the Nasdaq-100 and sells call options on a portion of it. The{' '}
          <strong>option premiums</strong> become your monthly distribution, which is why the yield
          is much higher than a plain index fund. For month-by-month payout dates and recent
          amounts, see the <Link href="/blog/qqqi-dividend-calendar">QQQI dividend calendar</Link>.
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

        <DistributionHistory
          ticker="QQQI"
          intro="QQQI's per-share distribution moves with volatility and option premiums, so the recent history below is the honest baseline for any projection: month-to-month amounts wobble, and the projected rows simply repeat the latest payment until NEOS announces otherwise."
        />

        <ScenarioCards
          title="QQQI example scenarios (precomputed)"
          intro="Three concrete runs through the same math as the calculator above, using the live prefilled price and yield — DRIP on, distribution growth 0%, share price growth 4% a year. The point of the exercise: see how monthly-income compounding behaves before you touch a single input."
          subject="QQQI"
          scenarios={[
            {
              name: 'The $10,000 income starter',
              setup: '$10,000 lump sum, no monthly additions, 10 years, DRIP on',
              input: { initialInvestment: 10000, price: livePrice, dividendYieldPct: liveYield, dividendGrowthPct: 0, priceGrowthPct: 4, monthlyContribution: 0, years: 10 },
              note: 'Income-first: compare with the same $10,000 in the SCHD calculator — lower starting income, but the per-share payout grows instead of staying flat.',
            },
            {
              name: 'Building with $500 a month',
              setup: '$0 to start, $500 added every month for 10 years, DRIP on',
              input: { initialInvestment: 0, price: livePrice, dividendYieldPct: liveYield, dividendGrowthPct: 0, priceGrowthPct: 4, monthlyContribution: 500, years: 10 },
              note: 'Watch the gap between final value and total invested — with a ~14% distribution yield reinvesting monthly, the distributions do real work even with zero price growth.',
            },
            {
              name: 'The $100,000 income sleeve',
              setup: '$100,000 lump sum, no additions, 10 years, DRIP on',
              input: { initialInvestment: 100000, price: livePrice, dividendYieldPct: liveYield, dividendGrowthPct: 0, priceGrowthPct: 4, monthlyContribution: 0, years: 10 },
              note: 'At the current yield the first year alone distributes roughly $14,000 — switch DRIP off in the calculator above to model taking that as cash instead.',
            },
          ]}
        />

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
          Two very different tools. <strong>SCHD</strong> (~3% yield, quarterly, ~10% dividend
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

        <h2>Frequently Asked Questions</h2>
        <FaqAccordion faqs={faqs} />

        <h2>Related calculators</h2>
        <p>
          <Link href="/">Dividend Calculator</Link> ·{' '}
          <Link href="/calculators/schd-dividend-calculator">SCHD Dividend Calculator</Link> ·{' '}
          <Link href="/calculators/monthly-dividend-calculator">Monthly Income Calculator</Link> ·{' '}
          <Link href="/calculators/drip-calculator">DRIP Calculator</Link>
        </p>
        <p>
          For a similar monthly-pay covered-call ETF, see the{' '}
          <Link href="/blog/jepi-dividend-calendar">JEPI dividend calendar</Link>. For QQQI&apos;s
          own projected payout schedule, see{' '}
          <Link href="/blog/qqqi-dividend-calendar">QQQI ex-dividend dates</Link> month by month.
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
