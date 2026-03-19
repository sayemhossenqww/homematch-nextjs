import { Metadata } from "next";
import Link from "next/link";
import {
  Calculator, Palette, CheckSquare, GitCompare,
  ArrowRight, Sparkles, Clock, Users, TrendingUp,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Free Singapore Renovation Planning Tools — Budget Calculator, Style Quiz & More | HomeMatch",
  description:
    "Free renovation planning tools built for Singapore homeowners — HDB and condo budget calculator, interior design style quiz, renovation checklist, and firm comparison tool. Plan smarter before you sign.",
  alternates: { canonical: "https://www.homematch.sg/tools" },
  keywords: [
    "renovation budget calculator Singapore",
    "HDB renovation cost calculator",
    "condo renovation budget tool",
    "interior design style quiz Singapore",
    "renovation checklist Singapore",
    "ID firm comparison tool Singapore",
    "renovation planning tool Singapore",
    "free renovation tools Singapore",
    "BTO renovation budget estimator",
    "how much does HDB renovation cost Singapore",
    "renovation cost estimator Singapore 2025",
  ],
  openGraph: {
    title: "Free Singapore Renovation Planning Tools | HomeMatch",
    description: "Budget calculator, style quiz, renovation checklist, and firm comparison — free tools built for Singapore homeowners.",
    url: "https://www.homematch.sg/tools",
    siteName: "HomeMatch",
    images: [{ url: "https://www.homematch.sg/og-default.jpg", width: 1200, height: 630, alt: "Free Singapore Renovation Tools" }],
    type: "website",
    locale: "en_SG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Singapore Renovation Planning Tools | HomeMatch",
    description: "Budget calculator, style quiz, checklist, and firm comparison — free for Singapore homeowners.",
    images: ["https://www.homematch.sg/og-default.jpg"],
  },
};

const tools = [
  {
    href: "/tools/budget-calculator",
    icon: Calculator,
    accent: "#c8881f",
    accentBg: "rgba(200,136,31,0.12)",
    badge: "Most Popular",
    title: "Budget Calculator",
    description:
      "Get an instant, room-by-room renovation cost estimate for your HDB or condo. Choose your quality level and see a live breakdown before you meet a single ID.",
    stats: [
      { label: "Flat Types", value: "6+" },
      { label: "Cost Items", value: "12" },
      { label: "Accuracy", value: "±15%" },
    ],
    cta: "Calculate My Budget",
  },
  {
    href: "/tools/style-quiz",
    icon: Palette,
    accent: "#a78bfa",
    accentBg: "rgba(167,139,250,0.12)",
    badge: "5 min",
    title: "Style Quiz",
    description:
      "Answer 7 questions about your lifestyle and aesthetic preferences, and we'll match you with your interior design style — from Japandi to Luxury Contemporary.",
    stats: [
      { label: "Questions", value: "7" },
      { label: "Style Profiles", value: "4" },
      { label: "Completion", value: "5 min" },
    ],
    cta: "Discover My Style",
  },
  {
    href: "/tools/renovation-checklist",
    icon: CheckSquare,
    accent: "#4ade80",
    accentBg: "rgba(74,222,128,0.12)",
    badge: "30 Tasks",
    title: "Renovation Checklist",
    description:
      "Never miss a step. Our 30-item interactive checklist covers everything from HDB submission to final handover — saved to your browser so you can track progress over weeks.",
    stats: [
      { label: "Stages", value: "4" },
      { label: "Checklist Items", value: "30" },
      { label: "Saved locally", value: "Auto" },
    ],
    cta: "Start Checklist",
  },
  {
    href: "/tools/compare",
    icon: GitCompare,
    accent: "#38bdf8",
    accentBg: "rgba(56,189,248,0.12)",
    badge: "Side-by-Side",
    title: "Compare Firms",
    description:
      "Put up to 3 interior design firms side-by-side. Compare ratings, budgets, CaseTrust status, and project types to make a confident, informed shortlist.",
    stats: [
      { label: "Firms Available", value: "50+" },
      { label: "Compare Slots", value: "3" },
      { label: "Data Points", value: "11" },
    ],
    cta: "Compare Firms",
  },
];

const tips = [
  { icon: Clock, text: "Use the Budget Calculator first — knowing your budget range helps shortlist the right tier of firms." },
  { icon: Palette, text: "Take the Style Quiz before your first ID meeting so you can show them your aesthetic direction." },
  { icon: CheckSquare, text: "Start the Checklist the day you collect your keys — even if renovation is months away." },
  { icon: Users, text: "Compare at least 3 firms before signing — small differences in budget range can mean very different outcomes." },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-[#05080f] pt-24 pb-20">

      {/* Hero */}
      <section className="relative overflow-hidden pt-12 pb-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-[700px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(200,136,31,0.07) 0%, transparent 65%)", filter: "blur(80px)" }} />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(26,58,92,0.5) 0%, transparent 65%)", filter: "blur(70px)" }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-xs font-bold uppercase tracking-widest"
            style={{ background: "rgba(200,136,31,0.12)", border: "1px solid rgba(200,136,31,0.25)", color: "#c8881f" }}>
            <Sparkles className="w-3.5 h-3.5" />
            Free Renovation Tools
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight">
            Plan Smarter.<br />
            <span style={{ background: "linear-gradient(135deg, #c8881f 0%, #e8a83f 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Renovate Confidently.
            </span>
          </h1>
          <p className="text-lg text-white/55 max-w-2xl mx-auto mb-8 leading-relaxed">
            Four free tools built specifically for Singapore homeowners. From budgeting to shortlisting the right ID — start here before you sign anything.
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            {[
              { label: "Tools Available", value: "4" },
              { label: "Singapore Homeowners Helped", value: "12,400+" },
              { label: "Always Free", value: "100%" },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="text-2xl font-extrabold text-white">{value}</p>
                <p className="text-white/40 text-xs mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
                }}
              >
                {/* Top accent bar */}
                <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${tool.accent}, transparent)` }} />

                <div className="p-8 flex flex-col flex-1">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: tool.accentBg, border: `1px solid ${tool.accent}25` }}>
                      <Icon className="w-7 h-7" style={{ color: tool.accent }} />
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full"
                      style={{ background: `${tool.accent}18`, color: tool.accent, border: `1px solid ${tool.accent}30` }}>
                      {tool.badge}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-white mb-3">{tool.title}</h2>
                  <p className="text-sm text-white/55 leading-relaxed mb-6 flex-1">{tool.description}</p>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-3 mb-6 p-4 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    {tool.stats.map(({ label, value }) => (
                      <div key={label} className="text-center">
                        <p className="text-base font-extrabold text-white">{value}</p>
                        <p className="text-[11px] text-white/35 mt-0.5 leading-tight">{label}</p>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold flex items-center gap-1.5 transition-all group-hover:gap-2.5"
                      style={{ color: tool.accent }}>
                      {tool.cta} <ArrowRight className="w-4 h-4" />
                    </span>
                    <span className="text-xs text-white/25 font-medium">Free · No sign-up</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* How to use them section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="rounded-2xl p-8 md:p-10"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="w-5 h-5 text-[#c8881f]" />
            <h2 className="text-xl font-bold text-white">Pro Tips: How to Use These Tools</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {tips.map(({ icon: Icon, text }, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(200,136,31,0.12)", border: "1px solid rgba(200,136,31,0.2)" }}>
                  <Icon className="w-4 h-4 text-[#c8881f]" />
                </div>
                <p className="text-sm text-white/60 leading-relaxed pt-1.5">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Ready to find your perfect interior designer?
        </h2>
        <p className="text-white/50 mb-8">
          After using the tools, let us match you with 6 CaseTrust-certified firms tailored to your budget and style.
        </p>
        <Link href="/find-my-id"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90 hover:gap-3"
          style={{ background: "linear-gradient(135deg, #c8881f 0%, #e8a83f 100%)", boxShadow: "0 8px 32px rgba(200,136,31,0.35)" }}>
          Find My Interior Designer — Free <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

    </div>
  );
}
