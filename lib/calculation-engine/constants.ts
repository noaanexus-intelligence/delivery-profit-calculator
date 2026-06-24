export const RISK_THRESHOLDS = {
  good: 20,
  low: 5,
  atRisk: 0,
} as const;

export const DEFAULT_TARGET_PROFIT_PERCENT = RISK_THRESHOLDS.good;
