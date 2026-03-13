import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CRLCtaBlock from "@/components/CRLCtaBlock";

interface Props {
  params: Promise<{ slug: string }>;
}

const categories: Record<string, { title: string; description: string; filterTag: string }> = {
  "all": { title: "All CaseTrust Renovators", description: "Browse all CaseTrust-accredited renovators on HomeMatch, individually screened with 4+ star reviews.", filterTag: "" },
  "hdb-approved": { title: "HDB-Approved Renovation Firms", description: "CaseTrust-accredited renovation firms that are also approved by HDB to carry out renovation works in HDB flats.", filterTag: "HDB-Approved" },
  "casetrust": { title: "CaseTrust Renovation Firms", description: "All renovation firms on HomeMatch are CaseTrust-accredited — the gold standard for renovation in Singapore.", filterTag: "CaseTrust" },
  "interior-designer": { title: "Interior Designers in Singapore", description: "Find the right interior designer for your home. All are CaseTrust-accredited with proven track records.", filterTag: "Interior Designer" },
  "main-contractor": { title: "Main Contractors in Singapore", description: "Looking for a main contractor instead of an interior designer? Browse verified CaseTrust-accredited contractors.", filterTag: "Main Contractor" },
  "landed": { title: "Landed Property Renovation Experts", description: "Renovation firms specialising in landed property works — from terrace houses to bungalows.", filterTag: "Landed" },
  "condo": { title: "Condo Renovation Specialists", description: "Find renovation experts who specialise in condominium projects of all sizes.", filterTag: "Condo" },
  "commercial": { title: "Commercial Renovation Firms", description: "CaseTrust-accredited firms with proven expertise in office, F&B, retail and other commercial renovation projects.", filterTag: "Commercial" },
};

const firms = [
  { name: "Starry Homestead", slug: "starry-homestead", tags: ["CaseTrust", "HDB-Approved", "Interior Designer"], rating: 4.9, reviewCount: 120, img: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/66fbb5e84ea79aaec4e16e5c_Starry%20homestead%20logo.webp", expertise: ["Modern", "Scandinavian", "HDB", "Condo"] },
  { name: "Dyel Design", slug: "dyel-design", tags: ["CaseTrust", "Interior Designer"], rating: 4.8, reviewCount: 95, img: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/674dce64e3e98da2af5aca59_dyel%20design%20logo.png", expertise: ["Contemporary", "Minimalist", "HDB", "Landed"] },
  { name: "Fineline Design", slug: "fineline-design", tags: ["CaseTrust", "HDB-Approved", "Interior Designer"], rating: 4.9, reviewCount: 200, img: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/65d636da1b77f8a9cd6f2793_Fineline%20Design%20Logo.png", expertise: ["Industrial", "Modern", "HDB", "Condo"] },
  { name: "Renozone", slug: "renozone", tags: ["CaseTrust", "HDB-Approved", "Main Contractor"], rating: 4.7, reviewCount: 80, img: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/65d636d9d8fa3a83c0db2e67_RenoZone%20Logo.png", expertise: ["BTO", "Resale", "Carpentry"] },
  { name: "Swiss Interior", slug: "swiss-interior", tags: ["CaseTrust", "Interior Designer"], rating: 4.8, reviewCount: 110, img: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/65d636d8f54a12de2b6cdb01_Swiss%20Interior%20Logo.png", expertise: ["Luxury", "Condo", "Landed"] },
  { name: "Rich Interior", slug: "rich-interior", tags: ["CaseTrust", "HDB-Approved", "Interior Designer"], rating: 4.9, reviewCount: 150, img: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/65d636d9d8fa3a83c0db2e71_Rich%20Interior%20Logo.png", expertise: ["Modern", "Contemporary", "HDB"] },
  { name: "Weiken.com", slug: "weiken", tags: ["CaseTrust", "HDB-Approved", "Interior Designer", "Commercial"], rating: 4.8, reviewCount: 180, img: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/65d636dae8e8a0c4f04a5e4b_Weiken%20Logo.png", expertise: ["Modern", "HDB", "Condo", "Commercial"] },
  { name: "Flo Design", slug: "flo-design", tags: ["CaseTrust", "Interior Designer", "Condo"], rating: 4.7, reviewCount: 70, img: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/65d636d9d8fa3a83c0db2e6a_Flo%20Design%20Logo.png", expertise: ["Japandi", "Minimalist", "Condo"] },
];

export async function generateStaticParams() {
  return Object.keys(categories).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = categories[slug];
  if (!cat) return {};
  return {
    title: `${cat.title} | HomeMatch`,
    description: cat.description,
    alternates: { canonical: `https://www.homematch.sg/interior-designers-contractors-list/${slug}` },
  };
}

export default async function InteriorDesignersListPage({ params }: Props) {
  const { slug } = await params;
  const cat = categories[slug];
  if (!cat) notFound();

  const filteredFirms = cat.filterTag
    ? firms.filter((f) => f.tags.includes(cat.filterTag))
    : firms;

  return (
    <>
      {/* Hero */}
      <div className="d-section">
        <div className="d-container w-container" style={{ padding: "60px 20px 40px", textAlign: "center" }}>
          <h1 className="d-h1">{cat.title}</h1>
          <p className="d-p" style={{ maxWidth: 560, margin: "0 auto 24px" }}>{cat.description}</p>
          <a href="https://get.homematch.sg/?utm_source=Website&utm_medium=crl-list" className="d-button w-button" style={{ display: "inline-block", background: "#0a2e52", color: "#fff", padding: "14px 32px", borderRadius: 8, textDecoration: "none" }}>
            Get Matched — Free!
          </a>
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{ background: "#f4f7fb", borderBottom: "1px solid #e6eaf0", padding: "16px 20px" }}>
        <div className="d-container w-container" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {Object.entries(categories).map(([s, c]) => (
            <Link
              key={s}
              href={`/interior-designers-contractors-list/${s}`}
              style={{
                background: s === slug ? "#0a2e52" : "#fff",
                color: s === slug ? "#fff" : "#0a2e52",
                border: "1.5px solid #d0dae8",
                borderRadius: 20,
                padding: "6px 14px",
                fontSize: 13,
                textDecoration: "none",
              }}
            >
              {c.title.replace(" in Singapore", "").replace(" Renovation Firms", "").replace("All CaseTrust Renovators", "All")}
            </Link>
          ))}
        </div>
      </div>

      {/* Firm grid */}
      <div className="d-section">
        <div className="d-container w-container">
          <p style={{ color: "#666", marginBottom: 24 }}>Showing {filteredFirms.length} renovators</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24, paddingBottom: 48 }}>
            {filteredFirms.map((firm) => (
              <Link key={firm.slug} href={`/interior-designers-contractors/${firm.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", cursor: "pointer" }}>
                  <div style={{ height: 56, display: "flex", alignItems: "center", marginBottom: 16 }}>
                    <Image src={firm.img} alt={firm.name} width={120} height={40} style={{ objectFit: "contain", maxHeight: 48 }} />
                  </div>
                  <h3 style={{ margin: "0 0 8px", fontSize: 17, fontWeight: 700 }}>{firm.name}</h3>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
                    <span style={{ color: "#f4b400" }}>★</span>
                    <span style={{ fontWeight: 600, fontSize: 14 }}>{firm.rating}</span>
                    <span style={{ color: "#888", fontSize: 13 }}>({firm.reviewCount} reviews)</span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
                    {firm.tags.map((t) => (
                      <span key={t} style={{ background: "#eaf2ff", color: "#0a5aa5", borderRadius: 12, padding: "2px 10px", fontSize: 12 }}>{t}</span>
                    ))}
                  </div>
                  <div style={{ fontSize: 13, color: "#666" }}><strong>Specialises in: </strong>{firm.expertise.join(", ")}</div>
                </div>
              </Link>
            ))}
          </div>
          <CRLCtaBlock utmMedium="crl-list" />
        </div>
      </div>
    </>
  );
}
