"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

interface InspirationRow {
  id: string;
  slug: string;
  title: string;
  firm_slug?: string | null;
  property_type?: string | null;
  bedrooms?: number | null;
  sqft?: number | null;
  budget?: number | null;
  style?: string | null;
  rooms?: string[] | null;
  tags?: string[] | null;
  completion_days?: number | null;
  completion_date?: string | null;
  designer?: string | null;
  before_photo_url?: string | null;
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

export default function InspirationForm({ inspiration }: { inspiration: InspirationRow | null }) {
  const router = useRouter();
  const [saving, setSaving]   = useState(false);
  const [deleting, setDel]    = useState(false);
  const [error, setError]     = useState("");

  const [slug, setSlug]             = useState(inspiration?.slug ?? "");
  const [title, setTitle]           = useState(inspiration?.title ?? "");
  const [firmSlug, setFirmSlug]     = useState(inspiration?.firm_slug ?? "");
  const [propertyType, setPropType] = useState(inspiration?.property_type ?? "");
  const [bedrooms, setBedrooms]     = useState(String(inspiration?.bedrooms ?? ""));
  const [sqft, setSqft]             = useState(String(inspiration?.sqft ?? ""));
  const [budget, setBudget]         = useState(String(inspiration?.budget ?? ""));
  const [style, setStyle]           = useState(inspiration?.style ?? "");
  const [rooms, setRooms]           = useState((inspiration?.rooms ?? []).join(", "));
  const [tags, setTags]             = useState((inspiration?.tags ?? []).join(", "));
  const [completionDays, setDays]   = useState(String(inspiration?.completion_days ?? ""));
  const [completionDate, setDate]   = useState(inspiration?.completion_date ?? "");
  const [designer, setDesigner]     = useState(inspiration?.designer ?? "");
  const [beforePhoto, setBeforePhoto] = useState(inspiration?.before_photo_url ?? "");

  async function handleSave() {
    if (!slug.trim() || !title.trim()) { setError("Slug and title are required."); return; }
    setSaving(true);
    setError("");
    const supabase = createClient();

    const payload = {
      slug: slug.trim(),
      title: title.trim(),
      firm_slug: firmSlug || null,
      property_type: propertyType || null,
      bedrooms: bedrooms ? parseInt(bedrooms) : null,
      sqft: sqft ? parseInt(sqft) : null,
      budget: budget ? parseInt(budget) : null,
      style: style || null,
      rooms: rooms ? rooms.split(",").map(s => s.trim()).filter(Boolean) : [],
      tags: tags ? tags.split(",").map(s => s.trim()).filter(Boolean) : [],
      completion_days: completionDays ? parseInt(completionDays) : null,
      completion_date: completionDate || null,
      designer: designer || null,
      before_photo_url: beforePhoto || null,
    };

    let err;
    if (inspiration) {
      ({ error: err } = await supabase.from("inspirations").update(payload).eq("id", inspiration.id));
    } else {
      ({ error: err } = await supabase.from("inspirations").insert(payload));
    }

    setSaving(false);
    if (err) { setError(err.message); return; }
    router.push("/admin/inspirations");
    router.refresh();
  }

  async function handleDelete() {
    if (!inspiration) return;
    if (!confirm(`Delete "${inspiration.title}"? This cannot be undone.`)) return;
    setDel(true);
    const supabase = createClient();
    await supabase.from("inspirations").delete().eq("id", inspiration.id);
    router.push("/admin/inspirations");
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
        <p className="text-[11px] font-black uppercase tracking-widest text-white/30">Project Details</p>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Slug *">
            <input value={slug} onChange={e => setSlug(e.target.value)} placeholder="project-slug" className={inputCls} style={inputStyle} />
          </Field>
          <Field label="Title *">
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Modern Luxe 3-Bed Condo" className={inputCls} style={inputStyle} />
          </Field>
          <Field label="Firm Slug">
            <input value={firmSlug} onChange={e => setFirmSlug(e.target.value)} placeholder="my-firm-slug" className={inputCls} style={inputStyle} />
          </Field>
          <Field label="Designer">
            <input value={designer} onChange={e => setDesigner(e.target.value)} placeholder="Kelvin Tan" className={inputCls} style={inputStyle} />
          </Field>
          <Field label="Property Type">
            <input value={propertyType} onChange={e => setPropType(e.target.value)} placeholder="Condo" className={inputCls} style={inputStyle} />
          </Field>
          <Field label="Style">
            <input value={style} onChange={e => setStyle(e.target.value)} placeholder="Luxury" className={inputCls} style={inputStyle} />
          </Field>
          <Field label="Bedrooms">
            <input value={bedrooms} onChange={e => setBedrooms(e.target.value)} type="number" placeholder="3" className={inputCls} style={inputStyle} />
          </Field>
          <Field label="Sqft">
            <input value={sqft} onChange={e => setSqft(e.target.value)} type="number" placeholder="1250" className={inputCls} style={inputStyle} />
          </Field>
          <Field label="Budget (SGD)">
            <input value={budget} onChange={e => setBudget(e.target.value)} type="number" placeholder="85000" className={inputCls} style={inputStyle} />
          </Field>
          <Field label="Completion Days">
            <input value={completionDays} onChange={e => setDays(e.target.value)} type="number" placeholder="90" className={inputCls} style={inputStyle} />
          </Field>
          <Field label="Completion Date">
            <input value={completionDate} onChange={e => setDate(e.target.value)} placeholder="Mar 2025" className={inputCls} style={inputStyle} />
          </Field>
          <div className="col-span-2">
            <Field label="Rooms (comma-separated)">
              <input value={rooms} onChange={e => setRooms(e.target.value)} placeholder="Living Room, Kitchen, Master Bedroom" className={inputCls} style={inputStyle} />
            </Field>
          </div>
          <div className="col-span-2">
            <Field label="Tags (comma-separated)">
              <input value={tags} onChange={e => setTags(e.target.value)} placeholder="Marble, Island Kitchen, Feature Wall" className={inputCls} style={inputStyle} />
            </Field>
          </div>
        </div>
      </div>

      <div className="rounded-2xl p-5 space-y-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
        <p className="text-[11px] font-black uppercase tracking-widest text-white/30">Before Photo</p>
        <Field label="Before Photo URL">
          <input value={beforePhoto} onChange={e => setBeforePhoto(e.target.value)} placeholder="https://..." className={inputCls} style={inputStyle} />
        </Field>
        <p className="text-[11px] text-white/25">After photos are managed via inspiration_photos table. Add them from Supabase dashboard or a future photo upload UI.</p>
      </div>

      <div className="flex items-center justify-between">
        <button onClick={handleSave} disabled={saving}
          className="px-6 py-3 rounded-xl text-sm font-bold text-white disabled:opacity-50 transition-all"
          style={{ background: "linear-gradient(135deg,#c8881f,#e8a83f)", boxShadow: "0 4px 16px rgba(200,136,31,0.25)" }}>
          {saving ? "Saving…" : inspiration ? "Save Changes" : "Create Inspiration"}
        </button>

        {inspiration && (
          <button onClick={handleDelete} disabled={deleting}
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-red-400/70 hover:text-red-400 disabled:opacity-40 transition-colors"
            style={{ background: "rgba(248,113,113,0.07)", border: "1px solid rgba(248,113,113,0.15)" }}>
            <Trash2 className="w-4 h-4" />
            {deleting ? "Deleting…" : "Delete Inspiration"}
          </button>
        )}
      </div>
    </div>
  );
}
