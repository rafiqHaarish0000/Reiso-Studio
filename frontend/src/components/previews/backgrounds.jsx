import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { usePointer } from "./_shared.jsx";

const fill = { position: "absolute", inset: 0 };

function useCanvas(draw, reduce, count = 60) {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    let raf;
    let particles = [];
    const resize = () => {
      c.width = c.offsetWidth;
      c.height = c.offsetHeight;
      particles = Array.from({ length: count }, () => ({ x: Math.random() * c.width, y: Math.random() * c.height, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4, r: Math.random() * 1.8 + 0.4 }));
    };
    resize();
    window.addEventListener("resize", resize);
    const loop = () => {
      draw(ctx, c, particles, reduce);
      if (!reduce) {
        for (const p of particles) {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > c.width) p.vx *= -1;
          if (p.y < 0 || p.y > c.height) p.vy *= -1;
        }
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [draw, reduce, count]);
  return ref;
}

export function AnimatedGradient({ reduce }) {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflow: "hidden", background: "linear-gradient(120deg,#1b2333,#3a2a6b,#1f6b6b,#6b2f3a)", backgroundSize: "300% 300%", animation: reduce ? "none" : "ml-pan 10s ease infinite" }}>
      <div style={{ ...fill, opacity: 0.15, backgroundImage: "radial-gradient(rgba(255,255,255,.5) 1px, transparent 1px)", backgroundSize: "4px 4px" }} />
    </div>
  );
}

export function Aurora({ reduce }) {
  const blob = (color, x, y, d) => (
    <div style={{ position: "absolute", width: 260, height: 260, left: x, top: y, borderRadius: "50%", background: color, filter: "blur(60px)", opacity: 0.55, animation: reduce ? "none" : `ml-float ${d}s ease-in-out infinite alternate` }} />
  );
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflow: "hidden", background: "#0a0b12" }}>
      {blob("#5b8cff", "10%", "-10%", 8)}
      {blob("#a05fbf", "55%", "20%", 11)}
      {blob("#3fbf9a", "30%", "45%", 9)}
    </div>
  );
}

export function GrainTexture() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, background: "var(--bg)" }}>
      <div style={{ ...fill, backgroundImage: "radial-gradient(at 30% 30%, #2b3560, #0a0b12)" }} />
      <div style={{ ...fill, opacity: 0.35, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
      <div style={{ ...fill, display: "grid", placeItems: "center", color: "#fff", fontWeight: 600 }}>Film grain</div>
    </div>
  );
}

export function GlassPanels() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflow: "hidden", backgroundImage: "linear-gradient(120deg,#3a2a6b,#1f6b6b,#6b2f3a)", display: "grid", placeItems: "center" }}>
      <div style={{ width: "70%", maxWidth: 360, padding: 18, borderRadius: 18, background: "rgba(255,255,255,.1)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,.25)", color: "#fff" }}>
        <b>Frosted glass</b>
        <p style={{ margin: "8px 0 0", fontSize: 13, opacity: 0.85 }}>Translucent panel with backdrop blur over a colourful backdrop.</p>
      </div>
    </div>
  );
}

export function CursorGlow() {
  const { ref, pos, handlers } = usePointer();
  return (
    <div ref={ref} {...handlers} style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, background: "var(--bg)", display: "grid", placeItems: "center" }}>
      <motion.div animate={{ left: `${pos.x * 100}%`, top: `${pos.y * 100}%` }} transition={{ type: "spring", stiffness: 120, damping: 20 }} style={{ position: "absolute", width: 240, height: 240, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,156,255,.35), transparent 60%)", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />
      <span style={{ color: "var(--muted)", fontSize: 13 }}>glow follows cursor</span>
    </div>
  );
}

export function AnimatedGrid() {
  const [on, setOn] = useState(false);
  return (
    <div onMouseMove={() => setOn(true)} onMouseLeave={() => setOn(false)} style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, background: "var(--bg)", backgroundImage: "linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px)", backgroundSize: "34px 34px", display: "grid", placeItems: "center" }}>
      <div style={{ ...fill, background: "radial-gradient(circle at center, rgba(124,156,255,.28), transparent 55%)", opacity: on ? 1 : 0.3, transition: "opacity .4s", animation: "ml-pulse 3s ease-in-out infinite" }} />
      <span style={{ position: "relative", color: "var(--muted)", fontSize: 13 }}>hover to light the grid</span>
    </div>
  );
}

export function ParticleBackground({ reduce }) {
  const ref = useCanvas((ctx, c, pts) => {
    ctx.clearRect(0, 0, c.width, c.height);
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i];
      for (let j = i + 1; j < pts.length; j++) {
        const b = pts[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 100) {
          ctx.strokeStyle = `rgba(124,156,255,${0.14 * (1 - d / 100)})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      ctx.fillStyle = "rgba(160,180,255,.85)";
      ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
    }
  }, reduce, 46);
  return <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, background: "#05060b" }}><canvas ref={ref} style={{ width: "100%", height: "100%" }} /></div>;
}

export function LiquidBlobs({ reduce }) {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflow: "hidden", background: "var(--bg)" }}>
      {[["#5b8cff", "15%", "20%", 9], ["#a05fbf", "55%", "35%", 12], ["#3fbf9a", "35%", "55%", 10]].map(([c, x, y, d], i) => (
        <motion.div key={i} animate={reduce ? {} : { x: [0, 40, -20, 0], y: [0, -30, 20, 0] }} transition={{ duration: d, repeat: Infinity, ease: "easeInOut" }} style={{ position: "absolute", left: x, top: y, width: 160, height: 160, background: c, opacity: 0.45, borderRadius: "42% 58% 63% 37% / 41% 44% 56% 59%", filter: "blur(18px)" }} />
      ))}
      <div style={{ ...fill, backdropFilter: "blur(2px)" }} />
    </div>
  );
}

export function SpotlightReveal() {
  const { ref, pos, handlers } = usePointer();
  return (
    <div ref={ref} {...handlers} style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, background: "#05060b", display: "grid", placeItems: "center" }}>
      <span style={{ position: "absolute", color: "var(--muted)", fontSize: 13 }}>move pointer to reveal</span>
      <div style={{ ...fill, background: "radial-gradient(circle at 50% 50%, #3a2a6b, #05060b)", backgroundImage: "radial-gradient(rgba(255,255,255,.7) 1px, transparent 1.5px)", backgroundSize: "26px 26px", maskImage: `radial-gradient(160px circle at ${pos.x * 100}% ${pos.y * 100}%, black, transparent 70%)`, WebkitMaskImage: `radial-gradient(160px circle at ${pos.x * 100}% ${pos.y * 100}%, black, transparent 70%)` }} />
    </div>
  );
}

export function AnimatedBorderGlow({ reduce }) {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflow: "hidden", background: "var(--bg)", display: "grid", placeItems: "center" }}>
      <div style={{ position: "relative", width: 200, height: 130, borderRadius: 18, padding: 2, background: "conic-gradient(from 0deg, transparent 0 70%, #7c9cff 85%, transparent 100%)", animation: reduce ? "none" : "ml-spinbg 3s linear infinite" }}>
        <div style={{ width: "100%", height: "100%", borderRadius: 16, background: "var(--surface)", display: "grid", placeItems: "center", color: "var(--fg)" }}>Glowing border</div>
      </div>
    </div>
  );
}

export function DotGrid({ reduce }) {
  const { ref, pos, handlers } = usePointer();
  return (
    <div ref={ref} {...handlers} style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflow: "hidden", background: "#0a0b12" }}>
      <div style={{ ...fill, backgroundImage: "radial-gradient(rgba(160,180,255,.55) 1.2px, transparent 1.6px)", backgroundSize: "22px 22px", animation: reduce ? "none" : "ml-pulse 3.2s ease-in-out infinite" }} />
      <div style={{ ...fill, backgroundImage: "radial-gradient(rgba(200,215,255,.9) 1.4px, transparent 1.8px)", backgroundSize: "22px 22px", maskImage: `radial-gradient(180px circle at ${pos.x * 100}% ${pos.y * 100}%, black, transparent 70%)`, WebkitMaskImage: `radial-gradient(180px circle at ${pos.x * 100}% ${pos.y * 100}%, black, transparent 70%)` }} />
    </div>
  );
}

export function ConicAurora({ reduce }) {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflow: "hidden", background: "#0a0b12" }}>
      <div style={{ ...fill, background: "radial-gradient(420px circle at 20% 20%, rgba(124,92,255,.5), transparent 65%), radial-gradient(460px circle at 80% 75%, rgba(45,200,180,.4), transparent 65%), radial-gradient(360px circle at 60% 30%, rgba(200,90,200,.3), transparent 65%)" }} />
      <div style={{ position: "absolute", width: "150%", height: "150%", left: "-25%", top: "-25%", background: "conic-gradient(from 0deg, rgba(91,140,255,.0), rgba(91,140,255,.45), rgba(160,95,191,.45), rgba(63,191,154,.45), rgba(91,140,255,.0))", filter: "blur(60px)", opacity: 0.7, mixBlendMode: "screen", animation: reduce ? "none" : "ml-spinbg 16s linear infinite" }} />
    </div>
  );
}

export function Starfield({ reduce }) {
  const ref = useCanvas((ctx, c, pts, red) => {
    const cx = c.width / 2;
    const cy = c.height / 2;
    const maxD = Math.hypot(cx, cy);
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#05060b";
    ctx.fillRect(0, 0, c.width, c.height);
    for (const p of pts) {
      if (p.angle === undefined) {
        p.angle = Math.random() * Math.PI * 2;
        p.dist = Math.random() * maxD;
        p.speed = 0.6 + Math.random() * 1.8;
        p.vx = 0;
        p.vy = 0;
        p.r = Math.random() * 1.6 + 0.4;
      }
      if (!red) {
        p.dist += p.speed;
        if (p.dist > maxD) p.dist = 0;
      }
      const x = cx + Math.cos(p.angle) * p.dist;
      const y = cy + Math.sin(p.angle) * p.dist;
      const a = 0.25 + 0.75 * (p.dist / maxD);
      ctx.fillStyle = `rgba(200,215,255,${a.toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(x, y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }, reduce, 90);
  return <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflow: "hidden", background: "#05060b" }}><canvas ref={ref} style={{ width: "100%", height: "100%" }} /></div>;
}

export function GradientMesh({ reduce }) {
  const blobs = [
    { c: "#5b8cff", x: "5%", y: "10%", d: 9, dx: [0, 50, -20, 0], dy: [0, -30, 25, 0] },
    { c: "#a05fbf", x: "55%", y: "5%", d: 12, dx: [0, -45, 25, 0], dy: [0, 35, -20, 0] },
    { c: "#3fbf9a", x: "30%", y: "50%", d: 10, dx: [0, 35, -35, 0], dy: [0, -25, 30, 0] },
    { c: "#e0609a", x: "60%", y: "55%", d: 14, dx: [0, -30, 30, 0], dy: [0, 25, -30, 0] },
  ];
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflow: "hidden", background: "#0a0b12" }}>
      {blobs.map((b, i) => (
        <motion.div key={i} animate={reduce ? {} : { x: b.dx, y: b.dy }} transition={{ duration: b.d, repeat: Infinity, ease: "easeInOut" }} style={{ position: "absolute", left: b.x, top: b.y, width: 260, height: 260, borderRadius: "50%", background: b.c, filter: "blur(70px)", opacity: 0.55 }} />
      ))}
    </div>
  );
}

export function RadialPulse({ reduce }) {
  const rings = [0, 1, 2];
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflow: "hidden", background: "#05060b", display: "grid", placeItems: "center" }}>
      {rings.map((i) => (
        reduce ? (
          <div key={i} style={{ position: "absolute", left: "50%", top: "50%", width: 220, height: 220, marginLeft: -110, marginTop: -110, borderRadius: "50%", border: "2px solid rgba(124,156,255,.5)", opacity: 0.5 - i * 0.12, transform: `scale(${0.45 + i * 0.22})` }} />
        ) : (
          <motion.div key={i} animate={{ scale: [0.3, 1], opacity: [0.8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: i * 1 }} style={{ position: "absolute", left: "50%", top: "50%", width: 220, height: 220, marginLeft: -110, marginTop: -110, borderRadius: "50%", border: "2px solid rgba(124,156,255,.8)" }} />
        )
      ))}
    </div>
  );
}

export function DiagonalStripes({ reduce }) {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflow: "hidden", background: "#0a0b12" }}>
      <style>{`@keyframes ml-stripeslide { to { background-position: 56px 0; } }`}</style>
      <div style={{ ...fill, backgroundImage: "repeating-linear-gradient(45deg, rgba(124,156,255,.35) 0 12px, transparent 12px 28px)", animation: reduce ? "none" : "ml-stripeslide 2.5s linear infinite" }} />
      <div style={{ ...fill, background: "radial-gradient(circle at 50% 50%, transparent 30%, rgba(5,6,11,.7) 100%)" }} />
    </div>
  );
}

export function FloatingOrbs({ reduce }) {
  const orbs = [
    { dx: [0, 30, -20, 0], dy: [0, -40, 20, 0], d: 7, s: 54, x: "12%", y: "20%", c: "radial-gradient(circle at 35% 35%, #ffffff, #5b8cff 55%, transparent 72%)" },
    { dx: [0, -35, 25, 0], dy: [0, 30, -25, 0], d: 9, s: 72, x: "62%", y: "15%", c: "radial-gradient(circle at 35% 35%, #ffffff, #a05fbf 55%, transparent 72%)" },
    { dx: [0, 25, -30, 0], dy: [0, -25, 30, 0], d: 8, s: 44, x: "38%", y: "55%", c: "radial-gradient(circle at 35% 35%, #ffffff, #3fbf9a 55%, transparent 72%)" },
    { dx: [0, -25, 20, 0], dy: [0, -30, 25, 0], d: 11, s: 60, x: "75%", y: "58%", c: "radial-gradient(circle at 35% 35%, #ffffff, #e0609a 55%, transparent 72%)" },
    { dx: [0, 20, -25, 0], dy: [0, 35, -20, 0], d: 10, s: 38, x: "22%", y: "68%", c: "radial-gradient(circle at 35% 35%, #ffffff, #7cd4ff 55%, transparent 72%)" },
  ];
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflow: "hidden", background: "#05060b" }}>
      {orbs.map((o, i) => (
        <motion.div key={i} animate={reduce ? {} : { x: o.dx, y: o.dy }} transition={{ duration: o.d, repeat: Infinity, ease: "easeInOut" }} style={{ position: "absolute", left: o.x, top: o.y, width: o.s, height: o.s, borderRadius: "50%", background: o.c, filter: "blur(6px)", opacity: 0.9, boxShadow: "0 0 32px rgba(124,156,255,.45)" }} />
      ))}
    </div>
  );
}

export function GridWarp() {
  const { ref, pos, handlers } = usePointer();
  return (
    <div ref={ref} {...handlers} style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflow: "hidden", background: "#05060b" }}>
      <div style={{ ...fill, background: "radial-gradient(600px circle at 50% 120%, rgba(91,140,255,.25), transparent 65%)" }} />
      <div style={{ position: "absolute", left: "-20%", right: "-20%", top: "38%", bottom: "-30%", backgroundImage: "linear-gradient(rgba(124,156,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(124,156,255,.5) 1px, transparent 1px)", backgroundSize: "36px 36px", transform: `rotateX(60deg) skewX(${(pos.x - 0.5) * 10}deg)`, transformOrigin: "top center" }} />
      <div style={{ ...fill, background: `radial-gradient(220px circle at ${pos.x * 100}% ${pos.y * 100}%, rgba(160,190,255,.45), transparent 70%)`, mixBlendMode: "screen" }} />
    </div>
  );
}

export function SpotlightGrid() {
  const { ref, pos, handlers } = usePointer();
  const lines = "linear-gradient(rgba(124,156,255,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(124,156,255,.18) 1px, transparent 1px)";
  const bright = "linear-gradient(rgba(190,205,255,.85) 1px, transparent 1px), linear-gradient(90deg, rgba(190,205,255,.85) 1px, transparent 1px)";
  return (
    <div ref={ref} {...handlers} style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflow: "hidden", background: "#05060b" }}>
      <div style={{ ...fill, backgroundImage: lines, backgroundSize: "30px 30px" }} />
      <div style={{ ...fill, backgroundImage: bright, backgroundSize: "30px 30px", maskImage: `radial-gradient(170px circle at ${pos.x * 100}% ${pos.y * 100}%, black, transparent 70%)`, WebkitMaskImage: `radial-gradient(170px circle at ${pos.x * 100}% ${pos.y * 100}%, black, transparent 70%)` }} />
    </div>
  );
}

export function TopographyLines({ reduce }) {
  const paths = [
    "M -40 40 Q 80 10 200 45 T 440 40 T 680 45 T 920 35",
    "M -40 80 Q 80 50 200 85 T 440 80 T 680 85 T 920 75",
    "M -40 120 Q 80 90 200 125 T 440 120 T 680 125 T 920 115",
    "M -40 160 Q 80 130 200 165 T 440 160 T 680 165 T 920 155",
    "M -40 200 Q 80 170 200 205 T 440 200 T 680 205 T 920 195",
    "M -40 240 Q 80 210 200 245 T 440 240 T 680 245 T 920 235",
  ];
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflow: "hidden", background: "#070a12" }}>
      <motion.div animate={reduce ? {} : { x: [0, -120, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "130%" }}>
        <svg viewBox="0 0 880 280" preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: "block" }}>
          {paths.map((d, i) => (
            <path key={i} d={d} fill="none" stroke={i % 2 === 0 ? "rgba(124,156,255,.7)" : "rgba(63,191,154,.6)"} strokeWidth={1.5} opacity={0.9 - i * 0.1} />
          ))}
        </svg>
      </motion.div>
    </div>
  );
}
