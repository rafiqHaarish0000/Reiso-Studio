import React, { useEffect, useRef } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { useResponsive } from "../../hooks/useResponsive";
import { reducedMotion } from "./fx";
import { IconCanvas, type IconVariant } from "./objects";
import { Div } from "./primitives";

/**
 * Cinematic ServicesSection — giant backdrop typography + 3D card stack.
 * Scroll progress 0→1 cycles cards: enter from behind → front → exit up-right.
 * Fully reversible, transform/opacity only, perspective 1200px.
 */

const CARDS: { line1: string; line2: string; desc: string; icon: IconVariant }[] = [
  { line1: "Workflow", line2: "Automation", desc: "AI Automation", icon: "gear" },
  { line1: "AI Assistants", line2: "& Copilots", desc: "AI & Tools Integration", icon: "ai" },
  { line1: "Mobile", line2: "Development", desc: "Custom Development", icon: "mobile" },
  { line1: "Cloud &", line2: "Backend", desc: "Smart Integrations", icon: "cloud" },
];

const N = CARDS.length;
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

export function ServicesSection() {
  const { isMobile } = useResponsive();
  const sectionRef = useRef<any>(null);
  const cardRefs = useRef<any[]>([]);
  const textRef = useRef<any>(null);

  const cardW = isMobile ? 270 : 340;
  const cardH = isMobile ? 400 : 470;
  const glowRef = useRef<any>(null);

  useEffect(() => {
    if (Platform.OS !== "web" || typeof window === "undefined") return;
    const section = sectionRef.current;
    if (!section || typeof section.getBoundingClientRect !== "function") return;
    if (reducedMotion()) {
      paint(0);
      return;
    }
    let raf = 0;
    let smooth = -1;
    const read = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const total = Math.max(1, rect.height - vh);
      return clamp01(-rect.top / total);
    };
    const frame = () => {
      const p = read();
      smooth = smooth < 0 ? p : smooth + (p - smooth) * 0.12;
      if (Math.abs(p - smooth) < 0.0004) smooth = p;
      paint(smooth);
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      if (rect.bottom > -vh && rect.top < vh * 1.2) {
        raf = requestAnimationFrame(frame);
      } else {
        raf = 0;
      }
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    paint(read());
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

  function paint(p: number) {
    // --- Section scroll progress p: 0→1 across the whole sticky travel.
    // Giant backdrop text stays fixed; glow drifts subtly with scroll.
    const t = textRef.current;
    if (t?.style) {
      t.style.opacity = (0.9 - 0.25 * p).toFixed(3);
      t.style.transform = `translate(-50%,-50%) translate3d(${((p - 0.5) * 60).toFixed(1)}px, 0, 0)`;
    }
    const g = glowRef.current;
    if (g?.style) {
      g.style.transform = `translate(-50%,${(-50 + p * 8).toFixed(2)}%)`;
    }
    for (let i = 0; i < N; i++) {
      // --- Card progress: q = 0 entering → 1 front → 2 exiting.
      // Pure function of scroll: stopping mid-scroll freezes cards mid-flight.
      const el = cardRefs.current[i];
      if (!el?.style) continue;
      const q = p * N - i;
      let x = 0;
      let y = 0;
      let rx = 0;
      let rot = 0;
      let sc = 1;
      let op = 1;
      let z = 0;
      if (q < 0) {
        // Waiting behind: stacked below, tilted back, dimmed.
        if (q < -1) {
          op = 0;
          y = 160;
          sc = 0.82;
          rx = 24;
        } else {
          const tt = q + 1;
          y = 130 * (1 - tt); // card Y movement: rises into place
          sc = 0.85 + 0.15 * tt; // scale settles to 1
          rx = 20 * (1 - tt); // rotation flattens out
          op = 0.35 + 0.65 * tt;
        }
        z = 30 - i;
      } else if (q <= 1) {
        // Front and centered.
        z = 40;
      } else if (q < 2) {
        // Swiped upward: mostly vertical exit, slight drift + tilt + fade.
        const e = q - 1;
        x = 70 * e;
        y = -220 * e; // card Y movement: leaves upward
        rx = -8 * e; // rotation while leaving
        rot = 5 * e;
        sc = 1 - 0.06 * e; // scale change while leaving
        op = 1 - e; // opacity reduces subtly
        z = 44;
      } else {
        op = 0;
        y = -220;
        x = 70;
      }
      el.style.opacity = op.toFixed(3);
      el.style.transform =
        `translate(-50%,-50%) translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) ` +
        `rotateX(${rx.toFixed(2)}deg) rotate(${rot.toFixed(2)}deg) scale(${sc.toFixed(4)})`;
      el.style.zIndex = z;
      el.style.visibility = op <= 0 ? "hidden" : "visible";
    }
  }

  // ---------- Native: static first card ----------
  if (Platform.OS !== "web") {
    return (
      <View style={[c.section, isMobile && c.sectionMobile]}>
        <Text style={c.giant}>Our Services</Text>
        <View style={c.card}>
          <Text style={c.cardTitle}>
            {CARDS[0].line1}
            {"\n"}
            {CARDS[0].line2}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <Div ref={sectionRef} style={{ position: "relative", height: "260vh", backgroundColor: "#000000" }}>
      <Div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Ambient center glow + dotted light-field texture */}
        <Div
          ref={glowRef}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "70vw",
            height: "70vw",
            maxWidth: 900,
            maxHeight: 900,
            transform: "translate(-50%,-50%)",
            background:
              "radial-gradient(ellipse at center, rgba(30,110,220,0.14) 0%, rgba(91,53,255,0.08) 45%, transparent 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />
        <Div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "60vw",
            height: "60vw",
            maxWidth: 760,
            maxHeight: 760,
            transform: "translate(-50%,-50%)",
            backgroundImage: "radial-gradient(rgba(140,200,255,0.5) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
            opacity: 0.07,
            pointerEvents: "none",
            maskImage: "radial-gradient(circle, black 30%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(circle, black 30%, transparent 70%)",
          }}
        />
        {/* Giant backdrop typography */}
        <Div
          ref={textRef}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
            color: "#F5F5F5",
            fontSize: isMobile ? "21vw" : "min(15vw, 200px)",
            fontWeight: 300,
            letterSpacing: "-0.04em",
            whiteSpace: "nowrap",
            fontFamily: "Inter,Geist,Manrope,system-ui,sans-serif",
            opacity: 0.9,
            userSelect: "none",
          } as any}
        >
          Our Services
        </Div>
        {/* 3D card stack */}
        <Div style={{ position: "absolute", inset: 0, perspective: "1200px" }}>
          {CARDS.map((card, i) => (
            <Div
              key={card.line1}
              ref={(el: any) => {
                cardRefs.current[i] = el;
              }}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: cardW,
                height: cardH,
                borderRadius: 20,
                border: "1px solid rgba(255,255,255,0.14)",
                background: "linear-gradient(180deg, #0A1430 0%, #04070F 100%)",
                boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 60px rgba(30,100,220,0.12)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                willChange: "transform, opacity",
                opacity: i === 0 ? 1 : 0,
              } as any}
            >
              <IconCanvas size={isMobile ? 96 : 120} variant={card.icon} />
              <Div
                style={{
                  color: "#1EA7FF",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "2px",
                  fontFamily: "Inter,system-ui,sans-serif",
                  marginTop: 16,
                }}
              >
                {card.desc.toUpperCase()}
              </Div>
              <Div
                style={{
                  color: "#F5F5F5",
                  fontSize: isMobile ? 26 : 32,
                  fontWeight: 400,
                  textAlign: "center",
                  lineHeight: 1.15,
                  fontFamily: "Inter,Geist,system-ui,sans-serif",
                  marginTop: 8,
                }}
              >
                {card.line1}
                <br />
                {card.line2}
              </Div>
            </Div>
          ))}
        </Div>
      </Div>
    </Div>
  );
}

const c = StyleSheet.create({
  section: { backgroundColor: "#000", paddingVertical: 100, alignItems: "center", gap: 30 },
  sectionMobile: { paddingVertical: 70 },
  giant: { color: "#F5F5F5", fontSize: 80, fontWeight: "300" },
  card: {
    width: 300,
    height: 400,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
    backgroundColor: "#060B18",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: { color: "#F5F5F5", fontSize: 30, textAlign: "center", lineHeight: 36 },
});
