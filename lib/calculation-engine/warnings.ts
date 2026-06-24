import { MenuCostInput, CalculationBreakdown } from './types';

export function generateWarnings(
  menu: MenuCostInput,
  breakdown: CalculationBreakdown
): string[] {
  const warnings: string[] = [];

  if (menu.packagingCost === 0) {
    warnings.push('ยังไม่ได้ใส่ค่าแพ็กเกจจิ้ง ผลกำไรอาจดูดีเกินจริง');
  }
  if (menu.laborCost === 0) {
    warnings.push('ยังไม่ได้ใส่ค่าแรง ผลกำไรอาจดูดีเกินจริง');
  }
  if (breakdown.netReceived < 0) {
    warnings.push('เงินที่ได้รับหลังหักแพลตฟอร์มติดลบ — ค่าธรรมเนียมสูงกว่าราคาขาย');
  }
  if (breakdown.totalCost === 0) {
    warnings.push('ต้นทุนรวมเป็น 0 บาท ตรวจสอบว่ากรอกครบหรือยัง');
  }

  return warnings;
}
