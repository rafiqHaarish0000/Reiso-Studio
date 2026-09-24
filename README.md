# Reiso Studio — Company Website Monorepo

> Software, Websites & Digital Systems for Modern Businesses.

Frontend-first build. Backend + Database folders are **dummy-ready** for future integration.

## Structure

```
Reiso_Studio/
├── frontend/               # <-- CURRENT FOCUS (vanilla HTML/CSS/JS, Framer-style)
│   ├── index.html          # Home
│   ├── pages/              # about, products, services, templates, work, blog, contact
│   ├── css/                # design tokens, base, layout, components, animations
│   ├── responsive/         # separate responsive layer (tablet, mobile)
│   ├── js/                 # main, animations (IntersectionObserver), config (API URL)
│   └── assets/images/logos/# reiso_with_bg.png + reiso_logo_transparent.png
├── backend/                # DUMMY (Express-ready, not wired yet)
│   └── src/server.js
├── database/               # DUMMY (schema.sql + seed.sql, not connected yet)
├── plans/                  # .md plan per page + design-system + backend plan
├── docs/                   # architecture overview
└── README.md
```

## Quick start (frontend only)

```bash
# option 1: just open
open frontend/index.html

# option 2: local server
npx serve frontend
# or
python3 -m http.server 5173 --directory frontend
```

No build step. No framework. Pure Framer-like CSS + motion.

## Future backend integration (ready)

- `frontend/js/config.js` → `window.REISO_CONFIG.API_BASE_URL` (default `http://localhost:4000/api`)
- `backend/` has Express dummy with `/api/health`, `/api/contact`, `/api/products`
- `database/schema.sql` has `products, templates, inquiries, blog_posts`
- When ready: `cd backend && npm install && npm run dev`

## Branches

- `main` — stable
- `dev` — active development

## Logos

- `frontend/assets/images/logos/reiso_with_bg.png` — dark-bg version (from `resiso_with_bg.png`)
- `frontend/assets/images/logos/reiso_logo_transparent.png` — transparent version (from `reiso_logo_remove_bg.png`)

Use transparent on dark/light hero, with-bg for social / splash.
