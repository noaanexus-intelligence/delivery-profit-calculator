import { Button } from '@/components/ui/button';
import { PLATFORM_PRESETS } from '@/lib/platform-presets';
import type { RawFormState } from '@/hooks/useProfitCalculatorForm';

interface PlatformPresetSelectorProps {
  setField: (field: keyof RawFormState, value: string) => void;
}

export function PlatformPresetSelector({ setField }: PlatformPresetSelectorProps) {
  return (
    <div className="grid gap-2">
      <div className="flex flex-wrap gap-2">
        {PLATFORM_PRESETS.map((preset) => (
          <Button
            key={preset.id}
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setField('gpPercent', String(preset.gpPercent));
              setField('vatPercent', String(preset.vatPercent));
            }}
          >
            {preset.label}
          </Button>
        ))}
      </div>
      <p className="text-muted-foreground text-xs">
        * ค่าตัวอย่างเท่านั้น ไม่ใช่ค่าจริงจากแพลตฟอร์ม กรุณาตรวจสอบกับแพลตฟอร์มก่อนใช้งานจริง
      </p>
    </div>
  );
}
