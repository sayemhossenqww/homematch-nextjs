import Image from "next/image";
import Link from "next/link";

export default function AboveFold() {
  return (
    <div className="abovefold">
      <div className="d-container above-fold w-container">
        <div className="greeting-div">
          <div className="jessica-hi-wrapper">
            <Image
              src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/636df0dfd029f8df2d5ba230_Jessica.svg"
              loading="lazy"
              alt="Friendly face of HomeMatch offering renovation guidance and support"
              width={120}
              height={120}
              className="jessica-hi"
            />
            <Image
              src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/638394183a69e9608ae4cc0d_wave.avif"
              alt="Helpful support from HomeMatch"
              width={60}
              height={60}
              className="wave"
            />
          </div>
          <h1 className="homepage-headline">
            Find <span className="text-span-53">Trusted </span>&amp;{" "}
            <span className="text-span-54">Suitable </span>Interior Designers
            &amp; Contractors
          </h1>
        </div>

        <div className="services-div">
          {/* SS Bubbles */}
          <div className="ss-bubbles">
            <div className="s-s-mechanism-wrapper homepage">
              <Link
                href="/safest-smartest#s-s-casetrust"
                target="_blank"
                className="tags s-s crl-cta hp w-button"
              >
                CaseTrust Only
              </Link>
              <Link
                href="/safest-smartest#s-s-pmatching"
                target="_blank"
                className="tags s-s dur hp w-button"
              >
                Precision Matching
              </Link>
              <Link
                href="/safest-smartest#s-s-sccontract"
                target="_blank"
                className="tags s-s aft hp w-button"
              >
                Contract Checks
              </Link>
              <Link
                href="/safest-smartest#s-s-deposit"
                target="_blank"
                className="tags s-s bef hp w-button"
              >
                100% Deposit Protection
              </Link>
              <Link
                href="/safest-smartest-assurance"
                target="_blank"
                className="ss-lb pills w-inline-block"
              >
                <Image
                  src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/662bc5e5c8839654a3f0c15a_s-s%20sticker.avif"
                  loading="lazy"
                  alt="Safest and smartest renovation platform in Singapore"
                  width={80}
                  height={80}
                  className="ss-icon"
                />
              </Link>
            </div>
            <Link
              href="/safest-smartest-assurance"
              target="_blank"
              className="home-learnmore small"
            >
              ...&amp; more
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="services-button-wrapper">
            <div
              className="services-button-innerwrapper"
              style={{ display: "flex", flexDirection: "row", gap: "12px", flexWrap: "wrap" }}
            >
              <a
                href="https://get.homematch.sg/?utm_source=Website&utm_medium=abovefold&utm_campaign=Get+Matched"
                className="services-button above-fold w-inline-block"
              >
                <div className="services-icon-wrapper">
                  <Image
                    src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/63832640210b95c7a58ca4e2_Get%20Matched.svg"
                    loading="lazy"
                    alt=""
                    width={40}
                    height={40}
                    className="services-icon"
                  />
                </div>
                <p className="d-p services-header">
                  Match with
                  <br />
                  CaseTrust Renovators
                </p>
              </a>

              <Link
                href="/interior-designers-contractors-list/casetrust-renovation-list"
                className="services-button above-fold w-inline-block"
              >
                <div className="services-icon-wrapper">
                  <Image
                    src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/63d7376a318b0b0827a90aa0_casetrust%20ids.svg"
                    loading="lazy"
                    alt=""
                    width={40}
                    height={40}
                    className="services-icon"
                  />
                </div>
                <p className="d-p services-header">
                  Browse for
                  <br />
                  CaseTrust Renovators
                </p>
              </Link>
            </div>

            <div className="itsfree-div">
              <div className="itsfree-wrapper">
                <p className="d-p _0btm-padding itsfree">
                  😉It&#x27;s Free. No Commissions!
                </p>
                <Image
                  src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/63844d452abcc70cb6dc17d6_short-squiggly.svg"
                  loading="lazy"
                  alt=""
                  width={80}
                  height={20}
                  className="itsfree-decorative"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
