'use client';

import { useProfitCalculatorForm } from '@/hooks/useProfitCalculatorForm';
import { MenuCostSection } from '@/components/calculator/MenuCostSection';
import { PlatformFeeSection } from '@/components/calculator/PlatformFeeSection';
import { VolumeSection } from '@/components/calculator/VolumeSection';
import { ValidationErrorBanner } from '@/components/calculator/ValidationErrorBanner';
import { ResultsSection } from '@/components/calculator/ResultsSection';

export function ProfitCalculator() {
  const { raw, setField, toggleVolume, errors, result } = useProfitCalculatorForm();

  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-8">
      <header className="grid gap-1">
        <h1 className="text-xl font-semibold">เครื่องคำนวณกำไรจริงก่อนเข้าร่วมเดลิเวอรี่</h1>
        <p className="text-muted-foreground text-sm">
          กรอกข้อมูลเมนูและค่าธรรมเนียมแพลตฟอร์ม เพื่อดูกำไรจริงก่อนตัดสินใจเข้าร่วม
          Grab / LINE MAN / ShopeeFood
        </p>
      </header>

      <MenuCostSection raw={raw} setField={setField} />
      <PlatformFeeSection raw={raw} setField={setField} />
      <VolumeSection raw={raw} setField={setField} toggleVolume={toggleVolume} />

      <ValidationErrorBanner errors={errors} />
      <ResultsSection result={result} />
    </main>
  );
}
