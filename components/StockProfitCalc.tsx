'use client';

import React, { useState } from 'react';

export default function StockProfitCalc() {
  // Core inputs
  const [shares, setShares] = useState<number>(100);
  const [buyPrice, setBuyPrice] = useState<number>(120);
  const [sellPrice, setSellPrice] = useState<number>(165);

  // Fees & Dividends
  const [buyFee, setBuyFee] = useState<number>(0);
  const [sellFee, setSellFee] = useState<number>(0);
  const [dividends, setDividends] = useState<number>(240);

  // Holding period & Annualized CAGR
  const [holdingYears, setHoldingYears] = useState<number>(2);

  // Tax estimation
  const [includeTax, setIncludeTax] = useState<boolean>(false);
  const [taxRate, setTaxRate] = useState<number>(15); // e.g. 15% long-term capital gains

  // --- Calculations ---
  const validShares = Math.max(0, shares || 0);
  const validBuyPrice = Math.max(0, buyPrice || 0);
  const validSellPrice = Math.max(0, sellPrice || 0);
  const validBuyFee = Math.max(0, buyFee || 0);
  const validSellFee = Math.max(0, sellFee || 0);
  const validDividends = Math.max(0, dividends || 0);
  const validYears = Math.max(0, holdingYears || 0);

  // Initial Investment (Cost Basis)
  const initialStockCost = validShares * validBuyPrice;
  const totalCostBasis = initialStockCost + validBuyFee;

  // Gross & Net Sale Proceeds
  const grossProceeds = validShares * validSellPrice;
  const netProceeds = Math.max(0, grossProceeds - validSellFee);

  // Capital Gain / Loss (Price only, minus fees)
  const capitalGain = netProceeds - totalCostBasis;
  const capitalGainPct = totalCostBasis > 0 ? (capitalGain / totalCostBasis) * 100 : 0;

  // Total Return (Capital Gain + Dividends)
  const totalProfitBeforeTax = capitalGain + validDividends;
  const totalRoiPct = totalCostBasis > 0 ? (totalProfitBeforeTax / totalCostBasis) * 100 : 0;

  // Annualized Return (CAGR)
  // CAGR = ((Final Ending Value / Initial Cost Basis) ^ (1 / years)) - 1
  const endingValue = netProceeds + validDividends;
  let cagr = 0;
  if (totalCostBasis > 0 && endingValue > 0 && validYears > 0) {
    cagr = (Math.pow(endingValue / totalCostBasis, 1 / validYears) - 1) * 100;
  }

  // Capital Gains Tax
  const estimatedTax =
    includeTax && capitalGain > 0 ? capitalGain * (Math.max(0, taxRate || 0) / 100) : 0;
  const netProfitAfterTax = totalProfitBeforeTax - estimatedTax;

  const isProfitable = totalProfitBeforeTax >= 0;

  const resetDefaults = () => {
    setShares(100);
    setBuyPrice(120);
    setSellPrice(165);
    setBuyFee(0);
    setSellFee(0);
    setDividends(240);
    setHoldingYears(2);
    setIncludeTax(false);
    setTaxRate(15);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-slate-100 gap-2">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Stock Profit &amp; Total Return Calculator</h2>
          <p className="text-sm text-slate-500">
            Calculate capital gains, dividend yield boost, net profit, and annualized return (CAGR).
          </p>
        </div>
        <button
          type="button"
          onClick={resetDefaults}
          className="text-xs font-medium text-slate-500 hover:text-blue-600 transition-colors py-1 px-2.5 rounded bg-slate-50 border border-slate-200"
        >
          Reset Defaults
        </button>
      </div>

      {/* Main Grid: Inputs vs Outputs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-4">
            <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">
              1. Trade Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Number of Shares
                </label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={shares || ''}
                  onChange={(e) => setShares(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="100"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Buy Price ($ / share)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={buyPrice || ''}
                  onChange={(e) => setBuyPrice(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="120.00"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Sell Price ($ / share)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={sellPrice || ''}
                  onChange={(e) => setSellPrice(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="165.00"
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-4">
            <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">
              2. Dividends, Fees &amp; Holding Horizon
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Total Dividends Received ($)
                </label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={dividends || ''}
                  onChange={(e) => setDividends(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="0.00"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Dividends received during your ownership.
                </span>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Holding Period (Years)
                </label>
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={holdingYears || ''}
                  onChange={(e) => setHoldingYears(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="1.0"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Used to compute Annualized Return (CAGR).
                </span>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Buy Commission / Fee ($)
                </label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={buyFee || ''}
                  onChange={(e) => setBuyFee(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Sell Commission / Fee ($)
                </label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={sellFee || ''}
                  onChange={(e) => setSellFee(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          {/* Tax Estimation Toggle */}
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeTax}
                  onChange={(e) => setIncludeTax(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span className="text-sm font-semibold text-slate-800">
                  Estimate Capital Gains Tax
                </span>
              </label>
              {includeTax && (
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-slate-600">Tax Rate:</span>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={taxRate || ''}
                    onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                    className="w-16 px-2 py-1 border border-slate-300 rounded text-sm text-slate-900 font-semibold text-right"
                  />
                  <span className="text-xs text-slate-600">%</span>
                </div>
              )}
            </div>
            {includeTax && (
              <p className="text-xs text-slate-500 mt-2">
                Estimated tax is calculated on net capital gains (excluding dividends, which are taxed separately via qualified/ordinary dividend rules).
              </p>
            )}
          </div>
        </div>

        {/* Right Output Dashboard (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          {/* Main Profit Card */}
          <div
            className={`p-6 rounded-xl border ${
              isProfitable
                ? 'bg-emerald-50/70 border-emerald-200'
                : 'bg-rose-50/70 border-rose-200'
            }`}
          >
            <div className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Net Profit / Total Gain
            </div>
            <div
              className={`text-3xl sm:text-4xl font-extrabold ${
                isProfitable ? 'text-emerald-700' : 'text-rose-700'
              }`}
            >
              {isProfitable ? '+' : ''}
              ${totalProfitBeforeTax.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  isProfitable ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'
                }`}
              >
                Total ROI: {isProfitable ? '+' : ''}
                {totalRoiPct.toFixed(2)}%
              </span>

              {validYears > 0 && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-900">
                  Annualized (CAGR): {cagr >= 0 ? '+' : ''}
                  {cagr.toFixed(2)}%
                </span>
              )}
            </div>

            {includeTax && (
              <div className="mt-4 pt-4 border-t border-slate-200/60 flex justify-between items-center text-xs">
                <span className="text-slate-600 font-medium">Net Profit After Estimated Tax:</span>
                <span
                  className={`font-bold ${
                    netProfitAfterTax >= 0 ? 'text-emerald-800' : 'text-rose-800'
                  }`}
                >
                  ${netProfitAfterTax.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            )}
          </div>

          {/* Breakdown Stats Table */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 border-b border-slate-200 pb-2">
              Comprehensive Trade Breakdown
            </h4>

            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-600">Total Purchase Basis (Incl. Fees):</span>
              <span className="font-semibold text-slate-900">
                ${totalCostBasis.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-600">Net Sales Proceeds:</span>
              <span className="font-semibold text-slate-900">
                ${netProceeds.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-600">Capital Gain (Price Return Only):</span>
              <span
                className={`font-semibold ${
                  capitalGain >= 0 ? 'text-emerald-700' : 'text-rose-700'
                }`}
              >
                {capitalGain >= 0 ? '+' : ''}$
                {capitalGain.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{' '}
                ({capitalGainPct >= 0 ? '+' : ''}
                {capitalGainPct.toFixed(2)}%)
              </span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-600">Total Dividend Payouts:</span>
              <span className="font-semibold text-blue-700">
                +${validDividends.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-600">Total Brokerage Commissions:</span>
              <span className="font-semibold text-slate-700">
                ${(validBuyFee + validSellFee).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>

            {includeTax && (
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-600">Estimated Capital Gains Tax ({taxRate}%):</span>
                <span className="font-semibold text-rose-600">
                  -${estimatedTax.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            )}
          </div>

          {/* Dividend Lift Context */}
          {validDividends > 0 && totalCostBasis > 0 && (
            <div className="p-3 bg-blue-50/70 rounded-lg border border-blue-200 text-xs text-blue-900 leading-relaxed">
              💡 <strong>Dividend Boost:</strong> Your dividend payouts added an extra{' '}
              <strong>+{(validDividends / totalCostBasis * 100).toFixed(2)}%</strong> in return on top of your stock price appreciation!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
