import { RiskBadge } from '@/components/calculator/RiskBadge';
import { formatCurrency } from '@/lib/format';
import { getRiskBarTintClasses } from '@/lib/risk-color-map';
import type { CalculationResult } from '@/lib/calculation-engine';

interface StickyMobileSummaryBarProps {
  result: CalculationResult | null;
}

export function StickyMobileSummaryBar({ result }: StickyMobileSummaryBarProps) {
  if (!result) {
    return null;
  }

  return (
    <div
      className={`animate-fade-in-up fixed inset-x-0 bottom-0 z-50 border-t-2 pb-[env(safe-area-inset-bottom)] shadow-[0_-2px_12px_rgba(0,0,0,0.1)] md:hidden ${getRiskBarTintClasses(result.risk.colorToken)}`}
    >
      <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 px-4 py-3">
        <div>
          <p className="text-muted-foreground text-xs">กำไรจริงต่อออเดอร์</p>
          <p className="text-xl font-semibold tracking-tight tabular-nums">
            {formatCurrency(result.breakdown.realProfit)}
          </p>
        </div>
        <RiskBadge risk={result.risk} />
      </div>
    </div>
  );
}
