import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { RawFormState } from '@/hooks/useProfitCalculatorForm';

interface MenuCostSectionProps {
  raw: RawFormState;
  setField: (field: keyof RawFormState, value: string) => void;
}

export function MenuCostSection({ raw, setField }: MenuCostSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>เมนูและต้นทุน</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="menuName">ชื่อเมนู</Label>
          <Input
            id="menuName"
            placeholder="เช่น ข้าวกะเพราไก่ไข่ดาว"
            value={raw.menuName}
            onChange={(e) => setField('menuName', e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="appPrice">ราคาขายบนแอป (บาท)</Label>
          <Input
            id="appPrice"
            type="number"
            inputMode="decimal"
            placeholder="0"
            value={raw.appPrice}
            onChange={(e) => setField('appPrice', e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="ingredientCost">ต้นทุนวัตถุดิบ (บาท)</Label>
            <Input
              id="ingredientCost"
              type="number"
              inputMode="decimal"
              placeholder="0"
              value={raw.ingredientCost}
              onChange={(e) => setField('ingredientCost', e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="packagingCost">ต้นทุนแพ็กเกจจิ้ง (บาท)</Label>
            <Input
              id="packagingCost"
              type="number"
              inputMode="decimal"
              placeholder="0"
              value={raw.packagingCost}
              onChange={(e) => setField('packagingCost', e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="laborCost">ค่าแรง (บาท)</Label>
            <Input
              id="laborCost"
              type="number"
              inputMode="decimal"
              placeholder="0"
              value={raw.laborCost}
              onChange={(e) => setField('laborCost', e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="otherCost">ต้นทุนอื่นๆ (บาท)</Label>
            <Input
              id="otherCost"
              type="number"
              inputMode="decimal"
              placeholder="0"
              value={raw.otherCost}
              onChange={(e) => setField('otherCost', e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
