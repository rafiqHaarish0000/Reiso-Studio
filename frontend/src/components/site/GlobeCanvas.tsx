import React, { useEffect, useRef } from "react";
import { Platform } from "react-native";
import { GLOBE_DOTS } from "../../data/globeDots";
import { Div } from "./primitives";

/**
 * Digital dotted globe — canvas orthographic projection of real continents.
 * - Continuous 45s rotation, linear, infinite
 * - Cursor tilt ±4° (spring-smoothed, desktop fine-pointer only)
 * - Scroll-modulated speed via spinBoostRef (1 = idle, ~1.35 mid-section)
 * - Renders only while visible (IntersectionObserver) + dpr-capped GPU-cheap dots
 */

type Props = {
  size: number;
  spinBoostRef?: React.MutableRefObject<number>;
};

const RAD = Math.PI / 180;
const ROT_PERIOD = 45; // seconds per revolution

// Precompute radians once.
const DOTS = GLOBE_DOTS.map(([lat, lon]) => {
  const la = lat * RAD;
  return { cosLat: Math.cos(la), sinLat: Math.sin(la), lon: lon * RAD };
});

export function GlobeCanvas({ size, spinBoostRef }: Props) {
  const canvasRef = useRef<any>(null);
  const wrapRef = useRef<any>(null);

  useEffect(() => {
    if (Platform.OS !== "web") return;
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap || typeof canvas.getContext !== "function") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      // Static render: single frame, no motion.
      drawFrame(canvas, size, 0.6, 0, 0);
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = size * dpr;
    canvas.height = size * dpr;

    let raf = 0;
    let last = performance.now();
    let angle = 0.6; // start facing Atlantic/Africa-Europe
    let visible = false;
    let tiltX = 0;
    let tiltY = 0;
    let tiltVX = 0;
    let tiltVY = 0;
    let driftX = 0;
    let driftY = 0;
    let driftVX = 0;
    let driftVY = 0;
    let targetTX = 0;
    let targetTY = 0;
    let targetNX = 0;
    let targetNY = 0;

    const finePointer =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(pointer: fine)").matches;

    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      const nx = ((e.clientX - (r.left + r.width / 2)) / (r.width / 2 || 1));
      const ny = ((e.clientY - (r.top + r.height / 2)) / (r.height / 2 || 1));
      const cx = Math.max(-1, Math.min(1, nx));
      const cy = Math.max(-1, Math.min(1, ny));
      targetTY = cx * 4; // ±4°
      targetTX = -cy * 4;
      targetNX = cx * 8; // ±8px drift
      targetNY = cy * 6;
    };
    if (finePointer) window.addEventListener("mousemove", onMove, { passive: true });

    const io = new IntersectionObserver(
      (es) => {
        visible = es[0]?.isIntersecting ?? false;
        if (visible) {
          last = performance.now();
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(tick);
        } else {
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.02 }
    );
    io.observe(wrap);

    const tick = (now: number) => {
      if (!visible) return;
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;
      // Rotation with scroll-modulated speed.
      const boost = spinBoostRef?.current ?? 1;
      angle += ((Math.PI * 2) / ROT_PERIOD) * boost * dt;
      // Spring tilt (stiffness ~60, damping ~22) + positional drift (≤8px).
      tiltVX += (60 * (targetTX - tiltX) - 22 * tiltVX) * dt;
      tiltVY += (60 * (targetTY - tiltY) - 22 * tiltVY) * dt;
      tiltX += tiltVX * dt;
      tiltY += tiltVY * dt;
      driftVX += (50 * (targetNX - driftX) - 20 * driftVX) * dt;
      driftVY += (50 * (targetNY - driftY) - 20 * driftVY) * dt;
      driftX += driftVX * dt;
      driftY += driftVY * dt;
      if (canvas.style) {
        canvas.style.transform = `translate3d(${driftX.toFixed(2)}px, ${driftY.toFixed(2)}px, 0)`;
      }
      drawFrame(canvas, size, angle, tiltX, tiltY, dpr);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      if (finePointer) window.removeEventListener("mousemove", onMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  if (Platform.OS !== "web") return null;

  return (
    <Div ref={wrapRef} style={{ width: size, height: size, position: "relative" }}>
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        style={{ width: size, height: size, display: "block" }}
        aria-label="Rotating digital globe"
      />
    </Div>
  );
}

function drawFrame(
  canvas: HTMLCanvasElement,
  size: number,
  angle: number,
  tiltXDeg: number,
  tiltYDeg: number,
  dpr = 1
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const R = (size / 2) * 0.86 * dpr;
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const tiltX = tiltXDeg * RAD;
  const tiltY = tiltYDeg * RAD;
  const cosTX = Math.cos(tiltX);
  const sinTX = Math.sin(tiltX);
  const cosTY = Math.cos(tiltY);
  const sinTY = Math.sin(tiltY);
  const dotBase = Math.max(1, size / 500) * dpr;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Atmosphere: soft blue halo behind sphere (10-20% feel, cheap radial).
  const halo = ctx.createRadialGradient(cx, cy, R * 0.7, cx, cy, R * 1.28);
  halo.addColorStop(0, "rgba(33,183,255,0.10)");
  halo.addColorStop(0.75, "rgba(33,183,255,0.05)");
  halo.addColorStop(1, "rgba(33,183,255,0)");
  ctx.fillStyle = halo;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Dark sphere body: deep navy, almost black.
  const body = ctx.createRadialGradient(
    cx - R * 0.35,
    cy - R * 0.4,
    R * 0.1,
    cx,
    cy,
    R
  );
  body.addColorStop(0, "#0A1830");
  body.addColorStop(0.55, "#050B1A");
  body.addColorStop(1, "#01030A");
  ctx.fillStyle = body;
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.fill();

  // Dotted continents (~1px, electric blue, 45-80% by depth).
  for (let i = 0; i < DOTS.length; i++) {
    const d = DOTS[i];
    const lon = d.lon + angle;
    const sinLon = Math.sin(lon);
    const cosLon = Math.cos(lon);
    let x = d.cosLat * sinLon;
    let y = d.sinLat;
    let z = d.cosLat * cosLon;
    // Tilt: rotate about X then Y.
    const y1 = y * cosTX - z * sinTX;
    const z1 = y * sinTX + z * cosTX;
    const x2 = x * cosTY + z1 * sinTY;
    const z2 = -x * sinTY + z1 * cosTY;
    if (z2 < -0.06) continue; // back hemisphere
    const depth = Math.max(0, Math.min(1, (z2 + 0.06) / 1.06));
    const a = 0.45 + depth * 0.35;
    const s = dotBase * (0.65 + depth * 0.9);
    ctx.fillStyle = `rgba(33,183,255,${a.toFixed(3)})`;
    ctx.beginPath();
    ctx.arc(cx + x2 * R, cy - y1 * R, s, 0, Math.PI * 2);
    ctx.fill();
  }

  // Cinematic top-left highlight for depth.
  const hi = ctx.createRadialGradient(
    cx - R * 0.45,
    cy - R * 0.5,
    0,
    cx - R * 0.45,
    cy - R * 0.5,
    R * 0.9
  );
  hi.addColorStop(0, "rgba(140,220,255,0.07)");
  hi.addColorStop(1, "rgba(140,220,255,0)");
  ctx.fillStyle = hi;
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.fill();

  // Thin electric-blue rim (60%) + faint outer ring.
  ctx.strokeStyle = "rgba(33,183,255,0.6)";
  ctx.lineWidth = 1.4 * dpr;
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = "rgba(33,183,255,0.14)";
  ctx.lineWidth = 1 * dpr;
  ctx.beginPath();
  ctx.arc(cx, cy, R * 1.04, 0, Math.PI * 2);
  ctx.stroke();
}
