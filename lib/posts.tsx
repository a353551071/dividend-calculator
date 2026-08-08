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

/** P7「SCHD Dividend Calendar」的 FAQ,页面可见 + FAQPage schema。 */
const schdCalendarFaqs = [
  {
    q: 'Does SCHD pay monthly or quarterly dividends?',
    a: 'Quarterly. SCHD (the Schwab U.S. Dividend Equity ETF) pays four dividends a year, in March, June, September, and December. It is not a monthly payer, unlike some high-income ETFs.',
  },
  {
    q: 'What months does SCHD pay dividends?',
    a: 'March, June, September, and December. The exact ex-dividend and payment dates shift slightly each year, but the four-payments-per-year cadence in those months has been consistent.',
  },
  {
    q: 'How do I make sure I receive the next SCHD dividend?',
    a: 'Buy shares before the ex-dividend date and hold through that date. If you own the shares at the start of the ex-dividend day you receive the payment; if you buy on or after the ex-dividend date, the seller receives it. The payment arrives roughly one to two weeks later.',
  },
  {
    q: 'How much does SCHD pay per share?',
    a: 'The per-share dividend changes every quarter. Over the past year the four payments have totaled roughly $1 per share, for a yield around 3%. The exact amount is set each quarter, so confirm the current figure on the official Schwab fund page.',
  },
  {
    q: 'Are SCHD dividend dates the same every year?',
    a: 'The months are consistent (March, June, September, December), but the exact dates move a few days each year and are only final when Schwab declares them. Always check the declared ex-dividend and payment dates for the specific quarter before trading around them.',
  },
];

/** P8「Best Monthly Dividend Stocks」的 FAQ,页面可见 + FAQPage schema。 */
const monthlyStocksFaqs = [
  {
    q: 'What are the best monthly dividend stocks for 2026?',
    a: 'Popular monthly payers split into three groups: covered-call ETFs such as JEPI, JEPQ, and QQQI for the highest yield, balanced funds such as DIVO, and monthly REITs such as Realty Income (O) for steadier income. Yields change often, so check the current figures before you decide.',
  },
  {
    q: 'Are covered-call ETFs like JEPI and QQQI safe?',
    a: 'They trade upside for income. In flat or falling markets the income looks attractive; in strong rallies they lag because the call options cap the gains, and distributions can include return of capital. They are diversified, but you must understand the tradeoff, not just chase the yield.',
  },
  {
    q: 'Does SCHD pay monthly dividends?',
    a: 'No. SCHD pays quarterly, in March, June, September, and December. See our SCHD dividend calendar for those dates. If your goal is monthly income, covered-call ETFs and Realty Income are common monthly payers instead.',
  },
  {
    q: 'How are monthly dividends taxed?',
    a: 'It depends on the payer. REIT dividends and parts of covered-call distributions are often non-qualified, taxed as ordinary income, and may include return of capital that lowers your cost basis later. Qualified dividend rates favor traditional stocks. This is not tax advice; check your own situation.',
  },
  {
    q: 'How much do I need to invest for $1,000 a month in dividends?',
    a: 'It depends on the yield. At a 6% yield you need about $200,000 invested; at a 12% yield about $100,000, but higher yields usually carry more risk. Model your own numbers with the monthly dividend calculator.',
  },
];

/** P9「Monthly Dividend Yield vs Annual」的 FAQ,页面可见 + FAQPage schema。 */
const monthlyYieldVsAnnualFaqs = [
  {
    q: 'How do I convert monthly dividend yield to annual?',
    a: 'Multiply the monthly yield by 12. A 0.5% monthly yield is a 6% annual yield. The conversion is linear as long as you are not reinvesting.',
  },
  {
    q: 'Is monthly yield just annual yield divided by 12?',
    a: 'Yes, when you spend the dividends. Annual yield divided by 12 gives the monthly yield, and annual income divided by 12 gives the monthly income. The only exception is reinvestment, where compounding lifts the realized annual return slightly above the simple figure.',
  },
  {
    q: 'Why is dividend yield quoted annually instead of monthly?',
    a: 'Because companies report dividends on an annual basis and annual figures make different investments comparable regardless of how often they pay. A monthly payer and a quarterly payer can only be compared cleanly on annual yield.',
  },
  {
    q: 'Does monthly compounding beat annual compounding?',
    a: 'Slightly, yes — more frequent reinvestment means each payment starts earning sooner. A 4% annual yield paid and reinvested monthly compounds to about 4.07% over the year. The effect is small in one year but meaningful over long horizons.',
  },
  {
    q: 'Are monthly dividend stocks better than quarterly ones?',
    a: 'Not necessarily. Payment frequency is about cash-flow timing, not total return. A high monthly yield can signal risk just like a high annual yield can. The underlying holdings matter more than the schedule — see the rundown of monthly dividend stocks and ETFs.',
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
  {
    slug: 'schd-dividend-calendar',
    title: 'SCHD Dividend Calendar 2026: Ex-Dividend and Pay Dates',
    date: '2026-08-06',
    description:
      'SCHD pays dividends quarterly in March, June, September, and December. See the typical ex-dividend and pay dates and how to confirm the exact 2026 SCHD dividend calendar.',
    faqs: schdCalendarFaqs,
    body: (
      <>
        <p>
          <strong>SCHD (the Schwab U.S. Dividend Equity ETF) pays dividends <em>quarterly</em>, in
          March, June, September, and December.</strong> It is not a monthly payer. The exact
          ex-dividend and payment dates move a few days each year and are only final once Schwab
          declares them. This page lays out the typical schedule, how the dividend cycle works, and
          how to confirm the live 2026 dates.
        </p>
        <h2>SCHD dividend calendar: dates by quarter</h2>
        <table>
          <thead>
            <tr>
              <th>Quarter</th>
              <th>Typical ex-dividend month</th>
              <th>Typical payment timing</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Q1</td>
              <td>March</td>
              <td>Late March to early April</td>
            </tr>
            <tr>
              <td>Q2</td>
              <td>June</td>
              <td>Late June to early July</td>
            </tr>
            <tr>
              <td>Q3</td>
              <td>September</td>
              <td>Late September to early October</td>
            </tr>
            <tr>
              <td>Q4</td>
              <td>December</td>
              <td>Mid to late December</td>
            </tr>
          </tbody>
        </table>
        <p>
          The ex-dividend date usually falls in the last third of those months, with payment
          following about one to two weeks later. Recent ex-dividend dates have landed around late
          June (Q2) and early-to-mid December (Q4), but treat these as a pattern, not a fixed
          calendar.
        </p>
        <h2>How the dividend cycle works</h2>
        <ul>
          <li><strong>Declaration date:</strong> Schwab announces the amount and the key dates.</li>
          <li><strong>Ex-dividend date:</strong> the cutoff. Buy before this date to receive the dividend; buy on or after it and the seller keeps the payment.</li>
          <li><strong>Record date:</strong> usually one business day after the ex-dividend date, when Schwab checks who owns the shares.</li>
          <li><strong>Payment date:</strong> the cash lands in your brokerage account, typically one to two weeks after the ex-dividend date.</li>
        </ul>
        <p>
          For SCHD, the date that matters for your trading is the <strong>ex-dividend date</strong>;
          the record and payment dates follow automatically.
        </p>
        <h2>How much does SCHD pay?</h2>
        <p>
          The per-share dividend changes every quarter. Over the past year the four payments have
          totaled roughly <strong>$1 per share</strong>, for a yield around <strong>3%</strong>, but
          the exact amount is set each quarter and the yield moves with the share price. Estimate
          the current return with the{' '}
          <a href="/calculators/schd-dividend-calculator">SCHD dividend calculator</a>.
        </p>
        <h2>How to confirm the exact 2026 dates</h2>
        <ol>
          <li>Open the official Schwab fund page for SCHD and check the &ldquo;Distributions&rdquo; section.</li>
          <li>Watch for the declaration announcement a few weeks before the ex-dividend date each quarter.</li>
          <li>In your brokerage, the ex-dividend and payment dates appear under the corporate-action details for your position.</li>
        </ol>
        <p>
          Dates published before the official declaration are estimates. Always confirm the declared
          dates for the quarter you care about before trading around a dividend.
        </p>
        <p>
          <em>Dividend dates and amounts can change and are not official until declared. This page
          is information, not financial or tax advice.</em>
        </p>
        <p>
          Want to model how reinvested SCHD dividends could grow? Try the{' '}
          <a href="/calculators/drip-calculator">DRIP calculator</a>, compare with a monthly payer
          on the <a href="/calculators/monthly-dividend-calculator">monthly dividend calculator</a>,
          or read <a href="/blog/what-is-a-good-dividend-yield">what makes a good dividend yield</a>.
        </p>
        <h2>Frequently asked questions</h2>
        {schdCalendarFaqs.map((f) => (
          <div key={f.q}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
      </>
    ),
  },
  {
    slug: 'best-monthly-dividend-stocks',
    title: 'Best Monthly Dividend Stocks and ETFs for 2026',
    date: '2026-08-06',
    description:
      'The best monthly dividend stocks and ETFs for 2026: covered-call funds (JEPI, JEPQ, QQQI), balanced picks (DIVO), and monthly REITs (Realty Income). See yields, risks, and how to choose.',
    faqs: monthlyStocksFaqs,
    body: (
      <>
        <p>
          <strong>The best monthly dividend stocks and ETFs for 2026 fall into three groups:
          covered-call funds such as JEPI, JEPQ, and QQQI for the highest yield, balanced funds
          such as DIVO, and monthly REITs such as Realty Income (O) for steadier income.</strong>{' '}
          No single ticker is best for everyone. The right choice depends on whether you want
          maximum income, some growth, or lower volatility. Below is what each one does, the
          approximate yields, and the tradeoffs.
        </p>
        <h2>Best monthly dividend stocks and ETFs for 2026</h2>
        <table>
          <thead>
            <tr>
              <th>Ticker</th>
              <th>What it is</th>
              <th>Approx. yield</th>
              <th>Pays</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>JEPI</td>
              <td>JPMorgan S&amp;P 500 covered-call ETF</td>
              <td>~7 to 10%</td>
              <td>Monthly</td>
            </tr>
            <tr>
              <td>JEPQ</td>
              <td>JPMorgan Nasdaq-100 covered-call ETF</td>
              <td>~11 to 13%</td>
              <td>Monthly</td>
            </tr>
            <tr>
              <td>QQQI</td>
              <td>NEOS Nasdaq-100 covered-call ETF</td>
              <td>~12 to 13%</td>
              <td>Monthly</td>
            </tr>
            <tr>
              <td>DIVO</td>
              <td>Dividend growth plus covered-call ETF</td>
              <td>~5 to 7%</td>
              <td>Monthly</td>
            </tr>
            <tr>
              <td>O</td>
              <td>Realty Income, a monthly net-lease REIT</td>
              <td>~5.5 to 6%</td>
              <td>Monthly</td>
            </tr>
          </tbody>
        </table>
        <p>
          Yields move with the share price and the distributions the funds declare, so treat these
          as ranges, not fixed numbers, and confirm the current yield before you buy.
        </p>
        <h2>The three types of monthly payer</h2>
        <ul>
          <li><strong>Covered-call ETFs (JEPI, JEPQ, QQQI):</strong> hold an index and sell call options on it to generate extra income. The yield is high, but the options cap the upside in strong rallies.</li>
          <li><strong>Balanced funds (DIVO):</strong> combine dividend-paying stocks with a modest covered-call overlay. Lower yield than a pure covered-call fund, with more room for price growth.</li>
          <li><strong>Monthly REITs (Realty Income, O):</strong> own real estate and pay rent income monthly. Yields are lower than covered-call funds but come from a more traditional business model.</li>
        </ul>
        <h2>Monthly versus quarterly: is monthly better?</h2>
        <p>
          Monthly payouts are smoother for living off the income, but frequency does not equal
          higher total return. SCHD, one of the most popular dividend ETFs, pays quarterly, not
          monthly. See the <a href="/blog/schd-dividend-calendar">SCHD dividend calendar</a> for
          those dates. A lower quarterly yield that grows can beat a high monthly yield that does
          not.
        </p>
        <h2>How to choose</h2>
        <ol>
          <li><strong>Match the yield to the risk.</strong> A 12% yield usually means capped upside or erosion risk; a 5 to 6% yield is often more sustainable.</li>
          <li><strong>Check how the income is generated.</strong> Covered-call income fades in calm markets; REIT income depends on rent collection.</li>
          <li><strong>Watch taxes.</strong> REIT and covered-call distributions are often non-qualified and can include return of capital. This is not tax advice.</li>
          <li><strong>Stress-test the numbers.</strong> Model the income with the <a href="/calculators/monthly-dividend-calculator">monthly dividend calculator</a> and check sustainability with the <a href="/calculators/dividend-payout-ratio-calculator">payout ratio calculator</a>.</li>
        </ol>
        <h2>The risks behind a high monthly yield</h2>
        <p>
          A very high monthly yield is usually a tradeoff, not a gift. Covered-call ETFs can see
          their net asset value drift down over time, and part of the distribution may be return
          of capital rather than true income. Single monthly-paying stocks can cut the dividend if
          the business weakens. The <a href="/calculators/qqqi-dividend-calculator">QQQI dividend
          calculator</a> page walks through these covered-call specifics in more detail.
        </p>
        <p>
          <em>Yields and distributions change, and this page is not financial or tax advice. Past
          income does not guarantee future results. Do your own research before investing.</em>
        </p>
        <p>
          Want to project how monthly income could grow if reinvested? Try the{' '}
          <a href="/calculators/drip-calculator">DRIP calculator</a>, check{' '}
          <a href="/blog/what-is-a-good-dividend-yield">what makes a good dividend yield</a>, or
          compare with a quarterly payer on the{' '}
          <a href="/blog/schd-dividend-calendar">SCHD dividend calendar</a>.
        </p>
        <h2>Frequently asked questions</h2>
        {monthlyStocksFaqs.map((f) => (
          <div key={f.q}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
      </>
    ),
  },
  {
    slug: 'monthly-dividend-yield-vs-annual',
    title: 'Monthly Dividend Yield vs Annual: How to Convert',
    date: '2026-08-08',
    description:
      'Monthly dividend yield vs annual explained: convert with multiply-by-12 and divide-by-12, know when to use each, and understand the compounding catch when you reinvest.',
    faqs: monthlyYieldVsAnnualFaqs,
    body: (
      <>
        <p>
          <strong>Monthly dividend yield and annual dividend yield describe the same return on two
          different time scales.</strong> Annual yield is the standard quote — yearly dividend
          divided by share price, expressed as a percentage. Monthly yield is simply annual yield
          divided by 12. To convert a monthly figure to annual, multiply by 12; to convert annual to
          monthly, divide by 12. The math is linear, with one catch: if you reinvest the dividends,
          compounding makes the true annualized return slightly higher than the simple
          multiply-by-12 result.
        </p>
        <h2>What is annual dividend yield?</h2>
        <p>
          Annual dividend yield is the number you see quoted on every finance site, because
          companies report dividends on a yearly basis and annual figures make different stocks
          comparable.
        </p>
        <p>The formula is:</p>
        <p>
          <code>annual yield = annual dividend per share &divide; share price &times; 100</code>
        </p>
        <p>
          A stock that pays $4 in dividends over a year on a $100 share has a 4% annual yield. A
          different stock paying $2 on a $40 share has a 5% yield. Expressing both as percentages
          lets you compare them directly, regardless of share price. Annual yield is the default for
          screening, ranking, and comparing income investments — run any holding through the{' '}
          <a href="/calculators/dividend-yield-calculator">dividend yield calculator</a> to get it
          in one step.
        </p>
        <h2>What is monthly dividend yield?</h2>
        <p>Monthly dividend yield is the same return expressed per month instead of per year:</p>
        <p>
          <code>monthly yield = annual yield &divide; 12</code>
        </p>
        <p>
          A 4% annual yield equals roughly 0.33% per month. Investors care about the monthly figure
          when they think in paychecks: a $100,000 portfolio at a 4% annual yield generates about
          $333 of dividend income each month. That monthly view is what the{' '}
          <a href="/calculators/monthly-dividend-calculator">monthly dividend calculator</a> is
          built around — it works backwards from the monthly income you want to the capital
          required.
        </p>
        <p>
          Monthly yield is not a different kind of return. It is the annual yield broken into twelve
          pieces so you can plan cash flow.
        </p>
        <h2>Monthly dividend yield vs annual: the conversion</h2>
        <p>
          Because the relationship is linear, converting between the two is direct multiplication or
          division.
        </p>
        <table>
          <thead>
            <tr><th>Monthly yield</th><th>Annual yield</th></tr>
          </thead>
          <tbody>
            <tr><td>0.25%</td><td>3%</td></tr>
            <tr><td>0.33%</td><td>4%</td></tr>
            <tr><td>0.50%</td><td>6%</td></tr>
            <tr><td>0.75%</td><td>9%</td></tr>
            <tr><td>1.00%</td><td>12%</td></tr>
          </tbody>
        </table>
        <ul>
          <li><strong>Monthly to annual:</strong> multiply the monthly yield by 12.</li>
          <li><strong>Annual to monthly:</strong> divide the annual yield by 12.</li>
        </ul>
        <p>
          The same logic applies to dollar income, not just percentages: $250 a month is $3,000 a
          year; $3,000 a year is $250 a month. The percentage and the dollar amount convert the
          same way.
        </p>
        <h2>Which one should you use?</h2>
        <p>
          Use <strong>annual yield</strong> when you compare or screen investments. It is the
          industry standard, every data provider quotes it, and it normalizes for share price so two
          very different stocks sit on the same scale.
        </p>
        <p>
          Use <strong>monthly yield</strong> when you plan spending. If you are building a portfolio
          to replace a monthly paycheck, the monthly figure tells you how close you are. A retiree
          who needs $2,000 a month in income cares about the monthly yield on their portfolio, not
          the annual headline.
        </p>
        <p>
          A useful habit: quote and compare in annual terms, then divide by 12 when a decision turns
          into a budget.
        </p>
        <h2>The compounding catch (do not just multiply by 12)</h2>
        <p>
          There is one situation where monthly and annual yields diverge:{' '}
          <strong>reinvestment</strong>.
        </p>
        <p>
          Multiplying a monthly yield by 12 assumes you collect each payment and do nothing with it.
          That is linear annualization, and it is correct for cash you spend. But if you reinvest
          each monthly dividend into more shares, those new shares pay you the next month, and the
          effect snowballs. A 0.33% monthly yield reinvested compounds to roughly{' '}
          <strong>4.07%</strong> over a year, not exactly 4% — because{' '}
          <code>(1.0033)^12 &asymp; 1.0407</code>.
        </p>
        <p>
          For a single year the gap is tiny. Over decades of reinvestment it is the entire point of a
          dividend growth strategy, and it is why a lower, growing yield can beat a flat high yield.
          The <a href="/calculators/drip-calculator">DRIP calculator</a> shows this compounding year
          by year.
        </p>
        <p>
          In short: multiply or divide by 12 for a quick conversion, but remember that reinvested
          monthly payments compound to slightly more than the linear annual figure.
        </p>
        <h2>Frequently asked questions</h2>
        {monthlyYieldVsAnnualFaqs.map((f) => (
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
