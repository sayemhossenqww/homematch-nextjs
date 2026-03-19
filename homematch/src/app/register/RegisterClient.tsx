"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles, User, Building2, Package, Mail, Lock, Eye, EyeOff,
  Phone, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle,
  Home, Layers, MapPin, Banknote, Calendar, FileText, Globe,
} from "lucide-react";
import { persistUser, type HmUser } from "@/lib/auth";
import { googleEnabled } from "@/components/auth/GoogleAuthProvider";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
import { useAuth } from "@/context/AuthContext";

// ─── Types ────────────────────────────────────────────────────────────────────

type AccountType = "homeowner" | "firm" | "brand";

interface BasicInfo {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface HomeownerProfile {
  propertyType: string;
  propertySize: string;
  renovationStage: string;
  estimatedBudget: string;
  district: string;
}

interface FirmProfile {
  firmName: string;
  licenseNumber: string;
  isCaseTrust: string;
  district: string;
  primaryStyle: string;
}

interface BrandProfile {
  brandName: string;
  productCategory: string;
  website: string;
  brandType: string;
}

const INITIAL_BASIC: BasicInfo = { fullName: "", email: "", phone: "", password: "", confirmPassword: "" };
const INITIAL_HOMEOWNER: HomeownerProfile = { propertyType: "", propertySize: "", renovationStage: "", estimatedBudget: "", district: "" };
const INITIAL_FIRM: FirmProfile = { firmName: "", licenseNumber: "", isCaseTrust: "", district: "", primaryStyle: "" };
const INITIAL_BRAND: BrandProfile = { brandName: "", productCategory: "", website: "", brandType: "" };

// ─── Validation ───────────────────────────────────────────────────────────────

function validateBasic(f: BasicInfo) {
  const e: Partial<Record<keyof BasicInfo, string>> = {};
  if (!f.fullName.trim()) e.fullName = "Full name is required.";
  if (!f.email.trim()) e.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Enter a valid email.";
  if (f.phone && !/^[+\d\s()-]{8,15}$/.test(f.phone)) e.phone = "Enter a valid phone number.";
  if (!f.password) e.password = "Password is required.";
  else if (f.password.length < 8) e.password = "Must be at least 8 characters.";
  if (!f.confirmPassword) e.confirmPassword = "Please confirm your password.";
  else if (f.password !== f.confirmPassword) e.confirmPassword = "Passwords do not match.";
  return e;
}

// ─── Password strength ────────────────────────────────────────────────────────

function passwordStrength(pw: string): { score: number; label: string; color: string } {
  if (!pw) return { score: 0, label: "", color: "" };
  let score = 0;
  if (pw.length >= 8)  score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { score, label: "Weak",   color: "#ef4444" };
  if (score <= 3) return { score, label: "Fair",   color: "#f59e0b" };
  if (score <= 4) return { score, label: "Good",   color: "#3b82f6" };
  return                { score, label: "Strong", color: "#22c55e" };
}

// ─── Shared input component ───────────────────────────────────────────────────

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[11px] font-bold text-white/50 mb-1.5 uppercase tracking-wider">{label}</label>
      {children}
      {error && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle className="w-3 h-3 shrink-0" />{error}</p>}
    </div>
  );
}

function TextInput({ value, onChange, placeholder, type = "text", icon: Icon, suffix, error, autoComplete }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
  icon?: React.ElementType; suffix?: React.ReactNode; error?: string; autoComplete?: string;
}) {
  return (
    <div className="relative">
      {Icon && <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />}
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder} autoComplete={autoComplete}
        className="w-full py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all focus:ring-1 focus:ring-[#c8881f]/50"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: `1px solid ${error ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.09)"}`,
          paddingLeft: Icon ? "2.625rem" : "1rem",
          paddingRight: suffix ? "2.625rem" : "1rem",
        }}
      />
      {suffix && <div className="absolute right-3.5 top-1/2 -translate-y-1/2">{suffix}</div>}
    </div>
  );
}

function SelectInput({ value, onChange, options, placeholder, error }: {
  value: string; onChange: (v: string) => void; options: string[]; placeholder?: string; error?: string;
}) {
  return (
    <select
      value={value} onChange={e => onChange(e.target.value)}
      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-1 focus:ring-[#c8881f]/50 appearance-none cursor-pointer"
      style={{
        background: "rgba(255,255,255,0.06)",
        border: `1px solid ${error ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.09)"}`,
        color: value ? "white" : "rgba(255,255,255,0.25)",
      }}>
      <option value="" disabled>{placeholder ?? "Select…"}</option>
      {options.map(o => <option key={o} value={o} style={{ background: "#0a0e1a", color: "white" }}>{o}</option>)}
    </select>
  );
}

// ─── Step components ──────────────────────────────────────────────────────────

function StepTypeSelect({ selected, onSelect }: { selected: AccountType | null; onSelect: (t: AccountType) => void }) {
  const types: { key: AccountType; icon: React.ElementType; label: string; desc: string; color: string }[] = [
    { key: "homeowner", icon: Home,      label: "Homeowner",           desc: "I'm renovating my HDB, condo, or landed home",    color: "#c8881f" },
    { key: "firm",      icon: Building2, label: "Interior Design Firm", desc: "I'm an ID firm looking to list on HomeMatch",      color: "#60a5fa" },
    { key: "brand",     icon: Package,   label: "Material Brand",       desc: "I'm a supplier or brand wanting brand exposure",   color: "#4ade80" },
  ];

  return (
    <div className="space-y-3">
      {types.map(({ key, icon: Icon, label, desc, color }) => (
        <button key={key} type="button" onClick={() => onSelect(key)}
          className="w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-200 hover:scale-[1.01]"
          style={{
            background: selected === key ? `${color}12` : "rgba(255,255,255,0.04)",
            border: `1px solid ${selected === key ? `${color}40` : "rgba(255,255,255,0.08)"}`,
            boxShadow: selected === key ? `0 0 0 1px ${color}30` : "none",
          }}>
          <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: `${color}18`, border: `1px solid ${color}25` }}>
            <Icon className="w-5 h-5" style={{ color }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white">{label}</p>
            <p className="text-xs text-white/45 mt-0.5 leading-snug">{desc}</p>
          </div>
          <div className="w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all"
            style={{ borderColor: selected === key ? color : "rgba(255,255,255,0.2)", background: selected === key ? color : "transparent" }}>
            {selected === key && <CheckCircle2 className="w-3 h-3 text-white" />}
          </div>
        </button>
      ))}
    </div>
  );
}

function StepBasicInfo({ form, setForm, errors }: {
  form: BasicInfo;
  setForm: (f: BasicInfo) => void;
  errors: Partial<Record<keyof BasicInfo, string>>;
}) {
  const [showPw, setShowPw]   = useState(false);
  const [showCpw, setShowCpw] = useState(false);
  const set = (k: keyof BasicInfo, v: string) => setForm({ ...form, [k]: v });
  const pw  = passwordStrength(form.password);

  return (
    <div className="space-y-4">
      <Field label="Full Name" error={errors.fullName}>
        <TextInput value={form.fullName} onChange={v => set("fullName", v)} placeholder="Jane Tan" icon={User} autoComplete="name" error={errors.fullName} />
      </Field>
      <Field label="Email Address" error={errors.email}>
        <TextInput value={form.email} onChange={v => set("email", v)} placeholder="jane@example.com" type="email" icon={Mail} autoComplete="email" error={errors.email} />
      </Field>
      <Field label="Phone Number (optional)" error={errors.phone}>
        <TextInput value={form.phone} onChange={v => set("phone", v)} placeholder="+65 9123 4567" type="tel" icon={Phone} autoComplete="tel" error={errors.phone} />
      </Field>
      <Field label="Password" error={errors.password}>
        <TextInput
          value={form.password} onChange={v => set("password", v)}
          placeholder="Min. 8 characters" type={showPw ? "text" : "password"}
          icon={Lock} autoComplete="new-password" error={errors.password}
          suffix={
            <button type="button" onClick={() => setShowPw(v => !v)} className="text-white/30 hover:text-white/60 transition-colors">
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
        />
        {form.password && (
          <div className="mt-2">
            <div className="flex gap-1 mb-1">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="h-1 flex-1 rounded-full transition-all duration-300"
                  style={{ background: i <= pw.score ? pw.color : "rgba(255,255,255,0.1)" }} />
              ))}
            </div>
            <p className="text-[11px]" style={{ color: pw.color }}>{pw.label}</p>
          </div>
        )}
      </Field>
      <Field label="Confirm Password" error={errors.confirmPassword}>
        <TextInput
          value={form.confirmPassword} onChange={v => set("confirmPassword", v)}
          placeholder="Re-enter password" type={showCpw ? "text" : "password"}
          icon={Lock} autoComplete="new-password" error={errors.confirmPassword}
          suffix={
            <button type="button" onClick={() => setShowCpw(v => !v)} className="text-white/30 hover:text-white/60 transition-colors">
              {showCpw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
        />
      </Field>
    </div>
  );
}

function StepProfileHomeowner({ form, setForm }: { form: HomeownerProfile; setForm: (f: HomeownerProfile) => void }) {
  const set = (k: keyof HomeownerProfile, v: string) => setForm({ ...form, [k]: v });
  return (
    <div className="space-y-4">
      <p className="text-xs text-white/40 -mt-1 mb-2 leading-relaxed">Optional — helps us personalise your HomeMatch experience.</p>
      <Field label="Property Type">
        <SelectInput value={form.propertyType} onChange={v => set("propertyType", v)}
          placeholder="Select property type"
          options={["HDB", "BTO", "Resale HDB", "Condo", "Executive Condo (EC)", "Landed", "Commercial"]} />
      </Field>
      <Field label="Property Size">
        <SelectInput value={form.propertySize} onChange={v => set("propertySize", v)}
          placeholder="Select size"
          options={["2-Room Flexi", "3-Room", "4-Room", "5-Room", "6-Room / Jumbo", "1-Bedroom Condo", "2-Bedroom Condo", "3-Bedroom Condo", "Penthouse", "Terrace", "Semi-D", "Bungalow", "Not sure"]} />
      </Field>
      <Field label="Renovation Stage">
        <SelectInput value={form.renovationStage} onChange={v => set("renovationStage", v)}
          placeholder="Where are you now?"
          options={["Just browsing ideas", "Planning & budgeting", "Ready to get quotes (within 3 months)", "Ready to start immediately", "Already renovating"]} />
      </Field>
      <Field label="Estimated Budget">
        <SelectInput value={form.estimatedBudget} onChange={v => set("estimatedBudget", v)}
          placeholder="Budget range"
          options={["Under S$30,000", "S$30,000 – S$50,000", "S$50,000 – S$70,000", "S$70,000 – S$100,000", "S$100,000 – S$150,000", "Above S$150,000", "Not sure yet"]} />
      </Field>
      <Field label="District / Area">
        <SelectInput value={form.district} onChange={v => set("district", v)}
          placeholder="Your area"
          options={["Central", "North", "North-East", "East", "West", "Tampines", "Jurong", "Punggol", "Sengkang", "Bishan", "Toa Payoh", "Clementi", "Bedok", "Orchard", "Queenstown", "Marine Parade", "Other"]} />
      </Field>
    </div>
  );
}

function StepProfileFirm({ form, setForm }: { form: FirmProfile; setForm: (f: FirmProfile) => void }) {
  const set = (k: keyof FirmProfile, v: string) => setForm({ ...form, [k]: v });
  return (
    <div className="space-y-4">
      <p className="text-xs text-white/40 -mt-1 mb-2 leading-relaxed">Your firm profile details — reviewed by our team before going live.</p>
      <Field label="Firm Name">
        <TextInput value={form.firmName} onChange={v => set("firmName", v)} placeholder="e.g. Calibrate Design Pte Ltd" icon={Building2} />
      </Field>
      <Field label="HDB Renovation License / BCA Registration No.">
        <TextInput value={form.licenseNumber} onChange={v => set("licenseNumber", v)} placeholder="e.g. HB-12345" icon={FileText} />
      </Field>
      <Field label="CaseTrust Accredited?">
        <SelectInput value={form.isCaseTrust} onChange={v => set("isCaseTrust", v)}
          placeholder="Select…"
          options={["Yes — we are CaseTrust accredited", "No — not yet accredited", "In progress / applying"]} />
      </Field>
      <Field label="Primary Operating District">
        <SelectInput value={form.district} onChange={v => set("district", v)}
          placeholder="Main area served"
          options={["Central", "North", "North-East", "East", "West", "Island-wide"]} />
      </Field>
      <Field label="Primary Design Style">
        <SelectInput value={form.primaryStyle} onChange={v => set("primaryStyle", v)}
          placeholder="Primary style"
          options={["Contemporary", "Minimalist", "Japandi", "Scandinavian", "Industrial", "Luxury", "Modern", "Peranakan", "Multiple styles"]} />
      </Field>
    </div>
  );
}

function StepProfileBrand({ form, setForm }: { form: BrandProfile; setForm: (f: BrandProfile) => void }) {
  const set = (k: keyof BrandProfile, v: string) => setForm({ ...form, [k]: v });
  return (
    <div className="space-y-4">
      <p className="text-xs text-white/40 -mt-1 mb-2 leading-relaxed">Brand profile details — our team will contact you within 2 business days.</p>
      <Field label="Brand Name">
        <TextInput value={form.brandName} onChange={v => set("brandName", v)} placeholder="e.g. Hafary Singapore" icon={Package} />
      </Field>
      <Field label="Product Category">
        <SelectInput value={form.productCategory} onChange={v => set("productCategory", v)}
          placeholder="Select category"
          options={["Materials (Tiles, Laminates, Stone)", "Furniture", "Lighting", "Kitchen Appliances", "Bathroom Fittings", "Smart Home", "Flooring", "Paint & Wallpaper", "Other"]} />
      </Field>
      <Field label="Website">
        <TextInput value={form.website} onChange={v => set("website", v)} placeholder="https://yoursite.com" type="url" icon={Globe} />
      </Field>
      <Field label="Brand Type">
        <SelectInput value={form.brandType} onChange={v => set("brandType", v)}
          placeholder="Select type"
          options={["Manufacturer", "Distributor / Importer", "Retailer", "Manufacturer + Retailer"]} />
      </Field>
    </div>
  );
}

// ─── Step indicator ───────────────────────────────────────────────────────────

function StepDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2 justify-center mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="transition-all duration-300 rounded-full"
          style={{
            width:  i === current ? 24 : 8,
            height: 8,
            background: i < current  ? "#c8881f" :
                        i === current ? "linear-gradient(90deg,#c8881f,#e8a83f)" :
                        "rgba(255,255,255,0.15)",
          }} />
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function RegisterClient() {
  const router = useRouter();
  const { user } = useAuth();

  // Already logged in → go to profile
  useEffect(() => {
    if (user) router.replace("/profile");
  }, [user, router]);

  const [step,        setStep]      = useState(0); // 0 = type, 1 = basic, 2 = profile, 3 = success
  const [acctType,    setAcctType]  = useState<AccountType | null>(null);
  const [basic,       setBasic]     = useState<BasicInfo>(INITIAL_BASIC);
  const [hwProfile,   setHwProfile] = useState<HomeownerProfile>(INITIAL_HOMEOWNER);
  const [firmProfile, setFirmProfile] = useState<FirmProfile>(INITIAL_FIRM);
  const [brandProfile, setBrandProfile] = useState<BrandProfile>(INITIAL_BRAND);
  const [basicErrors, setBasicErrors] = useState<Partial<Record<keyof BasicInfo, string>>>({});
  const [loading,     setLoading]   = useState(false);
  const [agreed,      setAgreed]    = useState(false);
  const [googleAuthError, setGoogleAuthError] = useState("");

  const STEP_TITLES = ["Create account", "Your details", "Profile setup", "All set!"];

  function nextStep() {
    if (step === 0) {
      if (!acctType) return;
      setStep(1);
    } else if (step === 1) {
      const errs = validateBasic(basic);
      if (Object.keys(errs).length) { setBasicErrors(errs); return; }
      setBasicErrors({});
      setStep(2);
    } else if (step === 2) {
      submitForm();
    }
  }

  async function submitForm() {
    if (!agreed) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400));

    // Mock registration — replace with real API call:
    // const res = await fetch('/api/auth/register', { method: 'POST', body: JSON.stringify({...}) })
    const profile = acctType === "homeowner" ? hwProfile : acctType === "firm" ? firmProfile : brandProfile;
    const mockUser: HmUser = {
      id: "u_" + Math.random().toString(36).slice(2),
      email: basic.email,
      name: basic.fullName,
      phone: basic.phone,
      role: acctType ?? "homeowner",
      authProvider: "email",
      loginAt: new Date().toISOString(),
      profile: profile as unknown as Record<string, string>,
    };
    persistUser(mockUser);

    setLoading(false);
    setStep(3);
  }

  const typeLabel: Record<AccountType, string> = { homeowner: "Homeowner", firm: "Interior Design Firm", brand: "Material Brand" };

  return (
    <div className="min-h-screen bg-[#05080f] flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">

      {/* Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(200,136,31,0.06) 0%, transparent 65%)", filter: "blur(80px)" }} />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(96,165,250,0.05) 0%, transparent 65%)", filter: "blur(80px)" }} />

      <div className="w-full max-w-md relative z-10">

        {/* Logo */}
        <div className="flex flex-col items-center mb-7">
          <Link href="/" className="flex items-center gap-3 group mb-5">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all group-hover:scale-105"
              style={{ background: "linear-gradient(135deg, #c8881f 0%, #e8a83f 100%)", boxShadow: "0 4px 20px rgba(200,136,31,0.35)" }}>
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-white tracking-tight leading-none block">HomeMatch</span>
              <span className="text-[10px] font-medium text-white/40 tracking-widest uppercase">Singapore</span>
            </div>
          </Link>
          {step < 3 && (
            <>
              <StepDots current={step} total={3} />
              <h1 className="text-2xl font-black text-white text-center">{STEP_TITLES[step]}</h1>
              <p className="text-sm text-white/45 mt-1.5 text-center">
                {step === 0 && "Choose your account type to get started"}
                {step === 1 && "Enter your login details"}
                {step === 2 && acctType && `Set up your ${typeLabel[acctType]} profile`}
              </p>
            </>
          )}
        </div>

        {/* ── Step 0: Account type ── */}
        {step === 0 && (
          <div className="rounded-2xl p-7"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", backdropFilter: "blur(20px)" }}>
            <StepTypeSelect selected={acctType} onSelect={setAcctType} />
            <button onClick={nextStep} disabled={!acctType}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm mt-6 transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: "linear-gradient(135deg, #c8881f 0%, #e8a83f 100%)", color: "white", boxShadow: "0 4px 16px rgba(200,136,31,0.3)" }}>
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ── Step 1: Basic info ── */}
        {step === 1 && (
          <div className="rounded-2xl p-7"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", backdropFilter: "blur(20px)" }}>

            {/* Google quick-register — only mounted when provider is available */}
            {googleEnabled && (
              <>
                {googleAuthError && (
                  <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl mb-4 text-sm text-red-400"
                    style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {googleAuthError}
                  </div>
                )}
                <div className="mb-4">
                  <GoogleLoginButton
                    role={acctType === "firm" ? "firm" : acctType === "brand" ? "brand" : "homeowner"}
                    isNew={true}
                    onStart={() => { setLoading(true); setGoogleAuthError(""); }}
                    onSuccess={() => router.push("/onboarding")}
                    onError={(msg) => { setGoogleAuthError(msg); setLoading(false); }}
                  />
                </div>
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-3 text-[11px] text-white/30" style={{ background: "#0c1120" }}>or continue with email</span>
                  </div>
                </div>
              </>
            )}

            <StepBasicInfo form={basic} setForm={setBasic} errors={basicErrors} />
            <div className="flex gap-3 mt-6">
              <button onClick={() => setStep(0)}
                className="flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl text-sm font-semibold text-white/60 transition-all hover:text-white/90 hover:bg-white/5"
                style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button onClick={nextStep}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90 active:scale-[0.98]"
                style={{ background: "linear-gradient(135deg, #c8881f 0%, #e8a83f 100%)", color: "white", boxShadow: "0 4px 16px rgba(200,136,31,0.3)" }}>
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ── Step 2: Profile ── */}
        {step === 2 && acctType && (
          <div className="rounded-2xl p-7"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", backdropFilter: "blur(20px)" }}>
            {acctType === "homeowner" && <StepProfileHomeowner form={hwProfile}     setForm={setHwProfile} />}
            {acctType === "firm"      && <StepProfileFirm      form={firmProfile}   setForm={setFirmProfile} />}
            {acctType === "brand"     && <StepProfileBrand     form={brandProfile}  setForm={setBrandProfile} />}

            {/* Terms */}
            <label className="flex items-start gap-3 mt-5 cursor-pointer group">
              <div
                onClick={() => setAgreed(v => !v)}
                className="w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 transition-all cursor-pointer"
                style={{
                  background: agreed ? "#c8881f" : "rgba(255,255,255,0.06)",
                  border: `1px solid ${agreed ? "#c8881f" : "rgba(255,255,255,0.15)"}`,
                }}>
                {agreed && <CheckCircle2 className="w-3 h-3 text-white" />}
              </div>
              <span className="text-xs text-white/45 leading-relaxed select-none">
                I agree to HomeMatch&apos;s{" "}
                <Link href="/terms" target="_blank" className="text-[#c8881f] hover:underline font-semibold">Terms of Service</Link>
                {" "}and{" "}
                <Link href="/privacy" target="_blank" className="text-[#c8881f] hover:underline font-semibold">Privacy Policy</Link>.
              </span>
            </label>

            <div className="flex gap-3 mt-5">
              <button onClick={() => setStep(1)}
                className="flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl text-sm font-semibold text-white/60 transition-all hover:text-white/90 hover:bg-white/5"
                style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button onClick={nextStep} disabled={!agreed || loading}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: "linear-gradient(135deg, #c8881f 0%, #e8a83f 100%)", color: "white", boxShadow: "0 4px 16px rgba(200,136,31,0.3)" }}>
                {loading ? (
                  <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating account…</>
                ) : (
                  <><CheckCircle2 className="w-4 h-4" /> Create Account</>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ── Step 3: Success ── */}
        {step === 3 && (
          <div className="rounded-2xl p-8 text-center"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", backdropFilter: "blur(20px)" }}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 relative"
              style={{ background: "rgba(200,136,31,0.12)", border: "1px solid rgba(200,136,31,0.3)" }}>
              <div className="absolute inset-0 rounded-full animate-ping opacity-30"
                style={{ background: "rgba(200,136,31,0.2)" }} />
              <CheckCircle2 className="w-9 h-9 text-[#c8881f]" />
            </div>
            <h2 className="text-2xl font-black text-white mb-2">Account created!</h2>
            <p className="text-white/50 text-sm mb-2 leading-relaxed">
              Welcome to HomeMatch, <span className="text-white font-semibold">{basic.fullName.split(" ")[0]}</span>.
            </p>
            {acctType === "homeowner" && (
              <p className="text-white/40 text-xs mb-7 leading-relaxed">
                Start exploring real Singapore renovation projects and find your perfect interior designer — free.
              </p>
            )}
            {acctType === "firm" && (
              <p className="text-white/40 text-xs mb-7 leading-relaxed">
                Our team will review your firm profile within 1–2 business days. We&apos;ll email you once it&apos;s approved and live.
              </p>
            )}
            {acctType === "brand" && (
              <p className="text-white/40 text-xs mb-7 leading-relaxed">
                Our partnerships team will reach out within 2 business days to complete your brand listing.
              </p>
            )}

            <div className="space-y-3">
              {acctType === "homeowner" && (
                <button onClick={() => router.push("/find-my-id")}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #c8881f 0%, #e8a83f 100%)", color: "white", boxShadow: "0 4px 16px rgba(200,136,31,0.3)" }}>
                  Find My Interior Designer <ArrowRight className="w-4 h-4" />
                </button>
              )}
              <button onClick={() => router.push("/profile")}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm text-white/60 transition-all hover:text-white/90 hover:bg-white/5"
                style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                Go to My Profile
              </button>
            </div>
          </div>
        )}

        {/* Login link */}
        {step < 3 && (
          <p className="text-center text-sm text-white/40 mt-5">
            Already have an account?{" "}
            <Link href="/login" className="text-[#c8881f] font-bold hover:underline">Sign in →</Link>
          </p>
        )}
      </div>
    </div>
  );
}
