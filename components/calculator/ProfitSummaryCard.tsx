import { Card, CardHeader, CardTitle, CardAction, CardContent } from '@/components/ui/card';
import { RiskBadge } from '@/components/calculator/RiskBadge';
import { formatCurrency, formatPercent } from '@/lib/format';
import type { CalculationBreakdown, RiskResult } from '@/lib/calculation-engine';

interface ProfitSummaryCardProps {
  breakdown: CalculationBreakdown;
  risk: RiskResult;
}

export function ProfitSummaryCard({ breakdown, risk }: ProfitSummaryCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>กำไรจริงต่อออเดอร์</CardTitle>
        <CardAction>
          <RiskBadge risk={risk} />
        </CardAction>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          <p className="text-3xl font-semibold">{formatCurrency(breakdown.realProfit)}</p>
          <p className="text-muted-foreground text-sm">
            {formatPercent(breakdown.profitPercentOfAppPrice)} ของราคาขายหน้าแอป
          </p>
        </div>
        <dl className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-muted-foreground">ยอดที่ได้รับจริง</dt>
            <dd className="font-medium">{formatCurrency(breakdown.netReceived)}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">ต้นทุนรวม</dt>
            <dd className="font-medium">{formatCurrency(breakdown.totalCost)}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
