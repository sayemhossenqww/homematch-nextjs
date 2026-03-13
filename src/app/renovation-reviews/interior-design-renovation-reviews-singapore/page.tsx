import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Interior Design & Renovation Reviews in Singapore | HomeMatch",
  description:
    "Largest database of 30,000+ interior design and renovation contractor reviews in Singapore. Search, read, and filter reviews to compare and find the right renovator in Singapore.",
  openGraph: {
    title: "Interior Design & Renovation Reviews in Singapore | HomeMatch",
    description:
      "Largest database of 30,000+ interior design and renovation contractor reviews in Singapore. Search, read, and filter reviews to compare and find the right renovator in Singapore.",
    type: "website",
  },
  alternates: {
    canonical:
      "https://www.homematch.sg/renovation-reviews/interior-design-renovation-reviews-singapore",
  },
};

export default function RenovationReviewsPage() {
  return (
    <>
      <style>{`
        [wized-cloak] { display: none; }
        [wized-loader] { display: flex; }
        .crl-filter-button { background-color: transparent; color: #055161; transition: background-color .2s ease, color .2s ease; }
        .crl-filter-button.is-active { background-color: #42C2FB; color: #fff; }
        @media (hover: hover) and (pointer: fine) {
          .crl-filter-button:hover { background-color: #42C2FB; color: #fff; }
        }
        .crl-filter-innerwrapper, .link-block.preview.reviews, .crl-search-suggestion-wrapper .rr-search-blocks-div { overflow-y: scroll; overflow-x: hidden; }
        .crl-filter-innerwrapper::-webkit-scrollbar, .link-block.preview.reviews::-webkit-scrollbar, .rr-search-blocks-div::-webkit-scrollbar { width: 7px; }
        .crl-filter-innerwrapper::-webkit-scrollbar-thumb, .link-block.preview.reviews::-webkit-scrollbar-thumb, .rr-search-blocks-div::-webkit-scrollbar-thumb { background: #BBE6EF; border-radius: 10px; }
        .company-project-preview-wrapper, .review-featured-menu-wrapper, .rr-firm-profile-right-wrapper-btm { overflow-x: scroll; overflow-y: hidden; }
        .company-project-preview-wrapper::-webkit-scrollbar, .review-featured-menu-wrapper::-webkit-scrollbar, .rr-firm-profile-right-wrapper-btm::-webkit-scrollbar { height: 7px; }
        .company-project-preview-wrapper::-webkit-scrollbar-thumb, .review-featured-menu-wrapper::-webkit-scrollbar-thumb, .rr-firm-profile-right-wrapper-btm::-webkit-scrollbar-thumb { background: #BBE6EF; border-radius: 10px; }
        .crl-precision-headline { white-space: normal; overflow-wrap: break-word; }
        .companies-menu.crl-version.review { display: none; position: fixed; }
        .rr-qb-highlight { background: #ffce45; padding: 0 2px; border-radius: 3px; }
        .rr-keyword-highlight { background: #c0e6f0; padding: 0 2px; border-radius: 3px; }
        .rr-link-copied { opacity: 0; pointer-events: none; transition: opacity 1000ms ease; }
        .rr-link-copied.is-visible { opacity: 1; }
      `}</style>

      {/* Wized scripts for dynamic data */}
      <Script async src="https://embed.wized.com/Z91WeJ4HTnL6Hn6DFRi3.js" />
      <Script async type="module" data-wized-id="Z91WeJ4HTnL6Hn6DFRi3" src="https://embed.wized.com/v2/index.js" />
      {/* Finsweet CMS Sort */}
      <Script async src="https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmssort@1/cmssort.js" />

      {/* Precision Popup */}
      <div className="crl-precision-popup-div">
        <div className="crl-precision-popup-wrapper">
          <div className="crl-precision-headline-wrapper">
            <div className="crl-precision-headline">We&apos;ll find you specific renovators who care about:</div>
            <div className="crl-precision-headline dynamic">{"{{precision}}"}</div>
          </div>
          <div className="crl-precision-desc">We&apos;ve analysed all Facebook and Google reviews about every single renovator, so we know how they are like.</div>
          <a href="#" target="_blank" className="crl-precision-cta w-button">Match Me!</a>
          <a href="#" className="crl-precision-close">X</a>
        </div>
      </div>

      {/* Hero Section */}
      <div className="crl-hero-div review">
        <div className="crl-h1-div review">
          <div className="reviews-count-wrapper">
            <div className="review-count-text bold">30,000+</div>
            <div className="review-count-text">Reviews</div>
          </div>
          <div className="crl-h1-wrapper crl-version reviews">
            <h1 className="crl-h1 crl-version reviews"><strong>Search Renovation Reviews</strong></h1>
            <h2 className="d-p crl crl-version sub-head reviews">
              The &quot;Glassdoor&quot; for interior design &amp; renovation in Singapore. Built for homeowners who don&apos;t want regrets.
            </h2>
            <div className="review-search-section">
              <div className="review-search-wrapper w-form">
                <div className="review-search-form">
                  <div wized="rr-search-button" className="review-search-button no-margin">
                    <img src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/694a26062064265d15b74d91_search%20icon.svg" loading="lazy" width="Auto" alt="" className="review-search-icon" />
                  </div>
                  <div className="review-search">
                    <input className="review-search-input top w-input" wized="rr-search-input" autoFocus maxLength={256} name="name" placeholder="Search person or firm" type="text" id="name" />
                    <div style={{ display: "none" }} className="rr-search-preview-div">
                      <div className="rr-search-suggest-div">
                        <div wized-loader="GET_rr_search" className="crl-loader-div">
                          <img src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/637609d594e24186427b8b83_HomeMatch-Load.gif" loading="lazy" alt="" className="crl-loader" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Illustration */}
        <div className="rr-illustration-div">
          <img src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/69671bed83d4f50d006366e4_82b641f2e0a3016a45e1846c6035f648_Skyline.avif" loading="lazy" alt="" className="rr-ill-skyline" />
          <div className="rr-illulleft-div">
            <img src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/696731db2a86e63d2d8d4009_Leaf.gif" loading="lazy" alt="" className="rr-keaf-d" />
            <img src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/696731dbafeb614a9266b398_Left%20branch%20%2B%20Tiptip.avif" loading="lazy" alt="" className="rr-tiptip" />
            <img src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/696731dba45c9093eb28cdae_Left%20Tree.avif" loading="lazy" alt="" className="rr-lefttree" />
          </div>
          <div className="rr-illulright-div">
            <img src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/696731db225b3551e359e163_Right%20Branch%20%2B%20Toktok.avif" loading="lazy" alt="" className="rr-toktok" />
            <img src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/696731db9c70b3a62dc3d285_Right%20Tree.avif" loading="lazy" alt="" className="rr-righttree" />
          </div>
          <img src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/696731db89250a9676f0caa5_Cloud%201.avif" loading="lazy" alt="" className="rr-cloud-d" />
          <div className="rr-illubtm-div">
            <img src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/696731da3f48d4a7f4570a59_Review%201.avif" loading="lazy" alt="" className="rr-review1" />
            <img src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/696731dbbb0e19503b9870c2_Review%202.avif" loading="lazy" alt="" className="rr-review2" />
            <img src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/696731da2a0b56a73d2511c5_Review%203.avif" loading="lazy" alt="" className="rr-review3" />
          </div>
        </div>
      </div>

      {/* Fixed aside CRL menu */}
      <aside id="crl-menu" className="companies-menu crl-version review">
        <div className="companies-menu-buttons-div review">
          <a href="#topofpage" className="review-search-button no-margin menu w-inline-block">
            <img src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/694def44b657fd7cd43f1f4d_search-icon-blue.svg" loading="lazy" alt="" className="review-search-icon menu" />
          </a>
          <div className="companies-menu-buttons-2nddiv review">
            <a href="https://get.homematch.sg/?utm_source=Website&utm_medium=rr-top" className="companies-menu-button-wrapper crl-version review cta w-inline-block">
              <img loading="lazy" src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/63832640210b95c7a58ca4e2_Get%20Matched.svg" alt="" className="companies-menu-button-icon" />
              <div className="companies-menu-button-text">Recommend Me!</div>
            </a>
          </div>
        </div>
      </aside>

      {/* Main body - Wized powered */}
      <div wized="rr-searchstate" className="crl-body-div review">
        <div className="crl-filter-div">
          <div className="crl-filter-innerwrapper">
            <div className="crl-filter-header-wrapper">
              <div className="filter-icon crl-version header">Filter Reviews By...</div>
              <a wized="rr-clearall" href="#" className="crl-filter-reset-wrapper qb w-inline-block">
                <div className="crl-filter-reset">Clear all</div>
              </a>
            </div>
            {/* QI Filter buttons */}
            {[
              { key: "workmanship", label: "Workmanship" },
              { key: "price_fairness", label: "Price Fairness" },
              { key: "cost_accuracy", label: "Cost Accuracy" },
              { key: "project_management", label: "Project Management" },
              { key: "timeliness", label: "Timeliness" },
              { key: "aesthetic_design", label: "Design Aesthetics" },
              { key: "functional_design", label: "Design Practicality" },
              { key: "professionalism", label: "Professionalism" },
              { key: "communication", label: "Communication" },
              { key: "feedback_handling", label: "Feedback Handling" },
            ].map((qi) => (
              <div key={qi.key} wized="rr-real-filter" qb-filter={qi.key} className="review-gated-qb-button firm-profile">
                <img src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/669509807d1fbb5421855105_white-cross.svg" loading="lazy" alt="" className="crl-filter-close-icon" />
                <div className="review-gated-qb-button-text firm-profile">{qi.label}</div>
                <div className="review-gated-qb-button-count-div firm-profile">
                  <img src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/697082a03a1565da529b7c98_e3350cc7045b908ec64e609357428950_rr-thumbup.svg" loading="lazy" alt="" className="rr-thumbs-icon" />
                  <div count={`${qi.key}_positive`} wized="rr-qb-count" className="review-gated-qb-button-text count">(128)</div>
                </div>
                <div className="review-gated-qb-button-count-div firm-profile">
                  <img src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/697082a022dff0f2529718c2_819b51a84ba5f876104018360bcd3327_rr-thumbdown.svg" loading="lazy" alt="" className="rr-thumbs-icon" />
                  <div count={`${qi.key}_negative`} wized="rr-qb-count" className="review-gated-qb-button-text count">(17)</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="crl-right-div review">
          <div className="rr-firm-profile-div">
            <div className="rr-firm-profile-left-wrapper">
              <div wized="rr-profile-firmdet" className="company-main-info-wrapper">
                <div className="company-main-info-logo-wrapper firm rr">
                  <div className="firm-logo-wrapper">
                    <img alt="" loading="lazy" wized="rr-profile-firmlogo" src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/689da894c001553dad21c01f_firm-logo-loader.svg" className="firm-logo rr" />
                  </div>
                  <h1 wized="rr-profile-firmname" className="d-h company-details-name page rr">Firm Name</h1>
                </div>
                <div className="company-main-info-key-wrapper firm rr">
                  <a href="#" className="link-block-5 w-inline-block">
                    <div className="company-main-info-review-wrapper rr">
                      <div wized="rr-profile-ratingstars" className="crl-review-rating rr">4.9★</div>
                      <div wized="rr-profile-reviewcount" className="crl-review-text rr">100+ Reviews</div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="crl-company-cta-div">
                <div className="crl-company-cta-wrapper rr">
                  <a href="#" wized="rr-profile-shortlistbtn" className="d-button company-btn profile crl-version rr w-button">Shortlist or Compare</a>
                  <a href="#" wized="rr-profile-viewprofile" target="_blank" className="d-button company-btn profile crl-version secondary rr w-button">View Firm&apos;s Profile</a>
                </div>
              </div>
            </div>
          </div>

          {/* Safest-Smartest banner */}
          <a href="/safest-smartest-assurance?utm_source=Website&utm_medium=rr" target="_blank" className="crl-lookout-banner-div w-inline-block">
            <img loading="lazy" alt="Safest and smartest renovation platform in Singapore" src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/662bc5e5c8839654a3f0c15a_s-s%20sticker.avif" className="accreditation-ss crl-version" />
            <div className="crl-lookout-banner-explainer-wrapper">
              <div className="d-p crl-banner">
                <span className="text-span-77">Safest-Smartest Assurance:</span> You&apos;ll be covered with Contract Checks, 100% Deposit Protection, Dispute Resolution <span className="text-span-79">&amp; more</span>
              </div>
            </div>
          </a>

          {/* Reviews section */}
          <div className="rr-searchsort-div">
            <div className="rr-searchsort-wrapper">
              <div className="rr-sort-div">
                <img loading="lazy" src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/697cfc89e953ae3b6e575e59_67fa814823b35f94a71ddf4e1c68c550_sort.svg" alt="" className="crl-search-icon sort" />
                <div wized="rr-sort-current" className="companies-menu-button-text review">Sort: Newest</div>
                <div className="rr-sort-wrapper">
                  <div sort="newest" wized="rr-sort" className="rr-sort-options">Newest</div>
                  <div sort="lowest" wized="rr-sort" className="rr-sort-options">Lowest</div>
                  <div sort="highest" wized="rr-sort" className="rr-sort-options">Highest</div>
                  <div sort="helpful" wized="rr-sort" className="rr-sort-options">Most Helpful</div>
                </div>
              </div>
              <div id="filter-count" className="filter-count crl-version rr">
                <div wized="rr-reviewcount" className="d-p filter-results rr">Loading...</div>
                <div className="d-p filter-results placeholder rr">Reviews Found</div>
              </div>
            </div>
          </div>

          {/* Reviews list */}
          <div className="reviews-section-div">
            <div wized-loader="GET_all_reviews" className="crl-loader-div">
              <img src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/637609d594e24186427b8b83_HomeMatch-Load.gif" loading="lazy" alt="" className="crl-loader" />
            </div>
            <div wized-cloak="true" wized="rr-item" className="reviews-div b">
              <div id="qb-reviewdiv" className="review-firm-detail-wrapper b">
                <img src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/689da894c001553dad21c01f_firm-logo-loader.svg" loading="lazy" wized="rr-firm-logo" alt="interior design company logo" className="crl-company-logo review" />
                <div className="review-firm-detail-inner b">
                  <a wized="rr-firm-name" href="#" className="review-firm-name b">Firm Name</a>
                </div>
              </div>
              <div className="review-details-div">
                <div className="reviewer-div">
                  <div className="reviewer-details-wrapper">
                    <img src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/6765564986675b26158cc0f6_google_s.png" loading="lazy" wized="rr-reviewer-pic" alt="" className="reviewer-pic" />
                    <div className="reviewer-left-wrapper">
                      <a wized="rr-reviewer-name" href="#" className="review-firm-name reviewer">Reviewer Name</a>
                      <div className="review-rating-date-div">
                        <img src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/65dd7876afb490c300aef6c6_Google%20Stars.svg" loading="lazy" wized="rr-rating" alt="" className="review-rating" />
                        <div className="review-elip">•</div>
                        <div wized="rr-date" className="review-date">Nov 2025</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="review-text-div">
                  <div wized="rr-review-headline" className="review-title">Review headline</div>
                  <div wized="rr-review-text-wrapper" className="review-text-wrapper">
                    <div wized="rr-review-text" className="review-text">Review text</div>
                    <div wized="rr-text-end-blur" className="rr-text-end-blur"></div>
                    <a wized="rr-text-readmore-btn" href="#" className="review-text-readmore-btn w-button">Read More</a>
                  </div>
                </div>
              </div>
            </div>
            <a wized-cloak="true" wized="rr-loadmore" href="#" className="ad-bu w-button">View More</a>
          </div>

          {/* FAQ Section */}
          <div className="home-faq-wrapper crl-version">
            <h2 className="d-h3 faq crl-version">Frequently Asked Questions:</h2>
            {[
              {
                q: "Do I need a licensed contractor for HDB renovations?",
                a: "Yes. HDB renovations must be carried out by contractors listed in the HDB Directory of Renovation Contractors (DRC). HomeMatch simplifies this by offering a dedicated directory of HDB-approved interior designers and contractors.",
              },
              {
                q: "Should I meet multiple interior designers or contractors before deciding?",
                a: "We recommend meeting at least 5 renovators. Different professionals have varied design styles, pricing structures, and working approaches, so comparing them helps you choose the best fit for your needs.",
              },
              {
                q: "How do I find reliable interior design reviews in Singapore?",
                a: "You can use HomeMatch to search and filter interior design Singapore reviews from real homeowners. Our database brings together renovation reviews from neutral platforms like Facebook and Google.",
              },
              {
                q: "Can I find reviews for individual people (like the specific interior designer) and not just the company?",
                a: "Yes! One way HomeMatch can help is by allowing you to search reviews for specific interior designers within renovation companies, showing how each designer performs across completed projects using our 16 Quality Indicators.",
              },
              {
                q: "Can I trust the reviews on HomeMatch? How do you verify them?",
                a: "Yes. HomeMatch brings together renovation reviews from neutral platforms like Google and Facebook, while directly submitted reviews are verified with documentation such as signed renovation contracts.",
              },
            ].map((faq, i) => (
              <div key={i} className={`faqdiv home-faq ${i === 0 ? "top" : i === 4 ? "btm" : ""} crl-version`}>
                <div className="faqquestionwrapper home-faq">
                  <h3 className="d-p home-faq qn crl-version">{faq.q}</h3>
                  <img loading="lazy" alt="" src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/637230747700abb2b0f0d322_down%20arrow.svg" className="faqicon" />
                </div>
                <div className="faqanswerwrapper crl-version">
                  <p className="d-p home-faq ans crl-version">{faq.a}</p>
                </div>
              </div>
            ))}
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
                  <a href="https://get.homematch.sg/?utm_source=Website&utm_medium=rr-btm&utm_content=Reviews" className="d-button crl-cta actual w-button">Match Me!</a>
                </div>
                <div className="d-p crl crl-cta-copy sub">It&apos;s Free!<br /></div>
              </div>
            </div>
          </aside>

          {/* SEO Rich Text */}
          <div id="firm-fa-faq" className="company-faq-div blog outside crl-version">
            <div className="blog-rich custom-rich-text w-richtext">
              <h2><strong>Search Interior Design &amp; Renovation Reviews in Singapore</strong></h2>
              <h3><strong>Read Real Reviews of Interior Designers, Renovation Companies — and the People Behind Them</strong></h3>
              <p>Choosing an interior designer or renovator in Singapore isn&apos;t just about picking a company name. It&apos;s about choosing the <strong>right person</strong> to handle your home.</p>
              <p><strong>HomeMatch</strong> is Singapore&apos;s largest renovation review database, with <strong>30,000+ verified reviews</strong> covering interior designers, renovation firms, and individual designers within those firms.</p>
              <h2><strong>What Are Quality Indicators (QI)?</strong></h2>
              <p>HomeMatch analyses renovation reviews across <strong>16 critical factors</strong> that matter most when choosing a interior designer or renovation contractor:</p>
              <ol role="list">
                {["Workmanship", "Budget-Consciousness", "Price Fairness", "Cost Accuracy", "Going \"Extra Mile\"", "Project Management", "Sub-Contractor Management", "Site Attendance", "Timeliness", "Design Aesthetics", "Design Practicality", "After Sales Support", "Professionalism", "Communication", "Feedback Handling", "Safety & Compliance"].map((qi, i) => (
                  <li key={i}>{qi}</li>
                ))}
              </ol>
              <h2><strong>Pro Tip: Let Us Match You With the Right Renovator</strong></h2>
              <p>Not sure where to start? Click <strong>&quot;<a href="https://get.homematch.sg/?utm_source=Website&utm_medium=CRL-footer">Recommend Me</a>&quot;</strong> and let HomeMatch do the heavy lifting.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
