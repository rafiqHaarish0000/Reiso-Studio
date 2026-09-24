import React from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";

const LOGO = require("../assets/images/reiso-logo.png");

/**
 * Flowing "Reiso" signature visual — abstract, gradient, elegant.
 * Rendered as gradient-clipped script text on web, script Text on native.
 */
export function GradientSignature({ compact = false }: { compact?: boolean }) {
  if (Platform.OS === "web") {
    return (
      <View style={[styles.wrap, compact && styles.wrapCompact]} pointerEvents="none">
        <View style={styles.glow as any} />
        {/* @ts-ignore — web-only div for gradient text */}
        <div
          style={{
            fontFamily: "'Segoe Script','Brush Script MT','Snell Roundhand',cursive",
            fontStyle: "italic",
            fontSize: compact ? 72 : 128,
            lineHeight: 1,
            backgroundImage: colors.gradient,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            transform: "rotate(-8deg)",
            opacity: 0.92,
            whiteSpace: "nowrap",
            userSelect: "none",
          }}
        >
          Reiso
        </div>
        {/* @ts-ignore — web-only underline flourish */}
        <div
          style={{
            marginTop: -14,
            marginLeft: 30,
            width: compact ? 150 : 250,
            height: 3,
            borderRadius: 3,
            backgroundImage: colors.gradient,
            opacity: 0.7,
            transform: "rotate(-8deg)",
          }}
        />
      </View>
    );
  }
  return (
    <View style={[styles.wrap, compact && styles.wrapCompact]} pointerEvents="none">
      <Text style={[styles.nativeText, compact && styles.nativeTextCompact]}>Reiso</Text>
    </View>
  );
}

const styles = StyleSheet.create({ // @ts-ignore web-only CSS props (backgroundImage/filter) passed through by react-native-web

  wrap: {
    alignItems: "flex-start",
    justifyContent: "center",
    opacity: 0.95,
  },
  wrapCompact: {
    transform: [{ scale: 0.8 }],
  },
  glow: {
    position: "absolute",
    width: 320,
    height: 160,
    borderRadius: 80,
    opacity: 0.16,
    backgroundImage: colors.gradient,
    filter: "blur(60px)",
  },
  nativeText: {
    fontSize: 96,
    fontStyle: "italic",
    color: colors.pink,
    fontWeight: "600",
    transform: [{ rotate: "-8deg" }],
  },
  nativeTextCompact: {
    fontSize: 60,
  },
} as any);

export { LOGO };
