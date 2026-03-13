import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "What is CaseTrust? | HomeMatch",
  description:
    "CaseTrust is the accreditation arm of CASE (Consumers Association of Singapore). Learn what CaseTrust accreditation means for your renovation.",
  alternates: { canonical: "https://www.homematch.sg/casetrust-info" },
};

export default function CaseTrustInfoPage() {
  return (
    <>
      <div className="d-section">
        <div className="d-container blog w-container">
          <h1 className="blog-title">What is CaseTrust?</h1>

          <div className="w-richtext blog-body">
            <p>
              CaseTrust is the accreditation arm of <a href="https://www.case.org.sg/casetrust/" target="_blank" rel="noopener noreferrer">CASE (Consumers Association of Singapore)</a> for the renovation and retail industry in Singapore.
            </p>
            <p>
              Businesses must undergo rigorous assessments to obtain &amp; maintain CaseTrust accreditation. Only businesses that fulfill the accreditation criteria will be awarded the CaseTrust logo.
            </p>

            <h2>Why Does CaseTrust Matter?</h2>
            <p>
              Renovation is the industry that receives the <strong>most complaints</strong> in Singapore. Scams, shoddy works, delays, and unprofessionalism are rampant.
            </p>
            <p>
              CaseTrust accreditation is your first line of defense because it requires renovators to adhere to:
            </p>
            <ul>
              <li><strong>100% deposit protection</strong> — via performance bond underwritten by NTUC Income</li>
              <li><strong>Standard CaseTrust contract</strong> — fair, transparent terms that protect you</li>
              <li><strong>Itemised quotations</strong> — no hidden costs</li>
              <li><strong>Progressive payment schedule</strong> — you pay in milestones, not upfront</li>
              <li><strong>Minimum 12-month workmanship warranty</strong></li>
              <li><strong>Dispute resolution</strong> — via CASE if needed</li>
              <li><strong>Proper complaint management</strong> — must resolve within 21 working days</li>
            </ul>

            <h2>CaseTrust Assessment Criteria</h2>
            <p>
              To obtain CaseTrust accreditation, renovation businesses must demonstrate:
            </p>
            <ul>
              <li>Sound business practices and financial standing</li>
              <li>Proper staff training and professionalism</li>
              <li>Fair, transparent pricing</li>
              <li>Adequate systems for handling customer complaints</li>
              <li>Compliance with all relevant laws and regulations</li>
            </ul>

            <div style={{ textAlign: "center", margin: "24px 0" }}>
              <Image
                src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/638459f294b18f9f97d662df_CaseTrust%20Logo.svg"
                alt="CaseTrust Logo"
                width={150}
                height={60}
              />
            </div>

            <h2>HomeMatch &amp; CaseTrust</h2>
            <p>
              HomeMatch is the <strong>Official Marketing Partner of CaseTrust</strong>. Every renovator we match you with is CaseTrust-accredited, ensuring you benefit from all the consumer protections above — before, during, and after your renovation.
            </p>
            <p>
              On top of CaseTrust requirements, HomeMatch also applies additional screening: we only work with firms that have <strong>at least 4-star reviews</strong> on neutral platforms like Google or Facebook, and we individually interview and profile every single renovator.
            </p>

            <div style={{ textAlign: "center", margin: "32px 0" }}>
              <a
                href="https://get.homematch.sg/?utm_source=Website&utm_medium=casetrust-info"
                className="d-button crl-cta actual w-button"
                style={{ display: "inline-block" }}
              >
                Match Me with a CaseTrust Renovator
              </a>
            </div>

            <h2>Verify CaseTrust Accreditation</h2>
            <p>
              You can verify whether a renovation firm is genuinely CaseTrust-accredited via the official list:
            </p>
            <ul>
              <li>
                <a href="https://www.casetrust.org.sg/AccreditedMembers" target="_blank" rel="noopener noreferrer">
                  CaseTrust Accredited Members Directory
                </a>
              </li>
            </ul>
            <p>
              Or browse HomeMatch&apos;s curated list of CaseTrust-accredited renovation firms:
            </p>
            <ul>
              <li>
                <Link href="/casetrust-renovation-list">HomeMatch CaseTrust Renovation List</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
