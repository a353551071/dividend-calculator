import { cn } from '@/lib/utils';

/**
 * 结果区顶部的 KPI 大数字卡行(NN/g "contextualize outputs"):
 * 3-4 个最关键的数字先扫一眼拿到,详细行列表/图表/年度表在下方作详情层。
 * tone="green" 只用于钱(股息/收入)——金融 UI 惯例:绿 = 金钱/增长。
 * Tailwind 化:视觉 token 全部走 @theme(bg-card/border-card-border/money),
 * 与旧 .kpi-* 类等价,值字号 1.7rem 对齐 F5.5 放大后的基准。
 */
export interface KpiItem {
  label: string;
  value: string;
  sub?: string;
  tone?: 'primary' | 'green';
}

export default function KpiRow({ items }: { items: KpiItem[] }) {
  if (items.length === 0) return null;
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3">
      {items.map((i) => (
        <div
          key={i.label}
          className={cn(
            'rounded-xl border bg-white px-4 py-3.5 shadow-card',
            i.tone === 'green' ? 'border-emerald-200 bg-emerald-50' : 'border-card-border',
          )}
        >
          <div
            className={cn(
              'text-[1.7rem] font-extrabold tracking-tight',
              i.tone === 'green' ? 'text-money' : 'text-primary-hover',
            )}
          >
            {i.value}
          </div>
          <div className="mt-0.5 text-xs text-muted-foreground">{i.label}</div>
          {i.sub && <div className="mt-px text-[.74rem] text-muted-foreground">{i.sub}</div>}
        </div>
      ))}
    </div>
  );
}
