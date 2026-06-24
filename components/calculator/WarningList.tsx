import { AlertTriangle } from 'lucide-react';

import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface WarningListProps {
  warnings: string[];
}

export function WarningList({ warnings }: WarningListProps) {
  if (warnings.length === 0) {
    return null;
  }

  return (
    <Alert className="border-yellow-300 bg-yellow-50 text-yellow-900 [&>svg]:text-yellow-600 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-200 dark:[&>svg]:text-yellow-400">
      <AlertTriangle />
      <AlertTitle>ข้อควรระวัง ({warnings.length} รายการ)</AlertTitle>
      <AlertDescription>
        <ul className="list-inside list-disc">
          {warnings.map((warning) => (
            <li key={warning}>{warning}</li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  );
}
