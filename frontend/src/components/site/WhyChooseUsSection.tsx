import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { useResponsive } from "../../hooks/useResponsive";
import { Rise } from "./fx";
import { LayersVisual, PanelsVisual } from "./objects";
import { Div } from "./primitives";

/**
 * WhyChooseUsSection — header + two large minimal cards with procedural
 * 3D visuals (stacked glass layers / diagonal planes + orbs).
 */

export function WhyChooseUsSection() {
  const { isMobile, width } = useResponsive();
  const stacked = isMobile || width < 1100;
  return (
    <View style={[s.section, isMobile && s.sectionMobile]}>
      <View style={s.container}>
        <View style={[s.head, stacked && s.headStack]}>
          <Rise y={28}>
            <Text style={[s.title, stacked && s.titleSmall]}>Why Choose Us</Text>
          </Rise>
          <Rise y={18} delay={120}>
            <Text style={s.label}>[ WHY US ]</Text>
          </Rise>
        </View>
        <View style={[s.grid, stacked && s.gridStacked]}>
          <WhyCard
            index={0}
            heading={["Transforming with Cutting-Edge", "Solutions"]}
            body="We blend technology with strategies for actionable insights and Increase in Productivity."
            visual="layers"
            stacked={stacked}
          />
          <WhyCard
            index={1}
            heading={["Trusted By Industry Leaders", "Across Sectors"]}
            body="At Reiso Studio, our expertise and customer focus set us apart. Reiso Studio means accessing cutting-edge AI expertise."
            visual="panels"
            stacked={stacked}
          />
        </View>
      </View>
    </View>
  );
}

function WhyCard({
  index,
  heading,
  body,
  visual,
  stacked,
}: {
  index: number;
  heading: [string, string];
  body: string;
  visual: "layers" | "panels";
  stacked: boolean;
}) {
  const [hover, setHover] = React.useState(false);
  return (
    <Rise y={40} delay={index * 150} duration={1000} style={s.cardWrap}>
      <View
        style={[s.card, hover && s.cardHover]}
        {...(Platform.OS === "web"
          ? ({ onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false) } as any)
          : {})}
      >
        <Text style={[s.cardTitle, stacked && s.cardTitleSmall]}>
          {heading[0]}
          {"\n"}
          {heading[1]}
        </Text>
        <Text style={s.cardBody}>{body}</Text>
        <View style={s.visualBox}>
          <Rise scale={0.92} y={10} delay={index * 150 + 250} duration={1100}>
            <Div
              style={{
                transform: hover ? "scale(1.03)" : "scale(1)",
                transition: "transform 600ms cubic-bezier(.22,1,.36,1)",
              } as any}
            >
              {visual === "layers" ? (
                <LayersVisual w={stacked ? 420 : 480} h={stacked ? 300 : 340} />
              ) : (
                <PanelsVisual w={stacked ? 420 : 480} h={stacked ? 300 : 340} />
              )}
            </Div>
          </Rise>
        </View>
      </View>
    </Rise>
  );
}

const s = StyleSheet.create({
  section: { backgroundColor: "#000000", paddingVertical: 140 },
  sectionMobile: { paddingVertical: 80 },
  container: { width: "100%", maxWidth: 1260, alignSelf: "center", paddingHorizontal: 32 },
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 56,
    gap: 20,
  },
  headStack: { flexDirection: "column", alignItems: "flex-start", gap: 12 },
  title: {
    color: "#F5F5F5",
    fontSize: 40,
    fontWeight: "300",
    letterSpacing: -0.5,
    fontFamily: "'Inter','Geist',system-ui,sans-serif",
  },
  titleSmall: { fontSize: 32 },
  label: { color: "#00AFFF", fontSize: 13, fontWeight: "500", letterSpacing: 2 },
  grid: { flexDirection: "row", gap: 20, justifyContent: "center" },
  gridStacked: { flexDirection: "column" },
  cardWrap: { flex: 1, flexBasis: 0, minWidth: 0 },
  card: {
    backgroundColor: "#000000",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    borderRadius: 16,
    overflow: "hidden",
    paddingHorizontal: 48,
    paddingTop: 52,
    paddingBottom: 0,
    minHeight: 600,
  },
  cardHover: { borderColor: "rgba(255,255,255,0.3)" },
  cardTitle: {
    color: "#F5F5F5",
    fontSize: 34,
    fontWeight: "300",
    lineHeight: 39,
    letterSpacing: -0.5,
    fontFamily: "'Inter','Geist',system-ui,sans-serif",
  },
  cardTitleSmall: { fontSize: 28, lineHeight: 33 },
  cardBody: { color: "#9A9A9A", fontSize: 16, lineHeight: 25, marginTop: 20, maxWidth: 480 },
  visualBox: {
    backgroundColor: "#111111",
    borderRadius: 14,
    marginTop: 44,
    marginBottom: 0,
    height: 380,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
});
