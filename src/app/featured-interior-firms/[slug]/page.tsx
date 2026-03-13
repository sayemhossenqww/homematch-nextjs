import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { readFeaturedFirmContent } from "@/lib/guideContent";

type Props = { params: Promise<{ slug: string }> };

// All 24 known featured firm slugs from base HTML folder
const FEATURED_FIRM_SLUGS = [
  "9-creation",
  "builders-plus",
  "charlottes-carpentry",
  "craftmakers-interior",
  "design-avenue",
  "design-identity-interior",
  "dyel-design",
  "ecasa-studio",
  "eight-design",
  "forefront",
  "great-oasis",
  "luova",
  "magnificent-living-concept",
  "maximo-spark",
  "ovon-design",
  "project-l-studio",
  "renozone",
  "s-r-interior",
  "seds",
  "starry-homestead",
  "swiss-interior-signature",
  "the-i-plan-studio",
  "todzterior",
  "yangs-inspiration-design-renovaid-by-mediacorp",
];

function getFirmName(slug: string) {
  return slug
    .replace(/-renovaid-by-mediacorp$/, "")
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export async function generateStaticParams() {
  return FEATURED_FIRM_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const firmName = getFirmName(slug);
  return {
    title: `Why Choose ${firmName}? | Things you need to know before meeting or engaging them`,
    description: `Check out ${firmName}'s full profile — Projects, Reviews, Portfolio, What makes them Unique, and more. HomeMatch finds you Trusted & Suitable Renovators.`,
    openGraph: {
      title: `Why Choose ${firmName}? | HomeMatch`,
      type: "website",
    },
    alternates: {
      canonical: `https://www.homematch.sg/featured-interior-firms/${slug}`,
    },
  };
}

export default async function FeaturedFirmPage({ params }: Props) {
  const { slug } = await params;
  const firmName = getFirmName(slug);
  const profileSlug = slug.replace(/-renovaid-by-mediacorp$/, "");

  // Extract full page body from base HTML
  const pageHtml = await readFeaturedFirmContent(slug);

  return (
    <>
      <style>{`
        p { margin: 0; }
        [wized-cloak] { display: none; }
        @media only screen and (min-width: 767px) { iframe { width: 70vw; } }
        @media only screen and (max-width: 766px) { iframe { width: 100vw; } }
      `}</style>

      <Script async src="https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmsload@1/cmsload.js" />
      <Script async src="https://embed.wized.com/Z91WeJ4HTnL6Hn6DFRi3.js" />
      <Script async type="module" data-wized-id="Z91WeJ4HTnL6Hn6DFRi3" src="https://embed.wized.com/v2/index.js" />

      {/* Nav breadcrumb */}
      <div className="company-nav">
        <div className="company-nav-wrapper">
          <Link
            href={`/interior-designers-contractors/${profileSlug}-c1`}
            className="company-nav-button w-button"
          >
            &lt; {firmName} Profile
          </Link>
        </div>
      </div>

      {/* Full featured firm content from base HTML */}
      {pageHtml ? (
        <div dangerouslySetInnerHTML={{ __html: pageHtml }} />
      ) : (
        /* Fallback if base HTML not found */
        <div className="d-section">
          <div className="d-container w-container">
            <h1 className="d-h">{firmName}</h1>
            <p className="d-p">
              View the full profile at{" "}
              <a
                href={`https://www.homematch.sg/featured-interior-firms/${slug}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                homematch.sg
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
