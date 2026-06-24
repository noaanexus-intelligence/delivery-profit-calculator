import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { RawFormState } from '@/hooks/useProfitCalculatorForm';
import type { DiscountType, GpBase } from '@/lib/calculation-engine';

interface PlatformFeeSectionProps {
  raw: RawFormState;
  setField: (field: keyof RawFormState, value: string) => void;
}

export function PlatformFeeSection({ raw, setField }: PlatformFeeSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>ค่าธรรมเนียมแพลตฟอร์ม</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="gpPercent">GP (%)</Label>
            <Input
              id="gpPercent"
              type="number"
              inputMode="decimal"
              placeholder="0"
              value={raw.gpPercent}
              onChange={(e) => setField('gpPercent', e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="vatPercent">VAT (%)</Label>
            <Input
              id="vatPercent"
              type="number"
              inputMode="decimal"
              placeholder="7"
              value={raw.vatPercent}
              onChange={(e) => setField('vatPercent', e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label>คิด GP จากฐานราคาแบบไหน</Label>
          <RadioGroup
            value={raw.gpBase}
            onValueChange={(value: string) => setField('gpBase', value as GpBase)}
            className="grid-flow-col grid-cols-2"
          >
            <Label className="flex items-center gap-2 font-normal">
              <RadioGroupItem value="beforeDiscount" />
              ก่อนหักส่วนลด
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <RadioGroupItem value="afterDiscount" />
              หลังหักส่วนลด
            </Label>
          </RadioGroup>
        </div>

        <div className="grid gap-2">
          <Label>ประเภทส่วนลดร้านค้า</Label>
          <RadioGroup
            value={raw.discountType}
            onValueChange={(value: string) => setField('discountType', value as DiscountType)}
            className="grid-flow-col grid-cols-2"
          >
            <Label className="flex items-center gap-2 font-normal">
              <RadioGroupItem value="percent" />
              เปอร์เซ็นต์ (%)
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <RadioGroupItem value="amount" />
              จำนวนเงิน (บาท)
            </Label>
          </RadioGroup>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="discountValue">
            ส่วนลดร้านค้า ({raw.discountType === 'percent' ? '%' : 'บาท'})
          </Label>
          <Input
            id="discountValue"
            type="number"
            inputMode="decimal"
            placeholder="0"
            value={raw.discountValue}
            onChange={(e) => setField('discountValue', e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="campaignFee">ค่าร่วมแคมเปญ (บาท)</Label>
            <Input
              id="campaignFee"
              type="number"
              inputMode="decimal"
              placeholder="0"
              value={raw.campaignFee}
              onChange={(e) => setField('campaignFee', e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="otherPlatformFee">ค่าธรรมเนียมอื่นๆ (บาท)</Label>
            <Input
              id="otherPlatformFee"
              type="number"
              inputMode="decimal"
              placeholder="0"
              value={raw.otherPlatformFee}
              onChange={(e) => setField('otherPlatformFee', e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
