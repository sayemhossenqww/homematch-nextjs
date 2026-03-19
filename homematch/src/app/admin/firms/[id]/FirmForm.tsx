"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

interface FirmRow {
  id: string;
  slug: string;
  name: string;
  logo?: string | null;
  banner?: string | null;
  address?: string | null;
  district?: string | null;
  bio?: string | null;
  established?: number | null;
  rating?: number | null;
  review_count?: number | null;
  avg_budget?: number | null;
  response_time?: string | null;
  styles?: string[] | null;
  is_featured?: boolean | null;
  website?: string | null;
  phone?: string | null;
  email?: string | null;
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

export default function FirmForm({ firm }: { firm: FirmRow | null }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const [slug, setSlug]             = useState(firm?.slug ?? "");
  const [name, setName]             = useState(firm?.name ?? "");
  const [logo, setLogo]             = useState(firm?.logo ?? "");
  const [banner, setBanner]         = useState(firm?.banner ?? "");
  const [address, setAddress]       = useState(firm?.address ?? "");
  const [district, setDistrict]     = useState(firm?.district ?? "");
  const [bio, setBio]               = useState(firm?.bio ?? "");
  const [established, setEst]       = useState(String(firm?.established ?? ""));
  const [rating, setRating]         = useState(String(firm?.rating ?? ""));
  const [reviewCount, setRevCount]  = useState(String(firm?.review_count ?? ""));
  const [avgBudget, setAvgBudget]   = useState(String(firm?.avg_budget ?? ""));
  const [responseTime, setRespTime] = useState(firm?.response_time ?? "");
  const [styles, setStyles]         = useState((firm?.styles ?? []).join(", "));
  const [isFeatured, setFeatured]   = useState(firm?.is_featured ?? false);
  const [website, setWebsite]       = useState(firm?.website ?? "");
  const [phone, setPhone]           = useState(firm?.phone ?? "");
  const [email, setEmail]           = useState(firm?.email ?? "");

  async function handleSave() {
    if (!slug.trim() || !name.trim()) { setError("Slug and name are required."); return; }
    setSaving(true);
    setError("");
    const supabase = createClient();

    const payload = {
      slug: slug.trim(),
      name: name.trim(),
      logo: logo || null,
      banner: banner || null,
      address: address || null,
      district: district || null,
      bio: bio || null,
      established: established ? parseInt(established) : null,
      rating: rating ? parseFloat(rating) : null,
      review_count: reviewCount ? parseInt(reviewCount) : null,
      avg_budget: avgBudget ? parseInt(avgBudget) : null,
      response_time: responseTime || null,
      styles: styles ? styles.split(",").map(s => s.trim()).filter(Boolean) : [],
      is_featured: isFeatured,
      website: website || null,
      phone: phone || null,
      email: email || null,
    };

    let err;
    if (firm) {
      ({ error: err } = await supabase.from("firms").update(payload).eq("id", firm.id));
    } else {
      ({ error: err } = await supabase.from("firms").insert(payload));
    }

    setSaving(false);
    if (err) { setError(err.message); return; }
    router.push("/admin/firms");
    router.refresh();
  }

  async function handleDelete() {
    if (!firm) return;
    if (!confirm(`Delete "${firm.name}"? This cannot be undone.`)) return;
    setDeleting(true);
    const supabase = createClient();
    await supabase.from("firms").delete().eq("id", firm.id);
    router.push("/admin/firms");
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
        <p className="text-[11px] font-black uppercase tracking-widest text-white/30">Basic Info</p>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Slug *">
            <input value={slug} onChange={e => setSlug(e.target.value)} placeholder="my-firm-slug" className={inputCls} style={inputStyle} />
          </Field>
          <Field label="Name *">
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Firm Name" className={inputCls} style={inputStyle} />
          </Field>
          <Field label="Established">
            <input value={established} onChange={e => setEst(e.target.value)} placeholder="2012" type="number" className={inputCls} style={inputStyle} />
          </Field>
          <Field label="District">
            <input value={district} onChange={e => setDistrict(e.target.value)} placeholder="Central" className={inputCls} style={inputStyle} />
          </Field>
          <div className="col-span-2">
            <Field label="Address">
              <input value={address} onChange={e => setAddress(e.target.value)} placeholder="Block 123 ..." className={inputCls} style={inputStyle} />
            </Field>
          </div>
          <div className="col-span-2">
            <Field label="Bio">
              <textarea value={bio} onChange={e => setBio(e.target.value)} rows={4} placeholder="Firm description..." className={`${inputCls} resize-none`} style={inputStyle} />
            </Field>
          </div>
        </div>
      </div>

      <div className="rounded-2xl p-5 space-y-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
        <p className="text-[11px] font-black uppercase tracking-widest text-white/30">Media</p>
        <div className="grid grid-cols-1 gap-4">
          <Field label="Logo URL">
            <input value={logo} onChange={e => setLogo(e.target.value)} placeholder="https://..." className={inputCls} style={inputStyle} />
          </Field>
          <Field label="Banner URL">
            <input value={banner} onChange={e => setBanner(e.target.value)} placeholder="https://..." className={inputCls} style={inputStyle} />
          </Field>
        </div>
      </div>

      <div className="rounded-2xl p-5 space-y-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
        <p className="text-[11px] font-black uppercase tracking-widest text-white/30">Stats & Matching</p>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Rating">
            <input value={rating} onChange={e => setRating(e.target.value)} placeholder="4.8" type="number" step="0.1" className={inputCls} style={inputStyle} />
          </Field>
          <Field label="Review Count">
            <input value={reviewCount} onChange={e => setRevCount(e.target.value)} placeholder="142" type="number" className={inputCls} style={inputStyle} />
          </Field>
          <Field label="Avg Budget (SGD)">
            <input value={avgBudget} onChange={e => setAvgBudget(e.target.value)} placeholder="65000" type="number" className={inputCls} style={inputStyle} />
          </Field>
          <Field label="Response Time">
            <input value={responseTime} onChange={e => setRespTime(e.target.value)} placeholder="< 2 hours" className={inputCls} style={inputStyle} />
          </Field>
          <div className="col-span-2">
            <Field label="Styles (comma-separated)">
              <input value={styles} onChange={e => setStyles(e.target.value)} placeholder="Luxury, Contemporary, Modern" className={inputCls} style={inputStyle} />
            </Field>
          </div>
          <div className="col-span-2 flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={isFeatured} onChange={e => setFeatured(e.target.checked)}
                className="w-4 h-4 rounded accent-[#c8881f]" />
              <span className="text-sm text-white/70">Featured firm</span>
            </label>
          </div>
        </div>
      </div>

      <div className="rounded-2xl p-5 space-y-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
        <p className="text-[11px] font-black uppercase tracking-widest text-white/30">Contact</p>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Website">
            <input value={website} onChange={e => setWebsite(e.target.value)} placeholder="https://..." className={inputCls} style={inputStyle} />
          </Field>
          <Field label="Phone">
            <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+65 ..." className={inputCls} style={inputStyle} />
          </Field>
          <div className="col-span-2">
            <Field label="Email">
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="hello@firm.com" className={inputCls} style={inputStyle} />
            </Field>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button onClick={handleSave} disabled={saving}
          className="px-6 py-3 rounded-xl text-sm font-bold text-white disabled:opacity-50 transition-all"
          style={{ background: "linear-gradient(135deg,#c8881f,#e8a83f)", boxShadow: "0 4px 16px rgba(200,136,31,0.25)" }}>
          {saving ? "Saving…" : firm ? "Save Changes" : "Create Firm"}
        </button>

        {firm && (
          <button onClick={handleDelete} disabled={deleting}
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-red-400/70 hover:text-red-400 disabled:opacity-40 transition-colors"
            style={{ background: "rgba(248,113,113,0.07)", border: "1px solid rgba(248,113,113,0.15)" }}>
            <Trash2 className="w-4 h-4" />
            {deleting ? "Deleting…" : "Delete Firm"}
          </button>
        )}
      </div>
    </div>
  );
}
