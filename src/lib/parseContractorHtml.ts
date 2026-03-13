import fs from "fs";
import path from "path";

const SITE_ROOT = "M:\\www.homematch.sg - Copy (3)\\www.homematch.sg";

export interface ShowRoom {
  region: string;
  address: string;
}

export interface SocialLinks {
  website?: string;
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  xhs?: string;
}

export interface ReviewPlatform {
  platform: "google" | "facebook";
  rating: string;
  count: string;
  url: string;
}

export interface IndivDesigner {
  photoUrl: string;
  name?: string;
}

export interface ContractorFirm {
  slug: string;
  name: string;
  logoUrl: string;
  rating: string;
  reviewCount: string;
  reviewPlatforms: ReviewPlatform[];
  social: SocialLinks;
  showrooms: ShowRoom[];
  casetrust?: string;
  hdb?: string;
  about: string;
  indivDesigners: IndivDesigner[];
  featuredSlug: string;
  faqs: Array<{ q: string; a: string }>;
  coverPhotoUrl?: string;
}

function extractAttr(html: string, attr: string): string {
  const re = new RegExp(`${attr}="([^"]*)"`, "i");
  const m = re.exec(html);
  return m ? m[1] : "";
}

function extractText(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .trim();
}

export function parseContractorHtml(slug: string): ContractorFirm | null {
  const candidates = [
    path.join(SITE_ROOT, "interior-designers-contractors", slug),
    path.join(SITE_ROOT, "interior-designers-contractors", slug + ".html"),
  ];

  let html = "";
  for (const f of candidates) {
    if (fs.existsSync(f)) { html = fs.readFileSync(f, "utf-8"); break; }
  }
  if (!html) return null;

  // Name
  const nameMatch = html.match(/<h1[^>]*class="[^"]*company-details-name[^"]*"[^>]*>([^<]+)<\/h1>/i);
  const name = nameMatch ? nameMatch[1].trim() : slug.replace(/-c\d+$/, "").replace(/-/g, " ");

  // Logo
  const logoMatch = html.match(/<img[^>]*class="[^"]*firm-logo[^"]*"[^>]*>/i);
  const logoUrl = logoMatch ? extractAttr(logoMatch[0], "src") : "";

  // Cover photo (OG image)
  const coverMatch = html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"/i)
    || html.match(/<meta[^>]*content="([^"]+)"[^>]*property="og:image"/i);
  const coverPhotoUrl = coverMatch ? coverMatch[1] : "";

  // Rating + review count from company-main-info-review-wrapper
  const ratingMatch = html.match(/<div[^>]*class="[^"]*crl-review-rating[^"]*"[^>]*>([^<]+)<\/div>/i);
  const reviewCountMatch = html.match(/<div[^>]*class="[^"]*crl-review-text[^"]*"[^>]*>([^<]+)<\/div>/i);
  const rating = ratingMatch ? ratingMatch[1].replace(/★/g, "").trim() : "";
  const reviewCount = reviewCountMatch ? reviewCountMatch[1].trim() : "";

  // Review Platforms (Google / Facebook links with scores)
  const reviewPlatforms: ReviewPlatform[] = [];
  const platformPattern = /<a[^>]*class="[^"]*company-review-platform-set[^"]*"[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi;
  let platMatch: RegExpExecArray | null;
  while ((platMatch = platformPattern.exec(html)) !== null) {
    const url = platMatch[1];
    const inner = platMatch[2];
    if (url.includes("#") || inner.includes("w-condition-invisible")) continue;
    const isGoogle = inner.includes("google_g_icon");
    const scoreM = inner.match(/<div[^>]*class="[^"]*company-review-platform score[^"]*"[^>]*>([^<]+)<\/div>/i);
    const cntM = inner.match(/<div[^>]*class="[^"]*company-review-platform(?! score)[^"]*"[^>]*>([^<]+)<\/div>/i);
    if (scoreM) {
      reviewPlatforms.push({
        platform: isGoogle ? "google" : "facebook",
        rating: scoreM[1].trim(),
        count: cntM ? cntM[1].trim() : reviewCount,
        url,
      });
    }
  }

  // Social links — look in company-btn-social-wrapper
  const socialSection = html.match(/<div[^>]*class="[^"]*company-btn-social-wrapper profile page(?!\s*hidden)[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
  const social: SocialLinks = {};
  if (socialSection) {
    const links = socialSection[1].matchAll(/<a[^>]*href="([^"]+)"[^>]*>/gi);
    for (const lm of links) {
      const url = lm[1];
      if (url.includes("instagram.com")) social.instagram = url;
      else if (url.includes("facebook.com")) social.facebook = url;
      else if (url.includes("tiktok.com")) social.tiktok = url;
      else if (url.includes("xiaohongshu") || url.includes("xhs")) social.xhs = url;
      else if (!url.startsWith("https://maps") && !url.includes("homematch") && !url.includes("#")) social.website = url;
    }
  }

  // Showrooms
  const showrooms: ShowRoom[] = [];
  const locationPattern = /<div[^>]*class="[^"]*company-accred-wrapper location firm(?![^"]*w-condition-invisible)[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/gi;
  let locMatch: RegExpExecArray | null;
  while ((locMatch = locationPattern.exec(html)) !== null) {
    const inner = locMatch[1];
    if (inner.includes("w-condition-invisible") || inner.includes("w-dyn-bind-empty")) continue;
    const regionM = inner.match(/<div[^>]*class="[^"]*text-block-13 location[^"]*"[^>]*>([^<]+)<\/div>/i);
    const addressM = inner.match(/<div[^>]*class="[^"]*text-block-13 address[^"]*"[^>]*>([^<]+)<\/div>/i);
    if (regionM && addressM) {
      showrooms.push({ region: regionM[1].trim(), address: addressM[1].trim() });
    }
  }

  // CaseTrust + HDB
  const accredSection = html.match(/<div[^>]*class="[^"]*firm-bio-wrapper[^"]*"[^>]*>[\s\S]*?Accreditations[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/i);
  let casetrust: string | undefined;
  let hdb: string | undefined;
  if (accredSection) {
    const ctMatch = accredSection[0].match(/CaseTrust[^<]*<\/(?:img|a)[^>]*>[\s\S]*?<div[^>]*class="[^"]*text-block-13[^"]*"[^>]*>([^<]+)<\/div>/i);
    const hdbMatch = accredSection[0].match(/hdb[^<]*<\/(?:img|a)[^>]*>[\s\S]*?<div[^>]*class="[^"]*text-block-13[^"]*"[^>]*>([^<]+)<\/div>/i);
    if (ctMatch) casetrust = ctMatch[1].trim();
    if (hdbMatch) hdb = hdbMatch[1].trim();
  }

  // Accreditations fallback — direct text-block-13 after logos
  if (!casetrust) {
    const caseText = html.match(/CaseTrust%20Logo[^>]*>[\s\S]{0,100}<div[^>]*class="[^"]*text-block-13[^"]*"[^>]*>([^<]+)<\/div>/i);
    if (caseText) casetrust = caseText[1].trim();
  }
  if (!hdb) {
    const hdbText = html.match(/hdb\.png[^>]*>[\s\S]{0,200}<div[^>]*class="[^"]*text-block-13[^"]*(?!w-dyn)[^"]*"[^>]*>([^<\s][^<]+)<\/div>/i);
    if (hdbText) hdb = hdbText[1].trim();
  }

  // About
  const aboutMatch = html.match(/<p[^>]*class="[^"]*d-p faq profile page firm[^"]*"[^>]*>([\s\S]*?)<\/p>/i);
  const about = aboutMatch ? extractText(aboutMatch[1]) : "";

  // Individual designers (screener photos)
  const indivDesigners: IndivDesigner[] = [];
  const indivPattern = /<div[^>]*class="[^"]*firm-indv-icons-wrapper(?![^"]*crllist)[^"]*"[^>]*>[\s\S]*?<img[^>]*src="([^"]+)"[^>]*class="[^"]*firm-indv-icons[^"]*"[^>]*>/gi;
  let indivMatch: RegExpExecArray | null;
  while ((indivMatch = indivPattern.exec(html)) !== null) {
    const src = indivMatch[1];
    if (!src.includes("loader") && !src.includes("plus.svg")) {
      indivDesigners.push({ photoUrl: src });
    }
  }

  // Featured firm slug
  const featuredMatch = html.match(/href="[^"]*featured-interior-firms\/([^"#]+)"/i);
  const featuredSlug = featuredMatch ? featuredMatch[1] : slug.replace(/-c\d+$/, "");

  // FAQs — extract company-faq-qa-wrapper blocks
  const faqs: Array<{ q: string; a: string }> = [];
  const faqPattern = /<div[^>]*class="[^"]*company-faq-qa-wrapper[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/gi;
  let faqMatch: RegExpExecArray | null;
  while ((faqMatch = faqPattern.exec(html)) !== null) {
    const inner = faqMatch[1];
    const qm = inner.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i);
    // Take the first non-invisible answer
    const am = inner.match(/<div[^>]*class="[^"]*(?:firm-faq-a|company-faq-p)(?![^"]*w-condition-invisible)[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
    if (qm && am) {
      faqs.push({ q: extractText(qm[1]), a: extractText(am[1]) });
    }
  }

  return {
    slug,
    name,
    logoUrl,
    coverPhotoUrl,
    rating,
    reviewCount,
    reviewPlatforms,
    social,
    showrooms,
    casetrust,
    hdb,
    about,
    indivDesigners,
    featuredSlug,
    faqs,
  };
}
