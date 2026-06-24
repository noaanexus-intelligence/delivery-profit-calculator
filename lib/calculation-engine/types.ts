export type DiscountType = 'percent' | 'amount';
export type GpBase = 'beforeDiscount' | 'afterDiscount';
export type RiskLevel = 'good' | 'low' | 'atRisk' | 'loss';

export interface MenuCostInput {
  menuName: string;
  appPrice: number;
  storePrice?: number;
  ingredientCost: number;
  packagingCost: number;
  laborCost: number;
  otherCost: number;
}

export interface StoreDiscount {
  type: DiscountType;
  value: number;
}

export interface PlatformFeeInput {
  gpPercent: number;
  gpBase: GpBase;
  vatPercent: number;
  storeDiscount: StoreDiscount;
  campaignFee: number;
  otherPlatformFee: number;
}

export interface VolumeInput {
  estimatedOrdersPerDay: number;
  sellingDaysPerMonth: number;
}

export interface FutureFixedCostInput {
  monthlyFixedCost?: number;
  estimatedMonthlyOrders?: number;
}

export interface CalculationInput {
  menu: MenuCostInput;
  platform: PlatformFeeInput;
  volume?: VolumeInput;
  futureFixedCost?: FutureFixedCostInput;
}

export interface CostBreakdown {
  ingredientCost: number;
  packagingCost: number;
  laborCost: number;
  otherCost: number;
}

export interface CalculationBreakdown {
  appPrice: number;
  gpBaseAmount: number;
  gpAmount: number;
  vatOnGp: number;
  discountAmount: number;
  campaignFee: number;
  otherPlatformFee: number;
  platformDeductionTotal: number;
  netReceived: number;
  totalCost: number;
  costBreakdown: CostBreakdown;
  realProfit: number;
  profitPercentOfAppPrice: number;
  profitPercentOfNetReceived: number;
}

export interface RiskResult {
  level: RiskLevel;
  label: string;
  colorToken: string;
}

export interface VolumeProjection {
  dailyProfit: number;
  monthlyProfit: number;
}

export interface PriceRecommendation {
  breakevenPrice: number;
  recommendedPrice: number;
  targetProfitPercent: number;
}

export interface CalculationResult {
  breakdown: CalculationBreakdown;
  risk: RiskResult;
  volumeProjection?: VolumeProjection;
  priceRecommendation: PriceRecommendation;
  warnings: string[];
}
