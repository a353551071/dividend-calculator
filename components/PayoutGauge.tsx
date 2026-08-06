'use client';

interface PayoutGaugeProps {
  /** Payout ratio %, 0..150+。NaN/非法 → 不渲染。 */
  ratio: number;
}

interface Tier {
  upto: number;
  label: string;
  color: string;
  desc: string;
}

// 计划 F1.5 阈值:0-35 安全 / 35-75 健康 / 75-100 偏高 / >100 不可持续
const TIERS: Tier[] = [
  { upto: 35, label: 'Safe', color: '#10b981', desc: 'Conservative; plenty of room to grow the dividend.' },
  { upto: 75, label: 'Healthy', color: '#2563eb', desc: 'Balances cash return with reinvestment.' },
  { upto: 100, label: 'High', color: '#f59e0b', desc: 'Little room for dividend growth; vulnerable to an earnings dip.' },
  { upto: 150, label: 'Unsustainable', color: '#ef4444', desc: 'Pays out more than it earns — usually funded by debt or reserves.' },
];

const SCALE_MAX = 150;

/** 派息率可持续性仪表盘:分段彩条 + 当前比率指针 + 文字判定。 */
export default function PayoutGauge({ ratio }: PayoutGaugeProps) {
  if (!Number.isFinite(ratio)) return null;

  const clamped = Math.max(0, Math.min(ratio, SCALE_MAX));
  const markerPct = (clamped / SCALE_MAX) * 100;
  const active = TIERS.find((t) => ratio <= t.upto) ?? TIERS[TIERS.length - 1];

  return (
    <div className="payout-gauge">
      <div className="payout-bar" aria-hidden="true">
        {TIERS.map((t) => {
          const prev = TIERS[TIERS.indexOf(t) - 1]?.upto ?? 0;
          const width = ((t.upto - prev) / SCALE_MAX) * 100;
          return <span key={t.label} className="payout-seg" style={{ width: `${width}%`, background: t.color }} />;
        })}
        <span className="payout-marker" style={{ left: `${markerPct}%` }} />
      </div>
      <div className="payout-scale">
        <span>0%</span>
        <span>35%</span>
        <span>75%</span>
        <span>100%</span>
        <span>150%+</span>
      </div>
      <div>
        <div className="payout-gauge-tier" style={{ color: active.color }}>
          {active.label} · {ratio.toFixed(0)}% payout
        </div>
        <p className="payout-gauge-desc">{active.desc}</p>
      </div>
    </div>
  );
}
