import { ImageResponse } from 'next/og';
import { SITE_NAME, SITE_URL } from '@/lib/nav';

export const runtime = 'edge';
export const alt = `${SITE_NAME} — free dividend calculators`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Dynamic Open Graph image, rendered on-demand via next/og.
 * Brand-only (no per-page data), so a single root route covers the whole site.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: 'linear-gradient(135deg, #0b1220 0%, #111c3a 55%, #1d3a72 100%)',
          color: '#fff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: '#2563eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 34,
              fontWeight: 800,
            }}
          >
            $
          </div>
          <div style={{ fontSize: 26, fontWeight: 600, color: '#bfdbfe', letterSpacing: 0.5 }}>
            {SITE_URL.replace('https://', '')}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.02, letterSpacing: -1.5 }}>
            {SITE_NAME}
          </div>
          <div style={{ fontSize: 34, fontWeight: 500, color: '#dbeafe', maxWidth: 920 }}>
            Yield, growth, DRIP, monthly income &amp; payout ratio.
          </div>
        </div>

        <div style={{ display: 'flex', gap: 28, fontSize: 26, fontWeight: 600, color: '#93c5fd' }}>
          <span>Free</span>
          <span>No sign-up</span>
          <span>Built for 2026</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
