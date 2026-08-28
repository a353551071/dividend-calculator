import type { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbJsonLd } from '@/lib/schema';
import { getDividendsAsOf } from '@/lib/dividendData';

const PATH = '/methodology';

export const metadata: Metadata = {
  title: 'Methodology: Formulas, Data Sources & Accuracy',
  description:
    'Every formula behind our dividend calculators, where the live ticker data comes from, how often it refreshes, and how the open-source dividend-math engine makes all of it independently verifiable.',
  alternates: { canonical: PATH },
};

export default function MethodologyPage() {
  const asOf = getDividendsAsOf();

  return (
    <>
      <h1>Methodology: how every number on this site is calculated</h1>
      <p className="lead">
        Financial calculators earn trust one way: show the math. This page documents every formula
        our calculators run, where the live data comes from, and how you can verify all of it
        yourself — the core engine is open source.
      </p>

      <div className="prose">
        <h2>The open-source engine behind every result</h2>
        <p>
          The compounding math on this site is implemented twice, deliberately: once in{' '}
          <a
            href="https://github.com/a353551071/dividend-math"
            target="_blank"
            rel="noopener noreferrer"
          >
            dividend-math
          </a>
          , our MIT-licensed open-source library (installable from npm as{' '}
          <code>dividend-math</code>), and once inside this site&apos;s own code base, covered by
          unit tests that run on every change. The two implementations are kept in agreement, and
          because the library is public, anyone can read the exact recurrence, run the tests, or
          file an issue if a number looks wrong. We know of no other dividend calculator whose
          math you can audit end to end.
        </p>

        <h2>Core formulas</h2>
        <p>
          <strong>Dividend yield</strong> — annual dividends per share divided by the share price:
        </p>
        <p>
          <code>yield % = (annual dividend per share &divide; share price) &times; 100</code>
        </p>
        <p>
          <strong>Yield on cost</strong> — the same numerator over <em>your</em> average purchase
          price, which is why it rises over time in the year-by-year tables even when the market
          yield stays flat:
        </p>
        <p>
          <code>yield on cost % = (annual dividend per share &divide; your cost basis per share) &times; 100</code>
        </p>
        <p>
          <strong>Dividend payout ratio</strong> — the share of earnings paid out as dividends,
          the standard sustainability check (our gauge bands: 0–35% safe, 35–75% healthy,
          75–100% stretched, above 100% unsustainable unless earnings are depressed):
        </p>
        <p>
          <code>payout ratio % = (dividend per share &divide; earnings per share) &times; 100</code>
        </p>
        <p>
          <strong>DRIP projection</strong> — a year-by-year simulation, not a closed-form formula.
          For each year: shares grow by reinvested dividends plus any monthly contributions; the
          per-share dividend grows at your dividend-growth input; the share price grows at your
          price-growth input. Formally, with <code>D&#8348;</code> the per-share dividend in year{' '}
          <code>t</code>, <code>S&#8348;</code> shares and <code>P&#8348;</code> price:
        </p>
        <p>
          <code>D&#8348;&#8314;&#8321; = D&#8348; &times; (1 + dividend growth)</code>
          <br />
          <code>P&#8348;&#8314;&#8321; = P&#8348; &times; (1 + price growth)</code>
          <br />
          <code>S&#8348;&#8314;&#8321; = S&#8348; + (S&#8348; &times; D&#8348;) &divide; P&#8348; + contributions &divide; P&#8348;&#8314;&#8321;</code>
        </p>
        <p>
          When you switch DRIP off, the dividends are still computed (they show up as &ldquo;total
          distributions received&rdquo;) but the share count no longer grows from them. Monthly
          contributions are handled at the year&apos;s price for simplicity — the difference versus
          true monthly compounding is small at the horizons these calculators are used for, and the
          unit tests pin the behavior.
        </p>

        <h2>Where the live ticker data comes from</h2>
        <p>
          ETF pages (SCHD, QQQI, JEPI, JEPQ) prefill their inputs and show distribution tables from
          a data pipeline we run on a roughly bi-weekly cadence: per-share distribution history is
          pulled from Yahoo Finance&apos;s chart API (events=div), cached into a JSON file at build
          time, and rendered statically. Every dynamic number on the site carries an{' '}
          <strong>&ldquo;as of&rdquo; date</strong> — the date of the underlying data refresh
          {asOf ? ` (currently ${asOf})` : ''} — because a distribution figure without a date is
          marketing, not data.
        </p>
        <p>
          Projected ex-dividend dates extend the fund&apos;s observed payment cadence forward and
          assume the most recent per-share amount repeats. They are projections, not
          announcements: confirm dates and amounts on the official fund page (Schwab, NEOS) or
          your broker before making a trading decision.
        </p>

        <h2>How we keep it accurate</h2>
        <ul>
          <li>
            <strong>Unit tests on every change</strong> — the projection engine and each formula
            are covered by automated tests, run in CI before anything ships.
          </li>
          <li>
            <strong>Worked examples with real figures</strong> — editorial examples use real,
            checkable numbers (for instance, Pfizer&apos;s 2019 payout of $1.44 against $2.82 of
            earnings, a 49.4% payout ratio, on our{' '}
            <Link href="/calculators/dividend-payout-ratio-calculator">
              payout ratio calculator page
            </Link>
            ).
          </li>
          <li>
            <strong>Formatting conventions</strong> — money to 2 decimals, per-share distributions
            to 3 (a $0.652 payment is genuinely three-decimal money), yields to one decimal, and
            tabular numerals everywhere so columns align.
          </li>
          <li>
            <strong>Assumptions stay visible</strong> — growth rates are your inputs, clearly
            labeled as planning assumptions, never hidden defaults.
          </li>
        </ul>

        <h2>What these calculators are not</h2>
        <p>
          They are planning tools, not predictions. Nothing here forecasts which way a share price
          or distribution moves; the value is in making the compounding arithmetic transparent so
          you can weigh your own assumptions. Nothing on this site is financial advice — see the{' '}
          <Link href="/about">about page</Link> for the full disclaimer, and{' '}
          <Link href="/contact">contact us</Link> if a number ever looks wrong.
        </p>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Methodology', path: PATH },
          ]),
        }}
      />
    </>
  );
}
