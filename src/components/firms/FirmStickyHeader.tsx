"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import type { Firm } from "@/types/firm";

interface Props {
  firm: Firm;
  heroId: string; // id of the hero element to observe
}

export default function FirmStickyHeader({ firm, heroId }: Props) {
  const [visible, setVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = document.getElementById(heroId);
    if (!hero) return;

    const obs = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-60px 0px 0px 0px" }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, [heroId]);

  if (!visible) return null;

  return (
    <div
      ref={headerRef}
      className="hm-sticky-header-enter"
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 60,
        background: "rgba(5,8,15,0.9)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        padding: "0 24px",
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        fontFamily: "var(--font-montserrat, Montserrat, sans-serif)",
      }}
    >
      {/* Left: Firm identity */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
        <Link href="/firms" style={{
          display: "flex", alignItems: "center", gap: 4,
          color: "rgba(255,255,255,0.4)", textDecoration: "none", fontSize: 12,
          flexShrink: 0, transition: "color 0.15s",
        }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
          </svg>
          <span style={{ display: "none" }}>Firms</span>
        </Link>

        <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.1)", flexShrink: 0 }} />

        {/* Logo */}
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: "rgba(255,255,255,0.9)",
          display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden", flexShrink: 0,
          border: "1px solid rgba(255,255,255,0.3)",
        }}>
          <LogoFallback firm={firm} size={22} />
        </div>

        <span style={{
          fontSize: 14, fontWeight: 800, color: "#fff",
          letterSpacing: "-0.01em",
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}>
          {firm.name}
        </span>

        {/* Star rating */}
        <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#c8881f">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{firm.rating.toFixed(1)}</span>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>({firm.reviewCount})</span>
        </div>

        {firm.isCaseTrust && (
          <span style={{
            display: "none",
            fontSize: 10, fontWeight: 700, color: "#49A9CB",
            padding: "3px 8px", borderRadius: 10,
            background: "rgba(73,169,203,0.12)",
            border: "1px solid rgba(73,169,203,0.25)",
          }}
            className="hm-casetrust-badge"
          >
            CaseTrust
          </span>
        )}
      </div>

      {/* Right: CTA */}
      <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
        <Link href={`/firms/${firm.slug}#enquire`} className="hm-btn-primary" style={{ fontSize: 12, padding: "8px 16px" }}>
          Enquire
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </Link>
      </div>

      <style>{`
        @media (min-width: 640px) {
          .hm-casetrust-badge { display: inline-flex !important; }
        }
      `}</style>
    </div>
  );
}

/* ── Logo with fallback ──────────────────────────────────────────────────────── */
function LogoFallback({ firm, size }: { firm: Firm; size: number }) {
  const [err, setErr] = useState(false);
  if (err) {
    return (
      <span style={{ fontSize: 10, fontWeight: 800, color: "#1a2a3a", letterSpacing: "-0.02em" }}>
        {firm.name.slice(0, 2).toUpperCase()}
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={firm.logo}
      alt=""
      style={{ width: size, height: size, objectFit: "contain" }}
      onError={() => setErr(true)}
    />
  );
}
