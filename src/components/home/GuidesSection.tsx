"use client";

import Image from "next/image";
import Link from "next/link";

const guides = [
  {
    href: "http://www.homematch.sg/renovation-guides/how-many-interior-designers-should-i-be-meeting",
    readTime: "1 min read",
    title: "How Many Interior Designers Should I Be Meeting?",
    excerpt: "A good rule-of-thumb is meeting...",
  },
  {
    href: "/ask/why-work-with-casetrust-accredited-renovators",
    readTime: "2 min read",
    title: "Should you work with CaseTrust-accredited Renovators? (7 Ways you're Protected)",
    excerpt: "Working with a CaseTrust-accredited Renovation Contractor is Safer because it protects you before, during, and after renovation..",
  },
  {
    href: "/renovation-guides/where-to-find-casetrust-accredited-renovation-firms-how-to-know-if-they-are-legit",
    readTime: "2 min read",
    title: "Where to Find CaseTrust-accredited Renovation Firms (And How to Know If They're Legit)",
    excerpt: "The Safest and Smartest Way!",
  },
  {
    href: "/renovation-guides/where-to-download-floor-plan-for-landed-properties",
    readTime: "1 min read",
    title: "Where To Download Floor Plan for Landed Properties?",
    excerpt: "4 different ways!",
  },
  {
    href: "/renovation-guides/how-to-choose-materials-for-your-home-renovation-singapore-complete-guide",
    readTime: "2 min read",
    title: "How to Choose Materials for Your Home Renovation in Singapore (A Complete Guide)",
    excerpt: "What to consider when choosing materials for your home renovation?",
  },
  {
    href: "/renovation-guides/3-types-of-hidden-costs-in-renovation-what-is-acceptable",
    readTime: "2 min read",
    title: "Beware of These 3 Hidden Renovation Costs in Singapore",
    excerpt: "Think your renovation quotation covers everything? Think again.",
  },
];

export default function GuidesSection() {
  return (
    <div className="guides-container">
      {/* Header */}
      <div className="guide-herodiv homepage">
        <div className="guide-textwrapper">
          <h2 className="d-h crl guide">Renovation Guides for Singaporeans</h2>
          <p className="d-p crl guide">
            Really short, &#x27;no-fluffs&#x27;, &#x27;cut-to-the-chase&#x27; guides that help you avoid wasting time and money
          </p>
        </div>
        <div className="div-block-34" />
        <div className="guide-newsletterwrapper">
          <p className="d-p crl guide newsletter">🤫 Access insider home tips &amp; secret deals</p>
          <div className="newsletter-div">
            <div className="newsletter-opt w-form">
              <form
                id="wf-form-Newsletter-Form"
                name="wf-form-Newsletter-Form"
                method="get"
                className="newsletter-opt-wrapper"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  className="text-field-2 w-input"
                  maxLength={256}
                  name="email"
                  placeholder="Enter Email"
                  type="email"
                  id="email"
                  required
                />
                <input
                  type="submit"
                  className="submit-button w-button"
                  value="Request"
                />
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Guide cards */}
      <div className="guides-wrapper">
        <div className="collection-list-wrapper-12 homepage w-dyn-list">
          <div role="list" className="blog-collectionlist bottom homepage w-dyn-items">
            {guides.map((g, i) => (
              <div key={i} role="listitem" className="blog-collectionitem bottom homepage w-dyn-item">
                <Link href={g.href} className="reco-reads w-inline-block">
                  <div className="text-block-15">{g.readTime}</div>
                  <h3 className="reco-reads-text">{g.title}</h3>
                  <div className="text-block-14">{g.excerpt}</div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Link href="/guides" className="ad-bu blog home w-button">
        View More &gt;
      </Link>
    </div>
  );
}
