/**
 * Reiso Studio Backend — DUMMY (Phase 2)
 * Express-ready placeholder. Not connected to frontend yet.
 * Run when ready: npm install && npm run dev
 */
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ ok: true, service: "reiso-studio-backend", mode: "dummy" }));
app.get("/api/products", (req, res) => res.json({ data: [], note: "connect database later" }));
app.get("/api/templates", (req, res) => res.json({ data: [], note: "connect database later" }));
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) return res.status(400).json({ error: "name, email, message required" });
  // TODO: insert into database.inquiries
  return res.status(201).json({ ok: true, note: "dummy — saved nowhere yet" });
});

const PORT = process.env.PORT || 4000;
if (require.main === module) app.listen(PORT, () => console.log(`[reiso dummy backend] listening on :${PORT}`));
module.exports = app;
