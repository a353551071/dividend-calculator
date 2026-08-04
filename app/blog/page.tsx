import type { Metadata } from 'next';
import Link from 'next/link';
import { POSTS } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Dividend Blog — Learn Dividend Investing',
  description:
    'Learn how dividend yield, dividend growth, DRIP reinvestment and payout ratios work — with simple examples and free calculators.',
};

export default function BlogIndexPage() {
  return (
    <>
      <h1>Dividend Blog</h1>
      <p className="lead">
        Plain-English explanations of dividend investing, paired with the free calculators on this
        site.
      </p>
      <div className="tool-grid">
        {POSTS.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="tool-card">
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <p style={{ marginTop: 8, fontSize: '.8rem', color: 'var(--muted-foreground)' }}>{p.date}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
