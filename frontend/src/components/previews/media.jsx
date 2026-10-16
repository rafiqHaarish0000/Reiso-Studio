import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE, center, useAutoScroll, usePointer } from "./_shared.jsx";

const GRADS = [
  "linear-gradient(135deg,#1b2333,#3a4a63,#6b7fa3)",
  "linear-gradient(135deg,#241a2e,#5a2f6b,#a05fbf)",
  "linear-gradient(135deg,#10231f,#1f5a48,#3fbf9a)",
  "linear-gradient(135deg,#2a1a12,#6e3a1c,#d98a3a)",
  "linear-gradient(135deg,#12131a,#2b2f45,#5566a0)",
];
const img = (i, extra = {}) => ({ backgroundImage: GRADS[i % GRADS.length], ...extra });

export function FullScreenHeroImg({ reduce }) {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 260, overflow: "hidden", borderRadius: 12 }}>
      <motion.div
        initial={reduce ? { scale: 1 } : { scale: 1.18 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
        style={img(0, { position: "absolute", inset: 0 })}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,transparent 30%,rgba(0,0,0,.7))" }} />
      <motion.p
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7, ease: EASE }}
        style={{ position: "absolute", left: 24, bottom: 22, color: "#fff", fontWeight: 700, fontSize: "clamp(22px,3vw,40px)", margin: 0 }}
      >
        Cinematic hero
      </motion.p>
    </div>
  );
}

export function ImageReveal({ reduce }) {
  return (
    <div style={center}>
      <motion.div
        initial={reduce ? { clipPath: "inset(0 0 0 0)" } : { clipPath: "inset(0 100% 0 0)" }}
        whileInView={{ clipPath: "inset(0 0% 0 0)" }}
        viewport={{ once: false, amount: 0.4 }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{ duration: 1, ease: EASE }}
        style={img(1, { width: "70%", maxWidth: 420, aspectRatio: "16/10", borderRadius: 16 })}
      >
        <motion.div
          initial={reduce ? { scale: 1 } : { scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: EASE }}
          style={{ width: "100%", height: "100%", borderRadius: 16, background: "inherit" }}
        />
      </motion.div>
    </div>
  );
}

export function ParallaxImage({ reduce, paused }) {
  const [y, setY] = useState(0);
  const ref = useRef(null);
  useAutoScroll(ref, paused, reduce);
  return (
    <div
      ref={ref}
      onScroll={(e) => setY(e.currentTarget.scrollTop)}
      style={{ width: "100%", height: "100%", overflowY: "auto", overflowX: "hidden", overscrollBehavior: "contain" }}
    >
      <div style={{ ...center, height: "auto", flexDirection: "column", gap: 30 }}>
        <div style={{ height: 60 }} />
        <div style={{ width: "70%", maxWidth: 420, aspectRatio: "16/10", borderRadius: 16, overflow: "hidden" }}>
          <div style={img(2, { width: "100%", height: "150%", transform: `translateY(${-y * 0.25}px)` })} />
        </div>
        <div style={{ height: 160 }} />
      </div>
    </div>
  );
}

export function ImageZoomHover() {
  const [h, setH] = useState(false);
  return (
    <div style={center}>
      <div
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{ width: "70%", maxWidth: 420, aspectRatio: "16/10", borderRadius: 16, overflow: "hidden", cursor: "pointer" }}
      >
        <div style={img(3, { width: "100%", height: "100%", transform: h ? "scale(1.08)" : "scale(1)", transition: "transform .6s cubic-bezier(.22,1,.36,1)" })} />
        <div style={{ position: "relative", top: 0, height: 0, background: "transparent" }} />
      </div>
    </div>
  );
}

export function GrayscaleColor() {
  const [h, setH] = useState(false);
  return (
    <div style={center}>
      <div
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={img(4, { width: "70%", maxWidth: 420, aspectRatio: "16/10", borderRadius: 16, cursor: "pointer", filter: h ? "grayscale(0) saturate(1)" : "grayscale(1) saturate(0)", transition: "filter .5s ease" })}
      />
    </div>
  );
}

export function FloatingImage({ reduce }) {
  const a = (d) => (reduce ? {} : { animate: { y: [0, -14, 0] }, transition: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: d } });
  return (
    <div style={center}>
      <div style={{ position: "relative", width: "80%", maxWidth: 460, height: 200 }}>
        <motion.div {...a(0)} style={img(0, { position: "absolute", left: "6%", top: 10, width: 150, height: 110, borderRadius: 14, boxShadow: "0 20px 40px rgba(0,0,0,.4)" })} />
        <motion.div {...a(0.8)} style={img(2, { position: "absolute", right: "6%", top: 40, width: 170, height: 120, borderRadius: 14, boxShadow: "0 20px 40px rgba(0,0,0,.4)" })} />
        <motion.div {...a(1.6)} style={img(4, { position: "absolute", left: "38%", top: 90, width: 130, height: 90, borderRadius: 14, boxShadow: "0 20px 40px rgba(0,0,0,.4)" })} />
      </div>
    </div>
  );
}

export function CursorFollowImage() {
  const { ref, pos, handlers } = usePointer();
  return (
    <div ref={ref} {...handlers} style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, cursor: "none", display: "grid", placeItems: "center" }}>
      <span style={{ color: "var(--muted)", fontSize: 13 }}>move your pointer</span>
      {pos.active && (
        <motion.div
          animate={{ left: `${pos.x * 100}%`, top: `${pos.y * 100}%` }}
          transition={{ type: "spring", stiffness: 220, damping: 24, mass: 0.6 }}
          style={{ position: "absolute", transform: "translate(-50%,-50%)", width: 150, height: 100, borderRadius: 12, pointerEvents: "none" }}
        >
          <div style={img(1, { width: "100%", height: "100%", borderRadius: 12 })} />
        </motion.div>
      )}
    </div>
  );
}

export function ImageTilt() {
  const { ref, pos, handlers } = usePointer();
  const rx = (0.5 - pos.y) * 18;
  const ry = (pos.x - 0.5) * 18;
  return (
    <div ref={ref} {...handlers} style={{ ...center, perspective: 900 }}>
      <div style={img(3, { width: "70%", maxWidth: 420, aspectRatio: "16/10", borderRadius: 18, transform: `rotateX(${rx}deg) rotateY(${ry}deg)`, transition: "transform .2s ease-out", boxShadow: "0 30px 60px rgba(0,0,0,.45)" })} />
    </div>
  );
}

export function BeforeAfterSlider() {
  const [p, setP] = useState(50);
  const ref = useRef(null);
  const move = (clientX) => {
    const r = ref.current.getBoundingClientRect();
    setP(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  };
  return (
    <div style={center}>
      <div
        ref={ref}
        onMouseMove={(e) => e.buttons === 1 && move(e.clientX)}
        onMouseDown={(e) => move(e.clientX)}
        style={{ position: "relative", width: "80%", maxWidth: 460, aspectRatio: "16/10", borderRadius: 16, overflow: "hidden", cursor: "ew-resize", userSelect: "none" }}
      >
        <div style={img(4, { position: "absolute", inset: 0 })} />
        <div style={{ ...img(0, { position: "absolute", inset: 0 }), clipPath: `inset(0 ${100 - p}% 0 0)` }} />
        <div style={{ position: "absolute", top: 0, bottom: 0, left: `${p}%`, width: 2, background: "white" }}>
          <span style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 30, height: 30, borderRadius: "50%", background: "white", boxShadow: "0 2px 10px rgba(0,0,0,.4)" }} />
        </div>
      </div>
    </div>
  );
}

export function VideoHero({ reduce }) {
  const [playing, setPlaying] = useState(!reduce);
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 260, overflow: "hidden" }}>
      <div
        style={img(2, {
          position: "absolute", inset: 0,
          backgroundSize: "200% 200%",
          animation: reduce || !playing ? "none" : "ml-pan 12s ease-in-out infinite alternate",
        })}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg,rgba(0,0,0,.7),transparent 60%)" }} />
      <div style={{ position: "absolute", left: 24, bottom: 20 }}>
        <p style={{ margin: 0, color: "#fff", fontSize: 22, fontWeight: 700 }}>Cinematic video</p>
        <button
          onClick={() => setPlaying((v) => !v)}
          style={{ marginTop: 8, background: "rgba(255,255,255,.15)", color: "#fff", border: "1px solid rgba(255,255,255,.3)", borderRadius: 999, padding: "6px 14px", cursor: "pointer", fontSize: 12 }}
        >
          {playing ? "Pause" : "Play"}
        </button>
      </div>
    </div>
  );
}

export function KenBurnsSlideshow({ reduce }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % GRADS.length), 6000);
    return () => clearInterval(id);
  }, [reduce]);
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflow: "hidden", borderRadius: 12 }}>
      {GRADS.map((g, i) => {
        const active = reduce ? i === 0 : i === idx;
        return (
          <motion.div
            key={i}
            initial={false}
            animate={{ opacity: active ? 1 : 0, scale: active ? 1.15 : 1 }}
            transition={{ opacity: { duration: 1 }, scale: { duration: reduce ? 0 : 6, ease: "linear" } }}
            style={{ position: "absolute", inset: 0, backgroundImage: g, backgroundSize: "cover" }}
          />
        );
      })}
    </div>
  );
}

export function ImageStackSwipe() {
  const [order, setOrder] = useState([0, 1, 2]);
  const rotate = () => setOrder(([a, b, c]) => [b, c, a]);
  return (
    <div style={{ ...center, flexDirection: "column", gap: 14 }}>
      <div onClick={rotate} style={{ position: "relative", width: 220, height: 170, cursor: "pointer" }}>
        {order.map((card, pos) => (
          <motion.div
            key={card}
            layout
            animate={{ scale: 1 - pos * 0.06, y: pos * 18, rotate: (1 - pos) * 6, opacity: 1 - pos * 0.15 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            style={{ position: "absolute", inset: 0, borderRadius: 14, boxShadow: "0 20px 40px rgba(0,0,0,.4)", zIndex: order.length - pos, ...img(card) }}
          />
        ))}
      </div>
      <button onClick={rotate} style={{ background: "rgba(255,255,255,.08)", color: "#fff", border: "1px solid rgba(255,255,255,.2)", borderRadius: 999, padding: "6px 14px", cursor: "pointer", fontSize: 12 }}>
        Send top to back
      </button>
    </div>
  );
}

export function DuotoneImage() {
  const [h, setH] = useState(false);
  return (
    <div style={center}>
      <div
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{ position: "relative", width: "70%", maxWidth: 420, aspectRatio: "16/10", borderRadius: 16, overflow: "hidden", cursor: "pointer", transform: h ? "scale(1.03)" : "scale(1)", transition: "transform .6s cubic-bezier(.22,1,.36,1)" }}
      >
        <div style={img(1, { position: "absolute", inset: 0 })} />
        <div style={{ position: "absolute", inset: 0, background: "#7c3aed", mixBlendMode: "color", opacity: h ? 0.85 : 0.35, transition: "opacity .5s ease" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,transparent,rgba(0,0,0,.35))", opacity: h ? 1 : 0.4, transition: "opacity .5s ease" }} />
      </div>
    </div>
  );
}

export function ImageGridReveal({ reduce }) {
  return (
    <div style={center}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, width: "80%", maxWidth: 460 }}>
        {[0, 1, 2, 3, 4, 0].map((g, i) => (
          <motion.div
            key={i}
            initial={reduce ? { clipPath: "inset(0 0% 0 0)" } : { clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.7, ease: EASE, delay: reduce ? 0 : i * 0.1 }}
            style={img(g, { aspectRatio: "1/1", borderRadius: 10 })}
          />
        ))}
      </div>
    </div>
  );
}

export function CircleRevealImage({ reduce }) {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflow: "hidden", borderRadius: 12, background: "#1a1d26", display: "grid", placeItems: "center" }}>
      <motion.div
        initial={reduce ? { clipPath: "circle(75% at 50% 50%)" } : { clipPath: "circle(0% at 50% 50%)" }}
        animate={{ clipPath: "circle(75% at 50% 50%)" }}
        transition={{ duration: reduce ? 0 : 1.4, ease: EASE }}
        style={img(2, { width: "72%", maxWidth: 420, aspectRatio: "16/10", borderRadius: 16 })}
      />
    </div>
  );
}

export function ImageSplitHover() {
  const [h, setH] = useState(false);
  const pane = "all .7s cubic-bezier(.22,1,.36,1)";
  return (
    <div style={center}>
      <div
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{ position: "relative", width: "80%", maxWidth: 460, aspectRatio: "16/10", borderRadius: 16, overflow: "hidden", cursor: "pointer" }}
      >
        <div style={img(2, { position: "absolute", inset: 0 })} />
        <div style={{ ...img(0, { position: "absolute", top: 0, bottom: 0, left: 0, width: "50%" }), transform: h ? "translateX(-100%)" : "translateX(0)", transition: pane }} />
        <div style={{ ...img(4, { position: "absolute", top: 0, bottom: 0, right: 0, width: "50%" }), transform: h ? "translateX(100%)" : "translateX(0)", transition: pane }} />
      </div>
    </div>
  );
}

export function ShapeClipImage() {
  const [h, setH] = useState(false);
  return (
    <div style={center}>
      <div
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={img(1, { width: 240, height: 280, cursor: "pointer", borderRadius: h ? "46% 54% 52% 48% / 44% 46% 54% 56%" : "50% 50% 0 0 / 30% 30% 0 0", transition: "border-radius .6s cubic-bezier(.22,1,.36,1), transform .6s cubic-bezier(.22,1,.36,1)", transform: h ? "scale(1.03)" : "scale(1)" })}
      />
    </div>
  );
}

export function ParallaxColumns({ reduce, paused }) {
  const ref = useRef(null);
  const [y, setY] = useState(0);
  useAutoScroll(ref, paused, reduce);
  const rates = [0.1, 0.22, 0.34];
  const cols = [[0, 3], [1, 4], [2, 0]];
  return (
    <div ref={ref} onScroll={(e) => setY(e.currentTarget.scrollTop)} style={{ width: "100%", height: "100%", overflowY: "auto", overflowX: "hidden", overscrollBehavior: "contain" }}>
      <div style={{ height: "auto", padding: 24 }}>
        <div style={{ height: 40 }} />
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          {cols.map((blocks, c) => (
            <div key={c} style={{ flex: 1, maxWidth: 140, display: "flex", flexDirection: "column", gap: 12, transform: `translateY(${-y * rates[c]}px)` }}>
              {[0, 1, 2].map((r) => (
                <div key={r} style={img(blocks[r % blocks.length], { height: r === 1 ? 140 : 95, borderRadius: 10 })} />
              ))}
            </div>
          ))}
        </div>
        <div style={{ height: 140 }} />
      </div>
    </div>
  );
}

export function ImageColorSwap() {
  const [h, setH] = useState(false);
  return (
    <div style={center}>
      <div
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={img(3, { width: "70%", maxWidth: 420, aspectRatio: "16/10", borderRadius: 16, cursor: "pointer", filter: h ? "hue-rotate(120deg) saturate(1.6)" : "hue-rotate(0deg) saturate(1)", transition: "filter .6s ease" })}
      />
    </div>
  );
}

export function ZoomLens() {
  const { ref, pos, handlers } = usePointer();
  return (
    <div ref={ref} {...handlers} style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflow: "hidden", borderRadius: 12 }}>
      <div style={img(3, { position: "absolute", inset: 0 })} />
      {pos.active && (
        <div style={{ position: "absolute", left: `${pos.x * 100}%`, top: `${pos.y * 100}%`, width: 130, height: 130, borderRadius: "50%", transform: "translate(-50%,-50%)", border: "2px solid rgba(255,255,255,.9)", boxShadow: "0 10px 30px rgba(0,0,0,.5)", pointerEvents: "none", backgroundImage: GRADS[3 % GRADS.length], backgroundSize: "200% 200%", backgroundPosition: `${pos.x * 100}% ${pos.y * 100}%` }} />
      )}
    </div>
  );
}
