import fs from "fs";
import path from "path";

const SITE_ROOT = "M:\\www.homematch.sg - Copy (3)\\www.homematch.sg";

/**
 * Reads a base HTML guide file and returns the inner HTML of the
 * <aside class="blog-content-div"> — which contains all blog-rich
 * content sections interleaved with CTA asides, exactly as authored.
 *
 * Falls back to joining all individual blog-rich sections if the
 * blog-content-div wrapper isn't found.
 *
 * Also rewrites relative links (../ and bare slugs) to absolute paths.
 */
function extractGuideContent(html: string): string | null {
  // Strategy 1: grab the entire <aside class="blog-content-div"> inner HTML
  const wrapperMatch = html.match(
    /<aside\s[^>]*class="[^"]*blog-content-div[^"]*"[^>]*>([\s\S]*?)<\/aside>\s*<aside class="blog-bar-wrapper/i
  );
  if (wrapperMatch) {
    return cleanLinks(wrapperMatch[1]);
  }

  // Strategy 2: collect all <main class="blog-rich ..."> sections that are NOT
  // hidden (i.e. don't have w-condition-invisible or w-dyn-bind-empty)
  const richTextPattern =
    /<main[^>]+class="[^"]*blog-rich[^"]*custom-rich-text[^"]*w-richtext[^"]*"[^>]*>([\s\S]*?)<\/main>/gi;
  const parts: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = richTextPattern.exec(html)) !== null) {
    const fullTag = match[0];
    // Skip invisible / empty sections
    if (
      fullTag.includes("w-condition-invisible") ||
      fullTag.includes("w-dyn-bind-empty")
    ) {
      continue;
    }
    const inner = match[1].trim();
    if (inner) {
      parts.push(`<div class="blog-rich custom-rich-text w-richtext">${inner}</div>`);
    }
  }

  if (parts.length > 0) {
    return cleanLinks(parts.join("\n"));
  }

  return null;
}

/**
 * Rewrites relative hrefs/srcs in the extracted HTML so they work
 * in the Next.js app served from the root domain.
 *
 * Patterns fixed:
 *  - href="../something"  → href="/something"
 *  - href="slug#"         → href="#"  (self-referential anchors)
 *  - href="slug"          → left alone (already fine for relative-to-section)
 */
function cleanLinks(html: string, slug?: string): string {
  let out = html
    // Fix ../relative paths → /absolute
    .replace(/href="\.\.\/([^"]+)"/gi, 'href="/$1"')
    // Fix src="../ paths
    .replace(/src="\.\.\/([^"]+)"/gi, 'src="/$1"')
    // Remove data-wf-event-ids attributes
    .replace(/\s*data-wf-event-ids="[^"]*"/gi, "")
    // Remove data-w-id attributes
    .replace(/\s*data-w-id="[^"]*"/gi, "")
    // Remove wized-cloak attributes so populated elements are visible
    .replace(/\s*wized-cloak(?:="[^"]*")?/gi, "")
    // Remove wized= attributes (data binding — content already in HTML)
    .replace(/\s*wized="[^"]*"/gi, "");

  // Fix self-referential hrefs like href="9-creation-c1#" → href="#"
  if (slug) {
    const escapedSlug = slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    out = out.replace(new RegExp(`href="${escapedSlug}(#[^"]*)?"`, "gi"), 'href="#"');
  }
  return out;
}

/**
 * Extracts the inner HTML of the first div with the given class name.
 * Used for contractor profiles (company-main-div) and similar wrappers.
 */
function extractDivContent(html: string, className: string): string | null {
  // Match opening tag with the given class, then greedily capture until the
  // matching close by counting nesting depth.
  const openRe = new RegExp(`<div[^>]+class="[^"]*${className}[^"]*"[^>]*>`, "i");
  const openMatch = openRe.exec(html);
  if (!openMatch) return null;

  let depth = 1;
  let i = openMatch.index + openMatch[0].length;
  const start = i;

  while (i < html.length && depth > 0) {
    const nextOpen = html.indexOf("<div", i);
    const nextClose = html.indexOf("</div>", i);

    if (nextClose === -1) break;

    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      i = nextOpen + 4;
    } else {
      depth--;
      if (depth === 0) {
        const inner = html.slice(start, nextClose);
        return cleanLinks(inner);
      }
      i = nextClose + 6;
    }
  }
  return null;
}

/**
 * Extracts page body: everything from <div class="company-nav"> to <footer>.
 * This captures both the nav breadcrumb and company-main-div in one block.
 */
function extractPageBody(html: string, slug?: string): string | null {
  // Primary: find company-nav div start, footer end
  const bodyStart = html.indexOf('<div class="company-nav"');
  const footerStart = html.indexOf('<footer class="footer"');

  if (bodyStart !== -1 && footerStart !== -1) {
    return cleanLinks(html.slice(bodyStart, footerStart), slug);
  }

  // Fallback: find company-main-div to footer
  const mainDiv = html.indexOf('<div class="company-main-div"');
  if (mainDiv !== -1 && footerStart !== -1) {
    return cleanLinks(html.slice(mainDiv, footerStart), slug);
  }

  // Last resort: depth-counting on company-main-div
  return extractDivContent(html, "company-main-div");
}

/**
 * Extracts body content between the navbar and footer from a full HTML page.
 * Used for featured firm pages.
 */
function extractBodyContent(html: string, slug?: string): string | null {
  return extractPageBody(html, slug);
}



/**
 * Reads the HTML file for a renovation guide and extracts the article body.
 * Looks in the base site's renovation-guides/ folder.
 */
export async function readRenovationGuide(slug: string): Promise<string | null> {
  try {
    // Try with and without .html extension
    const candidates = [
      path.join(SITE_ROOT, "renovation-guides", slug),
      path.join(SITE_ROOT, "renovation-guides", slug + ".html"),
    ];
    for (const filePath of candidates) {
      if (fs.existsSync(filePath)) {
        const html = fs.readFileSync(filePath, "utf-8");
        return extractGuideContent(html);
      }
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Reads the HTML file for an Ask guide and extracts the article body.
 * Looks in the base site's ask/ folder.
 */
export async function readAskGuide(slug: string): Promise<string | null> {
  try {
    const candidates = [
      path.join(SITE_ROOT, "ask", slug),
      path.join(SITE_ROOT, "ask", slug + ".html"),
    ];
    for (const filePath of candidates) {
      if (fs.existsSync(filePath)) {
        const html = fs.readFileSync(filePath, "utf-8");
        return extractGuideContent(html);
      }
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Reads the HTML file for a contractor/firm profile and extracts the
 * full page body (company-nav + company-main-div) up to the footer.
 * Looks in the base site's interior-designers-contractors/ folder.
 */
export async function readContractorProfile(slug: string): Promise<string | null> {
  try {
    const candidates = [
      path.join(SITE_ROOT, "interior-designers-contractors", slug),
      path.join(SITE_ROOT, "interior-designers-contractors", slug + ".html"),
    ];
    for (const filePath of candidates) {
      if (fs.existsSync(filePath)) {
        const html = fs.readFileSync(filePath, "utf-8");
        return extractPageBody(html, slug);
      }
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Reads the HTML file for a featured interior firm and extracts the main content.
 * Looks in the base site's featured-interior-firms/ folder.
 */
export async function readFeaturedFirmContent(slug: string): Promise<string | null> {
  try {
    const candidates = [
      path.join(SITE_ROOT, "featured-interior-firms", slug),
      path.join(SITE_ROOT, "featured-interior-firms", slug + ".html"),
    ];
    for (const filePath of candidates) {
      if (fs.existsSync(filePath)) {
        const html = fs.readFileSync(filePath, "utf-8");
        // Extract body content between navbar and footer
        return extractBodyContent(html);
      }
    }
    return null;
  } catch {
    return null;
  }
}

