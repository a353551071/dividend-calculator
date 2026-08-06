import { describe, it, expect } from 'vitest';
import { simulateDrip, dripCalculator } from '../lib/dividend';

const baseInput = {
  initialInvestment: 10000,
  price: 100,
  dividendYieldPct: 4,
  dividendGrowthPct: 5,
  priceGrowthPct: 5,
  monthlyContribution: 100,
  years: 3,
};

describe('simulateDrip 逐年明细', () => {
  it('yearly.length === years,year 从 1 递增', () => {
    const { yearly } = simulateDrip(baseInput, true);
    expect(yearly).toHaveLength(3);
    expect(yearly.map((r) => r.year)).toEqual([1, 2, 3]);
  });

  it('首行 startBalance = 初始投入,endShares 含再投资股份', () => {
    const { yearly } = simulateDrip(baseInput, true);
    const first = yearly[0];
    expect(first.startBalance).toBeCloseTo(10000, 6);
    expect(first.startShares).toBeCloseTo(100, 6);
    // 首年股息 = 10000 × 4% = 400;再投资按 $100 买入 → +4 股;月供年 1200 → +12 股
    expect(first.reinvestedShares).toBeCloseTo(4, 6);
    expect(first.endShares).toBeCloseTo(100 + 4 + 12, 4);
    expect(first.annualDividend).toBeCloseTo(400, 6);
  });

  it('summary 期末字段与 dripCalculator 完全一致(向后兼容)', () => {
    const { summary } = simulateDrip(baseInput, true);
    const legacy = dripCalculator(baseInput);
    expect(summary).toEqual(legacy);
  });

  it('DRIP 期末市值严格大于取现模式(再投资复利)', () => {
    const drip = simulateDrip(baseInput, true);
    const cash = simulateDrip(baseInput, false);
    const dripFinal = drip.yearly[drip.yearly.length - 1].endBalance;
    const cashFinal = cash.yearly[cash.yearly.length - 1].endBalance;
    expect(dripFinal).toBeGreaterThan(cashFinal);
  });

  it('取现模式 reinvestedShares 恒为 0', () => {
    const { yearly } = simulateDrip(baseInput, false);
    expect(yearly.every((r) => r.reinvestedShares === 0)).toBe(true);
  });

  it('yieldOnCost 在有投入时为有限正数', () => {
    const { yearly } = simulateDrip(baseInput, true);
    expect(yearly[0].yieldOnCost).toBeGreaterThan(0);
    expect(Number.isFinite(yearly[0].yieldOnCost)).toBe(true);
  });

  it('非法输入(负投入 / 0 股价 / 负年数)→ yearly 空 + summary 全 NaN', () => {
    const bad = simulateDrip({ ...baseInput, initialInvestment: -1 }, true);
    expect(bad.yearly).toEqual([]);
    expect(Number.isNaN(bad.summary.finalValue)).toBe(true);

    const badPrice = simulateDrip({ ...baseInput, price: 0 }, true);
    expect(badPrice.yearly).toEqual([]);
    expect(Number.isNaN(badPrice.summary.finalValue)).toBe(true);

    const badYears = simulateDrip({ ...baseInput, years: -2 }, true);
    expect(badYears.yearly).toEqual([]);
    expect(Number.isNaN(badYears.summary.finalValue)).toBe(true);
  });

  it('0 年 → yearly 空,summary 反映初始状态', () => {
    const { yearly, summary } = simulateDrip({ ...baseInput, years: 0 }, true);
    expect(yearly).toEqual([]);
    expect(summary.totalInvested).toBeCloseTo(10000, 6);
    expect(summary.shares).toBeCloseTo(100, 6);
  });
});
