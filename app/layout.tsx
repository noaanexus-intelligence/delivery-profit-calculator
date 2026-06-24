import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'เครื่องคำนวณกำไรจริงก่อนเข้าร่วมเดลิเวอรี่',
  description:
    'คำนวณกำไรจริงก่อนเข้าร่วม Grab/LINE MAN/ShopeeFood สำหรับพ่อค้าแม่ค้ารายย่อย',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
