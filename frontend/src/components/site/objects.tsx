import React, { useRef } from "react";
import { Platform } from "react-native";
import { useCanvas2D } from "./fx";
import { Div } from "./primitives";

/**
 * Procedural 3D-look objects (canvas 2D, GPU-cheap).
 * Used because the project has no stock 3D assets and adds no new dependencies.
 * Every painter: radial glass gradients + rim light + halo + slow ambient motion.
 */

function halo(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, a = 0.14) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, `rgba(30,144,255,${a})`);
  g.addColorStop(0.6, `rgba(91,53,255,${a * 0.5})`);
  g.addColorStop(1, "rgba(30,144,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(x - r, y - r, r * 2, r * 2);
}

function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function frame(ref: React.RefObject<any>, size: number | { w: number; h: number }) {
  const style =
    typeof size === "number"
      ? { width: size, height: size }
      : { width: "100%" as any, height: "100%" as any };
  return (
    <canvas
      ref={ref}
      style={{ display: "block", ...(style as any) }}
      aria-hidden
    />
  );
}

/* ---------------- Glass sphere + metallic ribbon ---------------- */
export function SphereCanvas({ size = 260 }: { size?: number }) {
  const ref = useRef<any>(null);
  useCanvas2D(ref, (ctx, w, h, t) => {
    const cx = w / 2;
    const cy = h / 2;
    const R = Math.min(w, h) * 0.3 * (1 + 0.006 * Math.sin(t * 0.8));
    halo(ctx, cx, cy, R * 1.9, 0.16);
    // Ribbon (back half).
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(-0.32);
    ctx.scale(1, 0.42);
    const rg = ctx.createLinearGradient(-R * 1.35, 0, R * 1.35, 0);
    rg.addColorStop(0, "rgba(127,212,255,0)");
    rg.addColorStop(0.3, "rgba(127,212,255,0.75)");
    rg.addColorStop(0.5, "rgba(232,247,255,0.9)");
    rg.addColorStop(0.7, "rgba(127,212,255,0.75)");
    rg.addColorStop(1, "rgba(127,212,255,0)");
    ctx.strokeStyle = rg;
    ctx.lineWidth = R * 0.12;
    ctx.beginPath();
    ctx.arc(0, 0, R * 1.28, Math.PI, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
    // Sphere body.
    const body = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.42, R * 0.05, cx, cy, R);
    body.addColorStop(0, "#D2F1FF");
    body.addColorStop(0.32, "#4FB2FF");
    body.addColorStop(0.68, "#0B3B8F");
    body.addColorStop(1, "#020617");
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.fill();
    // Bottom bounce shade.
    const shade = ctx.createLinearGradient(0, cy, 0, cy + R);
    shade.addColorStop(0, "rgba(2,6,23,0)");
    shade.addColorStop(1, "rgba(2,6,23,0.55)");
    ctx.fillStyle = shade;
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.fill();
    // Rim + outer ring.
    ctx.strokeStyle = "rgba(125,211,252,0.85)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = "rgba(125,211,252,0.16)";
    ctx.beginPath();
    ctx.arc(cx, cy, R * 1.07, 0, Math.PI * 2);
    ctx.stroke();
    // Specular.
    ctx.save();
    ctx.translate(cx - R * 0.36, cy - R * 0.46);
    ctx.rotate(-0.5);
    const sp = ctx.createRadialGradient(0, 0, 0, 0, 0, R * 0.24);
    sp.addColorStop(0, "rgba(255,255,255,0.9)");
    sp.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = sp;
    ctx.beginPath();
    ctx.ellipse(0, 0, R * 0.24, R * 0.13, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    // Ribbon (front half) + bright core + violet kiss.
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(-0.32);
    ctx.scale(1, 0.42);
    ctx.strokeStyle = rg;
    ctx.lineWidth = R * 0.12;
    ctx.beginPath();
    ctx.arc(0, 0, R * 1.28, 0, Math.PI);
    ctx.stroke();
    ctx.strokeStyle = "rgba(255,255,255,0.5)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, R * 1.28, 0.15, Math.PI - 0.15);
    ctx.stroke();
    ctx.restore();
    ctx.strokeStyle = "rgba(214,44,255,0.4)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy, R * 0.82, 0.5, 1.1);
    ctx.stroke();
  });
  if (Platform.OS !== "web") return null;
  return <Div style={{ width: size, height: size }}>{frame(ref, size)}</Div>;
}

/* ---------------- Glass five-point star ---------------- */
export function StarCanvas({ size = 260 }: { size?: number }) {
  const ref = useRef<any>(null);
  useCanvas2D(ref, (ctx, w, h, t) => {
    const cx = w / 2;
    const cy = h / 2 + Math.sin(t * 0.9) * 5;
    const R = Math.min(w, h) * 0.34;
    halo(ctx, cx, cy, R * 1.7, 0.15);
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(0.12 * Math.sin(t * 0.5) - Math.PI / 2);
    const path = (rO: number, rI: number) => {
      ctx.beginPath();
      for (let i = 0; i < 10; i++) {
        const r = i % 2 === 0 ? rO : rI;
        const a = (i / 10) * Math.PI * 2;
        const x = Math.cos(a) * r;
        const y = Math.sin(a) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
    };
    const g = ctx.createLinearGradient(0, -R, 0, R);
    g.addColorStop(0, "rgba(214,242,255,0.95)");
    g.addColorStop(0.45, "rgba(46,155,255,0.85)");
    g.addColorStop(1, "rgba(10,42,102,0.9)");
    path(R, R * 0.44);
    ctx.fillStyle = g;
    ctx.fill();
    // Facets.
    ctx.strokeStyle = "rgba(255,255,255,0.28)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(a) * R, Math.sin(a) * R);
      ctx.stroke();
    }
    path(R * 0.55, R * 0.24);
    ctx.fillStyle = "rgba(255,255,255,0.12)";
    ctx.fill();
    ctx.strokeStyle = "rgba(125,211,252,0.9)";
    ctx.lineWidth = 2;
    path(R, R * 0.44);
    ctx.stroke();
    ctx.restore();
  });
  if (Platform.OS !== "web") return null;
  return <Div style={{ width: size, height: size }}>{frame(ref, size)}</Div>;
}

/* ---------------- Faceted diamond ---------------- */
export function DiamondCanvas({ size = 260 }: { size?: number }) {
  const ref = useRef<any>(null);
  useCanvas2D(ref, (ctx, w, h, t) => {
    const cx = w / 2;
    const cy = h / 2 + Math.sin(t * 0.8) * 5;
    const R = Math.min(w, h) * 0.32;
    halo(ctx, cx, cy, R * 1.7, 0.15);
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(0.1 * Math.sin(t * 0.45));
    const top = -R * 0.35;
    const mid = R * 0.12;
    const bot = R * 0.95;
    const hwTop = R * 0.62;
    const hwMid = R * 0.95;
    const facet = (pts: number[][], fill: string) => {
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.closePath();
      ctx.fillStyle = fill;
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.5)";
      ctx.lineWidth = 1;
      ctx.stroke();
    };
    // Pavilion (bottom).
    facet([[0, bot], [-hwMid, mid], [0, mid]], "#061A3A");
    facet([[0, bot], [0, mid], [hwMid, mid]], "#0B3D91");
    facet([[0, bot], [-hwMid, mid], [-hwMid * 0.5, mid]], "#123C85");
    facet([[0, bot], [hwMid * 0.5, mid], [hwMid, mid]], "#3FA9F5");
    // Crown (top).
    facet([[-hwTop, top], [hwTop, top], [hwMid, mid], [-hwMid, mid]], "#123C85");
    facet([[-hwTop, top], [0, top], [0, mid], [-hwMid, mid]], "#BFE9FF");
    facet([[0, top], [hwTop, top], [hwMid, mid], [0, mid]], "#5FBDF8");
    facet([[0, top], [0, mid], [-hwMid, mid], [-hwTop, top]], "rgba(255,255,255,0.35)");
    // Rim light.
    ctx.strokeStyle = "rgba(125,211,252,0.85)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-hwTop, top);
    ctx.lineTo(hwTop, top);
    ctx.lineTo(hwMid, mid);
    ctx.lineTo(0, bot);
    ctx.lineTo(-hwMid, mid);
    ctx.closePath();
    ctx.stroke();
    // Sparkle.
    const sa = 0.3 + 0.25 * Math.sin(t * 2);
    ctx.strokeStyle = `rgba(255,255,255,${sa.toFixed(3)})`;
    ctx.lineWidth = 1.5;
    const sx = hwTop * 0.7;
    const sy = top - R * 0.16;
    ctx.beginPath();
    ctx.moveTo(sx - 12, sy);
    ctx.lineTo(sx + 12, sy);
    ctx.moveTo(sx, sy - 12);
    ctx.lineTo(sx, sy + 12);
    ctx.stroke();
    ctx.restore();
  });
  if (Platform.OS !== "web") return null;
  return <Div style={{ width: size, height: size }}>{frame(ref, size)}</Div>;
}

/* ---------------- Stacked floating glass layers ---------------- */
export function LayersVisual({ w = 520, h = 380 }: { w?: number; h?: number }) {
  const ref = useRef<any>(null);
  useCanvas2D(ref, (ctx, W, H, t) => {
    halo(ctx, W / 2, H / 2, Math.min(W, H) * 0.75, 0.12);
    const bars = [0.92, 0.68, 0.8, 0.56, 0.72];
    const bh = H * 0.105;
    bars.forEach((bw, i) => {
      const y = H * (0.1 + i * 0.175) + Math.sin(t * 0.7 + i * 1.1) * 5;
      const x = (W - W * bw) / 2;
      const g = ctx.createLinearGradient(0, y, 0, y + bh);
      g.addColorStop(0, "#14356F");
      g.addColorStop(0.25, "#0E2A5C");
      g.addColorStop(1, "#050D20");
      ctx.save();
      ctx.shadowColor = "rgba(34,211,238,0.55)";
      ctx.shadowBlur = 14;
      rr(ctx, x, y, W * bw, bh, bh / 2);
      ctx.fillStyle = g;
      ctx.fill();
      ctx.restore();
      // Glass top-edge light.
      ctx.strokeStyle = "rgba(103,232,249,0.85)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x + bh / 2, y + 1.5);
      ctx.lineTo(x + W * bw - bh / 2, y + 1.5);
      ctx.stroke();
      // Faint bottom edge.
      ctx.strokeStyle = "rgba(103,232,249,0.18)";
      ctx.beginPath();
      ctx.moveTo(x + bh / 2, y + bh - 1.5);
      ctx.lineTo(x + W * bw - bh / 2, y + bh - 1.5);
      ctx.stroke();
    });
  });
  if (Platform.OS !== "web") return null;
  return <Div style={{ width: w, height: h, maxWidth: "100%" }}>{frame(ref, { w, h })}</Div>;
}

/* ---------------- Diagonal planes + glowing orbs ---------------- */
export function PanelsVisual({ w = 520, h = 380 }: { w?: number; h?: number }) {
  const ref = useRef<any>(null);
  const orbs = [
    { fx: 0.3, fy: 0.35, r: 13, ph: 0 },
    { fx: 0.62, fy: 0.28, r: 9, ph: 1.4 },
    { fx: 0.52, fy: 0.62, r: 16, ph: 2.6 },
    { fx: 0.76, fy: 0.6, r: 8, ph: 4.1 },
    { fx: 0.4, fy: 0.75, r: 7, ph: 5.3 },
  ];
  useCanvas2D(ref, (ctx, W, H, t) => {
    halo(ctx, W / 2, H / 2, Math.min(W, H) * 0.75, 0.12);
    // Three diagonal translucent planes.
    const planes = [
      { dx: -0.06, dw: 0.5, a: 0.5 },
      { dx: 0.22, dw: 0.56, a: 0.38 },
      { dx: 0.5, dw: 0.44, a: 0.3 },
    ];
    planes.forEach((p, i) => {
      const drift = Math.sin(t * 0.5 + i * 1.7) * 6;
      const x = W * p.dx + drift;
      const pw = W * p.dw;
      const y0 = H * 0.12;
      const y1 = H * 0.88;
      const skew = W * 0.1;
      const g = ctx.createLinearGradient(x, 0, x + pw, 0);
      g.addColorStop(0, `rgba(30,144,255,${(p.a * 0.4).toFixed(3)})`);
      g.addColorStop(0.5, `rgba(30,144,255,${p.a.toFixed(3)})`);
      g.addColorStop(1, `rgba(91,53,255,${(p.a * 0.5).toFixed(3)})`);
      ctx.beginPath();
      ctx.moveTo(x, y0);
      ctx.lineTo(x + pw, y0);
      ctx.lineTo(x + pw - skew, y1);
      ctx.lineTo(x - skew, y1);
      ctx.closePath();
      ctx.fillStyle = g;
      ctx.fill();
      ctx.strokeStyle = "rgba(103,232,249,0.5)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });
    // Faint links.
    ctx.strokeStyle = "rgba(103,232,249,0.15)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(W * 0.3, H * 0.35);
    ctx.lineTo(W * 0.52, H * 0.62);
    ctx.lineTo(W * 0.76, H * 0.6);
    ctx.stroke();
    // Orbs.
    orbs.forEach((o) => {
      const x = W * o.fx + Math.sin(t * 0.6 + o.ph) * 7;
      const y = H * o.fy + Math.cos(t * 0.7 + o.ph) * 7;
      const g = ctx.createRadialGradient(x, y, 0, x, y, o.r * 2.4);
      g.addColorStop(0, "rgba(223,246,255,0.95)");
      g.addColorStop(0.35, "rgba(30,159,255,0.75)");
      g.addColorStop(1, "rgba(30,159,255,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, o.r * 2.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#EAF9FF";
      ctx.beginPath();
      ctx.arc(x, y, o.r * 0.42, 0, Math.PI * 2);
      ctx.fill();
    });
  });
  if (Platform.OS !== "web") return null;
  return <Div style={{ width: w, height: h, maxWidth: "100%" }}>{frame(ref, { w, h })}</Div>;
}

/* ---------------- Glass service icons ---------------- */
export type IconVariant = "gear" | "ai" | "mobile" | "cloud";

export function IconCanvas({ size = 120, variant }: { size?: number; variant: IconVariant }) {
  const ref = useRef<any>(null);
  useCanvas2D(ref, (ctx, w, h, t) => {
    const cx = w / 2;
    const cy = h / 2;
    const R = Math.min(w, h) * 0.36;
    halo(ctx, cx, cy, R * 1.9, 0.16);
    const float = Math.sin(t * 0.9) * 3;
    ctx.save();
    ctx.translate(cx, cy + float);
    if (variant === "gear") {
      ctx.rotate(t * 0.25);
      ctx.beginPath();
      const teeth = 8;
      for (let i = 0; i < teeth * 2; i++) {
        const r = i % 2 === 0 ? R : R * 0.78;
        const a = (i / (teeth * 2)) * Math.PI * 2;
        const x = Math.cos(a) * r;
        const y = Math.sin(a) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      const g = ctx.createLinearGradient(0, -R, 0, R);
      g.addColorStop(0, "rgba(160,220,255,0.95)");
      g.addColorStop(0.5, "rgba(30,144,255,0.85)");
      g.addColorStop(1, "rgba(8,32,80,0.9)");
      ctx.fillStyle = g;
      ctx.fill();
      ctx.strokeStyle = "rgba(125,211,252,0.9)";
      ctx.lineWidth = 2;
      ctx.stroke();
      // Hub.
      ctx.fillStyle = "#060B18";
      ctx.beginPath();
      ctx.arc(0, 0, R * 0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(125,211,252,0.8)";
      ctx.stroke();
      const orb = ctx.createRadialGradient(0, 0, 0, 0, 0, R * 0.4);
      orb.addColorStop(0, "rgba(160,220,255,0.9)");
      orb.addColorStop(1, "rgba(30,144,255,0)");
      ctx.fillStyle = orb;
      ctx.beginPath();
      ctx.arc(0, 0, R * 0.4, 0, Math.PI * 2);
      ctx.fill();
    } else if (variant === "ai") {
      // Orbits.
      [-0.4, 0.35].forEach((tilt, k) => {
        ctx.save();
        ctx.rotate(tilt);
        ctx.scale(1, 0.42);
        ctx.strokeStyle = k ? "rgba(103,232,249,0.55)" : "rgba(125,211,252,0.45)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(0, 0, R * 1.05, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      });
      // Orbiting nodes.
      for (let k = 0; k < 3; k++) {
        const a = t * (0.6 + k * 0.22) + (k * Math.PI * 2) / 3;
        const x = Math.cos(a) * R * 1.05;
        const y = Math.sin(a) * R * 1.05 * 0.42 * (k % 2 ? -1 : 1);
        const g = ctx.createRadialGradient(x, y, 0, x, y, 12);
        g.addColorStop(0, "rgba(223,246,255,0.95)");
        g.addColorStop(1, "rgba(30,159,255,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, Math.PI * 2);
        ctx.fill();
      }
      // Core orb.
      const core = ctx.createRadialGradient(-R * 0.2, -R * 0.25, 0, 0, 0, R * 0.62);
      core.addColorStop(0, "#DCF3FF");
      core.addColorStop(0.5, "#2E9BFF");
      core.addColorStop(1, "#0A2A66");
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(0, 0, R * 0.62, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(125,211,252,0.9)";
      ctx.lineWidth = 2;
      ctx.stroke();
    } else if (variant === "mobile") {
      ctx.rotate(0.06 * Math.sin(t * 0.6));
      const mw = R * 0.95;
      const mh = R * 1.7;
      const g = ctx.createLinearGradient(0, -mh / 2, 0, mh / 2);
      g.addColorStop(0, "rgba(140,210,255,0.9)");
      g.addColorStop(0.5, "rgba(30,144,255,0.75)");
      g.addColorStop(1, "rgba(8,32,80,0.9)");
      rr(ctx, -mw / 2, -mh / 2, mw, mh, mw * 0.22);
      ctx.fillStyle = g;
      ctx.fill();
      ctx.strokeStyle = "rgba(125,211,252,0.9)";
      ctx.lineWidth = 2;
      ctx.stroke();
      // Screen.
      const sg = ctx.createLinearGradient(0, -mh * 0.32, 0, mh * 0.32);
      sg.addColorStop(0, "#0A2A5E");
      sg.addColorStop(1, "#1E9FFF");
      rr(ctx, -mw * 0.36, -mh * 0.32, mw * 0.72, mh * 0.64, 8);
      ctx.fillStyle = sg;
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      rr(ctx, -mw * 0.12, mh * 0.38, mw * 0.24, 3, 1.5);
      ctx.fill();
    } else {
      // Cloud.
      const g = ctx.createLinearGradient(0, -R, 0, R);
      g.addColorStop(0, "rgba(190,230,255,0.95)");
      g.addColorStop(0.55, "rgba(46,155,255,0.85)");
      g.addColorStop(1, "rgba(10,42,102,0.9)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(-R * 0.45, R * 0.1, R * 0.42, 0, Math.PI * 2);
      ctx.arc(R * 0.05, -R * 0.18, R * 0.58, 0, Math.PI * 2);
      ctx.arc(R * 0.55, R * 0.08, R * 0.4, 0, Math.PI * 2);
      ctx.fill();
      rr(ctx, -R * 0.85, R * 0.05, R * 1.75, R * 0.5, R * 0.25);
      ctx.fill();
      ctx.strokeStyle = "rgba(125,211,252,0.85)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(R * 0.05, -R * 0.18, R * 0.58, Math.PI * 1.15, Math.PI * 1.9);
      ctx.stroke();
    }
    ctx.restore();
  });
  if (Platform.OS !== "web") return null;
  return <Div style={{ width: size, height: size }}>{frame(ref, size)}</Div>;
}

/* ---------------- Data-transmission line field + dotted mark ---------------- */
const STREAK_LINES = [3, 9, 15, 21];
const DUST: { line: number; off: number; sp: number; ph: number }[] = Array.from({ length: 14 }, (_, i) => ({
  line: (i * 7 + 2) % 26,
  off: (i * 173) % 1000,
  sp: 24 + ((i * 37) % 40),
  ph: i * 1.3,
}));

export function LineFieldCanvas() {
  const ref = useRef<any>(null);
  useCanvas2D(ref, (ctx, w, h, t) => {
    const N = 26;
    const drift = Math.sin(t * 0.18) * 14;
    for (let i = 0; i < N; i++) {
      const y = (h * (i + 0.5)) / N + (i - N / 2) * 0.9;
      const slope = (i - N / 2) * 0.9;
      const a = 0.08 + 0.1 * (0.5 + 0.5 * Math.sin(i * 2.3));
      const grad = i % 5 === 0;
      ctx.strokeStyle = grad
        ? `rgba(30,144,255,${(a + 0.1).toFixed(3)})`
        : `rgba(10,40,90,${a.toFixed(3)})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-60 + drift, y - slope);
      ctx.lineTo(w + 60 + drift, y + slope);
      ctx.stroke();
    }
    // Traveling light streaks on selected lines.
    STREAK_LINES.forEach((li, k) => {
      const y = (h * (li + 0.5)) / N;
      const head = ((t * (90 + k * 26) + k * 420) % (w + 320)) - 160;
      const g = ctx.createLinearGradient(head - 110, 0, head, 0);
      g.addColorStop(0, "rgba(34,211,238,0)");
      g.addColorStop(1, "rgba(160,240,255,0.85)");
      ctx.strokeStyle = g;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(head - 110, y);
      ctx.lineTo(head, y);
      ctx.stroke();
      const hg = ctx.createRadialGradient(head, y, 0, head, y, 10);
      hg.addColorStop(0, "rgba(200,250,255,0.9)");
      hg.addColorStop(1, "rgba(34,211,238,0)");
      ctx.fillStyle = hg;
      ctx.beginPath();
      ctx.arc(head, y, 10, 0, Math.PI * 2);
      ctx.fill();
    });
    // Dust particles riding the lines.
    DUST.forEach((d) => {
      const y = (h * (d.line + 0.5)) / N;
      const x = ((d.off + t * d.sp) % (w + 120)) - 60;
      const a = 0.25 + 0.25 * Math.sin(t * 2 + d.ph);
      ctx.fillStyle = `rgba(140,220,255,${a.toFixed(3)})`;
      ctx.fillRect(x, y, 2, 2);
    });
    // Dotted geometric mark, lower-middle-left.
    const mx = w * 0.3;
    const my = h * 0.64 + Math.sin(t * 0.8) * 6;
    ctx.save();
    ctx.translate(mx, my);
    ctx.rotate(0.05 * Math.sin(t * 0.4));
    const gap = 8;
    for (let gy = -3; gy <= 3; gy++) {
      for (let gx = -3; gx <= 3; gx++) {
        if (Math.abs(gx) + Math.abs(gy) > 3) continue;
        const a = 0.35 + 0.3 * Math.sin(t * 1.6 + gx + gy * 2);
        ctx.fillStyle = `rgba(235,248,255,${a.toFixed(3)})`;
        ctx.fillRect(gx * gap - 1.5, gy * gap - 1.5, 3, 3);
      }
    }
    ctx.restore();
  });
  if (Platform.OS !== "web") return null;
  return <Div style={{ position: "absolute", inset: 0 }}>{frame(ref, { w: 0, h: 0 })}</Div>;
}
