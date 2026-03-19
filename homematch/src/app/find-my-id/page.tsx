import { Metadata } from "next";
import FindMyIdForm from "@/components/forms/FindMyIdForm";
import { ShieldCheck, Clock, CheckCircle, Lock, Star } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Find My Interior Designer — Free Matching with 6 CaseTrust-Certified Firms | HomeMatch",
  description:
    "Get matched free with up to 6 CaseTrust-certified interior designers in Singapore tailored to your HDB, BTO, condo, or landed renovation — budget, style, and timeline. No commissions. Takes 5 minutes.",
  alternates: { canonical: "https://www.homematch.sg/find-my-id" },
  keywords: [
    "find interior designer Singapore",
    "free interior designer matching Singapore",
    "get interior design quotes Singapore",
    "CaseTrust interior designer Singapore",
    "HDB renovation quote Singapore",
    "BTO renovation matching Singapore",
    "condo interior design matching Singapore",
    "landed renovation quote Singapore",
    "best interior designer Singapore 2025",
    "compare interior designers Singapore free",
    "renovation consultation Singapore free",
    "interior designer recommendation Singapore",
    "how to find interior designer Singapore",
    "renovation matching service Singapore",
    "interior design firm shortlist Singapore",
  ],
  openGraph: {
    title: "Find My Interior Designer — Free, Fast & Safe Matching | HomeMatch",
    description: "Match free with up to 6 CaseTrust-certified ID firms for your HDB, BTO, condo, or landed renovation. Takes 5 minutes. No commissions ever.",
    url: "https://www.homematch.sg/find-my-id",
    siteName: "HomeMatch",
    images: [{ url: "https://www.homematch.sg/og-default.jpg", width: 1200, height: 630, alt: "Find My Interior Designer — HomeMatch Singapore" }],
    type: "website",
    locale: "en_SG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Find My Interior Designer — Free Matching | HomeMatch Singapore",
    description: "Match free with 6 CaseTrust-certified ID firms for your Singapore renovation. Takes 5 minutes.",
    images: ["https://www.homematch.sg/og-default.jpg"],
  },
};

const TRUST_BADGES = [
  { Icon: CircleDollarSign, label: "100% Free Service" },
  { Icon: ShieldCheck,      label: "CaseTrust Verified" },
  { Icon: Clock,            label: "24h Response" },
  { Icon: Lock,             label: "Privacy Protected" },
  { Icon: CheckCircle,      label: "No Obligation" },
];

export default function FindMyIdPage() {
  return (
    <div className="relative min-h-screen bg-[#05080f] pt-28 pb-24 overflow-hidden">

      {/* Background glows */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#c8881f]/10 blur-[150px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1a3a5c]/20 blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[#c8881f]/04 blur-[200px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <div className="text-center mb-10">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-6 backdrop-blur-sm"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <span className="w-2 h-2 rounded-full bg-[#c8881f] animate-pulse" />
            <span className="text-xs font-bold tracking-widest text-[#c8881f] uppercase">Smart Matching Engine</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5 text-white leading-[1.15] tracking-tight">
            Let&apos;s find your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c8881f] to-[#e8a830]"
              style={{ filter: "drop-shadow(0 0 15px rgba(200,136,31,0.35))" }}>
              dream designer.
            </span>
          </h1>

          <p className="text-lg text-white/60 mb-8 leading-relaxed font-light max-w-2xl mx-auto">
            Tell us your vision. Our algorithm shortlists 6 highly-vetted, CaseTrust-certified interior design firms perfectly matched to your property, budget, and aesthetic.
          </p>

          {/* Trust badges row */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {TRUST_BADGES.map(({ Icon, label }) => (
              <div key={label} className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white/55"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <Icon className="w-3.5 h-3.5 text-[#c8881f]" />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* ── Full-width form ───────────────────────────────────────────────── */}
        <FindMyIdForm />

        {/* ── Testimonial ──────────────────────────────────────────────────── */}
        <div className="mt-8 p-6 rounded-2xl relative overflow-hidden"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex gap-1 mb-4 text-[#c8881f]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current drop-shadow" />
            ))}
          </div>
          <p className="text-sm text-white/75 italic mb-5 leading-relaxed">
            &ldquo;Submitted the form at 9pm and had a call by 10am the next day. Got matched with 3 excellent firms and found our perfect designer instantly. Incredibly seamless experience.&rdquo;
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 relative shrink-0">
              <Image
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop"
                alt="Priya R."
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Priya R.</p>
              <p className="text-xs text-[#c8881f] font-medium">5-Room HDB, Tampines</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function CircleDollarSign(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
      <path d="M12 18V6" />
    </svg>
  );
}
