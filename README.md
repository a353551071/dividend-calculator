# Dividend Payout Calculator (dividendpayoutcalculator.com)

The first live site — an SEO tool site for the seed keyword **"dividend calculator"**, monetized
with Google AdSense. This is a standalone Next.js project (moved out of the keyword-research
workspace). The keyword research that produced it is documented in the sibling
`出海行动方案/` workspace (`进度日志.md`, `score_report.xlsx`).

**Selection rationale**: locked in after manually verifying KD across 10 candidates. KD 7 (true
Easy), no dominant giants, a DR-14 small site ranks top 3, finance intent is monetizable,
pure-front-end so zero compute cost.

## Tech stack

- Next.js 14 App Router + TypeScript, **SSG** (every page pre-rendered to static HTML)
- Pure-function calculator logic (`lib/dividend.ts`) + vitest TDD (16 tests)
- Plain CSS (visual cues borrowed from the ai-shipany template: blue accent, large radius, soft shadow)
- No DB, no auth, no Stripe — pure tool site + AdSense, kept as light as possible (3 runtime deps)
- Structured data: Organization (site-wide), FAQPage (home), WebApplication + BreadcrumbList (each
  calculator), Article (blog posts)

## Local setup

```bash
npm install        # first time (the bundled node_modules was copied and is incomplete — reinstall)
npm run dev        # develop
npm run test       # vitest unit tests
npm run lint       # eslint (next/core-web-vitals)
npm run typecheck  # tsc --noEmit
npm run build      # production build
npm start          # serve the production build
```

> Note: `next build` works, but `vitest`/`npm scripts` may fail until you run a fresh `npm install`,
> because the shipped `node_modules` is a copied snapshot missing platform binaries
> (`@rollup/rollup-win32-x64-msvc`) and valid `.bin` shims.

## Environment variables (all optional — site builds & runs without them)

| Variable | Purpose | When to set |
|---|---|---|
| `NEXT_PUBLIC_ADSENSE_CLIENT` | AdSense publisher id (`ca-pub-...`); gates the ad script + `AdBanner` | after AdSense approval |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 measurement id (`G-...`); gates gtag | when you want traffic analytics |
| `NEXT_PUBLIC_CLARITY_ID` | Microsoft Clarity project id; gates the Clarity snippet | when you want heatmaps/session replay |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Google Search Console verification token; emits `<meta name="google-site-verification">` | to verify domain ownership in GSC |

Copy `.env.example` to `.env.local` and fill in the values you have. Unset variables simply disable
that integration — nothing renders, the build is unaffected.

## Pages (14 sitemap URLs / 13 content pages)

| Path | Content |
|---|---|
| `/` | Headline dividend calculator (yield + growth + monthly in one) + FAQ schema |
| `/calculators/dividend-yield-calculator` | Dividend yield |
| `/calculators/dividend-growth-calculator` | Dividend growth + Rule of 72 |
| `/calculators/drip-calculator` | DRIP reinvestment compounding |
| `/calculators/monthly-dividend-calculator` | Monthly dividend income |
| `/calculators/dividend-payout-ratio-calculator` | Payout-ratio sustainability |
| `/blog` + 3 posts | "What is dividend yield", "What is a good yield", "How DRIP works" |
| `/about` `/contact` | Trust pages (also needed for AdSense review) |
| `/privacy-policy` `/terms` | AdSense compliance pages |

## Live / post-launch checklist

- [x] Domain `dividendpayoutcalculator.com` bought, DNS → Vercel, apex → www
- [x] Deployed via Vercel (from GitHub `a353551071/dividend-calculator`)
- [x] canonical, sitemap, robots, Organization/WebApplication/Article schema, `ads.txt`, `llms.txt`
- [ ] **Push** the local fixes (canonical→www, English UI) — local is 2 commits ahead of `origin/main`
- [ ] GSC: verify domain (set `NEXT_PUBLIC_GSC_VERIFICATION`) → submit `sitemap.xml`
- [ ] AdSense: after approval, fill `NEXT_PUBLIC_ADSENSE_CLIENT`, replace `ads.txt` placeholder,
      swap `AdBanner` slot aliases for real ad-slot ids
- [ ] Analytics: set `NEXT_PUBLIC_GA_ID` + `NEXT_PUBLIC_CLARITY_ID`
- [ ] Add a real `public/og-image.png` (1200×630) for social sharing

## Maintenance

- Calculator logic lives in `lib/dividend.ts` (pure functions; run `npm test` after any change)
- Structured-data helpers live in `lib/schema.ts`; site config + nav in `lib/nav.ts` (single source)
- Deployment: Vercel auto-deploys from `main` on push (Git integration reconnected 2026-08-06)
