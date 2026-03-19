"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";
import {
  ClipboardList, Search, Users,
  Phone, Handshake, Home, ArrowRight, CheckCircle, Pause, Play,
} from "lucide-react";

const INTERVAL = 4500;

const steps = [
  {
    num: "01", icon: ClipboardList, color: "#c8881f", glow: "rgba(200,136,31,0.3)",
    label: "Share Your Brief",
    tag: "5 minutes · No sign-up",
    title: "Tell Us Everything About Your Home",
    body: "Fill in our quick form with your property type, budget range, preferred design styles, and move-in timeline. Our team reads every word — the more detail you share, the sharper your match.",
    points: ["HDB, Condo, or Landed", "Budget S$30K – S$200K+", "Design style preferences", "Move-in timeline"],
    trust: "Your data is shared only with your 6 matched firms. Never sold, never spammed.",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&q=85",
    imageAlt: "Homeowner filling renovation brief on laptop",
  },
  {
    num: "02", icon: Search, color: "#60a5fa", glow: "rgba(96,165,250,0.3)",
    label: "We Review It",
    tag: "Human-curated · Not algorithmic",
    title: "Our Team Personally Reviews Your Brief",
    body: "Unlike other platforms, we don't use automated algorithms. Our team reads every enquiry and hand-picks the best 6 firms by cross-checking badge status, budget fit, style portfolio, and availability.",
    points: ["CaseTrust & HDB verified", "Budget compatibility check", "Style portfolio aligned", "Availability confirmed"],
    trust: "We re-verify every firm's certification before each match — no stale data, ever.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=85",
    imageAlt: "Interior Match team reviewing homeowner briefs",
  },
  {
    num: "03", icon: Users, color: "#4ade80", glow: "rgba(74,222,128,0.3)",
    label: "Get 6 Matches",
    tag: "Within 24 hours · WhatsApp or email",
    title: "Receive 6 Perfectly Shortlisted Firms",
    body: "Within 24 hours, you receive 6 matched firm recommendations — each with a full profile, portfolio samples, badge credentials, and direct designer contact details. No cold calls from random firms.",
    points: ["Full firm profile + portfolio", "CaseTrust & HDB badges", "Specialisations listed", "Direct WhatsApp & email"],
    trust: "You are under zero obligation. Browse and contact only the firms you genuinely like.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=900&q=85",
    imageAlt: "Six interior design firm profiles on phone",
  },
  {
    num: "04", icon: Phone, color: "#a78bfa", glow: "rgba(167,139,250,0.3)",
    label: "Meet Designers",
    tag: "On your terms · No pressure",
    title: "Meet, Compare, and Evaluate Designers",
    body: "Contact firms directly on your own terms — Interior Match never acts as a middleman. Visit showrooms across Singapore, request free consultations, and collect itemised quotes to compare clearly.",
    points: ["Direct contact — no gatekeeper", "Free showroom visits", "Request itemised quotes", "Compare Firms tool"],
    trust: "Use our free Budget Calculator to sanity-check any renovation quote you receive.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=900&q=85",
    imageAlt: "Homeowner meeting interior designer in showroom",
  },
  {
    num: "05", icon: Handshake, color: "#fb923c", glow: "rgba(251,146,60,0.3)",
    label: "Sign Safely",
    tag: "CaseTrust deposit protection",
    title: "Sign Your Contract With Full Confidence",
    body: "CaseTrust-certified firms are legally required to hold your deposit in a protected trust account, use standardised contract clauses, and provide a workmanship warranty — CASE mediation backs you if disputes arise.",
    points: ["Protected trust account", "Standardised contract", "CASE mediation available", "Workmanship warranty"],
    trust: "Ask to see the firm's CaseTrust certificate before signing — we'll help you verify it.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&q=85",
    imageAlt: "Signing interior design renovation contract confidently",
  },
  {
    num: "06", icon: Home, color: "#34d399", glow: "rgba(52,211,153,0.3)",
    label: "Dream Home Done",
    tag: "Leave your verified review",
    title: "Move Into the Home You Always Imagined",
    body: "Your designer brings your vision to life. After a final walkthrough and defect inspection, you move in. Share your verified homeowner review to help the next Singaporean make a confident decision.",
    points: ["Completed to agreed scope", "Final walkthrough", "Verified homeowner review", "Refer & earn rewards"],
    trust: "Only homeowners who enquired via Interior Match can review — zero fake reviews allowed.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=85",
    imageAlt: "Beautiful completed Singapore interior design home",
  },
];

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length);
    }, INTERVAL);
  };

  useEffect(() => {
    if (!paused) startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused]);

  const goTo = (i: number) => {
    setActive(i);
    if (timerRef.current) clearInterval(timerRef.current);
    if (!paused) startTimer();
  };

  const step = steps[active];
  const Icon = step.icon;

  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--color-primary)" }}
    >
      {/* Dynamic ambient glow */}
      <div
        className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full pointer-events-none transition-all duration-700"
        style={{ background: `radial-gradient(circle, ${step.glow} 0%, transparent 60%)`, filter: "blur(100px)", opacity: 0.45 }}
      />

      <div className="section-container relative z-10">

        {/* Header */}
        <ScrollReveal direction="up" className="text-center mb-14">
          <p className="section-label mb-3">The Process</p>
          <h2 className="text-section text-white mb-4">How Interior Match Works</h2>
          <p className="text-lead max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.45)" }}>
            Six clear steps from your first brief to your beautiful home.
          </p>
        </ScrollReveal>

        {/* Main panel */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 overflow-hidden"
          style={{ borderRadius: "20px", border: "1px solid rgba(255,255,255,0.08)", minHeight: "520px" }}
        >
          {/* LEFT: step tabs */}
          <StaggerContainer
            className="lg:col-span-4 flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible"
            style={{ background: "rgba(255,255,255,0.03)", borderRight: "1px solid rgba(255,255,255,0.06)" }}
            delay={0.1}
            staggerDelay={0.05}
          >
            {steps.map((s, i) => {
              const SIcon = s.icon;
              const isActive = i === active;
              return (
                <StaggerItem key={s.num} className="flex-shrink-0 lg:flex-shrink w-full">
                  <button
                    onClick={() => goTo(i)}
                  className="flex-shrink-0 lg:flex-shrink text-left flex items-center gap-4 px-6 py-5 transition-all duration-200 relative w-full"
                  style={{
                    background: isActive ? `${s.color}12` : "transparent",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  {/* Active left bar */}
                  {isActive && (
                    <div className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full" style={{ background: s.color }} />
                  )}

                  {/* Auto-progress bar inside active tab */}
                  {isActive && !paused && (
                    <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden">
                      <div
                        className="h-full"
                        style={{
                          background: s.color,
                          animation: `progressBar ${INTERVAL}ms linear infinite`,
                          transformOrigin: "left",
                        }}
                      />
                    </div>
                  )}

                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: isActive ? `${s.color}22` : "rgba(255,255,255,0.05)",
                      border: `1px solid ${isActive ? s.color + "40" : "rgba(255,255,255,0.07)"}`,
                    }}
                  >
                    <SIcon className="w-4 h-4" style={{ color: isActive ? s.color : "rgba(255,255,255,0.3)" }} />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-black uppercase tracking-widest block"
                      style={{ color: isActive ? s.color : "rgba(255,255,255,0.22)" }}>
                      {s.num}
                    </span>
                    <span className="text-sm font-semibold block leading-tight"
                      style={{ color: isActive ? "white" : "rgba(255,255,255,0.38)" }}>
                      {s.label}
                    </span>
                  </div>
                </button>
              </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* RIGHT: image + detail */}
          <ScrollReveal direction="left" delay={0.4} className="lg:col-span-8 flex flex-col h-full" style={{ background: "rgba(255,255,255,0.018)" }}>

            {/* Image */}
            <div className="relative h-48 lg:h-64 overflow-hidden flex-shrink-0">
              <img
                key={step.image}
                src={step.image}
                alt={step.imageAlt}
                className="w-full h-full object-cover transition-opacity duration-500"
                style={{ opacity: 1 }}
              />
              {/* Gradient overlays */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(9,22,42,0.5), transparent 60%)" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(9,22,42,0.85) 0%, transparent 50%)" }} />

              {/* Step tag overlaid on image */}
              <div className="absolute bottom-5 left-7 flex items-center gap-2.5">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${step.color}25`, border: `1px solid ${step.color}40`, backdropFilter: "blur(8px)" }}
                >
                  <Icon className="w-4 h-4" style={{ color: step.color }} />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest block" style={{ color: step.color }}>
                    Step {step.num} · {step.tag}
                  </span>
                  <h3 className="font-bold text-white text-base leading-tight">{step.title}</h3>
                </div>
              </div>

              {/* Pause/play + step counter */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: "rgba(9,22,42,0.7)", color: "rgba(255,255,255,0.5)", backdropFilter: "blur(8px)" }}>
                  {active + 1} / {steps.length}
                </span>
                <button
                  onClick={() => setPaused((p) => !p)}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                  style={{ background: "rgba(9,22,42,0.7)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  {paused
                    ? <Play className="w-3.5 h-3.5 text-white" />
                    : <Pause className="w-3.5 h-3.5 text-white" />}
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-7 lg:p-8 flex flex-col flex-1">
              <div className="h-px mb-6" style={{ background: "rgba(255,255,255,0.05)" }} />

              <p className="leading-relaxed mb-6" style={{ fontSize: "0.93rem", color: "rgba(255,255,255,0.52)" }}>
                {step.body}
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {step.points.map((pt) => (
                  <div key={pt} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: step.color }} />
                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.62)" }}>{pt}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-start gap-2 px-4 py-3 rounded-xl text-xs mb-6"
                style={{ background: `${step.color}0a`, border: `1px solid ${step.color}1a` }}>
                <span style={{ color: step.color }} className="flex-shrink-0 mt-0.5">✦</span>
                <span style={{ color: "rgba(255,255,255,0.45)" }}>{step.trust}</span>
              </div>

              {/* Bottom nav */}
              <div className="flex items-center justify-between mt-auto pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="flex gap-1.5">
                  {steps.map((_, i) => (
                    <button key={i} onClick={() => goTo(i)}
                      className="rounded-full transition-all duration-300"
                      style={{ width: i === active ? "20px" : "6px", height: "6px", background: i === active ? step.color : "rgba(255,255,255,0.12)" }}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => goTo(Math.max(0, active - 1))} disabled={active === 0}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                    style={{ background: "rgba(255,255,255,0.06)", color: active === 0 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.65)" }}>
                    ← Prev
                  </button>
                  {active < steps.length - 1 ? (
                    <button onClick={() => goTo(active + 1)}
                      className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                      style={{ background: `${step.color}20`, color: step.color, border: `1px solid ${step.color}30` }}>
                      Next →
                    </button>
                  ) : (
                    <Link href="/find-my-id" className="btn-accent text-sm py-2 px-5 inline-flex items-center gap-1.5">
                      Get Started <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Progress bar */}
        <ScrollReveal direction="up" delay={0.5} className="mt-3 h-0.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
          <div className="h-full rounded-full transition-all duration-500"
            style={{ width: `${((active + 1) / steps.length) * 100}%`, background: `linear-gradient(to right, ${steps[0].color}, ${step.color})` }} />
        </ScrollReveal>
      </div>

      <style>{`
        @keyframes progressBar {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>
    </section>
  );
}
