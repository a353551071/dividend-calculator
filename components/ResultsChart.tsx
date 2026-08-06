'use client';

import { formatCompact } from '@/lib/format';

export interface ChartSeries {
  /** 图例名称,如 "With DRIP"。 */
  label: string;
  /** 柱体颜色 hex。 */
  color: string;
  /** 每个x位置对应一个值(与 labels 等长)。 */
  values: number[];
}

interface ResultsChartProps {
  /** x 轴标签(年份)。 */
  labels: number[];
  /** 分组柱状图系列(2-4 条)。 */
  series: ChartSeries[];
  /** y 轴单位标签,默认 $。 */
  yLabel?: string;
  emptyText?: string;
}

const VBW = 760;
const VBH = 320;
const PAD = { top: 24, right: 16, bottom: 44, left: 60 };

/** 取所有系列有限值的最大值,向上取到「漂亮」刻度。 */
function niceMax(raw: number): number {
  if (!Number.isFinite(raw) || raw <= 0) return 100;
  const exp = Math.floor(Math.log10(raw));
  const base = Math.pow(10, exp);
  const f = raw / base;
  let nice: number;
  if (f <= 1) nice = 1;
  else if (f <= 2) nice = 2;
  else if (f <= 5) nice = 5;
  else nice = 10;
  return nice * base;
}

/**
 * 手写内联 SVG 分组柱状图 — 零新依赖(不引 recharts),CWV 友好。
 * 用于 DRIP 对比图(With DRIP / Take Cash / Invested)及逐年投影。
 */
export default function ResultsChart({ labels, series, yLabel = '$', emptyText }: ResultsChartProps) {
  const hasData =
    labels.length > 0 &&
    series.length > 0 &&
    series.some((s) => s.values.some((v) => Number.isFinite(v) && v > 0));

  if (!hasData) {
    return <p className="results-empty">{emptyText ?? 'Enter valid inputs to see the chart.'}</p>;
  }

  const plotW = VBW - PAD.left - PAD.right;
  const plotH = VBH - PAD.top - PAD.bottom;

  const allVals = series.flatMap((s) => s.values).filter((v) => Number.isFinite(v));
  const yMax = niceMax(Math.max(0, ...allVals));
  const ticks = 4;

  const groupW = plotW / labels.length;
  const sCount = series.length;
  const barW = Math.min(28, (groupW * 0.72) / sCount);
  const groupInner = barW * sCount;

  const x = (i: number) => PAD.left + groupW * i + groupW / 2; // group center
  const y = (v: number) => PAD.top + plotH * (1 - Math.max(0, v) / yMax);

  const tickVals = Array.from({ length: ticks + 1 }, (_, i) => (yMax * i) / ticks);

  return (
    <div className="results-chart-wrap" role="img" aria-label="Projection chart">
      <svg className="results-chart" viewBox={`0 0 ${VBW} ${VBH}`} preserveAspectRatio="xMidYMid meet">
        {/* y-axis grid + labels */}
        {tickVals.map((tv, i) => (
          <g key={i}>
            <line
              x1={PAD.left}
              x2={VBW - PAD.right}
              y1={y(tv)}
              y2={y(tv)}
              stroke="#e2e8f0"
              strokeWidth={1}
            />
            <text x={PAD.left - 8} y={y(tv) + 4} textAnchor="end" fontSize={12} fill="#64748b">
              {formatCompact(tv, yLabel)}
            </text>
          </g>
        ))}

        {/* bars */}
        {labels.map((lbl, i) => (
          <g key={lbl} data-group={i}>
            {series.map((s, si) => {
              const v = s.values[i];
              const safeV = Number.isFinite(v) ? Math.max(0, v) : 0;
              const bx = x(i) - groupInner / 2 + si * barW;
              const by = y(safeV);
              const bh = PAD.top + plotH - by;
              return (
                <rect
                  key={s.label}
                  x={bx}
                  y={by}
                  width={barW - 2}
                  height={Math.max(0, bh)}
                  fill={s.color}
                  rx={2}
                >
                  <title>{`${s.label}, Year ${lbl}: ${formatCompact(safeV, yLabel)}`}</title>
                </rect>
              );
            })}
            {/* x label: first, every other, or last — show enough without crowding */}
            {labels.length <= 12 || i % Math.ceil(labels.length / 12) === 0 ? (
              <text x={x(i)} y={VBH - PAD.bottom + 18} textAnchor="middle" fontSize={12} fill="#64748b">
                Yr {lbl}
              </text>
            ) : null}
          </g>
        ))}

        {/* axes baselines */}
        <line x1={PAD.left} x2={VBW - PAD.right} y1={PAD.top + plotH} y2={PAD.top + plotH} stroke="#94a3b8" strokeWidth={1.2} />
      </svg>

      <ul className="chart-legend">
        {series.map((s) => (
          <li key={s.label}>
            <span className="legend-swatch" style={{ background: s.color }} aria-hidden="true" />
            {s.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
