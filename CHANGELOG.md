# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0-rc.1] - 2026-08-21

First release candidate. Feature-complete for the v1.0 scope: a Thai-language
calculator that shows a restaurant's *real* profit per order after delivery
platform fees, VAT, store-funded discounts and campaign costs.

### Added

#### Calculation engine (`lib/calculation-engine/`)
- `calculate()` — single entry point returning breakdown, risk, volume
  projection, price recommendation and warnings.
- `validateInput()` — input validation, called by the caller *before*
  `calculate()`.
- Cost breakdown: GP on either the before- or after-discount base, VAT on GP,
  store-funded discount (percent or fixed amount), campaign fee and other
  platform fees, netted against ingredient / packaging / labor / other costs.
- Risk classification against profit-percent thresholds
  (`good` ≥ 20%, `low` ≥ 5%, `atRisk` ≥ 0%, `loss` < 0%).
- Volume projection: daily and monthly profit from orders/day × selling
  days/month.
- Price recommendation: breakeven price and a price that hits the 20% target
  profit margin.
- Warning generation for cost/price combinations that need attention.
- 55 unit tests across 7 suites covering breakdown, risk, volume,
  recommendation, validation and edge cases.

#### UI (`app/`, `components/`)
- Single-page calculator (`ProfitCalculator`) with menu cost, platform fee and
  volume input sections, wired through the `useProfitCalculatorForm` hook.
- Results: profit summary, risk badge, cost/fee breakdown detail, price
  recommendation, volume projection and profit comparison cards.
- Platform presets for Grab (30% GP), LINE MAN (32% GP) and ShopeeFood
  (25% GP), all at 7% VAT.
- Mobile: sticky summary bar that keeps the real-profit figure visible while
  scrolling the form.
- Empty state, validation error banner and warning list.
- Growth: share button (Web Share API with clipboard fallback and "copied"
  feedback), QR code section, and trust copy.
- Share and QR links pinned to the production URL constant
  (`lib/site-config.ts`) so they resolve correctly from preview deployments.

### Verified for this RC
- `npm run typecheck` — clean.
- `npm test` — 55 passed, 7 suites.
- `npm run build` — production build succeeds; `/` prerendered as static
  content, 130 kB first load JS.
