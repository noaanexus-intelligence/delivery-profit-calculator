import { MenuCostInput, PlatformFeeInput, CalculationBreakdown } from './types';

function resolveDiscountAmount(appPrice: number, platform: PlatformFeeInput): number {
  return platform.storeDiscount.type === 'amount'
    ? platform.storeDiscount.value
    : appPrice * (platform.storeDiscount.value / 100);
}

export function calculateBreakdown(
  menu: MenuCostInput,
  platform: PlatformFeeInput
): CalculationBreakdown {
  const appPrice = menu.appPrice;
  const discountAmount = resolveDiscountAmount(appPrice, platform);

  const gpBaseAmount =
    platform.gpBase === 'afterDiscount' ? appPrice - discountAmount : appPrice;

  const gpAmount = gpBaseAmount * (platform.gpPercent / 100);
  const vatOnGp = gpAmount * (platform.vatPercent / 100);

  const platformDeductionTotal =
    gpAmount + vatOnGp + discountAmount + platform.campaignFee + platform.otherPlatformFee;

  const netReceived = appPrice - platformDeductionTotal;

  const totalCost =
    menu.ingredientCost + menu.packagingCost + menu.laborCost + menu.otherCost;

  const realProfit = netReceived - totalCost;

  const profitPercentOfAppPrice = appPrice !== 0 ? (realProfit / appPrice) * 100 : 0;
  const profitPercentOfNetReceived =
    netReceived !== 0 ? (realProfit / netReceived) * 100 : 0;

  return {
    appPrice,
    gpBaseAmount,
    gpAmount,
    vatOnGp,
    discountAmount,
    campaignFee: platform.campaignFee,
    otherPlatformFee: platform.otherPlatformFee,
    platformDeductionTotal,
    netReceived,
    totalCost,
    costBreakdown: {
      ingredientCost: menu.ingredientCost,
      packagingCost: menu.packagingCost,
      laborCost: menu.laborCost,
      otherCost: menu.otherCost,
    },
    realProfit,
    profitPercentOfAppPrice,
    profitPercentOfNetReceived,
  };
}
