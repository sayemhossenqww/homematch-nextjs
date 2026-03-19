import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | HomeMatch Singapore",
  description:
    "HomeMatch's Privacy Policy — how we collect, use, and protect your personal data in compliance with Singapore's Personal Data Protection Act (PDPA).",
  alternates: { canonical: "https://www.homematch.sg/privacy" },
  robots: { index: false, follow: false },
};

const SECTIONS = [
  { id: "introduction",       label: "Introduction" },
  { id: "information",        label: "Information We Collect" },
  { id: "use",                label: "How We Use Information" },
  { id: "sharing",            label: "Data Sharing" },
  { id: "cookies",            label: "Cookies & Analytics" },
  { id: "retention",          label: "Data Retention" },
  { id: "rights",             label: "Your Rights" },
  { id: "contact",            label: "Contact Us" },
  { id: "updates",            label: "Updates to Policy" },
];

const HTML_CONTENT = `
<h2 id="introduction">1. Introduction</h2>
<p>
  HomeMatch ("we", "our", "us") is a Singapore-based digital platform that connects homeowners
  with verified interior design firms. We are committed to protecting your personal data and
  complying fully with the <strong>Personal Data Protection Act 2012 (PDPA)</strong> of Singapore.
</p>
<p>
  This Privacy Policy explains what personal data we collect, why we collect it, how we use it,
  and the rights you have over your information. By using HomeMatch, you agree to the practices
  described in this policy.
</p>

<h2 id="information">2. Information We Collect</h2>
<p>We collect personal data in the following categories:</p>
<h3>Information you provide directly</h3>
<ul>
  <li><strong>Contact details:</strong> Full name, email address, mobile number</li>
  <li><strong>Property information:</strong> Property type (HDB / Condo / Landed), district or postal code, flat size</li>
  <li><strong>Renovation preferences:</strong> Budget range, design style preferences, renovation scope, timeline</li>
  <li><strong>Communications:</strong> Messages you send via our contact or matching forms</li>
</ul>
<h3>Information collected automatically</h3>
<ul>
  <li><strong>Usage data:</strong> Pages visited, time spent, features used, click patterns</li>
  <li><strong>Device data:</strong> IP address, browser type, operating system, device identifiers</li>
  <li><strong>Referral source:</strong> How you arrived at HomeMatch (search engine, social media, etc.)</li>
</ul>

<h2 id="use">3. How We Use Your Information</h2>
<p>We use your personal data for the following purposes:</p>
<ul>
  <li><strong>Matching service:</strong> To identify and connect you with interior design firms that match your requirements, budget, and style preferences</li>
  <li><strong>Communications:</strong> To send you quotation requests, firm responses, project updates, and service-related notifications</li>
  <li><strong>Platform improvement:</strong> To analyse usage patterns, improve our matching algorithm, and enhance the user experience</li>
  <li><strong>Marketing (with consent):</strong> To send renovation tips, firm spotlights, and HomeMatch updates if you have opted in</li>
  <li><strong>Legal compliance:</strong> To meet our obligations under Singapore law and respond to lawful requests from authorities</li>
</ul>

<h2 id="sharing">4. Data Sharing</h2>
<p>HomeMatch does not sell your personal data. We share information only in these circumstances:</p>
<ul>
  <li><strong>With matched ID firms:</strong> When you request quotations, we share your name, contact details, and renovation requirements with the interior design firms you have been matched with. This sharing is essential to our core service and done with your explicit consent at the point of submission.</li>
  <li><strong>With service providers:</strong> We use trusted third-party providers for email delivery, analytics, and cloud hosting. These providers are contractually bound to process data only on our instructions.</li>
  <li><strong>Legal requirements:</strong> We may disclose data if required by law, court order, or governmental authority in Singapore.</li>
</ul>
<p>
  All data sharing with interior design firms is governed by our Firm Partner Agreement, which
  requires firms to use your data solely for responding to your renovation enquiry and to comply
  with the PDPA in their own right.
</p>

<h2 id="cookies">5. Cookies &amp; Analytics</h2>
<p>
  HomeMatch uses cookies and similar tracking technologies to operate and improve the platform.
  Cookies we use include:
</p>
<ul>
  <li><strong>Essential cookies:</strong> Required for the platform to function (session management, form submissions)</li>
  <li><strong>Analytics cookies:</strong> We use Google Analytics 4 to understand how users interact with our platform. This data is aggregated and anonymised where possible.</li>
  <li><strong>Preference cookies:</strong> To remember your settings and preferences across sessions</li>
</ul>
<p>
  You can control cookies through your browser settings. Disabling essential cookies may affect
  platform functionality.
</p>

<h2 id="retention">6. Data Retention</h2>
<p>
  We retain your personal data for as long as necessary to provide our services and comply with
  legal obligations:
</p>
<ul>
  <li>Active account data is retained for the duration of your engagement with HomeMatch</li>
  <li>Enquiry and matching records are retained for up to <strong>3 years</strong> for service improvement and dispute resolution</li>
  <li>Analytics data is retained in aggregated form indefinitely</li>
</ul>
<p>
  You may request deletion of your personal data at any time (see Your Rights below). We will
  action deletion requests within <strong>30 days</strong>, subject to any legal retention requirements.
</p>

<h2 id="rights">7. Your Rights Under the PDPA</h2>
<p>As a data subject under Singapore's PDPA, you have the following rights:</p>
<ul>
  <li><strong>Right of access:</strong> Request a copy of the personal data we hold about you</li>
  <li><strong>Right of correction:</strong> Request correction of inaccurate or incomplete data</li>
  <li><strong>Right of withdrawal:</strong> Withdraw consent for marketing communications at any time</li>
  <li><strong>Right of erasure:</strong> Request deletion of your personal data, subject to legal retention requirements</li>
  <li><strong>Right to data portability:</strong> Request your data in a structured, machine-readable format</li>
</ul>
<p>
  To exercise any of these rights, please contact our Data Protection Officer (DPO) at
  <a href="mailto:privacy@homematch.sg">privacy@homematch.sg</a>. We will acknowledge your
  request within <strong>5 business days</strong> and resolve it within <strong>30 days</strong>.
</p>

<h2 id="contact">8. Contact Us</h2>
<p>For all privacy-related enquiries, please contact our Data Protection Officer:</p>
<ul>
  <li><strong>Email:</strong> <a href="mailto:privacy@homematch.sg">privacy@homematch.sg</a></li>
  <li><strong>Phone:</strong> <a href="tel:+6583326708">+65 8332 6708</a></li>
  <li><strong>Address:</strong> HomeMatch Pte. Ltd., Singapore</li>
</ul>
<p>
  If you are not satisfied with our response, you may lodge a complaint with the
  <strong>Personal Data Protection Commission (PDPC)</strong> at
  <a href="https://www.pdpc.gov.sg" target="_blank" rel="noopener noreferrer">www.pdpc.gov.sg</a>.
</p>

<h2 id="updates">9. Updates to This Policy</h2>
<p>
  We may update this Privacy Policy from time to time to reflect changes in our practices or
  applicable law. We will notify registered users of material changes via email or a prominent
  notice on the platform. The "Last Updated" date at the top of this page indicates when the
  policy was last revised.
</p>
<p>
  Your continued use of HomeMatch after any changes constitutes your acceptance of the updated
  Privacy Policy.
</p>
`;

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#05080f] text-white">
      {/* Hero */}
      <section className="pt-32 pb-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/40 text-sm mb-8">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white/70">Privacy Policy</span>
          </nav>

          <p className="section-label mb-3">Legal</p>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight tracking-tight">
            Privacy Policy
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
          </div>
        </div>
      </section>
    </div>
  );
}
