"use client";
import Link from "next/link";
import { ArrowRight, Clock, BookOpen, TrendingUp, Shield, DollarSign, Lightbulb, Home, ChevronRight } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";
import { getAllArticles, getFeaturedArticles } from "@/data/articles";

const CATEGORY_COLOURS: Record<string, string> = {
  "HDB Guides":          "#38bdf8",
  "Budget Guides":       "#4ade80",
  "Design Trends":       "#a78bfa",
  "House Hacks":         "#c8881f",
  "Consumer Protection": "#60a5fa",
  "Smart Home":          "#22d3ee",
  "Designer Spotlight":  "#f472b6",
};

const categories = [
  { label: "All",                icon: BookOpen,   color: "#c8881f" },
  { label: "Budget Guides",      icon: DollarSign, color: "#4ade80" },
  { label: "Design Trends",      icon: TrendingUp, color: "#a78bfa" },
  { label: "Consumer Protection",icon: Shield,     color: "#60a5fa" },
  { label: "HDB Guides",         icon: Home,       color: "#38bdf8" },
  { label: "Smart Home",         icon: Lightbulb,  color: "#22d3ee" },
];

const quickTopics = [
  { label: "HDB Renovation Checklist",   href: "/articles/renovation-checklist-singapore" },
  { label: "Renovation Loan Guide",       href: "/articles/renovation-loan-singapore-guide" },
  { label: "Open Concept Kitchen",        href: "/articles/hdb-open-concept-kitchen-guide" },
  { label: "Design Trends 2025",          href: "/articles/singapore-interior-design-trends-2025" },
  { label: "How to Read a Quotation",     href: "/articles/renovation-quotation-guide" },
  { label: "Smart Lighting Guide",        href: "/articles/smart-lighting-singapore-guide" },
];

export default function LatestArticles() {
  const allArticles = getAllArticles();
  const featuredArticles = getFeaturedArticles();
  const featured = featuredArticles[0] ?? allArticles[0];
  const rest = allArticles.filter(a => a.slug !== featured.slug).slice(0, 4);

  // Map to shape expected by template below
  const featuredMapped = {
    title: featured.title,
    excerpt: featured.excerpt,
    category: featured.category,
    catColor: CATEGORY_COLOURS[featured.category] ?? "#c8881f",
    readTime: `${featured.readTime} min`,
    date: featured.publishDate,
    slug: featured.slug,
    image: featured.heroImage,
  };
  const restMapped = rest.map(a => ({
    title: a.title,
    excerpt: a.excerpt,
    category: a.category,
    catColor: CATEGORY_COLOURS[a.category] ?? "#c8881f",
    readTime: `${a.readTime} min`,
    date: a.publishDate,
    slug: a.slug,
    image: a.heroImage,
  }));

  return (
    <section className="section-padding relative overflow-hidden" style={{ background: "var(--color-primary)" }}>
      {/* Ambient glows */}
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(200,136,31,0.07) 0%, transparent 65%)", filter: "blur(80px)" }} />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(26,58,92,0.6) 0%, transparent 65%)", filter: "blur(70px)" }} />

      <div className="section-container relative z-10">

        {/* ── Header ── */}
        <ScrollReveal direction="left" delay={0.1} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="section-label mb-3">Resources</p>
            <h2 className="text-section text-white">Renovation Tips &amp; Design Guides</h2>
            <p className="mt-2 text-sm max-w-md" style={{ color: "rgba(255,255,255,0.42)" }}>
              Free guides written by renovation experts and verified Singapore homeowners.
            </p>
          </div>
          <Link href="/articles"
            className="flex items-center gap-1.5 text-sm font-semibold transition-all hover:gap-2.5 self-start md:self-auto"
            style={{ color: "#c8881f" }}>
            Browse All Articles <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </ScrollReveal>

        {/* ── Category filter tabs ── */}
        <ScrollReveal direction="left" delay={0.2} className="flex gap-2 flex-wrap mb-10">
          {categories.map(({ label, icon: Icon, color }) => (
            <div key={label}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all"
              style={{
                background: label === "All" ? "#c8881f" : "rgba(255,255,255,0.06)",
                color: label === "All" ? "white" : "rgba(255,255,255,0.45)",
                border: `1px solid ${label === "All" ? "#c8881f" : "rgba(255,255,255,0.08)"}`,
              }}>
              <Icon className="w-3 h-3" />
              {label}
            </div>
          ))}
        </ScrollReveal>

        {/* ── Main layout: featured left + 4-card right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5">

          {/* Featured card — large */}
          <ScrollReveal direction="up" delay={0.3} className="lg:col-span-5 h-full">
            <Link href={`/articles/${featuredMapped.slug}`}
              className="group relative flex flex-col overflow-hidden h-full"
              style={{
                borderRadius: "18px",
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.09)",
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = `${featuredMapped.catColor}40`;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px rgba(0,0,0,0.3)`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.09)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
            {/* Image */}
            <div className="relative h-56 overflow-hidden flex-shrink-0">
              <img src={featuredMapped.image} alt={featuredMapped.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(9,22,42,0.9) 0%, rgba(9,22,42,0.1) 60%, transparent 100%)" }} />

              {/* Featured badge */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
                  style={{ background: "#c8881f", color: "white" }}>
                  Featured
                </span>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                  style={{ background: `${featuredMapped.catColor}25`, color: featuredMapped.catColor, border: `1px solid ${featuredMapped.catColor}35` }}>
                  {featuredMapped.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
              <h3 className="font-bold text-white text-lg leading-snug mb-3">{featuredMapped.title}</h3>
              <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "rgba(255,255,255,0.52)" }}>{featuredMapped.excerpt}</p>
              <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                  <Clock className="w-3 h-3" /> {featuredMapped.readTime} read · {featuredMapped.date}
                </div>
                <div className="flex items-center gap-1 text-xs font-bold transition-all group-hover:gap-1.5" style={{ color: "#c8881f" }}>
                  Read Guide <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
            </Link>
          </ScrollReveal>

          {/* Right 2×2 grid */}
          <StaggerContainer delay={0.4} staggerDelay={0.1} className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {restMapped.map((a) => (
              <StaggerItem key={a.slug} className="h-full">
                <Link href={`/articles/${a.slug}`}
                  className="group flex flex-col overflow-hidden h-full"
                  style={{
                    borderRadius: "16px",
                    background: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    transition: "border-color 0.3s, box-shadow 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${a.catColor}40`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.09)";
                  }}
                >
                {/* Image */}
                <div className="relative h-36 overflow-hidden flex-shrink-0">
                  <img src={a.image} alt={a.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(9,22,42,0.75) 0%, transparent 60%)" }} />
                  <span className="absolute top-2.5 left-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: `${a.catColor}22`, color: a.catColor, border: `1px solid ${a.catColor}30` }}>
                    {a.category}
                  </span>
                </div>
                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-bold text-white text-sm leading-snug mb-1.5 line-clamp-2">{a.title}</h3>
                  <p className="text-xs leading-relaxed flex-1 line-clamp-2 mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>{a.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-[10px]" style={{ color: "rgba(255,255,255,0.30)" }}>
                      <Clock className="w-2.5 h-2.5" /> {a.readTime} · {a.date}
                    </span>
                    <span className="flex items-center gap-0.5 text-[10px] font-bold" style={{ color: a.catColor }}>
                      Read <ArrowRight className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* ── Quick topic links ── */}
        <ScrollReveal direction="up" delay={0.5} className="mt-8 p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-shrink-0">
              <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: "#c8881f" }}>Popular Topics</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.30)" }}>Jump to a guide</p>
            </div>
            <div className="flex flex-wrap gap-2 flex-1">
              {quickTopics.map(({ label, href }) => (
                <Link key={label} href={href}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all hover:bg-white/10"
                  style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.60)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  {label} <ChevronRight className="w-3 h-3 opacity-50" />
                </Link>
              ))}
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
