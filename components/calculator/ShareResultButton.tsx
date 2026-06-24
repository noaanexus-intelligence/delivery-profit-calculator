'use client';

import { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/format';
import type { CalculationBreakdown, RiskResult } from '@/lib/calculation-engine';

interface ShareResultButtonProps {
  breakdown: CalculationBreakdown;
  risk: RiskResult;
}

export function ShareResultButton({ breakdown, risk }: ShareResultButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.origin;
    const shareText = `ฉันคำนวณกำไรจริงจากการขายเดลิเวอรี่แล้ว!\nกำไรจริงต่อออเดอร์ ${formatCurrency(breakdown.realProfit)} (${risk.label})\nลองคำนวณร้านของคุณได้ฟรีที่`;

    if (navigator.share) {
      await navigator.share({ text: shareText, url }).catch(() => {});
      return;
    }

    await navigator.clipboard.writeText(`${shareText} ${url}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button type="button" variant="outline" size="sm" onClick={handleShare}>
      {copied ? <Check className="size-4" /> : <Share2 className="size-4" />}
      {copied ? 'คัดลอกแล้ว' : 'แชร์ผลลัพธ์'}
    </Button>
  );
}
