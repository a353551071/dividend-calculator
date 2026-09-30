import type { Metadata } from 'next';
import Link from 'next/link';
import ForeignInvestorDripCalc from '@/components/ForeignInvestorDripCalc';
import FinanceNote from '@/components/FinanceNote';
import AdBanner from '@/components/AdBanner';
import FaqAccordion, { type FaqItem } from '@/components/FaqAccordion';
import { getDividendsAsOf, getTickerData } from '@/lib/dividendData';
import { webAppJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/lib/schema';
import { TAX_TREATIES } from '@/data/taxTreaties';

const PATH = '/calculators/foreign-investor-dividend-calculator';

// Dynamic SCHD live data defaults
const schd = getTickerData('SCHD');
const asOf = getDividendsAsOf();
const livePrice = schd?.price != null ? Math.round(schd.price * 100) / 100 : 80;
const liveYield = schd?.ttmYieldPct != null ? Math.round(schd.ttmYieldPct * 10) / 10 : 3.5;
const asOfText = asOf
  ? new Date(asOf + 'T00:00:00Z').toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC',
    })
  : 'Sep 2026';

const prefillNote = `Inputs are prefilled with SCHD (Schwab U.S. Dividend Equity ETF) at $${livePrice.toFixed(
  2
)} and ${liveYield.toFixed(1)}% yield as of ${asOfText}. Select your tax residence country below to calculate your exact net dividend cash flow.`;

export const metadata: Metadata = {
  title: { absolute: 'Foreign Investor Dividend Calculator 2026: US Stocks & W-8BEN Tax' },
  description:
    'Calculate net after-tax US dividend income for non-US residents (NRA). Built-in W-8BEN tax treaty rates (10%, 15%, 30%) for SCHD, QQQI, and US dividend stocks. Free & instant.',
  alternates: { canonical: PATH },
};

const faqs: FaqItem[] = [
  {
    q: 'How much tax do non-US residents (NRA) pay on US stock dividends?',
    a: 'Under Section 1441 of the U.S. Internal Revenue Code, non-resident aliens (NRAs) are subject to a default statutory withholding tax of 30% on U.S.-sourced dividends. However, if your country of tax residence has an active bilateral double-taxation treaty with the United States and you submit a valid Form W-8BEN to your broker, the withholding rate is significantly reduced — to 10% for China and Mexico, and 15% for the UK, Japan, Australia, Germany, Canada, and most European countries.',
  },
  {
    q: 'What is Form W-8BEN and how does it affect dividend withholding?',
    a: 'Form W-8BEN (Certificate of Foreign Status of Beneficial Owner for United States Tax Withholding and Reporting) is an IRS form used by foreign individual investors to certify that they are not U.S. persons and to claim treaty benefits under their home country’s bilateral tax treaty. Most major international brokerages (such as Charles Schwab International, Interactive Brokers, Firstrade, and Saxo Bank) require you to complete W-8BEN during account opening, automatically deducting the reduced treaty rate at source.',
  },
  {
    q: 'What is the after-tax dividend yield on SCHD for foreign investors?',
    a: 'Because SCHD currently yields around 3.5% pre-tax, the actual net yield in your pocket depends on your tax treaty rate. For a Chinese resident (10% treaty), the net dividend yield is 3.15%. For a UK or Japanese resident (15% treaty), the net yield is 2.98%. For investors in non-treaty jurisdictions like Hong Kong, Singapore, or Taiwan (30% statutory rate), the net yield is 2.45%.',
  },
  {
    q: 'Do non-US investors need to file a U.S. tax return (Form 1040-NR) for dividend income?',
    a: 'In most standard portfolio investment cases, no. U.S. dividend withholding tax is withheld at source by your broker or clearing custodian at the time distributions are paid out. As long as the correct withholding tax (30% or treaty rate) was withheld and you have no effectively connected U.S. business income, you are generally not required to file an annual U.S. nonresident tax return (Form 1040-NR).',
  },
  {
    q: 'What is compounding tax drag in dividend reinvestment (DRIP)?',
    a: 'When an investor enrolls in DRIP (Dividend Reinvestment Plan), only the net dividend after withholding tax is reinvested to purchase additional shares. Over 10 to 20 years, having 10% to 30% shaved off every distribution before reinvestment creates a cumulative drag on compounding growth. Our calculator explicitly models this "Compounding Tax Drag" compared to a zero-tax benchmark.',
  },
  {
    q: 'What is the Ireland-domiciled UCITS ETF alternative for foreign investors?',
    a: 'For investors residing in jurisdictions subject to 30% U.S. withholding tax (or seeking to eliminate the U.S. estate tax threshold of $60,000 for foreign investors), many international investors choose London- or European-listed UCITS ETFs (such as FUSD / Fidelity US Quality Income UCITS ETF). Under the US-Ireland tax treaty, the Irish fund pays 15% withholding tax internally on U.S. dividends, and non-Irish investors receive distributions with 0% Irish withholding tax.',
  },
];

export default function ForeignInvestorDividendPage() {
  const jsonLdWeb = webAppJsonLd('Foreign Investor Dividend Calculator', PATH);
  const jsonLdBreadcrumb = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Calculators', path: '/calculators/dividend-yield-calculator' },
    { name: 'Foreign Investor Dividend Calculator', path: PATH },
  ]);
  const jsonLdFaq = faqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdWeb }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdBreadcrumb }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdFaq }}
      />

      <h1>US Dividend Tax Calculator for Foreign Investors (W-8BEN & NRA)</h1>
      <p className="lead">
        As a non-U.S. resident (Non-Resident Alien or NRA), your U.S. stock and ETF distributions (like{' '}
        <Link href="/calculators/schd-dividend-calculator"><strong>SCHD</strong></Link> or{' '}
        <Link href="/calculators/qqqi-dividend-calculator"><strong>QQQI</strong></Link>) are subject to mandatory U.S. dividend withholding tax.
        While the statutory default is <strong>30%</strong>, eligible residents under bilateral tax treaties enjoy reduced rates of <strong>10% or 15%</strong> with a valid Form W-8BEN.
        Use this interactive tool to calculate your exact <strong>net after-tax dividend cash flow</strong> and model the long-term tax drag on DRIP compounding.
      </p>

      <h2>Calculate your net after-tax dividend income</h2>
      <div className="card">
        <ForeignInvestorDripCalc
          defaultTicker="SCHD"
          defaultPrice={livePrice}
          defaultYield={liveYield}
          defaultDivGrowth={10}
          defaultPriceGrowth={7}
          defaultMonthly={100}
          defaultYears={15}
          prefillNote={prefillNote}
        />
      </div>

      <FinanceNote />

      <AdBanner slot="schd" />

      <div className="prose">
        <h2>How U.S. Dividend Withholding Works for Non-Resident Aliens (NRA)</h2>
        <p>
          Under Chapter 3 (Internal Revenue Code Section 1441) of the U.S. tax code, U.S. brokers and custodians are legally required to withhold tax on dividends paid to non-resident aliens at source.
          Unlike capital gains (which are generally 0% tax-free for foreign individual investors who do not spend more than 183 days in the U.S.), dividends are categorized as <em>Fixed, Determinable, Annual, or Periodical (FDAP) income</em> and are taxed at the border.
        </p>

        <h3>Common W-8BEN Tax Treaty Rates at a Glance</h3>
        <p>
          If your country of tax residence has negotiated a double taxation convention with the United States, your broker will withhold at the preferential treaty rate instead of 30%:
        </p>

        <div className="results-table-wrap">
          <table className="results-table">
            <thead>
              <tr>
                <th>Jurisdiction</th>
                <th>Withholding Rate</th>
                <th>Bilateral Treaty Provision</th>
                <th>Applicability</th>
              </tr>
            </thead>
            <tbody>
              {TAX_TREATIES.slice(0, 10).map((t) => (
                <tr key={t.code}>
                  <td><strong>{t.country}</strong></td>
                  <td style={{ color: t.ratePct <= 15 ? 'var(--color-primary, #2563eb)' : 'inherit', fontWeight: 600 }}>
                    {t.ratePct}%
                  </td>
                  <td>{t.treatyArticle || 'Standard statutory'}</td>
                  <td>{t.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>SCHD Dividend Case Study: Gross vs. Net Returns by Country</h2>
        <p>
          Consider an investor holding <strong>$100,000</strong> in <Link href="/calculators/schd-dividend-calculator">SCHD</Link> at a 3.5% dividend yield, generating <strong>$3,500</strong> in gross annual dividends:
        </p>
        <ul>
          <li>
            <strong>China Resident (10% Treaty):</strong> $350 withheld by IRS &rarr; <strong>$3,150</strong> net cash received.
          </li>
          <li>
            <strong>UK / Japan / Germany / Canada (15% Treaty):</strong> $525 withheld by IRS &rarr; <strong>$2,975</strong> net cash received.
          </li>
          <li>
            <strong>Hong Kong / Singapore / Taiwan (30% Non-Treaty):</strong> $1,050 withheld by IRS &rarr; <strong>$2,450</strong> net cash received.
          </li>
        </ul>
        <p>
          Over a 15-year horizon with dividend reinvestment (DRIP), the 30% non-treaty investor suffers a substantial compounding drag compared to a 10% treaty investor, underscoring the critical importance of understanding your tax status.
        </p>

        <h2>Tax Optimization Strategies for Non-Treaty Investors</h2>
        <p>
          If you reside in a jurisdiction without a favorable U.S. tax treaty (such as Singapore, Hong Kong, or Latin America), two popular tax mitigation strategies exist:
        </p>
        <ol>
          <li>
            <strong>Irish-Domiciled UCITS ETFs:</strong> Ireland maintains a favorable bilateral treaty with the U.S., capping dividend withholding on underlying U.S. shares at 15%. Funds like <em>Fidelity US Quality Income (FUSD)</em> or <em>Vanguard S&amp;P 500 (VUSD)</em> absorb this 15% internally and distribute dividends with 0% Irish withholding tax, effectively halving the tax penalty for 30% jurisdictions.
          </li>
          <li>
            <strong>U.S. Estate Tax Protection:</strong> Direct U.S. shares and ETFs owned by non-resident aliens are subject to U.S. federal estate tax with an exemption of only $60,000. Irish UCITS ETFs are non-U.S. situated assets, completely bypassing U.S. estate tax liability.
          </li>
        </ol>

        <h2>Frequently Asked Questions</h2>
        <FaqAccordion faqs={faqs} />
      </div>
    </>
  );
}
