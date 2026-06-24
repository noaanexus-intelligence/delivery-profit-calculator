'use client';

import { useProfitCalculatorForm } from '@/hooks/useProfitCalculatorForm';
import { MenuCostSection } from '@/components/calculator/MenuCostSection';
import { PlatformFeeSection } from '@/components/calculator/PlatformFeeSection';
import { VolumeSection } from '@/components/calculator/VolumeSection';
import { ValidationErrorBanner } from '@/components/calculator/ValidationErrorBanner';
import { ResultsSection } from '@/components/calculator/ResultsSection';
import { StickyMobileSummaryBar } from '@/components/calculator/StickyMobileSummaryBar';
import { EmptyStateCard } from '@/components/calculator/EmptyStateCard';
import { TrustSection } from '@/components/calculator/TrustSection';
import { QRCodeSection } from '@/components/calculator/QRCodeSection';

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
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            ขาย Grab แล้วกำไรจริงเหลือเท่าไร?
          </h1>
          <p className="text-muted-foreground text-base">
            คำนวณใน 30 วินาที ก่อนสมัคร Grab / LINE MAN / ShopeeFood
          </p>
        </header>

        <TrustSection />

        {isPristine && <EmptyStateCard setField={setField} />}

        <div className="grid gap-6">
          <MenuCostSection raw={raw} setField={setField} />
          <PlatformFeeSection raw={raw} setField={setField} />
          <VolumeSection raw={raw} setField={setField} toggleVolume={toggleVolume} />
        </div>

        {!isPristine && <ValidationErrorBanner errors={errors} />}
        <ResultsSection result={result} />

        <QRCodeSection />
      </main>
      <StickyMobileSummaryBar result={result} />
    </>
  );
}
