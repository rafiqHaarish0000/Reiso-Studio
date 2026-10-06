import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

export default function Home() {
  if (Platform.OS === "web") {
    const Div: any = "div";
    return (
      <Div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000000",
        }}
      >
        <Div
          style={{
            color: "#F5F5F5",
            fontSize: "28px",
            fontWeight: 300,
            letterSpacing: "4px",
            fontFamily: "Inter,system-ui,sans-serif",
          }}
        >
          Coming Soon
        </Div>
      </Div>
    );
  }
  return (
    <View style={s.root}>
      <Text style={s.text}>Coming Soon</Text>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#000000", alignItems: "center", justifyContent: "center" },
  text: { color: "#F5F5F5", fontSize: 28, fontWeight: "300", letterSpacing: 4 },
});
