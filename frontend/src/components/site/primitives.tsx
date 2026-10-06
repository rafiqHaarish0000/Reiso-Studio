import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../constants/colors";
import { COMPANY } from "../../data/site";
import { useResponsive } from "../../hooks/useResponsive";

/* Web-only DOM tags (Expo Metro has no CSS loader; styles stay inline). */
// @ts-ignore web-only
export const Div: any = "div";
// @ts-ignore web-only
export const Span: any = "span";
// @ts-ignore web-only
export const StyleTag: any = "style";
// @ts-ignore web-only
export const IFrame: any = "iframe";

const LOGO = require("../../assets/images/reiso-logo.png");

export function Logo({ width = 128, height = 36 }: { width?: number; height?: number }) {
  return (
    <Image
      source={LOGO}
      style={{ width, height }}
      resizeMode="contain"
      accessibilityLabel={`${COMPANY.name} logo`}
    />
  );
}

/* Scroll-triggered reveal — IntersectionObserver on web, mount animation on native. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  style?: any;
}) {
  if (Platform.OS !== "web") {
    return <NativeReveal delay={delay} y={y} style={style}>{children}</NativeReveal>;
  }
  return <WebReveal delay={delay} y={y} style={style}>{children}</WebReveal>;
}

function NativeReveal({ children, delay, y, style }: { children: React.ReactNode; delay: number; y: number; style?: any }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const trans = useRef(new Animated.Value(y)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 700, delay, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(trans, { toValue: 0, duration: 700, delay, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start();
  }, [opacity, trans, delay]);
  return <Animated.View style={[{ opacity, transform: [{ translateY: trans }] }, style]}>{children}</Animated.View>;
}

function WebReveal({ children, delay, y, style }: { children: React.ReactNode; delay: number; y: number; style?: any }) {
  const [vis, setVis] = useState(false);
  const ref = useRef<any>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { setVis(true); return; }
    const io = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) { setVis(true); io.disconnect(); } },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  // NB: never spread a possibly-array style into an object (creates {0,1..} keys
  // and crashes RN Web style handling) — flatten first.
  const extra = (StyleSheet.flatten(style) ?? {}) as any;
  return (
    <Div
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : `translateY(${y}px)`,
        transition: `opacity .8s ease ${delay}ms, transform .8s cubic-bezier(.22,1,.36,1) ${delay}ms`,
        willChange: "opacity, transform",
        ...extra,
      }}
    >
      {children}
    </Div>
  );
}

/* Animated counter. */
export function CountUp({ value, suffix = "", style }: { value: number; suffix?: string; style?: any }) {
  const [n, setN] = useState(0);
  const ref = useRef<any>(null);
  useEffect(() => {
    let raf = 0;
    const run = () => {
      const t0 = Date.now();
      const tick = () => {
        const p = Math.min(1, (Date.now() - t0) / 1400);
        setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    if (Platform.OS === "web" && typeof IntersectionObserver !== "undefined") {
      const el = ref.current;
      if (!el) { run(); return; }
      const io = new IntersectionObserver(
        (es) => { if (es[0].isIntersecting) { run(); io.disconnect(); } },
        { threshold: 0.4 }
      );
      io.observe(el);
      return () => { io.disconnect(); cancelAnimationFrame(raf); };
    }
    run();
    return () => cancelAnimationFrame(raf);
  }, [value]);
  if (Platform.OS === "web") {
    return <Div ref={ref} style={style}>{`${n}${suffix}`}</Div>;
  }
  return <View ref={ref} style={style}><Text style={primStyles.countText}>{`${n}${suffix}`}</Text></View>;
}

/* Infinite logo marquee — CSS animation on web, auto-scrolling loop on native. */
export function Marquee({ children }: { children: React.ReactNode }) {
  if (Platform.OS === "web") {
    return (
      <Div style={{ overflow: "hidden", width: "100%" }}>
        <StyleTag>{`@keyframes reiso-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}.reiso-marquee-track{display:flex;width:max-content;animation:reiso-marquee 28s linear infinite;}`}</StyleTag>
        <Div className="reiso-marquee-track">{children}{children}</Div>
      </Div>
    );
  }
  return <NativeMarquee>{children}</NativeMarquee>;
}

function NativeMarquee({ children }: { children: React.ReactNode }) {
  const x = useRef(new Animated.Value(0)).current;
  const [w, setW] = useState(1);
  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(x, { toValue: 1, duration: 16000, easing: Easing.linear, useNativeDriver: true })
    );
    loop.start();
    return () => loop.stop();
  }, [x]);
  return (
    <View style={{ overflow: "hidden" }} onLayout={(e) => setW(e.nativeEvent.layout.width)}>
      <Animated.View
        style={{ flexDirection: "row", width: w * 2, transform: [{ translateX: x.interpolate({ inputRange: [0, 1], outputRange: [0, -w] }) }] }}
      >
        <View style={{ flexDirection: "row", width: w }}>{children}</View>
        <View style={{ flexDirection: "row", width: w }}>{children}</View>
      </Animated.View>
    </View>
  );
}

/* Floating wrapper — gentle levitation loop. */
export function Float({ children, amplitude = 10, duration = 3200, delay = 0, style }: { children: React.ReactNode; amplitude?: number; duration?: number; delay?: number; style?: any }) {
  const y = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const seq = Animated.loop(
      Animated.sequence([
        Animated.timing(y, { toValue: -amplitude, duration, delay, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(y, { toValue: amplitude * 0.6, duration, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    );
    seq.start();
    return () => seq.stop();
  }, [y, amplitude, duration, delay]);
  return <Animated.View style={[{ transform: [{ translateY: y }] }, style]}>{children}</Animated.View>;
}

/* Eyebrow + title + sub section header. */
export function SectionHead({ eyebrow, title, sub, align = "center" }: { eyebrow: string; title: React.ReactNode; sub?: string; align?: "center" | "left" }) {
  const { isMobile } = useResponsive();
  return (
    <Reveal>
      <View style={[primStyles.head, align === "left" && { alignItems: "flex-start" }]}>
        <View style={primStyles.pill}>
          <Text style={primStyles.pillText}>{eyebrow}</Text>
        </View>
        <Text style={[primStyles.title, isMobile && primStyles.titleMobile, align === "left" && { textAlign: "left" }]}>{title}</Text>
        {sub ? <Text style={[primStyles.sub, isMobile && primStyles.subMobile, align === "left" && { textAlign: "left", marginHorizontal: 0 }]}>{sub}</Text> : null}
      </View>
    </Reveal>
  );
}

export function GradientText({ children, style }: { children: React.ReactNode; style?: any }) {
  // True gradient-clipped text needs DOM; on native we fall back to cyan pop.
  if (Platform.OS === "web") {
    const extra = (StyleSheet.flatten(style) ?? {}) as any;
    return (
      <Span
        style={{
          backgroundImage: colors.gradient,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          ...extra,
        }}
      >
        {children}
      </Span>
    );
  }
  return <Text style={[{ color: colors.cyan }, style]}>{children}</Text>;
}

type BtnProps = {
  children: React.ReactNode;
  onPress?: () => void;
  href?: string;
  variant?: "gradient" | "ghost";
};

export function CTAButton({ children, onPress, href, variant = "gradient" }: BtnProps) {
  const go = () => {
    if (onPress) return onPress();
    if (href) Linking.openURL(href).catch(() => {});
  };
  return (
    <Pressable
      onPress={go}
      accessibilityRole="button"
      style={({ hovered, pressed }: any) => [
        primStyles.btn,
        variant === "ghost" && primStyles.btnGhost,
        (hovered || pressed) && primStyles.btnHover,
      ]}
    >
      {variant === "gradient" ? (
        <LinearGradient
          colors={["#1EA7FF", "#5B35FF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={primStyles.btnInner}
        >
          <Text style={primStyles.btnText}>{children}</Text>
        </LinearGradient>
      ) : (
        <View style={primStyles.btnInnerGhost}>
          <Text style={primStyles.btnText}>{children}</Text>
        </View>
      )}
    </Pressable>
  );
}

const primStyles = StyleSheet.create({
  countText: {
    color: colors.textPrimary,
    fontSize: 44,
    fontWeight: "700",
    fontFamily: "'Space Grotesk','Inter',sans-serif",
  },
  head: { alignItems: "center", marginBottom: 36, paddingHorizontal: 20 },
  pill: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "rgba(255,255,255,0.04)",
    marginBottom: 16,
  },
  pillText: {
    color: colors.cyan,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 40,
    fontWeight: "700",
    letterSpacing: -1,
    textAlign: "center",
    fontFamily: "'Space Grotesk','Inter',sans-serif",
    lineHeight: 46,
  },
  titleMobile: { fontSize: 29, lineHeight: 35, letterSpacing: -0.5 },
  sub: {
    color: colors.textSecondary,
    fontSize: 16,
    marginTop: 12,
    textAlign: "center",
    maxWidth: 640,
    lineHeight: 24,
  },
  subMobile: { fontSize: 14.5, lineHeight: 22 },
  btn: { borderRadius: 14, minHeight: 52, minWidth: 180, transform: [{ scale: 1 }] as any },
  btnHover: { transform: [{ scale: 1.04 }] as any, opacity: 0.95 },
  btnGhost: {},
  btnInner: { borderRadius: 14, paddingHorizontal: 28, paddingVertical: 15, alignItems: "center", justifyContent: "center" },
  btnInnerGhost: {
    borderRadius: 14,
    paddingHorizontal: 28,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  btnText: { color: "#fff", fontWeight: "700", fontSize: 14, letterSpacing: 0.8 },
});
