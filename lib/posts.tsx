import type { ReactNode } from 'react';

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  /** 可选 FAQ 问答:页面可见 + 由博客页生成 FAQPage schema(抢 PAA/AI Overview)。 */
  faqs?: { q: string; a: string }[];
  /** 文章正文(JSX)。 */
  body: ReactNode;
}

/** P4「What is a good dividend yield」的 FAQ,页面可见 + FAQPage schema。 */
const goodYieldFaqs = [
  {
    q: 'What is a good dividend yield?',
    a: 'Most dividend investors consider 3% to 5% a good yield: high enough to produce meaningful income, low enough that the payout is usually sustainable. Below 1% you are mostly paying for growth; above 8% the dividend is often at risk of being cut.',
  },
  {
    q: 'Is a 2% dividend yield good?',
    a: 'A 2% yield is normal for large, growing companies — the S&P 500 averages around 1.3%. It is a good yield when the dividend is rising steadily, because a growing 2% yield reinvested can beat a flat high yield over a decade.',
  },
  {
    q: 'Is a 10% dividend yield good?',
    a: 'Usually a warning sign, not an opportunity. A 10% yield usually follows either a collapsed share price or a payout that earnings cannot sustain. Check the payout ratio before treating it as income.',
  },
  {
    q: 'What is a good dividend yield for an ETF?',
    a: 'For a broad dividend ETF, 2% to 4% is typical. High-income funds like covered-call ETFs can yield 10% or more, but that yield can include return of capital and cap the upside, so it is not comparable to a normal stock dividend.',
  },
  {
    q: 'How do you know if a dividend yield is sustainable?',
    a: 'Check three things: the payout ratio (dividend divided by earnings — above 100% is unsustainable), the dividend growth trend (flat or rising beats falling), and why the yield is high (a price collapse is not income).',
  },
];

/** P5「Dividend Yield vs Dividend Rate」的 FAQ,页面可见 + FAQPage schema。 */
const yieldVsRateFaqs = [
  {
    q: 'What is the difference between dividend yield and dividend rate?',
    a: 'Dividend rate is the dollar amount a company pays per share each year — the actual cash. Dividend yield is that rate expressed as a percentage of the share price. The rate measures what you receive; the yield measures how much return you get per dollar of price.',
  },
  {
    q: 'Which is more important, dividend yield or dividend rate?',
    a: 'It depends. Yield is better for comparing stocks or judging value, because it normalizes for price. Rate is better for forecasting the actual cash you will collect, which is simply rate times the shares you own. For sustainability, watch both plus the payout ratio.',
  },
  {
    q: 'Can two stocks have the same dividend rate but different yields?',
    a: 'Yes. Yield divides the rate by price, so a cheaper stock shows a higher yield for the same rate. A $1 rate at $50 is a 2% yield; the same $1 rate at $20 is a 5% yield. The rate is unchanged — only the price changed.',
  },
  {
    q: 'How do you convert a dividend rate to a yield?',
    a: 'Divide the annual rate per share by the current share price and multiply by 100. For example, a $2 annual rate on a $50 stock is a 4% yield. Use the dividend yield calculator on this site to do it in one step.',
  },
];

/** P6「DRIP vs Taking Cash」的 FAQ,页面可见 + FAQPage schema。 */
const dripVsCashFaqs = [
  {
    q: 'Is DRIP always better than taking cash dividends?',
    a: 'No. Reinvesting compounds your position and works well when you do not need the income, but taking cash is better when you live on the dividends, think the stock is overvalued, or want to avoid over-concentration. Both paths are rational; the choice depends on your cash needs.',
  },
  {
    q: 'Do I pay taxes on reinvested dividends?',
    a: 'In a taxable account, yes — reinvested dividends are taxable in the year paid even though you never receive the cash. In tax-advantaged accounts like IRAs and 401(k)s, reinvestment typically creates no immediate tax. Consult a tax professional for your situation.',
  },
  {
    q: 'Can I reinvest dividends and still take some cash?',
    a: 'Yes. Many brokers let you reinvest a percentage of your dividends and take the rest as cash, or reinvest in some holdings while taking cash from others. This lets you enjoy compounding on part of the position while still collecting income.',
  },
  {
    q: 'How much faster does DRIP grow than taking cash?',
    a: 'It depends on yield, dividend growth and time. A 3% yield with 6% dividend growth reinvested for 20 years can build far more annual income than collecting a flat 6% yield. Run your own numbers in the DRIP calculator — the time horizon is the biggest lever.',
  },
];

/** 博客文章(既是 Adsense 三件套的「博客」,也吃股息长尾词)。 */
export const POSTS: Post[] = [
  {
    slug: 'what-is-dividend-yield-and-how-to-calculate-it',
    title: 'What Is Dividend Yield and How to Calculate It',
    date: '2026-08-04',
    description:
      'Dividend yield is the annual dividend per share divided by the share price. Learn the formula, how monthly payers work, and why a high yield is not always a good thing.',
    body: (
      <>
        <p>
          <strong>Dividend yield</strong> measures how much cash a stock returns to you per dollar
          invested. It is the single most-quoted number in dividend investing — and the most
          misunderstood.
        </p>
        <h2>The formula</h2>
        <p>
          Dividend yield = annual dividend per share ÷ current share price × 100. If a stock pays $2
          per share each year and trades at $100, its yield is <strong>2%</strong>.
        </p>
        <p>
          Many companies pay quarterly or monthly. If a stock pays $0.50 per month, its annualized
          dividend is $6.00 — and on a $100 share that is a 6% yield.
        </p>
        <h2>Why it moves</h2>
        <p>
          Yield changes every time the price changes, even when the dividend is unchanged. A stock
          that falls 20% looks 25% more &ldquo;yielding&rdquo; overnight. That is why a spiking yield
          is often a falling-price warning, not an opportunity.
        </p>
        <h2>Yield is only half the story</h2>
        <ul>
          <li>A <strong>high yield + healthy payout ratio</strong> can be a great income stock.</li>
          <li>A <strong>high yield + above-100% payout ratio</strong> is a dividend cut waiting to happen.</li>
        </ul>
        <p>
          Use the <a href="/calculators/dividend-yield-calculator">dividend yield calculator</a> to
          compute a current yield, then check the{' '}
          <a href="/calculators/dividend-payout-ratio-calculator">payout ratio</a> before trusting it.
        </p>
      </>
    ),
  },
  {
    slug: 'what-is-a-good-dividend-yield',
    title: 'What Is a Good Dividend Yield?',
    date: '2026-08-04',
    description:
      'A 2% yield can be a great investment and a 10% yield a trap. Most income investors consider 3% to 5% a good dividend yield — but only if the payout is covered and growing.',
    faqs: goodYieldFaqs,
    body: (
      <>
        <p>
          <strong>A good dividend yield is usually 3% to 5%.</strong> Below 1% you are mostly paying
          for growth; above 8% you are usually buying a problem. But the number alone never decides —
          a 2% yield growing 10% a year beats a flat 6% yield, and a 10% yield from a falling stock is
          a loss, not income.
        </p>
        <h2>Rough ranges for dividend yields</h2>
        <ul>
          <li><strong>1–3%</strong>: normal for large, growing companies (the S&amp;P 500 averages around 1.3%).</li>
          <li><strong>3–5%</strong>: solid income — utilities, REITs, quality dividend payers.</li>
          <li><strong>5–8%</strong>: high. Check the payout ratio and the business model carefully.</li>
          <li><strong>8%+</strong>: usually a warning. Either the price collapsed or the dividend is unsustainable.</li>
        </ul>
        <h2>The three tests that matter more than the number</h2>
        <ol>
          <li><strong>Payout ratio</strong> — is the dividend covered by earnings? Above 100% is unsustainable.</li>
          <li><strong>Growth</strong> — is the dividend rising? A 2% yield growing 10% a year beats a flat 6% yield.</li>
          <li><strong>Why is it high?</strong> — a yield spike from a falling price is not income, it is a loss.</li>
        </ol>
        <p>
          Run the numbers with the{' '}
          <a href="/calculators/dividend-yield-calculator">dividend yield calculator</a>, check the{' '}
          <a href="/calculators/dividend-payout-ratio-calculator">payout ratio calculator</a>, and
          model growth with the{' '}
          <a href="/calculators/dividend-growth-calculator">dividend growth calculator</a>.
        </p>
        <h2>Frequently asked questions</h2>
        {goodYieldFaqs.map((f) => (
          <div key={f.q}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
      </>
    ),
  },
  {
    slug: 'how-dividend-reinvestment-works-drip',
    title: 'How Dividend Reinvestment (DRIP) Works',
    date: '2026-08-04',
    description:
      'A DRIP reinvests your dividends into more shares, so next year pays dividends on more shares. See how the compounding snowball builds your annual income.',
    body: (
      <>
        <p>
          A <strong>DRIP</strong> (Dividend Reinvestment Plan) automatically uses your dividend to buy
          more shares of the same stock. The effect sounds simple — and that is why it is so powerful.
        </p>
        <h2>The snowball</h2>
        <p>
          Year 1: 100 shares paying a $4 dividend give you $400. Reinvested, you now own ~104 shares.
          Year 2: those extra shares pay a dividend too. Every year the dividend is paid on more
          shares than the year before — the growth compounds.
        </p>
        <h2>Growth beats starting yield</h2>
        <p>
          A 3% yield with 6% dividend growth reinvested for 20 years builds far more annual income
          than a flat 6% yield with no growth. The reinvestment plus growth double-whammies: dividends
          grow <em>and</em> buy more shares as they do.
        </p>
        <h2>Realistic expectations</h2>
        <ul>
          <li>Set dividend and price growth to <strong>conservative</strong> numbers (3–6%) — big growth rates are optimistic.</li>
          <li>Add a <strong>monthly contribution</strong>: regular investing is what actually builds wealth.</li>
          <li>Remember taxes — reinvested dividends are still taxable in most jurisdictions.</li>
        </ul>
        <p>
          Model the snowball yourself with the{' '}
          <a href="/calculators/drip-calculator">DRIP calculator</a> — set growth to 0 first to see
          the base case, then add growth to see the compounding effect.
        </p>
      </>
    ),
  },
  {
    slug: 'dividend-yield-vs-dividend-rate',
    title: 'Dividend Yield vs Dividend Rate: What Is the Difference?',
    date: '2026-08-05',
    description:
      'Dividend yield is the dividend as a percentage of price; dividend rate is the dollar amount per share. See how they differ, how to convert one to the other, and when to watch each.',
    faqs: yieldVsRateFaqs,
    body: (
      <>
        <p>
          <strong>Dividend rate is the dollar amount paid per share each year; dividend yield is
          that amount as a percentage of the share price.</strong> A stock paying $2 a year that
          trades at $50 has a rate of $2 and a yield of 4%. The rate answers &ldquo;how much do I
          receive?&rdquo; The yield answers &ldquo;how much do I get per dollar invested?&rdquo;
        </p>
        <h2>Yield vs rate at a glance</h2>
        <ul>
          <li><strong>Yield</strong>: a percentage, calculated against the share price. It moves whenever the price moves, even if the payout is unchanged.</li>
          <li><strong>Rate</strong>: a dollar amount per share per year. It is set by the company and only changes on dividend announcements.</li>
        </ul>
        <h2>How to convert one to the other</h2>
        <p>
          <code>yield = annual rate &divide; price &times; 100</code>
        </p>
        <p>
          <code>annual rate = yield &times; price &divide; 100</code>
        </p>
        <h2>A quick example</h2>
        <ul>
          <li>Stock A: $1.00 rate at $50 price → 2% yield.</li>
          <li>Stock B: $1.00 rate at $20 price → 5% yield.</li>
        </ul>
        <p>
          Same rate, very different yields. The rate tells you what lands in your account per share;
          the yield tells you how expensive that income is relative to the price.
        </p>
        <h2>When to watch each</h2>
        <ul>
          <li><strong>Watch the yield</strong> when comparing stocks or judging what a holding returns per dollar of price.</li>
          <li><strong>Watch the rate</strong> when working out the actual cash you receive: rate × shares owned.</li>
          <li><strong>Watch both</strong> when judging sustainability, alongside the payout ratio.</li>
        </ul>
        <p>
          Run the numbers with the{' '}
          <a href="/calculators/dividend-yield-calculator">dividend yield calculator</a>, check the{' '}
          <a href="/calculators/dividend-payout-ratio-calculator">payout ratio calculator</a>, and
          see <a href="/blog/what-is-a-good-dividend-yield">what makes a dividend yield good</a>.
        </p>
        <h2>Frequently asked questions</h2>
        {yieldVsRateFaqs.map((f) => (
          <div key={f.q}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
      </>
    ),
  },
  {
    slug: 'drip-vs-taking-cash-dividends',
    title: 'DRIP vs Taking Cash Dividends: Which Is Better?',
    date: '2026-08-05',
    description:
      'Reinvesting dividends compounds your shares; taking cash pays your bills. Here is how to choose, plus the tax rules that apply to both paths in taxable and retirement accounts.',
    faqs: dripVsCashFaqs,
    body: (
      <>
        <p>
          <strong>Reinvest dividends (DRIP) when you do not need the income and want compounding;
          take cash when you rely on the income or have a better use for it.</strong> There is no
          universally better choice — DRIP grows the position automatically, while cash gives you
          flexibility and income you can spend.
        </p>
        <h2>DRIP vs cash at a glance</h2>
        <ul>
          <li><strong>DRIP</strong>: dividends buy more shares automatically → compounding share count, no reinvestment friction, fractional shares.</li>
          <li><strong>Cash</strong>: predictable income you can spend → full control over where the money goes next.</li>
        </ul>
        <h2>Choose reinvesting when&hellip;</h2>
        <ul>
          <li>You do not need the dividend to live on.</li>
          <li>You believe in the long-term business and want forced compounding.</li>
          <li>The account is tax-advantaged (IRA, 401k) — reinvestment creates no immediate tax.</li>
        </ul>
        <h2>Choose taking cash when&hellip;</h2>
        <ul>
          <li>You rely on the income to pay living expenses.</li>
          <li>The stock looks overvalued and you would rather deploy the cash elsewhere.</li>
          <li>Reinvesting would over-concentrate your portfolio in a single stock.</li>
        </ul>
        <h2>Taxes on both paths</h2>
        <p>
          In a taxable account, reinvested dividends are still taxable in the year paid — the tax
          authority treats them as income even though you never see the cash. In tax-advantaged
          accounts, neither path triggers immediate tax. This is not tax advice; check your own
          situation.
        </p>
        <p>
          Model the compounding difference with the{' '}
          <a href="/calculators/drip-calculator">DRIP calculator</a>, or see the annual income on
          the <a href="/calculators/monthly-dividend-calculator">monthly dividend calculator</a>.
          Read more on <a href="/blog/how-dividend-reinvestment-works-drip">how dividend
          reinvestment works</a>.
        </p>
        <h2>Frequently asked questions</h2>
        {dripVsCashFaqs.map((f) => (
          <div key={f.q}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
      </>
    ),
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
