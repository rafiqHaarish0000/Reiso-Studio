# 10 — Backend Integration Plan (future)
1. `cd backend && npm install && npm run dev` — dummy Express on :4000.
2. Add Postgres, `pg` client, run `database/schema.sql`.
3. Implement real `/api/contact`, `/api/products`, `/api/templates`.
4. Add `frontend/js/api.js` using `window.REISO_CONFIG.API_BASE_URL`; set `API_ENABLED=true`.
5. Contact form → fetch POST with inline success/error states.
