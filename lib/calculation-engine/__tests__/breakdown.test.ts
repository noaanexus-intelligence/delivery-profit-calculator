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

function makePlatform(overrides: Partial<PlatformFeeInput> = {}): PlatformFeeInput {
  return {
    gpPercent: 30,
    gpBase: 'beforeDiscount',
    vatPercent: 7,
    storeDiscount: { type: 'percent', value: 0 },
    campaignFee: 0,
    otherPlatformFee: 0,
    ...overrides,
  };
}

describe('calculateBreakdown — Group A: basic risk levels', () => {
  test('A1: good risk', () => {
    const result = calculateBreakdown(
      makeMenu({ appPrice: 60, ingredientCost: 15 }),
      makePlatform()
    );
    expect(result.realProfit).toBeCloseTo(25.74, 2);
    expect(result.profitPercentOfAppPrice).toBeCloseTo(42.9, 2);
    expect(result.profitPercentOfNetReceived).toBeCloseTo(63.18, 2);
  });

  test('A2: low risk', () => {
    const result = calculateBreakdown(
      makeMenu({ appPrice: 75, ingredientCost: 40 }),
      makePlatform()
    );
    expect(result.realProfit).toBeCloseTo(10.925, 2);
    expect(result.profitPercentOfAppPrice).toBeCloseTo(14.57, 2);
    expect(result.profitPercentOfNetReceived).toBeCloseTo(21.45, 2);
  });

  test('A3: at-risk', () => {
    const result = calculateBreakdown(
      makeMenu({ appPrice: 75, ingredientCost: 48 }),
      makePlatform()
    );
    expect(result.realProfit).toBeCloseTo(2.925, 2);
    expect(result.profitPercentOfAppPrice).toBeCloseTo(3.9, 2);
    expect(result.profitPercentOfNetReceived).toBeCloseTo(5.74, 2);
  });

  test('A4: loss', () => {
    const result = calculateBreakdown(
      makeMenu({ appPrice: 75, ingredientCost: 55 }),
      makePlatform()
    );
    expect(result.realProfit).toBeCloseTo(-4.075, 2);
    expect(result.profitPercentOfAppPrice).toBeCloseTo(-5.43, 2);
    expect(result.profitPercentOfNetReceived).toBeCloseTo(-8.0, 2);
  });
});

describe('calculateBreakdown — Group B: discount amount vs percent', () => {
  test('B1: discount as amount (10 baht)', () => {
    const result = calculateBreakdown(
      makeMenu({ appPrice: 100, ingredientCost: 40 }),
      makePlatform({ storeDiscount: { type: 'amount', value: 10 } })
    );
    expect(result.realProfit).toBeCloseTo(17.9, 2);
    expect(result.profitPercentOfAppPrice).toBeCloseTo(17.9, 2);
    expect(result.profitPercentOfNetReceived).toBeCloseTo(30.92, 2);
  });

  test('B2: discount as percent (10%) — numerically equivalent to B1', () => {
    const result = calculateBreakdown(
      makeMenu({ appPrice: 100, ingredientCost: 40 }),
      makePlatform({ storeDiscount: { type: 'percent', value: 10 } })
    );
    expect(result.realProfit).toBeCloseTo(17.9, 2);
    expect(result.profitPercentOfAppPrice).toBeCloseTo(17.9, 2);
    expect(result.profitPercentOfNetReceived).toBeCloseTo(30.92, 2);
  });

  test('B3: 20% discount', () => {
    const result = calculateBreakdown(
      makeMenu({ appPrice: 80, ingredientCost: 35 }),
      makePlatform({ storeDiscount: { type: 'percent', value: 20 } })
    );
    expect(result.realProfit).toBeCloseTo(3.32, 2);
    expect(result.profitPercentOfAppPrice).toBeCloseTo(4.15, 2);
    expect(result.profitPercentOfNetReceived).toBeCloseTo(8.66, 2);
  });

  test('B4: 30% discount tips the same menu into loss', () => {
    const result = calculateBreakdown(
      makeMenu({ appPrice: 80, ingredientCost: 35 }),
      makePlatform({ storeDiscount: { type: 'percent', value: 30 } })
    );
    expect(result.realProfit).toBeCloseTo(-4.68, 2);
    expect(result.profitPercentOfAppPrice).toBeCloseTo(-5.85, 2);
    expect(result.profitPercentOfNetReceived).toBeCloseTo(-15.44, 2);
  });
});

describe('calculateBreakdown — Group C: campaign / other platform fees', () => {
  test('C1: campaign fee 5 baht', () => {
    const result = calculateBreakdown(
      makeMenu({ appPrice: 70, ingredientCost: 28 }),
      makePlatform({ campaignFee: 5 })
    );
    expect(result.realProfit).toBeCloseTo(14.53, 2);
    expect(result.profitPercentOfAppPrice).toBeCloseTo(20.76, 2);
    expect(result.profitPercentOfNetReceived).toBeCloseTo(34.16, 2);
  });

  test('C2: other platform fee 3 baht', () => {
    const result = calculateBreakdown(
      makeMenu({ appPrice: 70, ingredientCost: 28 }),
      makePlatform({ otherPlatformFee: 3 })
    );
    expect(result.realProfit).toBeCloseTo(16.53, 2);
    expect(result.profitPercentOfAppPrice).toBeCloseTo(23.61, 2);
    expect(result.profitPercentOfNetReceived).toBeCloseTo(37.12, 2);
  });
});

describe('calculateBreakdown — Group D: gpBase = afterDiscount', () => {
  test('D1: percent discount, afterDiscount base', () => {
    const result = calculateBreakdown(
      makeMenu({ appPrice: 100, ingredientCost: 40 }),
      makePlatform({ gpBase: 'afterDiscount', storeDiscount: { type: 'percent', value: 10 } })
    );
    expect(result.realProfit).toBeCloseTo(21.11, 2);
    expect(result.profitPercentOfAppPrice).toBeCloseTo(21.11, 2);
    expect(result.profitPercentOfNetReceived).toBeCloseTo(34.54, 2);
  });

  test('D2: amount discount, afterDiscount base — equivalent to D1', () => {
    const result = calculateBreakdown(
      makeMenu({ appPrice: 100, ingredientCost: 40 }),
      makePlatform({ gpBase: 'afterDiscount', storeDiscount: { type: 'amount', value: 10 } })
    );
    expect(result.realProfit).toBeCloseTo(21.11, 2);
    expect(result.profitPercentOfAppPrice).toBeCloseTo(21.11, 2);
    expect(result.profitPercentOfNetReceived).toBeCloseTo(34.54, 2);
  });

  test('D1 vs B2: afterDiscount yields higher profit% than beforeDiscount under the same nominal discount', () => {
    const menu = makeMenu({ appPrice: 100, ingredientCost: 40 });
    const afterResult = calculateBreakdown(
      menu,
      makePlatform({ gpBase: 'afterDiscount', storeDiscount: { type: 'percent', value: 10 } })
    );
    const beforeResult = calculateBreakdown(
      menu,
      makePlatform({ gpBase: 'beforeDiscount', storeDiscount: { type: 'percent', value: 10 } })
    );
    expect(afterResult.profitPercentOfAppPrice).toBeGreaterThan(
      beforeResult.profitPercentOfAppPrice
    );
  });
});

describe('calculateBreakdown — defensive guards (division-by-zero branches)', () => {
  test('appPrice = 0 does not throw or produce NaN; %P falls back to 0', () => {
    const result = calculateBreakdown(makeMenu({ appPrice: 0 }), makePlatform());
    expect(result.profitPercentOfAppPrice).toBe(0);
    expect(Number.isNaN(result.profitPercentOfAppPrice)).toBe(false);
  });

  test('netReceived = 0 does not throw or produce NaN; %net falls back to 0', () => {
    // GP=100%, VAT=0% on appPrice=100 makes netReceived exactly 0.
    const result = calculateBreakdown(
      makeMenu({ appPrice: 100 }),
      makePlatform({ gpPercent: 100, vatPercent: 0 })
    );
    expect(result.netReceived).toBeCloseTo(0, 8);
    expect(result.profitPercentOfNetReceived).toBe(0);
    expect(Number.isNaN(result.profitPercentOfNetReceived)).toBe(false);
  });
});
