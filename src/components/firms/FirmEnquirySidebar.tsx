"use client";

import { useState } from "react";
import Link from "next/link";
import type { Firm } from "@/types/firm";

const STYLES = ["Contemporary", "Modern", "Minimalist", "Japandi", "Scandinavian", "Industrial", "Luxury", "Transitional", "Peranakan", "Other"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const YEARS  = Array.from({ length: 5 }, (_, i) => (new Date().getFullYear() + i).toString());

interface FormState {
  propertyType: string;
  propertyStatus: string;
  areaSqft: string;
  budget: string;
  stylePreference: string;
  keysCollected: string;
  keyMonth: string;
  keyYear: string;
  fullName: string;
  email: string;
  phone: string;
  additionalInfo: string;
  alsoSendToSimilar: boolean;
}

interface Errors {
  fullName?: string;
  email?: string;
  phone?: string;
  propertyType?: string;
}

export default function FirmEnquirySidebar({ firm }: { firm: Firm }) {
  const [form, setForm] = useState<FormState>({
    propertyType: "", propertyStatus: "", areaSqft: "", budget: "",
    stylePreference: "", keysCollected: "", keyMonth: "", keyYear: "",
    fullName: "", email: "", phone: "", additionalInfo: "", alsoSendToSimilar: false,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: (e.target as HTMLInputElement).type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value }));

  function validate(): boolean {
    const e: Errors = {};
    if (!form.fullName.trim()) e.fullName = "Required";
    if (!form.propertyType) e.propertyType = "Select one";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!/^[89]\d{7}$/.test(form.phone.replace(/\s/g, ""))) e.phone = "8-digit SG number";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  }

  // ── Success ──────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div id="enquire" style={card}>
        <div style={{ textAlign: "center", padding: "16px 0" }}>
          <div style={{
            width: 56, height: 56, borderRadius: "50%",
            background: "rgba(74,222,128,0.1)", border: "2px solid rgba(74,222,128,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 18px",
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h3 style={{ color: "#fff", fontWeight: 800, fontSize: 18, margin: "0 0 10px" }}>Enquiry Sent!</h3>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, lineHeight: 1.7, margin: "0 0 6px" }}>
            Forwarded to <strong style={{ color: "#fff" }}>{firm.name}</strong>.
          </p>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, lineHeight: 1.7, margin: "0 0 24px" }}>
            Expect a reply within <strong style={{ color: "#c8881f" }}>{firm.responseTime}</strong>.
          </p>
          <Link href="/firms" style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "10px 20px", borderRadius: 10,
            background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: 600, textDecoration: "none",
            transition: "background 0.15s",
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
            Browse Other Firms
          </Link>
        </div>
      </div>
    );
  }

  // ── Form ─────────────────────────────────────────────────────────────────
  return (
    <div id="enquire" style={card}>
      {/* Header */}
      <div style={{ marginBottom: 22 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#49A9CB", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>
          Free Enquiry
        </div>
        <h3 style={{ color: "#fff", fontWeight: 800, fontSize: 16, margin: 0, lineHeight: 1.3 }}>
          Contact {firm.name}
        </h3>
      </div>

      <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 16 }}>

        {/* Property Type */}
        <div>
          <FieldLabel error={errors.propertyType}>
            Property Type
          </FieldLabel>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["HDB", "Condo", "Landed", "Commercial"].map((t) => (
              <button key={t} type="button"
                onClick={() => { setForm((f) => ({ ...f, propertyType: t })); setErrors((e) => ({ ...e, propertyType: undefined })); }}
                className={`hm-pill${form.propertyType === t ? " active-gold" : ""}`}
              >
                {t}
              </button>
            ))}
          </div>
          {errors.propertyType && <span style={errorText}>{errors.propertyType}</span>}
        </div>

        {/* Property Status */}
        <div>
          <FieldLabel>Property Status</FieldLabel>
          <div style={{ display: "flex", gap: 6 }}>
            {["New BTO", "Resale"].map((s) => (
              <button key={s} type="button"
                onClick={() => setForm((f) => ({ ...f, propertyStatus: s }))}
                className={`hm-pill${form.propertyStatus === s ? " active-teal" : ""}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Area + Budget */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div>
            <FieldLabel>Area (sqft)</FieldLabel>
            <input value={form.areaSqft} onChange={set("areaSqft")} type="number" placeholder="e.g. 1,100" className="hm-enquiry-input" />
          </div>
          <div>
            <FieldLabel>Budget (S$)</FieldLabel>
            <input value={form.budget} onChange={set("budget")} type="number" placeholder="e.g. 65,000" className="hm-enquiry-input" />
          </div>
        </div>

        {/* Style */}
        <div>
          <FieldLabel>Style Preference</FieldLabel>
          <select value={form.stylePreference} onChange={set("stylePreference")} className="hm-enquiry-input" style={{ cursor: "pointer" }}>
            <option value="">Select a style...</option>
            {STYLES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Keys */}
        <div>
          <FieldLabel>Keys Collected?</FieldLabel>
          <div style={{ display: "flex", gap: 6 }}>
            {["Yes", "No"].map((v) => (
              <button key={v} type="button"
                onClick={() => setForm((f) => ({ ...f, keysCollected: v.toLowerCase() }))}
                className={`hm-pill${form.keysCollected === v.toLowerCase() ? " active-teal" : ""}`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Key collection date — conditional reveal */}
        <div style={{
          overflow: "hidden",
          maxHeight: form.keysCollected === "no" ? 80 : 0,
          opacity: form.keysCollected === "no" ? 1 : 0,
          transition: "max-height 0.3s ease, opacity 0.25s ease",
        }}>
          <FieldLabel>Expected Key Collection</FieldLabel>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <select value={form.keyMonth} onChange={set("keyMonth")} className="hm-enquiry-input" style={{ cursor: "pointer" }}>
              <option value="">Month</option>
              {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
            <select value={form.keyYear} onChange={set("keyYear")} className="hm-enquiry-input" style={{ cursor: "pointer" }}>
              <option value="">Year</option>
              {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        </div>

        {/* Name */}
        <div>
          <FieldLabel error={errors.fullName}>Full Name</FieldLabel>
          <input
            value={form.fullName} onChange={set("fullName")} type="text" placeholder="Your name"
            className={`hm-enquiry-input${errors.fullName ? " error" : ""}`}
          />
        </div>

        {/* Email */}
        <div>
          <FieldLabel error={errors.email}>Email</FieldLabel>
          <input
            value={form.email} onChange={set("email")} type="email" placeholder="you@email.com"
            className={`hm-enquiry-input${errors.email ? " error" : ""}`}
          />
        </div>

        {/* Phone */}
        <div>
          <FieldLabel error={errors.phone}>
            Phone{" "}
            <span style={{ fontWeight: 400, color: "rgba(255,255,255,0.25)", textTransform: "none", letterSpacing: 0 }}>+65</span>
          </FieldLabel>
          <input
            value={form.phone} onChange={set("phone")} type="tel" placeholder="9123 4567" maxLength={8}
            className={`hm-enquiry-input${errors.phone ? " error" : ""}`}
          />
        </div>

        {/* Notes */}
        <div>
          <FieldLabel>Notes <span style={{ fontWeight: 400, color: "rgba(255,255,255,0.25)", textTransform: "none", letterSpacing: 0 }}>(optional)</span></FieldLabel>
          <textarea
            value={form.additionalInfo} onChange={set("additionalInfo")} rows={3}
            placeholder="Special requirements, inspiration links..."
            className="hm-enquiry-input"
            style={{ resize: "vertical", lineHeight: 1.6 }}
          />
        </div>

        {/* Also send to similar */}
        <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
          <input
            type="checkbox" checked={form.alsoSendToSimilar} onChange={set("alsoSendToSimilar")}
            style={{ marginTop: 3, accentColor: "#c8881f", flexShrink: 0 }}
          />
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.55 }}>
            Also send to 3 similar verified firms — recommended for getting multiple quotes
          </span>
        </label>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%", padding: "14px 0",
            background: loading ? "rgba(200,136,31,0.5)" : "linear-gradient(135deg, #c8881f, #a06c15)",
            color: "#fff", fontWeight: 800, fontSize: 14,
            border: "none", borderRadius: 12, cursor: loading ? "not-allowed" : "pointer",
            boxShadow: loading ? "none" : "0 4px 20px rgba(200,136,31,0.25)",
            transition: "all 0.2s",
            fontFamily: "inherit",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}
          onMouseEnter={(e) => { if (!loading) e.currentTarget.style.opacity = "0.88"; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
        >
          {loading ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: "spin 0.8s linear infinite" }}>
                <line x1="12" y1="2" x2="12" y2="6" /><line x1="12" y1="18" x2="12" y2="22" />
                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" /><line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
                <line x1="2" y1="12" x2="6" y2="12" /><line x1="18" y1="12" x2="22" y2="12" />
                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" /><line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
              </svg>
              Sending...
            </>
          ) : (
            <>
              Send Enquiry
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
            </>
          )}
        </button>
      </form>

      {/* Trust row */}
      <div style={{ marginTop: 18, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
        <TrustBadge icon="clock" text={`${firm.responseTime} avg reply`} />
        <TrustBadge icon="lock" text="Shared with matched firms only" />
      </div>

      {/* Find My ID upsell */}
      <div style={{
        marginTop: 14, padding: "12px 16px", borderRadius: 12,
        background: "rgba(200,136,31,0.06)", border: "1px solid rgba(200,136,31,0.15)",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
      }}>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>
          Want 6 firm options?
        </span>
        <Link href="/find-my-id" style={{
          fontSize: 12, fontWeight: 700, color: "#c8881f", textDecoration: "none",
          whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 4,
        }}>
          Find My ID — Free
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
        </Link>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

/* ── Helpers ─────────────────────────────────────────────────────────────────── */
function FieldLabel({ children, error }: { children: React.ReactNode; error?: string }) {
  return (
    <label style={{
      display: "flex", alignItems: "center", gap: 6,
      fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.45)",
      textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 7,
    }}>
      {children}
      {error && <span style={errorText}>{error}</span>}
    </label>
  );
}

function TrustBadge({ icon, text }: { icon: "clock" | "lock"; text: string }) {
  return (
    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", display: "flex", alignItems: "center", gap: 5 }}>
      {icon === "clock" ? (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#49A9CB" strokeWidth="2">
          <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
        </svg>
      ) : (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#49A9CB" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      )}
      {text}
    </span>
  );
}

/* ── Styles ──────────────────────────────────────────────────────────────────── */
const card: React.CSSProperties = {
  background: "#0a0d14",
  border: "1px solid rgba(200,136,31,0.18)",
  borderRadius: 18,
  padding: 22,
  position: "sticky",
  top: 100,
  fontFamily: "var(--font-montserrat, Montserrat, sans-serif)",
};

const errorText: React.CSSProperties = {
  fontSize: 10, fontWeight: 600, color: "#f87171",
  marginLeft: 4, letterSpacing: "0.03em",
};
