import Image from "next/image";
import Link from "next/link";

interface CRLCtaBlockProps {
  utmMedium?: string;
  utmContent?: string;
}

export default function CRLCtaBlock({ utmMedium = "crl-btm", utmContent = "CaseTrust" }: CRLCtaBlockProps) {
  const href = `https://get.homematch.sg/?utm_source=Website&utm_medium=${utmMedium}&utm_content=${encodeURIComponent(utmContent)}`;

  return (
    <aside id="crl-help" className="crl-cta-div blog crl">
      <div className="crl-cta-copy post">
        <h2 className="d-h crl-cta-copy blog">
          15 mins<span className="text-span-23"> </span>with us saves you
          <span className="text-span-23"> </span>15 hours
        </h2>
        <div className="d-p crl crl-cta-copy blog">
          <span>
            <strong>Avoid wasting time with renovators who can&apos;t meet your needs. </strong>
          </span>
          We&apos;ll match you with Trusted &amp; Suitable Renovators.
          <br />
        </div>
        <div className="crl-cta-button-div">
          <div className="crl-cta-button-wrapper">
            <a href={href} className="d-button crl-cta actual w-button">
              Match Me!
            </a>
            <div className="crl-header-tooltip-wrapper align-top">
              <Image
                src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/68d136017d078a32b195d255_info%20(white).svg"
                loading="lazy"
                alt=""
                width={20}
                height={20}
                className="crl-filter-header-tooltip"
              />
              <div className="crl-header-tooltip-info spread crl-cta">
                <div className="crl-tooltip-text">
                  <strong>Get Matched</strong> and let us do the work. With our largest database of individual renovator profiles, we&apos;ll match you with not just the right firm, but the right person for your renovation needs.
                </div>
              </div>
            </div>
          </div>
          <div className="d-p crl crl-cta-copy sub">It&apos;s Free!<br /></div>
        </div>
      </div>
      <div className="crl-cta-ss-div">
        <div className="crl-cta-ss-header">
          <Link href="/safest-smartest-assurance" className="crl-cta-ss-link w-inline-block">
            <Image
              src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/662bc5936e4583d19115f3a0_s-s%20long.png"
              loading="lazy"
              alt=""
              width={234}
              height={40}
              className="crl-cta-ss-icon"
            />
          </Link>
          <div>
            <div className="crl-cta-ss-header-text">
              Absolute most <span className="text-span-46">stringent</span> screening &amp; <span className="text-span-47">comprehensive</span> guarantees
            </div>
          </div>
        </div>
        <div className="s-s-mechanism-wrapper">
          <Link href="/safest-smartest-assurance" className="link-block-7 w-inline-block"></Link>
          {[
            ["CaseTrust-Accredited Only", "#s-s-casetrust", "crl-cta"],
            ["4+ Stars Reviews Only", "#s-s-4stars", "find"],
            ["Individual Screening", "#s-s-individual", "find"],
            ["100% Deposit Guarantee", "#s-s-deposit", "bef"],
            ["Service Warranty", "#s-s-warranty", "bef"],
            ["Standard CaseTrust Contract", "#s-s-sccontract", "bef"],
            ["No Hidden Cost", "#s-s-fairerprices", "bef"],
            ["Progressive Payments", "#s-s-progpayments", "bef"],
            ["Fairer Prices", "#s-s-fairerprices", "bef"],
            ["Contract Review", "#s-s-confidant", "dur"],
            ["1-1 Guidance", "#s-s-guidance", "dur"],
            ["Dispute Resolution", "#s-s-disputeresol", "aft"],
            ["Feedback Management", "#s-s-feedbackmgt", "aft"],
            ["Withholding Payment", "#s-s-withholding", "aft"],
          ].map(([label, anchor, cls]) => (
            <Link
              key={label}
              href={`/safest-smartest-assurance${anchor}`}
              target="_blank"
              className={`tags s-s ${cls} w-button`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
