"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

interface ArticleRow {
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  content?: string | null;
  category?: string | null;
  tags?: string[] | null;
  publish_date?: string | null;
  read_time?: number | null;
  hero_image?: string | null;
  author?: string | null;
  author_role?: string | null;
  is_featured?: boolean | null;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[10px] font-bold uppercase tracking-widest text-white/35 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder-white/20 outline-none";
const inputStyle = { background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" };

export default function ArticleForm({ article }: { article: ArticleRow | null }) {
  const router = useRouter();
  const [saving, setSaving]   = useState(false);
  const [deleting, setDel]    = useState(false);
  const [error, setError]     = useState("");

  const [slug, setSlug]           = useState(article?.slug ?? "");
  const [title, setTitle]         = useState(article?.title ?? "");
  const [excerpt, setExcerpt]     = useState(article?.excerpt ?? "");
  const [content, setContent]     = useState(article?.content ?? "");
  const [category, setCategory]   = useState(article?.category ?? "");
  const [tags, setTags]           = useState((article?.tags ?? []).join(", "));
  const [publishDate, setPubDate] = useState(article?.publish_date ?? "");
  const [readTime, setReadTime]   = useState(String(article?.read_time ?? ""));
  const [heroImage, setHeroImg]   = useState(article?.hero_image ?? "");
  const [author, setAuthor]       = useState(article?.author ?? "");
  const [authorRole, setAuthRole] = useState(article?.author_role ?? "");
  const [isFeatured, setFeatured] = useState(article?.is_featured ?? false);

  async function handleSave() {
    if (!slug.trim() || !title.trim()) { setError("Slug and title are required."); return; }
    setSaving(true);
    setError("");
    const supabase = createClient();

    const payload = {
      slug: slug.trim(),
      title: title.trim(),
      excerpt: excerpt || null,
      content: content || null,
      category: category || null,
      tags: tags ? tags.split(",").map(s => s.trim()).filter(Boolean) : [],
      publish_date: publishDate || null,
      read_time: readTime ? parseInt(readTime) : null,
      hero_image: heroImage || null,
      author: author || null,
      author_role: authorRole || null,
      is_featured: isFeatured,
    };

    let err;
    if (article) {
      ({ error: err } = await supabase.from("articles").update(payload).eq("id", article.id));
    } else {
      ({ error: err } = await supabase.from("articles").insert(payload));
    }

    setSaving(false);
    if (err) { setError(err.message); return; }
    router.push("/admin/articles");
    router.refresh();
  }

  async function handleDelete() {
    if (!article) return;
    if (!confirm(`Delete "${article.title}"? This cannot be undone.`)) return;
    setDel(true);
    const supabase = createClient();
    await supabase.from("articles").delete().eq("id", article.id);
    router.push("/admin/articles");
    router.refresh();
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="px-4 py-3 rounded-xl text-sm text-red-300" style={{ background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)" }}>
          {error}
        </div>
      )}

      <div className="rounded-2xl p-5 space-y-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
        <p className="text-[11px] font-black uppercase tracking-widest text-white/30">Meta</p>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Slug *">
            <input value={slug} onChange={e => setSlug(e.target.value)} placeholder="my-article-slug" className={inputCls} style={inputStyle} />
          </Field>
          <Field label="Category">
            <input value={category} onChange={e => setCategory(e.target.value)} placeholder="HDB Guides" className={inputCls} style={inputStyle} />
          </Field>
          <Field label="Publish Date">
            <input value={publishDate} onChange={e => setPubDate(e.target.value)} placeholder="Jan 2025" className={inputCls} style={inputStyle} />
          </Field>
          <Field label="Read Time (min)">
            <input value={readTime} onChange={e => setReadTime(e.target.value)} type="number" placeholder="12" className={inputCls} style={inputStyle} />
          </Field>
          <div className="col-span-2">
            <Field label="Title *">
              <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Article title..." className={inputCls} style={inputStyle} />
            </Field>
          </div>
          <div className="col-span-2">
            <Field label="Excerpt">
              <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} rows={2} placeholder="Short summary..." className={`${inputCls} resize-none`} style={inputStyle} />
            </Field>
          </div>
          <div className="col-span-2">
            <Field label="Tags (comma-separated)">
              <input value={tags} onChange={e => setTags(e.target.value)} placeholder="HDB, renovation, Singapore" className={inputCls} style={inputStyle} />
            </Field>
          </div>
          <Field label="Hero Image URL">
            <input value={heroImage} onChange={e => setHeroImg(e.target.value)} placeholder="https://..." className={inputCls} style={inputStyle} />
          </Field>
          <div className="col-span-2 flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={isFeatured} onChange={e => setFeatured(e.target.checked)} className="w-4 h-4 rounded accent-[#c8881f]" />
              <span className="text-sm text-white/70">Featured article</span>
            </label>
          </div>
        </div>
      </div>

      <div className="rounded-2xl p-5 space-y-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
        <p className="text-[11px] font-black uppercase tracking-widest text-white/30">Author</p>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Author Name">
            <input value={author} onChange={e => setAuthor(e.target.value)} placeholder="Sarah Tan" className={inputCls} style={inputStyle} />
          </Field>
          <Field label="Author Role">
            <input value={authorRole} onChange={e => setAuthRole(e.target.value)} placeholder="Senior Editor, HomeMatch" className={inputCls} style={inputStyle} />
          </Field>
        </div>
      </div>

      <div className="rounded-2xl p-5 space-y-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
        <p className="text-[11px] font-black uppercase tracking-widest text-white/30">Content (HTML)</p>
        <Field label="Article Body">
          <textarea value={content} onChange={e => setContent(e.target.value)} rows={20}
            placeholder="<h2>Introduction</h2><p>...</p>"
            className={`${inputCls} resize-y font-mono text-xs`}
            style={inputStyle} />
        </Field>
        <p className="text-[11px] text-white/25">Paste HTML content directly. Supports h2, h3, p, ul, li, strong, em, div.info-box, div.pro-tip, div.warning.</p>
      </div>

      <div className="flex items-center justify-between">
        <button onClick={handleSave} disabled={saving}
          className="px-6 py-3 rounded-xl text-sm font-bold text-white disabled:opacity-50 transition-all"
          style={{ background: "linear-gradient(135deg,#c8881f,#e8a83f)", boxShadow: "0 4px 16px rgba(200,136,31,0.25)" }}>
          {saving ? "Saving…" : article ? "Save Changes" : "Create Article"}
        </button>

        {article && (
          <button onClick={handleDelete} disabled={deleting}
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-red-400/70 hover:text-red-400 disabled:opacity-40 transition-colors"
            style={{ background: "rgba(248,113,113,0.07)", border: "1px solid rgba(248,113,113,0.15)" }}>
            <Trash2 className="w-4 h-4" />
            {deleting ? "Deleting…" : "Delete Article"}
          </button>
        )}
      </div>
    </div>
  );
}
