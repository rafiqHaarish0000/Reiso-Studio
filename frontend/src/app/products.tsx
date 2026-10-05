import React from "react";
import { useRouter } from "expo-router";
import { COMPANY } from "../data/site";
import { CTAButton, GradientText } from "../components/site/primitives";
import { LedSection, PageHero, ProductGroups, SitePage, TemplatesSection, wrapCenter } from "../components/site/sections";
import { Text, View } from "react-native";

export default function Products() {
  const router = useRouter();
  return (
    <SitePage active="/products">
      <PageHero
        eyebrow="PRODUCTS"
        title={<Text>Everything you need to <GradientText>run & glow.</GradientText></Text>}
        sub="Digital platforms, IoT automation and interior technology — every product ships with a quote in 48 hours."
      />
      <View style={wrapCenter}>
        <ProductGroups />
      </View>
      <View style={{ height: 20 }} />
      <LedSection />
      <TemplatesSection limit={6} />
      <View style={[wrapCenter, { alignItems: "center", paddingBottom: 20, flexDirection: "row", gap: 12, justifyContent: "center", flexWrap: "wrap" }]}>
        <CTAButton onPress={() => router.push("/contact")}>Get a Quote</CTAButton>
        <CTAButton variant="ghost" onPress={() => router.push("/contact")}>Talk to Us — {COMPANY.phoneDisplay}</CTAButton>
      </View>
    </SitePage>
  );
}
