import React from "react";
import { Link } from "expo-router";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { LandingNavbar } from "../components/site/LandingNavbar";

export default function Home() {
  const hero = (
    <View style={s.hero}>
      <Text style={s.eyebrow}>REISO STUDIO — NEW LANDING</Text>
      <Text style={s.title}>Digital products built for modern businesses</Text>
      <Text style={s.sub}>
        Explore products, services and free templates from the new navigation above.
      </Text>
      <View style={s.row}>
        <Link href="/products" asChild>
          <Pressable style={s.primary}>
            <Text style={s.primaryText}>Explore Products</Text>
          </Pressable>
        </Link>
        <Link href="/contact" asChild>
          <Pressable style={s.ghost}>
            <Text style={s.ghostText}>Book a consult</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );

  if (Platform.OS === "web") {
    const Div: any = "div";
    return (
      <Div style={{ minHeight: "100vh", backgroundColor: "#050507" }}>
        <LandingNavbar active="/" />
        <Div style={{ maxWidth: 1240, margin: "0 auto", padding: "72px 20px" }}>{hero}</Div>
      </Div>
    );
  }

  return (
    <View style={s.root}>
      <LandingNavbar active="/" />
      {hero}
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#050507" },
  hero: { paddingHorizontal: 20, paddingVertical: 72, gap: 14, maxWidth: 1240, width: "100%", alignSelf: "center" },
  eyebrow: { color: "#1EA7FF", fontSize: 12, fontWeight: "700", letterSpacing: 2 },
  title: { color: "#F5F5F2", fontSize: 34, fontWeight: "700", lineHeight: 40 },
  sub: { color: "#A4A4AA", fontSize: 16, lineHeight: 24, maxWidth: 560 },
  row: { flexDirection: "row", gap: 12, marginTop: 10, flexWrap: "wrap" },
  primary: { backgroundColor: "#5B35FF", borderRadius: 999, paddingHorizontal: 24, paddingVertical: 14, minHeight: 48, justifyContent: "center" },
  primaryText: { color: "#fff", fontWeight: "700", fontSize: 14 },
  ghost: { borderWidth: 1, borderColor: "rgba(255,255,255,0.2)", borderRadius: 999, paddingHorizontal: 24, paddingVertical: 14, minHeight: 48, justifyContent: "center" },
  ghostText: { color: "#F5F5F2", fontWeight: "700", fontSize: 14 },
});
