import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ArticleForm from "./ArticleForm";

export const metadata: Metadata = { title: "Edit Article" };

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (id === "new") {
    return (
      <div className="p-8 max-w-4xl">
        <Link href="/admin/articles" className="flex items-center gap-1.5 text-xs text-white/35 hover:text-white/70 mb-6 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Articles
        </Link>
        <div className="mb-6">
          <p className="text-[11px] font-black uppercase tracking-widest text-[#c8881f] mb-1">Articles</p>
          <h1 className="text-2xl font-extrabold text-white">New Article</h1>
        </div>
        <ArticleForm article={null} />
      </div>
    );
  }

  const supabase = await createClient();
  const { data: article } = await supabase.from("articles").select("*").eq("id", id).single();
  if (!article) notFound();

  return (
    <div className="p-8 max-w-4xl">
      <Link href="/admin/articles" className="flex items-center gap-1.5 text-xs text-white/35 hover:text-white/70 mb-6 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Articles
      </Link>
      <div className="mb-6">
        <p className="text-[11px] font-black uppercase tracking-widest text-[#c8881f] mb-1">Articles</p>
        <h1 className="text-2xl font-extrabold text-white">Edit: {article.title}</h1>
      </div>
      <ArticleForm article={article} />
    </div>
  );
}
