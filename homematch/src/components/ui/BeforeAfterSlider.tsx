"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";

interface Props {
  beforeUrl: string;
  afterUrl: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfterSlider({
  beforeUrl, afterUrl,
  beforeLabel = "Before", afterLabel = "After",
}: Props) {
  const [position, setPosition] = useState(50); // 0–100 %
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - left) / width) * 100));
    setPosition(pct);
  }, []);

  const onMouseDown = () => { dragging.current = true; };
  const onMouseMove = (e: React.MouseEvent) => { if (dragging.current) updatePosition(e.clientX); };
  const onMouseUp   = () => { dragging.current = false; };

  const onTouchMove = (e: React.TouchEvent) => updatePosition(e.touches[0].clientX);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden select-none cursor-col-resize border border-white/10"
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchMove={onTouchMove}
    >
      {/* After (full width base layer) */}
      <Image src={afterUrl} alt="After renovation" fill className="object-cover" />

      {/* Before (clipped overlay) */}
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <Image src={beforeUrl} alt="Before renovation" fill className="object-cover" />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg shadow-black/50 z-10"
        style={{ left: `${position}%` }}
      />

      {/* Drag handle */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 w-10 h-10 rounded-full bg-white border-2 border-white/80 shadow-2xl flex items-center justify-center cursor-col-resize"
        style={{ left: `${position}%` }}
        onMouseDown={onMouseDown}
        onTouchStart={() => { dragging.current = true; }}
        onTouchEnd={() => { dragging.current = false; }}
      >
        <svg className="w-5 h-5 text-[#05080f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-3 3 3 3M16 9l3 3-3 3" />
        </svg>
      </div>

      {/* Labels */}
      <div className="absolute top-3 left-3 z-10 bg-black/60 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border border-white/15">
        {beforeLabel}
      </div>
      <div className="absolute top-3 right-3 z-10 bg-[#c8881f] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg shadow-lg">
        {afterLabel}
      </div>

      {/* Hint */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 bg-black/50 backdrop-blur-sm text-white/60 text-[10px] px-3 py-1 rounded-full border border-white/10 pointer-events-none">
        ← Drag to compare →
      </div>
    </div>
  );
}
