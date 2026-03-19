import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Clock, ChevronRight, Filter, Building2 } from "lucide-react";

export const metadata: Metadata = { title: "Firm Enquiries" };

const STATUS_OPTS = ["all", "new", "read", "replied", "spam"];

const STATUS_STYLE: Record<string, { bg: string; text: string }> = {
  new:     { bg: "rgba(200,136,31,0.15)",  text: "#c8881f" },
  read:    { bg: "rgba(56,189,248,0.15)",  text: "#38bdf8" },
  replied: { bg: "rgba(74,222,128,0.15)",  text: "#4ade80" },
  spam:    { bg: "rgba(248,113,113,0.15)", text: "#f87171" },
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

export default async function EnquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; page?: string }>;
}) {
  const params = await searchParams;
  const statusFilter = params.status ?? "all";
  const page = parseInt(params.page ?? "1", 10);
  const pageSize = 20;

  const supabase = await createClient();

  let query = supabase
    .from("enquiries")
    .select("id, name, email, whatsapp, firm_slug, property_type, budget, status, created_at", { count: "exact" })
    .order("created_at", { ascending: false })
    .range((page - 1) * pageSize, page * pageSize - 1);

  if (statusFilter !== "all") query = query.eq("status", statusFilter);

  const { data: enquiries, count } = await query;
  const total = count ?? 0;
  const totalPages = Math.ceil(total / pageSize);

  const statusCounts = await Promise.all(
    STATUS_OPTS.filter(s => s !== "all").map(async (s) => {
      const { count: c } = await supabase.from("enquiries").select("*", { count: "exact", head: true }).eq("status", s);
      return { status: s, count: c ?? 0 };
    })
  );
  const totalCount = statusCounts.reduce((a, b) => a + b.count, 0);

  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-[11px] font-black uppercase tracking-widest text-[#38bdf8] mb-1">Enquiries</p>
          <h1 className="text-2xl font-extrabold text-white">Firm Enquiries</h1>
          <p className="text-sm text-white/40 mt-1">{total} {statusFilter === "all" ? "total" : statusFilter} enquiries</p>
        </div>
      </div>

      {/* Status filter tabs */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <Filter className="w-3.5 h-3.5 text-white/30 shrink-0" />
        {STATUS_OPTS.map((s) => {
          const cnt = s === "all" ? totalCount : (statusCounts.find(x => x.status === s)?.count ?? 0);
          const active = s === statusFilter;
          return (
            <Link key={s} href={`/admin/enquiries?status=${s}`}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all capitalize"
              style={{
                background: active ? "rgba(56,189,248,0.12)" : "rgba(255,255,255,0.05)",
                border: `1px solid ${active ? "rgba(56,189,248,0.3)" : "rgba(255,255,255,0.08)"}`,
                color: active ? "#38bdf8" : "rgba(255,255,255,0.45)",
              }}>
              {s}
              <span className="text-[10px] font-black opacity-60">{cnt}</span>
            </Link>
          );
        })}
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="grid gap-4 px-5 py-3 text-[10px] font-black uppercase tracking-widest text-white/25"
          style={{ gridTemplateColumns: "2fr 2fr 1.5fr 1.5fr 1fr 1fr", background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <span>Name / Contact</span>
          <span>Firm</span>
          <span>Property</span>
          <span>Budget</span>
          <span>Status</span>
          <span>Date</span>
        </div>

        {!enquiries || enquiries.length === 0 ? (
          <div className="py-16 text-center text-sm text-white/25">
            No enquiries found{statusFilter !== "all" ? ` with status "${statusFilter}"` : ""}.
          </div>
        ) : (
          <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
            {enquiries.map((enq) => (
              <Link key={enq.id} href={`/admin/enquiries/${enq.id}`}
                className="grid gap-4 px-5 py-4 items-center hover:bg-white/[0.025] transition-colors group"
                style={{ gridTemplateColumns: "2fr 2fr 1.5fr 1.5fr 1fr 1fr" }}>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate group-hover:text-[#38bdf8] transition-colors">{enq.name}</p>
                  <p className="text-[11px] text-white/35 truncate mt-0.5">{enq.email}</p>
                  <p className="text-[11px] text-white/25 truncate">{enq.whatsapp}</p>
                </div>

                <div className="flex items-center gap-1.5 min-w-0">
                  <Building2 className="w-3 h-3 text-white/25 shrink-0" />
                  <p className="text-xs text-white/65 truncate">{enq.firm_slug ?? "—"}</p>
                </div>

                <div>
                  <p className="text-xs text-white/65 capitalize">{enq.property_type ?? "—"}</p>
                </div>

                <div>
                  <p className="text-xs text-white/65">{enq.budget ?? "—"}</p>
                </div>

                <div>
                  <StatusBadge status={enq.status} />
                </div>

                <div className="flex items-center gap-1 justify-between">
                  <span className="text-[10px] text-white/25 flex items-center gap-0.5">
                    <Clock className="w-2.5 h-2.5" />{fmtDate(enq.created_at)}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-white/20 group-hover:text-[#38bdf8] transition-colors" />
                </div>

              </Link>
            ))}
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <p className="text-xs text-white/30">Page {page} of {totalPages}</p>
          <div className="flex gap-2">
            {page > 1 && (
              <Link href={`/admin/enquiries?status=${statusFilter}&page=${page - 1}`}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white/50 hover:text-white transition-colors"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)" }}>
                ← Previous
              </Link>
            )}
            {page < totalPages && (
              <Link href={`/admin/enquiries?status=${statusFilter}&page=${page + 1}`}
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
