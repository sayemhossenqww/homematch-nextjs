import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Vendor } from "@/types/vendor";

export default function VendorCard({ vendor }: { vendor: Vendor }) {
  return (
    <div className="group bg-[#0a0e1a] border border-white/8 rounded-2xl overflow-hidden hover:border-[#c8881f]/30 transition-all duration-500 hover:shadow-2xl hover:shadow-[#c8881f]/8 flex flex-col h-full">

      {/* ── Banner ── */}
      <div className="aspect-[16/10] relative w-full overflow-hidden">
        <Image
          src={vendor.banner}
          alt={`${vendor.name} banner`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a]/60 via-transparent to-transparent" />

        {/* Category badge */}
        <div className="absolute top-3 left-3 bg-[#c8881f] text-white text-[9px] font-black uppercase tracking-[0.12em] px-2.5 py-1 rounded-lg shadow-lg">
          {vendor.category}
        </div>

        {/* Price range badge */}
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white/80 text-[9px] font-bold px-2.5 py-1 rounded-lg border border-white/15">
          {vendor.priceRange}
        </div>

        {/* Featured badge */}
        {vendor.isFeatured && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-[#c8881f]/90 backdrop-blur-sm text-white text-[9px] font-black uppercase tracking-[0.1em] px-2 py-0.5 rounded-md">
            <Star className="w-2.5 h-2.5 fill-current" /> Featured
          </div>
        )}
      </div>

      {/* ── Body ── */}
      <div className="p-5 flex flex-col flex-1">

        {/* Name */}
        <h3 className="text-base font-black text-white group-hover:text-[#c8881f] transition-colors leading-tight mb-1.5">
          {vendor.name}
        </h3>

        {/* Rating row */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map(n => (
              <Star
                key={n}
                className={`w-3 h-3 ${n <= Math.round(vendor.rating) ? "text-[#c8881f] fill-current" : "text-white/20"}`}
              />
            ))}
          </div>
          <span className="text-xs font-bold text-white">{vendor.rating.toFixed(1)}</span>
          <span className="text-xs text-white/40">({vendor.reviewCount} reviews)</span>
        </div>

        {/* Bio */}
        <p className="text-xs text-white/50 line-clamp-2 mt-2 mb-3 leading-relaxed flex-1">
          {vendor.bio}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {vendor.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="bg-white/5 border border-white/8 text-white/50 text-[9px] rounded-md px-2 py-0.5 font-medium"
            >
              {tag}
            </span>
          ))}
          {vendor.tags.length > 3 && (
            <span className="bg-white/5 border border-white/8 text-white/30 text-[9px] rounded-md px-2 py-0.5 font-medium">
              +{vendor.tags.length - 3}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3.5 border-t border-white/6">
          <Link
            href={`/vendors/${vendor.slug}`}
            className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-white/5 hover:bg-[#c8881f]/10 text-white/70 hover:text-[#c8881f] font-semibold text-xs border border-white/8 hover:border-[#c8881f]/30 transition-all"
          >
            View Profile →
          </Link>
        </div>

      </div>
    </div>
  );
}
