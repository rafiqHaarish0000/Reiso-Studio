import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "expo-router";
import { Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useResponsive } from "../../hooks/useResponsive";
import { Div, Span, StyleTag } from "./primitives";

/**
 * REISO STUDIO — Compact premium hero (single-viewport composition).
 * Controlled margins (no space-between): badge 24 / headline 24 / desc 24 / buttons 64 / trusted.
 * True 50%-viewport nav is handled in chrome.tsx; hero starts ~130px below viewport top.
 */

const BG_IMAGE =
  "https://cdn.prod.website-files.com/68d0f3d2428d3fc5218fed6a/68f0f443d751ece637bbc294_gb10-p-2600.jpeg";

const AVATARS = [
  "https://randomuser.me/api/portraits/men/32.jpg",
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/men/75.jpg",
];

const PARTNERS = ["NOVA", "VERTEX", "QUANTUM", "NEXORA", "LUMEN", "ORBIT"];

export function HeroSection() {
  const router = useRouter();
  const { isMobile, isTablet, width } = useResponsive();
  const [primaryHover, setPrimaryHover] = useState(false);
  const [secondaryHover, setSecondaryHover] = useState(false);
  const rootRef = useRef<any>(null);
  // Liquid-glass layer refs (direct DOM transforms — no re-renders, 60fps).
  const layerBackRef = useRef<any>(null);
  const layerMidRef = useRef<any>(null);
  const layerForeRef = useRef<any>(null);
  const lightRef = useRef<any>(null);
  const matrixRef = useRef<any>(null);
  const glowRef = useRef<any>(null);
  const cardRef = useRef<any>(null);
  const rippleRefs = useRef<any[]>([]);

  // Spring-physics liquid background (desktop web only).
  // stiffness ~55 / damping ~24 / mass 1 → inertia + smooth settle (~300-700ms).
  useEffect(() => {
    if (Platform.OS !== "web" || typeof window === "undefined") return;
    const heroEl = rootRef.current;
    if (!heroEl || typeof heroEl.addEventListener !== "function") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia?.("(pointer: coarse)").matches) return;
    if (typeof window !== "undefined" && "ontouchstart" in window && window.innerWidth < 900) return;

    const target = { x: 0, y: 0, px: 0, py: 0 };
    const pos = { x: 0, y: 0, px: 0, py: 0 };
    const vel = { x: 0, y: 0, px: 0, py: 0 };
    const glow = { x: 0, y: 0 };
    const STIFF = 45;
    const DAMP = 20;
    let raf = 0;
    let last = performance.now();
    let lastRipple = 0;
    let lastPX = 0;
    let lastPY = 0;
    let rippleIdx = 0;
    let inside = false;

    const getRect = () => {
      try {
        return heroEl.getBoundingClientRect?.() ?? null;
      } catch {
        return null;
      }
    };
    const onMove = (e: MouseEvent) => {
      const rect = getRect();
      let nx: number;
      let ny: number;
      let px: number;
      let py: number;
      if (rect && rect.width > 0) {
        px = e.clientX - rect.left;
        py = e.clientY - rect.top;
        const inHero =
          e.clientX >= rect.left - 40 &&
          e.clientX <= rect.right + 40 &&
          e.clientY >= rect.top - 80 &&
          e.clientY <= rect.bottom + 40;
        if (!inHero) {
          inside = false;
          target.x = 0;
          target.y = 0;
          return;
        }
        nx = (px / rect.width - 0.5) * 2;
        ny = (py / Math.max(1, rect.height) - 0.5) * 2;
      } else {
        nx = (e.clientX / window.innerWidth - 0.5) * 2;
        ny = (e.clientY / window.innerHeight - 0.5) * 2;
        px = e.clientX;
        py = e.clientY;
      }
      nx = Math.max(-1, Math.min(1, nx));
      ny = Math.max(-1, Math.min(1, ny));
      target.x = nx;
      target.y = ny;
      target.px = px;
      target.py = py;
      glow.x = px;
      glow.y = py;
      inside = true;
      // Ripple on movement: low threshold so slow glides ripple too.
      const now = performance.now();
      const speed = Math.hypot(px - lastPX, py - lastPY);
      lastPX = px;
      lastPY = py;
      if (speed > 10 && now - lastRipple > 250) {
        lastRipple = now;
        const el = rippleRefs.current[rippleIdx % rippleRefs.current.length];
        rippleIdx += 1;
        if (el && el.style) {
          el.style.left = `${px}px`;
          el.style.top = `${py}px`;
          try {
            el.animate(
              [
                { transform: "translate(-50%,-50%) scale(0.45)", opacity: 0.12 },
                { transform: "translate(-50%,-50%) scale(1.7)", opacity: 0 },
              ],
              { duration: 900, easing: "cubic-bezier(.22,1,.36,1)" }
            );
          } catch { /* WAAPI unavailable — skip */ }
        }
      }
    };
    const onLeave = () => {
      inside = false;
      target.x = 0;
      target.y = 0;
    };

    const step = (vx: number, tx: number, px: number, dt: number, stiff: number, damp: number) => {
      const accel = stiff * (tx - px) - damp * vx;
      return vx + accel * dt;
    };

    const tick = (now: number) => {
      const dt = Math.min(0.033, Math.max(0.001, (now - last) / 1000));
      last = now;
      // Spring-normalized cursor (-1..1) + pixel position.
      vel.x = step(vel.x, target.x, pos.x, dt, STIFF, DAMP);
      vel.y = step(vel.y, target.y, pos.y, dt, STIFF, DAMP);
      vel.px = step(vel.px, inside ? target.px : pos.px, pos.px, dt, STIFF, DAMP);
      vel.py = step(vel.py, inside ? target.py : pos.py, pos.py, dt, STIFF, DAMP);
      pos.x += vel.x * dt;
      pos.y += vel.y * dt;
      pos.px += vel.px * dt;
      pos.py += vel.py * dt;

      const sx = pos.x;
      const sy = pos.y;
      // Depth-separated parallax (layers never move together).
      if (layerBackRef.current?.style) {
        layerBackRef.current.style.transform = `translate3d(${(sx * 5).toFixed(2)}px, ${(sy * 4).toFixed(2)}px, 0)`;
      }
      if (layerMidRef.current?.style) {
        layerMidRef.current.style.transform = `translate3d(${(sx * 12).toFixed(2)}px, ${(sy * 9).toFixed(2)}px, 0) rotate(${(sx * 0.6).toFixed(3)}deg)`;
      }
      if (layerForeRef.current?.style) {
        layerForeRef.current.style.transform = `translate3d(${(sx * 18).toFixed(2)}px, ${(sy * 13).toFixed(2)}px, 0) rotate(${(sx * 1).toFixed(3)}deg)`;
      }
      // Blue light displacement (≤25px).
      if (lightRef.current?.style) {
        lightRef.current.style.transform = `translate3d(${(sx * 24).toFixed(2)}px, ${(sy * 17).toFixed(2)}px, 0)`;
      }
      // Matrix bend.
      if (matrixRef.current?.style) {
        matrixRef.current.style.transform = `translate3d(${(sx * 8).toFixed(2)}px, ${(sy * 6).toFixed(2)}px, 0)`;
      }
      // Atmospheric cursor glow (3-6% opacity, 300px blur field).
      if (glowRef.current?.style) {
        glowRef.current.style.transform = `translate3d(${pos.px.toFixed(1)}px, ${pos.py.toFixed(1)}px, 0) translate(-50%,-50%)`;
        glowRef.current.style.opacity = inside ? "1" : "0";
      }
      // Card: independent, max 4px.
      if (cardRef.current?.style) {
        cardRef.current.style.transform = `translate3d(${(sx * 4).toFixed(2)}px, ${(sy * 3).toFixed(2)}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    heroEl.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      try {
        heroEl.removeEventListener("mouseleave", onLeave);
        window.removeEventListener("mousemove", onMove);
      } catch { /* noop */ }
      cancelAnimationFrame(raf);
    };
  }, []);

  // Headline scale: 68px desktop / 62px ≤1280 / 52px tablet / 46px mobile.
  const headlineSize = isMobile ? 46 : isTablet || width < 1100 ? 52 : width < 1280 ? 62 : 68;

  // ---------- Native fallback (simple, no DOM CSS) ----------
  if (Platform.OS !== "web") {
    return (
      <View style={[n.hero, isMobile && n.heroMobile]}>
        <View style={n.badge}>
          <Text style={n.badgeText}>✦ Building Digital Futures</Text>
        </View>
        <Text style={[n.title, { fontSize: headlineSize }]}>
          Building digital{"\n"}experiences{"\n"}that move{"\n"}
          <Text style={{ color: "#21B7FF" }}>businesses forward.</Text>
        </Text>
        <Text style={n.sub}>
          We design and build high-performance software, web and mobile experiences for ambitious businesses.
        </Text>
        <View style={n.ctaRow}>
          <Pressable onPress={() => router.push("/contact")} style={n.primary}>
            <Text style={n.primaryText}>Start a Project →</Text>
          </Pressable>
          <Pressable onPress={() => router.push("/services")} style={n.secondary}>
            <Text style={n.secondaryText}>Explore Services →</Text>
          </Pressable>
        </View>
        <View style={n.card}>
          <Text style={n.cardTitle}>
            Move faster. <Text style={{ color: "#21B7FF" }}>Build smarter.</Text>
          </Text>
          <Text style={n.cardSub}>
            We combine strategy, design and engineering to create digital products built for growth.
          </Text>
          <View style={n.metricRow}>
            <View style={n.avatars}>
              {AVATARS.map((u, i) => (
                <Image key={u} source={{ uri: u }} style={[n.avatar, i === 0 && { marginLeft: 0 }]} />
              ))}
            </View>
            <View>
              <Text style={n.metricNum}>50+</Text>
              <Text style={n.metricLabel}>Projects Delivered</Text>
            </View>
          </View>
        </View>
        <Text style={n.trustLabel}>Trusted by teams building the future</Text>
        <View style={n.trustRow}>
          {PARTNERS.map((p) => (
            <Text key={p} style={n.trustLogo}>{p}</Text>
          ))}
        </View>
      </View>
    );
  }

  // ---------- Web: compact cinematic hero + liquid background ----------
  const marqueeDuration = isMobile ? "28s" : "35s";

  return (
    <Div
      ref={rootRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#02040A",
      }}
    >
      <StyleTag>{`
        @keyframes reiso-bg-scale { 0%,100% { transform: scale(1) } 50% { transform: scale(1.04) } }
        @keyframes reiso-rise { from { opacity: 0; transform: translateY(25px) } to { opacity: 1; transform: none } }
        @keyframes reiso-rise-sm { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: none } }
        @keyframes reiso-card-in { from { opacity: 0; transform: translateX(25px) } to { opacity: 1; transform: none } }
        @keyframes reiso-float { 0%,100% { margin-top: 0 } 50% { margin-top: -8px } }
        @keyframes reiso-marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .reiso-marquee-track { display: flex; width: max-content; animation: reiso-marquee ${marqueeDuration} linear infinite; }
        .reiso-marquee:hover .reiso-marquee-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .reiso-anim, .reiso-bg-scale, .reiso-float, .reiso-marquee-track { animation: none !important; opacity: 1 !important; }
        }
      `}</StyleTag>

      {/* ===== LIQUID BACKGROUND — ambient scale on outer, spring parallax on inner layers ===== */}
      <Div
        className="reiso-bg-scale"
        style={{
          position: "absolute",
          inset: "-3%",
          animation: "reiso-bg-scale 26s ease-in-out infinite",
          backgroundColor: "#02040A",
          willChange: "transform",
        }}
      >
        {/* BACK layer — photo (3-5px) */}
        <Div ref={layerBackRef} style={{ position: "absolute", inset: 0, willChange: "transform" }}>
          <Div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url("${BG_IMAGE}")`,
              backgroundPosition: "center center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              opacity: 0.9,
            }}
          />
        </Div>
        {/* MID layer — soft washes (8-12px + ≤0.5deg) */}
        <Div ref={layerMidRef} style={{ position: "absolute", inset: 0, willChange: "transform" }}>
          <Div style={{ position: "absolute", top: "-12%", left: "-8%", width: "55%", height: "55%", background: "radial-gradient(ellipse at center, rgba(22,135,255,0.35) 0%, transparent 65%)", filter: "blur(60px)", transform: "rotate(-18deg)" }} />
          <Div style={{ position: "absolute", top: "-10%", left: "30%", width: "45%", height: "45%", background: "radial-gradient(ellipse at center, rgba(33,183,255,0.28) 0%, transparent 62%)", filter: "blur(70px)" }} />
          <Div style={{ position: "absolute", bottom: "-15%", left: "20%", width: "60%", height: "50%", background: "radial-gradient(ellipse at center, rgba(7,19,45,0.9) 0%, transparent 70%)", filter: "blur(40px)" }} />
          <Div style={{ position: "absolute", top: "12%", left: "-5%", width: "70%", height: "140px", background: "linear-gradient(90deg, transparent, rgba(33,183,255,0.20), transparent)", filter: "blur(30px)", transform: "rotate(-12deg)" }} />
        </Div>
        {/* FORE layer — bright ribbons (12-18px + ≤0.8deg) */}
        <Div ref={layerForeRef} style={{ position: "absolute", inset: 0, willChange: "transform" }}>
          <Div style={{ position: "absolute", top: "25%", right: "-10%", width: "55%", height: "60%", background: "radial-gradient(ellipse at center, rgba(22,135,255,0.42) 0%, rgba(102,55,255,0.14) 45%, transparent 68%)", filter: "blur(55px)" }} />
          <Div style={{ position: "absolute", bottom: "5%", right: "8%", width: "30%", height: "30%", background: "radial-gradient(ellipse at center, rgba(215,44,255,0.10) 0%, transparent 65%)", filter: "blur(60px)" }} />
          <Div style={{ position: "absolute", top: "42%", left: "10%", width: "80%", height: "110px", background: "linear-gradient(90deg, transparent, rgba(22,135,255,0.24), rgba(102,55,255,0.10), transparent)", filter: "blur(28px)", transform: "rotate(-8deg)" }} />
        </Div>
        {/* LIGHT layer — electric-blue displacement (≤22px) */}
        <Div ref={lightRef} style={{ position: "absolute", inset: 0, willChange: "transform", pointerEvents: "none" }}>
          <Div style={{ position: "absolute", top: "20%", right: "12%", width: "34%", height: "44%", background: "radial-gradient(ellipse at center, rgba(33,183,255,0.20) 0%, transparent 65%)", filter: "blur(50px)" }} />
        </Div>
        {/* Dark navy overlay — content support, left stays dark */}
        <Div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,10,0.55) 0%, rgba(0,0,10,0.42) 40%, rgba(2,4,10,0.60) 100%)",
          }}
        />
        {/* Cursor glow — large blurred atmospheric field, NOT a spotlight */}
        <Div
          ref={glowRef}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "350px",
            height: "350px",
            marginLeft: "-175px",
            marginTop: "-175px",
            background: "radial-gradient(circle, rgba(33,183,255,0.06) 0%, rgba(33,183,255,0.03) 40%, transparent 68%)",
            filter: "blur(30px)",
            opacity: 0,
            transition: "opacity .6s ease",
            pointerEvents: "none",
            willChange: "transform",
          }}
        />
        {/* Ripple pool — subtle expanding distortion (no visible rings) */}
        {[0, 1, 2].map((i) => (
          <Div
            key={i}
            ref={(el: any) => {
              rippleRefs.current[i] = el;
            }}
            style={{
              position: "absolute",
              left: "-500px",
              top: "-500px",
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              background: "radial-gradient(circle, transparent 38%, rgba(33,183,255,0.14) 55%, transparent 70%)",
              filter: "blur(6px)",
              opacity: 0,
              pointerEvents: "none",
            }}
          />
        ))}
      </Div>

      {/* Digital matrix texture — bends with cursor (7%) */}
      <Div style={{ position: "absolute", inset: "-4%", pointerEvents: "none" }}>
        <Div
          ref={matrixRef}
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.07,
            backgroundImage: "radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            willChange: "transform",
          }}
        />
      </Div>
      {/* Left readability shade */}
      <Div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: isMobile
            ? "linear-gradient(180deg, rgba(2,4,10,0.72), rgba(2,4,10,0.55))"
            : "linear-gradient(90deg, rgba(2,4,10,0.72) 0%, rgba(2,4,10,0.35) 45%, transparent 75%)",
        }}
      />

      {/* ===== CONTENT — compact, controlled margins (no space-between) ===== */}
      <Div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "1320px",
          margin: "0 auto",
          paddingLeft: isMobile ? "24px" : "35px",
          paddingRight: isMobile ? "24px" : "35px",
          paddingTop: isMobile ? "118px" : "132px",
          paddingBottom: "30px",
        }}
      >
        <Div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 0.75fr",
            gap: isMobile ? "36px" : isTablet ? "60px" : "80px",
            alignItems: "center",
          }}
        >
          {/* LEFT — 52% / max 650px */}
          <Div style={{ width: isMobile ? "100%" : "100%", maxWidth: isMobile ? "100%" : "650px" }}>
            <Div
              className="reiso-anim"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                height: "35px",
                padding: "0 16px",
                borderRadius: "999px",
                backgroundColor: "rgba(0,0,0,0.65)",
                border: "1px solid rgba(255,255,255,0.18)",
                marginBottom: "24px",
                animation: "reiso-rise-sm .7s cubic-bezier(.22,1,.36,1) both",
              }}
            >
              <Span style={{ color: "#21B7FF", fontSize: "12px" }}>✦</Span>
              <Span style={{ color: "#DDE4F3", fontSize: "13.5px", fontWeight: 500, letterSpacing: "0.2px", fontFamily: "Inter,Manrope,system-ui,sans-serif" }}>
                Building Digital Futures
              </Span>
            </Div>

            <Div
              className="reiso-anim"
              style={{
                color: "#FFFFFF",
                fontFamily: "Inter,Manrope,Geist,sans-serif",
                fontWeight: 450,
                fontSize: `${headlineSize}px`,
                lineHeight: 1.02,
                letterSpacing: "-2px",
                maxWidth: "650px",
                marginBottom: "24px",
                animation: "reiso-rise .9s cubic-bezier(.22,1,.36,1) .1s both",
              }}
            >
              Building digital<br />
              experiences<br />
              that move<br />
              <Span style={{ color: "#21B7FF" }}>businesses forward.</Span>
            </Div>

            <Div
              className="reiso-anim"
              style={{
                maxWidth: "520px",
                color: "rgba(210,218,235,0.78)",
                fontSize: "16px",
                lineHeight: 1.55,
                fontFamily: "Inter,Manrope,system-ui,sans-serif",
                marginBottom: "24px",
                animation: "reiso-rise .9s cubic-bezier(.22,1,.36,1) .22s both",
              }}
            >
              We design and build high-performance software, web and mobile experiences for ambitious businesses.
            </Div>

            <Div
              className="reiso-anim"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "28px",
                flexWrap: "wrap",
                animation: "reiso-rise .9s cubic-bezier(.22,1,.36,1) .32s both",
              }}
            >
              <Pressable
                onPress={() => router.push("/contact")}
                accessibilityRole="button"
                accessibilityLabel="Start a Project"
                {...(Platform.OS === "web"
                  ? ({
                      onMouseEnter: () => setPrimaryHover(true),
                      onMouseLeave: () => setPrimaryHover(false),
                    } as any)
                  : {})}
                style={{
                  height: 50,
                  paddingLeft: "26px",
                  paddingRight: "26px",
                  borderRadius: "999px",
                  backgroundColor: "#5B35FF",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: 44,
                  minHeight: 44,
                  transform: primaryHover ? [{ translateY: -2 }] : undefined,
                  ...(Platform.OS === "web"
                    ? ({
                        boxShadow: primaryHover
                          ? "0 14px 36px rgba(91,53,255,0.55)"
                          : "0 8px 24px rgba(91,53,255,0.30)",
                        transition: "transform .25s ease, box-shadow .25s ease",
                        cursor: "pointer",
                      } as any)
                    : {}),
                }}
              >
                <Text style={{ color: "#fff", fontSize: 15, fontWeight: "600", fontFamily: "Inter,system-ui,sans-serif" }}>
                  Start a Project  →
                </Text>
              </Pressable>
              <Pressable
                onPress={() => router.push("/services")}
                accessibilityRole="link"
                accessibilityLabel="Explore Services"
                {...(Platform.OS === "web"
                  ? ({
                      onMouseEnter: () => setSecondaryHover(true),
                      onMouseLeave: () => setSecondaryHover(false),
                    } as any)
                  : {})}
                style={{ minWidth: 44, minHeight: 44, justifyContent: "center" }}
              >
                <Text
                  style={{
                    color: secondaryHover ? "#21B7FF" : "#FFFFFF",
                    fontSize: 15,
                    fontWeight: "500",
                    fontFamily: "Inter,system-ui,sans-serif",
                  }}
                >
                  Explore Services  →
                </Text>
              </Pressable>
            </Div>
          </Div>

          {/* RIGHT — compact card; foreground stays stable, ≤4px independent drift */}
          <Div
            className="reiso-anim reiso-float"
            style={{
              justifySelf: isMobile ? "stretch" : "end",
              width: isMobile ? "100%" : "min(420px, 100%)",
              marginTop: isMobile ? "4px" : "24px",
              animation:
                "reiso-card-in 1s cubic-bezier(.22,1,.36,1) .4s both, reiso-float 5.5s ease-in-out 1.5s infinite",
            }}
          >
            <Div
              ref={cardRef}
              style={{ willChange: "transform" }}
            >
            <Div
              style={{
                borderRadius: "17px",
                backgroundColor: "rgba(28,48,105,0.72)",
                border: "1px solid rgba(255,255,255,0.12)",
                padding: "26px 26px 24px",
                backdropFilter: "blur(22px)",
                WebkitBackdropFilter: "blur(22px)",
                boxShadow: "0 25px 80px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 0 60px rgba(22,135,255,0.12)",
              }}
            >
              <Div style={{ color: "#FFFFFF", fontSize: "27px", fontWeight: 500, lineHeight: 1.25, letterSpacing: "-0.5px", fontFamily: "Inter,Manrope,sans-serif" }}>
                Move faster.<br />
                <Span style={{ color: "#21B7FF" }}>Build smarter.</Span>
              </Div>
              <Div style={{ marginTop: "10px", color: "#D2D9E8", fontSize: "15px", lineHeight: 1.55, fontFamily: "Inter,system-ui,sans-serif" }}>
                We combine strategy, design and engineering to create digital products built for growth.
              </Div>
              <Div style={{ marginTop: "18px", display: "flex", alignItems: "center", gap: "14px" }}>
                <Div style={{ display: "flex", flexDirection: "row" }}>
                  {AVATARS.map((u, i) => (
                    <Image
                      key={u}
                      source={{ uri: u }}
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 19,
                        borderWidth: 2,
                        borderColor: "rgba(255,255,255,0.85)",
                        marginLeft: i === 0 ? 0 : -10,
                      } as any}
                      accessibilityLabel="Client"
                    />
                  ))}
                </Div>
                <Div>
                  <Div style={{ color: "#FFFFFF", fontSize: "18px", fontWeight: 700, fontFamily: "Inter,sans-serif" }}>50+</Div>
                  <Div style={{ color: "#B7C0D4", fontSize: "12.5px", fontFamily: "Inter,sans-serif" }}>Projects Delivered</Div>
                </Div>
              </Div>
            </Div>
            </Div>
          </Div>
        </Div>

        {/* TRUSTED — 64px below CTAs, seamless slow marquee with fade edges */}
        <Div
          className="reiso-anim"
          style={{
            marginTop: isMobile ? "44px" : "64px",
            animation: "reiso-rise 1s cubic-bezier(.22,1,.36,1) .55s both",
          }}
        >
          <Div style={{ color: "rgba(255,255,255,0.60)", fontSize: "14px", fontFamily: "Inter,system-ui,sans-serif", marginBottom: "18px" }}>
            Trusted by teams building the future
          </Div>
          <Div
            className="reiso-marquee"
            style={{
              overflow: "hidden",
              width: "100%",
              maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
              WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
            }}
          >
            <Div
              className="reiso-marquee-track"
              style={{ gap: isMobile ? "40px" : "65px", paddingRight: isMobile ? "40px" : "65px" }}
            >
              {[...PARTNERS, ...PARTNERS].map((p, i) => (
                <Span
                  key={`${p}-${i}`}
                  style={{
                    color: "rgba(255,255,255,0.65)",
                    fontSize: "15px",
                    fontWeight: 600,
                    letterSpacing: "1.5px",
                    fontFamily: "Inter,system-ui,sans-serif",
                    whiteSpace: "nowrap",
                    lineHeight: "24px",
                  }}
                >
                  {p}
                </Span>
              ))}
            </Div>
          </Div>
        </Div>
      </Div>
    </Div>
  );
}

const n = StyleSheet.create({
  hero: { backgroundColor: "#02040A", paddingHorizontal: 24, paddingTop: 130, paddingBottom: 40, gap: 14 },
  heroMobile: { paddingTop: 120 },
  badge: {
    alignSelf: "flex-start", backgroundColor: "rgba(0,0,0,0.65)",
    borderWidth: 1, borderColor: "rgba(255,255,255,0.18)", borderRadius: 999,
    paddingHorizontal: 16, height: 34, justifyContent: "center",
  },
  badgeText: { color: "#DDE4F3", fontSize: 13 },
  title: { color: "#fff", fontWeight: "500", letterSpacing: -2, lineHeight: 52, marginTop: 12, fontFamily: "'Inter',system-ui,sans-serif" },
  sub: { color: "rgba(210,218,235,0.78)", fontSize: 16, lineHeight: 25, marginTop: 8, maxWidth: 520 },
  ctaRow: { flexDirection: "row", flexWrap: "wrap", gap: 16, alignItems: "center", marginTop: 14 },
  primary: { backgroundColor: "#5B35FF", height: 50, paddingHorizontal: 26, borderRadius: 999, alignItems: "center", justifyContent: "center" },
  primaryText: { color: "#fff", fontSize: 15, fontWeight: "600" },
  secondary: { minHeight: 44, justifyContent: "center" },
  secondaryText: { color: "#fff", fontSize: 15 },
  card: {
    backgroundColor: "rgba(28,48,105,0.72)", borderWidth: 1, borderColor: "rgba(255,255,255,0.12)",
    borderRadius: 17, padding: 24, marginTop: 14,
  },
  cardTitle: { color: "#fff", fontSize: 26, fontWeight: "500", lineHeight: 32 },
  cardSub: { color: "#D2D9E8", fontSize: 15, lineHeight: 23, marginTop: 8 },
  metricRow: { flexDirection: "row", alignItems: "center", gap: 14, marginTop: 16 },
  avatars: { flexDirection: "row" },
  avatar: { width: 38, height: 38, borderRadius: 19, borderWidth: 2, borderColor: "rgba(255,255,255,0.85)", marginLeft: -10 },
  metricNum: { color: "#fff", fontSize: 18, fontWeight: "700" },
  metricLabel: { color: "#B7C0D4", fontSize: 12 },
  trustLabel: { color: "rgba(255,255,255,0.60)", fontSize: 14, marginTop: 26 },
  trustRow: { flexDirection: "row", flexWrap: "wrap", gap: 22, marginTop: 12 },
  trustLogo: { color: "rgba(255,255,255,0.65)", fontSize: 14, fontWeight: "600", letterSpacing: 1.5 },
});
