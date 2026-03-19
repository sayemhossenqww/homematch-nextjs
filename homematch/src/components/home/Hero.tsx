"use client";
import Link from "next/link";

import { Shield, ArrowRight, Sparkles, Star, CheckCircle } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* ── Background image ─────────────────────────── */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&q=90"
          alt="Luxury Singapore interior"
          className="w-full h-full object-cover object-center"
        />
        {/* Primary gradient */}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(110deg, rgba(9,22,42,0.98) 0%, rgba(9,22,42,0.88) 40%, rgba(9,22,42,0.50) 70%, rgba(9,22,42,0.20) 100%)" }}
        />
        {/* Bottom vignette */}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(9,22,42,0.80) 0%, transparent 40%)" }}
        />
        {/* Film grain overlay for premium texture */}
        <div className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* ── Ambient glow orbs ────────────────────────── */}
      <div className="absolute pointer-events-none"
        style={{ top: "15%", left: "5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(200,136,31,0.13) 0%, transparent 65%)", filter: "blur(60px)" }}
      />
      <div className="absolute pointer-events-none"
        style={{ bottom: "10%", right: "30%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(26,58,92,0.5) 0%, transparent 65%)", filter: "blur(70px)" }}
      />

      {/* ── Decorative accent line (vertical) ───────── */}
      <div className="absolute left-0 top-1/4 bottom-1/4 w-px pointer-events-none hidden xl:block"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(200,136,31,0.4), transparent)", marginLeft: "calc((100vw - 1300px) / 2)" }}
      />

      {/* ── Main content ─────────────────────────────── */}
      <div className="section-container relative z-10 w-full" style={{ paddingTop: "100px", paddingBottom: "80px" }}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">

          {/* LEFT col — 3/5 width ─────────────────────── */}
          <StaggerContainer delay={0.1} staggerDelay={0.15} className="lg:col-span-3">

            {/* Eyebrow label */}
            <StaggerItem className="flex items-center gap-3 mb-6">
              <div className="h-px w-8" style={{ background: "var(--color-accent)" }} />
              <span className="text-xs font-bold tracking-[0.18em] uppercase" style={{ color: "var(--color-accent)" }}>
                Singapore&apos;s #1 Design Matching Platform
              </span>
            </StaggerItem>

            {/* Headline */}
            <StaggerItem>
              <h1 className="text-white mb-6"
              style={{ fontSize: "clamp(2.8rem, 5vw, 5rem)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.035em" }}
            >
              Find Your{" "}
              <span style={{ background: "linear-gradient(135deg, #c8881f 0%, #f0c050 50%, #c8881f 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Perfect
              </span>
              <br />
              Interior Designer<br />
              <span style={{ color: "rgba(255,255,255,0.45)", fontWeight: 300, fontSize: "0.72em", letterSpacing: "-0.01em" }}>
                in Singapore
              </span>
            </h1>
            </StaggerItem>

            {/* Sub */}
            <StaggerItem>
              <p className="mb-9 leading-relaxed"
                style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.58)", maxWidth: 420 }}
              >
                Singapore&apos;s only platform with CaseTrust-assured firms. Match with 6 top designers — completely free, in 24 hours.
              </p>
            </StaggerItem>

            {/* CTA row */}
            <StaggerItem className="flex flex-wrap gap-3 mb-10">
              <Link href="/find-my-id" className="btn-accent text-base py-3.5 px-7 group">
                Find My ID — Free
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/inspirations"
                className="flex items-center gap-2 text-base font-semibold py-3.5 px-7 rounded-full transition-all"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.85)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.13)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
              >
                Browse Inspiration
              </Link>
            </StaggerItem>

            {/* Trust badge pills */}
            <StaggerItem className="flex flex-wrap gap-2">
              {[
                { icon: <Shield className="w-3 h-3" />, label: "CaseTrust Certified" },
                { icon: <Star className="w-3 h-3 fill-amber-400 text-amber-400" />, label: "4.9 / 5 Rating" },
                { icon: <CheckCircle className="w-3 h-3" />, label: "100+ Verified Firms" },
                { icon: <span className="text-xs">🇸🇬</span>, label: "Singapore Only" },
              ].map(({ icon, label }, i) => (
                <div key={i}
                  className="flex items-center gap-1.5 py-1.5 px-3.5 rounded-full text-xs font-semibold"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.75)",
                  }}
                >
                  {icon}
                  {label}
                </div>
              ))}
            </StaggerItem>
          </StaggerContainer>

          {/* RIGHT col — 2/5 width ─────────────────────── */}
          <ScrollReveal direction="left" delay={0.6} className="lg:col-span-2 flex justify-center lg:justify-end">
            <div className="w-full max-w-sm">

              {/* Card outer glow ring */}
              <div className="relative">
                <div className="absolute -inset-0.5 rounded-3xl opacity-40 pointer-events-none"
                  style={{ background: "linear-gradient(135deg, rgba(200,136,31,0.6), rgba(200,136,31,0.0))", filter: "blur(6px)" }}
                />

                {/* Glass card */}
                <div className="relative rounded-2xl p-6"
                  style={{
                    background: "rgba(255,255,255,0.065)",
                    backdropFilter: "blur(32px) saturate(180%)",
                    WebkitBackdropFilter: "blur(32px) saturate(180%)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    boxShadow: "0 32px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.12)",
                  }}
                >
                  {/* Card header */}
                  <div className="flex items-center gap-3 mb-5 pb-4"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, #c8881f, #e8a830)", boxShadow: "0 4px 14px rgba(200,136,31,0.45)" }}
                    >
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">Quick Match</p>
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>5 min · Always free</p>
                    </div>
                    {/* Live dot with Native Pulse */}
                    <div className="ml-auto flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center relative">
                        {/* Core dot */}
                        <div className="absolute m-auto w-2 h-2 rounded-full bg-green-500 z-10 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                        {/* Radar Pulses */}
                        <motion.div 
                          className="absolute inset-0 rounded-full border-2 border-green-500/50"
                          animate={{ scale: [1, 2.5], opacity: [1, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                        />
                        <motion.div 
                          className="absolute inset-0 rounded-full border-2 border-green-500/30"
                          animate={{ scale: [1, 2.5], opacity: [1, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1 }}
                        />
                      </div>
                      <span className="text-xs font-bold tracking-wide" style={{ color: "rgba(255,255,255,0.6)" }}>LIVE</span>
                    </div>
                  </div>

                  {/* Fields */}
                  <div className="space-y-2.5 mb-5">
                    {[
                      { label: "Property Type", value: "HDB 4-room" },
                      { label: "Budget Range", value: "S$60K – S$90K" },
                      { label: "Design Style", value: "Contemporary" },
                      { label: "Timeline", value: "3–4 months" },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex items-center justify-between rounded-xl px-4 py-3"
                        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.07)" }}
                      >
                        <p className="text-xs" style={{ color: "rgba(255,255,255,0.38)" }}>{label}</p>
                        <p className="text-sm font-semibold text-white">{value}</p>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link href="/find-my-id"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm text-white transition-all"
                    style={{
                      background: "linear-gradient(135deg, #c8881f, #e8a830)",
                      boxShadow: "0 4px 20px rgba(200,136,31,0.45)",
                    }}
                  >
                    Get 6 Matched Firms <ArrowRight className="w-4 h-4" />
                  </Link>

                  <p className="text-center text-xs mt-3" style={{ color: "rgba(255,255,255,0.25)" }}>
                    No registration · No commission · No hidden fees
                  </p>

                  {/* Bottom avatars row */}
                  <div className="flex items-center gap-2 mt-4 pt-4"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <div className="flex -space-x-2">
                      {["PR","MT","SL","IO"].map((initials, i) => (
                        <div key={i} className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                          style={{
                            background: ["#c8881f","#3b82f6","#22c55e","#8b5cf6"][i],
                            outline: "2px solid rgba(9,22,42,0.9)",
                          }}
                        >
                          {initials}
                        </div>
                      ))}
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)", outline: "2px solid rgba(9,22,42,0.9)" }}
                      >
                        +
                      </div>
                    </div>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.38)" }}>
                      3,200+ homeowners matched
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* ── Native SVG Scroll Down Indicator ───────────── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20 pointer-events-none opacity-80">
        <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/50">Scroll</span>
        
        {/* Mouse Shape */}
        <div className="w-[26px] h-[42px] rounded-full border-2 border-white/20 flex justify-center pt-2 relative overflow-hidden"
          style={{ background: "rgba(255,255,255,0.02)", backdropFilter: "blur(4px)" }}>
          {/* Wheel */}
          <motion.div 
            className="w-1.5 h-1.5 rounded-full bg-[#c8881f]"
            style={{ boxShadow: "0 0 10px rgba(200,136,31,0.8)" }}
            animate={{ 
              y: [0, 16, 16], 
              opacity: [1, 1, 0],
              scale: [1, 0.8, 0.5]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: ["easeIn", "easeOut"],
              times: [0, 0.6, 1]
            }}
          />
        </div>
      </div>

      {/* ── Bottom section divider (subtle) ─────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-px pointer-events-none z-10"
        style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)" }}
      />
    </section>
  );
}
