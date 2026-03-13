import AnimationProvider from "@/components/AnimationProvider";
import AboveFold from "@/components/home/AboveFold";
import TestimonialSection from "@/components/home/TestimonialSection";
import SSTransition from "@/components/home/SSTransition";
import HowItWorks from "@/components/home/HowItWorks";
import MostStringent from "@/components/home/MostStringent";
import MostComprehensive from "@/components/home/MostComprehensive";
import FAQSection from "@/components/home/FAQ";
import CtaBottom from "@/components/home/CtaBottom";
import GuidesSection from "@/components/home/GuidesSection";

export default function HomePage() {
  return (
    <>
      {/* GSAP scroll animations — renders nothing, runs all animations */}
      <AnimationProvider />

      {/* Hero / Above Fold */}
      <AboveFold />

      {/* Testimonial grid + CaseTrust + Google reviews banner */}
      <TestimonialSection />

      {/* Safest-Smartest transition banner */}
      <SSTransition />

      {/* How It Works — video + 3 steps + reviews inside */}
      <HowItWorks />

      {/* Most Stringent Screening + reviews inside */}
      <MostStringent />

      {/* Most Comprehensive Guarantees — comparison table */}
      <MostComprehensive />

      {/* FAQ accordion */}
      <FAQSection />

      {/* Bottom CTA bar */}
      <CtaBottom />

      {/* Guides section + newsletter */}
      <GuidesSection />
    </>
  );
}
