"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, Home, Building2, Package, MapPin, Banknote, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

// ─── Shared helpers ───────────────────────────────────────────────────────────

function Select({ value, onChange, options, placeholder }: {
  value: string; onChange: (v: string) => void; options: string[]; placeholder?: string;
}) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}
      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-1 focus:ring-[#c8881f]/50 appearance-none cursor-pointer"
      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)", color: value ? "white" : "rgba(255,255,255,0.3)" }}>
      <option value="" disabled>{placeholder ?? "Select…"}</option>
      {options.map(o => <option key={o} value={o} style={{ background: "#0a0e1a", color: "white" }}>{o}</option>)}
    </select>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-[11px] font-bold text-white/50 mb-1.5 uppercase tracking-wider">{children}</label>;
}

// ─── Role-specific forms ──────────────────────────────────────────────────────

function HomeownerForm({ data, onChange }: { data: Record<string, string>; onChange: (k: string, v: string) => void }) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Property Type</Label>
        <Select value={data.propertyType ?? ""} onChange={v => onChange("propertyType", v)}
          placeholder="What type of home?" options={["HDB", "BTO", "Resale HDB", "Condo", "Executive Condo (EC)", "Landed", "Commercial"]} />
      </div>
      <div>
        <Label>Property Size</Label>
        <Select value={data.propertySize ?? ""} onChange={v => onChange("propertySize", v)}
          placeholder="Select size" options={["2-Room Flexi", "3-Room", "4-Room", "5-Room", "6-Room / Jumbo", "1-Bedroom Condo", "2-Bedroom Condo", "3-Bedroom Condo", "Penthouse", "Terrace", "Semi-D", "Bungalow", "Not sure"]} />
      </div>
      <div>
        <Label>Renovation Stage</Label>
        <Select value={data.renovationStage ?? ""} onChange={v => onChange("renovationStage", v)}
          placeholder="Where are you now?" options={["Just browsing ideas", "Planning & budgeting", "Ready to get quotes (within 3 months)", "Ready to start immediately", "Already renovating"]} />
      </div>
      <div>
        <Label>Estimated Budget</Label>
        <Select value={data.estimatedBudget ?? ""} onChange={v => onChange("estimatedBudget", v)}
          placeholder="Budget range" options={["Under S$30,000", "S$30,000 – S$50,000", "S$50,000 – S$70,000", "S$70,000 – S$100,000", "S$100,000 – S$150,000", "Above S$150,000", "Not sure yet"]} />
      </div>
      <div>
        <Label>District / Area</Label>
        <Select value={data.district ?? ""} onChange={v => onChange("district", v)}
          placeholder="Your area" options={["Central", "North", "North-East", "East", "West", "Tampines", "Jurong", "Punggol", "Sengkang", "Bishan", "Toa Payoh", "Clementi", "Bedok", "Orchard", "Queenstown", "Marine Parade", "Other"]} />
      </div>
    </div>
  );
}

function FirmForm({ data, onChange }: { data: Record<string, string>; onChange: (k: string, v: string) => void }) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Firm Name</Label>
        <input value={data.firmName ?? ""} onChange={e => onChange("firmName", e.target.value)} placeholder="e.g. Calibrate Design Pte Ltd"
          className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all focus:ring-1 focus:ring-[#c8881f]/50"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)" }} />
      </div>
      <div>
        <Label>HDB / BCA License No.</Label>
        <input value={data.licenseNumber ?? ""} onChange={e => onChange("licenseNumber", e.target.value)} placeholder="e.g. HB-12345"
          className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all focus:ring-1 focus:ring-[#c8881f]/50"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)" }} />
      </div>
      <div>
        <Label>CaseTrust Accredited?</Label>
        <Select value={data.isCaseTrust ?? ""} onChange={v => onChange("isCaseTrust", v)}
          options={["Yes — we are CaseTrust accredited", "No — not yet accredited", "In progress / applying"]} />
      </div>
      <div>
        <Label>Primary District</Label>
        <Select value={data.district ?? ""} onChange={v => onChange("district", v)}
          options={["Central", "North", "North-East", "East", "West", "Island-wide"]} />
      </div>
      <div>
        <Label>Primary Design Style</Label>
        <Select value={data.primaryStyle ?? ""} onChange={v => onChange("primaryStyle", v)}
          options={["Contemporary", "Minimalist", "Japandi", "Scandinavian", "Industrial", "Luxury", "Modern", "Peranakan", "Multiple styles"]} />
      </div>
    </div>
  );
}

function BrandForm({ data, onChange }: { data: Record<string, string>; onChange: (k: string, v: string) => void }) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Brand Name</Label>
        <input value={data.brandName ?? ""} onChange={e => onChange("brandName", e.target.value)} placeholder="e.g. Hafary Singapore"
          className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all focus:ring-1 focus:ring-[#c8881f]/50"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)" }} />
      </div>
      <div>
        <Label>Product Category</Label>
        <Select value={data.productCategory ?? ""} onChange={v => onChange("productCategory", v)}
          options={["Materials (Tiles, Laminates, Stone)", "Furniture", "Lighting", "Kitchen Appliances", "Bathroom Fittings", "Smart Home", "Flooring", "Paint & Wallpaper", "Other"]} />
      </div>
      <div>
        <Label>Website</Label>
        <input value={data.website ?? ""} onChange={e => onChange("website", e.target.value)} placeholder="https://yoursite.com" type="url"
          className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all focus:ring-1 focus:ring-[#c8881f]/50"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)" }} />
      </div>
      <div>
        <Label>Brand Type</Label>
        <Select value={data.brandType ?? ""} onChange={v => onChange("brandType", v)}
          options={["Manufacturer", "Distributor / Importer", "Retailer", "Manufacturer + Retailer"]} />
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

const ROLE_CONFIG = {
  homeowner: { icon: Home,      color: "#c8881f", label: "Homeowner",     subtitle: "Tell us about your renovation project so we can personalise your matches." },
  firm:      { icon: Building2, color: "#60a5fa", label: "ID Firm",        subtitle: "Set up your firm profile. Our team reviews listings before they go live." },
  brand:     { icon: Package,   color: "#4ade80", label: "Material Brand", subtitle: "Complete your brand details so homeowners and designers can discover you." },
};

export default function OnboardingClient() {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const [profile, setProfile] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  // Redirect if no pending onboarding
  useEffect(() => {
    if (user && !user.needsOnboarding) router.replace("/");
    if (!user) router.replace("/login");
  }, [user, router]);

  if (!user) return null;
  const u = user; // narrow to non-null for closures

  const cfg = ROLE_CONFIG[u.role] ?? ROLE_CONFIG.homeowner;
  const RoleIcon = cfg.icon;

  function setField(k: string, v: string) {
    setProfile(p => ({ ...p, [k]: v }));
  }

  async function handleSubmit() {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    updateUser({ ...u, profile, needsOnboarding: false });
    setLoading(false);
    setDone(true);
    setTimeout(() => router.push("/"), 1800);
  }

  if (done) {
    return (
      <div className="min-h-screen bg-[#05080f] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 relative"
            style={{ background: `${cfg.color}18`, border: `1px solid ${cfg.color}40` }}>
            <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: `${cfg.color}30` }} />
            <CheckCircle2 className="w-9 h-9" style={{ color: cfg.color }} />
          </div>
          <h2 className="text-2xl font-black text-white mb-2">You&apos;re all set!</h2>
          <p className="text-white/50 text-sm">Taking you to HomeMatch…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05080f] flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${cfg.color}12 0%, transparent 65%)`, filter: "blur(80px)" }} />

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-3xl flex items-center justify-center mb-5"
            style={{ background: `${cfg.color}18`, border: `1px solid ${cfg.color}30`, boxShadow: `0 8px 32px ${cfg.color}20` }}>
            <RoleIcon className="w-7 h-7" style={{ color: cfg.color }} />
          </div>
          {u.picture && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={u.picture} alt={u.name} className="w-12 h-12 rounded-full border-2 -mt-3 mb-4"
              style={{ borderColor: cfg.color + "60" }} />
          )}
          <h1 className="text-2xl font-black text-white text-center">
            Welcome, {u.name.split(" ")[0]}!
          </h1>
          <p className="text-sm text-white/45 mt-2 text-center max-w-xs leading-relaxed">{cfg.subtitle}</p>
        </div>

        {/* Form card */}
        <div className="rounded-2xl p-7"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", backdropFilter: "blur(20px)" }}>
          <p className="text-[11px] font-bold text-white/40 uppercase tracking-widest mb-5">
            {cfg.label} Profile
          </p>

          {u.role === "homeowner" && <HomeownerForm data={profile} onChange={setField} />}
          {u.role === "firm"      && <FirmForm      data={profile} onChange={setField} />}
          {u.role === "brand"     && <BrandForm     data={profile} onChange={setField} />}

          <button onClick={handleSubmit} disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm mt-6 transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ background: "linear-gradient(135deg, #c8881f 0%, #e8a83f 100%)", color: "white", boxShadow: "0 4px 16px rgba(200,136,31,0.3)" }}>
            {loading ? (
              <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving…</>
            ) : (
              <>Complete Profile <ArrowRight className="w-4 h-4" /></>
            )}
          </button>

          <button onClick={() => { updateUser({ ...u, needsOnboarding: false }); router.push("/"); }}
            className="w-full text-center text-xs text-white/30 hover:text-white/50 transition-colors mt-3 py-1">
            Skip for now
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 mt-5">
          <Sparkles className="w-3.5 h-3.5 text-[#c8881f]/50" />
          <span className="text-xs text-white/25">You can always update this later in your profile</span>
        </div>
      </div>
    </div>
  );
}
