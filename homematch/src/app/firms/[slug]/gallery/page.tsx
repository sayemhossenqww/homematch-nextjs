import { Metadata } from "next";
import { getFirmBySlug, getProjectsByFirm, mockFirms } from "@/data/firms";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Home, Images, MapPin, Star, Clock, Wallet, Palette, LayoutGrid } from "lucide-react";
import FirmGalleryGrid from "@/components/firms/FirmGalleryGrid";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const firm = getFirmBySlug(slug);
  if (!firm) return { title: "Gallery Not Found" };

  const styleList  = firm.styles.slice(0, 3).join(", ");
  const caseTrust  = firm.isCaseTrust ? "CaseTrust-certified " : "";
  const description = `Browse ${firm.name}'s full renovation portfolio — ${styleList} designs for HDB, condo, and landed homes in ${firm.district ?? "Singapore"}. ${firm.reviewCount} verified reviews · ${firm.rating}★. ${caseTrust}interior design firm.`;

  return {
    title: `${firm.name} Portfolio — ${styleList} Interior Design Projects Singapore | HomeMatch`,
    description,
    alternates: { canonical: `https://www.homematch.sg/firms/${firm.slug}/gallery` },
    keywords: [
      `${firm.name} portfolio`,
      `${firm.name} projects Singapore`,
      `${firm.name} interior design gallery`,
      `interior design portfolio ${firm.district ?? "Singapore"}`,
      ...firm.styles.map(s => `${s.toLowerCase()} renovation Singapore`),
      `HDB renovation portfolio Singapore`,
      `condo renovation gallery Singapore`,
      `${caseTrust}interior designer portfolio Singapore`,
    ],
    openGraph: {
      title: `${firm.name} — Full Interior Design Portfolio Singapore`,
      description,
      url: `https://www.homematch.sg/firms/${firm.slug}/gallery`,
      siteName: "HomeMatch",
      images: [{ url: firm.banner, width: 1200, height: 630, alt: `${firm.name} Interior Design Portfolio` }],
      type: "website",
      locale: "en_SG",
    },
    twitter: {
      card: "summary_large_image",
      title: `${firm.name} — Full Interior Design Portfolio Singapore`,
      description,
      images: [firm.banner],
    },
  };
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return mockFirms.map(firm => ({ slug: firm.slug }));
}

export default async function FirmGalleryPage({ params }: Props) {
  const { slug } = await params;
  const firm = getFirmBySlug(slug);
  if (!firm) notFound();

  const firmProjects = getProjectsByFirm(firm.slug);
  const totalPhotos = firmProjects.reduce((sum, p) => sum + p.photos.length, 0);

  // ── Derived stats ──
  const avgBudget = firmProjects.length
    ? Math.round(firmProjects.reduce((s, p) => s + p.budget, 0) / firmProjects.length / 1000)
    : 0;
  const avgDays = firmProjects.filter(p => p.completionDays).length
    ? Math.round(
        firmProjects.filter(p => p.completionDays).reduce((s, p) => s + (p.completionDays ?? 0), 0) /
        firmProjects.filter(p => p.completionDays).length
      )
    : null;
  const styleCount: Record<string, number> = {};
  firmProjects.forEach(p => { styleCount[p.style] = (styleCount[p.style] ?? 0) + 1; });
  const topStyle = Object.entries(styleCount).sort((a, b) => b[1] - a[1])[0]?.[0] ?? firm.styles[0];

  return (
    <div className="min-h-screen bg-[#05080f] pt-20 pb-28">

      {/* ── Full-width banner strip ── */}
      <div className="relative h-56 md:h-72 w-full overflow-hidden">
        {firmProjects[0] && (
          <Image
            src={firmProjects[0].photos[0]?.url || firm.banner}
            alt={`${firm.name} gallery`}
            fill
            className="object-cover"
            priority
          />
        )}
        {!firmProjects[0] && (
          <Image src={firm.banner} alt={`${firm.name} gallery`} fill className="object-cover" priority />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#05080f] via-[#05080f]/60 to-[#05080f]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#05080f]/70 via-transparent to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-10">

        {/* ── Header ── */}
        <div className="mb-10">

          {/* ── Breadcrumb ── */}
          <nav className="flex items-center gap-1.5 text-[11px] text-white/35 mb-5 flex-wrap">
            <Link href="/" className="flex items-center gap-1 hover:text-white/70 transition-colors">
              <Home className="w-3 h-3" /> Home
            </Link>
            <ChevronRight className="w-3 h-3 text-white/20" />
            <Link href="/firms" className="hover:text-white/70 transition-colors">Firms</Link>
            <ChevronRight className="w-3 h-3 text-white/20" />
            <Link href={`/firms/${firm.slug}`} className="hover:text-white/70 transition-colors">{firm.name}</Link>
            <ChevronRight className="w-3 h-3 text-white/20" />
            <span className="text-white/60 font-semibold">Gallery</span>
          </nav>

          {/* Firm identity row */}
          <div className="flex items-start gap-5 mb-6">
            <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-[#05080f] bg-white shadow-xl ring-1 ring-white/10 shrink-0">
              <Image src={firm.logo} alt={firm.name} width={56} height={56} className="object-cover w-full h-full" />
            </div>
            <div>
              <p className="text-[#c8881f] text-xs font-black uppercase tracking-[0.14em] mb-1">{firm.name}</p>
              <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-2">
                Project Gallery
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-xs text-white/40">
                <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" />{firm.district}</span>
                <span className="w-1 h-1 rounded-full bg-white/15" />
                <span className="flex items-center gap-1.5"><Star className="w-3 h-3 text-[#c8881f] fill-current" />{firm.rating.toFixed(1)} ({firm.reviewCount} reviews)</span>
                <span className="w-1 h-1 rounded-full bg-white/15" />
                <span className="flex items-center gap-1.5"><Images className="w-3 h-3" />{totalPhotos} photos · {firmProjects.length} projects</span>
              </div>
            </div>
          </div>

          {/* ── Portfolio Stats Row ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              {
                icon: <LayoutGrid className="w-4 h-4" />,
                label: "Projects in gallery",
                value: `${firmProjects.length} projects`,
                sub: `${totalPhotos} photos total`,
              },
              {
                icon: <Wallet className="w-4 h-4" />,
                label: "Avg project budget",
                value: `S$${avgBudget}K`,
                sub: "across all types",
              },
              {
                icon: <Palette className="w-4 h-4" />,
                label: "Primary style",
                value: topStyle,
                sub: `${styleCount[topStyle] ?? 1} of ${firmProjects.length} projects`,
              },
              {
                icon: <Clock className="w-4 h-4" />,
                label: "Avg completion",
                value: avgDays ? `${avgDays} days` : firm.responseTime,
                sub: avgDays ? "from start to handover" : "response time",
              },
            ].map(({ icon, label, value, sub }) => (
              <div key={label} className="bg-[#0a0e1a] border border-white/8 rounded-2xl p-4 flex flex-col items-center text-center">
                <span className="text-[#c8881f] mb-2">{icon}</span>
                <p className="text-[10px] font-black uppercase tracking-[0.12em] text-white/35 mb-1">{label}</p>
                <p className="text-base font-black text-white leading-tight">{value}</p>
                <p className="text-[10px] text-white/35 mt-0.5">{sub}</p>
              </div>
            ))}
          </div>

          <p className="text-sm text-white/50 max-w-2xl leading-relaxed">
            Click any photo to explore full project specs, budgets, and room breakdowns — or enquire to achieve the same look for your home.
          </p>
        </div>

        {/* ── Gallery Grid ── */}
        <FirmGalleryGrid firmName={firm.name} projects={firmProjects} />

      </div>
    </div>
  );
}
