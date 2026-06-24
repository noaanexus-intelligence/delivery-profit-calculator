import { calculateVolumeProjection } from '../volume';

describe('calculateVolumeProjection — Group F', () => {
  test('F1: profitable menu scaled across volume', () => {
    const result = calculateVolumeProjection(10.925, {
      estimatedOrdersPerDay: 20,
      sellingDaysPerMonth: 30,
    });
    expect(result?.dailyProfit).toBeCloseTo(218.5, 2);
    expect(result?.monthlyProfit).toBeCloseTo(6555.0, 2);
  });

  test('F2: loss-making menu scales the loss too', () => {
    const result = calculateVolumeProjection(-4.075, {
      estimatedOrdersPerDay: 15,
      sellingDaysPerMonth: 26,
    });
    expect(result?.dailyProfit).toBeCloseTo(-61.125, 2);
    expect(result?.monthlyProfit).toBeCloseTo(-1589.25, 2);
  });

  test('no volume input -> undefined projection (volume block is optional)', () => {
    expect(calculateVolumeProjection(10, undefined)).toBeUndefined();
  });
});
