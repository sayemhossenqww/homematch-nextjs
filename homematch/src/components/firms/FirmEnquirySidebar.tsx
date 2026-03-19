"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Lock, Loader2, CheckCircle2, Shield, Clock, Star, Users, Phone, MessageSquare, FileText } from "lucide-react";
import { useState } from "react";
import { Firm } from "@/types/firm";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const schema = z.object({
  propertyType: z.string().min(1, "Please select a property type"),
  propertyStatus: z.string().min(1, "Please select BTO or Resale / New or Resale"),
  budget: z.string().min(1, "Please select a budget range"),
  timeline: z.string().min(1, "Please select a move-in timeline"),
  name: z.string().min(2, "Please enter your full name"),
  mobile: z.string().min(8, "Please enter a valid Singapore mobile number").max(8, "Mobile number should be 8 digits"),
  notes: z.string().optional(),
  multiSend: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

const TIMELINE_OPTIONS = [
  "ASAP (within 1 month)",
  "1–3 months",
  "3–6 months",
  "6+ months / Planning ahead",
];

export default function FirmEnquirySidebar({ firm }: { firm: Firm }) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const propertyType = watch("propertyType");

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setIsError(false);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("enquiries").insert({
        name:          data.name,
        whatsapp:      `+65${data.mobile}`,
        firm_slug:     firm.slug,
        property_type: data.propertyType.toLowerCase(),
        budget:        data.budget,
        timeline:      data.timeline,
        message:       data.notes || null,
        multi_send:    data.multiSend ?? false,
        status:        "new",
      });
      if (error) throw error;
      setIsSuccess(true);
    } catch {
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-[#0a0e1a] border border-emerald-500/25 rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
        <div className="p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
          </div>
          <h3 className="text-xl font-black text-white mb-1">Enquiry Sent!</h3>
          <p className="text-sm text-white/50 mb-4">
            <span className="text-white font-semibold">{firm.name}</span> has received your details.
          </p>

          {/* What happens next */}
          <div className="bg-white/4 border border-white/8 rounded-2xl p-4 text-left mb-6 space-y-3">
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-white/35 mb-2">What happens next?</p>
            {[
              { icon: <Phone className="w-3.5 h-3.5" />, text: `${firm.name} replies within ${firm.responseTime}`, color: "text-[#c8881f]" },
              { icon: <MessageSquare className="w-3.5 h-3.5" />, text: "Designer reviews your requirements & calls you", color: "text-sky-400" },
              { icon: <FileText className="w-3.5 h-3.5" />, text: "Free quote & 3D concept provided within 3–5 days", color: "text-emerald-400" },
            ].map(({ icon, text, color }) => (
              <div key={text} className="flex items-start gap-3">
                <span className={`${color} shrink-0 mt-0.5`}>{icon}</span>
                <p className="text-xs text-white/60 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          <button onClick={() => setIsSuccess(false)} className="w-full py-2.5 bg-white/6 hover:bg-white/10 text-white rounded-xl text-sm font-medium border border-white/8 transition-colors">
            Send Another Enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0e1a] border border-white/8 rounded-2xl overflow-hidden shadow-2xl shadow-black/40">

      {/* Header */}
      <div className="bg-gradient-to-r from-[#c8881f]/15 to-transparent border-b border-white/8 px-6 py-4">
        <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#c8881f] mb-0.5">Free Consultation</p>
        <h3 className="text-lg font-black text-white">Enquire with {firm.name}</h3>
      </div>

      {/* Trust strip */}
      <div className="grid grid-cols-3 gap-px bg-white/6 border-b border-white/6">
        {[
          { icon: <Shield className="w-3 h-3" />, label: "CaseTrust" },
          { icon: <Clock className="w-3 h-3" />, label: firm.responseTime },
          { icon: <Star className="w-3 h-3" />, label: `${firm.rating.toFixed(1)} rated` },
        ].map(({ icon, label }) => (
          <div key={label} className="bg-[#0a0e1a] flex flex-col items-center py-2.5 gap-1">
            <span className="text-[#c8881f]">{icon}</span>
            <span className="text-[9px] font-bold text-white/40 uppercase tracking-wider">{label}</span>
          </div>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">

        {/* Q1: Property Type */}
        <div>
          <label className="block text-[10px] font-black uppercase tracking-[0.12em] text-white/40 mb-1.5">
            What type of property?
          </label>
          <div className="grid grid-cols-3 gap-2">
            {["HDB", "Condo", "Landed"].map(type => (
              <label key={type} className={`flex flex-col items-center py-2.5 px-2 rounded-xl border cursor-pointer transition-all text-center ${watch("propertyType") === type ? "bg-[#c8881f]/15 border-[#c8881f]/40 text-[#c8881f]" : "bg-white/4 border-white/8 text-white/50 hover:border-white/20"}`}>
                <input type="radio" value={type} {...register("propertyType")} className="sr-only" />
                <span className="text-xs font-bold">{type}</span>
              </label>
            ))}
          </div>
          {errors.propertyType && <p className="text-red-400 text-[10px] mt-1.5">{errors.propertyType.message}</p>}
        </div>

        {/* Q2: Status (contextual) */}
        <div>
          <label className="block text-[10px] font-black uppercase tracking-[0.12em] text-white/40 mb-1.5">
            {propertyType === "HDB" ? "BTO or Resale?" : propertyType === "Condo" ? "New launch or Resale?" : "Existing or New build?"}
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(propertyType === "HDB" ? ["BTO", "Resale"] : propertyType === "Condo" ? ["New Launch", "Resale"] : ["Existing", "New Build"]).map(opt => (
              <label key={opt} className={`flex items-center justify-center py-2 px-3 rounded-xl border cursor-pointer transition-all text-xs font-bold ${watch("propertyStatus") === opt ? "bg-[#c8881f]/15 border-[#c8881f]/40 text-[#c8881f]" : "bg-white/4 border-white/8 text-white/50 hover:border-white/20"}`}>
                <input type="radio" value={opt} {...register("propertyStatus")} className="sr-only" />
                {opt}
              </label>
            ))}
          </div>
          {errors.propertyStatus && <p className="text-red-400 text-[10px] mt-1.5">{errors.propertyStatus.message}</p>}
        </div>

        {/* Q3: Budget */}
        <div>
          <label className="block text-[10px] font-black uppercase tracking-[0.12em] text-white/40 mb-1.5">Estimated budget</label>
          <select {...register("budget")} className={`w-full bg-white/5 border ${errors.budget ? "border-red-500/50" : "border-white/10"} rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#c8881f]/60 transition-colors appearance-none`}>
            <option value="" className="bg-[#0a0e1a]">Select your budget…</option>
            <option value="under30k" className="bg-[#0a0e1a]">Under S$30K</option>
            <option value="30-50k" className="bg-[#0a0e1a]">S$30K – S$50K</option>
            <option value="50-80k" className="bg-[#0a0e1a]">S$50K – S$80K</option>
            <option value="80-120k" className="bg-[#0a0e1a]">S$80K – S$120K</option>
            <option value="120-200k" className="bg-[#0a0e1a]">S$120K – S$200K</option>
            <option value="200k+" className="bg-[#0a0e1a]">S$200K+</option>
          </select>
          {errors.budget && <p className="text-red-400 text-[10px] mt-1.5">{errors.budget.message}</p>}
        </div>

        {/* Q4: Timeline */}
        <div>
          <label className="block text-[10px] font-black uppercase tracking-[0.12em] text-white/40 mb-1.5">When do you need it done?</label>
          <select {...register("timeline")} className={`w-full bg-white/5 border ${errors.timeline ? "border-red-500/50" : "border-white/10"} rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#c8881f]/60 transition-colors appearance-none`}>
            <option value="" className="bg-[#0a0e1a]">Select timeline…</option>
            {TIMELINE_OPTIONS.map(o => <option key={o} value={o} className="bg-[#0a0e1a]">{o}</option>)}
          </select>
          {errors.timeline && <p className="text-red-400 text-[10px] mt-1.5">{errors.timeline.message}</p>}
        </div>

        {/* Q5: Name */}
        <div>
          <label className="block text-[10px] font-black uppercase tracking-[0.12em] text-white/40 mb-1.5">Your full name</label>
          <input type="text" {...register("name")} placeholder="e.g. John Tan"
            className={`w-full bg-white/5 border ${errors.name ? "border-red-500/50" : "border-white/10"} rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#c8881f]/60 transition-colors placeholder-white/20`} />
          {errors.name && <p className="text-red-400 text-[10px] mt-1.5">{errors.name.message}</p>}
        </div>

        {/* Q6: Mobile */}
        <div>
          <label className="block text-[10px] font-black uppercase tracking-[0.12em] text-white/40 mb-1.5">Singapore mobile number</label>
          <div className="flex">
            <div className="bg-white/8 border-y border-l border-white/10 rounded-l-xl px-3 flex items-center text-white/40 text-sm font-semibold">+65</div>
            <input type="tel" {...register("mobile")} placeholder="8123 4567"
              className={`flex-1 bg-white/5 border-y border-r ${errors.mobile ? "border-red-500/50" : "border-white/10"} rounded-r-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#c8881f]/60 transition-colors placeholder-white/20`} />
          </div>
          {errors.mobile && <p className="text-red-400 text-[10px] mt-1.5">{errors.mobile.message}</p>}
        </div>

        {/* Q7: Optional notes */}
        <div>
          <label className="block text-[10px] font-black uppercase tracking-[0.12em] text-white/40 mb-1.5">Anything specific? (Optional)</label>
          <textarea {...register("notes")} rows={2}
            placeholder="e.g. Must keep existing flooring, love cove lighting, have 2 cats…"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#c8881f]/60 transition-colors resize-none placeholder-white/20" />
        </div>

        {/* Multi-send */}
        <label className="flex items-start gap-3 p-3.5 bg-white/4 rounded-xl cursor-pointer hover:bg-white/7 border border-white/6 group transition-colors">
          <input type="checkbox" {...register("multiSend")} className="mt-0.5 accent-[#c8881f] w-4 h-4" />
          <span className="text-xs text-white/55 leading-relaxed group-hover:text-white/70 transition-colors">
            <span className="text-white font-semibold">Speed up your search</span> — also send to 3 similar CaseTrust firms
          </span>
        </label>

        {/* Submit */}
        <button type="submit" disabled={isSubmitting}
          className="w-full py-3.5 bg-[#c8881f] hover:bg-[#d4951f] disabled:opacity-60 text-white font-black rounded-xl flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 shadow-xl shadow-[#c8881f]/25 text-sm tracking-wide">
          {isSubmitting
            ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
            : <>Send Free Enquiry <ArrowRight className="w-4 h-4" /></>}
        </button>

        {isError && (
          <div className="flex items-start gap-2.5 px-4 py-3 rounded-xl"
            style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.25)" }}>
            <svg className="w-4 h-4 text-red-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
            <div>
              <p className="text-xs font-semibold text-red-400">Something went wrong</p>
              <p className="text-[11px] text-white/45 mt-0.5">Your enquiry couldn&apos;t be sent. Please try again or email us at <a href="mailto:hello@homematch.sg" className="text-[#c8881f] hover:underline">hello@homematch.sg</a>.</p>
            </div>
          </div>
        )}

        <p className="flex items-center justify-center gap-1.5 text-[10px] text-white/30">
          <Lock className="w-3 h-3" /> Sent securely · Never shared publicly
        </p>
      </form>

      {/* Footer upsell */}
      <div className="px-6 pb-6 pt-2 border-t border-white/6">
        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/3 border border-white/6">
          <Users className="w-4 h-4 text-[#c8881f] shrink-0" />
          <p className="text-xs text-white/50 flex-1">Want <span className="text-white font-semibold">6 matched options</span> instead of 1?</p>
          <Link href="/find-my-id" className="text-[10px] font-black text-[#c8881f] hover:text-white transition-colors whitespace-nowrap uppercase tracking-wider">Free →</Link>
        </div>
      </div>

    </div>
  );
}
