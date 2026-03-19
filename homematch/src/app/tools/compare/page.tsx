import type { Metadata } from "next";
import CompareClient from "./CompareClient";

export const metadata: Metadata = {
  title: "Compare Interior Design Firms Side-by-Side — Ratings, Budget & CaseTrust Status | HomeMatch Singapore",
  description:
    "Compare up to 3 Singapore interior design firms side-by-side — ratings, average budgets, design styles, CaseTrust accreditation, project types, and response times. Make a confident, informed choice before signing.",
  alternates: { canonical: "https://www.homematch.sg/tools/compare" },
  keywords: [
    "compare interior design firms Singapore",
    "interior designer comparison Singapore",
    "best interior design firm Singapore comparison",
    "CaseTrust interior design firm compare",
    "HDB renovation firm comparison Singapore",
    "which interior designer is best Singapore",
    "side by side interior designer Singapore",
    "interior design firm ratings Singapore",
    "renovation firm review comparison Singapore",
    "how to choose interior designer Singapore",
    "compare renovation quotes Singapore",
    "ID firm shortlist Singapore",
  ],
  openGraph: {
    title: "Compare Interior Design Firms Side-by-Side | HomeMatch Singapore",
    description: "Compare ratings, budgets, styles, and CaseTrust status of Singapore ID firms side-by-side. Choose with confidence before you sign.",
    url: "https://www.homematch.sg/tools/compare",
    siteName: "HomeMatch",
    images: [{ url: "https://www.homematch.sg/og-default.jpg", width: 1200, height: 630, alt: "Compare Interior Design Firms Singapore" }],
    type: "website",
    locale: "en_SG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare Interior Design Firms Singapore | HomeMatch",
    description: "Compare ratings, budgets, styles, and CaseTrust status side-by-side. Choose the right ID firm with confidence.",
    images: ["https://www.homematch.sg/og-default.jpg"],
  },
};

export default function Page() {
  return <CompareClient />;
}
