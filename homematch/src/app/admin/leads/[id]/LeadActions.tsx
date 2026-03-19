"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Send, ChevronDown } from "lucide-react";

const STATUS_OPTS = ["new", "contacted", "matched", "closed", "spam"];

interface Lead {
  id: string;
  status: string;
  admin_notes: string | null;
}

export default function LeadActions({ lead }: { lead: Lead }) {
  const router = useRouter();
  const [status, setStatus]   = useState(lead.status);
  const [notes, setNotes]     = useState(lead.admin_notes ?? "");
  const [response, setResp]   = useState("");
  const [firmsSent, setFirms] = useState("");
  const [saving, setSaving]   = useState(false);
  const [sending, setSending] = useState(false);
  const [saved, setSaved]     = useState(false);

  async function handleSave() {
    setSaving(true);
    const supabase = createClient();
    await supabase.from("leads").update({ status, admin_notes: notes }).eq("id", lead.id);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    router.refresh();
  }

  async function handleSendResponse() {
    if (!response.trim()) return;
    setSending(true);
    const supabase = createClient();
    await supabase.from("lead_responses").insert({
      lead_id: lead.id,
      message: response,
      firms_sent: firmsSent.split(",").map(s => s.trim()).filter(Boolean),
    });
    await supabase.from("leads").update({ status: "contacted", responded_at: new Date().toISOString() }).eq("id", lead.id);
    setResp("");
    setFirms("");
    setStatus("contacted");
    setSending(false);
    router.refresh();
  }

  return (
    <div className="rounded-2xl p-5 space-y-4" style={{ background: "rgba(200,136,31,0.05)", border: "1px solid rgba(200,136,31,0.18)" }}>
      <p className="text-[11px] font-black uppercase tracking-widest text-[#c8881f]">Admin Actions</p>

      {/* Status + notes */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-widest text-white/35 mb-1.5">Status</label>
          <div className="relative">
            <select value={status} onChange={e => setStatus(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none capitalize appearance-none pr-8"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}>
              {STATUS_OPTS.map(s => <option key={s} value={s} style={{ background: "#0a0e1a" }}>{s}</option>)}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-white/30 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-widest text-white/35 mb-1.5">Internal Notes</label>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2}
            placeholder="Notes visible only to admin…"
            className="w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder-white/20 outline-none resize-none"
            style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }} />
        </div>
      </div>

      <button onClick={handleSave} disabled={saving}
        className="px-5 py-2.5 rounded-xl text-xs font-bold text-white disabled:opacity-50 transition-all"
        style={{ background: saving ? "rgba(255,255,255,0.08)" : "rgba(200,136,31,0.2)", border: "1px solid rgba(200,136,31,0.35)" }}>
        {saving ? "Saving…" : saved ? "✓ Saved" : "Save Changes"}
      </button>

      {/* Response */}
      <div className="pt-4 border-t" style={{ borderColor: "rgba(200,136,31,0.15)" }}>
        <label className="block text-[10px] font-bold uppercase tracking-widest text-white/35 mb-1.5">Send Response to Lead</label>
        <textarea value={response} onChange={e => setResp(e.target.value)} rows={3}
          placeholder="Write your response to this homeowner…"
          className="w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder-white/20 outline-none resize-none mb-3"
          style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }} />
        <input value={firmsSent} onChange={e => setFirms(e.target.value)}
          placeholder="Firms sent (comma-separated slugs, optional)"
          className="w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder-white/20 outline-none mb-3"
          style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }} />
        <button onClick={handleSendResponse} disabled={sending || !response.trim()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white disabled:opacity-40 transition-all"
          style={{ background: "linear-gradient(135deg,#c8881f,#e8a83f)", boxShadow: "0 4px 16px rgba(200,136,31,0.25)" }}>
          <Send className="w-3.5 h-3.5" />
          {sending ? "Sending…" : "Send & Mark Contacted"}
        </button>
      </div>
    </div>
  );
}
