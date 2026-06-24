import { calculatePriceRecommendation } from '../recommendation';
import { calculateBreakdown } from '../breakdown';
import { PlatformFeeInput } from '../types';

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

describe('calculatePriceRecommendation — Group G', () => {
  test('G1: breakeven price', () => {
    const result = calculatePriceRecommendation(makePlatform(), 40);
    expect(result.breakevenPrice).toBeCloseTo(58.91, 2);
  });

  test('G2: recommended price at default 20% target', () => {
    const result = calculatePriceRecommendation(makePlatform(), 40);
    expect(result.recommendedPrice).toBeCloseTo(83.51, 2);
    expect(result.targetProfitPercent).toBe(20);
  });

  test('G1 cross-check: feeding breakevenPrice back through calculateBreakdown yields ~0% profit', () => {
    const recommendation = calculatePriceRecommendation(makePlatform(), 40);
    const verification = calculateBreakdown(
      {
        menuName: 'breakeven-check',
        appPrice: recommendation.breakevenPrice,
        ingredientCost: 40,
        packagingCost: 0,
        laborCost: 0,
        otherCost: 0,
      },
      makePlatform()
    );
    expect(verification.profitPercentOfAppPrice).toBeCloseTo(0, 1);
  });

  test('G2 cross-check: feeding recommendedPrice back through calculateBreakdown yields ~20% profit', () => {
    const recommendation = calculatePriceRecommendation(makePlatform(), 40);
    const verification = calculateBreakdown(
      {
        menuName: 'recommended-check',
        appPrice: recommendation.recommendedPrice,
        ingredientCost: 40,
        packagingCost: 0,
        laborCost: 0,
        otherCost: 0,
      },
      makePlatform()
    );
    expect(verification.profitPercentOfAppPrice).toBeCloseTo(20, 1);
  });
});

describe('calculatePriceRecommendation — discount.type="amount" branches (Cases 1 & 2)', () => {
  test('Case 1 (amount discount, beforeDiscount): breakevenPrice nets ~0% profit when fed back through calculateBreakdown', () => {
    const platform = makePlatform({ storeDiscount: { type: 'amount', value: 10 } });
    const recommendation = calculatePriceRecommendation(platform, 40);
    const verification = calculateBreakdown(
      {
        menuName: 'case1-check',
        appPrice: recommendation.breakevenPrice,
        ingredientCost: 40,
        packagingCost: 0,
        laborCost: 0,
        otherCost: 0,
      },
      platform
    );
    expect(verification.profitPercentOfAppPrice).toBeCloseTo(0, 1);
  });

  test('Case 2 (amount discount, afterDiscount): breakevenPrice nets ~0% profit when fed back through calculateBreakdown', () => {
    const platform = makePlatform({
      gpBase: 'afterDiscount',
      storeDiscount: { type: 'amount', value: 10 },
    });
    const recommendation = calculatePriceRecommendation(platform, 40);
    const verification = calculateBreakdown(
      {
        menuName: 'case2-check',
        appPrice: recommendation.breakevenPrice,
        ingredientCost: 40,
        packagingCost: 0,
        laborCost: 0,
        otherCost: 0,
      },
      platform
    );
    expect(verification.profitPercentOfAppPrice).toBeCloseTo(0, 1);
  });

  test('Case 4 (percent discount, afterDiscount): breakevenPrice nets ~0% profit when fed back through calculateBreakdown', () => {
    const platform = makePlatform({
      gpBase: 'afterDiscount',
      storeDiscount: { type: 'percent', value: 10 },
    });
    const recommendation = calculatePriceRecommendation(platform, 40);
    const verification = calculateBreakdown(
      {
        menuName: 'case4-check',
        appPrice: recommendation.breakevenPrice,
        ingredientCost: 40,
        packagingCost: 0,
        laborCost: 0,
        otherCost: 0,
      },
      platform
    );
    expect(verification.profitPercentOfAppPrice).toBeCloseTo(0, 1);
  });
});
