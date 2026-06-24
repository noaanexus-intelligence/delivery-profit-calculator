import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/lib/format';
import type { CalculationBreakdown } from '@/lib/calculation-engine';

interface ProfitComparisonCardProps {
  breakdown: CalculationBreakdown;
}

export function ProfitComparisonCard({ breakdown }: ProfitComparisonCardProps) {
  const directProfit = breakdown.appPrice - breakdown.totalCost;

  return (
    <Card>
      <CardHeader>
        <CardTitle>เปรียบเทียบ: ขายผ่านแพลตฟอร์ม vs ขายตรง</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <p className="text-muted-foreground text-sm">ขายผ่านแพลตฟอร์ม</p>
          <p className="text-xl font-semibold tracking-tight tabular-nums">
            {formatCurrency(breakdown.realProfit)}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground text-sm">
            ขายตรง (ประมาณการ ไม่หักค่าธรรมเนียมแพลตฟอร์ม)
          </p>
          <p className="text-xl font-semibold tracking-tight tabular-nums">
            {formatCurrency(directProfit)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
