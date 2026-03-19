import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // Static export only for production builds (next build).
  // Dev mode (next dev / Turbopack) uses the normal server — avoids the
  // "missing param in generateStaticParams" error that Next.js 16 Turbopack
  // enforces even in development when output:'export' is active.
  ...(isProd ? { output: "export" } : {}),
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
