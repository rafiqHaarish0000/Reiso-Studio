import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { center, useAutoScroll, usePointer } from "./_shared.jsx";

const GRADS = ["linear-gradient(135deg,#1b2333,#6b7fa3)", "linear-gradient(135deg,#2b1a3a,#a05fbf)", "linear-gradient(135deg,#10231f,#3fbf9a)", "linear-gradient(135deg,#2a1a12,#d98a3a)"];

export function Rotating3DObject({ reduce }) {
  const { ref, pos, handlers } = usePointer();
  const face = { position: "absolute", width: 100, height: 100, left: 50, top: 50, marginLeft: -50, marginTop: -50, background: "rgba(124,156,255,.22)", border: "1px solid var(--accent)", display: "grid", placeItems: "center", fontSize: 12, color: "var(--fg)" };
  return (
    <div ref={ref} {...handlers} style={{ ...center, perspective: 700 }}>
      <div style={{ position: "relative", width: 200, height: 200, transformStyle: "preserve-3d", transform: `rotateX(${(0.5 - pos.y) * 30}deg) rotateY(${pos.x * 360}deg)`, transition: "transform .1s", animation: reduce ? undefined : undefined }}>
        <div style={{ ...face, transform: "translateZ(50px)" }}>1</div>
        <div style={{ ...face, transform: "rotateY(180deg) translateZ(50px)" }}>2</div>
        <div style={{ ...face, transform: "rotateY(90deg) translateZ(50px)" }}>3</div>
        <div style={{ ...face, transform: "rotateY(-90deg) translateZ(50px)" }}>4</div>
        <div style={{ ...face, transform: "rotateX(90deg) translateZ(50px)" }}>5</div>
        <div style={{ ...face, transform: "rotateX(-90deg) translateZ(50px)" }}>6</div>
      </div>
    </div>
  );
}

export function Parallax3DLayers() {
  const { ref, pos, handlers } = usePointer();
  return (
    <div ref={ref} {...handlers} style={{ ...center, perspective: 800 }}>
      <div style={{ position: "relative", width: 260, height: 170, transformStyle: "preserve-3d" }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 16, background: GRADS[0], transform: `translateZ(-60px) translateX(${(pos.x - 0.5) * -10}px)` }} />
        <div style={{ position: "absolute", left: 24, top: 26, width: 90, height: 60, borderRadius: 12, background: GRADS[1], transform: `translateZ(40px) translateX(${(pos.x - 0.5) * 40}px)` }} />
        <div style={{ position: "absolute", right: 24, top: 44, width: 110, height: 70, borderRadius: 12, background: GRADS[2], transform: `translateZ(80px) translateX(${(pos.x - 0.5) * 80}px)` }} />
      </div>
    </div>
  );
}

export function Scroll3DRotation({ reduce, paused }) {
  const ref = useRef(null);
  useAutoScroll(ref, paused, reduce);
  const { scrollYProgress } = useScroll({ container: ref });
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  return (
    <div ref={ref} style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflowY: "auto", perspective: 900 }}>
      <div style={{ position: "sticky", top: 0, height: 240, display: "grid", placeItems: "center" }}>
        <motion.div style={{ rotateY, width: 200, height: 130, borderRadius: 16, background: GRADS[1], transformStyle: "preserve-3d", boxShadow: "0 30px 60px rgba(0,0,0,.5)" }} />
      </div>
      <div style={{ height: 520 }} />
    </div>
  );
}

export function PerspectiveGallery() {
  const { ref, pos, handlers } = usePointer();
  return (
    <div ref={ref} {...handlers} style={{ ...center, perspective: 1000 }}>
      <div style={{ display: "flex", gap: 12, transform: `rotateY(${(pos.x - 0.5) * 20}deg)`, transition: "transform .15s" }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ width: 90, height: 120, borderRadius: 12, background: GRADS[i], transform: `translateZ(${i * 24}px)`, boxShadow: "0 20px 40px rgba(0,0,0,.4)" }} />
        ))}
      </div>
    </div>
  );
}

export function LiquidDistortion() {
  const { ref, pos, handlers } = usePointer();
  return (
    <div ref={ref} {...handlers} style={center}>
      <svg width="0" height="0" aria-hidden>
        <filter id="ml-liquid">
          <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={pos.active ? 34 : 14} />
        </filter>
      </svg>
      <div style={{ width: "72%", maxWidth: 420, aspectRatio: "16/10", borderRadius: 16, background: GRADS[3], filter: "url(#ml-liquid)" }} />
    </div>
  );
}

export function MorphSVG() {
  const paths = [
    "M100,10 L152,28 L180,74 L180,126 L152,172 L100,190 L48,172 L20,126 L20,74 L48,28 Z",
    "M100,190 L152,172 L180,126 L180,74 L152,28 L100,10 L48,28 L20,74 L20,126 L48,172 Z",
    "M100,10 L124,74 L190,74 L137,116 L158,180 L100,140 L42,180 L63,116 L10,74 L76,74 Z",
  ];
  const [i, setI] = useState(0);
  return (
    <div style={{ ...center, flexDirection: "column", gap: 14 }}>
      <svg viewBox="0 0 200 200" width="170" height="170">
        <motion.path animate={{ d: paths[i] }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} fill="var(--accent)" />
      </svg>
      <button onClick={() => setI((v) => (v + 1) % paths.length)} style={{ background: "none", border: "1px solid var(--line)", color: "var(--fg)", borderRadius: 999, padding: "6px 16px", cursor: "pointer", fontSize: 12 }}>Morph</button>
    </div>
  );
}

export function D3DTypography() {
  const { ref, pos, handlers } = usePointer();
  return (
    <div ref={ref} {...handlers} style={{ ...center, perspective: 800 }}>
      <div style={{ position: "relative", transformStyle: "preserve-3d", transform: `rotateY(${(pos.x - 0.5) * 24}deg) rotateX(${(0.5 - pos.y) * 24}deg)`, transition: "transform .1s" }}>
        <h2 style={{ position: "relative", margin: 0, fontSize: "clamp(30px,7vw,68px)", fontWeight: 800 }}>DEPTH</h2>
        {[1, 2, 3].map((z) => (
          <h2 key={z} aria-hidden style={{ position: "absolute", inset: 0, margin: 0, fontSize: "clamp(30px,7vw,68px)", fontWeight: 800, color: "var(--accent)", opacity: 0.3, transform: `translateZ(${-z * 5}px)`, transformStyle: "preserve-3d" }}>DEPTH</h2>
        ))}
      </div>
    </div>
  );
}

export function CinematicZoom({ reduce }) {
  const [view, setView] = useState(0);
  const [zoom, setZoom] = useState(false);
  const go = () => {
    setZoom(true);
    setTimeout(() => { setView((v) => (v + 1) % 3); setZoom(false); }, reduce ? 100 : 500);
  };
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflow: "hidden", display: "grid", placeItems: "center" }}>
      <motion.div animate={{ scale: zoom ? 1.6 : 1, filter: zoom ? "blur(10px)" : "blur(0px)", opacity: zoom ? 0 : 1 }} transition={{ duration: 0.5 }} style={{ position: "absolute", inset: 0, background: GRADS[view] }} />
      <button onClick={go} style={{ position: "relative", background: "rgba(255,255,255,.2)", color: "#fff", border: "1px solid rgba(255,255,255,.4)", borderRadius: 999, padding: "10px 22px", cursor: "pointer" }}>Next scene</button>
    </div>
  );
}

export function Carousel3D() {
  const [i, setI] = useState(0);
  return (
    <div style={{ ...center, flexDirection: "column", gap: 18, perspective: 900 }}>
      <div style={{ position: "relative", width: 160, height: 110, transformStyle: "preserve-3d", transform: `rotateY(${-i * 60}deg)`, transition: "transform .6s cubic-bezier(.22,1,.36,1)" }}>
        {[0, 1, 2, 3, 4, 5].map((n) => (
          <div key={n} style={{ position: "absolute", inset: 0, borderRadius: 14, background: GRADS[n % 4], transform: `rotateY(${n * 60}deg) translateZ(120px)`, opacity: 0.9 }} />
        ))}
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={() => setI((v) => v - 1)} style={{ background: "none", border: "1px solid var(--line)", color: "var(--fg)", borderRadius: 999, padding: "6px 14px", cursor: "pointer" }}>‹</button>
        <button onClick={() => setI((v) => v + 1)} style={{ background: "none", border: "1px solid var(--line)", color: "var(--fg)", borderRadius: 999, padding: "6px 14px", cursor: "pointer" }}>›</button>
      </div>
    </div>
  );
}

export function InteractiveGlobe({ reduce }) {
  const { ref, pos, handlers } = usePointer();
  const [auto, setAuto] = useState(0);
  useEffect(() => {
    if (reduce) return;
    let raf;
    let a = 0;
    const loop = () => { a += 0.005; setAuto(a); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);
  const points = useMemo(() => {
    const pts = [];
    for (let lat = -80; lat <= 80; lat += 13) {
      const phi = (lat * Math.PI) / 180;
      for (let lon = -180; lon < 180; lon += 13) {
        const theta = (lon * Math.PI) / 180;
        pts.push([Math.cos(phi) * Math.cos(theta), Math.sin(phi), Math.cos(phi) * Math.sin(theta)]);
      }
    }
    return pts;
  }, []);
  const angle = auto + (pos.x - 0.5) * 1.6;
  const tilt = (0.5 - pos.y) * 0.8;
  const cosA = Math.cos(angle), sinA = Math.sin(angle);
  const cosT = Math.cos(tilt), sinT = Math.sin(tilt);
  return (
    <div ref={ref} {...handlers} style={center}>
      <svg viewBox="-110 -110 220 220" width={220} height={220}>
        {points.map(([x, y, z], idx) => {
          const x1 = x * cosA - z * sinA;
          const z1 = x * sinA + z * cosA;
          const y1 = y * cosT - z1 * sinT;
          const z2 = y * sinT + z1 * cosT;
          const depth = (z2 + 1) / 2;
          return <circle key={idx} cx={x1 * 100} cy={y1 * 100} r={1 + depth * 1.6} fill="var(--accent)" opacity={0.15 + depth * 0.85} />;
        })}
      </svg>
    </div>
  );
}

export function TiltGallery3D({ reduce }) {
  const { ref, pos, handlers } = usePointer();
  const px = reduce ? 0.5 : pos.x;
  const py = reduce ? 0.5 : pos.y;
  return (
    <div ref={ref} {...handlers} style={{ ...center, width: "100%", height: "100%", perspective: 900 }}>
      <div style={{ display: "flex", gap: 14, transformStyle: "preserve-3d", transform: `rotateY(${(px - 0.5) * 28}deg) rotateX(${(0.5 - py) * 12}deg)` }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ width: 84, height: 120, borderRadius: 12, background: GRADS[i % 4], transformStyle: "preserve-3d", transform: `rotateY(${(px - 0.5) * 36}deg) translateX(${(i - 1.5) * (12 + px * 26)}px) translateZ(${Math.abs(i - 1.5) * -14}px)`, boxShadow: "0 20px 40px rgba(0,0,0,.4)", transition: reduce ? undefined : "transform .12s ease-out" }} />
        ))}
      </div>
    </div>
  );
}

export function FlipCarousel3D({ reduce }) {
  const [index, setIndex] = useState(0);
  const prev = () => setIndex((v) => (v + 4) % 5);
  const next = () => setIndex((v) => (v + 1) % 5);
  return (
    <div style={{ ...center, width: "100%", height: "100%", flexDirection: "column", gap: 18, perspective: 1000 }}>
      <div style={{ position: "relative", width: 170, height: 115, transformStyle: "preserve-3d", transform: `rotateY(${-index * 72}deg)`, transition: reduce ? undefined : "transform .65s cubic-bezier(.22,1,.36,1)" }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} style={{ position: "absolute", inset: 0, borderRadius: 14, background: GRADS[i % 4], display: "grid", placeItems: "center", color: "#fff", fontSize: 20, fontWeight: 700, transform: `rotateY(${i * 72}deg) translateZ(140px)`, opacity: index === i ? 1 : 0.55, boxShadow: index === i ? "0 24px 50px rgba(0,0,0,.5)" : "0 12px 28px rgba(0,0,0,.35)" }}>
            {i + 1}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={prev} style={{ background: "none", border: "1px solid var(--line)", color: "var(--fg)", borderRadius: 999, padding: "6px 14px", cursor: "pointer" }}>‹</button>
        <button onClick={next} style={{ background: "none", border: "1px solid var(--line)", color: "var(--fg)", borderRadius: 999, padding: "6px 14px", cursor: "pointer" }}>›</button>
      </div>
    </div>
  );
}

export function TextRing3D({ reduce }) {
  const text = "MOTION • DESIGN • MOTION • ";
  const chars = [...text];
  const step = 360 / chars.length;
  const Ring = reduce ? "div" : motion.div;
  const motionProps = reduce ? {} : { animate: { rotate: 360 }, transition: { duration: 14, repeat: Infinity, ease: "linear" } };
  return (
    <div style={{ ...center, width: "100%", height: "100%", perspective: 800 }}>
      <Ring {...motionProps} style={{ position: "relative", width: 200, height: 200, transformStyle: "preserve-3d" }}>
        {chars.map((c, i) => (
          <span key={i} style={{ position: "absolute", left: "50%", top: "50%", display: "inline-block", fontSize: 15, fontWeight: 700, color: "var(--fg)", transform: `rotate(${i * step}deg) translateY(-70px)`, transformOrigin: "center" }}>
            {c === " " ? "\u00A0" : c}
          </span>
        ))}
        <span style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 10, height: 10, borderRadius: "50%", background: "var(--accent)" }} />
      </Ring>
    </div>
  );
}

export function CubeGallery({ reduce }) {
  const [angle, setAngle] = useState(-24);
  const drag = useRef(null);
  const onDown = (e) => { drag.current = { x: e.clientX, a: angle }; };
  const onMove = (e) => {
    if (!drag.current) return;
    setAngle(drag.current.a + (e.clientX - drag.current.x) * 0.5);
  };
  const onUp = () => { drag.current = null; };
  const face = { position: "absolute", width: 120, height: 120, left: 40, top: 10, display: "grid", placeItems: "center", borderRadius: 12, color: "#fff", fontSize: 13, fontWeight: 700, border: "1px solid rgba(255,255,255,.35)" };
  return (
    <div style={{ ...center, width: "100%", height: "100%", flexDirection: "column", gap: 16, perspective: 800 }}>
      <div onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp} style={{ position: "relative", width: 200, height: 140, transformStyle: "preserve-3d", transform: `rotateX(-12deg) rotateY(${angle}deg)`, transition: reduce ? undefined : "transform .15s ease-out", cursor: "grab" }}>
        <div style={{ ...face, background: GRADS[0], transform: "translateZ(60px)" }}>Front</div>
        <div style={{ ...face, background: GRADS[1], transform: "rotateY(180deg) translateZ(60px)" }}>Back</div>
        <div style={{ ...face, background: GRADS[0], transform: "rotateY(90deg) translateZ(60px)" }}>Right</div>
        <div style={{ ...face, background: GRADS[1], transform: "rotateY(-90deg) translateZ(60px)" }}>Left</div>
        <div style={{ ...face, background: GRADS[0], transform: "rotateX(90deg) translateZ(60px)" }}>Top</div>
        <div style={{ ...face, background: GRADS[1], transform: "rotateX(-90deg) translateZ(60px)" }}>Bottom</div>
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={() => setAngle((a) => a - 45)} style={{ background: "none", border: "1px solid var(--line)", color: "var(--fg)", borderRadius: 999, padding: "6px 14px", cursor: "pointer" }}>‹</button>
        <button onClick={() => setAngle((a) => a + 45)} style={{ background: "none", border: "1px solid var(--line)", color: "var(--fg)", borderRadius: 999, padding: "6px 14px", cursor: "pointer" }}>›</button>
      </div>
    </div>
  );
}

export function IsometricCards({ reduce }) {
  const [hover, setHover] = useState(-1);
  const active = reduce ? -1 : hover;
  return (
    <div style={{ ...center, width: "100%", height: "100%", perspective: 900 }}>
      <div style={{ position: "relative", width: 260, height: 200, transformStyle: "preserve-3d" }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(-1)}
            style={{
              position: "absolute",
              left: 40 + i * 52,
              top: 30 + i * 12,
              width: 120,
              height: 150,
              borderRadius: 14,
              background: GRADS[i % 4],
              transformStyle: "preserve-3d",
              transform: `rotateX(55deg) rotateZ(45deg) translateZ(${active === i ? 20 : 0}px)`,
              boxShadow: active === i ? "0 30px 50px rgba(0,0,0,.55)" : "0 14px 30px rgba(0,0,0,.4)",
              transition: reduce ? undefined : "transform .25s ease-out, box-shadow .25s ease-out",
              display: "grid",
              placeItems: "center",
              color: "#fff",
              fontWeight: 700,
            }}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ScrollDepth3D({ reduce, paused }) {
  const ref = useRef(null);
  useAutoScroll(ref, paused, reduce);
  const { scrollYProgress } = useScroll({ container: ref });
  const z0 = useTransform(scrollYProgress, [0, 1], [-80, -200]);
  const z1 = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const z2 = useTransform(scrollYProgress, [0, 1], [80, -20]);
  const s0 = useTransform(scrollYProgress, [0, 1], [1, 0.7]);
  const s1 = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const s2 = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const layers = [
    { z: z0, s: s0, bg: GRADS[0], w: 240, h: 150, label: "Far" },
    { z: z1, s: s1, bg: GRADS[1], w: 210, h: 130, label: "Mid" },
    { z: z2, s: s2, bg: GRADS[2], w: 180, h: 110, label: "Near" },
  ];
  return (
    <div ref={ref} style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflowY: "auto", perspective: 900 }}>
      <div style={{ position: "sticky", top: 0, height: 240, display: "grid", placeItems: "center", transformStyle: "preserve-3d" }}>
        <div style={{ position: "relative", width: 260, height: 170, transformStyle: "preserve-3d" }}>
          {layers.map((l, i) => (
            <motion.div key={i} style={{ z: l.z, scale: l.s, position: "absolute", left: (260 - l.w) / 2, top: (170 - l.h) / 2, width: l.w, height: l.h, borderRadius: 14, background: l.bg, display: "grid", placeItems: "center", color: "#fff", fontSize: 12, fontWeight: 700, transformStyle: "preserve-3d", boxShadow: "0 24px 50px rgba(0,0,0,.45)" }}>
              {l.label}
            </motion.div>
          ))}
        </div>
      </div>
      <div style={{ height: 520 }} />
    </div>
  );
}

export function PerspectiveHero({ reduce }) {
  const inner = (
    <div style={{ width: "min(78%,340px)", borderRadius: 18, background: GRADS[1], padding: 28, textAlign: "left", boxShadow: "0 30px 60px rgba(0,0,0,.5)", transformStyle: "preserve-3d" }}>
      <div style={{ fontSize: 11, letterSpacing: 2, color: "rgba(255,255,255,.7)", fontWeight: 700 }}>FEATURED</div>
      <h2 style={{ margin: "8px 0", color: "#fff", fontSize: 26, fontWeight: 800 }}>Design in depth</h2>
      <p style={{ margin: "0 0 16px", color: "rgba(255,255,255,.8)", fontSize: 13 }}>Perspective that settles into place.</p>
      <button style={{ background: "#fff", color: "#111", border: "none", borderRadius: 999, padding: "8px 18px", cursor: "pointer", fontWeight: 700, fontSize: 13 }}>Get started</button>
    </div>
  );
  return (
    <div style={{ ...center, width: "100%", height: "100%", perspective: 900 }}>
      {reduce ? (
        <div style={{ transformStyle: "preserve-3d", transform: "rotateX(0deg)" }}>{inner}</div>
      ) : (
        <motion.div initial={{ rotateX: 25, opacity: 0, y: 30 }} whileInView={{ rotateX: 0, opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} style={{ transformStyle: "preserve-3d" }}>
          {inner}
        </motion.div>
      )}
    </div>
  );
}

export function HolographicCard({ reduce }) {
  const { ref, pos, handlers } = usePointer();
  const px = reduce ? 0.5 : pos.x;
  const py = reduce ? 0.5 : pos.y;
  const dots = useMemo(() => [[18, 24], [70, 14], [42, 60], [82, 52], [28, 78], [62, 84]], []);
  return (
    <div ref={ref} {...handlers} style={{ ...center, width: "100%", height: "100%", perspective: 800 }}>
      <div style={{ position: "relative", width: 220, height: 140, borderRadius: 16, background: GRADS[0], overflow: "hidden", transformStyle: "preserve-3d", transform: `rotateY(${(px - 0.5) * 22}deg) rotateX(${(0.5 - py) * 22}deg)`, boxShadow: "0 24px 50px rgba(0,0,0,.5)", transition: reduce ? undefined : "transform .12s ease-out" }}>
        <div style={{ position: "absolute", inset: 0, background: "conic-gradient(from 180deg at 50% 50%, #ff8a8a, #ffe08a, #8affc1, #8ac1ff, #c18aff, #ff8a8a)", opacity: 0.55, backgroundPosition: `${px * 100}% ${py * 100}%`, backgroundSize: "180% 180%", mixBlendMode: "screen" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(115deg, transparent 30%, rgba(255,255,255,.55) 48%, transparent 62%)", backgroundPosition: `${px * 100}% 0`, backgroundSize: "220% 100%" }} />
        {dots.map(([x, y], i) => (
          <span key={i} style={{ position: "absolute", left: `${x}%`, top: `${y}%`, width: 4, height: 4, borderRadius: "50%", background: "#fff", opacity: reduce ? 0.6 : 0.2 + px * 0.5 + (i % 3) * 0.12, boxShadow: "0 0 8px #fff" }} />
        ))}
        <span style={{ position: "absolute", left: 16, bottom: 12, color: "#fff", fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>HOLO • 01</span>
      </div>
    </div>
  );
}

export function LightSweep3D({ reduce }) {
  return (
    <div style={{ ...center, width: "100%", height: "100%", perspective: 900 }}>
      <div style={{ position: "relative", width: 240, height: 140, borderRadius: 16, background: GRADS[3], overflow: "hidden", transformStyle: "preserve-3d", transform: "rotateX(12deg) rotateY(-12deg)", boxShadow: "0 28px 60px rgba(0,0,0,.5)" }}>
        <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", color: "#fff", fontWeight: 800, letterSpacing: 2, fontSize: 14 }}>SHEEN</div>
        {reduce ? (
          <div style={{ position: "absolute", top: 0, bottom: 0, left: "38%", width: 70, background: "linear-gradient(100deg, transparent, rgba(255,255,255,.75), transparent)", transform: "skewX(-12deg)" }} />
        ) : (
          <motion.div animate={{ x: ["-160px", "300px"] }} transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }} style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: 70, background: "linear-gradient(100deg, transparent, rgba(255,255,255,.75), transparent)", transform: "skewX(-12deg)" }} />
        )}
      </div>
    </div>
  );
}

export function SphereGallery({ reduce }) {
  const { ref, pos, handlers } = usePointer();
  const [angle, setAngle] = useState(0);
  useEffect(() => {
    if (reduce) return;
    let raf;
    let a = 0;
    const loop = () => { a += 0.008; setAngle(a); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);
  const points = useMemo(() => {
    const pts = [];
    const n = 140;
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = i * 2.399963;
      pts.push([Math.cos(theta) * r, y, Math.sin(theta) * r]);
    }
    return pts;
  }, []);
  const rot = reduce ? 0.6 : angle;
  const tiltX = (0.5 - (reduce ? 0.5 : pos.y)) * 0.9;
  const cosA = Math.cos(rot), sinA = Math.sin(rot);
  const cosT = Math.cos(tiltX), sinT = Math.sin(tiltX);
  return (
    <div ref={ref} {...handlers} style={{ ...center, width: "100%", height: "100%", perspective: 800 }}>
      <svg viewBox="-110 -110 220 220" width={230} height={230} style={{ transformStyle: "preserve-3d" }}>
        <defs>
          <linearGradient id="sg-foil" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8ac1ff" />
            <stop offset="50%" stopColor="#c18aff" />
            <stop offset="100%" stopColor="#8affc1" />
          </linearGradient>
        </defs>
        {points.map(([x, y, z], idx) => {
          const x1 = x * cosA - z * sinA;
          const z1 = x * sinA + z * cosA;
          const y1 = y * cosT - z1 * sinT;
          const z2 = y * sinT + z1 * cosT;
          const depth = (z2 + 1) / 2;
          return <circle key={idx} cx={x1 * 92} cy={y1 * 92} r={1 + depth * 2.4} fill="url(#sg-foil)" opacity={0.2 + depth * 0.8} />;
        })}
      </svg>
    </div>
  );
}
