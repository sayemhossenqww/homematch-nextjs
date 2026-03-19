import { Metadata } from "next";
import { getFirmBySlug, getProjectsByFirm, mockFirms } from "@/data/firms";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Star, ShieldCheck, MapPin, CheckCircle, ChevronRight, Award,
  Building2, Clock, Briefcase, TrendingUp, MessageSquare, Home,
  Phone, ExternalLink, Globe, Instagram, Mail, Users, Zap,
  ArrowUpRight, Tag, Calendar,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import FirmEnquirySidebar from "@/components/firms/FirmEnquirySidebar";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";
import ReviewsSection from "@/components/firms/ReviewsSection";

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const firm = getFirmBySlug(slug);
  if (!firm) return { title: "Firm Not Found" };

  const year        = new Date().getFullYear();
  const yearsActive = year - firm.established;
  const allStyles   = firm.styles.join(", ");
  const topStyles   = firm.styles.slice(0, 2).join(" & ");
  const caseTrust   = firm.isCaseTrust ? "CaseTrust-Certified " : "";
  const district    = firm.district ?? "Singapore";
  const budgetK     = firm.avgBudget >= 1000 ? `S$${(firm.avgBudget / 1000).toFixed(0)}K` : `S$${firm.avgBudget}`;

  // Dominant property type(s) for this firm
  const ptypes = firm.projectTypes;
  const dominant = (
    ptypes.hdb    >= 50 ? "HDB" :
    ptypes.condo  >= 50 ? "Condo" :
    ptypes.landed >= 50 ? "Landed" : "HDB, Condo & Landed"
  );

  // Service areas snippet
  const areas = firm.serviceAreas?.slice(0, 3).join(", ");

  const title = `${firm.name} — ${caseTrust}${topStyles} Interior Designer ${district} ${year} | HomeMatch`;
  const description = [
    `${firm.name} is a ${caseTrust}interior design firm in ${district}, Singapore`,
    `established ${firm.established} (${yearsActive}+ years).`,
    `Specialises in ${allStyles} renovations for ${dominant} properties.`,
    `Avg. budget ${budgetK}.`,
    firm.warranty ? `${firm.warranty}.` : "",
    `${firm.reviewCount} verified homeowner reviews · ${firm.rating}★.`,
    `Serving ${areas ?? district}. View portfolio and enquire free.`,
  ].filter(Boolean).join(" ");

  const keywords = [
    // Brand-specific
    `${firm.name}`,
    `${firm.name} review`,
    `${firm.name} Singapore`,
    `${firm.name} interior design`,
    `${firm.name} portfolio`,
    `${firm.name} price`,
    // Style + location
    ...firm.styles.map(s => `${s.toLowerCase()} interior design ${district} Singapore`),
    ...firm.styles.map(s => `${s.toLowerCase()} interior designer Singapore`),
    ...firm.styles.map(s => `${s.toLowerCase()} renovation Singapore`),
    // Property type + district
    `HDB interior design ${district}`,
    `HDB renovation ${district} Singapore`,
    `condo interior design ${district}`,
    `condo renovation ${district} Singapore`,
    ptypes.landed >= 20 ? `landed house interior design ${district}` : "",
    // Budget range
    `${budgetK} renovation Singapore`,
    `${dominant.toLowerCase()} renovation ${budgetK} Singapore`,
    // Trust
    `${caseTrust}interior designer Singapore`,
    `interior design firm ${district} Singapore`,
    `interior designer ${district} Singapore`,
    `renovation firm ${district} Singapore`,
    // Comparison / search intent
    `best interior designer ${district} Singapore`,
    `top interior design firm ${district}`,
    `interior design company ${district} Singapore`,
    // Service areas
    ...(firm.serviceAreas ?? []).map(a => `interior designer ${a} Singapore`),
  ].filter(Boolean) as string[];

  return {
    title,
    description,
    alternates: { canonical: `https://www.homematch.sg/firms/${firm.slug}` },
    keywords,
    openGraph: {
      title: `${firm.name} — ${caseTrust}${topStyles} Interior Design ${district} | ${year}`,
      description,
      url: `https://www.homematch.sg/firms/${firm.slug}`,
      siteName: "HomeMatch",
      images: [{ url: firm.banner, width: 1200, height: 630, alt: `${firm.name} — Interior Design ${district} Singapore` }],
      type: "website",
      locale: "en_SG",
    },
    twitter: {
      card: "summary_large_image",
      title: `${firm.name} — ${caseTrust}${topStyles} Interior Design ${district}`,
      description,
      images: [firm.banner],
    },
  };
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return mockFirms.map(f => ({ slug: f.slug }));
}

export default async function FirmProfilePage({ params }: Props) {
  const { slug } = await params;
  const firm = getFirmBySlug(slug);
  if (!firm) notFound();

  const firmProjects  = getProjectsByFirm(firm.slug);
  const yearsActive   = new Date().getFullYear() - firm.established;

  // Rating breakdown (mock distribution based on overall rating)
  const ratingBreakdown = [
    { stars: 5, pct: Math.round(firm.rating >= 4.8 ? 78 : firm.rating >= 4.5 ? 65 : 50) },
    { stars: 4, pct: Math.round(firm.rating >= 4.8 ? 15 : firm.rating >= 4.5 ? 22 : 28) },
    { stars: 3, pct: Math.round(firm.rating >= 4.8 ? 5  : firm.rating >= 4.5 ? 8  : 12) },
    { stars: 2, pct: 2 },
    { stars: 1, pct: 0 },
  ];

  const firmJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://www.homematch.sg/firms/${firm.slug}`,
    "name": firm.name,
    "description": firm.bio.slice(0, 160),
    "url": `https://www.homematch.sg/firms/${firm.slug}`,
    "image": firm.banner ?? firm.logo,
    "telephone": firm.phone,
    "email": firm.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": firm.address,
      "addressLocality": firm.district ?? "Singapore",
      "addressCountry": "SG",
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": firm.rating,
      "reviewCount": firm.reviewCount,
      "bestRating": 5,
      "worstRating": 1,
    },
    "foundingDate": String(firm.established),
    "numberOfEmployees": firm.teamSize ? { "@type": "QuantitativeValue", "value": firm.teamSize } : undefined,
    "sameAs": [
      ...(firm.website   ? [firm.website]                                    : []),
      ...(firm.instagram ? [`https://www.instagram.com/${firm.instagram}`]   : []),
    ],
  };

  const firmBreadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home",  "item": "https://www.homematch.sg/" },
      { "@type": "ListItem", "position": 2, "name": "Firms", "item": "https://www.homematch.sg/firms" },
      { "@type": "ListItem", "position": 3, "name": firm.name, "item": `https://www.homematch.sg/firms/${firm.slug}` },
    ],
  };

  return (
    <div className="min-h-screen bg-[#05080f]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(firmJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(firmBreadcrumbJsonLd) }} />

      {/* ── Breadcrumb ── */}
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-2 text-xs font-medium text-white/30 flex items-center gap-1.5">
        <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/firms" className="hover:text-white/70 transition-colors">Firms</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-white/60">{firm.name}</span>
      </div>

      {/* ── Hero Banner ── */}
      <div className="relative h-72 md:h-96 w-full overflow-hidden">
        <Image src={firm.banner} alt={`${firm.name} banner`} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05080f] via-[#05080f]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#05080f]/60 via-transparent to-transparent" />
      </div>

      {/* ── Identity Block ── */}
      <div className="max-w-7xl mx-auto px-4 -mt-20 mb-0 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end gap-5 md:gap-8">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border-4 border-[#05080f] bg-white shadow-2xl shadow-black/60 shrink-0 ring-1 ring-white/10">
            <Image src={firm.logo} alt={firm.name} width={128} height={128} className="object-cover w-full h-full" />
          </div>
          <div className="flex-1 pb-1">
            <div className="flex flex-wrap gap-2 mb-3">
              {firm.isCaseTrust && (
                <span className="inline-flex items-center gap-1.5 bg-sky-500/10 border border-sky-500/25 text-sky-400 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg">
                  <ShieldCheck className="w-3 h-3" /> CaseTrust Certified
                </span>
              )}
              {firm.isFeatured && (
                <span className="inline-flex items-center gap-1.5 bg-[#c8881f]/10 border border-[#c8881f]/25 text-[#c8881f] text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg">
                  <TrendingUp className="w-3 h-3" /> Featured Firm
                </span>
              )}
              {firm.warranty && (
                <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg">
                  <CheckCircle className="w-3 h-3" /> {firm.warranty}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-2 leading-tight">{firm.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/50">
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#c8881f]" />{firm.address}</span>
              <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-[#c8881f] fill-current" /><span className="text-white font-bold">{firm.rating.toFixed(1)}</span> ({firm.reviewCount} reviews)</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />Responds {firm.responseTime}</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3 pb-1 shrink-0">
            <Link href={`/firms/${firm.slug}?enquire=true`} className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#c8881f] hover:bg-[#d4951f] text-white font-bold rounded-xl text-sm shadow-lg shadow-[#c8881f]/25 transition-all hover:-translate-y-0.5">
              <Phone className="w-4 h-4" /> Enquire Now
            </Link>
          </div>
        </div>
      </div>

      {/* ── Contact & Social Row ── */}
      <ScrollReveal>
        <div className="max-w-7xl mx-auto px-4 mt-8">
          <div className="flex flex-wrap gap-3">
            {firm.phone && (
              <a href={`tel:${firm.phone}`} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/8 text-white/60 hover:text-white hover:border-white/20 text-sm font-medium transition-all">
                <Phone className="w-4 h-4 text-[#c8881f]" /> {firm.phone}
              </a>
            )}
            {firm.whatsapp && (
              <a href={`https://wa.me/${firm.whatsapp}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/8 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/15 text-sm font-medium transition-all">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.555 4.122 1.527 5.856L0 24l6.335-1.502C8.04 23.445 9.984 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.944 0-3.753-.527-5.299-1.442l-.379-.225-3.93.931.978-3.852-.247-.396A9.807 9.807 0 012.182 12C2.182 6.59 6.59 2.182 12 2.182c5.411 0 9.818 4.408 9.818 9.818 0 5.411-4.407 9.818-9.818 9.818z"/></svg>
                WhatsApp
              </a>
            )}
            {firm.website && (
              <a href={firm.website} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/8 text-white/60 hover:text-white hover:border-white/20 text-sm font-medium transition-all">
                <Globe className="w-4 h-4 text-[#c8881f]" /> Website <ArrowUpRight className="w-3 h-3" />
              </a>
            )}
            {firm.instagram && (
              <a href={`https://instagram.com/${firm.instagram}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/8 text-white/60 hover:text-white hover:border-white/20 text-sm font-medium transition-all">
                <Instagram className="w-4 h-4 text-pink-400" /> @{firm.instagram}
              </a>
            )}
            {firm.email && (
              <a href={`mailto:${firm.email}`}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/8 text-white/60 hover:text-white hover:border-white/20 text-sm font-medium transition-all">
                <Mail className="w-4 h-4 text-[#c8881f]" /> {firm.email}
              </a>
            )}
          </div>
        </div>
      </ScrollReveal>

      {/* ── Quick Stats ── */}
      <ScrollReveal>
        <div className="max-w-7xl mx-auto px-4 mt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: <Briefcase className="w-5 h-5" />, label: "Projects Done",  value: firm.totalProjects ? `${firm.totalProjects}+` : `${firmProjects.length}+` },
              { icon: <TrendingUp  className="w-5 h-5" />, label: "Avg Budget",    value: `S$${firm.avgBudget / 1000}K` },
              { icon: <Building2  className="w-5 h-5" />, label: `${yearsActive}+ Yrs`, value: `Est. ${firm.established}` },
              { icon: <Zap        className="w-5 h-5" />, label: "Response",       value: firm.responseTime },
            ].map(({ icon, label, value }) => (
              <div key={label} className="bg-[#0a0e1a] border border-white/8 rounded-2xl px-4 py-5 flex flex-col items-center justify-center text-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#c8881f]/10 border border-[#c8881f]/20 flex items-center justify-center text-[#c8881f]">{icon}</div>
                <div>
                  <p className="text-xl font-black text-white leading-none mb-1">{value}</p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/35">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* ── Two-column ── */}
      <div className="max-w-7xl mx-auto px-4 mt-12 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12">

          <div className="space-y-16 min-w-0">

            {/* About */}
            <ScrollReveal>
              <SectionHeader icon={<Home className="w-5 h-5" />} title={`About ${firm.name}`} />
              <p className="text-white/65 leading-[1.85] text-[15px] mb-5">{firm.bio}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {firm.styles.map(s => (
                  <span key={s} className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white/60 hover:border-[#c8881f]/40 hover:text-[#c8881f] hover:bg-[#c8881f]/5 transition-all cursor-default">{s}</span>
                ))}
              </div>
              {/* Team + Service areas */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                {firm.teamSize && (
                  <div className="bg-white/4 border border-white/8 rounded-xl px-4 py-3 flex items-center gap-3">
                    <Users className="w-4 h-4 text-[#c8881f]" />
                    <div><p className="text-[9px] uppercase tracking-wider text-white/35">Team Size</p><p className="text-sm font-bold text-white">{firm.teamSize} Designers</p></div>
                  </div>
                )}
                {firm.serviceAreas && (
                  <div className="bg-white/4 border border-white/8 rounded-xl px-4 py-3 flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-[#c8881f]" />
                    <div><p className="text-[9px] uppercase tracking-wider text-white/35">Service Areas</p><p className="text-sm font-bold text-white">{firm.serviceAreas.slice(0, 3).join(", ")}{firm.serviceAreas.length > 3 ? ` +${firm.serviceAreas.length - 3}` : ""}</p></div>
                  </div>
                )}
              </div>
            </ScrollReveal>

            {/* Expertise Breakdown */}
            <ScrollReveal>
              <SectionHeader icon={<TrendingUp className="w-5 h-5" />} title="Expertise Breakdown" />
              <div className="bg-[#0a0e1a] border border-white/8 rounded-2xl p-6 space-y-5">
                {[
                  { label: "HDB",        pct: firm.projectTypes.hdb,        color: "bg-[#c8881f]",  dot: "bg-[#c8881f]",  text: "text-[#c8881f]",  desc: "BTO & Resale flats" },
                  { label: "Condo",      pct: firm.projectTypes.condo,      color: "bg-sky-400",    dot: "bg-sky-400",    text: "text-sky-400",    desc: "Private apartments" },
                  { label: "Landed",     pct: firm.projectTypes.landed,     color: "bg-emerald-400",dot: "bg-emerald-400",text: "text-emerald-400",desc: "Terraces & bungalows" },
                  { label: "Commercial", pct: firm.projectTypes.commercial,  color: "bg-violet-400", dot: "bg-violet-400", text: "text-violet-400", desc: "Offices & retail" },
                ].filter(r => r.pct > 0).map(row => (
                  <div key={row.label}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <span className={`w-2 h-2 rounded-full ${row.dot}`} />
                        <span className="text-sm font-bold text-white">{row.label}</span>
                        <span className="text-xs text-white/35">{row.desc}</span>
                      </div>
                      <span className={`text-sm font-black ${row.text}`}>{row.pct}%</span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-white/6 overflow-hidden">
                      <div className={`h-full rounded-full ${row.color}`} style={{ width: `${row.pct}%`, transition: "width 1s ease" }} />
                    </div>
                  </div>
                ))}
                <div className="pt-3 border-t border-white/6 flex flex-wrap gap-x-6 gap-y-2">
                  <div><p className="text-[9px] uppercase tracking-wider text-white/30 mb-0.5">Primary Style</p><p className="text-xs font-bold text-white/70">{firm.styles[0]}</p></div>
                  <div><p className="text-[9px] uppercase tracking-wider text-white/30 mb-0.5">Est. Avg Budget</p><p className="text-xs font-bold text-white/70">S${firm.avgBudget / 1000}K</p></div>
                  {firm.warranty && <div><p className="text-[9px] uppercase tracking-wider text-white/30 mb-0.5">Warranty</p><p className="text-xs font-bold text-emerald-400">{firm.warranty}</p></div>}
                </div>
              </div>
            </ScrollReveal>

            {/* Badges */}
            <ScrollReveal>
              <SectionHeader icon={<Award className="w-5 h-5" />} title="HomeMatch Badges" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {firm.badges.map(badge => {
                  const gradeNum = badge.grade === "III" ? 3 : badge.grade === "II" ? 2 : 1;
                  const gc = {
                    3: { ring: "border-[#c8881f]/50", bg: "bg-[#c8881f]/10", text: "text-[#c8881f]", dot: "bg-[#c8881f]",  label: "Gold"   },
                    2: { ring: "border-sky-400/40",   bg: "bg-sky-400/8",    text: "text-sky-400",   dot: "bg-sky-400",    label: "Silver" },
                    1: { ring: "border-white/20",      bg: "bg-white/5",      text: "text-white/50",  dot: "bg-white/40",   label: "Bronze" },
                  }[gradeNum];
                  return (
                    <div key={badge.id} className={`relative bg-[#0a0e1a] border ${gc.ring} rounded-2xl p-5 overflow-hidden group hover:brightness-110 transition-all`}>
                      <div className={`absolute -top-6 -right-6 w-20 h-20 rounded-full ${gc.bg} blur-xl pointer-events-none`} />
                      <div className="flex items-start justify-between mb-4 relative">
                        <div className={`w-12 h-12 rounded-2xl ${gc.bg} border ${gc.ring} flex items-center justify-center ${gc.text}`}>
                          {badge.icon === "ShieldCheck" ? <ShieldCheck className="w-6 h-6" /> :
                           badge.icon === "Star"        ? <Star className="w-6 h-6 fill-current" /> :
                           badge.icon === "Building"    ? <Building2 className="w-6 h-6" /> :
                           <Award className="w-6 h-6" />}
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className={`text-[9px] font-black uppercase tracking-widest ${gc.text}`}>{gc.label} Tier</span>
                          <div className="flex gap-1">{[1,2,3].map(n => <span key={n} className={`w-2 h-2 rounded-full ${n <= gradeNum ? gc.dot : "bg-white/10"}`} />)}</div>
                        </div>
                      </div>
                      <h4 className="text-base font-black text-white mb-1 relative">{badge.name}</h4>
                      <p className="text-xs text-white/45 leading-relaxed relative">{badge.description}</p>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>

            {/* Accreditations */}
            <ScrollReveal>
              <SectionHeader icon={<ShieldCheck className="w-5 h-5" />} title="Government Accreditations" />
              <div className="flex flex-wrap gap-4">
                {firm.accreditations.map(acc => (
                  <div key={acc.id} className="relative group">
                    <div className="bg-white rounded-2xl py-3.5 px-7 h-16 flex items-center justify-center min-w-[130px] border border-white/10 hover:shadow-lg transition-all cursor-default shadow-sm">
                      <Image src={acc.logo} alt={acc.name} width={110} height={44} className="object-contain" />
                    </div>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-[#0a0e1a] border border-white/15 text-white text-xs py-2 px-3 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap shadow-2xl z-20 font-medium">
                      {acc.tooltip}<div className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-[#0a0e1a]" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Map link */}
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(firm.address)}`}
                target="_blank" rel="noopener noreferrer"
                className="mt-6 flex items-center gap-3 p-4 bg-[#0a0e1a] border border-white/8 rounded-2xl hover:border-[#c8881f]/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#c8881f]/10 border border-[#c8881f]/20 flex items-center justify-center text-[#c8881f] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] uppercase tracking-wider text-white/35 mb-0.5">Showroom Address</p>
                  <p className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">{firm.address}</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-[#c8881f] transition-colors shrink-0" />
              </a>
            </ScrollReveal>

            {/* Featured Projects with Before/After */}
            {firmProjects.length > 0 && (
              <ScrollReveal>
                <div className="flex items-end justify-between mb-6">
                  <SectionHeader icon={<ExternalLink className="w-5 h-5" />} title="Featured Projects" className="mb-0" />
                  <Link href={`/firms/${firm.slug}/gallery`} className="text-xs font-bold text-[#c8881f] hover:text-white transition-colors flex items-center gap-1 shrink-0">
                    Full Gallery ({firmProjects.length}) <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="space-y-8">
                  {firmProjects.map((project, idx) => (
                    <div key={project.id} className="bg-[#0a0e1a] border border-white/8 rounded-2xl overflow-hidden hover:border-white/14 transition-all">
                      {/* Before/After slider if beforePhotoUrl exists */}
                      {project.beforePhotoUrl ? (
                        <BeforeAfterSlider
                          beforeUrl={project.beforePhotoUrl}
                          afterUrl={project.photos[0].url}
                        />
                      ) : (
                        <div className="relative aspect-[16/9]">
                          <Image src={project.photos[0].url} alt={project.title} fill className="object-cover" />
                        </div>
                      )}

                      {/* Project details */}
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div>
                            <h4 className="text-base font-bold text-white mb-1">{project.title}</h4>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-[10px] font-black uppercase tracking-wider text-[#c8881f]">{project.propertyType}</span>
                              <span className="w-1 h-1 rounded-full bg-white/20" />
                              <span className="text-[10px] font-semibold text-white/40">{project.style}</span>
                              {project.completionDate && (
                                <>
                                  <span className="w-1 h-1 rounded-full bg-white/20" />
                                  <span className="flex items-center gap-1 text-[10px] text-white/40"><Calendar className="w-2.5 h-2.5" />{project.completionDate}</span>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-lg font-black text-emerald-400">S${project.budget / 1000}K</p>
                            <p className="text-[10px] text-white/35">{project.sqft} sqft · {project.bedrooms} bed</p>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {project.tags.map((tag: string) => (
                            <span key={tag} className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/5 border border-white/8 text-[10px] text-white/50 font-medium">
                              <Tag className="w-2.5 h-2.5" />{tag}
                            </span>
                          ))}
                        </div>

                        {/* Completion time */}
                        {project.completionDays && (
                          <div className="flex items-center gap-2 text-xs text-white/40">
                            <Clock className="w-3 h-3" />
                            Completed in {project.completionDays} days
                            {project.designer && <><span className="mx-1">·</span>Designer: <span className="text-white/60 font-medium">{project.designer}</span></>}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            )}

            {/* Reviews (client component for sort/filter) */}
            <ScrollReveal>
              <ReviewsSection reviews={firm.reviews} rating={firm.rating} reviewCount={firm.reviewCount} ratingBreakdown={ratingBreakdown} />
            </ScrollReveal>

          </div>

          {/* ── Sidebar ── */}
          <div className="lg:block">
            <div className="lg:sticky lg:top-24 space-y-4">
              <FirmEnquirySidebar firm={firm} />
              <div className="bg-gradient-to-br from-[#0f1625] to-[#0a0e1a] border border-white/8 rounded-2xl p-5 text-center">
                <p className="text-xs font-bold uppercase tracking-wider text-white/30 mb-2">Compare Options</p>
                <p className="text-sm text-white/70 mb-4 leading-relaxed">Get matched with 6 top firms based on your exact requirements — free.</p>
                <Link href="/find-my-id" className="block w-full py-2.5 text-center text-sm font-bold text-[#c8881f] border border-[#c8881f]/30 rounded-xl hover:bg-[#c8881f]/10 transition-colors">Start Free Match →</Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Mobile sticky bar ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0a0e1a]/95 backdrop-blur-md border-t border-white/10 px-4 py-3 flex gap-3">
        <Link href={`/firms/${firm.slug}/gallery`} className="flex-1 py-3 text-center rounded-xl bg-white/8 text-white font-semibold text-sm border border-white/10 transition-colors">Gallery</Link>
        <Link href={`/firms/${firm.slug}?enquire=true`} className="flex-1 py-3 text-center rounded-xl bg-[#c8881f] text-white font-bold text-sm shadow-lg shadow-[#c8881f]/20 transition-colors">Enquire Free</Link>
      </div>

    </div>
  );
}

function SectionHeader({ icon, title, className = "" }: { icon: React.ReactNode; title: string; className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 mb-5 ${className}`}>
      <span className="text-[#c8881f]">{icon}</span>
      <h2 className="text-xl font-black text-white">{title}</h2>
    </div>
  );
}
