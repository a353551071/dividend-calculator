import Link from 'next/link';
import BrandMark from '@/components/BrandMark';
import { CALCULATOR_GROUPS, SITE_LINKS, SITE_NAME } from '@/lib/nav';

/**
 * 站点 Footer(F5.5 布局重构):分栏网格容纳全量链接——品牌列 +
 * 计算器两组(通用/ETF)+ 站点页列,内链全量保留且不再堆成一行。
 */
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col footer-brand">
            <span className="footer-brand-name">
              <BrandMark className="footer-mark-svg" /> {SITE_NAME}
            </span>
            <p>
              Free, browser-based dividend math — yield, growth, DRIP, monthly income and payout
              ratio. The engine is{' '}
              <Link href="/methodology">open source and verifiable</Link>.
            </p>
            <p className="footer-badges">
              <a
                href="https://www.saashub.com/dividend-payout-calculator?utm_source=badge&utm_campaign=badge&utm_content=dividend-payout-calculator&badge_variant=color&badge_kind=approved"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Dividend Payout Calculator approved on SaaSHub"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://cdn-b.saashub.com/img/badges/approved-color.png?v=1"
                  alt="Approved on SaaSHub"
                  width={150}
                  height={50}
                  style={{ maxWidth: '150px', height: 'auto' }}
                />
              </a>
            </p>
          </div>
          {CALCULATOR_GROUPS.map((group) => (
            <nav className="footer-col" key={group.title} aria-label={group.title}>
              <p className="footer-title">{group.title}</p>
              {group.items.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
          ))}
          <nav className="footer-col" aria-label="Site pages">
            <p className="footer-title">Site</p>
            {SITE_LINKS.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="footer-disclaimer">
          {SITE_NAME} provides educational tools only. The calculators are estimates and are not
          financial advice, and do not constitute a recommendation to buy or sell any security.
          Always consult a qualified financial professional before making investment decisions.
        </p>
        <p className="footer-copy">© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
      </div>
    </footer>
  );
}
