import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllInspirations } from "@/data/inspirations";
import { getAllFirms } from "@/data/firms";
import InspirationsClient from "@/components/inspirations/InspirationsClient";

export const metadata: Metadata = {
  title: "Singapore Renovation Inspirations — Real HDB, Condo & Landed Projects | HomeMatch",
  description:
    "Browse real Singapore interior renovation projects with verified budgets. Filter by HDB, BTO, condo, or landed; design style (minimalist, Japandi, contemporary); room type; and budget range. Find your perfect interior style.",
  alternates: { canonical: "https://www.homematch.sg/inspirations" },
  keywords: [
    "Singapore renovation inspiration",
    "interior design ideas Singapore",
    "HDB renovation ideas",
    "BTO renovation ideas Singapore",
    "condo interior design ideas",
    "landed house renovation ideas Singapore",
    "minimalist HDB interior design",
    "Japandi interior design Singapore",
    "contemporary condo renovation Singapore",
    "Scandinavian interior design Singapore",
    "industrial interior design HDB",
    "4-room HDB interior design ideas",
    "5-room HDB renovation inspiration",
    "Singapore home renovation gallery",
    "real renovation projects Singapore",
    "renovation before after Singapore",
    "interior design portfolio Singapore",
    "home makeover Singapore",
  ],
  openGraph: {
    title: "Singapore Renovation Inspirations — Real HDB, Condo & Landed Projects",
    description: "Browse real Singapore renovation projects with verified budgets. Filter by property type, design style, room, and budget.",
    url: "https://www.homematch.sg/inspirations",
    siteName: "HomeMatch",
    images: [{ url: "https://www.homematch.sg/og-default.jpg", width: 1200, height: 630, alt: "Singapore Renovation Inspirations Gallery" }],
    type: "website",
    locale: "en_SG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Singapore Renovation Inspirations — Real HDB, Condo & Landed Projects",
    description: "Browse real Singapore renovation projects with verified budgets and design styles.",
    images: ["https://www.homematch.sg/og-default.jpg"],
  },
};

export default function InspirationsPage() {
  const allInspirations = getAllInspirations();
  const allFirms = getAllFirms();
  const projectCount = allInspirations.length;
  const styleCount   = new Set(allInspirations.map((p) => p.style)).size;
  const withBA       = allInspirations.filter((p) => p.beforePhotoUrl).length;

  return (
    <main className="min-h-screen bg-[#05080f]">

      {/* ── Hero ── */}
      <section className="relative bg-[#070b14] border-b border-white/5 pt-32 pb-14 px-4 overflow-hidden">
        {/* Glow blobs */}
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#c8881f]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-sky-500/4 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#c8881f]/10 border border-[#c8881f]/25 rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c8881f]" />
            <span className="text-[#c8881f] text-xs font-semibold tracking-wide">
              Real Projects · Real Budgets
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-[1.05]">
            Find Your Perfect{" "}
            <span className="text-[#c8881f]">Interior Style</span>
          </h1>

          <p className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Browse{" "}
            <span className="text-white/80 font-semibold">{projectCount}</span>{" "}
            real Singapore renovation projects — filter by property, style, room, and budget.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            <div className="bg-[#0a0e1a] border border-white/8 rounded-2xl py-5 px-4">
              <p className="text-2xl font-black text-white">{projectCount}</p>
              <p className="text-white/40 text-xs mt-1">Projects</p>
            </div>
            <div className="bg-[#0a0e1a] border border-white/8 rounded-2xl py-5 px-4">
              <p className="text-2xl font-black text-white">{styleCount}</p>
              <p className="text-white/40 text-xs mt-1">Design Styles</p>
            </div>
            <div className="bg-[#0a0e1a] border border-white/8 rounded-2xl py-5 px-4">
              <p className="text-2xl font-black text-[#c8881f]">{withBA}</p>
              <p className="text-white/40 text-xs mt-1">Before &amp; After</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Gallery with filters ── */}
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-32">
            <div className="w-8 h-8 border-2 border-[#c8881f] border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <InspirationsClient projects={allInspirations} firms={allFirms} />
      </Suspense>
    </main>
  );
}
