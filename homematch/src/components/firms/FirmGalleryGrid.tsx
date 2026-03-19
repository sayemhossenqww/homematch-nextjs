"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { Project } from "@/types/firm";
import {
  X, ChevronLeft, ChevronRight, Tags, Ruler, CircleDollarSign,
  Home, ZoomIn, ZoomOut, Grid3X3, ArrowUpRight, Heart, Clock,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const ROOMS  = ["All", "Living Room", "Kitchen", "Master Bedroom", "Bathroom", "Facade & Pool"];
const STYLES = ["All", "Luxury", "Contemporary", "Japandi", "Minimalist", "Industrial"];

export default function FirmGalleryGrid({ firmName, projects }: { firmName: string; projects: Project[] }) {
  const [activeRoom, setActiveRoom]       = useState("All");
  const [activeStyle, setActiveStyle]     = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);

  const [savedPhotos, setSavedPhotos] = useState<Set<string>>(() => {
    if (typeof window === "undefined") return new Set();
    try { return new Set(JSON.parse(localStorage.getItem("moodboard") || "[]")); }
    catch { return new Set(); }
  });

  const toggleSave = (url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedPhotos(prev => {
      const next = new Set(prev);
      next.has(url) ? next.delete(url) : next.add(url);
      localStorage.setItem("moodboard", JSON.stringify([...next]));
      return next;
    });
  };

  const allPhotos     = projects.flatMap(p => p.photos.map(photo => ({ ...photo, project: p })));
  const filteredPhotos = allPhotos.filter(photo => {
    if (activeRoom  !== "All" && !photo.project.rooms.includes(activeRoom as never) && photo.caption !== activeRoom) return false;
    if (activeStyle !== "All" && photo.project.style !== activeStyle) return false;
    return true;
  });

  // Reset zoom when photo changes
  useEffect(() => { setZoom(1); }, [lightboxIndex]);

  // Keyboard nav
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (lightboxIndex === null) return;
    if (e.key === "Escape")      setLightboxIndex(null);
    if (e.key === "ArrowLeft")   setLightboxIndex(i => i !== null ? (i > 0 ? i - 1 : filteredPhotos.length - 1) : null);
    if (e.key === "ArrowRight")  setLightboxIndex(i => i !== null ? (i < filteredPhotos.length - 1 ? i + 1 : 0) : null);
    if (e.key === "+" || e.key === "=") setZoom(z => Math.min(z + 0.5, 4));
    if (e.key === "-")                  setZoom(z => Math.max(z - 0.5, 1));
  }, [lightboxIndex, filteredPhotos.length]);

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  const zoomIn  = (e: React.MouseEvent) => { e.stopPropagation(); setZoom(z => Math.min(z + 0.5, 4)); };
  const zoomOut = (e: React.MouseEvent) => { e.stopPropagation(); setZoom(z => Math.max(z - 0.5, 1)); };

  const prev = (e: React.MouseEvent) => { e.stopPropagation(); setLightboxIndex(i => i !== null ? (i > 0 ? i - 1 : filteredPhotos.length - 1) : null); };
  const next = (e: React.MouseEvent) => { e.stopPropagation(); setLightboxIndex(i => i !== null ? (i < filteredPhotos.length - 1 ? i + 1 : 0) : null); };

  return (
    <>
      {/* ── Filter Bar ── */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-[0.14em] text-white/30 mr-1">Room</span>
          {ROOMS.map(room => (
            <button key={room} onClick={() => setActiveRoom(room)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                activeRoom === room
                  ? "bg-[#c8881f] border-[#c8881f] text-white shadow-lg shadow-[#c8881f]/20"
                  : "bg-white/5 border-white/8 text-white/50 hover:text-white/80 hover:border-white/15"
              }`}>{room}</button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-[0.14em] text-white/30 mr-1">Style</span>
          {STYLES.map(style => (
            <button key={style} onClick={() => setActiveStyle(style)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                activeStyle === style
                  ? "bg-white/15 border-white/25 text-white"
                  : "bg-white/5 border-white/8 text-white/50 hover:text-white/80 hover:border-white/15"
              }`}>{style}</button>
          ))}
          <div className="flex items-center gap-2 ml-auto">
            {savedPhotos.size > 0 && (
              <div className="flex items-center gap-1.5 text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-full px-3.5 py-1.5">
                <Heart className="w-3 h-3 fill-current" /> {savedPhotos.size} saved
              </div>
            )}
            <div className="flex items-center gap-1.5 text-xs text-white/30 bg-white/5 border border-white/8 rounded-full px-3.5 py-1.5">
              <Grid3X3 className="w-3 h-3" /> {filteredPhotos.length} photos
            </div>
          </div>
        </div>
      </div>

      {/* ── Masonry Grid ── */}
      {filteredPhotos.length > 0 ? (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filteredPhotos.map((photo, i) => (
            <motion.div
              key={`${photo.project.id}-${photo.url}-${i}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
              className="relative break-inside-avoid rounded-2xl overflow-hidden group cursor-zoom-in border border-white/6 hover:border-[#c8881f]/30 transition-all"
              onClick={() => setLightboxIndex(i)}
            >
              <div className={`relative w-full ${i % 4 === 0 ? "aspect-[3/4]" : i % 3 === 0 ? "aspect-square" : i % 2 === 0 ? "aspect-[4/3]" : "aspect-[3/2]"}`}>
                <Image src={photo.url} alt={photo.caption || "Interior photo"} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <button onClick={e => toggleSave(photo.url, e)}
                    className={`p-2 rounded-xl backdrop-blur-sm border transition-all ${savedPhotos.has(photo.url) ? "bg-red-500/80 border-red-400/50 text-white" : "bg-black/50 border-white/15 text-white hover:bg-red-500/60"}`}>
                    <Heart className={`w-3.5 h-3.5 ${savedPhotos.has(photo.url) ? "fill-current" : ""}`} />
                  </button>
                  <div className="bg-black/50 backdrop-blur-sm border border-white/15 p-2 rounded-xl">
                    <ZoomIn className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                    <span className="bg-[#c8881f] text-white text-[9px] font-black px-2 py-0.5 rounded tracking-widest uppercase">{photo.caption}</span>
                    <span className="bg-white/15 backdrop-blur-md text-white border border-white/20 text-[9px] font-bold px-2 py-0.5 rounded tracking-widest uppercase">{photo.project.style}</span>
                  </div>
                  <h4 className="text-white font-bold text-sm leading-tight line-clamp-1">{photo.project.title}</h4>
                  <p className="text-white/60 text-xs mt-0.5">S${photo.project.budget / 1000}K · {photo.project.sqft} sqft</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="py-24 text-center border border-white/8 bg-white/3 rounded-3xl">
          <Grid3X3 className="w-10 h-10 text-white/15 mx-auto mb-3" />
          <p className="text-white/40 text-sm">No photos match your filters.</p>
        </div>
      )}

      {/* ══════════════════════════════════════════
          LIGHTBOX — full-width image + bottom strip
      ══════════════════════════════════════════ */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredPhotos[lightboxIndex] && (() => {
          const photo = filteredPhotos[lightboxIndex];
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-0 bottom-0 top-16 z-100 overflow-y-auto bg-[#03050d] backdrop-blur-2xl"
            >
              {/* ── Sticky top bar ── */}
              <div className="sticky top-0 z-10 flex items-center justify-between px-4 sm:px-6 py-3 bg-[#03050d]/90 backdrop-blur-xl border-b border-white/8">
                {/* Counter */}
                <div className="text-white/40 text-xs font-bold tabular-nums">
                  <span className="text-white">{lightboxIndex + 1}</span>
                  <span className="mx-1 text-white/20">/</span>
                  {filteredPhotos.length}
                </div>

                {/* Keyboard hint */}
                <div className="hidden md:flex items-center gap-1.5 text-white/20 text-xs">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/8 border border-white/10 text-[10px]">←</kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-white/8 border border-white/10 text-[10px]">→</kbd>
                  <span className="mx-1">navigate</span>
                  <kbd className="px-1.5 py-0.5 rounded bg-white/8 border border-white/10 text-[10px]">+</kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-white/8 border border-white/10 text-[10px]">−</kbd>
                  <span className="mx-1">zoom</span>
                  <kbd className="px-1.5 py-0.5 rounded bg-white/8 border border-white/10 text-[10px]">ESC</kbd>
                </div>

                {/* Zoom + close */}
                <div className="flex items-center gap-1.5">
                  <button onClick={zoomOut} disabled={zoom <= 1}
                    className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed transition-all"
                    title="Zoom out (−)"><ZoomOut className="w-4 h-4" /></button>
                  <span className="w-10 text-center text-xs font-bold text-white/40 tabular-nums">{zoom.toFixed(1)}×</span>
                  <button onClick={zoomIn} disabled={zoom >= 4}
                    className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed transition-all"
                    title="Zoom in (+)"><ZoomIn className="w-4 h-4" /></button>
                  {zoom !== 1 && (
                    <button onClick={e => { e.stopPropagation(); setZoom(1); }}
                      className="px-2.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white text-[10px] font-bold transition-all">
                      Reset
                    </button>
                  )}
                  <div className="w-px h-5 bg-white/12 mx-1" />
                  <button onClick={() => setLightboxIndex(null)}
                    className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/50 hover:bg-red-500/40 hover:border-red-500/30 hover:text-white transition-all"
                    title="Close (ESC)"><X className="w-4 h-4" /></button>
                </div>
              </div>

              {/* ── Prev / Next — fixed to viewport sides ── */}
              <button onClick={prev}
                className="fixed left-3 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-white/15 border border-white/10 text-white/50 hover:text-white p-3 rounded-2xl transition-all backdrop-blur-sm">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={next}
                className="fixed right-3 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-white/15 border border-white/10 text-white/50 hover:text-white p-3 rounded-2xl transition-all backdrop-blur-sm">
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* ── Image — full width, scales with zoom ── */}
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22 }}
                className="px-16 pt-6 pb-0 flex justify-center"
              >
                <img
                  src={photo.url}
                  alt={photo.caption || "Photo"}
                  draggable={false}
                  style={{
                    width: `${zoom * 100}%`,
                    maxWidth: "none",
                    height: "auto",
                    display: "block",
                    borderRadius: "16px",
                    transition: "width 0.25s ease",
                  }}
                />
              </motion.div>

              {/* ── Info section — below image ── */}
              <div className="max-w-5xl mx-auto px-6 py-8 mt-6 space-y-5">

                {/* Badges + title */}
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {photo.caption && (
                      <span className="bg-[#c8881f]/15 text-[#c8881f] border border-[#c8881f]/25 text-[10px] font-black px-3 py-1 rounded-lg tracking-widest uppercase">
                        {photo.caption}
                      </span>
                    )}
                    <span className="bg-white/8 text-white/60 border border-white/10 text-[10px] font-black px-3 py-1 rounded-lg tracking-widest uppercase">
                      {photo.project.style}
                    </span>
                    <span className="bg-white/5 text-white/45 border border-white/8 text-[10px] font-bold px-3 py-1 rounded-lg">
                      {photo.project.propertyType}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-white leading-tight mb-1">{photo.project.title}</h2>
                  <Link href={`/firms/${photo.project.firmSlug}`}
                    className="text-[#c8881f] text-sm font-bold hover:text-white transition-colors inline-flex items-center gap-1">
                    {firmName} <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Stats row */}
                <div className="flex flex-wrap gap-6 py-4 border-y border-white/8 text-sm">
                  <div className="flex items-center gap-2 text-white/50">
                    <Home className="w-4 h-4 text-white/30" />
                    <span>{photo.project.propertyType} · {photo.project.bedrooms} BR</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/50">
                    <Ruler className="w-4 h-4 text-white/30" />
                    <span>{photo.project.sqft.toLocaleString()} sqft</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CircleDollarSign className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">S${(photo.project.budget / 1000).toFixed(0)}K</span>
                  </div>
                  {photo.project.completionDays && (
                    <div className="flex items-center gap-2 text-white/50">
                      <Clock className="w-4 h-4 text-white/30" />
                      <span>{photo.project.completionDays} days{photo.project.completionDate && ` · ${photo.project.completionDate}`}</span>
                    </div>
                  )}
                </div>

                {/* Tags */}
                {photo.project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    <Tags className="w-3.5 h-3.5 text-white/20 mt-0.5 shrink-0" />
                    {photo.project.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 bg-white/4 border border-white/8 rounded-lg text-xs text-white/50">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* CTAs */}
                <div className="flex flex-wrap gap-3 pt-2 pb-8">
                  <Link href={`/inspirations/${photo.project.slug}`}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white/6 hover:bg-white/12 text-white/70 hover:text-white font-semibold rounded-xl transition-all border border-white/10 text-sm">
                    View Full Project <ArrowUpRight className="w-4 h-4" />
                  </Link>
                  <Link href={`/firms/${photo.project.firmSlug}?enquire=true`}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#c8881f] hover:bg-[#d4951f] text-white font-bold rounded-xl transition-all shadow-lg shadow-[#c8881f]/20 text-sm">
                    Enquire for This Look
                  </Link>
                </div>
              </div>

            </motion.div>
          );
        })()}
      </AnimatePresence>
    </>
  );
}
