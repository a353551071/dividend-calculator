import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description:
    'About Dividend Calculator — free, ad-supported educational tools for income investors. Our methodology, data sources and editorial standards.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <article className="prose">
      <h1>About Dividend Calculator</h1>
      <p>
        Dividend Calculator is a free, ad-supported collection of browser-based tools that help
        income investors reason about dividend yield, dividend growth, reinvestment (DRIP), monthly
        income and payout ratio. Every calculator runs entirely in your browser — there is no
        sign-up, no account, and we do not store the numbers you enter.
      </p>

      <h2>Who we are</h2>
      <p>
        We are a small, independent team of individual investors and builders who got tired of
        hand-rolling the same dividend math in a spreadsheet every time we compared a stock. This
        site is the set of tools we wanted for ourselves: fast, transparent, and focused on the
        actual mechanics of how dividends compound. We are <strong>not</strong> financial advisors,
        brokers, or a registered investment firm — we are educators and toolmakers.
      </p>

      <h2>Our data and methodology</h2>
      <p>
        Every calculator uses <strong>standard, publicly known formulas</strong>. The math never
        depends on a paid feed, which keeps the tools free, instant, and verifiable. On our ETF
        pages (SCHD, QQQI and the ticker calendars), inputs are additionally{' '}
        <strong>prefilled with live market data</strong> — share price and trailing yield from
        Yahoo Finance, refreshed on a roughly bi-weekly cadence and always labeled with an{' '}
        <em>as of</em> date. The full story — formulas, data pipeline, testing and rounding
        conventions — lives on the{' '}
        <Link href="/methodology">methodology page</Link>, and the projection engine itself is{' '}
        <a
          href="https://github.com/a353551071/dividend-math"
          target="_blank"
          rel="noopener noreferrer"
        >
          open source
        </a>
        .
      </p>
      <ul>
        <li>
          <strong>Dividend yield</strong> = annual dividend per share ÷ share price. You provide
          both numbers; we return the percentage.
        </li>
        <li>
          <strong>Dividend growth</strong> projects a starting dividend forward at a compound annual
          growth rate you choose (D₀ × (1 + g)ⁿ).
        </li>
        <li>
          <strong>DRIP / reinvestment</strong> simulates dividends buying additional shares year by
          year, layering in optional monthly contributions, price growth and dividend growth.
        </li>
        <li>
          <strong>Monthly income</strong> annualizes a dividend (monthly vs. quarterly) and divides
          by your portfolio value.
        </li>
        <li>
          <strong>Payout ratio</strong> = dividends per share ÷ earnings per share, the standard
          sustainability check.
        </li>
      </ul>
      <p>
        The default values pre-filled in each input are <strong>realistic examples</strong> so you
        can see how the calculator behaves before entering your own numbers. On the ETF pages those
        defaults are live quotes, labeled with their <em>as of</em> date; everywhere else they are
        generic placeholders, not recommendations.
      </p>

      <h2>How we keep it accurate</h2>
      <p>
        The core formulas live in one tested module and are covered by automated unit tests that
        guard against arithmetic regressions. We periodically re-check the math against worked
        examples done by hand and against established finance references. When we find an error, we
        fix it and note it on the page. Live prefill figures on ETF pages carry their{' '}
        <em>as of</em> date and are refreshed by our data pipeline — see{' '}
        <Link href="/methodology">how the data is sourced</Link>.
      </p>

      <h2>How this site is funded</h2>
      <p>
        The site is supported by display advertising. Ads, when shown, are placed to avoid
        interrupting the calculators, and no advertiser has any influence over the numbers a
        calculator returns or the content of our articles.
      </p>
      <details className="ad-disclosure">
        <summary>Advertising disclosure</summary>
        <p>
          This site participates in the Google AdSense program. Ad units are clearly separated from
          calculator results and editorial content; we do not write pages to trigger specific ads,
          and we never trade coverage or rankings for advertising. Pages that show live market data
          state their data source and <em>as of</em> date next to the numbers, independently of any
          advertising.
        </p>
      </details>

      <h2>Last updated</h2>
      <p>
        <time dateTime="2026-08-28">August 28, 2026</time>.
      </p>

      <h2>Educational only — not financial advice</h2>
      <p>
        Nothing on this site is financial advice, an offer, or a recommendation to buy, sell or hold
        any security. The outputs of every calculator are <strong>estimates</strong> generated from
        the assumptions you enter, not forecasts of future returns. Dividends can be cut or
        suspended, share prices can fall, fees and taxes apply, and past payments never guarantee
        future ones. Any reliance on these tools is at your own risk. Always do your own research
        and consult a qualified, licensed financial professional before making investment decisions.
      </p>
      <p>
        <Link href="/">Try the dividend calculator</Link> or{' '}
        <Link href="/blog">read the blog</Link>.
      </p>
    </article>
  );
}
