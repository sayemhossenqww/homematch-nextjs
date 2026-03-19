import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import {
  Inbox, MessageSquare, FileText, Building2,
  Package, Image, BookOpen, Users, TrendingUp, Clock, AlertCircle,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = { title: "Dashboard" };

async function getStats() {
  const supabase = await createClient();
  const [
    { count: leads_total },
    { count: leads_new },
    { count: enquiries_total },
    { count: enquiries_new },
    { count: contacts_unread },
    { count: firms_count },
    { count: vendors_count },
    { count: inspirations_count },
    { count: articles_count },
    { count: users_count },
  ] = await Promise.all([
    supabase.from("leads").select("*", { count: "exact", head: true }),
    supabase.from("leads").select("*", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("enquiries").select("*", { count: "exact", head: true }),
    supabase.from("enquiries").select("*", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("contact_messages").select("*", { count: "exact", head: true }).eq("status", "unread"),
    supabase.from("firms").select("*", { count: "exact", head: true }),
    supabase.from("vendors").select("*", { count: "exact", head: true }),
    supabase.from("inspirations").select("*", { count: "exact", head: true }),
    supabase.from("articles").select("*", { count: "exact", head: true }),
    supabase.from("profiles").select("*", { count: "exact", head: true }),
  ]);

  return {
    leads_total: leads_total ?? 0,
    leads_new: leads_new ?? 0,
    enquiries_total: enquiries_total ?? 0,
    enquiries_new: enquiries_new ?? 0,
    contacts_unread: contacts_unread ?? 0,
    firms_count: firms_count ?? 0,
    vendors_count: vendors_count ?? 0,
    inspirations_count: inspirations_count ?? 0,
    articles_count: articles_count ?? 0,
    users_count: users_count ?? 0,
  };
}

async function getRecentLeads() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("leads")
    .select("id, name, email, property_type, budget, status, created_at")
    .order("created_at", { ascending: false })
    .limit(8);
  return data ?? [];
}

async function getRecentEnquiries() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("enquiries")
    .select("id, name, firm_slug, property_type, budget, status, created_at")
    .order("created_at", { ascending: false })
    .limit(5);
  return data ?? [];
}

const STATUS_COLORS: Record<string, string> = {
  new:       "rgba(200,136,31,0.15)",
  contacted: "rgba(56,189,248,0.15)",
  matched:   "rgba(74,222,128,0.15)",
  closed:    "rgba(255,255,255,0.08)",
  spam:      "rgba(248,113,113,0.15)",
  read:      "rgba(56,189,248,0.15)",
  replied:   "rgba(74,222,128,0.15)",
  unread:    "rgba(200,136,31,0.15)",
};
const STATUS_TEXT: Record<string, string> = {
  new:       "#c8881f",
  contacted: "#38bdf8",
  matched:   "#4ade80",
  closed:    "rgba(255,255,255,0.4)",
  spam:      "#f87171",
  read:      "#38bdf8",
  replied:   "#4ade80",
  unread:    "#c8881f",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg"
      style={{ background: STATUS_COLORS[status] ?? "rgba(255,255,255,0.08)", color: STATUS_TEXT[status] ?? "#fff" }}>
      {status}
    </span>
  );
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-SG", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}

export default async function AdminPage() {
  const [stats, recentLeads, recentEnquiries] = await Promise.all([
    getStats(),
    getRecentLeads(),
    getRecentEnquiries(),
  ]);

  const STAT_CARDS = [
    {
      label: "New Leads",     value: stats.leads_new,        total: stats.leads_total,
      Icon: Inbox,            accent: "#c8881f",              href: "/admin/leads",
      badge: stats.leads_new > 0 ? "Needs attention" : null,
    },
    {
      label: "New Enquiries", value: stats.enquiries_new,    total: stats.enquiries_total,
      Icon: MessageSquare,    accent: "#38bdf8",              href: "/admin/enquiries",
      badge: stats.enquiries_new > 0 ? "Needs attention" : null,
    },
    {
      label: "Unread Messages", value: stats.contacts_unread, total: null,
      Icon: FileText,           accent: "#a78bfa",             href: "/admin/contacts",
      badge: null,
    },
    {
      label: "Total Users",   value: stats.users_count,      total: null,
      Icon: Users,            accent: "#4ade80",              href: "/admin/users",
      badge: null,
    },
  ];

  const CONTENT_CARDS = [
    { label: "Firms",        value: stats.firms_count,        Icon: Building2, href: "/admin/firms" },
    { label: "Vendors",      value: stats.vendors_count,      Icon: Package,   href: "/admin/vendors" },
    { label: "Inspirations", value: stats.inspirations_count, Icon: Image,     href: "/admin/inspirations" },
    { label: "Articles",     value: stats.articles_count,     Icon: BookOpen,  href: "/admin/articles" },
  ];

  return (
    <div className="p-8">

      {/* Header */}
      <div className="mb-8">
        <p className="text-[11px] font-black uppercase tracking-widest text-[#c8881f] mb-1">Admin</p>
        <h1 className="text-2xl font-extrabold text-white">Dashboard</h1>
        <p className="text-sm text-white/40 mt-1">Welcome back. Here&apos;s what needs your attention.</p>
      </div>

      {/* Primary stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STAT_CARDS.map(({ label, value, total, Icon, accent, href, badge }) => (
          <Link key={label} href={href}
            className="group p-5 rounded-2xl transition-all hover:-translate-y-0.5"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${accent}18`, border: `1px solid ${accent}25` }}>
                <Icon className="w-5 h-5" style={{ color: accent }} />
              </div>
              {badge && (
                <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(200,136,31,0.15)", color: "#c8881f" }}>
                  <AlertCircle className="w-2.5 h-2.5 inline mr-0.5" />{badge}
                </span>
              )}
            </div>
            <p className="text-3xl font-extrabold text-white tabular-nums">{value}</p>
            <p className="text-xs text-white/40 mt-1 font-medium">{label}
              {total !== null && <span className="text-white/25"> / {total} total</span>}
            </p>
          </Link>
        ))}
      </div>

      {/* Content inventory */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {CONTENT_CARDS.map(({ label, value, Icon, href }) => (
          <Link key={label} href={href}
            className="flex items-center gap-3 p-4 rounded-xl transition-all hover:bg-white/[0.06]"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <Icon className="w-4 h-4 text-white/30 shrink-0" />
            <div>
              <p className="text-lg font-extrabold text-white tabular-nums leading-none">{value}</p>
              <p className="text-[11px] text-white/40 mt-0.5">{label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent leads + enquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* Recent leads */}
        <div className="lg:col-span-3 rounded-2xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#c8881f]" />
              <p className="text-sm font-bold text-white">Recent Leads</p>
            </div>
            <Link href="/admin/leads" className="text-[11px] font-bold text-[#c8881f] hover:text-white transition-colors">
              View all →
            </Link>
          </div>
          {recentLeads.length === 0 ? (
            <div className="px-5 py-10 text-center text-sm text-white/25">No leads yet</div>
          ) : (
            <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
              {recentLeads.map((lead) => (
                <Link key={lead.id} href={`/admin/leads/${lead.id}`}
                  className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.03] transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{lead.name}</p>
                    <p className="text-[11px] text-white/35 truncate mt-0.5">
                      {lead.property_type ?? "—"} · {lead.budget ?? "Budget TBC"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <StatusBadge status={lead.status} />
                    <span className="text-[10px] text-white/25 flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />{fmtDate(lead.created_at)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Recent enquiries */}
        <div className="lg:col-span-2 rounded-2xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#38bdf8]" />
              <p className="text-sm font-bold text-white">Firm Enquiries</p>
            </div>
            <Link href="/admin/enquiries" className="text-[11px] font-bold text-[#38bdf8] hover:text-white transition-colors">
              View all →
            </Link>
          </div>
          {recentEnquiries.length === 0 ? (
            <div className="px-5 py-10 text-center text-sm text-white/25">No enquiries yet</div>
          ) : (
            <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
              {recentEnquiries.map((enq) => (
                <div key={enq.id} className="px-5 py-3.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{enq.name}</p>
                      <p className="text-[11px] text-white/35 truncate mt-0.5">
                        {enq.firm_slug ? `→ ${enq.firm_slug}` : "No firm"} · {enq.budget ?? "—"}
                      </p>
                    </div>
                    <StatusBadge status={enq.status} />
                  </div>
                  <p className="text-[10px] text-white/20 mt-1.5 flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" />{fmtDate(enq.created_at)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
