import type { MetadataRoute } from 'next';
import { POSTS } from '@/lib/posts';
import { getDividendsAsOf } from '@/lib/dividendData';

const BASE = 'https://www.dividendpayoutcalculator.com';

/** 计算器页最近一次内容大改日期（monthly TDH + OnPage 完善）。 */
const CALC_UPDATED = '2026-08-08';
/** 信任/合规页最近一次改动日期。 */
const TRUST_UPDATED = '2026-08-06';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const calcDate = new Date(CALC_UPDATED);
  const trustDate = new Date(TRUST_UPDATED);

  const calculators = [
    '/calculators/dividend-yield-calculator',
    '/calculators/dividend-growth-calculator',
    '/calculators/drip-calculator',
    '/calculators/monthly-dividend-calculator',
    '/calculators/dividend-payout-ratio-calculator',
    '/calculators/schd-dividend-calculator',
    '/calculators/qqqi-dividend-calculator',
  ].map((p) => ({
    url: `${BASE}${p}`,
    lastModified: calcDate,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  // ticker 日历博客随 dividends.json 刷新(asOf 即真实内容更新日),其余博客保持首发日。
  const dataAsOf = getDividendsAsOf();
  const blogPosts = POSTS.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: post.ticker && dataAsOf ? new Date(dataAsOf) : new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const staticPages = (
    [
      { path: '', changeFrequency: 'daily' as const, priority: 1, lastModified: now },
      { path: '/blog', changeFrequency: 'daily' as const, priority: 0.9, lastModified: now },
      { path: '/about', changeFrequency: 'yearly' as const, priority: 0.3, lastModified: trustDate },
      { path: '/contact', changeFrequency: 'yearly' as const, priority: 0.3, lastModified: trustDate },
      { path: '/privacy-policy', changeFrequency: 'yearly' as const, priority: 0.3, lastModified: trustDate },
      { path: '/terms', changeFrequency: 'yearly' as const, priority: 0.3, lastModified: trustDate },
    ] as const
  ).map((entry) => ({
    url: `${BASE}${entry.path}`,
    lastModified: entry.lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));

  return [...staticPages, ...calculators, ...blogPosts];
}
