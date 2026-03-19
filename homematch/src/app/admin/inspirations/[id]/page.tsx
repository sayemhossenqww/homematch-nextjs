import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import InspirationForm from "./InspirationForm";

export const metadata: Metadata = { title: "Edit Inspiration" };

export default async function EditInspirationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (id === "new") {
    return (
      <div className="p-8 max-w-3xl">
        <Link href="/admin/inspirations" className="flex items-center gap-1.5 text-xs text-white/35 hover:text-white/70 mb-6 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Inspirations
        </Link>
        <div className="mb-6">
          <p className="text-[11px] font-black uppercase tracking-widest text-[#c8881f] mb-1">Inspirations</p>
          <h1 className="text-2xl font-extrabold text-white">Add New Inspiration</h1>
        </div>
        <InspirationForm inspiration={null} />
      </div>
    );
  }

  const supabase = await createClient();
  const { data: inspiration } = await supabase.from("inspirations").select("*").eq("id", id).single();
  if (!inspiration) notFound();

  return (
    <div className="p-8 max-w-3xl">
      <Link href="/admin/inspirations" className="flex items-center gap-1.5 text-xs text-white/35 hover:text-white/70 mb-6 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Inspirations
      </Link>
      <div className="mb-6">
        <p className="text-[11px] font-black uppercase tracking-widest text-[#c8881f] mb-1">Inspirations</p>
        <h1 className="text-2xl font-extrabold text-white">Edit: {inspiration.title}</h1>
      </div>
      <InspirationForm inspiration={inspiration} />
    </div>
  );
}
