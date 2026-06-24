import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/lib/format';
import type { VolumeProjection } from '@/lib/calculation-engine';

interface VolumeProjectionCardProps {
  volumeProjection: VolumeProjection | undefined;
}

export function VolumeProjectionCard({ volumeProjection }: VolumeProjectionCardProps) {
  if (!volumeProjection) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>ประมาณการกำไรตามจำนวนออเดอร์</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-muted-foreground text-sm">กำไรต่อวัน</p>
          <p className="text-xl font-semibold">{formatCurrency(volumeProjection.dailyProfit)}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-sm">กำไรต่อเดือน</p>
          <p className="text-xl font-semibold">
            {formatCurrency(volumeProjection.monthlyProfit)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
