import type { Metadata } from "next";
import RenovationChecklistClient from "./RenovationChecklistClient";

export const metadata: Metadata = {
  title: "Singapore Renovation Checklist 2025 — Complete Step-by-Step HDB & Condo Guide | HomeMatch",
  description:
    "Free interactive renovation checklist for Singapore homeowners. Track every step from HDB renovation permit applications and ID selection to hacking, carpentry, flooring, and final handover. Progress saves automatically. Works for HDB, BTO, condo, and landed.",
  alternates: { canonical: "https://www.homematch.sg/tools/renovation-checklist" },
  keywords: [
    "Singapore renovation checklist 2025",
    "HDB renovation checklist",
    "BTO renovation steps Singapore",
    "renovation checklist Singapore homeowner",
    "HDB renovation permit checklist",
    "interior design checklist Singapore",
    "renovation stages Singapore",
    "renovation timeline checklist Singapore",
    "condo renovation checklist Singapore",
    "what to do before renovation Singapore",
    "renovation handover checklist Singapore",
    "free renovation checklist Singapore",
  ],
  openGraph: {
    title: "Singapore Renovation Checklist 2025 — HDB, BTO, Condo & Landed | HomeMatch",
    description: "Free interactive checklist covering every renovation step — permits, ID selection, hacking, carpentry, flooring, and handover. Progress saves automatically.",
    url: "https://www.homematch.sg/tools/renovation-checklist",
    siteName: "HomeMatch",
    images: [{ url: "https://www.homematch.sg/og-default.jpg", width: 1200, height: 630, alt: "Singapore Renovation Checklist 2025" }],
    type: "website",
    locale: "en_SG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Singapore Renovation Checklist 2025 | HomeMatch",
    description: "Free interactive checklist — every renovation step from permits to handover for HDB, BTO, condo, and landed homes.",
    images: ["https://www.homematch.sg/og-default.jpg"],
  },
};

export default function Page() {
  return <RenovationChecklistClient />;
}
