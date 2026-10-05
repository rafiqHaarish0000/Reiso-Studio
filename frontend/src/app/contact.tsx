import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";
import { COMPANY } from "../data/site";
import { GradientText, Reveal } from "../components/site/primitives";
import {
  ContactChannels,
  EnquiryForm,
  FaqList,
  MapBlock,
  PageHero,
  SitePage,
  wrapCenter,
} from "../components/site/sections";

export default function Contact() {
  return (
    <SitePage active="/contact">
      <PageHero
        eyebrow="CONTACT US"
        title={<Text>Let's talk about <GradientText>your project.</GradientText></Text>}
        sub="Call, WhatsApp, email — or send the form and we'll get back within 24 hours."
      />
      <View style={c.wrap}>
        <Reveal>
          <View style={c.hq}>
            <Text style={c.hqName}>{COMPANY.name}</Text>
            <Text style={c.hqLine}>{COMPANY.city}</Text>
            <Text style={c.hqLine}>{COMPANY.state}</Text>
            <Text style={c.hqLine}>Phone / WhatsApp: {COMPANY.phoneDisplay}</Text>
            <Text style={c.hqLine}>Email: {COMPANY.email}</Text>
          </View>
        </Reveal>
        <ContactChannels />
        <EnquiryForm />
        <MapBlock />
        <View style={{ marginTop: 56 }}>
          <Reveal>
            <Text style={c.faqTitle}>Questions, answered.</Text>
          </Reveal>
          <FaqList />
        </View>
      </View>
    </SitePage>
  );
}

const c = StyleSheet.create({
  wrap: { ...wrapCenter, maxWidth: 1000, paddingBottom: 30 },
  hq: {
    backgroundColor: "rgba(255,255,255,0.03)", borderWidth: 1, borderColor: colors.border,
    borderRadius: 22, padding: 30, alignItems: "center", marginBottom: 26, gap: 4,
  },
  hqName: { color: colors.textPrimary, fontSize: 24, fontWeight: "700", fontFamily: "'Space Grotesk','Inter',sans-serif" },
  hqLine: { color: colors.textSecondary, fontSize: 14, marginTop: 2 },
  faqTitle: { color: colors.textPrimary, fontSize: 28, fontWeight: "700", fontFamily: "'Space Grotesk','Inter',sans-serif", marginBottom: 20, textAlign: "center" },
});
