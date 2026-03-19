import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Mail, Phone } from "lucide-react";
import ContactActions from "./ContactActions";

export const metadata: Metadata = { title: "Contact Message" };

export default async function ContactDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: msg } = await supabase.from("contact_messages").select("*").eq("id", id).single();
  if (!msg) notFound();

  // Auto-mark as read
  if (msg.status === "unread") {
    await supabase.from("contact_messages").update({ status: "read" }).eq("id", id);
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-6">
        <Link href="/admin/contacts" className="flex items-center gap-1.5 text-xs text-white/35 hover:text-white/70 mb-4 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Messages
        </Link>
        <h1 className="text-2xl font-extrabold text-white">{msg.subject ?? "No subject"}</h1>
        <p className="text-sm text-white/40 mt-1 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          {new Date(msg.created_at).toLocaleDateString("en-SG", { weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>

      <div className="space-y-4">

        {/* Sender */}
        <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <p className="text-[11px] font-black uppercase tracking-widest text-white/30 mb-4">From</p>
          <div className="flex flex-wrap gap-5">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/25 mb-0.5">Name</p>
              <p className="text-sm text-white/75 font-medium">{msg.name}</p>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-white/25" />
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/25 mb-0.5">Email</p>
                <a href={`mailto:${msg.email}`} className="text-sm text-[#a78bfa] hover:text-white transition-colors">{msg.email}</a>
              </div>
            </div>
            {msg.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-white/25" />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/25 mb-0.5">Phone</p>
                  <p className="text-sm text-white/75">{msg.phone}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Message body */}
        <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <p className="text-[11px] font-black uppercase tracking-widest text-white/30 mb-3">Message</p>
          <p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
        </div>

        {/* Quick reply link */}
        <a href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject ?? "Your enquiry")}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-all"
          style={{ background: "rgba(167,139,250,0.15)", border: "1px solid rgba(167,139,250,0.3)" }}>
          <Mail className="w-3.5 h-3.5" />
          Reply via Email
        </a>

        {/* Actions */}
        <ContactActions message={{ id: msg.id, status: msg.status, admin_notes: msg.admin_notes }} />

      </div>
    </div>
  );
}
