'use client';

import React, { useState } from 'react';

interface Preset {
  ticker: string;
  name: string;
  ratioA: number; // e.g. 10
  ratioB: number; // e.g. 1
  type: 'forward' | 'reverse';
  samplePrice: number;
}

const PRESETS: Preset[] = [
  { ticker: 'NVDA', name: 'Nvidia (10-for-1)', ratioA: 10, ratioB: 1, type: 'forward', samplePrice: 1200 },
  { ticker: 'AVGO', name: 'Broadcom (10-for-1)', ratioA: 10, ratioB: 1, type: 'forward', samplePrice: 1700 },
  { ticker: 'AAPL', name: 'Apple (4-for-1)', ratioA: 4, ratioB: 1, type: 'forward', samplePrice: 500 },
  { ticker: 'TSLA', name: 'Tesla (3-for-1)', ratioA: 3, ratioB: 1, type: 'forward', samplePrice: 900 },
  { ticker: 'AMZN', name: 'Amazon (20-for-1)', ratioA: 20, ratioB: 1, type: 'forward', samplePrice: 2400 },
];

export default function StockSplitCalc() {
  const [splitType, setSplitType] = useState<'forward' | 'reverse'>('forward');
  const [ratioNew, setRatioNew] = useState<number>(10); // e.g. 10 shares
  const [ratioOld, setRatioOld] = useState<number>(1);  // e.g. 1 share
  const [sharesHeld, setSharesHeld] = useState<number>(50);
  const [sharePrice, setSharePrice] = useState<number>(1200);
  const [dividendPerShare, setDividendPerShare] = useState<number>(1.60); // annual DPS

  const applyPreset = (p: Preset) => {
    setSplitType(p.type);
    setRatioNew(p.ratioA);
    setRatioOld(p.ratioB);
    setSharePrice(p.samplePrice);
  };

  // Calculations
  const validRatioNew = Math.max(0.001, ratioNew || 1);
  const validRatioOld = Math.max(0.001, ratioOld || 1);
  const validShares = Math.max(0, sharesHeld || 0);
  const validPrice = Math.max(0, sharePrice || 0);
  const validDps = Math.max(0, dividendPerShare || 0);

  // Multiplier: New Shares = Old Shares * (ratioNew / ratioOld)
  const multiplier = validRatioNew / validRatioOld;

  const postSplitShares = validShares * multiplier;
  const wholeShares = Math.floor(postSplitShares);
  const fractionalShare = postSplitShares - wholeShares;

  const postSplitPrice = multiplier > 0 ? validPrice / multiplier : 0;
  const postSplitDps = multiplier > 0 ? validDps / multiplier : 0;

  const preTotalValue = validShares * validPrice;
  const postTotalValue = postSplitShares * postSplitPrice;

  const preAnnualDividends = validShares * validDps;
  const postAnnualDividends = postSplitShares * postSplitDps;

  const cashInLieu = fractionalShare * postSplitPrice;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
      {/* Top Presets */}
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
          Popular Stock Split Presets
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.ticker}
              type="button"
              onClick={() => applyPreset(p)}
              className="text-xs font-medium py-1.5 px-3 rounded-full border border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50/50 transition-colors"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Inputs vs Outputs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Split Type Toggle */}
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              1. Split Type &amp; Ratio
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setSplitType('forward');
                  if (ratioNew < ratioOld) {
                    setRatioNew(ratioOld);
                    setRatioOld(1);
                  }
                }}
                className={`py-2 px-3 text-xs font-bold rounded-lg border transition-all text-center ${
                  splitType === 'forward'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                }`}
              >
                Forward Split (e.g. 10-for-1)
              </button>
              <button
                type="button"
                onClick={() => {
                  setSplitType('reverse');
                  setRatioNew(1);
                  setRatioOld(10);
                }}
                className={`py-2 px-3 text-xs font-bold rounded-lg border transition-all text-center ${
                  splitType === 'reverse'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                }`}
              >
                Reverse Split (e.g. 1-for-10)
              </button>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <div className="flex-1">
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  You Receive (New Shares)
                </label>
                <input
                  type="number"
                  min="0.01"
                  step="any"
                  value={ratioNew || ''}
                  onChange={(e) => setRatioNew(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="10"
                />
              </div>

              <div className="pt-5 text-sm font-bold text-slate-400">for every</div>

              <div className="flex-1">
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  You Owned (Old Shares)
                </label>
                <input
                  type="number"
                  min="0.01"
                  step="any"
                  value={ratioOld || ''}
                  onChange={(e) => setRatioOld(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="1"
                />
              </div>
            </div>
            <div className="text-[11px] text-slate-500">
              Ratio: <strong>{ratioNew}-for-{ratioOld}</strong> {splitType === 'forward' ? 'Forward' : 'Reverse'} Split (Multiplier: ×{multiplier.toFixed(4)})
            </div>
          </div>

          {/* Position Inputs */}
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-4">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              2. Your Current Pre-Split Position
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Pre-Split Shares Owned
                </label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={sharesHeld || ''}
                  onChange={(e) => setSharesHeld(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="50"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Pre-Split Share Price / Cost Basis ($)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={sharePrice || ''}
                  onChange={(e) => setSharePrice(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="1200.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Pre-Split Annual Dividend Per Share ($) <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={dividendPerShare || ''}
                onChange={(e) => setDividendPerShare(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="1.60"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Calculates post-split adjusted dividend per share. Total annual payout remains identical.
              </span>
            </div>
          </div>
        </div>

        {/* Right Outputs (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          {/* Post-Split Summary Card */}
          <div className="p-6 rounded-xl border bg-blue-50/70 border-blue-200 space-y-4">
            <div className="flex justify-between items-center border-b border-blue-200/80 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-900">
                Post-Split Shares
              </span>
              <span className="text-2xl font-extrabold text-blue-900">
                {postSplitShares.toLocaleString(undefined, { maximumFractionDigits: 4 })} shares
              </span>
            </div>

            <div className="flex justify-between items-center border-b border-blue-200/80 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-900">
                Post-Split Share Price
              </span>
              <span className="text-2xl font-extrabold text-blue-900">
                ${postSplitPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
              </span>
            </div>

            <div className="flex justify-between items-center pt-1">
              <span className="text-xs font-medium text-slate-600">Total Portfolio Value:</span>
              <span className="text-sm font-bold text-slate-900">
                ${postTotalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 border-b border-slate-200 pb-2">
              Before vs. After Split Comparison
            </h4>

            <div className="grid grid-cols-3 text-xs font-semibold text-slate-500 pb-1">
              <span>Metric</span>
              <span className="text-right">Before Split</span>
              <span className="text-right text-blue-700">After Split</span>
            </div>

            <div className="grid grid-cols-3 text-xs border-t border-slate-200/60 pt-2">
              <span className="text-slate-600 font-medium">Shares:</span>
              <span className="text-right font-semibold text-slate-800">{validShares}</span>
              <span className="text-right font-bold text-blue-700">{postSplitShares}</span>
            </div>

            <div className="grid grid-cols-3 text-xs border-t border-slate-200/60 pt-2">
              <span className="text-slate-600 font-medium">Share Price:</span>
              <span className="text-right font-semibold text-slate-800">${validPrice.toFixed(2)}</span>
              <span className="text-right font-bold text-blue-700">${postSplitPrice.toFixed(2)}</span>
            </div>

            <div className="grid grid-cols-3 text-xs border-t border-slate-200/60 pt-2">
              <span className="text-slate-600 font-medium">Portfolio Value:</span>
              <span className="text-right font-semibold text-slate-800">${preTotalValue.toFixed(2)}</span>
              <span className="text-right font-bold text-slate-900">${postTotalValue.toFixed(2)}</span>
            </div>

            {validDps > 0 && (
              <>
                <div className="grid grid-cols-3 text-xs border-t border-slate-200/60 pt-2">
                  <span className="text-slate-600 font-medium">Div Per Share:</span>
                  <span className="text-right font-semibold text-slate-800">${validDps.toFixed(2)}</span>
                  <span className="text-right font-bold text-blue-700">${postSplitDps.toFixed(4)}</span>
                </div>

                <div className="grid grid-cols-3 text-xs border-t border-slate-200/60 pt-2">
                  <span className="text-slate-600 font-medium">Annual Income:</span>
                  <span className="text-right font-semibold text-slate-800">${preAnnualDividends.toFixed(2)}</span>
                  <span className="text-right font-bold text-emerald-700">${postAnnualDividends.toFixed(2)}</span>
                </div>
              </>
            )}
          </div>

          {/* Fractional Share Note */}
          {fractionalShare > 0 ? (
            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900 leading-relaxed">
              ⚠️ <strong>Fractional Share Alert:</strong> Your position yields {wholeShares} whole shares and {fractionalShare.toFixed(4)} fractional shares. If your broker does not support fractional shares, they will typically credit <strong>${cashInLieu.toFixed(2)}</strong> cash-in-lieu to your account.
            </div>
          ) : (
            <div className="p-3 bg-slate-100 rounded-lg text-xs text-slate-600 leading-relaxed">
              💡 <strong>Key Takeaway:</strong> A stock split changes the number of slices, not the size of the pie. Your total equity value and dividend income remain exactly identical.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
