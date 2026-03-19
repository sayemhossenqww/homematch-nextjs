import { Metadata } from "next";
import Link from "next/link";
import {
  Mail, MessageSquare, Phone, Building2,
  FileText, Shield, Clock, ArrowRight, MapPin,
  CheckCircle, AlertTriangle,
} from "lucide-react";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact HomeMatch | Renovation Help & Interior Design Enquiries Singapore",
  description:
    "Contact the HomeMatch team for renovation advice, interior designer matching, firm partnership enquiries, or dispute support. Singapore-based support for HDB, BTO, condo, and landed homeowners.",
  alternates: { canonical: "https://www.homematch.sg/contact" },
  keywords: [
    "contact HomeMatch Singapore",
    "renovation enquiry Singapore",
    "interior designer enquiry Singapore",
    "renovation help Singapore",
    "HomeMatch support",
    "renovation dispute Singapore",
    "CASE renovation Singapore",
    "list interior design firm Singapore",
    "renovation advice Singapore",
    "get renovation quote Singapore",
  ],
  openGraph: {
    title: "Contact HomeMatch | Renovation Help & Interior Design Enquiries Singapore",
    description: "Singapore-based support for homeowners, designers, and vendors. Get renovation help, find an ID, or resolve a dispute.",
    url: "https://www.homematch.sg/contact",
    siteName: "HomeMatch",
    images: [{ url: "https://www.homematch.sg/og-default.jpg", width: 1200, height: 630, alt: "Contact HomeMatch Singapore" }],
    type: "website",
    locale: "en_SG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact HomeMatch | Renovation Help & Enquiries Singapore",
    description: "Singapore-based support for homeowners, designers, and vendors.",
    images: ["https://www.homematch.sg/og-default.jpg"],
  },
};

const enquiryTypes = [
  {
    icon: Building2,
    title: "Find an Interior Designer",
    desc: "Let us match you with 6 CaseTrust-certified firms tailored to your project.",
    cta: "Start Matching",
    href: "/find-my-id",
    accent: "#c8881f",
  },
  {
    icon: FileText,
    title: "List Your Firm",
    desc: "Interior design firm? Apply to be listed on HomeMatch and reach qualified leads.",
    cta: "Apply to List",
    href: "mailto:firms@homematch.sg",
    accent: "#a78bfa",
  },
  {
    icon: Shield,
    title: "Report a Firm",
    desc: "Had a bad experience with a firm on our platform? Let us know and we'll investigate.",
    cta: "Report an Issue",
    href: "mailto:trust@homematch.sg",
    accent: "#f87171",
  },
  {
    icon: MessageSquare,
    title: "General Enquiry",
    desc: "Press, partnerships, advertising, or anything else — reach us at hello@homematch.sg.",
    cta: "Send Email",
    href: "mailto:hello@homematch.sg",
    accent: "#38bdf8",
  },
];

const faqs = [
  {
    q: "Is HomeMatch free for homeowners?",
    a: "Yes — completely. You can browse firms, use all our tools, read articles, and get matched with 6 firms at zero cost. We never charge homeowners.",
  },
  {
    q: "How do I update my enquiry details?",
    a: "Email us at hello@homematch.sg with your name and we'll update your matching preferences.",
  },
  {
    q: "I had a bad experience with a firm on HomeMatch. What should I do?",
    a: "Email trust@homematch.sg with your firm name, project details, and the issue. We investigate all complaints and can revoke listings if warranted. You can also file directly with CASE at case.org.sg.",
  },
  {
    q: "How long does the matching process take?",
    a: "We review every request manually and respond within 24 hours on business days with your 6 matched firms.",
  },
  {
    q: "Can I add my interior design firm to HomeMatch?",
    a: "Yes — email firms@homematch.sg. All listed firms must hold current CaseTrust accreditation. We review applications within 5 business days.",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#05080f] pt-24 pb-20">

      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-0 w-150 h-150 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(26,58,92,0.4) 0%, transparent 65%)", filter: "blur(80px)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-14 pt-8">
          <p className="text-xs font-black uppercase tracking-widest text-[#c8881f] mb-4">Contact</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">How Can We Help?</h1>
          <p className="text-lg text-white/50 max-w-xl mx-auto">
            Tell us what you need and we&apos;ll point you in the right direction.
          </p>
        </div>

        {/* Enquiry type cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {enquiryTypes.map(({ icon: Icon, title, desc, cta, href, accent }) => (
            <Link key={title} href={href}
              className="group flex flex-col p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${accent}18`, border: `1px solid ${accent}25` }}>
                <Icon className="w-5 h-5" style={{ color: accent }} />
              </div>
              <h3 className="font-bold text-white text-sm mb-2">{title}</h3>
              <p className="text-xs text-white/45 leading-relaxed flex-1 mb-4">{desc}</p>
              <span className="flex items-center gap-1.5 text-xs font-bold transition-all group-hover:gap-2.5"
                style={{ color: accent }}>
                {cta} <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </div>

        {/* Main grid: contact info + form */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">

          {/* Left: contact details */}
          <div className="lg:col-span-2 space-y-5">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-[#c8881f] mb-4">Contact Details</p>
              <div className="space-y-4">
                {[
                  { icon: Mail,    label: "General",      value: "hello@homematch.sg" },
                  { icon: Shield,  label: "Trust & Safety", value: "trust@homematch.sg" },
                  { icon: Building2, label: "Firm Applications", value: "firms@homematch.sg" },
                  { icon: Phone,   label: "WhatsApp",     value: "+65 9123 4567" },
                  { icon: MapPin,  label: "Location",     value: "Singapore (Remote-first team)" },
                  { icon: Clock,   label: "Response Time", value: "Within 24 hours (business days)" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: "rgba(200,136,31,0.12)", border: "1px solid rgba(200,136,31,0.2)" }}>
                      <Icon className="w-3.5 h-3.5 text-[#c8881f]" />
                    </div>
                    <div>
                      <p className="text-xs text-white/35 font-medium">{label}</p>
                      <p className="text-sm text-white/75">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Escalation note */}
            <div className="p-4 rounded-xl"
              style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)" }}>
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-red-400 mb-1">Renovation Dispute?</p>
                  <p className="text-xs text-white/50 leading-relaxed">
                    For unresolved firm disputes, contact{" "}
                    <span className="text-white/70 font-medium">CASE at case.org.sg</span>
                    {" "}or{" "}
                    <span className="text-white/70 font-medium">CaseTrust at casetrust.org.sg</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: contact form (UI only — backend integration pending) */}
          <div className="lg:col-span-3">
            <div className="p-8 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}>
              <p className="text-xs font-black uppercase tracking-widest text-[#c8881f] mb-6">Send a Message</p>
              <ContactForm />
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-[#c8881f] mb-4">Common Questions</p>
          <h2 className="text-2xl font-bold text-white mb-8">Before You Reach Out</h2>
          <div className="space-y-3">
            {faqs.map(({ q, a }) => (
              <div key={q} className="p-6 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#c8881f] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white text-sm mb-2">{q}</p>
                    <p className="text-xs text-white/55 leading-relaxed">{a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
