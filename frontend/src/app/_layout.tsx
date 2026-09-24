import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Platform } from "react-native";

export default function RootLayout() {
  // Load Space Grotesk + Inter on web for the editorial grotesk feel.
  useEffect(() => {
    if (Platform.OS === "web" && typeof document !== "undefined") {
      const id = "reiso-fonts";
      if (!document.getElementById(id)) {
        const link = document.createElement("link");
        link.id = id;
        link.rel = "stylesheet";
        link.href =
          "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap";
        document.head.appendChild(link);
      }
      const styleId = "reiso-web-base";
      if (!document.getElementById(styleId)) {
        const s = document.createElement("style");
        s.id = styleId;
        s.textContent = `html,body,#root{height:100%;background:#050507;margin:0;}body{font-family:Inter,system-ui,sans-serif;-webkit-font-smoothing:antialiased;}a{color:inherit}`;
        document.head.appendChild(s);
      }
    }
  }, []);

  return (
    <>
      <StatusBar style="light" backgroundColor="#050507" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#050507" },
          animation: "fade",
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="work" />
        <Stack.Screen name="services" />
        <Stack.Screen name="about" />
        <Stack.Screen name="contact" />
      </Stack>
    </>
  );
}
