import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE, center, useAutoScroll } from "./_shared.jsx";

const GRADS = ["linear-gradient(135deg,#1b2333,#6b7fa3)", "linear-gradient(135deg,#2b1a3a,#a05fbf)", "linear-gradient(135deg,#10231f,#3fbf9a)", "linear-gradient(135deg,#2a1a12,#d98a3a)"];

export function SmoothScrolling({ reduce, paused }) {
  const ref = useRef(null);
  useAutoScroll(ref, paused, reduce);
  return (
    <div ref={ref} style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflowY: "auto" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, padding: 14 }}>
        {[0, 1, 2, 3].map((i) => <div key={i} style={{ height: 120, borderRadius: 14, background: GRADS[i % 4] }} />)}
      </div>
      <div style={{ height: 500 }} />
    </div>
  );
}

export function ParallaxSections({ reduce, paused }) {
  const ref = useRef(null);
  useAutoScroll(ref, paused, reduce);
  const { scrollYProgress } = useScroll({ container: ref });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -170]);
  return (
    <div ref={ref} style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflowY: "auto" }}>
      <div style={{ position: "sticky", top: 0, height: 240, overflow: "hidden" }}>
        <motion.div style={{ y: y1, position: "absolute", inset: 0, background: GRADS[0], opacity: 0.5 }} />
        <motion.div style={{ y: y2, position: "absolute", left: "22%", top: 60, width: 150, height: 90, borderRadius: 12, background: GRADS[1] }} />
      </div>
      <div style={{ height: 420 }} />
    </div>
  );
}

export function ScrollProgress({ reduce, paused }) {
  const ref = useRef(null);
  useAutoScroll(ref, paused, reduce);
  const { scrollYProgress } = useScroll({ container: ref });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <div ref={ref} style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflowY: "auto" }}>
      <motion.div style={{ scaleX, transformOrigin: "0%", position: "sticky", top: 0, zIndex: 3, height: 4, background: "var(--accent)" }} />
      {[0, 1, 2].map((i) => <div key={i} style={{ margin: 16, height: 130, borderRadius: 14, background: "var(--surface)", border: "1px solid var(--line)" }} />)}
      <div style={{ height: 200 }} />
    </div>
  );
}

export function HorizontalStory({ reduce, paused }) {
  const ref = useRef(null);
  useAutoScroll(ref, paused, reduce);
  const { scrollYProgress } = useScroll({ container: ref });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-72%"]);
  return (
    <div ref={ref} style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflowY: "auto" }}>
      <div style={{ position: "sticky", top: 0, height: 240, overflow: "hidden", display: "flex", alignItems: "center" }}>
        <motion.div style={{ x, display: "flex", gap: 14, paddingLeft: 20 }}>
          {[0, 1, 2, 3, 4].map((i) => <div key={i} style={{ width: 180, height: 130, borderRadius: 14, background: GRADS[i % 4], flex: "none" }} />)}
        </motion.div>
      </div>
      <div style={{ height: 420 }} />
    </div>
  );
}

export function ScrollLinkedZoom({ reduce, paused }) {
  const ref = useRef(null);
  useAutoScroll(ref, paused, reduce);
  const { scrollYProgress } = useScroll({ container: ref });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
  return (
    <div ref={ref} style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflowY: "auto" }}>
      <div style={{ position: "sticky", top: 0, height: 240, display: "grid", placeItems: "center", overflow: "hidden" }}>
        <motion.div style={{ scale, width: "60%", height: 150, borderRadius: 16, background: GRADS[1] }} />
      </div>
      <div style={{ height: 420 }} />
    </div>
  );
}

export function SectionFade({ reduce, paused }) {
  const ref = useRef(null);
  useAutoScroll(ref, paused, reduce);
  return (
    <div ref={ref} style={{ width: "100%", height: "100%", overflowY: "auto", overflowX: "hidden" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 16 }}>
        <div style={{ height: 90 }} />
        {[0, 1, 2].map((i) => (
          <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false, amount: 0.6 }} transition={{ duration: 0.7 }} style={{ margin: 16, width: "80%", height: 140, borderRadius: 16, background: GRADS[i], display: "grid", placeItems: "center", color: "#fff", fontWeight: 700 }}>
            Section {i + 1}
          </motion.div>
        ))}
        <div style={{ height: 120 }} />
      </div>
    </div>
  );
}

export function PageTransitionOverlay() {
  const [page, setPage] = useState(0);
  const [covered, setCovered] = useState(false);
  const next = () => {
    setCovered(true);
    setTimeout(() => { setPage((p) => (p + 1) % 3); setCovered(false); }, 600);
  };
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflow: "hidden", display: "grid", placeItems: "center", background: GRADS[page % 4] }}>
      <button onClick={next} style={{ background: "rgba(255,255,255,.2)", color: "#fff", border: "1px solid rgba(255,255,255,.4)", borderRadius: 999, padding: "10px 22px", cursor: "pointer", fontWeight: 600 }}>Next page</button>
      <AnimatePresence>
        {covered && <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.6, ease: EASE }} style={{ position: "absolute", inset: 0, background: "var(--accent)" }} />}
      </AnimatePresence>
    </div>
  );
}

export function CurtainReveal({ reduce }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflow: "hidden", display: "grid", placeItems: "center", background: GRADS[2] }}>
      <button onClick={() => setOpen((v) => !v)} style={{ position: "relative", zIndex: 2, background: "rgba(0,0,0,.35)", color: "#fff", border: "none", borderRadius: 999, padding: "8px 18px", cursor: "pointer" }}>{open ? "Close" : "Reveal"}</button>
      <motion.div animate={{ x: open ? "-101%" : "0%" }} transition={{ duration: 0.9, ease: EASE }} style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "51%", background: "var(--surface)" }} />
      <motion.div animate={{ x: open ? "101%" : "0%" }} transition={{ duration: 0.9, ease: EASE }} style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: "51%", background: "var(--surface)" }}>
        {reduce && ""}
      </motion.div>
    </div>
  );
}

export function ScrollTextColor({ reduce, paused }) {
  const ref = useRef(null);
  useAutoScroll(ref, paused, reduce);
  const { scrollYProgress } = useScroll({ container: ref });
  const words = "Colour reveals itself word by word as this line scrolls".split(" ");
  return (
    <div ref={ref} style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflowY: "auto" }}>
      <div style={{ position: "sticky", top: 0, height: 240, display: "grid", placeItems: "center", padding: 24 }}>
        <h2 style={{ fontSize: 24, margin: 0, maxWidth: 460 }}>
          {words.map((w, i) => <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>{w}</Word>)}
        </h2>
      </div>
      <div style={{ height: 520 }} />
    </div>
  );
}

function Word({ progress, range, children }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return <motion.span style={{ opacity, marginRight: 6 }}>{children}</motion.span>;
}

export function PinnedStory({ reduce, paused }) {
  const ref = useRef(null);
  useAutoScroll(ref, paused, reduce);
  const { scrollYProgress } = useScroll({ container: ref });
  const [step, setStep] = useState(0);
  const steps = ["Discover", "Design", "Deploy"];
  return (
    <div ref={ref} onScroll={() => { const el = ref.current; setStep(Math.min(2, Math.round((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 2))); }} style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflowY: "auto" }}>
      <div style={{ position: "sticky", top: 0, height: 240, display: "grid", placeItems: "center", background: GRADS[step] }}>
        <span style={{ color: "#fff", fontSize: 24, fontWeight: 700 }}>{steps[step]}</span>
        <motion.div style={{ position: "absolute", bottom: 16, left: 16, right: 16, height: 3, background: "rgba(255,255,255,.3)", borderRadius: 3 }}>
          <motion.div style={{ height: "100%", background: "#fff", scaleX: scrollYProgress, transformOrigin: "0%" }} />
        </motion.div>
      </div>
      <div style={{ height: 720 }} />
    </div>
  );
}

export function VelocityText({ reduce, paused }) {
  const ref = useRef(null);
  const laneRef = useRef(null);
  const velRef = useRef(0);
  const xRef = useRef(0);
  const lastTop = useRef(0);
  useAutoScroll(ref, paused, reduce);
  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const tick = () => {
      xRef.current += 1.2 + velRef.current * 0.6;
      velRef.current *= 0.94;
      if (xRef.current > 600) xRef.current -= 600;
      if (xRef.current < 0) xRef.current += 600;
      if (laneRef.current) laneRef.current.style.transform = `translateX(${-xRef.current}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce, paused]);
  if (reduce) {
    return (
      <div ref={ref} style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflowY: "auto" }}>
        <div style={{ position: "sticky", top: 0, height: 240, display: "grid", placeItems: "center" }}>
          <span style={{ fontSize: 28, fontWeight: 800, letterSpacing: 2 }}>Scroll Velocity Showcase</span>
        </div>
        <div style={{ height: 520 }} />
      </div>
    );
  }
  const words = ["Momentum", "Velocity", "Flow", "Drift", "Glide", "Momentum", "Velocity", "Flow", "Drift", "Glide"];
  return (
    <div ref={ref} onScroll={() => { const el = ref.current; if (!el) return; const delta = el.scrollTop - lastTop.current; lastTop.current = el.scrollTop; velRef.current += delta * 0.08; }} style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflowY: "auto" }}>
      <div style={{ position: "sticky", top: 0, height: 240, display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div ref={laneRef} style={{ display: "flex", gap: 24, paddingLeft: 20, whiteSpace: "nowrap", willChange: "transform" }}>
          {words.map((w, i) => (
            <span key={i} style={{ fontSize: 30, fontWeight: 800, letterSpacing: 1, color: i % 2 ? "var(--accent)" : "#fff" }}>{w}</span>
          ))}
        </div>
      </div>
      <div style={{ height: 560 }} />
    </div>
  );
}

export function StickyHorizontalGallery({ reduce, paused }) {
  const ref = useRef(null);
  useAutoScroll(ref, paused, reduce);
  const { scrollYProgress } = useScroll({ container: ref });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  return (
    <div ref={ref} style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflowY: "auto" }}>
      <div style={{ position: "sticky", top: 0, height: 240, overflow: "hidden", display: "flex", alignItems: "center", background: "var(--surface)" }}>
        <motion.div style={{ x, display: "flex", gap: 14, paddingLeft: 20 }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} style={{ width: 200, height: 150, borderRadius: 14, background: GRADS[i % 4], flex: "none", display: "grid", placeItems: "center", color: "#fff", fontWeight: 700 }}>Card {i + 1}</div>
          ))}
        </motion.div>
      </div>
      <div style={{ height: 560 }} />
    </div>
  );
}

export function ScrollBackgroundShift({ reduce, paused }) {
  const ref = useRef(null);
  useAutoScroll(ref, paused, reduce);
  const { scrollYProgress } = useScroll({ container: ref });
  const opacityA = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const opacityB = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <div ref={ref} style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflowY: "auto" }}>
      <div style={{ position: "sticky", top: 0, height: 240, overflow: "hidden" }}>
        <motion.div style={{ opacity: reduce ? 0.5 : opacityA, position: "absolute", inset: 0, background: GRADS[0] }} />
        <motion.div style={{ opacity: reduce ? 0.5 : opacityB, position: "absolute", inset: 0, background: GRADS[1] }} />
        <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
          <span style={{ color: "#fff", fontSize: 22, fontWeight: 800 }}>Background Shift</span>
        </div>
      </div>
      <div style={{ height: 520 }} />
    </div>
  );
}

export function ScrollSteps({ reduce, paused }) {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  useAutoScroll(ref, paused, reduce);
  const labels = ["Intro", "Build", "Polish", "Ship"];
  return (
    <div ref={ref} onScroll={() => { const el = ref.current; if (!el) return; const max = Math.max(1, el.scrollHeight - el.clientHeight); setActive(Math.min(3, Math.floor((el.scrollTop / max) * 4))); }} style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflowY: "auto" }}>
      <div style={{ display: "flex", gap: 12, padding: 16 }}>
        <div style={{ position: "sticky", top: 16, height: 208, width: 110, flex: "none", display: "flex", flexDirection: "column", gap: 12, justifyContent: "center" }}>
          {labels.map((l, i) => (
            <div key={l} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 12, height: 12, borderRadius: 999, background: i === active ? "var(--accent)" : "rgba(127,127,127,.4)", transition: "background .3s" }} />
              <span style={{ fontSize: 12, fontWeight: i === active ? 800 : 400 }}>{l}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
          {labels.map((l, i) => (
            <div key={l} style={{ height: 160, borderRadius: 14, background: GRADS[i % 4], display: "grid", placeItems: "center", color: "#fff", fontWeight: 700, opacity: i === active ? 1 : 0.55, transition: "opacity .3s" }}>{l}</div>
          ))}
        </div>
      </div>
      <div style={{ height: 240 }} />
    </div>
  );
}

export function ScrollSnapSections({ reduce, paused }) {
  const ref = useRef(null);
  useAutoScroll(ref, paused, reduce);
  return (
    <div ref={ref} style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflowY: "auto", scrollSnapType: "y mandatory" }}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ height: "100%", minHeight: 240, scrollSnapAlign: "start", display: "grid", placeItems: "center", background: GRADS[i % 4] }}>
          <span style={{ color: "#fff", fontSize: 24, fontWeight: 800 }}>Section {i + 1}</span>
        </div>
      ))}
    </div>
  );
}

export function RevealOnEnter({ reduce, paused }) {
  const ref = useRef(null);
  useAutoScroll(ref, paused, reduce);
  return (
    <div ref={ref} style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflowY: "auto" }}>
      <div style={{ height: 120 }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: 16 }}>
        {[0, 1, 2, 3].map((i) => (
          <motion.div key={i} initial={{ opacity: 0, y: reduce ? 0 : 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.5 }} transition={{ duration: 0.6, ease: EASE }} style={{ height: 150, borderRadius: 14, background: GRADS[i % 4], display: "grid", placeItems: "center", color: "#fff", fontWeight: 700 }}>Reveal {i + 1}</motion.div>
        ))}
      </div>
      <div style={{ height: 120 }} />
    </div>
  );
}

export function ScrollZoomHero({ reduce, paused }) {
  const ref = useRef(null);
  useAutoScroll(ref, paused, reduce);
  const { scrollYProgress } = useScroll({ container: ref });
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.25, 1]);
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -40]);
  return (
    <div ref={ref} style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflowY: "auto" }}>
      <div style={{ position: "sticky", top: 0, height: 240, display: "grid", placeItems: "center", overflow: "hidden", background: "#0e0e12" }}>
        <motion.div style={{ scale, width: "72%", height: 160, borderRadius: 18, background: GRADS[1] }} />
        <motion.span style={{ y, position: "absolute", color: "#fff", fontSize: 26, fontWeight: 800 }}>Zoom Hero</motion.span>
      </div>
      <div style={{ height: 520 }} />
    </div>
  );
}

export function ScrollMarquee({ reduce, paused }) {
  const ref = useRef(null);
  const [p, setP] = useState(0.5);
  useAutoScroll(ref, paused, reduce);
  const maxShift = 420;
  return (
    <div ref={ref} onScroll={() => { const el = ref.current; if (!el) return; const max = Math.max(1, el.scrollHeight - el.clientHeight); setP(el.scrollTop / max); }} style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflowY: "auto" }}>
      <div style={{ position: "sticky", top: 0, height: 240, display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ display: "flex", gap: 16, paddingLeft: 20, transform: `translateX(${-(p * maxShift)}px)`, willChange: "transform" }}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} style={{ width: 170, height: 120, borderRadius: 14, background: GRADS[i % 4], flex: "none", display: "grid", placeItems: "center", color: "#fff", fontWeight: 700 }}>Item {i + 1}</div>
          ))}
        </div>
      </div>
      <div style={{ height: 520 }} />
    </div>
  );
}

export function StickyCounters({ reduce, paused }) {
  const ref = useRef(null);
  const [p, setP] = useState(0.6);
  useAutoScroll(ref, paused, reduce);
  const targets = [1200, 98, 36];
  const labels = ["Views", "Score", "Ships"];
  return (
    <div ref={ref} onScroll={() => { const el = ref.current; if (!el) return; const max = Math.max(1, el.scrollHeight - el.clientHeight); setP(el.scrollTop / max); }} style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflowY: "auto" }}>
      <div style={{ position: "sticky", top: 0, height: 240, display: "flex", alignItems: "center", justifyContent: "center", gap: 18, background: "var(--surface)" }}>
        {targets.map((t, i) => (
          <div key={labels[i]} style={{ ...center, flexDirection: "column", gap: 4, width: "auto", height: "auto", padding: 12 }}>
            <span style={{ fontSize: 28, fontWeight: 800 }}>{Math.round((reduce ? 0.6 : p) * t)}</span>
            <span style={{ fontSize: 12, opacity: 0.7 }}>{labels[i]}</span>
          </div>
        ))}
      </div>
      <div style={{ height: 520 }} />
    </div>
  );
}

export function ScrollMask({ reduce, paused }) {
  const ref = useRef(null);
  useAutoScroll(ref, paused, reduce);
  const { scrollYProgress } = useScroll({ container: ref });
  const clip = useTransform(scrollYProgress, [0, 1], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  return (
    <div ref={ref} style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflowY: "auto" }}>
      <div style={{ position: "sticky", top: 0, height: 240, display: "grid", placeItems: "center", overflow: "hidden", background: "#111" }}>
        <div style={{ position: "absolute", inset: 16, borderRadius: 14, background: GRADS[2], opacity: 0.35 }} />
        <motion.div style={{ clipPath: reduce ? "inset(0 40% 0 0)" : clip, position: "absolute", inset: 16, borderRadius: 14, background: GRADS[1], display: "grid", placeItems: "center" }}>
          <span style={{ color: "#fff", fontSize: 22, fontWeight: 800 }}>Mask Reveal</span>
        </motion.div>
      </div>
      <div style={{ height: 520 }} />
    </div>
  );
}
