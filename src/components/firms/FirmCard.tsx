"use client";

import { useState } from "react";
import Link from "next/link";
import type { Firm } from "@/types/firm";

interface FirmCardProps {
  firm: Firm;
  featured?: boolean;
}

export default function FirmCard({ firm, featured = false }: FirmCardProps) {
  const [imgError, setImgError] = useState(false);

  const cardHeight = featured ? 480 : 380;

  return (
    <div
      className="hm-firm-card firm-card"
      style={{ height: cardHeight, display: "flex", flexDirection: "column" }}
    >
      {/* ── Image fill ──────────────────────────────── */}
      <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>
        {!imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={firm.bannerPhoto}
            alt={firm.name}
            className="hm-card-img"
            style={{ position: "absolute", inset: 0 }}
            onError={() => setImgError(true)}
          />
        ) : (
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(135deg, #0e1420 0%, #1a2235 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}

        {/* Deep gradient from bottom */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(5,8,15,0.98) 0%, rgba(5,8,15,0.7) 40%, rgba(5,8,15,0.1) 70%, transparent 100%)",
        }} />

        {/* Top badges row */}
        <div style={{
          position: "absolute", top: 14, left: 14, right: 14,
          display: "flex", justifyContent: "space-between", alignItems: "flex-start",
        }}>
          {/* Left: Featured + CaseTrust */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {firm.isFeatured && (
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 4,
                background: "linear-gradient(135deg, rgba(200,136,31,0.92), rgba(160,108,21,0.92))",
                backdropFilter: "blur(8px)",
                color: "#fff", fontSize: 10, fontWeight: 800,
                padding: "4px 10px", borderRadius: 20,
                letterSpacing: "0.06em", textTransform: "uppercase",
                boxShadow: "0 2px 12px rgba(200,136,31,0.4)",
              }}>
                <svg width="8" height="8" viewBox="0 0 24 24" fill="#fff"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                Featured
              </span>
            )}
            {firm.isCaseTrust && (
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 4,
                background: "rgba(73,169,203,0.18)",
                backdropFilter: "blur(8px)",
                color: "#49A9CB", fontSize: 10, fontWeight: 700,
                padding: "4px 10px", borderRadius: 20,
                letterSpacing: "0.05em",
                border: "1px solid rgba(73,169,203,0.35)",
              }}>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#49A9CB" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                CaseTrust
              </span>
            )}
          </div>

          {/* Right: Logo badge */}
          <div style={{
            width: 44, height: 44, borderRadius: 10,
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(12px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden", flexShrink: 0,
            boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
            border: "1px solid rgba(255,255,255,0.6)",
          }}>
            <LogoFallback firm={firm} />
          </div>
        </div>

        {/* Bottom content overlay */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "20px 18px 16px",
        }}>
          {/* Stars + rating */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
            <StarRow rating={firm.rating} />
            <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{firm.rating.toFixed(1)}</span>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>({firm.reviewCount} reviews)</span>
          </div>

          {/* Firm name */}
          <h3 style={{
            color: "#fff", fontWeight: 800,
            fontSize: featured ? 22 : 18,
            margin: "0 0 4px",
            lineHeight: 1.2,
            textShadow: "0 2px 8px rgba(0,0,0,0.5)",
          }}>
            {firm.name}
          </h3>

          {/* Location + Est */}
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 10 }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#49A9CB" strokeWidth="2.5" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
            <span style={{ fontSize: 12, color: "#49A9CB", fontWeight: 600 }}>{firm.district}</span>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", margin: "0 2px" }}>·</span>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Est. {firm.established}</span>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", margin: "0 2px" }}>·</span>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>S${(firm.avgBudget / 1000).toFixed(0)}K avg</span>
          </div>

          {/* Project split mini bars */}
          <ProjectSplitBar firm={firm} />

          {/* Style tags */}
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 10, marginBottom: 14 }}>
            {firm.styles.slice(0, 3).map((s) => (
              <span key={s} style={{
                fontSize: 10, fontWeight: 600, padding: "3px 8px",
                borderRadius: 12, letterSpacing: "0.04em",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.6)",
              }}>{s}</span>
            ))}
          </div>

          {/* CTA buttons */}
          <div style={{ display: "flex", gap: 8 }}>
            <Link
              href={`/firms/${firm.slug}`}
              className="hm-btn-primary"
              style={{ flex: 1, justifyContent: "center" }}
            >
              View Profile
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </Link>
            <Link
              href={`/firms/${firm.slug}#enquire`}
              className="hm-btn-ghost"
              style={{ flex: 1, justifyContent: "center" }}
            >
              Enquire
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Logo with text fallback ─────────────────────── */
function LogoFallback({ firm }: { firm: Firm }) {
  const [err, setErr] = useState(false);
  if (err) {
    return (
      <span style={{ fontSize: 11, fontWeight: 800, color: "#1a2a3a", letterSpacing: "-0.02em" }}>
        {firm.name.slice(0, 2).toUpperCase()}
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={firm.logo}
      alt=""
      style={{ width: 30, height: 30, objectFit: "contain" }}
      onError={() => setErr(true)}
    />
  );
}

/* ── Stars ───────────────────────────────────────── */
function StarRow({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = rating >= i;
        const half = !filled && rating >= i - 0.5;
        return (
          <svg key={i} width="11" height="11" viewBox="0 0 24 24">
            <defs>
              {half && (
                <linearGradient id={`hg-${i}-${rating}`} x1="0" x2="1" y1="0" y2="0">
                  <stop offset="50%" stopColor="#c8881f" />
                  <stop offset="50%" stopColor="rgba(255,255,255,0.2)" />
                </linearGradient>
              )}
            </defs>
            <polygon
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
              fill={filled ? "#c8881f" : half ? `url(#hg-${i}-${rating})` : "rgba(255,255,255,0.15)"}
            />
          </svg>
        );
      })}
    </div>
  );
}

/* ── Project split mini bars ─────────────────────── */
function ProjectSplitBar({ firm }: { firm: Firm }) {
  const segments = [
    { key: "HDB",        pct: firm.projectTypes.hdb,        color: "#49A9CB" },
    { key: "Condo",      pct: firm.projectTypes.condo,      color: "#c8881f" },
    { key: "Landed",     pct: firm.projectTypes.landed,     color: "#6b7fab" },
    { key: "Commercial", pct: firm.projectTypes.commercial, color: "#3d4a63" },
  ].filter((s) => s.pct > 0);

  return (
    <div>
      <div style={{ display: "flex", borderRadius: 4, overflow: "hidden", height: 3, gap: 1 }}>
        {segments.map((s) => (
          <div key={s.key} style={{ width: `${s.pct}%`, background: s.color }} />
        ))}
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 5, flexWrap: "wrap" }}>
        {segments.slice(0, 3).map((s) => (
          <span key={s.key} style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center", gap: 3 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.color, display: "inline-block" }} />
            {s.key} {s.pct}%
          </span>
        ))}
      </div>
    </div>
  );
}
