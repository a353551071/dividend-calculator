'use client';

import React from 'react';

interface DividendTrackerPromoProps {
  className?: string;
  stripeLink?: string;
}

export default function DividendTrackerPromo({
  className = '',
  stripeLink,
}: DividendTrackerPromoProps) {
  // Configurable Stripe Payment Link or fallback
  const checkoutUrl =
    stripeLink ||
    process.env.NEXT_PUBLIC_STRIPE_DIVIDEND_PAYMENT_LINK ||
    'https://buy.stripe.com/fZu14g5A84bHfry9PM3Ru01';

  return (
    <section
      className={`my-8 relative overflow-hidden rounded-2xl border-2 border-emerald-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-white p-6 md:p-8 shadow-xl ${className}`}
      aria-labelledby="promo-heading"
    >
      {/* Background ambient glow */}
      <div
        className="absolute -right-16 -top-16 w-56 h-56 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-10">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
            <span>✦ 2026 EDITION</span>
            <span aria-hidden="true">·</span>
            <span>GOOGLE SHEETS MASTER TEMPLATE</span>
          </div>

          <h3
            id="promo-heading"
            className="text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight"
          >
            Track Your Entire Dividend Portfolio in One Place
          </h3>

          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Stop calculating one stock at a time. Upgrade to our automated{' '}
            <strong className="text-emerald-400 font-semibold">
              Dividend Snowball & Passive Income Spreadsheet
            </strong>
            . Live stock prices, 12-month projected payout calendar, and financial freedom milestones.
          </p>

          {/* Core Feature Bullet Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs md:text-sm text-slate-200">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold" aria-hidden="true">✓</span>
              <span>Live prices via <code>GOOGLEFINANCE</code> (Never breaks)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold" aria-hidden="true">✓</span>
              <span>12-Month Projected Cashflow Calendar</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold" aria-hidden="true">✓</span>
              <span>FIRE Milestones (Coffee to Rent Covered)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold" aria-hidden="true">✓</span>
              <span>30-Year DRIP Snowball Simulator</span>
            </div>
          </div>
        </div>

        {/* Price & Buy Action Box */}
        <div className="w-full lg:w-72 bg-slate-800/95 border border-slate-700/80 rounded-xl p-5 text-center flex flex-col justify-between shrink-0 shadow-lg">
          <div>
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              Lifetime Buyout
            </span>
            <div className="text-4xl font-extrabold text-white mt-1">$9.90</div>
            <span className="text-xs text-emerald-400 font-medium">
              One-Time Payment · No Subscriptions
            </span>
          </div>

          <div className="mt-5 space-y-2.5">
            <a
              href={checkoutUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-md hover:shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer no-underline"
            >
              <span>⚡ Get Instant Access</span>
              <span className="text-xs font-normal opacity-80">($9.90)</span>
            </a>

            <div className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
              <span>🔒 Stripe Verified</span>
              <span aria-hidden="true">·</span>
              <span>1-Click Copy to Google Drive</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
