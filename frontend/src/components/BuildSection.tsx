import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { colors } from "../constants/colors";
import { useResponsive } from "../hooks/useResponsive";
import { EditorialGrid } from "./EditorialGrid";
import { BuildHeadline } from "./BuildHeadline";
import { ShowreelButton } from "./ShowreelButton";

const PHOTO_URL =
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1000&q=80";

function useReducedMotion(): boolean {
  if (Platform.OS !== "web" || typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

const animIn = (v: Animated.Value, delay: number, duration: number, reduce: boolean) =>
  Animated.timing(v, {
    toValue: 1,
    delay,
    duration: reduce ? 0 : duration,
    easing: Easing.out(Easing.cubic),
    useNativeDriver: true,
  });

/** Capabilities / Website-development intro — light editorial poster section. */
export function BuildSection() {
  const { isMobile, isTablet, width } = useResponsive();
  const router = useRouter();
  const reduce = useReducedMotion();
  const [entered, setEntered] = useState(false);
  const [bottomEntered, setBottomEntered] = useState(false);
  const [seeHover, setSeeHover] = useState(false);
  const [imgHover, setImgHover] = useState(false);
  const [indexHover, setIndexHover] = useState(false);

  const rootRef = useRef<View>(null);
  const bottomRef = useRef<View>(null);
  const imgDomRef = useRef<any>(null);

  const h1 = useRef(new Animated.Value(0)).current;
  const h2 = useRef(new Animated.Value(0)).current;
  const h3 = useRef(new Animated.Value(0)).current;
  const h4 = useRef(new Animated.Value(0)).current;
  const copy = useRef(new Animated.Value(0)).current;
  const imgO = useRef(new Animated.Value(0)).current;
  const imgS = useRef(new Animated.Value(0)).current;
  const bottom = useRef(new Animated.Value(0)).current;
  const hoverV = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (Platform.OS !== "web") {
      setEntered(true);
      const t = setTimeout(() => setBottomEntered(true), 900);
      return () => clearTimeout(t);
    }
    const rootEl = rootRef.current as unknown as HTMLElement | null;
    const bottomEl = bottomRef.current as unknown as HTMLElement | null;
    if (!rootEl) {
      setEntered(true);
      setBottomEntered(true);
      return;
    }
    if (reduce) {
      setEntered(true);
      setBottomEntered(true);
      return;
    }
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (setEntered(true), io.disconnect())),
      { threshold: 0.15 }
    );
    io.observe(rootEl);
    let bio: IntersectionObserver | null = null;
    if (bottomEl) {
      bio = new IntersectionObserver(
        (es) => es.forEach((e) => e.isIntersecting && (setBottomEntered(true), bio?.disconnect())),
        { threshold: 0.3 }
      );
      bio.observe(bottomEl);
    } else setBottomEntered(true);
    return () => {
      io.disconnect();
      bio?.disconnect();
    };
  }, [reduce]);

  useEffect(() => {
    if (!entered) return;
    const seq = Animated.parallel([
      animIn(h1, 0, 700, reduce),
      animIn(h2, 80, 700, reduce),
      animIn(h3, 160, 700, reduce),
      animIn(h4, 240, 700, reduce),
      animIn(copy, 380, 500, reduce),
      animIn(imgO, 480, 800, reduce),
      animIn(imgS, 480, 800, reduce),
    ]);
    seq.start();
    return () => seq.stop();
  }, [entered, reduce, h1, h2, h3, h4, copy, imgO, imgS]);

  useEffect(() => {
    if (!bottomEntered) return;
    const seq = animIn(bottom, 0, 600, reduce);
    seq.start();
    return () => seq.stop();
  }, [bottomEntered, reduce, bottom]);

  // image hover: 1 → 1.025 + 5px drift over 600ms
  useEffect(() => {
    Animated.timing(hoverV, {
      toValue: imgHover ? 1 : 0,
      duration: reduce ? 0 : 600,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [imgHover, reduce, hoverV]);

  // subtle parallax, max ~24px (web only, direct DOM)
  useEffect(() => {
    if (Platform.OS !== "web" || reduce) return;
    const imgEl = imgDomRef.current as unknown as HTMLElement | null;
    const rootEl = rootRef.current as unknown as HTMLElement | null;
    if (!imgEl || !rootEl) return;
    let scroller: HTMLElement | null = rootEl.parentElement;
    while (scroller) {
      const oy = window.getComputedStyle(scroller).overflowY;
      if ((oy === "auto" || oy === "scroll") && scroller.scrollHeight > scroller.clientHeight + 8)
        break;
      scroller = scroller.parentElement;
    }
    const target: HTMLElement | Window = scroller ?? window;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = (imgEl as HTMLElement).getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const p = Math.min(1, Math.max(0, (vh * 0.9 - r.top) / (vh * 0.9 + r.height * 0.5)));
      const y = (0.5 - p) * 24;
      (imgEl as HTMLElement).style.translate = `0 ${y.toFixed(1)}px`;
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

  const goWork = () => {
    if (Platform.OS === "web" && typeof document !== "undefined") {
      const el = document.getElementById("work");
      if (el) {
        el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
        return;
      }
    }
    router.push("/work");
  };

  const hSize = isMobile
    ? Math.min(72, Math.max(60, Math.round(width * 0.16)))
    : isTablet
      ? Math.min(105, Math.max(75, Math.round(width * 0.1)))
      : Math.min(160, Math.max(90, Math.round(width * 0.085)));
  const lineH = Math.round(hSize * 0.8);
  const imgW = isMobile ? ("100%" as const) : isTablet ? Math.min(470, width * 0.48) : 505;
  const imgH = isMobile ? 290 : isTablet ? 280 : 320;

  const lines = [
    { v: h1, text: "WE" },
    { v: h2, text: "BUILD" },
    { v: h3, text: "DIGITAL" },
    { v: h4, text: "PRODUCTS" },
  ];

  const supportCopy = (
    <Animated.View
      style={{
        opacity: copy,
        transform: [{ translateY: copy.interpolate({ inputRange: [0, 1], outputRange: [15, 0] }) }],
      }}
    >
      {Platform.OS === "web" ? (
        // @ts-ignore web-only gradient dot
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundImage: colors.gradient,
            marginBottom: 14,
          }}
        />
      ) : (
        <View style={styles.dotNative} />
      )}
      <Text style={[styles.copy, isMobile && styles.copyMobile]}>
        <Text style={styles.copyMuted}>DIGITAL EXPERIENCES THAT FEEL{"\n"}</Text>
        <Text style={styles.copyStrong}>OBVIOUS, FAST, INTUITIVE, AND{"\n"}IMPOSSIBLE TO IGNORE.</Text>
      </Text>
    </Animated.View>
  );

  const image = (
    <Animated.View style={{ opacity: imgO, transform: [{ scale: imgS }] }}>
      <Pressable
        accessibilityRole="image"
        accessibilityLabel="Creative technologist at work"
        onPress={() => {}}
        style={styles.imgHit}
        {...(Platform.OS === "web"
          ? ({
              onMouseEnter: () => setImgHover(true),
              onMouseLeave: () => setImgHover(false),
            } as any)
          : {})}
      >
        <Animated.View
          style={[
            styles.imgFrame,
            { width: imgW as any, height: imgH },
            {
              transform: [
                { scale: hoverV.interpolate({ inputRange: [0, 1], outputRange: [1, 1.025] }) },
                { translateX: hoverV.interpolate({ inputRange: [0, 1], outputRange: [0, 5] }) },
              ],
            },
          ]}
        >
          {Platform.OS === "web" ? (
            // @ts-ignore web-only img for exact monochrome treatment
            <img
              ref={imgDomRef}
              src={PHOTO_URL}
              alt="Creative technologist portrait in black and white"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "grayscale(100%) contrast(1.08)",
                display: "block",
              }}
            />
          ) : (
            <Image
              source={{ uri: PHOTO_URL }}
              style={{ width: imgW as any, height: imgH }}
              resizeMode="cover"
              accessibilityLabel="Creative technologist at work"
            />
          )}
        </Animated.View>
      </Pressable>
    </Animated.View>
  );

  const seeWork = (
    <Pressable
      accessibilityRole="link"
      accessibilityLabel="See the work"
      onPress={goWork}
      style={styles.seeHit}
      {...(Platform.OS === "web"
        ? ({
            onMouseEnter: () => setSeeHover(true),
            onMouseLeave: () => setSeeHover(false),
          } as any)
        : {})}
    >
      <Text style={[styles.seeText, seeHover && styles.seeTextHover]}>
        ↓ SEE THE WORK
      </Text>
    </Pressable>
  );

  const bottomRow = (
    <View style={isMobile ? styles.bottomMobile : styles.bottomDesktop}>
      {seeWork}
      {isMobile ? (
        <ShowreelButton />
      ) : (
        <View style={styles.showreelCenter}>
          <ShowreelButton />
        </View>
      )}
    </View>
  );

  return (
    <View ref={rootRef} style={[styles.section, isMobile && styles.sectionMobile]}>
      <EditorialGrid lines={isMobile ? [50] : [50, 75]} />

      <Text style={styles.date}>2026 ©</Text>

      {isMobile ? (
        <View style={styles.mobileBody}>
          <BuildHeadline
            lines={lines}
            fontSize={hSize}
            lineHeight={lineH}
            letterSpacing={-3}
            staggered={false}
          />
          <View style={styles.mobileGap} />
          {supportCopy}
          <View style={styles.mobileImg}>{image}</View>
          <View ref={bottomRef} style={styles.mobileBottom}>
            <Animated.View
              style={{
                opacity: bottom,
                transform: [
                  { translateY: bottom.interpolate({ inputRange: [0, 1], outputRange: [16, 0] }) },
                ],
              }}
            >
              {bottomRow}
            </Animated.View>
          </View>
          <Text style={[styles.cornerLabel, styles.cornerLabelMobile]}>REISO / CAPABILITIES</Text>
        </View>
      ) : (
        <View style={[styles.desktopBody, isTablet && styles.tabletBody]}>
          <View style={[styles.headPos, isTablet && styles.headPosTablet]}>
            <BuildHeadline
              lines={lines}
              fontSize={hSize}
              lineHeight={lineH}
              letterSpacing={-6}
              staggered
            />
          </View>
          <View style={styles.copyPos}>{supportCopy}</View>
          <View style={styles.imgPos}>{image}</View>
          <View ref={bottomRef} style={styles.bottomPos}>
            <Animated.View
              style={{
                opacity: bottom,
                transform: [
                  { translateY: bottom.interpolate({ inputRange: [0, 1], outputRange: [16, 0] }) },
                ],
              }}
            >
              {bottomRow}
            </Animated.View>
          </View>
          {/* overlapping index control — offset from the showreel */}
          <Link href="/work" asChild>
            <Pressable
              accessibilityRole="link"
              accessibilityLabel="Work index"
              style={indexHover ? styles.indexHover : styles.index}
              {...(Platform.OS === "web"
                ? ({
                    onMouseEnter: () => setIndexHover(true),
                    onMouseLeave: () => setIndexHover(false),
                  } as any)
                : {})}
            >
              {[0, 1, 2].map((i) => (
                <View key={i} style={styles.indexBar} />
              ))}
            </Pressable>
          </Link>
          <Text style={styles.cornerLabel}>REISO / CAPABILITIES</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    position: "relative",
    width: "100%",
    minHeight: 980,
    backgroundColor: "#F2F2F0",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.09)",
  },
  sectionMobile: {
    minHeight: 0,
  },
  date: {
    position: "absolute",
    top: 38,
    right: 36,
    color: "#666666",
    fontSize: 13.5,
    fontWeight: "500",
    fontFamily: "'Inter',system-ui,sans-serif",
    zIndex: 3,
  },
  // desktop / tablet absolute composition
  desktopBody: {
    position: "relative",
    minHeight: 980,
  },
  tabletBody: {
    minHeight: 900,
  },
  headPos: {
    position: "absolute",
    top: 48,
    left: "21%",
    width: 720,
    maxWidth: "60%",
    zIndex: 2,
  },
  headPosTablet: {
    left: "12%",
    maxWidth: "70%",
  },
  copyPos: {
    position: "absolute",
    left: "50%",
    top: "42%",
    width: 330,
    zIndex: 2,
  },
  imgPos: {
    position: "absolute",
    left: "50%",
    top: "52%",
    zIndex: 1,
  },
  bottomPos: {
    position: "absolute",
    left: 38,
    right: 36,
    bottom: 42,
    zIndex: 2,
  },
  bottomDesktop: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    minHeight: 52,
  },
  showreelCenter: {
    position: "absolute",
    left: "50%",
    marginLeft: -95,
    bottom: 0,
  },
  index: {
    position: "absolute",
    left: "50%",
    marginLeft: 110,
    bottom: -30,
    width: 60,
    height: 60,
    minWidth: 60,
    minHeight: 60,
    backgroundColor: "#252525",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    zIndex: 3,
  },
  indexHover: {
    position: "absolute",
    left: "50%",
    marginLeft: 110,
    bottom: -30,
    width: 60,
    height: 60,
    minWidth: 60,
    minHeight: 60,
    backgroundColor: "#050505",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    zIndex: 3,
    transform: [{ scale: 1.04 }],
  },
  indexBar: {
    width: 22,
    height: 2,
    backgroundColor: "#FFFFFF",
  },
  cornerLabel: {
    position: "absolute",
    right: 36,
    bottom: 42,
    color: "rgba(0,0,0,0.45)",
    fontSize: 11,
    letterSpacing: 1.2,
    fontWeight: "500",
    fontFamily: "'Inter',system-ui,sans-serif",
    zIndex: 2,
  },
  cornerLabelMobile: {
    position: "relative",
    right: 0,
    bottom: 0,
    textAlign: "right",
    marginTop: 24,
  },
  // mobile stack
  mobileBody: {
    paddingHorizontal: 24,
    paddingTop: 88,
    paddingBottom: 40,
  },
  mobileGap: {
    height: 70,
  },
  mobileImg: {
    marginTop: 24,
  },
  mobileBottom: {
    marginTop: 28,
  },
  bottomMobile: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 16,
  },
  // shared
  dotNative: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.violet,
    marginBottom: 14,
  },
  copy: {
    width: 330,
    maxWidth: "100%",
    fontSize: 17,
    lineHeight: 18,
    letterSpacing: -0.3,
    fontWeight: "500",
    fontFamily: "'Inter',system-ui,sans-serif",
  },
  copyMobile: {
    width: "100%",
  },
  copyMuted: {
    color: "#666666",
  },
  copyStrong: {
    color: "#111111",
  },
  imgHit: {
    minWidth: 44,
    minHeight: 44,
  },
  imgFrame: {
    backgroundColor: "#111111",
    overflow: "hidden",
  },
  seeHit: {
    minHeight: 44,
    minWidth: 44,
    justifyContent: "center",
  },
  seeText: {
    color: "#4D4D4D",
    fontSize: 15,
    fontWeight: "500",
    letterSpacing: 0.4,
    fontFamily: "'Inter',system-ui,sans-serif",
  },
  seeTextHover: {
    color: "#050505",
  },
});
