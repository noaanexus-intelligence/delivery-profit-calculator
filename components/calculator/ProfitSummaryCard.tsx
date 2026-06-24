import { Card, CardHeader, CardTitle, CardAction, CardContent } from '@/components/ui/card';
import { RiskBadge } from '@/components/calculator/RiskBadge';
import { formatCurrency, formatPercent } from '@/lib/format';
import { getRiskAccentBorderClass } from '@/lib/risk-color-map';
import type { CalculationBreakdown, RiskResult } from '@/lib/calculation-engine';

interface ProfitSummaryCardProps {
  breakdown: CalculationBreakdown;
  risk: RiskResult;
}

export function ProfitSummaryCard({ breakdown, risk }: ProfitSummaryCardProps) {
  return (
    <Card className={`border-l-4 shadow-md ${getRiskAccentBorderClass(risk.colorToken)}`}>
      <CardHeader>
        <CardTitle>กำไรจริงต่อออเดอร์</CardTitle>
        <CardAction>
          <RiskBadge risk={risk} />
        </CardAction>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          <p className="text-4xl font-semibold tracking-tight tabular-nums">
            {formatCurrency(breakdown.realProfit)}
          </p>
          <p className="text-muted-foreground text-sm">
            {formatPercent(breakdown.profitPercentOfAppPrice)} ของราคาขายหน้าแอป
          </p>
        </div>
        <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted-foreground">ยอดที่ได้รับจริง</dt>
            <dd className="font-medium tabular-nums">{formatCurrency(breakdown.netReceived)}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">ต้นทุนรวม</dt>
            <dd className="font-medium tabular-nums">{formatCurrency(breakdown.totalCost)}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
