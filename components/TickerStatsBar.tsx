import { getDividendsAsOf, getTickerData } from '@/lib/dividendData';

/**
 * ETF 计算器页顶部的"真实数据条"(NerdWallet 式信任信号):
 * 当前价 / TTM 收益率 / 派息频率 / 下次预估除息日,全部带 as-of 日期。
 * 数据来自 data/dividends.json(Yahoo 双周刷新);无数据静默降级不渲染。
 */
export default function TickerStatsBar({ ticker }: { ticker: string }) {
  const t = getTickerData(ticker);
  const asOf = getDividendsAsOf();
  if (!t || !asOf) return null; // Silent degrade — no data, no bar.

  const next = t.projectedNext[0];
  const items = [
    t.price != null && { label: 'price', text: `$${t.price.toFixed(2)}` },
    t.ttmYieldPct != null && { label: 'TTM yield', text: `~${t.ttmYieldPct.toFixed(1)}%` },
    { label: 'pays', text: t.cadence },
    next && { label: 'next ex-div', text: `~${fmtDate(next)}` },
  ].filter(Boolean) as { label: string; text: string }[];

  return (
    <section className="ticker-stats" aria-label={`${ticker} key stats`}>
      <span className="ts-ticker">{ticker.toUpperCase()}</span>
      {items.map((i) => (
        <span key={i.label} className="ts-item">
          <strong>{i.text}</strong> <span className="ts-label">{i.label}</span>
        </span>
      ))}
      <span className="ts-as-of">
        data as of {fmtDate(asOf)} · projected from {t.cadence} cadence, confirm on the official fund page
      </span>
    </section>
  );
}

function fmtDate(iso: string): string {
  const d = new Date(iso + (iso.length === 10 ? 'T00:00:00Z' : ''));
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}
