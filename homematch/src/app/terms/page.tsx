import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | HomeMatch Singapore",
  description:
    "HomeMatch's Terms of Service — the rules governing use of our interior design matching platform for homeowners and interior design firms in Singapore.",
  alternates: { canonical: "https://www.homematch.sg/terms" },
  robots: { index: false, follow: false },
};

const SECTIONS = [
  { id: "agreement",       label: "Agreement to Terms" },
  { id: "platform",        label: "Platform Description" },
  { id: "user",            label: "User Responsibilities" },
  { id: "firm",            label: "Firm Responsibilities" },
  { id: "listings",        label: "Listings & Content" },
  { id: "ip",              label: "Intellectual Property" },
  { id: "liability",       label: "Limitation of Liability" },
  { id: "prohibited",      label: "Prohibited Uses" },
  { id: "termination",     label: "Termination" },
  { id: "governing",       label: "Governing Law" },
  { id: "contact",         label: "Contact" },
];

const HTML_CONTENT = `
<h2 id="agreement">1. Agreement to Terms</h2>
<p>
  By accessing or using HomeMatch (the "Platform"), operated by HomeMatch Pte. Ltd.
  ("HomeMatch", "we", "us"), you agree to be bound by these Terms of Service ("Terms").
  If you do not agree to these Terms, you must not use the Platform.
</p>
<p>
  These Terms apply to all users of the Platform, including homeowners seeking interior design
  services ("Homeowners") and interior design firms listed on the Platform ("Firms").
</p>

<h2 id="platform">2. Platform Description</h2>
<p>
  HomeMatch is a <strong>free matching service</strong> that connects Singapore homeowners with
  verified interior design firms. Our services include:
</p>
<ul>
  <li>A searchable directory of interior design firms and their portfolio projects</li>
  <li>A personalised matching questionnaire to recommend suitable firms</li>
  <li>Tools including a budget calculator, style quiz, and renovation checklist</li>
  <li>A platform for homeowners to request quotations from multiple firms simultaneously</li>
</ul>
<p>
  HomeMatch is a <strong>technology platform only</strong>. We are not a party to any renovation
  contract entered into between Homeowners and Firms. We do not employ, endorse, warrant, or
  guarantee the work of any listed firm.
</p>
<div class="info-box">
  <strong>Important:</strong> HomeMatch facilitates introductions only. All renovation contracts,
  payments, and disputes are solely between the Homeowner and the Firm. HomeMatch accepts no
  liability for the outcome of any renovation project.
</div>

<h2 id="user">3. User Responsibilities</h2>
<p>As a Homeowner using HomeMatch, you agree to:</p>
<ul>
  <li>Provide accurate and truthful information in all forms and communications</li>
  <li>Use contact details of Firms only for the purpose of your renovation enquiry</li>
  <li>Not share or resell contact information obtained through the Platform</li>
  <li>Treat all Firm representatives with professionalism and courtesy</li>
  <li>Not submit multiple duplicate enquiries to the same firm or use the Platform to spam</li>
  <li>Comply with all applicable Singapore laws in connection with your renovation</li>
</ul>
<p>
  You must be at least 18 years of age to use HomeMatch. By using the Platform, you confirm
  that you meet this requirement.
</p>

<h2 id="firm">4. Interior Designer / Firm Responsibilities</h2>
<p>Firms listed on HomeMatch agree to:</p>
<ul>
  <li>Maintain valid HDB registration and any required licences or accreditations</li>
  <li>Keep their profile information accurate, up-to-date, and not misleading</li>
  <li>Respond to matched Homeowner enquiries within a reasonable timeframe</li>
  <li>Provide Homeowners with itemised, written quotations upon request</li>
  <li>Comply with the Personal Data Protection Act (PDPA) when handling Homeowner data</li>
  <li>Honour all commitments represented in their HomeMatch profile</li>
  <li>Not use Homeowner data obtained through HomeMatch for any purpose other than responding to the specific enquiry</li>
</ul>
<p>
  HomeMatch reserves the right to suspend or remove any Firm from the Platform that breaches
  these responsibilities, receives consistent negative feedback, or engages in conduct that
  damages the integrity of the Platform.
</p>

<h2 id="listings">5. Listings and Content</h2>
<p>
  Firms are responsible for all content they submit to HomeMatch, including firm descriptions,
  project photos, pricing information, and team details.
</p>
<p>
  By submitting content to HomeMatch, Firms grant us a non-exclusive, royalty-free, worldwide
  licence to display, reproduce, and promote that content on the Platform and in associated
  marketing materials for the purpose of operating the matching service.
</p>
<p>
  HomeMatch does not independently verify all Firm-submitted content and makes no representations
  as to its accuracy. Homeowners are encouraged to independently verify credentials, reviews,
  and project claims before engaging any Firm.
</p>

<h2 id="ip">6. Intellectual Property</h2>
<p>
  The HomeMatch name, logo, design system, matching algorithm, and all original Platform content
  are the intellectual property of HomeMatch Pte. Ltd. and are protected by Singapore copyright
  and trademark law.
</p>
<p>You may not:</p>
<ul>
  <li>Copy, reproduce, or redistribute any part of the Platform without written permission</li>
  <li>Use the HomeMatch brand or logo without authorisation</li>
  <li>Reverse-engineer, scrape, or systematically extract data from the Platform</li>
  <li>Frame or embed the Platform in another website without permission</li>
</ul>
<p>
  Firm profile pages and project portfolios remain the intellectual property of the respective
  Firms. HomeMatch holds a licence to display such content as described in Section 5.
</p>

<h2 id="liability">7. Limitation of Liability</h2>
<p>
  To the maximum extent permitted by Singapore law, HomeMatch's liability to any user is limited
  to the amount paid by that user to HomeMatch in the 12 months preceding the claim (which, for
  free users, is SGD $0).
</p>
<p>HomeMatch is not liable for:</p>
<ul>
  <li>The quality, timeliness, or outcome of any renovation project</li>
  <li>Any disputes arising between Homeowners and Firms</li>
  <li>Financial losses arising from reliance on Firm profiles or estimates</li>
  <li>Any indirect, consequential, incidental, or punitive damages</li>
  <li>Service interruptions, data loss, or technical failures beyond our reasonable control</li>
</ul>
<div class="warning">
  <strong>Disclaimer:</strong> Budget estimates provided by HomeMatch tools are indicative only
  and do not constitute a quotation or guarantee of renovation costs. Always obtain written
  quotations directly from qualified renovation firms.
</div>

<h2 id="prohibited">8. Prohibited Uses</h2>
<p>You must not use HomeMatch to:</p>
<ul>
  <li>Submit false, misleading, or fraudulent information</li>
  <li>Impersonate any person, firm, or entity</li>
  <li>Harvest or collect personal data of other users</li>
  <li>Introduce malware, viruses, or malicious code</li>
  <li>Engage in any activity that disrupts or overloads Platform infrastructure</li>
  <li>Circumvent, disable, or interfere with security features</li>
  <li>Use the Platform for any unlawful purpose under Singapore law</li>
  <li>Post or transmit any content that is defamatory, offensive, or infringes third-party rights</li>
</ul>
<p>
  Breach of these prohibitions may result in immediate account termination and, where applicable,
  legal action.
</p>

<h2 id="termination">9. Termination</h2>
<p>
  HomeMatch may suspend or terminate your access to the Platform at any time, with or without
  notice, if we reasonably believe you have breached these Terms or if it is necessary to
  protect the Platform, other users, or third parties.
</p>
<p>
  You may discontinue use of HomeMatch at any time. For data deletion requests upon termination,
  please refer to our <a href="/privacy">Privacy Policy</a>.
</p>
<p>
  Provisions of these Terms that by their nature should survive termination (including Sections
  6, 7, 8, and 10) will continue to apply after termination.
</p>

<h2 id="governing">10. Governing Law</h2>
<p>
  These Terms of Service are governed by and construed in accordance with the laws of
  <strong>Singapore</strong>. Any dispute arising out of or in connection with these Terms
  shall be subject to the exclusive jurisdiction of the courts of Singapore.
</p>
<p>
  HomeMatch will attempt to resolve disputes amicably in the first instance. For consumer
  disputes, you may also consider mediation through the
  <strong>Singapore Mediation Centre (SMC)</strong> or the
  <strong>Consumers Association of Singapore (CASE)</strong>.
</p>

<h2 id="contact">11. Contact</h2>
<p>
  For legal enquiries, notices, or questions about these Terms of Service, please contact:
</p>
<ul>
  <li><strong>Email:</strong> <a href="mailto:legal@homematch.sg">legal@homematch.sg</a></li>
  <li><strong>Address:</strong> HomeMatch Pte. Ltd., Singapore</li>
</ul>
<p>
  For privacy-related enquiries, please refer to our <a href="/privacy">Privacy Policy</a> and
  contact <a href="mailto:privacy@homematch.sg">privacy@homematch.sg</a>.
</p>
`;

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#05080f] text-white">
      {/* Hero */}
      <section className="pt-32 pb-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/40 text-sm mb-8">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white/70">Terms of Service</span>
          </nav>

          <p className="section-label mb-3">Legal</p>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight tracking-tight">
            Terms of Service
          </h1>
          <p className="text-white/50 text-sm">Last updated: January 2025</p>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 pb-24">
        <div className="max-w-5xl mx-auto flex gap-12">
          {/* Sidebar TOC */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-28">
              <p className="text-white/40 text-xs uppercase tracking-widest font-bold mb-4">Contents</p>
              <nav className="space-y-1">
                {SECTIONS.map(({ id, label }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="block text-sm text-white/50 hover:text-[#c8881f] transition-colors py-1 leading-snug"
                  >
                    {label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Article */}
          <div className="flex-1 min-w-0">
            <div className="bg-[#0a0e1a] border border-white/8 rounded-3xl p-6 sm:p-10">
              <article
                className="article-body"
                dangerouslySetInnerHTML={{ __html: HTML_CONTENT }}
              />
            </div>

            {/* Footer note */}
            <div className="mt-6 flex items-center gap-4 flex-wrap">
              <Link
                href="/privacy"
                className="text-[#c8881f] text-sm hover:text-[#e8a830] transition-colors"
              >
                Privacy Policy →
              </Link>
              <span className="text-white/20 text-sm">·</span>
              <a
                href="mailto:legal@homematch.sg"
                className="text-white/40 text-sm hover:text-white/70 transition-colors"
              >
                legal@homematch.sg
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
