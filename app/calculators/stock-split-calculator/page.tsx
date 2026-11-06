import type { Metadata } from 'next';
import Link from 'next/link';
import StockSplitCalc from '@/components/StockSplitCalc';
import FinanceNote from '@/components/FinanceNote';
import AdBanner from '@/components/AdBanner';
import DividendTrackerPromo from '@/components/DividendTrackerPromo';
import FaqAccordion, { FaqItem } from '@/components/FaqAccordion';
import { webAppJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/lib/schema';

const PATH = '/calculators/stock-split-calculator';

export const metadata: Metadata = {
  title: { absolute: 'Stock Split Calculator 2026: Forward & Reverse Split Solver' },
  description:
    'Free stock split calculator: calculate adjusted share counts, new cost basis, and post-split dividend per share for forward and reverse stock splits. Features NVDA, AAPL & TSLA presets.',
  alternates: { canonical: PATH },
};

const faqs: FaqItem[] = [
  {
    q: 'What is a stock split and does it make me richer?',
    a: 'A stock split increases or decreases a company’s total number of shares outstanding while proportionally adjusting the price per share. A stock split does NOT change the underlying value of your investment. It is identical to slicing a single pizza into 10 slices instead of 2—you have more pieces, but the total amount of pizza is unchanged.',
  },
  {
    q: 'How does a stock split affect dividend payments and dividend yield?',
    a: 'Following a stock split, the dividend per share is divided by the exact same ratio as the share price. Because you now own proportionally more shares, your total annual dividend cashflow remains exactly identical. For example, if you owned 10 shares paying $4/year ($40 total), after a 2-for-1 split you own 20 shares paying $2/year ($40 total). The dividend yield also remains unchanged.',
  },
  {
    q: 'Are stock splits taxable events in the United States?',
    a: 'In general, standard forward and reverse stock splits are non-taxable events for US taxpayers under Section 305 of the Internal Revenue Code. You do not report the split as income or capital gains on your tax return. However, your cost basis per share must be adjusted downward (or upward) to match the new share count. If your broker pays out cash-in-lieu for fractional shares that could not be split cleanly, that small cash portion is taxable as a capital gain or loss.',
  },
  {
    q: 'What is the difference between a forward stock split and a reverse stock split?',
    a: 'A forward split (such as 2-for-1 or 10-for-1) increases share count and lowers the share price, usually enacted by thriving companies (like Nvidia, Apple, or Broadcom) to make shares more affordable for retail investors. A reverse split (such as 1-for-5 or 1-for-10) consolidates existing shares into fewer, higher-priced shares, often used by struggling companies to avoid delisting from major exchanges like the NASDAQ or NYSE (which mandate a minimum $1 bid price).',
  },
  {
    q: 'What happens to fractional shares during a stock split?',
    a: 'If a stock split results in a fractional number of shares and your brokerage firm does not support fractional holding, the broker will automatically sell the fractional portion at the post-split market value and deposit cash into your account (referred to as "cash-in-lieu"). Many modern retail brokerages (like Fidelity, Schwab, or Robinhood) now natively support fractional shares and will simply credit the exact fractional share balance to your portfolio.',
  },
];

export default function StockSplitPage() {
  const webAppLd = webAppJsonLd('Stock Split Calculator', PATH);

  const breadcrumbsLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Calculators', path: '/calculators/dividend-yield-calculator' },
    { name: 'Stock Split Calculator', path: PATH },
  ]);

  const faqLd = faqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: webAppLd }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbsLd }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqLd }}
      />

      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/calculators/dividend-yield-calculator">Calculators</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Stock Split Calculator</span>
      </nav>

      <h1>Stock Split Calculator (Forward &amp; Reverse Splits)</h1>
      <p className="lead">
        Calculate your new adjusted share count, post-split cost basis per share, and updated dividend distributions following any corporate stock split or reverse consolidation.
      </p>

      <div className="card">
        <StockSplitCalc />
      </div>

      <FinanceNote />

      <DividendTrackerPromo />

      <AdBanner slot="split-top" />

      <div className="prose">
        <h2>How do stock splits work? (The Pizza Analogy)</h2>
        <p>
          A stock split is a corporate action in which a company divides its existing shares into multiple new shares to enhance market liquidity. While the total number of shares outstanding increases by a specified factor, the total market capitalization of the company and the total value of each shareholder&apos;s investment remain completely unchanged at the time of the split.
        </p>
        <p>
          Think of it as slicing a pizza: if you have a whole pizza cut into 4 slices and you cut each slice in half, you now have 8 slices. You have more slices, but the amount of pizza you own has not changed.
        </p>

        <h2>Forward Stock Split vs. Reverse Stock Split</h2>
        <p>
          Corporate boards typically execute two types of stock splits depending on market conditions:
        </p>
        <ul>
          <li>
            <strong>Forward Stock Split (e.g., 2-for-1, 4-for-1, 10-for-1):</strong> A shareholder receives additional shares for every share already owned. For instance, in Nvidia&apos;s landmark <strong>10-for-1 split</strong> in June 2024, each shareholder received 10 shares for every 1 share owned, while the share price was divided by 10 (from ~$1,200 to ~$120). This makes single shares more accessible to retail investors and options traders.
          </li>
          <li>
            <strong>Reverse Stock Split (e.g., 1-for-5, 1-for-10):</strong> Multiple existing shares are merged into a single higher-priced share. For example, in a 1-for-10 reverse split, 100 shares at $0.50 become 10 shares at $5.00. Reverse splits are frequently executed by micro-cap or distressed companies to prevent being delisted from the NASDAQ or NYSE for trading under the minimum $1.00 threshold.
          </li>
        </ul>

        <h2>How Stock Splits Affect Dividend Investors</h2>
        <p>
          If you hold high-dividend equities (such as dividend aristocrats or dividend growth ETFs like <strong>SCHD</strong> or <strong>VYM</strong>), a stock split has a specific impact on dividend accounting:
        </p>
        <ol>
          <li>
            <strong>Dividend per share (DPS) decreases:</strong> The company adjusts its declared per-share dividend downward by the split ratio. If a stock paid $2.00 per share annually and splits 2-for-1, the new dividend is $1.00 per share.
          </li>
          <li>
            <strong>Total annual dividend income is identical:</strong> Because your share count doubles at the same time, your total payout remains unchanged: <code>100 shares × $2.00 = 200 shares × $1.00 = $200</code>.
          </li>
          <li>
            <strong>Yield on Cost (YOC) is preserved:</strong> Because your purchase cost basis per share drops in the exact same proportion as the dividend, your effective yield on original cost remains constant.
          </li>
        </ol>

        <h2>Tax Treatment of Stock Splits</h2>
        <p>
          Under IRS guidelines, stock splits are non-taxable corporate actions. You do not realize any capital gain or taxable dividend income simply because a stock splits. However, you must carefully adjust your cost basis records:
        </p>
        <div className="p-4 bg-slate-100 rounded-lg text-sm font-mono my-4">
          New Cost Basis Per Share = Original Purchase Price / Split Multiplier
        </div>
        <p>
          For example, if you originally purchased Apple shares at $400 each prior to its 4-for-1 split, your new tax-reporting cost basis per share is $100 ($400 / 4). When you eventually sell those shares in the future, your capital gains tax will be calculated using this new $100 basis.
        </p>
      </div>

      <section>
        <h2>Frequently asked questions (FAQ)</h2>
        <FaqAccordion faqs={faqs} />
      </section>

      <section>
        <h2>Explore related stock &amp; dividend calculators</h2>
        <ul className="calculator-grid">
          <li>
            <Link href="/calculators/stock-profit-calculator">
              <strong>Stock Profit Calculator</strong>
              <span>Calculate net capital gains, dividend yield boost, and annualized return (CAGR).</span>
            </Link>
          </li>
          <li>
            <Link href="/calculators/stock-average-down-calculator">
              <strong>Stock Average Down Calculator</strong>
              <span>Solve new average share cost after dips or solve target share counts.</span>
            </Link>
          </li>
          <li>
            <Link href="/calculators/dividend-yield-calculator">
              <strong>Dividend Yield Calculator</strong>
              <span>Convert share prices and dividend distributions into annual cash yields.</span>
            </Link>
          </li>
          <li>
            <Link href="/calculators/drip-calculator">
              <strong>DRIP Reinvestment Calculator</strong>
              <span>Model decades of dividend compounding and snowball growth.</span>
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
}
