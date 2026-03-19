import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Home, ChevronRight, Clock, Calendar, User,
  ArrowRight, Tag, BookOpen,
} from "lucide-react";
import { getArticleBySlug, getAllArticles, getRelatedArticles } from "@/data/articles";
import ArticleBody from "@/components/articles/ArticleBody";
import ArticleCard from "@/components/articles/ArticleCard";

interface Props {
  params: Promise<{ slug: string }>;
}

// Category-specific bonus keywords injected per article category
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  "HDB Guides": [
    "HDB renovation Singapore", "HDB renovation rules", "HDB renovation permit",
    "HDB BTO renovation", "resale HDB renovation", "4-room HDB renovation",
    "5-room HDB renovation", "HDB approved renovation contractor",
  ],
  "Budget Guides": [
    "renovation cost Singapore", "renovation budget Singapore",
    "how much renovation Singapore", "cheap renovation Singapore",
    "renovation cost breakdown", "renovation package price Singapore",
    "save money renovation Singapore",
  ],
  "Design Trends": [
    "interior design trends Singapore 2025", "home design ideas Singapore",
    "Singapore interior style", "popular interior design Singapore",
    "modern home Singapore", "aesthetic home Singapore",
  ],
  "House Hacks": [
    "renovation tips Singapore", "home improvement Singapore",
    "renovation mistakes to avoid Singapore", "renovation hacks Singapore",
    "renovation advice Singapore homeowner",
  ],
  "Consumer Protection": [
    "renovation scam Singapore", "how to avoid renovation scam",
    "CaseTrust Singapore", "CASE renovation Singapore",
    "renovation contract Singapore", "renovation dispute Singapore",
    "deposit renovation Singapore protection",
  ],
  "Smart Home": [
    "smart home Singapore", "home automation Singapore",
    "smart home renovation Singapore", "smart home devices Singapore",
    "smart lighting Singapore", "smart lock Singapore",
  ],
  "Designer Spotlight": [
    "interior designer profile Singapore", "best interior designer Singapore",
    "award winning interior designer Singapore", "interior design interview Singapore",
  ],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Article Not Found" };

  const catBonus = CATEGORY_KEYWORDS[article.category] ?? [];

  // Build question-form keywords from tags
  const questionKeywords = article.tags.slice(0, 3).map(t =>
    `how to ${t.toLowerCase()} Singapore`
  );

  const keywords = [
    // Exact title phrases
    article.title,
    // Tag variations
    ...article.tags,
    ...article.tags.map(t => `${t} Singapore`),
    ...article.tags.map(t => `${t} guide Singapore`),
    ...article.tags.map(t => `${t} tips Singapore`),
    // Question forms
    ...questionKeywords,
    // Category-level
    article.category,
    `${article.category.toLowerCase()} Singapore`,
    `${article.category.toLowerCase()} guide`,
    // Category bonus
    ...catBonus,
    // Generic anchors
    "Singapore renovation guide 2025",
    "interior design Singapore homeowner",
  ];

  const readLabel = `${article.readTime}-min read`;
  const richDesc  = `${article.excerpt} — ${readLabel} by ${article.author}.`;

  return {
    title: `${article.title} | HomeMatch`,
    description: richDesc,
    alternates: { canonical: `https://www.homematch.sg/articles/${article.slug}` },
    keywords,
    authors: [{ name: article.author }],
    category: article.category,
    openGraph: {
      title: article.title,
      description: richDesc,
      url: `https://www.homematch.sg/articles/${article.slug}`,
      siteName: "HomeMatch",
      images: [{ url: article.heroImage, width: 1200, height: 630, alt: article.title }],
      type: "article",
      publishedTime: article.publishDate,
      authors: [article.author],
      section: article.category,
      tags: article.tags,
      locale: "en_SG",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: richDesc,
      images: [article.heroImage],
    },
  };
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllArticles().map(a => ({ slug: a.slug }));
}

const CATEGORY_COLOURS: Record<string, string> = {
  "HDB Guides":          "bg-sky-500/15 text-sky-400 border-sky-500/20",
  "Budget Guides":       "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  "Design Trends":       "bg-violet-500/15 text-violet-400 border-violet-500/20",
  "House Hacks":         "bg-[#c8881f]/15 text-[#c8881f] border-[#c8881f]/20",
  "Consumer Protection": "bg-red-500/15 text-red-400 border-red-500/20",
  "Smart Home":          "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
  "Designer Spotlight":  "bg-pink-500/15 text-pink-400 border-pink-500/20",
};

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getRelatedArticles(slug, 3);
  const catClass = CATEGORY_COLOURS[article.category] ?? "bg-white/10 text-white/60 border-white/15";
  const popular  = getAllArticles().slice(0, 5);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt,
    "image": article.heroImage,
    "author": { "@type": "Person", "name": article.author },
    "publisher": {
      "@type": "Organization",
      "name": "HomeMatch",
      "logo": { "@type": "ImageObject", "url": "https://www.homematch.sg/logo.png" },
    },
    "datePublished": article.publishDate,
    "dateModified": article.updatedDate ?? article.publishDate,
    "mainEntityOfPage": { "@type": "WebPage", "@id": `https://www.homematch.sg/articles/${article.slug}` },
    "keywords": article.tags.join(", "),
    "articleSection": article.category,
    "timeRequired": `PT${article.readTime}M`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home",     "item": "https://www.homematch.sg/" },
      { "@type": "ListItem", "position": 2, "name": "Articles", "item": "https://www.homematch.sg/articles" },
      { "@type": "ListItem", "position": 3, "name": article.category, "item": `https://www.homematch.sg/articles?cat=${article.category.toLowerCase().replace(/ /g, "-")}` },
      { "@type": "ListItem", "position": 4, "name": article.title, "item": `https://www.homematch.sg/articles/${article.slug}` },
    ],
  };

  return (
    <div className="min-h-screen bg-[#05080f]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* ── Hero image ── */}
      <div className="relative h-[55vh] min-h-[380px] w-full overflow-hidden">
        <Image
          src={article.heroImage}
          alt={article.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#05080f] via-[#05080f]/55 to-[#05080f]/20" />
        <div className="absolute inset-0 bg-linear-to-r from-[#05080f]/60 via-transparent to-transparent" />

        {/* Breadcrumb overlaid on hero */}
        <div className="absolute top-0 inset-x-0 pt-24 max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-1.5 text-xs font-medium text-white/40">
            <Link href="/" className="flex items-center gap-1 hover:text-white/70 transition-colors">
              <Home className="w-3 h-3" /> Home
            </Link>
            <ChevronRight className="w-3 h-3 text-white/20" />
            <Link href="/articles" className="hover:text-white/70 transition-colors">Articles</Link>
            <ChevronRight className="w-3 h-3 text-white/20" />
            <span className="text-white/60 truncate max-w-[200px]">{article.category}</span>
          </nav>
        </div>
      </div>

      {/* ── Content area ── */}
      <div className="max-w-7xl mx-auto px-4 -mt-24 relative z-10 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 items-start">

          {/* ── LEFT: Article ── */}
          <article>
            {/* Header */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className={`text-[10px] font-black uppercase tracking-[0.12em] px-2.5 py-1 rounded-lg border ${catClass}`}>
                  {article.category}
                </span>
                {article.updatedDate && (
                  <span className="text-[10px] text-white/30 bg-white/5 border border-white/8 px-2.5 py-1 rounded-lg">
                    Updated {article.updatedDate}
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">
                {article.title}
              </h1>

              <p className="text-white/50 text-base leading-relaxed mb-6 max-w-2xl">
                {article.excerpt}
              </p>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-white/8 text-xs text-white/35">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  <span className="font-semibold text-white/55">{article.author}</span>
                  <span className="text-white/20">·</span>
                  <span className="text-white/35">{article.authorRole}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{article.publishDate}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{article.readTime} min read</span>
                </div>
              </div>
            </div>

            {/* ── Article body (HTML from editor) ── */}
            <ArticleBody html={article.content} />

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-10 pt-8 border-t border-white/8">
                <Tag className="w-3.5 h-3.5 text-white/25 shrink-0" />
                {article.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/4 border border-white/8 rounded-lg text-xs text-white/45 hover:border-[#c8881f]/30 hover:text-white/65 transition-all cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Bottom CTA */}
            <div className="mt-12 bg-[#0a0e1a] border border-[#c8881f]/20 rounded-3xl p-8">
              <p className="text-[#c8881f] text-xs font-black uppercase tracking-[0.14em] mb-2">
                Ready to Start?
              </p>
              <h3 className="text-xl font-black text-white mb-2">
                Find the Right Interior Designer for Your Home
              </h3>
              <p className="text-white/40 text-sm mb-6 leading-relaxed max-w-lg">
                Get matched with up to 6 CaseTrust-accredited firms based on your style,
                budget, and property type — completely free.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/find-my-id" className="btn-accent text-sm py-2.5 px-6">
                  Find My ID — Free →
                </Link>
                <Link
                  href="/firms"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/6 hover:bg-white/10 text-white/70 hover:text-white font-semibold rounded-full transition-all border border-white/10 text-sm"
                >
                  Browse All Firms <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </article>

          {/* ── RIGHT: Sticky sidebar ── */}
          <aside className="space-y-5 lg:sticky lg:top-24">

            {/* Find My ID CTA */}
            <div className="bg-[#0a0e1a] border border-[#c8881f]/25 rounded-2xl p-6">
              <p className="text-[#c8881f] text-[10px] font-black uppercase tracking-[0.14em] mb-2">
                Free Matching Service
              </p>
              <h3 className="text-white font-black text-base leading-snug mb-2">
                Find Your Perfect Interior Firm
              </h3>
              <p className="text-white/40 text-xs leading-relaxed mb-5">
                Answer 5 quick questions and get matched with up to 6 CaseTrust-accredited interior design firms.
              </p>
              <Link href="/find-my-id" className="btn-accent w-full justify-center text-sm py-2.5 block text-center">
                Find My ID — 5 Minutes →
              </Link>
            </div>

            {/* Popular articles */}
            <div className="bg-[#0a0e1a] border border-white/8 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-3.5 h-3.5 text-[#c8881f]" />
                <h3 className="text-xs font-black uppercase tracking-[0.12em] text-white/50">
                  Popular Articles
                </h3>
              </div>
              <ol className="space-y-3">
                {popular.map((a, i) => (
                  <li key={a.slug}>
                    <Link
                      href={`/articles/${a.slug}`}
                      className="flex items-start gap-3 group"
                    >
                      <span className="text-[#c8881f] font-black text-xs w-4 shrink-0 mt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-white/55 text-xs leading-snug group-hover:text-white transition-colors line-clamp-2">
                        {a.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
              <Link
                href="/articles"
                className="mt-5 flex items-center gap-1.5 text-[#c8881f] text-xs font-bold hover:gap-2.5 transition-all"
              >
                View All Articles <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Budget calculator teaser */}
            <div className="bg-[#0a0e1a] border border-white/8 rounded-2xl p-5">
              <p className="text-white/25 text-[10px] font-black uppercase tracking-[0.12em] mb-2">
                Free Tool
              </p>
              <h3 className="text-white font-bold text-sm mb-2">Budget Calculator</h3>
              <p className="text-white/35 text-xs leading-relaxed mb-4">
                Estimate your renovation cost in 60 seconds based on property type and size.
              </p>
              <Link
                href="/tools/budget-calculator"
                className="flex items-center gap-1.5 text-[#c8881f] text-xs font-bold hover:gap-2.5 transition-all"
              >
                Calculate My Budget <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </aside>
        </div>

        {/* ── Related articles ── */}
        {related.length > 0 && (
          <section className="mt-16 pt-10 border-t border-white/8">
            <h2 className="text-lg font-black text-white mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map(a => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
