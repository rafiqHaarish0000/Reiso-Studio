import React, { useEffect, useRef } from "react";
import { Animated, Easing, Platform, StyleSheet, View } from "react-native";
import type { Breakpoint } from "../constants/spacing";
import { HeroFrame } from "./HeroFrame";

function useReducedMotion(): boolean {
  if (Platform.OS !== "web" || typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

/** Hero section: staggered entrance (bg → logo → REISO → STUDIO → copy → visual). */
export function Hero({ breakpoint }: { breakpoint: Breakpoint }) {
  const reduce = useReducedMotion();
  const title = useRef(new Animated.Value(0)).current;
  const studio = useRef(new Animated.Value(0)).current;
  const copy = useRef(new Animated.Value(0)).current;
  const visual = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (reduce) {
      [title, studio, copy, visual].forEach((v) => v.setValue(1));
      return;
    }
    const t = (v: Animated.Value, delay: number, dur: number) =>
      Animated.timing(v, { toValue: 1, delay, duration: dur, easing: Easing.out(Easing.cubic), useNativeDriver: true });
    const seq = Animated.parallel([
      t(title, 150, 700),
      t(studio, 300, 700),
      t(copy, 480, 650),
      t(visual, 650, 900),
    ]);
    seq.start();
    return () => seq.stop();
  }, [reduce, title, studio, copy, visual]);

  return (
    <View style={styles.root}>
      <HeroFrame breakpoint={breakpoint} anim={{ title, studio, copy, visual }} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 24,
  },
});
