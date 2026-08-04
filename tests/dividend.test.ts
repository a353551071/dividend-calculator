import { describe, it, expect } from 'vitest';
import {
  annualizeDividend,
  dividendYield,
  dividendPerShareFromYield,
  futureDividend,
  cumulativeDividends,
  monthlyDividendIncome,
  payoutRatio,
  dripCalculator,
} from '../lib/dividend';

describe('dividendYield 股息率', () => {
  it('每股年息 2 美元、股价 100 → 2%', () => {
    expect(dividendYield({ annualDividendPerShare: 2, price: 100 })).toBeCloseTo(2, 6);
  });

  it('月息 0.5 美元 → 年化 6 美元;股价 100 → 6%', () => {
    const annual = annualizeDividend(0.5, true);
    expect(annual).toBeCloseTo(6, 6);
    expect(dividendYield({ annualDividendPerShare: annual, price: 100 })).toBeCloseTo(6, 6);
  });

  it('股价为 0 → NaN', () => {
    expect(Number.isNaN(dividendYield({ annualDividendPerShare: 2, price: 0 }))).toBe(true);
  });
});

describe('dividendPerShareFromYield 反推', () => {
  it('股价 100、收益率 3% → 每股年息 3', () => {
    expect(dividendPerShareFromYield(100, 3)).toBeCloseTo(3, 6);
  });
});

describe('futureDividend 未来股息', () => {
  it('D0=2、年增 5%、10 年 → 2×1.05^10 ≈ 3.2578', () => {
    expect(futureDividend({ currentDividend: 2, growthRatePct: 5, years: 10 })).toBeCloseTo(3.2578, 3);
  });

  it('0 年 → 等于 D0', () => {
    expect(futureDividend({ currentDividend: 2, growthRatePct: 5, years: 0 })).toBeCloseTo(2, 6);
  });

  it('增长 0% → D0 不变', () => {
    expect(futureDividend({ currentDividend: 2, growthRatePct: 0, years: 10 })).toBeCloseTo(2, 6);
  });
});

describe('cumulativeDividends 累计股息', () => {
  it('D0=2、增 5%、10 年 → 几何级数 2·(1.05^10−1)/0.05 ≈ 25.156', () => {
    expect(cumulativeDividends({ currentDividend: 2, growthRatePct: 5, years: 10 })).toBeCloseTo(25.156, 3);
  });

  it('增长 0% → D0×年数', () => {
    expect(cumulativeDividends({ currentDividend: 2, growthRatePct: 0, years: 5 })).toBeCloseTo(10, 6);
  });
});

describe('monthlyDividendIncome 月股息收入', () => {
  it('投入 10000、年收益率 6% → 月入 50', () => {
    expect(monthlyDividendIncome({ investment: 10000, dividendYieldPct: 6 })).toBeCloseTo(50, 6);
  });
});

describe('payoutRatio 支付率', () => {
  it('DPS=2、EPS=5 → 40%', () => {
    expect(payoutRatio({ dividendPerShare: 2, earningsPerShare: 5 })).toBeCloseTo(40, 6);
  });

  it('EPS=0 → NaN', () => {
    expect(Number.isNaN(payoutRatio({ dividendPerShare: 2, earningsPerShare: 0 }))).toBe(true);
  });
});

describe('dripCalculator DRIP 复利模拟', () => {
  it('不投入、0 增长 → 只吃初始股息,股份因再投资略增', () => {
    const r = dripCalculator({
      initialInvestment: 10000, price: 100, dividendYieldPct: 4,
      dividendGrowthPct: 0, priceGrowthPct: 0, monthlyContribution: 0, years: 5,
    });
    expect(r.totalInvested).toBeCloseTo(10000, 6);
    expect(r.shares).toBeGreaterThan(100); // 股息再投资增加股份
    expect(r.finalValue).toBeGreaterThan(10000); // 累计回报
    expect(r.totalDividends).toBeGreaterThan(0);
  });

  it('10 年 + 月投 100 → 累计投入 = 10000 + 100×12×10 = 22000', () => {
    const r = dripCalculator({
      initialInvestment: 10000, price: 100, dividendYieldPct: 3,
      dividendGrowthPct: 4, priceGrowthPct: 5, monthlyContribution: 100, years: 10,
    });
    expect(r.totalInvested).toBeCloseTo(22000, 3);
  });

  it('期末市值 > 累计投入(正增长合理场景)', () => {
    const r = dripCalculator({
      initialInvestment: 10000, price: 100, dividendYieldPct: 4,
      dividendGrowthPct: 6, priceGrowthPct: 7, monthlyContribution: 200, years: 20,
    });
    expect(r.finalValue).toBeGreaterThan(r.totalInvested);
  });

  it('非法输入(股价≤0)→ NaN', () => {
    const r = dripCalculator({
      initialInvestment: 10000, price: 0, dividendYieldPct: 4,
      dividendGrowthPct: 0, priceGrowthPct: 0, monthlyContribution: 0, years: 5,
    });
    expect(Number.isNaN(r.shares)).toBe(true);
  });
});
