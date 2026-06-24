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
      <CardContent className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-muted-foreground text-sm">ราคาคุ้มทุน</p>
          <p className="text-xl font-semibold">
            {formatCurrency(priceRecommendation.breakevenPrice)}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground text-sm">
            ราคาแนะนำ (เป้ากำไร {formatPercent(priceRecommendation.targetProfitPercent)})
          </p>
          <p className="text-xl font-semibold">
            {formatCurrency(priceRecommendation.recommendedPrice)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
