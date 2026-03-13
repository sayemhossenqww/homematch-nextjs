import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CRLCtaBlock from "@/components/CRLCtaBlock";

export const metadata: Metadata = {
  title: "Renovation Packages Singapore | HomeMatch",
  description:
    "Looking for renovation packages in Singapore? HomeMatch matches you with CaseTrust-accredited renovators offering transparent, itemised packages. It's Free!",
  alternates: { canonical: "https://www.homematch.sg/renovation-packages" },
};

const packages = [
  {
    type: "HDB 3-Room / Studio",
    sqft: "~700 sqft",
    minCost: 25000,
    maxCost: 55000,
    works: ["Full hacking & partitioning", "Kitchen & bathroom tiling", "Built-in carpentry", "Electrical rewiring", "Painting"],
  },
  {
    type: "HDB 4-Room",
    sqft: "~1,000 sqft",
    minCost: 40000,
    maxCost: 80000,
    works: ["Full hacking & partitioning", "Kitchen & bathroom tiling", "Built-in carpentry", "Electrical rewiring", "Feature walls & painting"],
  },
  {
    type: "HDB 5-Room / EA",
    sqft: "~1,200–1,300 sqft",
    minCost: 55000,
    maxCost: 100000,
    works: ["Full hacking & partitioning", "Kitchen & bathroom tiling", "Extensive built-in carpentry", "Electrical & plumbing", "Custom feature walls"],
  },
  {
    type: "Condo",
    sqft: "~700–1,400 sqft",
    minCost: 50000,
    maxCost: 120000,
    works: ["Flooring & carpentry", "Kitchen & bathroom reno", "Feature walls", "Smart home installation", "Custom furnishings"],
  },
  {
    type: "Landed",
    sqft: "Various",
    minCost: 100000,
    maxCost: 300000,
    works: ["Structural works", "Full interior design", "Landscaping options", "Smart home systems", "Premium finishes"],
  },
];

function formatCurrency(n: number) {
  return n.toLocaleString("en-SG", { style: "currency", currency: "SGD", maximumFractionDigits: 0 });
}

export default function RenovationPackagesPage() {
  return (
    <>
      {/* Hero */}
      <div className="d-section">
        <div className="d-container w-container" style={{ textAlign: "center", padding: "60px 20px 40px" }}>
          <Image
            src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/638459f294b18f9f97d662df_CaseTrust%20Logo.svg"
            alt="CaseTrust"
            width={100}
            height={44}
            style={{ marginBottom: 24 }}
          />
          <h1 className="d-h1">Renovation Packages Singapore</h1>
          <p className="d-p" style={{ maxWidth: 600, margin: "0 auto 32px" }}>
            Tired of vague quotes? HomeMatch only works with <strong>CaseTrust-accredited renovators</strong> who provide <strong>transparent, itemised packages</strong> — no hidden costs.
          </p>
          <a
            href="https://get.homematch.sg/?utm_source=Website&utm_medium=renovation-packages"
            className="d-button w-button"
            style={{ display: "inline-block", background: "#0a2e52", color: "#fff", padding: "14px 32px", borderRadius: 8, textDecoration: "none" }}
          >
            Get Package Quotes — Free!
          </a>
        </div>
      </div>

      {/* Package cards */}
      <div className="d-section" style={{ background: "#f8f9fb" }}>
        <div className="d-container w-container">
          <h2 className="d-h2" style={{ textAlign: "center", marginBottom: 8 }}>Estimated Cost Ranges by Property Type</h2>
          <p className="d-p" style={{ textAlign: "center", marginBottom: 40, color: "#666" }}>
            Prices vary based on scope of works, materials, and finishes. Get personalised quotes from matched renovators.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24, paddingBottom: 48 }}>
            {packages.map((pkg) => (
              <div key={pkg.type} style={{ background: "#fff", borderRadius: 12, padding: 28, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>{pkg.type}</h3>
                  <span style={{ fontSize: 13, color: "#888", white‌space: "nowrap" } as React.CSSProperties}>{pkg.sqft}</span>
                </div>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#0a2e52", marginBottom: 16 }}>
                  {formatCurrency(pkg.minCost)} – {formatCurrency(pkg.maxCost)}
                </div>
                <ul style={{ padding: "0 0 0 16px", margin: 0 }}>
                  {pkg.works.map((w) => (
                    <li key={w} style={{ fontSize: 13, marginBottom: 4, color: "#444" }}>{w}</li>
                  ))}
                </ul>
                <a
                  href="https://get.homematch.sg/?utm_source=Website&utm_medium=renovation-packages"
                  style={{ display: "block", marginTop: 20, textAlign: "center", background: "#0a2e52", color: "#fff", padding: "10px 16px", borderRadius: 6, textDecoration: "none", fontSize: 14 }}
                >
                  Get Matched
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why CaseTrust */}
      <div className="d-section">
        <div className="d-container w-container" style={{ padding: "48px 20px" }}>
          <h2 className="d-h2" style={{ textAlign: "center", marginBottom: 16 }}>Why Get Packages from CaseTrust Renovators?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 20 }}>
            {[
              ["Itemised Quotes", "No lump sums — every item is broken down clearly so you know what you're paying for."],
              ["No Hidden Costs", "Any changes require a written variation order. No surprises."],
              ["100% Deposit Protection", "Your deposits are insured via a free performance bond underwritten by NTUC Income."],
              ["Progressive Payments", "Pay in milestones. No large upfront payments."],
              ["Min. 12-Month Warranty", "All workmanship is covered for at least 12 months."],
              ["Fair Contract", "Standard CaseTrust contract protects your rights."],
            ].map(([title, desc]) => (
              <div key={title} style={{ background: "#f0f6ff", borderRadius: 10, padding: 20 }}>
                <strong style={{ display: "block", marginBottom: 6, color: "#0a2e52" }}>{title}</strong>
                <p style={{ margin: 0, fontSize: 14, color: "#555", lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CRLCtaBlock utmMedium="renovation-packages" />
    </>
  );
}
