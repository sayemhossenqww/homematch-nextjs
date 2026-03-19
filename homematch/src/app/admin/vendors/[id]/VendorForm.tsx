"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

interface VendorRow {
  id: string;
  slug: string;
  name: string;
  logo?: string | null;
  banner?: string | null;
  category?: string | null;
  subcategory?: string | null;
  bio?: string | null;
  established?: number | null;
  rating?: number | null;
  review_count?: number | null;
  price_range?: string | null;
  website?: string | null;
  instagram?: string | null;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  tags?: string[] | null;
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

export default function VendorForm({ vendor }: { vendor: VendorRow | null }) {
  const router = useRouter();
  const [saving, setSaving]   = useState(false);
  const [deleting, setDel]    = useState(false);
  const [error, setError]     = useState("");

  const [slug, setSlug]             = useState(vendor?.slug ?? "");
  const [name, setName]             = useState(vendor?.name ?? "");
  const [category, setCategory]     = useState(vendor?.category ?? "");
  const [subcategory, setSubcat]    = useState(vendor?.subcategory ?? "");
  const [logo, setLogo]             = useState(vendor?.logo ?? "");
  const [banner, setBanner]         = useState(vendor?.banner ?? "");
  const [bio, setBio]               = useState(vendor?.bio ?? "");
  const [established, setEst]       = useState(String(vendor?.established ?? ""));
  const [rating, setRating]         = useState(String(vendor?.rating ?? ""));
  const [reviewCount, setRevCount]  = useState(String(vendor?.review_count ?? ""));
  const [priceRange, setPriceRange] = useState(vendor?.price_range ?? "");
  const [website, setWebsite]       = useState(vendor?.website ?? "");
  const [instagram, setInsta]       = useState(vendor?.instagram ?? "");
  const [phone, setPhone]           = useState(vendor?.phone ?? "");
  const [email, setEmail]           = useState(vendor?.email ?? "");
  const [address, setAddress]       = useState(vendor?.address ?? "");
  const [tags, setTags]             = useState((vendor?.tags ?? []).join(", "));
  const [isFeatured, setFeatured]   = useState(vendor?.is_featured ?? false);

  async function handleSave() {
    if (!slug.trim() || !name.trim()) { setError("Slug and name are required."); return; }
    setSaving(true);
    setError("");
    const supabase = createClient();

    const payload = {
      slug: slug.trim(),
      name: name.trim(),
      category: category || null,
      subcategory: subcategory || null,
      logo: logo || null,
      banner: banner || null,
      bio: bio || null,
      established: established ? parseInt(established) : null,
      rating: rating ? parseFloat(rating) : null,
      review_count: reviewCount ? parseInt(reviewCount) : null,
      price_range: priceRange || null,
      website: website || null,
      instagram: instagram || null,
      phone: phone || null,
      email: email || null,
      address: address || null,
      tags: tags ? tags.split(",").map(s => s.trim()).filter(Boolean) : [],
      is_featured: isFeatured,
    };

    let err;
    if (vendor) {
      ({ error: err } = await supabase.from("vendors").update(payload).eq("id", vendor.id));
    } else {
      ({ error: err } = await supabase.from("vendors").insert(payload));
    }

    setSaving(false);
    if (err) { setError(err.message); return; }
    router.push("/admin/vendors");
    router.refresh();
  }

  async function handleDelete() {
    if (!vendor) return;
    if (!confirm(`Delete "${vendor.name}"? This cannot be undone.`)) return;
    setDel(true);
    const supabase = createClient();
    await supabase.from("vendors").delete().eq("id", vendor.id);
    router.push("/admin/vendors");
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
            <input value={slug} onChange={e => setSlug(e.target.value)} placeholder="vendor-slug" className={inputCls} style={inputStyle} />
          </Field>
          <Field label="Name *">
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Vendor Name" className={inputCls} style={inputStyle} />
          </Field>
          <Field label="Category">
            <input value={category} onChange={e => setCategory(e.target.value)} placeholder="Materials" className={inputCls} style={inputStyle} />
          </Field>
          <Field label="Subcategory">
            <input value={subcategory} onChange={e => setSubcat(e.target.value)} placeholder="Tiles & Stone" className={inputCls} style={inputStyle} />
          </Field>
          <Field label="Established">
            <input value={established} onChange={e => setEst(e.target.value)} placeholder="2005" type="number" className={inputCls} style={inputStyle} />
          </Field>
          <Field label="Price Range">
            <input value={priceRange} onChange={e => setPriceRange(e.target.value)} placeholder="Mid-Range" className={inputCls} style={inputStyle} />
          </Field>
          <div className="col-span-2">
            <Field label="Bio">
              <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} placeholder="Vendor description..." className={`${inputCls} resize-none`} style={inputStyle} />
            </Field>
          </div>
          <div className="col-span-2">
            <Field label="Tags (comma-separated)">
              <input value={tags} onChange={e => setTags(e.target.value)} placeholder="Tiles, Stone, Italian Import" className={inputCls} style={inputStyle} />
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
        <p className="text-[11px] font-black uppercase tracking-widest text-white/30">Stats & Contact</p>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Rating">
            <input value={rating} onChange={e => setRating(e.target.value)} placeholder="4.8" type="number" step="0.1" className={inputCls} style={inputStyle} />
          </Field>
          <Field label="Review Count">
            <input value={reviewCount} onChange={e => setRevCount(e.target.value)} placeholder="312" type="number" className={inputCls} style={inputStyle} />
          </Field>
          <Field label="Website">
            <input value={website} onChange={e => setWebsite(e.target.value)} placeholder="https://..." className={inputCls} style={inputStyle} />
          </Field>
          <Field label="Instagram">
            <input value={instagram} onChange={e => setInsta(e.target.value)} placeholder="@handle" className={inputCls} style={inputStyle} />
          </Field>
          <Field label="Phone">
            <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+65 ..." className={inputCls} style={inputStyle} />
          </Field>
          <Field label="Email">
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="hello@vendor.com" className={inputCls} style={inputStyle} />
          </Field>
          <div className="col-span-2">
            <Field label="Address">
              <input value={address} onChange={e => setAddress(e.target.value)} placeholder="18 Sungei Kadut ..." className={inputCls} style={inputStyle} />
            </Field>
          </div>
          <div className="col-span-2 flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={isFeatured} onChange={e => setFeatured(e.target.checked)} className="w-4 h-4 rounded accent-[#c8881f]" />
              <span className="text-sm text-white/70">Featured vendor</span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button onClick={handleSave} disabled={saving}
          className="px-6 py-3 rounded-xl text-sm font-bold text-white disabled:opacity-50 transition-all"
          style={{ background: "linear-gradient(135deg,#c8881f,#e8a83f)", boxShadow: "0 4px 16px rgba(200,136,31,0.25)" }}>
          {saving ? "Saving…" : vendor ? "Save Changes" : "Create Vendor"}
        </button>

        {vendor && (
          <button onClick={handleDelete} disabled={deleting}
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-red-400/70 hover:text-red-400 disabled:opacity-40 transition-colors"
            style={{ background: "rgba(248,113,113,0.07)", border: "1px solid rgba(248,113,113,0.15)" }}>
            <Trash2 className="w-4 h-4" />
            {deleting ? "Deleting…" : "Delete Vendor"}
          </button>
        )}
      </div>
    </div>
  );
}
