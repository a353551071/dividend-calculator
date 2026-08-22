import { getDividendsAsOf, getTickerData } from '@/lib/dividendData';

/**
 * Server-rendered "Upcoming distribution" block for ticker calendar blogs.
 * All values come from data/dividends.json (Yahoo-sourced, refreshed bi-weekly).
 * YMYL rules: projected dates are labelled as projections, pay dates are never
 * fabricated, and the official fund page is always the final word.
 */
export default function UpcomingDistribution({ ticker }: { ticker: string }) {
  const t = getTickerData(ticker);
  const asOf = getDividendsAsOf();
  if (!t || !asOf) return null; // Silent degrade — no data, no block.

  const nextDate = t.projectedNext[0];
  // Days counted from the data's as-of date (SSG page, so "from today" would go stale).
  const daysAway = nextDate
    ? Math.max(0, Math.round((Date.parse(nextDate) - Date.parse(asOf)) / 86_400_000))
    : null;
  const actuals = t.recent3
    .slice()
    .reverse() // most recent first
    .map((r) => `${fmtDate(r.exDate)} · $${r.amount.toFixed(3)}`)
    .join(' / ');

  return (
    <section
      style={{
        border: '1px solid var(--card-border)',
        borderRadius: 12,
        padding: '14px 18px',
        margin: '18px 0 26px',
        background: 'var(--muted)',
        fontSize: '.95rem',
      }}
    >
      <h2 style={{ marginTop: 0, marginBottom: 8, fontSize: '1.15rem' }}>
        Upcoming {ticker.toUpperCase()} distribution
      </h2>
      <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.85 }}>
        {nextDate && (
          <li>
            <strong>Next projected ex-dividend date: ~{fmtDate(nextDate)}</strong>
            {daysAway && daysAway > 0 ? ` (about ${daysAway} day${daysAway === 1 ? '' : 's'} after ${fmtDate(asOf)})` : ''}{' '}
            — <em>projected</em> from the {t.cadence} cadence, not yet declared.
          </li>
        )}
        <li>Recent actual distributions (per share): {actuals}</li>
        {t.ttmYieldPct != null && (
          <li>
            Trailing 12-month distribution yield: ~{t.ttmYieldPct.toFixed(1)}% (at a recent price of $
            {t.price?.toFixed(2)})
          </li>
        )}
        <li>
          Payments typically land within about a week of the ex-dividend date — confirm exact dates and
          amounts on the official fund page.
        </li>
      </ul>
      <p style={{ margin: '10px 0 0', fontSize: '.8rem', color: 'var(--muted-foreground)' }}>
        Data as of {fmtDate(asOf)} · source: {t.source} · projected from historical cadence, confirm on
        the official fund page.
      </p>
    </section>
  );
}

function fmtDate(iso: string): string {
  const d = new Date(iso + (iso.length === 10 ? 'T00:00:00Z' : ''));
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}
