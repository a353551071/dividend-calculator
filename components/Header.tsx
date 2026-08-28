import Link from 'next/link';
import BrandMark from '@/components/BrandMark';
import { CALCULATOR_GROUPS, HEADER_FLAT_LINKS, SITE_NAME } from '@/lib/nav';

/**
 * 站点 Header(F5.5 布局重构):「Calculators ▾」纯 CSS 下拉收全量 7 计算器
 * (分组:通用 5 + ETF 2),平铺位只留 Blog/Methodology/About —— 单行 ~60px,
 * 既装得下又不再挤。移动端仍用 checkbox hack 折叠,下拉在菜单内平铺展开。
 * 零 JS 零依赖,键盘可达(:focus-within)。
 */
export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand">
          <BrandMark className="brand-mark-svg" /> {SITE_NAME}
        </Link>
        <input
          id="nav-toggle"
          type="checkbox"
          className="nav-toggle"
          aria-label="Toggle navigation menu"
        />
        <label htmlFor="nav-toggle" className="nav-toggle-label">☰</label>
        <nav className="main-nav" aria-label="Main navigation">
          <div className="nav-drop">
            <button type="button" className="nav-link nav-drop-btn" aria-haspopup="true">
              Calculators <span className="nav-caret" aria-hidden="true">▾</span>
            </button>
            <div className="nav-drop-menu">
              {CALCULATOR_GROUPS.map((group) => (
                <div className="nav-drop-group" key={group.title}>
                  <p className="nav-drop-title">{group.title}</p>
                  {group.items.map((item) => (
                    <Link key={item.href} href={item.href} className="nav-drop-link">
                      {item.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
          {HEADER_FLAT_LINKS.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
