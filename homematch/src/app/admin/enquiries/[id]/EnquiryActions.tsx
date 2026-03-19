"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";

const STATUS_OPTS = ["new", "read", "replied", "spam"];

interface Enquiry {
  id: string;
  status: string;
  admin_notes: string | null;
}

export default function EnquiryActions({ enquiry }: { enquiry: Enquiry }) {
  const router = useRouter();
  const [status, setStatus] = useState(enquiry.status);
  const [notes, setNotes]   = useState(enquiry.admin_notes ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved]   = useState(false);

  async function handleSave() {
    setSaving(true);
    const supabase = createClient();
    await supabase.from("enquiries").update({ status, admin_notes: notes }).eq("id", enquiry.id);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    router.refresh();
  }

  return (
    <div className="rounded-2xl p-5 space-y-4" style={{ background: "rgba(56,189,248,0.05)", border: "1px solid rgba(56,189,248,0.18)" }}>
      <p className="text-[11px] font-black uppercase tracking-widest text-[#38bdf8]">Admin Actions</p>

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
        style={{ background: saving ? "rgba(255,255,255,0.08)" : "rgba(56,189,248,0.2)", border: "1px solid rgba(56,189,248,0.35)" }}>
        {saving ? "Saving…" : saved ? "✓ Saved" : "Save Changes"}
      </button>
    </div>
  );
}
