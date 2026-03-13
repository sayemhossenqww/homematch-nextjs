import type { Metadata } from "next";
import GuidesContent from "@/components/guides/GuidesContent";

export const metadata: Metadata = {
  title: "Renovation Guides for Singaporeans",
  description:
    "Really Short, 'no-fluffs' and 'Cut-to-the-chase' guides that will help you save time on reno research and avoid mistakes.",
  openGraph: {
    title: "Renovation Guides for Singaporeans",
    description:
      "Really Short, 'no-fluffs' and 'Cut-to-the-chase' guides that will help you save time on reno research and avoid mistakes.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Renovation Guides for Singaporeans",
    description:
      "Really Short, 'no-fluffs' and 'Cut-to-the-chase' guides that will help you save time on reno research and avoid mistakes.",
  },
  alternates: { canonical: "https://www.homematch.sg/guides" },
};

export default function GuidesPage() {
  return (
    <>
      <GuidesContent />
    </>
  );
}
