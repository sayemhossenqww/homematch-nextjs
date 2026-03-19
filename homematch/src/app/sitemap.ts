import { MetadataRoute } from "next";
import { getAllFirms } from "@/data/firms";

export const dynamic = "force-static";
import { getAllArticles } from "@/data/articles";
import { getAllVendors } from "@/data/vendors";

const BASE_URL = "https://www.homematch.sg";

export default function sitemap(): MetadataRoute.Sitemap {
  const firms = getAllFirms();
  const articles = getAllArticles();
  const vendors = getAllVendors();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,                          lastModified: new Date(), changeFrequency: "daily",   priority: 1.0 },
    { url: `${BASE_URL}/firms`,               lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: `${BASE_URL}/inspirations`,        lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: `${BASE_URL}/articles`,            lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: `${BASE_URL}/vendors`,             lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE_URL}/before-after`,        lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE_URL}/find-my-id`,          lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/tools`,               lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/tools/budget-calculator`,    lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/tools/style-quiz`,           lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/tools/renovation-checklist`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/tools/compare`,              lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/about`,               lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contact`,             lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/privacy`,             lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE_URL}/terms`,               lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
  ];

  const firmPages: MetadataRoute.Sitemap = firms.map((firm) => ({
    url: `${BASE_URL}/firms/${firm.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const firmGalleryPages: MetadataRoute.Sitemap = firms.map((firm) => ({
    url: `${BASE_URL}/firms/${firm.slug}/gallery`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${BASE_URL}/articles/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const vendorPages: MetadataRoute.Sitemap = vendors.map((vendor) => ({
    url: `${BASE_URL}/vendors/${vendor.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  return [
    ...staticPages,
    ...firmPages,
    ...firmGalleryPages,
    ...articlePages,
    ...vendorPages,
  ];
}
