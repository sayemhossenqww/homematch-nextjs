"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Firm, FirmProject, FirmReview } from "@/types/firm";

gsap.registerPlugin(ScrollTrigger);

type TabId = "overview" | "projects" | "reviews" | "faq";

const TABS: { id: TabId; label: string }[] = [
  { id: "overview",  label: "Overview"  },
  { id: "projects",  label: "Projects"  },
  { id: "reviews",   label: "Reviews"   },
  { id: "faq",       label: "FAQ"       },
];

const FAQ_DATA = [
  {
    q: "How does HomeMatch verify interior designers?",
    a: "All firms listed on HomeMatch are cross-verified against the CaseTrust and BCA registers. We re-verify every 6 months and display live accreditation status.",
  },
  {
    q: "Is the enquiry service really free?",
    a: "Yes — HomeMatch charges the design firm a one-time matching fee only when a project is awarded. Homeowners pay nothing, ever.",
  },
  {
    q: "How long does it take to get a reply?",
    a: "Our matched firms commit to responding within 24 hours. Most respond in under 2 hours during business days.",
  },
  {
    q: "Can I request multiple firms at once?",
    a: "Absolutely. The \"Also send to 3 similar firms\" checkbox on the enquiry form lets you collect quotes without filling in multiple forms.",
  },
  {
    q: "What happens after I submit an enquiry?",
    a: "HomeMatch reviews your brief, forwards it to the firm, and follows up after 24 hours if there's no reply — so you're never left waiting.",
  },
];

interface Props { firm: Firm; }

export default function FirmProfileTabs({ firm }: Props) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [bioExpanded, setBioExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const prevTab = useRef<TabId>("overview");

  // ── Tab transition ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!contentRef.current || prevTab.current === activeTab) return;
    const dir = TABS.findIndex((t) => t.id === activeTab) >
                TABS.findIndex((t) => t.id === prevTab.current) ? 1 : -1;
    prevTab.current = activeTab;

    gsap.fromTo(
      contentRef.current,
      { opacity: 0, x: dir * 24 },
      { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }
    );
  }, [activeTab]);

  return (
    <div style={{ fontFamily: "var(--font-montserrat, Montserrat, sans-serif)" }}>

      {/* ── Tab nav ─────────────────────────────── */}
      <div style={{
        display: "flex",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        marginBottom: 32,
        overflowX: "auto",
      }}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`hm-profile-tab${activeTab === tab.id ? " active" : ""}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Tab content ─────────────────────────── */}
      <div ref={contentRef}>
        {activeTab === "overview"  && <OverviewTab  firm={firm} bioExpanded={bioExpanded} onToggleBio={() => setBioExpanded((v) => !v)} />}
        {activeTab === "projects"  && <ProjectsTab  projects={firm.featuredProjects} />}
        {activeTab === "reviews"   && <ReviewsTab   firm={firm} />}
        {activeTab === "faq"       && <FAQTab />}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   OVERVIEW TAB
   ══════════════════════════════════════════════════ */
function OverviewTab({ firm, bioExpanded, onToggleBio }: {
  firm: Firm;
  bioExpanded: boolean;
  onToggleBio: () => void;
}) {
  const totalReviews = firm.reviewCount;
  const avgRating = firm.rating;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>

      {/* Bio */}
      <section>
        <SectionLabel>About {firm.name}</SectionLabel>
        <div style={{
          fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.8,
          overflow: "hidden",
          maxHeight: bioExpanded ? "none" : 88,
          transition: "max-height 0.35s ease",
          position: "relative",
        }}>
          {firm.bio}
          {!bioExpanded && (
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: 40,
              background: "linear-gradient(to top, #05080f, transparent)",
            }} />
          )}
        </div>
        <button onClick={onToggleBio} style={{
          marginTop: 10, background: "none", border: "none", cursor: "pointer",
          color: "#c8881f", fontSize: 12, fontWeight: 700, padding: 0,
          fontFamily: "inherit", letterSpacing: "0.03em",
        }}>
          {bioExpanded ? "Show less ↑" : "Read more →"}
        </button>
      </section>

      {/* Project type donut + breakdown */}
      <section>
        <SectionLabel>Project Portfolio</SectionLabel>
        <div style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap" }}>
          {/* CSS Donut */}
          <DonutChart firm={firm} />

          {/* Legend + stats */}
          <div style={{ flex: 1, minWidth: 180, display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { label: "HDB",        pct: firm.projectTypes.hdb,        color: "#49A9CB" },
              { label: "Condo",      pct: firm.projectTypes.condo,      color: "#c8881f" },
              { label: "Landed",     pct: firm.projectTypes.landed,     color: "#6b7fab" },
              { label: "Commercial", pct: firm.projectTypes.commercial, color: "#3d4a63" },
            ].filter((x) => x.pct > 0).map((item) => (
              <div key={item.label}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: item.color, display: "inline-block" }} />
                    {item.label}
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{item.pct}%</span>
                </div>
                <div style={{ height: 3, borderRadius: 2, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${item.pct}%`, background: item.color, borderRadius: 2, transition: "width 0.8s ease" }} />
                </div>
              </div>
            ))}
            <div style={{
              marginTop: 8, padding: "10px 14px", borderRadius: 10,
              background: "rgba(200,136,31,0.07)", border: "1px solid rgba(200,136,31,0.15)",
              display: "flex", gap: 20,
            }}>
              <div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 2 }}>Avg Budget</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#c8881f" }}>S${(firm.avgBudget / 1000).toFixed(0)}K</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 2 }}>Response</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>{firm.responseTime}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 2 }}>Team</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>{firm.teamSize} pax</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Badges */}
      {firm.badges.length > 0 && (
        <section>
          <SectionLabel>HomeMatch Badges</SectionLabel>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {firm.badges.map((badge) => (
              <div key={badge.id} style={{
                padding: "14px 18px", borderRadius: 14,
                background: "rgba(200,136,31,0.07)",
                border: "1px solid rgba(200,136,31,0.2)",
                display: "flex", flexDirection: "column", gap: 4,
                minWidth: 140,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#c8881f"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                  <span style={{ fontSize: 11, fontWeight: 800, color: "#c8881f", letterSpacing: "0.05em" }}>Grade {badge.grade}</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{badge.label}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>{badge.description}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Accreditations */}
      {firm.accreditations.length > 0 && (
        <section>
          <SectionLabel>Government Accreditations</SectionLabel>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {firm.accreditations.map((acc) => (
              <div key={acc} className="hm-tooltip" style={{ display: "inline-flex" }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "8px 14px", borderRadius: 10,
                  background: "rgba(73,169,203,0.08)",
                  border: "1px solid rgba(73,169,203,0.25)",
                  fontSize: 12, fontWeight: 700, color: "#49A9CB",
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#49A9CB" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                  {acc}
                </span>
                <span className="hm-tooltip-text">
                  {acc === "CaseTrust" ? "Singapore Consumer Association accreditation" :
                   acc === "BCA Registered" ? "Building & Construction Authority registration" :
                   "Government-backed accreditation"}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Rating snapshot */}
      <section>
        <SectionLabel>Rating Snapshot</SectionLabel>
        <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{
              fontSize: 52, fontWeight: 900, color: "#fff",
              lineHeight: 1, letterSpacing: "-0.04em",
            }}>
              {avgRating.toFixed(1)}
            </div>
            <StarRow rating={avgRating} size={14} />
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>
              {totalReviews} reviews
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 180 }}>
            {[5, 4, 3, 2, 1].map((star) => {
              const count = firm.reviews.filter((r) => Math.round(r.rating) === star).length;
              const pct = firm.reviews.length ? (count / firm.reviews.length) * 100 : 0;
              return (
                <div key={star} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", width: 16, textAlign: "right" }}>{star}</span>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="#c8881f"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                  <div style={{ flex: 1, height: 6, borderRadius: 3, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: "#c8881f", borderRadius: 3 }} />
                  </div>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", width: 24 }}>{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   PROJECTS TAB
   ══════════════════════════════════════════════════ */
function ProjectsTab({ projects }: { projects: FirmProject[] }) {
  const [filter, setFilter] = useState<string>("All");
  const types = ["All", ...Array.from(new Set(projects.map((p) => p.propertyType)))];

  const shown = filter === "All" ? projects : projects.filter((p) => p.propertyType === filter);

  return (
    <div>
      {/* Filter pills */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`hm-pill${filter === t ? " active-gold" : ""}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Horizontal scroll gallery */}
      <div className="hm-gallery-scroll" style={{ display: "flex", gap: 14, paddingBottom: 12 }}>
        {shown.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: FirmProject }) {
  const [hovered, setHovered] = useState(false);
  const [imgErr, setImgErr] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        width: 280, flexShrink: 0,
        borderRadius: 16, overflow: "hidden",
        background: "#0a0d14",
        border: "1px solid rgba(255,255,255,0.07)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered ? "0 16px 40px rgba(0,0,0,0.4)" : "none",
      }}
    >
      <div style={{ height: 200, position: "relative", overflow: "hidden" }}>
        {!imgErr ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.photoUrl}
            alt={project.style}
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              transition: "transform 0.5s ease",
              transform: hovered ? "scale(1.06)" : "scale(1)",
            }}
            onError={() => setImgErr(true)}
          />
        ) : (
          <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #0e1420, #1a2235)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="3" /><polyline points="21 15 16 10 5 21" /></svg>
          </div>
        )}
        {/* Hover overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(5,8,15,0.7)",
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: hovered ? 1 : 0, transition: "opacity 0.3s",
        }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#fff", letterSpacing: "0.05em" }}>
            {project.style}
          </span>
        </div>
      </div>
      <div style={{ padding: "12px 14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{project.roomType}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{project.propertyType}</div>
          </div>
          {project.budget && (
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#c8881f" }}>
                S${(project.budget / 1000).toFixed(0)}K
              </div>
              {project.sqft && <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>{project.sqft} sqft</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   REVIEWS TAB
   ══════════════════════════════════════════════════ */
type SortKey = "newest" | "highest" | "helpful";
const SORT_LABELS: { id: SortKey; label: string }[] = [
  { id: "newest",  label: "Newest First"  },
  { id: "highest", label: "Highest Rated" },
  { id: "helpful", label: "Most Helpful"  },
];

function ReviewsTab({ firm }: { firm: Firm }) {
  const [sort, setSort] = useState<SortKey>("newest");
  const [shown, setShown] = useState(4);
  const reviewsRef = useRef<HTMLDivElement>(null);

  const sorted = useMemo(() => {
    const copy = [...firm.reviews];
    if (sort === "highest") copy.sort((a, b) => b.rating - a.rating);
    else if (sort === "helpful") copy.sort((a, b) => b.helpfulCount - a.helpfulCount);
    else copy.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return copy;
  }, [firm.reviews, sort]);

  // Stagger new cards on mount
  useEffect(() => {
    const cards = reviewsRef.current?.querySelectorAll(".hm-review-card");
    if (!cards?.length) return;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out", clearProps: "all" }
    );
  }, [sort]);

  return (
    <div>
      {/* Sort controls */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Sort:</span>
        {SORT_LABELS.map((s) => (
          <button
            key={s.id}
            onClick={() => setSort(s.id)}
            className={`hm-pill${sort === s.id ? " active-teal" : ""}`}
            style={{ fontSize: 11 }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Review cards */}
      <div ref={reviewsRef} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {sorted.slice(0, shown).map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {shown < sorted.length && (
        <button
          onClick={() => setShown((n) => n + 4)}
          style={{
            marginTop: 20, width: "100%",
            padding: "13px 0",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 12, cursor: "pointer",
            fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)",
            fontFamily: "inherit", transition: "background 0.15s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
        >
          Show more ({sorted.length - shown} remaining)
        </button>
      )}
    </div>
  );
}

function ReviewCard({ review }: { review: FirmReview }) {
  return (
    <div
      className="hm-review-card"
      style={{
        padding: "18px 20px", borderRadius: 14,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderLeft: "3px solid rgba(200,136,31,0.35)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, gap: 12 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {/* Avatar */}
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: `hsl(${review.reviewerName.charCodeAt(0) * 7 % 360}, 40%, 25%)`,
            border: "1px solid rgba(255,255,255,0.1)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 700, color: "#fff", flexShrink: 0,
          }}>
            {review.reviewerName.charAt(0).toUpperCase()}
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{review.reviewerName}</span>
              <span style={{
                fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 4,
                background: "rgba(73,169,203,0.12)", color: "#49A9CB",
                letterSpacing: "0.04em", textTransform: "uppercase",
              }}>Verified</span>
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 1 }}>
              {review.renovationType} · S${(review.budget / 1000).toFixed(0)}K
              {review.designerName && ` · Designer: ${review.designerName}`}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3 }}>
          <StarRow rating={review.rating} size={11} />
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>
            {new Date(review.date).toLocaleDateString("en-SG", { year: "numeric", month: "short" })}
          </span>
        </div>
      </div>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.75, margin: 0 }}>
        {review.body}
      </p>
      <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 6 }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" /></svg>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{review.helpfulCount} found this helpful</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   FAQ TAB
   ══════════════════════════════════════════════════ */
function FAQTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {FAQ_DATA.map((item, i) => (
        <FAQItem key={i} question={item.q} answer={item.a} />
      ))}
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`hm-faq-item${open ? " open" : ""}`}>
      <button className="hm-faq-trigger" onClick={() => setOpen((v) => !v)}>
        <span>{question}</span>
        <svg className="hm-faq-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div style={{
        overflow: "hidden",
        maxHeight: open ? 300 : 0,
        transition: "max-height 0.35s cubic-bezier(0.22,1,0.36,1)",
        opacity: open ? 1 : 0,
      }}>
        <p style={{
          fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.8,
          margin: "0 0 18px",
          borderLeft: "3px solid rgba(200,136,31,0.4)",
          paddingLeft: 14,
        }}>
          {answer}
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   SHARED HELPERS
   ══════════════════════════════════════════════════ */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 style={{
      fontSize: 11, fontWeight: 800,
      color: "rgba(255,255,255,0.35)",
      letterSpacing: "0.12em", textTransform: "uppercase",
      margin: "0 0 14px",
    }}>
      {children}
    </h3>
  );
}

function StarRow({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = rating >= i;
        const half = !filled && rating >= i - 0.5;
        return (
          <svg key={i} width={size} height={size} viewBox="0 0 24 24">
            <defs>
              {half && (
                <linearGradient id={`hpg-${i}-${rating}`} x1="0" x2="1" y1="0" y2="0">
                  <stop offset="50%" stopColor="#c8881f" />
                  <stop offset="50%" stopColor="rgba(255,255,255,0.15)" />
                </linearGradient>
              )}
            </defs>
            <polygon
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
              fill={filled ? "#c8881f" : half ? `url(#hpg-${i}-${rating})` : "rgba(255,255,255,0.15)"}
            />
          </svg>
        );
      })}
    </div>
  );
}

function DonutChart({ firm }: { firm: Firm }) {
  const { hdb, condo, landed, commercial } = firm.projectTypes;
  let cumulative = 0;
  const segments = [
    { pct: hdb,        color: "#49A9CB" },
    { pct: condo,      color: "#c8881f" },
    { pct: landed,     color: "#6b7fab" },
    { pct: commercial, color: "#3d4a63" },
  ].filter((s) => s.pct > 0);

  const stops = segments.map((s) => {
    const start = cumulative;
    cumulative += s.pct;
    return `${s.color} ${start}% ${cumulative}%`;
  }).join(", ");

  return (
    <div style={{ position: "relative", flexShrink: 0 }}>
      <div style={{
        width: 120, height: 120, borderRadius: "50%",
        background: `conic-gradient(${stops})`,
        WebkitMask: "radial-gradient(circle, transparent 40px, black 40px)",
        mask: "radial-gradient(circle, transparent 40px, black 40px)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ fontSize: 11, fontWeight: 800, color: "#fff", lineHeight: 1 }}>
          {Math.max(hdb, condo, landed, commercial)}%
        </span>
        <span style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>
          {hdb >= condo && hdb >= landed && hdb >= commercial ? "HDB" :
           condo >= landed && condo >= commercial ? "Condo" :
           landed >= commercial ? "Landed" : "Comm."}
        </span>
      </div>
    </div>
  );
}

