import {
  calculate,
  validateInput,
  RISK_THRESHOLDS,
  DEFAULT_TARGET_PROFIT_PERCENT,
} from '../index';
import { CalculationInput } from '../types';

function makeInput(overrides: Partial<CalculationInput> = {}): CalculationInput {
  return {
    menu: {
      menuName: 'integration-menu',
      appPrice: 75,
      ingredientCost: 40,
      packagingCost: 0,
      laborCost: 0,
      otherCost: 0,
    },
    platform: {
      gpPercent: 30,
      gpBase: 'beforeDiscount',
      vatPercent: 7,
      storeDiscount: { type: 'percent', value: 0 },
      campaignFee: 0,
      otherPlatformFee: 0,
    },
    ...overrides,
  };
}

describe('calculate() — orchestrator integration (not a spec test-case group; wiring check)', () => {
  test('wires breakdown, risk, recommendation and warnings together (reuses A2 numbers)', () => {
    const result = calculate(makeInput());

    expect(result.breakdown.realProfit).toBeCloseTo(10.925, 2);
    expect(result.risk.level).toBe('low');
    expect(result.priceRecommendation.targetProfitPercent).toBe(20);
    expect(result.volumeProjection).toBeUndefined();
    expect(result.warnings).toContain('ยังไม่ได้ใส่ค่าแพ็กเกจจิ้ง ผลกำไรอาจดูดีเกินจริง');
  });

  test('volumeProjection is populated when volume input is provided', () => {
    const result = calculate(
      makeInput({ volume: { estimatedOrdersPerDay: 20, sellingDaysPerMonth: 30 } })
    );
    expect(result.volumeProjection?.dailyProfit).toBeCloseTo(218.5, 2);
    expect(result.volumeProjection?.monthlyProfit).toBeCloseTo(6555.0, 2);
  });

  test('validateInput flags invalid input independently of calculate()', () => {
    const input = makeInput();
    const errors = validateInput({ ...input.menu, appPrice: 0 }, input.platform);
    expect(errors.length).toBeGreaterThan(0);
  });

  test('RISK_THRESHOLDS and DEFAULT_TARGET_PROFIT_PERCENT are reachable through the public barrel', () => {
    expect(RISK_THRESHOLDS.good).toBe(20);
    expect(RISK_THRESHOLDS.low).toBe(5);
    expect(RISK_THRESHOLDS.atRisk).toBe(0);
    expect(DEFAULT_TARGET_PROFIT_PERCENT).toBe(RISK_THRESHOLDS.good);
  });
});
