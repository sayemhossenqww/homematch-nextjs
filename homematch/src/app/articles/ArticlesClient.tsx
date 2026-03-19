"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { X, Search, SlidersHorizontal, TrendingUp } from "lucide-react";
import ArticleCard from "@/components/articles/ArticleCard";
import type { Article, ArticleCategory } from "@/types/article";

const CATEGORIES: (ArticleCategory | "All")[] = [
  "All", "HDB Guides", "Budget Guides", "Design Trends",
  "House Hacks", "Consumer Protection", "Smart Home", "Designer Spotlight",
];

const CAT_PARAM_MAP: Record<string, ArticleCategory> = {
  "hdb-guides":          "HDB Guides",
  "budget-guides":       "Budget Guides",
  "design-trends":       "Design Trends",
  "house-hacks":         "House Hacks",
  "consumer-protection": "Consumer Protection",
  "smart-home":          "Smart Home",
  "designer-spotlight":  "Designer Spotlight",
};

const PAGE = 9;

interface Props {
  articles: Article[];
}

export default function ArticlesClient({ articles }: Props) {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<ArticleCategory | "All">("All");
  const [search, setSearch]     = useState("");
  const [visible, setVisible]   = useState(PAGE);

  // Sync category from URL param
  useEffect(() => {
    const cat = searchParams.get("cat");
    setCategory(cat ? (CAT_PARAM_MAP[cat] ?? "All") : "All");
  }, [searchParams]);

  useEffect(() => { setVisible(PAGE); }, [category, search]);

  const filtered = useMemo(() => {
    let r = articles;
    if (category !== "All") r = r.filter(a => a.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      r = r.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return r;
  }, [articles, category, search]);

  const displayed   = filtered.slice(0, visible);
  const hasMore     = visible < filtered.length;
  const hasFilters  = category !== "All" || search !== "";

  return (
    <div className="min-h-screen bg-[#05080f]">

      {/* ── Sticky filter bar ── */}
      <div className="sticky top-16 z-20 bg-[#070b14]/95 backdrop-blur-xl border-b border-white/6 shadow-xl shadow-black/30">

        {/* Category tabs */}
        <div className="max-w-7xl mx-auto px-4 pt-3">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-1.5 min-w-max pb-3">
              {CATEGORIES.map(cat => {
                const count = cat === "All" ? articles.length : articles.filter(a => a.category === cat).length;
                const active = category === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                      active
                        ? "bg-[#c8881f] border-[#c8881f] text-white shadow-lg shadow-[#c8881f]/20"
                        : "bg-white/4 border-white/8 text-white/45 hover:bg-white/7 hover:border-white/18 hover:text-white/75"
                    }`}
                  >
                    {cat} {cat !== "All" && <span className={`ml-1 ${active ? "opacity-65" : "opacity-40"}`}>({count})</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Search + count row */}
        <div className="max-w-7xl mx-auto px-4 py-2.5 border-t border-white/5">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25 group-focus-within:text-[#c8881f]/60 transition-colors" />
              <input
                type="text"
                placeholder="Search articles…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-white/4 border border-white/8 rounded-xl pl-8 pr-8 py-1.5 text-white text-xs focus:outline-none focus:border-[#c8881f]/40 focus:bg-white/6 transition-all placeholder-white/20"
              />
              {search && (
                <button onClick={() => setSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            <div className="flex-1" />

            <div className="flex items-center gap-1.5 text-xs shrink-0">
              <TrendingUp className="w-3.5 h-3.5 text-white/20" />
              <span className="text-white/35">
                <span className="text-white font-bold">{filtered.length}</span> articles
              </span>
            </div>

            {hasFilters && (
              <button
                onClick={() => { setCategory("All"); setSearch(""); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/8 border border-red-500/20 text-red-400/80 hover:bg-red-500/15 hover:text-red-400 text-[10px] font-bold transition-all"
              >
                <X className="w-3 h-3" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* Active chip */}
        {category !== "All" && (
          <div className="max-w-7xl mx-auto px-4 pb-2.5 flex items-center gap-2">
            <SlidersHorizontal className="w-3 h-3 text-white/25" />
            <button
              onClick={() => setCategory("All")}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#c8881f]/12 text-[#c8881f] text-[10px] font-semibold border border-[#c8881f]/22 hover:bg-red-500/12 hover:text-red-400 hover:border-red-500/22 transition-all group"
            >
              {category} <X className="w-2.5 h-2.5 opacity-70 group-hover:opacity-100" />
            </button>
          </div>
        )}
      </div>

      {/* ── Grid ── */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {filtered.length === 0 ? (
          <div className="py-28 text-center border border-white/8 bg-white/2 rounded-3xl">
            <Search className="w-10 h-10 text-white/15 mx-auto mb-4" />
            <h3 className="text-white/60 font-bold text-lg mb-2">No articles found</h3>
            <p className="text-white/30 text-sm mb-6">Try a different category or search term.</p>
            <button
              onClick={() => { setCategory("All"); setSearch(""); }}
              className="px-6 py-2.5 bg-[#c8881f] text-white text-sm font-bold rounded-xl hover:bg-[#d4951f] transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayed.map(article => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>

            <div className="mt-12 text-center">
              {hasMore ? (
                <>
                  <button
                    onClick={() => setVisible(v => v + PAGE)}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/5 border border-white/10 hover:border-[#c8881f]/40 hover:bg-[#c8881f]/5 text-white hover:text-[#c8881f] font-semibold rounded-2xl transition-all text-sm"
                  >
                    Load More Articles
                  </button>
                  <p className="mt-3 text-xs text-white/25">
                    Showing {displayed.length} of {filtered.length}
                  </p>
                </>
              ) : (
                <p className="text-xs text-white/25">✓ All {filtered.length} articles shown</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
