import { Suspense } from "react";
import { Metadata } from "next";
import { getAllVendors } from "@/data/vendors";
import VendorDirectoryClient from "@/components/vendors/VendorDirectoryClient";

export const metadata: Metadata = {
  title: "Home Brands & Renovation Suppliers Singapore — Materials, Furniture & Smart Home | HomeMatch",
  description:
    "Discover Singapore's top verified home brands and renovation suppliers — tiles, laminates, solid wood furniture, lighting, kitchen appliances, smart home systems, and more. Compare brands, read homeowner reviews, and find the right products for your HDB, condo, or landed renovation.",
  alternates: { canonical: "https://www.homematch.sg/vendors" },
  keywords: [
    "home renovation suppliers Singapore",
    "interior materials Singapore",
    "tiles supplier Singapore",
    "laminate supplier Singapore",
    "solid wood furniture Singapore",
    "lighting brands Singapore",
    "kitchen appliances Singapore renovation",
    "smart home brands Singapore",
    "renovation material brands Singapore",
    "furniture brands Singapore home",
    "verified home brands Singapore",
    "renovation products Singapore",
    "HDB renovation materials Singapore",
    "bathroom fittings Singapore",
    "kitchen fittings Singapore",
    "flooring brands Singapore",
    "interior design products Singapore",
  ],
  openGraph: {
    title: "Home Brands & Renovation Suppliers Singapore | HomeMatch",
    description: "Verified tiles, laminates, furniture, lighting, appliances, and smart home brands for Singapore HDB, condo, and landed renovations.",
    url: "https://www.homematch.sg/vendors",
    siteName: "HomeMatch",
    images: [{ url: "https://www.homematch.sg/og-default.jpg", width: 1200, height: 630, alt: "Singapore Home Renovation Brands & Suppliers" }],
    type: "website",
    locale: "en_SG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Brands & Renovation Suppliers Singapore | HomeMatch",
    description: "Verified tiles, furniture, lighting, appliances, and smart home brands for Singapore renovations.",
    images: ["https://www.homematch.sg/og-default.jpg"],
  },
};

export default function VendorsPage() {
  const vendors = getAllVendors();

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#05080f] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#c8881f]/30 border-t-[#c8881f] rounded-full animate-spin" />
        </div>
      }
    >
      <VendorDirectoryClient initialVendors={vendors} />
    </Suspense>
  );
}
