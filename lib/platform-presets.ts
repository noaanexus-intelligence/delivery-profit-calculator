export interface PlatformPreset {
  id: string;
  label: string;
  gpPercent: number;
  vatPercent: number;
}

export const PLATFORM_PRESETS: PlatformPreset[] = [
  { id: 'grab', label: 'Grab', gpPercent: 30, vatPercent: 7 },
  { id: 'lineman', label: 'LINE MAN', gpPercent: 32, vatPercent: 7 },
  { id: 'shopeefood', label: 'ShopeeFood', gpPercent: 25, vatPercent: 7 },
];
