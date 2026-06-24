import { RiskResult } from './types';
import { RISK_THRESHOLDS } from './constants';

export function classifyRisk(profitPercentOfAppPrice: number): RiskResult {
  if (profitPercentOfAppPrice >= RISK_THRESHOLDS.good) {
    return { level: 'good', label: 'กำไรดี', colorToken: 'green' };
  }
  if (profitPercentOfAppPrice >= RISK_THRESHOLDS.low) {
    return { level: 'low', label: 'กำไรน้อย', colorToken: 'yellow' };
  }
  if (profitPercentOfAppPrice >= RISK_THRESHOLDS.atRisk) {
    return { level: 'atRisk', label: 'เสี่ยงขาดทุน', colorToken: 'orange' };
  }
  return { level: 'loss', label: 'ยิ่งขายยิ่งขาดทุน', colorToken: 'red' };
}
