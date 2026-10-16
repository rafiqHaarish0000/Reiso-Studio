import { motion } from "framer-motion";
import { ArrowLeft, Bell, ChevronRight, Command, Home, LayoutGrid, Menu, Search, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { EASE, center, useAutoScroll } from "./_shared.jsx";

const LINKS = ["Home", "Work", "Studio", "Journal"];
const navStyle = { display: "flex", gap: 18, fontSize: 13, color: "var(--muted)" };

export function GlassNavbar() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 240 }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(120deg,#3a2a6b,#1f6b6b,#6b2f3a)" }} />
      <div style={{ position: "absolute", top: 16, left: 16, right: 16, padding: "12px 16px", borderRadius: 14, background: "rgba(255,255,255,.12)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,.25)", display: "flex", justifyContent: "space-between", alignItems: "center", color: "#fff" }}>
        <b style={{ fontSize: 14 }}>Glass/Nav</b>
        <div style={{ ...navStyle, color: "rgba(255,255,255,.85)" }}>{LINKS.map((l) => <span key={l}>{l}</span>)}</div>
        <span style={{ fontSize: 12, border: "1px solid rgba(255,255,255,.4)", borderRadius: 999, padding: "4px 10px" }}>CTA</span>
      </div>
    </div>
  );
}

export function HideOnScrollNavbar({ reduce, paused }) {
  const [hidden, setHidden] = useState(false);
  const [last, setLast] = useState(0);
  const ref = useRef(null);
  useAutoScroll(ref, paused, reduce);
  return (
    <div ref={ref} onScroll={(e) => { const y = e.currentTarget.scrollTop; setHidden(y > last && y > 40); setLast(y); }} style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflowY: "auto" }}>
      <motion.div animate={{ y: hidden ? -70 : 0 }} transition={{ duration: 0.3, ease: EASE }} style={{ position: "sticky", top: 0, zIndex: 2, display: "flex", justifyContent: "space-between", padding: "14px 18px", background: "var(--surface)", borderBottom: "1px solid var(--line)" }}>
        <b>Hide on scroll</b>
        <div style={navStyle}>{LINKS.slice(0, 2).map((l) => <span key={l}>{l}</span>)}</div>
      </motion.div>
      <div style={{ height: 320 }} />
    </div>
  );
}

export function ScrollAwareNavbar({ reduce, paused }) {
  const [y, setY] = useState(0);
  const small = y > 20;
  const ref = useRef(null);
  useAutoScroll(ref, paused, reduce);
  return (
    <div ref={ref} onScroll={(e) => setY(e.currentTarget.scrollTop)} style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflowY: "auto" }}>
      <div style={{ position: "sticky", top: 0, zIndex: 2, display: "flex", justifyContent: "space-between", alignItems: "center", padding: small ? "8px 18px" : "18px 18px", background: small ? "var(--surface)" : "transparent", borderBottom: `1px solid ${small ? "var(--line)" : "transparent"}`, transition: "all .3s ease" }}>
        <b>Scroll aware</b>
        <div style={{ ...navStyle, gap: small ? 12 : 24, transition: "gap .3s" }}>{LINKS.map((l) => <span key={l}>{l}</span>)}</div>
      </div>
      <div style={{ height: 320 }} />
    </div>
  );
}

export function NavIndicator() {
  const [active, setActive] = useState(1);
  return (
    <div style={center}>
      <div style={{ display: "flex", gap: 6, padding: 6, borderRadius: 999, background: "var(--surface)", border: "1px solid var(--line)" }}>
        {LINKS.map((l, i) => (
          <button key={l} onMouseEnter={() => setActive(i)} onClick={() => setActive(i)} style={{ position: "relative", border: "none", background: "transparent", padding: "8px 16px", color: active === i ? "#0b0b11" : "var(--muted)", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
            {active === i && <motion.span layoutId="navpill" style={{ position: "absolute", inset: 0, borderRadius: 999, background: "var(--accent)", zIndex: -1 }} transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
            {l}
          </button>
        ))}
      </div>
    </div>
  );
}

export function FullScreenMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflow: "hidden", background: "var(--bg)" }}>
      <button onClick={() => setOpen((v) => !v)} style={{ position: "absolute", top: 14, right: 16, zIndex: 3, background: "none", border: "none", color: "var(--fg)", cursor: "pointer" }}>
        {open ? <X /> : <Menu />}
      </button>
      <motion.div initial={false} animate={{ clipPath: open ? "circle(150% at 92% 12%)" : "circle(0% at 92% 12%)" }} transition={{ duration: 0.5, ease: EASE }} style={{ position: "absolute", inset: 0, background: "var(--accent)", display: "grid", placeItems: "center" }}>
        <div style={{ display: "grid", gap: 16, textAlign: "center" }}>
          {["Home", "Work", "Studio", "Contact"].map((l, i) => (
            <motion.span key={l} animate={{ opacity: open ? 1 : 0, y: open ? 0 : 20 }} transition={{ delay: open ? 0.15 + i * 0.07 : 0 }} style={{ fontSize: 34, fontWeight: 700, color: "#0b0b11" }}>{l}</motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export function MegaMenu() {
  const cols = [["Product", ["Overview", "Features", "Pricing"]], ["Company", ["About", "Careers", "Blog"]], ["Resources", ["Docs", "Guides", "Support"]]];
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, display: "flex", justifyContent: "center", paddingTop: 24 }}>
      <div style={{ position: "relative" }} className="ml-mega-wrap">
        <style>{`.ml-mega-wrap:hover .ml-mega-panel{opacity:1;transform:translate(-50%,0)}`}</style>
        <span style={{ ...navStyle, color: "var(--fg)", fontWeight: 600, cursor: "default" }}>Menu ▾</span>
        <div style={{ position: "absolute", top: 28, left: "50%", transform: "translate(-50%,8px)", width: 420, padding: 18, borderRadius: 16, background: "var(--surface)", border: "1px solid var(--line)", boxShadow: "0 30px 60px rgba(0,0,0,.5)", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, opacity: 0, transition: "all .25s ease" }} className="ml-mega-panel">
          {cols.map(([h, items]) => (
            <div key={h}>
              <p style={{ margin: "0 0 8px", fontSize: 11, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--muted)" }}>{h}</p>
              {items.map((it) => <p key={it} style={{ margin: "6px 0", fontSize: 13, color: "var(--fg)" }}>{it}</p>)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MorphMenuIcon() {
  const [open, setOpen] = useState(false);
  const bar = { width: 22, height: 2, background: "var(--fg)", borderRadius: 2, position: "absolute", left: 0, transition: "all .3s ease" };
  return (
    <div style={center}>
      <button onClick={() => setOpen((v) => !v)} aria-label="menu" style={{ position: "relative", width: 44, height: 44, borderRadius: 999, border: "1px solid var(--line)", background: "var(--surface)", cursor: "pointer" }}>
        <span style={{ ...bar, top: open ? 21 : 15, transform: open ? "rotate(45deg)" : "none", left: 11 }} />
        <span style={{ ...bar, top: 21, opacity: open ? 0 : 1, left: 11 }} />
        <span style={{ ...bar, top: open ? 21 : 27, transform: open ? "rotate(-45deg)" : "none", left: 11 }} />
      </button>
    </div>
  );
}

export function FloatingPillNav() {
  const [active, setActive] = useState(0);
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, display: "flex", justifyContent: "center", paddingTop: 20 }}>
      <div style={{ display: "flex", gap: 4, padding: "8px 10px", borderRadius: 999, background: "var(--surface)", border: "1px solid var(--line)", boxShadow: "0 20px 40px rgba(0,0,0,.4)" }}>
        {LINKS.map((l, i) => (
          <button key={l} onClick={() => setActive(i)} style={{ border: "none", borderRadius: 999, padding: "8px 16px", fontSize: 13, cursor: "pointer", background: active === i ? "var(--accent)" : "transparent", color: active === i ? "#0b0b11" : "var(--muted)", fontWeight: 600 }}>{l}</button>
        ))}
      </div>
    </div>
  );
}

export function ActiveSectionTracking({ reduce, paused }) {
  const sections = ["Overview", "Features", "Pricing"];
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  useAutoScroll(ref, paused, reduce);
  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    const p = max > 0 ? el.scrollTop / max : 0;
    setActive(Math.min(sections.length - 1, Math.round(p * (sections.length - 1))));
  };
  return (
    <div ref={ref} onScroll={onScroll} style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflowY: "auto" }}>
      <div style={{ position: "sticky", top: 0, zIndex: 2, display: "flex", gap: 16, padding: "12px 16px", background: "var(--surface)", borderBottom: "1px solid var(--line)" }}>
        {sections.map((s, i) => <span key={s} style={{ fontSize: 12, color: active === i ? "var(--accent)" : "var(--muted)", fontWeight: 600 }}>{s}</span>)}
      </div>
      {["Section One", "Section Two", "Section Three"].map((s) => <section key={s} style={{ height: 180, display: "grid", placeItems: "center", borderBottom: "1px dashed var(--line)" }}><span style={{ color: "var(--muted)" }}>{s}</span></section>)}
    </div>
  );
}

export function BreadcrumbAnim() {
  const [i, setI] = useState(4);
  useEffect(() => { const id = setInterval(() => setI((v) => (v === 4 ? 1 : v + 1)), 1200); return () => clearInterval(id); }, []);
  const items = ["Home", "Library", "Motion", "Breadcrumbs"];
  return (
    <div style={center}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {items.map((it, idx) => (
          <span key={it} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <motion.span animate={{ opacity: idx <= i ? 1 : 0.3 }} transition={{ duration: 0.3 }} style={{ fontSize: 13, color: "var(--fg)" }}>{it}</motion.span>
            {idx < items.length - 1 && <ChevronRight size={14} color="var(--muted)" className={idx <= i ? "pulse" : ""} />}
          </span>
        ))}
      </div>
    </div>
  );
}

export function DropdownMenu() {
  const [open, setOpen] = useState(false);
  const items = ["Overview", "Features", "Pricing", "Changelog"];
  return (
    <div style={{ width: "100%", height: "100%", minHeight: 240, display: "flex", justifyContent: "center", paddingTop: 28 }}>
      <div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} style={{ position: "relative", height: "fit-content" }}>
        <button onFocus={() => setOpen(true)} onBlur={() => setOpen(false)} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 999, padding: "9px 16px", fontSize: 13, fontWeight: 600, color: "var(--fg)", cursor: "pointer" }}>
          Products
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25, ease: EASE }} style={{ display: "inline-flex", fontSize: 11 }}>▾</motion.span>
        </button>
        <motion.div initial={false} animate={{ opacity: open ? 1 : 0, y: open ? 0 : 8 }} transition={{ duration: 0.25, ease: EASE }} style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, width: 210, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 14, padding: 6, boxShadow: "0 24px 48px rgba(0,0,0,.4)", pointerEvents: open ? "auto" : "none" }}>
          {items.map((it) => (
            <div key={it} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 12px", borderRadius: 9, fontSize: 13, color: "var(--fg)", cursor: "pointer" }} onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
              {it}
              <ChevronRight size={14} color="var(--muted)" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export function SideDrawerNav() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflow: "hidden", background: "var(--bg)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", background: "var(--surface)", borderBottom: "1px solid var(--line)" }}>
        <b style={{ fontSize: 14 }}>Drawer/Nav</b>
        <button onClick={() => setOpen(true)} aria-label="open menu" style={{ background: "none", border: "1px solid var(--line)", borderRadius: 10, padding: 8, color: "var(--fg)", cursor: "pointer", display: "grid", placeItems: "center" }}>
          <Menu size={18} />
        </button>
      </div>
      <motion.div initial={false} animate={{ opacity: open ? 1 : 0 }} transition={{ duration: 0.25 }} onClick={() => setOpen(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.45)", pointerEvents: open ? "auto" : "none" }} />
      <motion.aside initial={false} animate={{ x: open ? "0%" : "-100%" }} transition={{ type: "spring", stiffness: 320, damping: 32 }} style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 210, background: "var(--surface)", borderRight: "1px solid var(--line)", padding: "16px 14px", display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <b style={{ fontSize: 13 }}>Menu</b>
          <button onClick={() => setOpen(false)} aria-label="close menu" style={{ background: "none", border: "none", color: "var(--fg)", cursor: "pointer", display: "grid", placeItems: "center" }}>
            <X size={18} />
          </button>
        </div>
        {LINKS.map((l, idx) => (
          <motion.button key={l} initial={false} animate={{ opacity: open ? 1 : 0, x: open ? 0 : -16 }} transition={{ delay: open ? 0.08 + idx * 0.06 : 0, duration: 0.3, ease: EASE }} onClick={() => setOpen(false)} style={{ textAlign: "left", border: "none", background: "transparent", padding: "10px 12px", borderRadius: 10, fontSize: 14, fontWeight: 600, color: "var(--fg)", cursor: "pointer" }}>
            {l}
          </motion.button>
        ))}
      </motion.aside>
    </div>
  );
}

export function CommandPalette() {
  const [query, setQuery] = useState("");
  const commands = ["Go to Home", "Search files", "Toggle sidebar", "Open settings", "New document", "Invite member"];
  const filtered = commands.filter((c) => c.toLowerCase().includes(query.toLowerCase()));
  const lower = query.toLowerCase();
  return (
    <div style={{ width: "100%", height: "100%", minHeight: 240, display: "flex", justifyContent: "center", paddingTop: 24 }}>
      <motion.div initial={{ opacity: 0, scale: 0.96, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.35, ease: EASE }} style={{ width: 300, height: "fit-content", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 16, boxShadow: "0 24px 48px rgba(0,0,0,.4)", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 14px", borderBottom: "1px solid var(--line)" }}>
          <Command size={15} color="var(--muted)" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Type a command..." style={{ flex: 1, border: "none", outline: "none", background: "transparent", color: "var(--fg)", fontSize: 13 }} />
        </div>
        <div style={{ padding: 6 }}>
          {filtered.length === 0 && <p style={{ margin: 0, padding: "10px 12px", fontSize: 13, color: "var(--muted)" }}>No results</p>}
          {filtered.map((c) => {
            const idx = c.toLowerCase().indexOf(lower);
            return (
              <div key={c} style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 12px", borderRadius: 9, fontSize: 13, color: "var(--fg)" }}>
                <Search size={13} color="var(--muted)" />
                <span>
                  {query === "" || idx < 0 ? c : (
                    <span>
                      {c.slice(0, idx)}
                      <mark style={{ background: "var(--accent)", color: "#0b0b11", borderRadius: 3, padding: "0 1px" }}>{c.slice(idx, idx + query.length)}</mark>
                      {c.slice(idx + query.length)}
                    </span>
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

export function TabBarNav() {
  const [active, setActive] = useState(0);
  const tabs = [
    { label: "Home", Icon: Home },
    { label: "Search", Icon: Search },
    { label: "Alerts", Icon: Bell },
    { label: "Profile", Icon: User },
  ];
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, background: "var(--bg)", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: "0 0 64px 0", display: "grid", placeItems: "center", color: "var(--muted)", fontSize: 13 }}>
        {tabs[active].label} content
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, display: "flex", background: "var(--surface)", borderTop: "1px solid var(--line)", padding: "8px 6px 12px" }}>
        {tabs.map(({ label, Icon }, i) => (
          <button key={label} onClick={() => setActive(i)} style={{ flex: 1, border: "none", background: "transparent", cursor: "pointer", display: "grid", placeItems: "center", gap: 4, padding: "6px 0", color: active === i ? "var(--accent)" : "var(--muted)" }}>
            <Icon size={20} />
            <span style={{ fontSize: 11, fontWeight: active === i ? 700 : 500 }}>{label}</span>
            <motion.span initial={false} animate={{ scale: active === i ? 1 : 0, opacity: active === i ? 1 : 0 }} transition={{ type: "spring", stiffness: 500, damping: 28 }} style={{ width: 5, height: 5, borderRadius: 999, background: "var(--accent)" }} />
          </button>
        ))}
      </div>
    </div>
  );
}

export function StepProgressNav() {
  const [active, setActive] = useState(1);
  const steps = ["Cart", "Details", "Done"];
  return (
    <div style={{ width: "100%", height: "100%", minHeight: 240, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18, padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", width: 260 }}>
        {steps.map((s, i) => (
          <div key={s} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : "none" }}>
            <div style={{ display: "grid", placeItems: "center", width: 30, height: 30, borderRadius: 999, fontSize: 13, fontWeight: 700, background: i <= active ? "var(--accent)" : "var(--surface)", color: i <= active ? "#0b0b11" : "var(--muted)", border: "1px solid var(--line)", flexShrink: 0 }}>
              {i + 1}
            </div>
            {i < steps.length - 1 && (
              <div style={{ position: "relative", flex: 1, height: 3, borderRadius: 999, background: "var(--line)", margin: "0 8px", overflow: "hidden" }}>
                <motion.div initial={false} animate={{ width: active > i ? "100%" : "0%" }} transition={{ duration: 0.4, ease: EASE }} style={{ position: "absolute", left: 0, top: 0, bottom: 0, background: "var(--accent)" }} />
              </div>
            )}
          </div>
        ))}
      </div>
      <p style={{ margin: 0, fontSize: 13, color: "var(--muted)" }}>{steps[active]}</p>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setActive((v) => Math.max(0, v - 1))} disabled={active === 0} style={{ border: "1px solid var(--line)", background: "var(--surface)", color: "var(--fg)", borderRadius: 999, padding: "8px 16px", fontSize: 13, cursor: "pointer", opacity: active === 0 ? 0.4 : 1 }}>Prev</button>
        <button onClick={() => setActive((v) => Math.min(steps.length - 1, v + 1))} disabled={active === steps.length - 1} style={{ border: "none", background: "var(--accent)", color: "#0b0b11", borderRadius: 999, padding: "8px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer", opacity: active === steps.length - 1 ? 0.4 : 1 }}>Next</button>
      </div>
    </div>
  );
}

export function StickyTabNav({ reduce, paused }) {
  const tabs = ["Overview", "Specs", "Reviews"];
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  useAutoScroll(ref, paused, reduce);
  return (
    <div ref={ref} style={{ width: "100%", height: "100%", overflowY: "auto" }}>
      <div style={{ padding: "20px 18px 14px", background: "var(--surface)", borderBottom: "1px solid var(--line)" }}>
        <b style={{ fontSize: 15 }}>Sticky tabs</b>
        <p style={{ margin: "4px 0 0", fontSize: 12, color: "var(--muted)" }}>Scroll to see the bar stick</p>
      </div>
      <div style={{ position: "sticky", top: 0, zIndex: 2, display: "flex", gap: 4, background: "var(--surface)", borderBottom: "1px solid var(--line)", padding: "0 12px" }}>
        {tabs.map((t, i) => (
          <button key={t} onClick={() => setActive(i)} style={{ position: "relative", border: "none", background: "transparent", padding: "12px 14px", fontSize: 13, fontWeight: active === i ? 700 : 500, color: active === i ? "var(--fg)" : "var(--muted)", cursor: "pointer" }}>
            {t}
            {active === i && <motion.span layoutId="stickytab-thumb" transition={{ type: "spring", stiffness: 420, damping: 32 }} style={{ position: "absolute", left: 10, right: 10, bottom: 0, height: 2, borderRadius: 999, background: "var(--accent)" }} />}
          </button>
        ))}
      </div>
      <div style={{ padding: "16px 18px", fontSize: 13, color: "var(--muted)" }}>
        <p style={{ margin: "0 0 8px", fontSize: 14, fontWeight: 700, color: "var(--fg)" }}>{tabs[active]} panel</p>
        <p style={{ margin: 0 }}>Showing {tabs[active].toLowerCase()} content for the selected tab.</p>
      </div>
      <div style={{ height: 220 }} />
      <div style={{ margin: "0 18px 18px", padding: 16, borderRadius: 12, background: "var(--surface)", border: "1px solid var(--line)", fontSize: 13, color: "var(--muted)" }}>
        More {tabs[active].toLowerCase()} details below the fold
      </div>
    </div>
  );
}

export function BackLinkNav() {
  const [hover, setHover] = useState(false);
  return (
    <div style={{ width: "100%", height: "100%", minHeight: 240, display: "flex", alignItems: "center", padding: "0 24px" }}>
      <a href="#" onClick={(e) => e.preventDefault()} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onFocus={() => setHover(true)} onBlur={() => setHover(false)} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, color: "var(--fg)", textDecoration: "none" }}>
        <ArrowLeft size={17} style={{ transform: hover ? "translateX(-4px)" : "translateX(0)", transition: "transform .25s ease" }} />
        Back to library
      </a>
    </div>
  );
}

export function ExpandSearchNav() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef(null);
  useEffect(() => { if (open && inputRef.current) inputRef.current.focus(); }, [open]);
  const collapse = () => { setOpen(false); setValue(""); };
  return (
    <div style={{ width: "100%", height: "100%", minHeight: 240, display: "flex", alignItems: "center", justifyContent: "flex-start", padding: "0 24px" }}>
      <motion.div initial={false} animate={{ width: open ? 200 : 40 }} transition={{ duration: 0.32, ease: EASE }} style={{ display: "flex", alignItems: "center", gap: 8, height: 40, borderRadius: 999, background: "var(--surface)", border: "1px solid var(--line)", padding: "0 10px", overflow: "hidden" }}>
        <button onClick={() => setOpen(true)} aria-label="expand search" style={{ border: "none", background: "transparent", color: "var(--fg)", cursor: "pointer", display: "grid", placeItems: "center", flexShrink: 0 }}>
          <Search size={17} />
        </button>
        {open && (
          <input ref={inputRef} value={value} onChange={(e) => setValue(e.target.value)} onBlur={collapse} onKeyDown={(e) => { if (e.key === "Escape") collapse(); }} placeholder="Search..." style={{ flex: 1, minWidth: 0, border: "none", outline: "none", background: "transparent", color: "var(--fg)", fontSize: 13 }} />
        )}
      </motion.div>
    </div>
  );
}

export function DockNav({ reduce }) {
  const [hot, setHot] = useState(-1);
  const icons = [Home, Search, LayoutGrid, Bell, User];
  const gentle = Boolean(reduce);
  return (
    <div style={{ width: "100%", height: "100%", minHeight: 240, display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 28 }} onMouseMove={(e) => {
      const items = e.currentTarget.querySelectorAll("[data-dock]");
      let best = -1;
      let bestDist = Infinity;
      items.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const d = Math.abs(e.clientX - (r.left + r.width / 2));
        if (d < bestDist) { bestDist = d; best = i; }
      });
      setHot(best);
    }} onMouseLeave={() => setHot(-1)}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 10, padding: "12px 14px", borderRadius: 20, background: "var(--surface)", border: "1px solid var(--line)", boxShadow: "0 20px 40px rgba(0,0,0,.35)" }}>
        {icons.map((Icon, i) => {
          const dist = hot < 0 ? 99 : Math.abs(i - hot);
          const lift = gentle ? (dist === 0 ? 4 : 0) : (dist === 0 ? 12 : dist === 1 ? 6 : 0);
          const scale = gentle ? (dist === 0 ? 1.08 : 1) : (dist === 0 ? 1.28 : dist === 1 ? 1.12 : 1);
          return (
            <motion.button key={i} data-dock={i} initial={false} animate={{ y: -lift, scale }} transition={{ type: "spring", stiffness: 420, damping: 24 }} style={{ width: 42, height: 42, borderRadius: 13, border: "1px solid var(--line)", background: "var(--bg)", color: "var(--fg)", cursor: "pointer", display: "grid", placeItems: "center" }}>
              <Icon size={18} />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export function SegmentedNav() {
  const [active, setActive] = useState(1);
  const segs = ["Day", "Week", "Month"];
  return (
    <div style={center}>
      <div style={{ display: "flex", padding: 4, borderRadius: 999, background: "var(--surface)", border: "1px solid var(--line)", minWidth: 260 }}>
        {segs.map((s, i) => (
          <button key={s} onClick={() => setActive(i)} style={{ position: "relative", flex: 1, border: "none", background: "transparent", borderRadius: 999, padding: "9px 0", fontSize: 13, fontWeight: active === i ? 700 : 500, color: active === i ? "#0b0b11" : "var(--muted)", cursor: "pointer" }}>
            {active === i && <motion.span layoutId="segmented-thumb" transition={{ type: "spring", stiffness: 420, damping: 32 }} style={{ position: "absolute", inset: 0, borderRadius: 999, background: "var(--accent)" }} />}
            <span style={{ position: "relative", zIndex: 1 }}>{s}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
