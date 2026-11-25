import type { Metadata } from 'next';
import Link from 'next/link';
import SimpleDividendCalc from '@/components/SimpleDividendCalc';
import FinanceNote from '@/components/FinanceNote';
import AdBanner from '@/components/AdBanner';
import { webAppJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/lib/schema';
import FaqAccordion from '@/components/FaqAccordion';

const PATH = '/calculators/simple-dividend-calculator';

export const metadata: Metadata = {
  title: { absolute: 'Simple Dividend Calculator — Calculate Payouts Instantly' },
  description:
    'A free, fast, simple dividend calculator and dividend estimator: enter your total investment and dividend yield to see annual, monthly, and daily dividend payouts immediately.',
  alternates: { canonical: PATH },
};

const faqs = [
  {
    q: 'How does this simple dividend calculator work?',
    a: 'It takes your total invested amount (or portfolio value) and multiplies it by the annual dividend yield percentage. It then breaks down your annual payout into estimated monthly and daily passive income.',
  },
  {
    q: 'What is a dividend estimator?',
    a: 'A dividend estimator is any tool that projects the income an investment will pay from dividends. This calculator is a simple dividend estimator: your investment multiplied by the yield, split into annual, monthly and daily figures. It is a planning estimate rather than a guarantee, because actual payouts depend on the dividends a company or fund declares.',
  },
  {
    q: 'How much dividend income does $10,000 make at a 4% yield?',
    a: 'A $10,000 investment with a 4% dividend yield generates $400 per year, or approximately $33.33 per month, and $1.10 per day in passive cash flow before taxes.',
  },
  {
    q: 'What is the difference between simple dividend math and DRIP?',
    a: 'A simple dividend calculation assumes you receive all cash payouts directly without reinvesting. A DRIP (Dividend Reinvestment Plan) calculator accounts for compounding, where dividends buy more shares, accelerating your future income.',
  },
  {
    q: 'Does this calculator factor in taxes or fees?',
    a: 'No. This tool computes pre-tax cash flow. Actual net income depends on whether your holding is in a taxable brokerage or tax-advantaged account (like an IRA or 401k), and whether the dividends are qualified.',
  },
];

export default function SimpleDividendCalculatorPage() {
  return (
    <>
      <h1>Simple Dividend Calculator</h1>
      <p className="lead">
        Need a fast, zero-friction way to estimate your dividend returns? Enter your total investment
        and expected dividend yield below to see your annual, monthly, and daily dividend cash flow.
      </p>

      <div className="card">
        <SimpleDividendCalc />
      </div>

      <FinanceNote />

      <AdBanner slot="simple-dividend" />

      <div className="prose">
        <h2>The Simple Dividend Formula</h2>
        <p>
          Calculating dividend income does not require complicated financial modeling when you are estimating
          headline portfolio cash flow:
        </p>
        <p>
          <code>Annual Dividend Income = Total Investment &times; (Dividend Yield &divide; 100)</code>
        </p>
        <p>
          To find your monthly passive income, simply divide the annual figure by 12:
        </p>
        <p>
          <code>Monthly Income = Annual Dividend Income &divide; 12</code>
        </p>

        <h2>When to use a simple calculation vs advanced tools</h2>
        <p>
          This simple calculator is ideal for:
        </p>
        <ul>
          <li><strong>Quick benchmark checks</strong>: Estimating what a new portfolio allocation or high-yield ETF will pay out every month.</li>
          <li><strong>Target income planning</strong>: Seeing how much capital you need to reach milestones like $100/month or $1,000/month.</li>
          <li><strong>Comparing asset classes</strong>: Comparing cash yields from dividend stocks against bonds, CDs, or high-yield savings accounts.</li>
        </ul>
        <p>
          If you plan to reinvest dividends over a multi-year horizon to take advantage of compound growth, explore our{' '}
          <Link href="/calculators/drip-calculator">DRIP Calculator</Link> or{' '}
          <Link href="/calculators/dividend-growth-calculator">Dividend Growth Calculator</Link>.
        </p>

        <h2>Using this tool as a dividend estimator</h2>
        <p>
          A dividend estimator answers a single question: how much income will this position pay?
          Enter the amount you plan to invest, or the current value of what you already own, together
          with the yield you expect. The result is the annual cash flow, broken down into monthly and
          daily figures so you can match it against a savings goal or a regular expense.
        </p>
        <p>
          Treat the result as an estimate. Real payouts move with the dividends a company or fund
          declares, with changes in share price, and with payment schedules that are quarterly or
          monthly rather than even. For a per-share or yield-on-cost view, use the{' '}
          <Link href="/calculators/dividend-yield-calculator">Dividend Yield Calculator</Link>; for
          the declared distributions of a named fund, try the{' '}
          <Link href="/calculators/schd-dividend-calculator">SCHD Calculator</Link> or{' '}
          <Link href="/calculators/qqqi-dividend-calculator">QQQI Calculator</Link>.
        </p>

        <h2>Frequently Asked Questions</h2>
        <FaqAccordion faqs={faqs} />

        <h2>Related calculators</h2>
        <p>
          <Link href="/calculators/dividend-yield-calculator">Dividend Yield Calculator</Link> ·{' '}
          <Link href="/calculators/monthly-dividend-calculator">Monthly Dividend Income Calculator</Link> ·{' '}
          <Link href="/calculators/drip-calculator">DRIP Reinvestment Calculator</Link> ·{' '}
          <Link href="/calculators/dividend-growth-calculator">Dividend Growth Calculator</Link>
        </p>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: webAppJsonLd('Simple Dividend Calculator', PATH) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Simple Dividend Calculator', path: PATH },
          ]),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqJsonLd(faqs) }}
      />
    </>
  );
}
