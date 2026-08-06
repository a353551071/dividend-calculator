import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Dividend Calculator with questions, corrections or feedback.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <article className="prose">
      <h1>Contact</h1>
      <p>
        Questions, corrections or feedback about a calculator? We would love to hear from you.
      </p>
      <p>
        Email: <a href="mailto:contact@dividendpayoutcalculator.com">contact@dividendpayoutcalculator.com</a>
      </p>
      <p>
        Found a calculation bug? Please include the inputs you used and the result you expected —
        that helps us fix it quickly.
      </p>
      <p>
        Back to the <Link href="/">dividend calculator</Link>.
      </p>
    </article>
  );
}
