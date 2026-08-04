import type { Metadata } from 'next';
import Link from 'next/link';
import HeadlineDividendCalc from '@/components/HeadlineDividendCalc';
import FinanceNote from '@/components/FinanceNote';
import AdBanner from '@/components/AdBanner';

export const metadata: Metadata = {
  title: 'Dividend Calculator — Yield, Growth, DRIP & Monthly Income',
  description:
    'Free dividend calculator: instantly compute dividend yield, dividend growth, DRIP reinvestment returns, monthly dividend income and payout ratio.',
};

export default function HomePage() {
  const faq = [
    {
      q: 'How is dividend yield calculated?',
      a: 'Dividend yield is the annual dividend per share divided by the current share price, expressed as a percentage. For example, a stock paying $2 per share annually at a $100 price has a 2% dividend yield.',
    },
    {
      q: 'What is a DRIP calculator?',
      a: 'A DRIP (Dividend Reinvestment Plan) calculator simulates how reinvesting your dividends compounds your investment over time — dividends buy more shares, which then pay more dividends next year.',
    },
    {
      q: 'How much do I need to earn $1,000 a month in dividends?',
      a: 'At a 4% dividend yield you would need roughly $300,000 invested. Higher yields or dividend growth can reduce the amount needed, but very high yields often signal risk.',
    },
    {
      q: 'What is a good dividend payout ratio?',
      a: 'A payout ratio between 30% and 60% is generally considered healthy — the company returns meaningful cash to shareholders while retaining enough to reinvest in growth. Above 100% is usually unsustainable.',
    },
  ];
  const faqJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  });

  return (
    <>
      <section>
        <h1>Dividend Calculator</h1>
        <p className="lead">
          Estimate your dividend income in seconds. Enter a price and dividend, and this free
          calculator shows your dividend yield, future dividend growth, DRIP reinvestment returns
          and monthly dividend income.
        </p>
      </section>

      <div className="card">
        <HeadlineDividendCalc />
      </div>

      <FinanceNote />

      <AdBanner slot="home-top" />

      <section>
        <h2>Dividend Tools</h2>
        <div className="tool-grid">
          <Link href="/calculators/dividend-yield-calculator" className="tool-card">
            <h3>Dividend Yield Calculator</h3>
            <p>Annual dividend per share ÷ price. See your real yield.</p>
          </Link>
          <Link href="/calculators/dividend-growth-calculator" className="tool-card">
            <h3>Dividend Growth Calculator</h3>
            <p>Project future dividends with a compound growth rate.</p>
          </Link>
          <Link href="/calculators/drip-calculator" className="tool-card">
            <h3>DRIP Calculator</h3>
            <p>Simulate dividend reinvestment compounding over years.</p>
          </Link>
          <Link href="/calculators/monthly-dividend-calculator" className="tool-card">
            <h3>Monthly Dividend Income Calculator</h3>
            <p>How much monthly passive income your portfolio generates.</p>
          </Link>
          <Link href="/calculators/dividend-payout-ratio-calculator" className="tool-card">
            <h3>Payout Ratio Calculator</h3>
            <p>Check if a dividend is sustainable against earnings.</p>
          </Link>
        </div>
      </section>

      <section>
        <h2>Frequently Asked Questions</h2>
        <div className="faq">
          {faq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqJsonLd }}
      />
    </>
  );
}
