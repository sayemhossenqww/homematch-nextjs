"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, DollarSign, Maximize2, Star } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";

const FILTERS = ["All", "HDB", "Condo", "Landed", "Contemporary", "Japandi", "Minimalist", "Industrial"];

export interface GalleryProject {
  slug: string;
  image: string;
  budget: string;
  sqft: string;
  style: string;
  firm: string;
  firmInitials: string;
  accent: string;
  type: string;
  location: string;
  span: string;
  rating: number;
}

interface Props {
  projects: GalleryProject[];
}

export default function InspirationGallery({ projects }: Props) {
  const [filter, setFilter] = useState("All");
  const [hovered, setHovered] = useState<string | null>(null);

  const visible = filter === "All"
    ? projects
    : projects.filter((p) => p.type === filter || p.style === filter);

  return (
    <section className="section-padding relative overflow-hidden" style={{ background: "var(--color-primary)" }}>
      {/* Subtle grid texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 60px),
                            repeating-linear-gradient(90deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 60px)`,
        }} />

      <div className="absolute top-0 right-0 w-[500px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(200,136,31,0.06) 0%, transparent 65%)", filter: "blur(80px)" }} />

      <div className="section-container relative z-10">

        {/* ── Header ── */}
        <ScrollReveal direction="up" delay={0.1} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="section-label mb-3">Real Renovations</p>
            <h2 className="text-section text-white mb-2">
              Get Inspired by Real Projects
            </h2>
            <p className="text-lead max-w-md" style={{ color: "rgba(255,255,255,0.48)" }}>
              Every photo is a verified Singapore home — with real budgets, real designers, and real results.
            </p>
          </div>
          <Link href="/inspirations"
            className="flex items-center gap-1.5 text-sm font-semibold transition-all hover:gap-2.5 self-start md:self-auto"
            style={{ color: "#c8881f" }}>
            See All Projects <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </ScrollReveal>

        {/* ── Filter pills ── */}
        <ScrollReveal direction="left" delay={0.2} className="flex gap-2 flex-wrap mb-8">
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

        {/* ── Bento grid ── */}
        <StaggerContainer delay={0.3} staggerDelay={0.1} className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[220px]">
          {visible.map((project) => (
            <StaggerItem key={project.slug} className={`h-full ${project.span}`}>
              <Link
                href={`/inspirations/${project.slug}`}
                className="relative overflow-hidden group h-full"
                style={{ borderRadius: "16px", display: "block" }}
                onMouseEnter={() => setHovered(project.slug)}
                onMouseLeave={() => setHovered(null)}
              >
              {/* Photo */}
              <img
                src={project.image}
                alt={`${project.style} renovation — ${project.type} by ${project.firm}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Base gradient — always visible at bottom */}
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(9,22,42,0.80) 0%, rgba(9,22,42,0.15) 45%, transparent 70%)" }} />

              {/* Hover full overlay */}
              <div className="absolute inset-0 transition-opacity duration-400"
                style={{
                  background: `linear-gradient(135deg, ${project.accent}18 0%, rgba(9,22,42,0.70) 100%)`,
                  opacity: hovered === project.slug ? 1 : 0,
                }} />

              {/* Type + style badges — top left */}
              <div className="absolute top-3 left-3 flex gap-1.5">
                <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full"
                  style={{ background: "rgba(9,22,42,0.7)", color: "white", backdropFilter: "blur(8px)" }}>
                  {project.type}
                </span>
                <span className="text-[10px] font-semibold px-2 py-1 rounded-full"
                  style={{ background: `${project.accent}25`, color: project.accent, backdropFilter: "blur(8px)", border: `1px solid ${project.accent}35` }}>
                  {project.style}
                </span>
              </div>

              {/* Rating — top right */}
              <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full"
                style={{ background: "rgba(9,22,42,0.7)", backdropFilter: "blur(8px)" }}>
                <Star className="w-3 h-3" style={{ color: "#f59e0b", fill: "#f59e0b" }} />
                <span className="text-xs font-bold text-white">{project.rating}</span>
              </div>

              {/* Bottom info — always visible */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                {/* Firm logo row */}
                <div className="flex items-center gap-2 mb-2.5">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[9px] font-black flex-shrink-0"
                    style={{
                      background: `${project.accent}30`,
                      border: `1px solid ${project.accent}50`,
                      color: project.accent,
                      backdropFilter: "blur(8px)"
                    }}>
                    {project.firmInitials}
                  </div>
                  <span className="text-xs font-semibold text-white/75">{project.firm}</span>
                </div>

                {/* Stats row */}
                <div className="flex items-end justify-between">
                  <div>
                    <p className="font-black text-white text-base leading-none">{project.budget}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1 text-[11px] text-white/60">
                        <Maximize2 className="w-3 h-3" /> {project.sqft} sqft
                      </span>
                      {project.location && (
                        <span className="flex items-center gap-1 text-[11px] text-white/60">
                          <MapPin className="w-3 h-3" /> {project.location}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Hover CTA arrow */}
                  <div
                    className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full transition-all duration-300"
                    style={{
                      background: project.accent,
                      color: "white",
                      opacity: hovered === project.slug ? 1 : 0,
                      transform: hovered === project.slug ? "translateY(0)" : "translateY(6px)",
                    }}
                  >
                    View <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* ── Bottom strip ── */}
        <ScrollReveal direction="up" delay={0.4} className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 px-7 py-5 rounded-2xl"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div>
            <p className="font-bold text-white text-sm">
              Verified Singapore renovation projects
            </p>
            <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.38)" }}>
              Filter by style, budget, room type or property — find your perfect inspiration.
            </p>
          </div>
          <Link href="/inspirations" className="btn-accent text-sm py-2.5 px-6 whitespace-nowrap flex-shrink-0">
            Browse All Projects →
          </Link>
        </ScrollReveal>

      </div>
    </section>
  );
}
