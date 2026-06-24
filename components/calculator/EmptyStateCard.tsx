import { Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { RawFormState } from '@/hooks/useProfitCalculatorForm';

interface EmptyStateCardProps {
  setField: (field: keyof RawFormState, value: string) => void;
}

const SAMPLE_VALUES: Partial<Record<keyof RawFormState, string>> = {
  menuName: 'ข้าวกะเพราไก่ไข่ดาว',
  appPrice: '60',
  ingredientCost: '20',
  packagingCost: '5',
  laborCost: '5',
  otherCost: '0',
  gpPercent: '30',
};

export function EmptyStateCard({ setField }: EmptyStateCardProps) {
  return (
    <Card className="animate-fade-in-up border-dashed">
      <CardContent className="flex flex-col items-center gap-3 py-8 text-center">
        <Sparkles className="text-muted-foreground size-8" />
        <div className="grid gap-1">
          <p className="font-semibold">เริ่มต้นใช้งาน</p>
          <p className="text-muted-foreground text-sm">
            กรอกราคาขายและต้นทุนของเมนูด้านล่าง ระบบจะคำนวณกำไรจริงให้ทันที
          </p>
        </div>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => {
            (Object.entries(SAMPLE_VALUES) as [keyof RawFormState, string][]).forEach(
              ([field, value]) => {
                setField(field, value);
              }
            );
          }}
        >
          ลองด้วยตัวอย่าง
        </Button>
      </CardContent>
    </Card>
  );
}
