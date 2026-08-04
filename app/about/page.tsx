import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description: 'About Dividend Calculator — free, ad-supported educational tools for income investors.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <article className="prose">
      <h1>About Dividend Calculator</h1>
      <p>
        Dividend Calculator is a free, ad-supported collection of tools that help income investors
        understand dividend yield, dividend growth, reinvestment (DRIP), monthly income and payout
        ratio. Every calculator runs entirely in your browser — there is no sign-up, no account, and
        we do not store the numbers you enter.
      </p>
      <h2>Our goal</h2>
      <p>
        We believe the mechanics of dividends should be easy to explore. Type in a price and a
        dividend, and see instantly what it means for your income — no spreadsheet required.
      </p>
      <h2>How the calculators work</h2>
      <p>
        Each tool uses standard, publicly known formulas (for example, dividend yield = annual
        dividend per share ÷ share price). The results are estimates meant for learning and
        planning, not predictions of future returns.
      </p>
      <h2>Educational only — not financial advice</h2>
      <p>
        Nothing on this site is financial advice or a recommendation to buy, sell or hold any
        security. Dividends can be cut, prices can fall, and past payments do not guarantee future
        ones. Always do your own research and consult a qualified financial professional before
        making investment decisions.
      </p>
      <p>
        <Link href="/">Try the dividend calculator</Link> or{' '}
        <Link href="/blog">read the blog</Link>.
      </p>
    </article>
  );
}
