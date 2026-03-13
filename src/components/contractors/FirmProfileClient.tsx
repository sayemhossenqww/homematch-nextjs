"use client";
import { useState } from "react";
import type { ContractorFirm } from "@/lib/parseContractorHtml";

/* ─── Icons (inline SVG) ─── */
const IconGlobe = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);
const IconInsta = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
  </svg>
);
const IconFB = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const IconTikTok = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.75a8.16 8.16 0 0 0 4.77 1.53V6.83a4.85 4.85 0 0 1-1-.14z"/>
  </svg>
);
const IconStar = ({ filled }: { filled: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "#f59e0b" : "none"} stroke="#f59e0b" strokeWidth="1.5">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const IconLocation = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#49A9CB" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const IconChevron = ({ open }: { open: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform .3s" }}>
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

function StarRating({ rating }: { rating: string }) {
  const num = parseFloat(rating);
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1,2,3,4,5].map(i => <IconStar key={i} filled={i <= Math.round(num)} />)}
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderRadius: 12, border: "1px solid #e2f0f7", marginBottom: 10, overflow: "hidden", background: "#fff" }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "16px 20px", background: open ? "#f0fafc" : "#fff", border: "none", cursor: "pointer",
          textAlign: "left", gap: 12 }}
      >
        <span style={{ fontWeight: 600, fontSize: 14, color: "#1e3a5f", lineHeight: 1.4 }}>{q}</span>
        <span style={{ flexShrink: 0, color: "#49A9CB" }}><IconChevron open={open} /></span>
      </button>
      {open && (
        <div style={{ padding: "4px 20px 18px", color: "#555", fontSize: 14, lineHeight: 1.7, borderTop: "1px solid #e2f0f7" }}>
          {a}
        </div>
      )}
    </div>
  );
}

export default function FirmProfileClient({ firm }: { firm: ContractorFirm }) {
  const ratingNum = parseFloat(firm.rating) || 0;

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg,#f0fbfe 0%,#f8fffe 50%,#f0f4ff 100%)", fontFamily: "'Montserrat',sans-serif" }}>

      {/* ── Breadcrumb ── */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5f4f8", padding: "10px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#888" }}>
          <a href="/casetrust-renovation-list" style={{ color: "#49A9CB", textDecoration: "none", fontWeight: 600 }}>
            ← CaseTrust ID List
          </a>
          <span>/</span>
          <span style={{ color: "#333" }}>{firm.name}</span>
        </div>
      </div>

      {/* ── Hero Banner ── */}
      <div style={{
        background: "linear-gradient(135deg,#1b3d5c 0%,#0f5f7a 50%,#1b5f6e 100%)",
        padding: "48px 24px 60px", position: "relative", overflow: "hidden"
      }}>
        {/* Decorative blobs */}
        <div style={{ position:"absolute", top:-60, right:-60, width:300, height:300, borderRadius:"50%", background:"rgba(73,169,203,0.12)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", bottom:-80, left:-40, width:250, height:250, borderRadius:"50%", background:"rgba(187,230,239,0.1)", pointerEvents:"none" }}/>

        <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", gap:32, alignItems:"center", flexWrap:"wrap", position:"relative", zIndex:1 }}>
          {/* Logo */}
          <div style={{
            width: 120, height: 120, borderRadius: 20, background: "#fff", padding: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 8px 32px rgba(0,0,0,0.25)", flexShrink: 0
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={firm.logoUrl || "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/689da894c001553dad21c01f_firm-logo-loader.svg"}
              alt={firm.name} style={{ width:"100%", height:"100%", objectFit:"contain", borderRadius:12 }} />
          </div>

          {/* Name + trust signals */}
          <div style={{ flex: 1, minWidth: 240 }}>
            <div style={{ display:"flex", gap:8, marginBottom:10, flexWrap:"wrap" }}>
              {firm.casetrust && (
                <span style={{ background:"rgba(255,255,255,0.15)", color:"#BBE6EF", fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:20, border:"1px solid rgba(187,230,239,0.3)" }}>
                  ✓ CaseTrust
                </span>
              )}
              {firm.hdb && (
                <span style={{ background:"rgba(255,255,255,0.15)", color:"#BBE6EF", fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:20, border:"1px solid rgba(187,230,239,0.3)" }}>
                  ✓ HDB Approved
                </span>
              )}
              <span style={{ background:"rgba(73,169,203,0.3)", color:"#BBE6EF", fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:20, border:"1px solid rgba(73,169,203,0.4)" }}>
                ✦ Safest-Smartest
              </span>
            </div>

            <h1 style={{ color:"#fff", fontSize: "clamp(24px,4vw,38px)", fontWeight:800, margin:"0 0 12px", lineHeight:1.2 }}>
              {firm.name}
            </h1>

            {/* Rating row */}
            {firm.rating && (
              <div style={{ display:"flex", alignItems:"center", gap:12, flexWrap:"wrap" }}>
                <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <StarRating rating={firm.rating} />
                  <span style={{ color:"#f59e0b", fontWeight:700, fontSize:16 }}>{ratingNum.toFixed(1)}</span>
                  <span style={{ color:"rgba(255,255,255,0.7)", fontSize:13 }}>({firm.reviewCount})</span>
                </div>
                {firm.reviewPlatforms.map((p, i) => (
                  <a key={i} href={p.url} target="_blank" rel="noopener noreferrer"
                    style={{ display:"flex", alignItems:"center", gap:5, background:"rgba(255,255,255,0.12)", borderRadius:20, padding:"4px 12px", textDecoration:"none", color:"#fff", fontSize:12, fontWeight:600 }}>
                    {p.platform === "google"
                      ? <span>G</span>
                      : <span>f</span>}
                    {p.rating} · {p.count}
                  </a>
                ))}
              </div>
            )}

            {/* Individual designers */}
            {firm.indivDesigners.length > 0 && (
              <div style={{ marginTop: 16, display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
                <div style={{ display:"flex" }}>
                  {firm.indivDesigners.slice(0, 4).map((d, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={i} src={d.photoUrl} alt="" style={{
                      width:40, height:40, borderRadius:"50%", objectFit:"cover",
                      border:"2px solid #0f5f7a", marginLeft: i > 0 ? -10 : 0,
                    }} />
                  ))}
                </div>
                <a href={`/safest-smartest-assurance`} target="_blank" rel="noopener noreferrer"
                  style={{ fontSize:12, color:"#BBE6EF", fontWeight:600 }}>
                  Individually Screened ✓
                </a>
              </div>
            )}
          </div>

          {/* CTA */}
          <div style={{ display:"flex", flexDirection:"column", gap:10, alignItems:"stretch", minWidth:200 }}>
            <a href={`https://enquire.homematch.sg/?utm_firm=${encodeURIComponent(firm.name)}`}
              target="_blank" rel="noopener noreferrer"
              style={{
                background:"linear-gradient(135deg,#49A9CB,#2d8aad)", color:"#fff", fontWeight:700,
                padding:"14px 28px", borderRadius:12, textDecoration:"none", textAlign:"center",
                fontSize:15, boxShadow:"0 4px 20px rgba(73,169,203,0.4)", display:"block"
              }}>
              Enquire with {firm.name.split(" ")[0]} →
            </a>
            <a href={`/featured-interior-firms/${firm.featuredSlug}`} target="_blank" rel="noopener noreferrer"
              style={{
                background:"rgba(255,255,255,0.12)", color:"#BBE6EF", fontWeight:600,
                padding:"10px 20px", borderRadius:12, textDecoration:"none", textAlign:"center",
                fontSize:13, border:"1px solid rgba(255,255,255,0.2)", display:"block"
              }}>
              🤔 Why Choose {firm.name.split(" ")[0]}?
            </a>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div style={{ maxWidth:1100, margin:"-24px auto 48px", padding:"0 24px", display:"grid", gridTemplateColumns:"300px 1fr", gap:24, alignItems:"start" }}>

        {/* ── LEFT SIDEBAR ── */}
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>

          {/* Accreditations card */}
          <div style={{ background:"#fff", borderRadius:16, padding:20, boxShadow:"0 4px 20px rgba(0,40,80,0.06)", border:"1px solid #e5f4f8" }}>
            <h2 style={{ margin:"0 0 14px", fontSize:15, fontWeight:700, color:"#1e3a5f", display:"flex", alignItems:"center", gap:8 }}>
              🏅 Accreditations
            </h2>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {firm.casetrust && (
                <div style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 12px", background:"#f0fafc", borderRadius:10 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/638459f294b18f9f97d662df_CaseTrust%20Logo.svg" alt="CaseTrust" style={{ height:24 }} />
                  <div>
                    <div style={{ fontSize:11, color:"#888", fontWeight:600 }}>CaseTrust</div>
                    <div style={{ fontSize:13, fontWeight:700, color:"#1e3a5f" }}>{firm.casetrust}</div>
                  </div>
                </div>
              )}
              {firm.hdb && (
                <div style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 12px", background:"#f0fafc", borderRadius:10 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/67162363a138e254fd65817f_hdb.png" alt="HDB" style={{ height:24 }} />
                  <div>
                    <div style={{ fontSize:11, color:"#888", fontWeight:600 }}>HDB Approved</div>
                    <div style={{ fontSize:13, fontWeight:700, color:"#1e3a5f" }}>{firm.hdb}</div>
                  </div>
                </div>
              )}
              <a href="/safest-smartest-assurance" target="_blank" rel="noopener noreferrer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/662bc5936e4583d19115f3a0_s-s%20long.png" alt="Safest Smartest" style={{ width:"100%", borderRadius:8, marginTop:4 }} />
              </a>
            </div>
          </div>

          {/* Showrooms card */}
          {firm.showrooms.length > 0 && (
            <div style={{ background:"#fff", borderRadius:16, padding:20, boxShadow:"0 4px 20px rgba(0,40,80,0.06)", border:"1px solid #e5f4f8" }}>
              <h2 style={{ margin:"0 0 14px", fontSize:15, fontWeight:700, color:"#1e3a5f" }}>
                📍 Showrooms
              </h2>
              {firm.showrooms.map((s, i) => (
                <div key={i} style={{ display:"flex", gap:10, marginBottom: i < firm.showrooms.length-1 ? 12 : 0, alignItems:"flex-start" }}>
                  <div style={{ marginTop:2 }}><IconLocation /></div>
                  <div>
                    <div style={{ fontSize:12, color:"#49A9CB", fontWeight:700, marginBottom:2 }}>{s.region}</div>
                    <div style={{ fontSize:13, color:"#444", lineHeight:1.5 }}>{s.address}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Social links card */}
          {Object.values(firm.social).some(Boolean) && (
            <div style={{ background:"#fff", borderRadius:16, padding:20, boxShadow:"0 4px 20px rgba(0,40,80,0.06)", border:"1px solid #e5f4f8" }}>
              <h2 style={{ margin:"0 0 14px", fontSize:15, fontWeight:700, color:"#1e3a5f" }}>
                🔗 Connect
              </h2>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                {firm.social.website && (
                  <a href={firm.social.website} target="_blank" rel="noopener noreferrer"
                    style={{ display:"flex", alignItems:"center", gap:6, background:"#f0fafc", color:"#1e3a5f", padding:"8px 14px", borderRadius:24, textDecoration:"none", fontSize:13, fontWeight:600, border:"1px solid #cde8f3" }}>
                    <IconGlobe /> Website
                  </a>
                )}
                {firm.social.instagram && (
                  <a href={firm.social.instagram} target="_blank" rel="noopener noreferrer"
                    style={{ display:"flex", alignItems:"center", gap:6, background:"linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)", color:"#fff", padding:"8px 14px", borderRadius:24, textDecoration:"none", fontSize:13, fontWeight:600 }}>
                    <IconInsta /> Instagram
                  </a>
                )}
                {firm.social.facebook && (
                  <a href={firm.social.facebook} target="_blank" rel="noopener noreferrer"
                    style={{ display:"flex", alignItems:"center", gap:6, background:"#1877f2", color:"#fff", padding:"8px 14px", borderRadius:24, textDecoration:"none", fontSize:13, fontWeight:600 }}>
                    <IconFB /> Facebook
                  </a>
                )}
                {firm.social.tiktok && (
                  <a href={firm.social.tiktok} target="_blank" rel="noopener noreferrer"
                    style={{ display:"flex", alignItems:"center", gap:6, background:"#000", color:"#fff", padding:"8px 14px", borderRadius:24, textDecoration:"none", fontSize:13, fontWeight:600 }}>
                    <IconTikTok /> TikTok
                  </a>
                )}
              </div>
            </div>
          )}

          {/* HomeMatch CTA */}
          <div style={{ background:"linear-gradient(135deg,#0f5f7a,#1b3d5c)", borderRadius:16, padding:20, color:"#fff" }}>
            <div style={{ fontSize:13, fontWeight:700, color:"#BBE6EF", marginBottom:8 }}>Renovating Soon?</div>
            <p style={{ fontSize:13, lineHeight:1.6, color:"rgba(255,255,255,0.85)", margin:"0 0 14px" }}>
              Enquire via HomeMatch for the Safest-Smartest Assurance — 100% deposit guarantee, warranty & more.
            </p>
            <a href={`https://enquire.homematch.sg/?utm_firm=${encodeURIComponent(firm.name)}&utm_medium=sidebar`}
              target="_blank" rel="noopener noreferrer"
              style={{ display:"block", background:"linear-gradient(135deg,#49A9CB,#2d8aad)", color:"#fff", textAlign:"center", padding:"11px 20px", borderRadius:10, fontWeight:700, textDecoration:"none", fontSize:14 }}>
              Match Me Now!
            </a>
          </div>
        </div>

        {/* ── RIGHT MAIN ── */}
        <div style={{ display:"flex", flexDirection:"column", gap:20 }}>

          {/* About card */}
          {firm.about && (
            <div style={{ background:"#fff", borderRadius:16, padding:28, boxShadow:"0 4px 20px rgba(0,40,80,0.06)", border:"1px solid #e5f4f8" }}>
              <h2 style={{ margin:"0 0 14px", fontSize:17, fontWeight:700, color:"#1e3a5f" }}>
                About {firm.name}
              </h2>
              <p style={{ color:"#555", lineHeight:1.8, fontSize:14, margin:0 }}>{firm.about}</p>
            </div>
          )}

          {/* Safest-Smartest tags */}
          <div style={{ background:"linear-gradient(135deg,#f0fafc,#fff)", borderRadius:16, padding:24, border:"1px solid #cde8f3" }}>
            <h2 style={{ margin:"0 0 16px", fontSize:17, fontWeight:700, color:"#1e3a5f" }}>
              ✦ Safest-Smartest Assurance
            </h2>
            <p style={{ color:"#555", fontSize:13, lineHeight:1.7, margin:"0 0 16px" }}>
              Enquiring via HomeMatch gives you access to the industry&apos;s most comprehensive protection:
            </p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
              {["100% Deposit Guarantee","Warranty","Standard CaseTrust Contract","No Hidden Costs","Progressive Payment","Fairer Prices","Precision Matching","1-1 Guidance","Contract Review","Dispute Resolution"].map(tag => (
                <span key={tag} style={{ background:"linear-gradient(135deg,#e0f7fc,#d0eef8)", color:"#0f5f7a", fontSize:12, fontWeight:700, padding:"5px 12px", borderRadius:20, border:"1px solid #b0d8e9" }}>
                  ✓ {tag}
                </span>
              ))}
            </div>
            <a href="/safest-smartest-assurance" target="_blank" rel="noopener noreferrer"
              style={{ display:"inline-flex", marginTop:16, color:"#49A9CB", fontSize:13, fontWeight:700, textDecoration:"none" }}>
              Learn More →
            </a>
          </div>

          {/* Review platforms */}
          {firm.reviewPlatforms.length > 0 && (
            <div style={{ background:"#fff", borderRadius:16, padding:24, boxShadow:"0 4px 20px rgba(0,40,80,0.06)", border:"1px solid #e5f4f8" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16, flexWrap:"wrap", gap:8 }}>
                <h2 style={{ margin:0, fontSize:17, fontWeight:700, color:"#1e3a5f" }}>
                  ⭐ Reviews
                </h2>
                <a href={`https://feedback.homematch.sg/?help=--3--&firm=${encodeURIComponent(firm.name)}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{ fontSize:12, color:"#49A9CB", fontWeight:700, textDecoration:"none" }}>
                  + Write a Review
                </a>
              </div>
              <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
                {firm.reviewPlatforms.map((p, i) => (
                  <a key={i} href={p.url} target="_blank" rel="noopener noreferrer"
                    style={{ display:"flex", alignItems:"center", gap:12, background: p.platform==="google" ? "#f8f9fa" : "#f0f4ff", borderRadius:12, padding:"14px 20px", textDecoration:"none", border:`1px solid ${p.platform==="google" ? "#e0e0e0" : "#dde3ff"}`, flex:1, minWidth:180 }}>
                    <div style={{ width:36, height:36, borderRadius:8, background:"#fff", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 2px 8px rgba(0,0,0,0.1)", flexShrink:0 }}>
                      {p.platform === "google"
                        ? <span style={{ fontSize:16, fontWeight:800, color:"#4285f4" }}>G</span>
                        : <span style={{ fontSize:16, fontWeight:800, color:"#1877f2" }}>f</span>}
                    </div>
                    <div>
                      <div style={{ fontSize:18, fontWeight:800, color:"#1e3a5f" }}>{p.rating} ★</div>
                      <div style={{ fontSize:12, color:"#888" }}>{p.count}</div>
                    </div>
                  </a>
                ))}
              </div>
              <p style={{ margin:"14px 0 0", fontSize:12, color:"#aaa", fontStyle:"italic" }}>
                We only surface verified reviews. Fake/spam reviews have been filtered out.
              </p>
            </div>
          )}

          {/* FAQ */}
          {firm.faqs.length > 0 && (
            <div style={{ background:"#fff", borderRadius:16, padding:24, boxShadow:"0 4px 20px rgba(0,40,80,0.06)", border:"1px solid #e5f4f8" }}>
              <h2 style={{ margin:"0 0 16px", fontSize:17, fontWeight:700, color:"#1e3a5f" }}>
                💬 Frequently Asked Questions
              </h2>
              {firm.faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
            </div>
          )}

          {/* Bottom CTA */}
          <div style={{ background:"linear-gradient(135deg,#1b3d5c 0%,#0f5f7a 100%)", borderRadius:16, padding:32, color:"#fff", textAlign:"center" }}>
            <h2 style={{ margin:"0 0 10px", fontSize:20, fontWeight:800 }}>Ready to Renovate?</h2>
            <p style={{ margin:"0 0 20px", color:"rgba(255,255,255,0.8)", fontSize:14, lineHeight:1.7 }}>
              Enquire with {firm.name} via HomeMatch and get the full Safest-Smartest Assurance.
            </p>
            <a href={`https://enquire.homematch.sg/?utm_firm=${encodeURIComponent(firm.name)}&utm_medium=bottom-cta`}
              target="_blank" rel="noopener noreferrer"
              style={{ display:"inline-block", background:"linear-gradient(135deg,#49A9CB,#2d8aad)", color:"#fff", padding:"14px 40px", borderRadius:12, fontWeight:800, textDecoration:"none", fontSize:15, boxShadow:"0 6px 24px rgba(73,169,203,0.35)" }}>
              Enquire Now →
            </a>
          </div>
        </div>
      </div>

      {/* ─── Mobile responsive overrides ─── */}
      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 300px 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
