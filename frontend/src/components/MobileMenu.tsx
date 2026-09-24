import React, { useEffect, useRef } from "react";
import { Animated, Easing, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { colors } from "../constants/colors";

const LINKS = [
  { label: "WORK", href: "/work" as const },
  { label: "SERVICES", href: "/services" as const },
  { label: "ABOUT", href: "/about" as const },
  { label: "CONTACT", href: "/contact" as const },
];

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    const reduce =
      Platform.OS === "web" &&
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (open) {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: reduce ? 0 : 280, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
        Animated.timing(slide, { toValue: 0, duration: reduce ? 0 : 320, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ]).start();
    } else {
      opacity.setValue(0);
      slide.setValue(12);
    }
  }, [open, opacity, slide]);

  if (!open) return null;

  return (
    <Animated.View style={[styles.root, { opacity, transform: [{ translateY: slide }] }]}>
      <View style={styles.inner}>
        {LINKS.map((l, i) => (
          <Link key={l.label} href={l.href} asChild>
            <Pressable
              onPress={onClose}
              accessibilityRole="link"
              accessibilityLabel={l.label}
              style={styles.item}
            >
              <Text style={styles.index}>0{i + 1}</Text>
              <Text style={styles.label}>{l.label}</Text>
            </Pressable>
          </Link>
        ))}
        <Link href="/contact" asChild>
          <Pressable
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel="Start a project"
            style={styles.cta}
          >
            {Platform.OS === "web" ? (
              // @ts-ignore web-only gradient border wrapper
              <div style={{ padding: 1.5, borderRadius: 3, backgroundImage: colors.gradient, width: "100%" }}>
                {/* @ts-ignore */}
                <div style={{ background: "#050507", borderRadius: 2, textAlign: "center", padding: "15px 0" }}>
                  {/* @ts-ignore */}
                  <span style={{ color: "#F5F5F2", fontWeight: 700, letterSpacing: 1.4, fontSize: 14 }}>START A PROJECT</span>
                </div>
              </div>
            ) : (
              <Text style={styles.ctaText}>START A PROJECT</Text>
            )}
          </Pressable>
        </Link>
        <Pressable onPress={onClose} accessibilityRole="button" accessibilityLabel="Close menu" style={styles.close}>
          <Text style={styles.closeText}>CLOSE ✕</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 60,
    backgroundColor: "#050507",
  },
  inner: {
    flex: 1,
    paddingTop: 110,
    paddingHorizontal: 28,
    gap: 6,
  },
  item: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 14,
    minHeight: 56,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
    justifyContent: "flex-start",
  },
  index: {
    color: colors.textMuted,
    fontSize: 12,
    fontFamily: "'Inter',system-ui,sans-serif",
  },
  label: {
    color: colors.textPrimary,
    fontSize: 30,
    fontWeight: "700",
    letterSpacing: -0.5,
    fontFamily: "'Space Grotesk','Inter',system-ui,sans-serif",
  },
  cta: {
    marginTop: 26,
    minHeight: 52,
    justifyContent: "center",
  },
  ctaText: {
    color: colors.textPrimary,
    textAlign: "center",
    fontWeight: "700",
    letterSpacing: 1.4,
  },
  close: {
    marginTop: 18,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  closeText: {
    color: colors.textSecondary,
    letterSpacing: 1.4,
    fontSize: 13,
  },
});
