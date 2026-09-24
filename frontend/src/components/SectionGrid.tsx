import React from "react";
import { StyleSheet, View } from "react-native";

interface SectionGridProps {
  columns?: number[];
  /** px from top for the subtle horizontal divider; omit to hide */
  dividerTop?: number;
  lineColor?: string;
}

/** Thin editorial grid lines that guide the composition. */
export function SectionGrid({
  columns = [25, 50, 75],
  dividerTop,
  lineColor = "rgba(255,255,255,0.10)",
}: SectionGridProps) {
  return (
    <View style={[styles.root, { pointerEvents: "none" }]}>
      {columns.map((c) => (
        <View key={c} style={[styles.vLine, { left: `${c}%` as any, backgroundColor: lineColor }]} />
      ))}
      {dividerTop != null && (
        <View style={[styles.hLine, { top: dividerTop, backgroundColor: lineColor }]} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
  },
  vLine: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 1,
  },
  hLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1,
  },
});
