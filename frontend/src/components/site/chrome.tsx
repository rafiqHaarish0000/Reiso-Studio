import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { Linking, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../constants/colors";
import { COMPANY, NAV_LINKS } from "../../data/site";
import { useResponsive } from "../../hooks/useResponsive";
import { Div, Logo } from "./primitives";

export function SiteNav({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isMobile } = useResponsive();
  const router = useRouter();

  const inner = (
    <View style={[styles.bar, scrolled && styles.barScrolled]}>
      <Link href="/" asChild>
        <Pressable accessibilityRole="link" accessibilityLabel="Reiso Studio home" style={styles.brand}>
          <Logo />
        </Pressable>
      </Link>
      {!isMobile ? (
        <View style={styles.links}>
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href as any} asChild>
              <Pressable accessibilityRole="link" accessibilityLabel={l.label} style={styles.linkHit}>
                <Text style={[styles.link, active === l.href && styles.linkActive]}>{l.label}</Text>
                {active === l.href ? <View style={styles.dot} /> : null}
              </Pressable>
            </Link>
          ))}
        </View>
      ) : null}
      <View style={styles.actions}>
        {!isMobile ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Start a project"
            onPress={() => router.push("/contact")}
            style={({ hovered }: any) => [styles.cta, hovered && { opacity: 0.9, transform: [{ scale: 1.04 }] }]}
          >
            <LinearGradient colors={["#0878FF", "#711EFF", "#F01CFF"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.ctaInner}>
              <Text style={styles.ctaText}>Start a Project</Text>
            </LinearGradient>
          </Pressable>
        ) : null}
        {isMobile ? (
          <Pressable
            onPress={() => setOpen((v) => !v)}
            accessibilityRole="button"
            accessibilityLabel="Toggle menu"
            style={styles.burger}
          >
            <Text style={styles.burgerText}>{open ? "✕" : "☰"}</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );

  const mobileMenu = open ? (
    <View style={styles.mobile}>
      {NAV_LINKS.map((l) => (
        <Link key={l.href} href={l.href as any} asChild>
          <Pressable onPress={() => setOpen(false)} accessibilityRole="link" style={styles.mItem}>
            <Text style={[styles.mLabel, active === l.href && styles.linkActive]}>{l.label}</Text>
          </Pressable>
        </Link>
      ))}
    </View>
  ) : null;

  if (Platform.OS === "web") {
    return (
      <Div
        // @ts-ignore web-only sticky
        style={{ position: "sticky", top: 0, zIndex: 100 }}
      >
        <ScrollTracker onScroll={setScrolled} />
        <View style={styles.wrap}>{inner}{mobileMenu}</View>
      </Div>
    );
  }
  return <View style={styles.wrap}>{inner}{mobileMenu}</View>;
}

/* Tiny scroll listener (web) that toggles the glass background. */
function ScrollTracker({ onScroll }: { onScroll: (v: boolean) => void }) {
  React.useEffect(() => {
    const fn = () => onScroll(window.scrollY > 24);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [onScroll]);
  return null;
}

export function FinalCTA() {
  const { isMobile } = useResponsive();
  return (
    <View style={[styles.ctaSection, isMobile && styles.ctaSectionMobile]}>
      <LinearGradient
        colors={["rgba(8,120,255,0.22)", "rgba(113,30,255,0.20)", "rgba(240,28,255,0.16)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.ctaCard, isMobile && styles.ctaCardMobile]}
      >
        <Text style={styles.ctaEyebrow}>LET'S BUILD TOGETHER</Text>
        <Text style={[styles.ctaTitle, isMobile && styles.ctaTitleMobile]}>Have an idea?{"\n"}Let's build it.</Text>
        <Text style={styles.ctaSub}>
          Whether you need a mobile app, web platform, SaaS product, automation solution, IoT system, smart
          interior, or LED mirror solution — Reiso Studio can help transform the idea into reality.
        </Text>
        <View style={styles.ctaRow}>
          <Link href="/contact" asChild>
            <Pressable accessibilityRole="button" style={styles.bigBtn}>
              <LinearGradient colors={["#0878FF", "#711EFF", "#F01CFF"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.bigBtnInner}>
                <Text style={styles.bigBtnText}>Start Your Project →</Text>
              </LinearGradient>
            </Pressable>
          </Link>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="WhatsApp us"
            onPress={() => Linking.openURL(COMPANY.whatsapp).catch(() => {})}
            style={styles.bigGhost}
          >
            <Text style={styles.bigGhostText}>WhatsApp Us</Text>
          </Pressable>
        </View>
      </LinearGradient>
    </View>
  );
}

export function SiteFooter() {
  const cols: { title: string; links: { label: string; href: string }[] }[] = [
    {
      title: "Products",
      links: [
        { label: "Mobile Apps", href: "/products" },
        { label: "SaaS Platforms", href: "/products" },
        { label: "LED Mirrors", href: "/products" },
        { label: "Smart Switches", href: "/products" },
        { label: "Free Templates", href: "/" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "App Development", href: "/services" },
        { label: "Web Development", href: "/services" },
        { label: "UI/UX Design", href: "/services" },
        { label: "IoT & Automation", href: "/services" },
        { label: "Digital Marketing", href: "/services" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Privacy Policy", href: "/about" },
        { label: "Terms & Conditions", href: "/about" },
      ],
    },
  ];
  return (
    <View style={styles.footer}>
      <View style={styles.fGrid}>
        <View style={styles.fBrand}>
          <Logo />
          <Text style={styles.fDesc}>
            {COMPANY.name} builds mobile apps, SaaS, websites, IoT automation and smart interiors for modern
            businesses — from Coimbatore to the world.
          </Text>
          <Text style={styles.fContact}>{COMPANY.phoneDisplay}</Text>
          <Text style={styles.fContact}>{COMPANY.email}</Text>
          <Text style={styles.fContact}>{COMPANY.city}, {COMPANY.state}</Text>
        </View>
        {cols.map((c) => (
          <View key={c.title} style={styles.fCol}>
            <Text style={styles.fTitle}>{c.title}</Text>
            {c.links.map((l) => (
              <Link key={l.label} href={l.href as any} asChild>
                <Pressable accessibilityRole="link" style={styles.fLinkHit}>
                  <Text style={styles.fLink}>{l.label}</Text>
                </Pressable>
              </Link>
            ))}
          </View>
        ))}
      </View>
      <View style={styles.fBottom}>
        <Text style={styles.fCopy}>© 2026 {COMPANY.name}. All rights reserved. {COMPANY.tagline}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: "rgba(5,5,7,0.78)",
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 28,
    height: 72,
    maxWidth: 1240,
    width: "100%",
    alignSelf: "center",
  },
  barScrolled: { height: 64 },
  brand: { minWidth: 44, minHeight: 44, justifyContent: "center" },
  links: { flexDirection: "row", alignItems: "center", gap: 6 },
  linkHit: { paddingHorizontal: 14, minHeight: 44, justifyContent: "center", alignItems: "center" },
  link: { color: colors.textSecondary, fontSize: 14, fontWeight: "600" },
  linkActive: { color: colors.textPrimary },
  dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: colors.magenta, marginTop: 3 },
  actions: { flexDirection: "row", alignItems: "center", gap: 10 },
  cta: { borderRadius: 12, overflow: "hidden" },
  ctaInner: { paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12 },
  ctaText: { color: "#fff", fontWeight: "700", fontSize: 13, letterSpacing: 0.5 },
  burger: { minWidth: 44, minHeight: 44, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.border, borderRadius: 12 },
  burgerText: { color: colors.textPrimary, fontSize: 18 },
  mobile: { borderTopWidth: 1, borderTopColor: colors.borderSubtle, paddingVertical: 8, paddingHorizontal: 20 },
  mItem: { minHeight: 52, justifyContent: "center", borderBottomWidth: 1, borderBottomColor: colors.borderSubtle },
  mLabel: { color: colors.textPrimary, fontSize: 17, fontWeight: "600" },
  ctaSection: {
    paddingHorizontal: 20, paddingVertical: 70, maxWidth: 1240, width: "100%", alignSelf: "center",
    ...(Platform.OS === "web" ? { marginLeft: "auto", marginRight: "auto" } : {}),
  },
  ctaSectionMobile: { paddingVertical: 48 },
  ctaCard: { borderRadius: 28, padding: 48, alignItems: "center", borderWidth: 1, borderColor: colors.border },
  ctaCardMobile: { padding: 26, borderRadius: 22 },
  ctaEyebrow: { color: colors.cyan, fontSize: 12, fontWeight: "700", letterSpacing: 3 },
  ctaTitle: {
    color: colors.textPrimary,
    fontSize: 46,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 12,
    letterSpacing: -1.5,
    fontFamily: "'Space Grotesk','Inter',sans-serif",
    lineHeight: 52,
  },
  ctaTitleMobile: { fontSize: 31, lineHeight: 37, letterSpacing: -0.8 },
  ctaSub: { color: colors.textSecondary, fontSize: 16, textAlign: "center", marginTop: 14, maxWidth: 620, lineHeight: 25 },
  ctaRow: { flexDirection: "row", gap: 14, marginTop: 28, flexWrap: "wrap", justifyContent: "center" },
  bigBtn: { borderRadius: 14, overflow: "hidden" },
  bigBtnInner: { paddingHorizontal: 32, paddingVertical: 17 },
  bigBtnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  bigGhost: { borderRadius: 14, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 32, paddingVertical: 17, backgroundColor: "rgba(255,255,255,0.05)", minHeight: 52, justifyContent: "center" },
  bigGhostText: { color: colors.textPrimary, fontWeight: "700", fontSize: 15 },
  footer: { borderTopWidth: 1, borderTopColor: colors.borderSubtle, backgroundColor: "#070709", paddingTop: 56 },
  fGrid: { flexDirection: "row", flexWrap: "wrap", gap: 32, maxWidth: 1240, width: "100%", alignSelf: "center", paddingHorizontal: 28 },
  fBrand: { flexBasis: 280, flexGrow: 1, gap: 10 },
  fDesc: { color: colors.textSecondary, fontSize: 14, lineHeight: 22, marginTop: 12 },
  fContact: { color: colors.textPrimary, fontSize: 13, fontWeight: "600" },
  fCol: { flexBasis: 140, flexGrow: 1, gap: 4 },
  fTitle: { color: colors.textPrimary, fontSize: 13, fontWeight: "700", letterSpacing: 1.5, marginBottom: 10 },
  fLinkHit: { minHeight: 36, justifyContent: "center" },
  fLink: { color: colors.textSecondary, fontSize: 14 },
  fBottom: { borderTopWidth: 1, borderTopColor: colors.borderSubtle, marginTop: 40, paddingVertical: 22, alignItems: "center", paddingHorizontal: 20 },
  fCopy: { color: colors.textMuted, fontSize: 12, textAlign: "center" },
});
