import { ProfitSummaryCard } from '@/components/calculator/ProfitSummaryCard';
import { WarningList } from '@/components/calculator/WarningList';
import { BreakdownDetail } from '@/components/calculator/BreakdownDetail';
import { VolumeProjectionCard } from '@/components/calculator/VolumeProjectionCard';
import { PriceRecommendationCard } from '@/components/calculator/PriceRecommendationCard';
import type { CalculationResult } from '@/lib/calculation-engine';

interface ResultsSectionProps {
  result: CalculationResult | null;
}

export function ResultsSection({ result }: ResultsSectionProps) {
  if (!result) {
    return null;
  }

  return (
    <div className="grid gap-6">
      <ProfitSummaryCard breakdown={result.breakdown} risk={result.risk} />
      <WarningList warnings={result.warnings} />
      <BreakdownDetail breakdown={result.breakdown} />
      <VolumeProjectionCard volumeProjection={result.volumeProjection} />
      <PriceRecommendationCard priceRecommendation={result.priceRecommendation} />
    </div>
  );
}
