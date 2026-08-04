import type { MetadataRoute } from 'next';

const BASE = 'https://www.dividendpayoutcalculator.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '',
    '/blog',
    '/blog/what-is-dividend-yield-and-how-to-calculate-it',
    '/blog/what-is-a-good-dividend-yield',
    '/blog/how-dividend-reinvestment-works-drip',
    '/calculators/dividend-yield-calculator',
    '/calculators/dividend-growth-calculator',
    '/calculators/drip-calculator',
    '/calculators/monthly-dividend-calculator',
    '/calculators/dividend-payout-ratio-calculator',
    '/privacy-policy',
    '/terms',
  ];
  return paths.map((p) => ({
    url: `${BASE}${p}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: p === '' ? 1 : 0.8,
  }));
}
