import type { Metadata } from 'next';
import Link from 'next/link';
import MonthlyIncomeCalc from '@/components/MonthlyIncomeCalc';
import FinanceNote from '@/components/FinanceNote';
import AdBanner from '@/components/AdBanner';
import { webAppJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/lib/schema';

const PATH = '/calculators/monthly-dividend-calculator';

export const metadata: Metadata = {
  title: 'Monthly Dividend Calculator 2026 — Monthly Income',
  description:
    'Use this monthly dividend calculator to project how much monthly dividend income your portfolio generates — today and years ahead.',
  alternates: { canonical: PATH },
};

const faqs = [
  {
    q: 'How is monthly dividend income calculated?',
    a: 'Multiply your investment by the annual dividend yield to get yearly income, then divide by 12. At a 4% yield on $100,000 you earn $4,000 per year, or about $333 per month in dividend income.',
  },
  {
    q: 'How much do I need to invest for $1,000 a month in dividends?',
    a: 'At a 4% dividend yield you need roughly $300,000 invested ($12,000 a year ÷ 4%). A higher yield lowers the amount, but unusually high yields carry more risk, so check the payout ratio before chasing them.',
  },
  {
    q: 'Do I have to buy monthly dividend stocks to get monthly income?',
    a: 'No. You can blend quarterly payers that pay on different schedules, or simply accumulate quarterly dividends and pay yourself monthly. Many investors prefer this to stretching for a handful of high-yield monthly payers.',
  },
  {
    q: 'Will my monthly income stay the same forever?',
    a: 'Only if the yield and your investment are static. In reality companies raise (or cut) dividends and share prices move. This calculator includes an optional growth rate so you can project rising monthly income over time.',
  },
  {
    q: 'Is the monthly income shown before or after tax?',
    a: 'It is pre-tax. Your actual take-home depends on whether the dividends are qualified or ordinary, your tax bracket, and whether you hold the shares in a tax-advantaged account. Consult a tax professional for your situation.',
  },
];

export default function MonthlyDividendPage() {
  return (
    <>
      <h1>Monthly Dividend Calculator</h1>
      <p className="lead">
        This monthly dividend calculator works backwards from your goal: enter the money you have
        invested and the dividend yield, and see exactly how much monthly income it generates — today
        and years into the future.
      </p>

      <div className="card">
        <MonthlyIncomeCalc />
      </div>

      <FinanceNote />

      <AdBanner slot="monthly" />

      <div className="prose">
        <h2>What is monthly dividend income?</h2>
        <p>
          Monthly dividend income is the cash a portfolio pays out as dividends each month. Most U.S.
          stocks pay quarterly, but the income is easily expressed — and spent — monthly by dividing
          the annual total by twelve. Knowing your monthly income turns an abstract portfolio value
          into a concrete paycheck, which is what most income investors are ultimately chasing.
        </p>

        <h2>The monthly income formula</h2>
        <p>
          <code>monthly income = investment &times; annual yield &divide; 12</code>
        </p>
        <p>
          That is the entire calculation. The calculator above also projects forward: enter a dividend
          growth rate and a holding period, and it compounds the yield upward so you can see your
          monthly income rising year by year.
        </p>

        <h2>How to use this calculator</h2>
        <ul>
          <li>Enter the total amount you have invested (or plan to invest).</li>
          <li>Enter the portfolio&apos;s blended annual dividend yield.</li>
          <li>Add a dividend growth rate and a horizon to project rising income over time.</li>
          <li>Use the result as a planning guide, not a guarantee — yields and dividends change.</li>
        </ul>

        <h2>How much do you need for $1,000 a month?</h2>
        <p>
          At a 4% dividend yield, $1,000 a month of passive income needs roughly{' '}
          <strong>$300,000</strong> invested ($12,000 a year ÷ 4%). A higher yield lowers the bar — at
          6% you need about $200,000 — but an unusually high yield is often a sign of risk, so check
          the <Link href="/calculators/dividend-payout-ratio-calculator">payout ratio</Link> before
          chasing it. The table below shows how the target shifts with yield.
        </p>
        <table>
          <thead>
            <tr><th>Target monthly income</th><th>Capital needed @ 3% yield</th><th>@ 4% yield</th><th>@ 6% yield</th></tr>
          </thead>
          <tbody>
            <tr><td>$500</td><td>$200,000</td><td>$150,000</td><td>$100,000</td></tr>
            <tr><td>$1,000</td><td>$400,000</td><td>$300,000</td><td>$200,000</td></tr>
            <tr><td>$3,000</td><td>$1,200,000</td><td>$900,000</td><td>$600,000</td></tr>
            <tr><td>$5,000</td><td>$2,000,000</td><td>$1,500,000</td><td>$1,000,000</td></tr>
          </tbody>
        </table>

        <h2>The yield–risk trade-off</h2>
        <p>
          It is tempting to crank the yield up to reach a target faster, but yield and risk are
          joined at the hip. Yield spikes are usually caused by a falling share price or an
          unsustainable payout, not by generosity. A 7% yield on a stock that cuts its dividend
          delivers less income than a steady 3.5% yield that grows for twenty years. Aim for a yield
          you can defend, not the highest one on the screen.
        </p>

        <h2>Monthly vs quarterly payers</h2>
        <p>
          Some holdings — certain REITs, covered-call ETFs and business-development companies — pay
          every month. Most blue-chip stocks pay quarterly. You do not need monthly payers to receive
          monthly income: a portfolio of quarterly payers on staggered schedules (some paying in
          Jan/Apr/Jul/Oct, others in Feb/May/Aug/Nov) spreads cash across all twelve months. Many
          investors prefer this diversification over concentrating in a few high-yield monthly names.
        </p>

        <h2>Dividend growth shortens the path</h2>
        <p>
          A flat 4% yield on $300,000 delivers $1,000 a month forever. But a portfolio whose
          <Link href="/calculators/dividend-growth-calculator"> dividends grow</Link> 6% per year
          lifts that monthly income every year — to roughly $1,340 after five years and $1,790 after
          ten, with no new capital added. Growth turns a static paycheck into a rising one and
          protects it from inflation. Reinvesting along the way accelerates this dramatically; see the{' '}
          <Link href="/calculators/drip-calculator">DRIP calculator</Link> for the full compounding
          math.
        </p>

        <h2>Taxes reduce your take-home</h2>
        <p>
          The income this calculator shows is pre-tax. Qualified dividends are taxed at the lower
          long-term capital-gains rate in the U.S., while ordinary dividends are taxed as regular
          income — and holding dividend stocks inside a tax-advantaged account (like an IRA) may
          shelter the income entirely until withdrawal. Two portfolios with identical yields can
          therefore produce very different after-tax monthly income. Treat the figure here as a gross
          number and adjust for your own tax situation.
        </p>

        <h2>Building a monthly paycheck</h2>
        <p>
          The most resilient monthly income comes from a diversified basket of payers across sectors
          and payout schedules, not from a single high-yield holding. Blend a core of lower-yield,
          steadily growing payers with a smaller slice of higher-yield names, keep an eye on every{' '}
          <Link href="/calculators/dividend-payout-ratio-calculator">payout ratio</Link>, and let
          growth and reinvestment do the heavy lifting over time. Use this calculator to set the
          target, then work backwards to a realistic plan to reach it.
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
          <Link href="/calculators/drip-calculator">DRIP Calculator</Link> ·{' '}
          <Link href="/calculators/dividend-yield-calculator">Dividend Yield Calculator</Link> ·{' '}
          <Link href="/calculators/dividend-growth-calculator">Dividend Growth Calculator</Link>
        </p>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: webAppJsonLd('Monthly Dividend Calculator', PATH) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Monthly Dividend Calculator', path: PATH },
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
