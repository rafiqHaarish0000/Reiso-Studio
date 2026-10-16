import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE, center, useAutoScroll, usePointer } from "./_shared.jsx";

const H = { fontSize: "clamp(30px,6vw,76px)", lineHeight: 0.98, fontWeight: 700, letterSpacing: "-0.04em", margin: 0 };

export function OversizedHeroType({ reduce }) {
  const [hover, setHover] = useState(false);
  return (
    <div style={center}>
      <motion.h2
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE }}
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
        style={{ ...H, letterSpacing: hover ? "-0.01em" : "-0.04em", transition: "letter-spacing .5s ease" }}
      >
        Design in motion
      </motion.h2>
    </div>
  );
}

function Split({ text, by }) {
  const parts = by === "word" ? text.split(" ") : text.split("");
  return parts;
}

export function WordReveal({ reduce, playKey = 0 }) {
  const words = Split({ text: "Words rise into place", by: "word" });
  return (
    <div style={center}>
      <h2 style={{ ...H, display: "flex", flexWrap: "wrap", gap: "0.28em", justifyContent: "center" }}>
        {words.map((w, i) => (
          <span key={`${playKey}-${i}`} style={{ overflow: "hidden", display: "inline-block" }}>
            <motion.span
              style={{ display: "inline-block" }}
              initial={reduce ? { opacity: 0 } : { y: "110%" }}
              animate={reduce ? { opacity: 1 } : { y: "0%" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
            >
              {w}
            </motion.span>
          </span>
        ))}
      </h2>
    </div>
  );
}

export function CharReveal({ reduce, playKey = 0 }) {
  const chars = "Letters emerge".split("");
  return (
    <div style={center}>
      <motion.h2 style={{ ...H, display: "inline-flex" }} whileHover="hover" initial="rest" animate="rest">
        {chars.map((c, i) => (
          <motion.span
            key={`${playKey}-${i}`}
            style={{ display: "inline-block" }}
            variants={{ rest: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 14 }, hover: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.4, delay: i * 0.04, ease: EASE }}
          >
            {c === " " ? "\u00A0" : c}
          </motion.span>
        ))}
      </motion.h2>
    </div>
  );
}

export function TextMaskReveal({ reduce, playKey = 0 }) {
  return (
    <div style={center}>
      <div style={{ position: "relative", overflow: "hidden" }}>
        <motion.h2
          key={playKey}
          style={H}
          initial={{ clipPath: reduce ? "inset(0 0 0 0)" : "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          Masked reveal
        </motion.h2>
        {!reduce && (
          <motion.span
            initial={{ x: "-120%" }}
            animate={{ x: "120%" }}
            transition={{ duration: 1.1, ease: EASE }}
            style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,transparent,var(--accent),transparent)", mixBlendMode: "overlay" }}
          />
        )}
      </div>
    </div>
  );
}

export function ScrollTextReveal({ reduce, paused }) {
  const words = "Revealed as you scroll through the line".split(" ");
  const [p, setP] = useState(reduce ? 1 : 0);
  const ref = useRef(null);
  useAutoScroll(ref, paused, reduce);
  return (
    <div
      ref={ref}
      onScroll={(e) => {
        const el = e.currentTarget;
        const max = el.scrollHeight - el.clientHeight;
        setP(max > 0 ? el.scrollTop / max : 1);
      }}
      style={{ width: "100%", height: "100%", overflowY: "auto", overflowX: "hidden", overscrollBehavior: "contain" }}
    >
      <div style={{ ...center, height: "auto", flexDirection: "column", gap: 40 }}>
        <div style={{ height: 200 }} />
        <h2 style={{ ...H, fontSize: "clamp(24px,4vw,44px)", maxWidth: 620, padding: 20 }}>
          {words.map((w, i) => (
            <span key={i} style={{ opacity: i / words.length <= p ? 1 : 0.15, transition: "opacity .3s" }}>
              {w}{" "}
            </span>
          ))}
        </h2>
        <div style={{ height: 260 }} />
      </div>
    </div>
  );
}

export function GradientTextFx({ reduce }) {
  return (
    <div style={center}>
      <h2
        style={{
          ...H,
          backgroundImage: "linear-gradient(90deg,var(--accent),#7c9cff,#42e6c0,var(--accent))",
          backgroundSize: "300% 100%",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          animation: reduce ? "none" : "ml-gradient 6s linear infinite",
        }}
      >
        Gradient headline
      </h2>
    </div>
  );
}

export function ScrambleText({ reduce, playKey = 0 }) {
  const target = "DECRYPTED";
  const glyphs = "ABCDEF0123456789#%&";
  const [text, setText] = useState(reduce ? target : "");
  useEffect(() => {
    if (reduce) return;
    let frame = 0;
    const id = setInterval(() => {
      frame++;
      const solved = Math.floor(frame / 3);
      setText(
        target
          .split("")
          .map((c, i) => (i < solved ? c : glyphs[Math.floor(Math.random() * glyphs.length)]))
          .join(""),
      );
      if (solved >= target.length) clearInterval(id);
    }, 45);
    return () => clearInterval(id);
  }, [reduce, playKey]);
  return (
    <div style={center}>
      <h2 style={{ ...H, fontFamily: "ui-monospace, monospace", letterSpacing: "0.02em" }}>{text}</h2>
    </div>
  );
}

export function VariableFont() {
  const { ref, pos, handlers } = usePointer();
  const wght = 200 + Math.round(pos.x * 700);
  const wdth = 75 + Math.round(pos.y * 50);
  return (
    <div ref={ref} {...handlers} style={center}>
      <h2 style={{ ...H, fontVariationSettings: `"wght" ${wght}, "wdth" ${wdth}`, transition: "font-variation-settings .2s" }}>
        Variable
      </h2>
    </div>
  );
}

export function Typewriter({ reduce }) {
  const full = "Typing itself, automatically.";
  const [n, setN] = useState(reduce ? full.length : 0);
  useEffect(() => {
    if (reduce) return;
    let i = 0;
    let dir = 1;
    const id = setInterval(() => {
      i += dir;
      setN(i);
      if (i === full.length) dir = -1;
      if (i === 0) dir = 1;
    }, 90);
    return () => clearInterval(id);
  }, [reduce]);
  return (
    <div style={center}>
      <h2 style={{ ...H, fontFamily: "ui-monospace, monospace", fontSize: "clamp(22px,3.4vw,40px)" }}>
        {full.slice(0, n)}
        <span style={{ animation: reduce ? "none" : "ml-blink 1s steps(1) infinite" }}>▌</span>
      </h2>
    </div>
  );
}

export function SplitColorType() {
  const [hover, setHover] = useState(false);
  const a = hover ? "var(--fg)" : "var(--accent)";
  const b = hover ? "var(--accent)" : "var(--fg)";
  return (
    <div style={center}>
      <h2
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ ...H, cursor: "pointer" }}
      >
        <span style={{ color: a, transition: "color .3s" }}>Split</span>{" "}
        <span style={{ color: b, transition: "color .3s" }}>Color</span>
      </h2>
    </div>
  );
}

export function LineReveal({ reduce }) {
  const lines = ["Design in", "motion today"];
  return (
    <div style={{ ...center, minHeight: 240, overflow: "hidden" }}>
      <h2 style={{ ...H, display: "flex", flexDirection: "column", alignItems: "center" }}>
        {lines.map((line, i) => (
          <span key={i} style={{ overflow: "hidden", display: "block" }}>
            <motion.span
              style={{ display: "block" }}
              initial={reduce ? { opacity: 0 } : { y: "110%" }}
              whileInView={reduce ? { opacity: 1 } : { y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.14, ease: EASE }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </h2>
    </div>
  );
}

export function RotatingWords({ reduce }) {
  const words = ["faster", "bolder", "smoother"];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setIdx((v) => (v + 1) % 3), 1800);
    return () => clearInterval(id);
  }, [reduce]);
  return (
    <div style={{ ...center, minHeight: 240, overflow: "hidden" }}>
      <h2 style={{ ...H, display: "flex", alignItems: "baseline", gap: "0.25em", justifyContent: "center" }}>
        <span>Ship</span>
        <span style={{ overflow: "hidden", display: "inline-block", verticalAlign: "bottom" }}>
          <motion.span
            key={reduce ? "static" : idx}
            style={{ display: "inline-block", color: "var(--accent)" }}
            initial={reduce ? { opacity: 1, y: 0 } : { y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
          >
            {words[reduce ? 0 : idx]}
          </motion.span>
        </span>
      </h2>
    </div>
  );
}

export function MarkerHighlight({ reduce }) {
  return (
    <div style={{ ...center, minHeight: 240, overflow: "hidden" }}>
      <h2 style={{ ...H, position: "relative", display: "inline-block", padding: "0 0.2em" }}>
        <span
          aria-hidden
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "12%",
            bottom: "8%",
            transform: "skewX(-12deg)",
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={reduce ? { duration: 0 } : { duration: 0.8, ease: EASE, delay: 0.2 }}
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              background: "var(--accent)",
              opacity: 0.45,
              transformOrigin: "left center",
            }}
          />
        </span>
        <span style={{ position: "relative" }}>Marked for greatness</span>
      </h2>
    </div>
  );
}

export function BlurInHeadline({ reduce }) {
  return (
    <div style={{ ...center, minHeight: 240, overflow: "hidden" }}>
      <motion.h2
        style={H}
        initial={reduce ? { opacity: 0 } : { opacity: 0, filter: "blur(12px)", scale: 0.96 }}
        animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        Focus arrives
      </motion.h2>
    </div>
  );
}

export function OutlineFillText({ reduce }) {
  const [hover, setHover] = useState(false);
  return (
    <div style={{ ...center, minHeight: 240, overflow: "hidden" }}>
      <h2
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        tabIndex={0}
        style={{
          ...H,
          position: "relative",
          cursor: "pointer",
          color: "transparent",
          WebkitTextStroke: "1px var(--fg)",
        }}
      >
        Outlined
        <motion.span
          aria-hidden
          initial={false}
          animate={{ clipPath: hover ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }}
          transition={reduce ? { duration: 0 } : { duration: 0.6, ease: EASE }}
          style={{
            position: "absolute",
            inset: 0,
            color: "var(--fg)",
            WebkitTextStroke: "0px transparent",
            pointerEvents: "none",
          }}
        >
          Outlined
        </motion.span>
      </h2>
    </div>
  );
}

export function ImageFillText({ reduce }) {
  return (
    <div style={{ ...center, minHeight: 240, overflow: "hidden" }}>
      <h2
        style={{
          ...H,
          backgroundImage: "linear-gradient(100deg,#ff5f6d,#ffc371,#42e6c0,#7c9cff,#ff5f6d)",
          backgroundSize: "300% 100%",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          animation: reduce ? "none" : "ml-gradient 8s linear infinite",
        }}
      >
        Gradient story
      </h2>
    </div>
  );
}

export function GlitchText({ reduce }) {
  const [glitch, setGlitch] = useState(false);
  const [shift, setShift] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setShift({ x: Math.random() * 8 - 4, y: Math.random() * 4 - 2 });
      setGlitch(true);
      setTimeout(() => setGlitch(false), 300);
    }, 2400);
    return () => clearInterval(id);
  }, [reduce]);
  const active = glitch && !reduce;
  return (
    <div style={{ ...center, minHeight: 240, overflow: "hidden" }}>
      <h2
        style={{
          ...H,
          position: "relative",
          fontFamily: "ui-monospace, monospace",
          letterSpacing: "0.06em",
          transform: active ? `translate(${shift.x}px, ${shift.y}px)` : "none",
        }}
      >
        GLITCH
        {active && (
          <>
            <span
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                color: "#ff2d55",
                transform: `translate(${-4 + shift.x}px, ${shift.y}px)`,
                clipPath: "inset(10% 0 55% 0)",
                opacity: 0.85,
                pointerEvents: "none",
              }}
            >
              GLITCH
            </span>
            <span
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                color: "#22d3ee",
                transform: `translate(${4 - shift.x}px, ${-shift.y}px)`,
                clipPath: "inset(55% 0 12% 0)",
                opacity: 0.85,
                pointerEvents: "none",
              }}
            >
              GLITCH
            </span>
          </>
        )}
      </h2>
    </div>
  );
}

export function KineticHeadline({ reduce }) {
  if (reduce) {
    return (
      <div style={{ ...center, minHeight: 240, overflow: "hidden" }}>
        <h2 style={{ ...H, whiteSpace: "nowrap" }}>KINETIC TYPE</h2>
      </div>
    );
  }
  return (
    <div style={{ ...center, minHeight: 240, overflow: "hidden" }}>
      <div style={{ width: "100%", overflow: "hidden", display: "flex", justifyContent: "center" }}>
        <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 6, ease: "linear", repeat: Infinity }} style={{ display: "flex", width: "max-content" }}>
          {[0, 1].map((n) => (
            <span key={n} style={{ display: "flex", whiteSpace: "nowrap" }}>
              <span style={H}>KINETIC&nbsp;</span>
              <motion.span
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{ ...H, color: "var(--accent)" }}
              >
                TYPE&nbsp;
              </motion.span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export function AnimatedUnderline({ reduce }) {
  const links = ["Work", "Studio", "Contact"];
  const [active, setActive] = useState(-1);
  return (
    <div style={{ ...center, minHeight: 240, overflow: "hidden" }}>
      <nav style={{ display: "flex", gap: 32 }}>
        {links.map((label, i) => (
          <a
            key={label}
            href="#"
            onClick={(e) => e.preventDefault()}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(-1)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(-1)}
            style={{
              position: "relative",
              fontSize: 20,
              fontWeight: 600,
              color: "var(--fg)",
              textDecoration: "none",
              paddingBottom: 6,
            }}
          >
            {label}
            <motion.span
              initial={false}
              animate={{ scaleX: active === i ? 1 : 0 }}
              transition={reduce ? { duration: 0 } : { duration: 0.35, ease: EASE }}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: 2,
                background: "var(--accent)",
                transformOrigin: "left center",
              }}
            />
          </a>
        ))}
      </nav>
    </div>
  );
}

export function TitleTracking({ reduce }) {
  const [hover, setHover] = useState(false);
  return (
    <div style={{ ...center, minHeight: 240, overflow: "hidden" }}>
      <motion.h2
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        initial={reduce ? { opacity: 1 } : { opacity: 0, letterSpacing: "-0.3em" }}
        animate={{ opacity: 1, letterSpacing: hover ? "-0.08em" : "0.02em" }}
        transition={reduce ? { duration: 0 } : { duration: 1, ease: EASE }}
        style={{ ...H, cursor: "default" }}
      >
        Tracking
      </motion.h2>
    </div>
  );
}
