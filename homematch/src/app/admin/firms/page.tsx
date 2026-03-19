import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus, Building2, Star, ExternalLink } from "lucide-react";

export const metadata: Metadata = { title: "Manage Firms" };

export default async function FirmsAdminPage() {
  const supabase = await createClient();

  const { data: firms, count } = await supabase
    .from("firms")
    .select("id, slug, name, district, rating, review_count, avg_budget, is_featured, established, created_at", { count: "exact" })
    .order("name", { ascending: true });

  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-[11px] font-black uppercase tracking-widest text-[#c8881f] mb-1">Content</p>
          <h1 className="text-2xl font-extrabold text-white">Firms</h1>
          <p className="text-sm text-white/40 mt-1">{count ?? 0} interior design firms</p>
        </div>
        <Link href="/admin/firms/new"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-all"
          style={{ background: "linear-gradient(135deg,#c8881f,#e8a83f)", boxShadow: "0 4px 16px rgba(200,136,31,0.25)" }}>
          <Plus className="w-3.5 h-3.5" />
          Add Firm
        </Link>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="grid gap-4 px-5 py-3 text-[10px] font-black uppercase tracking-widest text-white/25"
          style={{ gridTemplateColumns: "2.5fr 1fr 1fr 1fr 1fr 120px", background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <span>Firm</span>
          <span>District</span>
          <span>Rating</span>
          <span>Avg Budget</span>
          <span>Featured</span>
          <span>Actions</span>
        </div>

        {!firms || firms.length === 0 ? (
          <div className="py-16 text-center">
            <Building2 className="w-8 h-8 text-white/15 mx-auto mb-3" />
            <p className="text-sm text-white/25">No firms yet. Add your first firm or run the seed script.</p>
            <Link href="/admin/firms/new"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-xl text-xs font-bold text-white"
              style={{ background: "rgba(200,136,31,0.15)", border: "1px solid rgba(200,136,31,0.3)" }}>
              <Plus className="w-3 h-3" /> Add Firm
            </Link>
          </div>
        ) : (
          <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
            {firms.map((firm) => (
              <div key={firm.id}
                className="grid gap-4 px-5 py-4 items-center"
                style={{ gridTemplateColumns: "2.5fr 1fr 1fr 1fr 1fr 120px" }}>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{firm.name}</p>
                  <p className="text-[11px] text-white/35 truncate mt-0.5">/{firm.slug}</p>
                  {firm.established && (
                    <p className="text-[10px] text-white/20">Est. {firm.established}</p>
                  )}
                </div>

                <div>
                  <p className="text-xs text-white/55">{firm.district ?? "—"}</p>
                </div>

                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-[#c8881f]" />
                  <p className="text-xs text-white/65">{firm.rating?.toFixed(1) ?? "—"}</p>
                  <p className="text-[10px] text-white/30">({firm.review_count ?? 0})</p>
                </div>

                <div>
                  <p className="text-xs text-white/65">
                    {firm.avg_budget ? `S$${(firm.avg_budget / 1000).toFixed(0)}k` : "—"}
                  </p>
                </div>

                <div>
                  {firm.is_featured ? (
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg"
                      style={{ background: "rgba(200,136,31,0.15)", color: "#c8881f" }}>Featured</span>
                  ) : (
                    <span className="text-[10px] text-white/25">—</span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Link href={`/admin/firms/${firm.id}`}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold text-white/70 hover:text-white transition-colors"
                    style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    Edit
                  </Link>
                  <Link href={`/firms/${firm.slug}`} target="_blank"
                    className="p-1.5 rounded-lg text-white/30 hover:text-white/70 transition-colors"
                    style={{ background: "rgba(255,255,255,0.05)" }}>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
