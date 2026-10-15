import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import { SplashScreen } from "../components/SplashScreen";

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);
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
        s.textContent = `html,body,#root{height:100%;background:#050605;margin:0;}body{font-family:Inter,system-ui,sans-serif;-webkit-font-smoothing:antialiased;}a{color:inherit}@keyframes reisoPageEnter{from{opacity:0;transform:translate3d(0,14px,0)}to{opacity:1;transform:translate3d(0,0,0)}}.reiso-page-enter{animation:reisoPageEnter 820ms cubic-bezier(.2,.75,.25,1) both}@media(prefers-reduced-motion:reduce){.reiso-page-enter{animation:none!important}}`;
        document.head.appendChild(s);
      }
      // SEO: title + description + Open Graph (Reiso Studio branding).
      document.title = "Reiso Studio — Digital Experiences That Move Businesses Forward";
      const meta = (name: string, attr: "name" | "property", content: string) => {
        let el = document.head.querySelector(`meta[${attr}="${name}"]`);
        if (!el) {
          el = document.createElement("meta");
          el.setAttribute(attr, name);
          document.head.appendChild(el);
        }
        el.setAttribute("content", content);
      };
      const desc =
        "Reiso Studio designs and builds high-performance websites, mobile applications and digital products for ambitious businesses.";
      meta("description", "name", desc);
      meta("og:title", "property", "Reiso Studio — Digital Experiences That Move Businesses Forward");
      meta("og:description", "property", desc);
      meta("og:type", "property", "website");
      meta("theme-color", "name", "#050605");
    }
  }, []);

  return (
    <>
      <StatusBar style="light" backgroundColor="#050605" hidden={showSplash} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#050605" },
          animation: "fade",
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="work" />
        <Stack.Screen name="products" />
        <Stack.Screen name="services" />
        <Stack.Screen name="pricing" />
        <Stack.Screen name="about" />
        <Stack.Screen name="contact" />
      </Stack>
      {showSplash ? <SplashScreen onFinish={() => setShowSplash(false)} /> : null}
    </>
  );
}
