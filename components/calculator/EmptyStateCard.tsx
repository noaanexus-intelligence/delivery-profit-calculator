import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export function EmptyStateCard() {
  return (
    <Card className="border-dashed">
      <CardHeader>
        <CardTitle>เริ่มต้นใช้งาน</CardTitle>
      </CardHeader>
      <CardContent className="text-muted-foreground text-sm">
        กรอกราคาขายและต้นทุนของเมนูด้านล่าง ระบบจะคำนวณกำไรจริงให้ทันที
        <br />
        ตัวอย่าง: ราคาขาย 60 บาท · ต้นทุนวัตถุดิบ 20 บาท · GP 30%
      </CardContent>
    </Card>
  );
}
