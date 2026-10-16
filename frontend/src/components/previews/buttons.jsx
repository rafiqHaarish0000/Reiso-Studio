import { motion } from "framer-motion";
import { ArrowRight, Check, Copy, Loader2, Send } from "lucide-react";
import { useRef, useState } from "react";
import { center } from "./_shared.jsx";

const btn = {
  border: "1px solid var(--line)",
  background: "var(--surface)",
  color: "var(--fg)",
  borderRadius: 999,
  padding: "12px 22px",
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
};

export function MagneticButton() {
  const ref = useRef(null);
  const [t, setT] = useState({ x: 0, y: 0 });
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * 0.35;
    const y = (e.clientY - (r.top + r.height / 2)) * 0.35;
    setT({ x, y });
  };
  return (
    <div style={center}>
      <div style={{ padding: 40 }} onMouseMove={move} onMouseLeave={() => setT({ x: 0, y: 0 })} ref={ref}>
        <motion.button animate={{ x: t.x, y: t.y }} transition={{ type: "spring", stiffness: 200, damping: 14 }} style={{ ...btn, background: "var(--accent)", color: "#0b0b12", border: "none" }}>
          Magnetic
        </motion.button>
      </div>
    </div>
  );
}

export function ButtonFill() {
  return (
    <div style={center}>
      <button
        className="ml-fill-btn"
        style={{ ...btn, position: "relative", overflow: "hidden", zIndex: 0 }}
      >
        <span style={{ position: "relative", zIndex: 2 }}>Hover to fill</span>
        <span aria-hidden className="ml-fill-layer" style={{ position: "absolute", inset: 0, background: "var(--accent)", transformOrigin: "bottom", transform: "scaleY(0)", transition: "transform .35s ease", zIndex: 1 }} />
      </button>
    </div>
  );
}

export function ArrowSlideCTA() {
  return (
    <div style={center}>
      <button className="ml-arrow" style={{ ...btn, display: "inline-flex", alignItems: "center", gap: 10, overflow: "hidden" }}>
        <span style={{ transition: "transform .35s ease" }} className="ml-arrow-label">Start a project</span>
        <span style={{ position: "relative", width: 18, height: 18, overflow: "hidden", display: "inline-block" }}>
          <ArrowRight size={18} style={{ position: "absolute", inset: 0 }} className="ml-arrow-a" />
          <ArrowRight size={18} style={{ position: "absolute", inset: 0, transform: "translateX(-120%)" }} className="ml-arrow-b" />
        </span>
      </button>
    </div>
  );
}

export function GlowButton() {
  return (
    <div style={center}>
      <button className="ml-glow" style={{ ...btn, position: "relative", background: "var(--accent)", color: "#0b0b11", border: "none", overflow: "hidden" }}>
        <span style={{ position: "relative", zIndex: 1 }}>Hover to glow</span>
      </button>
    </div>
  );
}

export function BorderDrawButton() {
  const [h, setH] = useState(false);
  return (
    <div style={center}>
      <button
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{ ...btn, position: "relative", background: "transparent", border: "none", padding: "14px 26px" }}
      >
        <svg width="100%" height="100%" viewBox="0 0 150 46" preserveAspectRatio="none" style={{ position: "absolute", inset: 0 }}>
          <rect x="1" y="1" width="148" height="44" rx="22" fill="none" stroke="var(--accent)" strokeWidth="2"
            strokeDasharray="300" strokeDashoffset={h ? 0 : 300} style={{ transition: "stroke-dashoffset .7s ease" }} />
        </svg>
        <span>Border draw</span>
      </button>
    </div>
  );
}

export function Press3DButton() {
  const [down, setDown] = useState(false);
  return (
    <div style={center}>
      <button
        onMouseDown={() => setDown(true)}
        onMouseUp={() => setDown(false)}
        onMouseLeave={() => setDown(false)}
        style={{
          border: "none", cursor: "pointer", borderRadius: 14, padding: "14px 26px", fontSize: 14, fontWeight: 700,
          color: "#0b0b11", background: "var(--accent)",
          transform: `translateY(${down ? 4 : 0}px)`,
          boxShadow: down ? "0 2px 0 rgba(0,0,0,.6)" : "0 6px 0 rgba(0,0,0,.55)",
          transition: "transform .06s, box-shadow .08s",
        }}
      >
        Press me
      </button>
    </div>
  );
}

export function TextSwapButton() {
  const [h, setH] = useState(false);
  return (
    <div style={center}>
      <button onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ ...btn, overflow: "hidden", display: "inline-flex", flexDirection: "column", lineHeight: "20px", height: 44 }}>
        <span style={{ ...btn, display: "block", background: "transparent", border: "none", padding: 0, transform: h ? "translateY(-22px)" : "none", transition: "transform .5s cubic-bezier(.22,1,.36,1)" }}>Hover me</span>
        <span style={{ ...btn, display: "block", background: "transparent", border: "none", padding: 0, color: "var(--accent)", transform: h ? "translateY(-22px)" : "none", transition: "transform .5s cubic-bezier(.22,1,.36,1)" }}>Let's go</span>
      </button>
    </div>
  );
}

export function LiquidCTA({ reduce }) {
  const [h, setH] = useState(false);
  return (
    <div style={center}>
      <button
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{ ...btn, position: "relative", overflow: "hidden", background: "var(--accent)", color: "#0b0b11", border: "none" }}
      >
        <motion.span
          animate={reduce ? {} : { borderRadius: h ? ["50% 50% 50% 50%", "42% 58% 55% 45%", "50% 50% 50% 50%"] : "50% 50% 50% 50%" }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", width: 60, height: 60, background: "rgba(255,255,255,.35)", left: -10, top: -20, transition: "transform .4s", transform: h ? "scale(4)" : "scale(1)" }}
        />
        <span style={{ position: "relative", zIndex: 1 }}>Liquid CTA</span>
      </button>
    </div>
  );
}

export function OutlineCTA({ reduce }) {
  return (
    <div style={center}>
      <button className="ml-outline" style={{ ...btn, position: "relative", background: "transparent", border: "none", padding: "14px 26px" }}>
        <svg width="100%" height="100%" viewBox="0 0 170 46" preserveAspectRatio="none" style={{ position: "absolute", inset: 0 }}>
          <rect
            x="1" y="1" width="168" height="44" rx="22" fill="none"
            stroke="var(--accent)" strokeWidth="2" strokeDasharray="10 8"
            style={{ animation: reduce ? "none" : "ml-dash 1.2s linear infinite" }}
          />
        </svg>
        <span>Animated outline</span>
      </button>
    </div>
  );
}

export function LoadingSuccessButton({ reduce }) {
  const [state, setState] = useState("idle");
  const click = () => {
    if (state !== "idle") return;
    setState("loading");
    setTimeout(() => setState("success"), reduce ? 100 : 1400);
    setTimeout(() => setState("idle"), reduce ? 200 : 2600);
  };
  return (
    <div style={center}>
      <button onClick={click} style={{ ...btn, minWidth: 150, display: "inline-flex", gap: 8, alignItems: "center", justifyContent: "center", background: state === "success" ? "#3fbf7f" : "var(--accent)", color: "#0b0b11", border: "none" }}>
        {state === "idle" && "Submit"}
        {state === "loading" && (<><Loader2 size={16} className="spin" /> Loading</>)}
        {state === "success" && (<><Check size={16} /> Done</>)}
      </button>
    </div>
  );
}

export function SlidingIconButton() {
  const [h, setH] = useState(false);
  return (
    <div style={center}>
      <button
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{ ...btn, display: "inline-flex", alignItems: "center", gap: 8, overflow: "hidden" }}
      >
        <span style={{ transform: h ? "translateX(-6px)" : "translateX(0px)", transition: "transform .3s ease" }}>
          Continue
        </span>
        <span
          style={{
            display: "inline-flex",
            transform: h ? "translateX(0px)" : "translateX(28px)",
            opacity: h ? 1 : 0,
            width: h ? 18 : 0,
            transition: "transform .3s ease, opacity .3s ease, width .3s ease",
          }}
        >
          <ArrowRight size={18} />
        </span>
      </button>
    </div>
  );
}

export function GradientBorderButton({ reduce }) {
  return (
    <div style={center}>
      <div
        style={{
          padding: 2,
          borderRadius: 999,
          background: "conic-gradient(from 0deg, var(--accent), #7c9cff, #a05fbf, var(--accent))",
          animation: reduce ? "none" : "ml-spinbg 3s linear infinite",
        }}
      >
        <button style={{ ...btn, border: "none", background: "var(--surface)" }}>
          Gradient border
        </button>
      </div>
    </div>
  );
}

export function ShimmerButton({ reduce }) {
  const [h, setH] = useState(false);
  return (
    <div style={center}>
      <button
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{ ...btn, position: "relative", overflow: "hidden", background: "var(--accent)", color: "#0b0b11", border: "none" }}
      >
        <span style={{ position: "relative", zIndex: 1 }}>Shimmer</span>
        <motion.span
          aria-hidden
          initial={{ x: -220, skewX: -20 }}
          animate={reduce ? { x: h ? 220 : -220, skewX: -20 } : { x: [-220, 220], skewX: -20 }}
          transition={reduce ? { duration: 0.6, ease: "easeInOut" } : { duration: 2.2, repeat: Infinity, ease: "linear" }}
          style={{ position: "absolute", top: -20, bottom: -20, left: 0, width: 60, background: "linear-gradient(105deg, transparent, rgba(255,255,255,.65), transparent)" }}
        />
      </button>
    </div>
  );
}

export function ConfettiButton({ reduce }) {
  const [parts, setParts] = useState([]);
  const [pulse, setPulse] = useState(0);
  const fire = () => {
    if (reduce) {
      setPulse((p) => p + 1);
      return;
    }
    const id = Date.now();
    const colors = ["var(--accent)", "#7c9cff", "#a05fbf", "#3fbf7f", "#ffcf5c"];
    const arr = Array.from({ length: 14 }, (_, i) => {
      const a = (i / 14) * Math.PI * 2 + Math.random() * 0.5;
      const d = 52 + Math.random() * 52;
      return { id: `${id}-${i}`, x: Math.cos(a) * d, y: Math.sin(a) * d, c: colors[i % colors.length] };
    });
    setParts(arr);
    setTimeout(() => setParts([]), 900);
  };
  return (
    <div style={center}>
      <div style={{ position: "relative", display: "inline-flex" }}>
        <motion.button
          key={reduce ? pulse : "live"}
          onClick={fire}
          animate={reduce && pulse ? { scale: [1, 1.12, 1] } : { scale: 1 }}
          transition={{ duration: 0.4 }}
          style={{ ...btn, background: "var(--accent)", color: "#0b0b11", border: "none" }}
        >
          Celebrate
        </motion.button>
        {parts.map((p) => (
          <motion.span
            key={p.id}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: p.x, y: p.y, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ position: "absolute", left: "50%", top: "50%", width: 8, height: 8, borderRadius: 999, background: p.c, pointerEvents: "none" }}
          />
        ))}
      </div>
    </div>
  );
}

export function PulseButton({ reduce }) {
  const [h, setH] = useState(false);
  const run = !reduce && !h;
  return (
    <div style={center}>
      <button
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{ ...btn, position: "relative", background: "var(--accent)", color: "#0b0b11", border: "none" }}
      >
        <span style={{ position: "relative", zIndex: 1 }}>Pulse</span>
        {run ? (
          <motion.span
            aria-hidden
            animate={{ scale: [1, 2], opacity: [0.6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
            style={{ position: "absolute", inset: 0, borderRadius: 999, border: "2px solid var(--accent)" }}
          />
        ) : null}
      </button>
    </div>
  );
}

export function NeonButton() {
  const [h, setH] = useState(false);
  return (
    <div style={center}>
      <motion.button
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        animate={{ opacity: [1, 0.9, 1, 1, 0.94, 1] }}
        transition={{ duration: 3, repeat: Infinity, times: [0, 0.2, 0.35, 0.6, 0.75, 1] }}
        style={{
          ...btn,
          background: "#0b0b12",
          color: h ? "#ffffff" : "var(--accent)",
          border: "1px solid var(--accent)",
          textShadow: h ? "0 0 12px var(--accent), 0 0 42px var(--accent)" : "0 0 8px var(--accent), 0 0 24px var(--accent)",
          boxShadow: h ? "0 0 24px var(--accent), inset 0 0 18px rgba(124,156,255,.35)" : "0 0 14px var(--accent), inset 0 0 10px rgba(124,156,255,.22)",
          animation: "ml-neon 1.8s ease-in-out infinite alternate",
          transition: "color .25s ease, box-shadow .25s ease, text-shadow .25s ease",
        }}
      >
        Neon glow
      </motion.button>
    </div>
  );
}

export function UnderlineRevealButton() {
  const [h, setH] = useState(false);
  return (
    <div style={center}>
      <button
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{ ...btn, background: "transparent", border: "none", borderRadius: 0, padding: "12px 4px", position: "relative" }}
      >
        <span>Learn more</span>
        <span
          aria-hidden
          style={{
            position: "absolute",
            left: 4,
            right: 4,
            bottom: 6,
            height: 3,
            borderRadius: 999,
            background: "var(--accent)",
            transform: h ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left",
            transition: "transform .35s ease",
          }}
        />
      </button>
    </div>
  );
}

export function CopyButton({ reduce }) {
  const [done, setDone] = useState(false);
  const click = async () => {
    try {
      await navigator.clipboard.writeText("hello@studio");
    } catch (e) {
      void e;
    }
    setDone(true);
    setTimeout(() => setDone(false), 1600);
  };
  return (
    <div style={center}>
      <button onClick={click} style={{ ...btn, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, minWidth: 160 }}>
        {done ? (
          <motion.span
            key="done"
            initial={{ scale: reduce ? 1 : 0.6 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            <Check size={16} /> Copied
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={false}
            animate={{ scale: 1 }}
            style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            <Copy size={16} /> Copy email
          </motion.span>
        )}
      </button>
    </div>
  );
}

export function ExpandButton() {
  const [h, setH] = useState(false);
  return (
    <div style={center}>
      <motion.button
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        animate={{ width: h ? 190 : 120 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        style={{ ...btn, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, overflow: "hidden", whiteSpace: "nowrap", background: "var(--accent)", color: "#0b0b11", border: "none" }}
      >
        <Send size={16} />
        <span>Send</span>
        {h ? (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <ArrowRight size={16} /> Now
          </span>
        ) : null}
      </motion.button>
    </div>
  );
}

export function BlobButton({ reduce }) {
  return (
    <div style={center}>
      <button style={{ ...btn, position: "relative", overflow: "hidden", background: "var(--accent)", color: "#0b0b11", border: "none" }}>
        <motion.span
          aria-hidden
          animate={reduce ? {} : { borderRadius: ["42% 58% 55% 45%", "58% 42% 45% 55%", "42% 58% 55% 45%"], rotate: [0, 180, 360] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", width: 130, height: 130, left: -25, top: -45, background: "rgba(255,255,255,.35)" }}
        />
        <span style={{ position: "relative", zIndex: 1 }}>Blob</span>
      </button>
    </div>
  );
}
