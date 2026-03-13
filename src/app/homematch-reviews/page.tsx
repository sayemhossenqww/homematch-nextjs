import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "HomeMatch Reviews | Singapore Renovation Platform",
  description:
    "Read what homeowners say about HomeMatch — Singapore's Safest & Smartest renovation matching platform. 4.9 stars on Google with 700+ reviews.",
  alternates: { canonical: "https://www.homematch.sg/homematch-reviews" },
};

const googleReviews = [
  { name: "Rachel Tan", pic: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/65480d30e5543f0fecb3a3ce_Rachel%20Tan%20Review.avif", text: "HomeMatch made the renovation process so much less stressful. They understood my needs perfectly and matched me with an ID who did an amazing job!", rating: 5, date: "Jan 2024" },
  { name: "Marcus Lim", pic: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/65480d31e5543f0fecb3a3d0_Marcus%20Lim%20Review.avif", text: "Very impressed with the service. Quick matching, professional follow-up, and my renovator was exactly what I was looking for.", rating: 5, date: "Dec 2023" },
  { name: "Priya Sharma", pic: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/65480d31e5543f0fecb3a3d2_Priya%20Review.avif", text: "Highly recommend! The team went above and beyond to find me the right renovator. All CaseTrust certified too!", rating: 5, date: "Nov 2023" },
  { name: "David Koh", pic: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/65480d31e5543f0fecb3a3d4_David%20Koh%20Review.avif", text: "Contract review service was super helpful. Caught potential issues before I signed. 10/10 would use again.", rating: 5, date: "Oct 2023" },
  { name: "Jennifer Wong", pic: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/65480d31e5543f0fecb3a3d6_Jennifer%20Review.avif", text: "Great experience from start to finish. The matching was fast and the renovator they paired me with delivered exactly what I wanted.", rating: 5, date: "Sep 2023" },
  { name: "Ahmad Rahman", pic: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/65480d31e5543f0fecb3a3d8_Ahmad%20Review.avif", text: "Best decision ever. HomeMatch took care of everything and made sure I was protected. Would strongly recommend!", rating: 5, date: "Aug 2023" },
];

export default function HomematchReviewsPage() {
  return (
    <>
      {/* Hero */}
      <div className="d-section">
        <div className="d-container w-container" style={{ textAlign: "center", padding: "60px 20px 40px" }}>
          <Image
            src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/63ff229a2c80b3b1f8c6428d_HomeMatch%20Long.png"
            alt="HomeMatch"
            width={180}
            height={40}
            style={{ marginBottom: 24 }}
          />
          <h1 className="d-h1">What Homeowners Say About Us</h1>
          <p className="d-p" style={{ maxWidth: 560, margin: "0 auto 24px" }}>
            10,000+ homeowners matched. 4.9 stars on Google with 700+ verified reviews.
          </p>
          <a
            href="https://maps.app.goo.gl/c1gpDw5AxYg8BGB86"
            target="_blank"
            rel="noopener noreferrer"
            className="google-reviews-wrapper stylish w-inline-block"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", margin: "0 auto" }}
          >
            <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/65dd79221c85fee7c34d8a9d_google_g_icon_download.avif" alt="" width={24} height={24} />
            <span className="google-black stylish">Google Reviews</span>
            <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/65dd7876afb490c300aef6c6_Google%20Stars.svg" alt="" width={80} height={16} />
            <span className="google-gray stylish">4.9 Stars | 700+ reviews</span>
          </a>
        </div>
      </div>

      {/* Reviews */}
      <div className="d-section" style={{ background: "#f8f9fb" }}>
        <div className="d-container w-container">
          <div className="googlereviews-card-wrapper" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24, padding: "40px 0" }}>
            {googleReviews.map((r) => (
              <div key={r.name} className="googlereviews-card" style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <Image src={r.pic} alt={r.name} width={44} height={44} style={{ borderRadius: "50%", objectFit: "cover" }} onError={() => {}} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{r.name}</div>
                    <div style={{ fontSize: 12, color: "#888" }}>{r.date}</div>
                  </div>
                  <div style={{ marginLeft: "auto", display: "flex", gap: 1 }}>
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <span key={i} style={{ color: "#f4b400", fontSize: 14 }}>★</span>
                    ))}
                  </div>
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: "#444", margin: 0 }}>&ldquo;{r.text}&rdquo;</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", padding: "24px 0 48px" }}>
            <a
              href="https://maps.app.goo.gl/c1gpDw5AxYg8BGB86"
              target="_blank"
              rel="noopener noreferrer"
              className="d-button w-button"
              style={{ display: "inline-block", background: "#0a2e52", color: "#fff", padding: "14px 32px", borderRadius: 8, textDecoration: "none", marginRight: 16 }}
            >
              Read All 700+ Google Reviews
            </a>
            <a
              href="https://get.homematch.sg/?utm_source=Website&utm_medium=homematch-reviews"
              className="d-button w-button"
              style={{ display: "inline-block", background: "#1a6db5", color: "#fff", padding: "14px 32px", borderRadius: 8, textDecoration: "none" }}
            >
              Get Matched Now
            </a>
          </div>

          {/* Media */}
          <div style={{ textAlign: "center", padding: "0 0 60px" }}>
            <p style={{ color: "#888", marginBottom: 16 }}>As seen on:</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center", alignItems: "center" }}>
              {["6509c178a7888aa5451196a0_cna.avif","66e43500d7645cd47304fa3f_Straits%20Times%20Icon%20bw.png","66e434fb98f18b6a5f67259b_today%20bw.png","65450b2492eb3d1c859e155c_asiaone.svg","65450b24d622edbaedf5070c_yahoo.png"].map((f) => (
                <Image key={f} src={`https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/${f}`} alt="" width={70} height={28} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
