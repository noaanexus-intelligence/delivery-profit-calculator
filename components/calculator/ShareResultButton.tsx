'use client';

import { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/format';
import { PRODUCTION_URL } from '@/lib/site-config';
import type { CalculationBreakdown, RiskResult } from '@/lib/calculation-engine';

interface ShareResultButtonProps {
  breakdown: CalculationBreakdown;
  risk: RiskResult;
}

export function ShareResultButton({ breakdown, risk }: ShareResultButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareText = `ฉันคำนวณกำไรจริงจากการขายเดลิเวอรี่แล้ว!\nกำไรจริงต่อออเดอร์ ${formatCurrency(breakdown.realProfit)} (${risk.label})\nลองคำนวณร้านของคุณได้ฟรีที่`;

    if (navigator.share) {
      await navigator.share({ text: shareText, url: PRODUCTION_URL }).catch(() => {});
      return;
    }

    await navigator.clipboard.writeText(`${shareText} ${PRODUCTION_URL}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button type="button" variant="outline" size="sm" onClick={handleShare}>
      {copied ? <Check className="size-4" /> : <Share2 className="size-4" />}
      {copied ? 'คัดลอกผลลัพธ์แล้ว' : 'แชร์ผลลัพธ์'}
    </Button>
  );
}
