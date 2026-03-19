"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search, X, Sparkles, ChevronDown, LayoutGrid,
  Star, Package, CheckCircle, Layers, Lightbulb,
  Wifi, Zap, Grid3X3, Droplets, Leaf, Box,
  ArrowUpDown, SlidersHorizontal, TrendingUp,
} from "lucide-react";
import VendorCard from "@/components/vendors/VendorCard";
import type { Vendor, VendorCategory, PriceRange } from "@/types/vendor";

interface Props {
  initialVendors: Vendor[];
}

const PAGE_SIZE = 9;

type CategoryEntry = { cat: VendorCategory | "All"; icon: React.ElementType; label: string };

const CATEGORY_LIST: CategoryEntry[] = [
  { cat: "All",           icon: LayoutGrid, label: "All"          },
  { cat: "Materials",     icon: Layers,     label: "Materials"    },
  { cat: "Furniture",     icon: Box,        label: "Furniture"    },
  { cat: "Lighting",      icon: Lightbulb,  label: "Lighting"     },
  { cat: "Smart Home",    icon: Wifi,       label: "Smart Home"   },
  { cat: "Appliances",    icon: Zap,        label: "Appliances"   },
  { cat: "Flooring",      icon: Grid3X3,    label: "Flooring"     },
  { cat: "Sanitary Ware", icon: Droplets,   label: "Sanitary"     },
  { cat: "Outdoor",       icon: Leaf,       label: "Outdoor"      },
];

const PRICE_RANGES: (PriceRange | "All")[] = ["All", "Budget", "Mid-Range", "Premium", "Luxury"];

const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: "Featured First", label: "Featured" },
  { value: "Highest Rated",  label: "Top Rated" },
  { value: "Most Reviewed",  label: "Most Reviews" },
  { value: "A–Z",            label: "A – Z" },
];

// Price range display helpers
const PRICE_COLOURS: Record<PriceRange | "All", string> = {
  All:         "text-white/60",
  Budget:      "text-emerald-400",
  "Mid-Range": "text-sky-400",
  Premium:     "text-violet-400",
  Luxury:      "text-[#c8881f]",
};

// Maps URL ?cat= values → VendorCategory
const CAT_PARAM_MAP: Record<string, VendorCategory> = {
  materials:     "Materials",
  furniture:     "Furniture",
  lighting:      "Lighting",
  "smart-home":  "Smart Home",
  appliances:    "Appliances",
  flooring:      "Flooring",
  "sanitary-ware": "Sanitary Ware",
  outdoor:       "Outdoor",
};

export default function VendorDirectoryClient({ initialVendors }: Props) {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery]           = useState("");
  const [activeCategory, setActiveCategory]     = useState<VendorCategory | "All">("All");
  const [activePriceRange, setActivePriceRange] = useState<PriceRange | "All">("All");
  const [sortBy, setSortBy]                     = useState("Featured First");
  const [visibleCount, setVisibleCount]         = useState(PAGE_SIZE);
  const searchRef = useRef<HTMLInputElement>(null);

  // Sync category from URL param on every navigation
  useEffect(() => {
    const cat = searchParams.get("cat");
    setActiveCategory(cat ? (CAT_PARAM_MAP[cat.toLowerCase()] ?? "All") : "All");
  }, [searchParams]);

  useEffect(() => { setVisibleCount(PAGE_SIZE); }, [searchQuery, activeCategory, activePriceRange, sortBy]);

  const filteredVendors = useMemo(() => {
    let r = [...initialVendors];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      r = r.filter(v =>
        v.name.toLowerCase().includes(q) ||
        v.bio.toLowerCase().includes(q) ||
        v.tags.some(t => t.toLowerCase().includes(q)) ||
        v.category.toLowerCase().includes(q) ||
        (v.subcategory?.toLowerCase().includes(q) ?? false)
      );
    }
    if (activeCategory !== "All") r = r.filter(v => v.category === activeCategory);
    if (activePriceRange !== "All") r = r.filter(v => v.priceRange === activePriceRange);
    if (sortBy === "Highest Rated")  r.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "Most Reviewed") r.sort((a, b) => b.reviewCount - a.reviewCount);
    else if (sortBy === "A–Z")       r.sort((a, b) => a.name.localeCompare(b.name));
    else r.sort((a, b) => (a.isFeatured === b.isFeatured ? 0 : a.isFeatured ? -1 : 1));
    return r;
  }, [initialVendors, searchQuery, activeCategory, activePriceRange, sortBy]);

  const displayVendors = filteredVendors.slice(0, visibleCount);
  const hasMore        = visibleCount < filteredVendors.length;

  const countForCategory = (cat: VendorCategory | "All") =>
    cat === "All" ? initialVendors.length : initialVendors.filter(v => v.category === cat).length;

  const hasActiveFilters =
    searchQuery !== "" || activeCategory !== "All" ||
    activePriceRange !== "All" || sortBy !== "Featured First";

  const clearAll = () => {
    setSearchQuery(""); setActiveCategory("All");
    setActivePriceRange("All"); setSortBy("Featured First");
  };

  const activeChips: { label: string; onRemove: () => void }[] = [];
  if (searchQuery)            activeChips.push({ label: `"${searchQuery}"`,       onRemove: () => setSearchQuery("") });
  if (activeCategory !== "All")   activeChips.push({ label: activeCategory,           onRemove: () => setActiveCategory("All") });
  if (activePriceRange !== "All") activeChips.push({ label: activePriceRange,         onRemove: () => setActivePriceRange("All") });
  if (sortBy !== "Featured First") activeChips.push({ label: `Sort: ${SORT_OPTIONS.find(o => o.value === sortBy)?.label}`, onRemove: () => setSortBy("Featured First") });

  return (
    <div className="min-h-screen bg-[#05080f] pt-20">

      {/* ── Hero ── */}
      <div className="relative bg-[#070b14] border-b border-white/5 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#c8881f]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-sky-500/4 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 pt-14 pb-12 relative">
          <div className="inline-flex items-center gap-2 bg-[#c8881f]/10 border border-[#c8881f]/20 text-[#c8881f] text-xs font-bold uppercase tracking-[0.12em] px-4 py-1.5 rounded-full mb-5">
            <Sparkles className="w-3 h-3" /> Verified Brands
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-[1.05]">
            Singapore&apos;s Top<br />
            <span className="text-[#c8881f]">Home Brands</span> &amp; Suppliers
          </h1>
          <p className="text-base text-white/50 max-w-xl mb-8 leading-relaxed">
            Discover verified materials, furniture, lighting, appliances, and smart home brands trusted by Singapore&apos;s top interior designers.
          </p>

          <div className="flex flex-wrap gap-6 mb-10">
            {[
              { icon: <Package className="w-4 h-4" />,     val: `${initialVendors.length}`, label: "Verified Brands" },
              { icon: <LayoutGrid className="w-4 h-4" />,  val: "8",                        label: "Categories"      },
              { icon: <CheckCircle className="w-4 h-4" />, val: "100%",                     label: "All Verified"    },
            ].map(({ icon, val, label }) => (
              <div key={label} className="flex items-center gap-2.5 text-sm">
                <span className="text-[#c8881f]">{icon}</span>
                <span className="font-bold text-white">{val}</span>
                <span className="text-white/40">{label}</span>
              </div>
            ))}
          </div>

          {/* Hero search */}
          <div className="max-w-2xl relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4 pointer-events-none group-focus-within:text-[#c8881f]/60 transition-colors" />
            <input
              ref={searchRef}
              type="text"
              placeholder="Search brands, materials, categories… e.g. Tiles, Solid Wood"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-10 py-3.5 text-white text-sm focus:outline-none focus:border-[#c8881f]/50 focus:bg-white/7 transition-all placeholder-white/25"
            />
            {searchQuery && (
              <button
                onClick={() => { setSearchQuery(""); searchRef.current?.focus(); }}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-white/8 hover:bg-white/15 text-white/40 hover:text-white transition-all"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          FILTER BAR — sticky, two-row
      ══════════════════════════════════════════════ */}
      <div className="sticky top-16 z-20 bg-[#070b14]/95 backdrop-blur-xl border-b border-white/6 shadow-xl shadow-black/30">

        {/* ── Row 1: Category tabs ── */}
        <div className="max-w-7xl mx-auto px-4 pt-3.5">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 min-w-max pb-3.5">
              {CATEGORY_LIST.map(({ cat, icon: Icon, label }) => {
                const count = countForCategory(cat);
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`relative flex flex-col items-center gap-1.5 px-4 pt-2.5 pb-2 rounded-2xl min-w-[68px] transition-all duration-200 border group ${
                      isActive
                        ? "bg-[#c8881f] border-[#c8881f] text-white shadow-lg shadow-[#c8881f]/25"
                        : "bg-white/[0.04] border-white/8 text-white/45 hover:bg-white/7 hover:border-white/18 hover:text-white/75"
                    }`}
                  >
                    <Icon className={`w-4 h-4 transition-transform duration-200 ${isActive ? "" : "group-hover:scale-110"}`} />
                    <span className="text-[10px] font-bold leading-none whitespace-nowrap">{label}</span>
                    {cat !== "All" && (
                      <span className={`text-[9px] font-semibold leading-none ${isActive ? "text-white/65" : "text-white/25"}`}>
                        {count}
                      </span>
                    )}
                    {/* Active underline bar */}
                    {isActive && (
                      <span className="absolute -bottom-px left-4 right-4 h-0.5 bg-white/40 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Row 2: Price · Sort · Count · Clear ── */}
        <div className="max-w-7xl mx-auto px-4 py-2.5 border-t border-white/5">
          <div className="flex items-center gap-3 flex-wrap">

            {/* Price range — segmented control */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-semibold text-white/30 uppercase tracking-wider hidden sm:block mr-0.5">
                Price
              </span>
              <div className="flex items-center bg-white/[0.04] border border-white/8 rounded-xl p-0.5 gap-0.5">
                {PRICE_RANGES.map(pr => {
                  const isActive = activePriceRange === pr;
                  return (
                    <button
                      key={pr}
                      onClick={() => setActivePriceRange(pr)}
                      className={`px-3 py-1.5 rounded-[9px] text-[10px] font-bold whitespace-nowrap transition-all duration-150 ${
                        isActive
                          ? "bg-white/12 text-white border border-white/15 shadow-sm"
                          : `text-white/40 hover:text-white/65 ${PRICE_COLOURS[pr]}`
                      }`}
                    >
                      {pr}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-5 bg-white/10 shrink-0" />

            {/* Sort dropdown */}
            <div className="flex items-center gap-1.5 bg-white/[0.04] border border-white/8 rounded-xl px-3 py-1.5">
              <ArrowUpDown className="w-3 h-3 text-white/30 shrink-0" />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="appearance-none bg-transparent text-white/60 text-[10px] font-bold focus:outline-none cursor-pointer pr-4 focus:text-white transition-colors"
                style={{ backgroundImage: "none" }}
              >
                {SORT_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value} className="bg-[#0d1120] text-white">
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3 h-3 text-white/25 shrink-0 -ml-3 pointer-events-none" />
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Results count */}
            <div className="flex items-center gap-1.5 text-xs shrink-0">
              <TrendingUp className="w-3.5 h-3.5 text-white/20" />
              <span className="text-white/35">
                <span className="text-white font-bold">{filteredVendors.length}</span>
                <span className="hidden sm:inline"> of {initialVendors.length}</span>
                {" "}brands
              </span>
            </div>

            {/* Clear all */}
            {hasActiveFilters && (
              <button
                onClick={clearAll}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/8 border border-red-500/20 text-red-400/80 hover:bg-red-500/15 hover:text-red-400 hover:border-red-500/30 text-[10px] font-bold transition-all duration-150 shrink-0"
              >
                <X className="w-3 h-3" />
                <span className="hidden sm:inline">Clear filters</span>
              </button>
            )}
          </div>
        </div>

        {/* ── Row 3: Active filter chips (only when any active) ── */}
        {activeChips.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 pb-3 flex flex-wrap gap-2 items-center">
            <span className="text-[9px] font-semibold text-white/25 uppercase tracking-wider mr-1">
              <SlidersHorizontal className="w-3 h-3 inline mr-1" />Active:
            </span>
            {activeChips.map(chip => (
              <button
                key={chip.label}
                onClick={chip.onRemove}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#c8881f]/12 text-[#c8881f] text-[10px] font-semibold border border-[#c8881f]/22 hover:bg-red-500/12 hover:text-red-400 hover:border-red-500/22 transition-all duration-150 group"
              >
                {chip.label}
                <X className="w-2.5 h-2.5 opacity-70 group-hover:opacity-100" />
              </button>
            ))}
          </div>
        )}
      </div>
      {/* ══ End filter bar ══ */}

      {/* ── Results grid ── */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {displayVendors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayVendors.map(vendor => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        ) : (
          <div className="py-28 text-center border border-white/8 bg-white/[0.02] rounded-3xl">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 border border-white/10">
              <Search className="w-7 h-7 text-white/20" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No brands found</h3>
            <p className="text-white/40 text-sm mb-6 max-w-xs mx-auto">
              Try adjusting your filters — or clear them to browse all {initialVendors.length} brands.
            </p>
            <button
              onClick={clearAll}
              className="px-6 py-2.5 bg-[#c8881f] text-white rounded-xl text-sm font-bold hover:bg-[#d4951f] transition-colors shadow-lg shadow-[#c8881f]/25"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Load more */}
        {displayVendors.length > 0 && (
          <div className="mt-14 text-center">
            {hasMore ? (
              <>
                <button
                  onClick={() => setVisibleCount(c => c + PAGE_SIZE)}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/5 border border-white/10 hover:border-[#c8881f]/40 hover:bg-[#c8881f]/5 text-white hover:text-[#c8881f] font-semibold rounded-2xl transition-all text-sm group"
                >
                  Load More Brands
                  <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                </button>
                <p className="mt-3 text-xs text-white/25">
                  Showing {displayVendors.length} of {filteredVendors.length} brands
                </p>
              </>
            ) : (
              <p className="text-xs text-white/25">
                ✓ All {filteredVendors.length} brands shown
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
