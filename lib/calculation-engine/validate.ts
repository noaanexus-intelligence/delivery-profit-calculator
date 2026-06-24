import { MenuCostInput, PlatformFeeInput, VolumeInput } from './types';

export function validateInput(
  menu: MenuCostInput,
  platform: PlatformFeeInput,
  volume?: VolumeInput
): string[] {
  const errors: string[] = [];

  if (menu.appPrice <= 0) {
    errors.push('ราคาขายบนแอปต้องมากกว่า 0 บาท');
  }
  if (
    menu.ingredientCost < 0 ||
    menu.packagingCost < 0 ||
    menu.laborCost < 0 ||
    menu.otherCost < 0
  ) {
    errors.push('ต้นทุนต้องไม่ติดลบ');
  }
  if (platform.gpPercent < 0 || platform.gpPercent > 100) {
    errors.push('ค่า GP% ต้องอยู่ระหว่าง 0-100');
  }
  if (platform.vatPercent < 0 || platform.vatPercent > 100) {
    errors.push('VAT% ต้องอยู่ระหว่าง 0-100');
  }
  if (platform.storeDiscount.value < 0) {
    errors.push('ส่วนลดต้องไม่ติดลบ');
  }
  if (platform.storeDiscount.type === 'percent' && platform.storeDiscount.value > 100) {
    errors.push('ส่วนลดเป็น % ต้องไม่เกิน 100%');
  }
  if (
    platform.storeDiscount.type === 'amount' &&
    platform.storeDiscount.value > menu.appPrice
  ) {
    errors.push('ส่วนลดเป็นบาทต้องไม่มากกว่าราคาขายบนแอป');
  }
  if (platform.campaignFee < 0 || platform.otherPlatformFee < 0) {
    errors.push('ค่าธรรมเนียมต้องไม่ติดลบ');
  }
  if (volume && volume.estimatedOrdersPerDay <= 0) {
    errors.push('จำนวนออเดอร์/วันต้องมากกว่า 0');
  }
  if (volume && volume.sellingDaysPerMonth <= 0) {
    errors.push('จำนวนวันขาย/เดือนต้องมากกว่า 0');
  }

  return errors;
}
