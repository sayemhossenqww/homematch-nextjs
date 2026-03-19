"use client";
import Link from "next/link";
import { Shield, CheckCircle, AlertTriangle, ArrowRight, BadgeCheck, Lock, FileText, Gavel, Landmark, Gift, XCircle } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";

const protections = [
  {
    icon: Lock,
    color: "#c8881f",
    title: "Deposit Protection",
    body: "Your renovation deposit is held in a trust account — the firm cannot touch it until agreed milestones are met. Your money is never at risk.",
  },
  {
    icon: FileText,
    color: "#60a5fa",
    title: "Standardised Contract",
    body: "CaseTrust firms must use CASE-approved contract templates with clear scope, pricing, and timeline clauses. No hidden terms.",
  },
  {
    icon: Gavel,
    color: "#4ade80",
    title: "Free Dispute Mediation",
    body: "If disagreements arise, CASE provides independent mediation at no charge. You are never left alone to fight a contractor.",
  },
  {
    icon: BadgeCheck,
    color: "#a78bfa",
    title: "Workmanship Warranty",
    body: "All CaseTrust firms must provide a minimum 12-month workmanship warranty — defects after handover are the firm's responsibility.",
  },
];

const comparison = [
  { label: "CaseTrust Certified",       im: true,  others: false },
  { label: "HDB Registered",            im: true,  others: "Some" },
  { label: "Deposit Protection",        im: true,  others: false },
  { label: "Verified Reviews",          im: true,  others: false },
  { label: "Standardised Contract",     im: true,  others: false },
  { label: "Free for Homeowners",       im: true,  others: false },
  { label: "Free Matching Service",     im: true,  others: false },
];

export default function CaseTrustSection() {
  return (
    <section className="section-padding relative overflow-hidden" style={{ background: "var(--color-primary)" }}>

      {/* Ambient glows */}
      <div className="absolute top-0 left-0 w-[600px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(200,136,31,0.09) 0%, transparent 65%)", filter: "blur(100px)" }} />
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(26,58,92,0.7) 0%, transparent 65%)", filter: "blur(80px)" }} />

      <div className="section-container relative z-10">

        {/* ── Header ── */}
        <ScrollReveal direction="up" delay={0.1} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5"
            style={{ background: "rgba(200,136,31,0.12)", border: "1px solid rgba(200,136,31,0.25)" }}>
            <Shield className="w-4 h-4" style={{ color: "#c8881f" }} />
            <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#c8881f" }}>Trust First</span>
          </div>
          <h2 className="text-section text-white mb-4">
            Every Firm is<br />
            <span style={{ color: "#c8881f" }}>CaseTrust Certified</span>
          </h2>
          <p className="text-lead max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.48)" }}>
            CaseTrust is Singapore's government-backed consumer protection standard, administered by CASE. Interior Match is the <em>only</em> platform that exclusively lists CaseTrust-certified and HDB-registered design firms — verified independently before every listing.
          </p>
        </ScrollReveal>

        {/* ── Main 2-col layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

          {/* LEFT: 4 protection cards */}
          <StaggerContainer delay={0.2} staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {protections.map((p) => {
              const Icon = p.icon;
              return (
                <StaggerItem key={p.title} className="h-full">
                  <div className="group relative p-6 flex flex-col overflow-hidden h-full"
                    style={{
                      borderRadius: "16px",
                      background: "rgba(255,255,255,0.05)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      transition: "border-color 0.3s, box-shadow 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = `${p.color}35`;
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 40px rgba(0,0,0,0.2), 0 0 20px ${p.color}12`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  >
                    {/* Top colour accent */}
                    <div className="absolute top-0 left-0 right-0 h-0.5"
                      style={{ background: `linear-gradient(to right, ${p.color}, transparent)` }} />

                    <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 flex-shrink-0"
                      style={{ background: `${p.color}14`, border: `1px solid ${p.color}28` }}>
                      <Icon className="w-5 h-5" style={{ color: p.color }} />
                    </div>
                    <h4 className="font-bold text-white mb-2 text-sm">{p.title}</h4>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.50)" }}>{p.body}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* RIGHT: comparison table */}
          <ScrollReveal direction="left" delay={0.4} className="flex flex-col h-full"
            style={{
              borderRadius: "18px",
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.09)",
              overflow: "hidden",
            }}
          >
            {/* Table header */}
            <div className="grid grid-cols-3 px-6 py-4"
              style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <div />
              <div className="text-center">
                <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#c8881f" }}>Interior Match</span>
              </div>
              <div className="text-center">
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.28)" }}>Others</span>
              </div>
            </div>

            {/* Rows */}
            <div className="flex-1 divide-y" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
              {comparison.map((row, i) => (
                <div key={row.label} className="grid grid-cols-3 px-6 py-3.5 items-center"
                  style={{ background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.018)" }}>
                  <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.62)" }}>{row.label}</span>
                  <div className="flex justify-center">
                    {row.im
                      ? <CheckCircle className="w-4.5 h-4.5" style={{ color: "#4ade80" }} />
                      : <AlertTriangle className="w-4 h-4" style={{ color: "#f87171" }} />}
                  </div>
                  <div className="flex justify-center">
                    {row.others === true
                      ? <CheckCircle className="w-4 h-4" style={{ color: "#4ade80" }} />
                      : row.others === "Some"
                        ? <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                            style={{ background: "rgba(251,191,36,0.1)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.2)" }}>
                            Some
                          </span>
                        : <XCircle className="w-4 h-4" style={{ color: "#f87171" }} />}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="px-6 py-5" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/casetrust" className="btn-accent flex-1 text-center text-sm py-2.5 inline-flex items-center justify-center gap-1.5">
                  Learn About CaseTrust <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link href="/firms?badge=casetrust" className="flex-1 text-center text-sm py-2.5 px-4 rounded-xl font-semibold transition-all"
                  style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  Browse Certified Firms
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* ── Bottom trust strip ── */}
        <StaggerContainer delay={0.5} staggerDelay={0.05} className="flex flex-wrap justify-center gap-4">
          {[
            { Icon: Shield,    color: "#c8881f", val: "100%",       label: "CaseTrust firms only" },
            { Icon: Landmark,  color: "#60a5fa", val: "Govt-backed", label: "CASE-administered" },
            { Icon: Lock,      color: "#4ade80", val: "Protected",   label: "Deposit trust accounts" },
            { Icon: BadgeCheck,color: "#a78bfa", val: "Verified",    label: "Independently checked" },
            { Icon: Gift,      color: "#34d399", val: "Always free", label: "No cost to homeowners" },
          ].map(({ Icon, color, val, label }) => (
            <StaggerItem key={val} className="flex items-center gap-3 px-5 py-3 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${color}14`, border: `1px solid ${color}25` }}>
                <Icon className="w-4 h-4" style={{ color }} />
              </div>
              <div>
                <p className="font-black text-sm text-white leading-tight">{val}</p>
                <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.40)" }}>{label}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
}
