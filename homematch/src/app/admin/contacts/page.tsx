import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Clock, ChevronRight, Filter, Mail } from "lucide-react";

export const metadata: Metadata = { title: "Contact Messages" };

const STATUS_OPTS = ["all", "unread", "read", "replied"];

const STATUS_STYLE: Record<string, { bg: string; text: string }> = {
  unread:  { bg: "rgba(200,136,31,0.15)",  text: "#c8881f" },
  read:    { bg: "rgba(56,189,248,0.15)",  text: "#38bdf8" },
  replied: { bg: "rgba(74,222,128,0.15)",  text: "#4ade80" },
};

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_STYLE[status] ?? STATUS_STYLE.read;
  return (
    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg"
      style={{ background: s.bg, color: s.text }}>
      {status}
    </span>
  );
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-SG", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default async function ContactsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; page?: string }>;
}) {
  const params = await searchParams;
  const statusFilter = params.status ?? "all";
  const page = parseInt(params.page ?? "1", 10);
  const pageSize = 25;

  const supabase = await createClient();

  let query = supabase
    .from("contact_messages")
    .select("id, name, email, subject, message, status, created_at", { count: "exact" })
    .order("created_at", { ascending: false })
    .range((page - 1) * pageSize, page * pageSize - 1);

  if (statusFilter !== "all") query = query.eq("status", statusFilter);

  const { data: messages, count } = await query;
  const total = count ?? 0;
  const totalPages = Math.ceil(total / pageSize);

  const statusCounts = await Promise.all(
    STATUS_OPTS.filter(s => s !== "all").map(async (s) => {
      const { count: c } = await supabase.from("contact_messages").select("*", { count: "exact", head: true }).eq("status", s);
      return { status: s, count: c ?? 0 };
    })
  );
  const totalCount = statusCounts.reduce((a, b) => a + b.count, 0);

  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-[11px] font-black uppercase tracking-widest text-[#a78bfa] mb-1">Messages</p>
          <h1 className="text-2xl font-extrabold text-white">Contact Messages</h1>
          <p className="text-sm text-white/40 mt-1">{total} {statusFilter === "all" ? "total" : statusFilter} messages</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <Filter className="w-3.5 h-3.5 text-white/30 shrink-0" />
        {STATUS_OPTS.map((s) => {
          const cnt = s === "all" ? totalCount : (statusCounts.find(x => x.status === s)?.count ?? 0);
          const active = s === statusFilter;
          return (
            <Link key={s} href={`/admin/contacts?status=${s}`}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all capitalize"
              style={{
                background: active ? "rgba(167,139,250,0.12)" : "rgba(255,255,255,0.05)",
                border: `1px solid ${active ? "rgba(167,139,250,0.3)" : "rgba(255,255,255,0.08)"}`,
                color: active ? "#a78bfa" : "rgba(255,255,255,0.45)",
              }}>
              {s}
              <span className="text-[10px] font-black opacity-60">{cnt}</span>
            </Link>
          );
        })}
      </div>

      <div className="space-y-2">
        {!messages || messages.length === 0 ? (
          <div className="rounded-2xl py-16 text-center text-sm text-white/25"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
            No messages found{statusFilter !== "all" ? ` with status "${statusFilter}"` : ""}.
          </div>
        ) : (
          messages.map((msg) => (
            <Link key={msg.id} href={`/admin/contacts/${msg.id}`}
              className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/[0.025] transition-colors group"
              style={{ background: msg.status === "unread" ? "rgba(200,136,31,0.04)" : "rgba(255,255,255,0.02)", border: `1px solid ${msg.status === "unread" ? "rgba(200,136,31,0.12)" : "rgba(255,255,255,0.07)"}` }}>

              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: "rgba(167,139,250,0.12)", border: "1px solid rgba(167,139,250,0.2)" }}>
                <Mail className="w-4 h-4 text-[#a78bfa]" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className={`text-sm font-semibold truncate group-hover:text-[#a78bfa] transition-colors ${msg.status === "unread" ? "text-white" : "text-white/75"}`}>
                      {msg.name}
                    </p>
                    <p className="text-[11px] text-white/35 truncate">{msg.email}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <StatusBadge status={msg.status} />
                    <ChevronRight className="w-3.5 h-3.5 text-white/20 group-hover:text-[#a78bfa] transition-colors" />
                  </div>
                </div>
                {msg.subject && (
                  <p className="text-xs text-white/55 mt-1 font-medium">{msg.subject}</p>
                )}
                <p className="text-[11px] text-white/30 mt-1 line-clamp-1">{msg.message}</p>
                <p className="text-[10px] text-white/20 mt-1.5 flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5" />{fmtDate(msg.created_at)}
                </p>
              </div>
            </Link>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <p className="text-xs text-white/30">Page {page} of {totalPages}</p>
          <div className="flex gap-2">
            {page > 1 && (
              <Link href={`/admin/contacts?status=${statusFilter}&page=${page - 1}`}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white/50 hover:text-white transition-colors"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)" }}>
                ← Previous
              </Link>
            )}
            {page < totalPages && (
              <Link href={`/admin/contacts?status=${statusFilter}&page=${page + 1}`}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white/50 hover:text-white transition-colors"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)" }}>
                Next →
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
