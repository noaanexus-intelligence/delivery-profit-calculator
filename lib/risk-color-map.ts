const RISK_COLOR_MAP: Record<string, string> = {
  green:
    'bg-green-100 text-green-800 border-green-300 dark:bg-green-950 dark:text-green-300 dark:border-green-800',
  yellow:
    'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-950 dark:text-yellow-300 dark:border-yellow-800',
  orange:
    'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800',
  red: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-950 dark:text-red-300 dark:border-red-800',
};

const RISK_ACCENT_BORDER_MAP: Record<string, string> = {
  green: 'border-l-green-500',
  yellow: 'border-l-yellow-500',
  orange: 'border-l-orange-500',
  red: 'border-l-red-500',
};

const RISK_BAR_TINT_MAP: Record<string, string> = {
  green: 'bg-green-50 border-t-green-500 dark:bg-green-950/40 dark:border-t-green-700',
  yellow: 'bg-yellow-50 border-t-yellow-500 dark:bg-yellow-950/40 dark:border-t-yellow-700',
  orange: 'bg-orange-50 border-t-orange-500 dark:bg-orange-950/40 dark:border-t-orange-700',
  red: 'bg-red-50 border-t-red-500 dark:bg-red-950/40 dark:border-t-red-700',
};

const RISK_HERO_BG_MAP: Record<string, string> = {
  green: 'bg-green-50 dark:bg-green-950/30',
  yellow: 'bg-yellow-50 dark:bg-yellow-950/30',
  orange: 'bg-orange-50 dark:bg-orange-950/30',
  red: 'bg-red-50 dark:bg-red-950/30',
};

export function getRiskColorClasses(colorToken: string): string {
  return RISK_COLOR_MAP[colorToken] ?? RISK_COLOR_MAP.red;
}

export function getRiskHeroBgClass(colorToken: string): string {
  return RISK_HERO_BG_MAP[colorToken] ?? RISK_HERO_BG_MAP.red;
}

export function getRiskAccentBorderClass(colorToken: string): string {
  return RISK_ACCENT_BORDER_MAP[colorToken] ?? RISK_ACCENT_BORDER_MAP.red;
}

export function getRiskBarTintClasses(colorToken: string): string {
  return RISK_BAR_TINT_MAP[colorToken] ?? RISK_BAR_TINT_MAP.red;
}
