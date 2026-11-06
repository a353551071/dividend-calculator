'use client';

import React, { useState } from 'react';

export default function StockAverageDownCalc() {
  const [mode, setMode] = useState<'forward' | 'target'>('forward');

  // Mode 1: Forward inputs
  const [initShares, setInitShares] = useState<number>(100);
  const [initPrice, setInitPrice] = useState<number>(120);
  const [newShares, setNewShares] = useState<number>(50);
  const [newPrice, setNewPrice] = useState<number>(80);

  // Mode 2: Target solver inputs
  const [targetInitShares, setTargetInitShares] = useState<number>(100);
  const [targetInitPrice, setTargetInitPrice] = useState<number>(120);
  const [targetCurrentPrice, setTargetCurrentPrice] = useState<number>(80);
  const [desiredAverage, setDesiredAverage] = useState<number>(95);

  // --- Calculations for Mode 1 (Forward) ---
  const currentTotalCost = (initShares || 0) * (initPrice || 0);
  const newBuyCost = (newShares || 0) * (newPrice || 0);
  const combinedShares = (initShares || 0) + (newShares || 0);
  const combinedTotalCost = currentTotalCost + newBuyCost;
  const newAverageCost = combinedShares > 0 ? combinedTotalCost / combinedShares : 0;
  const reductionAmount = (initPrice || 0) - newAverageCost;
  const reductionPct = initPrice > 0 ? (reductionAmount / initPrice) * 100 : 0;

  // Break-even required rally
  const originalRallyNeeded =
    newPrice > 0 && initPrice > newPrice ? ((initPrice - newPrice) / newPrice) * 100 : 0;
  const newRallyNeeded =
    newPrice > 0 && newAverageCost > newPrice
      ? ((newAverageCost - newPrice) / newPrice) * 100
      : 0;

  // --- Calculations for Mode 2 (Target Solver) ---
  // Formula: Target = (S1*P1 + S2*P2) / (S1 + S2) => S2 = S1*(P1 - Target) / (Target - P2)
  const canSolve =
    desiredAverage > targetCurrentPrice &&
    desiredAverage < targetInitPrice &&
    targetInitShares > 0;
  const neededShares = canSolve
    ? Math.ceil(
        (targetInitShares * (targetInitPrice - desiredAverage)) /
          (desiredAverage - targetCurrentPrice)
      )
    : 0;
  const neededCash = neededShares * targetCurrentPrice;

  return (
    <div className="space-y-6">
      {/* Mode Switcher Tabs */}
      <div className="flex border-b border-slate-200">
        <button
          type="button"
          onClick={() => setMode('forward')}
          className={`py-3 px-5 text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
            mode === 'forward'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          1. Calculate New Average Cost
        </button>
        <button
          type="button"
          onClick={() => setMode('target')}
          className={`py-3 px-5 text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
            mode === 'target'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          2. Target Average Price Solver (How Many Shares to Buy?)
        </button>
      </div>

      {mode === 'forward' ? (
        /* FORWARD MODE */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Inputs Column */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b pb-2">
              Current Holding (First Purchase)
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Initial Shares
                </label>
                <input
                  type="number"
                  min="1"
                  value={initShares}
                  onChange={(e) => setInitShares(Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Original Purchase Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={initPrice}
                  onChange={(e) => setInitPrice(Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <p className="text-xs text-slate-500">
              Current Capital Invested: ${currentTotalCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>

            <h3 className="text-base font-bold text-slate-900 border-b pb-2 pt-2">
              New Purchase (Averaging Down)
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  New Shares to Buy
                </label>
                <input
                  type="number"
                  min="1"
                  value={newShares}
                  onChange={(e) => setNewShares(Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  New Buy Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={newPrice}
                  onChange={(e) => setNewPrice(Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <p className="text-xs text-slate-500">
              Additional Cash Required: ${newBuyCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
          </div>

          {/* Results Column */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-5">
            <h3 className="text-base font-bold text-slate-900">Averaging Down Results</h3>

            <div className="bg-white border-2 border-emerald-500/40 rounded-xl p-4 text-center shadow-sm">
              <span className="text-xs font-semibold text-slate-500 uppercase">
                New Average Cost Per Share
              </span>
              <div className="text-3xl font-extrabold text-emerald-600 mt-0.5">
                ${newAverageCost.toFixed(2)}
              </div>
              <div className="text-xs text-emerald-700 font-medium mt-1">
                Lowered by ${reductionAmount.toFixed(2)} (-{reductionPct.toFixed(1)}%) per share
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <span className="text-slate-500">Total Shares Owned</span>
                <div className="text-base font-bold text-slate-900 mt-0.5">{combinedShares}</div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <span className="text-slate-500">Total Capital Invested</span>
                <div className="text-base font-bold text-slate-900 mt-0.5">
                  ${combinedTotalCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
              </div>
            </div>

            {/* Break-even Relief Bar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-800">
                Break-Even Rally Comparison
              </span>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Without Averaging:</span>
                  <span className="font-semibold text-rose-600">+{originalRallyNeeded.toFixed(1)}% needed</span>
                </div>
                <div className="flex justify-between text-slate-800">
                  <span>With Averaging Down:</span>
                  <span className="font-bold text-emerald-600">+{newRallyNeeded.toFixed(1)}% needed</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 pt-1 border-t">
                By averaging down, your stock needs {Math.max(0, originalRallyNeeded - newRallyNeeded).toFixed(1)}% less gain to return to breakeven.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* TARGET SOLVER MODE */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b pb-2">
              Your Position & Target Average
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Current Shares Owned
                </label>
                <input
                  type="number"
                  min="1"
                  value={targetInitShares}
                  onChange={(e) => setTargetInitShares(Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Original Cost Basis ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={targetInitPrice}
                  onChange={(e) => setTargetInitPrice(Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Current Market Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={targetCurrentPrice}
                  onChange={(e) => setTargetCurrentPrice(Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Desired Target Average ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={desiredAverage}
                  onChange={(e) => setDesiredAverage(Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <p className="text-xs text-slate-500">
              Target average must be between current market price (${targetCurrentPrice}) and original cost (${targetInitPrice}).
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-5">
            <h3 className="text-base font-bold text-slate-900">Required Purchases to Hit Target</h3>

            {canSolve ? (
              <div className="space-y-4">
                <div className="bg-white border-2 border-blue-500/40 rounded-xl p-4 text-center shadow-sm">
                  <span className="text-xs font-semibold text-slate-500 uppercase">
                    Shares You Must Buy
                  </span>
                  <div className="text-3xl font-extrabold text-blue-600 mt-0.5">
                    +{neededShares.toLocaleString()} shares
                  </div>
                  <div className="text-xs text-slate-600 font-medium mt-1">
                    At current price of ${targetCurrentPrice.toFixed(2)} per share
                  </div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs">
                  <span className="text-slate-500">Required Cash to Execute</span>
                  <div className="text-lg font-bold text-slate-900 mt-0.5">
                    ${neededCash.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs">
                  <span className="text-slate-500">Final Total Position</span>
                  <div className="text-sm font-semibold text-slate-800 mt-0.5">
                    {(targetInitShares + neededShares).toLocaleString()} shares @ ${desiredAverage.toFixed(2)} average
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-800">
                Please adjust your inputs. Your desired target price must be higher than the current market price (${targetCurrentPrice}) and lower than your initial purchase price (${targetInitPrice}).
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
