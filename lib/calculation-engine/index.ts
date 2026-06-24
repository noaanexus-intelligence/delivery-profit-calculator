import { CalculationInput, CalculationResult } from './types';
import { calculateBreakdown } from './breakdown';
import { classifyRisk } from './risk';
import { calculateVolumeProjection } from './volume';
import { calculatePriceRecommendation } from './recommendation';
import { generateWarnings } from './warnings';

// validateInput() is called separately by the caller BEFORE calculate() —
// calculate() assumes input has already passed validation (see Final Spec v1.0 §4).
export function calculate(input: CalculationInput): CalculationResult {
  const breakdown = calculateBreakdown(input.menu, input.platform);
  const risk = classifyRisk(breakdown.profitPercentOfAppPrice);
  const volumeProjection = calculateVolumeProjection(breakdown.realProfit, input.volume);
  const priceRecommendation = calculatePriceRecommendation(
    input.platform,
    breakdown.totalCost
  );
  const warnings = generateWarnings(input.menu, breakdown);

  return {
    breakdown,
    risk,
    volumeProjection,
    priceRecommendation,
    warnings,
  };
}

// Only the two functions a future UI actually calls are re-exported here.
// Sub-module functions (calculateBreakdown, classifyRisk, etc.) are imported
// directly from their own files by code that needs them individually.
export { validateInput } from './validate';
export { RISK_THRESHOLDS, DEFAULT_TARGET_PROFIT_PERCENT } from './constants';
export type * from './types';
