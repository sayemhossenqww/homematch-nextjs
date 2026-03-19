"use client";
import { useState } from "react";
import Link from "next/link";
import { Star, MapPin, ChevronRight, Shield, Award } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";
import { getFeaturedFirms } from "@/data/firms";
import type { Firm } from "@/types/firm";

const FILTERS = ["All", "HDB", "Condo", "Landed", "Commercial"];

// Derive initials from firm name (max 2 chars)
function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

// Which property types a firm serves (>0%)
function getFirmTypes(firm: Firm): string[] {
  const types: string[] = [];
  if (firm.projectTypes.hdb > 0)        types.push("HDB");
  if (firm.projectTypes.condo > 0)      types.push("Condo");
  if (firm.projectTypes.landed > 0)     types.push("Landed");
  if (firm.projectTypes.commercial > 0) types.push("Commercial");
  return types;
}

// Assign a consistent accent colour per firm index
const ACCENT_PALETTE = [
  "#c8881f", // gold
  "#60a5fa", // blue
  "#4ade80", // green
  "#a78bfa", // violet
  "#fb923c", // orange
  "#34d399", // emerald
  "#f472b6", // pink
  "#38bdf8", // sky
];

const featuredFirms = getFeaturedFirms(6);

export default function FeaturedFirms() {
  const [filter, setFilter] = useState("All");

  const visible = filter === "All"
    ? featuredFirms
    : featuredFirms.filter(f => getFirmTypes(f).includes(filter));

  return (
    <section className="section-padding relative overflow-hidden" style={{ background: "var(--color-primary)" }}>
      {/* Ambient glows */}
      <div className="absolute bottom-0 right-0 w-125 h-125 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(200,136,31,0.07) 0%, transparent 65%)", filter: "blur(80px)" }} />
      <div className="absolute top-0 left-0 w-100 h-100 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(26,58,92,0.6) 0%, transparent 65%)", filter: "blur(70px)" }} />

      <div className="section-container relative z-10">

        {/* Header */}
        <ScrollReveal direction="up" delay={0.1} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="section-label mb-3">Top Firms</p>
            <h2 className="text-section text-white">Featured Interior Designers</h2>
          </div>
          <Link href="/firms"
            className="flex items-center gap-1.5 text-sm font-semibold transition-all hover:gap-2.5 self-start md:self-auto"
            style={{ color: "#c8881f" }}>
            Browse All Firms <ChevronRight className="w-4 h-4" />
          </Link>
        </ScrollReveal>

        {/* Filter pills */}
        <ScrollReveal direction="up" delay={0.2} className="flex gap-2 mb-8 flex-wrap">
          {FILTERS.map((f) => {
            const active = f === filter;
            return (
              <button key={f} onClick={() => setFilter(f)}
                className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-200"
                style={{
                  background: active ? "#c8881f" : "rgba(255,255,255,0.06)",
                  color: active ? "white" : "rgba(255,255,255,0.45)",
                  border: `1px solid ${active ? "#c8881f" : "rgba(255,255,255,0.08)"}`,
                }}>
                {f}
              </button>
            );
          })}
        </ScrollReveal>

        {/* Cards grid */}
        <StaggerContainer delay={0.3} staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((firm, idx) => {
            const accent = ACCENT_PALETTE[idx % ACCENT_PALETTE.length];
            const types = getFirmTypes(firm);
            const badgeNames = firm.badges.map(b => b.name);
            const specialty = firm.styles.slice(0, 2).join(" · ");
            const initials = getInitials(firm.name);

            return (
              <StaggerItem key={firm.slug} className="h-full">
                <Link href={`/firms/${firm.slug}`}
                  className="group flex flex-col overflow-hidden h-full"
                  style={{
                    borderRadius: "16px",
                    background: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    transition: "border-color 0.3s, box-shadow 0.3s, transform 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${accent}45`;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px rgba(0,0,0,0.35), 0 0 30px ${accent}15`;
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.09)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  {/* Cover photo + identity overlay */}
                  <div className="relative h-56 overflow-hidden shrink-0">
                    <img src={firm.banner} alt={`${firm.name} portfolio`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />

                    <div className="absolute inset-0"
                      style={{ background: "linear-gradient(to top, rgba(9,22,42,0.95) 0%, rgba(9,22,42,0.3) 52%, transparent 100%)" }} />

                    {/* Featured ribbon */}
                    {firm.isFeatured && (
                      <div className="absolute top-3 left-3">
                        <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
                          style={{ background: "#c8881f", color: "white" }}>
                          ✦ Featured
                        </span>
                      </div>
                    )}

                    {/* Star rating */}
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full"
                      style={{ background: "rgba(9,22,42,0.75)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.1)" }}>
                      <Star className="w-3 h-3" style={{ color: "#f59e0b", fill: "#f59e0b" }} />
                      <span className="text-xs font-bold text-white">{firm.rating.toFixed(1)}</span>
                      <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.45)" }}>({firm.reviewCount})</span>
                    </div>

                    {/* Identity overlay */}
                    <div className="absolute bottom-0 left-0 right-0 flex items-end gap-3 px-5 pb-4">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 font-black text-sm"
                        style={{
                          background: `linear-gradient(135deg, ${accent}40, ${accent}18)`,
                          backdropFilter: "blur(12px)",
                          WebkitBackdropFilter: "blur(12px)",
                          border: `1.5px solid ${accent}60`,
                          color: accent,
                          boxShadow: `0 4px 20px rgba(0,0,0,0.4), 0 0 0 1px ${accent}20`,
                          letterSpacing: "0.05em",
                        }}
                      >
                        {initials}
                      </div>
                      <div className="min-w-0 pb-0.5">
                        <h3 className="font-bold text-white text-base leading-tight truncate">{firm.name}</h3>
                        <div className="flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 shrink-0" style={{ color: "rgba(255,255,255,0.5)" }} />
                          <span className="text-xs truncate" style={{ color: "rgba(255,255,255,0.5)" }}>{firm.district}</span>
                        </div>
                        <p className="text-[11px] font-semibold mt-0.5" style={{ color: accent }}>{specialty}</p>
                      </div>
                    </div>
                  </div>

                  {/* Stats + badges */}
                  <div className="px-5 py-4 flex flex-col gap-3">
                    <div className="flex gap-4">
                      <div>
                        <span className="font-extrabold text-white text-sm">{firm.totalProjects ?? "40"}+</span>
                        <span className="text-[10px] ml-1" style={{ color: "rgba(255,255,255,0.32)" }}>projects</span>
                      </div>
                      <div className="w-px" style={{ background: "rgba(255,255,255,0.07)" }} />
                      <div>
                        <span className="font-extrabold text-white text-sm">{firm.reviewCount}</span>
                        <span className="text-[10px] ml-1" style={{ color: "rgba(255,255,255,0.32)" }}>reviews</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {badgeNames.slice(0, 3).map((b) => (
                        <span key={b} className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                          style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.50)", border: "1px solid rgba(255,255,255,0.08)" }}>
                          {b.toLowerCase().includes("casetrust") || b.toLowerCase().includes("verified")
                            ? <Shield className="w-2.5 h-2.5" style={{ color: "#c8881f" }} />
                            : <Award className="w-2.5 h-2.5" style={{ color: "#60a5fa" }} />}
                          {b}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mt-1">
                      <div className="flex gap-1.5 flex-wrap">
                        {types.slice(0, 3).map((t) => (
                          <span key={t} className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                            style={{ background: `${accent}14`, color: accent, border: `1px solid ${accent}22` }}>
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-1 text-xs font-bold transition-all group-hover:gap-1.5"
                        style={{ color: accent }}>
                        View <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Bottom CTA strip */}
        <ScrollReveal direction="up" delay={0.4} className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 px-7 py-5 rounded-2xl"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div>
            <p className="font-bold text-white text-sm">Not sure which firm suits you?</p>
            <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.38)" }}>
              Let our team personally shortlist the best-fit firms for your home — free in 24 hours.
            </p>
          </div>
          <Link href="/find-my-id" className="btn-accent text-sm py-2.5 px-6 whitespace-nowrap shrink-0">
            Get Matched Free →
          </Link>
        </ScrollReveal>

      </div>
    </section>
  );
}
