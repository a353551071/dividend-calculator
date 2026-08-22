import Link from 'next/link';
import { NAV_ITEMS, SITE_NAME } from '@/lib/nav';

/**
 * 站点 Header。移动端导航用纯 CSS checkbox hack 折叠(零 JS 零依赖),
 * 桌面端平铺导航不变。
 */
export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand">
          <span className="brand-mark">💹</span> {SITE_NAME}
        </Link>
        <input id="nav-toggle" type="checkbox" className="nav-toggle" aria-label="Toggle navigation menu" />
        <label htmlFor="nav-toggle" className="nav-toggle-label">☰</label>
        <nav className="main-nav" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
