import React, { useEffect, useRef } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type PortfolioProject = {
  id: string;
  title: string;
  name: string;
  category: [string, string];
  year: string;
  image: string;
  theme: string;
};

export const DEFAULT_PROJECTS: PortfolioProject[] = [
  {
    id: "01",
    title: "SAAS PLATFORM",
    name: "BUSINESS SAAS",
    category: ["PRODUCT DESIGN", "WEB DEVELOPMENT"],
    year: "2026",
    image: "/images/saas-project.jpg",
    theme: "#6b625c",
  },
  {
    id: "02",
    title: "MOBILE APP",
    name: "SMART MOBILE EXPERIENCE",
    category: ["UI/UX DESIGN", "APP DEVELOPMENT"],
    year: "2026",
    image: "/images/mobile-app.jpg",
    theme: "#123f3d",
  },
  {
    id: "03",
    title: "AI SYSTEM",
    name: "AI AUTOMATION PLATFORM",
    category: ["AI & AUTOMATION", "SOFTWARE DEVELOPMENT"],
    year: "2026",
    image: "/images/ai-platform.jpg",
    theme: "#242424",
  },
];

/* ------------------------------------------------------------------ */
/* DOM shims — plain HTML tags so the cinematic web composition can use */
/* <section>/<div>/<img>/<style>. Rendered on web only; native gets an  */
/* RN fallback below.                                                  */
/* ------------------------------------------------------------------ */

// @ts-ignore web-only tags
const Section: any = "section";
// @ts-ignore web-only tags
const Div: any = "div";
// @ts-ignore web-only tags
const Img: any = "img";
// @ts-ignore web-only tags
const H2: any = "h2";
// @ts-ignore web-only tags
const Span: any = "span";
// @ts-ignore web-only tags
const MenuBtn: any = "button";
// @ts-ignore web-only tags
const StyleTag: any = "style";

/* ------------------------------------------------------------------ */
/* Crisp software-visual mockups (inline SVG data URIs).               */
/* Used as the blurred fullscreen background always, and as the sharp  */
/* foreground visual whenever the project's own image 404s.            */
/* ------------------------------------------------------------------ */

function saasSvg(): string {
  return `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='760' viewBox='0 0 1200 760'>
<defs><linearGradient id='g' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#e0aa63' stop-opacity='.55'/><stop offset='1' stop-color='#e0aa63' stop-opacity='0'/></linearGradient></defs>
<rect width='1200' height='760' fill='#161210'/>
<rect width='1200' height='60' fill='#1e1815'/><circle cx='36' cy='30' r='7' fill='#3a2f26'/><circle cx='58' cy='30' r='7' fill='#3a2f26'/><circle cx='80' cy='30' r='7' fill='#d8a35f'/><rect x='120' y='20' width='300' height='20' rx='10' fill='#2a221b'/><rect x='1000' y='18' width='140' height='24' rx='12' fill='#d8a35f'/>
<rect x='0' y='60' width='210' height='700' fill='#1d1712'/><rect x='28' y='92' width='120' height='18' rx='4' fill='#e8ded2'/><rect x='28' y='118' width='80' height='8' rx='4' fill='#5a4c3e'/>
${[0, 1, 2, 3, 4, 5]
  .map(
    (i) =>
      `<rect x='20' y='${170 + i * 52}' width='170' height='36' rx='8' fill='${
        i === 1 ? "#3a2d20" : "#261e17"
      }'/><rect x='36' y='${183 + i * 52}' width='${i === 1 ? 90 : 60 + ((i * 37) % 60)}' height='9' rx='4' fill='${
        i === 1 ? "#e0aa63" : "#6b5b4c"
      }'/>`
  )
  .join("")}
<rect x='240' y='96' width='270' height='150' rx='10' fill='#221b15'/><rect x='264' y='118' width='110' height='10' rx='5' fill='#6b5b4c'/><rect x='264' y='140' width='150' height='34' rx='4' fill='#f2e7d7'/><rect x='264' y='186' width='90' height='10' rx='5' fill='#d8a35f'/>
<rect x='528' y='96' width='270' height='150' rx='10' fill='#221b15'/><rect x='552' y='118' width='130' height='10' rx='5' fill='#6b5b4c'/><rect x='552' y='140' width='120' height='34' rx='4' fill='#f2e7d7'/><rect x='552' y='186' width='110' height='10' rx='5' fill='#7fae7a'/>
<rect x='816' y='96' width='270' height='150' rx='10' fill='#2b2118'/><rect x='840' y='118' width='100' height='10' rx='5' fill='#8a7460'/><rect x='840' y='140' width='160' height='34' rx='4' fill='#e0aa63'/><rect x='840' y='186' width='80' height='10' rx='5' fill='#3a2f26'/>
<rect x='240' y='264' width='560' height='330' rx='10' fill='#1e1814'/>
<rect x='268' y='290' width='180' height='12' rx='6' fill='#e8ded2'/><rect x='268' y='312' width='110' height='9' rx='4' fill='#6b5b4c'/>
<path d='M268 540 L340 470 L410 500 L480 420 L550 445 L620 360 L690 390 L770 300' stroke='#e0aa63' stroke-width='4' fill='none' stroke-linecap='round'/>
<path d='M268 540 L340 470 L410 500 L480 420 L550 445 L620 360 L690 390 L770 300 L770 560 L268 560 Z' fill='url(#g)'/>
${[0, 1, 2, 3, 4, 5, 6]
  .map((i) => `<rect x='${820 + i * 36}' y='${470 - ((i * 53) % 120)}' width='22' height='${90 + ((i * 53) % 120)}' rx='4' fill='${i === 4 ? "#e0aa63" : "#3a2f26"}'/>`)
  .join("")}
<rect x='816' y='264' width='270' height='150' rx='10' fill='#221b15'/>
${[0, 1, 2, 3].map((i) => `<rect x='838' y='${288 + i * 30}' width='${150 - i * 22}' height='10' rx='5' fill='#5a4c3e'/><circle cx='1020' cy='${293 + i * 30}' r='6' fill='${i < 2 ? "#7fae7a" : "#3a2f26"}'/>`).join("")}
<rect x='240' y='612' width='846' height='88' rx='10' fill='#1a1411'/>
${[0, 1, 2].map((i) => `<rect x='${264 + i * 280}' y='636' width='120' height='10' rx='5' fill='#6b5b4c'/><rect x='${264 + i * 280}' y='656' width='200' height='8' rx='4' fill='#3a2f26'/>`).join("")}
</svg>`;
}

function mobileSvg(): string {
  return `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='760' viewBox='0 0 1200 760'>
<rect width='1200' height='760' fill='#0a2220'/>
<circle cx='1020' cy='120' r='220' fill='#155e57' opacity='.35'/><circle cx='140' cy='660' r='180' fill='#155e57' opacity='.25'/>
<rect x='240' y='60' width='260' height='640' rx='36' fill='#0e2e2b' stroke='#2a6b63' stroke-width='2'/>
<rect x='335' y='76' width='70' height='14' rx='7' fill='#1c453f'/>
<rect x='268' y='120' width='140' height='12' rx='6' fill='#5f8f87'/><rect x='268' y='142' width='180' height='34' rx='6' fill='#e9f5f1'/>
<rect x='268' y='196' width='204' height='120' rx='12' fill='#123c37'/><polyline points='280,290 310,260 335,275 365,235 395,250 430,215 460,230' stroke='#5fc9b5' stroke-width='4' fill='none' stroke-linecap='round'/>
<rect x='268' y='332' width='98' height='90' rx='10' fill='#155e57'/><rect x='374' y='332' width='98' height='90' rx='10' fill='#123c37' stroke='#2a6b63'/>
<rect x='268' y='436' width='204' height='120' rx='12' fill='#e9f5f1'/><rect x='284' y='456' width='100' height='10' rx='5' fill='#0e2e2b'/><rect x='284' y='476' width='150' height='8' rx='4' fill='#5f8f87'/><rect x='284' y='500' width='120' height='26' rx='13' fill='#0e2e2b'/>
<circle cx='310' cy='620' r='10' fill='#5fc9b5'/><circle cx='370' cy='620' r='10' fill='#2a6b63'/><circle cx='430' cy='620' r='10' fill='#2a6b63'/>
<rect x='560' y='110' width='220' height='540' rx='32' fill='#0c2724' stroke='#1f4d49' stroke-width='2' opacity='.95'/>
<rect x='584' y='150' width='120' height='11' rx='5' fill='#4d7a73'/><rect x='584' y='170' width='150' height='26' rx='5' fill='#dff0eb'/>
<rect x='584' y='212' width='172' height='100' rx='10' fill='#155e57'/><circle cx='610' cy='250' r='20' fill='#5fc9b5'/><rect x='642' y='238' width='90' height='9' rx='4' fill='#e9f5f1'/><rect x='642' y='254' width='60' height='8' rx='4' fill='#5f8f87'/>
${[0, 1, 2].map((i) => `<rect x='584' y='${326 + i * 62}' width='172' height='48' rx='10' fill='#123c37'/>`).join("")}
<rect x='830' y='110' width='260' height='200' rx='12' fill='#0e2e2b' stroke='#1f4d49'/>
<rect x='854' y='136' width='120' height='11' rx='5' fill='#5f8f87'/><rect x='854' y='158' width='170' height='30' rx='5' fill='#e9f5f1'/>
${[0, 1, 2, 3].map((i) => `<rect x='854' y='${204 + i * 22}' width='${160 - i * 20}' height='8' rx='4' fill='#2a6b63'/>`).join("")}
<rect x='830' y='330' width='260' height='160' rx='12' fill='#0e2e2b' stroke='#1f4d49'/>
<rect x='854' y='354' width='90' height='10' rx='5' fill='#5f8f87'/><rect x='854' y='376' width='60' height='34' rx='17' fill='#2a6b63'/><circle cx='930' cy='393' r='13' fill='#5fc9b5'/>
<rect x='830' y='510' width='260' height='140' rx='12' fill='#5fc9b5'/><rect x='854' y='534' width='140' height='12' rx='6' fill='#0a2220'/><rect x='854' y='556' width='100' height='9' rx='4' fill='#0a2220' opacity='.6'/><rect x='854' y='584' width='110' height='28' rx='14' fill='#0a2220'/>
</svg>`;
}

function aiSvg(): string {
  return `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='760' viewBox='0 0 1200 760'>
<defs><pattern id='dots' width='28' height='28' patternUnits='userSpaceOnUse'><circle cx='2' cy='2' r='1.5' fill='#2c2c30'/></pattern></defs>
<rect width='1200' height='760' fill='#0f0f11'/><rect width='1200' height='760' fill='url(#dots)'/>
<rect x='60' y='90' width='300' height='580' rx='12' fill='#141417' stroke='#2a2a2e'/>
<rect x='88' y='118' width='130' height='11' rx='5' fill='#8e8e96'/><rect x='88' y='140' width='90' height='9' rx='4' fill='#4a4a52'/>
${["INGEST", "EMBED", "REASON", "ACT"]
  .map(
    (label, i) =>
      `<rect x='88' y='${190 + i * 104}' width='244' height='76' rx='10' fill='${i === 2 ? "#1d2436" : "#191920"}' stroke='${i === 2 ? "#7aa2ff" : "#2e2e34"}' stroke-width='${i === 2 ? 2 : 1}'/><circle cx='112' cy='${214 + i * 104}' r='7' fill='${i === 3 ? "#3a3a40" : "#58c98b"}'/><rect x='130' y='${208 + i * 104}' width='90' height='12' rx='6' fill='#d7d7de'/><rect x='130' y='${228 + i * 104}' width='150' height='8' rx='4' fill='#4a4a52'/>` +
      (i < 3 ? `<line x1='210' y1='${266 + i * 104}' x2='210' y2='${294 + i * 104}' stroke='#3a3a42' stroke-width='2'/>` : "")
  )
  .join("")}
<rect x='392' y='90' width='480' height='580' rx='12' fill='#101014' stroke='#2a2a2e'/>
<rect x='392' y='90' width='480' height='52' rx='12' fill='#17171b'/><circle cx='420' cy='116' r='6' fill='#3a3a42'/><circle cx='440' cy='116' r='6' fill='#3a3a42'/><circle cx='460' cy='116' r='6' fill='#7aa2ff'/>
<rect x='420' y='170' width='220' height='34' rx='17' fill='#1c1c22' stroke='#33333c'/><rect x='440' y='182' width='120' height='10' rx='5' fill='#8e8e96'/>
<rect x='560' y='228' width='284' height='150' rx='10' fill='#1a2030' stroke='#7aa2ff'/>
${[0, 1, 2, 3].map((i) => `<rect x='580' y='${248 + i * 28}' width='${200 - i * 28}' height='9' rx='4' fill='#a9c0f5'/>`).join("")}
<rect x='420' y='404' width='160' height='32' rx='16' fill='#232329'/><rect x='436' y='415' width='90' height='10' rx='5' fill='#6a6a74'/>
<rect x='420' y='452' width='424' height='120' rx='10' fill='#0c0c0e' stroke='#2a2a2e'/>
${["$ reiso agents run --workflow onboard", "> 4 nodes healthy · 12 tools bound", "> avg latency 1.8s · cost $0.04/run", "> deploying to production… done"].map((t, i) => `<rect x='440' y='${472 + i * 22}' width='${(t.length * 5.2) | 0}' height='9' rx='4' fill='${i === 0 ? "#58c98b" : "#4a4a52"}'/>`).join("")}
<rect x='904' y='90' width='236' height='260' rx='12' fill='#141417' stroke='#2a2a2e'/>
<circle cx='1022' cy='200' r='52' fill='none' stroke='#2e2e34' stroke-width='10'/><circle cx='1022' cy='200' r='52' fill='none' stroke='#7aa2ff' stroke-width='10' stroke-dasharray='245 327' stroke-linecap='round' transform='rotate(-90 1022 200)'/>
<rect x='996' y='192' width='52' height='14' rx='7' fill='#d7d7de'/>
<rect x='904' y='370' width='236' height='300' rx='12' fill='#141417' stroke='#2a2a2e'/>
${[0, 1, 2, 3, 4].map((i) => `<rect x='928' y='${398 + i * 48}' width='120' height='10' rx='5' fill='#4a4a52'/><rect x='928' y='${414 + i * 48}' width='${60 + ((i * 47) % 90)}' height='14' rx='4' fill='#d7d7de'/>`).join("")}
</svg>`;
}

const MOCK_SVG: Record<string, () => string> = {
  "01": saasSvg,
  "02": mobileSvg,
  "03": aiSvg,
};

function mockUri(project: PortfolioProject): string {
  const make = MOCK_SVG[project.id] ?? saasSvg;
  return `data:image/svg+xml;utf8,${encodeURIComponent(make())}`;
}

/* ------------------------------------------------------------------ */
/* Embedded stylesheet (Metro has no CSS loader, so no .css import).   */
/* ------------------------------------------------------------------ */

const CSS = `
.ps-root { position: relative; background: #000; }
.ps-scroll { position: relative; height: 175vh; }
.ps-sticky {
  position: sticky; top: 0; height: 100vh; height: 100svh;
  overflow: hidden; display: block;
}
.ps-content { position: absolute; inset: 0; will-change: transform; }
.ps-bg {
  position: absolute; inset: -6%;
  background-size: cover; background-position: center;
  filter: blur(10px) scale(1.08);
  will-change: transform;
}
.ps-overlay { position: absolute; inset: 0; background: rgba(0,0,0,.52); }
.ps-tint { position: absolute; inset: 0; opacity: .28; }
.ps-grid { position: absolute; inset: 0; pointer-events: none; }
.ps-grid i { position: absolute; background: rgba(255,255,255,.1); display: block; }
.ps-grid .v1 { left: 24px; top: 0; bottom: 0; width: 1px; }
.ps-grid .v2 { left: 50%; top: 0; bottom: 0; width: 1px; }
.ps-grid .v3 { right: 24px; top: 0; bottom: 0; width: 1px; }
.ps-grid .h1 { left: 0; right: 0; top: 76px; height: 1px; }
.ps-grid .h2 { left: 0; right: 0; bottom: 76px; height: 1px; }
.ps-num, .ps-port {
  position: absolute; top: 30px; z-index: 5;
  color: #fff; font-size: 11px; letter-spacing: .14em; font-weight: 500;
  font-family: 'Inter','Helvetica Neue','Neue Montreal','General Sans',system-ui,sans-serif;
}
.ps-num { left: 40px; } .ps-port { right: 40px; }
.ps-center {
  position: absolute; inset: 0; z-index: 3;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 14px; padding: 90px 0 70px;
}
.ps-title {
  position: absolute; top: 50%; left: 50%; z-index: 2;
  transform: translate(-50%,-50%);
  margin: 0; padding: 0; white-space: nowrap;
  color: #fff; font-weight: 500;
  font-size: clamp(90px, 11vw, 180px);
  letter-spacing: -0.05em; line-height: 1;
  font-family: 'Inter','Helvetica Neue','Neue Montreal','General Sans',system-ui,sans-serif;
  will-change: transform; user-select: none;
}
.ps-imgwrap { width: 62vw; height: 60vh; overflow: hidden; background: #111; will-change: transform; }
.ps-img { width: 100%; height: 100%; object-fit: cover; display: block; will-change: transform; }
.ps-meta {
  width: 62vw; display: flex; justify-content: space-between; align-items: flex-start;
  color: #fff; font-size: 11px; line-height: 1.7; letter-spacing: .12em; font-weight: 500;
  font-family: 'Inter','Helvetica Neue','Neue Montreal','General Sans',system-ui,sans-serif;
}
.ps-meta .c { text-align: center; } .ps-meta .r { text-align: right; }
.ps-menu {
  position: absolute; left: 50%; bottom: 22px; transform: translateX(-50%); z-index: 5;
  width: 48px; height: 48px; background: rgba(10,10,12,.72);
  border: 1px solid rgba(255,255,255,.28); cursor: pointer;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px;
  padding: 0;
}
.ps-menu i { display: block; width: 18px; height: 1.5px; background: #fff; }
.ps-grain {
  position: absolute; inset: 0; z-index: 6; pointer-events: none; opacity: .14;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E");
}
@media (max-width: 1024px) {
  .ps-imgwrap { width: 75vw; height: 56vh; }
  .ps-meta { width: 75vw; }
  .ps-title { font-size: clamp(64px, 10vw, 120px); }
}
@media (max-width: 640px) {
  .ps-scroll { height: 165vh; }
  .ps-imgwrap { width: 88vw; height: 46vh; }
  .ps-meta { width: 88vw; font-size: 10px; letter-spacing: .1em; }
  .ps-title { font-size: 23vw; }
  .ps-num { left: 20px; top: 22px; } .ps-port { right: 20px; top: 22px; }
  .ps-grid .v1 { left: 12px; } .ps-grid .v3 { right: 12px; }
  .ps-grid .h1 { top: 60px; } .ps-grid .h2 { bottom: 60px; }
  .ps-menu { bottom: 14px; }
}
@media (prefers-reduced-motion: reduce) {
  .ps-title, .ps-img, .ps-bg, .ps-content { will-change: auto; }
}
`;

/* ------------------------------------------------------------------ */
/* Web showcase (GSAP ScrollTrigger + optional Lenis).                 */
/* Pinning is CSS sticky (robust inside Expo web); all parallax,      */
/* growth and slide-over motion is GSAP scrubbed ScrollTriggers.       */
/* ------------------------------------------------------------------ */

function WebShowcase({
  projects,
  smooth,
}: {
  projects: PortfolioProject[];
  smooth: boolean;
}) {
  const rootRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;
    let lenis: any = null;
    let rafCb: any = null;
    let ctx: any = null;

    (async () => {
      const gsapMod: any = await import("gsap");
      const stMod: any = await import("gsap/ScrollTrigger");
      const gsap = gsapMod.default ?? gsapMod;
      const ScrollTrigger = stMod.ScrollTrigger ?? stMod.default ?? stMod;
      gsap.registerPlugin(ScrollTrigger);
      if (cancelled) return;

      const reduce =
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

      if (smooth && !reduce) {
        try {
          const lenisMod: any = await import("lenis");
          const Lenis = lenisMod.default ?? lenisMod;
          if (cancelled) return;
          lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
          lenis.on("scroll", ScrollTrigger.update);
          rafCb = (time: number) => lenis.raf(time * 1000);
          gsap.ticker.add(rafCb);
          gsap.ticker.lagSmoothing(0);
        } catch {
          lenis = null;
        }
      }

      const root = rootRef.current;
      if (!root) return;
      const sections: HTMLElement[] = Array.from(
        root.querySelectorAll(".ps-scroll")
      );

      if (reduce) {
        // Static "strongest state" composition, no scroll-linked motion.
        sections.forEach((sec) => {
          gsap.set(sec.querySelector(".ps-imgwrap"), { scale: 1, y: 0 });
          gsap.set(sec.querySelector(".ps-bg"), { scale: 1.08, y: 0 });
          gsap.set(sec.querySelector(".ps-meta"), { opacity: 1, y: 0 });
        });
        return;
      }

      ctx = gsap.context(() => {
        sections.forEach((sec, i) => {
          const imgWrap = sec.querySelector(".ps-imgwrap");
          const bg = sec.querySelector(".ps-bg");
          const title = sec.querySelector(".ps-title");
          const meta = sec.querySelector(".ps-meta");
          const content = sec.querySelector(".ps-content");

          // ENTER — image grows from slightly smaller + lower, meta rises in.
          gsap.fromTo(
            imgWrap,
            { scale: 0.88, y: 80 },
            {
              scale: 1,
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: sec,
                start: "top bottom",
                end: "center center",
                scrub: 1,
              },
            }
          );
          gsap.fromTo(
            meta,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: sec,
                start: "top 35%",
                end: "center center",
                scrub: 1,
              },
            }
          );

          // THROUGH — differential parallax: bg drifts 15–25px, image ~35px,
          // giant title sweeps ~90px horizontally behind the image.
          gsap.fromTo(
            bg,
            { scale: 1.0, y: 0 },
            {
              scale: 1.1,
              y: -22,
              ease: "none",
              scrollTrigger: {
                trigger: sec,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            }
          );
          gsap.fromTo(
            imgWrap,
            { y: 40 },
            {
              y: -35,
              ease: "none",
              scrollTrigger: {
                trigger: sec,
                start: "center center",
                end: "bottom top",
                scrub: 1,
              },
            }
          );
          gsap.fromTo(
            title,
            { xPercent: -58, x: -90 },
            {
              xPercent: -42,
              x: 90,
              ease: "none",
              scrollTrigger: {
                trigger: sec,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            }
          );

          // EXIT — physical layered handoff: the outgoing scene lifts a
          // touch and settles back while the next scene (normal flow, higher
          // z-index) slides upward from below over it.
          if (i < sections.length - 1) {
            gsap.fromTo(
              content,
              { yPercent: 0, scale: 1 },
              {
                yPercent: -18,
                scale: 0.97,
                ease: "none",
                transformOrigin: "center center",
                scrollTrigger: {
                  trigger: sections[i + 1],
                  start: "top bottom",
                  end: "top top",
                  scrub: 1,
                },
              }
            );
          }
        });
      }, root);

      // Refresh after images / fonts settle.
      const t = setTimeout(() => ScrollTrigger.refresh(), 600);
      (ctx as any).__refreshTimer = t;
    })();

    return () => {
      cancelled = true;
      try {
        if (rafCb) {
          import("gsap").then((m: any) => {
            const gsap = m.default ?? m;
            gsap.ticker.remove(rafCb);
          });
        }
        lenis?.destroy?.();
        if (ctx) {
          clearTimeout((ctx as any).__refreshTimer);
          ctx.revert();
        }
      } catch {
        /* noop */
      }
    };
  }, [projects, smooth]);

  return (
    <Section className="ps-root" ref={rootRef}>
      <StyleTag>{CSS}</StyleTag>
      {projects.map((p, i) => {
        const mock = mockUri(p);
        return (
          <Section
            key={p.id}
            className="project-scroll ps-scroll"
            style={{ zIndex: i + 1 }}
          >
            <Div
              className="project-sticky ps-sticky"
              style={{ backgroundColor: p.theme }}
            >
              <Div className="ps-content">
                <Div
                  className="project-background ps-bg"
                  style={{ backgroundImage: `url("${mock}")` }}
                />
                <Div className="ps-tint" style={{ backgroundColor: p.theme }} />
                <Div className="overlay ps-overlay" />
                <Div className="grid-lines ps-grid" aria-hidden="true">
                  <i className="v1" />
                  <i className="v2" />
                  <i className="v3" />
                  <i className="h1" />
                  <i className="h2" />
                </Div>

                <H2 className="giant-title ps-title">{p.title}</H2>

                <Div className="ps-center">
                  <Div className="project-image-wrapper ps-imgwrap">
                    <Img
                      className="project-image ps-img"
                      src={p.image}
                      alt={p.name}
                      // @ts-ignore web-only handler
                      onError={(e: any) => {
                        const t = e?.currentTarget;
                        if (t && t.src !== mock) t.src = mock;
                      }}
                    />
                  </Div>
                  <Div className="project-meta ps-meta">
                    <Span className="l">{p.name}</Span>
                    <Span className="c">
                      {p.category[0]}
                      <br />
                      {p.category[1]}
                    </Span>
                    <Span className="r">{p.year}</Span>
                  </Div>
                </Div>

                <Span className="project-number ps-num">({p.id})</Span>
                <Span className="portfolio-label ps-port">PORTFOLIO</Span>

                <MenuBtn
                  className="project-menu ps-menu"
                  aria-label={`Open ${p.name} project menu`}
                >
                  <i />
                  <i />
                  <i />
                </MenuBtn>
                <Div className="grain ps-grain" aria-hidden="true" />
              </Div>
            </Div>
          </Section>
        );
      })}
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Native fallback — same content as a calm stacked list.              */
/* ------------------------------------------------------------------ */

function NativeShowcase({ projects }: { projects: PortfolioProject[] }) {
  return (
    <View style={nativeStyles.root}>
      <Text style={nativeStyles.kicker}>PORTFOLIO</Text>
      {projects.map((p) => (
        <View
          key={p.id}
          style={[nativeStyles.card, { backgroundColor: p.theme }]}
        >
          <Text style={nativeStyles.num}>({p.id})</Text>
          <Text style={nativeStyles.title}>{p.title}</Text>
          <Text style={nativeStyles.name}>{p.name}</Text>
          <Text style={nativeStyles.meta}>
            {p.category[0]} / {p.category[1]} — {p.year}
          </Text>
        </View>
      ))}
    </View>
  );
}

const nativeStyles = StyleSheet.create({
  root: {
    paddingHorizontal: 20,
    paddingVertical: 32,
    gap: 16,
    backgroundColor: colors.bg0,
  },
  kicker: {
    color: colors.textSecondary,
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: "700",
  },
  card: {
    borderRadius: 4,
    padding: 22,
    gap: 6,
  },
  num: { color: "#fff", fontSize: 11, letterSpacing: 1.5, opacity: 0.8 },
  title: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "500",
    letterSpacing: -1,
  },
  name: { color: "#fff", fontSize: 12, letterSpacing: 1.2, fontWeight: "700" },
  meta: { color: "rgba(255,255,255,0.75)", fontSize: 11, letterSpacing: 1 },
});

/* ------------------------------------------------------------------ */
/* Public API                                                          */
/* ------------------------------------------------------------------ */

export function PortfolioShowcase({
  projects = DEFAULT_PROJECTS,
  smooth = true,
}: {
  projects?: PortfolioProject[];
  smooth?: boolean;
}) {
  if (Platform.OS !== "web") return <NativeShowcase projects={projects} />;
  return <WebShowcase projects={projects} smooth={smooth} />;
}
