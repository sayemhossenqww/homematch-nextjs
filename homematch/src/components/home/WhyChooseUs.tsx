import Link from "next/link";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";
import {
  Shield,
  DollarSign,
  Clock,
  Star,
  CheckCircle,
  XCircle,
  Building2,
  ArrowRight,
  Users,
  Award,
  Zap,
  Lock,
  ThumbsUp,
  Phone,
} from "lucide-react";

const mainCards = [
  {
    icon: Shield,
    color: "#c8881f",
    gradBg: "linear-gradient(135deg, rgba(200,136,31,0.15) 0%, rgba(200,136,31,0.04) 100%)",
    tag: "Exclusive Certification",
    title: "CaseTrust Certified Firms Only",
    body: "Every single firm on Interior Match holds a valid CaseTrust certification — Singapore's highest consumer protection standard issued by CASE (Consumers Association of Singapore). We verify this independently before listing, and remove firms who lose their certification.",
    points: ["Mandatory deposit protection", "Govt-regulated ethics standard", "CASE dispute resolution backed"],
    link: { label: "Learn about CaseTrust", href: "/casetrust" },
    stat: { num: "100%", label: "of firms are CaseTrust certified" },
  },
  {
    icon: DollarSign,
    color: "#4ade80",
    gradBg: "linear-gradient(135deg, rgba(74,222,128,0.12) 0%, rgba(74,222,128,0.03) 100%)",
    tag: "Zero Cost to You",
    title: "Completely Free — No Hidden Fees",
    body: "Interior Match is 100% free for homeowners. We never take a commission from your renovation contract, never charge for introductions, and never sell your data. Firms pay only a flat listing fee — your quote is never inflated because of us.",
    points: ["No registration required", "No commission on contract", "No upselling or pressure"],
    link: { label: "How we make money", href: "/about" },
    stat: { num: "S$0", label: "charged to any homeowner, ever" },
  },
  {
    icon: Clock,
    color: "#60a5fa",
    gradBg: "linear-gradient(135deg, rgba(96,165,250,0.12) 0%, rgba(96,165,250,0.03) 100%)",
    tag: "Personal Matching",
    title: "6 Best-Fit Firms in 24 Hours",
    body: "Our team personally reviews each inquiry — we don't use algorithms. We read your budget, property type, design style and timeline, then hand-pick exactly 6 firms most suited to your needs. You speak only with relevant designers, not random cold calls.",
    points: ["Human-reviewed, not algorithmic", "Matched to your exact budget", "No spam calls from random firms"],
    link: { label: "Start your match", href: "/find-my-id" },
    stat: { num: "24hrs", label: "average time to receive your 6 matches" },
  },
];

const differentiators = [
  { icon: Award,    label: "Awards & Recognition",      desc: "Recognised by HDB & CASE as Singapore's most transparent renovation platform." },
  { icon: Star,     label: "Verified Reviews Only",      desc: "Every review is from a confirmed homeowner who submitted via our platform. No fake reviews." },
  { icon: Lock,     label: "Your Data is Protected",     desc: "We share your details only with the 6 matched firms. No selling, no spam databases." },
  { icon: Users,    label: "3,200+ Matched Homeowners",  desc: "Singapore's largest community of successfully matched renovation homeowners." },
  { icon: ThumbsUp, label: "4.9★ Google Rating",         desc: "Consistently top-rated across Google, Facebook, and independent review platforms." },
  { icon: Phone,    label: "Human Support Team",         desc: "Real Singaporeans, reachable by WhatsApp, email or phone — no bots, no chatbots." },
  { icon: Building2,label: "HDB-Registered Firms",       desc: "All firms carry valid HDB registration — required by law for HDB renovations." },
  { icon: Zap,      label: "Fastest Matching in SG",     desc: "Submit tonight, receive 6 firm recommendations with contact details by tomorrow morning." },
];

const comparison = [
  { feature: "CaseTrust firms only",         im: true,  others: false },
  { feature: "Free for homeowners",           im: true,  others: "Sometimes" },
  { feature: "Personal matching (not algo)",  im: true,  others: false },
  { feature: "Verified homeowner reviews",    im: true,  others: false },
  { feature: "No firm commission charged",    im: true,  others: false },
  { feature: "HDB-registered firms only",     im: true,  others: "Partial" },
  { feature: "Data sold to advertisers",      im: false, others: true },
];

export default function WhyChooseUs() {
  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--color-primary)" }}
    >
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(200,136,31,0.07) 0%, transparent 65%)", filter: "blur(80px)" }} />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(26,58,92,0.6) 0%, transparent 65%)", filter: "blur(70px)" }} />

      <div className="section-container relative z-10">

        {/* ── Header ── */}
        <ScrollReveal direction="up" className="text-center mb-16">
          <p className="section-label mb-3">Why Interior Match</p>
          <h2 className="text-section text-white mb-4">
            Singapore&apos;s Smartest Way<br />to Find an Interior Designer
          </h2>
          <p className="text-lead max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.50)" }}>
            We built Interior Match because homeowners deserved better — a platform that protects them, saves them time, and genuinely puts their interests first.
          </p>
        </ScrollReveal>

        {/* ── 3 Main Cards ── */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {mainCards.map(({ icon: Icon, color, gradBg, tag, title, body, points, link, stat }) => (
            <StaggerItem key={title} className="card-dark-glass p-7 flex flex-col group">

              {/* Tag */}
              <div className="flex items-center gap-2 mb-5">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: gradBg, border: `1px solid ${color}22` }}>
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color }}>
                  {tag}
                </span>
              </div>

              {/* Stat highlight */}
              <div className="mb-5 pb-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <span className="text-3xl font-extrabold text-white">{stat.num}</span>
                <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.38)" }}>{stat.label}</p>
              </div>

              <h3 className="font-bold text-lg text-white mb-3">{title}</h3>
              <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "rgba(255,255,255,0.52)" }}>
                {body}
              </p>

              {/* Bullet points */}
              <ul className="space-y-2 mb-6">
                {points.map((pt) => (
                  <li key={pt} className="flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.60)" }}>
                    <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color }} />
                    {pt}
                  </li>
                ))}
              </ul>

              <Link href={link.href}
                className="flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2.5"
                style={{ color }}>
                {link.label} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* ── 8-point differentiator grid ── */}
        <div className="mb-16">
          <ScrollReveal direction="up">
            <h3 className="text-center font-bold text-lg text-white mb-8 opacity-80">
              Every detail, done right
            </h3>
          </ScrollReveal>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4" delay={0.1} staggerDelay={0.05}>
            {differentiators.map(({ icon: Icon, label, desc }) => (
              <StaggerItem key={label} className="p-5 flex flex-col gap-3"
                style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "14px" }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(200,136,31,0.12)" }}>
                  <Icon className="w-4 h-4" style={{ color: "#c8881f" }} />
                </div>
                <div>
                  <p className="font-semibold text-sm text-white mb-1">{label}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>{desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* ── Comparison table ── */}
        <div className="mt-4">
          {/* Title */}
          <ScrollReveal direction="up" className="text-center mb-8">
            <p className="section-label mb-2">Why we&apos;re different</p>
            <h3 className="text-2xl font-bold text-white">Interior Match vs Other Platforms</h3>
          </ScrollReveal>

          {/* Table card with glow */}
          <ScrollReveal direction="up" delay={0.2} className="relative overflow-hidden"
            style={{
              borderRadius: "16px",
              border: "1px solid rgba(200,136,31,0.25)",
              boxShadow: "0 0 60px rgba(200,136,31,0.08), 0 24px 60px rgba(0,0,0,0.3)",
            }}
          >
            {/* Subtle gold glow behind */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 pointer-events-none"
              style={{ background: "radial-gradient(ellipse, rgba(200,136,31,0.12) 0%, transparent 70%)", filter: "blur(30px)" }} />

            {/* Header row */}
            <div
              className="grid grid-cols-12 relative z-10"
              style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="col-span-6 px-6 py-4">
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>
                  Feature
                </span>
              </div>
              {/* Interior Match column header */}
              <div
                className="col-span-3 px-4 py-4 flex flex-col items-center justify-center gap-1"
                style={{ background: "rgba(200,136,31,0.12)", borderLeft: "1px solid rgba(200,136,31,0.2)", borderRight: "1px solid rgba(200,136,31,0.2)" }}
              >
                <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#c8881f" }}>
                  Interior Match
                </span>
                <span
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(200,136,31,0.2)", color: "#e8a830" }}
                >
                  ✦ Recommended
                </span>
              </div>
              {/* Others column header */}
              <div className="col-span-3 px-4 py-4 flex items-center justify-center">
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.25)" }}>
                  Others
                </span>
              </div>
            </div>

            {/* Data rows */}
            {comparison.map(({ feature, im, others }, i) => (
              <div
                key={feature}
                className="grid grid-cols-12 relative z-10 items-center"
                style={{
                  borderBottom: i < comparison.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  background: i % 2 === 1 ? "rgba(255,255,255,0.015)" : "transparent",
                }}
              >
                {/* Feature label */}
                <div className="col-span-6 px-6 py-4">
                  <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.75)" }}>
                    {feature}
                  </span>
                </div>

                {/* Interior Match cell — gold highlight */}
                <div
                  className="col-span-3 px-4 py-4 flex items-center justify-center"
                  style={{ borderLeft: "1px solid rgba(200,136,31,0.15)", borderRight: "1px solid rgba(200,136,31,0.15)", background: "rgba(200,136,31,0.04)" }}
                >
                  {im === true ? (
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="w-5 h-5" style={{ color: "#4ade80" }} />
                      <span className="text-xs font-bold" style={{ color: "#4ade80" }}>Yes</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <XCircle className="w-4 h-4" style={{ color: "#f87171" }} />
                      <span className="text-xs font-bold" style={{ color: "#f87171" }}>No</span>
                    </div>
                  )}
                </div>

                {/* Others cell */}
                <div className="col-span-3 px-4 py-4 flex items-center justify-center">
                  {others === true ? (
                    <div className="flex items-center gap-1.5">
                      <XCircle className="w-4 h-4" style={{ color: "#f87171" }} />
                      <span className="text-xs" style={{ color: "#f87171" }}>Yes</span>
                    </div>
                  ) : others === false ? (
                    <span className="text-sm font-bold" style={{ color: "rgba(255,255,255,0.2)" }}>—</span>
                  ) : (
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(255,165,0,0.12)", color: "rgba(255,165,0,0.8)" }}
                    >
                      {others}
                    </span>
                  )}
                </div>
              </div>
            ))}

            {/* Footer row — CTA inside table */}
            <div
              className="grid grid-cols-12 relative z-10"
              style={{ background: "rgba(200,136,31,0.06)", borderTop: "1px solid rgba(200,136,31,0.15)" }}
            >
              <div className="col-span-6 px-6 py-4">
                <p className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.35)" }}>
                  The choice is clear.
                </p>
              </div>
              <div
                className="col-span-6 px-4 py-3 flex items-center justify-center"
                style={{ borderLeft: "1px solid rgba(200,136,31,0.15)" }}
              >
                <Link href="/find-my-id" className="btn-accent text-xs py-2 px-5">
                  Get Matched Free →
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* ── CTA ── */}
        <ScrollReveal direction="up" delay={0.3} className="text-center mt-14">
          <Link href="/find-my-id" className="btn-accent text-base py-3.5 px-8">
            Get My 6 Matched Firms — Free →
          </Link>
          <p className="mt-3 text-xs" style={{ color: "rgba(255,255,255,0.28)" }}>
            No registration · No commitment · Takes 5 minutes
          </p>
        </ScrollReveal>

      </div>
    </section>
  );
}
