import Link from "next/link";
import { ArrowRight, Shield, BadgeCheck, Clock, Star, CheckCircle, ChevronRight } from "lucide-react";

export default function CtaBottom() {
  return (
    <section className="relative overflow-hidden" style={{ background: "var(--color-primary)" }}>

      {/* ── Full-bleed editorial split layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[580px]">

        {/* LEFT — dark image / graphic side */}
        <div className="relative flex flex-col justify-between px-10 py-16 lg:px-16 overflow-hidden"
          style={{ background: "linear-gradient(135deg, rgba(9,22,42,0.95) 0%, rgba(14,35,66,0.98) 100%)" }}>

          {/* Background pattern */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 24px)`,
            }} />

          {/* Corner gold glow */}
          <div className="absolute top-0 left-0 w-[400px] h-[400px] pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(200,136,31,0.15) 0%, transparent 60%)", filter: "blur(60px)" }} />

          {/* Label */}
          <div className="relative z-10">
            <p className="section-label mb-0">Start Today</p>
          </div>

          {/* Big headline */}
          <div className="relative z-10 my-auto py-8">
            <h2 className="font-black leading-none text-white mb-6"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "-0.02em" }}>
              Find Your<br />
              <span style={{
                background: "linear-gradient(135deg, #c8881f 0%, #e8a830 50%, #c8881f 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Perfect Designer
              </span><br />
              in 24 Hours.
            </h2>
            <p className="text-base max-w-sm" style={{ color: "rgba(255,255,255,0.50)" }}>
              Tell us about your home — our team hand-picks 6 CaseTrust-certified interior designers that genuinely match your style, budget, and timeline.
            </p>
          </div>

          {/* Rating block */}
          <div className="relative z-10 flex items-center gap-4">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4" style={{ color: "#f59e0b", fill: "#f59e0b" }} />)}
            </div>
            <div>
              <span className="font-black text-white text-sm">4.9 / 5</span>
              <span className="text-xs ml-1.5" style={{ color: "rgba(255,255,255,0.35)" }}>from 1,247 verified reviews</span>
            </div>
          </div>
        </div>

        {/* RIGHT — action card */}
        <div className="relative flex flex-col justify-center px-10 py-16 lg:px-14"
          style={{ background: "rgba(255,255,255,0.04)", borderLeft: "1px solid rgba(255,255,255,0.06)" }}>

          {/* Subtle right glow */}
          <div className="absolute bottom-0 right-0 w-[350px] h-[350px] pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(200,136,31,0.08) 0%, transparent 60%)", filter: "blur(60px)" }} />

          <div className="relative z-10">

            {/* What you get */}
            <div className="mb-8">
              <p className="text-xs font-black uppercase tracking-widest mb-5" style={{ color: "#c8881f" }}>
                What you get — free
              </p>
              <div className="space-y-3.5">
                {[
                  { icon: BadgeCheck, color: "#c8881f",  text: "6 hand-picked CaseTrust-certified firms" },
                  { icon: Clock,      color: "#60a5fa",  text: "Matched within 24 business hours" },
                  { icon: Shield,     color: "#4ade80",  text: "Every firm is HDB-registered & verified" },
                  { icon: CheckCircle,color: "#a78bfa",  text: "No spam, no unsolicited calls" },
                  { icon: CheckCircle,color: "#34d399",  text: "No registration. No commitment" },
                ].map(({ icon: Icon, color, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${color}14`, border: `1px solid ${color}25` }}>
                      <Icon className="w-4 h-4" style={{ color }} />
                    </div>
                    <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.78)" }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Primary CTA */}
            <Link href="/find-my-id"
              className="w-full flex items-center justify-center gap-2 py-4 px-8 rounded-2xl font-black text-white text-base mb-3 transition-all hover:brightness-110"
              style={{
                background: "linear-gradient(135deg, #c8881f 0%, #e8a830 100%)",
                boxShadow: "0 8px 32px rgba(200,136,31,0.40), 0 2px 8px rgba(0,0,0,0.2)",
                letterSpacing: "0.01em",
              }}>
              Get My 6 Matched Firms — Free
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Secondary CTA */}
            <Link href="/firms"
              className="w-full flex items-center justify-center gap-1.5 py-3.5 px-8 rounded-2xl font-semibold text-sm transition-all hover:bg-white/10"
              style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,255,255,0.09)" }}>
              Browse All Firms
              <ChevronRight className="w-4 h-4 opacity-50" />
            </Link>

            <p className="text-center text-xs mt-4" style={{ color: "rgba(255,255,255,0.25)" }}>
              Takes 5 minutes · Joined by 3,200+ homeowners · PDPA compliant
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}
