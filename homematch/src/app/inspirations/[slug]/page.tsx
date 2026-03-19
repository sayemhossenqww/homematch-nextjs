import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Home, ChevronRight, Ruler, CircleDollarSign,
  Palette, Calendar, Clock, ArrowRight, MapPin, Star,
} from "lucide-react";
import { getAllInspirations, getInspirationBySlug, getRelatedInspirations } from "@/data/inspirations";
import { getFirmBySlug } from "@/data/firms";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";
import ProjectPhotoGallery from "./ProjectPhotoGallery";
import SaveProjectButton from "./SaveProjectButton";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllInspirations().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getInspirationBySlug(slug);
  if (!project) return {};

  const firm      = getFirmBySlug(project.firmSlug);
  const budgetK   = `S$${(project.budget / 1000).toFixed(0)}K`;
  const budgetBand =
    project.budget < 50000  ? "under S$50K" :
    project.budget < 80000  ? "S$50K–S$80K" :
    project.budget < 120000 ? "S$80K–S$120K" : "above S$120K";
  const completed = project.completionDate ?? "";
  const roomList  = project.rooms.slice(0, 3).join(", ");
  const bedroomStr = project.bedrooms > 0 ? `${project.bedrooms}-bedroom ` : "";
  const daysStr   = project.completionDays ? `completed in ${project.completionDays} days` : completed ? `completed ${completed}` : "";
  const image     = project.photos[0]?.url ?? "https://www.homematch.sg/og-default.jpg";

  const title = `${project.title} — ${project.style} ${bedroomStr}${project.propertyType} Renovation Singapore | HomeMatch`;
  const description = [
    `${project.style} interior design for a ${bedroomStr}${project.propertyType} in Singapore.`,
    `${project.sqft.toLocaleString()} sqft, budget ${budgetK} (${budgetBand})${daysStr ? `, ${daysStr}` : ""}.`,
    `Rooms renovated: ${roomList}.`,
    firm ? `Designed by ${firm.name}${project.designer ? ` — designer: ${project.designer}` : ""}.` : "",
    `See full photo gallery and find a similar interior designer.`,
  ].filter(Boolean).join(" ");

  const keywords = [
    // Core style + type combos
    `${project.style.toLowerCase()} ${project.propertyType.toLowerCase()} renovation Singapore`,
    `${project.style.toLowerCase()} interior design Singapore`,
    `${project.style.toLowerCase()} ${project.propertyType.toLowerCase()} interior design Singapore`,
    `${bedroomStr}${project.propertyType.toLowerCase()} renovation Singapore`.trim(),
    // Budget intent
    `${budgetBand} ${project.propertyType.toLowerCase()} renovation Singapore`,
    `${budgetK} renovation Singapore`,
    // Sqft range
    `${project.sqft} sqft renovation Singapore`,
    // Room-type keywords
    ...project.rooms.map(r => `${r.toLowerCase()} renovation Singapore`),
    ...project.rooms.map(r => `${r.toLowerCase()} ${project.style.toLowerCase()} Singapore`),
    // Tag keywords
    ...project.tags.map(t => `${t.toLowerCase()} interior design Singapore`),
    ...project.tags.map(t => `${t.toLowerCase()} renovation Singapore`),
    // Property type
    `${project.propertyType.toLowerCase()} interior design ideas Singapore`,
    `${project.propertyType.toLowerCase()} home renovation photo Singapore`,
    // Firm
    firm ? `${firm.name} portfolio` : "",
    firm ? `${firm.name} renovation project` : "",
    // Generic
    "real renovation project Singapore",
    "Singapore home renovation inspiration",
    "before after renovation Singapore",
  ].filter(Boolean) as string[];

  return {
    title,
    description,
    alternates: { canonical: `https://www.homematch.sg/inspirations/${project.slug}` },
    keywords,
    openGraph: {
      title: `${project.title} — ${project.style} ${bedroomStr}${project.propertyType} Renovation`,
      description,
      url: `https://www.homematch.sg/inspirations/${project.slug}`,
      siteName: "HomeMatch",
      images: project.photos.slice(0, 4).map((p, i) => ({
        url: p.url,
        width: 1200,
        height: 800,
        alt: p.caption ? `${project.title} — ${p.caption}` : `${project.title} photo ${i + 1}`,
      })),
      type: "website",
      locale: "en_SG",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — ${project.style} ${project.propertyType} Renovation Singapore`,
      description,
      images: [image],
    },
  };
}

function fmt(n: number) {
  return n >= 1000 ? `S$${(n / 1000).toFixed(0)}K` : `S$${n}`;
}

export default async function InspirationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getInspirationBySlug(slug);
  if (!project) notFound();

  const firm = getFirmBySlug(project.firmSlug);

  const similarProjects = getRelatedInspirations(slug, 3);

  const descriptionParts: string[] = [];
  descriptionParts.push(`This ${project.sqft.toLocaleString()} sqft ${project.propertyType}`);
  if (project.completionDays) descriptionParts[0] += ` was renovated in ${project.completionDays} days`;
  if (project.completionDate) descriptionParts[0] += ` in ${project.completionDate}`;
  descriptionParts[0] += ".";

  const tagDesc =
    project.tags.length >= 3
      ? `The ${project.style} design features ${project.tags[0]}, ${project.tags[1]}, and ${project.tags[2]}.`
      : `The ${project.style} design incorporates ${project.tags.join(", ")}.`;
  descriptionParts.push(tagDesc);

  if (firm) {
    descriptionParts.push(
      `Designed by ${firm.name}${project.designer ? ` — ${project.designer}` : ""}, this project showcases the best of ${project.style.toLowerCase()} interior design in Singapore.`
    );
  }

  const generatedDescription = descriptionParts.join(" ");

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": generatedDescription,
    "url": `https://www.homematch.sg/inspirations/${project.slug}`,
    "image": project.photos.map(p => ({
      "@type": "ImageObject",
      "url": p.url,
      "caption": p.caption ?? project.title,
    })),
    "creator": firm ? {
      "@type": "Organization",
      "name": firm.name,
      "url": `https://www.homematch.sg/firms/${firm.slug}`,
    } : undefined,
    "dateCreated": project.completionDate,
    "keywords": project.tags.join(", "),
    "genre": project.style,
    "about": {
      "@type": "Thing",
      "name": `${project.propertyType} Interior Design Singapore`,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home",         "item": "https://www.homematch.sg/" },
      { "@type": "ListItem", "position": 2, "name": "Inspirations", "item": "https://www.homematch.sg/inspirations" },
      { "@type": "ListItem", "position": 3, "name": project.title,  "item": `https://www.homematch.sg/inspirations/${project.slug}` },
    ],
  };

  return (
    <main className="min-h-screen bg-[#05080f]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* ── Hero Banner ── */}
      <div className="relative h-[62vh] min-h-[420px] w-full overflow-hidden">
        {project.photos[0]?.url && (
          <Image
            src={project.photos[0].url}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        )}
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-linear-to-t from-[#05080f] via-[#05080f]/25 to-black/40" />
        <div className="absolute inset-0 bg-linear-to-r from-[#05080f]/40 via-transparent to-transparent" />

        {/* Breadcrumb — top of hero, clears fixed navbar */}
        <div className="absolute top-0 inset-x-0 pt-24 px-4">
          <div className="max-w-6xl mx-auto">
            <nav className="flex items-center gap-1.5 text-xs font-medium text-white/50">
              <Link href="/" className="hover:text-white/80 transition-colors flex items-center gap-1">
                <Home className="w-3 h-3" /> Home
              </Link>
              <ChevronRight className="w-3 h-3 text-white/25" />
              <Link href="/inspirations" className="hover:text-white/80 transition-colors">
                Inspirations
              </Link>
              <ChevronRight className="w-3 h-3 text-white/25" />
              <span className="text-white/70 truncate max-w-[200px]">{project.title}</span>
            </nav>
          </div>
        </div>

        {/* Hero bottom — title + meta */}
        <div className="absolute bottom-0 inset-x-0 px-4 pb-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-lg bg-[#c8881f] text-white shadow-lg">
                {project.propertyType}
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-lg bg-white/15 backdrop-blur-sm text-white border border-white/20">
                {project.style}
              </span>
              {project.beforePhotoUrl && (
                <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-lg bg-sky-500/70 backdrop-blur-sm text-white border border-sky-400/30">
                  Before & After
                </span>
              )}
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-3 leading-tight drop-shadow-xl">
              {project.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-white/55 text-sm">
              {firm && <span className="font-semibold text-white/70">{firm.name}</span>}
              {project.designer && (
                <><span className="text-white/25">·</span><span>{project.designer}</span></>
              )}
              {project.completionDate && (
                <><span className="text-white/25">·</span><span>{project.completionDate}</span></>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats strip ── */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: <Home className="w-5 h-5 text-white/40" />,               label: "Property",   value: project.propertyType,                          accent: false },
            { icon: <Ruler className="w-5 h-5 text-white/40" />,              label: "Size",       value: `${project.sqft.toLocaleString()} sqft`,        accent: false },
            { icon: <CircleDollarSign className="w-5 h-5 text-emerald-400" />, label: "Budget",     value: fmt(project.budget),                            accent: true  },
            { icon: <Palette className="w-5 h-5 text-white/40" />,            label: "Style",      value: project.style,                                  accent: false },
          ].map(({ icon, label, value, accent }) => (
            <div
              key={label}
              className="bg-[#0a0e1a] border border-white/8 rounded-2xl p-4 flex flex-col items-center text-center gap-1.5"
            >
              {icon}
              <p className="text-white/40 text-[10px] uppercase tracking-widest font-semibold">{label}</p>
              <p className={`font-black text-sm ${accent ? "text-emerald-400" : "text-white"}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Completion meta */}
        {(project.completionDate || project.completionDays) && (
          <div className="flex flex-wrap gap-4 mt-4">
            {project.completionDate && (
              <div className="flex items-center gap-1.5 text-xs text-white/40">
                <Calendar className="w-3.5 h-3.5 text-[#c8881f]" />
                Completed {project.completionDate}
              </div>
            )}
            {project.completionDays && (
              <div className="flex items-center gap-1.5 text-xs text-white/40">
                <Clock className="w-3.5 h-3.5 text-[#c8881f]" />
                {project.completionDays} days renovation
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Main two-column ── */}
      <div className="max-w-6xl mx-auto px-4 pb-24">
        <div className="grid lg:grid-cols-[1fr_340px] gap-10 items-start">

          {/* ── LEFT ── */}
          <div className="space-y-10">

            {/* Before & After — always present */}
            {project.beforePhotoUrl && (
              <section>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-1 h-5 bg-[#c8881f] rounded-full" />
                  <h2 className="text-lg font-black text-white">Before &amp; After</h2>
                </div>
                <BeforeAfterSlider
                  beforeUrl={project.beforePhotoUrl}
                  afterUrl={project.photos[0]?.url ?? ""}
                />
              </section>
            )}

            {/* Photo gallery */}
            <section>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-1 h-5 bg-[#c8881f] rounded-full" />
                <h2 className="text-lg font-black text-white">Project Photos</h2>
              </div>
              <ProjectPhotoGallery photos={project.photos} />
            </section>

            {/* Room badges */}
            {project.rooms.length > 0 && (
              <section>
                <p className="text-white/35 text-[10px] uppercase tracking-widest font-bold mb-3">
                  Rooms Renovated
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.rooms.map(room => (
                    <span
                      key={room}
                      className="bg-white/5 border border-white/8 px-3 py-1.5 rounded-full text-xs text-white/60 font-medium"
                    >
                      {room}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Tags */}
            {project.tags.length > 0 && (
              <section>
                <p className="text-white/35 text-[10px] uppercase tracking-widest font-bold mb-3">
                  Features &amp; Materials
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="bg-white/4 border border-white/8 text-xs text-white/55 px-3 py-1.5 rounded-xl hover:border-[#c8881f]/30 hover:text-[#c8881f]/80 transition-colors cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Description */}
            <section>
              <p className="text-white/35 text-[10px] uppercase tracking-widest font-bold mb-3">
                About This Project
              </p>
              <p className="text-white/60 text-sm leading-[1.85]">{generatedDescription}</p>
            </section>
          </div>

          {/* ── RIGHT sidebar (sticky) ── */}
          <div className="space-y-4 lg:sticky lg:top-24">

            {/* Firm card */}
            {firm && (
              <div className="bg-[#0a0e1a] border border-white/8 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl overflow-hidden relative border border-white/10 shrink-0">
                    {firm.logo ? (
                      <Image src={firm.logo} alt={firm.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full bg-white/5 flex items-center justify-center">
                        <span className="text-white/30 text-sm font-black">{firm.name.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-black text-sm truncate">{firm.name}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#c8881f]" />
                      <p className="text-white/40 text-xs">{firm.district}</p>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-3 h-3 text-[#c8881f] fill-[#c8881f]" />
                      <span className="text-white/70 text-xs font-bold">{firm.rating}</span>
                      <span className="text-white/30 text-xs">({firm.reviewCount})</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/4 border border-white/6 rounded-xl px-3 py-2.5 mb-4">
                  <p className="text-white/35 text-[10px] uppercase tracking-widest">Starting from</p>
                  <p className="text-white font-black text-sm mt-0.5">
                    S${(firm.avgBudget / 1000).toFixed(0)}K
                  </p>
                </div>

                <div className="space-y-2">
                  <Link
                    href={`/firms/${firm.slug}`}
                    className="flex items-center justify-center gap-1.5 w-full py-2.5 border border-white/15 text-white/70 text-sm font-semibold rounded-xl hover:border-white/30 hover:text-white transition-all"
                  >
                    View Firm Profile
                  </Link>
                  <Link
                    href={`/firms/${firm.slug}?enquire=true`}
                    className="flex items-center justify-center gap-1.5 w-full py-2.5 bg-[#c8881f] text-white text-sm font-bold rounded-xl hover:bg-[#d4951f] transition-colors shadow-lg shadow-[#c8881f]/20"
                  >
                    Enquire Now
                  </Link>
                </div>
              </div>
            )}

            {/* Save button */}
            <SaveProjectButton slug={project.slug} />

            {/* Quick facts */}
            {project.designer && (
              <div className="bg-[#0a0e1a] border border-white/8 rounded-2xl p-4">
                <p className="text-white/35 text-[10px] uppercase tracking-widest mb-2">Lead Designer</p>
                <p className="text-white font-semibold text-sm">{project.designer}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Similar Projects ── */}
      {similarProjects.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-20">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-1 h-5 bg-[#c8881f] rounded-full" />
            <h2 className="text-xl font-black text-white">
              More <span className="text-[#c8881f]">{project.style}</span> Inspirations
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {similarProjects.map(p => {
              const pFirm = getFirmBySlug(p.firmSlug);
              return (
                <Link
                  key={p.slug}
                  href={`/inspirations/${p.slug}`}
                  className="group bg-[#0a0e1a] border border-white/8 rounded-2xl overflow-hidden hover:border-[#c8881f]/30 transition-all"
                >
                  <div className="aspect-4/3 relative overflow-hidden">
                    {p.photos[0]?.url && (
                      <Image
                        src={p.photos[0].url}
                        alt={p.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                    <span className="absolute top-3 left-3 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#c8881f] text-white">
                      {p.style}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-white font-bold text-sm leading-snug mb-1 line-clamp-1 group-hover:text-[#c8881f] transition-colors">
                      {p.title}
                    </p>
                    {pFirm && <p className="text-white/35 text-xs mb-2">{pFirm.name}</p>}
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-emerald-400 font-bold">{fmt(p.budget)}</span>
                      <span className="text-white/20">·</span>
                      <span className="text-white/40">{p.sqft.toLocaleString()} sqft</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/inspirations"
              className="inline-flex items-center gap-2 text-[#c8881f] font-semibold text-sm hover:gap-3 transition-all"
            >
              Browse all inspirations <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
