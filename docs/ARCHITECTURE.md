# Reiso Studio — Architecture (frontend-first)

## Phase 1 (now): Frontend only
- Vanilla HTML + CSS + JS. No framework lock-in.
- Framer-style motion: `frontend/css/animations.css` + `frontend/js/animations.js`
  - reveal-on-scroll, stagger, marquee, magnetic buttons, parallax hero, blur nav
- Responsive is **separate layer**: `frontend/responsive/*` overrides only, never base styles.
- Backend calls go through `frontend/js/config.js` → disabled by default (`API_ENABLED: false`).

## Phase 2 (future): Backend
- `backend/src/server.js` is Express-ready dummy.
- Endpoints planned:
  - `GET /api/health`
  - `GET /api/products`
  - `POST /api/contact` (validates name/email/message, stores to `inquiries`)
  - `GET /api/templates`
- Swap `API_ENABLED` to `true` and implement `fetch` in `frontend/js/api.js` (stub file to be added later).

## Phase 3 (future): Database
- `database/schema.sql`: `products, templates, inquiries, blog_posts`
- Postgres-first, but schema is portable.
- No connection yet. See `database/README.md`.

## Conventions
- CSS naming: BEM-ish (`.nav`, `.nav__links`, `.btn--primary`).
- Tokens only in `frontend/css/variables.css`. No hard-coded colors elsewhere.
- Each page has a plan in `plans/*.md`. Build page-by-page after setup approval.
