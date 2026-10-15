import React, { useEffect } from "react";
import { Image, Platform, StyleSheet, View } from "react-native";

const INTRO = require("../assets/images/reiso-motion.gif");

export function SplashScreen({ onFinish }: { onFinish: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 5000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={[styles.overlay, Platform.OS === "web" ? ({ position: "fixed" } as any) : null]}>
      <Image source={INTRO} style={styles.animation} resizeMode="contain" accessibilityLabel="Reiso Studio animated intro" />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 10000,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  animation: { width: "100%", maxWidth: 1200, aspectRatio: 16 / 9 },
});
