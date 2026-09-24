# Backend (dummy-ready)

Future Express + Postgres API. Not wired to frontend yet.

- `src/server.js` exposes `/api/health`, `/api/products`, `/api/templates`, `POST /api/contact`
- `frontend/js/config.js` has `API_ENABLED: false` — flip when this goes live.
- Next steps when backend starts: add validation, DB client (`pg`), `frontend/js/api.js`.
