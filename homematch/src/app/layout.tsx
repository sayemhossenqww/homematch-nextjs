import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import GoogleAuthProvider from "@/components/auth/GoogleAuthProvider";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.homematch.sg"
  ),
  title: {
    default: "HomeMatch — Singapore's Most Trusted Interior Design Platform",
    template: "%s | HomeMatch Singapore",
  },
  description:
    "Free matching with CaseTrust-certified interior designers in Singapore. Browse 100+ verified firms, renovation projects, before-after transformations, and expert renovation guides.",
  keywords: [
    // Core intent
    "interior designer Singapore",
    "interior design firm Singapore",
    "find interior designer Singapore",
    "best interior designer Singapore",
    "top interior design firm Singapore",
    // Property types
    "HDB renovation Singapore",
    "BTO renovation Singapore",
    "BTO interior design",
    "condo renovation Singapore",
    "landed house renovation Singapore",
    "4-room HDB renovation",
    "5-room HDB renovation",
    "resale HDB renovation",
    "executive condo renovation Singapore",
    // Trust & certification
    "CaseTrust interior designer",
    "CaseTrust renovation Singapore",
    "HDB licensed renovation contractor",
    "verified interior designer Singapore",
    // Cost & budget
    "renovation cost Singapore",
    "renovation budget Singapore",
    "HDB renovation cost 2025",
    "condo renovation cost Singapore",
    // Design styles
    "minimalist interior design Singapore",
    "Japandi interior design Singapore",
    "contemporary interior design Singapore",
    "Scandinavian interior design Singapore",
    // Platform
    "renovation matching platform Singapore",
    "interior design comparison Singapore",
    "renovation firm review Singapore",
  ],
  authors: [{ name: "HomeMatch Singapore", url: "https://www.homematch.sg" }],
  creator: "HomeMatch",
  publisher: "HomeMatch Singapore",
  applicationName: "HomeMatch",
  category: "Interior Design & Home Renovation",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "en_SG",
    url: "https://www.homematch.sg",
    siteName: "HomeMatch",
    title: "HomeMatch — Singapore's Most Trusted Interior Design Platform",
    description:
      "Free matching with CaseTrust-certified interior designers in Singapore. Browse 100+ verified firms, real renovation projects, and expert guides.",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "HomeMatch Singapore" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "HomeMatch — Singapore's Most Trusted Interior Design Platform",
    description: "Free matching with CaseTrust-certified interior designers in Singapore.",
    images: ["/og-default.jpg"],
    creator: "@homematchsg",
    site: "@homematchsg",
  },
  appleWebApp: {
    title: "HomeMatch",
    statusBarStyle: "black-translucent",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-SG" suppressHydrationWarning>
      <body>
        <GoogleAuthProvider>
          <AuthProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <FloatingButtons />
          </AuthProvider>
        </GoogleAuthProvider>
      </body>
    </html>
  );
}
