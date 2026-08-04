import type { Metadata } from 'next';
import Link from 'next/link';
import { POSTS, getPost } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { articleJsonLd } from '@/lib/schema';

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

  return (
    <article className="prose">
      <p style={{ color: 'var(--muted-foreground)', fontSize: '.85rem', marginBottom: 4 }}>{post.date}</p>
      <h1 style={{ marginTop: 0 }}>{post.title}</h1>
      {post.body}

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
          }),
        }}
      />
    </article>
  );
}
