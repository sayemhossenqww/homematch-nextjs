import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import HowItWorks from "@/components/home/HowItWorks";
import FeaturedFirms from "@/components/home/FeaturedFirms";
import InspirationGallery, { type GalleryProject } from "@/components/home/InspirationGallery";
import Testimonials from "@/components/home/Testimonials";
import CaseTrustSection from "@/components/home/CaseTrustSection";
import LatestArticles from "@/components/home/LatestArticles";
import FAQSection from "@/components/home/FAQSection";
import CtaBottom from "@/components/home/CtaBottom";
import type { Metadata } from "next";
import { getAllInspirations } from "@/data/inspirations";
import { getFirmBySlug } from "@/data/firms";

const OG_DEFAULT = "https://www.homematch.sg/og-default.jpg";
const SITE = "https://www.homematch.sg";

export const metadata: Metadata = {
  title: "HomeMatch — Find Trusted Interior Designers in Singapore | Free Matching",
  description:
    "Singapore's #1 interior design matching platform. Get matched free with 6 CaseTrust-certified ID firms for your HDB, BTO, condo, or landed renovation. Compare quotes, view real projects, and renovate with confidence.",
  alternates: { canonical: SITE },
  keywords: [
    "interior designer Singapore",
    "find interior designer Singapore free",
    "best interior design firm Singapore 2025",
    "CaseTrust certified interior designer",
    "HDB renovation Singapore",
    "BTO renovation package Singapore",
    "condo interior design Singapore",
    "renovation matching service Singapore",
    "compare interior design firms",
    "renovation quote Singapore",
    "trusted interior designer HDB",
    "4-room HDB interior design Singapore",
    "5-room HDB renovation cost",
    "full home renovation Singapore",
  ],
  openGraph: {
    title: "HomeMatch — Find Trusted Interior Designers in Singapore",
    description: "Free matching with 6 CaseTrust-certified ID firms for your HDB, BTO, condo, or landed renovation. Compare real projects and get quotes.",
    url: SITE,
    siteName: "HomeMatch",
    images: [{ url: OG_DEFAULT, width: 1200, height: 630, alt: "HomeMatch — Singapore Interior Design Matching Platform" }],
    type: "website",
    locale: "en_SG",
  },
  twitter: {
    card: "summary_large_image",
    title: "HomeMatch — Find Trusted Interior Designers in Singapore",
    description: "Free matching with CaseTrust-certified ID firms for your HDB, condo, or landed renovation.",
    images: [OG_DEFAULT],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "url": "https://www.interiormatch.sg",
      "name": "Interior Match",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.interiormatch.sg/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "Organization",
      "name": "Interior Match Singapore",
      "url": "https://www.interiormatch.sg",
      "logo": "https://www.interiormatch.sg/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+65-8332-6708",
        "contactType": "customer service",
        "areaServed": "SG",
        "availableLanguage": "English"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does Interior Match verify interior design firms?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Every firm on our platform undergoes a rigorous 5-step verification process. We verify their ACRA registration, CaseTrust accreditation, financial stability, and review past project completions. We also conduct regular audits."
          }
        },
        {
          "@type": "Question",
          "name": "Is the matching service really free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, our matching service is 100% free for homeowners. We earn a small, standardized referral fee from the interior design firms only when a project is successfully signed."
          }
        },
        {
          "@type": "Question",
          "name": "What happens if a dispute arises with a recommended firm?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We provide dedicated dispute resolution support. Because we strictly partner with CaseTrust accredited firms, you are also protected by deposit bonds and independent mediation policies."
          }
        }
      ]
    }
  ]
};

const ACCENT_PALETTE = ["#c8881f", "#60a5fa", "#4ade80", "#a78bfa", "#fb923c", "#34d399"];
const SPAN_LAYOUT = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
];

function buildGalleryProjects(): GalleryProject[] {
  return getAllInspirations()
    .slice(0, 6)
    .map((p, i) => {
      const firm = getFirmBySlug(p.firmSlug);
      const firmName = firm?.name ?? p.firmSlug;
      const words = firmName.split(" ");
      const initials =
        words.length >= 2
          ? (words[0][0] + words[1][0]).toUpperCase()
          : firmName.slice(0, 2).toUpperCase();

      return {
        slug: p.slug,
        image: p.photos[0]?.url ?? "",
        budget: p.budget >= 1000 ? `S$${(p.budget / 1000).toFixed(0)}K` : `S$${p.budget}`,
        sqft: p.sqft.toLocaleString(),
        style: p.style,
        firm: firmName,
        firmInitials: initials,
        accent: ACCENT_PALETTE[i % ACCENT_PALETTE.length],
        type: p.propertyType,
        location: "",
        span: SPAN_LAYOUT[i] ?? "col-span-1 row-span-1",
        rating: firm?.rating ?? 5.0,
      };
    });
}

export default function HomePage() {
  const galleryProjects = buildGalleryProjects();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <TrustStrip />
      <WhyChooseUs />
      <HowItWorks />
      <FeaturedFirms />
      <InspirationGallery projects={galleryProjects} />
      <Testimonials />
      <CaseTrustSection />
      <LatestArticles />
      <FAQSection />
      <CtaBottom />
    </>
  );
}
