"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, RotateCcw, ClipboardList } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────
const SECTIONS = [
  {
    id: "before",
    title: "Before You Start",
    icon: "📋",
    items: [
      { id: "b1", text: "Get HDB Renovation Permit approved" },
      { id: "b2", text: "Verify contractor is HDB-registered" },
      { id: "b3", text: "Check CaseTrust / RCMA accreditation" },
      { id: "b4", text: "Sign formal contract with scope & payment schedule" },
      { id: "b5", text: "Apply for Renovation Loan (if needed)" },
      { id: "b6", text: "Inform neighbours (above, below, left, right)" },
      { id: "b7", text: "Book goods lift with your Town Council" },
      { id: "b8", text: "Back up utility and meter readings" },
    ],
  },
  {
    id: "design",
    title: "Design & Planning",
    icon: "✏️",
    items: [
      { id: "d1", text: "Finalise floorplan and space layout" },
      { id: "d2", text: "Confirm all material selections (flooring, tiles, paint)" },
      { id: "d3", text: "Select kitchen cabinet design and countertop" },
      { id: "d4", text: "Choose bathroom fittings and sanitary ware" },
      { id: "d5", text: "Decide on lighting layout" },
      { id: "d6", text: "Confirm aircon brand and placement" },
      { id: "d7", text: "Get itemised quotation from ID firm" },
    ],
  },
  {
    id: "during",
    title: "During Renovation",
    icon: "🏗️",
    items: [
      { id: "r1", text: "Verify hacking permit is displayed on site" },
      { id: "r2", text: "Check waterproofing done before tiling wet areas" },
      { id: "r3", text: "Confirm RC box positions are not hidden" },
      { id: "r4", text: "Inspect electrical point placements before hacking" },
      { id: "r5", text: "Review carpentry mockups before finalising" },
      { id: "r6", text: "Ensure noisy works done within HDB-approved hours" },
      { id: "r7", text: "Do a mid-renovation walkthrough with your ID" },
      { id: "r8", text: "Photograph each stage for documentation" },
    ],
  },
  {
    id: "handover",
    title: "Final Handover",
    icon: "🔑",
    items: [
      { id: "h1", text: "Walk through every room with ID / contractor" },
      { id: "h2", text: "Test all switches, sockets, and lights" },
      { id: "h3", text: "Check all cabinet doors and drawer alignment" },
      { id: "h4", text: "Test all plumbing — confirm no leaks" },
      { id: "h5", text: "Confirm no water seepage in toilets and wet areas" },
      { id: "h6", text: "Receive and file all warranty documents" },
      { id: "h7", text: "Clear retention payment only after fully satisfied" },
    ],
  },
] as const;

const STORAGE_KEY = "hm_checklist_v1";
const ALL_IDS = SECTIONS.flatMap((s) => s.items.map((i) => i.id));
const TOTAL = ALL_IDS.length;

// ─── Component ────────────────────────────────────────────────────────────────
export default function RenovationChecklistClient() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const arr: string[] = JSON.parse(stored);
        setChecked(new Set(arr));
      }
    } catch {
      // ignore parse errors
    }
    setMounted(true);
  }, []);

  function toggle(id: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      } catch {
        // ignore
      }
      return next;
    });
  }

  function reset() {
    setChecked(new Set());
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }

  const completedCount = checked.size;
  const overallProgress = TOTAL > 0 ? Math.round((completedCount / TOTAL) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#05080f] text-white">
      {/* ── Hero ── */}
      <section className="pt-32 pb-10 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="section-label mb-3">Free Tool</p>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight tracking-tight">
            Renovation{" "}
            <span className="text-[#c8881f]">Checklist</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed">
            Your complete step-by-step guide for a Singapore renovation — from HDB permits to final handover. Progress saves automatically to your browser.
          </p>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="max-w-2xl mx-auto">
          {/* ── Overall Progress ── */}
          <div className="bg-[#0a0e1a] border border-white/8 rounded-2xl p-5 sm:p-6 mb-8">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <ClipboardList size={20} className="text-[#c8881f]" />
                <span className="text-white font-bold">Overall Progress</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#c8881f] font-black text-lg">{completedCount}</span>
                <span className="text-white/40 text-sm">/ {TOTAL} tasks</span>
                <button
                  onClick={reset}
                  className="flex items-center gap-1.5 text-white/30 hover:text-white/60 text-xs transition-colors ml-2"
                >
                  <RotateCcw size={13} />
                  Reset
                </button>
              </div>
            </div>
            <div className="h-2 bg-white/8 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#c8881f] to-[#e8a830]"
                initial={{ width: 0 }}
                animate={{ width: mounted ? `${overallProgress}%` : 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
            {completedCount === TOTAL && TOTAL > 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-green-400 text-sm font-bold mt-3 text-center"
              >
                All done! Your renovation checklist is complete.
              </motion.p>
            )}
          </div>

          {/* ── Sections ── */}
          <div className="space-y-6">
            {SECTIONS.map((section) => {
              const sectionCompleted = section.items.filter((i) => checked.has(i.id)).length;
              const sectionTotal = section.items.length;
              const sectionProgress = Math.round((sectionCompleted / sectionTotal) * 100);

              return (
                <div
                  key={section.id}
                  className="bg-[#0a0e1a] border border-white/8 rounded-2xl overflow-hidden"
                >
                  {/* Section header */}
                  <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/5">
                    <div className="flex items-center gap-3">
                      <span className="text-xl" role="img" aria-label={section.title}>
                        {section.icon}
                      </span>
                      <h2 className="text-white font-bold text-base sm:text-lg">{section.title}</h2>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs font-black px-3 py-1 rounded-full ${
                          sectionCompleted === sectionTotal
                            ? "bg-green-500/15 text-green-400"
                            : "bg-[#c8881f]/15 text-[#c8881f]"
                        }`}
                      >
                        {sectionCompleted}/{sectionTotal}
                      </span>
                      <div className="w-16 h-1.5 bg-white/8 rounded-full overflow-hidden hidden sm:block">
                        <div
                          className="h-full bg-[#c8881f] rounded-full transition-all duration-500"
                          style={{ width: `${sectionProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="divide-y divide-white/4">
                    {section.items.map((item) => {
                      const isDone = checked.has(item.id);
                      return (
                        <label
                          key={item.id}
                          className={`flex items-start gap-4 px-5 sm:px-6 py-4 cursor-pointer transition-colors ${
                            isDone ? "bg-white/2" : "hover:bg-white/3"
                          }`}
                        >
                          <button
                            onClick={() => toggle(item.id)}
                            className="mt-0.5 flex-shrink-0 text-white/30 hover:text-[#c8881f] transition-colors"
                            aria-label={isDone ? "Uncheck" : "Check"}
                          >
                            {isDone ? (
                              <CheckCircle2 size={22} className="text-green-400" />
                            ) : (
                              <Circle size={22} className="text-white/25" />
                            )}
                          </button>
                          <span
                            className={`text-sm leading-relaxed transition-all ${
                              isDone
                                ? "line-through text-white/30"
                                : "text-white/70"
                            }`}
                            onClick={() => toggle(item.id)}
                          >
                            {item.text}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Bottom CTA ── */}
          <div className="mt-10 bg-[#0a0e1a] border border-white/8 rounded-2xl p-6 text-center">
            <p className="text-white/50 text-sm mb-4">
              Ready to start your renovation journey?
            </p>
            <a href="/find-my-id" className="btn-accent">
              Get Matched with a Verified ID Firm
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
