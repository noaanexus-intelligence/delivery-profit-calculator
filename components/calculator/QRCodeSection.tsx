'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export function QRCodeSection() {
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  if (!origin) {
    return null;
  }

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(origin)}`;

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
        <p className="text-muted-foreground text-center text-xs break-all">{origin}</p>
        <p className="text-muted-foreground text-center text-xs">
          เหมาะสำหรับโพสต์ในกลุ่มร้านอาหารหรือกลุ่ม Grab
        </p>
      </CardContent>
    </Card>
  );
}
