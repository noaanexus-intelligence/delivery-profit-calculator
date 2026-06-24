import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import type { RawFormState } from '@/hooks/useProfitCalculatorForm';

interface VolumeSectionProps {
  raw: RawFormState;
  setField: (field: keyof RawFormState, value: string) => void;
  toggleVolume: () => void;
}

export function VolumeSection({ raw, setField, toggleVolume }: VolumeSectionProps) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between [&>div]:gap-1.5">
        <CardTitle>ประมาณการยอดขาย (ไม่บังคับ)</CardTitle>
        <Switch checked={raw.volumeEnabled} onCheckedChange={toggleVolume} />
      </CardHeader>
      {raw.volumeEnabled && (
        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="estimatedOrdersPerDay">ออเดอร์/วัน (โดยประมาณ)</Label>
            <Input
              id="estimatedOrdersPerDay"
              type="number"
              inputMode="decimal"
              placeholder="0"
              value={raw.estimatedOrdersPerDay}
              onChange={(e) => setField('estimatedOrdersPerDay', e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="sellingDaysPerMonth">วันขาย/เดือน</Label>
            <Input
              id="sellingDaysPerMonth"
              type="number"
              inputMode="decimal"
              placeholder="0"
              value={raw.sellingDaysPerMonth}
              onChange={(e) => setField('sellingDaysPerMonth', e.target.value)}
            />
          </div>
        </CardContent>
      )}
    </Card>
  );
}
