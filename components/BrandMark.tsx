/**
 * 品牌 logo(app/icon.svg 同款图形的内联版,三处统一):
 * 蓝底圆角方 + 上行折线 + 箭头 —— "股息复利向上"的一眼语义。
 * 替代旧 💹 emoji(跨平台渲染不可控,不专业)。
 */
export default function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <rect width="64" height="64" rx="14" fill="#2563eb" />
      <polyline
        points="12,44 26,32 38,36 52,18"
        fill="none"
        stroke="#ffffff"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="45,18 52,18 52,25"
        fill="none"
        stroke="#ffffff"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
