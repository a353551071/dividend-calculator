import type { Metadata } from 'next';
import Link from 'next/link';
import DividendGrowthCalc from '@/components/DividendGrowthCalc';
import FinanceNote from '@/components/FinanceNote';
import AdBanner from '@/components/AdBanner';
import { webAppJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/lib/schema';
import FaqAccordion from '@/components/FaqAccordion';

const PATH = '/calculators/dividend-growth-calculator';

export const metadata: Metadata = {
  title: { absolute: 'Dividend Growth Calculator 2026 — Project Dividend Growth Rate & Income' },
  description:
    'Free dividend growth calculator & dividend growth rate calculator. Project future stock dividend income with compound annual growth rates (CAGR) and reinvestment.',
  keywords: [
    'dividend growth calculator',
    'dividend growth rate calculator',
    'stock dividend calculator',
    'dividend income growth calculator',
    'compound dividend calculator',
    'dividend growth rate',
  ],
  alternates: { canonical: PATH },
};

const faqs = [
  {
    q: 'What is a dividend growth rate?',
    a: 'It is the average annual percentage by which a company increases its dividend per share. A company that lifts its dividend from $2.00 to $2.20 has grown it by 10% that year. Over many years, even mid-single-digit growth compounds dramatically.',
  },
  {
    q: 'How does a dividend growth rate calculator differ from a standard stock dividend calculator?',
    a: 'A standard stock dividend calculator computes your current yield and cash flow based on today\'s payout. A dividend growth rate calculator projects future compounding income by factoring in annual dividend increases (CAGR) and reinvestment over 5, 10, or 20 years.',
  },
  {
    q: 'How is future dividend income calculated?',
    a: 'The calculator applies the compound growth formula: future dividend = current dividend × (1 + growth rate) ^ years. At 8% growth, a $2 dividend becomes about $4.32 after 10 years and over $9 after 20 years.',
  },
  {
    q: 'How do you calculate compound dividend income growth?',
    a: 'Compound dividend income growth combines two compounding engines: annual dividend increases by the company and share accumulation via Dividend Reinvestment Plans (DRIP). Together, they accelerate dividend cash flow exponentially over time.',
  },
  {
    q: 'What is the Rule of 72 for dividends?',
    a: 'Divide 72 by your annual dividend growth rate to estimate how many years it takes for the dividend to double. At 8% growth, a dividend doubles roughly every 9 years (72 ÷ 8 = 9).',
  },
  {
    q: 'Is a high dividend growth rate sustainable forever?',
    a: 'No. Growth rates eventually slow as companies mature. A company cannot grow its dividend faster than its earnings indefinitely. Treat the rate you enter as an assumption, not a guarantee, and stress-test lower rates.',
  },
  {
    q: 'Why prefer dividend growth over a high starting yield?',
    a: 'A growing dividend eventually overtakes a high-but-flat one, and the rising payout usually comes with a rising share price. Over decades, the total return of a lower-yield grower often beats a higher-yield stock whose income is frozen.',
  },
];

export default function DividendGrowthPage() {
  return (
    <>
      <h1>Dividend Growth Calculator</h1>
      <p className="lead">
        Dividend growth is the engine of long-term passive income. Enter your current dividend and an
        annual growth rate to see how much it will pay in the future — and what it earns you over
        time.
      </p>

      <div className="card">
        <DividendGrowthCalc />
      </div>

      <FinanceNote />

      <AdBanner slot="growth" />

      <div className="prose">
        <h2>What is dividend growth?</h2>
        <p>
          Dividend growth is the rate at which a company raises its cash dividend per share over
          time. A stock that pays $2.00 this year and $2.20 next year has grown its dividend by 10%.
          On its own, one year of growth is just a raise — but sustained over many years, dividend
          growth is what turns a modest starter income into a serious stream of cash. This calculator
          shows you that compounding in seconds.
        </p>

        <h2>Why dividend growth beats a high starting yield</h2>
        <p>
          A high yield that never moves is a fixed income stream that inflation slowly erodes. A
          lower-yielding stock that raises its payout every year, by contrast, is a growing income
          stream. Given enough years, the grower&apos;s dividend catches and then surpasses the
          high-yielder&apos;s — usually while its share price has been rising too. This is why many
          long-term investors rank <em>growth</em> of the dividend above the <em>size</em> of the
          starting yield.
        </p>

        <h2>The Rule of 72 for dividends</h2>
        <p>
          Divide 72 by your annual dividend growth rate to find how many years until your dividend
          doubles. At 8% growth, a dividend doubles roughly every 9 years — so 20 years of that turns
          a $2 dividend into over $9. The Rule of 72 is a mental shortcut; the calculator above gives
          you the precise number for any rate and horizon.
        </p>

        <h2>The compound growth formula</h2>
        <p>
          <code>future dividend = current dividend &times; (1 + growth rate) <sup>years</sup></code>
        </p>
        <p>
          This is the same compound-interest math behind retirement savings, applied to income.
          Because the exponent does the heavy lifting, the later years contribute far more than the
          early ones — which is exactly why starting early matters. The projection table in the
          calculator shows each year&apos;s dividend and the cumulative total you would have
          received along the way.
        </p>

        <h2>How to use this calculator</h2>
        <ul>
          <li>Enter the dividend per share you receive today (or an annual income amount).</li>
          <li>Enter an annual growth rate — base it on the company&apos;s historical raises, not a hope.</li>
          <li>Pick a horizon of 10, 20 or 30 years to see the long-term effect.</li>
          <li>Run a second pass with a lower growth rate to see how sensitive the outcome is.</li>
        </ul>

        <h2>What is a realistic dividend growth rate?</h2>
        <p>
          Long-run U.S. dividend growth has tended to run a few percent above inflation, with the
          best dividend-growth companies and ETFs compounding their payouts at high-single to
          low-double digits over multi-year stretches. But rates vary widely by company and era, and
          no rate is guaranteed. Use a figure tied to the specific holding&apos;s track record, and
          remember that mature businesses usually grow the dividend more slowly over time, not
          faster.
        </p>

        <h2>Dividend growth vs dividend yield</h2>
        <p>
          Yield and growth are two halves of total income return, and they usually trade off. High
          yielders (covered-call ETFs, mature telecoms) hand you more cash now but rarely grow it.
          Growth payers hand you less now but raise it steadily. A balanced portfolio often holds
          both. Use the <Link href="/calculators/dividend-yield-calculator">Dividend Yield
          Calculator</Link> to weigh the starting income, and this tool to weigh the trajectory.
        </p>

        <h2>The danger of extrapolating past growth</h2>
        <p>
          A company that grew its dividend 12% per year for a decade will not necessarily do so for
          the next decade. Dividend growth ultimately has to be funded by earnings growth, and payout
          ratios rise toward their limit as the dividend outpaces profits. When you project 20 or 30
          years forward, sanity-check the implied payout ratio — if the math would require the
          company to pay out more than 100% of earnings, your growth assumption is too high.
        </p>

        <h2>Dividend growth is your inflation shield</h2>
        <p>
          A fixed dividend loses real purchasing power every year to inflation. A growing dividend,
          if it rises faster than prices, preserves and increases your real income. That is the core
          appeal of dividend-growth investing: not just income, but income that holds its value over
          decades. Pair it with reinvestment using the{' '}
          <Link href="/calculators/drip-calculator">DRIP calculator</Link> to see the full compounding
          effect.
        </p>

        <h2>How to calculate dividend growth rate on your stocks</h2>
        <p>
          To find a stock&apos;s compound annual dividend growth rate (CAGR), use the compound growth formula:
        </p>
        <p>
          <code>Dividend Growth Rate = (Current Dividend / Historical Dividend) ^ (1 / Years) - 1</code>
        </p>
        <p>
          For example, if a company paid $1.50 per share five years ago and pays $2.20 today, its 5-year dividend growth rate is <code>(2.20 / 1.50) ^ (1 / 5) - 1 = 7.96%</code> per year. Entering that rate into this <strong>dividend growth rate calculator</strong> lets you estimate whether that pace will double your income in 9 years or generate reliable replacement income over the next decade.
        </p>

        <h2>Using this tool as a forward-looking stock dividend calculator</h2>
        <p>
          While basic stock dividend calculators only evaluate current cash payouts based on today&apos;s yield, dividend growth investing relies on projecting how regular dividend raises increase your personal yield on cost. By modeling both the base dividend per share and expected annual raises, this calculator acts as a forward-looking <strong>stock dividend calculator</strong> designed for long-term equity investors.
        </p>

        <h2>Frequently Asked Questions</h2>
        <FaqAccordion faqs={faqs} />

        <h2>Related calculators</h2>
        <p>
          <Link href="/">Dividend Calculator</Link> ·{' '}
          <Link href="/calculators/drip-calculator">DRIP Calculator</Link> ·{' '}
          <Link href="/calculators/dividend-yield-calculator">Dividend Yield Calculator</Link> ·{' '}
          <Link href="/calculators/monthly-dividend-calculator">Monthly Dividend Income Calculator</Link>
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqJsonLd(faqs) }}
      />
    </>
  );
}
