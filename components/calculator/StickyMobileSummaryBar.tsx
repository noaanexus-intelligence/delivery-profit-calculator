import { RiskBadge } from '@/components/calculator/RiskBadge';
import { formatCurrency } from '@/lib/format';
import type { CalculationResult } from '@/lib/calculation-engine';

interface StickyMobileSummaryBarProps {
  result: CalculationResult | null;
}

export function StickyMobileSummaryBar({ result }: StickyMobileSummaryBarProps) {
  if (!result) {
    return null;
  }

  return (
    <div className="bg-card fixed inset-x-0 bottom-0 z-50 border-t pb-[env(safe-area-inset-bottom)] shadow-[0_-2px_8px_rgba(0,0,0,0.08)] md:hidden">
      <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 px-4 py-3">
        <div>
          <p className="text-muted-foreground text-xs">กำไรจริงต่อออเดอร์</p>
          <p className="text-lg font-semibold">{formatCurrency(result.breakdown.realProfit)}</p>
        </div>
        <RiskBadge risk={result.risk} />
      </div>
    </div>
  );
}
