# Delivery Profit Calculator

เครื่องคำนวณกำไรจริงก่อนเข้าร่วมเดลิเวอรี่ — a Thai-language calculator that
shows a restaurant's real profit per order on Grab, LINE MAN and ShopeeFood
after platform GP, VAT, store-funded discounts and campaign fees.

Production: https://delivery-profit-calculator.vercel.app

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
Radix UI primitives · Jest + ts-jest

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server on http://localhost:3000 |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Jest unit tests for the calculation engine |
| `npm run test:coverage` | Tests with a coverage report |
| `npm run lint` | `next lint` |

## Layout

```
app/                        Next.js App Router entry (single page)
components/calculator/      Calculator UI — inputs, results, growth surfaces
components/ui/              Radix-based primitives (button, card, input, …)
hooks/useProfitCalculatorForm.ts   Form state, wired to the engine
lib/calculation-engine/     Pure calculation logic + unit tests
lib/platform-presets.ts     Grab / LINE MAN / ShopeeFood GP and VAT defaults
lib/site-config.ts          PRODUCTION_URL used by share + QR links
```

## Calculation engine

The engine in `lib/calculation-engine/` is pure TypeScript with no React or
Next.js dependency, so it can be tested and reused on its own.

```ts
import { calculate, validateInput } from '@/lib/calculation-engine';

const errors = validateInput(input);   // always call this first
if (errors.length === 0) {
  const result = calculate(input);     // assumes input already validated
}
```

`calculate()` returns:

- `breakdown` — GP, VAT on GP, discount, campaign and other platform fees,
  net received, total cost and real profit (in baht, and as a percent of both
  app price and net received).
- `risk` — `good` (≥ 20% profit), `low` (≥ 5%), `atRisk` (≥ 0%) or `loss`,
  with a Thai label and a color token.
- `volumeProjection` — daily and monthly profit, when volume input is given.
- `priceRecommendation` — breakeven price plus the price needed to hit the
  20% target margin.
- `warnings` — Thai-language notes about the entered costs and price.

Thresholds and the default target margin live in
`lib/calculation-engine/constants.ts`.

## Tests

```bash
npm test
```

Seven suites cover breakdown math, risk classification, volume projection,
price recommendation, validation and edge cases.

## Deployment

Deployed on Vercel from `main`. Share and QR links read `PRODUCTION_URL` from
`lib/site-config.ts` rather than the current origin, so links copied from a
preview deployment still point at production — update that constant if the
domain changes.
