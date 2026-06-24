import { TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatCurrency, formatPercent } from '@/lib/format';
import type { PriceRecommendation } from '@/lib/calculation-engine';

interface PriceRecommendationCardProps {
  priceRecommendation: PriceRecommendation;
}

export function PriceRecommendationCard({ priceRecommendation }: PriceRecommendationCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>คำแนะนำราคาขาย</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="bg-muted/50 flex items-center gap-3 rounded-lg p-3">
          <TrendingUp className="text-primary size-5 shrink-0" />
          <div>
            <p className="text-muted-foreground text-xs">
              ราคาแนะนำ (เป้ากำไร {formatPercent(priceRecommendation.targetProfitPercent)})
            </p>
            <p className="text-2xl font-bold tracking-tight tabular-nums">
              {formatCurrency(priceRecommendation.recommendedPrice)}
            </p>
          </div>
        </div>
        <div>
          <p className="text-muted-foreground text-sm">ราคาคุ้มทุน</p>
          <p className="text-base font-medium tracking-tight tabular-nums">
            {formatCurrency(priceRecommendation.breakevenPrice)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
