import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatCurrency, formatPercent } from '@/lib/format';
import type { CalculationBreakdown } from '@/lib/calculation-engine';

interface BreakdownDetailProps {
  breakdown: CalculationBreakdown;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-1">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium tabular-nums">{value}</dd>
    </div>
  );
}

export function BreakdownDetail({ breakdown }: BreakdownDetailProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>รายละเอียดการคำนวณ</CardTitle>
      </CardHeader>
      <CardContent>
        <details>
          <summary className="cursor-pointer text-sm font-medium">ดูรายละเอียดทั้งหมด</summary>
          <dl className="mt-3 divide-y">
            <Row label="ราคาขายหน้าแอป" value={formatCurrency(breakdown.appPrice)} />
            <Row label="ฐานคำนวณ GP" value={formatCurrency(breakdown.gpBaseAmount)} />
            <Row label="GP ที่ถูกหัก" value={formatCurrency(breakdown.gpAmount)} />
            <Row label="VAT บน GP" value={formatCurrency(breakdown.vatOnGp)} />
            <Row label="ส่วนลดร้าน" value={formatCurrency(breakdown.discountAmount)} />
            <Row label="ค่าแคมเปญ" value={formatCurrency(breakdown.campaignFee)} />
            <Row label="ค่าธรรมเนียมอื่นๆ" value={formatCurrency(breakdown.otherPlatformFee)} />
            <Row
              label="หักแพลตฟอร์มรวม"
              value={formatCurrency(breakdown.platformDeductionTotal)}
            />
            <Row label="ยอดที่ได้รับจริง" value={formatCurrency(breakdown.netReceived)} />
            <Row
              label="ต้นทุนวัตถุดิบ"
              value={formatCurrency(breakdown.costBreakdown.ingredientCost)}
            />
            <Row
              label="ต้นทุนแพ็กเกจจิ้ง"
              value={formatCurrency(breakdown.costBreakdown.packagingCost)}
            />
            <Row
              label="ต้นทุนแรงงาน"
              value={formatCurrency(breakdown.costBreakdown.laborCost)}
            />
            <Row
              label="ต้นทุนอื่นๆ"
              value={formatCurrency(breakdown.costBreakdown.otherCost)}
            />
            <Row label="ต้นทุนรวม" value={formatCurrency(breakdown.totalCost)} />
            <Row label="กำไรจริง" value={formatCurrency(breakdown.realProfit)} />
            <Row
              label="% กำไรเทียบยอดรับจริง"
              value={formatPercent(breakdown.profitPercentOfNetReceived)}
            />
          </dl>
        </details>
      </CardContent>
    </Card>
  );
}
