"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X, ChevronDown, Search, ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { getAllFirms } from "@/data/firms";
import type { Firm } from "@/types/firm";

const ALL_FIRMS = getAllFirms();

// ─── Helpers ──────────────────────────────────────────────────────────────────
function fmtBudget(n: number) {
  return `S$${Math.round(n / 1000)}k`;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={13}
          className={i <= Math.round(rating) ? "text-[#c8881f] fill-[#c8881f]" : "text-white/20"}
        />
      ))}
    </span>
  );
}

function ProgressBar({ value, highlight }: { value: number; highlight: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-white/8 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${highlight ? "bg-[#c8881f]" : "bg-white/30"}`}
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
      <span className="text-xs text-white/50 w-9 text-right">{value}%</span>
    </div>
  );
}

function InitialsAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  return (
    <div className="w-10 h-10 rounded-full bg-[#c8881f]/20 border border-[#c8881f]/30 flex items-center justify-center text-[#c8881f] font-black text-sm flex-shrink-0">
      {initials}
    </div>
  );
}

// ─── Dropdown ────────────────────────────────────────────────────────────────
function FirmDropdown({
  selected,
  excluded,
  onSelect,
}: {
  selected: Firm | null;
  excluded: string[];
  onSelect: (f: Firm) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const filtered = useMemo(
    () =>
      ALL_FIRMS.filter(
        (f) =>
          !excluded.includes(f.slug) &&
          f.name.toLowerCase().includes(query.toLowerCase())
      ),
    [excluded, query]
  );

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-2 text-left bg-[#070b14] border border-white/10 rounded-xl px-4 py-3 text-sm text-white/50 hover:border-white/20 transition-colors"
      >
        <Search size={14} className="text-white/30 flex-shrink-0" />
        <span className="flex-1 truncate">Search firms…</span>
        <ChevronDown size={14} className={`text-white/30 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 top-full mt-2 left-0 right-0 bg-[#0d1526] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="p-2 border-b border-white/5">
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type to search…"
                className="w-full bg-transparent text-white text-sm px-2 py-1.5 outline-none placeholder-white/30"
              />
            </div>
            <div className="max-h-52 overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="px-4 py-3 text-white/30 text-sm">No firms found</div>
              ) : (
                filtered.map((firm) => (
                  <button
                    key={firm.slug}
                    onClick={() => {
                      onSelect(firm);
                      setOpen(false);
                      setQuery("");
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition-colors text-left"
                  >
                    <InitialsAvatar name={firm.name} />
                    <div>
                      <p className="text-white text-sm font-medium">{firm.name}</p>
                      <p className="text-white/40 text-xs">{firm.district} · {firm.rating.toFixed(1)} ★</p>
                    </div>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Slot Card ────────────────────────────────────────────────────────────────
function SlotCard({
  firm,
  excluded,
  onSelect,
  onRemove,
}: {
  firm: Firm | null;
  excluded: string[];
  onSelect: (f: Firm) => void;
  onRemove: () => void;
}) {
  return (
    <div className="bg-[#0a0e1a] border border-white/8 rounded-2xl p-4 flex flex-col gap-3">
      {firm ? (
        <>
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3">
              <InitialsAvatar name={firm.name} />
              <div>
                <p className="text-white font-bold text-sm leading-tight">{firm.name}</p>
                <p className="text-white/40 text-xs mt-0.5">{firm.district}</p>
              </div>
            </div>
            <button onClick={onRemove} className="text-white/25 hover:text-white/60 transition-colors mt-0.5">
              <X size={16} />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <StarRating rating={firm.rating} />
            <span className="text-[#c8881f] font-bold text-sm">{firm.rating.toFixed(1)}</span>
            <span className="text-white/30 text-xs">({firm.reviewCount})</span>
          </div>
        </>
      ) : (
        <FirmDropdown selected={null} excluded={excluded} onSelect={onSelect} />
      )}
    </div>
  );
}

// ─── Comparison Table ─────────────────────────────────────────────────────────
type RowDef = {
  label: string;
  render: (f: Firm) => React.ReactNode;
  best?: (firms: Firm[]) => string | null; // returns slug of best firm
};

function buildRows(firms: Firm[]): RowDef[] {
  return [
    {
      label: "Rating",
      render: (f) => (
        <div className="flex items-center gap-2">
          <StarRating rating={f.rating} />
          <span className="text-white font-bold">{f.rating.toFixed(1)}</span>
        </div>
      ),
      best: (fs) => fs.reduce((a, b) => (a.rating >= b.rating ? a : b)).slug,
    },
    {
      label: "Reviews",
      render: (f) => <span className="text-white font-bold">{f.reviewCount} reviews</span>,
      best: (fs) => fs.reduce((a, b) => (a.reviewCount >= b.reviewCount ? a : b)).slug,
    },
    {
      label: "Avg Budget",
      render: (f) => <span className="text-white font-bold">{fmtBudget(f.avgBudget)}</span>,
      best: () => null,
    },
    {
      label: "Response Time",
      render: (f) => <span className="text-white/70 text-sm">{f.responseTime}</span>,
      best: () => null,
    },
    {
      label: "Styles",
      render: (f) => (
        <div className="flex flex-wrap gap-1">
          {f.styles.slice(0, 3).map((s) => (
            <span key={s} className="text-xs bg-white/5 text-white/60 rounded-full px-2 py-0.5 border border-white/8">
              {s}
            </span>
          ))}
        </div>
      ),
      best: () => null,
    },
    {
      label: "CaseTrust",
      render: (f) =>
        f.isCaseTrust ? (
          <span className="flex items-center gap-1.5 text-green-400 font-bold text-sm">
            <Check size={14} /> Certified
          </span>
        ) : (
          <span className="text-white/30 text-sm">—</span>
        ),
      best: (fs) => {
        const ct = fs.filter((f) => f.isCaseTrust);
        return ct.length > 0 ? ct[0].slug : null;
      },
    },
    {
      label: "HDB Projects",
      render: (f) => <ProgressBar value={f.projectTypes.hdb} highlight={false} />,
      best: (fs) => fs.reduce((a, b) => (a.projectTypes.hdb >= b.projectTypes.hdb ? a : b)).slug,
    },
    {
      label: "Condo Projects",
      render: (f) => <ProgressBar value={f.projectTypes.condo} highlight={false} />,
      best: (fs) => fs.reduce((a, b) => (a.projectTypes.condo >= b.projectTypes.condo ? a : b)).slug,
    },
    {
      label: "Landed Projects",
      render: (f) => <ProgressBar value={f.projectTypes.landed} highlight={false} />,
      best: (fs) => fs.reduce((a, b) => (a.projectTypes.landed >= b.projectTypes.landed ? a : b)).slug,
    },
    {
      label: "Team Size",
      render: (f) => (
        <span className="text-white/70 text-sm">{f.teamSize ? `${f.teamSize} designers` : "—"}</span>
      ),
      best: (fs) => {
        const withSize = fs.filter((f) => f.teamSize);
        return withSize.length > 0
          ? withSize.reduce((a, b) => ((a.teamSize ?? 0) >= (b.teamSize ?? 0) ? a : b)).slug
          : null;
      },
    },
    {
      label: "Total Projects",
      render: (f) => (
        <span className="text-white font-bold">{f.totalProjects ? f.totalProjects.toLocaleString() : "—"}</span>
      ),
      best: (fs) => {
        const withProj = fs.filter((f) => f.totalProjects);
        return withProj.length > 0
          ? withProj.reduce((a, b) => ((a.totalProjects ?? 0) >= (b.totalProjects ?? 0) ? a : b)).slug
          : null;
      },
    },
  ];
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CompareClient() {
  const [slots, setSlots] = useState<(Firm | null)[]>([null, null, null]);

  const selectedFirms = slots.filter((s): s is Firm => s !== null);
  const excludedSlugs = selectedFirms.map((f) => f.slug);

  function handleSelect(idx: number, firm: Firm) {
    setSlots((prev) => {
      const next = [...prev];
      next[idx] = firm;
      return next;
    });
  }

  function handleRemove(idx: number) {
    setSlots((prev) => {
      const next = [...prev];
      next[idx] = null;
      return next;
    });
  }

  const rows = useMemo(() => buildRows(selectedFirms), [selectedFirms]);
  const showTable = selectedFirms.length >= 2;

  return (
    <div className="min-h-screen bg-[#05080f] text-white">
      {/* Hero */}
      <section className="pt-32 pb-10 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="section-label mb-3">Free Tool</p>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight tracking-tight">
            Compare <span className="text-[#c8881f]">ID Firms</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed">
            Select up to 3 interior design firms and compare them side-by-side across ratings, budgets, project types, and more.
          </p>
        </div>
      </section>

      <section className="px-4 pb-20">
        {/* Selector */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {slots.map((firm, idx) => (
              <SlotCard
                key={idx}
                firm={firm}
                excluded={excludedSlugs}
                onSelect={(f) => handleSelect(idx, f)}
                onRemove={() => handleRemove(idx)}
              />
            ))}
          </div>
          {selectedFirms.length < 2 && (
            <p className="text-center text-white/30 text-sm mt-4">
              Select at least 2 firms to see the comparison table
            </p>
          )}
        </div>

        {/* Comparison Table */}
        <AnimatePresence>
          {showTable && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl mx-auto"
            >
              <div className="overflow-x-auto rounded-2xl border border-white/8">
                <table className="w-full min-w-[520px]">
                  <thead>
                    <tr className="border-b border-white/8">
                      <th className="text-left px-5 py-4 text-white/40 text-xs uppercase tracking-widest font-bold w-36 bg-[#070b14]">
                        Metric
                      </th>
                      {selectedFirms.map((firm) => (
                        <th
                          key={firm.slug}
                          className="px-5 py-4 bg-[#0a0e1a] text-center border-l border-white/5"
                        >
                          <div className="flex flex-col items-center gap-1">
                            <InitialsAvatar name={firm.name} />
                            <span className="text-white font-bold text-sm leading-tight">{firm.name}</span>
                            <span className="text-white/40 text-xs">{firm.district}</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => {
                      const bestSlug = row.best ? row.best(selectedFirms) : null;
                      return (
                        <tr key={row.label} className="border-b border-white/5 last:border-0">
                          <td className="px-5 py-4 text-white/40 text-sm font-medium bg-[#070b14] align-middle whitespace-nowrap">
                            {row.label}
                          </td>
                          {selectedFirms.map((firm) => {
                            const isWinner = bestSlug === firm.slug;
                            return (
                              <td
                                key={firm.slug}
                                className={`px-5 py-4 border-l border-white/5 align-middle ${
                                  isWinner
                                    ? "bg-[#c8881f]/8 border-[#c8881f]/20"
                                    : "bg-[#0a0e1a]"
                                }`}
                              >
                                <div className="flex flex-col items-center gap-1">
                                  {row.render(firm)}
                                  {isWinner && (
                                    <span className="text-[8px] text-[#c8881f] font-black uppercase tracking-widest">
                                      Best
                                    </span>
                                  )}
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                    {/* View Profile row */}
                    <tr>
                      <td className="px-5 py-4 bg-[#070b14]" />
                      {selectedFirms.map((firm) => (
                        <td key={firm.slug} className="px-5 py-4 bg-[#0a0e1a] border-l border-white/5 text-center">
                          <Link
                            href={`/firms/${firm.slug}`}
                            className="inline-flex items-center gap-1.5 text-[#c8881f] font-bold text-sm hover:text-[#e8a830] transition-colors"
                          >
                            View Profile
                            <ArrowRight size={13} />
                          </Link>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* CTA */}
              <div className="mt-8 text-center">
                <p className="text-white/40 text-sm mb-4">Not sure which firm to pick?</p>
                <Link href="/find-my-id" className="btn-accent">
                  Get Personalised Matching — Free
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
