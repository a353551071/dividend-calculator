import type { ReactNode } from 'react';

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  /** 文章正文(JSX)。 */
  body: ReactNode;
}

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
      'A 2% yield can be a great investment and a 10% yield a trap. Here is how to judge a yield by looking at payout ratio, growth and sustainability instead of just the number.',
    body: (
      <>
        <p>
          There is no single &ldquo;good&rdquo; yield. Whether 3% is excellent or a 9% yield is a trap
          depends entirely on <em>why</em> the yield is what it is.
        </p>
        <h2>Rough ranges</h2>
        <ul>
          <li><strong>1–3%</strong>: normal for large, growing companies (the S&amp;P 500 averages around 1.3%).</li>
          <li><strong>3–5%</strong>: solid income — utilities, REITs, quality dividend payers.</li>
          <li><strong>5–8%</strong>: high. Check the payout ratio and the business model carefully.</li>
          <li><strong>8%+</strong>: usually a warning. Either the price collapsed or the dividend is unsustainable.</li>
        </ul>
        <h2>The test that matters</h2>
        <p>
          Instead of chasing a number, ask three questions:
        </p>
        <ol>
          <li><strong>Payout ratio</strong> — is the dividend covered by earnings? Above 100% is unsustainable.</li>
          <li><strong>Growth</strong> — is the dividend rising? A 2% yield growing 10% a year beats a flat 6% yield.</li>
          <li><strong>Why is it high?</strong> — a yield spike from a falling price is not income, it is a loss.</li>
        </ol>
        <p>
          Run the numbers with the{' '}
          <a href="/calculators/dividend-payout-ratio-calculator">payout ratio calculator</a> and the{' '}
          <a href="/calculators/dividend-growth-calculator">dividend growth calculator</a> to judge a
          yield on fundamentals, not on the headline number.
        </p>
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
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
