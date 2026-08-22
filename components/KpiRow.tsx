/**
 * 结果区顶部的 KPI 大数字卡行(NN/g "contextualize outputs"):
 * 3-4 个最关键的数字先扫一眼拿到,详细行列表/图表/年度表在下方作详情层。
 * tone="green" 只用于钱(股息/收入)——金融 UI 惯例:绿 = 金钱/增长。
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
    <div className="kpi-row">
      {items.map((i) => (
        <div key={i.label} className={i.tone === 'green' ? 'kpi-card kpi-green' : 'kpi-card'}>
          <div className="kpi-value">{i.value}</div>
          <div className="kpi-label">{i.label}</div>
          {i.sub && <div className="kpi-sub">{i.sub}</div>}
        </div>
      ))}
    </div>
  );
}
