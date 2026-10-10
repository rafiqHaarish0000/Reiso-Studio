import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/colors";
import { useResponsive } from "../../hooks/useResponsive";
import { Div, Logo } from "./primitives";

type DropItem = { label: string; desc?: string; href: string };

const PRODUCT_ITEMS: DropItem[] = [
  { label: "Mobile Applications", desc: "Android · iOS apps", href: "/products" },
  { label: "SaaS Platforms", desc: "Dashboards · billing", href: "/products" },
  { label: "Web Applications", desc: "Portals · tools", href: "/products" },
  { label: "IoT & Automation", desc: "Switches · sensors", href: "/products" },
  { label: "LED Mirrors & Interiors", desc: "Signature collection", href: "/products" },
];

const SERVICE_ITEMS: DropItem[] = [
  { label: "Mobile App Development", desc: "Flutter · React Native", href: "/services" },
  { label: "Web Development", desc: "React · Next.js", href: "/services" },
  { label: "SaaS Development", desc: "Multi-tenant · billing", href: "/services" },
  { label: "UI/UX Design", desc: "Figma · prototypes", href: "/services" },
  { label: "IoT & Automation", desc: "ESP32 · smart home", href: "/services" },
  { label: "Digital Marketing", desc: "Social · SEO", href: "/services" },
];

export function LandingNavbar({ active = "/" }: { active?: string }) {
  const { isMobile, width } = useResponsive();
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState<string | null>(null); // 'products' | 'services' | null
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const compact = isMobile || width < 1100;

  const closeTimer = React.useRef<any>(null);
  const openDrop = (name: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(name);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 180);
  };

  const go = (href: string) => {
    setOpenMenu(null);
    setMobileOpen(false);
    router.push(href as any);
  };

  const dropPanel = (items: DropItem[], viewAllLabel: string, viewAllHref: string) => {
    if (Platform.OS === "web") {
      const D: any = "div";
      return (
        <D
          onMouseEnter={() => openDrop(openMenu as string)}
          onMouseLeave={scheduleClose}
          style={{
            position: "absolute",
            top: "calc(100% + 12px)",
            left: "50%",
            transform: "translateX(-50%)",
            minWidth: 324,
            backgroundColor: "#11131A",
            border: "1px solid rgba(125,146,183,0.22)",
            borderRadius: 20,
            padding: 10,
            boxShadow: "0 28px 70px rgba(0,0,0,0.6), 0 0 35px rgba(58,77,255,0.08)",
            zIndex: 1001,
          }}
        >
          {items.map((it) => (
            <Link key={it.label} href={it.href as any} asChild>
              {/* @ts-ignore web-only anchor styling */}
              <a
                onClick={(e: any) => {
                  e.preventDefault();
                  go(it.href);
                }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  padding: "12px 14px",
                  borderRadius: 12,
                  textDecoration: "none",
                  transition: "background .18s ease",
                }}
                onMouseEnter={(e: any) => ((e.currentTarget as any).style.background = "rgba(102,118,255,0.12)")}
                onMouseLeave={(e: any) => ((e.currentTarget as any).style.background = "transparent")}
              >
                {/* @ts-ignore */}
                  <span style={{ color: "#F5F5F2", fontSize: 14, fontWeight: 600, fontFamily: "Inter,system-ui,sans-serif" }}>
                  {it.label}
                </span>
                {it.desc ? (
                  // @ts-ignore
                  <span style={{ color: "#A4A4AA", fontSize: 12.5, fontFamily: "Inter,system-ui,sans-serif" }}>
                    {it.desc}
                  </span>
                ) : null}
              </a>
            </Link>
          ))}
          <D style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "6px 8px" }} />
          <Link href={viewAllHref as any} asChild>
            {/* @ts-ignore */}
            <a
              onClick={(e: any) => {
                e.preventDefault();
                go(viewAllHref);
              }}
              style={{
                display: "block",
                padding: "10px 14px",
                borderRadius: 10,
                color: "#81CAFF",
                fontSize: 13.5,
                fontWeight: 700,
                textDecoration: "none",
                fontFamily: "Inter,system-ui,sans-serif",
              }}
            >
              {viewAllLabel} →
            </a>
          </Link>
        </D>
      );
    }
    // Native fallback: inline accordion list under the trigger.
    return (
      <View style={styles.nativeDrop}>
        {items.map((it) => (
          <Pressable key={it.label} onPress={() => go(it.href)} style={styles.nativeDropItem}>
            <Text style={styles.nativeDropLabel}>{it.label}</Text>
          </Pressable>
        ))}
        <Pressable onPress={() => go(viewAllHref)} style={styles.nativeDropItem}>
          <Text style={styles.nativeDropAll}>{viewAllLabel} →</Text>
        </Pressable>
      </View>
    );
  };

  const navLink = (label: string, href: string) => {
    const isActive = active === href;
    return (
      <Link key={label} href={href as any} asChild>
        <Pressable
          accessibilityRole="link"
          accessibilityLabel={label}
          style={({ hovered }: any) => [styles.linkHit, (hovered || isActive) && styles.linkHitActive]}
        >
          <Text style={[styles.link, isActive && styles.linkActive]}>{label}</Text>
        </Pressable>
      </Link>
    );
  };

  const dropdownTrigger = (label: string, name: "products" | "services", href: string) => {
    const isOpen = openMenu === name;
    const isActive = active === href;
    if (Platform.OS === "web") {
      const D: any = "div";
      return (
        <D
          key={label}
          onMouseEnter={() => openDrop(name)}
          onMouseLeave={scheduleClose}
          style={{ position: "relative", display: "flex", alignItems: "center" }}
        >
          <Link href={href as any} asChild>
            {/* @ts-ignore web-only flex anchor */}
            <a
              onClick={(e: any) => {
                // Allow click-through to overview page; hover opens menu.
                e.preventDefault();
                go(href);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                padding: "11px 14px",
                borderRadius: 12,
                background: isOpen || isActive ? "rgba(255,255,255,0.10)" : "transparent",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              {/* @ts-ignore */}
              <span
                style={{
                  color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.82)",
                  fontSize: 14,
                  fontWeight: isActive ? 600 : 500,
                  fontFamily: "Inter,system-ui,sans-serif",
                }}
              >
                {label}
              </span>
              {/* @ts-ignore */}
              <span
                style={{
                  color: isOpen ? "#9BCBFF" : "rgba(255,255,255,0.55)",
                  fontSize: 11,
                  transform: isOpen ? "rotate(180deg)" : "none",
                  transition: "transform .2s ease",
                  display: "inline-block",
                }}
              >
                ▾
              </span>
            </a>
          </Link>
          {isOpen ? dropPanel(name === "products" ? PRODUCT_ITEMS : SERVICE_ITEMS, name === "products" ? "View all products" : "View all services", href) : null}
        </D>
      );
    }
    return (
      <View key={label}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${label} menu`}
          onPress={() => setOpenMenu(isOpen ? null : name)}
          style={styles.linkHit}
        >
          <Text style={[styles.link, isActive && styles.linkActive]}>
            {label} {isOpen ? "▴" : "▾"}
          </Text>
        </Pressable>
        {isOpen ? dropPanel(name === "products" ? PRODUCT_ITEMS : SERVICE_ITEMS, name === "products" ? "View all products" : "View all services", href) : null}
      </View>
    );
  };

  const bookConsult = (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Book a consult"
      onPress={() => go("/contact")}
      style={({ hovered }: any) => [styles.cta, hovered && styles.ctaHover]}
    >
      <Text style={styles.ctaText}>Let's talk  ↗</Text>
    </Pressable>
  );

  // ---- Mobile menu overlay ----
  const mobileItem = (label: string, href: string) => (
    <Link key={label} href={href as any} asChild>
      <Pressable onPress={() => go(href)} style={styles.mItem}>
        <Text style={[styles.mLabel, active === href && styles.linkActive]}>{label}</Text>
      </Pressable>
    </Link>
  );

  const mobileAccordion = (label: string, name: string, items: DropItem[], viewAllHref: string) => {
    const expanded = mobileExpanded === name;
    return (
      <View key={label}>
        <Pressable
          onPress={() => setMobileExpanded(expanded ? null : name)}
          accessibilityRole="button"
          style={styles.mItem}
        >
          <Text style={styles.mLabel}>
            {label} {expanded ? "▴" : "▾"}
          </Text>
        </Pressable>
        {expanded ? (
          <View style={styles.mSub}>
            {items.map((it) => (
              <Pressable key={it.label} onPress={() => go(it.href)} style={styles.mSubItem}>
                <Text style={styles.mSubLabel}>{it.label}</Text>
              </Pressable>
            ))}
            <Pressable onPress={() => go(viewAllHref)} style={styles.mSubItem}>
              <Text style={styles.mSubAll}>View all →</Text>
            </Pressable>
          </View>
        ) : null}
      </View>
    );
  };

  const mobileMenu = mobileOpen ? (
    <View style={styles.mobile}>
      {mobileItem("Home", "/")}
      {mobileAccordion("Products", "products", PRODUCT_ITEMS, "/products")}
      {mobileAccordion("Services", "services", SERVICE_ITEMS, "/services")}
      {mobileItem("Free Templates", "/products")}
      {mobileItem("Contact", "/contact")}
      <Pressable onPress={() => go("/contact")} style={styles.mCta}>
        <Text style={styles.ctaText}>Let's talk  ↗</Text>
      </Pressable>
      <Pressable onPress={() => setMobileOpen(false)} style={styles.mClose}>
        <Text style={styles.mCloseText}>CLOSE ✕</Text>
      </Pressable>
    </View>
  ) : null;

  const desktopLinks = (
    <View style={styles.links}>
      {navLink("Home", "/")}
      {dropdownTrigger("Products", "products", "/products")}
      {dropdownTrigger("Services", "services", "/services")}
      {navLink("Free Templates", "/products")}
      {navLink("Contact", "/contact")}
    </View>
  );

  if (Platform.OS === "web") {
    return (
      <Div
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
          zIndex: 1000,
          backgroundColor: "rgba(8,9,14,0.86)",
          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(22px)",
          borderBottom: "1px solid rgba(255,255,255,0.10)",
          boxShadow: "0 12px 35px rgba(0,0,0,0.18)",
        }}
      >
        <Div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            position: "relative",
            paddingLeft: compact ? 20 : 32,
            paddingRight: compact ? 20 : 32,
            height: compact ? 70 : 82,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          <Link href="/" asChild>
            {/* @ts-ignore */}
            <a style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none" }} aria-label="Reiso Studio home">
              <Div style={{ width: 44, height: 44, overflow: "hidden", position: "relative", flexShrink: 0 }}>
                <Div style={{ position: "absolute", left: -17, top: -11 }}><Logo width={78} height={78} /></Div>
              </Div>
              <Div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
                <Div style={{ color: "#F7F8FC", fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: 19, letterSpacing: -0.7 }}>reiso<span style={{ color: "#B4A4FF" }}>.</span></Div>
                <Div style={{ color: "#9299AB", fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 9, letterSpacing: 3, marginTop: 5 }}>STUDIO</Div>
              </Div>
            </a>
          </Link>
          {!compact ? (
            <>
              <Div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", display: "flex", alignItems: "center", gap: 8, padding: 5, borderRadius: 16, border: "1px solid rgba(255,255,255,0.09)", background: "rgba(255,255,255,0.045)", whiteSpace: "nowrap" }}>
                {navLink("Home", "/")}
                {dropdownTrigger("Products", "products", "/products")}
                {dropdownTrigger("Services", "services", "/services")}
                {navLink("Free Templates", "/products")}
                {navLink("Contact", "/contact")}
              </Div>
              <Div style={{ marginLeft: "auto" }}>{bookConsult}</Div>
            </>
          ) : (
            <Pressable
              onPress={() => setMobileOpen((v) => !v)}
              accessibilityRole="button"
              accessibilityLabel="Toggle menu"
              style={styles.burger}
            >
              <Text style={styles.burgerText}>{mobileOpen ? "✕" : "☰"}</Text>
            </Pressable>
          )}
        </Div>
        {compact ? mobileMenu : null}
      </Div>
    );
  }

  // Native
  return (
    <View style={styles.wrapNative}>
      <View style={styles.bar}>
        <Link href="/" asChild>
          <Pressable accessibilityRole="link" accessibilityLabel="Reiso Studio home" style={styles.brand}>
            <Logo width={118} height={36} />
          </Pressable>
        </Link>
        {!compact ? (
          <View style={styles.nativeRight}>
            {desktopLinks}
            {bookConsult}
          </View>
        ) : (
          <Pressable onPress={() => setMobileOpen((v) => !v)} style={styles.burger}>
            <Text style={styles.burgerText}>{mobileOpen ? "✕" : "☰"}</Text>
          </Pressable>
        )}
      </View>
      {compact ? mobileMenu : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapNative: {
    backgroundColor: "#090A10",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.08)",
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 70,
    paddingHorizontal: 20,
  },
  brand: { minWidth: 44, minHeight: 44, justifyContent: "center" },
  links: { flexDirection: "row", alignItems: "center", gap: 26 } as any,
  nativeRight: { flexDirection: "row", alignItems: "center", gap: 22 } as any,
  linkHit: { minHeight: 40, paddingHorizontal: 14, borderRadius: 12, justifyContent: "center", alignItems: "center" },
  linkHitActive: { backgroundColor: "rgba(255,255,255,0.10)" },
  link: {
    color: "rgba(255,255,255,0.72)",
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "'Inter',system-ui,sans-serif",
  },
  linkActive: { color: "#FFFFFF", fontWeight: "600" },
  activeDot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: "#21B7FF", marginTop: 5, alignSelf: "center" },
  nativeDrop: {
    backgroundColor: "#0D0D11",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    borderRadius: 12,
    padding: 6,
    marginTop: 4,
    minWidth: 240,
  },
  nativeDropItem: { paddingHorizontal: 12, paddingVertical: 10 },
  nativeDropLabel: { color: "#F5F5F2", fontSize: 14, fontWeight: "600" },
  nativeDropAll: { color: "#1EA7FF", fontSize: 13, fontWeight: "700" },
  cta: {
    paddingHorizontal: 21,
    height: 46,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6844FF",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.20)",
  },
  ctaHover: { backgroundColor: "#785BFF", transform: [{ translateY: -1 }] as any },
  ctaText: { color: "#FFFFFF", fontWeight: "700", fontSize: 14 },
  burger: {
    minWidth: 44,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
    borderRadius: 13,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  burgerText: { color: "#fff", fontSize: 18 },
  mobile: {
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.10)",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
    backgroundColor: "#0B0C13",
  },
  mItem: {
    minHeight: 56,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  mLabel: { color: colors.textPrimary, fontSize: 17, fontWeight: "600", fontFamily: "'Space Grotesk',sans-serif" },
  mSub: { paddingLeft: 12, paddingVertical: 4 },
  mSubItem: { minHeight: 44, justifyContent: "center" },
  mSubLabel: { color: colors.textSecondary, fontSize: 15 },
  mSubAll: { color: "#1EA7FF", fontSize: 14, fontWeight: "700" },
  mCta: {
    marginTop: 14,
    marginBottom: 10,
    height: 48,
    borderRadius: 13,
    backgroundColor: "#6844FF",
    alignItems: "center",
    justifyContent: "center",
  },
  mClose: { minHeight: 44, alignItems: "center", justifyContent: "center" },
  mCloseText: { color: colors.textSecondary, letterSpacing: 1.4, fontSize: 13 },
});
