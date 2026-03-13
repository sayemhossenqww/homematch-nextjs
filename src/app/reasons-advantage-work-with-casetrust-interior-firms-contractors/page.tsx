import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CRLCtaBlock from "@/components/CRLCtaBlock";
import FAQAccordion from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "Why Work With CaseTrust-Accredited Interior Designers (IDs) & Contractors | HomeMatch",
  description:
    "Renovating soon? Wondering what it means for an Interior Firm or Renovation Contractor to bear 'CaseTrust' logo? Is it Important to work with CaseTrust-accredited Interior Designers?",
  openGraph: {
    title: "Why Work With CaseTrust-Accredited Interior Designers (IDs) & Contractors",
    description:
      "Renovating soon? Wondering what it means for an Interior Firm or Renovation Contractor to bear 'CaseTrust' logo? Is it Important to work with CaseTrust-accredited Interior Designers?",
    type: "website",
  },
  alternates: {
    canonical:
      "https://www.homematch.sg/reasons-advantage-work-with-casetrust-interior-firms-contractors",
  },
};

const faqs = [
  {
    question: "What is CaseTrust?",
    answer: (
      <p className="d-p faq about">
        <a href="https://www.casetrust.org.sg/accreditation-detail.aspx?id=4" target="_blank" rel="noopener noreferrer">CaseTrust</a> is the accreditation arm of CASE (Consumers Association of Singapore).
      </p>
    ),
  },
  {
    question: "What is the CaseTrust accreditation for Renovation Businesses about?",
    answer: (
      <p className="d-p faq about">
        The CaseTrust accreditation for Renovation Businesses scheme was launched in 2004 to raise industry standards by increasing the adoption of good consumer policies.
      </p>
    ),
  },
  {
    question: "What does it mean for a renovator to be CaseTrust accredited?",
    answer: (
      <p className="d-p faq about">
        A renovation firm that displays the CaseTrust mark underwent <a href="https://www.case.org.sg/casetrust/wp-content/uploads/2024/01/Info-Kit-CaseTrust-Accreditation-for-Renovation-Businesses-1-Jan-2024.pdf" target="_blank" rel="noopener noreferrer">rigorous assessment</a> which verified that it has good business practices and follow fair consumer policies.<br /><br />
        Areas of assessment include the firm&apos;s policies, practices &amp; systems, and professionalism of their staff.
      </p>
    ),
  },
  {
    question: "Why should you work with CaseTrust accredited renovators?",
    answer: (
      <div className="d-p faq about">
        <p>Aside from passing CaseTrust's rigorous checks for good business practices and fair consumer policies, renovators are required to follow a stringent set of criteria that includes the use of the CaseTrust Standard Renovation Contract.</p>
        <p>In a nutshell, you&apos;ll be protected <a href="/reasons-advantage-work-with-casetrust-interior-firms-contractors" target="_blank">before, during, and after renovation</a>:</p>
        <h4>1. <strong>100% Deposit Guarantee:</strong></h4>
        <p>All of your deposits are safeguarded by a performance bond (free for homeowners) in case of closure, winding up and/or liquidation.<br /><br />This is the only guarantee in the industry that secures 100% of your deposits — far surpassing the limited protection of $50,000 typically offered by other third parties and renovation platforms in Singapore.</p>
        <h4><strong>2. Min. 12 months Warranty:</strong></h4>
        <p>You will receive a workmanship warranty for a min. period of 12 months. Defects will be rectified at the renovation firm&apos;s own cost.</p>
        <h4><strong>3. Withholding Payment:</strong></h4>
        <p>You will only make the final payment (pre-agreed in contract) only after rectifications are made. This incentivises your interior designer or contractor to conduct a proper handover after the renovation.</p>
        <h4><strong>4. Transparent Pricing:</strong></h4>
        <p>Your renovation quotation will be itemised. This means that pricing breakdowns and additional costs are stated clearly — reducing the likelihood of hidden costs.</p>
        <h4><strong>5. Progressive Payments:</strong></h4>
        <p>Payments are collected in fair milestones or phases. <em>*Initial deposits are capped at a maximum of 25% of total cost.</em></p>
        <h4><strong>6. Feedback Management &amp; Mediation Services:</strong></h4>
        <p>There are proper systems in place to handle feedback if there are disputes regarding the home renovation project. If you reach a deadlock with your Renovator on a dispute, you can request for mediation at CASE which accredited Renovators are required to attend.</p>
      </div>
    ),
  },
  {
    question: "What if I don't work with a CaseTrust accredited renovator?",
    answer: (
      <p className="d-p faq about">
        According to the <a href="https://www.case.org.sg/wp-content/uploads/2023/02/346_pdf.pdf" target="_blank" rel="noopener noreferrer">Consumers Association of Singapore (CASE)</a>, the renovation industry consistently ranks among the top 10 with the highest number of complaints.<br /><br />
        Without this, you may risk engaging an unreliable firm, encountering unfair contractual terms, and being left unprotected in the event of a renovation mishap.
      </p>
    ),
  },
  {
    question: "How do I find CaseTrust-accredited renovators? How do I check if a renovator is genuinely CaseTrust accredited?",
    answer: (
      <p className="d-p faq about">
        While CaseTrust provides a <a href="https://casetrustapplication.azurewebsites.net/Home/casetrustlist" target="_blank" rel="noopener noreferrer">list of accredited businesses</a>, you can also explore <Link href="/casetrust-renovation-list">HomeMatch&apos;s List of CaseTrust Accredited Renovators</Link>, where you can easily view firm profiles, past projects, customer reviews, and receive personalised recommendations.<br /><br />
        HomeMatch is the Official Marketing Partner of CaseTrust and exclusively onboards CaseTrust-accredited renovators. Beyond that, we offer the <Link href="/safest-smartest-assurance">Safest-Smartest Assurance</Link>, an additional layer of vetting that ensures all renovators have at least 4-star reviews on neutral platforms like Facebook and Google.<br /><br />
        Our service is 100% free for homeowners.
      </p>
    ),
  },
];

export default function ReasonsAdvantagePage() {
  return (
    <div className="d-section">
      <div className="d-container blog w-container">
        {/* CaseTrust badge */}
        <div className="casetrust-wrapper casetrust-page">
          <Image
            src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/638459f294b18f9f97d662df_CaseTrust%20Logo.svg"
            alt="HomeMatch CaseTrust-backed renovators and contractors"
            width={120}
            height={48}
            className="casetrust-logo"
          />
          <p className="d-p d-smallp top-banner casetrust-page">HomeMatch is The Official Marketing Partner of CaseTrust</p>
        </div>

        <h1 className="blog-title">
          <strong className="bold-text-14">Why Work With CaseTrust-Accredited Interior Designers (IDs) &amp; Contractors</strong>
        </h1>

        {/* Hero image */}
        <Image
          src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/67f634b3e732aa82cb5403fc_CaseTrust%20x%20HomeMatch.jpg"
          alt="CaseTrust x HomeMatch"
          width={940}
          height={500}
          className="ct-hm-photo"
          style={{ width: "100%", height: "auto" }}
        />

        {/* Pull quote */}
        <div className="blog-quote-wrapper">
          <div className="blog-quote-line"></div>
          <p>
            <strong className="blog-quote">Working with a CaseTrust-accredited Renovation Contractor is Safer because it protects you before, during, and after renovation</strong>
          </p>
        </div>

        {/* TLDR summary */}
        <h3 className="h2-blog">
          <strong className="h3-blog">The TLDR summary 👇<br /></strong>
        </h3>

        {/* Before */}
        <div className="casetrust-benefits-div">
          <p className="h2-blog">Before Renovation Starts</p>
          <div className="casetrust-benefits-wrapper">
            <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/638476e9759e4dc32567a057_safest.svg" loading="lazy" alt="" width={48} height={48} className="casetrust-benefits-icon" />
            <div className="casetrust-benefits-explainer-wrapper">
              <p className="h3-blog">Rigorous Assessment</p>
              <p className="p-blog">You&apos;re in Safer hands because all accredited Renovators undergo rigorous assessment which verifies that it has good business practices.</p>
            </div>
          </div>
          <div className="casetrust-benefits-wrapper">
            <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/638482ed7cd6cb432aba9c8f_deposit-guarantee.svg" loading="lazy" alt="" width={48} height={48} className="casetrust-benefits-icon" />
            <div className="casetrust-benefits-explainer-wrapper">
              <p className="h3-blog">100% Deposit Guarantee</p>
              <p className="p-blog">All of your deposits are safeguarded by a performance bond (free for homeowners) in case of closure, winding up and/or liquidation.</p>
            </div>
          </div>
          <div className="casetrust-benefits-wrapper">
            <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/6384842cee7073ea3e892a9c_standard-contract_1.svg" loading="lazy" alt="" width={48} height={48} className="casetrust-benefits-icon" />
            <div className="casetrust-benefits-explainer-wrapper">
              <p className="h3-blog">Transparent Pricing</p>
              <p className="p-blog">Prices are itemised and additional costs are stated upfront.</p>
            </div>
          </div>
        </div>

        {/* During */}
        <div className="casetrust-benefits-div">
          <p className="h2-blog">During Renovation</p>
          <div className="casetrust-benefits-wrapper">
            <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/6388a620469799631457c7be_progressive%20payment.svg" loading="lazy" alt="" width={48} height={48} className="casetrust-benefits-icon prog" />
            <div className="casetrust-benefits-explainer-wrapper">
              <p className="h3-blog"><strong className="bold-text-19">Progressive Payments<br /></strong></p>
              <p className="p-blog">To protect your interests, payments are collected in milestones or phases.</p>
            </div>
          </div>
          <div className="casetrust-benefits-wrapper">
            <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/638482ece92421198a5b4a70_Mediation.svg" loading="lazy" alt="" width={48} height={48} className="casetrust-benefits-icon" />
            <div className="casetrust-benefits-explainer-wrapper">
              <p className="h3-blog"><strong>Feedback Management &amp; Mediation Services</strong></p>
              <p className="p-blog">
                There are proper systems in place to handle feedback if there are disputes regarding the home renovation project. If you reach a deadlock with your Renovator on a dispute, you can request for mediation at CASE which accredited Renovators are required to attend.<br /><br />
                ‍<em>*Fees apply. Refer to </em><a href="http://www.case.org.sg" target="_blank" rel="noopener noreferrer"><em>www.case.org.sg</em></a><em> for details.</em><br />
              </p>
            </div>
          </div>
        </div>

        {/* After */}
        <div className="casetrust-benefits-div">
          <p className="h2-blog">After Renovation</p>
          <div className="casetrust-benefits-wrapper">
            <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/638482eddaed0e23d07e1361_Warranty.svg" loading="lazy" alt="" width={48} height={48} className="casetrust-benefits-icon" />
            <div className="casetrust-benefits-explainer-wrapper">
              <p className="h3-blog"><strong className="bold-text-18">Min. 12 months Warranty<br /></strong></p>
              <p className="p-blog">You will receive a workmanship warranty for a min. period of 12 months.</p>
            </div>
          </div>
          <div className="casetrust-benefits-wrapper">
            <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/6388a6201ff473676cbb1c9e_Transparent%20pricing.svg" loading="lazy" alt="" width={48} height={48} className="casetrust-benefits-icon" />
            <div className="casetrust-benefits-explainer-wrapper">
              <p className="h3-blog">Withholding Payment</p>
              <p className="p-blog">You will only make the final payment (pre-agreed in contract) only after rectifications are made.<br /></p>
            </div>
          </div>
        </div>
      </div>

      {/* Nitty gritties */}
      <div className="d-container blog w-container">
        <h3 className="h2-blog"><strong className="h3-blog">The nitty gritties for curious souls 👇<br /></strong></h3>
        <h1 className="h2-blog">What is CaseTrust?</h1>
        <p className="p-blog">
          <a href="https://www.casetrust.org.sg/accreditation-detail.aspx?id=4" target="_blank" rel="noopener noreferrer">CaseTrust</a> is the accreditation arm of CASE (Consumers Association of Singapore). A Renovation Firm that displays the CaseTrust mark would have underwent <a href="https://www.case.org.sg/casetrust/wp-content/uploads/2024/01/Info-Kit-CaseTrust-Accreditation-for-Renovation-Businesses-1-Jan-2024.pdf" target="_blank" rel="noopener noreferrer">rigorous assessment</a> which verified that it has good business practices. Areas of assessment include the firm&apos;s policies, practices &amp; systems, and professionalism of their staff. This also means transparency for Homeowners to prevent hidden costs.
        </p>
      </div>

      {/* Reasons */}
      <div className="d-container blog w-container">
        <h2 className="h2-blog">Reasons to work with CaseTrust-accredited Renovators</h2>

        <h3 className="h3-blog"><strong className="bold-text-16">1. Deposit Guarantees<br /></strong></h3>
        <div className="deposit-guarantee-wrapper">
          <Image
            src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/66a8799947510e617f169f5a_Deposit%20Guarantee%20Sample.avif"
            alt="100% deposit guarantee on your renovation deposits"
            width={940}
            height={500}
            className="deposit-guarantee"
            style={{ width: "100%", height: "auto" }}
          />
          <div className="deposit-guarantee-text">Sample of 100% Deposit Guarantee Performance Bond provided by CaseTrust-RCMA Renovators</div>
        </div>
        <p className="p-blog">
          <strong>All of your deposits will be safeguarded for free.<br /><br /></strong>
          CaseTrust-accredited renovators are required to issue you a deposit performance bond for free.<br /><br />
          The performance bond acts like an insurance to safeguard 100% of your deposit payments against closure, winding up and/or liquidation.<br /><br />
          Every performance bond is underwritten by NTUC Income and issued under your name.<br /><br />
          The bond is free for homeowners. No cost will be transferred to you as there is no incremental cost for the renovator. They only pay a small annual premium to insure their entire business.<br /><br />
          <em>*Renovators must undergo financial assessment to be eligible</em>
        </p>

        <h2 className="h3-blog"><strong className="bold-text-17">2. Clear Dispute Resolution Framework<br /></strong></h2>
        <p className="p-blog">
          Accredited contractors have proper system in place to handle feedback or disputes with homeowners. In the event of disputes that cannot be resolved, they are committed to attend mediation at CASE to reach an amicable settlement with homeowners.<br /><br />
          <a href="https://case.org.sg/complaint_mediation.aspx" target="_blank" rel="noopener noreferrer" className="learn-more">Learn More</a><br />
        </p>

        <h3 className="h3-blog"><strong className="bold-text-20">3. Service Warranty<br /></strong></h3>
        <p className="p-blog">
          The Contractor shall provide to the Homeowners a workmanship warranty (&quot;Warranty&quot;) for a period of 12 months (&quot;Warranty Period&quot;) from the completion date of the Works. In the event of any defects arising from the Works during the Warranty Period, the Contractor shall at its own cost, conduct the necessary rectifications works. The Warranty shall not be valid where (i) The Works have been completed to the satisfaction of the Employer/Owner but the Employer/Owner has not made full payment of the Contract Sum; (ii) The Employer/Owner refuses for whatsoever reason to allow the Contractor to conduct any rectification works; (iii) The Contractor is able to show that the defects are as a result of misuse, wilful act or faulty workmanship by the Employer/Owner.<br />
        </p>

        <h3 className="h3-blog"><strong className="bold-text-21">4. Standard Contract<br /></strong></h3>
        <p className="p-blog">
          Accredited renovation contractors are required to follow a stringent set of criteria that includes the use of the <a href="https://drive.google.com/file/d/1xUaBA4dA9ZrcCjkwiT-G6xWrdQL38OW2/view?usp=sharing" target="_blank" rel="noopener noreferrer">CaseTrust Standard Renovation Contract</a>, which outlines each party&apos;s obligations and specifies work and payment schedules.<br />
        </p>
        <ul role="list" className="list">
          <li className="p-blog">
            <strong className="bold-text-22">Progressive Payments<br /></strong>
            Payments are collected in milestones or phases, for example, a 10% deposit upon contract signing, 30% upon commencement of renovation, 30% upon completion of masonry (wet) work, 25% a week before delivery of carpentry work, and 5% upon completion of renovation. <em>*Initial deposits are capped at a maximum of 20% of total cost</em>
          </li>
          <li className="p-blog">
            <strong className="bold-text-23">Transparent Pricing<br /></strong>
            Renovation Contractors are required to display pricing breakdowns clearly and be upfront about additional costs.
          </li>
        </ul>

        <CRLCtaBlock utmMedium="crl-btm" utmContent="CaseTrust" />

        {/* FAQ section */}
        <div id="firm-fa-faq" className="company-faq-div blog outside crl-version">
          <FAQAccordion
            items={faqs.map((faq) => ({ question: faq.question, answer: faq.answer }))}
            wrapperClass="blog-rich faq w-richtext"
            itemClass="faqdiv home-faq"
            questionClass="faqquestionwrapper home-faq"
            answerClass="faqanswerwrapper"
          />
        </div>
      </div>

      <div className="spacer-section"></div>
    </div>
  );
}
