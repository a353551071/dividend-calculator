import type { Metadata } from 'next';
import Link from 'next/link';
import {
  getDividendsAsOf,
  getTickerData,
  type TickerDividendData,
} from '@/lib/dividendData';
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/schema';
import AdBanner from '@/components/AdBanner';

const PATH = '/dividend-calendar';

const TICKERS = ['SCHD', 'QQQI', 'JEPI', 'JEPQ'] as const;

interface Row {
  ticker: string;
  data: TickerDividendData;
}

function loadRows(): Row[] {
  const rows: Row[] = [];
  for (const t of TICKERS) {
    const data = getTickerData(t);
    if (data) rows.push({ ticker: t, data });
  }
  return rows;
}

function fmtDate(iso: string): string {
  return new Date(iso + 'T00:00:00Z').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

function fmtMoney(n: number): string {
  return `$${n.toFixed(3).replace(/0+$/, '').replace(/\.$/, '')}`;
}

const rows = loadRows();
const asOf = getDividendsAsOf();
const asOfText = asOf
  ? new Date(asOf + 'T00:00:00Z').toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC',
    })
  : null;

export const metadata: Metadata = {
  title: { absolute: '2026 Dividend Calendar: SCHD, QQQI, JEPI & JEPQ Ex-Dates' },
  description:
    'Live 2026 ex-dividend and payout calendar for SCHD, QQQI, JEPI and JEPQ: next projected ex-dividend dates, recent payments per share, yield, and payout frequency — refreshed from real distribution data. Free, no signup.',
  alternates: { canonical: PATH },
};

const faqs = [
  {
    q: 'When does SCHD pay dividends in 2026?',
    a: 'SCHD pays four times a year, in March, June, September and December, with the ex-dividend date in the last third of each of those months and the payment one to two weeks later. The projected next ex-dividend date is in the calendar table above, refreshed from recent distribution data.',
  },
  {
    q: 'What is SCHD’s next ex-dividend date?',
    a: 'SCHD’s next projected ex-dividend date is shown in the calendar table above. SCHD declares official dates each quarter, so treat projections as an estimate and confirm with Schwab before trading around the date.',
  },
  {
    q: 'Which of these ETFs pay monthly dividends?',
    a: 'QQQI, JEPI and JEPQ pay monthly — roughly twelve payments a year, usually near the start of each month. SCHD pays quarterly, in March, June, September and December.',
  },
  {
    q: 'What is an ex-dividend date?',
    a: 'The ex-dividend date is the cutoff for receiving a dividend: buy the fund before the ex-dividend date and hold through it, and you are paid on the payment date. Buy on or after it, and the seller receives that payment instead.',
  },
];

const crumbs = [
  { name: 'Home', path: '/' },
  { name: '2026 Dividend Calendar', path: PATH },
];

const CALC_LINKS: Record<string, { href: string; label: string }> = {
  SCHD: { href: '/calculators/schd-dividend-calculator', label: 'SCHD dividend calculator' },
  QQQI: { href: '/calculators/qqqi-dividend-calculator', label: 'QQQI dividend calculator' },
};

const BLOG_LINKS: Record<string, { href: string; label: string }> = {
  SCHD: { href: '/blog/schd-dividend-calendar', label: 'SCHD dividend calendar explained' },
  QQQI: { href: '/blog/qqqi-dividend-calendar', label: 'QQQI dividend calendar explained' },
  JEPI: { href: '/blog/jepi-dividend-calendar', label: 'JEPI dividend calendar explained' },
};

const PATTERNS: Record<string, string> = {
  SCHD:
    'Pays quarterly in March, June, September and December, with the ex-dividend date in the last third of the month and payment one to two weeks later.',
  QQQI:
    'Pays monthly, with recent ex-dividend dates landing near the start of the month and payment following within roughly two weeks.',
  JEPI:
    'Pays monthly, with the ex-dividend date typically on or around the first business day of the month and payment mid-month.',
  JEPQ:
    'Pays monthly like JEPI, with the ex-dividend date near the start of the month and payment within the following two weeks.',
};

function RecentTable({ data }: { data: TickerDividendData }) {
  return (
    <table>
      <thead>
        <tr>
          <th scope="col">Ex-dividend date</th>
          <th scope="col">Amount per share</th>
        </tr>
      </thead>
      <tbody>
        {data.recent3.map((r) => (
          <tr key={r.exDate}>
            <td>{fmtDate(r.exDate)}</td>
            <td>{fmtMoney(r.amount)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function DividendCalendarPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqJsonLd(faqs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(crumbs) }}
      />
      <h1>2026 Ex-Dividend &amp; Payout Calendar: SCHD, QQQI, JEPI, JEPQ</h1>
      <p className="lead">
        The next ex-dividend dates, recent payments and yields for four of the most-held
        dividend ETFs — SCHD, QQQI, JEPI and JEPQ — in one calendar, refreshed from real
        distribution data. Dates marked “projected” follow each fund’s recent cadence;
        declared dates always come from the fund issuer first.
        {asOfText ? ` Data as of ${asOfText}.` : null}
      </p>

      <AdBanner slot="calendar" />

      <div className="prose">
        {rows.length > 0 ? (
          <>
            <h2>Next ex-dividend dates at a glance</h2>
            <table>
              <thead>
                <tr>
                  <th scope="col">ETF</th>
                  <th scope="col">Frequency</th>
                  <th scope="col">Last ex-dividend</th>
                  <th scope="col">Last payment / share</th>
                  <th scope="col">Yield (TTM)</th>
                  <th scope="col">Next ex-dividend (projected)</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(({ ticker, data }) => (
                  <tr key={ticker}>
                    <th scope="row">{ticker}</th>
                    <td>{data.cadence}</td>
                    <td>{fmtDate(data.lastExDate)}</td>
                    <td>{fmtMoney(data.lastAmount)}</td>
                    <td>{data.ttmYieldPct != null ? `${data.ttmYieldPct.toFixed(2)}%` : '—'}</td>
                    <td>{data.projectedNext[0] ? fmtDate(data.projectedNext[0]) : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h2>Per-ETF schedule and recent payments</h2>
            {rows.map(({ ticker, data }) => (
              <div key={ticker}>
                <h3>
                  {ticker} dividend dates ({data.cadence})
                </h3>
                <p>{PATTERNS[ticker]}</p>
                <RecentTable data={data} />
                <p>
                  {CALC_LINKS[ticker] ? (
                    <>
                      Estimate what {ticker} pays you with the{' '}
                      <Link href={CALC_LINKS[ticker].href}>{CALC_LINKS[ticker].label}</Link>.{' '}
                    </>
                  ) : null}
                  {BLOG_LINKS[ticker] ? (
                    <>
                      Or read the{' '}
                      <Link href={BLOG_LINKS[ticker].href}>{BLOG_LINKS[ticker].label}</Link>{' '}
                      for how the cycle works.
                    </>
                  ) : null}
                </p>
              </div>
            ))}
          </>
        ) : (
          <p>
            The live calendar table is refreshing — check back shortly, or use the{' '}
            <Link href="/calculators/monthly-dividend-calculator">
              monthly dividend calculator
            </Link>{' '}
            in the meantime.
          </p>
        )}

        <h2>How to use this calendar</h2>
        <p>
          To receive a fund’s next dividend you must own shares{' '}
          <strong>before the ex-dividend date</strong> and hold through it. Buy on or after
          the ex-dividend date and the seller receives that payment. The cash typically
          lands in your brokerage account one to two weeks after the ex-dividend date.
        </p>
        <p>
          Dates labelled “projected” are estimated from each fund’s recent cadence and move
          a few days year to year; they are only final once the issuer declares them.
          Confirm declared dates on the official fund page before trading.
        </p>
        <p>
          Want to know what those payments add up to? The{' '}
          <Link href="/calculators/monthly-dividend-calculator">
            monthly dividend calculator
          </Link>{' '}
          turns yields and holdings into a monthly income estimate, and the{' '}
          <Link href="/calculators/drip-calculator">DRIP calculator</Link> shows how
          reinvesting each payment compounds over time.
        </p>

        <h2>Dividend calendar FAQ</h2>
        {faqs.map((f) => (
          <div key={f.q}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
      </div>
    </>
  );
}
