import Image from "next/image";
import Link from "next/link";
import ReviewCards from "@/components/home/ReviewCards";
import { stringentReviews } from "@/components/home/ReviewCards";

export default function MostStringent() {
  return (
    <div id="most-stringent" className="safest-smartest safest">
      <div className="d-container safest home w-container">
        <div className="home-main-wrapper">
          <h2 className="d-h1 blue no-padding">Most Stringent Screening</h2>
          <h3 className="d-h1 _30px">
            <span className="text-span-55">=</span>Avoid Reno Nightmares
          </h3>
        </div>

        <div className="stringent-div">
          <Link href="/casetrust-info" target="_blank" className="stringent-point-wrapper w-inline-block">
            <div className="stringent-icon-wrapper">
              <Image
                src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/638459f294b18f9f97d662df_CaseTrust%20Logo.svg"
                loading="lazy"
                alt="HomeMatch CaseTrust-backed renovators and contractors"
                width={80}
                height={40}
                className="stringent-icon"
              />
            </div>
            <div className="stringent-text-wrapper">
              <div className="stringent-maintext">CaseTrust-Accredited</div>
              <div className="stringent-text">Renovators are rigorously assessed and follow fair consumer practices</div>
            </div>
          </Link>

          <Link href="/safest-smartest#s-s-4stars" target="_blank" className="stringent-point-wrapper w-inline-block">
            <div className="stringent-icon-wrapper">
              <Image
                src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/6384b46330aa4b0dc2986505_atleast-4stars.svg"
                loading="lazy"
                alt=""
                width={60}
                height={60}
                className="stringent-icon"
              />
            </div>
            <div className="stringent-text-wrapper">
              <div className="stringent-maintext">4+ Stars Reviews</div>
              <div className="stringent-text">All renovators have at least 4 stars reviews on neutral platforms like FB or Google</div>
            </div>
          </Link>

          <Link href="/safest-smartest#s-s-individual" target="_blank" className="stringent-point-wrapper w-inline-block">
            <div className="stringent-icon-wrapper">
              <div className="firm-indv-div company-profile-list-wrapper">
                <div className="firm-indv-icons-wrapper crllist">
                  <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/66ac68e1c9e20d8d3cc4d648_6627ac596a58786a59a7133e_920Small.png" loading="lazy" alt="" width={30} height={30} className="firm-indv-icons crllist" />
                </div>
                <div className="firm-indv-icons-wrapper crllist">
                  <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/66ac68e123cd168ae945f1d9_638d8c118b80d849e574a276_Aestherior_Leonads%2B(Small).avif" loading="lazy" alt="" width={30} height={30} className="firm-indv-icons crllist" />
                </div>
                <div className="firm-indv-icons-wrapper crllist last">
                  <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/66912e63c6023a7f5b2c04f2_plus.svg" loading="lazy" alt="" width={20} height={20} className="firm-indv-icons crllist" />
                </div>
                <div className="indv-screened-wrapper">
                  <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/667d5dcf3343105a9cd759a4_blue%20tick.svg" loading="lazy" alt="" width={20} height={20} className="indv-screened-icon crllist" />
                </div>
              </div>
            </div>
            <div className="stringent-text-wrapper">
              <div className="stringent-maintext">Individual Screening</div>
              <div className="stringent-text">Everyone is interviewed and screened on an individual level</div>
            </div>
          </Link>
        </div>

        {/* Google reviews — inside this section, as per original HTML */}
        <ReviewCards reviews={stringentReviews} />

        <div className="more-info-wrapper">
          <Link href="/safest-smartest#s-s-casetrust" className="info-icon-link w-inline-block">
            <Image
              src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/667d2cabb07e90396e370041_about.svg"
              loading="lazy"
              alt=""
              width={30}
              height={30}
              className="info-icon-30"
            />
          </Link>
          <Link href="/safest-smartest#s-s-casetrust" className="home-learnmore">
            Full Details: How we screen our Renovators and why it is the most stringent in the industry
          </Link>
        </div>
      </div>
    </div>
  );
}
