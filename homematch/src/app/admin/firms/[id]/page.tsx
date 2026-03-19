import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import FirmForm from "./FirmForm";

export const metadata: Metadata = { title: "Edit Firm" };

export default async function EditFirmPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (id === "new") {
    return (
      <div className="p-8 max-w-3xl">
        <Link href="/admin/firms" className="flex items-center gap-1.5 text-xs text-white/35 hover:text-white/70 mb-6 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Firms
        </Link>
        <div className="mb-6">
          <p className="text-[11px] font-black uppercase tracking-widest text-[#c8881f] mb-1">Firms</p>
          <h1 className="text-2xl font-extrabold text-white">Add New Firm</h1>
        </div>
        <FirmForm firm={null} />
      </div>
    );
  }

  const supabase = await createClient();
  const { data: firm } = await supabase.from("firms").select("*").eq("id", id).single();
  if (!firm) notFound();

  return (
    <div className="p-8 max-w-3xl">
      <Link href="/admin/firms" className="flex items-center gap-1.5 text-xs text-white/35 hover:text-white/70 mb-6 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Firms
      </Link>
      <div className="mb-6">
        <p className="text-[11px] font-black uppercase tracking-widest text-[#c8881f] mb-1">Firms</p>
        <h1 className="text-2xl font-extrabold text-white">Edit: {firm.name}</h1>
      </div>
      <FirmForm firm={firm} />
    </div>
  );
}
