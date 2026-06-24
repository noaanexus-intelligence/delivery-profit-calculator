'use client';

import { useProfitCalculatorForm } from '@/hooks/useProfitCalculatorForm';
import { MenuCostSection } from '@/components/calculator/MenuCostSection';
import { PlatformFeeSection } from '@/components/calculator/PlatformFeeSection';
import { VolumeSection } from '@/components/calculator/VolumeSection';
import { ValidationErrorBanner } from '@/components/calculator/ValidationErrorBanner';
import { ResultsSection } from '@/components/calculator/ResultsSection';
import { StickyMobileSummaryBar } from '@/components/calculator/StickyMobileSummaryBar';
import { EmptyStateCard } from '@/components/calculator/EmptyStateCard';

export function ProfitCalculator() {
  const { raw, setField, toggleVolume, errors, result } = useProfitCalculatorForm();

  const isPristine =
    raw.menuName === '' &&
    raw.appPrice === '' &&
    raw.ingredientCost === '' &&
    raw.packagingCost === '' &&
    raw.laborCost === '' &&
    raw.otherCost === '' &&
    raw.gpPercent === '';

  return (
    <>
      <main className="mx-auto flex max-w-2xl flex-col gap-8 px-4 py-8 pb-28 md:pb-8">
        <header className="grid gap-2 border-b pb-6">
          <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
            เครื่องมือฟรีสำหรับพ่อค้าแม่ค้า
          </p>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            เครื่องคำนวณกำไรจริงก่อนเข้าร่วมเดลิเวอรี่
          </h1>
          <p className="text-muted-foreground text-sm">
            กรอกข้อมูลเมนูและค่าธรรมเนียมแพลตฟอร์ม เพื่อดูกำไรจริงก่อนตัดสินใจเข้าร่วม
            Grab / LINE MAN / ShopeeFood
          </p>
        </header>

        {isPristine && <EmptyStateCard />}

        <div className="grid gap-6">
          <MenuCostSection raw={raw} setField={setField} />
          <PlatformFeeSection raw={raw} setField={setField} />
          <VolumeSection raw={raw} setField={setField} toggleVolume={toggleVolume} />
        </div>

        {!isPristine && <ValidationErrorBanner errors={errors} />}
        <ResultsSection result={result} />
      </main>
      <StickyMobileSummaryBar result={result} />
    </>
  );
}
