import React from "react";
import { HeroSection } from "../components/site/HeroSection";
import { AboutNumbers } from "../components/site/AboutNumbers";
import { SolutionsSection } from "../components/site/SolutionsSection";
import { InnovateSection } from "../components/site/InnovateSection";
import { WhyChooseUsSection } from "../components/site/WhyChooseUsSection";
import { ServicesSection } from "../components/site/ServicesCinematic";
import { AboutSection, ProductsSection } from "../components/site/Showcase";
import { ReviewsSection } from "../components/site/ReviewsSection";
import { FaqSection } from "../components/site/FaqSection";
import {
  LedSection,
  ProcessSection,
  SitePage,
  TemplatesSection,
  WorkSection,
} from "../components/site/sections";

export default function Home() {
  return (
    <SitePage active="/">
      <HeroSection />
      <AboutNumbers />
      <SolutionsSection />
      <InnovateSection />
      <WhyChooseUsSection />
      <ServicesSection />
      <ProductsSection />
      <AboutSection />
      <TemplatesSection />
      <WorkSection />
      <LedSection />
      <ProcessSection />
      <ReviewsSection />
      <FaqSection />
    </SitePage>
  );
}
