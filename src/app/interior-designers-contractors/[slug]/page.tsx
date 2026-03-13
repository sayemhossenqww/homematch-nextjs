import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { parseContractorHtml } from "@/lib/parseContractorHtml";
import FirmProfileClient from "@/components/contractors/FirmProfileClient";

type Props = { params: Promise<{ slug: string }> };

const CONTRACTOR_SLUGS = [
  "9-creation-c1", "builders-plus-c369", "charlottes-carpentry-c268",
  "craftmakers-interior-design-c190", "design-avenue-c28", "design-identity-interior-c30",
  "dyeldsign-c38", "ecasa-studio-c41", "eight-design-c42", "forefront-interior-c47",
  "great-oasis-c49", "homies-design-c54", "luova-project-services-c74",
  "magnificient-living-concept-c77", "maximo-spark-interior-c343", "ovon-design-c92",
  "proj-l-studio-c176", "renozone-interior-design-house-c102", "s-r-interior-c159",
  "seds-interior-c105", "starry-homestead-c110", "swiss-interior-signature-c113",
  "the-i-plan-studio-c228", "todzterior-c122", "yangs-inspiration-design-c133",
];

export async function generateStaticParams() {
  return CONTRACTOR_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const firm = parseContractorHtml(slug);
  if (!firm) return {};
  return {
    title: `${firm.name}: 2026 Interior Designer Reviews, Photos, Location, Pricing`,
    description: `Considering ${firm.name}? Check their Reviews, Projects, Location & Full Profile. HomeMatch finds you the Most Suitable CaseTrust-Accredited Renovators.`,
    openGraph: {
      title: `${firm.name}: 2026 Interior Designer Reviews`,
      description: `${firm.rating} ★ · ${firm.reviewCount} — ${firm.about.slice(0, 120)}...`,
      images: firm.coverPhotoUrl ? [{ url: firm.coverPhotoUrl }] : [],
      type: "website",
    },
    alternates: {
      canonical: `https://www.homematch.sg/interior-designers-contractors/${slug}`,
    },
  };
}

export default async function FirmProfilePage({ params }: Props) {
  const { slug } = await params;
  const firm = parseContractorHtml(slug);
  if (!firm) notFound();
  return <FirmProfileClient firm={firm} />;
}
