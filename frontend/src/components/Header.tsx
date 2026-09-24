import React, { useState } from "react";
import { Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { colors } from "../constants/colors";
import { useResponsive } from "../hooks/useResponsive";

const LOGO = require("../assets/images/reiso-logo.png");

const NAV = [
  { label: "WORK", href: "/work" as const },
  { label: "SERVICES", href: "/services" as const },
  { label: "ABOUT", href: "/about" as const },
  { label: "CONTACT", href: "/contact" as const },
];

export function Header({ onMenu }: { onMenu: () => void }) {
  const [hoverCta, setHoverCta] = useState(false);
  const [hoverNav, setHoverNav] = useState<string | null>(null);
  const { isMobile, width } = useResponsive();
  const compact = isMobile || width < 900;

  return (
    <View style={[styles.root, compact && styles.rootCompact]}>
      <View style={styles.left}>
        <Link href="/" asChild>
          <Pressable accessibilityRole="link" accessibilityLabel="Reiso Studio home" style={styles.brand}>
            {/* Official logo — do not alter proportions/gradient */}
            <Image source={LOGO} style={styles.logo} resizeMode="contain" />
          </Pressable>
        </Link>
        {!compact && <View style={styles.separator} />}
        {!compact && (
          <Text style={styles.tagline} numberOfLines={1}>
            Digital products built for modern businesses
          </Text>
        )}
      </View>

      <View style={styles.right}>
        {!compact && (
          <View style={styles.nav}>
            {NAV.map((n, i) => (
              <React.Fragment key={n.label}>
                {i > 0 && <Text style={styles.slash}>/</Text>}
                <Link href={n.href} asChild>
                  <Pressable
                    accessibilityRole="link"
                    accessibilityLabel={n.label}
                    style={styles.navHit}
                    {...(Platform.OS === "web"
                      ? ({
                          onMouseEnter: () => setHoverNav(n.label),
                          onMouseLeave: () => setHoverNav(null),
                        } as any)
                      : {})}
                  >
                    <Text style={styles.navLabel}>{n.label}</Text>
                    {hoverNav === n.label && Platform.OS === "web" && (
                      // @ts-ignore web-only underline
                      <div style={{ height: 1.5, marginTop: 2, background: "#F5F5F2" }} />
                    )}
                  </Pressable>
                </Link>
              </React.Fragment>
            ))}
          </View>
        )}

        {!compact && (
          <Link href="/contact" asChild>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Start a project"
              // NOTE: must be a single object — Radix Slot (Link asChild) does
              // `{...slotStyle, ...childStyle}`, which corrupts style ARRAYS
              // into {0, 1, ...} and crashes React DOM on web.
              style={hoverCta ? styles.ctaHovering : styles.cta}
              {...(Platform.OS === "web"
                ? ({
                    onMouseEnter: () => setHoverCta(true),
                    onMouseLeave: () => setHoverCta(false),
                  } as any)
                : {})}
            >
              {Platform.OS === "web" ? (
                // @ts-ignore web-only gradient border technique
                <div style={{ padding: 1.2, borderRadius: 3, backgroundImage: hoverCta ? colors.gradient : "rgba(255,255,255,0.22)", boxShadow: hoverCta ? "0 8px 32px rgba(156,29,255,0.35)" : "none", transition: "all .25s ease", transform: hoverCta ? "translateY(-2px)" : "none" }}>
                  {/* @ts-ignore */}
                  <div style={{ background: "#0A0A0E", borderRadius: 2, padding: "10px 20px" }}>
                    {/* @ts-ignore */}
                    <span style={{ color: "#F5F5F2", fontSize: 13, fontWeight: 700, letterSpacing: 1.2 }}>START A PROJECT</span>
                  </div>
                </div>
              ) : (
                <Text style={styles.ctaText}>START A PROJECT</Text>
              )}
            </Pressable>
          </Link>
        )}

        {compact && (
          <Pressable
            onPress={onMenu}
            accessibilityRole="button"
            accessibilityLabel="Open menu"
            style={styles.menuBtn}
          >
            <Text style={styles.menuText}>MENU</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    height: 92,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 36,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
    backgroundColor: "rgba(5,5,7,0.86)",
    zIndex: 50,
  },
  rootCompact: {
    height: 72,
    paddingHorizontal: 20,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    flex: 1,
    minWidth: 0,
  },
  brand: {
    minWidth: 44,
    minHeight: 44,
    justifyContent: "center",
  },
  logo: {
    height: 38,
    width: 132,
  },
  separator: {
    width: 1,
    height: 28,
    backgroundColor: colors.border,
  },
  tagline: {
    color: colors.textSecondary,
    fontSize: 13.5,
    fontFamily: "'Inter',system-ui,sans-serif",
    flexShrink: 1,
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 26,
  },
  nav: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  slash: {
    color: colors.textMuted,
    fontSize: 13,
  },
  navHit: {
    minHeight: 44,
    justifyContent: "center",
  },
  navLabel: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 1.2,
    fontFamily: "'Inter',system-ui,sans-serif",
  },
  cta: {
    minHeight: 44,
    justifyContent: "center",
  },
  ctaHovering: {
    minHeight: 44,
    justifyContent: "center",
    transform: [{ translateY: -2 }],
  },
  ctaText: {
    color: colors.textPrimary,
    fontWeight: "700",
    letterSpacing: 1.2,
    fontSize: 13,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  menuBtn: {
    minWidth: 44,
    minHeight: 44,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
  },
  menuText: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.2,
  },
});
