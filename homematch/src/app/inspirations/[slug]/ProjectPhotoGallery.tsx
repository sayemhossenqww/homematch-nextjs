"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProjectPhoto } from "@/types/firm";

interface Props {
  photos: ProjectPhoto[];
}

export default function ProjectPhotoGallery({ photos }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const activePhoto = photos[activeIdx];

  if (!photos.length) return null;

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="aspect-video rounded-2xl overflow-hidden border border-white/10 relative bg-[#0a0e1a]">
        {activePhoto?.url && (
          <Image
            src={activePhoto.url}
            alt={activePhoto.caption ?? "Project photo"}
            fill
            className="object-cover transition-opacity duration-300"
            sizes="(max-width: 768px) 100vw, 900px"
            priority
          />
        )}
        {activePhoto?.caption && (
          <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white/80 text-xs px-3 py-1.5 rounded-lg border border-white/10">
            {activePhoto.caption}
          </div>
        )}
        {/* Counter */}
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white/60 text-xs px-2.5 py-1 rounded-lg border border-white/10">
          {activeIdx + 1} / {photos.length}
        </div>
      </div>

      {/* Thumbnails */}
      {photos.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {photos.map((photo, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`w-20 h-14 relative rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                activeIdx === i
                  ? "border-[#c8881f] opacity-100"
                  : "border-white/10 opacity-60 hover:opacity-90 hover:border-white/30"
              }`}
              aria-label={photo.caption ?? `Photo ${i + 1}`}
            >
              <Image
                src={photo.url}
                alt={photo.caption ?? `Photo ${i + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
