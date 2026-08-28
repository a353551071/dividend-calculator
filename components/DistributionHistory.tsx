import { getDividendsAsOf, getTickerData } from '@/lib/dividendData';

function fmtDate(iso: string): string {
  const d = new Date(iso + (iso.length === 10 ? 'T00:00:00Z' : ''));
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

interface DistributionHistoryProps {
  ticker: string;
  /** 每页独立的一句编辑视角(去同构:QQQI 与 SCHD 的叙事不同)。 */
  intro: string;
}

/**
 * 真实派息史小节(AdSense 整改 A2):recent3 历史 + projectedNext 预估,
 * build 时读 data/dividends.json,无数据静默降级不渲染。
 */
export default function DistributionHistory({ ticker, intro }: DistributionHistoryProps) {
  const t = getTickerData(ticker);
  const asOf = getDividendsAsOf();
  if (!t || !asOf) return null;

  const past = [...t.recent3].reverse().map((d) => ({
    when: fmtDate(d.exDate),
    amount: `$${d.amount.toFixed(3)}`,
    projected: false,
  }));
  const upcoming = t.projectedNext.slice(0, 3).map((iso) => ({
    when: fmtDate(iso),
    amount: `~$${t.lastAmount.toFixed(3)}`,
    projected: true,
  }));
  const rows = [...past, ...upcoming];

  return (
    <section className="dist-history">
      <h2>
        {ticker} distribution history &amp; upcoming ex-dividend dates
      </h2>
      <p>{intro}</p>
      <table>
        <thead>
          <tr>
            <th>Ex-dividend date</th>
            <th>Per-share amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={`${r.when}-${r.amount}`}>
              <td>{r.when}</td>
              <td>{r.amount}</td>
              <td>{r.projected ? 'Projected — assumes last amount repeats' : 'Paid'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="sc-footnote">
        Historical amounts from Yahoo Finance ({t.cadence} payer). Projected rows repeat the most
        recent per-share amount on the fund&apos;s cadence — distributions change from period to
        period, so confirm dates and amounts on the official fund page before trading. Data as of{' '}
        {fmtDate(asOf)}.
      </p>
    </section>
  );
}
