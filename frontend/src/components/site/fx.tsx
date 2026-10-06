import React, { useEffect, useRef } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Div } from "./primitives";

/**
 * Shared FX: GPU-cheap canvas loop + one-shot scroll reveal.
 * Motion language: slow, cinematic, cubic-bezier(.22,1,.36,1). No layout props animated.
 */

export const EASE = "cubic-bezier(.22,1,.36,1)";

export function reducedMotion(): boolean {
  if (Platform.OS !== "web" || typeof window === "undefined") return false;
  try {
    return !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

export function finePointer(): boolean {
  if (Platform.OS !== "web" || typeof window === "undefined") return false;
  try {
    return !!window.matchMedia?.("(pointer: fine)").matches;
  } catch {
    return false;
  }
}

/** rAF canvas loop: dpr-capped, pauses offscreen, single static frame if reduced motion. */
export function useCanvas2D(
  ref: React.RefObject<any>,
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number, t: number, dt: number) => void
) {
  const drawRef = useRef(draw);
  drawRef.current = draw;
  useEffect(() => {
    if (Platform.OS !== "web") return;
    const canvas = ref.current;
    if (!canvas || typeof canvas.getContext !== "function") return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const fit = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = canvas.clientWidth || 300;
      const h = canvas.clientHeight || 300;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      return { w, h, dpr };
    };
    let { w, h, dpr } = fit();
    if (reducedMotion()) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawRef.current(ctx, w, h, 0, 0);
      return;
    }
    let raf = 0;
    let last = performance.now();
    let visible = false;
    const tick = (now: number) => {
      if (!visible) return;
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      drawRef.current(ctx, w, h, now / 1000, dt);
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (es) => {
        visible = !!es[0]?.isIntersecting;
        if (visible) {
          last = performance.now();
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(tick);
        } else {
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.03 }
    );
    io.observe(canvas);
    const onResize = () => {
      const f = fit();
      w = f.w;
      h = f.h;
      dpr = f.dpr;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [ref]);
}

/** One-shot enter reveal: opacity + translate + blur + scale (Framer-style). */
export function Rise({
  children,
  y = 40,
  x = 0,
  blur = 8,
  scale = 1,
  delay = 0,
  duration = 900,
  style,
}: {
  children: React.ReactNode;
  y?: number;
  x?: number;
  blur?: number;
  scale?: number;
  delay?: number;
  duration?: number;
  style?: any;
}) {
  const ref = useRef<any>(null);
  useEffect(() => {
    if (Platform.OS !== "web") return;
    const el = ref.current;
    if (!el || typeof el.animate !== "function") return;
    if (reducedMotion()) return; // stays visible
    let dead = false;
    const io = new IntersectionObserver(
      (es) => {
        if (es[0]?.isIntersecting && !dead) {
          dead = true;
          io.disconnect();
          try {
            el.animate(
              [
                {
                  opacity: 0,
                  transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                  filter: `blur(${blur}px)`,
                },
                { opacity: 1, transform: "translate3d(0,0,0) scale(1)", filter: "blur(0px)" },
              ],
              { duration, delay, easing: EASE, fill: "both" }
            );
          } catch { /* noop */ }
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [x, y, blur, scale, delay, duration]);

  if (Platform.OS !== "web") return <View style={style}>{children}</View>;
  // Flatten: callers may pass RN style arrays — never spread an array into an object
  // (it creates {0, 1, ...} keys and crashes React Native Web style handling).
  const flat = (StyleSheet.flatten(style) ?? {}) as any;
  if (typeof window !== "undefined" && reducedMotion()) {
    return (
      <Div ref={ref} style={{ ...flat }}>
        {children}
      </Div>
    );
  }
  return (
    <Div ref={ref} style={{ opacity: 0, ...flat }}>
      {children}
    </Div>
  );
}
