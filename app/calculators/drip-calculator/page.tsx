import type { Metadata } from 'next';
import Link from 'next/link';
import DripCalc from '@/components/DripCalc';
import FinanceNote from '@/components/FinanceNote';
import AdBanner from '@/components/AdBanner';
import { webAppJsonLd, breadcrumbJsonLd } from '@/lib/schema';

const PATH = '/calculators/drip-calculator';

export const metadata: Metadata = {
  title: { absolute: 'DRIP Calculator 2026 — Dividend Reinvestment' },
  description:
    'Free DRIP calculator: simulate a Dividend Reinvestment Plan and see how reinvesting dividends compounds your shares, portfolio value and annual income over time.',
  alternates: { canonical: PATH },
};

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
          the share price goes nowhere.
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

        <h2>Related calculators</h2>
        <p>
          <Link href="/">Dividend Calculator</Link> ·{' '}
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
    </>
  );
}
