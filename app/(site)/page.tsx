import { sanityFetch } from "@/lib/sanity/fetch";
import {
  heroQuery,
  aboutQuery,
  portfolioQuery,
  catchCarouselQuery,
  highlightsQuery,
  featuresQuery,
  pricingQuery,
  coordinatesQuery,
  venueQuery,
  flowStepsQuery,
  testimonialsQuery,
  siteSettingsQuery,
} from "@/sanity/lib/queries";

import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { CatchCarouselSection } from "@/components/sections/CatchCarouselSection";
import { HighlightsSection } from "@/components/sections/HighlightsSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { CoordinateSection } from "@/components/sections/CoordinateSection";
import { VenueSection } from "@/components/sections/VenueSection";
import { FlowSection } from "@/components/sections/FlowSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { SectionDivider } from "@/components/ui/SectionDivider";

export default async function HomePage() {
  const [
    hero,
    about,
    portfolios,
    catchCarousel,
    highlights,
    features,
    pricing,
    coordinates,
    venue,
    flowSteps,
    testimonials,
    settings,
  ] = await Promise.all([
    sanityFetch<any>(heroQuery),
    sanityFetch<any>(aboutQuery),
    sanityFetch<any[]>(portfolioQuery),
    sanityFetch<any>(catchCarouselQuery),
    sanityFetch<any>(highlightsQuery),
    sanityFetch<any[]>(featuresQuery),
    sanityFetch<any[]>(pricingQuery),
    sanityFetch<any[]>(coordinatesQuery),
    sanityFetch<any>(venueQuery),
    sanityFetch<any[]>(flowStepsQuery),
    sanityFetch<any[]>(testimonialsQuery),
    sanityFetch<any>(siteSettingsQuery),
  ]);

  const h = {
    about: { en: settings?.headingAboutEn || "Michelin Chef KITAO", ja: settings?.headingAboutJa || "Kitaoとは？" },
    portfolio: { en: settings?.headingPortfolioEn || "Portfolio", ja: settings?.headingPortfolioJa || "実績レポート" },
    catch: { en: settings?.headingCatchEn || "Heartfelt Hospitality" },
    highlights: { en: settings?.headingHighlightsEn || "Highlights", ja: settings?.headingHighlightsJa || "選ばれる理由" },
    features: { en: settings?.headingFeaturesEn || "Features", ja: settings?.headingFeaturesJa || "弊社の特長" },
    pricing: { en: settings?.headingPricingEn || "Pricing", ja: settings?.headingPricingJa || "料金プラン" },
    coordinate: { en: settings?.headingCoordinateEn || "Coordinate", ja: settings?.headingCoordinateJa || "テーブルコーディネート" },
    venue: { en: settings?.headingVenueEn || "Venue", ja: settings?.headingVenueJa || "レンタル会場" },
    flow: { en: settings?.headingFlowEn || "Flow", ja: settings?.headingFlowJa || "ご利用の流れ" },
    testimonials: { en: settings?.headingTestimonialsEn || "Testimonials", ja: settings?.headingTestimonialsJa || "お客様の声" },
    contact: { en: settings?.headingContactEn || "Contact", ja: settings?.headingContactJa || "お問い合わせ" },
  };

  return (
    <>
      <HeroSection data={hero} />
      <CatchCarouselSection data={catchCarousel} headingEn={h.catch.en} />
      <HighlightsSection data={highlights} heading={h.highlights} />
      <AboutSection data={about} heading={h.about} />
      <SectionDivider />
      <PortfolioSection data={portfolios} heading={h.portfolio} />
      <SectionDivider />
      <FeaturesSection data={features} heading={h.features} />
      <PricingSection data={pricing} heading={h.pricing} />
      <SectionDivider />
      <CoordinateSection data={coordinates} heading={h.coordinate} />
      <VenueSection data={venue} heading={h.venue} />
      <SectionDivider />
      <FlowSection data={flowSteps} heading={h.flow} />
      <TestimonialsSection data={testimonials} heading={h.testimonials} />
      <ContactSection heading={h.contact} />
    </>
  );
}
