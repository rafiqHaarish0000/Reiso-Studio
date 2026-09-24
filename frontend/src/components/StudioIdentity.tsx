import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";

const LOGO = require("../assets/images/reiso-logo.png");

export function StudioIdentity() {
  return (
    <View style={styles.row}>
      <View style={styles.badge}>
        <Image source={LOGO} style={styles.logo} resizeMode="contain" accessibilityLabel="Reiso Studio logo" />
      </View>
      <View>
        <Text style={styles.name}>Reiso Studio</Text>
        <Text style={styles.sub}>Creative Technology Studio</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    minHeight: 44,
  },
  badge: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    backgroundColor: colors.panel,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  logo: {
    width: 34,
    height: 34,
  },
  name: {
    color: colors.textPrimary,
    fontSize: 14.5,
    fontWeight: "600",
    fontFamily: "'Inter', system-ui, sans-serif",
  },
  sub: {
    color: colors.textSecondary,
    fontSize: 11.5,
    marginTop: 2,
    fontFamily: "'Inter', system-ui, sans-serif",
  },
});
