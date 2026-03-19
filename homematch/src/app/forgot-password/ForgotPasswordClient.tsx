"use client";
import { useState } from "react";
import Link from "next/link";
import { Sparkles, Mail, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";

type Stage = "form" | "sent";

export default function ForgotPasswordClient() {
  const [stage,   setStage]   = useState<Stage>("form");
  const [email,   setEmail]   = useState("");
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) { setError("Email address is required."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Enter a valid email address."); return; }
    setError("");
    setLoading(true);

    // Simulate network call — replace with: await fetch('/api/auth/forgot-password', { method: 'POST', body: JSON.stringify({ email }) })
    await new Promise(r => setTimeout(r, 1100));
    setLoading(false);
    setStage("sent");
  }

  return (
    <div className="min-h-screen bg-[#05080f] flex flex-col items-center justify-center px-4 py-24 relative overflow-hidden">

      {/* Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(200,136,31,0.07) 0%, transparent 65%)", filter: "blur(80px)" }} />

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
        </div>

        {/* Card */}
        <div className="rounded-2xl p-8"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", backdropFilter: "blur(20px)" }}>

          {stage === "form" ? (
            <>
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                style={{ background: "rgba(200,136,31,0.12)", border: "1px solid rgba(200,136,31,0.25)" }}>
                <Mail className="w-6 h-6 text-[#c8881f]" />
              </div>

              <h1 className="text-xl font-black text-white text-center mb-1.5">Reset your password</h1>
              <p className="text-sm text-white/45 text-center mb-6 leading-relaxed">
                Enter your account email address. We&apos;ll send you a link to reset your password.
              </p>

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-white/50 mb-1.5 uppercase tracking-wider">Email address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={e => { setEmail(e.target.value); setError(""); }}
                      placeholder="you@example.com"
                      autoComplete="email"
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all focus:ring-1 focus:ring-[#c8881f]/50"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: `1px solid ${error ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.09)"}`,
                      }}
                    />
                  </div>
                  {error && (
                    <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />{error}
                    </p>
                  )}
                </div>

                <button type="submit" disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: "linear-gradient(135deg, #c8881f 0%, #e8a83f 100%)", color: "white", boxShadow: "0 4px 16px rgba(200,136,31,0.3)" }}>
                  {loading ? (
                    <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending…</>
                  ) : (
                    <>Send Reset Link <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </form>

              <div className="flex justify-center mt-5">
                <Link href="/login"
                  className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors">
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to login
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* Success state */}
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 relative"
                style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.25)" }}>
                <div className="absolute inset-0 rounded-full animate-ping opacity-20"
                  style={{ background: "rgba(34,197,94,0.2)" }} />
                <CheckCircle2 className="w-7 h-7 text-emerald-400" />
              </div>

              <h2 className="text-xl font-black text-white text-center mb-2">Check your inbox</h2>
              <p className="text-sm text-white/50 text-center mb-2 leading-relaxed">
                We&apos;ve sent a password reset link to
              </p>
              <p className="text-sm font-bold text-[#c8881f] text-center mb-6 break-all">{email}</p>
              <p className="text-xs text-white/35 text-center leading-relaxed mb-7">
                Didn&apos;t receive it? Check your spam folder, or{" "}
                <button onClick={() => setStage("form")} className="text-[#c8881f] hover:underline font-semibold">
                  try again
                </button>.
                {" "}The link expires in 30 minutes.
              </p>

              <Link href="/login"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #c8881f 0%, #e8a83f 100%)", color: "white", boxShadow: "0 4px 16px rgba(200,136,31,0.3)" }}>
                <ArrowLeft className="w-4 h-4" /> Back to login
              </Link>
            </>
          )}
        </div>

        {/* Secure notice */}
        <p className="text-center text-xs text-white/25 mt-5 leading-relaxed">
          This is a secure, encrypted reset process. HomeMatch will never ask for your password via email.
        </p>
      </div>
    </div>
  );
}
