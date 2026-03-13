import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.prod.website-files.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "**.googleusercontent.com" },
    ],
    unoptimized: true, // all images served from Webflow CDN
  },
  async redirects() {
    return [
      // Safest-smartest short URL
      {
        source: "/safest-smartest",
        destination: "/safest-smartest-assurance",
        permanent: true,
      },
      // Webflow duplicate
      {
        source: "/guides.1",
        destination: "/guides",
        permanent: true,
      },
      // Webflow CMS collection item aliases for CRL page
      {
        source: "/interior-designers-contractors-list/casetrust-renovation-list",
        destination: "/casetrust-renovation-list",
        permanent: true,
      },
      {
        source: "/interior-designers-contractors-list/directory-of-hdb-approved-interior-designers-contractors",
        destination: "/casetrust-renovation-list",
        permanent: true,
      },
      // Any other interior-designers-contractors-list slugs not covered → CRL
      {
        source: "/interior-designers-contractors-list/:slug",
        destination: "/casetrust-renovation-list",
        permanent: false,
      },
      // Renovation reviews canonical URL (page lives at the full sub-path)
      {
        source: "/renovation-reviews",
        destination: "/renovation-reviews/interior-design-renovation-reviews-singapore",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
