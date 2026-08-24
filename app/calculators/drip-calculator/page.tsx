import type { Metadata } from 'next';
import Link from 'next/link';
import DripCalc from '@/components/DripCalc';
import FinanceNote from '@/components/FinanceNote';
import AdBanner from '@/components/AdBanner';
import { webAppJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/lib/schema';

const PATH = '/calculators/drip-calculator';

export const metadata: Metadata = {
  title: { absolute: 'DRIP Calculator 2026 — Dividend Reinvestment' },
  description:
    'Free DRIP calculator and dividend reinvestment calculator in one: see how reinvested dividends compound your shares, portfolio value and annual income over time.',
  alternates: { canonical: PATH },
};

const faqs = [
  {
    q: 'What is a dividend reinvestment calculator (DRIP calculator)?',
    a: 'A dividend reinvestment calculator — also called a DRIP calculator — simulates the compounding loop of reinvesting each dividend payment to buy more shares. It shows how your share count, portfolio value and annual dividend income grow year by year under your own assumptions for yield, dividend growth and contributions.',
  },
  {
    q: 'Is a dividend drip calculator the same as a DRIP calculator?',
    a: 'Yes. "Dividend drip calculator" and "DRIP calculator" are two names for the same tool — both project the effect of a dividend reinvestment plan (DRIP), where dividends automatically buy more shares instead of arriving as cash.',
  },
  {
    q: 'How do I calculate dividend reinvestment?',
    a: 'Use the calculator above: enter your starting investment, share price, dividend yield, dividend growth rate, monthly contribution and years. It compounds each payment into new shares and reports the final value, shares owned and annual income. As a rough manual rule, a reinvested position grows roughly like (1 + dividend growth rate) per year, but the calculator handles the year-by-year detail.',
  },
  {
    q: 'Is dividend reinvestment worth it?',
    a: 'Generally yes for long-term investors who do not need the income today — reinvested dividends compound your position, and in tax-advantaged accounts the reinvestment triggers no immediate tax. If you live on the income, or the holding looks overvalued, taking cash may be better. See the DRIP vs taking cash section above.',
  },
  {
    q: 'Do DRIP calculators include dividend growth?',
    a: 'Only if you tell them to. This calculator has a dividend growth rate input: set it to 0 for flat payouts, or to a historical rate (like roughly 10% for SCHD) to model growing dividends. Growth rates are planning assumptions, not guarantees.',
  },
  {
    q: 'Do I pay taxes on reinvested dividends?',
    a: 'In taxable accounts, yes — reinvested dividends are taxable in the year paid even though you never receive the cash. In tax-advantaged accounts (like IRAs and 401(k)s), reinvestment typically creates no immediate tax. This calculator does not model taxes; consult a tax professional.',
  },
];

export default function DripPage() {
  return (
    <>
      <h1>DRIP Calculator (Dividend Reinvestment)</h1>
      <p className="lead">
        A DRIP automatically buys more shares with your dividends — so next year&apos;s dividends are
        paid on more shares. This calculator simulates that compounding year by year.
      </p>

      <div className="card">
        <DripCalc />
      </div>

      <FinanceNote />

      <AdBanner slot="drip" />

      <div className="prose">
        <h2>How this DRIP calculator works</h2>
        <p>
          A DRIP (Dividend Reinvestment Plan) automatically uses each dividend payment to buy more
          shares of the same stock or ETF, instead of sending you cash. This DRIP calculator
          simulates that loop year by year: it takes your starting investment, share price,
          dividend yield, dividend growth rate and an optional monthly contribution, then projects
          your share count, portfolio value and annual dividend income into the future.
        </p>
        <p>
          The mechanic that makes it powerful is compounding. Each reinvested dividend buys a few
          more shares; those extra shares pay dividends next year, which buy still more shares.
          Over a decade or two the share count — and therefore the income — curves upward, even if
          the share price goes nowhere. If you are new to the concept, see{' '}
          <Link href="/blog/how-dividend-reinvestment-works-drip">
            how dividend reinvestment (DRIP) works
          </Link>{' '}
          step by step.
        </p>

        <h2>Dividend Reinvestment Calculator: what it tells you</h2>
        <p>
          A dividend reinvestment calculator takes the same inputs a DRIP calculator does —
          starting investment, share price, dividend yield, dividend growth, price growth, monthly
          contributions and a time horizon — and projects the result of automatically reinvesting
          every payment. The key output is how much faster your position grows compared with taking
          the cash: reinvested shares earn dividends of their own, so both your share count and
          your annual dividend income rise year after year.
        </p>
        <p>
          Use it when you want to compare the reinvestment path against cashing out, or when you
          are deciding how much to contribute monthly to reach a target income by retirement.
        </p>

        <h2>Dividend Drip Calculator: the compounding math</h2>
        <p>
          &ldquo;Dividend drip&rdquo; is just another name for DRIP — the same dividend
          reinvestment loop, drip by drip. The math that makes it powerful is compounding. If
          dividends are reinvested at a growth rate <code>g</code>, the shares you own after{' '}
          <code>n</code> years grow roughly like <code>(1 + g)^n</code>, and the income on those
          shares grows with it.
        </p>
        <p>
          Even a modest 4% starting yield plus a few percent of dividend growth turns a single lump
          sum into a much larger income stream over a decade. The calculator above runs this loop
          year by year with your actual numbers — try raising the dividend growth rate or the years
          to see the compound effect yourself.
        </p>

        <h2>A worked DRIP example</h2>
        <p>
          Take a $10,000 position at a 4% yield with 5% dividend growth and a $100 monthly
          contribution, reinvesting every payment. In year one you earn roughly $400 in dividends
          and buy extra shares with it. By year 15 you own far more shares than your contributions
          alone would have bought, and your annual dividend income from those reinvested shares
          keeps rising even if the stock price stalls. Use the calculator above to test your own
          assumptions — the two inputs that move the result most are dividend growth rate and time
          horizon.
        </p>

        <h2>DRIP vs taking cash: when each wins</h2>
        <p>
          Reinvesting wins when you do not need the income today, you believe in the long-term
          business, and taxes on reinvested dividends are manageable (in many tax-advantaged
          accounts, dividends reinvested inside the wrapper generate no immediate tax). Taking cash
          wins when you rely on the income to live on, when the holding looks overvalued and you
          would rather deploy the cash elsewhere, or when reinvesting would over-concentrate you in
          a single stock.
        </p>
        <p>
          There is no universally right answer — the DRIP calculator just shows you the
          reinvestment path clearly so you can compare it against cash-in-hand.
        </p>

        <h2>What this DRIP calculator does not predict</h2>
        <ul>
          <li>
            <strong>Dividend cuts.</strong> Companies can suspend or reduce dividends; past growth
            does not guarantee future payouts.
          </li>
          <li>
            <strong>Share price moves.</strong> The price-growth assumption is a planning input,
            not a forecast.
          </li>
          <li>
            <strong>Taxes and fees.</strong> In taxable accounts, reinvested dividends are still
            owed tax in the year paid, even though you never see the cash.
          </li>
          <li>
            <strong>Fractional shares.</strong> Most modern brokers support fractional
            reinvestment; some older DRIP plans round to whole shares.
          </li>
        </ul>

        <h2>Frequently asked questions</h2>
        {faqs.map((f) => (
          <div key={f.q}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}

        <h2>Related calculators</h2>
        <p>
          <Link href="/">Dividend Calculator</Link> ·{' '}
          <Link href="/calculators/schd-dividend-calculator">SCHD Dividend Calculator</Link> ·{' '}
          <Link href="/calculators/qqqi-dividend-calculator">QQQI Dividend Calculator</Link> ·{' '}
          <Link href="/calculators/monthly-dividend-calculator">Monthly Dividend Income Calculator</Link> ·{' '}
          <Link href="/calculators/dividend-growth-calculator">Dividend Growth Calculator</Link>
        </p>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: webAppJsonLd('DRIP Calculator', PATH) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'DRIP Calculator', path: PATH },
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
