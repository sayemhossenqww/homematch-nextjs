"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

interface Props {
  slug: string;
}

export default function SaveProjectButton({ slug }: Props) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("inspiration-saves");
      if (saved) {
        const parsed: string[] = JSON.parse(saved);
        setIsSaved(parsed.includes(slug));
      }
    } catch {
      // ignore
    }
  }, [slug]);

  function toggle() {
    setIsSaved((prev) => {
      const next = !prev;
      try {
        const saved = localStorage.getItem("inspiration-saves");
        const parsed: string[] = saved ? JSON.parse(saved) : [];
        const updated = next
          ? [...new Set([...parsed, slug])]
          : parsed.filter((s) => s !== slug);
        localStorage.setItem("inspiration-saves", JSON.stringify(updated));
      } catch {
        // ignore
      }
      return next;
    });
  }

  return (
    <button
      onClick={toggle}
      className={`w-full flex items-center justify-center gap-2.5 py-3 rounded-xl border text-sm font-semibold transition-all ${
        isSaved
          ? "bg-red-500/15 border-red-400/30 text-red-400 hover:bg-red-500/20"
          : "bg-white/5 border-white/10 text-white/60 hover:border-white/25 hover:text-white/80"
      }`}
    >
      <Heart
        className={`w-4 h-4 ${isSaved ? "fill-red-400 text-red-400" : ""}`}
      />
      {isSaved ? "Saved to Inspirations" : "Save to Inspirations"}
    </button>
  );
}
