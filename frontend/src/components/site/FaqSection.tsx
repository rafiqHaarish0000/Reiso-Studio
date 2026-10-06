import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { FAQS } from "../../data/site";
import { useResponsive } from "../../hooks/useResponsive";
import { Rise } from "./fx";
import { Div } from "./primitives";

/**
 * FaqSection — two-column: label + heading (left), accordion container (right).
 * Single-open accordion with smooth grid-rows animation (no abrupt show/hide).
 */

export function FaqSection() {
  const { isMobile, width } = useResponsive();
  const stacked = isMobile || width < 1024;
  const [open, setOpen] = React.useState<number | null>(0);
  return (
    <View style={[s.section, isMobile && s.sectionMobile]}>
      <View style={s.container}>
        <View style={[s.grid, stacked && s.gridStacked]}>
          <View style={s.left}>
            <Rise y={20}>
              <Text style={s.label}>[ FREQUENTLY ASKED QUESTION ]</Text>
            </Rise>
            <Rise y={28} delay={100}>
              <Text style={[s.heading, stacked && s.headingSmall]}>FAQ</Text>
            </Rise>
          </View>
          <View style={s.right}>
            <Rise y={32} delay={150} duration={1000}>
              <View style={s.box}>
                {FAQS.map((f, i) => {
                  const isOpen = open === i;
                  return (
                    <View key={f.q} style={[s.row, i < FAQS.length - 1 && s.rowBorder]}>
                      <Pressable
                        onPress={() => setOpen(isOpen ? null : i)}
                        accessibilityRole="button"
                        accessibilityLabel={f.q}
                        style={s.qHit}
                      >
                        <Text style={s.q}>{f.q}</Text>
                        <FaqIcon open={isOpen} />
                      </Pressable>
                      {Platform.OS === "web" ? (
                        <Div
                          style={{
                            display: "grid",
                            gridTemplateRows: isOpen ? "1fr" : "0fr",
                            transition: "grid-template-rows 380ms cubic-bezier(.22,1,.36,1)",
                          } as any}
                        >
                          <Div style={{ overflow: "hidden" }}>
                            <Div
                              style={{
                                color: "#A8B0C0",
                                fontSize: "15px",
                                lineHeight: 1.65,
                                fontFamily: "Inter,system-ui,sans-serif",
                                paddingBottom: isOpen ? "24px" : "0px",
                                opacity: isOpen ? 1 : 0,
                                transition: "opacity 300ms ease, padding 380ms ease",
                              }}
                            >
                              {f.a}
                            </Div>
                          </Div>
                        </Div>
                      ) : isOpen ? (
                        <Text style={s.aNative}>{f.a}</Text>
                      ) : null}
                    </View>
                  );
                })}
              </View>
            </Rise>
          </View>
        </View>
      </View>
    </View>
  );
}

function FaqIcon({ open }: { open: boolean }) {
  if (Platform.OS !== "web") {
    return <Text style={s.icon}>{open ? "−" : "+"}</Text>;
  }
  return (
    <Div
      style={{
        color: "#F5F5F5",
        fontSize: "22px",
        fontWeight: 300,
        lineHeight: "22px",
        transform: open ? "rotate(45deg)" : "rotate(0deg)",
        transition: "transform 350ms cubic-bezier(.22,1,.36,1)",
      } as any}
    >
      +
    </Div>
  );
}

const s = StyleSheet.create({
  section: { backgroundColor: "#000000", paddingVertical: 150 },
  sectionMobile: { paddingVertical: 90 },
  container: { width: "100%", maxWidth: 1240, alignSelf: "center", paddingHorizontal: 32 },
  grid: { flexDirection: "row", gap: 80, alignItems: "flex-start" },
  gridStacked: { flexDirection: "column", gap: 40 },
  left: { flex: 0.85, minWidth: 0 },
  right: { flex: 1.15, minWidth: 0 },
  label: { color: "#1EA7FF", fontSize: 12, fontWeight: "500", letterSpacing: 2, marginBottom: 18 },
  heading: {
    color: "#F5F5F5",
    fontSize: 64,
    fontWeight: "300",
    letterSpacing: -2,
    fontFamily: "'Inter','Geist',system-ui,sans-serif",
  },
  headingSmall: { fontSize: 48 },
  box: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.015)",
    paddingHorizontal: 32,
    paddingVertical: 8,
  },
  row: { paddingVertical: 6 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: "rgba(255,255,255,0.08)" },
  qHit: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    minHeight: 72,
  },
  q: { color: "#F5F5F5", fontSize: 17, fontWeight: "400", flex: 1, lineHeight: 25 },
  icon: { color: "#F5F5F5", fontSize: 24, fontWeight: "300" },
  aNative: { color: "#A8B0C0", fontSize: 15, lineHeight: 24, paddingBottom: 20 },
});
