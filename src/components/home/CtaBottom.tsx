import Image from "next/image";
import Link from "next/link";

export default function CtaBottom() {
  return (
    <div className="cta-bottom-wrapper">
      <div className="services-div">
        <div className="jessica-speech-wrapper menu">
          <Image
            src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/6384663494b18fa506d74cfa_Jessica-speech.svg"
            loading="eager"
            alt=""
            width={40}
            height={40}
            className="jessica-speech-icon menu"
          />
          <p className="d-p jessica-speech">Make Safer &amp; Smarter Reno Decisions 😊</p>
        </div>

        <div className="services-button-wrapper menu">
          <a
            href="https://get.homematch.sg/?utm_source=Website&utm_medium=menu&utm_campaign=Get+Matched"
            className="services-button bottom menu w-inline-block"
          >
            <div className="services-icon-wrapper bottom">
              <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/63832640210b95c7a58ca4e2_Get%20Matched.svg" loading="lazy" alt="" width={30} height={30} className="services-icon bottom" />
            </div>
            <p className="d-p services-header bottom">Match me w/ Renovators</p>
          </a>

          <Link href="/renovation-reviews/interior-design-renovation-reviews-singapore" className="services-button bottom menu w-inline-block">
            <div className="services-icon-wrapper bottom">
              <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/6989c2aaeb7711ce6a042d96_50f3d24c963aa5124492ffb51ad7528c_reviews-icon.svg" loading="lazy" alt="" width={30} height={30} className="services-icon bottom" />
            </div>
            <p className="d-p services-header bottom">Search &amp; Read Reviews</p>
          </Link>

          <Link href="/safest-smartest-assurance" className="services-button bottom menu w-inline-block">
            <div className="services-icon-wrapper bottom">
              <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/638476e9759e4dc32567a057_safest.svg" loading="lazy" alt="" width={30} height={30} className="services-icon bottom" />
            </div>
            <p className="d-p services-header bottom">Safest-Smartest Assurance</p>
          </Link>

          <Link href="/interior-designers-contractors-list/casetrust-renovation-list" target="_blank" className="services-button bottom menu w-inline-block">
            <div className="services-icon-wrapper bottom">
              <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/63d7376a318b0b0827a90aa0_casetrust%20ids.svg" loading="lazy" alt="" width={30} height={30} className="services-icon bottom" />
            </div>
            <p className="d-p services-header bottom">CaseTrust IDs List</p>
          </Link>

          <Link href="/guides" className="services-button bottom menu w-inline-block">
            <div className="services-icon-wrapper bottom">
              <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/64e767683a9a55f7eb3f32aa_renovation%20guide.svg" loading="lazy" alt="" width={30} height={30} className="services-icon bottom" />
            </div>
            <p className="d-p services-header bottom">Renovation Guides</p>
          </Link>

          <a href="https://ask.homematch.sg/?utm_source=Website&utm_medium=menu" className="services-button bottom menu w-inline-block">
            <div className="services-icon-wrapper bottom">
              <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/6383264073b91e982d86a7d7_Ask%20HomeMatch.svg" loading="lazy" alt="" width={30} height={30} className="services-icon bottom" />
            </div>
            <p className="d-p services-header bottom">Ask a Reno Question</p>
          </a>
        </div>
      </div>
    </div>
  );
}
