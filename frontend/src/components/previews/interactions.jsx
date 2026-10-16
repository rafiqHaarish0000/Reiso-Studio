import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, GripVertical, Minus, Plus, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { EASE, center, useCountUp, usePointer } from "./_shared.jsx";

export function CustomCursor() {
  const { ref, pos, handlers } = usePointer();
  return (
    <div ref={ref} {...handlers} style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, background: "var(--bg)", cursor: "none", display: "grid", placeItems: "center" }}>
      <button style={{ background: "var(--surface)", border: "1px solid var(--line)", color: "var(--fg)", borderRadius: 999, padding: "10px 20px", cursor: "none" }}>A button</button>
      {pos.active && (
        <>
          <motion.div animate={{ left: `${pos.x * 100}%`, top: `${pos.y * 100}%` }} transition={{ type: "spring", stiffness: 500, damping: 40, mass: 0.3 }} style={{ position: "absolute", width: 8, height: 8, borderRadius: "50%", background: "var(--fg)", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />
          <motion.div animate={{ left: `${pos.x * 100}%`, top: `${pos.y * 100}%` }} transition={{ type: "spring", stiffness: 160, damping: 20, mass: 0.7 }} style={{ position: "absolute", width: 34, height: 34, borderRadius: "50%", border: "1.5px solid var(--accent)", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />
        </>
      )}
    </div>
  );
}

export function CursorFollower() {
  const { ref, pos, handlers } = usePointer();
  return (
    <div ref={ref} {...handlers} style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, background: "var(--bg)", cursor: "none", display: "grid", placeItems: "center" }}>
      <span style={{ color: "var(--muted)", fontSize: 13 }}>soft inverted follower</span>
      {pos.active && (
        <motion.div animate={{ left: `${pos.x * 100}%`, top: `${pos.y * 100}%` }} transition={{ type: "spring", stiffness: 90, damping: 18, mass: 1 }} style={{ position: "absolute", width: 70, height: 70, borderRadius: "50%", background: "var(--fg)", mixBlendMode: "difference", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />
      )}
    </div>
  );
}

function Magnet({ label }) {
  const ref = useRef(null);
  const [t, setT] = useState({ x: 0, y: 0 });
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    setT({ x: (e.clientX - (r.left + r.width / 2)) * 0.4, y: (e.clientY - (r.top + r.height / 2)) * 0.4 });
  };
  return (
    <motion.span ref={ref} animate={{ x: t.x, y: t.y }} transition={{ type: "spring", stiffness: 220, damping: 16 }} onMouseMove={move} onMouseLeave={() => setT({ x: 0, y: 0 })} style={{ padding: 14, cursor: "pointer", fontSize: 20, fontWeight: 700, display: "inline-block" }}>
      {label}
    </motion.span>
  );
}

export function MagneticLink() {
  return (
    <div style={{ ...center, gap: 26 }}>
      {["Work", "Studio", "Contact"].map((l) => <Magnet key={l} label={l} />)}
    </div>
  );
}

export function NumberCounter({ reduce }) {
  const [run, setRun] = useState(0);
  const v = useCountUp(12840, run, reduce);
  return (
    <div style={{ ...center, flexDirection: "column", gap: 14 }}>
      <span style={{ fontSize: 48, fontWeight: 800, fontVariantNumeric: "tabular-nums" }}>{Math.round(v).toLocaleString()}</span>
      <button onClick={() => setRun((r) => r + 1)} style={{ background: "none", border: "1px solid var(--line)", color: "var(--fg)", borderRadius: 999, padding: "6px 16px", cursor: "pointer", fontSize: 12 }}>replay</button>
    </div>
  );
}

export function Accordion() {
  const items = [
      ["What is MotionLab?", "A searchable library of 220 animated UI features with copy-ready prompts."],
    ["Can I copy prompts?", "Yes — every card exposes a detailed prompt you can paste into your AI tool."],
    ["Is it accessible?", "It respects reduced-motion and uses semantic, keyboard-friendly markup."],
  ];
  const [open, setOpen] = useState(0);
  return (
    <div style={{ ...center, width: "100%" }}>
      <div style={{ width: "80%", maxWidth: 420 }}>
        {items.map(([q, a], i) => (
          <div key={q} style={{ borderBottom: "1px solid var(--line)" }}>
            <button onClick={() => setOpen(open === i ? -1 : i)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", padding: "14px 0", color: "var(--fg)", cursor: "pointer", fontSize: 14, fontWeight: 600, textAlign: "left" }}>
              {q}
              <Plus size={16} style={{ transform: open === i ? "rotate(45deg)" : "none", transition: "transform .3s" }} />
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: EASE }} style={{ overflow: "hidden" }}>
                  <p style={{ margin: "0 0 14px", fontSize: 13, color: "var(--muted)" }}>{a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TabsTransition() {
  const tabs = ["Design", "Motion", "Code"];
  const [t, setT] = useState(0);
  return (
    <div style={{ ...center, flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", gap: 4, background: "var(--surface)", border: "1px solid var(--line)", padding: 4, borderRadius: 999 }}>
        {tabs.map((x, i) => (
          <button key={x} onClick={() => setT(i)} style={{ position: "relative", border: "none", background: "transparent", padding: "8px 18px", borderRadius: 999, cursor: "pointer", color: t === i ? "#0b0b11" : "var(--muted)", fontWeight: 600, fontSize: 13 }}>
            {t === i && <motion.span layoutId="tabpill" style={{ position: "absolute", inset: 0, background: "var(--accent)", borderRadius: 999, zIndex: -1 }} />}
            {x}
          </button>
        ))}
      </div>
      <div style={{ position: "relative", width: "70%", maxWidth: 360, height: 120, borderRadius: 14, background: "var(--surface)", border: "1px solid var(--line)", overflow: "hidden" }}>
        <AnimatePresence mode="wait">
          <motion.div key={t} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", fontSize: 15, fontWeight: 600 }}>
            {tabs[t]} panel
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function CustomTooltip() {
  const [h, setH] = useState(false);
  return (
    <div style={center}>
      <div style={{ position: "relative", display: "inline-block" }} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
        <span style={{ padding: "8px 16px", borderRadius: 10, border: "1px solid var(--line)", background: "var(--surface)", fontSize: 13, cursor: "default" }}>Hover me</span>
        <AnimatePresence>
          {h && (
            <motion.span initial={{ opacity: 0, y: 6, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6, scale: 0.96 }} transition={{ type: "spring", stiffness: 400, damping: 24 }} style={{ position: "absolute", bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap", background: "var(--fg)", color: "var(--bg)", fontSize: 12, padding: "6px 10px", borderRadius: 8 }}>
              Helpful tooltip
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function DragDrop() {
  const [items, setItems] = useState(["Overview", "Motion", "Systems", "Sound"]);
  const dragIndex = useRef(null);
  return (
    <div style={{ ...center, flexDirection: "column", gap: 8, width: "100%" }}>
      {items.map((it, i) => (
        <motion.div
          key={it}
          layout
          draggable
          onDragStart={() => (dragIndex.current = i)}
          onDragOver={(e) => {
            e.preventDefault();
            const from = dragIndex.current;
            if (from === null || from === i) return;
            setItems((arr) => {
              const next = [...arr];
              const [m] = next.splice(from, 1);
              next.splice(i, 0, m);
              return next;
            });
            dragIndex.current = i;
          }}
          whileDrag={{ scale: 1.04, boxShadow: "0 20px 40px rgba(0,0,0,.5)" }}
          style={{ display: "flex", alignItems: "center", gap: 10, width: "70%", maxWidth: 320, padding: "10px 14px", borderRadius: 10, background: "var(--surface)", border: "1px solid var(--line)", cursor: "grab", fontSize: 13 }}
        >
          <GripVertical size={15} color="var(--muted)" />{it}
        </motion.div>
      ))}
    </div>
  );
}

export function RippleClick({ reduce }) {
  const [ripples, setRipples] = useState([]);
  const add = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((rs) => [...rs, { id, x: e.clientX - r.left, y: e.clientY - r.top }]);
    setTimeout(() => setRipples((rs) => rs.filter((x) => x.id !== id)), reduce ? 200 : 800);
  };
  return (
    <div style={center}>
      <button onClick={add} style={{ position: "relative", overflow: "hidden", background: "var(--accent)", color: "#0b0b11", border: "none", borderRadius: 14, padding: "20px 40px", fontWeight: 700, cursor: "pointer" }}>
        Click anywhere
        {ripples.map((rp) => (
          <motion.span key={rp.id} initial={{ scale: 0, opacity: 0.6 }} animate={{ scale: reduce ? 1 : 8, opacity: 0 }} transition={{ duration: reduce ? 0.2 : 0.7, ease: "easeOut" }} style={{ position: "absolute", left: rp.x, top: rp.y, width: 20, height: 20, marginLeft: -10, marginTop: -10, borderRadius: "50%", background: "rgba(255,255,255,.6)" }} />
        ))}
      </button>
    </div>
  );
}

export function ToggleSwitch() {
  const [on, setOn] = useState(true);
  return (
    <div style={center}>
      <button onClick={() => setOn((v) => !v)} aria-pressed={on} style={{ position: "relative", width: 68, height: 36, borderRadius: 999, border: "none", cursor: "pointer", background: on ? "var(--accent)" : "var(--line)", transition: "background .3s" }}>
        <motion.span layout transition={{ type: "spring", stiffness: 600, damping: 32 }} style={{ position: "absolute", top: 4, left: on ? 36 : 4, width: 28, height: 28, borderRadius: "50%", background: "#fff", boxShadow: "0 2px 6px rgba(0,0,0,.3)" }} />
      </button>
    </div>
  );
}

export function SortableList() {
  const [items, setItems] = useState(["Design tokens", "Motion curves", "Color systems", "Type scales", "Icon sets"]);
  const dragIndex = useRef(null);
  return (
    <div style={{ ...center, flexDirection: "column", gap: 8, width: "100%" }}>
      {items.map((it, i) => (
        <motion.div
          key={it}
          layout
          draggable
          onDragStart={() => (dragIndex.current = i)}
          onDragOver={(e) => {
            e.preventDefault();
            const from = dragIndex.current;
            if (from === null || from === i) return;
            setItems((arr) => {
              const next = [...arr];
              const [m] = next.splice(from, 1);
              next.splice(i, 0, m);
              return next;
            });
            dragIndex.current = i;
          }}
          transition={{ type: "spring", stiffness: 400, damping: 32 }}
          whileDrag={{ scale: 1.04, boxShadow: "0 20px 40px rgba(0,0,0,.5)" }}
          style={{ display: "flex", alignItems: "center", gap: 10, width: "70%", maxWidth: 320, padding: "10px 14px", borderRadius: 10, background: "var(--surface)", border: "1px solid var(--line)", cursor: "grab", fontSize: 13 }}
        >
          <GripVertical size={15} color="var(--muted)" />{it}
        </motion.div>
      ))}
    </div>
  );
}

export function MultiSelectChips() {
  const options = ["Design", "Motion", "Code", "Sound", "3D", "Type"];
  const [selected, setSelected] = useState(["Motion", "Code"]);
  const toggle = (o) => setSelected((s) => (s.includes(o) ? s.filter((x) => x !== o) : [...s, o]));
  return (
    <div style={{ ...center, flexDirection: "column", gap: 14, width: "100%" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", maxWidth: 360 }}>
        {options.map((o) => {
          const active = selected.includes(o);
          return (
            <motion.button
              key={o}
              onClick={() => toggle(o)}
              aria-pressed={active}
              animate={{ scale: active ? 1.06 : 1 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 500, damping: 22 }}
              style={{ borderRadius: 999, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", border: active ? "1px solid var(--accent)" : "1px solid var(--line)", background: active ? "var(--accent)" : "var(--surface)", color: active ? "#0b0b11" : "var(--fg)" }}
            >
              {o}
            </motion.button>
          );
        })}
      </div>
      <span style={{ fontSize: 13, color: "var(--muted)", fontVariantNumeric: "tabular-nums" }}>{selected.length} selected</span>
    </div>
  );
}

export function RatingStars() {
  const [rating, setRating] = useState(3);
  const [hovered, setHovered] = useState(null);
  const display = hovered ?? rating;
  return (
    <div style={{ ...center, flexDirection: "column", gap: 12, width: "100%" }}>
      <div style={{ display: "flex", gap: 6 }} onMouseLeave={() => setHovered(null)}>
        {[1, 2, 3, 4, 5].map((n) => (
          <motion.button
            key={`${n}-${rating === n}`}
            onMouseEnter={() => setHovered(n)}
            onFocus={() => setHovered(n)}
            onClick={() => setRating(n)}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.85 }}
            initial={{ scale: 0.6 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 18 }}
            aria-label={`Rate ${n} of 5`}
            style={{ background: "none", border: "none", padding: 2, cursor: "pointer" }}
          >
            <Star size={28} color={n <= display ? "var(--accent)" : "var(--line)"} fill={n <= display ? "var(--accent)" : "transparent"} />
          </motion.button>
        ))}
      </div>
      <span style={{ fontSize: 13, color: "var(--muted)", fontVariantNumeric: "tabular-nums" }}>{rating}/5</span>
    </div>
  );
}

export function PasswordMeter() {
  const [value, setValue] = useState("hello123");
  const hasLength = value.length >= 8;
  const hasNumber = /\d/.test(value);
  const hasMixed = /[a-z]/.test(value) && /[A-Z]/.test(value);
  const hasLong = value.length >= 12;
  const score = [hasLength, hasNumber, hasMixed, hasLong].filter(Boolean).length;
  const labels = ["Weak", "Weak", "Fair", "Good", "Strong"];
  const rules = [
    ["8+ characters", hasLength],
    ["Includes a number", hasNumber],
    ["Upper & lowercase", hasMixed],
  ];
  return (
    <div style={{ ...center, flexDirection: "column", gap: 12, width: "100%" }}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        spellCheck={false}
        autoComplete="off"
        style={{ width: "70%", maxWidth: 300, padding: "10px 14px", borderRadius: 10, border: "1px solid var(--line)", background: "var(--surface)", color: "var(--fg)", fontSize: 14, outline: "none" }}
      />
      <div style={{ display: "flex", gap: 6, width: "70%", maxWidth: 300 }}>
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            animate={{ scaleX: 1, opacity: 1 }}
            style={{ height: 6, flex: 1, borderRadius: 999, background: i < score ? "var(--accent)" : "var(--line)", transformOrigin: "left" }}
          />
        ))}
      </div>
      <span style={{ fontSize: 13, fontWeight: 700, color: "var(--fg)" }}>{labels[score]}</span>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {rules.map(([label, ok]) => (
          <span key={label} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: ok ? "var(--fg)" : "var(--muted)" }}>
            <Check size={14} color={ok ? "var(--accent)" : "var(--muted)"} />{label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function RangeSlider() {
  const [value, setValue] = useState(40);
  const trackRef = useRef(null);
  const dragging = useRef(false);
  const setFromClientX = (clientX) => {
    const el = trackRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    setValue(Math.round(p * 100));
  };
  return (
    <div style={{ ...center, flexDirection: "column", gap: 14, width: "100%" }}>
      <span style={{ fontSize: 28, fontWeight: 800, fontVariantNumeric: "tabular-nums" }}>{value}</span>
      <div
        ref={trackRef}
        role="slider"
        tabIndex={0}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        onPointerDown={(e) => {
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          setFromClientX(e.clientX);
        }}
        onPointerMove={(e) => {
          if (dragging.current) setFromClientX(e.clientX);
        }}
        onPointerUp={() => (dragging.current = false)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" || e.key === "ArrowUp") setValue((v) => Math.min(100, v + 2));
          if (e.key === "ArrowLeft" || e.key === "ArrowDown") setValue((v) => Math.max(0, v - 2));
          if (e.key === "Home") setValue(0);
          if (e.key === "End") setValue(100);
        }}
        style={{ position: "relative", width: "70%", maxWidth: 320, height: 28, display: "flex", alignItems: "center", cursor: "pointer", outline: "none" }}
      >
        <div style={{ position: "relative", width: "100%", height: 8, borderRadius: 999, background: "var(--line)", overflow: "visible" }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${value}%`, borderRadius: 999, background: "var(--accent)" }} />
        </div>
        <motion.div animate={{ left: `${value}%` }} transition={{ type: "spring", stiffness: 600, damping: 35 }} style={{ position: "absolute", top: "50%", width: 22, height: 22, marginLeft: -11, marginTop: -11, borderRadius: "50%", background: "#fff", border: "2px solid var(--accent)", boxShadow: "0 2px 8px rgba(0,0,0,.35)" }} />
      </div>
    </div>
  );
}

export function StepperInput() {
  const [n, setN] = useState(3);
  return (
    <div style={{ ...center, width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 16, padding: 8 }}>
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => setN((v) => Math.max(0, v - 1))} disabled={n <= 0} aria-label="Decrement" style={{ width: 40, height: 40, borderRadius: 12, border: "1px solid var(--line)", background: "var(--bg)", color: "var(--fg)", cursor: n <= 0 ? "not-allowed" : "pointer", opacity: n <= 0 ? 0.4 : 1, display: "grid", placeItems: "center" }}>
          <Minus size={16} />
        </motion.button>
        <span style={{ minWidth: 48, textAlign: "center", fontSize: 28, fontWeight: 800, fontVariantNumeric: "tabular-nums" }}>{n}</span>
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => setN((v) => Math.min(10, v + 1))} disabled={n >= 10} aria-label="Increment" style={{ width: 40, height: 40, borderRadius: 12, border: "none", background: "var(--accent)", color: "#0b0b11", cursor: n >= 10 ? "not-allowed" : "pointer", opacity: n >= 10 ? 0.4 : 1, display: "grid", placeItems: "center" }}>
          <Plus size={16} />
        </motion.button>
      </div>
    </div>
  );
}

export function CustomSelect() {
  const options = ["Design", "Motion", "Code", "Sound"];
  const [selected, setSelected] = useState(options[0]);
  const [open, setOpen] = useState(false);
  return (
    <div style={{ ...center, width: "100%" }}>
      {open && <div onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 5 }} />}
      <div style={{ position: "relative", width: "70%", maxWidth: 280, zIndex: 6 }}>
        <button onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-haspopup="listbox" style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--surface)", border: "1px solid var(--line)", color: "var(--fg)", borderRadius: 12, padding: "12px 14px", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>
          {selected}
          <ChevronDown size={16} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .3s" }} />
        </button>
        <AnimatePresence>
          {open && (
            <motion.ul
              role="listbox"
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.25, ease: EASE }}
              style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0, margin: 0, padding: 6, listStyle: "none", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 12, boxShadow: "0 20px 40px rgba(0,0,0,.4)" }}
            >
              {options.map((o) => (
                <li key={o} role="option" aria-selected={selected === o}>
                  <button
                    onClick={() => {
                      setSelected(o);
                      setOpen(false);
                    }}
                    style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", background: selected === o ? "var(--bg)" : "transparent", border: "none", color: "var(--fg)", borderRadius: 8, padding: "10px 12px", cursor: "pointer", fontSize: 13, fontWeight: selected === o ? 700 : 400 }}
                  >
                    {o}
                    {selected === o && <Check size={15} color="var(--accent)" />}
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function ColorPicker() {
  const colors = ["#7c9cff", "#a05fbf", "#4ade80", "#fbbf24", "#f87171", "#22d3ee"];
  const [picked, setPicked] = useState(colors[0]);
  return (
    <div style={{ ...center, flexDirection: "column", gap: 16, width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 999, padding: "8px 16px 8px 8px" }}>
        <span style={{ width: 28, height: 28, borderRadius: "50%", background: picked }} />
        <span style={{ fontSize: 13, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{picked}</span>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        {colors.map((c) => {
          const active = picked === c;
          return (
            <motion.button
              key={c}
              onClick={() => setPicked(c)}
              aria-label={c}
              aria-pressed={active}
              animate={{ scale: active ? 1.2 : 1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
              style={{ width: 32, height: 32, borderRadius: "50%", background: c, border: "none", cursor: "pointer", boxShadow: active ? `0 0 0 2px var(--bg), 0 0 0 4px ${c}` : "none" }}
            />
          );
        })}
      </div>
    </div>
  );
}

export function SkeletonLoader({ reduce }) {
  const [loading, setLoading] = useState(reduce ? false : true);
  useEffect(() => {
    if (reduce) return;
    let t1;
    t1 = setTimeout(() => setLoading(false), 2200);
    const iv = setInterval(() => {
      setLoading(true);
      t1 = setTimeout(() => setLoading(false), 2200);
    }, 4400);
    return () => {
      clearInterval(iv);
      clearTimeout(t1);
    };
  }, [reduce]);
  const shimmer = {
    borderRadius: 8,
    backgroundImage: "linear-gradient(100deg, var(--line) 30%, var(--surface) 50%, var(--line) 70%)",
    backgroundSize: "200% 100%",
    animation: reduce ? "none" : "ml-shimmer 1.4s ease-in-out infinite",
  };
  return (
    <div style={{ ...center, width: "100%" }}>
      <div style={{ width: "75%", maxWidth: 340, display: "flex", flexDirection: "column", gap: 10 }}>
        {loading ? (
          <>
            <div style={{ ...shimmer, width: "45%", height: 18 }} />
            <div style={{ ...shimmer, width: "100%", height: 12 }} />
            <div style={{ ...shimmer, width: "100%", height: 12 }} />
            <div style={{ ...shimmer, width: "80%", height: 12 }} />
          </>
        ) : (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE }}>
            <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 8 }}>Content loaded</div>
            <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>Real content lines resolve after shimmer placeholders finish their sweep.</div>
            <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>The loop restarts so loading stays visible in previews.</div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export function ProgressRing({ reduce }) {
  const [run, setRun] = useState(1);
  const v = useCountUp(72, run, reduce);
  const r = 54;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - v / 100);
  return (
    <div style={{ ...center, flexDirection: "column", gap: 14, width: "100%" }}>
      <div style={{ position: "relative", width: 132, height: 132 }}>
        <svg width="132" height="132" viewBox="0 0 132 132">
          <circle cx="66" cy="66" r={r} fill="none" stroke="var(--line)" strokeWidth="10" />
          <circle cx="66" cy="66" r={r} fill="none" stroke="var(--accent)" strokeWidth="10" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={offset} transform="rotate(-90 66 66)" style={{ transition: reduce ? "none" : "stroke-dashoffset .1s linear" }} />
        </svg>
        <span style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", fontSize: 24, fontWeight: 800, fontVariantNumeric: "tabular-nums" }}>{Math.round(v)}%</span>
      </div>
      <button onClick={() => setRun((x) => x + 1)} style={{ background: "none", border: "1px solid var(--line)", color: "var(--fg)", borderRadius: 999, padding: "6px 16px", cursor: "pointer", fontSize: 12 }}>replay</button>
    </div>
  );
}
