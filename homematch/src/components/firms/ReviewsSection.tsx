"use client";

import { useState, useMemo } from "react";
import { Star, CheckCircle, MessageSquare, ChevronDown } from "lucide-react";
import { Review } from "@/types/firm";

interface Props {
  reviews: Review[];
  rating: number;
  reviewCount: number;
  ratingBreakdown: { stars: number; pct: number }[];
}

const PROPERTY_FILTERS = ["All", "HDB", "Condo", "Landed"];
const SORT_OPTIONS     = ["Most Recent", "Highest Rated", "Lowest Rated"];

export default function ReviewsSection({ reviews, rating, reviewCount, ratingBreakdown }: Props) {
  const [propertyFilter, setPropertyFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Most Recent");
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    let r = [...reviews];
    if (propertyFilter !== "All")
      r = r.filter(rev => rev.propertyType?.toLowerCase().includes(propertyFilter.toLowerCase()));
    if (sortBy === "Highest Rated") r.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "Lowest Rated") r.sort((a, b) => a.rating - b.rating);
    return r;
  }, [reviews, propertyFilter, sortBy]);

  const displayed = showAll ? filtered : filtered.slice(0, 3);

  return (
    <div>
      {/* Header + overall rating */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-white/8 mb-8">
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="text-[#c8881f]"><MessageSquare className="w-5 h-5" /></span>
            <h2 className="text-xl font-black text-white">Verified Client Reviews</h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-4xl font-black text-white">{rating.toFixed(1)}</span>
            <div>
              <div className="flex mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(rating) ? "text-[#c8881f] fill-current" : "text-white/15"}`} />
                ))}
              </div>
              <p className="text-xs text-white/40">{reviewCount} reviews</p>
            </div>
          </div>
        </div>

        {/* Rating breakdown bars */}
        <div className="space-y-1.5 min-w-[200px]">
          {ratingBreakdown.map(({ stars, pct }) => (
            <div key={stars} className="flex items-center gap-2">
              <span className="text-[10px] text-white/40 w-3 shrink-0">{stars}</span>
              <Star className="w-2.5 h-2.5 text-[#c8881f] fill-current shrink-0" />
              <div className="flex-1 h-1.5 bg-white/8 rounded-full overflow-hidden">
                <div className="h-full bg-[#c8881f] rounded-full" style={{ width: `${pct}%` }} />
              </div>
              <span className="text-[10px] text-white/35 w-7 text-right shrink-0">{pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter + Sort bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {/* Property type filter pills */}
        <div className="flex gap-2 flex-wrap">
          {PROPERTY_FILTERS.map(f => (
            <button key={f} onClick={() => setPropertyFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${propertyFilter === f ? "bg-[#c8881f] border-[#c8881f] text-white" : "bg-white/5 border-white/8 text-white/50 hover:text-white/80 hover:border-white/20"}`}>
              {f}
            </button>
          ))}
        </div>

        {/* Sort dropdown */}
        <div className="ml-auto relative">
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="appearance-none bg-white/5 border border-white/10 rounded-xl px-4 py-1.5 pr-8 text-xs text-white/60 focus:outline-none focus:border-[#c8881f]/40 cursor-pointer"
          >
            {SORT_OPTIONS.map(o => <option key={o} value={o} className="bg-[#0a0e1a]">{o}</option>)}
          </select>
          <ChevronDown className="w-3 h-3 text-white/30 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Review cards */}
      <div className="space-y-5">
        {displayed.length > 0 ? displayed.map(review => (
          <div key={review.id} className="bg-[#0a0e1a] border border-white/8 rounded-2xl p-6 hover:border-white/14 transition-colors">
            <div className="flex justify-between items-start gap-4 mb-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c8881f]/30 to-[#c8881f]/10 border border-[#c8881f]/20 flex items-center justify-center text-[#c8881f] font-black text-sm shrink-0">
                  {review.reviewerName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-bold text-white text-sm">{review.reviewerName}</span>
                    {review.isVerified && (
                      <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-400/8 border border-emerald-400/20 px-2 py-0.5 rounded-md">
                        <CheckCircle className="w-2.5 h-2.5" /> Verified
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-white/40">
                    {review.propertyType}
                    {review.renovationBudget && <> · S${(review.renovationBudget / 1000)}K</>}
                    {review.designerName && <> · Designer: {review.designerName}</>}
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="flex text-[#c8881f] mb-1 justify-end">
                  {[...Array(5)].map((_, i) => <Star key={i} className={`w-3 h-3 ${i < review.rating ? "fill-current" : "text-white/15"}`} />)}
                </div>
                <span className="text-[10px] text-white/35">{review.date}</span>
              </div>
            </div>
            <blockquote className="text-sm text-white/70 leading-[1.8] border-l-2 border-[#c8881f]/30 pl-4">"{review.body}"</blockquote>
          </div>
        )) : (
          <div className="text-center py-12 bg-white/3 border border-white/8 rounded-2xl">
            <p className="text-white/40 text-sm">No {propertyFilter !== "All" ? propertyFilter : ""} reviews yet.</p>
          </div>
        )}
      </div>

      {/* Show more toggle */}
      {filtered.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-6 w-full py-3 text-sm font-semibold text-white/50 hover:text-white border border-white/8 hover:border-white/20 rounded-2xl transition-all flex items-center justify-center gap-2"
        >
          {showAll ? "Show fewer reviews" : `Show all ${filtered.length} reviews`}
          <ChevronDown className={`w-4 h-4 transition-transform ${showAll ? "rotate-180" : ""}`} />
        </button>
      )}
    </div>
  );
}
