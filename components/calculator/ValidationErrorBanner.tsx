import { AlertTriangle } from 'lucide-react';

import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface ValidationErrorBannerProps {
  errors: string[];
}

export function ValidationErrorBanner({ errors }: ValidationErrorBannerProps) {
  if (errors.length === 0) {
    return null;
  }

  return (
    <Alert variant="destructive">
      <AlertTriangle />
      <AlertTitle>กรอกข้อมูลไม่ถูกต้อง ({errors.length} รายการ)</AlertTitle>
      <AlertDescription>
        <ul className="list-inside list-disc">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  );
}
