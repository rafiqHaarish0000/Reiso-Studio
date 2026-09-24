# 12 — Capabilities / Build Section (light editorial poster)

Status: built as `BuildSection.tsx` (+ `EditorialGrid`, `BuildHeadline`, `ShowreelButton`), rendered in `app/index.tsx` after `StrategySection`. Previous sections/tokens untouched.

- Light BG `#F2F2F0`, ink `#050505`, secondary `#666`, grid `rgba(0,0,0,0.08)` at 50%/75%. Dramatic dark→light transition; gradient only in 8px dot + showreel hover ring.
- Headline WE/BUILD/DIGITAL/PRODUCTS (90–160px desktop, staggered offsets, left-half block), opacity+rise stagger 80ms.
- Support copy at 50% + B&W image (505×320, grayscale+contrast, hover 1.025/600ms, ±12px parallax).
- Bottom: ↓ SEE THE WORK (scrolls to `#work` anchor, falls back to /work route) left; SHOWREEL + 48px play circle centered; 60px index button overlapping boundary at 50%+110; REISO / CAPABILITIES bottom-right; 2026 © top-right.
- `#work` empty anchor added in index content for the future projects section.
- Mobile stacks with 62px left headline; index button hidden on mobile.
- No cards, no glass, no rounded containers, no Slot-child style arrays.
