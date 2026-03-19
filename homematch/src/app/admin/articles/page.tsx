import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus, BookOpen, ExternalLink } from "lucide-react";

export const metadata: Metadata = { title: "Manage Articles" };

export default async function ArticlesAdminPage() {
  const supabase = await createClient();

  const { data: articles, count } = await supabase
    .from("articles")
    .select("id, slug, title, category, author, is_featured, publish_date, read_time, created_at", { count: "exact" })
    .order("created_at", { ascending: false });

  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-[11px] font-black uppercase tracking-widest text-[#c8881f] mb-1">Content</p>
          <h1 className="text-2xl font-extrabold text-white">Articles</h1>
          <p className="text-sm text-white/40 mt-1">{count ?? 0} articles</p>
        </div>
        <Link href="/admin/articles/new"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-all"
          style={{ background: "linear-gradient(135deg,#c8881f,#e8a83f)", boxShadow: "0 4px 16px rgba(200,136,31,0.25)" }}>
          <Plus className="w-3.5 h-3.5" />
          Add Article
        </Link>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="grid gap-4 px-5 py-3 text-[10px] font-black uppercase tracking-widest text-white/25"
          style={{ gridTemplateColumns: "3fr 1.5fr 1.5fr 1fr 1fr 120px", background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <span>Article</span>
          <span>Category</span>
          <span>Author</span>
          <span>Read Time</span>
          <span>Featured</span>
          <span>Actions</span>
        </div>

        {!articles || articles.length === 0 ? (
          <div className="py-16 text-center">
            <BookOpen className="w-8 h-8 text-white/15 mx-auto mb-3" />
            <p className="text-sm text-white/25">No articles yet.</p>
          </div>
        ) : (
          <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
            {articles.map((article) => (
              <div key={article.id}
                className="grid gap-4 px-5 py-4 items-center"
                style={{ gridTemplateColumns: "3fr 1.5fr 1.5fr 1fr 1fr 120px" }}>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{article.title}</p>
                  <p className="text-[11px] text-white/35 truncate mt-0.5">/{article.slug}</p>
                  {article.publish_date && (
                    <p className="text-[10px] text-white/20">{article.publish_date}</p>
                  )}
                </div>

                <div>
                  <p className="text-xs text-white/55">{article.category ?? "—"}</p>
                </div>

                <div>
                  <p className="text-xs text-white/55">{article.author ?? "—"}</p>
                </div>

                <div>
                  <p className="text-xs text-white/55">{article.read_time ? `${article.read_time} min` : "—"}</p>
                </div>

                <div>
                  {article.is_featured ? (
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg"
                      style={{ background: "rgba(200,136,31,0.15)", color: "#c8881f" }}>Featured</span>
                  ) : (
                    <span className="text-[10px] text-white/25">—</span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Link href={`/admin/articles/${article.id}`}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold text-white/70 hover:text-white transition-colors"
                    style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    Edit
                  </Link>
                  <Link href={`/articles/${article.slug}`} target="_blank"
                    className="p-1.5 rounded-lg text-white/30 hover:text-white/70 transition-colors"
                    style={{ background: "rgba(255,255,255,0.05)" }}>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
