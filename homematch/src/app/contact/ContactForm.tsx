"use client";
import { ArrowRight } from "lucide-react";

const inputClass = "w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all";
const inputStyle = { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" };

function focusBorder(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = "rgba(200,136,31,0.5)";
}
function blurBorder(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
}

export default function ContactForm() {
  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">Name</label>
          <input type="text" placeholder="Your name"
            className={inputClass} style={{ ...inputStyle }}
            onFocus={focusBorder} onBlur={blurBorder} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">Email</label>
          <input type="email" placeholder="you@email.com"
            className={inputClass} style={{ ...inputStyle }}
            onFocus={focusBorder} onBlur={blurBorder} />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">Subject</label>
        <select className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.75)" }}
          onFocus={focusBorder} onBlur={blurBorder}>
          <option value="" style={{ background: "#0a0e1a" }}>Select a subject</option>
          <option value="match"   style={{ background: "#0a0e1a" }}>Find an interior designer</option>
          <option value="firm"    style={{ background: "#0a0e1a" }}>List my firm</option>
          <option value="report"  style={{ background: "#0a0e1a" }}>Report a firm</option>
          <option value="press"   style={{ background: "#0a0e1a" }}>Press / Media</option>
          <option value="partner" style={{ background: "#0a0e1a" }}>Partnership</option>
          <option value="other"   style={{ background: "#0a0e1a" }}>Other</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">Message</label>
        <textarea rows={5} placeholder="Tell us how we can help..."
          className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all resize-none"
          style={{ ...inputStyle }}
          onFocus={focusBorder} onBlur={blurBorder} />
      </div>

      <button type="submit"
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90"
        style={{ background: "linear-gradient(135deg, #c8881f 0%, #e8a83f 100%)", boxShadow: "0 4px 16px rgba(200,136,31,0.3)" }}>
        Send Message <ArrowRight className="w-4 h-4" />
      </button>

      <p className="text-xs text-white/30 text-center">
        Or email us directly at{" "}
        <a href="mailto:hello@homematch.sg" className="text-[#c8881f] hover:underline">hello@homematch.sg</a>
      </p>
    </form>
  );
}
