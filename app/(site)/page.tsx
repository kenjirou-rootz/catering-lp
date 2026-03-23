import { sanityFetch } from "@/lib/sanity/fetch";
import {
  heroQuery,
  aboutQuery,
  portfolioQuery,
  catchCarouselQuery,
  featuresQuery,
  pricingQuery,
  coordinatesQuery,
  venueQuery,
  flowStepsQuery,
  testimonialsQuery,
} from "@/sanity/lib/queries";

import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { CatchCarouselSection } from "@/components/sections/CatchCarouselSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { CoordinateSection } from "@/components/sections/CoordinateSection";
import { VenueSection } from "@/components/sections/VenueSection";
import { FlowSection } from "@/components/sections/FlowSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default async function HomePage() {
  const [
    hero,
    about,
    portfolios,
    catchCarousel,
    features,
    pricing,
    coordinates,
    venue,
    flowSteps,
    testimonials,
  ] = await Promise.all([
    sanityFetch<any>(heroQuery),
    sanityFetch<any>(aboutQuery),
    sanityFetch<any[]>(portfolioQuery),
    sanityFetch<any>(catchCarouselQuery),
    sanityFetch<any[]>(featuresQuery),
    sanityFetch<any[]>(pricingQuery),
    sanityFetch<any[]>(coordinatesQuery),
    sanityFetch<any>(venueQuery),
    sanityFetch<any[]>(flowStepsQuery),
    sanityFetch<any[]>(testimonialsQuery),
  ]);

  return (
    <>
      <HeroSection data={hero} />
      <AboutSection data={about} />
      <PortfolioSection data={portfolios} />
      <CatchCarouselSection data={catchCarousel} />
      <FeaturesSection data={features} />
      <PricingSection data={pricing} />
      <CoordinateSection data={coordinates} />
      <VenueSection data={venue} />
      <FlowSection data={flowSteps} />
      <TestimonialsSection data={testimonials} />
      <ContactSection />
    </>
  );
}
