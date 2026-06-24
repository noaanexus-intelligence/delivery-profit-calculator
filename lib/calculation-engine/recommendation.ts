import { PlatformFeeInput, PriceRecommendation } from './types';
import { DEFAULT_TARGET_PROFIT_PERCENT } from './constants';

interface RateAndFixedDeduction {
  rate: number;
  fixedDeduction: number;
}

function solveRateAndFixedDeduction(
  platform: PlatformFeeInput,
  totalCost: number
): RateAndFixedDeduction {
  const g = platform.gpPercent / 100;
  const v = platform.vatPercent / 100;
  const K = platform.campaignFee;
  const O = platform.otherPlatformFee;
  const C = totalCost;

  if (platform.storeDiscount.type === 'amount') {
    const D = platform.storeDiscount.value;
    if (platform.gpBase === 'beforeDiscount') {
      const rate = 1 - g - g * v;
      const fixedDeduction = D + K + O + C;
      return { rate, fixedDeduction };
    }
    const rate = 1 - g * (1 + v);
    const fixedDeduction = rate * D + K + O + C;
    return { rate, fixedDeduction };
  }

  const d = platform.storeDiscount.value / 100;
  if (platform.gpBase === 'beforeDiscount') {
    const rate = 1 - g - g * v - d;
    const fixedDeduction = K + O + C;
    return { rate, fixedDeduction };
  }
  const rate = 1 - (1 - d) * g * (1 + v) - d;
  const fixedDeduction = K + O + C;
  return { rate, fixedDeduction };
}

export function calculatePriceRecommendation(
  platform: PlatformFeeInput,
  totalCost: number,
  targetProfitPercent: number = DEFAULT_TARGET_PROFIT_PERCENT
): PriceRecommendation {
  const { rate, fixedDeduction } = solveRateAndFixedDeduction(platform, totalCost);

  const breakevenPrice = rate <= 0 ? Infinity : fixedDeduction / rate;

  const denom = rate - targetProfitPercent / 100;
  const recommendedPrice = denom <= 0 ? Infinity : fixedDeduction / denom;

  return {
    breakevenPrice,
    recommendedPrice,
    targetProfitPercent,
  };
}
