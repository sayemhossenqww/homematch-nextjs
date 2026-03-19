import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import EnquiryActions from "./EnquiryActions";

export const metadata: Metadata = { title: "Enquiry Detail" };

const STATUS_STYLE: Record<string, { bg: string; text: string }> = {
  new:     { bg: "rgba(200,136,31,0.15)",  text: "#c8881f" },
  read:    { bg: "rgba(56,189,248,0.15)",  text: "#38bdf8" },
  replied: { bg: "rgba(74,222,128,0.15)",  text: "#4ade80" },
  spam:    { bg: "rgba(248,113,113,0.15)", text: "#f87171" },
};

function Field({ label, value }: { label: string; value?: string | string[] | null }) {
  if (!value || (Array.isArray(value) && value.length === 0)) return null;
  const display = Array.isArray(value) ? value.join(", ") : value;
  return (
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-white/25 mb-0.5">{label}</p>
      <p className="text-sm text-white/75">{display}</p>
    </div>
  );
}

export default async function EnquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: enq } = await supabase.from("enquiries").select("*").eq("id", id).single();
  if (!enq) notFound();

  // Mark as read if new
  if (enq.status === "new") {
    await supabase.from("enquiries").update({ status: "read" }).eq("id", id);
  }

  const s = STATUS_STYLE[enq.status] ?? STATUS_STYLE.read;

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-6">
        <Link href="/admin/enquiries" className="flex items-center gap-1.5 text-xs text-white/35 hover:text-white/70 mb-4 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Enquiries
        </Link>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-white">{enq.name}</h1>
            <p className="text-sm text-white/40 mt-1 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {new Date(enq.created_at).toLocaleDateString("en-SG", { weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
            </p>
            {enq.firm_slug && (
              <p className="text-sm text-[#38bdf8] mt-1">→ Firm: {enq.firm_slug}</p>
            )}
          </div>
          <span className="text-sm font-black uppercase tracking-wider px-3 py-1.5 rounded-xl shrink-0"
            style={{ background: s.bg, color: s.text }}>
            {enq.status}
          </span>
        </div>
      </div>

      <div className="space-y-4">

        {/* Contact */}
        <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <p className="text-[11px] font-black uppercase tracking-widest text-white/30 mb-4">Contact Details</p>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Name" value={enq.name} />
            <Field label="Email" value={enq.email} />
            <Field label="WhatsApp" value={enq.whatsapp} />
            <Field label="Best time to contact" value={enq.contact_time} />
          </div>
        </div>

        {/* Property */}
        <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <p className="text-[11px] font-black uppercase tracking-widest text-white/30 mb-4">Property & Budget</p>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Property Type" value={enq.property_type} />
            <Field label="Budget" value={enq.budget} />
            <Field label="Timeline" value={enq.timeline} />
            <Field label="Styles Interested" value={enq.styles} />
          </div>
        </div>

        {/* Message */}
        {enq.message && (
          <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <p className="text-[11px] font-black uppercase tracking-widest text-white/30 mb-3">Message</p>
            <p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap">{enq.message}</p>
          </div>
        )}

        {/* Actions */}
        <EnquiryActions enquiry={{ id: enq.id, status: enq.status, admin_notes: enq.admin_notes }} />

      </div>
    </div>
  );
}
