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

const PATH = '/calculators/schd-dividend-calculator';

// 动态真数默认值(AdSense 整改 A1):build 时读 dividends.json,无数据回退静态值。
const schd = getTickerData('SCHD');
const asOf = getDividendsAsOf();
const livePrice = schd?.price != null ? Math.round(schd.price * 100) / 100 : 80;
const liveYield = schd?.ttmYieldPct != null ? Math.round(schd.ttmYieldPct * 10) / 10 : 3.5;
const asOfText = asOf
  ? new Date(asOf + 'T00:00:00Z').toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC',
    })
  : 'Aug 2026';
const prefillNote = `Inputs are prefilled with SCHD's actual share price ($${livePrice.toFixed(
  2
)}) and trailing dividend yield (${liveYield.toFixed(
  1
)}%) as of ${asOfText} — edit any field to model your own scenario.`;

export const metadata: Metadata = {
  title: { absolute: 'SCHD Dividend Calculator 2026: Yield & DRIP' },
  description:
    'SCHD pays quarterly with a ~3% yield, the next ex-dividend date projected around Sep 23, 2026. This calculator projects Schwab U.S. Dividend Equity ETF income, yield and DRIP reinvestment year by year. Free, no signup.',
  alternates: { canonical: PATH },
};

const faqs = [
  {
    q: 'What is SCHD’s current dividend yield?',
    a: 'SCHD’s yield fluctuates with its share price but has recently been around 3%. Yield equals annual dividends per share divided by price, times 100. Always verify the latest figure with Schwab or your broker.',
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
        SCHD (Schwab U.S. Dividend Equity ETF) pays <strong>quarterly</strong> — the next
        ex-dividend date is projected around <strong>Sep 23, 2026</strong> — with a trailing yield
        near <strong>3%</strong> and roughly 10% annual dividend growth since its 2011 inception.
        This calculator projects your SCHD income and DRIP reinvestment year by year.
      </p>

      <TickerStatsBar ticker="SCHD" />

      <h2>Calculate your SCHD dividends</h2>
      <div className="card">
        <TickerDripCalc
          ticker="SCHD"
          defaultPrice={livePrice}
          defaultYield={liveYield}
          defaultDivGrowth={10}
          defaultPriceGrowth={7}
          prefillNote={prefillNote}
        />
      </div>

      <FinanceNote />

      <AdBanner slot="schd" />

      <div className="prose">
        <h2>What is SCHD’s dividend yield?</h2>
        <p>
          SCHD’s yield has recently been near <strong>3%</strong>, varying as the share price
          moves. Yield follows the formula:
        </p>
        <p>
          <code>yield = annual dividend per share &divide; price &times; 100</code>
        </p>
        <p>
          See the <Link href="/calculators/dividend-yield-calculator">Dividend Yield Calculator</Link>{' '}
          for the exact math on any stock or ETF.
        </p>

        <h2>How this SCHD dividend calculator works</h2>
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
          SCHD has grown its annual distribution every full year since its 2011 launch. The table
          below shows approximate annual distributions per share — treat them as a rough guide and
          verify current figures with Schwab or your broker before deciding.
        </p>
        <table>
          <thead>
            <tr><th>Year</th><th>Approx. annual distribution / share</th></tr>
          </thead>
          <tbody>
            <tr><td>2024</td><td>~$2.60</td></tr>
            <tr><td>2023</td><td>~$2.36</td></tr>
            <tr><td>2022</td><td>~$2.04</td></tr>
            <tr><td>2021</td><td>~$1.70</td></tr>
            <tr><td>2020</td><td>~$1.45</td></tr>
          </tbody>
        </table>

        <h2>What drives SCHD&rsquo;s dividend</h2>
        <p>
          SCHD tracks an index of roughly 100 U.S. companies with a track record of paying
          dividends, screened for fundamentals like cash-flow growth, return on equity and
          five-year dividend growth. The ETF&rsquo;s own payout is simply the aggregated cash
          dividends of those holdings, so SCHD&rsquo;s yield rises when its holdings are cheap and
          falls when they rally. Top sectors historically include consumer staples, healthcare,
          industrials and utilities — businesses that generate steady cash through most economic
          cycles.
        </p>
        <p>
          Because the payout comes from real company profits rather than option premiums or return
          of capital, it tends to be more durable than the sky-high yields on covered-call ETFs.
          The trade-off is a lower starting yield near 3%.
        </p>

        <h2>A worked SCHD example</h2>
        <p>
          Say you invest $10,000 in SCHD at $80/share with a 3% yield, 10% dividend growth and 7%
          price growth, reinvesting every quarterly payment. After the first year you own a few
          extra shares bought with dividends; by year 10 your reinvested dividends have added a
          meaningful slice of shares on top of your original 125, and your projected annual
          dividend income has grown well beyond the initial $350. Run your own numbers in the
          calculator above — change the yield or growth assumption to see how sensitive the
          outcome is to those two inputs.
        </p>

        <DistributionHistory
          ticker="SCHD"
          intro="SCHD raises its payout once a year with the December declaration, so the recent history below typically shows three equal payments and then a step up — the projected rows assume the newest amount keeps repeating on the quarterly cadence until the next annual raise."
        />

        <ScenarioCards
          title="SCHD example scenarios (precomputed)"
          intro="Three runs through the same engine as the calculator above, using the live prefilled price and yield — dividend growth 10% a year, share price growth 7%, DRIP on. The story these numbers tell is dividend growth: the payout you end with is very different from the one you start with."
          subject="SCHD"
          scenarios={[
            {
              name: 'The $1,000 starter',
              setup: '$1,000 lump sum, no monthly additions, 20 years, DRIP on',
              input: { initialInvestment: 1000, price: livePrice, dividendYieldPct: liveYield, dividendGrowthPct: 10, priceGrowthPct: 7, monthlyContribution: 0, years: 20 },
              note: 'Twenty years of ~10% dividend growth turns a small starting payout into a yield-on-cost far above the price you paid — check the Yield on cost column in the year-by-year table above.',
            },
            {
              name: '$10,000 for 20 years',
              setup: '$10,000 lump sum, no additions, 20 years, DRIP on',
              input: { initialInvestment: 10000, price: livePrice, dividendYieldPct: liveYield, dividendGrowthPct: 10, priceGrowthPct: 7, monthlyContribution: 0, years: 20 },
              note: 'The classic dividend-growth demo: most of the final income comes from raises and reinvestment, not the starting check.',
            },
            {
              name: 'Building with $500 a month',
              setup: '$0 to start, $500 added every month for 20 years, DRIP on',
              input: { initialInvestment: 0, price: livePrice, dividendYieldPct: liveYield, dividendGrowthPct: 10, priceGrowthPct: 7, monthlyContribution: 500, years: 20 },
              note: 'Compare final value against the $120,000 you put in — then run the same plan in the QQQI calculator to see the income-now vs income-later trade-off side by side.',
            },
          ]}
        />

        <h2>SCHD vs QQQI</h2>
        <p>
          SCHD is a <strong>dividend-growth</strong> story (lower ~3% yield, quarterly, rising
          payouts). If you want a high <strong>monthly</strong> cash flow instead, QQQI uses covered
          calls to target ~13% yield — at the cost of capped upside and different tax treatment. See
          the <Link href="/calculators/qqqi-dividend-calculator">QQQI Dividend Calculator</Link> for
          that comparison.
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
