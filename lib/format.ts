/** 金额格式化:$1,234.56 */
export function formatMoney(v: number, currency = '$'): string {
  if (!Number.isFinite(v)) return '—';
  const abs = Math.abs(v);
  const digits = abs >= 10000 ? 0 : abs >= 100 ? 2 : 2;
  return `${currency}${v.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;
}

/** 百分比格式化:5.00% */
export function formatPercent(v: number): string {
  if (!Number.isFinite(v)) return '—';
  return `${v.toFixed(2)}%`;
}

/** 股份/数量格式化:1,234.56 */
export function formatNumber(v: number, digits = 2): string {
  if (!Number.isFinite(v)) return '—';
  return v.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: digits });
}
