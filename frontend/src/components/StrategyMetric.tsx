import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";

interface StrategyMetricProps {
  valueSize: number;
  copySize?: number;
  animatedStyle?: any;
  align?: "left" | "right";
}

export function StrategyMetric({
  valueSize,
  copySize = 19,
  animatedStyle,
  align = "right",
}: StrategyMetricProps) {
  return (
    <View style={[styles.root, { alignItems: align === "right" ? "flex-end" : "flex-start" }, animatedStyle]}>
      <Text style={[styles.value, { fontSize: valueSize, lineHeight: valueSize, textAlign: align }]}>12+</Text>
      <Text style={[styles.copy, { fontSize: copySize, textAlign: align }]}>
        INDUSTRIES WHERE OUR DIGITAL EXPERIENCES{"\n"}CONSISTENTLY OUTPERFORM EXPECTATIONS
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
    maxWidth: 380,
  },
  value: {
    color: colors.textPrimary,
    fontWeight: "500",
    letterSpacing: -5,
    fontFamily: "'Space Grotesk','Inter',system-ui,sans-serif",
  },
  copy: {
    color: colors.textPrimary,
    lineHeight: 21,
    marginTop: 14,
    fontWeight: "400",
    fontFamily: "'Inter',system-ui,sans-serif",
  },
});
