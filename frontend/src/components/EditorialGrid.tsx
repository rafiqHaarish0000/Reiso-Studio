import React from "react";
import { StyleSheet, View } from "react-native";

interface EditorialGridProps {
  lines?: number[];
  color?: string;
}

/** Light-section editorial guides: vertical lines + nothing else. */
export function EditorialGrid({
  lines = [50, 75],
  color = "rgba(0,0,0,0.08)",
}: EditorialGridProps) {
  return (
    <View style={[styles.root, { pointerEvents: "none" }]}>
      {lines.map((l) => (
        <View
          key={l}
          style={[styles.vLine, { left: `${l}%` as any, backgroundColor: color }]}
        />
      ))}
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
});
