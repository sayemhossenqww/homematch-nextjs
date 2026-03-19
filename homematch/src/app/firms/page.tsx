import { Metadata } from "next";
import { Suspense } from "react";
import { getAllFirms } from "@/data/firms";
import FirmDirectoryClient from "@/components/firms/FirmDirectoryClient";

export const metadata: Metadata = {
  title: "Top Interior Design Firms in Singapore 2025 | CaseTrust-Certified | HomeMatch",
  description:
    "Browse 100+ verified interior design firms in Singapore. Filter by CaseTrust badge, design style (minimalist, Japandi, contemporary), property type (HDB, condo, landed), district, and homeowner reviews. Free to compare.",
  alternates: { canonical: "https://www.homematch.sg/firms" },
  keywords: [
    "interior design firm Singapore",
    "best interior design companies Singapore",
    "CaseTrust certified ID firm",
    "top interior designers Singapore 2025",
    "HDB interior design firm",
    "BTO renovation firm Singapore",
    "condo interior design company",
    "landed house interior designer Singapore",
    "minimalist interior design firm Singapore",
    "Japandi interior designer Singapore",
    "contemporary interior design Singapore",
    "industrial interior design firm",
    "renovation firm Singapore review",
    "verified interior design contractor Singapore",
    "interior design firm east Singapore",
    "interior design firm west Singapore",
    "interior design firm north Singapore",
  ],
  openGraph: {
    title: "Top Interior Design Firms in Singapore 2025 | HomeMatch",
    description: "Browse 100+ CaseTrust-verified ID firms. Filter by style, property type, district, and reviews. Free to compare and enquire.",
    url: "https://www.homematch.sg/firms",
    siteName: "HomeMatch",
    images: [{ url: "https://www.homematch.sg/og-default.jpg", width: 1200, height: 630, alt: "Top Interior Design Firms Singapore" }],
    type: "website",
    locale: "en_SG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Top Interior Design Firms in Singapore 2025 | HomeMatch",
    description: "Browse 100+ CaseTrust-certified ID firms. Filter by style, property type, and reviews.",
    images: ["https://www.homematch.sg/og-default.jpg"],
  },
};

export default function FirmsDirectoryPage() {
  const firms = getAllFirms();

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#05080f]" />}>
      <FirmDirectoryClient initialFirms={firms} />
    </Suspense>
  );
}
