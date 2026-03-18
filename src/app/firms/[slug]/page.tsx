import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getFirmBySlug, getRelatedFirms, firms } from "@/data/firms";
import FirmProfileTabs from "@/components/firms/FirmProfileTabs";
import FirmEnquirySidebar from "@/components/firms/FirmEnquirySidebar";
import FirmStickyHeader from "@/components/firms/FirmStickyHeader";
import FirmHeroLogo from "@/components/firms/FirmHeroLogo";
import FirmCard from "@/components/firms/FirmCard";

// ── Static params ─────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  return firms.map((f) => ({ slug: f.slug }));
}

// ── Per-firm metadata ─────────────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const firm = getFirmBySlug(slug);
  if (!firm) return {};
  return {
    title: `${firm.name} | Interior Design Singapore | HomeMatch`,
    description: firm.shortBio,
    openGraph: {
      title: `${firm.name} — Interior Design Firm in Singapore`,
      description: firm.shortBio,
      images: [firm.bannerPhoto],
      type: "website",
    },
    alternates: { canonical: `https://www.homematch.sg/firms/${firm.slug}` },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function FirmProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const firm = getFirmBySlug(slug);
  if (!firm) notFound();

  const related = getRelatedFirms(firm, 3);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#05080f",
      color: "#fff",
      fontFamily: "var(--font-montserrat, Montserrat, sans-serif)",
    }}>
      {/* ── Sticky header (client, appears after hero scrolls out) ─────────── */}
      <FirmStickyHeader firm={firm} heroId="firm-hero" />

      {/* ══════════════════════════════════════════
          HERO — 85vh full-bleed
          ══════════════════════════════════════════ */}
      <div
        id="firm-hero"
        style={{
          position: "relative",
          height: "85vh",
          minHeight: 560,
          maxHeight: 900,
          overflow: "hidden",
        }}
      >
        {/* Background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={firm.bannerPhoto}
          alt={firm.name}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            objectPosition: "center 30%",
          }}
        />

        {/* Gradient layers */}
        <div style={{
          position: "absolute", inset: 0,
          background: [
            "linear-gradient(to top, rgba(5,8,15,1) 0%, rgba(5,8,15,0.6) 40%, rgba(5,8,15,0.15) 70%, transparent 100%)",
            "linear-gradient(to right, rgba(5,8,15,0.6) 0%, transparent 50%)",
          ].join(", "),
        }} />
        {/* Noise texture overlay */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
          opacity: 0.4,
        }} />

        {/* Breadcrumb */}
        <div style={{
          position: "absolute", top: 24, left: 24,
          display: "flex", alignItems: "center", gap: 8,
          zIndex: 10,
        }}>
          <Link href="/firms" style={{
            display: "flex", alignItems: "center", gap: 5,
            color: "rgba(255,255,255,0.5)", textDecoration: "none",
            fontSize: 12, fontWeight: 600, transition: "color 0.15s",
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
            All Firms
          </Link>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{firm.name}</span>
        </div>

        {/* Hero content — bottom-left */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "0 32px 40px",
          display: "flex", flexDirection: "column", gap: 0,
          maxWidth: 800,
        }}>
          {/* Badges row */}
          <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
            {firm.isCaseTrust && (
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                padding: "5px 12px", borderRadius: 20,
                background: "rgba(73,169,203,0.15)",
                border: "1px solid rgba(73,169,203,0.4)",
                backdropFilter: "blur(8px)",
                fontSize: 11, fontWeight: 700, color: "#49A9CB",
              }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                CaseTrust Certified
              </span>
            )}
            {firm.isFeatured && (
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                padding: "5px 12px", borderRadius: 20,
                background: "rgba(200,136,31,0.15)",
                border: "1px solid rgba(200,136,31,0.4)",
                backdropFilter: "blur(8px)",
                fontSize: 11, fontWeight: 700, color: "#c8881f",
              }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="#c8881f"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                Featured Firm
              </span>
            )}
            {firm.isVerified && (
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                padding: "5px 12px", borderRadius: 20,
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
                fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.6)",
              }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                HomeMatch Verified
              </span>
            )}
          </div>

          {/* Logo + name */}
          <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 12 }}>
            <div style={{
              width: 72, height: 72, borderRadius: 16,
              background: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(12px)",
              display: "flex", alignItems: "center", justifyContent: "center",
              overflow: "hidden", flexShrink: 0,
              border: "2px solid rgba(255,255,255,0.5)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            }}>
              <FirmHeroLogo src={firm.logo} name={firm.name} />
            </div>
            <div>
              <h1 style={{
                fontSize: "clamp(28px, 5vw, 52px)",
                fontWeight: 900, margin: 0,
                lineHeight: 1.05, letterSpacing: "-0.03em",
                color: "#fff",
                textShadow: "0 2px 20px rgba(0,0,0,0.5)",
              }}>
                {firm.name}
              </h1>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#49A9CB" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                <span style={{ fontSize: 13, color: "#49A9CB", fontWeight: 600 }}>{firm.district}</span>
                <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Est. {firm.established}</span>
                <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{firm.teamSize} designers</span>
              </div>
            </div>
          </div>

          {/* Rating + review count */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <StarRow rating={firm.rating} />
            <span style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>{firm.rating.toFixed(1)}</span>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>({firm.reviewCount} reviews)</span>
            <span style={{ color: "rgba(255,255,255,0.15)" }}>|</span>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>S${(firm.avgBudget / 1000).toFixed(0)}K avg project</span>
          </div>

          {/* Action links */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href={`#enquire`} className="hm-btn-primary">
              Send Enquiry
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
            </Link>
            {firm.website && (
              <a href={firm.website} target="_blank" rel="noopener noreferrer" className="hm-btn-ghost">
                Website
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
              </a>
            )}
            {firm.whatsapp && (
              <a href={`https://wa.me/${firm.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hm-btn-ghost">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
                WhatsApp
              </a>
            )}
            {firm.phone && (
              <a href={`tel:${firm.phone}`} className="hm-btn-ghost">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                Call
              </a>
            )}
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="hm-scroll-indicator"
          style={{
            position: "absolute", bottom: 32, right: 32,
            display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
          }}
        >
          <span style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Scroll</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
          </svg>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          QUICK STATS BAR
          ══════════════════════════════════════════ */}
      <div style={{
        background: "#0a0d14",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{
          maxWidth: 1280, margin: "0 auto", padding: "0 32px",
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 0,
        }}>
          {[
            { label: "Projects Completed", value: `${Math.round(firm.reviewCount * 1.3)}+` },
            { label: "Average Budget",     value: `S$${(firm.avgBudget / 1000).toFixed(0)}K` },
            { label: "Top Project Type",   value: Object.entries(firm.projectTypes).sort(([,a],[,b]) => b - a)[0][0].charAt(0).toUpperCase() + Object.entries(firm.projectTypes).sort(([,a],[,b]) => b - a)[0][0].slice(1) },
            { label: "Established",        value: `${firm.established}` },
            { label: "Response Time",      value: firm.responseTime },
          ].map((stat, i, arr) => (
            <div key={stat.label} style={{
              padding: "20px 24px",
              borderRight: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
              textAlign: "center",
            }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", marginBottom: 4 }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          MAIN CONTENT — 2-col
          ══════════════════════════════════════════ */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 32px 80px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 380px",
          gap: 40,
          alignItems: "start",
        }}>
          {/* Left: Tabs */}
          <div>
            <FirmProfileTabs firm={firm} />

            {/* Showroom card */}
            {firm.showroomAddress && (
              <div style={{
                marginTop: 40, padding: "20px 24px", borderRadius: 16,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                display: "flex", gap: 16, alignItems: "flex-start",
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                  background: "rgba(73,169,203,0.1)", border: "1px solid rgba(73,169,203,0.25)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#49A9CB" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Showroom</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 3 }}>{firm.showroomAddress}</div>
                  {firm.showroomHours && (
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{firm.showroomHours}</div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right: Enquiry sidebar */}
          <div>
            <FirmEnquirySidebar firm={firm} />

            {/* Safety card */}
            <div style={{
              marginTop: 16, padding: "16px 18px", borderRadius: 14,
              background: "rgba(73,169,203,0.05)",
              border: "1px solid rgba(73,169,203,0.15)",
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#49A9CB", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>
                Why HomeMatch?
              </div>
              {[
                "All firms CaseTrust-verified",
                "Free service — no hidden fees",
                "Compare up to 6 quotes at once",
                "Follow-up within 24 hours",
              ].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#49A9CB" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          RELATED FIRMS
          ══════════════════════════════════════════ */}
      {related.length > 0 && (
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "56px 32px 80px",
          background: "#05080f",
        }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: "#fff", margin: 0, letterSpacing: "-0.02em" }}>
                Similar Firms
              </h2>
              <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, rgba(200,136,31,0.3), transparent)" }} />
              <Link href="/firms" style={{ fontSize: 12, fontWeight: 700, color: "#c8881f", textDecoration: "none" }}>
                View all →
              </Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {related.map((f) => <FirmCard key={f.id} firm={f} />)}
            </div>
          </div>
        </div>
      )}

      {/* Responsive overrides */}
      <style>{`
        @media (max-width: 1024px) {
          #firm-profile-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          #firm-stats-bar { grid-template-columns: repeat(3, 1fr) !important; }
          #related-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          #related-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

/* ── Stars ───────────────────────────────────────── */
function StarRow({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24">
          <polygon
            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
            fill={rating >= i ? "#c8881f" : rating >= i - 0.5 ? "url(#halfGrad)" : "rgba(255,255,255,0.15)"}
          />
        </svg>
      ))}
    </div>
  );
}
