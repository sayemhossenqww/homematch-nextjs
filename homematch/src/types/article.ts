export type ArticleCategory =
  | "HDB Guides"
  | "Budget Guides"
  | "Design Trends"
  | "House Hacks"
  | "Consumer Protection"
  | "Smart Home"
  | "Designer Spotlight";

export interface Article {
  slug: string;
  title: string;
  excerpt: string;        // ~150 chars — used as meta description + card summary
  category: ArticleCategory;
  tags: string[];
  publishDate: string;    // "MMM YYYY" e.g. "Mar 2025"
  updatedDate?: string;
  readTime: number;       // minutes
  heroImage: string;      // absolute URL (Unsplash / CDN / upload)
  author: string;
  authorRole: string;
  isFeatured: boolean;
  /**
   * Full article body as raw HTML.
   * Written/edited via any HTML editor and stored as-is.
   * Rendered with dangerouslySetInnerHTML on the detail page.
   * Supported tags: h2, h3, p, ul/ol/li, strong, em, blockquote,
   *   <div class="pro-tip">, <div class="warning">
   */
  content: string;
}
