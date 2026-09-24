import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Link } from "expo-router";
import { colors } from "../constants/colors";
import { useResponsive } from "../hooks/useResponsive";
import { SectionGrid } from "./SectionGrid";
import { StrategyImage } from "./StrategyImage";
import { StrategyMetric } from "./StrategyMetric";

const SECTION_BG = "#07070A";

function useReducedMotion(): boolean {
  if (Platform.OS !== "web" || typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

const animIn = (
  v: Animated.Value,
  delay: number,
  duration: number,
  reduce: boolean
) =>
  Animated.timing(v, {
    toValue: 1,
    delay,
    duration: reduce ? 0 : duration,
    easing: Easing.out(Easing.cubic),
    useNativeDriver: true,
  });

/** Strategy / About-intro editorial section — continuation of the hero. */
export function StrategySection() {
  const { isMobile, isTablet, width } = useResponsive();
  const reduce = useReducedMotion();
  const [entered, setEntered] = useState(false);
  const [statEntered, setStatEntered] = useState(false);
  const [aboutHover, setAboutHover] = useState(false);

  const rootRef = useRef<View>(null);
  const statRef = useRef<View>(null);
  const imgWrapRef = useRef<View>(null);
  const imgDomRef = useRef<any>(null);

  // entrance values
  const top = useRef(new Animated.Value(0)).current;
  const l1 = useRef(new Animated.Value(0)).current;
  const l2 = useRef(new Animated.Value(0)).current;
  const l3 = useRef(new Animated.Value(0)).current;
  const para = useRef(new Animated.Value(0)).current;
  const imgO = useRef(new Animated.Value(0)).current;
  const imgS = useRef(new Animated.Value(0)).current;
  const stat = useRef(new Animated.Value(0)).current;
  const link = useRef(new Animated.Value(0)).current;

  // reveal on scroll (web) / on mount (native)
  useEffect(() => {
    if (Platform.OS !== "web") {
      setEntered(true);
      const t = setTimeout(() => setStatEntered(true), 1200);
      return () => clearTimeout(t);
    }
    const rootEl = rootRef.current as unknown as HTMLElement | null;
    const statEl = statRef.current as unknown as HTMLElement | null;
    if (!rootEl) {
      setEntered(true);
      setStatEntered(true);
      return;
    }
    if (reduce) {
      setEntered(true);
      setStatEntered(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setEntered(true);
            io.disconnect();
          }
        }),
      { threshold: 0.12 }
    );
    io.observe(rootEl);
    let statIo: IntersectionObserver | null = null;
    if (statEl) {
      statIo = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              setStatEntered(true);
              statIo?.disconnect();
            }
          }),
        { threshold: 0.3 }
      );
      statIo.observe(statEl);
    } else {
      setStatEntered(true);
    }
    return () => {
      io.disconnect();
      statIo?.disconnect();
    };
  }, [reduce]);

  useEffect(() => {
    if (!entered) return;
    const seq = Animated.parallel([
      animIn(top, 0, 600, reduce),
      animIn(l1, 80, 700, reduce),
      animIn(l2, 210, 700, reduce),
      animIn(l3, 340, 700, reduce),
      animIn(para, 450, 650, reduce),
      animIn(imgO, 550, 900, reduce),
      animIn(imgS, 550, 1200, reduce),
    ]);
    seq.start();
    return () => seq.stop();
  }, [entered, reduce, top, l1, l2, l3, para, imgO, imgS]);

  useEffect(() => {
    if (!statEntered) return;
    const seq = Animated.parallel([
      animIn(stat, 0, 700, reduce),
      animIn(link, 150, 600, reduce),
    ]);
    seq.start();
    return () => seq.stop();
  }, [statEntered, reduce, stat, link]);

  // subtle image parallax (web only, direct DOM — no re-renders)
  useEffect(() => {
    if (Platform.OS !== "web" || reduce) return;
    const wrapEl = imgWrapRef.current as unknown as HTMLElement | null;
    const imgEl = imgDomRef.current as unknown as HTMLElement | null;
    if (!wrapEl || !imgEl) return;
    let scroller: HTMLElement | null = wrapEl.parentElement;
    while (scroller) {
      const oy = window.getComputedStyle(scroller).overflowY;
      if (
        (oy === "auto" || oy === "scroll") &&
        scroller.scrollHeight > scroller.clientHeight + 8
      )
        break;
      scroller = scroller.parentElement;
    }
    const target: HTMLElement | Window = scroller ?? window;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = wrapEl.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const p = Math.min(
        1,
        Math.max(0, (vh * 0.85 - r.top) / (vh * 0.85 + r.height * 0.5))
      );
      const y = (0.5 - p) * 52;
      (imgEl as HTMLElement).style.transform = `translateY(${y.toFixed(1)}px)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    target.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      target.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduce, isMobile, isTablet, width]);

  // responsive type + image geometry
  const hSize = isMobile
    ? 62
    : isTablet
      ? 80
      : Math.min(150, Math.max(88, Math.round(width * 0.098)));
  const lineH = Math.round(hSize * 0.84);
  const imgW = isMobile
    ? ("100%" as const)
    : isTablet
      ? Math.round(width * 0.44)
      : Math.min(450, Math.round(width * 0.31));
  const imgH = isMobile ? 520 : isTablet ? 600 : 710;

  const topShift = top.interpolate({ inputRange: [0, 1], outputRange: [10, 0] });
  const paraShift = para.interpolate({ inputRange: [0, 1], outputRange: [20, 0] });
  const statShift = stat.interpolate({ inputRange: [0, 1], outputRange: [24, 0] });
  const linkShift = link.interpolate({ inputRange: [0, 1], outputRange: [12, 0] });
  const lineShift = (v: Animated.Value) =>
    v.interpolate({ inputRange: [0, 1], outputRange: [lineH + 12, 0] });
  const imgScale = imgS.interpolate({ inputRange: [0, 1], outputRange: [1.04, 1] });

  const headline = (
    <View style={isMobile ? styles.headMobile : styles.headRight}>
      {[
        { v: l1, text: "STRATEGY" },
        { v: l2, text: "BEFORE" },
        { v: l3, text: "PIXELS" },
      ].map((ln) => (
        <View key={ln.text} style={[styles.mask, { height: lineH + 10 }]}>
          <Animated.Text
            style={[
              styles.headline,
              {
                fontSize: hSize,
                lineHeight: lineH,
                letterSpacing: isMobile ? -3 : -5,
                opacity: ln.v,
                transform: [{ translateY: lineShift(ln.v) }],
                textAlign: isMobile ? "left" : "right",
              },
            ]}
          >
            {ln.text}
          </Animated.Text>
        </View>
      ))}
    </View>
  );

  const description = (
    <Animated.View style={{ opacity: para, transform: [{ translateY: paraShift }] }}>
      <Text style={[styles.desc, isMobile && styles.descMobile]}>
        <Text style={styles.descBase}>
          PEOPLE DECIDE IF THEY TRUST YOUR DIGITAL PRODUCT BEFORE THEY READ A WORD
          ABOUT IT.{" "}
        </Text>
        <Text style={styles.descStrong}>VISUAL CREDIBILITY</Text>
        <Text style={styles.descBase}>
          {" "}COMES ALMOST INSTANTLY — AND IT'S SHAPED BY{" "}
        </Text>
        <Text style={styles.descStrong}>SPACING</Text>
        <Text style={styles.descBase}>, </Text>
        <Text style={styles.descStrong}>TYPOGRAPHY</Text>
        <Text style={styles.descBase}>, </Text>
        <Text style={styles.descStrong}>INTERACTION</Text>
        <Text style={styles.descBase}>, SPEED, </Text>
        <Text style={styles.descStrong}>STRUCTURE</Text>
        <Text style={styles.descBase}> AND DETAIL.</Text>
      </Text>
    </Animated.View>
  );

  const aboutLink = (
    <Animated.View style={{ opacity: link, transform: [{ translateY: linkShift }] }}>
      <Link href="/about" asChild>
        <Pressable
          accessibilityRole="link"
          accessibilityLabel="About us"
          style={styles.aboutHit}
          {...(Platform.OS === "web"
            ? ({
                onMouseEnter: () => setAboutHover(true),
                onMouseLeave: () => setAboutHover(false),
              } as any)
            : {})}
        >
          <View style={styles.aboutRow}>
            <Text style={[styles.aboutText, aboutHover && styles.aboutTextHover]}>
              About us
            </Text>
            <Text
              style={[
                styles.aboutArrow,
                aboutHover && styles.aboutArrowHover,
              ]}
            >
              ↗
            </Text>
          </View>
          {aboutHover && Platform.OS === "web" && (
            // @ts-ignore web-only gradient underline
            <div
              style={{
                height: 1.5,
                marginTop: 4,
                width: 108,
                backgroundImage: colors.gradient,
                borderRadius: 2,
              }}
            />
          )}
        </Pressable>
      </Link>
    </Animated.View>
  );

  return (
    <View
      ref={rootRef}
      style={[styles.section, (isMobile || isTablet) && styles.sectionStacked]}
    >
      {/* subtle Reiso wash (web only) */}
      {Platform.OS === "web" && (
        <>
          {/* @ts-ignore web-only ambient light */}
          <div
            style={{
              position: "absolute",
              top: "-10%",
              right: "-12%",
              width: "60%",
              height: "55%",
              background:
                "radial-gradient(closest-side, rgba(113,30,255,0.14), rgba(240,28,255,0.07), transparent)",
              filter: "blur(60px)",
              pointerEvents: "none",
            }}
          />
          {/* @ts-ignore web-only ambient light */}
          <div
            style={{
              position: "absolute",
              bottom: "-12%",
              left: "-10%",
              width: "55%",
              height: "45%",
              background:
                "radial-gradient(closest-side, rgba(8,120,255,0.10), transparent)",
              filter: "blur(60px)",
              pointerEvents: "none",
            }}
          />
        </>
      )}

      <SectionGrid
        columns={isMobile ? [50] : [25, 50, 75]}
        dividerTop={isMobile || isTablet ? undefined : 640}
      />

      <View style={[styles.inner, isMobile && styles.innerMobile]}>
        {/* top metadata */}
        <Animated.View
          style={{ opacity: top, transform: [{ translateY: topShift }] }}
        >
          <View style={styles.topRow}>
            <Text style={styles.topLabel}>LAUNCHED</Text>
            <Text style={styles.topLabel}>24+ PROJECTS</Text>
            <Text style={styles.topLabel}>2026 ©</Text>
            <View style={styles.topSpacer} />
          </View>
        </Animated.View>

        {isMobile || isTablet ? (
          <View style={styles.stack}>
            <View style={styles.stackHead}>{headline}</View>
            <View style={styles.stackDesc}>{description}</View>
            <View
              ref={imgWrapRef}
              style={[
                styles.stackImg,
                isTablet && styles.stackImgTablet,
              ]}
            >
              <StrategyImage
                width={imgW}
                height={imgH}
                imgDomRef={imgDomRef}
                animatedStyle={{ opacity: imgO, transform: [{ scale: imgScale }] }}
              />
            </View>
            <View ref={statRef} style={styles.stackStat}>
              <Animated.View
                style={{ opacity: stat, transform: [{ translateY: statShift }] }}
              >
                <StrategyMetric
                  valueSize={isMobile ? 86 : 92}
                  copySize={17}
                  align="right"
                />
              </Animated.View>
            </View>
            <View style={styles.stackLink}>{aboutLink}</View>
          </View>
        ) : (
          <View style={styles.desktopBody}>
            <View style={styles.desktopRow}>
              <View style={styles.desktopLeft}>{description}</View>
              <View style={styles.desktopRight}>{headline}</View>
            </View>
            {/* continuous tall image crossing into the lower half */}
            <View ref={imgWrapRef} style={styles.desktopImg}>
              <StrategyImage
                width={imgW}
                height={imgH}
                imgDomRef={imgDomRef}
                animatedStyle={{ opacity: imgO, transform: [{ scale: imgScale }] }}
              />
            </View>
            <View ref={statRef} style={styles.desktopStat}>
              <Animated.View
                style={{ opacity: stat, transform: [{ translateY: statShift }] }}
              >
                <StrategyMetric valueSize={120} copySize={19} align="right" />
              </Animated.View>
            </View>
            <View style={styles.desktopLink}>{aboutLink}</View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    position: "relative",
    width: "100%",
    minHeight: 1250,
    backgroundColor: SECTION_BG,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.08)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
  },
  sectionStacked: {
    minHeight: 0,
  },
  inner: {
    paddingHorizontal: 36,
    paddingTop: 36,
    paddingBottom: 40,
  },
  innerMobile: {
    paddingHorizontal: 24,
    paddingTop: 28,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  topLabel: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "500",
    letterSpacing: 0.8,
    fontFamily: "'Inter',system-ui,sans-serif",
  },
  topSpacer: {
    flex: 1,
  },
  // desktop composition
  desktopBody: {
    position: "relative",
    minHeight: 1130,
  },
  desktopRow: {
    flexDirection: "row",
    marginTop: 8,
  },
  desktopLeft: {
    flex: 1,
    paddingTop: 330,
    paddingRight: 24,
  },
  desktopRight: {
    flex: 1,
    zIndex: 2,
  },
  desktopImg: {
    position: "absolute",
    top: 400,
    left: "52%",
    zIndex: 1,
  },
  desktopStat: {
    position: "absolute",
    right: 0,
    bottom: 60,
    zIndex: 2,
  },
  desktopLink: {
    position: "absolute",
    left: 0,
    bottom: 0,
    zIndex: 2,
  },
  // stacked (tablet + mobile)
  stack: {
    marginTop: 24,
    paddingBottom: 52,
  },
  stackHead: {
    alignItems: "flex-end",
  },
  stackDesc: {
    marginTop: 28,
    maxWidth: 480,
  },
  stackImg: {
    marginTop: 36,
    alignSelf: "stretch",
  },
  stackImgTablet: {
    alignSelf: "flex-end",
  },
  stackStat: {
    marginTop: 40,
    alignItems: "flex-end",
  },
  stackLink: {
    marginTop: 32,
    alignItems: "flex-start",
  },
  // type
  headRight: {
    alignItems: "flex-end",
  },
  headMobile: {
    alignItems: "flex-start",
    width: "100%",
  },
  mask: {
    overflow: "hidden",
  },
  headline: {
    color: colors.textPrimary,
    fontWeight: "800",
    fontFamily: "'Space Grotesk','Inter',system-ui,sans-serif",
  },
  desc: {
    maxWidth: 430,
    fontSize: 15,
    lineHeight: 17,
    fontFamily: "'Inter',system-ui,sans-serif",
  },
  descMobile: {
    maxWidth: "100%",
    fontSize: 14,
    lineHeight: 16,
  },
  descBase: {
    color: "rgba(255,255,255,0.92)",
    fontWeight: "400",
  },
  descStrong: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  aboutHit: {
    minHeight: 44,
    minWidth: 44,
    justifyContent: "center",
  },
  aboutRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
  },
  aboutText: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "'Inter',system-ui,sans-serif",
  },
  aboutTextHover: {
    color: "#FFFFFF",
  },
  aboutArrow: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "500",
  },
  aboutArrowHover: {
    transform: [{ translateX: 4 }, { translateY: -4 }],
  },
});
