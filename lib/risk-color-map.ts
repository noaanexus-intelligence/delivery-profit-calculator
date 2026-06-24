const RISK_COLOR_MAP: Record<string, string> = {
  green:
    'bg-green-100 text-green-800 border-green-300 dark:bg-green-950 dark:text-green-300 dark:border-green-800',
  yellow:
    'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-950 dark:text-yellow-300 dark:border-yellow-800',
  orange:
    'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800',
  red: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-950 dark:text-red-300 dark:border-red-800',
};

export function getRiskColorClasses(colorToken: string): string {
  return RISK_COLOR_MAP[colorToken] ?? RISK_COLOR_MAP.red;
}
