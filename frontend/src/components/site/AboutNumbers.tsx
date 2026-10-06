import React, { useEffect, useRef } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { useResponsive } from "../../hooks/useResponsive";
import { GlobeCanvas } from "./GlobeCanvas";
import { Div, Span, StyleTag } from "./primitives";

/**
 * REISO STUDIO — About / In Numbers + rotating digital globe.
 * Fully scroll-driven (pure function of scroll position → reverses naturally):
 * label → 4 editorial lines (blur/slide stagger) → globe reveal → stats stagger + counters.
 * Motion language: cubic-bezier(.22,1,.36,1), fast .3-.5 / text .6-.9 / visual 1.0-1.5s equivalents.
 */

const LINES: { text: string; accent?: "blue" }[] = [
  { text: "At Reiso Studio, we are" },
  { text: "dedicated to building" },
  { text: "innovative digital experiences", accent: "blue" },
  { text: "that empower businesses." },
];

// Editable company metrics (number + label). Counters parse the numeric prefix.
const STATS = [
  { value: "04+", label: "Years Experience" },
  { value: "49+", label: "Projects Delivered" },
  { value: "12+", label: "Technologies" },
  { value: "26%", label: "Client Satisfaction" },
];

const WORDS: { word: string; accent?: "blue" }[] = LINES.flatMap((l) =>
  l.text.split(" ").map((word) => ({ word, accent: l.accent }))
);

function parseStat(value: string): { num: number; suffix: string; pad: number } {
  const m = value.match(/^(\d+)(\D*)$/);
  if (!m) return { num: 0, suffix: "", pad: 0 };
  return { num: parseInt(m[1], 10), suffix: m[2], pad: m[1].length > 1 ? m[1].length : 0 };
}

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3); // cubic-bezier(.22,1,.36,1) approx

export function AboutNumbers() {
  const { isMobile, width } = useResponsive();
  const wide = width >= 1024; // full editorial composition; below stacks
  const sectionRef = useRef<any>(null);
  const labelRef = useRef<any>(null);
  const wordRefs = useRef<any[]>([]);
  const statRefs = useRef<any[]>([]);
  const numRefs = useRef<any[]>([]);
  const globeWrapRef = useRef<any>(null);
  const spinBoostRef = useRef(1);
  const lastNums = useRef<string[]>(["", "", "", ""]);

  const globeSize = wide
    ? Math.round(Math.max(520, Math.min(620, width * 0.36)))
    : isMobile
      ? 320
      : 420;

  useEffect(() => {
    if (Platform.OS !== "web" || typeof window === "undefined") return;
    const section = sectionRef.current;
    if (!section || typeof section.getBoundingClientRect !== "function") return;

    // Reduced motion: lock everything in its final visible state.
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      applyFrame(1, 0, true);
      return;
    }

    let raf = 0;
    let smooth = -1; // uninitialized
    let ticks = 0;

    const read = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const enter = clamp01((vh * 0.85 - rect.top) / (vh * 0.65));
      const exit = clamp01((-rect.top - vh * 0.25) / (vh * 0.6));
      return { enter, exit };
    };

    const frame = () => {
      ticks += 1;
      const { enter, exit } = read();
      // Spring-ish smoothing for momentum (fast UI response, no jitter).
      smooth = smooth < 0 ? enter : smooth + (enter - smooth) * 0.16;
      if (Math.abs(enter - smooth) < 0.0005) smooth = enter;
      applyFrame(smooth, exit, false);
      // Keep looping while visible or settling; otherwise park until scroll.
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const near = rect.top < vh * 1.1 && rect.bottom > -vh * 0.2;
      if (near || Math.abs(enter - smooth) > 0.0005) {
        raf = requestAnimationFrame(frame);
      } else {
        raf = 0;
      }
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    applyFrame(read().enter, read().exit, true);
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function applyFrame(s: number, exit: number, instant: boolean) {
    void instant;
    // Scroll-speed boost for the globe: idle at edges, ~1.35x mid-section.
    spinBoostRef.current = 1 + 0.35 * Math.sin(Math.PI * clamp01(s));
    // Label first (slide from left).
    styleRevealX(labelRef.current, clamp01((s + 0.06) / 0.45), exit);
    // Editorial copy: word-by-word blur reveal (0.045 stagger).
    for (let j = 0; j < WORDS.length; j++) {
      styleRevealWord(wordRefs.current[j], clamp01((s - j * 0.045) / 0.4), exit);
    }
    // Globe: emerge from darkness (blur 8→0, scale .94→1), linger on exit.
    const g = globeWrapRef.current;
    if (g?.style) {
      const t = easeOut(clamp01((s - 0.3) / 0.5));
      const op = t * (1 - 0.8 * exit);
      const sc = 0.94 + 0.06 * t - 0.05 * exit * t;
      const y = (1 - t) * 30 - 30 * exit;
      const bl = (1 - t) * 8;
      g.style.opacity = op.toFixed(3);
      g.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0) scale(${sc.toFixed(4)})`;
      g.style.filter = t >= 1 && exit <= 0 ? "none" : `blur(${bl.toFixed(2)}px)`;
    }
    // Stats: sequential rise + counters.
    for (let i = 0; i < 4; i++) {
      const el = statRefs.current[i];
      if (el?.style) {
        const t = easeOut(clamp01((s - 0.55 - i * 0.13) / 0.35));
        el.style.opacity = (t * (1 - 0.6 * exit)).toFixed(3);
        el.style.transform = `translate3d(0, ${((1 - t) * 20 - exit * 12).toFixed(1)}px, 0)`;
      }
      const numEl = numRefs.current[i];
      if (numEl) {
        const st = parseStat(STATS[i].value);
        const tc = easeOut(clamp01((s - 0.6 - i * 0.13) / 0.4));
        const n = Math.round(tc * st.num);
        const str = `${st.pad ? String(n).padStart(st.pad, "0") : n}${st.suffix}`;
        if (lastNums.current[i] !== str) {
          lastNums.current[i] = str;
          if (typeof numEl.textContent !== "undefined") numEl.textContent = str;
          else if (numEl.setNativeProps) numEl.setNativeProps({ text: str });
        }
      }
    }
  }

  function styleRevealX(el: any, t: number, exit: number) {
    if (!el?.style) return;
    const e = easeOut(clamp01(t));
    el.style.opacity = (e * (1 - 0.6 * exit)).toFixed(3);
    el.style.transform = `translate3d(${((1 - e) * -25).toFixed(1)}px, ${(exit * -20).toFixed(1)}px, 0)`;
    el.style.filter = e >= 1 && exit <= 0 ? "none" : `blur(${((1 - e) * 5 + exit * 2).toFixed(2)}px)`;
  }

  function styleRevealWord(el: any, t: number, exit: number) {
    if (!el?.style) return;
    const e = easeOut(clamp01(t));
    el.style.opacity = (e * (1 - 0.6 * exit)).toFixed(3);
    el.style.transform = `translate3d(0, ${((1 - e) * 10 - exit * 8).toFixed(1)}px, 0)`;
    el.style.filter = e >= 1 && exit <= 0 ? "none" : `blur(${((1 - e) * 10 + exit * 2).toFixed(2)}px)`;
  }

  // ---------- Native: static, no scroll-linking ----------
  if (Platform.OS !== "web") {
    return (
      <View style={[a.section, isMobile && a.sectionMobile]}>
        <Text style={a.label}>[ IN NUMBERS ]</Text>
        {LINES.map((l) => (
          <Text key={l.text} style={a.nativeLine}>
            {l.text}
          </Text>
        ))}
        <View style={a.nativeStats}>
          {STATS.map((st) => {
            const p = parseStat(st.value);
            return (
              <View key={st.label} style={a.nativeStat}>
                <Text style={a.statNum}>
                  {p.pad ? String(p.num).padStart(p.pad, "0") : p.num}
                  {p.suffix}
                </Text>
                <Text style={a.statLabel}>{st.label}</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  }

  // ---------- Web ----------
  return (
    <Div
      ref={sectionRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#000000",
        overflow: "hidden",
      }}
    >
      <StyleTag>{`@media (prefers-reduced-motion: reduce){.reiso-about-anim{transition:none!important;}}`}</StyleTag>
      <Div
        style={{
          position: "relative",
          width: "100%",
          paddingLeft: wide ? "min(18vw, 320px)" : "24px",
          paddingRight: wide ? "min(7vw, 130px)" : "24px",
          paddingTop: wide ? "0" : "90px",
          paddingBottom: wide ? "0" : "90px",
          display: "grid",
          gridTemplateColumns: wide ? "52fr 48fr" : "1fr",
          gap: wide ? "24px" : "52px",
          alignItems: "center",
        }}
      >
        {/* LEFT */}
        <Div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Div
            ref={labelRef}
            className="reiso-about-anim"
            style={{
              color: "#21B7FF",
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "1.5px",
              fontFamily: "Inter,Manrope,system-ui,sans-serif",
              marginBottom: "28px",
              opacity: 0,
            }}
          >
            <Span style={{ color: "rgba(255,255,255,0.35)" }}>[ </Span>
            IN NUMBERS
            <Span style={{ color: "rgba(255,255,255,0.35)" }}> ]</Span>
          </Div>
          <Div style={{ maxWidth: "580px" }}>
            {LINES.map((l, i) => (
              <Div key={l.text}>
                {l.text.split(" ").map((w, k) => {
                  const idx =
                    LINES.slice(0, i).reduce((n, ll) => n + ll.text.split(" ").length, 0) + k;
                  return (
                    <Span
                      key={k}
                      ref={(el: any) => {
                        wordRefs.current[idx] = el;
                      }}
                      style={{
                        display: "inline-block",
                        color: l.accent === "blue" ? "#21B7FF" : "#F5F5F5",
                        fontSize: wide ? "44px" : isMobile ? "30px" : "36px",
                        lineHeight: 1.16,
                        fontWeight: 400,
                        letterSpacing: "-0.5px",
                        fontFamily: "Inter,Manrope,Geist,sans-serif",
                        opacity: 0,
                        marginRight: "0.26em",
                      }}
                    >
                      {w}
                    </Span>
                  );
                })}
              </Div>
            ))}
          </Div>
          <Div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
              gap: isMobile ? "28px 20px" : "40px",
              marginTop: wide ? "60px" : "44px",
            }}
          >
            {STATS.map((st, i) => (
              <Div
                key={st.label}
                ref={(el: any) => {
                  statRefs.current[i] = el;
                }}
                style={{ opacity: 0 }}
              >
                <Div style={{ display: "flex", alignItems: "flex-start", gap: "6px" }}>
                  <Span style={{ color: "#21B7FF", fontSize: "16px", lineHeight: "30px" }}>↑</Span>
                  <Span
                    ref={(el: any) => {
                      numRefs.current[i] = el;
                    }}
                    style={{
                      color: "#F5F5F5",
                      fontSize: "28px",
                      fontWeight: 400,
                      letterSpacing: "-0.5px",
                      fontFamily: "Inter,Manrope,sans-serif",
                      lineHeight: "32px",
                    }}
                  >
                    {(() => {
                      const p = parseStat(st.value);
                      return `${p.pad ? "0".repeat(p.pad) : "0"}${p.suffix}`;
                    })()}
                  </Span>
                </Div>
                <Div
                  style={{
                    color: "#777777",
                    fontSize: "14px",
                    marginTop: "8px",
                    fontFamily: "Inter,system-ui,sans-serif",
                  }}
                >
                  {st.label}
                </Div>
              </Div>
            ))}
          </Div>
        </Div>

        {/* RIGHT — globe with atmospheric glow */}
        <Div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Div
            style={{
              position: "absolute",
              width: globeSize * 1.5,
              height: globeSize * 1.5,
              background: "radial-gradient(circle, rgba(33,183,255,0.10) 0%, rgba(102,55,255,0.05) 45%, transparent 70%)",
              filter: "blur(50px)",
              pointerEvents: "none",
            }}
          />
          <Div ref={globeWrapRef} style={{ position: "relative", opacity: 0 }}>
            <GlobeCanvas size={globeSize} spinBoostRef={spinBoostRef} />
          </Div>
        </Div>
      </Div>
    </Div>
  );
}

/** Requested component name — same section, reference-accurate composition. */
export const InNumbersSection = AboutNumbers;

const a = StyleSheet.create({
  section: { backgroundColor: "#000", paddingHorizontal: 24, paddingVertical: 80, gap: 8 },
  sectionMobile: { paddingVertical: 64 },
  label: { color: "#21B7FF", fontSize: 13, fontWeight: "600", letterSpacing: 1.5, marginBottom: 16 },
  nativeLine: { color: "#fff", fontSize: 30, fontWeight: "500", lineHeight: 38 },
  nativeStats: { flexDirection: "row", flexWrap: "wrap", gap: 24, marginTop: 32 },
  nativeStat: { flexBasis: 140, flexGrow: 1 },
  statNum: { color: "#fff", fontSize: 28, fontWeight: "700" },
  statLabel: { color: "rgba(255,255,255,0.60)", fontSize: 14, marginTop: 4 },
});
