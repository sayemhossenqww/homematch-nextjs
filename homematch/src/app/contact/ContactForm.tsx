"use client";
import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const inputClass = "w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all";
const inputStyle = { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" };

function focusBorder(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = "rgba(200,136,31,0.5)";
}
function blurBorder(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
}

export default function ContactForm() {
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent]       = useState(false);
  const [error, setError]     = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please fill in your name, email and message.");
      return;
    }
    setSending(true);
    setError("");
    try {
      const supabase = createClient();
      const { error: err } = await supabase.from("contact_messages").insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject || null,
        message: message.trim(),
        status: "unread",
      });
      if (err) throw err;
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="text-center py-8 space-y-3">
        <CheckCircle2 className="w-12 h-12 text-[#4ade80] mx-auto" />
        <p className="text-lg font-bold text-white">Message sent!</p>
        <p className="text-sm text-white/50">We&apos;ll get back to you within 1–2 business days.</p>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {error && (
        <p className="text-xs text-red-400 px-4 py-2.5 rounded-xl" style={{ background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)" }}>
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name"
            className={inputClass} style={{ ...inputStyle }}
            onFocus={focusBorder} onBlur={blurBorder} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com"
            className={inputClass} style={{ ...inputStyle }}
            onFocus={focusBorder} onBlur={blurBorder} />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">Subject</label>
        <select value={subject} onChange={e => setSubject(e.target.value)}
          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.75)" }}
          onFocus={focusBorder} onBlur={blurBorder}>
          <option value="" style={{ background: "#0a0e1a" }}>Select a subject</option>
          <option value="Find an interior designer" style={{ background: "#0a0e1a" }}>Find an interior designer</option>
          <option value="List my firm"              style={{ background: "#0a0e1a" }}>List my firm</option>
          <option value="Report a firm"             style={{ background: "#0a0e1a" }}>Report a firm</option>
          <option value="Press / Media"             style={{ background: "#0a0e1a" }}>Press / Media</option>
          <option value="Partnership"               style={{ background: "#0a0e1a" }}>Partnership</option>
          <option value="Other"                     style={{ background: "#0a0e1a" }}>Other</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">Message</label>
        <textarea rows={5} value={message} onChange={e => setMessage(e.target.value)}
          placeholder="Tell us how we can help..."
          className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all resize-none"
          style={{ ...inputStyle }}
          onFocus={focusBorder} onBlur={blurBorder} />
      </div>

      <button type="submit" disabled={sending}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90 disabled:opacity-60"
        style={{ background: "linear-gradient(135deg, #c8881f 0%, #e8a83f 100%)", boxShadow: "0 4px 16px rgba(200,136,31,0.3)" }}>
        {sending ? "Sending…" : <><span>Send Message</span> <ArrowRight className="w-4 h-4" /></>}
      </button>

      <p className="text-xs text-white/30 text-center">
        Or email us directly at{" "}
        <a href="mailto:hello@homematch.sg" className="text-[#c8881f] hover:underline">hello@homematch.sg</a>
      </p>
    </form>
  );
}
