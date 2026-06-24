import { calculateBreakdown } from '../breakdown';
import { calculatePriceRecommendation } from '../recommendation';
import { generateWarnings } from '../warnings';
import { MenuCostInput, PlatformFeeInput } from '../types';

function makeMenu(overrides: Partial<MenuCostInput> = {}): MenuCostInput {
  return {
    menuName: 'edge-case-menu',
    appPrice: 100,
    ingredientCost: 0,
    packagingCost: 0,
    laborCost: 0,
    otherCost: 0,
    ...overrides,
  };
}

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

describe('Edge Case H2: GP=100%, totalCost=0 — the %net=100% illusion', () => {
  test('netReceived and realProfit go negative even though %net reads 100%', () => {
    const menu = makeMenu({ appPrice: 100 });
    const platform = makePlatform({ gpPercent: 100, vatPercent: 7 });
    const result = calculateBreakdown(menu, platform);

    expect(result.netReceived).toBeCloseTo(-7, 2);
    expect(result.realProfit).toBeCloseTo(-7, 2);
    expect(result.profitPercentOfAppPrice).toBeCloseTo(-7, 2);
    // The illusion this case exists to catch: %net reports 100% because
    // realProfit === netReceived exactly when totalCost is 0.
    expect(result.profitPercentOfNetReceived).toBeCloseTo(100, 2);

    const warnings = generateWarnings(menu, result);
    expect(warnings).toContain(
      'เงินที่ได้รับหลังหักแพลตฟอร์มติดลบ — ค่าธรรมเนียมสูงกว่าราคาขาย'
    );
    expect(warnings).toContain('ต้นทุนรวมเป็น 0 บาท ตรวจสอบว่ากรอกครบหรือยัง');
  });
});

describe('Edge Case H7: fee structure where no price can ever break even', () => {
  test('rate <= 0 -> breakevenPrice is Infinity, not a crash or a negative number', () => {
    const platform = makePlatform({ gpPercent: 95, vatPercent: 10 });
    const result = calculatePriceRecommendation(platform, 20);
    expect(result.breakevenPrice).toBe(Infinity);
    expect(Number.isFinite(result.breakevenPrice)).toBe(false);
  });
});

describe('Edge Case H8: target profit unreachable at any price', () => {
  test('target 80% exceeds achievable rate -> recommendedPrice is Infinity', () => {
    const platform = makePlatform();
    const result = calculatePriceRecommendation(platform, 40, 80);
    expect(result.recommendedPrice).toBe(Infinity);
    expect(Number.isFinite(result.recommendedPrice)).toBe(false);
  });
});

describe('Edge Case H9: every fee and cost field is zero except appPrice', () => {
  test('engine does not crash; profit% reads 100% on both bases; all applicable warnings fire', () => {
    const menu = makeMenu({ appPrice: 50 });
    const platform = makePlatform({ gpPercent: 0, vatPercent: 0 });
    const result = calculateBreakdown(menu, platform);

    expect(result.realProfit).toBeCloseTo(50, 2);
    expect(result.profitPercentOfAppPrice).toBeCloseTo(100, 2);
    expect(result.profitPercentOfNetReceived).toBeCloseTo(100, 2);

    const warnings = generateWarnings(menu, result);
    expect(warnings).toContain('ยังไม่ได้ใส่ค่าแพ็กเกจจิ้ง ผลกำไรอาจดูดีเกินจริง');
    expect(warnings).toContain('ยังไม่ได้ใส่ค่าแรง ผลกำไรอาจดูดีเกินจริง');
    expect(warnings).toContain('ต้นทุนรวมเป็น 0 บาท ตรวจสอบว่ากรอกครบหรือยัง');
    expect(warnings).not.toContain(
      'เงินที่ได้รับหลังหักแพลตฟอร์มติดลบ — ค่าธรรมเนียมสูงกว่าราคาขาย'
    );
  });
});
