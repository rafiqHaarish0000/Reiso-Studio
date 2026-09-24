import React, { useRef } from "react";
import { Animated, Platform, StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";
import { typography } from "../constants/typography";
import type { Breakpoint } from "../constants/spacing";
import { GradientSignature } from "./GradientSignature";
import { StudioIdentity } from "./StudioIdentity";
import { ServiceLinks } from "./ServiceLinks";

export function HeroFrame({
  breakpoint,
  anim,
}: {
  breakpoint: Breakpoint;
  anim: {
    title: Animated.Value;
    studio: Animated.Value;
    copy: Animated.Value;
    visual: Animated.Value;
  };
}) {
  const glow = useRef(new Animated.Value(0)).current;
  const glowPos = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const isMobile = breakpoint === "mobile";
  const isTablet = breakpoint === "tablet";

  const reisoStyle = isMobile
    ? typography.reisoMobile
    : isTablet
      ? typography.reisoTablet
      : typography.reisoDesktop;
  const studioStyle = isMobile
    ? typography.studioMobile
    : isTablet
      ? typography.studioTablet
      : typography.studioDesktop;

  const onMove =
    Platform.OS === "web"
      ? ((e: any) => {
          const rect = e.currentTarget.getBoundingClientRect();
          glowPos.setValue({
            x: e.clientX - rect.left - rect.width / 2,
            y: e.clientY - rect.top - rect.height / 2,
          });
          Animated.timing(glow, { toValue: 1, duration: 200, useNativeDriver: true }).start();
        }) as any
      : undefined;

  const onLeave =
    Platform.OS === "web"
      ? ((() => {
          Animated.timing(glow, { toValue: 0, duration: 400, useNativeDriver: true }).start();
        }) as any)
      : undefined;

  return (
    <View
      style={[styles.frame, isMobile && styles.frameMobile, isTablet && styles.frameTablet]}
      {...(Platform.OS === "web" ? ({ onMouseMove: onMove, onMouseLeave: onLeave } as any) : {})}
    >
      {/* corner selection dots */}
      {["tl", "tr", "bl", "br"].map((c) => (
        <View key={c} style={[styles.dot, styles[`dot_${c}` as keyof typeof styles] as any]} />
      ))}

      {/* pointer glow */}
      <Animated.View
        pointerEvents="none"
        style={[styles.pointerGlow, { opacity: glow, transform: glowPos.getTranslateTransform() }]}
      />

      <Text style={styles.est}>(EST. 2026 — VERSION 1.0)</Text>

      <Animated.View style={{ opacity: anim.title }}>
        <View style={styles.titleRow}>
          <Animated.Text
            style={[
              styles.reiso,
              {
                fontSize: reisoStyle.fontSize,
                lineHeight: reisoStyle.lineHeight,
                letterSpacing: reisoStyle.letterSpacing,
                transform: [
                  {
                    translateY: anim.title.interpolate({ inputRange: [0, 1], outputRange: [15, 0] }),
                  },
                ],
              },
            ]}
          >
            REISO
          </Animated.Text>
          <Animated.Text
            style={[
              styles.studio,
              {
                fontSize: studioStyle.fontSize,
                lineHeight: studioStyle.lineHeight,
                letterSpacing: studioStyle.letterSpacing,
                opacity: anim.studio,
                transform: [
                  {
                    translateY: anim.studio.interpolate({ inputRange: [0, 1], outputRange: [12, 0] }),
                  },
                ],
              },
            ]}
          >
            STUDIO
          </Animated.Text>
        </View>
        {/* gradient underline accent — selective, not full rainbow text */}
        <View style={[styles.rule, isMobile && styles.ruleMobile]}>
          <View style={styles.ruleGradient as any} />
        </View>
      </Animated.View>

      <Animated.View
        style={[
          styles.middle,
          isMobile && styles.middleMobile,
          { opacity: anim.copy },
        ]}
      >
        <Text style={[styles.desc, isMobile && styles.descMobile]}>
          <Text style={styles.descWhite}>WE DESIGN AND BUILD DIGITAL PRODUCTS THAT HELP{"\n"}MODERN BUSINESSES MOVE FORWARD. </Text>
          <Text style={styles.descGray}>FROM STRATEGY{"\n"}AND UI/UX TO SOFTWARE, APPS, SAAS, AI AND{"\n"}AUTOMATION.</Text>
        </Text>
        <View style={styles.identityWrap}>
          <StudioIdentity />
        </View>
      </Animated.View>

      <Animated.View
        style={[
          styles.signatureWrap,
          isMobile && styles.signatureWrapMobile,
          { opacity: anim.visual },
        ]}
        pointerEvents="none"
      >
        <GradientSignature compact={isMobile} />
      </Animated.View>

      <View style={styles.servicesWrap}>
        <ServiceLinks />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({ // @ts-ignore web-only CSS props (backgroundImage/filter) passed through by react-native-web

  frame: {
    width: "100%",
    maxWidth: 1072,
    minHeight: 566,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "rgba(13,13,17,0.55)",
    paddingHorizontal: 48,
    paddingTop: 26,
    paddingBottom: 28,
    position: "relative",
    overflow: "hidden",
  },
  frameTablet: {
    paddingHorizontal: 32,
    minHeight: 540,
  },
  frameMobile: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 22,
    minHeight: 0,
  },
  dot: {
    position: "absolute",
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: "#FFFFFF",
    zIndex: 5,
  },
  dot_tl: { top: -3.5, left: -3.5 },
  dot_tr: { top: -3.5, right: -3.5 },
  dot_bl: { bottom: -3.5, left: -3.5 },
  dot_br: { bottom: -3.5, right: -3.5 },
  pointerGlow: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 420,
    height: 280,
    marginLeft: -210,
    marginTop: -140,
    borderRadius: 140,
    backgroundColor: "#9C1DFF",
    opacity: 0,
  },
  est: {
    color: colors.textSecondary,
    fontSize: 11,
    letterSpacing: 0.6,
    fontWeight: "500",
    fontFamily: "'Inter',system-ui,sans-serif",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 18,
    gap: 18,
    flexWrap: "wrap",
  },
  reiso: {
    color: colors.textPrimary,
    fontWeight: "800",
    fontFamily: "'Space Grotesk','Inter',system-ui,sans-serif",
  },
  studio: {
    color: colors.textPrimary,
    fontWeight: "500",
    fontFamily: "'Space Grotesk','Inter',system-ui,sans-serif",
    paddingBottom: 10,
  },
  rule: {
    marginTop: 10,
    width: 210,
    height: 3,
    backgroundColor: colors.borderSubtle,
    overflow: "hidden",
    borderRadius: 2,
  },
  ruleMobile: { width: 140 },
  ruleGradient: {
    width: "100%",
    height: "100%",
    backgroundImage: colors.gradient,
  },
  middle: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 32,
    marginTop: 30,
  },
  middleMobile: {
    flexDirection: "column",
    gap: 20,
    marginTop: 22,
  },
  desc: {
    fontSize: 15,
    lineHeight: 17.5,
    maxWidth: 470,
    fontFamily: "'Inter',system-ui,sans-serif",
  },
  descMobile: {
    fontSize: 13.5,
    lineHeight: 16.5,
    maxWidth: "100%",
  },
  descWhite: { color: colors.textPrimary, fontWeight: "600" },
  descGray: { color: colors.textSecondary, fontWeight: "400" },
  identityWrap: {
    minWidth: 220,
    justifyContent: "center",
  },
  signatureWrap: {
    position: "absolute",
    right: 40,
    bottom: 108,
    opacity: 0.95,
  },
  signatureWrapMobile: {
    position: "relative",
    right: 0,
    bottom: 0,
    marginTop: 8,
    alignItems: "flex-start",
  },
  servicesWrap: {
    marginTop: 44,
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
    paddingTop: 16,
  },
} as any);
