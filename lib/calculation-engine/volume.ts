import { VolumeInput, VolumeProjection } from './types';

export function calculateVolumeProjection(
  realProfit: number,
  volume?: VolumeInput
): VolumeProjection | undefined {
  if (!volume) {
    return undefined;
  }
  const dailyProfit = realProfit * volume.estimatedOrdersPerDay;
  const monthlyProfit = dailyProfit * volume.sellingDaysPerMonth;
  return { dailyProfit, monthlyProfit };
}
