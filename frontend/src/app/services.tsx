import React from "react";
import { Text } from "react-native";
import { GradientText } from "../components/site/primitives";
import { PageHero, ProcessSection, ServiceGrid, SitePage, wrapCenter } from "../components/site/sections";
import { View } from "react-native";

export default function Services() {
  return (
    <SitePage active="/services">
      <PageHero
        eyebrow="SERVICES"
        title={<Text>Fourteen ways we <GradientText>move you forward.</GradientText></Text>}
        sub="Tap any service on the contact page and tell us what you need — every engagement starts with a free 30-minute discovery call."
      />
      <View style={wrapCenter}>
        <ServiceGrid />
      </View>
      <ProcessSection />
    </SitePage>
  );
}
