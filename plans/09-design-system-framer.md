# 09 — Design System (Framer-like)
Tokens: `frontend/css/variables.css`. Base: `base.css`. Layout: `layout.css`. Components: `components.css`. Motion: `animations.css` (reveal, stagger via `--i`, float, marquee, pulse-glow, gradient-pan, magnetic via `--mx/--my`, page-enter).
JS: `animations.js` (IntersectionObserver + stagger + parallax), `main.js` (nav blur, drawer, magnetic, year).
Rules: no hex colors outside variables.css; responsive overrides only in `frontend/responsive/`; respect `prefers-reduced-motion`.
