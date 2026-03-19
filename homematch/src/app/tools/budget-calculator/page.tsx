import type { Metadata } from "next";
import BudgetCalculatorClient from "./BudgetCalculatorClient";

export const metadata: Metadata = {
  title: "Singapore Renovation Budget Calculator 2025 — HDB, Condo & Landed Cost Estimator | HomeMatch",
  description:
    "Estimate your Singapore renovation cost instantly. Our free budget calculator covers 4-room HDB, 5-room HDB, BTO, condo, and landed renovations by room type, quality tier, and scope. Plan your renovation budget before getting quotes.",
  alternates: { canonical: "https://www.homematch.sg/tools/budget-calculator" },
  keywords: [
    "Singapore renovation budget calculator",
    "HDB renovation cost calculator 2025",
    "BTO renovation cost estimator Singapore",
    "4-room HDB renovation cost Singapore",
    "5-room HDB renovation cost Singapore",
    "condo renovation cost calculator Singapore",
    "landed house renovation cost Singapore",
    "how much does renovation cost Singapore",
    "renovation cost breakdown Singapore 2025",
    "interior design cost Singapore",
    "renovation quote estimator Singapore",
    "free renovation calculator Singapore",
  ],
  openGraph: {
    title: "Singapore Renovation Budget Calculator 2025 | HomeMatch",
    description: "Free calculator — estimate HDB, BTO, condo, and landed renovation costs by room type and quality tier. Plan smart before getting quotes.",
    url: "https://www.homematch.sg/tools/budget-calculator",
    siteName: "HomeMatch",
    images: [{ url: "https://www.homematch.sg/og-default.jpg", width: 1200, height: 630, alt: "Singapore Renovation Budget Calculator" }],
    type: "website",
    locale: "en_SG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Singapore Renovation Budget Calculator 2025 | HomeMatch",
    description: "Free — estimate HDB, condo, and landed renovation costs instantly.",
    images: ["https://www.homematch.sg/og-default.jpg"],
  },
};

export default function Page() {
  return <BudgetCalculatorClient />;
}
