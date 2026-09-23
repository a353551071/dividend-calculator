/**
 * 品牌 logo(app/icon.svg 同款图形的内联版,三处统一):
 * 蓝底圆角方 + 上行折线 + 箭头 —— "股息复利向上"的一眼语义。
 * 替代旧 💹 emoji(跨平台渲染不可控,不专业)。
 */
export default function BrandMark({ className }: { className?: string }) {
  return (
    <img
      src="/logo-64.png"
      alt="Dividend Calculator"
      width={28}
      height={28}
      className={className}
      style={{ borderRadius: '6px', objectFit: 'contain' }}
      loading="eager"
    />
  );
}
