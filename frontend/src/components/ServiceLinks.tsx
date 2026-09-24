import React, { useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { colors } from "../constants/colors";

const ITEMS = [
  { label: "DESIGN", href: "/services" as const, hover: colors.cyan },
  { label: "DEVELOPMENT", href: "/services" as const, hover: colors.violet },
  { label: "AI & AUTOMATION", href: "/services" as const, hover: colors.pink },
];

export function ServiceLinks() {
  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <View style={styles.row} accessibilityRole="list">
      {ITEMS.map((item, i) => (
        <React.Fragment key={item.label}>
          {i > 0 && <Text style={styles.sep}>/</Text>}
          <Link href={item.href} asChild>
            <Pressable
              accessibilityRole="link"
              accessibilityLabel={item.label}
              style={styles.hit}
              {...(Platform.OS === "web"
                ? ({
                    onMouseEnter: () => setHovered(item.label),
                    onMouseLeave: () => setHovered(null),
                  } as any)
                : {})}
            >
              <Text
                style={[
                  styles.label,
                  hovered === item.label && { color: item.hover },
                ]}
              >
                {item.label}
              </Text>
              {hovered === item.label && Platform.OS === "web" && (
                // @ts-ignore web-only underline
                <div style={{ height: 2, marginTop: 3, backgroundImage: colors.gradient, borderRadius: 2 }} />
              )}
            </Pressable>
          </Link>
        </React.Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 14,
  },
  sep: {
    color: colors.separator,
    fontSize: 18,
    fontWeight: "300",
  },
  hit: {
    minHeight: 44,
    justifyContent: "center",
  },
  label: {
    color: colors.textPrimary,
    fontSize: 19,
    fontWeight: "600",
    letterSpacing: 0.5,
    fontFamily: "'Space Grotesk','Inter',system-ui,sans-serif",
  },
});
