import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { BackgroundGrid } from "../components/BackgroundGrid";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { MobileMenu } from "../components/MobileMenu";
import { ProjectAvailability } from "../components/ProjectAvailability";
import { useResponsive } from "../hooks/useResponsive";
import { colors } from "../constants/colors";

export default function Home() {
  const { breakpoint, isMobile } = useResponsive();
  const [menuOpen, setMenuOpen] = useState(false);
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const reduce =
      Platform.OS === "web" &&
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    Animated.timing(fade, {
      toValue: 1,
      duration: reduce ? 0 : 600,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [fade]);

  return (
    <View style={styles.root}>
      <BackgroundGrid />
      <Animated.View style={[styles.shell, { opacity: fade }]}>
        <Header onMenu={() => setMenuOpen(true)} />
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[styles.content, isMobile && styles.contentMobile]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.heroZone}>
            <Hero breakpoint={breakpoint} />
          </View>
          <View style={[styles.statusBar, isMobile && styles.statusBarMobile]}>
            <ProjectAvailability />
            <View style={styles.locale}>
              <Text style={styles.localeTop}>BASED IN INDIA</Text>
              <Text style={styles.localeSub}>WORKING WORLDWIDE</Text>
            </View>
          </View>
        </ScrollView>
      </Animated.View>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg0,
    minHeight: "100%" as any,
  },
  shell: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    minHeight: "100%" as any,
    justifyContent: "space-between",
    paddingTop: 44,
    paddingBottom: 22,
  },
  contentMobile: {
    paddingTop: 26,
  },
  heroZone: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  statusBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 36,
    paddingTop: 18,
    marginTop: 26,
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
  },
  statusBarMobile: {
    paddingHorizontal: 20,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 8,
  },
  locale: {
    alignItems: "flex-end",
  },
  localeTop: {
    color: colors.textSecondary,
    fontSize: 11.5,
    letterSpacing: 1,
    fontWeight: "600",
    fontFamily: "'Inter',system-ui,sans-serif",
  },
  localeSub: {
    color: colors.textMuted,
    fontSize: 11,
    letterSpacing: 1,
    marginTop: 2,
    fontFamily: "'Inter',system-ui,sans-serif",
  },
});
