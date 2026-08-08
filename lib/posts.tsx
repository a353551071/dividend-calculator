import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  /** 可选 FAQ 问答:页面可见(模板渲染)+ FAQPage schema(抢 PAA/AI Overview)。 */
  faqs?: { q: string; a: string }[];
  /** 文章正文(raw MDX 源:markdown 或 HTML-in-MDX)。由 [slug] 页 MDXRemote 渲染。 */
  body: string;
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

function loadPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const posts: Post[] = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '');
      const { data, content } = matter(fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8'));
      const faqs = Array.isArray(data.faqs)
        ? data.faqs.map((f: { q: unknown; a: unknown }) => ({ q: String(f.q), a: String(f.a) }))
        : undefined;
      return {
        slug,
        title: String(data.title ?? slug),
        date: String(data.date ?? ''),
        description: String(data.description ?? ''),
        faqs: faqs && faqs.length > 0 ? faqs : undefined,
        body: content.trim(),
      };
    });
  // 最新在前(确定性;原 posts.tsx 是手写顺序,改为日期倒序更符合博客习惯)
  return posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.slug.localeCompare(b.slug)));
}

export const POSTS: Post[] = loadPosts();

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
