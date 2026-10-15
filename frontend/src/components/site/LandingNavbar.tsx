import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/colors";
import { useResponsive } from "../../hooks/useResponsive";
import { Div, Logo } from "./primitives";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Service", href: "/services" },
  { label: "Product", href: "/products" },
] as const;

export function LandingNavbar({ active = "/" }: { active?: string }) {
  const { width } = useResponsive();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const compact = width < 980;

  const go = (href: string) => {
    setMobileOpen(false);
    router.push(href as any);
  };

  const link = (item: (typeof LINKS)[number], mobile = false) => {
    const selected = active === item.href;
    return (
      <Link key={item.href} href={item.href as any} asChild>
        <Pressable
          accessibilityRole="link"
          accessibilityLabel={item.label}
          onPress={mobile ? () => setMobileOpen(false) : undefined}
          style={({ hovered }: any) => [
            mobile ? styles.mobileLink : styles.linkHit,
            hovered && !mobile && styles.linkHover,
          ]}
        >
          <Text style={[mobile ? styles.mobileLabel : styles.linkLabel, selected && styles.linkSelected]}>
            {item.label}
          </Text>
          {!mobile && selected ? <View style={styles.activeMark} /> : null}
        </Pressable>
      </Link>
    );
  };

  const projectButton = (mobile = false) => (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Start a project"
      onPress={() => go("/contact")}
      style={({ hovered }: any) => [
        mobile ? styles.mobileCta : styles.cta,
        hovered && styles.ctaHover,
      ]}
    >
      <Text style={styles.ctaText}>Start a project <Text style={styles.ctaArrow}>↗</Text></Text>
    </Pressable>
  );

  const menu = mobileOpen ? (
    <View style={styles.mobileMenu}>
      {LINKS.map((item) => link(item, true))}
      {projectButton(true)}
    </View>
  ) : null;

  const brand = (
    <Link href="/" asChild>
      <Pressable accessibilityRole="link" accessibilityLabel="Reiso logo home" style={styles.brand}>
        <Logo width={104} height={58} />
      </Pressable>
    </Link>
  );

  if (Platform.OS === "web") {
    return (
      <Div style={mobileOpen ? { ...styles.webWrap, borderRadius: 28 } : styles.webWrap}>
        <Div style={compact ? { ...styles.webBar, ...styles.webBarCompact } : styles.webBar}>
          {brand}
          {!compact ? (
            <>
              <Div style={styles.desktopLinks}>{LINKS.map((item) => link(item))}</Div>
              <Div style={styles.rightAction}>{projectButton()}</Div>
            </>
          ) : (
            <Pressable
              onPress={() => setMobileOpen((open) => !open)}
              accessibilityRole="button"
              accessibilityLabel={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              style={styles.burger}
            >
              <Text style={styles.burgerText}>{mobileOpen ? "×" : "☰"}</Text>
            </Pressable>
          )}
        </Div>
        {compact ? menu : null}
      </Div>
    );
  }

  return (
    <View style={styles.nativeWrap}>
      <View style={[styles.nativeBar, compact && styles.nativeBarCompact]}>
        {brand}
        {!compact ? (
          <>
            <View style={styles.nativeLinks}>{LINKS.map((item) => link(item))}</View>
            {projectButton()}
          </>
        ) : (
          <Pressable
            onPress={() => setMobileOpen((open) => !open)}
            accessibilityRole="button"
            accessibilityLabel={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            style={styles.burger}
          >
            <Text style={styles.burgerText}>{mobileOpen ? "×" : "☰"}</Text>
          </Pressable>
        )}
      </View>
      {compact ? menu : null}
    </View>
  );
}

const styles = StyleSheet.create({
  webWrap: {
    position: "sticky",
    top: 12,
    zIndex: 1000,
    width: "calc(100% - 28px)",
    maxWidth: 1600,
    margin: "12px auto 0",
    backgroundColor: "rgba(8,10,6,0.94)",
    backdropFilter: "blur(22px)",
    WebkitBackdropFilter: "blur(22px)",
    border: "1px solid rgba(199,255,35,0.14)",
    borderRadius: 999,
    boxShadow: "0 8px 32px rgba(0,0,0,0.26)",
  } as any,
  webBar: {
    maxWidth: 1440,
    height: 82,
    paddingLeft: 30,
    paddingRight: 30,
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
  } as any,
  webBarCompact: { height: 68, paddingLeft: 18, paddingRight: 18 },
  nativeWrap: { backgroundColor: "rgba(8,10,6,0.96)", borderWidth: 1, borderColor: "rgba(199,255,35,0.14)", borderRadius: 999, marginHorizontal: 8, marginTop: 10, zIndex: 1000, overflow: "hidden" },
  nativeBar: { height: 82, paddingHorizontal: 30, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  nativeBarCompact: { height: 68, paddingHorizontal: 18 },
  brand: { width: 112, height: 64, alignItems: "flex-start", justifyContent: "center", flexShrink: 0, overflow: "hidden" },
  desktopLinks: {
    display: "flex",
    position: "absolute",
    left: "50%",
    top: "50%",
    width: 360,
    justifyContent: "center",
    marginLeft: -180,
    marginTop: -21,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  } as any,
  nativeLinks: { position: "absolute", left: "50%", top: "50%", marginLeft: -180, marginTop: -21, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 4 } as any,
  rightAction: { marginLeft: "auto" } as any,
  linkHit: {
    minWidth: 64,
    minHeight: 40,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    transition: "background-color 180ms ease, transform 180ms ease",
  } as any,
  linkHover: { backgroundColor: "rgba(199,255,35,0.08)" },
  linkLabel: { color: "rgba(244,246,235,0.72)", fontSize: 14, fontWeight: "500", letterSpacing: 0, fontFamily: "'Inter',system-ui,sans-serif" },
  linkSelected: { color: colors.brandLime, fontWeight: "700" },
  activeMark: { position: "absolute", bottom: 4, width: 12, height: 2, borderRadius: 2, backgroundColor: colors.brandLime } as any,
  cta: {
    minHeight: 54,
    paddingHorizontal: 25,
    borderRadius: 999,
    backgroundColor: colors.brandLime,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.brandLime,
    shadowOpacity: 0.2,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 5 },
    transition: "transform 180ms ease, box-shadow 180ms ease, background-color 180ms ease",
  } as any,
  ctaHover: { transform: [{ translateY: -2 }, { scale: 1.02 }] as any, backgroundColor: colors.brandLimeSoft, shadowOpacity: 0.36 },
  ctaText: { color: "#101304", fontSize: 13, fontWeight: "800", letterSpacing: 0.2 },
  ctaArrow: { color: "#101304", fontSize: 15, fontWeight: "700" },
  burger: { width: 44, height: 44, alignItems: "center", justifyContent: "center", borderRadius: 14, borderWidth: 1, borderColor: "rgba(199,255,35,0.24)", backgroundColor: "rgba(199,255,35,0.06)" },
  burgerText: { color: colors.brandLime, fontSize: 20, lineHeight: 24 },
  mobileMenu: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 22, backgroundColor: "#080A05", borderTopWidth: 1, borderTopColor: "rgba(199,255,35,0.10)" },
  mobileLink: { minHeight: 54, justifyContent: "center", borderBottomWidth: 1, borderBottomColor: "rgba(255,255,255,0.07)" },
  mobileLabel: { color: colors.textPrimary, fontSize: 18, fontWeight: "600", letterSpacing: -0.2, fontFamily: "'Space Grotesk',system-ui,sans-serif" },
  mobileCta: { minHeight: 52, borderRadius: 999, marginTop: 18, backgroundColor: colors.brandLime, alignItems: "center", justifyContent: "center" },
});
