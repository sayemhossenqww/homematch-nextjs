import Link from "next/link";
import Image from "next/image";
import ReviewCards from "@/components/home/ReviewCards";
import { howItWorksReviews } from "@/components/home/ReviewCards";

export default function HowItWorks() {
  return (
    <div id="accurate-matching" className="safest-smartest">
      <div className="d-container safest smartest home w-container">
        <div id="how" className="home-main-wrapper">
          <h2 className="d-h1 blue no-padding">Most Accurate Matching</h2>
          <h3 className="d-h1 _30px">
            <span className="text-span-55">=</span> Avoid Wasting Time w/ Renovators
            <br />
            who can&#x27;t meet your needs
          </h3>
        </div>

        <div className="image-details-div new">
          <div className="howitworks-div">
            {/* Video */}
            <div className="intro-video-div">
              <div className="intro-video-wrapper">
                <div className="div-block-55">
                  <div>How It Works:</div>
                </div>
                <div className="intro-video w-embed w-iframe">
                  <div style={{ textAlign: "center" }}>
                    <iframe
                      className="videoFrame"
                      src="https://fast.wistia.net/embed/iframe/2kjt63zuog?seo=true&videoFoam=true"
                      title="homepage video"
                      allow="autoplay; fullscreen"
                      scrolling="no"
                      name="wistia_embed"
                      style={{
                        borderRadius: "30px",
                        boxShadow: "0px 0px 10px rgb(0 0 0 / 0.5)",
                        width: "30vw",
                        height: "40vw",
                        border: "none",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Steps */}
            <div className="steps-div">
              <div className="steps-header">
                <div>How It Works:</div>
              </div>

              <div className="step1 content">
                <div className="how-it-works-copy-wrapper _1">
                  <h2 className="label"><strong>1: Get Matched</strong></h2>
                  <h3 className="how-it-works-copy">
                    Submit a request. We&#x27;ll<br />
                    reach out to understand<br />
                    your reno needs properly<br />
                    and provide advice
                  </h3>
                </div>
              </div>

              <div className="step2 content">
                <div className="how-it-works-copy-wrapper">
                  <h2 className="label"><strong>2: Receive Matches</strong></h2>
                  <h3 className="how-it-works-copy">
                    <strong>Save Time Searching:<br />‍</strong>
                    We&#x27;ll Match you accurately<br />
                    to the exact person (not<br />
                    just firms!)
                  </h3>
                </div>
              </div>

              <div className="step3 content">
                <div className="how-it-works-copy-wrapper">
                  <h2 className="label"><strong>3: Receive Guarantees</strong></h2>
                  <h3 className="how-it-works-copy">
                    <strong>Prevent Nightmares:<br />‍</strong>
                    100% Deposit Protection,<br />
                    Contract Checks, Dispute<br />
                    Resolution, &amp; More
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <a
            href="https://get.homematch.sg/?utm_source=Website&utm_medium=how-it-works&b=how-it-works"
            className="how-it-works-cta w-button"
          >
            Get Matched
          </a>
        </div>

        {/* Google reviews — inside this section, as per original HTML */}
        <ReviewCards reviews={howItWorksReviews} />

        {/* More info link */}
        <div className="more-info-wrapper">
          <Link href="https://www.homematch.sg/ask/homematchs-surefire-approach-to-finding-you-the-most-suitable-renovator-3-things-we-do" className="info-icon-link w-inline-block">
            <Image
              src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/667d2cabb07e90396e370041_about.svg"
              loading="lazy"
              alt=""
              width={30}
              height={30}
              className="info-icon-30"
            />
          </Link>
          <Link href="/safest-smartest#s-s-pmatching" target="_blank" className="home-learnmore">
            Full Details: How we find you specific renovators who meet your specific needs
          </Link>
        </div>
      </div>
    </div>
  );
}
