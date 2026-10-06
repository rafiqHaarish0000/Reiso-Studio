import React from "react";
import { useRouter } from "expo-router";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useResponsive } from "../../hooks/useResponsive";
import { Div, Reveal, SafeImage } from "./primitives";

/**
 * Landing showcase sections — BLACK + DARK NAVY + REISO BLUE, violet restrained.
 * ServicesGrid (numbered cards) / Products (visual case cards) / About (split editorial).
 */

const wrap: any = {
  width: "100%",
  maxWidth: 1320,
  alignSelf: "center",
  paddingHorizontal: 32,
  ...(Platform.OS === "web" ? { marginLeft: "auto", marginRight: "auto" } : {}),
};

function Eyebrow({ children }: { children: string }) {
  return (
    <Reveal>
      <Text style={s.eyebrow}>
        <Text style={s.bracket}>[ </Text>
        {children}
        <Text style={s.bracket}> ]</Text>
      </Text>
    </Reveal>
  );
}

function Title({ children, mobile }: { children: React.ReactNode; mobile: boolean }) {
  return (
    <Reveal delay={90}>
      <Text style={[s.title, mobile && s.titleMobile]}>{children}</Text>
    </Reveal>
  );
}

/* ---------------- SERVICES GRID (numbered cards) ---------------- */
const SERVICES = [
  { no: "01", title: "Web Development", blurb: "High-performance websites and portals engineered for speed, SEO and conversion." },
  { no: "02", title: "Mobile App Development", blurb: "Native-quality Android and iOS apps from idea to store launch." },
  { no: "03", title: "UI/UX Design", blurb: "Research-backed interfaces and design systems users love to use." },
  { no: "04", title: "AI & Automation", blurb: "Practical AI features and workflows that remove manual work." },
  { no: "05", title: "Cloud & Backend", blurb: "Secure APIs, databases and infrastructure that scale with you." },
  { no: "06", title: "Digital Product Development", blurb: "End-to-end product design, build, launch and growth support." },
];

export function ServicesGridSection() {
  const { isMobile } = useResponsive();
  return (
    <View style={[s.section, isMobile && s.sectionMobile]}>
      <View style={wrap}>
        <Eyebrow>SERVICES</Eyebrow>
        <Title mobile={isMobile}>
          <Text>Digital products built for impact.</Text>
        </Title>
        <View style={[s.svcGrid, isMobile && s.svcGridMobile]}>
          {SERVICES.map((sv, i) => (
            <SvcCard key={sv.no} sv={sv} delay={(i % 3) * 110} />
          ))}
        </View>
      </View>
    </View>
  );
}

function SvcCard({ sv, delay }: { sv: (typeof SERVICES)[number]; delay: number }) {
  const router = useRouter();
  const [hover, setHover] = React.useState(false);
  return (
    <Reveal delay={delay} style={s.svcItem}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={sv.title}
        onPress={() => router.push("/services")}
        style={[s.card, hover && s.cardHover]}
        {...(Platform.OS === "web"
          ? ({ onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false) } as any)
          : {})}
      >
        <View style={s.svcTop}>
          <Text style={s.svcNo}>{sv.no}</Text>
          <Text style={[s.arrow, hover && s.arrowHover]}>→</Text>
        </View>
        <Text style={s.cardTitle}>{sv.title}</Text>
        <Text style={s.cardBlurb}>{sv.blurb}</Text>
      </Pressable>
    </Reveal>
  );
}

/* ---------------- PRODUCTS ---------------- */
const PRODUCTS = [
  { seed: "reiso-show-dash", cat: "SaaS PLATFORM", title: "Analytics Dashboard", blurb: "Real-time metrics, billing and team workflows in one calm interface." },
  { seed: "reiso-show-app", cat: "MOBILE APP", title: "Commerce App", blurb: "Ordering, payments and live tracking in a fast cross-platform app." },
  { seed: "reiso-show-map", cat: "WEB PLATFORM", title: "Logistics Portal", blurb: "Live maps, routing and fleet visibility for operations teams." },
  { seed: "reiso-show-ai", cat: "AI PRODUCT", title: "Support Assistant", blurb: "An AI assistant trained on your business knowledge base." },
];

export function ProductsSection() {
  const { isMobile } = useResponsive();
  return (
    <View style={[s.section, isMobile && s.sectionMobile]}>
      <View style={wrap}>
        <Eyebrow>PRODUCTS</Eyebrow>
        <Title mobile={isMobile}>
          <Text>Products that move businesses forward.</Text>
        </Title>
        <Reveal delay={180}>
          <Text style={s.sub}>
            High-performance software, web and mobile experiences for ambitious businesses.
          </Text>
        </Reveal>
        <View style={[s.prodGrid, isMobile && s.prodGridMobile]}>
          {PRODUCTS.map((p, i) => (
            <ProdCard key={p.title} p={p} delay={(i % 2) * 120} />
          ))}
        </View>
      </View>
    </View>
  );
}

function ProdCard({ p, delay }: { p: (typeof PRODUCTS)[number]; delay: number }) {
  const router = useRouter();
  const [hover, setHover] = React.useState(false);
  return (
    <Reveal delay={delay} style={s.prodItem}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={p.title}
        onPress={() => router.push("/products")}
        style={[s.prodCard, hover && s.cardHover]}
        {...(Platform.OS === "web"
          ? ({ onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false) } as any)
          : {})}
      >
        <View style={s.imgWrap}>
          <SafeImage
            uri={`https://picsum.photos/seed/${p.seed}/900/560`}
            aspect={16 / 10}
            label={p.title}
            style={hover && s.imgHover}
          />
          <View style={s.imgShade} />
        </View>
        <Text style={s.prodCat}>{p.cat}</Text>
        <Text style={s.cardTitle}>{p.title}</Text>
        <Text style={s.cardBlurb}>{p.blurb}</Text>
        <Text style={[s.explore, hover && s.exploreHover]}>Explore product →</Text>
      </Pressable>
    </Reveal>
  );
}

/* ---------------- ABOUT (split editorial) ---------------- */
export function AboutSection() {
  const { isMobile } = useResponsive();
  return (
    <View style={[s.section, isMobile && s.sectionMobile]}>
      <View style={wrap}>
        <View style={[s.aboutGrid, isMobile && s.aboutGridMobile]}>
          <View style={s.aboutLeft}>
            <Eyebrow>ABOUT</Eyebrow>
            <Reveal delay={90}>
              <Text style={[s.aboutTitle, isMobile && s.aboutTitleMobile]}>
                We build digital experiences that make ambitious ideas possible.
              </Text>
            </Reveal>
            {Platform.OS === "web" ? (
              <Div
                style={{
                  marginTop: "36px",
                  borderRadius: "20px",
                  height: isMobile ? 200 : 260,
                  border: "1px solid rgba(255,255,255,0.10)",
                  background:
                    "radial-gradient(60% 80% at 30% 20%, rgba(30,167,255,0.16), transparent 70%), radial-gradient(50% 60% at 75% 80%, rgba(91,53,255,0.14), transparent 70%), #050914",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Div
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: 0.5,
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                    backgroundSize: "44px 44px",
                  }}
                />
              </Div>
            ) : null}
          </View>
          <View style={s.aboutRight}>
            <Reveal delay={140}>
              <Text style={s.aboutBody}>
                Reiso Studio is a technology studio for businesses that want more than a website.
                We combine strategy, design and engineering to ship software people enjoy using —
                from marketing sites to mobile apps, SaaS platforms and automation.
              </Text>
            </Reveal>
            <Reveal delay={220}>
              <Text style={[s.aboutBody, { marginTop: 18 }]}>
                Small senior team, direct communication, fixed scopes and weekly demos.
                Every engagement starts with understanding your business — then we design
                the smallest product that creates the largest impact.
              </Text>
            </Reveal>
            <Reveal delay={300}>
              <View style={s.aboutPoints}>
                {["Strategy before screens", "Design systems that scale", "Engineering you can maintain"].map(
                  (p) => (
                    <View key={p} style={s.pointRow}>
                      <Text
                        style={{
                          color: "#1EA7FF",
                          fontSize: 15,
                          fontWeight: "700",
                        }}
                      >
                        ✓
                      </Text>
                      <Text style={s.pointText}>{p}</Text>
                    </View>
                  )
                )}
              </View>
            </Reveal>
          </View>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  section: { paddingVertical: 150, backgroundColor: "#000000" },
  sectionMobile: { paddingVertical: 90 },
  eyebrow: {
    color: "#1EA7FF",
    fontSize: 13,
    fontWeight: "500",
    letterSpacing: 2,
    marginBottom: 20,
  },
  bracket: { color: "rgba(255,255,255,0.35)" },
  title: {
    color: "#F5F5F5",
    fontSize: 42,
    fontWeight: "300",
    letterSpacing: -0.5,
    lineHeight: 50,
    fontFamily: "'Inter','Geist',system-ui,sans-serif",
    maxWidth: 640,
  },
  titleMobile: { fontSize: 32, lineHeight: 38, letterSpacing: -0.3 },
  sub: { color: "#9A9A9A", fontSize: 16, lineHeight: 26, marginTop: 18, maxWidth: 640 },
  card: {
    width: "100%",
    backgroundColor: "#000000",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    borderRadius: 17,
    padding: 30,
  },
  cardHover: {
    borderColor: "rgba(255,255,255,0.32)",
    backgroundColor: "rgba(10,18,35,0.5)",
    transform: [{ translateY: -6 }] as any,
  } as any,
  cardTitle: {
    color: "#F5F5F5",
    fontSize: 22,
    fontWeight: "500",
    fontFamily: "'Inter','Geist',system-ui,sans-serif",
    marginTop: 6,
  },
  cardBlurb: { color: "#9A9A9A", fontSize: 15, lineHeight: 24, marginTop: 10 },
  svcGrid: { flexDirection: "row", flexWrap: "wrap", gap: 20, marginTop: 54, justifyContent: "center" },
  svcGridMobile: { gap: 16 },
  svcItem: { flexGrow: 1, flexShrink: 1, flexBasis: 300, minWidth: 0, maxWidth: 420 },
  svcTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 18 },
  svcNo: { color: "#1EA7FF", fontSize: 14, fontWeight: "700", letterSpacing: 2 },
  arrow: { color: "#70788A", fontSize: 22 },
  arrowHover: { color: "#1EA7FF" },
  prodGrid: { flexDirection: "row", flexWrap: "wrap", gap: 22, marginTop: 54, justifyContent: "center" },
  prodGridMobile: { gap: 18 },
  prodItem: { flexGrow: 1, flexShrink: 1, flexBasis: 320, minWidth: 0, maxWidth: 640 },
  prodCard: {
    width: "100%",
    backgroundColor: "#000000",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    borderRadius: 17,
    padding: 18,
    paddingBottom: 26,
  },
  imgWrap: { borderRadius: 12, overflow: "hidden", position: "relative" },
  img: { width: "100%", aspectRatio: 16 / 10, backgroundColor: "#0A1224" },
  imgHover: { transform: [{ scale: 1.04 }] as any },
  imgShade: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 90,
  },
  prodCat: { color: "#1EA7FF", fontSize: 11, fontWeight: "500", letterSpacing: 2, marginTop: 18, paddingHorizontal: 8 },
  explore: { color: "#9A9A9A", fontSize: 14, fontWeight: "600", marginTop: 12, paddingHorizontal: 8 },
  exploreHover: { color: "#1EA7FF" },
  aboutGrid: { flexDirection: "row", flexWrap: "wrap", gap: 70, alignItems: "flex-start", justifyContent: "center" },
  aboutGridMobile: { gap: 36 },
  aboutLeft: { flex: 1, flexBasis: 340, minWidth: 0 },
  aboutRight: { flex: 1, flexBasis: 300, minWidth: 0, paddingTop: 58 },
  aboutTitle: {
    color: "#F5F5F5",
    fontSize: 40,
    fontWeight: "300",
    letterSpacing: -0.5,
    lineHeight: 48,
    fontFamily: "'Inter','Geist',system-ui,sans-serif",
  },
  aboutTitleMobile: { fontSize: 30, lineHeight: 37 },
  aboutBody: { color: "#A8B0C0", fontSize: 17, lineHeight: 28 },
  aboutPoints: { gap: 14, marginTop: 28 },
  pointRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  pointText: { color: "#fff", fontSize: 15, fontWeight: "600" },
});
