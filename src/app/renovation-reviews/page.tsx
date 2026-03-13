import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Renovation Reviews Singapore | HomeMatch",
  description:
    "Read verified renovation reviews from HomeMatch homeowners. Browse interior designer and contractor reviews from real Singapore homeowners.",
  alternates: { canonical: "https://www.homematch.sg/renovation-reviews" },
};

const reviews = [
  { name: "Rachel T.", date: "Jan 2024", rating: 5, text: "HomeMatch matched me with an amazing ID who understood exactly what I wanted. The process was so smooth and stress-free!", property: "BTO 4-Room" },
  { name: "Marcus L.", date: "Dec 2023", rating: 5, text: "Very impressed with the matching process. My renovator was professional, communicated well, and delivered on time.", property: "Resale 3-Room" },
  { name: "Priya S.", date: "Nov 2023", rating: 5, text: "I was skeptical at first but HomeMatch really delivered. The ID they matched me with was perfect for my Japandi style preferences.", property: "Condo" },
  { name: "David K.", date: "Oct 2023", rating: 5, text: "The Safest-Smartest Assurance gave me so much peace of mind. The contract review service caught two clauses I would have missed!", property: "BTO 5-Room" },
  { name: "Jennifer W.", date: "Sep 2023", rating: 5, text: "Quick response, great matches, and the 100% deposit guarantee was a huge plus. Highly recommend!", property: "Resale HDB" },
  { name: "Ahmad R.", date: "Aug 2023", rating: 5, text: "Found my dream renovator through HomeMatch. They matched me with someone who specialised in my exact budget range and style.", property: "EC" },
  { name: "Xiao Ling C.", date: "Jul 2023", rating: 5, text: "Amazing service! The ID they matched me with was experienced with my property type and finished on time.", property: "BTO 4-Room" },
  { name: "Kenneth H.", date: "Jun 2023", rating: 5, text: "Great matching experience. I appreciated the unbiased recommendations — I could tell HomeMatch truly had my best interests at heart.", property: "Landed" },
  { name: "Sarah M.", date: "May 2023", rating: 5, text: "The matching was spot-on. My renovation was completed beautifully and within budget. Will recommend to all my friends!", property: "Condo" },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ color: i < rating ? "#f4b400" : "#ddd", fontSize: 16 }}>★</span>
      ))}
    </div>
  );
}

export default function RenovationReviewsPage() {
  return (
    <>
      {/* Hero */}
      <div className="d-section">
        <div className="d-container w-container" style={{ textAlign: "center", padding: "60px 20px 40px" }}>
          <h1 className="d-h1">Renovation Reviews</h1>
          <p className="d-p" style={{ maxWidth: 560, margin: "0 auto 24px" }}>
            Real reviews from homeowners matched by HomeMatch. 4.9 stars on Google with 700+ reviews.
          </p>
          {/* Google badge */}
          <a href="https://maps.app.goo.gl/c1gpDw5AxYg8BGB86" target="_blank" rel="noopener noreferrer" className="google-reviews-wrapper stylish w-inline-block" style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/65dd79221c85fee7c34d8a9d_google_g_icon_download.avif" alt="" width={24} height={24} />
            <span className="google-black stylish">Google Reviews</span>
            <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/65dd7876afb490c300aef6c6_Google%20Stars.svg" alt="" width={80} height={16} />
            <span className="google-gray stylish">4.9 Stars | 700+ reviews</span>
          </a>
        </div>
      </div>

      {/* Reviews grid */}
      <div className="d-section" style={{ background: "#f8f9fb" }}>
        <div className="d-container w-container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24, padding: "40px 0" }}>
            {reviews.map((r) => (
              <div key={r.name} style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                <StarRating rating={r.rating} />
                <p style={{ margin: "12px 0", fontSize: 15, lineHeight: 1.6, color: "#333" }}>&ldquo;{r.text}&rdquo;</p>
                <div style={{ borderTop: "1px solid #eee", paddingTop: 12, marginTop: 12 }}>
                  <strong style={{ fontSize: 14 }}>{r.name}</strong>
                  <span style={{ fontSize: 13, color: "#888", marginLeft: 8 }}>{r.property} · {r.date}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", padding: "24px 0 48px" }}>
            <a
              href="https://maps.app.goo.gl/c1gpDw5AxYg8BGB86"
              target="_blank"
              rel="noopener noreferrer"
              className="d-button w-button"
              style={{ display: "inline-block", background: "#0a2e52", color: "#fff", padding: "14px 32px", borderRadius: 8, textDecoration: "none" }}
            >
              Read All Google Reviews
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
