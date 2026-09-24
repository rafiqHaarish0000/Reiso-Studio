import React from "react";
import { Animated, StyleSheet, View } from "react-native";

export interface HeadlineLine {
  v: Animated.Value;
  text: string;
}

interface BuildHeadlineProps {
  lines: HeadlineLine[];
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  /** desktop/tablet keep the staggered editorial offsets; mobile aligns left */
  staggered?: boolean;
}

/**
 * WE / BUILD / DIGITAL / PRODUCTS — staggered typographic poster.
 * Lines animate opacity + rise (no per-letter animation).
 */
export function BuildHeadline({
  lines,
  fontSize,
  lineHeight,
  letterSpacing,
  staggered = true,
}: BuildHeadlineProps) {
  const offsets = [
    { alignItems: "flex-end" as const, paddingRight: 0, paddingLeft: 0 },
    { alignItems: "flex-end" as const, paddingRight: "18%" as any, paddingLeft: 0 },
    { alignItems: "flex-start" as const, paddingRight: 0, paddingLeft: "12%" as any },
    { alignItems: "flex-start" as const, paddingRight: 0, paddingLeft: "8%" as any },
  ];

  return (
    <View style={styles.block}>
      {lines.map((ln, i) => (
        <View
          key={ln.text}
          style={[
            styles.line,
            staggered
              ? {
                  alignItems: offsets[i].alignItems,
                  paddingRight: offsets[i].paddingRight as any,
                  paddingLeft: offsets[i].paddingLeft as any,
                }
              : { alignItems: "flex-start" as const },
          ]}
        >
          <Animated.Text
            style={[
              styles.text,
              {
                fontSize,
                lineHeight,
                letterSpacing,
                opacity: ln.v,
                transform: [
                  {
                    translateY: ln.v.interpolate({
                      inputRange: [0, 1],
                      outputRange: [35, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            {ln.text}
          </Animated.Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    width: "100%",
  },
  line: {
    width: "100%",
  },
  text: {
    color: "#050505",
    fontWeight: "800",
    fontFamily: "'Space Grotesk','Inter',system-ui,sans-serif",
  },
});
