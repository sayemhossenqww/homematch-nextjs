import type { Metadata } from "next";
import SSContent from "@/components/safest-smartest/SSContent";

export const metadata: Metadata = {
  title: "Safest & Smartest Assurance | HomeMatch",
  description:
    "HomeMatch's Safest-Smartest Assurance is the most stringent screening and most comprehensive guarantees in Singapore's renovation industry. 14 assurance points to protect you.",
  openGraph: {
    title: "Safest & Smartest Assurance | HomeMatch",
    description:
      "The most stringent screening and most comprehensive guarantees in Singapore's renovation industry.",
    type: "website",
  },
  alternates: { canonical: "https://www.homematch.sg/safest-smartest-assurance" },
};

export default function SafestSmartestAssurancePage() {
  return <SSContent />;
}
