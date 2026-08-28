import type { Metadata } from 'next';
import Link from 'next/link';
import { POSTS, getPost } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { articleJsonLd, faqJsonLd } from '@/lib/schema';
import { getDividendsAsOf, getTickerData } from '@/lib/dividendData';
import UpcomingDistribution from '@/components/UpcomingDistribution';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = POSTS.filter((p) => p.slug !== slug).slice(0, 3);
  const path = `/blog/${slug}`;
  // ticker 日历博客:动态数据块存在时,Article dateModified 用数据 asOf(内容真的刷新了)。
  const tickerData = post.ticker ? getTickerData(post.ticker) : undefined;
  const tickerAsOf = tickerData ? getDividendsAsOf() : undefined;

  return (
    <article className="prose">
      <p style={{ color: 'var(--muted-foreground)', fontSize: '.85rem', marginBottom: 4 }}>
        By the Dividend Payout Calculator editorial team · {post.date} ·{' '}
        <Link href="/methodology">How we calculate</Link>
      </p>
      <h1 style={{ marginTop: 0 }}>{post.title}</h1>
      {post.ticker && <UpcomingDistribution ticker={post.ticker} />}
      <MDXRemote source={post.body} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />

      {post.faqs && post.faqs.length > 0 && (
        <>
          <h2>Frequently asked questions</h2>
          {post.faqs.map((f) => (
            <div key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </>
      )}

      <h2>Related articles</h2>
      <ul>
        {related.map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}`}>{p.title}</Link>
          </li>
        ))}
      </ul>

      <p style={{ color: 'var(--muted-foreground)', fontSize: '.8rem', marginTop: 32 }}>
        Try the <Link href="/">dividend calculator</Link> or browse all{' '}
        <Link href="/blog">dividend articles</Link>. Educational only — not financial advice.
      </p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: articleJsonLd({
            title: post.title,
            description: post.description,
            path,
            date: post.date,
            dateModified: tickerAsOf,
          }),
        }}
      />
      {post.faqs && post.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: faqJsonLd(post.faqs) }}
        />
      )}
    </article>
  );
}
