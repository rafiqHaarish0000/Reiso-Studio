import React, { useState } from "react";
import { Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { colors } from "../constants/colors";

const PHOTO_URL =
  "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=900&q=80";

interface StrategyImageProps {
  width: number | string;
  height: number;
  /** reveal style (opacity + scale) from parent */
  animatedStyle?: any;
  /** web-only: direct DOM ref of the <img> for parallax */
  imgDomRef?: React.RefObject<any>;
}

export function StrategyImage({ width, height, animatedStyle, imgDomRef }: StrategyImageProps) {
  const [menuHover, setMenuHover] = useState(false);

  return (
    <View style={[styles.outer, { width: width as any, height }, animatedStyle]}>
      {/* soft Reiso glow behind the image (web only) */}
      {Platform.OS === "web" && (
        // @ts-ignore web-only gradient glow
        <div
          style={{
            position: "absolute",
            top: "12%",
            left: "-18%",
            width: "130%",
            height: "60%",
            backgroundImage: colors.gradient,
            opacity: 0.14,
            filter: "blur(80px)",
            pointerEvents: "none",
          }}
        />
      )}
      <View style={styles.frame}>
        {Platform.OS === "web" ? (
          // @ts-ignore web-only img for exact B&W treatment
          <img
            ref={imgDomRef}
            src={PHOTO_URL}
            alt="Designer working in a monochrome creative technology studio"
            style={{
              width: "100%",
              height: "114%",
              marginTop: "-7%",
              objectFit: "cover",
              filter: "grayscale(100%) contrast(1.05)",
              display: "block",
              willChange: "transform",
            }}
          />
        ) : (
          <Image
            source={{ uri: PHOTO_URL }}
            style={styles.nativeImg}
            resizeMode="cover"
            accessibilityLabel="Creative professional at work"
          />
        )}
        {/* film grain overlay (web only) */}
        {Platform.OS === "web" && (
          // @ts-ignore web-only grain
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              opacity: 0.08,
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E")`,
            }}
          />
        )}
        {/* thin gradient accent on the image's left edge */}
        {Platform.OS === "web" ? (
          // @ts-ignore web-only gradient bar
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 2,
              height: 180,
              backgroundImage: colors.gradient,
            }}
          />
        ) : (
          <View style={styles.edgeBarNative} />
        )}
        {/* contextual exploration control */}
        <Link href="/about" asChild>
          <Pressable
            accessibilityRole="link"
            accessibilityLabel="Explore our strategy work"
            style={menuHover ? styles.menuHover : styles.menu}
            {...(Platform.OS === "web"
              ? ({
                  onMouseEnter: () => setMenuHover(true),
                  onMouseLeave: () => setMenuHover(false),
                } as any)
              : {})}
          >
            {[0, 1, 2].map((i) => (
              <View
                key={i}
                style={[
                  styles.bar,
                  { backgroundColor: menuHover ? "#050507" : "#F5F5F2" },
                ]}
              />
            ))}
          </Pressable>
        </Link>
      </View>
      {/* editorial page marker */}
      <View style={styles.marker}>
        {Platform.OS === "web" ? (
          // @ts-ignore web-only gradient dot
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: 3,
              backgroundImage: colors.gradient,
            }}
          />
        ) : (
          <View style={styles.dotNative} />
        )}
        <Text style={styles.markerText}>REISO / 02</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    position: "relative",
  },
  frame: {
    width: "100%",
    height: "100%",
    backgroundColor: "#0D0D11",
    overflow: "hidden",
    position: "relative",
  },
  nativeImg: {
    width: "100%",
    height: "100%",
  },
  edgeBarNative: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 2,
    height: 180,
    backgroundColor: colors.violet,
  },
  menu: {
    position: "absolute",
    left: 16,
    bottom: 16,
    width: 54,
    height: 54,
    minWidth: 54,
    minHeight: 54,
    backgroundColor: "#15151A",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  menuHover: {
    position: "absolute",
    left: 16,
    bottom: 16,
    width: 54,
    height: 54,
    minWidth: 54,
    minHeight: 54,
    backgroundColor: "#F5F5F2",
    borderWidth: 1,
    borderColor: "#F5F5F2",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    transform: [{ scale: 1.03 }],
  },
  bar: {
    width: 18,
    height: 2,
  },
  marker: {
    position: "absolute",
    bottom: -28,
    left: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  markerText: {
    color: "rgba(255,255,255,0.45)",
    fontSize: 10.5,
    letterSpacing: 1.2,
    fontWeight: "500",
    fontFamily: "'Inter',system-ui,sans-serif",
  },
  dotNative: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.magenta,
  },
});
