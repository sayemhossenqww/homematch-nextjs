import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { getAllArticles, getFeaturedArticles } from "@/data/articles";
import ArticleCard from "@/components/articles/ArticleCard";
import ArticlesClient from "./ArticlesClient";

export const metadata: Metadata = {
  title: "Singapore Renovation Guides & Interior Design Tips 2025 | HomeMatch",
  description:
    "Expert renovation guides for Singapore homeowners — HDB rules, BTO renovation steps, renovation budgets, design trends, smart home tips, consumer protection advice, and more. Written by Singapore interior design experts.",
  alternates: { canonical: "https://www.homematch.sg/articles" },
  keywords: [
    "Singapore renovation guide 2025",
    "HDB renovation tips Singapore",
    "BTO renovation checklist Singapore",
    "interior design tips Singapore",
    "renovation budget guide Singapore",
    "HDB renovation rules 2025",
    "condo renovation guide Singapore",
    "renovation mistakes to avoid Singapore",
    "interior design trends Singapore 2025",
    "Japandi design Singapore",
    "minimalist home Singapore",
    "smart home renovation Singapore",
    "renovation consumer protection Singapore",
    "CASE renovation dispute Singapore",
    "CaseTrust tips Singapore",
    "renovation cost breakdown Singapore",
    "how to choose interior designer Singapore",
  ],
  openGraph: {
    title: "Singapore Renovation Guides & Interior Design Tips 2025 | HomeMatch",
    description: "Expert HDB guides, budget breakdowns, design trends, and smart home tips — written for Singapore homeowners.",
    url: "https://www.homematch.sg/articles",
    siteName: "HomeMatch",
    images: [{ url: "https://www.homematch.sg/og-default.jpg", width: 1200, height: 630, alt: "Singapore Renovation Guides" }],
    type: "website",
    locale: "en_SG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Singapore Renovation Guides & Interior Design Tips 2025 | HomeMatch",
    description: "Expert HDB guides, budget breakdowns, and design trends for Singapore homeowners.",
    images: ["https://www.homematch.sg/og-default.jpg"],
  },
};

export default function ArticlesPage() {
  const allArticles      = getAllArticles();
  const featuredArticles = getFeaturedArticles();
  const totalCategories  = new Set(allArticles.map(a => a.category)).size;

  return (
    <main className="min-h-screen bg-[#05080f]">

      {/* ── Hero ── */}
      <section className="relative bg-[#070b14] border-b border-white/5 pt-32 pb-14 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#c8881f]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-sky-500/4 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-[#c8881f]/10 border border-[#c8881f]/25 rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c8881f]" />
            <span className="text-[#c8881f] text-xs font-semibold tracking-wide">
              Singapore Renovation Guides
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-[1.05]">
            Renovation Tips &{" "}
            <span className="text-[#c8881f]">Design Guides</span>
          </h1>

          <p className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Expert advice for Singapore homeowners — from HDB rules and budget planning
            to the latest interior design trends.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            <div className="bg-[#0a0e1a] border border-white/8 rounded-2xl py-5 px-4">
              <p className="text-2xl font-black text-white">{allArticles.length}</p>
              <p className="text-white/40 text-xs mt-1">Articles</p>
            </div>
            <div className="bg-[#0a0e1a] border border-white/8 rounded-2xl py-5 px-4">
              <p className="text-2xl font-black text-white">{totalCategories}</p>
              <p className="text-white/40 text-xs mt-1">Categories</p>
            </div>
            <div className="bg-[#0a0e1a] border border-white/8 rounded-2xl py-5 px-4">
              <p className="text-2xl font-black text-[#c8881f]">Free</p>
              <p className="text-white/40 text-xs mt-1">Always</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured articles ── */}
      {featuredArticles.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-4 h-4 text-[#c8881f]" />
            <h2 className="text-sm font-black uppercase tracking-[0.14em] text-white/50">
              Featured Articles
            </h2>
          </div>
          <div className="space-y-5">
            {featuredArticles.slice(0, 2).map(article => (
              <ArticleCard key={article.slug} article={article} featured />
            ))}
          </div>
        </section>
      )}

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-px bg-white/6" />
      </div>

      {/* ── All articles with filters ── */}
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-32">
            <div className="w-8 h-8 border-2 border-[#c8881f] border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <ArticlesClient articles={allArticles} />
      </Suspense>

      {/* ── Bottom CTA ── */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-[#0a0e1a] border border-white/8 rounded-3xl p-10">
          <p className="text-[#c8881f] text-xs font-black uppercase tracking-[0.14em] mb-3">
            Ready to Renovate?
          </p>
          <h3 className="text-2xl font-black text-white mb-3">
            Find Your Perfect Interior Designer
          </h3>
          <p className="text-white/40 text-sm mb-7 max-w-md mx-auto leading-relaxed">
            Get matched with up to 6 CaseTrust-accredited firms based on your style, budget, and property type — free.
          </p>
          <Link href="/find-my-id" className="btn-accent text-sm px-8 py-3">
            Find My ID — Free →
          </Link>
        </div>
      </section>
    </main>
  );
}
