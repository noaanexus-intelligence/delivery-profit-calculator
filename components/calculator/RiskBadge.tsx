import { Badge } from '@/components/ui/badge';
import { getRiskColorClasses } from '@/lib/risk-color-map';
import type { RiskResult } from '@/lib/calculation-engine';

interface RiskBadgeProps {
  risk: RiskResult;
}

export function RiskBadge({ risk }: RiskBadgeProps) {
  return (
    <Badge variant="outline" className={getRiskColorClasses(risk.colorToken)}>
      {risk.label}
    </Badge>
  );
}
