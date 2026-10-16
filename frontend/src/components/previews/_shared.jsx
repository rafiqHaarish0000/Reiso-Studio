import { useEffect, useRef, useState } from "react";

export const EASE = [0.22, 1, 0.36, 1];

export const center = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  padding: 24,
  textAlign: "center",
};

export const row = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 12,
  width: "100%",
  height: "100%",
  padding: 24,
};

/** Animate a numeric value with rAF (respects reduce). */
export function useCountUp(target, run, reduce) {
  const [value, setValue] = useState(0);
  const ref = useRef(0);
  useEffect(() => {
    if (reduce || !run) {
      ref.current = target;
      setValue(target);
      return;
    }
    let raf;
    const start = performance.now();
    const from = 0;
    const dur = 1200;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = from + (target - from) * eased;
      ref.current = v;
      setValue(v);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, reduce]);
  return value;
}

/** Track pointer position (0..1) within an element. */
export function usePointer() {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0.5, y: 0.5, active: false });
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({
      x: (e.clientX - r.left) / r.width,
      y: (e.clientY - r.top) / r.height,
      active: true,
    });
  };
  const onLeave = () => setPos((p) => ({ ...p, active: false }));
  return { ref, pos, handlers: { onMouseMove: onMove, onMouseLeave: onLeave } };
}

export const minH = { minHeight: 200 };

/**
 * Auto-advance an internal scroll container so scroll-driven previews
 * demonstrate themselves inside a fixed preview canvas (card or playground).
 * Pauses while the pointer is over the element (so users can scrub manually),
 * stops entirely when paused or reduced-motion is on.
 */
export function useAutoScroll(ref, paused = false, reduce = false) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const max = () => Math.max(0, el.scrollHeight - el.clientHeight);
    if (reduce) {
      el.scrollTop = max() * 0.6;
      return;
    }
    let raf;
    let dir = 1;
    let last = performance.now();
    let hovering = false;
    const onEnter = () => { hovering = true; };
    const onLeave = () => { hovering = false; };
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    const tick = (t) => {
      const dt = Math.min(64, t - last);
      last = t;
      const m = max();
      if (!paused && !hovering && m > 4) {
        let pos = el.scrollTop + dir * (m / 4500) * dt;
        if (pos >= m) { pos = m; dir = -1; }
        else if (pos <= 0) { pos = 0; dir = 1; }
        el.scrollTop = pos;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [ref, paused, reduce]);
}
