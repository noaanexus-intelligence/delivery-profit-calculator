import { classifyRisk } from '../risk';
import { calculateBreakdown } from '../breakdown';
import { MenuCostInput, PlatformFeeInput } from '../types';

function makeMenu(overrides: Partial<MenuCostInput> = {}): MenuCostInput {
  return {
    menuName: 'test-menu',
    appPrice: 100,
    ingredientCost: 0,
    packagingCost: 0,
    laborCost: 0,
    otherCost: 0,
    ...overrides,
  };
}

function makeZeroFeePlatform(overrides: Partial<PlatformFeeInput> = {}): PlatformFeeInput {
  return {
    gpPercent: 0,
    gpBase: 'beforeDiscount',
    vatPercent: 0,
    storeDiscount: { type: 'percent', value: 0 },
    campaignFee: 0,
    otherPlatformFee: 0,
    ...overrides,
  };
}

describe('classifyRisk — direct boundary checks (inclusive lower, exclusive upper)', () => {
  test('exactly 20 -> good', () => {
    expect(classifyRisk(20).level).toBe('good');
  });
  test('19.99 -> low', () => {
    expect(classifyRisk(19.99).level).toBe('low');
  });
  test('exactly 5 -> low', () => {
    expect(classifyRisk(5).level).toBe('low');
  });
  test('4.99 -> atRisk', () => {
    expect(classifyRisk(4.99).level).toBe('atRisk');
  });
  test('exactly 0 -> atRisk', () => {
    expect(classifyRisk(0).level).toBe('atRisk');
  });
  test('-0.01 -> loss', () => {
    expect(classifyRisk(-0.01).level).toBe('loss');
  });
});

describe('calculateBreakdown + classifyRisk — Group E: risk boundary scenarios', () => {
  test('E1: cost=80 -> profit% exactly 20 -> good', () => {
    const result = calculateBreakdown(makeMenu({ ingredientCost: 80 }), makeZeroFeePlatform());
    expect(result.realProfit).toBeCloseTo(20.0, 2);
    expect(result.profitPercentOfAppPrice).toBeCloseTo(20.0, 2);
    expect(classifyRisk(result.profitPercentOfAppPrice).level).toBe('good');
  });

  test('E2: cost=95 -> profit% exactly 5 -> low', () => {
    const result = calculateBreakdown(makeMenu({ ingredientCost: 95 }), makeZeroFeePlatform());
    expect(result.realProfit).toBeCloseTo(5.0, 2);
    expect(result.profitPercentOfAppPrice).toBeCloseTo(5.0, 2);
    expect(classifyRisk(result.profitPercentOfAppPrice).level).toBe('low');
  });

  test('E3: cost=100 -> profit% exactly 0 -> atRisk', () => {
    const result = calculateBreakdown(makeMenu({ ingredientCost: 100 }), makeZeroFeePlatform());
    expect(result.realProfit).toBeCloseTo(0.0, 2);
    expect(result.profitPercentOfAppPrice).toBeCloseTo(0.0, 2);
    expect(classifyRisk(result.profitPercentOfAppPrice).level).toBe('atRisk');
  });

  test('E4: cost=100.01 -> profit% -0.01 -> loss', () => {
    const result = calculateBreakdown(makeMenu({ ingredientCost: 100.01 }), makeZeroFeePlatform());
    expect(result.realProfit).toBeCloseTo(-0.01, 2);
    expect(result.profitPercentOfAppPrice).toBeCloseTo(-0.01, 2);
    expect(classifyRisk(result.profitPercentOfAppPrice).level).toBe('loss');
  });
});
