"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Heart, X, ChevronDown, Home, Building2,
  TreePine, Briefcase, ArrowUpDown, SlidersHorizontal,
  Layers, TrendingUp, Images,
} from "lucide-react";
import type { Project, Firm } from "@/types/firm";

interface Props {
  projects: Project[];
  firms: Firm[];
}

type PropertyFilter = "All" | "HDB" | "Condo" | "Landed" | "Commercial";
type StyleFilter =
  | "All" | "Contemporary" | "Modern" | "Minimalist"
  | "Japandi" | "Scandinavian" | "Industrial" | "Luxury" | "Peranakan";
type RoomFilter = "All" | "Living Room" | "Kitchen" | "Master Bedroom" | "Bathroom" | "Study" | "Dining";
type BudgetFilter = "All" | "Under S$50K" | "S$50K–S$80K" | "S$80K–S$120K" | "S$120K+";
type SortOption = "Newest" | "Highest Budget" | "Lowest Budget";

const PROPERTY_TABS: { val: PropertyFilter; icon: React.ElementType; label: string }[] = [
  { val: "All",        icon: Layers,     label: "All"        },
  { val: "HDB",        icon: Building2,  label: "HDB"        },
  { val: "Condo",      icon: Home,       label: "Condo"      },
  { val: "Landed",     icon: TreePine,   label: "Landed"     },
  { val: "Commercial", icon: Briefcase,  label: "Commercial" },
];

const STYLES: StyleFilter[] = [
  "All","Contemporary","Modern","Minimalist","Japandi","Scandinavian","Industrial","Luxury","Peranakan",
];

const ROOMS: RoomFilter[] = ["All","Living Room","Kitchen","Master Bedroom","Bathroom","Study","Dining"];
const BUDGETS: BudgetFilter[] = ["All","Under S$50K","S$50K–S$80K","S$80K–S$120K","S$120K+"];
const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "Newest",          label: "Newest"         },
  { value: "Highest Budget",  label: "Highest Budget" },
  { value: "Lowest Budget",   label: "Lowest Budget"  },
];

function budgetInRange(budget: number, f: BudgetFilter) {
  if (f === "All") return true;
  if (f === "Under S$50K")    return budget < 50000;
  if (f === "S$50K–S$80K")    return budget >= 50000 && budget <= 80000;
  if (f === "S$80K–S$120K")   return budget > 80000 && budget <= 120000;
  if (f === "S$120K+")        return budget > 120000;
  return true;
}

function fmt(n: number) {
  return n >= 1000 ? `S$${(n / 1000).toFixed(0)}K` : `S$${n}`;
}

const PAGE = 12;

export default function InspirationsClient({ projects, firms }: Props) {
  const searchParams = useSearchParams();
  const [property, setProperty]     = useState<PropertyFilter>("All");
  const [style, setStyle]           = useState<StyleFilter>("All");
  const [room, setRoom]             = useState<RoomFilter>("All");
  const [budget, setBudget]         = useState<BudgetFilter>("All");
  const [sort, setSort]             = useState<SortOption>("Newest");
  const [visible, setVisible]       = useState(PAGE);
  const [saved, setSaved]           = useState<Set<string>>(new Set());

  // Sync filters from URL params on every navigation
  useEffect(() => {
    const type = searchParams.get("type");
    const map: Record<string, PropertyFilter> = {
      hdb: "HDB", condo: "Condo", landed: "Landed", commercial: "Commercial",
    };
    setProperty(type ? (map[type.toLowerCase()] ?? "All") : "All");

    const styleParam = searchParams.get("style");
    const matched = styleParam
      ? STYLES.find(s => s.toLowerCase() === styleParam.toLowerCase())
      : undefined;
    setStyle(matched && matched !== "All" ? matched : "All");
  }, [searchParams]);

  useEffect(() => {
    try {
      const s = localStorage.getItem("inspiration-saves");
      if (s) setSaved(new Set(JSON.parse(s)));
    } catch { /* noop */ }
  }, []);

  useEffect(() => { setVisible(PAGE); }, [property, style, room, budget, sort]);

  const firmMap = useMemo(() => {
    const m = new Map<string, Firm>();
    firms.forEach(f => m.set(f.slug, f));
    return m;
  }, [firms]);

  const filtered = useMemo(() => {
    let r = projects.filter(p => {
      if (property !== "All" && p.propertyType !== property) return false;
      if (style !== "All" && p.style !== style) return false;
      if (room !== "All" && !p.rooms.includes(room as never)) return false;
      if (!budgetInRange(p.budget, budget)) return false;
      return true;
    });
    r = [...r].sort((a, b) => {
      if (sort === "Highest Budget") return b.budget - a.budget;
      if (sort === "Lowest Budget")  return a.budget - b.budget;
      return (b.completionDate ?? "").localeCompare(a.completionDate ?? "");
    });
    return r;
  }, [projects, property, style, room, budget, sort]);

  const displayed = filtered.slice(0, visible);
  const hasMore   = visible < filtered.length;

  const hasFilters = property !== "All" || style !== "All" || room !== "All" || budget !== "All";

  function clearAll() {
    setProperty("All"); setStyle("All"); setRoom("All");
    setBudget("All"); setSort("Newest");
  }

  function toggleSave(slug: string, e: React.MouseEvent) {
    e.preventDefault(); e.stopPropagation();
    setSaved(prev => {
      const next = new Set(prev);
      next.has(slug) ? next.delete(slug) : next.add(slug);
      try { localStorage.setItem("inspiration-saves", JSON.stringify([...next])); } catch { /* noop */ }
      return next;
    });
  }

  const chips: { label: string; onRemove: () => void }[] = [];
  if (property !== "All") chips.push({ label: property, onRemove: () => setProperty("All") });
  if (style !== "All")    chips.push({ label: style,    onRemove: () => setStyle("All") });
  if (room !== "All")     chips.push({ label: room,     onRemove: () => setRoom("All") });
  if (budget !== "All")   chips.push({ label: budget,   onRemove: () => setBudget("All") });

  return (
    <div className="min-h-screen bg-[#05080f]">

      {/* ══════════════════════════════════════
          STICKY FILTER BAR
      ══════════════════════════════════════ */}
      <div className="sticky top-16 z-20 bg-[#070b14]/95 backdrop-blur-xl border-b border-white/6 shadow-xl shadow-black/30">

        {/* Row 1 — Property type icon tabs */}
        <div className="max-w-7xl mx-auto px-4 pt-3">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 min-w-max pb-3">
              {PROPERTY_TABS.map(({ val, icon: Icon, label }) => {
                const count = val === "All"
                  ? projects.length
                  : projects.filter(p => p.propertyType === val).length;
                const active = property === val;
                return (
                  <button
                    key={val}
                    onClick={() => setProperty(val)}
                    className={`relative flex flex-col items-center gap-1.5 px-5 pt-2.5 pb-2 rounded-2xl min-w-18 transition-all duration-200 border group ${
                      active
                        ? "bg-[#c8881f] border-[#c8881f] text-white shadow-lg shadow-[#c8881f]/20"
                        : "bg-white/4 border-white/8 text-white/45 hover:bg-white/7 hover:border-white/18 hover:text-white/75"
                    }`}
                  >
                    <Icon className={`w-4 h-4 transition-transform duration-200 ${active ? "" : "group-hover:scale-110"}`} />
                    <span className="text-[10px] font-bold whitespace-nowrap">{label}</span>
                    <span className={`text-[9px] font-semibold ${active ? "text-white/65" : "text-white/25"}`}>{count}</span>
                    {active && <span className="absolute -bottom-px left-4 right-4 h-0.5 bg-white/40 rounded-full" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Row 2 — Style pills + controls */}
        <div className="max-w-7xl mx-auto px-4 py-2.5 border-t border-white/5">
          <div className="flex items-center gap-2 flex-wrap">

            {/* Style pills — scrollable */}
            <div className="flex-1 overflow-x-auto scrollbar-hide">
              <div className="flex gap-1.5 min-w-max">
                {STYLES.map(s => (
                  <button
                    key={s}
                    onClick={() => setStyle(s)}
                    className={`px-3 py-1.5 rounded-xl text-[10px] font-bold whitespace-nowrap transition-all border ${
                      style === s
                        ? "bg-white/12 border-white/20 text-white"
                        : "bg-transparent border-white/8 text-white/40 hover:border-white/18 hover:text-white/65"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden sm:block w-px h-5 bg-white/10 shrink-0" />

            {/* Room */}
            <div className="flex items-center bg-white/4 border border-white/8 rounded-xl px-2.5 py-1.5">
              <select
                value={room}
                onChange={e => setRoom(e.target.value as RoomFilter)}
                className="appearance-none bg-transparent text-white/50 text-[10px] font-bold focus:outline-none cursor-pointer focus:text-white transition-colors pr-3"
              >
                {ROOMS.map(r => (
                  <option key={r} value={r} className="bg-[#0d1120] text-white">
                    {r === "All" ? "All Rooms" : r}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3 h-3 text-white/25 shrink-0 -ml-2 pointer-events-none" />
            </div>

            {/* Budget */}
            <div className="flex items-center bg-white/4 border border-white/8 rounded-xl px-2.5 py-1.5">
              <select
                value={budget}
                onChange={e => setBudget(e.target.value as BudgetFilter)}
                className="appearance-none bg-transparent text-white/50 text-[10px] font-bold focus:outline-none cursor-pointer focus:text-white transition-colors pr-3"
              >
                {BUDGETS.map(b => (
                  <option key={b} value={b} className="bg-[#0d1120] text-white">
                    {b === "All" ? "All Budgets" : b}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3 h-3 text-white/25 shrink-0 -ml-2 pointer-events-none" />
            </div>

            {/* Sort */}
            <div className="flex items-center gap-1.5 bg-white/4 border border-white/8 rounded-xl px-2.5 py-1.5">
              <ArrowUpDown className="w-3 h-3 text-white/30 shrink-0" />
              <select
                value={sort}
                onChange={e => setSort(e.target.value as SortOption)}
                className="appearance-none bg-transparent text-white/50 text-[10px] font-bold focus:outline-none cursor-pointer focus:text-white transition-colors pr-3"
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value} className="bg-[#0d1120] text-white">{o.label}</option>
                ))}
              </select>
              <ChevronDown className="w-3 h-3 text-white/25 shrink-0 -ml-2 pointer-events-none" />
            </div>

            <div className="hidden sm:block w-px h-5 bg-white/10 shrink-0" />

            {/* Count */}
            <div className="flex items-center gap-1.5 text-xs shrink-0">
              <TrendingUp className="w-3.5 h-3.5 text-white/20" />
              <span className="text-white/35">
                <span className="text-white font-bold">{filtered.length}</span>
                <span className="hidden sm:inline"> of {projects.length}</span>
                {" "}projects
              </span>
            </div>

            {/* Clear */}
            {hasFilters && (
              <button
                onClick={clearAll}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/8 border border-red-500/20 text-red-400/80 hover:bg-red-500/15 hover:text-red-400 text-[10px] font-bold transition-all shrink-0"
              >
                <X className="w-3 h-3" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* Row 3 — Active chips (conditional) */}
        {chips.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 pb-3 flex flex-wrap gap-2 items-center">
            <span className="text-[9px] font-semibold text-white/25 uppercase tracking-wider">
              <SlidersHorizontal className="w-3 h-3 inline mr-1" />Active:
            </span>
            {chips.map(chip => (
              <button
                key={chip.label}
                onClick={chip.onRemove}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#c8881f]/12 text-[#c8881f] text-[10px] font-semibold border border-[#c8881f]/22 hover:bg-red-500/12 hover:text-red-400 hover:border-red-500/22 transition-all group"
              >
                {chip.label}
                <X className="w-2.5 h-2.5 opacity-70 group-hover:opacity-100" />
              </button>
            ))}
          </div>
        )}
      </div>
      {/* ══ End filter bar ══ */}

      {/* ── Grid ── */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 text-center border border-white/8 bg-white/2 rounded-3xl">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center mb-5">
              <Images className="w-7 h-7 text-white/20" />
            </div>
            <h3 className="text-white/70 font-bold text-lg mb-2">No projects found</h3>
            <p className="text-white/30 text-sm mb-6 max-w-xs">
              Try adjusting your filters to discover more renovation projects.
            </p>
            <button
              onClick={clearAll}
              className="px-6 py-2.5 bg-[#c8881f] text-white text-sm font-bold rounded-xl hover:bg-[#d4951f] transition-colors shadow-lg shadow-[#c8881f]/25"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayed.map(project => {
                const firm = firmMap.get(project.firmSlug);
                const isSaved = saved.has(project.slug);
                const hasBA = !!project.beforePhotoUrl;

                return (
                  <Link
                    key={project.slug}
                    href={`/inspirations/${project.slug}`}
                    className="group bg-[#0a0e1a] border border-white/8 rounded-2xl overflow-hidden hover:border-[#c8881f]/35 hover:shadow-2xl hover:shadow-[#c8881f]/6 transition-all duration-400 flex flex-col"
                  >
                    {/* Image */}
                    <div className="aspect-4/3 relative overflow-hidden">
                      {project.photos[0]?.url && (
                        <Image
                          src={project.photos[0].url}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-600 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      )}

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

                      {/* Top badges */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#c8881f] text-white shadow-md">
                          {project.style}
                        </span>
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-black/50 backdrop-blur-sm text-white/80 border border-white/15">
                          {project.propertyType}
                        </span>
                      </div>

                      {/* Before/After badge */}
                      {hasBA && (
                        <div className="absolute top-3 right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-sky-500/80 backdrop-blur-sm text-white border border-sky-400/30">
                            B/A
                          </span>
                        </div>
                      )}

                      {/* Save button */}
                      <button
                        onClick={e => toggleSave(project.slug, e)}
                        className={`absolute top-3 right-3 z-10 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 border ${
                          isSaved
                            ? "bg-red-500 border-red-400 scale-110 shadow-lg shadow-red-500/30"
                            : "bg-black/40 border-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100"
                        }`}
                        aria-label={isSaved ? "Unsave" : "Save"}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isSaved ? "text-white fill-white" : "text-white"}`} />
                      </button>
                    </div>

                    {/* Info */}
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="text-white font-bold text-sm leading-snug mb-1 line-clamp-1 group-hover:text-[#c8881f] transition-colors">
                        {project.title}
                      </h3>
                      {firm && (
                        <p className="text-white/35 text-xs mb-3">{firm.name}</p>
                      )}
                      <div className="flex items-center gap-3 text-xs mt-auto pt-3 border-t border-white/6">
                        <span className="text-emerald-400 font-bold">{fmt(project.budget)}</span>
                        <span className="text-white/20">·</span>
                        <span className="text-white/40">{project.sqft.toLocaleString()} sqft</span>
                        {project.completionDate && (
                          <>
                            <span className="text-white/20">·</span>
                            <span className="text-white/30 ml-auto">{project.completionDate}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Load more */}
            <div className="mt-12 text-center">
              {hasMore ? (
                <>
                  <button
                    onClick={() => setVisible(v => v + PAGE)}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/5 border border-white/10 hover:border-[#c8881f]/40 hover:bg-[#c8881f]/5 text-white hover:text-[#c8881f] font-semibold rounded-2xl transition-all text-sm group"
                  >
                    Load More Projects
                    <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                  </button>
                  <p className="mt-3 text-xs text-white/25">
                    Showing {displayed.length} of {filtered.length} projects
                  </p>
                </>
              ) : (
                <p className="text-xs text-white/25">✓ All {filtered.length} projects shown</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
