"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight,
  Building2, User, AlertCircle, CheckCircle2,
} from "lucide-react";
import { persistUser, type HmUser } from "@/lib/auth";
import { googleEnabled } from "@/components/auth/GoogleAuthProvider";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
import { useAuth } from "@/context/AuthContext";

type Tab = "homeowner" | "firm";

interface FormState {
  email: string;
  password: string;
  remember: boolean;
}

const INITIAL: FormState = { email: "", password: "", remember: false };

function validate(form: FormState): Partial<Record<keyof FormState, string>> {
  const errors: Partial<Record<keyof FormState, string>> = {};
  if (!form.email.trim()) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Enter a valid email address.";
  if (!form.password) errors.password = "Password is required.";
  else if (form.password.length < 6) errors.password = "Password must be at least 6 characters.";
  return errors;
}

export default function LoginClient() {
  const router = useRouter();
  const { user } = useAuth();

  // Already logged in → go to profile
  useEffect(() => {
    if (user) router.replace("/profile");
  }, [user, router]);

  const [tab, setTab]           = useState<Tab>("homeowner");
  const [form, setForm]         = useState<FormState>(INITIAL);
  const [errors, setErrors]     = useState<Partial<Record<keyof FormState, string>>>({});
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [authError, setAuthError] = useState("");

  function set(field: keyof FormState, value: string | boolean) {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: undefined }));
    setAuthError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));

    // Mock auth — replace with: await fetch('/api/auth/login', { method:'POST', ... })
    const mockUser: HmUser = {
      id: "u_" + Math.random().toString(36).slice(2),
      email: form.email,
      name: form.email.split("@")[0],
      role: tab === "firm" ? "firm" : "homeowner",
      authProvider: "email",
      loginAt: new Date().toISOString(),
    };
    persistUser(mockUser);
    if (form.remember) {
      try { localStorage.setItem("hm_remember", "1"); } catch { /* noop */ }
    }

    setLoading(false);
    router.push("/profile");
  }

  const inputClass = (field: keyof FormState) =>
    `w-full py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all ${
      errors[field]
        ? "ring-1 ring-red-500/60"
        : "focus:ring-1 focus:ring-[#c8881f]/50"
    }`;

  const destination = "/profile";

  return (
    <div className="min-h-screen bg-[#05080f] flex flex-col items-center justify-center px-4 py-24 relative overflow-hidden">

      {/* Ambient glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(200,136,31,0.07) 0%, transparent 65%)", filter: "blur(80px)" }} />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(26,58,92,0.4) 0%, transparent 65%)", filter: "blur(60px)" }} />

      <div className="w-full max-w-md relative z-10">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
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
          <h1 className="text-2xl font-black text-white text-center">Welcome back</h1>
          <p className="text-sm text-white/45 mt-1.5 text-center">Sign in to your HomeMatch account</p>
        </div>

        {/* Tab switcher */}
        <div className="flex rounded-xl p-1 mb-6"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
          {([["homeowner", "Homeowner", User], ["firm", "ID Firm / Brand", Building2]] as const).map(([key, label, Icon]) => (
            <button key={key} onClick={() => { setTab(key); setErrors({}); setAuthError(""); }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
              style={{
                background: tab === key ? "linear-gradient(135deg,#c8881f,#e8a83f)" : "transparent",
                color: tab === key ? "white" : "rgba(255,255,255,0.45)",
                boxShadow: tab === key ? "0 2px 12px rgba(200,136,31,0.3)" : "none",
              }}>
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>

        {/* Card */}
        <div className="rounded-2xl p-7"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", backdropFilter: "blur(20px)" }}>

          {/* Auth error */}
          {authError && (
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl mb-5 text-sm text-red-400"
              style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
              <AlertCircle className="w-4 h-4 shrink-0" />
              {authError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">

            {/* Email */}
            <div>
              <label className="block text-[11px] font-bold text-white/50 mb-1.5 uppercase tracking-wider">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                <input
                  type="email"
                  value={form.email}
                  onChange={e => set("email", e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={`${inputClass("email")} pl-10 pr-4`}
                  style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${errors.email ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.09)"}` }}
                />
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] font-bold text-white/50 uppercase tracking-wider">Password</label>
                <Link href="/forgot-password" className="text-[11px] text-[#c8881f] hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                <input
                  type={showPw ? "text" : "password"}
                  value={form.password}
                  onChange={e => set("password", e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className={`${inputClass("password")} pl-10 pr-11`}
                  style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${errors.password ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.09)"}` }}
                />
                <button type="button" onClick={() => setShowPw(v => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.password}</p>}
            </div>

            {/* Remember me */}
            <label className="flex items-center gap-2.5 cursor-pointer group">
              <div
                onClick={() => set("remember", !form.remember)}
                className="w-4 h-4 rounded flex items-center justify-center shrink-0 transition-all cursor-pointer"
                style={{
                  background: form.remember ? "#c8881f" : "rgba(255,255,255,0.06)",
                  border: `1px solid ${form.remember ? "#c8881f" : "rgba(255,255,255,0.15)"}`,
                }}>
                {form.remember && <CheckCircle2 className="w-3 h-3 text-white" />}
              </div>
              <span className="text-xs text-white/50 group-hover:text-white/70 transition-colors select-none">
                Remember me for 30 days
              </span>
            </label>

            {/* Submit */}
            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm mt-1 transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ background: "linear-gradient(135deg, #c8881f 0%, #e8a83f 100%)", color: "white", boxShadow: "0 4px 16px rgba(200,136,31,0.3)" }}>
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in…
                </>
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 text-[11px] text-white/30" style={{ background: "#0c1120" }}>or</span>
            </div>
          </div>

          {/* Google sign-in — only mounted when provider is available */}
          {googleEnabled ? (
            <GoogleLoginButton
              role={tab === "firm" ? "firm" : "homeowner"}
              onStart={() => { setLoading(true); setAuthError(""); }}
              onSuccess={() => router.push(destination)}
              onError={(msg) => { setAuthError(msg); setLoading(false); }}
            />
          ) : (
            <button type="button" disabled
              className="w-full flex items-center justify-center gap-3 py-2.5 rounded-xl text-sm font-medium text-white/30 cursor-not-allowed"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <svg className="w-4 h-4 shrink-0 opacity-40" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
              <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-white/5">Not configured</span>
            </button>
          )}
        </div>

        {/* Register link */}
        <p className="text-center text-sm text-white/40 mt-5">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-[#c8881f] font-bold hover:underline">
            Create account →
          </Link>
        </p>
      </div>
    </div>
  );
}
