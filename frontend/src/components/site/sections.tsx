import React, { useEffect, useState } from "react";
import { Link, useRouter } from "expo-router";
import {
  Image,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../constants/colors";
import {
  APP_CAPABILITIES,
  CATEGORIES,
  COMPANY,
  COMPANIES,
  FAQS,
  IMAGES,
  LED_FEATURES,
  PROCESS,
  PRODUCT_GROUPS,
  PROJECTS,
  SERVICE_OPTIONS,
  SERVICES,
  STATS,
  TEMPLATES,
  TESTIMONIALS,
  WHY_POINTS,
} from "../../data/site";
import { SiteFooter, SiteNav } from "./chrome";
import { CtaSection } from "./CtaSection";
import { CTAButton, CountUp, Div, Float, GradientText, IFrame, Marquee, Reveal, SectionHead } from "./primitives";
import { useResponsive } from "../../hooks/useResponsive";

/* Centered content container. `alignSelf` alone does NOT center on web when
   the parent is a plain block element, so web also gets margin auto. */
export const wrapCenter: any = {
  width: "100%",
  maxWidth: 1240,
  alignSelf: "center",
  paddingHorizontal: 20,
  ...(Platform.OS === "web" ? { marginLeft: "auto", marginRight: "auto" } : {}),
};

/* Page scaffold: sticky nav + content + CTA + footer; Lenis smooth scroll on web. */
export function SitePage({ active, children, cta = true }: { active: string; children: React.ReactNode; cta?: boolean }) {
  useEffect(() => {
    if (Platform.OS !== "web") return;
    let lenis: any = null;
    let rafCb: any = null;
    let dead = false;
    (async () => {
      try {
        if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
        const mod: any = await import("lenis");
        if (dead) return;
        const Lenis = mod.default ?? mod;
        lenis = new Lenis({ lerp: 0.095, smoothWheel: true });
        const gsapMod: any = await import("gsap").catch(() => null);
        if (gsapMod && !dead) {
          const gsap = gsapMod.default ?? gsapMod;
          rafCb = (t: number) => lenis.raf(t * 1000);
          gsap.ticker.add(rafCb);
          gsap.ticker.lagSmoothing(0);
        } else if (!dead) {
          const loop = (t: number) => { lenis.raf(t); rafCb = requestAnimationFrame(loop); };
          rafCb = requestAnimationFrame(loop);
        }
      } catch { /* smooth scroll is progressive enhancement */ }
    })();
    return () => {
      dead = true;
      try {
        if (rafCb) {
          import("gsap").then((m: any) => (m.default ?? m).ticker.remove(rafCb)).catch(() => cancelAnimationFrame(rafCb));
        }
        lenis?.destroy?.();
      } catch { /* noop */ }
    };
  }, []);

  if (Platform.OS === "web") {
    return (
      <Div style={{ backgroundColor: colors.bg0, minHeight: "100vh" }}>
        <SiteNav active={active} />
        {children}
        {cta ? <CtaSection /> : null}
        <SiteFooter />
      </Div>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg0 }}>
      <SiteNav active={active} />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 0 }}>
        {children}
        {cta ? <CtaSection /> : null}
        <SiteFooter />
      </ScrollView>
    </View>
  );
}

export function PageHero({ eyebrow, title, sub }: { eyebrow: string; title: React.ReactNode; sub?: string }) {
  const { isMobile } = useResponsive();
  return (
    <View style={[s.hero, isMobile && s.heroMobile]}>
      <LinearGradient colors={["rgba(30,167,255,0.16)", "rgba(91,53,255,0.10)", "transparent"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={s.heroGlow} />
      <Reveal><Text style={s.eyebrow}>{eyebrow}</Text></Reveal>
      <Reveal delay={100}><Text style={[s.heroTitle, isMobile && s.heroTitleMobile]}>{title}</Text></Reveal>
      {sub ? <Reveal delay={200}><Text style={[s.heroSub, isMobile && s.heroSubMobile]}>{sub}</Text></Reveal> : null}
    </View>
  );
}

/* ---------------- WHAT WE DO ---------------- */
export function WhatWeDo() {
  return (
    <View style={s.section}>
      <SectionHead
        eyebrow="WHAT WE DO"
        title={<Text>Technology that <GradientText>works</GradientText> for your business.</Text>}
        sub="We create digital products, automation solutions, and modern smart interiors that help businesses improve operations, attract customers, and grow faster."
      />
      <View style={s.grid}>
        {CATEGORIES.map((c, i) => (
          <Reveal key={c.title} delay={(i % 3) * 90} style={s.gridItem}>
            <Pressable accessibilityRole="button" accessibilityLabel={c.title} style={({ hovered }: any) => [s.card, hovered && s.cardHover]}>
              <Text style={s.cardIcon}>{c.icon}</Text>
              <Text style={s.cardTitle}>{c.title}</Text>
              <Text style={s.cardBlurb}>{c.blurb}</Text>
              <View style={s.tagRow}>
                {c.points.map((p) => (
                  <View key={p} style={s.tag}><Text style={s.tagText}>{p}</Text></View>
                ))}
              </View>
            </Pressable>
          </Reveal>
        ))}
      </View>
    </View>
  );
}

/* ---------------- FEATURED: MOBILE APPS ---------------- */
export function AppFeature() {
  const router = useRouter();
  return (
    <View style={s.section}>
      <SectionHead eyebrow="FEATURED SERVICE" title={<Text>Your idea. Your app. <GradientText>Built for real users.</GradientText></Text>} />
      <View style={s.split}>
        <Reveal style={{ flex: 1, flexBasis: 320, minWidth: 0 }}>
          <View style={s.phoneWrap}>
            <Float amplitude={9}>
              <Image source={{ uri: IMAGES.appFeature }} style={s.phoneImg} accessibilityLabel="Mobile app preview" />
            </Float>
            <View style={s.floatChip1}><Text style={s.floatChipText}>⚡ 4.9★ rated builds</Text></View>
            <View style={s.floatChip2}><Text style={s.floatChipText}>💳 UPI + payments ready</Text></View>
          </View>
        </Reveal>
        <View style={s.splitBody}>
          <Reveal delay={100}>
            <Text style={s.bodyText}>
              Reiso Studio develops modern, scalable, user-friendly mobile applications at competitive pricing
              for startups, businesses, entrepreneurs, and growing companies — from first sketch to Play Store
              and App Store launch.
            </Text>
          </Reveal>
          <Reveal delay={180}>
            <View style={s.chipGrid}>
              {APP_CAPABILITIES.map((c) => (
                <View key={c} style={s.cap}><Text style={s.capText}>{c}</Text></View>
              ))}
            </View>
          </Reveal>
          <Reveal delay={260}>
            <CTAButton onPress={() => router.push("/contact")}>Build My App</CTAButton>
          </Reveal>
        </View>
      </View>
    </View>
  );
}

/* ---------------- FREE TEMPLATES ---------------- */
export function TemplatesSection({ limit = 10 }: { limit?: number }) {
  const router = useRouter();
  return (
    <View style={s.section} nativeID="templates">
      <SectionHead
        eyebrow="FREE STARTERS"
        title={<Text>10 free templates. <GradientText>Zero cost to start.</GradientText></Text>}
        sub="Browse and download free starter templates. We can also customize, deploy, integrate APIs, fix bugs, or convert any template into a complete production-ready product."
      />
      <View style={s.grid}>
        {TEMPLATES.slice(0, limit).map((t, i) => (
          <Reveal key={t.name} delay={(i % 3) * 80} style={s.gridItem}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`${t.name} template`}
              onPress={() => router.push("/contact")}
              style={({ hovered }: any) => [s.card, hovered && s.cardHover]}
            >
              <Image source={{ uri: `https://picsum.photos/seed/${t.seed}/640/360` }} style={s.thumb} accessibilityLabel={t.name} />
              <View style={s.tplRow}>
                <Text style={s.cardTitle}>{t.name}</Text>
                <View style={s.catPill}><Text style={s.catPillText}>{t.category}</Text></View>
              </View>
              <Text style={s.cardBlurb}>Free starter · customization & deployment available</Text>
              <Text style={s.linkMore}>Get this template →</Text>
            </Pressable>
          </Reveal>
        ))}
      </View>
      <Reveal>
        <View style={{ alignItems: "center", marginTop: 30 }}>
          <CTAButton variant="ghost" onPress={() => router.push("/contact")}>Explore Free Templates</CTAButton>
        </View>
      </Reveal>
    </View>
  );
}

/* ---------------- LED MIRROR & SMART INTERIORS ---------------- */
export function LedSection() {
  const router = useRouter();
  return (
    <View style={s.section}>
      <SectionHead
        eyebrow="SMART INTERIORS"
        title={<Text>Technology meets <GradientText>modern interiors.</GradientText></Text>}
        sub="Elegant LED mirror solutions for homes, salons, hotels, offices, showrooms, bathrooms, dressing areas, and commercial interiors."
      />
      <Reveal>
        <View style={s.ledHero}>
          <Image source={{ uri: IMAGES.ledMain }} style={s.ledImg} accessibilityLabel="Luxury LED mirror interior" />
          <LinearGradient colors={["transparent", "rgba(5,5,7,0.85)"]} style={s.ledShade} />
          <View style={s.ledOverlay}>
            <Text style={s.ledTitle}>The Statement Mirror Collection</Text>
            <Text style={s.ledSub}>Backlit · Touch-sensitive · Anti-fog · Made to measure</Text>
          </View>
        </View>
      </Reveal>
      <View style={s.chipGrid}>
        {LED_FEATURES.map((f, i) => (
          <Reveal key={f} delay={(i % 5) * 60}>
            <View style={s.cap}><Text style={s.capText}>✦ {f}</Text></View>
          </Reveal>
        ))}
      </View>
      <View style={s.trio}>
        {[IMAGES.ledDetail1, IMAGES.ledDetail2, IMAGES.ledDetail3].map((uri, i) => (
          <Reveal key={i} delay={i * 100} style={{ flex: 1, flexBasis: 220 }}>
            <Image source={{ uri }} style={s.trioImg} accessibilityLabel="Smart interior product" />
          </Reveal>
        ))}
      </View>
      <Reveal>
        <View style={{ alignItems: "center", marginTop: 30 }}>
          <CTAButton onPress={() => router.push("/products")}>Explore Interior Range</CTAButton>
        </View>
      </Reveal>
    </View>
  );
}

/* ---------------- PROJECTS / OUR WORK ---------------- */
export function WorkSection() {
  const router = useRouter();
  return (
    <View style={s.section}>
      <SectionHead
        eyebrow="OUR WORK"
        title={<Text>Built for <GradientText>real businesses.</GradientText></Text>}
        sub="A snapshot of recent launches. Live project links plug straight into these cards whenever you're ready."
      />
      <View style={s.grid}>
        {PROJECTS.map((p, i) => (
          <Reveal key={p.name} delay={(i % 3) * 80} style={s.gridItem}>
            <View style={s.card}>
              <Image source={{ uri: `https://picsum.photos/seed/${p.seed}/640/360` }} style={s.thumb} accessibilityLabel={p.name} />
              <Text style={s.projCat}>{p.category}</Text>
              <Text style={s.cardTitle}>{p.name}</Text>
              <Text style={s.cardBlurb}>{p.blurb}</Text>
              <View style={s.tagRow}>
                {p.stack.map((t) => (
                  <View key={t} style={s.tag}><Text style={s.tagText}>{t}</Text></View>
                ))}
              </View>
              <Pressable onPress={() => router.push("/contact")} accessibilityRole="button" style={s.liveBtn}>
                <Text style={s.linkMore}>View Live Project →</Text>
              </Pressable>
            </View>
          </Reveal>
        ))}
      </View>
    </View>
  );
}

/* ---------------- TRUSTED BY ---------------- */
export function TrustedBy() {
  return (
    <View style={s.strip}>
      <Reveal><Text style={s.stripTitle}>Trusted by businesses that believe in better technology.</Text></Reveal>
      <Marquee>
        {COMPANIES.map((c) => (
          <View key={c} style={s.logoChip}><Text style={s.logoText}>{c}</Text></View>
        ))}
      </Marquee>
    </View>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
export function Testimonials() {
  return (
    <View style={s.section}>
      <SectionHead eyebrow="CLIENT LOVE" title={<Text>Loved by founders, <GradientText>trusted by owners.</GradientText></Text>} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.tRow} snapToInterval={336} decelerationRate="fast">
        {TESTIMONIALS.map((t, i) => (
          <View key={i} style={s.tCard}>
            <Text style={s.stars}>★★★★★</Text>
            <Text style={s.tQuote}>"{t.quote}"</Text>
            <Text style={s.tName}>{t.name}</Text>
            <Text style={s.tRole}>{t.role}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

/* ---------------- WHY CHOOSE US ---------------- */
export function WhyChoose() {
  return (
    <View style={s.section}>
      <SectionHead eyebrow="WHY REISO" title={<Text>One partner for <GradientText>software + interiors.</GradientText></Text>} />
      <View style={s.statRow}>
        {STATS.map((st, i) => (
          <Reveal key={st.label} delay={i * 80} style={s.statItem}>
            <View style={s.stat}>
              <CountUp value={st.value} suffix={st.suffix} style={s.statNum} />
              <Text style={s.statLabel}>{st.label}</Text>
            </View>
          </Reveal>
        ))}
      </View>
      <View style={s.grid}>
        {WHY_POINTS.map((w, i) => (
          <Reveal key={w} delay={(i % 2) * 70} style={s.whyItem}>
            <View style={s.whyRow}>
              <LinearGradient colors={["#1EA7FF", "#5B35FF"]} style={s.tick}><Text style={s.tickText}>✓</Text></LinearGradient>
              <Text style={s.whyText}>{w}</Text>
            </View>
          </Reveal>
        ))}
      </View>
    </View>
  );
}

/* ---------------- PROCESS ---------------- */
export function ProcessSection() {
  return (
    <View style={s.section}>
      <SectionHead eyebrow="HOW IT WORKS" title={<Text>From idea to launch in <GradientText>5 steps.</GradientText></Text>} />
      <View style={s.process}>
        {PROCESS.map((p, i) => (
          <Reveal key={p.no} delay={i * 80}>
            <View style={s.step}>
              <View style={s.stepNo}><Text style={s.stepNoText}>{p.no}</Text></View>
              <View style={{ flex: 1 }}>
                <Text style={s.stepTitle}>{p.title}</Text>
                <Text style={s.stepBlurb}>{p.blurb}</Text>
              </View>
            </View>
          </Reveal>
        ))}
      </View>
    </View>
  );
}

/* ---------------- CONTACT CHANNELS ---------------- */
export function ContactChannels() {
  const items = [
    { icon: "📞", title: "Call Us", sub: COMPANY.phoneDisplay, href: COMPANY.phoneHref },
    { icon: "💬", title: "WhatsApp Us", sub: "Instant replies, 9am–9pm", href: COMPANY.whatsapp },
    { icon: "✉️", title: "Send Email", sub: COMPANY.email, href: `mailto:${COMPANY.email}` },
    { icon: "🚀", title: "Start a Project", sub: "Tell us your idea", href: "/contact" },
  ];
  return (
    <View style={s.grid}>
      {items.map((c, i) => {
        const internal = c.href.startsWith("/");
        const body = (
          <View style={{ alignItems: "center" }}>
            <Text style={s.cardIcon}>{c.icon}</Text>
            <Text style={s.cardTitle}>{c.title}</Text>
            <Text style={s.cardBlurb}>{c.sub}</Text>
          </View>
        );
        return (
          <Reveal key={c.title} delay={i * 70} style={s.gridItem}>
            {internal ? (
              <Link href={c.href as any} asChild>
                <Pressable accessibilityRole="link" accessibilityLabel={c.title} style={s.card}>
                  {body}
                </Pressable>
              </Link>
            ) : (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={c.title}
                onPress={() => Linking.openURL(c.href).catch(() => {})}
                style={({ hovered }: any) => [s.card, hovered && s.cardHover, { alignItems: "center" }]}
              >
                {body}
              </Pressable>
            )}
          </Reveal>
        );
      })}
    </View>
  );
}

/* ---------------- ENQUIRY FORM ---------------- */
export function EnquiryForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", service: "Mobile App", budget: "", message: "" });
  const [sent, setSent] = useState(false);
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const submit = () => {
    const text = `Hi Reiso Studio! I'm ${form.name || "—"} (${form.email || "—"}, ${form.phone || "—"}). Company: ${form.company || "—"}. Service: ${form.service}. Budget: ${form.budget || "—"}. Details: ${form.message || "—"}`;
    Linking.openURL(`https://wa.me/918637470037?text=${encodeURIComponent(text)}`).catch(() => {});
    setSent(true);
  };
  const field = (label: string, key: string, props: any = {}) => (
    <View style={s.fField}>
      <Text style={s.fLabel}>{label}</Text>
      <TextInput
        value={(form as any)[key]}
        onChangeText={(v) => set(key, v)}
        placeholderTextColor="#66666D"
        placeholder={label}
        style={s.input}
        {...props}
      />
    </View>
  );
  return (
    <View style={s.formCard}>
      <Text style={s.formTitle}>Start your project</Text>
      <Text style={s.formSub}>Fill this in — it opens WhatsApp with your enquiry ready to send. We reply within 24 hours.</Text>
      <View style={s.fGrid}>
        {field("Name *", "name")}
        {field("Email *", "email", { keyboardType: "email-address", autoCapitalize: "none" })}
        {field("Phone Number *", "phone", { keyboardType: "phone-pad" })}
        {field("Company Name", "company")}
      </View>
      <Text style={s.fLabel}>Service Required</Text>
      <View style={s.optRow}>
        {SERVICE_OPTIONS.map((o) => (
          <Pressable key={o} onPress={() => set("service", o)} style={[s.opt, form.service === o && s.optActive]}>
            <Text style={[s.optText, form.service === o && s.optTextActive]}>{o}</Text>
          </Pressable>
        ))}
      </View>
      {field("Project Budget (e.g. ₹50k – ₹1L)", "budget")}
      <View style={s.fField}>
        <Text style={s.fLabel}>Project Description *</Text>
        <TextInput
          value={form.message}
          onChangeText={(v) => set("message", v)}
          placeholder="Tell us about your idea…"
          placeholderTextColor="#66666D"
          multiline
          numberOfLines={4}
          style={[s.input, { minHeight: 110, textAlignVertical: "top" }]}
        />
      </View>
      <Pressable onPress={submit} accessibilityRole="button" style={({ hovered }: any) => [s.submit, hovered && { opacity: 0.9 }]}>
        <LinearGradient colors={["#1EA7FF", "#5B35FF"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.submitInner}>
          <Text style={s.submitText}>{sent ? "✓ Opening WhatsApp…" : "Send Enquiry via WhatsApp"}</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
}

/* ---------------- MAP ---------------- */
export function MapBlock() {
  if (Platform.OS === "web") {
    return (
      <Div style={{ borderRadius: 20, overflow: "hidden", border: "1px solid rgba(255,255,255,0.12)", marginTop: 24 }}>
        <IFrame
          title="Reiso Studio location map"
          src={`https://www.google.com/maps?q=${encodeURIComponent(COMPANY.mapQuery)}&output=embed`}
          style={{ width: "100%", height: 380, border: 0 }}
          loading="lazy"
        />
      </Div>
    );
  }
  return (
    <Pressable
      onPress={() => Linking.openURL(`https://www.google.com/maps/search/${encodeURIComponent(COMPANY.mapQuery)}`).catch(() => {})}
      style={s.mapCard}
    >
      <Text style={s.cardTitle}>📍 {COMPANY.city}</Text>
      <Text style={s.cardBlurb}>{COMPANY.state} — tap to open in Maps</Text>
    </Pressable>
  );
}

/* ---------------- FAQ ---------------- */
export function FaqList() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <View style={{ gap: 12 }}>
      {FAQS.map((f, i) => (
        <Reveal key={f.q} delay={i * 60}>
          <Pressable onPress={() => setOpen(open === i ? null : i)} style={s.faq}>
            <View style={s.faqRow}>
              <Text style={s.faqQ}>{f.q}</Text>
              <Text style={s.faqX}>{open === i ? "−" : "+"}</Text>
            </View>
            {open === i ? <Text style={s.faqA}>{f.a}</Text> : null}
          </Pressable>
        </Reveal>
      ))}
    </View>
  );
}

/* ---------------- SERVICE / PRODUCT GRIDS ---------------- */
export function ServiceGrid() {
  return (
    <View style={s.grid}>
      {SERVICES.map((sv, i) => (
        <Reveal key={sv.title} delay={(i % 3) * 70} style={s.gridItem}>
          <Pressable accessibilityRole="button" style={({ hovered }: any) => [s.card, hovered && s.cardHover]}>
            <Text style={s.svcNo}>{String(i + 1).padStart(2, "0")}</Text>
            <Text style={s.cardTitle}>{sv.title}</Text>
            <Text style={s.cardBlurb}>{sv.blurb}</Text>
            <View style={s.tagRow}>
              {sv.tags.map((t) => (
                <View key={t} style={s.tag}><Text style={s.tagText}>{t}</Text></View>
              ))}
            </View>
          </Pressable>
        </Reveal>
      ))}
    </View>
  );
}

export function ProductGroups() {
  const router = useRouter();
  return (
    <View style={{ gap: 48 }}>
      {PRODUCT_GROUPS.map((g) => (
        <View key={g.title}>
          <Reveal>
            <Text style={s.groupTitle}>{g.title}</Text>
          </Reveal>
          <View style={s.grid}>
            {g.items.map((p, i) => (
              <Reveal key={p.name} delay={(i % 3) * 70} style={s.gridItem}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={p.name}
                  onPress={() => router.push("/contact")}
                  style={({ hovered }: any) => [s.card, hovered && s.cardHover]}
                >
                  <Image source={{ uri: `https://picsum.photos/seed/${p.seed}/640/360` }} style={s.thumb} accessibilityLabel={p.name} />
                  <Text style={s.projCat}>{p.category}</Text>
                  <Text style={s.cardTitle}>{p.name}</Text>
                  <Text style={s.cardBlurb}>{p.blurb}</Text>
                  <View style={s.prodCta}><Text style={s.linkMore}>{p.cta} →</Text></View>
                </Pressable>
              </Reveal>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}

const s = StyleSheet.create({
  hero: { ...wrapCenter, alignItems: "center", paddingTop: 134, paddingBottom: 40 },
  heroMobile: { paddingTop: 110, paddingBottom: 28 },
  heroGlow: { position: "absolute", top: 0, left: 0, right: 0, height: 480, opacity: 0.9 },
  eyebrow: { color: colors.cyan, fontSize: 12, fontWeight: "700", letterSpacing: 3, marginBottom: 18, textAlign: "center" },
  heroTitle: {
    color: colors.textPrimary, fontSize: 52, fontWeight: "700", textAlign: "center",
    letterSpacing: -2, fontFamily: "'Space Grotesk','Inter',sans-serif", lineHeight: 58,
  },
  heroTitleMobile: { fontSize: 34, lineHeight: 40, letterSpacing: -1 },
  heroSub: { color: colors.textSecondary, fontSize: 17, textAlign: "center", marginTop: 16, maxWidth: 680, lineHeight: 26 },
  heroSubMobile: { fontSize: 15, lineHeight: 23 },
  section: { ...wrapCenter, paddingVertical: 64 },
  strip: { paddingVertical: 48, borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.borderSubtle, backgroundColor: "rgba(255,255,255,0.015)" },
  stripTitle: { color: colors.textSecondary, textAlign: "center", fontSize: 13, letterSpacing: 2, fontWeight: "600", marginBottom: 26, paddingHorizontal: 20 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 18, justifyContent: "center" },
  /* Flex-item sizing lives on the Reveal wrapper so grid children align. */
  gridItem: { flexGrow: 1, flexShrink: 1, flexBasis: 300, minWidth: 0, maxWidth: 400 },
  whyItem: { flexGrow: 1, flexShrink: 1, flexBasis: 320, minWidth: 0, maxWidth: 560 },
  statItem: { flexGrow: 1, flexShrink: 1, flexBasis: 150, minWidth: 0 },
  card: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.03)",
    borderWidth: 1, borderColor: colors.borderSubtle, borderRadius: 20, padding: 26,
  },
  cardHover: { borderColor: "rgba(30,167,255,0.45)", backgroundColor: "rgba(255,255,255,0.05)", transform: [{ translateY: -4 }] as any },
  cardIcon: { fontSize: 34, marginBottom: 14 },
  cardTitle: { color: colors.textPrimary, fontSize: 20, fontWeight: "700", fontFamily: "'Space Grotesk','Inter',sans-serif", marginTop: 4 },
  cardBlurb: { color: colors.textSecondary, fontSize: 14, lineHeight: 21, marginTop: 8 },
  tagRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 14 },
  tag: { borderWidth: 1, borderColor: colors.borderSubtle, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6, backgroundColor: "rgba(255,255,255,0.03)" },
  tagText: { color: colors.textSecondary, fontSize: 11, fontWeight: "600", letterSpacing: 0.5 },
  linkMore: { color: colors.cyan, fontSize: 13, fontWeight: "700", marginTop: 14 },
  split: { flexDirection: "row", flexWrap: "wrap", gap: 40, alignItems: "center", justifyContent: "center" },
  splitBody: { flex: 1, flexBasis: 320, gap: 22 },
  bodyText: { color: colors.textSecondary, fontSize: 16, lineHeight: 26 },
  phoneWrap: { alignItems: "center", position: "relative" },
  phoneImg: { width: 300, height: 380, borderRadius: 24, borderWidth: 1, borderColor: colors.border },
  floatChip1: { position: "absolute", top: 60, left: 0, backgroundColor: "rgba(10,10,14,0.85)", borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10 },
  floatChip2: { position: "absolute", bottom: 70, right: 0, backgroundColor: "rgba(10,10,14,0.85)", borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10 },
  floatChipText: { color: colors.textPrimary, fontSize: 12, fontWeight: "700" },
  chipGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10, justifyContent: "center", marginTop: 26 },
  cap: { borderWidth: 1, borderColor: colors.border, borderRadius: 999, paddingHorizontal: 16, paddingVertical: 10, backgroundColor: "rgba(255,255,255,0.04)" },
  capText: { color: colors.textPrimary, fontSize: 12, fontWeight: "600", letterSpacing: 0.4 },
  thumb: { width: "100%", aspectRatio: 16 / 9, borderRadius: 12, marginBottom: 16, backgroundColor: "#111" },
  tplRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10 },
  catPill: { backgroundColor: "rgba(16,221,244,0.12)", borderWidth: 1, borderColor: "rgba(16,221,244,0.35)", borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 },
  catPillText: { color: colors.cyan, fontSize: 11, fontWeight: "700" },
  ledHero: { borderRadius: 24, overflow: "hidden", position: "relative", borderWidth: 1, borderColor: colors.border },
  ledImg: { width: "100%", aspectRatio: 16 / 8 },
  ledShade: { position: "absolute", left: 0, right: 0, bottom: 0, height: 220 },
  ledOverlay: { position: "absolute", left: 28, bottom: 24, right: 28 },
  ledTitle: { color: "#fff", fontSize: 30, fontWeight: "700", fontFamily: "'Space Grotesk','Inter',sans-serif" },
  ledSub: { color: "rgba(255,255,255,0.75)", fontSize: 14, marginTop: 6 },
  trio: { flexDirection: "row", flexWrap: "wrap", gap: 18, marginTop: 26, justifyContent: "center" },
  trioImg: { width: "100%", aspectRatio: 1, borderRadius: 18, borderWidth: 1, borderColor: colors.borderSubtle },
  projCat: { color: colors.magenta, fontSize: 11, fontWeight: "700", letterSpacing: 1.5, marginTop: 4 },
  liveBtn: { marginTop: 4, minHeight: 44, justifyContent: "center" },
  prodCta: { marginTop: 6, minHeight: 44, justifyContent: "center" },
  logoChip: { paddingHorizontal: 34, paddingVertical: 14, marginHorizontal: 8, borderWidth: 1, borderColor: colors.borderSubtle, borderRadius: 999, backgroundColor: "rgba(255,255,255,0.02)" },
  logoText: { color: colors.textSecondary, fontSize: 15, fontWeight: "700", letterSpacing: 1 },
  tRow: { gap: 18, paddingHorizontal: 20 },
  tCard: { width: 320, backgroundColor: "rgba(255,255,255,0.03)", borderWidth: 1, borderColor: colors.borderSubtle, borderRadius: 20, padding: 26, gap: 10 },
  stars: { color: "#FFD15C", fontSize: 14, letterSpacing: 3 },
  tQuote: { color: colors.textPrimary, fontSize: 15, lineHeight: 24 },
  tName: { color: colors.textPrimary, fontSize: 14, fontWeight: "700", marginTop: 6 },
  tRole: { color: colors.textMuted, fontSize: 12 },
  statRow: { flexDirection: "row", flexWrap: "wrap", gap: 18, justifyContent: "center", marginBottom: 34 },
  stat: { width: "100%", alignItems: "center", backgroundColor: "rgba(255,255,255,0.03)", borderWidth: 1, borderColor: colors.borderSubtle, borderRadius: 20, padding: 26 },
  statNum: { color: colors.textPrimary, fontSize: 44, fontWeight: "700", fontFamily: "'Space Grotesk','Inter',sans-serif" },
  statLabel: { color: colors.textSecondary, fontSize: 12, letterSpacing: 1.5, fontWeight: "600", marginTop: 6, textAlign: "center" },
  whyRow: { width: "100%", flexDirection: "row", alignItems: "center", gap: 14, backgroundColor: "rgba(255,255,255,0.03)", borderWidth: 1, borderColor: colors.borderSubtle, borderRadius: 16, padding: 18 },
  tick: { width: 30, height: 30, borderRadius: 15, alignItems: "center", justifyContent: "center" },
  tickText: { color: "#fff", fontWeight: "800", fontSize: 14 },
  whyText: { color: colors.textPrimary, fontSize: 15, fontWeight: "600", flex: 1 },
  process: { gap: 16, maxWidth: 820, width: "100%", alignSelf: "center" },
  step: { flexDirection: "row", gap: 20, backgroundColor: "rgba(255,255,255,0.03)", borderWidth: 1, borderColor: colors.borderSubtle, borderRadius: 20, padding: 24, alignItems: "flex-start" },
  stepNo: { width: 56, height: 56, borderRadius: 28, borderWidth: 1, borderColor: "rgba(91,53,255,0.5)", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(91,53,255,0.08)" },
  stepNoText: { color: colors.magenta, fontWeight: "800", fontSize: 16 },
  stepTitle: { color: colors.textPrimary, fontSize: 19, fontWeight: "700", fontFamily: "'Space Grotesk','Inter',sans-serif" },
  stepBlurb: { color: colors.textSecondary, fontSize: 14, lineHeight: 22, marginTop: 6 },
  groupTitle: { color: colors.textPrimary, fontSize: 26, fontWeight: "700", fontFamily: "'Space Grotesk','Inter',sans-serif", marginBottom: 20, paddingHorizontal: 4 },
  svcNo: { color: colors.cyan, fontSize: 13, fontWeight: "800", letterSpacing: 2 },
  formCard: { backgroundColor: "rgba(255,255,255,0.03)", borderWidth: 1, borderColor: colors.border, borderRadius: 24, padding: 30, gap: 16, marginTop: 8 },
  formTitle: { color: colors.textPrimary, fontSize: 26, fontWeight: "700", fontFamily: "'Space Grotesk','Inter',sans-serif" },
  formSub: { color: colors.textSecondary, fontSize: 14, lineHeight: 21, marginTop: -8 },
  fGrid: { flexDirection: "row", flexWrap: "wrap", gap: 14 },
  fField: { flexBasis: 220, flexGrow: 1, gap: 8 },
  fLabel: { color: colors.textSecondary, fontSize: 12, fontWeight: "700", letterSpacing: 1 },
  input: { backgroundColor: "rgba(0,0,0,0.4)", borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, color: colors.textPrimary, fontSize: 15 },
  optRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  opt: { borderWidth: 1, borderColor: colors.borderSubtle, borderRadius: 999, paddingHorizontal: 14, paddingVertical: 9 },
  optActive: { borderColor: colors.magenta, backgroundColor: "rgba(91,53,255,0.12)" },
  optText: { color: colors.textSecondary, fontSize: 12, fontWeight: "600" },
  optTextActive: { color: "#fff" },
  submit: { borderRadius: 14, overflow: "hidden", marginTop: 6 },
  submitInner: { paddingVertical: 17, alignItems: "center" },
  submitText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  mapCard: { backgroundColor: "rgba(255,255,255,0.03)", borderWidth: 1, borderColor: colors.border, borderRadius: 20, padding: 30, marginTop: 24, gap: 6 },
  faq: { backgroundColor: "rgba(255,255,255,0.03)", borderWidth: 1, borderColor: colors.borderSubtle, borderRadius: 16, padding: 20 },
  faqRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 12 },
  faqQ: { color: colors.textPrimary, fontSize: 16, fontWeight: "700", flex: 1 },
  faqX: { color: colors.magenta, fontSize: 22, fontWeight: "800" },
  faqA: { color: colors.textSecondary, fontSize: 14, lineHeight: 22, marginTop: 10 },
});
