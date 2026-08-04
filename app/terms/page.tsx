import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of use and disclaimer for the free dividend calculator tools.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <div className="prose">
      <h1>Terms of Use</h1>
      <p>Last updated: August 2026</p>

      <h2>Educational tools only</h2>
      <p>
        The calculators on this website are provided for educational and informational purposes only.
        The results are estimates based on the numbers you enter and simplifying assumptions. They are
        not financial, investment, tax or legal advice.
      </p>

      <h2>No financial advice</h2>
      <p>
        Nothing on this website constitutes a recommendation to buy, sell or hold any security or
        investment product. Dividend yield, growth rates and payout ratios are historical or assumed
        figures that do not guarantee future results. Always consult a qualified financial professional
        before making investment decisions.
      </p>

      <h2>No warranty</h2>
      <p>
        The tools are provided &quot;as is&quot; without warranty of any kind. We make no guarantees
        about the accuracy, completeness or suitability of the results for any purpose.
      </p>

      <h2>Use at your own risk</h2>
      <p>
        You are solely responsible for any decisions made using this website. We are not liable for any
        loss or damage arising from the use of these tools.
      </p>
    </div>
  );
}
