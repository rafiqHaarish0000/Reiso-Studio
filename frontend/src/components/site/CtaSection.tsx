import React, { useRef } from "react";
import { useRouter } from "expo-router";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useResponsive } from "../../hooks/useResponsive";
import { Rise, useCanvas2D } from "./fx";
import { Div } from "./primitives";

/**
 * CtaSection — deep-navy glowing panel: animated curved-light canvas,
 * centered heading, service pills, subline, violet CTA button.
 */

const PILLS = ["Web Development", "Smart Integration", "Workflow Automation", "AI Development"];

function CtaBackdrop() {
  const ref = useRef<any>(null);
  useCanvas2D(ref, (ctx, w, h, t) => {
    // Deep navy base glow.
    const base = ctx.createRadialGradient(w / 2, h * 1.1, 0, w / 2, h * 1.1, Math.max(w, h));
    base.addColorStop(0, "rgba(22,90,200,0.28)");
    base.addColorStop(0.5, "rgba(20,40,110,0.12)");
    base.addColorStop(1, "rgba(2,4,12,0)");
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, w, h);
    // Slow curved light rings rising from the bottom edge.
    for (let k = 0; k < 3; k++) {
      const r = Math.max(w, h) * (0.42 + k * 0.2);
      const breathe = 1 + 0.02 * Math.sin(t * 0.3 + k * 1.4);
      ctx.save();
      ctx.translate(w / 2, h * 1.15);
      ctx.rotate(0.06 * Math.sin(t * 0.22 + k));
      const g = ctx.createLinearGradient(-r, 0, r, 0);
      g.addColorStop(0, "rgba(30,167,255,0)");
      g.addColorStop(0.5, `rgba(80,180,255,${(0.4 - k * 0.1).toFixed(3)})`);
      g.addColorStop(1, "rgba(113,61,255,0)");
      ctx.strokeStyle = g;
      ctx.lineWidth = 1.5 + (2 - k) * 0.8;
      ctx.beginPath();
      ctx.arc(0, 0, r * breathe, Math.PI * 1.15, Math.PI * 1.85);
      ctx.stroke();
      ctx.restore();
    }
    // Violet kiss, lower right.
    const v = ctx.createRadialGradient(w * 0.85, h * 1.05, 0, w * 0.85, h * 1.05, w * 0.35);
    v.addColorStop(0, "rgba(113,61,255,0.16)");
    v.addColorStop(1, "rgba(113,61,255,0)");
    ctx.fillStyle = v;
    ctx.fillRect(0, 0, w, h);
  });
  if (Platform.OS !== "web") return null;
  return (
    <Div style={{ position: "absolute", inset: 0 }}>
      <canvas ref={ref} style={{ width: "100%", height: "100%", display: "block" }} aria-hidden />
    </Div>
  );
}

export function CtaSection() {
  const { isMobile } = useResponsive();
  const router = useRouter();
  const glowRef = useRef<any>(null);
  const cardRef = useRef<any>(null);
  const [hover, setHover] = React.useState(false);

  const onMouse = (e: any) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card?.getBoundingClientRect || !glow?.style) return;
    const r = card.getBoundingClientRect();
    glow.style.transform = `translate3d(${(e.clientX - r.left).toFixed(1)}px, ${(e.clientY - r.top).toFixed(1)}px, 0) translate(-50%,-50%)`;
    glow.style.opacity = "1";
  };

  return (
    <View style={[s.section, isMobile && s.sectionMobile]}>
      <Rise y={44} duration={1100}>
        <View
          ref={cardRef as any}
          style={s.card}
          {...(Platform.OS === "web" ? ({ onMouseMove: onMouse } as any) : {})}
        >
          {Platform.OS === "web" ? (
            <>
              <CtaBackdrop />
              <Div
                ref={glowRef}
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: 420,
                  height: 420,
                  marginLeft: -210,
                  marginTop: -210,
                  background:
                    "radial-gradient(circle, rgba(30,167,255,0.12) 0%, transparent 65%)",
                  opacity: 0,
                  transition: "opacity .5s ease",
                  pointerEvents: "none",
                }}
              />
              <Div
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: 0.5,
                  backgroundImage: "radial-gradient(rgba(255,255,255,0.35) 1px, transparent 1px)",
                  backgroundSize: "26px 26px",
                  pointerEvents: "none",
                  maskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
                  WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
                }}
              />
            </>
          ) : null}
          <Text style={[s.title, isMobile && s.titleMobile]}>
            Transform your business with{"\n"}cutting-edge solutions
          </Text>
          <View style={s.pills}>
            {PILLS.map((p) => (
              <View key={p} style={s.pill}>
                <Text style={s.pillText}>{p}</Text>
              </View>
            ))}
          </View>
          <Text style={s.sub}>Book a call today and start automating</Text>
          <Pressable
            onPress={() => router.push("/contact")}
            accessibilityRole="button"
            accessibilityLabel="Book a free call"
            style={[s.btn, hover && s.btnHover]}
            {...(Platform.OS === "web"
              ? ({ onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false) } as any)
              : {})}
          >
            <Text style={s.btnText}>Book a free call</Text>
          </Pressable>
        </View>
      </Rise>
    </View>
  );
}

const s = StyleSheet.create({
  section: { backgroundColor: "#000000", paddingVertical: 140, paddingHorizontal: 32 },
  sectionMobile: { paddingVertical: 90, paddingHorizontal: 20 },
  card: {
    position: "relative",
    overflow: "hidden",
    maxWidth: 1100,
    width: "100%",
    alignSelf: "center",
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    backgroundColor: "#040816",
    alignItems: "center",
    paddingVertical: 90,
    paddingHorizontal: 32,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 46,
    fontWeight: "300",
    textAlign: "center",
    lineHeight: 54,
    letterSpacing: -1,
    fontFamily: "'Inter','Geist',system-ui,sans-serif",
    maxWidth: 720,
  },
  titleMobile: { fontSize: 32, lineHeight: 39 },
  pills: { flexDirection: "row", flexWrap: "wrap", gap: 12, justifyContent: "center", marginTop: 34 },
  pill: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.22)",
    borderRadius: 999,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  pillText: { color: "#D5DBE5", fontSize: 13, fontWeight: "500", letterSpacing: 0.3 },
  sub: { color: "#A8B0C0", fontSize: 16, marginTop: 26, textAlign: "center" },
  btn: {
    marginTop: 32,
    backgroundColor: "#5B35FF",
    borderRadius: 999,
    paddingHorizontal: 44,
    paddingVertical: 18,
    minHeight: 58,
    alignItems: "center",
    justifyContent: "center",
  },
  btnHover: { transform: [{ scale: 1.04 }] as any, opacity: 0.95 },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
