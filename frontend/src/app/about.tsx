import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { colors } from "../constants/colors";
export default function Page() {
  return (
    <View style={styles.root}>
      <Text style={styles.eyebrow}>REISO STUDIO</Text>
      <Text style={styles.title}>ABOUT</Text>
      <Text style={styles.sub}>Coming next — homepage is the current focus.</Text>
      <Link href="/" asChild><Pressable style={styles.back} accessibilityRole="link" accessibilityLabel="Back home"><Text style={styles.backText}>← BACK HOME</Text></Pressable></Link>
    </View>
  );
}
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg0, alignItems: "center", justifyContent: "center", padding: 32 },
  eyebrow: { color: colors.textMuted, fontSize: 11, letterSpacing: 1.5, marginBottom: 12 },
  title: { color: colors.textPrimary, fontSize: 56, fontWeight: "800", fontFamily: "'Space Grotesk','Inter',sans-serif" },
  sub: { color: colors.textSecondary, marginTop: 10, fontSize: 14 },
  back: { marginTop: 24, minHeight: 44, justifyContent: "center", borderWidth: 1, borderColor: colors.border, paddingHorizontal: 20 },
  backText: { color: colors.textPrimary, fontWeight: "700", letterSpacing: 1 },
});
