import { validateInput } from '../validate';
import { MenuCostInput, PlatformFeeInput } from '../types';

function makeMenu(overrides: Partial<MenuCostInput> = {}): MenuCostInput {
  return {
    menuName: 'test-menu',
    appPrice: 100,
    ingredientCost: 30,
    packagingCost: 5,
    laborCost: 5,
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

describe('validateInput — Edge Cases H1, H3-H6 (blocking validation)', () => {
  test('H1: appPrice = 0 is blocked', () => {
    const errors = validateInput(makeMenu({ appPrice: 0 }), makePlatform());
    expect(errors).toContain('ราคาขายบนแอปต้องมากกว่า 0 บาท');
  });

  test('H3: gpPercent = 150 is blocked', () => {
    const errors = validateInput(makeMenu(), makePlatform({ gpPercent: 150 }));
    expect(errors).toContain('ค่า GP% ต้องอยู่ระหว่าง 0-100');
  });

  test('H4: amount discount greater than appPrice is blocked', () => {
    const errors = validateInput(
      makeMenu({ appPrice: 50 }),
      makePlatform({ storeDiscount: { type: 'amount', value: 60 } })
    );
    expect(errors).toContain('ส่วนลดเป็นบาทต้องไม่มากกว่าราคาขายบนแอป');
  });

  test('H5: percent discount greater than 100 is blocked', () => {
    const errors = validateInput(
      makeMenu(),
      makePlatform({ storeDiscount: { type: 'percent', value: 120 } })
    );
    expect(errors).toContain('ส่วนลดเป็น % ต้องไม่เกิน 100%');
  });

  test('H6: negative ingredient cost is blocked', () => {
    const errors = validateInput(makeMenu({ ingredientCost: -10 }), makePlatform());
    expect(errors).toContain('ต้นทุนต้องไม่ติดลบ');
  });

  test('fully valid input produces zero errors', () => {
    const errors = validateInput(makeMenu(), makePlatform());
    expect(errors).toHaveLength(0);
  });

  test('V9 (added during final-spec review): volume block with zero orders/day is blocked', () => {
    const errors = validateInput(makeMenu(), makePlatform(), {
      estimatedOrdersPerDay: 0,
      sellingDaysPerMonth: 30,
    });
    expect(errors).toContain('จำนวนออเดอร์/วันต้องมากกว่า 0');
  });

  test('V10 (added during final-spec review): volume block with zero selling days/month is blocked', () => {
    const errors = validateInput(makeMenu(), makePlatform(), {
      estimatedOrdersPerDay: 10,
      sellingDaysPerMonth: 0,
    });
    expect(errors).toContain('จำนวนวันขาย/เดือนต้องมากกว่า 0');
  });

  test('V4: vatPercent out of range (150) is blocked', () => {
    const errors = validateInput(makeMenu(), makePlatform({ vatPercent: 150 }));
    expect(errors).toContain('VAT% ต้องอยู่ระหว่าง 0-100');
  });

  test('V5: negative discount value is blocked', () => {
    const errors = validateInput(
      makeMenu(),
      makePlatform({ storeDiscount: { type: 'percent', value: -5 } })
    );
    expect(errors).toContain('ส่วนลดต้องไม่ติดลบ');
  });

  test('V8: negative campaignFee is blocked', () => {
    const errors = validateInput(makeMenu(), makePlatform({ campaignFee: -5 }));
    expect(errors).toContain('ค่าธรรมเนียมต้องไม่ติดลบ');
  });

  test('V8: negative otherPlatformFee is blocked', () => {
    const errors = validateInput(makeMenu(), makePlatform({ otherPlatformFee: -5 }));
    expect(errors).toContain('ค่าธรรมเนียมต้องไม่ติดลบ');
  });
});
