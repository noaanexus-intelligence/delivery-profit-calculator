import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PRODUCTION_URL } from '@/lib/site-config';

export function QRCodeSection() {
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(PRODUCTION_URL)}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>สแกนเพื่อแชร์เครื่องคำนวณนี้</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={qrUrl}
          alt="QR Code ลิงก์เครื่องคำนวณกำไรจริง"
          width={180}
          height={180}
          className="rounded-md border"
        />
        <p className="text-muted-foreground text-center text-xs break-all">{PRODUCTION_URL}</p>
        <p className="text-muted-foreground text-center text-xs">
          เหมาะสำหรับโพสต์ในกลุ่มร้านอาหารหรือกลุ่ม Grab
        </p>
        <p className="text-muted-foreground text-center text-xs">
          หากสแกนไม่ได้ ให้เปิดลิงก์: delivery-profit-calculator.vercel.app
        </p>
      </CardContent>
    </Card>
  );
}
