import React, { useRef, useState } from "react";
import { Animated, Easing, Platform, Pressable, StyleSheet, Text, View } from "react-native";

/** SHOWREEL label + black circular play button (placeholder action). */
export function ShowreelButton() {
  const [hover, setHover] = useState(false);
  const grow = useRef(new Animated.Value(0)).current;

  const onHover = (h: boolean) => {
    setHover(h);
    Animated.timing(grow, {
      toValue: h ? 1 : 0,
      duration: 200,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Play showreel"
      onPress={() => {}}
      style={styles.hit}
      {...(Platform.OS === "web"
        ? ({
            onMouseEnter: () => onHover(true),
            onMouseLeave: () => onHover(false),
          } as any)
        : {})}
    >
      <Text style={styles.label}>SHOWREEL</Text>
      <Animated.View
        style={[
          styles.circle,
          hover && styles.circleHover,
          {
            transform: [
              {
                scale: grow.interpolate({ inputRange: [0, 1], outputRange: [1, 1.08] }),
              },
            ],
          },
        ]}
      >
        <Text style={styles.icon}>▶</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  hit: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    minHeight: 52,
    minWidth: 44,
  },
  label: {
    color: "#050505",
    fontSize: 15,
    fontWeight: "500",
    letterSpacing: 0.6,
    fontFamily: "'Inter',system-ui,sans-serif",
  },
  circle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#050505",
    alignItems: "center",
    justifyContent: "center",
  },
  circleHover: {
    borderWidth: 1.5,
    borderColor: "#711EFF",
  },
  icon: {
    color: "#F2F2F0",
    fontSize: 15,
    marginLeft: 2,
  },
});
