import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { Linking, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/colors";
import { NAV_LINKS } from "../../data/site";
import { useResponsive } from "../../hooks/useResponsive";
import { Div, Logo } from "./primitives";

export function SiteNav({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoverLink, setHoverLink] = useState<string | null>(null);
  const [hoverCta, setHoverCta] = useState(false);
  const { isMobile, isTablet, width } = useResponsive();
  const router = useRouter();
  const isTabletBand = !isMobile && (isTablet || width < 1100);

  const logoEl = (
    <Link href="/" asChild>
      <Pressable accessibilityRole="link" accessibilityLabel="Reiso Studio home" style={styles.brand}>
        <Logo
          width={isMobile ? 118 : isTabletBand ? 128 : 148}
          height={isMobile ? 38 : isTabletBand ? 42 : 46}
        />
      </Pressable>
    </Link>
  );

  const linkEls = NAV_LINKS.map((l) => {
    const isActive = active === l.href;
    const hovered = hoverLink === l.href;
    return (
      <Link key={l.href} href={l.href as any} asChild>
        <Pressable
          accessibilityRole="link"
          accessibilityLabel={l.label}
          style={styles.linkHit}
          {...(Platform.OS === "web"
            ? ({
                onMouseEnter: () => setHoverLink(l.href),
                onMouseLeave: () => setHoverLink(null),
              } as any)
            : {})}
        >
          <Text
            style={[
              styles.link,
              isActive && styles.linkActive,
              hovered && styles.linkHover,
            ]}
          >
            {l.label}
          </Text>
          {isActive ? <View style={styles.activeDot} /> : null}
        </Pressable>
      </Link>
    );
  });

  const ctaEl = (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Start a project"
      onPress={() => router.push("/contact")}
      style={[
        styles.cta,
        isTabletBand && styles.ctaTablet,
        hoverCta && styles.ctaHover,
      ]}
      {...(Platform.OS === "web"
        ? ({
            onMouseEnter: () => setHoverCta(true),
            onMouseLeave: () => setHoverCta(false),
          } as any)
        : {})}
    >
      <Text style={styles.ctaText}>Start a Project</Text>
    </Pressable>
  );

  const burgerEl = (
    <Pressable
      onPress={() => setOpen((v) => !v)}
      accessibilityRole="button"
      accessibilityLabel="Toggle menu"
      style={styles.burger}
    >
      <Text style={styles.burgerText}>{open ? "✕" : "☰"}</Text>
    </Pressable>
  );

  // Native fallback: simple flex row (mobile hides nav anyway).
  const inner = (
    <View style={[styles.bar, isMobile && styles.barMobile]}>
      {logoEl}
      {!isMobile ? <View style={[styles.links, isTabletBand && styles.linksTablet]}>{linkEls}</View> : null}
      {!isMobile ? ctaEl : burgerEl}
    </View>
  );

  // Web: logo far-left, navigation + CTA grouped far-right (reference composition).
  const webInner = (
    <Div
      style={{
        position: "relative",
        width: "100%",
        height: isMobile ? 62 : 64,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Div
        style={{
          position: "absolute",
          left: isMobile ? 20 : 32,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          alignItems: "center",
        }}
      >
        {logoEl}
      </Div>
      {!isMobile ? (
        <Div
          style={{
            position: "absolute",
            right: isMobile ? 20 : 32,
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            alignItems: "center",
            gap: isTabletBand ? 24 : 32,
          }}
        >
          <Div
            style={{
              display: "flex",
              alignItems: "center",
              gap: isTabletBand ? 24 : 32,
            }}
          >
            {linkEls}
          </Div>
          {ctaEl}
        </Div>
      ) : (
        <Div
          style={{
            position: "absolute",
            right: 20,
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            alignItems: "center",
          }}
        >
          {burgerEl}
        </Div>
      )}
    </Div>
  );

  const mobileMenu = open && isMobile ? (
    <View style={styles.mobile}>
      {NAV_LINKS.map((l) => (
        <Link key={l.href} href={l.href as any} asChild>
          <Pressable onPress={() => setOpen(false)} accessibilityRole="link" style={styles.mItem}>
            <Text style={[styles.mLabel, active === l.href && styles.linkActive]}>{l.label}</Text>
          </Pressable>
        </Link>
      ))}
      <Pressable
        onPress={() => {
          setOpen(false);
          router.push("/contact");
        }}
        accessibilityRole="button"
        style={styles.mCta}
      >
        <Text style={styles.ctaText}>Start a Project</Text>
      </Pressable>
    </View>
  ) : null;

  if (Platform.OS === "web") {
    return (
      <Div
        // @ts-ignore web-only fixed glass overlay
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          width: "100vw",
          zIndex: 1000,
          animation: "reiso-nav-in .8s cubic-bezier(.22,1,.36,1) both",
          backgroundColor: isMobile
            ? "rgba(2,5,15,0.72)"
            : scrolled
              ? "rgba(2,5,15,0.78)"
              : "rgba(2,5,15,0.60)",
          backdropFilter: scrolled ? "blur(20px)" : "blur(18px)",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "blur(18px)",
          borderBottom: "1px solid rgba(255,255,255,0.10)",
          boxShadow: "0 8px 35px rgba(0,0,0,0.20), 0 4px 30px rgba(0,0,0,0.18)",
          transition: "background-color 300ms ease, backdrop-filter 300ms ease",
        }}
      >
        <ScrollTracker onScroll={setScrolled} />
        <Div style={{} as any}>
          <style>{`@keyframes reiso-nav-in{from{opacity:0;transform:translateY(-16px)}to{opacity:1;transform:none}}`}</style>
        </Div>
        {webInner}{mobileMenu}
      </Div>
    );
  }
  return (
    <View style={styles.wrapNative}>
      {inner}{mobileMenu}
    </View>
  );
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
  const glowRef = React.useRef<any>(null);
  const cardRef = React.useRef<any>(null);
  const router = useRouter();

  const onMouse = (e: any) => {
    if (Platform.OS !== "web") return;
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card?.getBoundingClientRect || !glow?.style) return;
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    glow.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%,-50%)`;
    glow.style.opacity = "1";
  };
  const onLeave = () => {
    if (glowRef.current?.style) glowRef.current.style.opacity = "0";
  };

  const body = (
    <View style={[styles.ctaCard, isMobile && styles.ctaCardMobile]}>
      <Text style={styles.ctaEyebrow}>LET'S BUILD TOGETHER</Text>
      <Text style={[styles.ctaTitle, isMobile && styles.ctaTitleMobile]}>Have an idea worth building?</Text>
      <Text style={styles.ctaSub}>Let's turn it into a digital experience.</Text>
      <View style={styles.ctaRow}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Start a project"
          onPress={() => router.push("/contact")}
          style={({ hovered }: any) => [styles.bigBtn, hovered && styles.bigBtnHover]}
        >
          <Text style={styles.bigBtnText}>Start a Project →</Text>
        </Pressable>
      </View>
    </View>
  );

  if (Platform.OS === "web") {
    return (
      <Div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 70, paddingBottom: 70 }}>
        <Div
          ref={cardRef}
          onMouseMove={onMouse}
          onMouseLeave={onLeave}
          style={{
            position: "relative",
            overflow: "hidden",
            maxWidth: 1240,
            margin: "0 auto",
            borderRadius: 28,
            border: "1px solid rgba(255,255,255,0.10)",
            backgroundColor: "#030712",
          }}
        >
          <Div
            ref={glowRef}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 420,
              height: 420,
              marginLeft: -210,
              marginTop: -210,
              background: "radial-gradient(circle, rgba(30,167,255,0.14) 0%, rgba(91,53,255,0.08) 45%, transparent 70%)",
              filter: "blur(30px)",
              opacity: 0,
              transition: "opacity .5s ease",
              pointerEvents: "none",
            }}
          />
          <Div
            style={{
              position: "absolute",
              left: "50%",
              top: "-40%",
              width: "80%",
              height: "120%",
              transform: "translateX(-50%)",
              background: "radial-gradient(ellipse at center, rgba(30,167,255,0.10) 0%, transparent 65%)",
              filter: "blur(50px)",
              pointerEvents: "none",
            }}
          />
          {body}
        </Div>
      </Div>
    );
  }
  return <View style={styles.ctaSection}>{body}</View>;
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  const main = [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy policy", href: "/about" },
  ];
  const secondary = [
    { label: "Products", href: "/products" },
    { label: "Templates", href: "/" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ];
  const socials = [
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Facebook", href: "https://www.facebook.com/" },
    { label: "Dribbble", href: "https://dribbble.com/" },
  ];
  const col = (title: string, links: { label: string; href: string; external?: boolean }[]) => (
    <View key={title} style={styles.fCol}>
      <Text style={styles.fTitle}>{title}</Text>
      {links.map((l) =>
        l.external ? (
          <Pressable
            key={l.label}
            accessibilityRole="link"
            accessibilityLabel={l.label}
            onPress={() => Linking.openURL(l.href).catch(() => {})}
            style={styles.fLinkHit}
          >
            <Text style={styles.fLink}>{l.label}</Text>
          </Pressable>
        ) : (
          <Link key={l.label} href={l.href as any} asChild>
            <Pressable accessibilityRole="link" style={styles.fLinkHit}>
              <Text style={styles.fLink}>{l.label}</Text>
            </Pressable>
          </Link>
        )
      )}
    </View>
  );
  const footerInner = (
    <>
      <View style={styles.fTop}>
        <View style={styles.fBrandRow}>
          <Logo width={150} height={42} />
          <Text style={styles.fReg}>®</Text>
        </View>
        <Text style={styles.fTagline}>
          Reiso Studio has the full types of potential for your start-up business.
        </Text>
      </View>
      <View style={styles.fGrid}>
        {col("MAIN NAVIGATION", main)}
        {col("SECONDARY", secondary)}
        {col(
          "SOCIAL",
          socials.map((l) => ({ ...l, external: true }))
        )}
      </View>
      <View style={styles.fBottom}>
        <Text style={styles.fCopy}>© {year} All rights reserved</Text>
      </View>
    </>
  );
  if (Platform.OS === "web") {
    return (
      <Div
        style={{
          background: "linear-gradient(180deg, #000000 0%, #02040C 55%, #0A1030 100%)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Div
          style={{
            backgroundImage: "radial-gradient(rgba(120,160,255,0.4) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            opacity: 0.08,
            maskImage: "linear-gradient(180deg, transparent 30%, black 100%)",
            WebkitMaskImage: "linear-gradient(180deg, transparent 30%, black 100%)",
          }}
        >
          <View style={styles.footer}>{footerInner}</View>
        </Div>
      </Div>
    );
  }
  return <View style={[styles.footer, { backgroundColor: "#02040C" }]}>{footerInner}</View>;
}

const styles = StyleSheet.create({
  wrapNative: {
    backgroundColor: "rgba(2,5,15,0.72)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.10)",
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 66,
    paddingLeft: 32,
    paddingRight: 32,
  },
  barMobile: {
    height: 62,
    paddingLeft: 20,
    paddingRight: 20,
  },
  brand: {
    minWidth: 44,
    minHeight: 44,
    justifyContent: "center",
  } as any,
  links: { flexDirection: "row", alignItems: "center", gap: 30 } as any,
  linksTablet: { gap: 24 } as any,
  linkHit: { paddingHorizontal: 2, minHeight: 44, justifyContent: "center", alignItems: "center" },
  link: {
    color: "rgba(255,255,255,0.82)",
    fontSize: 15,
    fontWeight: "400",
    fontFamily: "'Inter','Geist','Manrope',system-ui,sans-serif",
    letterSpacing: 0.1,
  },
  linkHover: {
    color: "#FFFFFF",
    textShadowColor: "rgba(33,183,255,0.55)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  linkActive: { color: "#FFFFFF" },
  activeDot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: "#21B7FF", marginTop: 5, alignSelf: "center" },
  cta: {
    paddingLeft: 22,
    paddingRight: 22,
    height: 44,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.30)",
    backgroundColor: "rgba(255,255,255,0.03)",
    alignItems: "center",
    justifyContent: "center",
  },
  ctaTablet: {
    paddingLeft: 18,
    paddingRight: 18,
  },
  ctaHover: {
    backgroundColor: "rgba(33,183,255,0.12)",
    borderColor: "rgba(33,183,255,0.75)",
    transform: [{ translateY: -2 }] as any,
    boxShadow: "0 0 25px rgba(33,183,255,0.18)",
  },
  ctaText: { color: "#FFFFFF", fontWeight: "600", fontSize: 14, letterSpacing: 0.2 },
  burger: { minWidth: 44, minHeight: 44, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.2)", borderRadius: 12 },
  burgerText: { color: "#fff", fontSize: 18 },
  mobile: { borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.10)", paddingVertical: 8, paddingHorizontal: 20, backgroundColor: "rgba(2,5,15,0.92)" },
  mItem: { minHeight: 52, justifyContent: "center", borderBottomWidth: 1, borderBottomColor: colors.borderSubtle },
  mLabel: { color: colors.textPrimary, fontSize: 17, fontWeight: "600" },
  mCta: {
    marginTop: 14,
    marginBottom: 10,
    height: 48,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.45)",
    alignItems: "center",
    justifyContent: "center",
  },
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
  bigBtn: {
    borderRadius: 999,
    backgroundColor: "#5B35FF",
    paddingHorizontal: 40,
    paddingVertical: 19,
    minHeight: 58,
    alignItems: "center",
    justifyContent: "center",
  },
  bigBtnHover: { transform: [{ translateY: -2 }] as any, opacity: 0.95 },
  bigBtnText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  bigGhost: { borderRadius: 14, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 32, paddingVertical: 17, backgroundColor: "rgba(255,255,255,0.05)", minHeight: 52, justifyContent: "center" },
  bigGhostText: { color: colors.textPrimary, fontWeight: "700", fontSize: 15 },
  footer: { borderTopWidth: 0, backgroundColor: "transparent", paddingTop: 90 },
  fTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 32,
    flexWrap: "wrap",
    maxWidth: 1240,
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: 32,
  },
  fBrandRow: { flexDirection: "row", alignItems: "flex-start", minWidth: 44, minHeight: 44 },
  fReg: { color: "#F5F5F5", fontSize: 16, marginTop: 2 },
  fTagline: {
    color: "#F5F5F5",
    fontSize: 17,
    lineHeight: 27,
    maxWidth: 380,
    textAlign: "right",
    fontFamily: "'Inter',system-ui,sans-serif",
  },
  fGrid: { flexDirection: "row", flexWrap: "wrap", gap: 32, maxWidth: 1240, width: "100%", alignSelf: "center", paddingHorizontal: 32, marginTop: 64 },
  fBrand: { flexBasis: 280, flexGrow: 1, gap: 10 },
  fDesc: { color: colors.textSecondary, fontSize: 14, lineHeight: 22, marginTop: 12 },
  fContact: { color: colors.textPrimary, fontSize: 13, fontWeight: "600" },
  fCol: { flexBasis: 140, flexGrow: 1, gap: 4 },
  fTitle: { color: colors.textPrimary, fontSize: 13, fontWeight: "700", letterSpacing: 1.5, marginBottom: 10 },
  fLinkHit: { minHeight: 36, justifyContent: "center" },
  fLink: { color: colors.textSecondary, fontSize: 14 },
  fBottom: {
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.08)",
    marginTop: 70,
    paddingVertical: 28,
    paddingHorizontal: 32,
    maxWidth: 1240,
    width: "100%",
    alignSelf: "center",
  },
  fCopy: { color: "#70788A", fontSize: 13 },
});
