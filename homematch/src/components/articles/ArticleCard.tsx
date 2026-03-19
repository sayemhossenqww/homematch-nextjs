import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowUpRight } from "lucide-react";
import type { Article } from "@/types/article";

const CATEGORY_COLOURS: Record<string, string> = {
  "HDB Guides":          "bg-sky-500/15 text-sky-400 border-sky-500/20",
  "Budget Guides":       "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  "Design Trends":       "bg-violet-500/15 text-violet-400 border-violet-500/20",
  "House Hacks":         "bg-[#c8881f]/15 text-[#c8881f] border-[#c8881f]/20",
  "Consumer Protection": "bg-red-500/15 text-red-400 border-red-500/20",
  "Smart Home":          "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
  "Designer Spotlight":  "bg-pink-500/15 text-pink-400 border-pink-500/20",
};

interface Props {
  article: Article;
  featured?: boolean;
}

export default function ArticleCard({ article, featured = false }: Props) {
  const catClass = CATEGORY_COLOURS[article.category] ?? "bg-white/10 text-white/60 border-white/15";

  if (featured) {
    return (
      <Link
        href={`/articles/${article.slug}`}
        className="group relative bg-[#0a0e1a] border border-white/8 rounded-3xl overflow-hidden hover:border-[#c8881f]/35 hover:shadow-2xl hover:shadow-[#c8881f]/8 transition-all duration-400 flex flex-col lg:flex-row"
      >
        {/* Image */}
        <div className="relative lg:w-[55%] aspect-video lg:aspect-auto overflow-hidden shrink-0">
          <Image
            src={article.heroImage}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 55vw"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-transparent to-[#0a0e1a]/60 hidden lg:block" />
          <div className="absolute inset-0 bg-linear-to-t from-[#0a0e1a]/60 to-transparent lg:hidden" />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center p-7 lg:p-10 flex-1 min-w-0">
          <div className="flex items-center gap-2.5 mb-4">
            <span className={`text-[10px] font-black uppercase tracking-[0.12em] px-2.5 py-1 rounded-lg border ${catClass}`}>
              {article.category}
            </span>
            <span className="text-[10px] font-semibold text-white/25 uppercase tracking-wider bg-white/5 border border-white/8 px-2.5 py-1 rounded-lg">
              Featured
            </span>
          </div>

          <h2 className="text-xl lg:text-2xl font-black text-white leading-snug mb-3 group-hover:text-[#c8881f] transition-colors line-clamp-3">
            {article.title}
          </h2>

          <p className="text-white/45 text-sm leading-relaxed mb-5 line-clamp-3">
            {article.excerpt}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-white/30">
              <span className="font-semibold text-white/50">{article.author}</span>
              <span className="w-1 h-1 rounded-full bg-white/15" />
              <span>{article.publishDate}</span>
              <span className="w-1 h-1 rounded-full bg-white/15" />
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime} min</span>
            </div>
            <span className="flex items-center gap-1 text-[#c8881f] text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
              Read <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group bg-[#0a0e1a] border border-white/8 rounded-2xl overflow-hidden hover:border-[#c8881f]/35 hover:shadow-xl hover:shadow-[#c8881f]/6 transition-all duration-300 flex flex-col"
    >
      {/* Thumbnail */}
      <div className="aspect-4/3 relative overflow-hidden">
        <Image
          src={article.heroImage}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-600 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#0a0e1a]/60 via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <span className={`text-[9px] font-black uppercase tracking-[0.1em] px-2 py-0.5 rounded-md border ${catClass}`}>
            {article.category}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-white font-bold text-sm leading-snug mb-2 line-clamp-2 group-hover:text-[#c8881f] transition-colors flex-1">
          {article.title}
        </h3>
        <p className="text-white/35 text-xs leading-relaxed line-clamp-2 mb-4">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between pt-3 border-t border-white/6 text-xs text-white/25 mt-auto">
          <span className="font-medium text-white/40">{article.author}</span>
          <div className="flex items-center gap-2">
            <span>{article.publishDate}</span>
            <span className="w-1 h-1 rounded-full bg-white/15" />
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime} min</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
