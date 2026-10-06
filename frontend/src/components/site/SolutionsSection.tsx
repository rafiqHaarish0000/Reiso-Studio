import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useResponsive } from "../../hooks/useResponsive";
import { Rise } from "./fx";
import { DiamondCanvas, SphereCanvas, StarCanvas } from "./objects";
import { Div } from "./primitives";

/**
 * SolutionsSection — 3 premium cards with procedural 3D objects.
 * Header: left title + right [ SOLUTIONS ]. Cards: object / title / description.
 */

const CARDS = [
  {
    title: ["Focusing on Your", "Business"],
    desc: "We start by gaining a deep understanding of your business goals.",
    kind: "sphere" as const,
  },
  {
    title: ["Developing Tailored", "Solutions"],
    desc: "Next, our team of experts develops tailored solutions.",
    kind: "star" as const,
  },
  {
    title: ["Scalability and", "Innovation"],
    desc: "We leverage cutting-edge technology to implement seamlessly.",
    kind: "diamond" as const,
  },
];

export function SolutionsSection() {
  const { isMobile, width } = useResponsive();
  const tablet = !isMobile && width < 1024;
  return (
    <View style={[s.section, isMobile && s.sectionMobile]}>
      <View style={s.container}>
        <View style={[s.head, (isMobile || tablet) && s.headStack]}>
          <Rise y={30}>
            <Text style={[s.title, (isMobile || tablet) && s.titleSmall]}>
              Innovative Problem-Solving for Your{"\n"}Business Needs
            </Text>
          </Rise>
          <Rise y={20} delay={120}>
            <Text style={s.label}>[ SOLUTIONS ]</Text>
          </Rise>
        </View>
        <View style={[s.grid, tablet && s.gridTablet, isMobile && s.gridMobile]}>
          {CARDS.map((c, i) => (
            <SolCard key={c.kind} c={c} index={i} mobile={isMobile} />
          ))}
        </View>
      </View>
    </View>
  );
}

function SolCard({
  c,
  index,
  mobile,
}: {
  c: (typeof CARDS)[number];
  index: number;
  mobile: boolean;
}) {
  const [hover, setHover] = React.useState(false);
  return (
    <Rise y={40} delay={index * 130} duration={950} style={s.cardWrap}>
      <View
        style={s.card}
        {...(Platform.OS === "web"
          ? ({ onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false) } as any)
          : {})}
      >
        <Div
          style={{
            alignItems: "center",
            transform: hover ? "scale(1.06) rotate(2deg)" : "scale(1)",
            transition: "transform 600ms cubic-bezier(.22,1,.36,1)",
          } as any}
        >
          {c.kind === "sphere" ? (
            <SphereCanvas size={mobile ? 200 : 230} />
          ) : c.kind === "star" ? (
            <StarCanvas size={mobile ? 200 : 230} />
          ) : (
            <DiamondCanvas size={mobile ? 200 : 230} />
          )}
        </Div>
        <Text style={[s.cardTitle, mobile && s.cardTitleMobile]}>
          {c.title[0]}
          {"\n"}
          {c.title[1]}
        </Text>
        <Text style={s.cardDesc}>{c.desc}</Text>
      </View>
    </Rise>
  );
}

const s = StyleSheet.create({
  section: { backgroundColor: "#000000", paddingVertical: 150 },
  sectionMobile: { paddingVertical: 90 },
  container: { width: "100%", maxWidth: 1260, alignSelf: "center", paddingHorizontal: 32 },
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: 24,
    marginBottom: 64,
  },
  headStack: { flexDirection: "column", alignItems: "flex-start" },
  title: {
    color: "#F5F5F5",
    fontSize: 42,
    fontWeight: "300",
    lineHeight: 50,
    letterSpacing: -0.5,
    fontFamily: "'Inter','Geist','Manrope',system-ui,sans-serif",
  },
  titleSmall: { fontSize: 32, lineHeight: 38 },
  label: {
    color: "#00AFFF",
    fontSize: 13,
    fontWeight: "500",
    letterSpacing: 2,
    fontFamily: "'Inter',system-ui,sans-serif",
  },
  grid: { flexDirection: "row", gap: 16, alignItems: "stretch", justifyContent: "center" },
  gridTablet: { flexWrap: "wrap" },
  gridMobile: { flexDirection: "column" },
  cardWrap: { flex: 1, flexBasis: 0, minWidth: 0 },
  card: {
    backgroundColor: "#000000",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    borderRadius: 17,
    overflow: "hidden",
    paddingHorizontal: 32,
    paddingTop: 48,
    paddingBottom: 56,
    alignItems: "center",
    minHeight: 530,
  },
  cardTitle: {
    color: "#F5F5F5",
    fontSize: 34,
    fontWeight: "300",
    lineHeight: 38,
    textAlign: "center",
    marginTop: 56,
    fontFamily: "'Inter','Geist',system-ui,sans-serif",
  },
  cardTitleMobile: { fontSize: 29, lineHeight: 33 },
  cardDesc: {
    color: "#9A9A9A",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    marginTop: 18,
    maxWidth: 300,
  },
});
