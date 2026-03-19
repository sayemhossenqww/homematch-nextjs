import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, User, Mail, Phone, Home, Calendar, DollarSign, MessageSquare } from "lucide-react";
import LeadActions from "./LeadActions";

export const metadata: Metadata = { title: "Lead Detail" };

const STATUS_STYLE: Record<string, { bg: string; text: string }> = {
  new:       { bg: "rgba(200,136,31,0.15)",  text: "#c8881f" },
  contacted: { bg: "rgba(56,189,248,0.15)",  text: "#38bdf8" },
  matched:   { bg: "rgba(74,222,128,0.15)",  text: "#4ade80" },
  closed:    { bg: "rgba(255,255,255,0.08)", text: "rgba(255,255,255,0.4)" },
  spam:      { bg: "rgba(248,113,113,0.15)", text: "#f87171" },
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
      <p className="text-[11px] font-black uppercase tracking-widest text-white/30 mb-4">{title}</p>
      <div className="grid grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: lead } = await supabase.from("leads").select("*").eq("id", id).single();
  if (!lead) notFound();

  const { data: responses } = await supabase
    .from("lead_responses")
    .select("*")
    .eq("lead_id", id)
    .order("created_at", { ascending: false });

  const s = STATUS_STYLE[lead.status] ?? STATUS_STYLE.closed;

  return (
    <div className="p-8 max-w-5xl">

      {/* Back + header */}
      <div className="mb-6">
        <Link href="/admin/leads" className="flex items-center gap-1.5 text-xs text-white/35 hover:text-white/70 mb-4 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Leads
        </Link>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-white">{lead.name}</h1>
            <p className="text-sm text-white/40 mt-1 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {new Date(lead.created_at).toLocaleDateString("en-SG", { weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
            </p>
          </div>
          <span className="text-sm font-black uppercase tracking-wider px-3 py-1.5 rounded-xl shrink-0"
            style={{ background: s.bg, color: s.text }}>
            {lead.status}
          </span>
        </div>
      </div>

      <div className="space-y-4">

        {/* Contact */}
        <Section title="Contact Details">
          <div className="flex items-center gap-2"><User className="w-3.5 h-3.5 text-white/25" /><Field label="Name" value={lead.name} /></div>
          <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-white/25" /><Field label="Email" value={lead.email} /></div>
          <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-white/25" /><Field label="WhatsApp" value={lead.whatsapp} /></div>
          <Field label="Best time to contact" value={lead.contact_time} />
        </Section>

        {/* Property */}
        <Section title="Property">
          <div className="flex items-center gap-2"><Home className="w-3.5 h-3.5 text-white/25" /><Field label="Property Type" value={lead.property_type} /></div>
          <Field label="HDB Type" value={lead.hdb_type} />
          <Field label="HDB Status" value={lead.hdb_status} />
          <Field label="Condo Type" value={lead.condo_type} />
          <Field label="Condo Status" value={lead.condo_status} />
          <Field label="Landed Type" value={lead.landed_type} />
          <Field label="Region" value={lead.region} />
          <Field label="District" value={lead.district} />
          <Field label="Property Size" value={lead.property_size} />
          <Field label="Condition" value={lead.condition} />
        </Section>

        {/* Scope */}
        <Section title="Scope">
          <div className="col-span-2"><Field label="Rooms" value={lead.rooms} /></div>
          <Field label="Reno Type" value={lead.reno_type} />
          <div className="col-span-2"><Field label="Priorities" value={lead.priorities} /></div>
        </Section>

        {/* Budget */}
        <Section title="Budget">
          <div className="flex items-center gap-2"><DollarSign className="w-3.5 h-3.5 text-white/25" /><Field label="Budget Range" value={lead.budget} /></div>
          <div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-white/25" /><Field label="Timeline" value={lead.timeline} /></div>
          <Field label="Reno Loan" value={lead.reno_loan} />
        </Section>

        {/* Preferences */}
        <Section title="Matching Preferences">
          <div className="col-span-2"><Field label="Styles" value={lead.styles} /></div>
          <Field label="Style (Other)" value={lead.style_other} />
          <div className="col-span-2"><Field label="Working Styles" value={lead.working_styles} /></div>
          <div className="col-span-2"><Field label="Languages" value={lead.languages} /></div>
          <div className="col-span-2"><Field label="Special Requirements" value={lead.special_reqs} /></div>
          <Field label="ID Experience" value={lead.id_experience} />
          <div className="col-span-2"><Field label="Residents" value={lead.residents} /></div>
          <Field label="Pets" value={lead.pets} />
          <div className="col-span-2"><Field label="Guarantees Wanted" value={lead.guarantees} /></div>
        </Section>

        {/* Admin */}
        <LeadActions lead={lead} />

        {/* Response history */}
        {responses && responses.length > 0 && (
          <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <p className="text-[11px] font-black uppercase tracking-widest text-white/30 mb-4 flex items-center gap-2">
              <MessageSquare className="w-3.5 h-3.5" /> Response History
            </p>
            <div className="space-y-3">
              {responses.map((r) => (
                <div key={r.id} className="p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p className="text-xs text-white/70 leading-relaxed">{r.message}</p>
                  {r.firms_sent?.length > 0 && (
                    <p className="text-[11px] text-white/35 mt-2">Firms sent: {r.firms_sent.join(", ")}</p>
                  )}
                  <p className="text-[10px] text-white/20 mt-2">{new Date(r.created_at).toLocaleString("en-SG")}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
