"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Building, Trees, Briefcase, ArrowRight, Info } from "lucide-react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────
type PropertyType = "HDB" | "Condo" | "Landed" | "Commercial";
type FlatSize = "studio" | "3room" | "4room" | "5room" | "large";
type ScopeItem =
  | "Living Room"
  | "Kitchen"
  | "Master Bedroom"
  | "Common Bedrooms"
  | "Bathrooms"
  | "Dining Area"
  | "Entire Flat";
type QualityLevel = "basic" | "mid" | "premium";

// ─── Cost data ────────────────────────────────────────────────────────────────
const BASE_COSTS: Record<
  Exclude<ScopeItem, "Entire Flat">,
  Record<PropertyType, [number, number]>
> = {
  "Living Room":       { HDB: [8000, 12000],  Condo: [10000, 18000], Landed: [15000, 25000], Commercial: [12000, 20000] },
  Kitchen:             { HDB: [12000, 18000], Condo: [15000, 25000], Landed: [20000, 40000], Commercial: [15000, 28000] },
  "Master Bedroom":    { HDB: [6000, 10000],  Condo: [8000, 14000],  Landed: [12000, 20000], Commercial: [8000, 14000]  },
  "Common Bedrooms":   { HDB: [4000, 7000],   Condo: [5000, 9000],   Landed: [8000, 14000],  Commercial: [5000, 9000]   },
  Bathrooms:           { HDB: [6000, 10000],  Condo: [7000, 12000],  Landed: [10000, 18000], Commercial: [8000, 14000]  },
  "Dining Area":       { HDB: [3000, 5000],   Condo: [4000, 7000],   Landed: [6000, 12000],  Commercial: [4000, 8000]   },
};

const QUALITY_FACTOR: Record<QualityLevel, number> = {
  basic: 1.0,
  mid: 1.4,
  premium: 2.0,
};

const TIMELINE: Record<FlatSize, string> = {
  studio: "6–8 weeks",
  "3room": "8–10 weeks",
  "4room": "10–12 weeks",
  "5room": "12–16 weeks",
  large: "16–24 weeks",
};

const SCOPE_ITEMS: ScopeItem[] = [
  "Living Room",
  "Kitchen",
  "Master Bedroom",
  "Common Bedrooms",
  "Bathrooms",
  "Dining Area",
  "Entire Flat",
];

const PROPERTY_OPTIONS: { type: PropertyType; icon: React.ElementType; label: string; sub: string }[] = [
  { type: "HDB",        icon: Building2,  label: "HDB",        sub: "BTO / Resale" },
  { type: "Condo",      icon: Building,   label: "Condo",      sub: "Private / EC" },
  { type: "Landed",     icon: Trees,      label: "Landed",     sub: "Terrace / Semi-D / Bungalow" },
  { type: "Commercial", icon: Briefcase,  label: "Commercial", sub: "Office / Retail" },
];

const FLAT_SIZES: { id: FlatSize; label: string; sub: string }[] = [
  { id: "studio",  label: "Studio / 2-Room",  sub: "Below 700 sqft"    },
  { id: "3room",   label: "3-Room",            sub: "700 – 900 sqft"    },
  { id: "4room",   label: "4-Room",            sub: "900 – 1,200 sqft"  },
  { id: "5room",   label: "5-Room / EA",       sub: "1,200 – 1,600 sqft" },
  { id: "large",   label: "Large",             sub: "Above 1,600 sqft"  },
];

const QUALITY_OPTIONS: { id: QualityLevel; label: string; sub: string; color: string }[] = [
  { id: "basic",   label: "Basic",     sub: "Value-for-money, functional finishes",          color: "border-white/20" },
  { id: "mid",     label: "Mid-Range", sub: "Balance of quality & cost, popular choice",     color: "border-[#c8881f]/60" },
  { id: "premium", label: "Premium",   sub: "Luxury finishes, bespoke details",              color: "border-purple-400/60" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function fmtK(n: number) {
  return `S$${Math.round(n / 1000)}k`;
}
function fmtRange(lo: number, hi: number) {
  return `S$${Math.round(lo / 1000).toLocaleString()}k – S$${Math.round(hi / 1000).toLocaleString()}k`;
}

function calcCosts(
  property: PropertyType,
  scope: ScopeItem[],
  quality: QualityLevel
): { item: ScopeItem; lo: number; hi: number }[] {
  const factor = QUALITY_FACTOR[quality];
  const effectiveScope = scope.includes("Entire Flat")
    ? (Object.keys(BASE_COSTS) as ScopeItem[])
    : scope.filter((s): s is Exclude<ScopeItem, "Entire Flat"> => s !== "Entire Flat");

  const breakdown = effectiveScope.map((item) => {
    const [lo, hi] = BASE_COSTS[item as Exclude<ScopeItem, "Entire Flat">][property];
    return { item, lo: Math.round(lo * factor), hi: Math.round(hi * factor) };
  });

  if (scope.includes("Entire Flat")) {
    return breakdown.map(({ item, lo, hi }) => ({
      item,
      lo: Math.round(lo * 0.85),
      hi: Math.round(hi * 0.85),
    }));
  }
  return breakdown;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function BudgetCalculatorClient() {
  const [property, setProperty] = useState<PropertyType | null>(null);
  const [flatSize, setFlatSize] = useState<FlatSize | null>(null);
  const [scope, setScope] = useState<ScopeItem[]>([]);
  const [quality, setQuality] = useState<QualityLevel | null>(null);

  const isComplete = property && flatSize && scope.length > 0 && quality;

  const breakdown = useMemo(() => {
    if (!isComplete) return [];
    return calcCosts(property, scope, quality);
  }, [property, scope, quality, isComplete]);

  const totalLo = breakdown.reduce((a, b) => a + b.lo, 0);
  const totalHi = breakdown.reduce((a, b) => a + b.hi, 0);

  function toggleScope(item: ScopeItem) {
    if (item === "Entire Flat") {
      if (scope.includes("Entire Flat")) {
        setScope([]);
      } else {
        setScope([...SCOPE_ITEMS]);
      }
      return;
    }
    setScope((prev) => {
      const next = prev.includes(item)
        ? prev.filter((s) => s !== item && s !== "Entire Flat")
        : [...prev.filter((s) => s !== "Entire Flat"), item];
      return next;
    });
  }

  return (
    <div className="min-h-screen bg-[#05080f] text-white">
      {/* ── Hero ── */}
      <section className="pt-32 pb-10 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="section-label mb-3">Free Tool</p>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight tracking-tight">
            Renovation Budget{" "}
            <span className="text-[#c8881f]">Calculator</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed">
            Get indicative renovation cost estimates for your Singapore home — HDB, Condo or Landed. Adjust property type, scope and quality to see a detailed breakdown instantly.
          </p>
        </div>
      </section>

      {/* ── Calculator Card ── */}
      <section className="px-4 pb-16">
        <div className="bg-[#0a0e1a] border border-white/8 rounded-3xl p-6 sm:p-8 max-w-3xl mx-auto space-y-10">

          {/* Step 1: Property Type */}
          <div>
            <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#c8881f]/20 text-[#c8881f] text-xs font-black flex items-center justify-center">1</span>
              Property Type
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {PROPERTY_OPTIONS.map(({ type, icon: Icon, label, sub }) => (
                <button
                  key={type}
                  onClick={() => setProperty(type)}
                  className={`rounded-2xl border p-4 flex flex-col items-center gap-2 transition-all duration-200 cursor-pointer ${
                    property === type
                      ? "border-[#c8881f] bg-[#c8881f]/10"
                      : "border-white/8 bg-[#070b14] hover:border-white/20"
                  }`}
                >
                  <Icon
                    size={28}
                    className={property === type ? "text-[#c8881f]" : "text-white/40"}
                  />
                  <span className={`font-bold text-sm ${property === type ? "text-white" : "text-white/70"}`}>{label}</span>
                  <span className="text-white/40 text-xs text-center leading-tight">{sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Flat Size */}
          <div>
            <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#c8881f]/20 text-[#c8881f] text-xs font-black flex items-center justify-center">2</span>
              Flat Size
            </h2>
            <div className="flex flex-col sm:flex-row flex-wrap gap-2">
              {FLAT_SIZES.map(({ id, label, sub }) => (
                <button
                  key={id}
                  onClick={() => setFlatSize(id)}
                  className={`flex-1 min-w-[140px] rounded-xl border px-4 py-3 text-left transition-all duration-200 cursor-pointer ${
                    flatSize === id
                      ? "border-[#c8881f] bg-[#c8881f]/10"
                      : "border-white/8 bg-[#070b14] hover:border-white/20"
                  }`}
                >
                  <div className={`font-bold text-sm ${flatSize === id ? "text-white" : "text-white/70"}`}>{label}</div>
                  <div className="text-white/40 text-xs mt-0.5">{sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Renovation Scope */}
          <div>
            <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#c8881f]/20 text-[#c8881f] text-xs font-black flex items-center justify-center">3</span>
              Renovation Scope
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SCOPE_ITEMS.map((item) => {
                const checked =
                  item === "Entire Flat"
                    ? scope.includes("Entire Flat")
                    : scope.includes(item);
                const isEntireFlat = item === "Entire Flat";
                return (
                  <label
                    key={item}
                    className={`flex items-center gap-3 rounded-xl border px-4 py-3 cursor-pointer transition-all duration-200 ${
                      checked
                        ? isEntireFlat
                          ? "border-[#c8881f] bg-[#c8881f]/15"
                          : "border-[#c8881f]/60 bg-[#c8881f]/8"
                        : "border-white/8 bg-[#070b14] hover:border-white/20"
                    } ${isEntireFlat ? "col-span-2 sm:col-span-3" : ""}`}
                  >
                    <div
                      className={`w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border transition-colors ${
                        checked ? "bg-[#c8881f] border-[#c8881f]" : "border-white/20"
                      }`}
                      onClick={() => toggleScope(item)}
                    >
                      {checked && (
                        <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                          <path d="M1 4.5L4.5 8L11 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span
                      className={`text-sm font-medium ${checked ? (isEntireFlat ? "text-[#c8881f]" : "text-white") : "text-white/60"}`}
                      onClick={() => toggleScope(item)}
                    >
                      {item}
                      {isEntireFlat && <span className="ml-2 text-xs text-white/40">(includes all rooms + bulk discount)</span>}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Step 4: Quality Level */}
          <div>
            <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#c8881f]/20 text-[#c8881f] text-xs font-black flex items-center justify-center">4</span>
              Quality Level
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {QUALITY_OPTIONS.map(({ id, label, sub }) => (
                <button
                  key={id}
                  onClick={() => setQuality(id)}
                  className={`rounded-2xl border px-5 py-4 text-left transition-all duration-200 cursor-pointer ${
                    quality === id
                      ? "border-[#c8881f] bg-[#c8881f]/10"
                      : "border-white/8 bg-[#070b14] hover:border-white/20"
                  }`}
                >
                  <div className={`font-bold mb-1 ${quality === id ? "text-[#c8881f]" : "text-white/80"}`}>{label}</div>
                  <div className="text-white/40 text-xs leading-relaxed">{sub}</div>
                  <div className={`mt-2 text-xs font-bold ${quality === id ? "text-[#c8881f]" : "text-white/30"}`}>
                    {id === "basic" && "1.0× base rate"}
                    {id === "mid" && "1.4× base rate"}
                    {id === "premium" && "2.0× base rate"}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Results Panel ── */}
        <AnimatePresence>
          {isComplete && breakdown.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 max-w-3xl mx-auto"
            >
              <div className="bg-[#0a0e1a] border border-[#c8881f]/30 rounded-3xl p-6 sm:p-8">
                {/* Total */}
                <div className="text-center mb-8">
                  <p className="text-white/40 text-sm uppercase tracking-widest font-bold mb-2">Estimated Total</p>
                  <div className="text-4xl sm:text-5xl font-black text-[#c8881f] tracking-tight">
                    {fmtRange(totalLo, totalHi)}
                  </div>
                  <p className="text-white/40 text-sm mt-2">
                    {property} · {quality && quality.charAt(0).toUpperCase() + quality.slice(1)} Quality
                  </p>
                </div>

                {/* Breakdown table */}
                <div className="bg-[#070b14] rounded-2xl p-4 sm:p-6 mb-6">
                  <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Cost Breakdown</h3>
                  <div className="space-y-2">
                    {breakdown.map(({ item, lo, hi }) => (
                      <div key={item} className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
                        <span className="text-white/70 text-sm">{item}</span>
                        <span className="text-white font-bold text-sm">{fmtRange(lo, hi)}</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between pt-3">
                      <span className="text-white font-bold">Total Estimate</span>
                      <span className="text-[#c8881f] font-black">{fmtRange(totalLo, totalHi)}</span>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="flex items-center gap-3 bg-white/4 rounded-xl px-5 py-3.5 mb-5">
                  <div className="w-2 h-2 rounded-full bg-[#c8881f] flex-shrink-0" />
                  <p className="text-white/70 text-sm">
                    <span className="text-white font-bold">Estimated Timeline:</span>{" "}
                    {flatSize ? TIMELINE[flatSize] : "8–12 weeks"} (varies with scope)
                  </p>
                </div>

                {/* Disclaimer */}
                <div className="flex items-start gap-3 bg-white/4 rounded-xl px-5 py-3.5 mb-6">
                  <Info size={16} className="text-white/30 mt-0.5 flex-shrink-0" />
                  <p className="text-white/40 text-xs leading-relaxed">
                    Estimates are indicative only and based on market averages. Actual costs depend on specific requirements, materials selected, and contractor pricing. Get exact quotes from verified firms.
                  </p>
                </div>

                {/* CTA */}
                <Link href="/find-my-id" className="btn-accent w-full justify-center">
                  Get Free Quotes from Verified Firms
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── Info Cards ── */}
      <section className="px-4 pb-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-white font-bold text-xl mb-6 text-center">Singapore Renovation Benchmarks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "Average HDB 4-Room",   range: "S$50k – S$65k",   sub: "Full renovation, mid-range finishes" },
              { label: "Average Condo 3-Bed",  range: "S$65k – S$90k",   sub: "Including bathrooms & kitchen" },
              { label: "Average Landed",        range: "S$150k – S$300k", sub: "Terrace house full reno" },
            ].map(({ label, range, sub }) => (
              <div key={label} className="bg-[#0a0e1a] border border-white/8 rounded-2xl p-5 text-center">
                <p className="text-white/50 text-xs uppercase tracking-wider font-bold mb-2">{label}</p>
                <p className="text-[#c8881f] text-2xl font-black">{range}</p>
                <p className="text-white/40 text-xs mt-1">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
