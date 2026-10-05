import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";
import { COMPANY, IMAGES, VALUES } from "../data/site";
import { GradientText, Reveal, SectionHead } from "../components/site/primitives";
import { PageHero, SitePage, WhyChoose, wrapCenter } from "../components/site/sections";

export default function About() {
  return (
    <SitePage active="/about">
      <PageHero
        eyebrow="ABOUT US"
        title={<Text>Technology should make business <GradientText>easier.</GradientText></Text>}
        sub="Not more complicated. That's the whole philosophy behind Reiso Studio."
      />
      <View style={a.wrap}>
        <View style={a.split}>
          <Reveal style={{ flex: 1, flexBasis: 300 }}>
            <Image source={{ uri: IMAGES.aboutTeam }} style={a.img} accessibilityLabel="Reiso Studio at work" />
          </Reveal>
          <View style={a.body}>
            <Reveal delay={100}>
              <Text style={a.h}>We turn ideas into digital products, automation systems, and modern smart experiences.</Text>
            </Reveal>
            <Reveal delay={180}>
              <Text style={a.p}>
                {COMPANY.name} is a growing technology and solutions company based in {COMPANY.city}, {COMPANY.state}.
                We work across software development, mobile applications, SaaS platforms, websites, IoT automation,
                digital marketing, smart interiors, LED mirrors, and automation products.
              </Text>
            </Reveal>
            <Reveal delay={240}>
              <Text style={a.p}>
                Our goal is simple: understand the business problem, build the right solution, and help our
                clients grow. No bloated scopes, no jargon — just honest engineering and design that pays for itself.
              </Text>
            </Reveal>
          </View>
        </View>

        <SectionHead eyebrow="OUR VALUES" title={<Text>What we <GradientText>refuse to compromise.</GradientText></Text>} />
        <View style={a.grid}>
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={(i % 3) * 80} style={a.gridItem}>
              <View style={a.card}>
                <Text style={a.no}>{String(i + 1).padStart(2, "0")}</Text>
                <Text style={a.cardTitle}>{v.title}</Text>
                <Text style={a.cardBlurb}>{v.blurb}</Text>
              </View>
            </Reveal>
          ))}
        </View>

        <Reveal>
          <View style={a.banner}>
            <Image source={{ uri: IMAGES.aboutOffice }} style={a.bannerImg} accessibilityLabel="Reiso Studio workspace" />
          </View>
        </Reveal>
      </View>
      <WhyChoose />
    </SitePage>
  );
}

const a = StyleSheet.create({
  wrap: { ...wrapCenter, paddingBottom: 20 },
  split: { flexDirection: "row", flexWrap: "wrap", gap: 36, alignItems: "center", justifyContent: "center", marginBottom: 60 },
  img: { width: "100%", aspectRatio: 16 / 10, borderRadius: 22, borderWidth: 1, borderColor: colors.border },
  body: { flex: 1, flexBasis: 320, gap: 16 },
  h: { color: colors.textPrimary, fontSize: 28, fontWeight: "700", fontFamily: "'Space Grotesk','Inter',sans-serif", lineHeight: 34, letterSpacing: -0.5 },
  p: { color: colors.textSecondary, fontSize: 16, lineHeight: 26 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 18, justifyContent: "center" },
  gridItem: { flexGrow: 1, flexShrink: 1, flexBasis: 300, minWidth: 0, maxWidth: 380 },
  card: { width: "100%", backgroundColor: "rgba(255,255,255,0.03)", borderWidth: 1, borderColor: colors.borderSubtle, borderRadius: 20, padding: 26 },
  no: { color: colors.cyan, fontSize: 13, fontWeight: "800", letterSpacing: 2 },
  cardTitle: { color: colors.textPrimary, fontSize: 20, fontWeight: "700", fontFamily: "'Space Grotesk','Inter',sans-serif", marginTop: 8 },
  cardBlurb: { color: colors.textSecondary, fontSize: 14, lineHeight: 21, marginTop: 8 },
  banner: { borderRadius: 24, overflow: "hidden", marginTop: 44, borderWidth: 1, borderColor: colors.border },
  bannerImg: { width: "100%", aspectRatio: 21 / 9 },
});
