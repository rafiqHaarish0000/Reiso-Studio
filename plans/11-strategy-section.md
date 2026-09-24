# 11 — Strategy / About-Intro Section (homepage continuation)

Status: built as `StrategySection.tsx` (+ `SectionGrid`, `StrategyImage`, `StrategyMetric`), rendered in `app/index.tsx` below the status bar. Hero/header/tokens untouched.

- BG `#07070A` + low-opacity violet/blue radial wash (~85/15 dark). No orange.
- Grid: 25/50/75% verticals (`rgba(255,255,255,0.10)`), horizontal divider at 640px desktop.
- Top labels: LAUNCHED / 24+ PROJECTS / 2026 © in 25% columns.
- Headline STRATEGY/BEFORE/PIXELS right-aligned, ≤150px, mask line reveal.
- Description left (~430px, uppercase) with weight-only emphasis.
- One continuous tall image (Unsplash placeholder, grayscale+contrast, grain, gradient edge bar, glow), absolute top 400px desktop so it crosses into the lower half; subtle ±26px scroll parallax (web, direct-DOM).
- Floating 54px menu control → /about. Marker REISO / 02 + gradient dot.
- Lower-right stat 12+ with copy; bottom-left text link About us ↗ (gradient underline on hover).
- Mobile stacks: metadata → heading (left, 62px) → description → image 100%x520 → stat right 86px → link.
- No cards, no rounded corners, no glass, no Slot-child style arrays (see crash note in Header).
