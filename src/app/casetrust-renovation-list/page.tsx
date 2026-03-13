import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";

export const metadata: Metadata = {
  title: "List of CaseTrust Accredited Interior Design Firms & Renovation Contractors",
  description:
    "HomeMatch is the Official Marketing Partner of CaseTrust. Browse & Enquire via HomeMatch for the Safest-Smartest Assurance which includes contract checks, 100% deposit guarantee, individual screening, precision matching, warranty, progressive payments, itemised pricing, standard CASE contract etc.",
  openGraph: {
    title: "List of CaseTrust Accredited Interior Design Firms & Renovation Contractors",
    type: "website",
  },
  alternates: { canonical: "https://www.homematch.sg/casetrust-renovation-list" },
};

export default function CaseTrustRenovationListPage() {
  return (
    <>
      <style>{`
        [wized-cloak]{display:none}[wized-loader]{display:flex}
        .crl-filter-button{background-color:transparent;color:#055161;transition:background-color .2s ease,color .2s ease}
        .crl-filter-button.is-active{background-color:#42C2FB;color:#fff}
        @media(hover:hover) and (pointer:fine){.crl-filter-button:hover{background-color:#42C2FB;color:#fff}}
        .crl-filter-innerwrapper,.link-block.preview.reviews,.crl-search-suggestion-wrapper{overflow-y:scroll;overflow-x:hidden}
        .crl-filter-innerwrapper::-webkit-scrollbar,.link-block.preview.reviews::-webkit-scrollbar,.crl-search-suggestion-wrapper::-webkit-scrollbar{width:7px}
        .crl-filter-innerwrapper::-webkit-scrollbar-thumb,.link-block.preview.reviews::-webkit-scrollbar-thumb,.crl-search-suggestion-wrapper::-webkit-scrollbar-thumb{background:#BBE6EF;border-radius:10px}
        .company-project-preview-wrapper{overflow-x:scroll;overflow-y:hidden}
        .company-project-preview-wrapper::-webkit-scrollbar{height:7px}
        .company-project-preview-wrapper::-webkit-scrollbar-thumb{background:#BBE6EF;border-radius:10px}
        .crl-precision-headline{white-space:normal;overflow-wrap:break-word}
      `}</style>

      <Script async src="https://embed.wized.com/Z91WeJ4HTnL6Hn6DFRi3.js" />
      <Script async type="module" data-wized-id="Z91WeJ4HTnL6Hn6DFRi3" src="https://embed.wized.com/v2/index.js" />
      <Script async src="https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmssort@1/cmssort.js" />

      {/* Precision Popup */}
      <div className="crl-precision-popup-div">
        <div className="crl-precision-popup-wrapper">
          <div className="crl-precision-headline-wrapper">
            <div className="crl-precision-headline">We&apos;ll find you specific renovators who can deliver on</div>
            <div className="crl-precision-headline dynamic">{"{{precision}}"}</div>
          </div>
          <div className="w-embed w-iframe w-script">
            <div className="video-wrap">
              <iframe className="videoFrame" src="https://fast.wistia.net/embed/iframe/dprpirjq7d?web_component=true&seo=false&videoFoam=false" title="Tiktok (waste) Video" allow="autoplay; fullscreen" frameBorder="0" scrolling="no"></iframe>
            </div>
            <style>{`.video-wrap{width:90%;margin:0 auto}.video-wrap .videoFrame{width:100%;aspect-ratio:1/1;height:auto;display:block;border:0}`}</style>
          </div>
          <div className="crl-precision-desc">Don&apos;t waste hours meeting firm after firm... Only to discover the individual you get assigned can&apos;t meet your needs.</div>
          <a href="#" target="_blank" className="crl-precision-cta w-button">Match Me!</a>
          <a href="#" className="crl-precision-close">X</a>
        </div>
      </div>

      {/* Hero */}
      <div className="crl-hero-div">
        <div className="crl-h1-div">
          <div className="crl-h1-wrapper crl-version">
            <h1 className="crl-h1 crl-version">CaseTrust Interior Designers &amp; Contractors List</h1>
            <div className="crl-h1-ss-wrapper">
              <p className="d-p crl crl-version">
                Enquire via HomeMatch for the{" "}
                <a href="/safest-smartest-assurance?utm_source=Website&utm_medium=crl" target="_blank" className="crl-ss-text-link">
                  Safest-Smartest Assurance
                </a>:{" "}
              </p>
              <div className="ss-bubbles">
                <div className="s-s-mechanism-wrapper homepage crl-version">
                  <a href="/safest-smartest-assurance?utm_source=Website&utm_medium=crl#s-s-sccontract" target="_blank" className="tags s-s crl-cta hp white w-button">Contract Checks</a>
                  <a href="/safest-smartest-assurance?utm_source=Website&utm_medium=crl#s-s-pmatching" target="_blank" className="tags s-s dur hp white w-button">Precision Matching</a>
                  <a href="/safest-smartest-assurance?utm_source=Website&utm_medium=crl#s-s-deposit" target="_blank" className="tags s-s aft hp white w-button">100% Deposit Protection</a>
                  <a href="/safest-smartest-assurance?utm_source=Website&utm_medium=crl#s-s-disputeresol" target="_blank" className="tags s-s bef hp white w-button">Dispute Resolution</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed aside CRL menu */}
      <aside id="crl-menu" className="companies-menu crl-version">
        <div className="companies-menu-buttons-div">
          <div className="companies-menu-buttons-2nddiv">
            <a href="https://get.homematch.sg/?utm_source=Website&utm_medium=crl-top&utm_content=CaseTrust" className="companies-menu-button-wrapper crl-version w-inline-block">
              <img loading="lazy" src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/638476e9c68fbc434772b454_smartest.svg" alt="" className="companies-menu-button-icon" />
              <div className="companies-menu-button-text">Recommend Me!</div>
            </a>
            <div className="crl-header-tooltip-wrapper align-top">
              <img src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/68d136017d078a32b195d255_info%20(white).svg" loading="lazy" alt="" className="crl-filter-header-tooltip" />
              <div className="crl-header-tooltip-info spread crl-version">
                <div className="crl-tooltip-text">Not sure who to choose? Click <strong>&quot;Recommend Me&quot;</strong> and let us do the work.</div>
              </div>
            </div>
          </div>
          <div className="companies-menu-button-wrapper crl-version filter">
            <img loading="lazy" src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/68a4186f99d5bbafe2042a00_white-arrow.svg" alt="" className="companies-menu-button-icon small" />
            <div className="companies-menu-button-text filter">Search &amp; Filter</div>
          </div>
          <a href="#page-anchor" className="chat-icon-linkwrapper crl-top w-inline-block">
            <img loading="lazy" alt="" src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/68c79d78fa9f9797d7e3cd19_Up%20Button.svg" className="chat-icon small" />
          </a>
        </div>
      </aside>

      <div id="page-anchor" className="page-anchor"></div>

      {/* Main body */}
      <div className="crl-body-div">
        {/* Filter Sidebar */}
        <div className="crl-filter-div">
          <div className="crl-filter-close-div">
            <a wized="crl-filter-reset" href="#" className="crl-filter-reset-wrapper w-inline-block">
              <div className="crl-filter-reset">Clear all</div>
            </a>
            <a href="#" className="crl-filter-close-wrapper w-inline-block">
              <img src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/68a4341c90fed7e4cf67409b_0810056a2ec0bf0068331b867731df00_blue%20cross.svg" loading="lazy" alt="" className="crl-filter-close" />
            </a>
          </div>

          {/* Search */}
          <div id="search-form" className="crl-search-wrapper w-form">
            <form id="wf-form-search-firms" className="crl-search-form">
              <div className="crl-search">
                <img loading="lazy" src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/6690efcb4fd569a8f86868a8_search.svg" alt="" className="crl-search-icon" />
                <input className="crl-search-input w-input" wized="crl-search-firms" autoFocus maxLength={256} name="firm-search" placeholder="Search Renovators..." type="text" id="firm-search" />
                <a wized="crl-search-cancel" href="#" className="crl-search-cancel">X</a>
              </div>
              <div wized-cloak="true" wized="crl-filter-suggestion-div" className="crl-search-suggestion-div">
                <div className="crl-search-suggestion-wrapper">
                  <div wized="crl-search-suggestion" className="crl-search-suggestion">Search Query Suggestion</div>
                </div>
              </div>
            </form>
          </div>

          {/* Filters */}
          <div className="crl-filter-outerwrapper">
            <div className="crl-filter-innerwrapper">
              <form id="crl-filter" className="crl-filter-form">
                <div className="crl-filter-header-wrapper">
                  <div className="filter-icon crl-version header">Priority Filters</div>
                  <a wized="crl-filter-reset" href="#" className="crl-filter-reset-wrapper w-inline-block">
                    <div className="crl-filter-reset desktop">Clear all</div>
                  </a>
                </div>

                {/* Safest filters */}
                {[
                  { header: "Safest", tooltip: "\"Safest\" is about protecting you from scams and unfair practices.", buttons: [
                    { filter: "safest-smartest", label: "Safest-Smartest Assurance" },
                    { filter: "individually_profiled", label: "Individually Screened" },
                    { filter: "4stars", label: ">4 Stars Review" },
                  ]},
                  { header: "Expertise Needed", tooltip: "", buttons: [
                    { filter: "hdb_licensed", label: "HDB Approved (DRC)" },
                    { filter: "casetrust-rcma", label: "CaseTrust-RCMA" },
                    { filter: "eco", label: "Eco-Friendly" },
                    { filter: "landed", label: "Landed" },
                    { filter: "commercial", label: "Commercial" },
                  ]},
                  { header: "Your Budget", tooltip: "", buttons: [
                    { filter: "30000", label: "$30,000 - $49,999" },
                    { filter: "50000", label: "$50,000 - $100,000" },
                  ]},
                  { header: "Location", tooltip: "", buttons: [
                    { filter: "location-c", label: "Central" },
                    { filter: "location-e", label: "East" },
                    { filter: "location-ne", label: "NE" },
                    { filter: "location-n", label: "North" },
                    { filter: "location-w", label: "West" },
                  ]},
                  { header: "Promos", tooltip: "", buttons: [
                    { filter: "exclusive_deal", label: "HomeMatch Exclusive Promos" },
                    { filter: "deal", label: "Promos Available" },
                  ]},
                ].map((cat) => (
                  <div key={cat.header} className="crl-filter-cat-div">
                    <div className="crl-filter-cat-wrapper">
                      <div className="crl-filter-header-text">{cat.header}</div>
                      <img src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/637230747700abb2b0f0d322_down%20arrow.svg" loading="lazy" alt="" className="crl-filter-icon" />
                    </div>
                    <div className="crl-filter-group-wrapper">
                      <div className="crl-filter-cluster-wrapper">
                        {cat.buttons.map((btn) => (
                          <a key={btn.filter} wized="crl-filterbutton" filter={btn.filter} href="#" className="crl-filter-button w-inline-block">
                            <img src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/669509807d1fbb5421855105_white-cross.svg" loading="lazy" alt="" className="crl-filter-close-icon" />
                            <div>{btn.label}</div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </form>
            </div>
          </div>
          <div className="filter-controls-wrapper">
            <a href="#" wized="crl-mobile-filter-menu-firmcount" className="d-button company-btn profile crl-version crl-filter-count-button w-button">Show X Firms</a>
          </div>
        </div>

        {/* Right Content */}
        <div className="crl-right-div">
          {/* Safest-Smartest banner */}
          <a href="/safest-smartest-assurance?utm_source=Website&utm_medium=crl" target="_blank" className="crl-lookout-banner-div w-inline-block">
            <img src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/662bc5e5c8839654a3f0c15a_s-s%20sticker.avif" loading="lazy" alt="Safest and smartest renovation platform in Singapore" className="accreditation-ss crl-version" />
            <div className="crl-lookout-banner-explainer-wrapper">
              <div className="d-p crl-banner">
                <span className="text-span-77">Safest-Smartest Assurance:</span> You&apos;ll be covered with Contract Checks, 100% Deposit Protection, Dispute Resolution <span className="text-span-79">&amp; more</span>
              </div>
            </div>
          </a>

          {/* Individually Screened banner */}
          <a href="/safest-smartest-assurance?utm_source=Website&utm_medium=crl#s-s-pmatching" target="_blank" className="crl-lookout-banner-div indv w-inline-block">
            <div className="firm-indv-div company-profile-list-wrapper crl-version blurb">
              <img src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/690301c14aae989b71242919_Individual%20Matching.png" loading="lazy" alt="" className="firm-indv-icons crllist crl-version blurb" />
              <div wized="firm-indvicons-wrapper" className="firm-indv-icons-wrapper crllist last blurb">
                <img loading="lazy" src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/66912e63c6023a7f5b2c04f2_plus.svg" alt="" className="firm-indv-icons crllist" />
              </div>
            </div>
            <div className="crl-lookout-banner-explainer-wrapper">
              <div className="d-p crl-banner">
                <span className="text-span-78">Individually Screened:</span> Get Matched with a specific individual rather than just firms to avoid wasting time. <span className="text-span-80">Learn more</span>
              </div>
            </div>
          </a>

          {/* Companies section */}
          <div className="crl-companies-div crl-version">
            <section className="companies crl-version">
              <div id="filter-count" className="filter-count crl-version">
                <div wized="crl-firmcount" className="d-p filter-results">Loading...</div>
                <div className="d-p filter-results placeholder">CaseTrust Renovators Found</div>
              </div>

              {/* Loader */}
              <div wized-loader="GET_CRL" className="crl-loader-div">
                <img src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/637609d594e24186427b8b83_HomeMatch-Load.gif" loading="lazy" alt="" className="crl-loader" />
              </div>

              {/* Firm cards */}
              <div className="crl-company-div">
                <div className="crl-company-wrapper">
                  <div wized-cloak="true" wized="crl-firm-item" className="crl-company-item-div">
                    <div className="crl-company-item-wrapper">
                      <div className="crl-company-item-first-wrapper">
                        <div className="crl-company-logo-wrapper">
                          <img src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/689da894c001553dad21c01f_firm-logo-loader.svg" loading="lazy" wized="crl-company-logo" alt="interior design company logo" className="crl-company-logo" />
                        </div>
                        <div className="crl-company-hero-wrapper">
                          <img src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/689da89408abfa786dfc9b7e_firm-hero-loader.svg" loading="lazy" wized="crl-company-hero" alt="interior design company featured project photo" className="crl-company-hero" />
                        </div>
                      </div>
                      <div className="crl-company-item-second-wrapper">
                        <div className="crl-company-item-secondinner-wrapper">
                          <div className="crl-company-item-mid-wrapper">
                            <a wized="crl-company-name" href="#" target="_blank" className="d-h company-details-name crl-version">Firm Name</a>
                            <div className="crl-company-grid-wrapper">
                              <a wized="crl-company-sswrapper" href="/safest-smartest-assurance?utm_source=Website&utm_medium=CRL" target="_blank" className="accreditation-ss-link w-inline-block">
                                <img src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/662bc5936e4583d19115f3a0_s-s%20long.png" loading="lazy" alt="" className="accreditation-ss" />
                              </a>
                              <div className="company-main-info-review-wrapper crlist">
                                <a wized="crl-company-reviewrating" href="#" target="_blank" className="crl-review-rating crlist crl-version">4.8★</a>
                                <a wized="crl-company-reviewcount" href="#" target="_blank" className="crl-review-text crlist">100+ Reviews</a>
                              </div>
                            </div>
                            <div className="crl-location-wrapper uen">
                              <a href="#" target="_blank" className="d-p company-details-location crl-version uen nil"><strong>CaseTrust Entity UEN:</strong></a>
                              <a href="#" wized="crl-company-uen" target="_blank" className="d-p company-details-location crl-version uen">202214299D</a>
                            </div>
                            <div className="crl-location-wrapper">
                              <img loading="lazy" src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/644e22b77cd2c302f54621ee_location.svg" alt="" className="profile-location-icon crl-ver" />
                              <a href="#" wized="crl-company-location" target="_blank" className="d-p company-details-location crl-version">Location</a>
                            </div>
                            <div className="company-btn-social-wrapper crl-version">
                              <a href="#" target="_blank" className="w-inline-block"><img wized="crl-company-web" loading="lazy" alt="" src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/637611d2fdd8823d7bc2cdf3_web.svg" className="crl-social-icons" /></a>
                              <a href="#" target="_blank" className="w-inline-block"><img wized="crl-company-ig" loading="lazy" alt="" src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/637611d3c0c96d84fbc1b2dd_insta.svg" className="crl-social-icons" /></a>
                              <a href="#" target="_blank" className="w-inline-block"><img wized="crl-company-fb" loading="lazy" alt="" src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/637611d211bb673eab8dc690_fb.svg" className="crl-social-icons" /></a>
                              <a href="#" target="_blank" className="w-inline-block"><img wized="crl-company-xhs" loading="lazy" alt="" src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/683e74fef0809f66b6186f37_xhs%20logo.svg" className="crl-social-icons" /></a>
                            </div>
                          </div>
                          <div className="crl-company-item-right-wrapper">
                            <div className="crl-company-item-right-top">
                              <a wized="crl-company-indvbadge" href="/safest-smartest-assurance?utm_source=Website&utm_medium=firm-profile#s-s-pmatching" target="_blank" className="firm-indv-div company-profile-list-wrapper crl-version w-inline-block">
                                <img wized="crl-company-indv1" loading="lazy" alt="" src="https://cdn.prod.website-files.com/plugins/Basic/assets/placeholder.60f9b1840c.svg" className="firm-indv-icons crllist crl-version" />
                                <img wized="crl-company-indv2" loading="lazy" alt="" src="https://cdn.prod.website-files.com/plugins/Basic/assets/placeholder.60f9b1840c.svg" className="firm-indv-icons crllist crl-version" />
                                <div wized="firm-indvicons-wrapper" className="firm-indv-icons-wrapper crllist last">
                                  <img loading="lazy" src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/66912e63c6023a7f5b2c04f2_plus.svg" alt="" className="firm-indv-icons crllist" />
                                </div>
                                <div className="indv-screened-wrapper">
                                  <img loading="lazy" src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/667d5dcf3343105a9cd759a4_blue%20tick.svg" alt="" className="indv-screened-icon crllist" />
                                  <div className="indv-screened-text crllist">Individually Screened</div>
                                </div>
                              </a>
                              <a wized="crl-company-whychoosebadge" href="#" target="_blank" className="crl-callout-wrapper crl-version w-inline-block">
                                <img src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/68d0cc54ddc161bec301771d_question-mark.svg" loading="lazy" alt="" className="crl-deal-icon circle" />
                                <div className="indv-screened-text crllist">Why Choose This Firm?</div>
                              </a>
                              <div wized="crl-company-promo" className="crl-callout-wrapper crl-version">
                                <img src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/669134cbe1d0b1dd6fa81b03_deal.svg" loading="lazy" alt="" className="crl-deal-icon" />
                                <div className="indv-screened-text crllist">HomeMatch Promo</div>
                              </div>
                            </div>
                            <div className="crl-company-item-right-btm"></div>
                            <div wized="crl-notvetted-text" className="crl-notvetted-text">
                              This firm is listed because it is <a href="/reasons-advantage-work-with-casetrust-interior-firms-contractors" target="_blank"><strong>CaseTrust-accredited</strong></a>, but it has either not been recently vetted or onboarded by HomeMatch.
                            </div>
                          </div>
                          <div className="crl-company-cta-div">
                            <div className="crl-company-cta-wrapper">
                              <a href="#" wized="crl-company-enquire" className="d-button company-btn profile crl-version w-button">Shortlist or Compare</a>
                              <a href="#" wized="crl-company-profilelink" target="_blank" className="d-button company-btn profile crl-version secondary w-button">View Profile</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <a wized="crl-loadmore" href="#" className="ad-bu w-button">More Firms</a>
          </div>

          {/* CTA Block */}
          <aside id="crl-help" className="crl-cta-div blog crl crl-version">
            <div className="crl-cta-copy post">
              <h2 className="d-h crl-cta-copy blog">15 mins<span className="text-span-23"> </span>with us saves you<span className="text-span-23"> </span>15 hours</h2>
              <div className="d-p crl crl-cta-copy blog">
                <span><strong>Avoid wasting time with renovators who can&apos;t meet your needs. </strong></span>We&apos;ll match you with Trusted &amp; Suitable Renovators.<br />
              </div>
              <div className="crl-cta-button-div">
                <div className="crl-cta-button-wrapper">
                  <a href="https://get.homematch.sg/?utm_source=Website&utm_medium=crl-btm&utm_content=CaseTrust" className="d-button crl-cta actual w-button">Match Me!</a>
                </div>
                <div className="d-p crl crl-cta-copy sub">It&apos;s Free!<br /></div>
              </div>
              <div>
                <div className="crl-cta-ss-div">
                  <div className="crl-cta-ss-header">
                    <a href="/safest-smartest" className="crl-cta-ss-link w-inline-block">
                      <img src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/662bc5936e4583d19115f3a0_s-s%20long.png" loading="lazy" alt="" className="crl-cta-ss-icon" />
                    </a>
                    <div>
                      <div className="crl-cta-ss-header-text">Absolute most <span className="text-span-46"> stringent</span> screening &amp; <span className="text-span-47">comprehensive</span> guarantees</div>
                    </div>
                  </div>
                  <div className="s-s-mechanism-wrapper">
                    {[
                      ["crl-cta","CaseTrust-Accredited Only"],["find","4+ Stars Reviews Only"],["find","Individual Screening"],
                      ["bef","100% Deposit Guarantee"],["bef","Service Warranty"],["bef","Standard CaseTrust Contract"],
                      ["bef","No Hidden Cost"],["bef","Progressive Payments"],["bef","Fairer Prices"],
                      ["dur","Contract Review"],["dur","1-1 Guidance"],["dur","Precision Matching"],
                      ["aft","Dispute Resolution"],["aft","Feedback Management"],["aft","Withholding Payment"],
                    ].map(([cls, label]) => (
                      <a key={label} href="/safest-smartest" target="_blank" className={`tags s-s ${cls} w-button`}>{label}</a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Scrollable Google Reviews */}
          <div className="crl-reviews-div">
            <div className="company-project-preview-wrapper reviews home">
              {[
                { href: "https://share.google/NgghvmofAzBxqPAFz", pic: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/68ece77cd089dd0d83dd7374_G-H.png", name: "Hwee Ming Ong", text: "I used <strong>Qanvast and HomeMatch</strong> for my home reno journey. I would say <strong>HomeMatch puts in more effort and thoughts</strong> in the curation of the IDs and really ask more leading questions to prevent homeowners and IDs from wasting one another's time." },
                { href: "https://share.google/VEPaoWxbiIyvAs1mx", pic: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/6901e084ad489c7895683957_unnamed.png", name: "Anzee Lee", text: "<strong>Free platform yet make me feel personal</strong>. I was matched to 5 IDs the next day after a call from Bronson to enquire my requirements." },
                { href: "https://share.google/7XiABFaHCbyNQtD2i", pic: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/68902cd7a0a39514f904bc7d_g-huishan.png", name: "gabrielle tan huishan", text: "I was <strong>recommended by a friend</strong> to try out homematch. I really appreciate the help that I got." },
                { href: "https://maps.app.goo.gl/Yig8LNrk2vETLpym7", pic: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/68806668021ff7f6e7e73d0b_g-jenniferlee.png", name: "Jennifer Lee", text: "<strong>HomeMatch removed the stress of me having to randomly select renovation firms from the internet</strong>, and gave me peace of mind." },
                { href: "https://maps.app.goo.gl/RgDd3GKV7VEHsZD5A", pic: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/682b49ef6f70a7c38d73b8cd_g-KP.png", name: "K P", text: "I really do recommend HomeMatch if you're planning renovation for the first time. <strong>Better than reading forums or google results</strong> and getting confused." },
                { href: "https://maps.app.goo.gl/3bwuQLGtjiDZJLwQA", pic: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/67d8f6a7289e288d2f70de8d_g-conniehon.png", name: "Connie Hon", text: "<strong>Nobody around us could recommend a good ID</strong> - it was almost like they didn't exist - so we started our search on Google. HomeMatch came across as a no brainer for us to try." },
              ].map((r) => (
                <div key={r.name} className="firm-proj-div newsletter-form new firm preview">
                  <a href={r.href} target="_blank" className="link-block preview reviews first w-inline-block">
                    <img src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/65dd79221c85fee7c34d8a9d_google_g_icon_download.avif" loading="lazy" alt="" className="company-review-platform-logo google absolute" />
                    <div className="company-review-header-wrapper">
                      <img src={r.pic} loading="lazy" alt="" height="Auto" className="company-reviewer-pic" />
                      <div className="company-review-text"><strong>{r.name}</strong></div>
                    </div>
                    <div className="company-review-details-wrapper">
                      <img src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/65dd7876afb490c300aef6c6_Google%20Stars.svg" loading="lazy" alt="" className="company-review-score" />
                    </div>
                    <div className="company-review-text text" dangerouslySetInnerHTML={{ __html: r.text }} />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="home-faq-wrapper crl-version">
            <h2 className="d-h3 faq crl-version">Frequently Asked Questions:</h2>
            {[
              {
                q: "What Additional Protections Do I Get When Engaging a CaseTrust-accredited Interior Designer or Contractor Via HomeMatch?",
                a: `HomeMatch is the Official Marketing Partner of CaseTrust and exclusively onboards CaseTrust-accredited renovators.\n\n3 Reasons why it is better to enquire via HomeMatch:\n\n1. Additional Layer of Screening & Guarantees: We offer the Safest-Smartest Assurance, an additional layer of vetting that ensures all renovators have at least 4-star reviews on neutral platforms like Facebook and Google.\n\n2. Avoid Wasting Time: Our proprietary HomeMatcher tool (powered by 500+ data points) identifies the most suitable matches based on your budget, aesthetics, lifestyle, working style, property type, renovation timeline, and more.\n\n3. 1-1 Guidance: You will be paired up with one of our team members. Our service is 100% free for homeowners.`,
                rich: true,
              },
              {
                q: "Why Should You Work with CaseTrust-Accredited Interior Designers or Contractors?",
                a: "You'll be protected before, during, and after renovation:\n\n1. 100% Deposit Guarantee — via performance bond underwritten by NTUC Income\n2. Min. 12 Months Warranty — defects rectified at firm's cost\n3. Withholding Payment — final payment only after rectifications\n4. Transparent Pricing — itemised quotations with no hidden costs\n5. Progressive Payments — pay in milestones, not upfront\n6. Feedback Management & Mediation — systems in place for any disputes",
              },
              { q: "What Is the CaseTrust Accreditation for Renovation Businesses About?", a: "The CaseTrust accreditation for Renovation Businesses scheme was launched in 2004 to raise industry standards by requiring accredited interior design firms and contractors to adopt fair consumer practices." },
              { q: "What Does It Mean for an Interior Designer or Contractor to Be CaseTrust-Accredited?", a: "A CaseTrust-accredited interior designer or contractor that displays the CaseTrust mark underwent rigorous assessment which verified that it has good business practices and follow fair consumer policies. Areas of assessment include the firm's policies, practices & systems, and professionalism of their staff." },
              { q: "What If I Don't Work with a CaseTrust-Accredited Interior Designer or Contractor?", a: "According to the Consumers Association of Singapore (CASE), the renovation industry consistently ranks among the top 10 with the highest number of complaints. If you choose to work with a non-CaseTrust accredited interior designer or contractor, it is crucial to conduct thorough due diligence." },
              { q: "How Do I Find CaseTrust-Accredited Interior Designers or Contractors?", a: "While CaseTrust provides a list of accredited businesses, you can also explore HomeMatch's List of CaseTrust Interior Designers & Contractors, where you can easily view firm profiles, past projects, customer reviews, and receive personalised recommendations." },
              { q: "How Do I Check If a Renovation Company Is CaseTrust-Accredited?", a: "Look for the CaseTrust logo or cross-check via CaseTrust's Directory. On HomeMatch's List of CaseTrust Interior Designers & Contractors, all renovation firms are CaseTrust-accredited by default, so homeowners don't need to double-check." },
              { q: "Are There Reviews of CaseTrust Interior Designers or Contractors in Singapore?", a: "Yes. You can use HomeMatch's List of CaseTrust Interior Designers & Contractors to browse the profiles and reviews of CaseTrust-accredited renovators. To ensure reviews are genuine, they are compiled from neutral sources like Google and Facebook." },
              { q: "Are CaseTrust Interior Designers and Contractors Better than Non-Accredited Ones?", a: "\"Better\" is subjective, and it wouldn't be fair to assume that all non-accredited renovators are bad; many do good work. What CaseTrust offers is a shortcut: it helps homeowners quickly identify firms that have been rigorously assessed and are committed to fair consumer practices." },
              { q: "What Are Common Renovation Scams in Singapore and How Can CaseTrust Protect Me?", a: "Some of the most common renovation scams in Singapore include hidden costs, renovators disappearing after collecting deposits, and projects left incomplete. By choosing a CaseTrust-accredited interior designer or contractor, you'll be safeguarded with a 100% deposit guarantee, a minimum 12-month workmanship warranty, transparent contracts, and access to mediation support through CASE if disputes arise." },
            ].map((faq, i, arr) => (
              <div key={i} className={`faqdiv home-faq ${i === 0 ? "top" : i === arr.length - 1 ? "btm" : ""} crl-version`}>
                <div className="faqquestionwrapper home-faq">
                  <h3 className="d-p home-faq qn crl-version">{faq.q}</h3>
                  <img loading="lazy" alt="" src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/637230747700abb2b0f0d322_down%20arrow.svg" className="faqicon" />
                </div>
                <div className="faqanswerwrapper crl-version">
                  <p className="d-p home-faq ans crl-version" style={{ whiteSpace: "pre-line" }}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>

          {/* SEO Content */}
          <div id="firm-fa-faq" className="company-faq-div blog outside crl-version">
            <div className="w-richtext">
              <h2><strong>Finding CaseTrust-Accredited Interior Designers &amp; Contractors?</strong></h2>
              <p>HomeMatch makes it simple to search for any <Link href="/reasons-advantage-work-with-casetrust-interior-firms-contractors">CaseTrust-accredited renovator</Link>. As the Official Marketing Partner of CaseTrust, our listings are updated weekly.</p>
              <h3><strong>How to Use:</strong></h3>
              <p>On our platform, you can compare CaseTrust renovators side by side — view their profiles, portfolios, and reviews all in one place. Apply filters to quickly narrow down firms that fit your requirements.</p>
              <h3><strong>Why Enquire via HomeMatch:</strong></h3>
              <p>If you enquire with an eligible CaseTrust interior firm via HomeMatch, you&apos;ll also enjoy the complimentary <a href="/safest-smartest-assurance?utm_source=Website&utm_medium=crl-footer" target="_blank">Safest-Smartest Assurance</a>, which includes contract checks, 100% deposit protection, individual screening, and precision matching.</p>
              <h3><strong>Pro Tip (Get Matched!):</strong></h3>
              <p>Not sure who to choose or just want a shortcut? Click on the &quot;<a href="https://get.homematch.sg/?utm_source=Website&utm_medium=CRL-footer">Recommend Me</a>&quot; button and let us do the work.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
