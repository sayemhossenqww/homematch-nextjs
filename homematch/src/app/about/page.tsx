import { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles, Shield, Users, TrendingUp, Heart,
  CheckCircle, ArrowRight, Star, Building2, BookOpen,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About HomeMatch | Trusted Interior Design Matching Platform Singapore",
  description:
    "HomeMatch helps Singapore homeowners find trusted, CaseTrust-certified interior designers — free, fast, and safe. Learn how we verify firms, our 5-step matching process, and why 12,400+ homeowners trust us for HDB, BTO, condo, and landed renovations.",
  alternates: { canonical: "https://www.homematch.sg/about" },
  keywords: [
    "HomeMatch Singapore",
    "about HomeMatch",
    "interior design matching platform Singapore",
    "trusted interior designer Singapore",
    "CaseTrust renovation platform",
    "how HomeMatch works",
    "verified interior design firm Singapore",
    "renovation matching service Singapore",
    "free interior designer matching Singapore",
    "safe renovation Singapore",
    "HDB renovation platform Singapore",
  ],
  openGraph: {
    title: "About HomeMatch | Trusted Interior Design Matching Platform Singapore",
    description: "We match Singapore homeowners with CaseTrust-certified interior designers — free, fast, and safe. 12,400+ homeowners matched.",
    url: "https://www.homematch.sg/about",
    siteName: "HomeMatch",
    images: [{ url: "https://www.homematch.sg/og-default.jpg", width: 1200, height: 630, alt: "About HomeMatch Singapore" }],
    type: "website",
    locale: "en_SG",
  },
  twitter: {
    card: "summary_large_image",
    title: "About HomeMatch | Trusted Interior Design Matching Platform Singapore",
    description: "Free, fast, safe matching with CaseTrust-certified interior designers in Singapore.",
    images: ["https://www.homematch.sg/og-default.jpg"],
  },
};

const stats = [
  { value: "12,400+", label: "Homeowners Matched" },
  { value: "50+",     label: "Verified ID Firms" },
  { value: "4.8★",    label: "Average Match Rating" },
  { value: "100%",    label: "CaseTrust Firms" },
];

const values = [
  {
    icon: Shield,
    title: "Consumer Protection First",
    body: "Every firm on HomeMatch holds CaseTrust accreditation. We don't list anyone who doesn't meet that baseline. No exceptions.",
  },
  {
    icon: Users,
    title: "Genuinely Unbiased",
    body: "We don't take commissions from interior designers based on project value. Our matching is based on fit — not who pays us more.",
  },
  {
    icon: TrendingUp,
    title: "Data-Driven Matching",
    body: "Our algorithm looks at your property type, budget, timeline, aesthetic, and location to surface the 6 most relevant firms — not just the 6 who paid for placement.",
  },
  {
    icon: Heart,
    title: "Built for Singapore",
    body: "HDB rules, RC boxes, bomb shelters, wet/dry kitchens, COV, MOP — we understand the Singapore renovation landscape because we live it.",
  },
];

const team = [
  { name: "Kevin Tan", role: "Co-Founder & CEO", desc: "10 years in proptech, survived 2 HDB renovations personally.", initials: "KT", color: "#c8881f" },
  { name: "Priya Nair", role: "Head of Content",  desc: "Former journalist, now writes the most thorough renovation guides in Singapore.", initials: "PN", color: "#a78bfa" },
  { name: "Jason Lim",  role: "Head of Partnerships", desc: "Vets and onboards every ID firm on the platform.", initials: "JL", color: "#38bdf8" },
  { name: "Rachel Chua", role: "Product Designer", desc: "Makes sure HomeMatch is the most intuitive renovation tool you've used.", initials: "RC", color: "#4ade80" },
];

const milestones = [
  { year: "2020", event: "Founded in Singapore during the great BTO renovation wave." },
  { year: "2021", event: "First 100 homeowners matched. First CaseTrust partnership." },
  { year: "2022", event: "Launched Inspiration Gallery with 500+ real Singapore projects." },
  { year: "2023", event: "Hit 5,000 matches. Expanded to cover all property types including landed." },
  { year: "2024", event: "Launched free tools — Budget Calculator, Style Quiz, Renovation Checklist." },
  { year: "2025", event: "12,400+ matches. 50+ verified firms. Singapore's go-to ID matching platform." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#05080f] pt-24 pb-20">

      {/* Hero */}
      <section className="relative overflow-hidden pt-10 pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(200,136,31,0.08) 0%, transparent 65%)", filter: "blur(80px)" }} />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-xs font-bold uppercase tracking-widest"
            style={{ background: "rgba(200,136,31,0.12)", border: "1px solid rgba(200,136,31,0.25)", color: "#c8881f" }}>
            <Sparkles className="w-3.5 h-3.5" /> Our Story
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            We Make Finding the{" "}
            <span style={{ background: "linear-gradient(135deg, #c8881f 0%, #e8a83f 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Right ID
            </span>
            {" "}Simple.
          </h1>
          <p className="text-lg text-white/55 max-w-2xl mx-auto leading-relaxed">
            HomeMatch was built because finding a trustworthy interior designer in Singapore is harder than it should be. We fix that — with verified firms, real reviews, and a matching process that actually works.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center p-8 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <p className="text-3xl font-extrabold text-white mb-2">{value}</p>
              <p className="text-sm text-white/45">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-[#c8881f] mb-4">Our Mission</p>
            <h2 className="text-3xl font-bold text-white mb-6 leading-snug">
              Every Singapore homeowner deserves a renovation they don&apos;t regret.
            </h2>
            <p className="text-white/55 leading-relaxed mb-4">
              Renovation scams, overpriced quotations, ID firms that disappear mid-project — these are real problems affecting thousands of Singaporean families every year. CASE receives hundreds of renovation complaints annually.
            </p>
            <p className="text-white/55 leading-relaxed mb-8">
              HomeMatch exists to change that. We do the vetting so you don&apos;t have to. Every firm on our platform is CaseTrust-accredited, has verified reviews, and has been manually reviewed by our team.
            </p>
            <div className="space-y-3">
              {["Every firm is CaseTrust-certified", "Reviews are from verified homeowners", "No pay-to-rank listings", "Free to use — always"].map(point => (
                <div key={point} className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-[#c8881f] shrink-0" />
                  <span className="text-sm text-white/70">{point}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            {values.map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex items-start gap-4 p-5 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(200,136,31,0.14)", border: "1px solid rgba(200,136,31,0.2)" }}>
                  <Icon className="w-5 h-5 text-[#c8881f]" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm mb-1">{title}</h3>
                  <p className="text-xs text-white/50 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <p className="text-xs font-black uppercase tracking-widest text-[#c8881f] mb-4">Our Journey</p>
        <h2 className="text-2xl font-bold text-white mb-10">From Idea to Singapore&apos;s Most Trusted Renovation Platform</h2>
        <div className="relative">
          <div className="absolute left-20 top-0 bottom-0 w-px" style={{ background: "rgba(255,255,255,0.08)" }} />
          <div className="space-y-6">
            {milestones.map(({ year, event }) => (
              <div key={year} className="flex items-start gap-6 pl-0">
                <div className="w-20 shrink-0 text-right">
                  <span className="text-sm font-extrabold text-[#c8881f]">{year}</span>
                </div>
                <div className="w-2 h-2 rounded-full mt-1.5 shrink-0 ml-[-4px]" style={{ background: "#c8881f" }} />
                <p className="text-sm text-white/60 leading-relaxed pt-0.5">{event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <p className="text-xs font-black uppercase tracking-widest text-[#c8881f] mb-4">The Team</p>
        <h2 className="text-2xl font-bold text-white mb-8">Built by People Who&apos;ve Been Through Renovation</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {team.map(({ name, role, desc, initials, color }) => (
            <div key={name} className="p-6 rounded-2xl text-center"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl font-extrabold text-white"
                style={{ background: `${color}25`, border: `1px solid ${color}40`, color }}>
                {initials}
              </div>
              <h3 className="font-bold text-white text-sm mb-1">{name}</h3>
              <p className="text-xs text-[#c8881f] font-semibold mb-3">{role}</p>
              <p className="text-xs text-white/45 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust badges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="rounded-2xl p-8 md:p-10"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <p className="text-xs font-black uppercase tracking-widest text-[#c8881f] mb-2">Recognised & Trusted</p>
          <h2 className="text-xl font-bold text-white mb-6">We work with Singapore&apos;s consumer protection bodies</h2>
          <div className="flex flex-wrap gap-4">
            {["CaseTrust Accredited", "CASE Member", "HDB Licensed Contractors", "BCA Verified"].map(badge => (
              <div key={badge} className="flex items-center gap-2 px-4 py-2.5 rounded-xl"
                style={{ background: "rgba(200,136,31,0.1)", border: "1px solid rgba(200,136,31,0.2)" }}>
                <Star className="w-3.5 h-3.5 text-[#c8881f]" />
                <span className="text-sm font-semibold text-white/80">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to find your interior designer?</h2>
        <p className="text-white/50 mb-8">Join 12,400+ Singapore homeowners who found their ID through HomeMatch — free, safe, and hassle-free.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/find-my-id"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #c8881f 0%, #e8a83f 100%)", boxShadow: "0 8px 32px rgba(200,136,31,0.35)" }}>
            Find My Interior Designer <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/firms"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-white/70 transition-all hover:text-white hover:bg-white/8"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <Building2 className="w-4 h-4" /> Browse Firms
          </Link>
        </div>
      </section>

      {/* Quick links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-10" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex flex-wrap gap-6 justify-center text-sm">
          {[
            { label: "Articles & Guides", href: "/articles", icon: BookOpen },
            { label: "Privacy Policy",    href: "/privacy",  icon: Shield },
            { label: "Terms of Service",  href: "/terms",    icon: CheckCircle },
            { label: "Contact Us",        href: "/contact",  icon: Users },
          ].map(({ label, href, icon: Icon }) => (
            <Link key={href} href={href}
              className="flex items-center gap-1.5 text-white/40 hover:text-white/70 transition-colors">
              <Icon className="w-3.5 h-3.5" /> {label}
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
