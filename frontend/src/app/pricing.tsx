import React from "react";
import { Text, View } from "react-native";
import { GradientText } from "../components/site/primitives";
import { PageHero, SitePage, wrapCenter } from "../components/site/sections";
import { useRouter } from "expo-router";
import { CTAButton, Reveal } from "../components/site/primitives";

const TIERS = [
  {
    name: "Launch",
    price: "₹49,999+",
    blurb: "Landing pages, business sites & MVPs to launch fast.",
    points: ["Up to 8 pages", "Responsive + SEO basics", "WhatsApp / lead capture", "2-week delivery"],
  },
  {
    name: "Growth",
    price: "₹1,49,999+",
    blurb: "Mobile apps, SaaS dashboards & portals that scale.",
    points: ["iOS + Android / Web app", "Admin panel + APIs", "Payments & auth", "Deployment + support"],
  },
  {
    name: "Scale",
    price: "Custom",
    blurb: "IoT, automation & dedicated product teams.",
    points: ["Custom scope & SLA", "IoT / hardware + cloud", "Monthly care plans", "Priority support"],
  },
];

export default function Pricing() {
  const router = useRouter();
  return (
    <SitePage active="/pricing">
      <PageHero
        eyebrow="PRICING"
        title={<Text>Honest pricing for <GradientText>ambitious teams.</GradientText></Text>}
        sub="Fixed quotes within 48 hours. Every project starts with a free 30-minute discovery call."
      />
      <View style={[wrapCenter, { flexDirection: "row", flexWrap: "wrap", gap: 18, justifyContent: "center", paddingBottom: 20 }]}>
        {TIERS.map((t, i) => (
          <Reveal key={t.name} delay={i * 90} style={{ flexGrow: 1, flexShrink: 1, flexBasis: 280, maxWidth: 380 }}>
            <View style={{ backgroundColor: "rgba(255,255,255,0.03)", borderWidth: 1, borderColor: "rgba(255,255,255,0.1)", borderRadius: 20, padding: 28, gap: 10 }}>
              <Text style={{ color: "#21B7FF", fontSize: 12, fontWeight: "700", letterSpacing: 2 }}>{t.name.toUpperCase()}</Text>
              <Text style={{ color: "#fff", fontSize: 34, fontWeight: "700", fontFamily: "'Space Grotesk','Inter',sans-serif" }}>{t.price}</Text>
              <Text style={{ color: "#AEB8CC", fontSize: 14, lineHeight: 21 }}>{t.blurb}</Text>
              {t.points.map((p) => (
                <Text key={p} style={{ color: "#D2D9E8", fontSize: 14, marginTop: 4 }}>✓  {p}</Text>
              ))}
              <View style={{ marginTop: 16 }}>
                <CTAButton onPress={() => router.push("/contact")}>Start a Project</CTAButton>
              </View>
            </View>
          </Reveal>
        ))}
      </View>
    </SitePage>
  );
}
