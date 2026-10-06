import React from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import { TESTIMONIALS } from "../../data/site";
import { useResponsive } from "../../hooks/useResponsive";
import { Rise } from "./fx";
import { PanelsVisual } from "./objects";
import { Div } from "./primitives";

/**
 * ReviewsSection — label + heading, featured testimonial, compact tile grid.
 * Content comes from the project's real TESTIMONIALS data.
 */

const AVATARS = [
  "https://randomuser.me/api/portraits/men/41.jpg",
  "https://randomuser.me/api/portraits/women/33.jpg",
  "https://randomuser.me/api/portraits/men/22.jpg",
  "https://randomuser.me/api/portraits/women/65.jpg",
  "https://randomuser.me/api/portraits/men/54.jpg",
  "https://randomuser.me/api/portraits/women/17.jpg",
];

export function ReviewsSection() {
  const { isMobile, width } = useResponsive();
  const tablet = !isMobile && width < 1024;
  const [featured, ...rest] = TESTIMONIALS;
  return (
    <View style={[s.section, isMobile && s.sectionMobile]}>
      <View style={s.container}>
        <Rise y={24}>
          <Text style={s.label}>[ REVIEWS ]</Text>
        </Rise>
        <Rise y={30} delay={100}>
          <Text style={[s.heading, (isMobile || tablet) && s.headingSmall]}>
            Real Results, Trusted Partnerships
          </Text>
        </Rise>

        {/* Featured */}
        <Rise y={44} delay={180} duration={1000}>
          <View style={[s.featured, (isMobile || tablet) && s.featuredStack]}>
            <View style={s.visual}>
              <PanelsVisual w={tablet ? 440 : 400} h={tablet ? 340 : 380} />
            </View>
            <View style={s.quote}>
              <Text style={s.stars}>★★★★★</Text>
              <Text style={[s.quoteText, isMobile && s.quoteTextMobile]}>"{featured.quote}"</Text>
              <View style={s.person}>
                <Image source={{ uri: AVATARS[0] }} style={s.avatar} accessibilityLabel={featured.name} />
                <View>
                  <Text style={s.name}>{featured.name}</Text>
                  <Text style={s.role}>{featured.role}</Text>
                </View>
              </View>
            </View>
          </View>
        </Rise>

        {/* Grid */}
        <View style={[s.grid, tablet && s.gridTablet, isMobile && s.gridMobile]}>
          {rest.map((t, i) => (
            <Rise key={t.name} y={32} delay={i * 100} duration={850} style={s.tileWrap}>
              <View style={s.tile}>
                <Text style={s.tileStars}>★★★★★</Text>
                <Text style={s.tileText}>"{t.quote}"</Text>
                <View style={s.tilePerson}>
                  <Image
                    source={{ uri: AVATARS[(i + 1) % AVATARS.length] }}
                    style={s.tileAvatar}
                    accessibilityLabel={t.name}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={s.tileName}>{t.name}</Text>
                    <Text style={s.tileRole}>{t.role}</Text>
                  </View>
                </View>
              </View>
            </Rise>
          ))}
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  section: { backgroundColor: "#000000", paddingVertical: 150 },
  sectionMobile: { paddingVertical: 90 },
  container: { width: "100%", maxWidth: 1100, alignSelf: "center", paddingHorizontal: 32 },
  label: {
    color: "#1EA7FF",
    fontSize: 13,
    fontWeight: "500",
    letterSpacing: 2,
    textAlign: "center",
    marginBottom: 20,
  },
  heading: {
    color: "#F5F5F5",
    fontSize: 46,
    fontWeight: "300",
    letterSpacing: -1,
    textAlign: "center",
    lineHeight: 54,
    fontFamily: "'Inter','Geist',system-ui,sans-serif",
    marginBottom: 70,
  },
  headingSmall: { fontSize: 32, lineHeight: 38, marginBottom: 48 },
  featured: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.02)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    borderRadius: 20,
    overflow: "hidden",
    padding: 40,
    gap: 44,
    alignItems: "center",
  },
  featuredStack: { flexDirection: "column", padding: 28, gap: 28 },
  visual: {
    flex: 0.9,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#070C18",
    borderWidth: 1,
    borderColor: "rgba(30,167,255,0.22)",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    width: "100%",
  },
  quote: { flex: 1.1, minWidth: 0 },
  stars: { color: "#8ECFFF", fontSize: 15, letterSpacing: 4 },
  quoteText: { color: "#F5F5F5", fontSize: 23, lineHeight: 35, marginTop: 18, fontWeight: "400" },
  quoteTextMobile: { fontSize: 19, lineHeight: 29 },
  person: { flexDirection: "row", alignItems: "center", gap: 14, marginTop: 28 },
  avatar: { width: 48, height: 48, borderRadius: 24, borderWidth: 1, borderColor: "rgba(255,255,255,0.2)" },
  name: { color: "#fff", fontSize: 16, fontWeight: "600" },
  role: { color: "#9A9A9A", fontSize: 13, marginTop: 2 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 16, marginTop: 20, justifyContent: "center" },
  gridTablet: {},
  gridMobile: { flexDirection: "column" },
  tileWrap: { flexGrow: 1, flexShrink: 1, flexBasis: 300, minWidth: 0, maxWidth: 360 },
  tile: {
    backgroundColor: "#000000",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    borderRadius: 16,
    padding: 28,
    width: "100%",
  },
  tileStars: { color: "#8ECFFF", fontSize: 12, letterSpacing: 3 },
  tileText: { color: "#D5DBE5", fontSize: 15, lineHeight: 24, marginTop: 14, flex: 1 },
  tilePerson: { flexDirection: "row", alignItems: "center", gap: 12, marginTop: 20 },
  tileAvatar: { width: 36, height: 36, borderRadius: 18, borderWidth: 1, borderColor: "rgba(255,255,255,0.2)" },
  tileName: { color: "#fff", fontSize: 13, fontWeight: "700" },
  tileRole: { color: "#70788A", fontSize: 12, marginTop: 1 },
});
