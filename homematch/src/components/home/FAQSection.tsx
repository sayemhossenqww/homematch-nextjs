"use client";
import { useState } from "react";
import { Plus, Minus, MessageCircle, ArrowRight, HelpCircle, Shield, DollarSign, Clock, Search } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";

import Link from "next/link";

const CATS = ["All", "Pricing", "Process", "Safety", "Firms"];

const faqs = [
  {
    cat: "Pricing",
    icon: DollarSign,
    color: "#4ade80",
    q: "Is Interior Match free to use?",
    a: "Yes — Interior Match is 100% free for homeowners, and that will never change. We do not charge commissions on your renovation project, we do not charge referral fees to homeowners, and we do not take a cut of any quotation you receive. The platform is funded entirely by the interior design firms who pay a listing fee to appear here. As a homeowner, you can browse unlimited firm profiles, save shortlists, view project galleries, submit the Find My ID matching form, and communicate with matched firms — all at zero cost. There are no premium tiers, no credit card required, and no hidden charges at any stage of using Interior Match.",
  },
  {
    cat: "Pricing",
    icon: DollarSign,
    color: "#4ade80",
    q: "How much does renovation cost in Singapore?",
    a: "Renovation costs in Singapore vary significantly depending on your property type, size, finishes, and the scope of work. For HDB flats, a 3-room full renovation typically ranges from S$35,000–S$65,000, a 4-room from S$50,000–S$90,000, and a 5-room from S$65,000–S$120,000 at mid-range finishes. For condominiums, costs typically span S$40,000 for a studio to S$200,000+ for a larger unit, depending heavily on materials and carpentry. Landed property renovations are the most variable, ranging from S$150,000 for a terrace to S$500,000+ for a full detached property rebuild. These figures usually cover design fees, carpentry, tiling, electrical, plumbing, painting, and basic furnishing. Premium materials, smart home systems, or bespoke furniture can add 20–40% to any budget. Use our free Budget Calculator for a personalised estimate based on your specific flat type.",
  },
  {
    cat: "Process",
    icon: Clock,
    color: "#c8881f",
    q: "How does the Find My ID matching work?",
    a: "The Find My ID process is our core service and takes just 5 minutes of your time. You complete a structured brief covering your property type and size, total renovation budget, preferred design styles, key rooms to renovate, move-in timeline, and any special requirements. Once submitted, our in-house team — not a chatbot or algorithm — reviews your brief personally and hand-selects exactly 6 CaseTrust-certified, HDB-registered firms whose portfolio, pricing, and speciality genuinely align with what you have described. Within 24 business hours, you receive a curated list of 6 matched firms with their profiles, project galleries, and contact details. You then choose which firms to invite for a consultation — there is no obligation to meet any of them. The matched firms are briefed on your requirements before they contact you, so you will not receive generic cold sales pitches.",
  },
  {
    cat: "Process",
    icon: Clock,
    color: "#c8881f",
    q: "How long does renovation take in Singapore?",
    a: "Renovation timelines in Singapore vary based on property type, scope of work, and permit approvals. For a standard HDB flat, the renovation period from key collection to move-in is typically 8–16 weeks. If you are renovating a new BTO, add 2–4 weeks for planning — your designer needs to align with HDB's approved contractor list and permitted works. For resale HDB flats, hacking and reinstatement may add extra time if previous renovations need to be undone first. Condominium renovations require written approval from the Management Corporation Strata Title (MCST), which typically takes 1–2 weeks to obtain from your condo management. Landed property renovations are the most complex and can span 6–18 months depending on the scale of structural work involved. Throughout the process, your designer should provide a detailed week-by-week project schedule in the contract so you know exactly what happens when.",
  },
  {
    cat: "Process",
    icon: Clock,
    color: "#c8881f",
    q: "Can I browse without submitting the Find My ID form?",
    a: "Absolutely — browsing Interior Match is completely open and requires no registration or personal information whatsoever. You can explore the full directory of listed firms, read each firm's detailed profile including their certifications, team, years of experience and specialities, view their completed project galleries with real budgets and room sizes, and read verified homeowner reviews in full. You can also use our Style Quiz anonymously to discover your design preferences, browse 1,400+ real Singapore renovation projects in the Inspiration Gallery for ideas, and use the Budget Calculator to estimate costs for your flat type — all without entering your phone number or email. The Find My ID matching form is entirely optional. It simply allows our team to do the shortlisting work for you, saving you weeks of independent research and multiple redundant firm consultations.",
  },
  {
    cat: "Safety",
    icon: Shield,
    color: "#60a5fa",
    q: "What is CaseTrust and why does it matter?",
    a: "CaseTrust is a voluntary accreditation scheme administered by CASE — the Consumers Association of Singapore — and is backed by the Singapore government as a mark of reliable and ethical business practices in the renovation industry. To obtain and maintain CaseTrust certification, a renovation firm must meet multiple mandatory requirements: all renovation deposits must be held in a protected trust account administered by an independent third party, so your money is safe even if the firm faces financial difficulties; standardised CASE-approved renovation contracts must be used, with clearly stated pricing, timeline, and payment milestone terms; the firm must comply with HDB's approved contractor registration; and the firm must participate in CASE's free mediation and dispute resolution process if disagreements arise. Interior Match is the only renovation platform in Singapore that exclusively lists CaseTrust-certified firms — we independently verify every firm's certification status before listing and remove any firm whose certification lapses.",
  },
  {
    cat: "Safety",
    icon: Shield,
    color: "#60a5fa",
    q: "How do I know if a firm's reviews are real?",
    a: "Review integrity is something we take extremely seriously at Interior Match, and our verification process is multi-layered. First, only homeowners who have submitted an enquiry to a specific firm through Interior Match are eligible to leave a review for that firm — this prevents random or purchased reviews from outsiders. Second, each review submission is manually reviewed by our team for authenticity before it appears publicly. Third, every published review carries a green Verified Homeowner badge indicating it has passed our verification. Firms cannot purchase positive reviews, cannot remove reviews they dislike, and cannot post reviews themselves or through associates under any circumstances. We also conduct periodic audits of published reviews and retroactively remove any that fail re-verification. If you ever suspect a review is inauthentic, you can flag it directly using the report button on each review card and our team will investigate within 48 hours.",
  },
  {
    cat: "Safety",
    icon: Shield,
    color: "#60a5fa",
    q: "What happens to my personal data after I submit a form?",
    a: "We handle your personal data with full transparency and in compliance with Singapore's Personal Data Protection Act (PDPA). When you submit the Find My ID form, your contact information and renovation brief are shared only with the specific 6 firms we match you with — and with absolutely no one else. We do not sell, rent, or share your data with advertisers, data brokers, or third-party marketers under any circumstances. The matched firms are permitted to contact you once regarding your renovation enquiry and are contractually prohibited from adding you to marketing mailing lists. If you choose not to proceed with any of the matched firms, your data is not passed on or re-used. You can request full deletion of all your personal data held by Interior Match at any time by emailing our team, and we will complete the deletion within 7 business days and confirm it in writing.",
  },
  {
    cat: "Firms",
    icon: Search,
    color: "#a78bfa",
    q: "I am not ready to renovate yet. Can I still use Interior Match?",
    a: "Absolutely — Interior Match is designed to be useful at every stage of the homeowner journey, not just when you are ready to sign a contract. If you have just received your BTO ballot result or purchased a resale flat and are still months away from renovation, there is plenty you can do right now to prepare. Browse firm profiles and save your favourites to a personal shortlist to revisit later when you are ready. Use the free Style Quiz to identify your design aesthetic — Japandi, Scandinavian, Contemporary, Industrial — before you start meeting designers. Explore the Inspiration Gallery with 1,400+ real Singapore renovation projects, filterable by style, property type, and budget range. Use the Budget Calculator to build a realistic picture of what your renovation will cost. Read our Resource guides on HDB rules and permits, what to ask in your first designer meeting, and how to read a renovation quotation. None of these features require you to submit your phone number or create an account.",
  },
  {
    cat: "Firms",
    icon: Search,
    color: "#a78bfa",
    q: "How do I get my firm listed on Interior Match?",
    a: "Interior Match maintains strict eligibility requirements to ensure every listed firm meets our quality and consumer protection standards. To be considered for listing, your firm must hold a current, valid CaseTrust accreditation issued by CASE, be registered with HDB as an approved renovation contractor, have a verifiable portfolio of completed Singapore residential renovation projects demonstrating your quality and style range, and agree to our platform's terms including the homeowner review policy. To apply, visit the Partner With Us page and submit your application along with your CaseTrust certificate number, HDB registration number, and full firm details. Our team independently verifies your credentials directly with CASE and HDB — we do not rely on self-declaration alone. Verification typically takes 5–10 business days, after which you will receive a decision by email. Approved firms receive a complete listing profile, access to the partner dashboard, and become immediately eligible to receive matched enquiries from homeowners whose renovation brief aligns with your speciality.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [cat, setCat] = useState("All");

  const visible = cat === "All" ? faqs : faqs.filter((f) => f.cat === cat);

  return (
    <section className="section-padding relative overflow-hidden" style={{ background: "var(--color-primary)" }}>
      {/* Ambient glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(200,136,31,0.07) 0%, transparent 65%)", filter: "blur(90px)" }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(26,58,92,0.6) 0%, transparent 65%)", filter: "blur(70px)" }} />

      <div className="section-container relative z-10">

        {/* ── Header ── */}
        <ScrollReveal direction="up" delay={0.1} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
            style={{ background: "rgba(200,136,31,0.1)", border: "1px solid rgba(200,136,31,0.2)" }}>
            <HelpCircle className="w-3.5 h-3.5" style={{ color: "#c8881f" }} />
            <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#c8881f" }}>FAQ</span>
          </div>
          <h2 className="text-section text-white mb-3">Frequently Asked Questions</h2>
          <p className="text-sm max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.42)" }}>
            Everything homeowners ask before and after using Interior Match.
          </p>
        </ScrollReveal>

        {/* ── Category tabs ── */}
        <ScrollReveal direction="up" delay={0.2} className="flex gap-2 justify-center flex-wrap mb-10">
          {CATS.map((c) => {
            const active = c === cat;
            return (
              <button key={c} onClick={() => setCat(c)}
                className="px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-200"
                style={{
                  background: active ? "#c8881f" : "rgba(255,255,255,0.06)",
                  color: active ? "white" : "rgba(255,255,255,0.45)",
                  border: `1px solid ${active ? "#c8881f" : "rgba(255,255,255,0.08)"}`,
                }}>
                {c}
              </button>
            );
          })}
        </ScrollReveal>

        {/* ── 2-col layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left: accordion (8/12) */}
          <StaggerContainer delay={0.3} staggerDelay={0.05} className="lg:col-span-8 space-y-3">
            {visible.map((faq, i) => {
              const isOpen = openIndex === i;
              const Icon = faq.icon;
              return (
                <StaggerItem key={i}>
                  <div className="overflow-hidden transition-all duration-200"
                    style={{
                      borderRadius: "14px",
                      background: isOpen ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${isOpen ? faq.color + "35" : "rgba(255,255,255,0.07)"}`,
                      boxShadow: isOpen ? `0 8px 32px rgba(0,0,0,0.2), 0 0 0 1px ${faq.color}12` : "none",
                      transition: "border-color 0.3s, background 0.3s, box-shadow 0.3s",
                    }}>
                    <button
                      className="w-full flex items-center gap-4 px-5 py-4 text-left"
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                    >
                    {/* Icon pill */}
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${faq.color}14`, border: `1px solid ${faq.color}25` }}>
                      <Icon className="w-4 h-4" style={{ color: faq.color }} />
                    </div>

                    <span className="font-semibold text-sm flex-1 text-left leading-snug"
                      style={{ color: isOpen ? "white" : "rgba(255,255,255,0.80)" }}>
                      {faq.q}
                    </span>

                    {/* Toggle button */}
                    <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200"
                      style={{
                        background: isOpen ? faq.color : "rgba(255,255,255,0.08)",
                        border: `1px solid ${isOpen ? faq.color : "rgba(255,255,255,0.1)"}`,
                      }}>
                      {isOpen
                        ? <Minus className="w-3.5 h-3.5 text-white" />
                        : <Plus className="w-3.5 h-3.5" style={{ color: "rgba(255,255,255,0.5)" }} />}
                    </div>
                  </button>

                  {/* Answer — animated height */}
                  <div style={{
                    maxHeight: isOpen ? "500px" : "0",
                    overflow: "hidden",
                    transition: "max-height 0.35s ease",
                  }}>
                    <div className="px-5 pb-5 pl-[68px]">
                      <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* Right: contact sidebar (4/12) */}
          <ScrollReveal direction="left" delay={0.5} className="lg:col-span-4 flex flex-col gap-4">

            {/* Still have questions card */}
            <div className="p-6 rounded-2xl relative overflow-hidden"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
              <div className="absolute top-0 left-0 right-0 h-0.5"
                style={{ background: "linear-gradient(to right, #c8881f, transparent)" }} />
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "rgba(200,136,31,0.12)", border: "1px solid rgba(200,136,31,0.2)" }}>
                <MessageCircle className="w-5 h-5" style={{ color: "#c8881f" }} />
              </div>
              <h4 className="font-bold text-white mb-2">Still have questions?</h4>
              <p className="text-xs leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.45)" }}>
                Our team is available Mon–Sat, 9am–6pm SGT. We typically respond within 2 hours.
              </p>
              <Link href="/contact"
                className="flex items-center gap-1.5 text-sm font-bold transition-all hover:gap-2.5"
                style={{ color: "#c8881f" }}>
                Contact Us <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Quick stats */}
            <div className="p-6 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.30)" }}>
                Quick facts
              </p>
              <div className="space-y-3">
                {[
                  { val: "Free",    label: "Always free for homeowners" },
                  { val: "6",       label: "Firms matched per enquiry" },
                  { val: "24 hrs",  label: "Average matching time" },
                  { val: "100%",    label: "CaseTrust certified firms" },
                  { val: "3,200+",  label: "Homeowners matched" },
                ].map(({ val, label }) => (
                  <div key={label} className="flex items-center justify-between py-2"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{label}</span>
                    <span className="font-black text-sm text-white">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Link href="/find-my-id" className="btn-accent text-center text-sm py-3.5 px-6">
              Get My 6 Matched Firms Free →
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
