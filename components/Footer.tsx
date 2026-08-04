import Link from 'next/link';
import { NAV_ITEMS, SITE_NAME } from '@/lib/nav';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <nav className="footer-nav" aria-label="Footer navigation">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link href="/blog">Blog</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms">Terms of Use</Link>
        </nav>
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
