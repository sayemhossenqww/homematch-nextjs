import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Star, ShieldCheck, Award, Leaf, Building2, ChevronRight, Home,
  Globe, Instagram, Phone, Mail, ExternalLink, ArrowUpRight,
  Package, Tag, MapPin, Calendar, MessageSquare, Zap,
} from "lucide-react";
import { getVendorBySlug, mockVendors } from "@/data/vendors";
import { getFirmBySlug, mockFirms } from "@/data/firms";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const vendor = getVendorBySlug(slug);
  if (!vendor) return { title: "Vendor Not Found" };

  const subcat      = vendor.subcategory ?? "";
  const subcatPart  = subcat ? ` — ${subcat}` : "";
  const priceLabel  = vendor.priceRange === "Luxury" ? "Luxury" : vendor.priceRange === "Premium" ? "Premium" : "Mid-Range";
  const productNames = (vendor.products ?? []).slice(0, 3).map((p: { name: string }) => p.name);

  const title = `${vendor.name}${subcatPart} — ${priceLabel} ${vendor.category} Brand Singapore | HomeMatch`;
  const description = [
    `${vendor.name} is a verified ${priceLabel.toLowerCase()} ${vendor.category.toLowerCase()} brand in Singapore`,
    subcat ? `specialising in ${subcat.toLowerCase()}.` : ".",
    `${vendor.reviewCount}+ homeowner reviews · ${vendor.rating}★.`,
    productNames.length ? `Popular products: ${productNames.join(", ")}.` : "",
    `Browse the full catalogue and compare with other Singapore ${vendor.category.toLowerCase()} brands.`,
  ].filter(Boolean).join(" ");

  const keywords = [
    // Brand name variants
    vendor.name,
    `${vendor.name} Singapore`,
    `${vendor.name} review`,
    `${vendor.name} price Singapore`,
    `${vendor.name} showroom Singapore`,
    `${vendor.name} ${vendor.category.toLowerCase()} Singapore`,
    // Category + subcat
    `${vendor.category.toLowerCase()} brand Singapore`,
    `best ${vendor.category.toLowerCase()} brand Singapore`,
    `top ${vendor.category.toLowerCase()} Singapore`,
    ...(subcat ? [
      `${subcat.toLowerCase()} Singapore`,
      `best ${subcat.toLowerCase()} Singapore`,
      `${subcat.toLowerCase()} brand Singapore`,
      `${subcat.toLowerCase()} supplier Singapore`,
      `${subcat.toLowerCase()} renovation Singapore`,
    ] : []),
    // Price positioning
    `${priceLabel.toLowerCase()} ${vendor.category.toLowerCase()} Singapore`,
    // Tag keywords
    ...vendor.tags.map((t: string) => `${t.toLowerCase()} Singapore`),
    ...vendor.tags.map((t: string) => `${t.toLowerCase()} brand Singapore`),
    ...vendor.tags.map((t: string) => `buy ${t.toLowerCase()} Singapore`),
    // Product-level
    ...productNames.map((n: string) => `${n} Singapore`),
    // Renovation context
    `renovation ${vendor.category.toLowerCase()} Singapore`,
    `HDB renovation ${vendor.category.toLowerCase()} Singapore`,
    `condo renovation ${vendor.category.toLowerCase()} Singapore`,
    `interior design ${vendor.category.toLowerCase()} Singapore`,
    `home renovation products Singapore`,
    `${vendor.category.toLowerCase()} supplier Singapore`,
  ].filter(Boolean);

  const bannerImg = "https://www.homematch.sg/og-default.jpg";

  return {
    title,
    description,
    alternates: { canonical: `https://www.homematch.sg/vendors/${vendor.slug}` },
    keywords,
    openGraph: {
      title: `${vendor.name} — ${priceLabel} ${vendor.category}${subcatPart} Singapore`,
      description,
      url: `https://www.homematch.sg/vendors/${vendor.slug}`,
      siteName: "HomeMatch",
      images: [{ url: bannerImg, width: 1200, height: 630, alt: `${vendor.name} — ${vendor.category} Singapore` }],
      type: "website",
      locale: "en_SG",
    },
    twitter: {
      card: "summary_large_image",
      title: `${vendor.name} — ${priceLabel} ${vendor.category} Singapore | HomeMatch`,
      description,
      images: [bannerImg],
    },
  };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return mockVendors.map(v => ({ slug: v.slug }));
}

/* ── Badge icon helper ── */
function BadgeIcon({ name, className }: { name: string; className?: string }) {
  if (name === "ShieldCheck") return <ShieldCheck className={className} />;
  if (name === "Star")        return <Star className={`${className} fill-current`} />;
  if (name === "Building")    return <Building2 className={className} />;
  if (name === "Leaf")        return <Leaf className={className} />;
  if (name === "Zap")         return <Zap className={className} />;
  return <Award className={className} />;
}

/* ── Section header ── */
function SectionHeader({ icon, title, className = "" }: { icon: React.ReactNode; title: string; className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 mb-5 ${className}`}>
      <span className="text-[#c8881f]">{icon}</span>
      <h2 className="text-xl font-black text-white">{title}</h2>
    </div>
  );
}

/* ── Star row ── */
function StarRow({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const iconClass = size === "md" ? "w-4 h-4" : "w-3 h-3";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(n => (
        <Star
          key={n}
          className={`${iconClass} ${n <= Math.round(rating) ? "text-[#c8881f] fill-current" : "text-white/20"}`}
        />
      ))}
    </div>
  );
}

export default async function VendorProfilePage({ params }: Props) {
  const { slug } = await params;
  const vendor = getVendorBySlug(slug);
  if (!vendor) notFound();

  const yearsActive = new Date().getFullYear() - vendor.established;

  /* ── Rating breakdown ── */
  const ratingBreakdown = [5, 4, 3, 2, 1].map(star => {
    const count = vendor.reviews.filter(r => Math.round(r.rating) === star).length;
    const pct = vendor.reviews.length > 0 ? Math.round((count / vendor.reviews.length) * 100) : 0;
    return { star, count, pct };
  });

  /* ── Partner firms ── */
  const partnerFirms = (vendor.partnerFirms ?? [])
    .map(s => getFirmBySlug(s))
    .filter(Boolean);

  /* ── JSON-LD schemas ── */
  const brandJsonLd = {
    "@context": "https://schema.org",
    "@type": "Brand",
    "name": vendor.name,
    "description": vendor.bio,
    "url": `https://www.homematch.sg/vendors/${vendor.slug}`,
    "logo": vendor.logo,
    "aggregateRating": vendor.reviewCount > 0 ? {
      "@type": "AggregateRating",
      "ratingValue": vendor.rating,
      "reviewCount": vendor.reviewCount,
      "bestRating": 5,
      "worstRating": 1,
    } : undefined,
    "review": vendor.reviews.slice(0, 3).map(r => ({
      "@type": "Review",
      "reviewRating": { "@type": "Rating", "ratingValue": r.rating, "bestRating": 5 },
      "author": { "@type": "Person", "name": r.reviewerName },
      "reviewBody": r.body,
      "datePublished": r.date,
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home",    "item": "https://www.homematch.sg/" },
      { "@type": "ListItem", "position": 2, "name": "Brands",  "item": "https://www.homematch.sg/vendors" },
      { "@type": "ListItem", "position": 3, "name": vendor.name, "item": `https://www.homematch.sg/vendors/${vendor.slug}` },
    ],
  };

  return (
    <div className="min-h-screen bg-[#05080f]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(brandJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* ── Banner ── */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <Image
          src={vendor.banner}
          alt={`${vendor.name} banner`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05080f] via-[#05080f]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#05080f]/50 via-transparent to-transparent" />

        {/* Breadcrumb — top of banner, never overlaps logo */}
        <div className="absolute top-0 left-0 right-0 pt-24 max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-1.5 text-xs font-medium text-white/50">
            <Link href="/" className="hover:text-white/80 transition-colors flex items-center gap-1">
              <Home className="w-3 h-3" /> Home
            </Link>
            <ChevronRight className="w-3 h-3 text-white/25" />
            <Link href="/vendors" className="hover:text-white/80 transition-colors">Vendors</Link>
            <ChevronRight className="w-3 h-3 text-white/25" />
            <span className="text-white/70">{vendor.name}</span>
          </nav>
        </div>
      </div>

      {/* ── Vendor header card ── */}
      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-10 mb-0">
        <div className="flex flex-col md:flex-row md:items-end gap-5 md:gap-8">

          {/* Logo */}
          <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#05080f] bg-white shadow-xl shrink-0 ring-1 ring-white/10">
            <Image
              src={vendor.logo}
              alt={vendor.name}
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Name + badges */}
          <div className="flex-1 pb-1">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 bg-[#c8881f]/10 border border-[#c8881f]/25 text-[#c8881f] text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg">
                {vendor.category}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-white/60 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg">
                {vendor.priceRange}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-white/50 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg">
                <Calendar className="w-3 h-3" /> Est. {vendor.established}
              </span>
            </div>

            <h1 className="text-3xl font-black text-white mb-2 leading-tight">{vendor.name}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-white/50">
              <span className="flex items-center gap-1.5">
                <StarRow rating={vendor.rating} />
                <span className="text-white font-bold ml-1">{vendor.rating.toFixed(1)}</span>
                <span className="text-white/40">({vendor.reviewCount} reviews)</span>
              </span>
              {vendor.address && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#c8881f]" />
                  {vendor.address}
                </span>
              )}
            </div>
          </div>

          {/* CTA buttons */}
          <div className="hidden md:flex items-center gap-3 pb-1 shrink-0">
            {vendor.website && (
              <a
                href={vendor.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#c8881f] hover:bg-[#d4951f] text-white font-bold rounded-xl text-sm shadow-lg shadow-[#c8881f]/25 transition-all hover:-translate-y-0.5"
              >
                <Globe className="w-4 h-4" /> Visit Website
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ── Contact row ── */}
      <ScrollReveal>
        <div className="max-w-7xl mx-auto px-4 mt-8">
          <div className="flex flex-wrap gap-3">
            {vendor.phone && (
              <a
                href={`tel:${vendor.phone}`}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/8 text-white/60 hover:text-white hover:border-white/20 text-sm font-medium transition-all"
              >
                <Phone className="w-4 h-4 text-[#c8881f]" /> {vendor.phone}
              </a>
            )}
            {vendor.website && (
              <a
                href={vendor.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/8 text-white/60 hover:text-white hover:border-white/20 text-sm font-medium transition-all"
              >
                <Globe className="w-4 h-4 text-[#c8881f]" /> Website <ArrowUpRight className="w-3 h-3" />
              </a>
            )}
            {vendor.instagram && (
              <a
                href={`https://instagram.com/${vendor.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/8 text-white/60 hover:text-white hover:border-white/20 text-sm font-medium transition-all"
              >
                <Instagram className="w-4 h-4 text-pink-400" /> @{vendor.instagram}
              </a>
            )}
            {vendor.email && (
              <a
                href={`mailto:${vendor.email}`}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/8 text-white/60 hover:text-white hover:border-white/20 text-sm font-medium transition-all"
              >
                <Mail className="w-4 h-4 text-[#c8881f]" /> {vendor.email}
              </a>
            )}
          </div>
        </div>
      </ScrollReveal>

      {/* ── Quick stats ── */}
      <ScrollReveal>
        <div className="max-w-7xl mx-auto px-4 mt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: <Star className="w-5 h-5" />,     label: "Rating",      value: vendor.rating.toFixed(1) },
              { icon: <MessageSquare className="w-5 h-5" />, label: "Reviews", value: `${vendor.reviewCount}` },
              { icon: <Calendar className="w-5 h-5" />, label: "Est. Year",    value: `${vendor.established}` },
              { icon: <Tag className="w-5 h-5" />,      label: "Price Range",  value: vendor.priceRange },
            ].map(({ icon, label, value }) => (
              <div
                key={label}
                className="bg-[#0a0e1a] border border-white/8 rounded-2xl px-4 py-5 flex flex-col items-center justify-center text-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#c8881f]/10 border border-[#c8881f]/20 flex items-center justify-center text-[#c8881f]">
                  {icon}
                </div>
                <div>
                  <p className="text-xl font-black text-white leading-none mb-1">{value}</p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/35">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* ── Main content ── */}
      <div className="max-w-7xl mx-auto px-4 mt-12 pb-28 space-y-16">

        {/* ── About ── */}
        <ScrollReveal>
          <SectionHeader icon={<Home className="w-5 h-5" />} title={`About ${vendor.name}`} />
          <p className="text-white/65 leading-[1.85] text-[15px] mb-5">{vendor.bio}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {vendor.tags.map(tag => (
              <span
                key={tag}
                className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white/60 hover:border-[#c8881f]/40 hover:text-[#c8881f] hover:bg-[#c8881f]/5 transition-all cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Showrooms */}
          {vendor.showrooms && vendor.showrooms.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="bg-white/4 border border-white/8 rounded-xl px-4 py-3 flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#c8881f] shrink-0" />
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-white/35">Showrooms</p>
                  <p className="text-sm font-bold text-white">
                    {vendor.showrooms.slice(0, 3).join(", ")}
                    {vendor.showrooms.length > 3 ? ` +${vendor.showrooms.length - 3} more` : ""}
                  </p>
                </div>
              </div>
              <div className="bg-white/4 border border-white/8 rounded-xl px-4 py-3 flex items-center gap-3">
                <Calendar className="w-4 h-4 text-[#c8881f] shrink-0" />
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-white/35">In Business</p>
                  <p className="text-sm font-bold text-white">{yearsActive}+ Years</p>
                </div>
              </div>
            </div>
          )}
        </ScrollReveal>

        {/* ── HomeMatch Vendor Badges ── */}
        <ScrollReveal>
          <SectionHeader icon={<Award className="w-5 h-5" />} title="HomeMatch Vendor Badges" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {vendor.badges.map(badge => {
              const gradeNum = badge.grade === "III" ? 3 : badge.grade === "II" ? 2 : 1;
              const gc = {
                3: { ring: "border-[#c8881f]/50", bg: "bg-[#c8881f]/10", text: "text-[#c8881f]", dot: "bg-[#c8881f]",  label: "Gold"    },
                2: { ring: "border-sky-400/40",   bg: "bg-sky-400/8",    text: "text-sky-400",   dot: "bg-sky-400",    label: "Silver"  },
                1: { ring: "border-emerald-400/35",bg: "bg-emerald-400/8",text: "text-emerald-400",dot:"bg-emerald-400",label: "Bronze" },
              }[gradeNum];
              return (
                <div
                  key={badge.id}
                  className={`relative bg-[#0a0e1a] border ${gc.ring} rounded-2xl p-5 overflow-hidden group hover:brightness-110 transition-all`}
                >
                  <div className={`absolute -top-6 -right-6 w-20 h-20 rounded-full ${gc.bg} blur-xl pointer-events-none`} />
                  <div className="flex items-start justify-between mb-4 relative">
                    <div className={`w-12 h-12 rounded-2xl ${gc.bg} border ${gc.ring} flex items-center justify-center ${gc.text}`}>
                      <BadgeIcon name={badge.icon} className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`text-[9px] font-black uppercase tracking-widest ${gc.text}`}>{gc.label} Tier</span>
                      <div className="flex gap-1">
                        {[1, 2, 3].map(n => (
                          <span key={n} className={`w-2 h-2 rounded-full ${n <= gradeNum ? gc.dot : "bg-white/10"}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <h4 className="text-base font-black text-white mb-1 relative">{badge.name}</h4>
                  <p className="text-xs text-white/45 leading-relaxed relative">{badge.description}</p>
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        {/* ── Products ── */}
        {vendor.products && vendor.products.length > 0 && (
          <ScrollReveal>
            <SectionHeader icon={<Package className="w-5 h-5" />} title={`${vendor.name} Products`} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {vendor.products.map((product, idx) => (
                <div
                  key={idx}
                  className="bg-[#0a0e1a] border border-white/8 rounded-2xl p-5 hover:border-[#c8881f]/25 transition-all group"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h4 className="text-sm font-black text-white group-hover:text-[#c8881f] transition-colors leading-tight">
                      {product.name}
                    </h4>
                    {product.priceFrom !== undefined && (
                      <span className="shrink-0 text-[10px] font-black text-[#c8881f] bg-[#c8881f]/10 border border-[#c8881f]/25 px-2.5 py-1 rounded-lg whitespace-nowrap">
                        From S${product.priceFrom.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed">{product.description}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        )}

        {/* ── Reviews ── */}
        <ScrollReveal>
          <SectionHeader icon={<Star className="w-5 h-5" />} title={`Customer Reviews`} />

          {vendor.reviews.length > 0 ? (
            <div className="space-y-6">
              {/* Overall + breakdown */}
              <div className="bg-[#0a0e1a] border border-white/8 rounded-2xl p-6">
                <div className="flex flex-col sm:flex-row gap-8 items-start">

                  {/* Overall score */}
                  <div className="text-center shrink-0">
                    <p className="text-5xl font-black text-white mb-1">{vendor.rating.toFixed(1)}</p>
                    <StarRow rating={vendor.rating} size="md" />
                    <p className="text-xs text-white/40 mt-2">{vendor.reviewCount} reviews</p>
                  </div>

                  {/* Bar breakdown */}
                  <div className="flex-1 space-y-2.5 w-full">
                    {ratingBreakdown.map(({ star, pct }) => (
                      <div key={star} className="flex items-center gap-3">
                        <span className="text-xs text-white/50 w-4 text-right shrink-0">{star}</span>
                        <Star className="w-3 h-3 text-[#c8881f] fill-current shrink-0" />
                        <div className="flex-1 h-2 bg-white/6 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#c8881f] rounded-full"
                            style={{ width: `${pct}%`, transition: "width 0.8s ease" }}
                          />
                        </div>
                        <span className="text-[10px] text-white/35 w-8 shrink-0">{pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Review cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {vendor.reviews.map(review => (
                  <div key={review.id} className="bg-[#0a0e1a] border border-white/8 rounded-2xl p-5">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        {/* Avatar initial */}
                        <div className="w-9 h-9 rounded-full bg-[#c8881f]/15 border border-[#c8881f]/25 flex items-center justify-center text-[#c8881f] font-black text-sm shrink-0">
                          {review.reviewerName.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white leading-tight">{review.reviewerName}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            {review.isVerified && (
                              <span className="flex items-center gap-0.5 text-[9px] font-black uppercase tracking-wider text-emerald-400">
                                <ShieldCheck className="w-2.5 h-2.5" /> Verified
                              </span>
                            )}
                            {review.projectType && (
                              <span className="text-[9px] text-white/30">{review.projectType}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <StarRow rating={review.rating} />
                        <p className="text-[10px] text-white/30 mt-1">{review.date}</p>
                      </div>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed italic">&ldquo;{review.body}&rdquo;</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-white/40 text-sm">No reviews yet.</p>
          )}
        </ScrollReveal>

        {/* ── Partner Firms ── */}
        {partnerFirms.length > 0 && (
          <ScrollReveal>
            <SectionHeader
              icon={<Building2 className="w-5 h-5" />}
              title={`Interior Designers Who Use ${vendor.name}`}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {partnerFirms.map(firm => {
                if (!firm) return null;
                return (
                  <Link
                    key={firm.slug}
                    href={`/firms/${firm.slug}`}
                    className="flex items-center gap-4 bg-[#0a0e1a] border border-white/8 rounded-2xl p-4 hover:border-[#c8881f]/30 transition-all group"
                  >
                    {/* Logo */}
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 bg-white shrink-0">
                      <Image
                        src={firm.logo}
                        alt={firm.name}
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-white group-hover:text-[#c8881f] transition-colors truncate">
                        {firm.name}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-white/40 flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {firm.district}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="flex items-center gap-0.5 text-xs text-white/40">
                          <Star className="w-3 h-3 text-[#c8881f] fill-current" /> {firm.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-[#c8881f] transition-colors shrink-0" />
                  </Link>
                );
              })}
            </div>
          </ScrollReveal>
        )}

        {/* ── CTA banner ── */}
        <ScrollReveal>
          <div className="relative bg-gradient-to-br from-[#0f1625] to-[#0a0e1a] border border-[#c8881f]/20 rounded-2xl p-8 overflow-hidden text-center">
            {/* Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#c8881f]/8 rounded-full blur-3xl pointer-events-none" />

            <div className="relative">
              <h3 className="text-2xl font-black text-white mb-2">
                Interested in {vendor.name} for your renovation?
              </h3>
              <p className="text-sm text-white/50 mb-8 max-w-lg mx-auto leading-relaxed">
                Visit their showroom, browse online, or ask your interior designer to specify {vendor.name} in your project.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                {vendor.website && (
                  <a
                    href={vendor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#c8881f] hover:bg-[#d4951f] text-white font-bold rounded-xl text-sm shadow-lg shadow-[#c8881f]/25 transition-all hover:-translate-y-0.5"
                  >
                    <Globe className="w-4 h-4" /> Visit Website
                  </a>
                )}
                {vendor.phone && (
                  <a
                    href={`https://wa.me/${vendor.phone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-bold rounded-xl text-sm border border-emerald-500/25 transition-all hover:-translate-y-0.5"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.555 4.122 1.527 5.856L0 24l6.335-1.502C8.04 23.445 9.984 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.944 0-3.753-.527-5.299-1.442l-.379-.225-3.93.931.978-3.852-.247-.396A9.807 9.807 0 012.182 12C2.182 6.59 6.59 2.182 12 2.182c5.411 0 9.818 4.408 9.818 9.818 0 5.411-4.407 9.818-9.818 9.818z" />
                    </svg>
                    WhatsApp
                  </a>
                )}
                {vendor.email && (
                  <a
                    href={`mailto:${vendor.email}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-bold rounded-xl text-sm border border-white/10 hover:border-white/20 transition-all hover:-translate-y-0.5"
                  >
                    <Mail className="w-4 h-4" /> Enquire by Email
                  </a>
                )}
              </div>

              {/* Find a designer CTA */}
              <div className="mt-8 pt-6 border-t border-white/6">
                <p className="text-xs text-white/40 mb-3">
                  Want an interior designer who works with {vendor.name}?
                </p>
                <Link
                  href="/find-my-id"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#c8881f] hover:text-white transition-colors"
                >
                  Find matched designers <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>

      {/* ── Mobile sticky bar ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0a0e1a]/95 backdrop-blur-md border-t border-white/10 px-4 py-3 flex gap-3">
        <Link
          href="/vendors"
          className="flex-1 py-3 text-center rounded-xl bg-white/8 text-white font-semibold text-sm border border-white/10 transition-colors"
        >
          ← All Brands
        </Link>
        {vendor.website && (
          <a
            href={vendor.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 text-center rounded-xl bg-[#c8881f] text-white font-bold text-sm shadow-lg shadow-[#c8881f]/20 transition-colors"
          >
            Visit Website
          </a>
        )}
      </div>

    </div>
  );
}
