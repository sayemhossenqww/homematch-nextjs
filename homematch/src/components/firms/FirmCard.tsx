import Link from "next/link";
import Image from "next/image";
import { Firm } from "@/types/firm";
import { Star, ShieldCheck, ArrowRight, Building2, MapPin, Clock, TrendingUp, Users, CheckCircle } from "lucide-react";

export default function FirmCard({ firm }: { firm: Firm }) {
  const specialistBadge = firm.badges.find(b => b.name.includes("Specialist"));
  const yearsActive = new Date().getFullYear() - firm.established;
  const topStyles = firm.styles.slice(0, 3);
  const extraStyles = firm.styles.length - 3;

  return (
    <div className="group relative bg-[#0a0e1a] border border-white/8 rounded-3xl overflow-hidden hover:border-[#c8881f]/40 transition-all duration-500 hover:shadow-2xl hover:shadow-[#c8881f]/8 flex flex-col h-full">

      {/* ── Banner ── */}
      <div className="relative h-52 w-full overflow-hidden">
        {firm.isFeatured && (
          <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-1.5 bg-[#c8881f] text-white text-[9px] font-black uppercase tracking-[0.12em] px-3 py-1.5 rounded-full shadow-lg">
            <TrendingUp className="w-2.5 h-2.5" /> Featured
          </div>
        )}
        {/* Rating */}
        <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-1 bg-black/60 backdrop-blur-md border border-white/15 text-white text-xs font-bold px-2.5 py-1.5 rounded-xl">
          <Star className="w-3 h-3 text-[#c8881f] fill-current" />
          {firm.rating.toFixed(1)}
          <span className="text-white/50 font-normal text-[10px]">({firm.reviewCount})</span>
        </div>

        <Image
          src={firm.banner}
          alt={`${firm.name} interior design`}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-[#0a0e1a]/20 to-transparent" />

        {/* Logo */}
        <div className="absolute -bottom-5 left-5 w-14 h-14 rounded-2xl overflow-hidden border-2 border-[#0a0e1a] bg-white shadow-xl z-10 ring-1 ring-white/10">
          <Image src={firm.logo} alt={firm.name} fill className="object-cover" />
        </div>
      </div>

      {/* ── Body ── */}
      <div className="pt-8 pb-5 px-5 flex flex-col flex-1">

        {/* Accreditation mini-logos + specialist badge */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {firm.isCaseTrust && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-sky-500/10 text-sky-400 text-[9px] font-black uppercase tracking-[0.1em] border border-sky-500/20">
              <ShieldCheck className="w-2.5 h-2.5" /> CaseTrust
            </span>
          )}
          {specialistBadge && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/5 text-white/60 text-[9px] font-black uppercase tracking-[0.1em] border border-white/10">
              <Building2 className="w-2.5 h-2.5" /> {specialistBadge.name}
            </span>
          )}
          {firm.warranty && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/8 text-emerald-400 text-[9px] font-black uppercase tracking-[0.1em] border border-emerald-500/15">
              <CheckCircle className="w-2.5 h-2.5" /> Warranty
            </span>
          )}
        </div>

        {/* Name */}
        <h3 className="text-lg font-bold text-white leading-tight group-hover:text-[#c8881f] transition-colors line-clamp-1 mb-1">
          {firm.name}
        </h3>

        {/* Meta row */}
        <div className="flex items-center gap-3 text-xs text-white/40 mb-3">
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {firm.district}</span>
          <span className="w-0.5 h-0.5 rounded-full bg-white/20" />
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {yearsActive}+ yrs</span>
          {firm.teamSize && (
            <>
              <span className="w-0.5 h-0.5 rounded-full bg-white/20" />
              <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {firm.teamSize} designers</span>
            </>
          )}
        </div>

        {/* Design styles */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {topStyles.map(s => (
            <span key={s} className="px-2 py-0.5 rounded-md bg-[#c8881f]/8 text-[#c8881f]/80 text-[9px] font-bold border border-[#c8881f]/15">
              {s}
            </span>
          ))}
          {extraStyles > 0 && (
            <span className="px-2 py-0.5 rounded-md bg-white/5 text-white/40 text-[9px] font-bold border border-white/8">
              +{extraStyles} more
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4 mt-auto">
          <div className="bg-white/4 rounded-xl px-2 py-2.5 border border-white/6 flex flex-col items-center text-center">
            <p className="text-[9px] uppercase tracking-[0.1em] text-white/35 mb-1">Budget</p>
            <p className="text-sm font-bold text-white">S${firm.avgBudget / 1000}K</p>
          </div>
          <div className="bg-white/4 rounded-xl px-2 py-2.5 border border-white/6 flex flex-col items-center text-center">
            <p className="text-[9px] uppercase tracking-[0.1em] text-white/35 mb-1">Response</p>
            <p className="text-xs font-bold text-white leading-tight">{firm.responseTime}</p>
          </div>
          <div className="bg-white/4 rounded-xl px-2 py-2.5 border border-white/6 flex flex-col items-center text-center">
            <p className="text-[9px] uppercase tracking-[0.1em] text-white/35 mb-1">Projects</p>
            <p className="text-sm font-bold text-white">{firm.totalProjects ? `${firm.totalProjects >= 100 ? Math.floor(firm.totalProjects / 100) * 100 : firm.totalProjects}+` : "30+"}</p>
          </div>
        </div>

        {/* Project type bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-[9px] uppercase tracking-[0.12em] text-white/35">Project Mix</p>
          </div>
          <div className="flex h-1.5 w-full rounded-full overflow-hidden bg-white/8 gap-px">
            {firm.projectTypes.hdb > 0 && <div style={{ width: `${firm.projectTypes.hdb}%` }} className="h-full bg-[#c8881f]" />}
            {firm.projectTypes.condo > 0 && <div style={{ width: `${firm.projectTypes.condo}%` }} className="h-full bg-sky-400" />}
            {firm.projectTypes.landed > 0 && <div style={{ width: `${firm.projectTypes.landed}%` }} className="h-full bg-emerald-400" />}
            {firm.projectTypes.commercial > 0 && <div style={{ width: `${firm.projectTypes.commercial}%` }} className="h-full bg-violet-400" />}
          </div>
          <div className="flex gap-3 mt-1.5 flex-wrap">
            {firm.projectTypes.hdb > 0 && <span className="flex items-center gap-1 text-[9px] text-white/30"><span className="w-1.5 h-1.5 rounded-full bg-[#c8881f] inline-block" />HDB {firm.projectTypes.hdb}%</span>}
            {firm.projectTypes.condo > 0 && <span className="flex items-center gap-1 text-[9px] text-white/30"><span className="w-1.5 h-1.5 rounded-full bg-sky-400 inline-block" />Condo {firm.projectTypes.condo}%</span>}
            {firm.projectTypes.landed > 0 && <span className="flex items-center gap-1 text-[9px] text-white/30"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />Landed {firm.projectTypes.landed}%</span>}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2.5 pt-4 border-t border-white/6">
          <Link href={`/firms/${firm.slug}`} className="flex-1 py-2.5 text-center rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white font-semibold text-xs transition-all border border-white/8 hover:border-white/15">
            View Profile
          </Link>
          <Link href={`/firms/${firm.slug}?enquire=true`} className="flex-1 py-2.5 text-center rounded-xl bg-[#c8881f] hover:bg-[#d4951f] text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-[#c8881f]/20">
            Enquire <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}
