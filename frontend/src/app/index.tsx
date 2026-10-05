import React from "react";
import { useRouter } from "expo-router";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../constants/colors";
import { COMPANY, IMAGES } from "../data/site";
import { useResponsive } from "../hooks/useResponsive";
import { CTAButton, Float, GradientText, Reveal } from "../components/site/primitives";
import {
  AppFeature,
  LedSection,
  ProcessSection,
  SitePage,
  TemplatesSection,
  Testimonials,
  TrustedBy,
  WhatWeDo,
  WhyChoose,
  WorkSection,
} from "../components/site/sections";

export default function Home() {
  const router = useRouter();
  const { isMobile } = useResponsive();
  return (
    <SitePage active="/">
      {/* ---------------- HERO ---------------- */}
      <View style={h.root}>
        <LinearGradient
          colors={["rgba(8,120,255,0.18)", "rgba(113,30,255,0.12)", "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={h.glow}
        />
        <View style={[h.split, isMobile && h.splitMobile]}>
          <View style={h.copy}>
            <Reveal>
              <View style={h.badge}>
                <Text style={h.badgeText}>● COIMBATORE · SERVING CLIENTS WORLDWIDE</Text>
              </View>
            </Reveal>
            <Reveal delay={90}>
              <Text style={[h.title, isMobile && h.titleMobile]}>
                Build.{"\n"}Automate.{"\n"}<GradientText>Grow.</GradientText>
              </Text>
            </Reveal>
            <Reveal delay={180}>
              <Text style={[h.sub, isMobile && h.subMobile]}>
                {COMPANY.description} Mobile apps are our flagship — but we ship everything from SaaS and
                IoT to LED mirrors and smart interiors.
              </Text>
            </Reveal>
            <Reveal delay={260}>
              <View style={h.ctas}>
                <CTAButton onPress={() => router.push("/contact")}>Start Your Project</CTAButton>
                <CTAButton variant="ghost" onPress={() => router.push("/services")}>Explore Our Services</CTAButton>
                <CTAButton variant="ghost" onPress={() => {
                  if (Platform.OS === "web" && typeof document !== "undefined") {
                    document.querySelector('[id="templates"]')?.scrollIntoView({ behavior: "smooth" });
                  }
                }}>View Free Templates</CTAButton>
              </View>
            </Reveal>
            <Reveal delay={340}>
              <View style={h.miniStats}>
                {[
                  ["25+", "Projects"],
                  ["10+", "Free templates"],
                  ["14", "Verticals"],
                ].map(([v, l]) => (
                  <View key={l} style={h.miniStat}>
                    <Text style={h.miniNum}>{v}</Text>
                    <Text style={h.miniLabel}>{l}</Text>
                  </View>
                ))}
              </View>
            </Reveal>
          </View>

          {/* Floating visual collage */}
          <View style={h.visual}>
            <Reveal delay={150} style={{ alignItems: "center" }}>
              <Float amplitude={10}>
                <View style={h.phoneCard}>
                  <Image source={{ uri: IMAGES.heroApp }} style={h.phoneImg} accessibilityLabel="Mobile app mockup" />
                  <View style={h.phoneNotch} />
                </View>
              </Float>
            </Reveal>
            <Float amplitude={12} duration={3800} style={h.dashPos}>
              <View style={h.glassCard}>
                <Image source={{ uri: IMAGES.heroDashboard }} style={h.dashImg} accessibilityLabel="SaaS dashboard mockup" />
                <Text style={h.glassLabel}>▲ Revenue +182%</Text>
              </View>
            </Float>
            <Float amplitude={8} duration={2800} style={h.mirrorPos}>
              <View style={h.glassCard}>
                <Image source={{ uri: IMAGES.heroMirror }} style={h.smallImg} accessibilityLabel="LED mirror" />
                <Text style={h.glassLabel}>🪞 Smart Mirror · 2700K</Text>
              </View>
            </Float>
            <Float amplitude={11} duration={3400} style={h.iotPos}>
              <View style={h.iotChip}>
                <Text style={h.iotText}>🤖 Living Room · 24°C · ON</Text>
              </View>
            </Float>
          </View>
        </View>
      </View>

      <TrustedBy />
      <WhatWeDo />
      <AppFeature />
      <TemplatesSection />
      <LedSection />
      <WorkSection />
      <Testimonials />
      <WhyChoose />
      <ProcessSection />
    </SitePage>
  );
}

const h = StyleSheet.create({
  root: { position: "relative", overflow: "hidden", paddingBottom: 30 },
  glow: { position: "absolute", top: 0, left: 0, right: 0, height: 640 },
  split: {
    flexDirection: "row", flexWrap: "wrap", gap: 36,
    maxWidth: 1240, width: "100%", alignSelf: "center",
    paddingHorizontal: 24, paddingTop: 64, alignItems: "center", justifyContent: "center",
    ...(Platform.OS === "web" ? { marginLeft: "auto", marginRight: "auto" } : {}),
  },
  splitMobile: { paddingTop: 44, gap: 28 },
  copy: { flex: 1, flexBasis: 340, gap: 4 },
  badge: {
    alignSelf: "flex-start", borderWidth: 1, borderColor: "rgba(16,221,244,0.4)",
    backgroundColor: "rgba(16,221,244,0.08)", borderRadius: 999, paddingHorizontal: 16, paddingVertical: 9,
  },
  badgeText: { color: colors.cyan, fontSize: 11, fontWeight: "700", letterSpacing: 1.5 },
  title: {
    color: colors.textPrimary, fontSize: 76, fontWeight: "700", letterSpacing: -3,
    fontFamily: "'Space Grotesk','Inter',sans-serif", lineHeight: 80, marginTop: 18,
  },
  titleMobile: { fontSize: 46, lineHeight: 50, letterSpacing: -1.5 },
  sub: { color: colors.textSecondary, fontSize: 17, lineHeight: 27, marginTop: 18, maxWidth: 520 },
  subMobile: { fontSize: 15, lineHeight: 24 },
  ctas: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 26 },
  miniStats: { flexDirection: "row", gap: 28, marginTop: 30 },
  miniStat: {},
  miniNum: { color: colors.textPrimary, fontSize: 26, fontWeight: "700", fontFamily: "'Space Grotesk','Inter',sans-serif" },
  miniLabel: { color: colors.textMuted, fontSize: 12, letterSpacing: 1, marginTop: 2 },
  visual: { flex: 1, flexBasis: 340, minHeight: 560, alignItems: "center", justifyContent: "center", position: "relative" },
  phoneCard: {
    borderRadius: 32, borderWidth: 1, borderColor: colors.border, overflow: "hidden",
    backgroundColor: "#0B0B0F", padding: 10,
  },
  phoneImg: { width: 250, height: 380, borderRadius: 24 },
  phoneNotch: { position: "absolute", top: 20, alignSelf: "center", width: 90, height: 18, borderRadius: 9, backgroundColor: "#000" },
  glassCard: {
    backgroundColor: "rgba(12,12,16,0.82)", borderWidth: 1, borderColor: colors.border,
    borderRadius: 18, padding: 10, gap: 8,
  },
  dashImg: { width: 240, height: 140, borderRadius: 12 },
  smallImg: { width: 190, height: 120, borderRadius: 12 },
  glassLabel: { color: colors.textPrimary, fontSize: 12, fontWeight: "700" },
  dashPos: { position: "absolute", right: 0, top: 40 },
  mirrorPos: { position: "absolute", left: 0, bottom: 90 },
  iotPos: { position: "absolute", right: 10, bottom: 20 },
  iotChip: {
    backgroundColor: "rgba(12,12,16,0.85)", borderWidth: 1, borderColor: "rgba(16,221,244,0.4)",
    borderRadius: 999, paddingHorizontal: 16, paddingVertical: 12,
  },
  iotText: { color: colors.textPrimary, fontSize: 12, fontWeight: "700" },
});
