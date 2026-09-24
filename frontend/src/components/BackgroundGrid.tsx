import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { colors } from "../constants/colors";

const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`;

/**
 * Sophisticated black canvas: grain + thin grid + soft gradient glow + vignette.
 * Majority black/white/gray — gradient only at ~6% opacity.
 */
export function BackgroundGrid() {
  return (
    <View style={styles.root} pointerEvents="none">
      {/* soft reiso glows */}
      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />
      {/* vertical divisions */}
      <View style={styles.columns}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <View key={i} style={styles.vLine} />
        ))}
      </View>
      {/* one horizontal line through the middle */}
      <View style={styles.hLine} />
      {/* film grain (web only) */}
      {Platform.OS === "web" && <View style={styles.grain as any} />}
      {/* vignette (web only) */}
      {Platform.OS === "web" && <View style={styles.vignette as any} />}
    </View>
  );
}

const styles = StyleSheet.create({ // @ts-ignore web-only CSS props (backgroundImage/filter) passed through by react-native-web

  root: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.bg0,
    overflow: "hidden",
  },
  glowTop: {
    position: "absolute",
    top: -180,
    left: "10%",
    right: "10%",
    height: 420,
    opacity: 0.07,
    ...(Platform.OS === "web"
      ? ({
          backgroundImage: colors.gradient,
          filter: "blur(120px)",
        } as any)
      : { backgroundColor: "#3F2BFF" }),
  },
  glowBottom: {
    position: "absolute",
    bottom: -200,
    left: "20%",
    right: "20%",
    height: 360,
    opacity: 0.05,
    ...(Platform.OS === "web"
      ? ({
          backgroundImage: colors.gradient,
          filter: "blur(130px)",
        } as any)
      : { backgroundColor: "#711EFF" }),
  },
  columns: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  vLine: {
    width: 1,
    height: "100%",
    backgroundColor: colors.gridLine,
    opacity: 0.7,
  },
  hLine: {
    position: "absolute",
    top: "46%",
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: colors.gridLine,
    opacity: 0.7,
  },
  grain: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.05,
    backgroundImage: GRAIN_SVG,
  },
  vignette: {
    ...StyleSheet.absoluteFillObject,
    backgroundImage:
      "radial-gradient(ellipse 90% 80% at 50% 45%, transparent 55%, rgba(0,0,0,0.55) 100%)",
  },
} as any);
