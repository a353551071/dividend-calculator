import type { Metadata } from 'next';
import Link from 'next/link';
import StockProfitCalc from '@/components/StockProfitCalc';
import FinanceNote from '@/components/FinanceNote';
import AdBanner from '@/components/AdBanner';
import DividendTrackerPromo from '@/components/DividendTrackerPromo';
import FaqAccordion, { FaqItem } from '@/components/FaqAccordion';
import { webAppJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/lib/schema';

const PATH = '/calculators/stock-profit-calculator';

export const metadata: Metadata = {
  title: { absolute: 'Stock Profit Calculator 2026: Calculate Net Return, Dividends & CAGR' },
  description:
    'Free stock profit calculator: compute capital gains, total profit, ROI %, annualized return (CAGR), and dividend cash flow after brokerage fees and capital gains taxes.',
  alternates: { canonical: PATH },
};

const faqs: FaqItem[] = [
  {
    q: 'How do you calculate profit from selling stock?',
    a: 'Stock profit is calculated by taking your total sales proceeds (shares sold × selling price minus selling commission) and subtracting your total cost basis (shares bought × purchase price plus buying commission). If you received dividend distributions while holding the stock, add those dividends to determine your true total profit.',
  },
  {
    q: 'What is the difference between ROI (Total Return) and CAGR?',
    a: 'ROI (Return on Investment) measures the overall percentage return on your initial capital regardless of how long you held the position. CAGR (Compound Annual Growth Rate) annualizes your return, showing the steady yearly growth rate required to turn your initial investment into the final ending value. For multi-year holdings, CAGR is the industry gold standard for fair comparison against benchmark indices like the S&P 500.',
  },
  {
    q: 'Are dividend payments included in stock profit calculations?',
    a: 'Yes! Total return investing accounts for both capital gains (stock price appreciation) and cumulative dividend income. For long-term investors and dividend growth stocks (such as SCHD, Johnson & Johnson, or Apple), dividends often represent 30% to 50% or more of the lifetime return on investment.',
  },
  {
    q: 'What is the difference between realized and unrealized stock profit?',
    a: 'Unrealized profit ("paper gains") is the theoretical profit on shares you currently hold based on current market prices. Realized profit occurs once you actually sell your shares and lock in the cash proceeds. In most jurisdictions, capital gains tax is only triggered upon realization (selling).',
  },
  {
    q: 'How are stock profits taxed in the United States?',
    a: 'In the US, profits from selling stocks held for one year or less are classified as short-term capital gains and taxed at your ordinary income tax rate (10% to 37%). Stocks held for longer than one year qualify for preferential long-term capital gains tax rates (0%, 15%, or 20% depending on taxable income).',
  },
];

export default function StockProfitPage() {
  const webAppLd = webAppJsonLd('Stock Profit Calculator', PATH);

  const breadcrumbsLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Calculators', path: '/calculators/dividend-yield-calculator' },
    { name: 'Stock Profit Calculator', path: PATH },
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
        <span aria-current="page">Stock Profit Calculator</span>
      </nav>

      <h1>Stock Profit &amp; Total Return Calculator</h1>
      <p className="lead">
        Calculate your exact net profit, capital gains, dividend yield boost, and annualized return (CAGR) on any stock trade after accounting for buying/selling commissions and taxes.
      </p>

      <div className="card">
        <StockProfitCalc />
      </div>

      <FinanceNote />

      <DividendTrackerPromo />

      <AdBanner slot="profit-top" />

      <div className="prose">
        <h2>How to calculate stock profit and total return</h2>
        <p>
          Determining whether a stock trade was successful requires looking beyond just the difference between your buy and sell prices. A thorough stock profit calculation incorporates four distinct financial components:
        </p>
        <ol>
          <li>
            <strong>Total Cost Basis:</strong> The capital spent purchasing the shares, plus any broker transaction fees paid at entry:
            <br />
            <code>Total Cost Basis = (Shares × Purchase Price) + Buy Commission</code>
          </li>
          <li>
            <strong>Net Sales Proceeds:</strong> The cash received upon liquidation, minus broker transaction commissions:
            <br />
            <code>Net Proceeds = (Shares × Selling Price) - Sell Commission</code>
          </li>
          <li>
            <strong>Capital Gain or Loss:</strong> The net price appreciation of the stock:
            <br />
            <code>Capital Gain = Net Proceeds - Total Cost Basis</code>
          </li>
          <li>
            <strong>Total Return (With Dividends):</strong> All cash distributions received while holding the stock added to your capital gains:
            <br />
            <code>Total Net Profit = Capital Gain + Total Dividends Received</code>
          </li>
        </ol>

        <h2>Price Return vs. Total Return: The Dividend Advantage</h2>
        <p>
          Many basic trading calculators only calculate <em>Price Return</em>—the change in market quote from purchase to sale. However, for investors holding dividend-paying equities or dividend ETFs (like <strong>SCHD</strong>, <strong>JEPI</strong>, or <strong>VYM</strong>), omitting dividends produces a severely distorted picture of actual wealth generation.
        </p>
        <p>
          Historically, dividend reinvestment and regular cash payouts have accounted for approximately <strong>40% of the S&amp;P 500&apos;s total return</strong> over the past century. When you input your cumulative dividend payouts into our calculator above, the tool highlights your exact <strong>Dividend Boost</strong>—revealing the bonus percentage return generated purely from cash flows.
        </p>

        <h2>Understanding Annualized Return (CAGR)</h2>
        <p>
          A 50% total return sounds impressive, but earning 50% over 2 years (approx. 22.5% CAGR) is vastly superior to earning 50% over 10 years (approx. 4.1% CAGR). To objectively compare your stock picks against market benchmarks, you must evaluate the <strong>Compound Annual Growth Rate (CAGR)</strong>:
        </p>
        <div className="p-4 bg-slate-100 rounded-lg text-sm font-mono my-4">
          CAGR = ((Final Value / Initial Investment) ^ (1 / Holding Years)) - 1
        </div>
        <p>
          Our calculator automatically solves your annualized return the moment you enter your holding period, giving you Wall Street grade analytics without requiring spreadsheet formulas.
        </p>

        <h2>Short-Term vs. Long-Term Capital Gains Taxes</h2>
        <p>
          Unless you are trading inside a tax-sheltered account (such as a Roth IRA, 401(k), or UK ISA), taxes will impact your net take-home profit:
        </p>
        <ul>
          <li>
            <strong>Short-Term Capital Gains (Held &le; 1 Year):</strong> Taxed at your federal ordinary income tax bracket (ranging from 10% to 37%), plus applicable state and net investment income taxes.
          </li>
          <li>
            <strong>Long-Term Capital Gains (Held &gt; 1 Year):</strong> Eligible for preferential tax brackets of 0%, 15%, or 20% for most individual investors.
          </li>
        </ul>
        <p>
          Toggle the &ldquo;Estimate Capital Gains Tax&rdquo; checkbox in the calculator to simulate how much cash you keep after taxes.
        </p>
      </div>

      <section>
        <h2>Frequently asked questions (FAQ)</h2>
        <FaqAccordion faqs={faqs} />
      </section>

      <section>
        <h2>Explore more equity &amp; dividend calculators</h2>
        <ul className="calculator-grid">
          <li>
            <Link href="/calculators/stock-average-down-calculator">
              <strong>Stock Average Down Calculator</strong>
              <span>Calculate new average price per share after buying dips or solve target share counts.</span>
            </Link>
          </li>
          <li>
            <Link href="/calculators/stock-split-calculator">
              <strong>Stock Split Calculator</strong>
              <span>Calculate post-split shares, adjusted cost basis, and dividend per share.</span>
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
              <strong>DRIP Calculator</strong>
              <span>Simulate decades of dividend compounding and reinvestment snowball growth.</span>
            </Link>
          </li>
          <li>
            <Link href="/calculators/monthly-dividend-calculator">
              <strong>Monthly Dividend Calculator</strong>
              <span>Plan regular monthly income schedules from dividend portfolios.</span>
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
}
