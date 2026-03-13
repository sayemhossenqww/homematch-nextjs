import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "HomeMatch | Safest & Smartest Way to Meet Interior Designers & Contractors",
  description:
    "HomeMatch is a renovation platform in Singapore that matches homeowners with CaseTrust-accredited interior designers and contractors. Get HomeMatch Protection — a fund that protects your deposits against major delays and incomplete works.",
  openGraph: {
    title: "HomeMatch | Safest & Smartest Way to Meet Interior Designers & Contractors",
    description:
      "HomeMatch is a renovation platform in Singapore that matches homeowners with CaseTrust-accredited interior designers and contractors.",
    type: "website",
    url: "https://www.homematch.sg",
  },
  twitter: {
    card: "summary_large_image",
    title: "HomeMatch | Safest & Smartest Way to Meet Interior Designers & Contractors",
    description:
      "HomeMatch is a renovation platform in Singapore that matches homeowners with CaseTrust-accredited interior designers and contractors.",
  },
  verification: {
    google: "XlCwq7zquM5hzCr5qW0If8v0qL74dRuU4B5sqgIrBH8",
  },
  other: {
    "p:domain_verify": "7db123301c6659ddf7632bcf75f4e9c1",
    "theme-color": "#E2F5F7",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-wf-domain="www.homematch.sg">
      <head>
        {/* Favicon */}
        <link
          rel="shortcut icon"
          href="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/637608e626974124c91a5a95_favicon1.png"
          type="image/x-icon"
        />
        <link
          rel="apple-touch-icon"
          href="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/63760499088fc60a22b65926_app.gif"
        />
        <meta name="robots" content="max-image-preview:large" />
      </head>
      <body className={`${montserrat.variable} body`}>
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-TJLXMGC');`}
        </Script>
        {/* GTM noscript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TJLXMGC"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingButtons />

        {/* Webflow JS */}
        <Script
          src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=635ea81b96e6ef55a169584c"
          strategy="beforeInteractive"
          crossOrigin="anonymous"
        />
        <Script
          src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/js/q37261njk0.schunk.36b8fb49256177c8.js"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <Script
          src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/js/q37261njk0.2705f95e.2cc4dd47d6785cf7.js"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}

