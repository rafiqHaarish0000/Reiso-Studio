import React, { useEffect, useRef } from "react";
import { Animated, Easing, Platform, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { LandingNavbar } from "../components/site/LandingNavbar";
import { Div } from "../components/site/primitives";
import { colors } from "../constants/colors";

function ComingSoonTitle() {
  const opacity = useRef(new Animated.Value(0.72)).current;
  const { width } = useWindowDimensions();

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 1700, easing: Easing.inOut(Easing.cubic), useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.7, duration: 2100, easing: Easing.inOut(Easing.cubic), useNativeDriver: true }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  const fontSize = width < 480 ? 54 : width < 900 ? 88 : 148;
  return (
    <Animated.Text
      accessibilityRole="header"
      style={[styles.title, { fontSize, lineHeight: fontSize * 1.08, opacity }]}
    >
      Coming soon<Text style={{ color: colors.brandLime }}>.</Text>
    </Animated.Text>
  );
}

export default function Home() {
  const heroContent = (
    <>
      <View style={styles.accentLine} />
      <ComingSoonTitle />
      <View style={styles.accentLine} />
    </>
  );

  if (Platform.OS === "web") {
    return (
      <Div style={styles.page}>
        <LandingNavbar active="/" />
        <Div style={styles.heroWeb}>
          <Div style={styles.glow} />
          <Div className="reiso-page-enter" style={styles.heroWebContent}>{heroContent}</Div>
        </Div>
      </Div>
    );
  }

  return (
    <View style={styles.pageNative}>
      <LandingNavbar active="/" />
      <View style={styles.heroNative}>
        <View style={styles.glow} />
        <View style={styles.heroContent}>{heroContent}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { minHeight: "100vh", backgroundColor: colors.brandInk } as any,
  pageNative: { flex: 1, backgroundColor: colors.brandInk },
  heroWeb: {
    minHeight: "calc(100vh - 82px)",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    background: "radial-gradient(ellipse at 50% 54%, rgba(199,255,35,0.055), transparent 48%), #050605",
  } as any,
  heroWebContent: {
    width: "100%",
    minHeight: 360,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 26,
    paddingLeft: 20,
    paddingRight: 20,
    position: "relative",
    zIndex: 1,
  } as any,
  heroNative: { flex: 1, minHeight: 540, alignItems: "center", justifyContent: "center", overflow: "hidden", backgroundColor: colors.brandInk },
  glow: {
    position: "absolute",
    width: 360,
    height: 360,
    borderRadius: 180,
    backgroundColor: "rgba(199,255,35,0.07)",
    opacity: 0.75,
    ...(Platform.OS === "web" ? ({ filter: "blur(90px)" } as any) : {}),
  },
  heroContent: { zIndex: 1, width: "100%", minHeight: 360, alignItems: "center", justifyContent: "center", gap: 26, paddingHorizontal: 20 } as any,
  title: {
    color: colors.textPrimary,
    fontWeight: "600",
    letterSpacing: -5,
    textAlign: "center",
    fontFamily: "'Space Grotesk', Inter, system-ui, sans-serif",
    textShadowColor: "rgba(199,255,35,0.12)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 32,
  },
  accentLine: { width: 42, height: 2, borderRadius: 2, backgroundColor: colors.brandLime, opacity: 0.8 },
});
