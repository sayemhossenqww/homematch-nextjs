"use client";

import { useState, useMemo, useEffect, useRef, useCallback, Fragment } from "react";
import Link from "next/link";
import gsap from "gsap";
import FirmCard from "@/components/firms/FirmCard";
import type { Firm } from "@/types/firm";

// ── Category tabs ─────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: "all",        label: "All Firms" },
  { id: "featured",   label: "Featured" },
  { id: "hdb",        label: "HDB Specialist" },
  { id: "condo",      label: "Condo Specialist" },
  { id: "boutique",   label: "Boutique" },
  { id: "casetrust",  label: "CaseTrust" },
] as const;
type CategoryId = typeof CATEGORIES[number]["id"];

// ── Sort options ──────────────────────────────────────────────────────────────
const SORT_OPTIONS = [
  { id: "recommended", label: "Recommended" },
  { id: "rating",      label: "Highest Rated" },
  { id: "reviews",     label: "Most Reviewed" },
  { id: "budget-asc",  label: "Budget: Low–High" },
  { id: "budget-desc", label: "Budget: High–Low" },
] as const;
type SortId = typeof SORT_OPTIONS[number]["id"];

// ── Style filter chips ────────────────────────────────────────────────────────
const STYLE_CHIPS = ["Contemporary", "Japandi", "Minimalist", "Luxury", "Scandinavian", "Industrial"];

interface Props { firms: Firm[]; }

export default function FirmDirectoryClient({ firms }: Props) {
  const [category, setCategory]     = useState<CategoryId>("all");
  const [search, setSearch]         = useState("");
  const [sortBy, setSortBy]         = useState<SortId>("recommended");
  const [activeStyles, setStyles]   = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [pillBarSticky, setPillBarSticky] = useState(false);

  const gridRef  = useRef<HTMLDivElement>(null);
  const heroRef  = useRef<HTMLDivElement>(null);
  const pillRef  = useRef<HTMLDivElement>(null);

  // ── Sticky pill bar on scroll ────────────────────────────────────────────
  useEffect(() => {
    const sentinel = heroRef.current;
    if (!sentinel) return;
    const obs = new IntersectionObserver(
      ([e]) => setPillBarSticky(!e.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(sentinel);
    return () => obs.disconnect();
  }, []);

  // ── Filter + sort ────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let out = [...firms];

    // Category
    if (category === "featured")  out = out.filter((f) => f.isFeatured);
    else if (category === "hdb")  out = out.filter((f) => f.projectTypes.hdb >= 40);
    else if (category === "condo") out = out.filter((f) => f.projectTypes.condo >= 35);
    else if (category === "boutique") out = out.filter((f) => f.isBoutique);
    else if (category === "casetrust") out = out.filter((f) => f.isCaseTrust);

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      out = out.filter((f) =>
        f.name.toLowerCase().includes(q) ||
        f.district.toLowerCase().includes(q) ||
        f.styles.some((s) => s.toLowerCase().includes(q))
      );
    }

    // Style chips
    if (activeStyles.length) {
      out = out.filter((f) => activeStyles.every((s) => f.styles.includes(s)));
    }

    // Sort
    if (sortBy === "rating")      out.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "reviews") out.sort((a, b) => b.reviewCount - a.reviewCount);
    else if (sortBy === "budget-asc") out.sort((a, b) => a.avgBudget - b.avgBudget);
    else if (sortBy === "budget-desc") out.sort((a, b) => b.avgBudget - a.avgBudget);
    else out.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));

    return out;
  }, [firms, category, search, activeStyles, sortBy]);

  // ── GSAP stagger on filter change ────────────────────────────────────────
  const prevFilterKey = useRef("");
  useEffect(() => {
    const key = `${category}-${search}-${sortBy}-${activeStyles.join(",")}`;
    if (key === prevFilterKey.current) return;
    prevFilterKey.current = key;

    const cards = gridRef.current?.querySelectorAll(".firm-card");
    if (!cards?.length) return;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.06, ease: "power2.out", clearProps: "all" }
    );
  }, [category, search, sortBy, activeStyles]);

  // ── Initial mount animation ───────────────────────────────────────────────
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(".firm-card");
    if (cards?.length) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power2.out", delay: 0.3, clearProps: "all" }
      );
    }
  }, []);

  const toggleStyle = useCallback((s: string) => {
    setStyles((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  }, []);

  const clearAll = useCallback(() => {
    setCategory("all");
    setSearch("");
    setSortBy("recommended");
    setStyles([]);
  }, []);

  const hasFilters = category !== "all" || search.trim() !== "" || activeStyles.length > 0 || sortBy !== "recommended";
  const featuredFirms = firms.filter((f) => f.isFeatured);
  const showFeaturedStrip = category === "all" && !search.trim() && !activeStyles.length && featuredFirms.length > 0;

  return (
    <div style={{ minHeight: "100vh", background: "#05080f", color: "#fff", fontFamily: "var(--font-montserrat, Montserrat, sans-serif)" }}>

      {/* ════════════════════════════════════════════
          HERO
          ════════════════════════════════════════════ */}
      <div
        ref={heroRef}
        style={{
          position: "relative",
          padding: "100px 24px 80px",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        {/* Dot-grid background */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: `
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(73,169,203,0.07) 0%, transparent 70%),
            radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)
          `,
          backgroundSize: "auto, 32px 32px",
        }} />
        {/* Fade to solid at bottom */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 120,
          background: "linear-gradient(to bottom, transparent, #05080f)",
          zIndex: 1,
        }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 760, margin: "0 auto" }}>
          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 20 }}>
            <div style={{ height: 1, width: 40, background: "linear-gradient(to right, transparent, rgba(73,169,203,0.5))" }} />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "#49A9CB", textTransform: "uppercase" }}>
              Singapore&rsquo;s Verified Network
            </span>
            <div style={{ height: 1, width: 40, background: "linear-gradient(to left, transparent, rgba(73,169,203,0.5))" }} />
          </div>

          {/* Main heading */}
          <h1 style={{
            fontSize: "clamp(36px, 7vw, 68px)",
            fontWeight: 900, lineHeight: 1.08,
            margin: "0 0 20px",
            letterSpacing: "-0.03em",
          }}>
            Find Your{" "}
            <span style={{
              background: "linear-gradient(135deg, #c8881f 0%, #e8a83a 50%, #c8881f 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Interior Designer
            </span>
          </h1>

          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, margin: "0 0 36px" }}>
            Browse {firms.length} CaseTrust-verified firms. Filter by style, project type, and budget.
            <br />Free matching service — no commitment required.
          </p>

          {/* Search bar */}
          <div style={{ position: "relative", maxWidth: 520, margin: "0 auto 28px" }}>
            <div style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)", zIndex: 1, pointerEvents: "none" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search firms, style, or district..."
              className="hm-search-input"
              style={{ width: "100%", paddingLeft: 48, paddingRight: 24, paddingTop: 16, paddingBottom: 16, fontSize: 14, boxSizing: "border-box" }}
            />
            {search && (
              <button onClick={() => setSearch("")} style={{
                position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)",
                background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)", padding: 4,
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            )}
          </div>

          {/* Stat pills */}
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { icon: "🏢", label: `${firms.length} Verified Firms` },
              { icon: "⭐", label: `${(firms.reduce((a, f) => a + f.rating, 0) / firms.length).toFixed(1)} Avg Rating` },
              { icon: "✓", label: "CaseTrust Certified" },
              { icon: "🎁", label: "Free Service" },
            ].map((stat) => (
              <span key={stat.label} style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "6px 14px", borderRadius: 20,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                fontSize: 12, color: "rgba(255,255,255,0.6)", fontWeight: 600,
              }}>
                <span>{stat.icon}</span> {stat.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════
          PILL BAR + FILTERS (sticky)
          ════════════════════════════════════════════ */}
      <div
        ref={pillRef}
        style={{
          position: "sticky", top: 0, zIndex: 40,
          background: pillBarSticky ? "rgba(5,8,15,0.92)" : "transparent",
          backdropFilter: pillBarSticky ? "blur(20px)" : "none",
          borderBottom: pillBarSticky ? "1px solid rgba(255,255,255,0.07)" : "none",
          transition: "background 0.3s, backdrop-filter 0.3s",
          padding: "0 24px",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 0, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            {/* Category tabs */}
            <div className="hm-pill-bar" style={{ display: "flex", flex: 1, gap: 0 }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`hm-cat-tab${category === cat.id ? " active" : ""}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Filter + Sort controls */}
            <div style={{ display: "flex", gap: 8, alignItems: "center", paddingLeft: 12, borderLeft: "1px solid rgba(255,255,255,0.07)", flexShrink: 0 }}>
              {/* Styles toggle */}
              <button
                onClick={() => setShowFilters((v) => !v)}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "8px 14px", borderRadius: 10, cursor: "pointer",
                  background: showFilters ? "rgba(200,136,31,0.15)" : "rgba(255,255,255,0.05)",
                  border: showFilters ? "1px solid rgba(200,136,31,0.4)" : "1px solid rgba(255,255,255,0.1)",
                  color: showFilters ? "#c8881f" : "rgba(255,255,255,0.6)",
                  fontSize: 12, fontWeight: 600, fontFamily: "inherit",
                  transition: "all 0.15s",
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="11" y1="18" x2="13" y2="18" />
                </svg>
                Styles {activeStyles.length > 0 && <span style={{ background: "#c8881f", color: "#fff", borderRadius: 10, fontSize: 10, padding: "1px 6px", fontWeight: 800 }}>{activeStyles.length}</span>}
              </button>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortId)}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 10, padding: "8px 12px",
                  color: "rgba(255,255,255,0.7)", fontSize: 12,
                  fontFamily: "inherit", cursor: "pointer", outline: "none",
                }}
              >
                {SORT_OPTIONS.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
              </select>
            </div>
          </div>

          {/* Expandable style chips */}
          <div style={{
            overflow: "hidden",
            maxHeight: showFilters ? 80 : 0,
            transition: "max-height 0.3s ease",
            opacity: showFilters ? 1 : 0,
          }}>
            <div style={{ padding: "14px 0 10px", display: "flex", gap: 8, flexWrap: "wrap" }}>
              {STYLE_CHIPS.map((s) => (
                <button
                  key={s}
                  onClick={() => toggleStyle(s)}
                  className={`hm-pill${activeStyles.includes(s) ? " active-gold" : ""}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════
          BODY
          ════════════════════════════════════════════ */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 24px 80px" }}>

        {/* Active filter chips + result count */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>
              {filtered.length} firm{filtered.length !== 1 ? "s" : ""}
            </span>
            {hasFilters && (
              <>
                {category !== "all" && (
                  <ActiveChip label={CATEGORIES.find((c) => c.id === category)?.label ?? category} onRemove={() => setCategory("all")} />
                )}
                {activeStyles.map((s) => (
                  <ActiveChip key={s} label={s} onRemove={() => toggleStyle(s)} />
                ))}
                <button onClick={clearAll} style={{
                  fontSize: 11, color: "rgba(255,255,255,0.35)", background: "none",
                  border: "none", cursor: "pointer", fontFamily: "inherit", padding: "2px 6px",
                  textDecoration: "underline",
                }}>
                  Clear all
                </button>
              </>
            )}
          </div>
        </div>

        {/* ── Featured bento strip ─────────────────── */}
        {showFeaturedStrip && (
          <div style={{ marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <h2 style={{ fontSize: 16, fontWeight: 800, color: "#fff", margin: 0, letterSpacing: "-0.01em" }}>
                Featured Firms
              </h2>
              <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, rgba(200,136,31,0.3), transparent)" }} />
              <span style={{ fontSize: 11, color: "#c8881f", fontWeight: 600, cursor: "pointer" }} onClick={() => setCategory("featured")}>
                View all →
              </span>
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: featuredFirms.length >= 2 ? "2fr 1fr" : "1fr",
              gap: 16,
            }}>
              {featuredFirms.slice(0, 1).map((f) => (
                <FirmCard key={f.id} firm={f} featured />
              ))}
              {featuredFirms.length >= 2 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {featuredFirms.slice(1, 3).map((f) => (
                    <FirmCard key={f.id} firm={f} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Section divider ──────────────────────── */}
        {showFeaturedStrip && (
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <h2 style={{ fontSize: 16, fontWeight: 800, color: "#fff", margin: 0, letterSpacing: "-0.01em" }}>
              All Firms
            </h2>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
          </div>
        )}

        {/* ── Main grid ────────────────────────────── */}
        {filtered.length === 0 ? (
          <EmptyState onClear={clearAll} />
        ) : (
          <div
            ref={gridRef}
            className="hm-firms-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 20,
            }}
          >
            {filtered.map((firm, idx) => (
              <Fragment key={firm.id}>
                <FirmCard firm={firm} />
                {(idx + 1) % 6 === 0 && idx < filtered.length - 1 && (
                  <InlineCTACard />
                )}
              </Fragment>
            ))}
          </div>
        )}
      </div>

      {/* ── Mobile sticky bottom bar ──────────────── */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "rgba(10,13,20,0.96)",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        padding: "12px 20px",
        display: "none",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 50,
      }} className="hm-mobile-bottom-bar">
        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>
          {filtered.length} firms match
        </span>
        <button style={{
          background: "linear-gradient(135deg, #c8881f, #a06c15)",
          color: "#fff", fontWeight: 700, fontSize: 13,
          border: "none", borderRadius: 10, padding: "10px 20px",
          cursor: "pointer", fontFamily: "inherit",
        }}>
          View Results
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hm-mobile-bottom-bar { display: flex !important; }
        }
      `}</style>
    </div>
  );
}

/* ── Active filter chip ──────────────────────────────────────────────────────── */
function ActiveChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "4px 10px 4px 12px",
      background: "rgba(200,136,31,0.12)",
      border: "1px solid rgba(200,136,31,0.3)",
      borderRadius: 20, fontSize: 11, color: "#c8881f", fontWeight: 600,
    }}>
      {label}
      <button onClick={onRemove} style={{
        display: "flex", alignItems: "center", background: "none", border: "none",
        cursor: "pointer", color: "rgba(200,136,31,0.7)", padding: 0, lineHeight: 1,
      }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
      </button>
    </span>
  );
}

/* ── Inline CTA card ─────────────────────────────────────────────────────────── */
function InlineCTACard() {
  return (
    <div style={{
      borderRadius: 20, overflow: "hidden",
      background: "linear-gradient(135deg, rgba(73,169,203,0.08) 0%, rgba(200,136,31,0.08) 100%)",
      border: "1px solid rgba(200,136,31,0.2)",
      padding: "32px 24px",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", textAlign: "center",
      minHeight: 200,
      gap: 16,
    }}>
      <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(200,136,31,0.1)", border: "1px solid rgba(200,136,31,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c8881f" strokeWidth="1.8" strokeLinecap="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </div>
      <div>
        <p style={{ fontSize: 14, fontWeight: 700, color: "#fff", margin: "0 0 6px" }}>
          Not sure who to pick?
        </p>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, margin: 0 }}>
          Answer 3 questions and get matched to your perfect firm — free.
        </p>
      </div>
      <Link href="/find-my-id" className="hm-btn-primary" style={{ fontSize: 12 }}>
        Find My ID — Free
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
      </Link>
    </div>
  );
}

/* ── Empty state ─────────────────────────────────────────────────────────────── */
function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div style={{ textAlign: "center", padding: "80px 24px" }}>
      <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>
      <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", margin: "0 0 8px" }}>No firms found</h3>
      <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", margin: "0 0 24px" }}>
        Try adjusting your filters or search term.
      </p>
      <button onClick={onClear} className="hm-btn-primary">
        Clear Filters
      </button>
    </div>
  );
}
