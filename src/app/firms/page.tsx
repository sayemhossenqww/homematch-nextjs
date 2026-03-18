import type { Metadata } from "next";
import { getAllFirms } from "@/data/firms";
import FirmDirectoryClient from "@/components/firms/FirmDirectoryClient";

export const metadata: Metadata = {
  title: "Interior Design Firms in Singapore | HomeMatch",
  description:
    "Browse CaseTrust-certified interior design firms in Singapore. Filter by badge, style, property type and rating. Free matching service for homeowners.",
  openGraph: {
    title: "Interior Design Firms in Singapore | HomeMatch",
    description:
      "Browse CaseTrust-certified interior design firms in Singapore. Free matching service.",
    type: "website",
    url: "https://www.homematch.sg/firms",
  },
  alternates: {
    canonical: "https://www.homematch.sg/firms",
  },
};

export default function FirmsPage() {
  const firms = getAllFirms();
  return <FirmDirectoryClient firms={firms} />;
}
