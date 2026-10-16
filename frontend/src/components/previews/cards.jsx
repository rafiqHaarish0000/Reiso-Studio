import { motion } from "framer-motion";
import { ArrowRight, Layers, Quote, Sparkles, Star, TrendingUp } from "lucide-react";
import { useState } from "react";
import { EASE, center, row, useCountUp } from "./_shared.jsx";

const card = { width: 240, padding: 20, borderRadius: 16, background: "var(--surface)", border: "1px solid var(--line)", color: "var(--fg)" };
const GRADS = ["linear-gradient(135deg,#1b2333,#6b7fa3)", "linear-gradient(135deg,#2b1a3a,#a05fbf)", "linear-gradient(135deg,#10231f,#3fbf9a)", "linear-gradient(135deg,#2a1a12,#d98a3a)"];

export function StaggeredCards({ reduce }) {
  const items = [0, 1, 2, 3, 4, 5];
  return (
    <div style={center}>
      <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.08 } } }} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
        {items.map((i) => (
          <motion.div key={i} variants={{ hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }} transition={{ duration: 0.5, ease: EASE }} style={{ width: 80, height: 70, borderRadius: 12, background: "var(--surface)", border: "1px solid var(--line)", display: "grid", placeItems: "center" }}>
            <Layers size={18} color="var(--accent)" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export function LiftHoverCards() {
  return (
    <div style={center}>
      <motion.div whileHover={{ y: -10, boxShadow: "0 30px 60px rgba(0,0,0,.5)" }} style={{ ...card, cursor: "pointer" }}>
        <Sparkles size={20} color="var(--accent)" />
        <h3 style={{ margin: "12px 0 6px", fontSize: 16 }}>Hover lift</h3>
        <p style={{ margin: 0, fontSize: 13, color: "var(--muted)" }}>Rises and casts a deeper shadow.</p>
      </motion.div>
    </div>
  );
}

export function StackingScrollCards() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflowY: "auto", padding: 16 }}>
      <div style={{ height: 40 }} />
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ position: "sticky", top: 20, marginBottom: 20, height: 150, borderRadius: 16, background: GRADS[i], display: "flex", alignItems: "flex-end", padding: 16, color: "#fff", fontWeight: 700, boxShadow: "0 20px 40px rgba(0,0,0,.4)", transform: `scale(${1 - (2 - i) * 0.04})` }}>
          Card {i + 1}
        </div>
      ))}
      <div style={{ height: 160 }} />
    </div>
  );
}

export function HorizontalSwipeCards() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, display: "flex", alignItems: "center" }}>
      <div style={{ display: "flex", gap: 14, overflowX: "auto", padding: "0 24px", width: "100%", scrollSnapType: "x mandatory" }}>
        {GRADS.map((g, i) => (
          <div key={i} style={{ flex: "none", width: 200, height: 140, borderRadius: 14, background: g, scrollSnapAlign: "center" }} />
        ))}
      </div>
    </div>
  );
}

export function ExpandingFeatureCard() {
  const [active, setActive] = useState(0);
  return (
    <div style={{ ...center, gap: 10, alignItems: "stretch", width: "100%" }}>
      {[0, 1, 2].map((i) => (
        <motion.div key={i} onMouseEnter={() => setActive(i)} onClick={() => setActive(i)} animate={{ flexGrow: active === i ? 2.4 : 1 }} transition={{ duration: 0.4, ease: EASE }} style={{ position: "relative", width: 120, minWidth: 70, borderRadius: 16, background: GRADS[i], overflow: "hidden", cursor: "pointer" }}>
          <motion.span animate={{ opacity: active === i ? 1 : 0 }} style={{ position: "absolute", left: 14, bottom: 14, color: "#fff", fontWeight: 700 }}>Card {i + 1}</motion.span>
        </motion.div>
      ))}
    </div>
  );
}

export function Flip3DCard() {
  const [f, setF] = useState(false);
  return (
    <div style={{ ...center, perspective: 900 }}>
      <div onClick={() => setF((v) => !v)} style={{ position: "relative", width: 250, height: 160, transformStyle: "preserve-3d", transform: f ? "rotateY(180deg)" : "none", transition: "transform .7s cubic-bezier(.22,1,.36,1)", cursor: "pointer" }}>
        <div style={{ ...card, position: "absolute", inset: 0, backfaceVisibility: "hidden", display: "grid", placeItems: "center", width: "100%" }}>Front — click</div>
        <div style={{ ...card, position: "absolute", inset: 0, backfaceVisibility: "hidden", transform: "rotateY(180deg)", display: "grid", placeItems: "center", background: "var(--accent)", color: "#0b0b11", fontWeight: 700, width: "100%" }}>Back side</div>
      </div>
    </div>
  );
}

export function SpotlightCard() {
  const [p, setP] = useState({ x: 50, y: 50, on: false });
  return (
    <div style={center}>
      <div
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setP({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100, on: true });
        }}
        onMouseLeave={() => setP((v) => ({ ...v, on: false }))}
        style={{ ...card, position: "relative", overflow: "hidden" }}
      >
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(200px circle at ${p.x}% ${p.y}%, rgba(124,156,255,.28), transparent 60%)`, opacity: p.on ? 1 : 0, transition: "opacity .3s" }} />
        <h3 style={{ position: "relative", margin: "0 0 6px", fontSize: 16 }}>Spotlight</h3>
        <p style={{ position: "relative", margin: 0, fontSize: 13, color: "var(--muted)" }}>A glow follows your cursor.</p>
      </div>
    </div>
  );
}

export function BentoGrid() {
  return (
    <div style={center}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gridTemplateRows: "1fr 1fr", gap: 10, width: "80%", maxWidth: 420, height: 200 }}>
        <div style={{ gridRow: "span 2", borderRadius: 16, background: GRADS[1], padding: 16, color: "#fff", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <b>Big tile</b><span style={{ fontSize: 12, opacity: 0.8 }}>spans two rows</span>
        </div>
        <div style={{ borderRadius: 16, background: "var(--surface)", border: "1px solid var(--line)", padding: 14, fontSize: 13 }}>Tile B</div>
        <div style={{ borderRadius: 16, background: GRADS[2], padding: 14, color: "#fff", fontSize: 13 }}>Tile C</div>
      </div>
    </div>
  );
}

export function AsymPortfolioGrid() {
  return (
    <div style={{ ...center, overflowY: "auto", minHeight: 240, flexDirection: "column" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, width: "80%", maxWidth: 420 }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ ...{ borderRadius: 14, backgroundImage: GRADS[i % 4] }, height: i % 2 === 0 ? 130 : 90, marginTop: i % 3 === 0 ? 20 : 0 }} />
        ))}
      </div>
    </div>
  );
}

export function StickyServices() {
  const [active, setActive] = useState(0);
  const items = ["Design", "Motion", "Build"];
  return (
    <div style={{ ...center, width: "100%" }}>
      <div style={{ display: "flex", gap: 20 }}>
        <div style={{ display: "grid", gap: 10 }}>
          {items.map((s, i) => (
            <span key={s} onMouseEnter={() => setActive(i)} style={{ fontSize: 18, fontWeight: 700, color: active === i ? "var(--fg)" : "var(--muted)", transition: "color .3s", cursor: "pointer" }}>{s}</span>
          ))}
        </div>
        <div style={{ width: 180, height: 120, borderRadius: 14, background: GRADS[active], display: "grid", placeItems: "center", color: "#fff", fontWeight: 600 }}>
          {items[active]}
        </div>
      </div>
    </div>
  );
}

export function TiltCard() {
  const [t, setT] = useState({ x: 50, y: 50, on: false });
  const rotateY = t.on ? ((t.x - 50) / 50) * 14 : 0;
  const rotateX = t.on ? ((50 - t.y) / 50) * 14 : 0;
  return (
    <div style={{ ...center, perspective: 800 }}>
      <motion.div
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setT({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100, on: true });
        }}
        onMouseLeave={() => setT((v) => ({ ...v, on: false }))}
        animate={{ rotateX, rotateY }}
        transition={{ duration: 0.25, ease: EASE }}
        style={{ ...card, position: "relative", overflow: "hidden", transformStyle: "preserve-3d", cursor: "pointer" }}
      >
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(220px circle at ${t.x}% ${t.y}%, rgba(255,255,255,.22), transparent 65%)`, opacity: t.on ? 1 : 0, transition: "opacity .3s" }} />
        <Sparkles size={20} color="var(--accent)" />
        <h3 style={{ position: "relative", margin: "12px 0 6px", fontSize: 16 }}>Tilt me</h3>
        <p style={{ position: "relative", margin: 0, fontSize: 13, color: "var(--muted)" }}>Card follows your pointer.</p>
      </motion.div>
    </div>
  );
}

export function GradientBorderCard({ reduce }) {
  return (
    <div style={center}>
      <div style={{ borderRadius: 18, padding: 2, background: "conic-gradient(from 0deg, #7c9cff, #a05fbf, #3fbf9a, #d98a3a, #7c9cff)", animation: reduce ? "none" : "ml-spinbg 4s linear infinite" }}>
        <div style={{ ...card, border: "none", width: 230 }}>
          <h3 style={{ margin: "0 0 6px", fontSize: 16 }}>Gradient border</h3>
          <p style={{ margin: 0, fontSize: 13, color: "var(--muted)" }}>Rotating conic glow frames this card.</p>
        </div>
      </div>
    </div>
  );
}

export function RevealHoverCard() {
  const [h, setH] = useState(false);
  return (
    <div style={center}>
      <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ ...card, padding: 0, overflow: "hidden", position: "relative", cursor: "pointer" }}>
        <div style={{ height: 130, background: GRADS[1], filter: h ? "brightness(.55)" : "brightness(1)", transition: "filter .35s" }} />
        <div style={{ padding: 16, textAlign: "left" }}>
          <b style={{ fontSize: 15 }}>Alpine retreat</b>
          <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>Hover to reveal more</div>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: 14, background: "rgba(8,10,18,.85)", color: "#fff", fontSize: 13, textAlign: "left", transform: h ? "translateY(0)" : "translateY(100%)", transition: "transform .4s cubic-bezier(.22,1,.36,1)" }}>
          Hidden description slides up over the dimmed image.
        </div>
      </div>
    </div>
  );
}

export function NumberedFeatureList() {
  const [h, setH] = useState(-1);
  const items = [
    { title: "Plan the shot", sub: "Boards and treatments" },
    { title: "Design the look", sub: "Color and typography" },
    { title: "Animate scenes", sub: "Motion and timing" },
    { title: "Ship the story", sub: "Export and deliver" },
  ];
  return (
    <div style={center}>
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }} style={{ width: "100%", maxWidth: 340, textAlign: "left" }}>
        {items.map((t, i) => (
          <motion.div
            key={t.title}
            variants={{ hidden: { opacity: 0, x: -18 }, show: { opacity: 1, x: 0 } }}
            transition={{ duration: 0.5, ease: EASE }}
            onMouseEnter={() => setH(i)}
            onMouseLeave={() => setH(-1)}
            style={{ position: "relative", display: "flex", gap: 14, alignItems: "center", padding: "12px 12px 12px 16px", borderRadius: 12, background: h === i ? "var(--surface)" : "transparent", border: "1px solid", borderColor: h === i ? "var(--line)" : "transparent", transition: "background .3s, border-color .3s", cursor: "pointer", overflow: "hidden" }}
          >
            <motion.span animate={{ scaleY: h === i ? 1 : 0 }} transition={{ duration: 0.3, ease: EASE }} style={{ position: "absolute", left: 0, top: 8, bottom: 8, width: 3, borderRadius: 3, background: "var(--accent)" }} />
            <span style={{ fontSize: 26, fontWeight: 800, color: h === i ? "var(--accent)" : "var(--muted)", transition: "color .3s", minWidth: 44 }}>0{i + 1}</span>
            <span>
              <span style={{ display: "block", fontWeight: 700, fontSize: 14 }}>{t.title}</span>
              <span style={{ display: "block", fontSize: 12, color: "var(--muted)" }}>{t.sub}</span>
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export function TestimonialGrid() {
  const data = [
    { init: "AK", name: "Ava K.", text: "Shipped in half the time." },
    { init: "JM", name: "Jon M.", text: "Motion feels effortless." },
    { init: "RS", name: "Ria S.", text: "Clients loved the polish." },
    { init: "TP", name: "Tom P.", text: "Our hero finally converts." },
  ];
  return (
    <div style={center}>
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, width: "100%", maxWidth: 400 }}>
        {data.map((d) => (
          <motion.div
            key={d.name}
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: EASE }}
            whileHover={{ y: -6 }}
            style={{ ...card, width: "auto", padding: 14, textAlign: "left" }}
          >
            <Quote size={14} color="var(--accent)" />
            <p style={{ margin: "8px 0", fontSize: 12, lineHeight: 1.5 }}>{d.text}</p>
            <div style={{ display: "flex", gap: 2, marginBottom: 8 }}>
              {[0, 1, 2, 3, 4].map((s) => (
                <Star key={s} size={10} color="var(--accent)" fill="var(--accent)" />
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 26, height: 26, borderRadius: "50%", background: "var(--accent)", color: "#0b0b11", fontSize: 10, fontWeight: 800, display: "grid", placeItems: "center" }}>{d.init}</span>
              <b style={{ fontSize: 12 }}>{d.name}</b>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export function MasonryGrid() {
  const cols = [[140, 80, 110], [90, 150, 70], [120, 90, 130]];
  return (
    <div style={center}>
      <div style={{ display: "flex", gap: 8, alignItems: "flex-start", width: "100%", maxWidth: 360, height: 220 }}>
        {cols.map((col, ci) => (
          <div key={ci} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
            {col.map((hh, ri) => (
              <motion.div
                key={ri}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, ease: EASE, delay: (ci * 3 + ri) * 0.07 }}
                style={{ height: hh, borderRadius: 12, background: GRADS[(ci * 3 + ri) % 4] }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function StatCards({ reduce }) {
  const [run, setRun] = useState(false);
  const a = useCountUp(128, run, reduce);
  const b = useCountUp(96, run, reduce);
  const c = useCountUp(12, run, reduce);
  const stats = [
    { v: Math.round(a), suffix: "k+", label: "Active users" },
    { v: Math.round(b), suffix: "%", label: "Retention" },
    { v: Math.round(c), suffix: "x", label: "Growth" },
  ];
  return (
    <div style={{ ...row, gap: 10 }}>
      <motion.div onViewportEnter={() => setRun(true)} style={{ display: "flex", gap: 10 }}>
        {stats.map((s) => (
          <div key={s.label} style={{ ...card, width: 108, padding: 14, textAlign: "left" }}>
            <TrendingUp size={16} color="var(--accent)" />
            <div style={{ marginTop: 8, fontSize: 24, fontWeight: 800 }}>{s.v}{s.suffix}</div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>{s.label}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function ImageOverlayCards() {
  const [h, setH] = useState(-1);
  return (
    <div style={{ ...row, gap: 12 }}>
      {[0, 1].map((i) => (
        <div key={i} onMouseEnter={() => setH(i)} onMouseLeave={() => setH(-1)} style={{ position: "relative", width: 160, height: 180, borderRadius: 14, overflow: "hidden", cursor: "pointer", border: "1px solid var(--line)" }}>
          <div style={{ position: "absolute", inset: 0, background: GRADS[(i + 1) % 4], transform: h === i ? "scale(1.05)" : "scale(1)", filter: h === i ? "brightness(.55)" : "brightness(1)", transition: "transform .45s cubic-bezier(.22,1,.36,1), filter .35s" }} />
          <div style={{ position: "absolute", left: 12, right: 12, bottom: 12, color: "#fff", textAlign: "left", transform: h === i ? "translateY(-4px)" : "translateY(0)", transition: "transform .35s" }}>
            <b style={{ fontSize: 15 }}>Peak {i + 1}</b>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, opacity: h === i ? 1 : 0.75, transition: "opacity .3s" }}>
              Explore <ArrowRight size={14} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function CardRing({ reduce }) {
  const items = [0, 1, 2, 3, 4];
  return (
    <div style={center}>
      <div style={{ position: "relative", width: 250, height: 190 }}>
        <motion.div animate={reduce ? {} : { rotate: 360 }} transition={{ duration: 26, repeat: Infinity, ease: "linear" }} style={{ position: "absolute", inset: 0 }}>
          {items.map((n, i) => {
            const a = (i / items.length) * Math.PI * 2;
            const x = Math.cos(a) * 88;
            const y = Math.sin(a) * 62;
            return (
              <div key={n} style={{ position: "absolute", left: "50%", top: "50%", width: 74, padding: 10, borderRadius: 12, background: "var(--surface)", border: "1px solid var(--line)", color: "var(--fg)", fontSize: 12, fontWeight: 700, textAlign: "center", transform: `translate(-50%,-50%) translate(${x}px, ${y}px) scale(${i === 0 ? 1.15 : 1})`, boxShadow: i === 0 ? "0 14px 30px rgba(0,0,0,.4)" : "none" }}>
                Card {n + 1}
              </div>
            );
          })}
        </motion.div>
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 44, height: 44, borderRadius: "50%", background: "var(--accent)", display: "grid", placeItems: "center" }}>
          <Layers size={18} color="#0b0b11" />
        </div>
      </div>
    </div>
  );
}

export function CardDeck() {
  const [order, setOrder] = useState([0, 1, 2, 3]);
  const cycle = () => setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)]);
  return (
    <div style={{ ...center, flexDirection: "column", gap: 12 }}>
      <div style={{ position: "relative", width: 250, height: 160 }}>
        {[0, 1, 2, 3].map((id) => {
          const pos = order.indexOf(id);
          const off = pos - 1.5;
          const isTop = pos === order.length - 1;
          return (
            <motion.div
              key={id}
              animate={{ x: off * 22, rotate: off * 10, y: (3 - pos) * 8, scale: isTop ? 1 : 0.94 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              onClick={() => { if (isTop) cycle(); }}
              style={{ position: "absolute", left: 55, top: 10, width: 140, height: 110, borderRadius: 14, background: GRADS[id % 4], display: "grid", placeItems: "center", color: "#fff", fontWeight: 700, cursor: isTop ? "pointer" : "default", boxShadow: "0 16px 30px rgba(0,0,0,.35)", zIndex: pos + 1 }}
            >
              Card {id + 1}
            </motion.div>
          );
        })}
      </div>
      <button onClick={cycle} style={{ padding: "8px 16px", borderRadius: 10, border: "1px solid var(--line)", background: "var(--surface)", color: "var(--fg)", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
        Next card
      </button>
    </div>
  );
}
