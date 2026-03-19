"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User, Mail, Phone, Shield, Building2, Package, Home, LogOut,
  Edit3, Check, X, MapPin, Banknote, Calendar, FileText, Globe,
  Sparkles, BadgeCheck, Lock,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const ACCENT_COLORS = ["#c8881f", "#60a5fa", "#4ade80", "#f472b6", "#a78bfa"];

function Avatar({ name, picture, id, size = 80 }: { name: string; picture?: string; id: string; size?: number }) {
  const initials = name.split(" ").map(n => n[0]).filter(Boolean).join("").slice(0, 2).toUpperCase();
  const color = ACCENT_COLORS[(id.charCodeAt(id.length - 1) ?? 0) % ACCENT_COLORS.length];
  if (picture) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={picture} alt={name} width={size} height={size}
      className="rounded-full object-cover border-2 border-white/10"
      style={{ width: size, height: size }} />;
  }
  return (
    <div className="rounded-full flex items-center justify-center font-black text-white border-2 border-white/10"
      style={{ width: size, height: size, background: color, fontSize: size * 0.34 }}>
      {initials}
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-6"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
      <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-white/40 mb-5">{title}</h3>
      {children}
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-white/[0.04] last:border-0">
      <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
        style={{ background: "rgba(200,136,31,0.1)" }}>
        <Icon className="w-3.5 h-3.5 text-[#c8881f]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] uppercase tracking-wider text-white/35 font-bold mb-0.5">{label}</p>
        <p className="text-sm text-white/80 font-medium">{value}</p>
      </div>
    </div>
  );
}

// ─── Role-specific edit form ──────────────────────────────────────────────────

function SelectField({ label, value, onChange, options, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; options: string[]; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-[11px] font-bold text-white/50 mb-1.5 uppercase tracking-wider">{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-1 focus:ring-[#c8881f]/50 appearance-none"
        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)", color: value ? "white" : "rgba(255,255,255,0.3)" }}>
        <option value="" disabled>{placeholder ?? "Select…"}</option>
        {options.map(o => <option key={o} value={o} style={{ background: "#0a0e1a", color: "white" }}>{o}</option>)}
      </select>
    </div>
  );
}

function TextField({ label, value, onChange, placeholder, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="block text-[11px] font-bold text-white/50 mb-1.5 uppercase tracking-wider">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all focus:ring-1 focus:ring-[#c8881f]/50"
        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)" }} />
    </div>
  );
}

function HomeownerEdit({ profile, onChange }: { profile: Record<string, string>; onChange: (k: string, v: string) => void }) {
  return (
    <div className="space-y-4">
      <SelectField label="Property Type" value={profile.propertyType ?? ""} onChange={v => onChange("propertyType", v)}
        placeholder="Select…" options={["HDB", "BTO", "Resale HDB", "Condo", "Executive Condo (EC)", "Landed", "Commercial"]} />
      <SelectField label="Property Size" value={profile.propertySize ?? ""} onChange={v => onChange("propertySize", v)}
        placeholder="Select…" options={["2-Room Flexi", "3-Room", "4-Room", "5-Room", "6-Room / Jumbo", "1-Bedroom Condo", "2-Bedroom Condo", "3-Bedroom Condo", "Penthouse", "Terrace", "Semi-D", "Bungalow", "Not sure"]} />
      <SelectField label="Renovation Stage" value={profile.renovationStage ?? ""} onChange={v => onChange("renovationStage", v)}
        placeholder="Select…" options={["Just browsing ideas", "Planning & budgeting", "Ready to get quotes (within 3 months)", "Ready to start immediately", "Already renovating"]} />
      <SelectField label="Estimated Budget" value={profile.estimatedBudget ?? ""} onChange={v => onChange("estimatedBudget", v)}
        placeholder="Select…" options={["Under S$30,000", "S$30,000 – S$50,000", "S$50,000 – S$70,000", "S$70,000 – S$100,000", "S$100,000 – S$150,000", "Above S$150,000", "Not sure yet"]} />
      <SelectField label="District / Area" value={profile.district ?? ""} onChange={v => onChange("district", v)}
        placeholder="Select…" options={["Central", "North", "North-East", "East", "West", "Tampines", "Jurong", "Punggol", "Sengkang", "Bishan", "Toa Payoh", "Clementi", "Bedok", "Orchard", "Queenstown", "Marine Parade", "Other"]} />
    </div>
  );
}

function FirmEdit({ profile, onChange }: { profile: Record<string, string>; onChange: (k: string, v: string) => void }) {
  return (
    <div className="space-y-4">
      <TextField label="Firm Name" value={profile.firmName ?? ""} onChange={v => onChange("firmName", v)} placeholder="e.g. Calibrate Design Pte Ltd" />
      <TextField label="HDB / BCA License No." value={profile.licenseNumber ?? ""} onChange={v => onChange("licenseNumber", v)} placeholder="e.g. HB-12345" />
      <SelectField label="CaseTrust Accredited?" value={profile.isCaseTrust ?? ""} onChange={v => onChange("isCaseTrust", v)}
        options={["Yes — we are CaseTrust accredited", "No — not yet accredited", "In progress / applying"]} />
      <SelectField label="Primary District" value={profile.district ?? ""} onChange={v => onChange("district", v)}
        options={["Central", "North", "North-East", "East", "West", "Island-wide"]} />
      <SelectField label="Primary Design Style" value={profile.primaryStyle ?? ""} onChange={v => onChange("primaryStyle", v)}
        options={["Contemporary", "Minimalist", "Japandi", "Scandinavian", "Industrial", "Luxury", "Modern", "Peranakan", "Multiple styles"]} />
    </div>
  );
}

function BrandEdit({ profile, onChange }: { profile: Record<string, string>; onChange: (k: string, v: string) => void }) {
  return (
    <div className="space-y-4">
      <TextField label="Brand Name" value={profile.brandName ?? ""} onChange={v => onChange("brandName", v)} placeholder="e.g. Hafary Singapore" />
      <SelectField label="Product Category" value={profile.productCategory ?? ""} onChange={v => onChange("productCategory", v)}
        options={["Materials (Tiles, Laminates, Stone)", "Furniture", "Lighting", "Kitchen Appliances", "Bathroom Fittings", "Smart Home", "Flooring", "Paint & Wallpaper", "Other"]} />
      <TextField label="Website" value={profile.website ?? ""} onChange={v => onChange("website", v)} placeholder="https://yoursite.com" type="url" />
      <SelectField label="Brand Type" value={profile.brandType ?? ""} onChange={v => onChange("brandType", v)}
        options={["Manufacturer", "Distributor / Importer", "Retailer", "Manufacturer + Retailer"]} />
    </div>
  );
}

// ─── Profile info display (read-only) ────────────────────────────────────────

function HomeownerInfo({ p }: { p: Record<string, string> }) {
  return (
    <>
      <InfoRow icon={Home}    label="Property Type"     value={p.propertyType ?? ""} />
      <InfoRow icon={Home}    label="Property Size"     value={p.propertySize ?? ""} />
      <InfoRow icon={Calendar} label="Renovation Stage" value={p.renovationStage ?? ""} />
      <InfoRow icon={Banknote} label="Estimated Budget"  value={p.estimatedBudget ?? ""} />
      <InfoRow icon={MapPin}   label="District"          value={p.district ?? ""} />
    </>
  );
}

function FirmInfo({ p }: { p: Record<string, string> }) {
  return (
    <>
      <InfoRow icon={Building2} label="Firm Name"      value={p.firmName ?? ""} />
      <InfoRow icon={FileText}  label="License No."    value={p.licenseNumber ?? ""} />
      <InfoRow icon={BadgeCheck} label="CaseTrust"     value={p.isCaseTrust ?? ""} />
      <InfoRow icon={MapPin}    label="District"        value={p.district ?? ""} />
      <InfoRow icon={Sparkles}  label="Design Style"    value={p.primaryStyle ?? ""} />
    </>
  );
}

function BrandInfo({ p }: { p: Record<string, string> }) {
  return (
    <>
      <InfoRow icon={Package} label="Brand Name"         value={p.brandName ?? ""} />
      <InfoRow icon={Package} label="Category"           value={p.productCategory ?? ""} />
      <InfoRow icon={Globe}   label="Website"            value={p.website ?? ""} />
      <InfoRow icon={Building2} label="Brand Type"       value={p.brandType ?? ""} />
    </>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const ROLE_LABELS: Record<string, string> = { homeowner: "Homeowner", firm: "ID Firm", brand: "Brand" };
const ROLE_COLORS: Record<string, string> = { homeowner: "#c8881f", firm: "#60a5fa", brand: "#4ade80" };

export default function ProfileClient() {
  const router = useRouter();
  const { user, updateUser, logout } = useAuth();

  const [mounted,    setMounted]    = useState(false);
  const [editing,    setEditing]    = useState(false);
  const [editProfile, setEditProfile] = useState<Record<string, string>>({});
  const [editName,   setEditName]   = useState("");
  const [editPhone,  setEditPhone]  = useState("");
  const [saving,     setSaving]     = useState(false);
  const [saved,      setSaved]      = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !user) router.replace("/login");
  }, [mounted, user, router]);

  if (!mounted || !user) return null;
  const u = user; // narrow to non-null for closures

  const profile = u.profile ?? {};
  const roleColor = ROLE_COLORS[u.role] ?? "#c8881f";
  const memberSince = new Date(u.loginAt).toLocaleDateString("en-SG", { month: "long", year: "numeric" });

  function startEdit() {
    setEditProfile({ ...profile });
    setEditName(u.name);
    setEditPhone(u.phone ?? "");
    setEditing(true);
    setSaved(false);
  }

  function cancelEdit() {
    setEditing(false);
  }

  async function saveEdit() {
    setSaving(true);
    await new Promise(r => setTimeout(r, 600));
    updateUser({ ...u, name: editName, phone: editPhone || undefined, profile: editProfile });
    setSaving(false);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function handleLogout() {
    logout();
    router.push("/");
  }

  const hasProfile = Object.values(profile).some(Boolean);

  return (
    <div className="min-h-screen bg-[#05080f] pt-24 pb-16">
      {/* Ambient glow */}
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none -z-0"
        style={{ background: `radial-gradient(circle, ${roleColor}09 0%, transparent 65%)`, filter: "blur(80px)" }} />

      <div className="section-container relative z-10 max-w-2xl">

        {/* ── Profile header card ── */}
        <div className="rounded-3xl p-8 mb-6 relative overflow-hidden"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
          {/* Role accent line */}
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${roleColor}60, transparent)` }} />

          <div className="flex items-start gap-6">
            <div className="relative shrink-0">
              <Avatar name={u.name} picture={u.picture} id={u.id} size={80} />
              {u.authProvider === "google" && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>
                  <svg viewBox="0 0 24 24" className="w-4 h-4">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h1 className="text-2xl font-black text-white leading-tight">{u.name}</h1>
                  <p className="text-sm text-white/50 mt-1">{u.email}</p>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl shrink-0"
                  style={{ background: `${roleColor}18`, color: roleColor, border: `1px solid ${roleColor}30` }}>
                  {ROLE_LABELS[u.role]}
                </span>
              </div>

              <div className="flex flex-wrap gap-4 mt-4">
                {u.phone && (
                  <div className="flex items-center gap-1.5 text-xs text-white/40">
                    <Phone className="w-3 h-3" />
                    {u.phone}
                  </div>
                )}
                <div className="flex items-center gap-1.5 text-xs text-white/40">
                  <Calendar className="w-3 h-3" />
                  Member since {memberSince}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-white/40">
                  {u.authProvider === "google" ? (
                    <><svg viewBox="0 0 24 24" className="w-3 h-3"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>Google account</>
                  ) : (
                    <><Lock className="w-3 h-3" />Email account</>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Saved toast */}
          {saved && (
            <div className="mt-4 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-emerald-400"
              style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}>
              <Check className="w-4 h-4" />
              Profile saved successfully.
            </div>
          )}
        </div>

        {/* ── Profile details ── */}
        <SectionCard title={`${ROLE_LABELS[u.role]} Profile`}>
          {editing ? (
            <>
              {/* Edit name + phone */}
              <div className="space-y-4 mb-5 pb-5 border-b border-white/[0.06]">
                <TextField label="Display Name" value={editName} onChange={setEditName} placeholder="Your name" />
                <TextField label="Phone Number" value={editPhone} onChange={setEditPhone} placeholder="+65 9123 4567" type="tel" />
              </div>
              {/* Role profile */}
              {u.role === "homeowner" && <HomeownerEdit profile={editProfile} onChange={(k, v) => setEditProfile(p => ({ ...p, [k]: v }))} />}
              {u.role === "firm"      && <FirmEdit      profile={editProfile} onChange={(k, v) => setEditProfile(p => ({ ...p, [k]: v }))} />}
              {u.role === "brand"     && <BrandEdit     profile={editProfile} onChange={(k, v) => setEditProfile(p => ({ ...p, [k]: v }))} />}

              <div className="flex gap-3 mt-6">
                <button onClick={cancelEdit}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold text-white/50 hover:text-white/80 transition-all hover:bg-white/5"
                  style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                  <X className="w-4 h-4" /> Cancel
                </button>
                <button onClick={saveEdit} disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
                  style={{ background: "linear-gradient(135deg, #c8881f 0%, #e8a83f 100%)", color: "white" }}>
                  {saving ? (
                    <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving…</>
                  ) : (
                    <><Check className="w-4 h-4" /> Save Changes</>
                  )}
                </button>
              </div>
            </>
          ) : (
            <>
              {hasProfile ? (
                <>
                  {u.role === "homeowner" && <HomeownerInfo p={profile} />}
                  {u.role === "firm"      && <FirmInfo      p={profile} />}
                  {u.role === "brand"     && <BrandInfo     p={profile} />}
                </>
              ) : (
                <p className="text-sm text-white/30 py-2">No profile details yet.</p>
              )}
              <button onClick={startEdit}
                className="mt-5 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white/60 hover:text-white transition-all hover:bg-white/5"
                style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                <Edit3 className="w-4 h-4" />
                {hasProfile ? "Edit Profile" : "Add Profile Details"}
              </button>
            </>
          )}
        </SectionCard>

        {/* ── Quick actions (homeowner) ── */}
        {u.role === "homeowner" && (
          <div className="grid grid-cols-2 gap-4 mt-6">
            <Link href="/find-my-id"
              className="rounded-2xl p-5 flex flex-col gap-3 group transition-all hover:scale-[1.02]"
              style={{ background: "rgba(200,136,31,0.08)", border: "1px solid rgba(200,136,31,0.2)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(200,136,31,0.15)" }}>
                <Sparkles className="w-5 h-5 text-[#c8881f]" />
              </div>
              <div>
                <p className="text-sm font-bold text-white group-hover:text-[#c8881f] transition-colors">Find My ID</p>
                <p className="text-xs text-white/40 mt-0.5">Get matched with the right designer</p>
              </div>
            </Link>
            <Link href="/inspirations"
              className="rounded-2xl p-5 flex flex-col gap-3 group transition-all hover:scale-[1.02]"
              style={{ background: "rgba(96,165,250,0.06)", border: "1px solid rgba(96,165,250,0.15)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(96,165,250,0.12)" }}>
                <Home className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">Inspirations</p>
                <p className="text-xs text-white/40 mt-0.5">Browse real renovation projects</p>
              </div>
            </Link>
          </div>
        )}

        {/* ── Account ── */}
        <div className="mt-6">
          <SectionCard title="Account">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(239,68,68,0.1)" }}>
                  <LogOut className="w-3.5 h-3.5 text-red-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white/80">Sign Out</p>
                  <p className="text-xs text-white/35">Signed in as {u.email}</p>
                </div>
              </div>
              <button onClick={handleLogout}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-red-400/80 hover:text-red-400 transition-all hover:bg-red-500/8"
                style={{ border: "1px solid rgba(239,68,68,0.2)" }}>
                Sign Out
              </button>
            </div>
          </SectionCard>
        </div>

      </div>
    </div>
  );
}
