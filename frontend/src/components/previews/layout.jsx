import { motion } from "framer-motion";
import { useState } from "react";
import { center } from "./_shared.jsx";

const GRADS = ["linear-gradient(135deg,#1b2333,#6b7fa3)", "linear-gradient(135deg,#2b1a3a,#a05fbf)", "linear-gradient(135deg,#10231f,#3fbf9a)", "linear-gradient(135deg,#2a1a12,#d98a3a)", "linear-gradient(135deg,#12131a,#5566a0)"];
const blk = (i, extra = {}) => ({ background: GRADS[i % 5], borderRadius: 12, ...extra });

export function EditorialLayout() {
  return (
    <div style={{ ...center, overflowY: "auto", minHeight: 240 }}>
      <div style={{ width: "85%", maxWidth: 460 }}>
        <h2 style={{ fontSize: 26, margin: "0 0 10px", letterSpacing: "-0.02em" }}>Editorial <em>lead</em></h2>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16 }}>
          <p style={{ margin: 0, fontSize: 13, color: "var(--muted)", lineHeight: 1.7 }}>A refined editorial grid mixes a large lead paragraph with offset captions, hairline rules and generous whitespace.</p>
          <div style={{ borderTop: "1px solid var(--line)", paddingTop: 10 }}>
            <p style={{ margin: 0, fontSize: 11, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--muted)" }}>Caption</p>
            <div style={{ ...blk(1), height: 70, marginTop: 10 }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function FullBleed() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, display: "grid", placeItems: "center" }}>
      <div style={{ width: "55%", height: 40, borderRadius: 10, background: "var(--surface)", border: "1px solid var(--line)" }} />
      <motion.div initial={{ opacity: 0.7 }} whileInView={{ opacity: 1 }} style={{ position: "absolute", left: 0, right: 0, top: "50%", transform: "translateY(-50%)", height: 110, backgroundImage: "linear-gradient(90deg,#2b1a3a,#a05fbf)", display: "grid", placeItems: "center", color: "#fff", fontWeight: 700 }}>
        Full-bleed section
      </motion.div>
    </div>
  );
}

export function OverlappingSection() {
  return (
    <div style={{ ...center, width: "100%" }}>
      <div style={{ position: "relative", width: "80%", maxWidth: 420 }}>
        <div style={{ ...blk(2), height: 150 }} />
        <div style={{ position: "relative", marginTop: -50, marginLeft: 30, width: "75%", padding: 18, borderRadius: 16, background: "var(--surface)", border: "1px solid var(--line)", boxShadow: "0 30px 60px rgba(0,0,0,.5)" }}>
          <b>Overlapping panel</b>
          <p style={{ margin: "6px 0 0", fontSize: 13, color: "var(--muted)" }}>This card overlaps the image above it.</p>
        </div>
      </div>
    </div>
  );
}

export function SplitScreenHero() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, display: "flex", flexWrap: "wrap" }}>
      <div style={{ flex: "1 1 240px", display: "grid", placeItems: "center", padding: 24 }}>
        <div>
          <h2 style={{ fontSize: 28, margin: "0 0 8px" }}>Split hero</h2>
          <p style={{ margin: 0, fontSize: 13, color: "var(--muted)" }}>Copy on one side, media on the other.</p>
        </div>
      </div>
      <div style={{ flex: "1 1 240px", ...blk(1) }} />
    </div>
  );
}

export function StickySidebar() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, display: "flex", gap: 14, padding: 16, overflow: "hidden" }}>
      <div style={{ width: 110, height: 150, position: "sticky", top: 16, ...blk(0), display: "grid", placeItems: "center", color: "#fff", fontSize: 12, fontWeight: 600 }}>Sidebar</div>
      <div style={{ flex: 1, overflowY: "auto", height: "100%" }}>
        {[0, 1, 2, 3].map((i) => <div key={i} style={{ height: 110, marginBottom: 10, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 12, display: "grid", placeItems: "center", color: "var(--muted)", fontSize: 13 }}>Content {i + 1}</div>)}
      </div>
    </div>
  );
}

export function HoverImageGrid() {
  const [i, setI] = useState(0);
  const rows = ["Atlas", "Nimbus", "Vector", "Ember"];
  return (
    <div style={{ ...center, gap: 24, width: "100%" }}>
      <div style={{ display: "grid", gap: 8 }}>
        {rows.map((r, n) => (
          <span key={r} onMouseEnter={() => setI(n)} style={{ fontSize: 16, fontWeight: 600, color: i === n ? "var(--fg)" : "var(--muted)", cursor: "pointer", transition: "color .3s" }}>{r}</span>
        ))}
      </div>
      <div style={{ position: "relative", width: 170, height: 130, borderRadius: 14, overflow: "hidden", background: "var(--surface)" }}>
        <motion.div key={i} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} style={{ ...blk(i), width: "100%", height: "100%" }} />
      </div>
    </div>
  );
}

export function ResponsiveTypeScale() {
  return (
    <div style={{ ...center, flexDirection: "column", gap: 6, width: "100%" }}>
      {[34, 26, 20, 15, 12].map((s, i) => (
        <span key={s} style={{ fontSize: `clamp(${s * 0.6}px, ${s / 10}vw + 8px, ${s}px)`, fontWeight: 700 - i * 100, letterSpacing: "-0.02em" }}>Modular type {5 - i}</span>
      ))}
    </div>
  );
}

export function DynamicWhitespace() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, display: "flex", flexDirection: "column", justifyContent: "center", gap: "clamp(8px, 4vh, 30px)", padding: "clamp(16px, 5vw, 40px)" }}>
      {[0, 1, 2].map((i) => <div key={i} style={{ ...blk(i), height: 50 }} />)}
    </div>
  );
}

export function LayeredDepth() {
  return (
    <div style={{ ...center }}>
      <div style={{ position: "relative", width: 240, height: 160 }}>
        <div style={{ ...blk(0), position: "absolute", inset: 0, opacity: 0.4, filter: "blur(6px)", transform: "scale(1.1)" }} />
        <div style={{ ...blk(2), position: "absolute", left: 24, top: 24, width: 140, height: 90, filter: "blur(2px)", opacity: 0.7 }} />
        <div style={{ ...blk(1), position: "absolute", left: 48, top: 44, width: 140, height: 90, boxShadow: "0 30px 60px rgba(0,0,0,.5)" }} />
      </div>
    </div>
  );
}

export function StickySplit() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, display: "flex", gap: 12, padding: 16 }}>
      <div style={{ flex: 1, position: "sticky", top: 16, height: 200, ...blk(3), display: "grid", placeItems: "center", color: "#fff", fontWeight: 700 }}>Pinned media</div>
      <div style={{ flex: 1, overflowY: "auto", height: 220 }}>
        {[0, 1, 2, 3].map((i) => <div key={i} style={{ height: 120, marginBottom: 10, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 12, display: "grid", placeItems: "center", color: "var(--muted)", fontSize: 13 }}>Step {i + 1}</div>)}
      </div>
    </div>
  );
}

export function AsymmetricColumns() {
  return (
    <div style={{ width: "100%", height: "100%", minHeight: 240, display: "grid", gridTemplateColumns: "2.2fr 1fr", gap: 20, padding: 24, alignItems: "baseline", maxWidth: 560, margin: "0 auto" }}>
      <div style={{ minWidth: 0 }}>
        <h2 style={{ fontSize: 28, margin: "0 0 10px", letterSpacing: "-0.02em", lineHeight: 1.1 }}>Wide lead story</h2>
        <p style={{ margin: 0, fontSize: 13, color: "var(--muted)", lineHeight: 1.7 }}>A spacious lead column carries the headline and body copy while a narrow rail holds supporting material in baseline alignment.</p>
        <div style={{ ...blk(0), height: 90, marginTop: 14 }} />
      </div>
      <div style={{ borderLeft: "1px solid var(--line)", paddingLeft: 14, minWidth: 0 }}>
        <p style={{ margin: 0, fontSize: 10, textTransform: "uppercase", letterSpacing: ".12em", color: "var(--muted)" }}>Rail caption</p>
        <div style={{ ...blk(2), height: 54, marginTop: 10 }} />
        <div style={{ display: "grid", gap: 6, marginTop: 12 }}>
          {["Overview", "Details", "Sources"].map((l, i) => (
            <span key={l} style={{ fontSize: 12, color: i === 0 ? "var(--fg)" : "var(--muted)", borderBottom: "1px solid var(--line)", paddingBottom: 6 }}>{l}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function OverlapHeadline({ reduce } = {}) {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, display: "grid", placeItems: "center", padding: 24, overflow: "hidden" }}>
      <div style={{ position: "relative", width: "min(420px, 90%)" }}>
        <div style={{ ...blk(1), height: 160 }} />
        <div style={{ position: "absolute", left: "-4%", top: "38%", zIndex: 2, width: "108%", pointerEvents: "none" }}>
          <motion.h2 initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ margin: 0, fontSize: "clamp(28px, 6vw, 44px)", lineHeight: 0.95, letterSpacing: "-0.03em", color: "#fff" }}>
            Overlapping <span style={{ color: "#ffd166", mixBlendMode: "screen" }}>blend</span> type
          </motion.h2>
        </div>
      </div>
    </div>
  );
}

export function CardStackSection({ reduce } = {}) {
  const [hovered, setHovered] = useState(1);
  const cards = ["First", "Second", "Third"];
  return (
    <div style={{ width: "100%", height: "100%", minHeight: 240, display: "grid", placeItems: "center", padding: 24 }}>
      <div style={{ position: "relative", width: "min(280px, 80%)", height: 180 }}>
        {cards.map((c, i) => (
          <motion.div key={c} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(1)} initial={false} animate={{ y: !reduce && hovered === i ? -8 : 0, scale: !reduce && hovered === i ? 1.02 : 1 }} transition={{ duration: 0.25 }} style={{ ...blk(i), position: "absolute", left: i * 18, top: i * 14, width: "78%", height: 120, display: "grid", placeItems: "center", color: "#fff", fontWeight: 700, boxShadow: "0 20px 40px rgba(0,0,0,.45)", zIndex: hovered === i ? 10 : 3 - i, cursor: "pointer" }}>
            {c}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function SplitFeatureList({ reduce } = {}) {
  const rows = [
    { t: "Capture", d: "Collect references and media in one calm inbox before you commit to a direction." },
    { t: "Compose", d: "Pair each visual with a short note so intent survives every handoff." },
    { t: "Ship", d: "Export the set as a guided sequence with dividers marking each beat." }
  ];
  return (
    <div style={{ width: "100%", height: "100%", minHeight: 240, overflowY: "auto", padding: 16 }}>
      <div style={{ maxWidth: 440, margin: "0 auto", width: "100%" }}>
        {rows.map((r, i) => (
          <motion.div key={r.t} initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", flexDirection: i % 2 ? "row-reverse" : "row", padding: "14px 0", borderBottom: i < 2 ? "1px solid var(--line)" : "none" }}>
            <div style={{ ...blk(i), flex: "1 1 140px", height: 72 }} />
            <div style={{ flex: "1 1 180px", minWidth: 0 }}>
              <b style={{ fontSize: 14 }}>{r.t}</b>
              <p style={{ margin: "4px 0 0", fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>{r.d}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function TimelineLayout({ reduce } = {}) {
  const steps = [
    { t: "Kickoff", d: "Align on scope and constraints." },
    { t: "Draft", d: "First pass with loose ends." },
    { t: "Review", d: "Critique and tighten the arc." },
    { t: "Launch", d: "Ship the polished sequence." }
  ];
  return (
    <div style={{ width: "100%", height: "100%", minHeight: 240, overflowY: "auto", padding: 20 }}>
      <div style={{ position: "relative", maxWidth: 360, margin: "0 auto", width: "100%", paddingLeft: 28 }}>
        <div style={{ position: "absolute", left: 10, top: 6, bottom: 6, width: 2, background: "var(--line)", borderRadius: 2 }} />
        {steps.map((s, i) => (
          <div key={s.t} style={{ position: "relative", marginBottom: i === 3 ? 0 : 14 }}>
            <motion.div initial={{ scale: 0.7, opacity: 0.5 }} whileInView={reduce ? { scale: 1, opacity: 1 } : { scale: 1.2, opacity: 1, backgroundColor: "#a05fbf" }} viewport={{ once: true }} transition={{ duration: 0.35 }} style={{ position: "absolute", left: -26, top: 14, width: 12, height: 12, borderRadius: "50%", background: "#5566a0", border: "2px solid var(--surface)", boxShadow: "0 0 0 2px var(--line)" }} />
            <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 12, padding: "10px 12px" }}>
              <b style={{ fontSize: 13 }}>{s.t}</b>
              <p style={{ margin: "4px 0 0", fontSize: 12, color: "var(--muted)" }}>{s.d}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function StickyTable() {
  const [hover, setHover] = useState(-1);
  const rows = [
    { name: "Ava Chen", role: "Design", status: "Active" },
    { name: "Liam Park", role: "Eng", status: "Review" },
    { name: "Mia Ross", role: "PM", status: "Active" },
    { name: "Noah Kim", role: "Design", status: "Idle" },
    { name: "Zoe Ali", role: "Eng", status: "Active" },
    { name: "Eli Fox", role: "Ops", status: "Review" },
    { name: "Ivy Tran", role: "Design", status: "Active" },
    { name: "Omar Reyes", role: "Eng", status: "Idle" },
    { name: "Sana Kapoor", role: "PM", status: "Review" },
    { name: "Tom Becker", role: "Ops", status: "Active" },
    { name: "Una Walsh", role: "Design", status: "Review" },
    { name: "Vic Romano", role: "Eng", status: "Active" }
  ];
  return (
    <div style={{ width: "100%", height: "100%", minHeight: 240, padding: 16, display: "flex", justifyContent: "center" }}>
      <div style={{ width: "min(420px, 100%)", maxHeight: "100%", overflowY: "auto", border: "1px solid var(--line)", borderRadius: 12 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr>
              {["Name", "Role", "Status"].map((h) => (
                <th key={h} style={{ position: "sticky", top: 0, zIndex: 1, background: "#1b2333", color: "#fff", textAlign: "left", padding: "10px 12px" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.name} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(-1)} style={{ background: hover === i ? "rgba(160,95,191,.25)" : i % 2 ? "var(--surface)" : "transparent" }}>
                <td style={{ padding: "9px 12px", borderTop: "1px solid var(--line)" }}>{r.name}</td>
                <td style={{ padding: "9px 12px", borderTop: "1px solid var(--line)", color: "var(--muted)" }}>{r.role}</td>
                <td style={{ padding: "9px 12px", borderTop: "1px solid var(--line)", color: "var(--muted)" }}>{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function DashboardGrid({ reduce } = {}) {
  const bars = [40, 70, 55, 90, 65, 80, 50, 95];
  const activity = ["Deploy finished", "Invite accepted", "Comment added"];
  return (
    <div style={{ width: "100%", height: "100%", minHeight: 240, padding: 14, display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gridAutoRows: "minmax(70px, auto)", alignContent: "stretch" }}>
      <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 12, padding: 12 }}>
        <p style={{ margin: 0, fontSize: 10, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--muted)" }}>Revenue</p>
        <b style={{ fontSize: 22 }}>$48k</b>
      </div>
      <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 12, padding: 12 }}>
        <p style={{ margin: 0, fontSize: 10, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--muted)" }}>Active</p>
        <b style={{ fontSize: 22 }}>1,204</b>
      </div>
      <div style={{ gridColumn: "span 2", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 12, padding: 12 }}>
        <p style={{ margin: "0 0 8px", fontSize: 10, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--muted)" }}>Traffic</p>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 44 }}>
          {bars.map((h, i) => (
            <motion.div key={i} initial={{ scaleY: reduce ? 1 : 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.5, delay: reduce ? 0 : i * 0.05 }} style={{ flex: 1, height: `${h}%`, background: GRADS[i % 5], transformOrigin: "bottom", borderRadius: 3 }} />
          ))}
        </div>
      </div>
      <div style={{ gridColumn: "1 / -1", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 12, padding: 12 }}>
        <p style={{ margin: "0 0 6px", fontSize: 10, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--muted)" }}>Activity</p>
        <div style={{ display: "grid", gap: 6 }}>
          {activity.map((a) => (
            <div key={a} style={{ display: "flex", justifyContent: "space-between", gap: 8, fontSize: 12, borderTop: "1px solid var(--line)", paddingTop: 6 }}>
              <span>{a}</span>
              <span style={{ color: "var(--muted)" }}>2m</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function NarrowColumn() {
  return (
    <div style={{ width: "100%", height: "100%", minHeight: 240, overflowY: "auto", display: "flex", justifyContent: "center", padding: 24 }}>
      <div style={{ maxWidth: 380, width: "100%", textAlign: "left" }}>
        <p style={{ margin: 0, fontSize: 11, textTransform: "uppercase", letterSpacing: ".14em", color: "var(--muted)" }}>Eyebrow label</p>
        <h2 style={{ fontSize: 30, margin: "8px 0 12px", letterSpacing: "-0.02em", lineHeight: 1.15 }}>A quiet narrow column</h2>
        <p style={{ margin: "0 0 14px", fontSize: 14, lineHeight: 1.9 }}>
          <span style={{ float: "left", fontSize: 46, lineHeight: 0.85, paddingRight: 10, fontWeight: 800 }}>A</span>
          narrow measure keeps each line short and calm, letting the reader settle into a steady rhythm without distraction.
        </p>
        <p style={{ margin: 0, fontSize: 14, color: "var(--muted)", lineHeight: 1.9 }}>A second paragraph continues the thought with generous leading, giving the page room to breathe around every sentence.</p>
      </div>
    </div>
  );
}

export function ImageTextOverlay() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, ...blk(1) }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.15) 55%, transparent)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: 20, display: "flex", flexDirection: "column", gap: 6, color: "#fff" }}>
        <h3 style={{ margin: 0, fontSize: 22, letterSpacing: "-0.01em" }}>Sunset over the grid</h3>
        <p style={{ margin: 0, fontSize: 12, opacity: 0.8 }}>A full-bleed image with a bottom scrim for legibility.</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
          <span style={{ background: "#fff", color: "#111", fontSize: 12, fontWeight: 700, padding: "8px 14px", borderRadius: 999 }}>Get started</span>
          <span style={{ border: "1px solid rgba(255,255,255,.5)", fontSize: 12, fontWeight: 600, padding: "8px 14px", borderRadius: 999 }}>Learn more</span>
        </div>
      </div>
    </div>
  );
}

export function CollageLayout({ reduce } = {}) {
  const [hovered, setHovered] = useState(-1);
  const spots = [
    { left: "6%", top: "10%", width: "42%", height: 96, rotate: -6 },
    { left: "52%", top: "6%", width: "38%", height: 72, rotate: 4 },
    { left: "10%", top: "52%", width: "34%", height: 84, rotate: 3 },
    { left: "50%", top: "46%", width: "44%", height: 110, rotate: -3 }
  ];
  const labels = ["A", "B", "C", "D"];
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflow: "hidden" }}>
      {spots.map((s, i) => (
        <motion.div key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(-1)} initial={false} animate={{ y: reduce ? 0 : [0, -8, 0], rotate: hovered === i ? 0 : s.rotate }} transition={reduce ? { duration: 0.2 } : { y: { duration: 3 + i * 0.6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }, rotate: { duration: 0.25 } }} style={{ ...blk(i), position: "absolute", left: s.left, top: s.top, width: s.width, height: s.height, boxShadow: "0 20px 40px rgba(0,0,0,.4)", display: "grid", placeItems: "center", color: "#fff", fontWeight: 700, cursor: "pointer" }}>
          {labels[i]}
        </motion.div>
      ))}
    </div>
  );
}
