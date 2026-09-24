import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";

const BAR_COLORS = [colors.cyan, colors.electricBlue, colors.purple, colors.pink, colors.warmOrange];

export function ProjectAvailability() {
  return (
    <View style={styles.row} accessibilityRole="text" accessibilityLabel="Project slots: open">
      <Text style={styles.label}>PROJECT SLOTS:</Text>
      <View style={styles.bars}>
        {BAR_COLORS.map((c, i) => (
          <View
            key={i}
            style={[
              styles.bar,
              Platform.OS === "web"
                ? ({ backgroundImage: `linear-gradient(180deg, ${c}, ${c}88)` } as any)
                : { backgroundColor: c },
            ]}
          />
        ))}
      </View>
      <Text style={styles.open}>OPEN</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    minHeight: 44,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 11.5,
    letterSpacing: 1,
    fontWeight: "600",
    fontFamily: "'Inter',system-ui,sans-serif",
  },
  bars: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  bar: {
    width: 3.5,
    height: 15,
    borderRadius: 1,
  },
  open: {
    color: colors.textPrimary,
    fontSize: 11.5,
    letterSpacing: 1,
    fontWeight: "600",
    fontFamily: "'Inter',system-ui,sans-serif",
  },
});
