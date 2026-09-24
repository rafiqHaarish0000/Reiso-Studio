# Reiso Studio — Company Website Monorepo

> Software, Websites & Digital Systems for Modern Businesses.

Expo + TypeScript + Expo Router + React Native Web. Homepage-only (pixel-polished). Other routes are placeholders ready for future pages.

## Structure

```
Reiso_Studio/
├── frontend/                  # EXPO APP (current focus)
│   ├── app.json, babel.config.js, tsconfig.json, package.json
│   └── src/
│       ├── app/               # routes: _layout.tsx, index.tsx (home), work/services/about/contact (stubs)
│       ├── components/        # Header, Hero, HeroFrame, StudioIdentity, ServiceLinks,
│       │                      # ProjectAvailability, MobileMenu, GradientSignature, BackgroundGrid
│       ├── constants/         # colors.ts, typography.ts, spacing.ts
│       ├── hooks/             # useResponsive.ts
│       └── assets/images/     # reiso-logo.png (official logo — do not alter)
├── backend/                   # DUMMY Express (future)
├── database/                  # DUMMY schema (future)
├── plans/                     # .md plan per page
└── docs/ARCHITECTURE.md
```

## Run (frontend)

```bash
cd frontend
npm install
npm run web        # Expo web dev
npm run typecheck  # tsc --noEmit
npm run build:web  # expo export --platform web → frontend/dist
```

## Design rules (homepage)

- 90% black/white/neutral (`#050507` base), 10% Reiso gradient accent only.
- No MATTIS / Framer / template badges / orange theme / stock photos.
- Official logo used as-is (`src/assets/images/reiso-logo.png`).
- Staggered entrance 500–900ms, `prefers-reduced-motion` respected, 44px touch targets.

## Branches

- `main` — stable · `dev` — active development (you are here)
