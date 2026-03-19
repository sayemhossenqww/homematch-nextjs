import type { Metadata } from "next";
import StyleQuizClient from "./StyleQuizClient";

export const metadata: Metadata = {
  title: "Interior Design Style Quiz — Find Your Perfect Home Aesthetic | HomeMatch Singapore",
  description:
    "Not sure what interior design style suits you? Take our free 7-question quiz to discover if you're Japandi, Contemporary, Warm Modern, Minimalist, or Scandinavian — then get matched with Singapore ID firms that specialise in your style.",
  alternates: { canonical: "https://www.homematch.sg/tools/style-quiz" },
  keywords: [
    "interior design style quiz Singapore",
    "what interior design style am I",
    "home design style quiz Singapore",
    "Japandi interior design Singapore",
    "minimalist interior design Singapore",
    "contemporary interior design Singapore",
    "Scandinavian interior design Singapore",
    "warm modern interior design Singapore",
    "find my interior design style",
    "interior design personality quiz",
    "home aesthetic quiz Singapore",
    "interior style quiz free",
  ],
  openGraph: {
    title: "Interior Design Style Quiz — Find Your Perfect Home Aesthetic | HomeMatch",
    description: "7 questions to discover your interior style — Japandi, Contemporary, Minimalist, Scandinavian, or Warm Modern. Match with the right Singapore ID firm.",
    url: "https://www.homematch.sg/tools/style-quiz",
    siteName: "HomeMatch",
    images: [{ url: "https://www.homematch.sg/og-default.jpg", width: 1200, height: 630, alt: "Interior Design Style Quiz Singapore" }],
    type: "website",
    locale: "en_SG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Interior Design Style Quiz — Find Your Perfect Home Aesthetic | HomeMatch",
    description: "7 questions to discover your interior style and match with the right Singapore ID firm.",
    images: ["https://www.homematch.sg/og-default.jpg"],
  },
};

export default function Page() {
  return <StyleQuizClient />;
}
