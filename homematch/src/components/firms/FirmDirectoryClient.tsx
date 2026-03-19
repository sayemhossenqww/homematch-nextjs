"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import FirmCard from "@/components/firms/FirmCard";
import { StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";
import {
  Search, SlidersHorizontal, ArrowRight, CheckCircle2,
  LayoutGrid, List, ChevronDown, X, Sparkles, Building, Shield, Star,
  MapPin, DollarSign,
} from "lucide-react";
import Link from "next/link";
import { Firm } from "@/types/firm";

interface Props { initialFirms: Firm[] }

const ACCREDITATIONS = ["CaseTrust", "HDB Registered", "BCA Registered", "bizSAFE3"];
const SPECIALISATIONS = ["HDB Specialist", "Condo Specialist", "Landed Specialist"];
const STYLES = ["Contemporary", "Luxury", "Minimalist", "Japandi", "Industrial", "Scandinavian", "Modern"];
const DISTRICTS = ["Central", "East", "West", "North", "North-East"];
const BUDGET_PRESETS = [
  { label: "Under S$50K",   min: 0,      max: 50000  },
  { label: "S$50K–S$80K",   min: 50000,  max: 80000  },
  { label: "S$80K–S$120K",  min: 80000,  max: 120000 },
  { label: "S$120K+",       min: 120000, max: Infinity },
];
const SORT_OPTIONS = ["Recommended", "Highest Rated", "Most Reviewed", "Lowest Budget"];
const PAGE_SIZE = 6;

export default function FirmDirectoryClient({ initialFirms }: Props) {
  const searchParams = useSearchParams();
  const stylesRef = useRef<HTMLDivElement>(null);

  const [searchQuery, setSearchQuery]           = useState("");
  const [sortBy, setSortBy]                     = useState("Recommended");
  const [activeAccreditations, setActiveAccreditations] = useState<string[]>([]);
  const [activeSpecialisations, setActiveSpecialisations] = useState<string[]>([]);
  const [activeStyles, setActiveStyles]         = useState<string[]>([]);
  const [activeDistricts, setActiveDistricts]   = useState<string[]>([]);
  const [activeBudget, setActiveBudget]         = useState<number | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [viewMode, setViewMode]                 = useState<"grid" | "list">("grid");
  const [visibleCount, setVisibleCount]         = useState(PAGE_SIZE);

  // ── Apply URL params on mount ──
  useEffect(() => {
    const badge = searchParams.get("badge");
    if (badge === "casetrust") {
      setActiveAccreditations(["CaseTrust"]);
      setShowMobileFilters(true);
    } else if (badge === "hdb-specialist") {
      setActiveSpecialisations(["HDB Specialist"]);
      setShowMobileFilters(true);
    }
    const open = searchParams.get("open");
    if (open === "styles") {
      setShowMobileFilters(true);
      setTimeout(() => stylesRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 300);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredFirms = useMemo(() => {
    let r = [...initialFirms];

    // Full-text search: name + bio + styles
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      r = r.filter(f =>
        f.name.toLowerCase().includes(q) ||
        f.bio.toLowerCase().includes(q) ||
        f.styles.some(s => s.toLowerCase().includes(q)) ||
        f.district.toLowerCase().includes(q)
      );
    }

    if (activeAccreditations.length > 0)
      r = r.filter(f => activeAccreditations.every(acc => f.accreditations.some(a => a.name === acc)));
    if (activeSpecialisations.length > 0)
      r = r.filter(f => activeSpecialisations.every(spec => f.badges.some(b => b.name === spec)));
    if (activeStyles.length > 0)
      r = r.filter(f => activeStyles.every(style => f.styles.includes(style as any)));
    if (activeDistricts.length > 0)
      r = r.filter(f => activeDistricts.some(d => f.serviceAreas?.includes(d) || f.district === d));
    if (activeBudget !== null) {
      const preset = BUDGET_PRESETS[activeBudget];
      r = r.filter(f => f.avgBudget >= preset.min && f.avgBudget < preset.max);
    }

    if (sortBy === "Highest Rated")  r.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "Most Reviewed") r.sort((a, b) => b.reviewCount - a.reviewCount);
    else if (sortBy === "Lowest Budget") r.sort((a, b) => a.avgBudget - b.avgBudget);
    else r.sort((a, b) => (a.isFeatured === b.isFeatured ? 0 : a.isFeatured ? -1 : 1));

    return r;
  }, [initialFirms, searchQuery, sortBy, activeAccreditations, activeSpecialisations, activeStyles, activeDistricts, activeBudget]);

  const toggle = (state: string[], setter: (v: string[]) => void, val: string) =>
    setter(state.includes(val) ? state.filter(i => i !== val) : [...state, val]);

  const clearAll = () => {
    setSortBy("Recommended"); setActiveAccreditations([]); setActiveSpecialisations([]);
    setActiveStyles([]); setActiveDistricts([]); setActiveBudget(null); setSearchQuery("");
    setVisibleCount(PAGE_SIZE);
  };

  useEffect(() => { setVisibleCount(PAGE_SIZE); },
    [searchQuery, sortBy, activeAccreditations, activeSpecialisations, activeStyles, activeDistricts, activeBudget]);

  const activeFiltersCount = activeAccreditations.length + activeSpecialisations.length +
    activeStyles.length + activeDistricts.length + (activeBudget !== null ? 1 : 0);
  const allActiveFilterLabels = [
    ...activeAccreditations, ...activeSpecialisations, ...activeStyles, ...activeDistricts,
    ...(activeBudget !== null ? [BUDGET_PRESETS[activeBudget].label] : []),
  ];

  // Compute per-filter counts
  const countFor = (predicate: (f: Firm) => boolean) =>
    initialFirms.filter(predicate).length;

  const allDisplayFirms = filteredFirms;
  const displayFirms    = allDisplayFirms.slice(0, visibleCount);
  const hasMore         = visibleCount < allDisplayFirms.length;

  return (
    <div className="min-h-screen bg-[#05080f] pt-20">

      {/* ── Hero ── */}
      <div className="relative bg-[#070b14] border-b border-white/5 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#c8881f]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-sky-500/4 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 pt-14 pb-12">
          <div className="inline-flex items-center gap-2 bg-[#c8881f]/10 border border-[#c8881f]/20 text-[#c8881f] text-xs font-bold uppercase tracking-[0.12em] px-4 py-1.5 rounded-full mb-5">
            <Sparkles className="w-3 h-3" /> Verified Directory
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-[1.05]">
            Find Your Perfect<br /><span className="text-gradient">Interior Designer</span>
          </h1>
          <p className="text-base text-white/50 max-w-xl mb-8 leading-relaxed">
            Browse vetted, CaseTrust-certified firms. Filter by district, budget, style, and speciality.
          </p>

          {/* Trust stats */}
          <div className="flex flex-wrap gap-6 mb-10">
            {[
              { icon: <Building className="w-4 h-4" />, val: "100+",  label: "Verified Firms" },
              { icon: <Shield  className="w-4 h-4" />, val: "98%",   label: "CaseTrust Certified" },
              { icon: <Star    className="w-4 h-4" />, val: "1,400+", label: "Completed Projects" },
            ].map(({ icon, val, label }) => (
              <div key={label} className="flex items-center gap-2.5 text-sm">
                <span className="text-[#c8881f]">{icon}</span>
                <span className="font-bold text-white">{val}</span>
                <span className="text-white/40">{label}</span>
              </div>
            ))}
          </div>

          {/* Search */}
          <div className="flex gap-3 max-w-2xl">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
              <input
                type="text"
                placeholder="Search firm name, style (e.g. Japandi), district…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-10 py-3.5 text-white text-sm focus:outline-none focus:border-[#c8881f]/60 focus:bg-white/8 transition-all placeholder-white/25"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden relative bg-white/5 border border-white/10 hover:border-white/20 rounded-2xl px-4 flex items-center gap-2 text-white/70 text-sm font-medium transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              {activeFiltersCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 text-[10px] font-black bg-[#c8881f] text-white rounded-full flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Layout ── */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 items-start">

        {/* ── Sidebar ── */}
        <aside className={`${showMobileFilters ? "block" : "hidden"} lg:block lg:sticky lg:top-24 z-30`}>
          <div className="bg-[#0a0e1a] border border-white/8 rounded-2xl p-6 space-y-7">

            {/* Header */}
            <div className="flex items-center justify-between">
              <span className="text-white font-bold flex items-center gap-2 text-sm">
                <SlidersHorizontal className="w-4 h-4 text-[#c8881f]" /> Filters
              </span>
              {(activeFiltersCount > 0 || sortBy !== "Recommended" || searchQuery) && (
                <button onClick={clearAll} className="text-[#c8881f] text-xs font-semibold hover:text-white transition-colors flex items-center gap-1">
                  <X className="w-3 h-3" /> Clear all
                </button>
              )}
            </div>

            {/* Sort */}
            <div>
              <h4 className="text-[10px] font-black text-white/35 uppercase tracking-[0.14em] mb-3">Sort By</h4>
              <div className="space-y-1.5">
                {SORT_OPTIONS.map(opt => (
                  <button key={opt} onClick={() => setSortBy(opt)}
                    className={`w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-all ${sortBy === opt ? "bg-[#c8881f]/15 text-[#c8881f] font-semibold border border-[#c8881f]/25" : "text-white/50 hover:text-white/80 hover:bg-white/5"}`}
                  >
                    <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shrink-0 ${sortBy === opt ? "border-[#c8881f] bg-[#c8881f]" : "border-white/20"}`}>
                      {sortBy === opt && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-px bg-white/5" />

            {/* Budget */}
            <div>
              <h4 className="text-[10px] font-black text-white/35 uppercase tracking-[0.14em] mb-3 flex items-center gap-1.5">
                <DollarSign className="w-3 h-3" /> Budget Range
              </h4>
              <div className="space-y-1.5">
                {BUDGET_PRESETS.map((p, i) => (
                  <button key={p.label} onClick={() => setActiveBudget(activeBudget === i ? null : i)}
                    className={`w-full text-left flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all border ${activeBudget === i ? "bg-[#c8881f]/15 text-[#c8881f] font-semibold border-[#c8881f]/25" : "text-white/50 border-transparent hover:text-white/80 hover:bg-white/5"}`}
                  >
                    <span>{p.label}</span>
                    <span className="text-[10px] text-white/25">
                      {initialFirms.filter(f => f.avgBudget >= p.min && f.avgBudget < p.max).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="h-px bg-white/5" />

            {/* District */}
            <div>
              <h4 className="text-[10px] font-black text-white/35 uppercase tracking-[0.14em] mb-3 flex items-center gap-1.5">
                <MapPin className="w-3 h-3" /> Service Area
              </h4>
              <div className="flex flex-wrap gap-2">
                {DISTRICTS.map(d => {
                  const isActive = activeDistricts.includes(d);
                  const cnt = countFor(f => f.serviceAreas?.includes(d) || f.district === d);
                  return (
                    <button key={d} onClick={() => toggle(activeDistricts, setActiveDistricts, d)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${isActive ? "bg-[#c8881f] border-[#c8881f] text-white" : "bg-white/5 border-white/10 text-white/50 hover:border-white/25 hover:text-white/80"}`}
                    >
                      {d} <span className="opacity-50">({cnt})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="h-px bg-white/5" />

            {/* Accreditation */}
            <FilterGroup title="Accreditation" options={ACCREDITATIONS} active={activeAccreditations}
              onToggle={v => toggle(activeAccreditations, setActiveAccreditations, v)}
              countFor={v => countFor(f => f.accreditations.some(a => a.name === v))} />

            <div className="h-px bg-white/5" />

            {/* Specialisation */}
            <FilterGroup title="Specialisation" options={SPECIALISATIONS} active={activeSpecialisations}
              onToggle={v => toggle(activeSpecialisations, setActiveSpecialisations, v)}
              countFor={v => countFor(f => f.badges.some(b => b.name === v))} />

            <div className="h-px bg-white/5" />

            {/* Design Style */}
            <div ref={stylesRef} id="design-styles">
              <FilterGroup title="Design Style" options={STYLES} active={activeStyles}
                onToggle={v => toggle(activeStyles, setActiveStyles, v)}
                countFor={v => countFor(f => f.styles.includes(v as any))} />
            </div>

            {/* Match CTA */}
            <div className="bg-gradient-to-br from-[#c8881f]/15 to-[#c8881f]/5 border border-[#c8881f]/25 rounded-2xl p-5">
              <p className="text-[#c8881f] font-bold text-sm mb-1.5">Not sure who to pick?</p>
              <p className="text-xs text-white/50 mb-4 leading-relaxed">Let us match you with 6 perfect firms based on your requirements.</p>
              <Link href="/find-my-id" className="block w-full text-center py-2.5 bg-[#c8881f] hover:bg-[#d4951f] text-white rounded-xl text-xs font-black tracking-wide shadow-lg shadow-[#c8881f]/25 transition-all hover:-translate-y-0.5">
                Get Matched Free →
              </Link>
            </div>

          </div>
        </aside>

        {/* ── Results ── */}
        <div>
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
            <p className="flex-1 text-sm text-white/50">
              Showing <span className="text-white font-bold">{displayFirms.length}</span>
              {hasMore && <span className="text-white/30"> of {allDisplayFirms.length}</span>}
              <span> verified firms</span>
              {activeFiltersCount > 0 && <span className="text-[#c8881f]"> · {activeFiltersCount} filter{activeFiltersCount > 1 ? "s" : ""} active</span>}
            </p>

            {/* Active filter pills */}
            <div className="flex flex-wrap gap-2">
              {allActiveFilterLabels.map(f => (
                <button key={f} onClick={() => {
                  if (activeAccreditations.includes(f)) setActiveAccreditations(activeAccreditations.filter(x => x !== f));
                  if (activeSpecialisations.includes(f)) setActiveSpecialisations(activeSpecialisations.filter(x => x !== f));
                  if (activeStyles.includes(f)) setActiveStyles(activeStyles.filter(x => x !== f));
                  if (activeDistricts.includes(f)) setActiveDistricts(activeDistricts.filter(x => x !== f));
                  if (activeBudget !== null && BUDGET_PRESETS[activeBudget].label === f) setActiveBudget(null);
                }}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c8881f]/15 text-[#c8881f] text-xs font-semibold border border-[#c8881f]/25 hover:bg-red-500/15 hover:text-red-400 hover:border-red-500/25 transition-colors"
                >
                  {f} <X className="w-3 h-3" />
                </button>
              ))}
            </div>

            {/* View toggle */}
            <div className="flex items-center bg-white/5 border border-white/8 rounded-xl p-1 shrink-0">
              {(["grid", "list"] as const).map(m => (
                <button key={m} onClick={() => setViewMode(m)}
                  className={`p-2 rounded-lg transition-all ${viewMode === m ? "bg-white/10 text-white" : "text-white/30 hover:text-white/60"}`}>
                  {m === "grid" ? <LayoutGrid className="w-4 h-4" /> : <List className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>

          {/* Cards */}
          {displayFirms.length > 0 ? (
            <StaggerContainer
              className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5" : "flex flex-col gap-4"}
              key={displayFirms.map(f => f.id).join("-")}
            >
              {displayFirms.map(firm => (
                <StaggerItem key={firm.id}>
                  {viewMode === "list" ? <FirmListRow firm={firm} /> : <FirmCard firm={firm} />}
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <div className="py-24 text-center border border-white/8 bg-white/3 rounded-3xl">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 border border-white/10">
                <Search className="w-7 h-7 text-white/20" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No firms found</h3>
              <p className="text-white/40 text-sm mb-6">Try adjusting your filters or search query.</p>
              <button onClick={clearAll} className="px-6 py-2.5 bg-[#c8881f] text-white rounded-xl text-sm font-bold hover:bg-[#d4951f] transition-colors">
                Clear All Filters
              </button>
            </div>
          )}

          {/* Load more */}
          {displayFirms.length > 0 && (
            <div className="mt-14 text-center">
              {hasMore ? (
                <>
                  <button onClick={() => setVisibleCount(c => c + PAGE_SIZE)}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/5 border border-white/10 hover:border-[#c8881f]/40 hover:bg-[#c8881f]/5 text-white hover:text-[#c8881f] font-semibold rounded-2xl transition-all text-sm group">
                    Load More Firms <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                  </button>
                  <p className="mt-3 text-xs text-white/30">Showing {displayFirms.length} of {allDisplayFirms.length} firms</p>
                </>
              ) : (
                <p className="text-xs text-white/30">✓ All {allDisplayFirms.length} firms shown</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile CTA */}
      <div className="lg:hidden border-t border-white/5 bg-[#070b14] py-8 px-4 text-center">
        <p className="text-white/60 text-sm mb-4">Still can't decide? Let us match you.</p>
        <Link href="/find-my-id" className="inline-flex items-center gap-2 px-6 py-3 bg-[#c8881f] text-white font-bold rounded-xl text-sm shadow-lg shadow-[#c8881f]/20">
          Start Free Match <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

/* ── Filter group ── */
function FilterGroup({ title, options, active, onToggle, countFor }: {
  title: string; options: string[]; active: string[];
  onToggle: (v: string) => void; countFor: (v: string) => number;
}) {
  return (
    <div>
      <h4 className="text-[10px] font-black text-white/35 uppercase tracking-[0.14em] mb-3">{title}</h4>
      <div className="space-y-1.5">
        {options.map(opt => {
          const isActive = active.includes(opt);
          const cnt = countFor(opt);
          return (
            <label key={opt} onClick={e => { e.preventDefault(); onToggle(opt); }}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl cursor-pointer group hover:bg-white/5 transition-colors">
              <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all ${isActive ? "bg-[#c8881f] border-[#c8881f]" : "border-white/20 bg-white/4 group-hover:border-white/35"}`}>
                {isActive && <CheckCircle2 className="w-3 h-3 text-[#05080f]" strokeWidth={3} />}
              </div>
              <span className={`flex-1 text-sm transition-colors ${isActive ? "text-white font-medium" : "text-white/50 group-hover:text-white/80"}`}>{opt}</span>
              <span className="text-[10px] text-white/25">{cnt}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

/* ── List row ── */
function FirmListRow({ firm }: { firm: Firm }) {
  const yearsActive = new Date().getFullYear() - firm.established;
  return (
    <div className="group flex gap-5 bg-[#0a0e1a] border border-white/8 rounded-2xl overflow-hidden hover:border-[#c8881f]/30 transition-all p-4">
      <div className="relative w-36 h-28 rounded-xl overflow-hidden shrink-0">
        <Image src={firm.banner} alt={firm.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-2 left-2 w-8 h-8 rounded-lg overflow-hidden border border-white/20 bg-white">
          <Image src={firm.logo} alt={firm.name} fill className="object-cover" />
        </div>
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <div>
          <div className="flex items-start justify-between gap-3 mb-1">
            <h3 className="font-bold text-white text-base leading-tight group-hover:text-[#c8881f] transition-colors truncate">{firm.name}</h3>
            <div className="flex items-center gap-1 text-[#c8881f] shrink-0">
              <Star className="w-3 h-3 fill-current" />
              <span className="text-sm font-bold">{firm.rating.toFixed(1)}</span>
              <span className="text-xs text-white/40">({firm.reviewCount})</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {firm.isCaseTrust && <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">CaseTrust</span>}
            {firm.styles.slice(0, 2).map(s => <span key={s} className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#c8881f]/8 text-[#c8881f]/70 border border-[#c8881f]/15">{s}</span>)}
          </div>
          {/* Latest review snippet */}
          {firm.reviews[0] && (
            <p className="text-xs text-white/40 line-clamp-1 italic">"{firm.reviews[0].body.slice(0, 80)}…"</p>
          )}
        </div>
        <div className="flex items-center gap-4 mt-2">
          <span className="text-xs text-white/40">{firm.district} · {yearsActive}+ yrs · S${firm.avgBudget / 1000}K avg</span>
          <div className="ml-auto flex gap-2">
            <Link href={`/firms/${firm.slug}`} className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/5 hover:bg-white/10 text-white/70 border border-white/8 transition-colors">View</Link>
            <Link href={`/firms/${firm.slug}?enquire=true`} className="px-3 py-1.5 text-xs font-bold rounded-lg bg-[#c8881f] hover:bg-[#d4951f] text-white transition-colors">Enquire</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
