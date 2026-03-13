import Image from "next/image";
import Link from "next/link";

export default function SSTransition() {
  return (
    <div className="homepage-transition-div">
      <Link
        href="/safest-smartest-assurance"
        target="_blank"
        className="ss-transition-link w-inline-block"
      >
        <Image
          src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/662bc5e5c8839654a3f0c15a_s-s%20sticker.avif"
          loading="lazy"
          alt="Safest and smartest renovation platform in Singapore"
          width={200}
          height={200}
          className="ss-transition-icon"
        />
      </Link>
      <div className="ss-transition-header">
        HomeMatch&#x27;s Safest-Smartest Assurance
      </div>
      <div className="ss-transition-text">
        <strong className="bold-text-48">
          Be protected before, during, and after renovation:
          <br />
        </strong>
      </div>
      <div className="ss-bubbles">
        <div className="s-s-mechanism-wrapper homepage top0">
          <Link
            href="/safest-smartest-assurance"
            target="_blank"
            className="tags s-s crl-cta hp w-button"
          >
            CaseTrust Only
          </Link>
          <Link
            href="/safest-smartest-assurance"
            target="_blank"
            className="tags s-s dur hp w-button"
          >
            Precision Matching
          </Link>
          <Link
            href="/safest-smartest-assurance"
            target="_blank"
            className="tags s-s aft hp w-button"
          >
            Contract Checks
          </Link>
          <Link
            href="/safest-smartest-assurance"
            target="_blank"
            className="tags s-s bef hp w-button"
          >
            100% Deposit Protection
          </Link>
        </div>
      </div>
      <Link
        href="/safest-smartest-assurance"
        target="_blank"
        className="jessica-options-button new w-inline-block"
      >
        <p className="d-p d-smallp jessica-options new">Learn More</p>
      </Link>
    </div>
  );
}
