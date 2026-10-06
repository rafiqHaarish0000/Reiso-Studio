import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { useResponsive } from "../../hooks/useResponsive";
import { Rise } from "./fx";
import { LineFieldCanvas } from "./objects";
import { Div } from "./primitives";

/**
 * InnovateSection — 50/50: live data-transmission line field (left),
 * editorial copy (right). Pure black, minimal, cinematic.
 */

export function InnovateSection() {
  const { isMobile, width } = useResponsive();
  const tablet = !isMobile && width < 1024;
  const stacked = isMobile || tablet;
  return (
    <View
      style={[
        s.section,
        stacked && s.sectionStacked,
        Platform.OS === "web" && !stacked ? ({ minHeight: "100vh" } as any) : null,
      ]}
    >
      <View style={s.container}>
        <View style={[s.grid, stacked && s.gridStacked]}>
          {/* LEFT visual */}
          <Rise y={30} duration={1100} style={stacked ? s.visualStackedWrap : s.visualWrap}>
            <Div style={{ position: "relative", width: "100%", height: stacked ? 320 : 480 }}>
              <LineFieldCanvas />
            </Div>
          </Rise>
          {/* RIGHT copy */}
          <View style={s.copy}>
            <Rise y={20}>
              <Text style={s.label}>[ INNOVATE ]</Text>
            </Rise>
            <Rise y={30} delay={100}>
              <Text style={[s.heading, stacked && s.headingSmall]}>
                <Text style={{ color: "#F5F5F5" }}>Transforming Businesses with{"\n"}</Text>
                <Text style={{ color: "#00AFFF" }}>Cutting-Edge Solutions</Text>
              </Text>
            </Rise>
            <Rise y={24} delay={200}>
              <Text style={[s.body, stacked && s.bodySmall]}>
                At Reiso Studio, we specialize in providing innovative software solutions that
                empower businesses to streamline operations, enhance productivity, and achieve
                their goals efficiently. Discover how our solutions can transform your business
                today.
              </Text>
            </Rise>
          </View>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  section: {
    backgroundColor: "#000000",
    minHeight: 720,
    justifyContent: "center",
    paddingVertical: 120,
  },
  sectionStacked: { minHeight: undefined, paddingVertical: 80 },
  container: { width: "100%", maxWidth: 1260, alignSelf: "center", paddingHorizontal: 32 },
  grid: { flexDirection: "row", alignItems: "center", gap: 60 },
  gridStacked: { flexDirection: "column", gap: 44 },
  visualWrap: { flex: 1, flexBasis: 0, minWidth: 0 },
  visualStackedWrap: { width: "100%" },
  copy: { flex: 1, flexBasis: 0, minWidth: 0 },
  label: {
    color: "#00AFFF",
    fontSize: 13,
    fontWeight: "500",
    letterSpacing: 2,
    marginBottom: 22,
  },
  heading: {
    fontSize: 42,
    fontWeight: "300",
    lineHeight: 47,
    letterSpacing: -0.5,
    fontFamily: "'Inter','Geist',system-ui,sans-serif",
  },
  headingSmall: { fontSize: 32, lineHeight: 36 },
  body: { color: "#B7C0D4", fontSize: 21, lineHeight: 30, marginTop: 26, maxWidth: 560 },
  bodySmall: { fontSize: 18, lineHeight: 27 },
});
