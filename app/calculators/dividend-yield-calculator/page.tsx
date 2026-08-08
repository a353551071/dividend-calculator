import type { Metadata } from 'next';
import Link from 'next/link';
import DividendYieldCalc from '@/components/DividendYieldCalc';
import FinanceNote from '@/components/FinanceNote';
import AdBanner from '@/components/AdBanner';
import { webAppJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/lib/schema';

const PATH = '/calculators/dividend-yield-calculator';

export const metadata: Metadata = {
  title: { absolute: 'Dividend Yield Calculator 2026 — Free Online' },
  description:
    'Calculate dividend yield instantly: annual dividend per share ÷ current share price. Free, no sign-up, works for any stock.',
  alternates: { canonical: PATH },
};

const faqs = [
  {
    q: 'How is dividend yield calculated?',
    a: 'Dividend yield equals annual dividend per share divided by the current share price, times 100. A stock paying $2 per year at a $100 price has a 2% yield. The calculator above does this for any price and dividend you enter.',
  },
  {
    q: 'What is a good dividend yield?',
    a: 'For established companies and ETFs, a yield around 2–5% is typical. Above 6–7% can be a warning sign — it often means the share price has fallen (pushing the yield up) or the payout is unsustainable. Always check the payout ratio alongside the yield.',
  },
  {
    q: 'Why did my dividend yield go up even though the dividend did not change?',
    a: 'Yield moves inversely with price. If the share price drops and the dividend stays flat, the yield rises. A sudden yield spike is frequently a distress signal, not a bargain — investigate why the price fell.',
  },
  {
    q: 'Are monthly and quarterly dividends calculated the same way?',
    a: 'Yes. Either way you annualize first. For a monthly payer, multiply the monthly dividend by 12; for a quarterly payer, multiply the quarterly dividend by 4. Then divide by the share price. This calculator lets you switch between monthly and annual input.',
  },
  {
    q: 'Is a higher dividend yield always better?',
    a: 'No. A high yield funded by debt or a falling share price can collapse. Many of the best long-term holdings have modest starting yields but grow the dividend every year, so total return beats a high-but-flat yield.',
  },
];

export default function DividendYieldPage() {
  return (
    <>
      <h1>Dividend Yield Calculator</h1>
      <p className="lead">
        Dividend yield is the annual dividend per share divided by the current share price. It tells
        you the cash return you earn per dollar invested. Enter any price and dividend above to get
        the yield instantly.
      </p>

      <div className="card">
        <DividendYieldCalc />
      </div>

      <FinanceNote />

      <AdBanner slot="yield" />

      <div className="prose">
        <h2>What is dividend yield?</h2>
        <p>
          Dividend yield is the percentage of a company&apos;s share price that it pays back to
          shareholders as cash dividends each year. If a stock trades at $100 and pays $3 per share
          over twelve months, its yield is 3% — you earn three cents of dividend income for every
          dollar you invest. Yield is the single most quoted income metric, but it only means
          something once you understand what is driving it.
        </p>

        <h2>The dividend yield formula</h2>
        <p>
          <code>dividend yield (%) = annual dividend per share &divide; share price &times; 100</code>
        </p>
        <p>
          That is all the calculator above does. The two inputs — the annual dividend and the price —
          move independently, so the yield changes whenever either one changes. The annual dividend is
          usually the <em>trailing</em> twelve months of payments, which is what most data providers
          report.
        </p>

        <h2>How to use this calculator</h2>
        <ul>
          <li>Enter the current share price and the annual dividend per share.</li>
          <li>If the stock pays monthly dividends, switch to the monthly option — the tool annualizes it for you.</li>
          <li>Compare the yield against the company&apos;s own historical average, not against unrelated stocks.</li>
          <li>A yield far above the norm is often a warning, not an opportunity — read the next section.</li>
        </ul>

        <h2>What counts as a &ldquo;good&rdquo; dividend yield?</h2>
        <p>
          There is no universal number. A mature consumer-staples company might yield 3% and be
          considered excellent, while a REIT or energy partnership might yield 7% and still be
          normal for its sector. A useful baseline: the broad U.S. market has historically averaged
          around 1.5–2%, quality dividend ETFs sit near 2–4%, and anything well into double digits
          deserves serious scrutiny. Context matters more than the raw percentage.
        </p>

        <h2>Beware the yield trap</h2>
        <p>
          Because yield divides by price, a falling share price mechanically inflates the yield. A
          stock that drops from $100 to $50 while keeping a $5 dividend jumps from a 5% yield to a
          10% yield — but that 10% is almost never a gift. It usually means the market expects the
          dividend to be cut. Before chasing any unusually high yield, check the{' '}
          <Link href="/calculators/dividend-payout-ratio-calculator">payout ratio</Link>: if the
          company is paying out more than it earns, the dividend is on borrowed time.
        </p>

        <h2>Trailing yield vs forward yield</h2>
        <p>
          <strong>Trailing yield</strong> uses dividends actually paid over the past year — it is
          factual but backward-looking. <strong>Forward yield</strong> uses the dividend the company
          has declared or is expected to pay over the coming year. When a company raises its
          dividend, the forward yield is higher than the trailing yield; when a cut is looming, the
          opposite is true. This calculator uses the figures you enter, so you can model either one.
        </p>

        <h2>Yield moves every day the market is open</h2>
        <p>
          Because the denominator is the live share price, a stock&apos;s quoted yield changes
          constantly — even when its dividend is unchanged. On a big down day the yield ticks up; on
          a rally it ticks down. That is why two websites can show slightly different yields for the
          same stock on the same day: they are using prices captured at different moments. Use yield
          as a snapshot, not a fixed number.
        </p>

        <h2>Yield is income only — it ignores price return</h2>
        <p>
          A 4% yield tells you about cash income, not total return. A stock can pay a steady 4% while
          its share price doubles, or while it halves. Over long horizons, price appreciation often
          matters more than the starting yield, which is why many investors prefer a lower yield with
          strong <Link href="/calculators/dividend-growth-calculator">dividend growth</Link> over a
          high yield that never rises. Reinvesting dividends compounds both effects — see the{' '}
          <Link href="/calculators/drip-calculator">DRIP calculator</Link> for the math.
        </p>

        <h2>Net yield after tax</h2>
        <p>
          The yield you see quoted is pre-tax. Qualified dividends in the U.S. are taxed at the
          long-term capital-gains rate, while ordinary (non-qualified) dividends are taxed as
          ordinary income — so two investments with the same headline yield can leave you with very
          different after-tax income. Tax treatment depends on your jurisdiction and account type
          (a tax-advantaged account may shelter the dividends entirely), so consult a tax
          professional for your situation.
        </p>

        <h2>Frequently Asked Questions</h2>
        <div className="faq">
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>

        <h2>Related calculators</h2>
        <p>
          <Link href="/calculators/dividend-growth-calculator">Dividend Growth Calculator</Link> ·{' '}
          <Link href="/calculators/drip-calculator">DRIP Calculator</Link> ·{' '}
          <Link href="/calculators/monthly-dividend-calculator">Monthly Dividend Income Calculator</Link> ·{' '}
          <Link href="/calculators/dividend-payout-ratio-calculator">Payout Ratio Calculator</Link>
        </p>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: webAppJsonLd('Dividend Yield Calculator', PATH) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Dividend Yield Calculator', path: PATH },
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
