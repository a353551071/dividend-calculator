import type { Metadata } from 'next';
import Link from 'next/link';
import DripCalc from '@/components/DripCalc';
import FinanceNote from '@/components/FinanceNote';
import AdBanner from '@/components/AdBanner';
import { webAppJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/lib/schema';
import FaqAccordion from '@/components/FaqAccordion';

const PATH = '/calculators/dividend-reinvestment-calculator';

export const metadata: Metadata = {
  title: { absolute: 'Dividend Reinvestment Calculator 2026 — Reinvest vs Cash' },
  description:
    'Dividend reinvestment calculator: see how many extra shares reinvested dividends buy and how much more income you end up with versus taking the cash — year by year, with your own numbers.',
  alternates: { canonical: PATH },
};

const faqs = [
  {
    q: 'What is a dividend reinvestment calculator?',
    a: 'It projects what happens when every dividend payment is used to buy more shares instead of arriving as cash. You enter a starting investment, share price, dividend yield, dividend growth rate and time horizon; the calculator reports your growing share count, portfolio value and annual dividend income for each year, and compares the reinvested path against simply taking the cash.',
  },
  {
    q: 'What is the formula for dividend reinvestment?',
    a: 'The core loop runs once per period: dividends = shares × dividend per share, then new shares = dividends ÷ share price, so shares(next period) = shares × (1 + dividend per share ÷ share price). Run that loop for every year with a dividend that grows at rate g and the share count compounds roughly like (1 + g)^n after n years. The calculator above performs this loop year by year so you do not have to.',
  },
  {
    q: 'How do I calculate reinvested dividends in Excel or Google Sheets?',
    a: 'Build one row per year with five columns: shares, dividend per share, dividends received, shares bought, and total shares. Dividends = shares × dividend per share; shares bought = dividends ÷ current share price; next year&apos;s shares = shares + shares bought. Extend the dividend-per-share column by your growth assumption (for example 1.05× each year for 5% growth). The calculator above applies the same logic and adds the reinvest-versus-cash comparison for free.',
  },
  {
    q: 'Does it matter whether I reinvest monthly or quarterly?',
    a: 'Reinvesting sooner is slightly better because each payment starts compounding earlier, but the effect is second-order. Over long horizons, the dividend growth rate and the number of years dominate the outcome; monthly versus quarterly reinvestment typically shifts the final value by a fraction of a percent. Most US dividend payers distribute quarterly, so quarterly is the normal schedule this calculator models.',
  },
  {
    q: 'Is a dividend reinvestment calculator the same as a DRIP calculator?',
    a: 'Yes — a DRIP (Dividend Reinvestment Plan) is the broker or company feature that executes the reinvestment, and a DRIP calculator models the same loop. This page focuses on the reinvest-versus-cash decision; if you want the DRIP mechanics, compounding math and drip-by-drip worked examples, see the dedicated DRIP calculator page.',
  },
  {
    q: 'Do I owe taxes on reinvested dividends?',
    a: 'In taxable accounts, yes — reinvested dividends are taxed in the year they are paid even though you never see the cash, and they add to your cost basis. In tax-advantaged accounts such as IRAs or 401(k)s, reinvestment typically creates no immediate tax event. This calculator does not model taxes; consult a tax professional for your situation.',
  },
];

export default function DividendReinvestmentPage() {
  return (
    <>
      <h1>Dividend Reinvestment Calculator</h1>
      <p className="lead">
        Every dividend buys you a choice: take the cash, or reinvest it into more shares. This
        calculator runs both paths side by side with your own numbers, so you can see exactly how
        many extra shares reinvestment buys — and how much more income those shares pay you later.
      </p>

      <div className="card">
        <DripCalc />
      </div>

      <FinanceNote />

      <AdBanner slot="reinvest" />

      <div className="prose">
        <h2>How to calculate dividend reinvestment</h2>
        <p>
          Reinvestment math is a loop, not a formula you evaluate once. Each period the stock pays{' '}
          <code>shares × dividend per share</code> in dividends; that money buys{' '}
          <code>dividends ÷ share price</code> new shares; and the enlarged share count earns the
          next dividend. With a dividend growing at rate <code>g</code>, your share count after{' '}
          <code>n</code> years compounds roughly like <code>(1 + g)^n</code> — which is why a
          position that looks boring in year one looks powerful in year fifteen.
        </p>
        <p>
          You can run this loop by hand in a spreadsheet (see the FAQ below for the exact column
          layout), but the calculator above does it for every year at once and shows the results as
          a table and chart, including the comparison against taking the cash.
        </p>

        <h2>Reinvest or take the cash? What the numbers say</h2>
        <p>
          The grouped chart above is the heart of this page: dark bars are the reinvested path,
          light bars are the same position with dividends taken as cash. The gap between them is
          pure compounding — the dividends that bought shares, which then paid dividends of their
          own. Over ten to twenty years that gap typically becomes larger than most people expect,
          even with a flat share price.
        </p>
        <p>
          Reinvesting wins when you do not need the income today and your account shelters the
          payouts from immediate tax. Taking the cash wins when you live on the income, when the
          holding looks expensive and you would rather deploy the money elsewhere, or when
          reinvesting would concentrate you further in one stock. The calculator exists to put a
          number on both sides of that decision — it does not make it for you.
        </p>

        <h2>A worked example: $50,000 at 3.5%, ten years, flat price</h2>
        <p>
          Take a $50,000 position at $100 a share (500 shares) yielding 3.5%, with the dividend
          growing 5% a year and the share price deliberately flat — so every dollar of difference
          comes from reinvestment, not price movement. Reinvesting every payment leaves you with
          roughly 54% more shares after ten years (about 770 instead of 500), and the year-ten
          dividend income is roughly 45–50% higher than on the cash path — from the same starting
          position and the same dividend schedule. Raise the horizon to twenty years and the
          multiples keep climbing: this is the shape of compounding, and it is the whole argument
          for reinvestment.
        </p>

        <h2>Reinvestment in practice: broker DRIP vs manual</h2>
        <p>
          Two ways to execute the loop: a broker-side DRIP, which reinvests automatically at no or
          low cost and usually supports fractional shares; or manual reinvestment, where dividends
          land as cash and you place the buy orders yourself — more control and better tax-lot
          management, at the cost of discipline. Mathematically they are the same loop; behaviourally,
          automation wins for most people because it removes the temptation to spend the payment.
          Either way, keep records: in taxable accounts each reinvestment adds to your cost basis.
        </p>

        <h2>Frequently asked questions</h2>
        <FaqAccordion faqs={faqs} />

        <h2>Related calculators</h2>
        <p>
          <Link href="/">Dividend Calculator</Link> ·{' '}
          <Link href="/calculators/drip-calculator">DRIP Calculator</Link> ·{' '}
          <Link href="/calculators/dividend-growth-calculator">Dividend Growth Calculator</Link> ·{' '}
          <Link href="/calculators/monthly-dividend-calculator">Monthly Dividend Income Calculator</Link> ·{' '}
          <Link href="/calculators/schd-dividend-calculator">SCHD Dividend Calculator</Link>
        </p>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: webAppJsonLd('Dividend Reinvestment Calculator', PATH) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Dividend Reinvestment Calculator', path: PATH },
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
