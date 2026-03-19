import type { Metadata } from "next";
import Link from "next/link";
import { Home, ChevronRight, ArrowRight } from "lucide-react";
import { getBeforeAfterInspirations } from "@/data/inspirations";
import { getFirmBySlug } from "@/data/firms";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";

export const metadata: Metadata = {
  title: "Before & After Renovations Singapore — Real Home Transformations | HomeMatch",
  description:
    "See real Singapore home renovation transformations. Drag the interactive slider to reveal stunning before & after results across HDB, BTO, condo, and landed properties — with verified budgets and designer credits.",
  alternates: { canonical: "https://www.homematch.sg/before-after" },
  keywords: [
    "renovation before after Singapore",
    "HDB before after renovation",
    "BTO renovation transformation Singapore",
    "condo renovation before after",
    "Singapore home makeover",
    "interior design transformation Singapore",
    "renovation results Singapore",
    "before after interior design HDB",
    "home renovation slider Singapore",
    "renovation comparison Singapore",
    "real renovation photos Singapore",
    "landed house renovation before after",
  ],
  openGraph: {
    title: "Before & After Renovations Singapore — Real Home Transformations",
    description: "Drag the slider to reveal stunning before & after renovation results from real Singapore HDB, condo, and landed homes.",
    url: "https://www.homematch.sg/before-after",
    siteName: "HomeMatch",
    images: [{ url: "https://www.homematch.sg/og-default.jpg", width: 1200, height: 630, alt: "Singapore Renovation Before and After" }],
    type: "website",
    locale: "en_SG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Before & After Renovations Singapore — Real Home Transformations",
    description: "Drag the slider to reveal stunning before & after renovation results from real Singapore homes.",
    images: ["https://www.homematch.sg/og-default.jpg"],
  },
};

export default function BeforeAfterPage() {
  const projects = getBeforeAfterInspirations();

  function formatBudget(amount: number) {
    if (amount >= 1000) return `S$${(amount / 1000).toFixed(0)}K`;
    return `S$${amount}`;
  }

  return (
    <main className="min-h-screen bg-[#05080f]">
      {/* ── Hero ── */}
      <section className="bg-[#070b14] border-b border-white/5 pt-32 pb-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Gold pill */}
          <div className="inline-flex items-center gap-2 bg-[#c8881f]/10 border border-[#c8881f]/25 rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c8881f]" />
            <span className="text-[#c8881f] text-xs font-semibold tracking-wide">
              Drag to Compare · Real Renovations
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            Before &amp;{" "}
            <span className="text-[#c8881f]">After</span>
          </h1>

          <p className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto mb-10">
            Drag the slider to reveal stunning transformation results from{" "}
            <span className="text-white/80 font-semibold">{projects.length}</span>{" "}
            real Singapore renovation projects.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            <div className="bg-[#0a0e1a] border border-white/8 rounded-2xl py-5 px-4">
              <p className="text-2xl font-black text-white">{projects.length}</p>
              <p className="text-white/40 text-xs mt-1">Transformations</p>
            </div>
            <div className="bg-[#0a0e1a] border border-white/8 rounded-2xl py-5 px-4">
              <p className="text-2xl font-black text-white">
                {new Set(projects.map((p) => p.propertyType)).size}
              </p>
              <p className="text-white/40 text-xs mt-1">Property Types</p>
            </div>
            <div className="bg-[#0a0e1a] border border-white/8 rounded-2xl py-5 px-4">
              <p className="text-2xl font-black text-white">
                {new Set(projects.map((p) => p.style)).size}
              </p>
              <p className="text-white/40 text-xs mt-1">Design Styles</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Grid ── */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-white/40 mb-10">
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-white/70 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-white/20" />
          <span className="text-white/60">Before &amp; After</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project) => {
            const firm = getFirmBySlug(project.firmSlug);
            return (
              <div
                key={project.slug}
                className="bg-[#0a0e1a] border border-white/8 rounded-3xl overflow-hidden hover:border-[#c8881f]/30 transition-all group"
              >
                {/* Slider */}
                <div className="p-4 pb-0">
                  <BeforeAfterSlider
                    beforeUrl={project.beforePhotoUrl!}
                    afterUrl={project.photos[0].url}
                  />
                </div>

                {/* Meta */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <h2 className="text-white font-black text-base leading-snug line-clamp-1">
                        {project.title}
                      </h2>
                      {firm && (
                        <p className="text-white/40 text-xs mt-0.5">{firm.name}</p>
                      )}
                    </div>

                    {/* Badges */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white/8 border border-white/10 text-white/50">
                        {project.propertyType}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#c8881f]/15 border border-[#c8881f]/25 text-[#c8881f]">
                        {project.style}
                      </span>
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="flex items-center gap-4 text-xs text-white/40 mb-4">
                    <span>
                      <span className="text-emerald-400 font-bold">
                        {formatBudget(project.budget)}
                      </span>
                    </span>
                    <span className="text-white/20">·</span>
                    <span>{project.sqft.toLocaleString()} sqft</span>
                    {project.completionDays && (
                      <>
                        <span className="text-white/20">·</span>
                        <span>{project.completionDays} days</span>
                      </>
                    )}
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/inspirations/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-[#c8881f] text-xs font-semibold hover:gap-2.5 transition-all"
                  >
                    View Full Project
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-white/40 text-sm mb-4">
            Looking for your own transformation?
          </p>
          <Link
            href="/firms"
            className="inline-flex items-center gap-2 bg-[#c8881f] hover:bg-[#b87a1a] text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            Browse Interior Design Firms
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
