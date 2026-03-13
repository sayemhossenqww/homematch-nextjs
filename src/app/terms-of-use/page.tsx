import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | HomeMatch",
  description:
    "Looking to Renovate? HomeMatch will match you with Renovators based on your unique needs w/ 100% Deposit Guarantee, Service Warranty, Price Transparency, Escrow. It's Free! We're the official marketing partner of CaseTrust.",
  openGraph: { title: "Terms of Use", type: "website" },
  alternates: { canonical: "https://www.homematch.sg/terms-of-use" },
};

export default function TermsOfUsePage() {
  return (
    <div className="d-section">
      <div className="d-container blog w-container">
        <p className="p-blog">
          To ensure that your experience with us is safe and the decisions are well-informed, please kindly read these
          terms carefully before using the platform as they represent a binding legal agreement between us. When you
          access the Website, you are agreeing to abide by this Agreement. If you do not consent to these terms and
          conditions, kindly refrain from using the Website or any of the provided Information or Services.
          <br /><br />
          The nature of our business may require us to update our terms of use from time to time without notice,
          therefore, we encourage you to check for any updates or amendments. Thank you for your understanding.
        </p>
      </div>

      <div className="d-container blog w-container">
        <h3 className="h3-blog">
          <strong className="bold-text-13">Intellectual Property Rights<br /></strong>
        </h3>
        <p className="p-blog">
          Every single asset (any form of visuals, programming code, information) platform is a property of HomeMatch.
          You agree not to copy, reproduce, modify, extract or use any assets without our written authorisation.
          However, you may display a reasonable amount of content for the purposes of making references to HomeMatch;
          in doing you so, you are required to (1) refrain from making any modifications, (2) provide credit,
          attribution, and backlinks to HomeMatch.​ Any third party mentioned or represented in any sort on our platform
          belongs to their respective owners who may or may not be endorsed by, or affiliated with HomeMatch.
        </p>

        <h3 className="h3-blog">
          <strong>Receiving Matches On The Platform<br /></strong>
        </h3>
        <p className="p-blog">
          The matching services on the platform are provided for free to Homeowners and considered to be provided out
          of goodwill, therefore (1) HomeMatch will not be considered to be involved in any activity conducted beyond
          matching you with Renovators (2) Although we will make reasonable efforts to ensure that all information is
          updated and accurate, we will not be liable to you for any damages, disputes, misrepresentation, guarantees,
          and quality of services provided by any third parties including Renovators.<br />
          ‍<br />
          You should conduct any necessary checks before proceeding with any transaction with any third parties
          displayed or recommended by the platform.<br />
        </p>

        <h3 className="h3-blog">
          <strong>Recommendations Or Information Provided By The Platform<br /></strong>
        </h3>
        <p className="p-blog">
          Any recommendations or information provided on the platform are catered for mass consumption and are not
          tailored towards your specific needs. It is important for you and also your own due diligence to assess if
          any recommendations or information are applicable. If you decide to take up any recommendations or information
          provided, HomeMatch assumes no liability for any damages (whether direct or speculative) of any kind that may
          arise out of it.<br />
        </p>

        <h2 className="h3-blog">
          <strong>Disclaimer Of Liabilities<br /></strong>
        </h2>
        <p className="p-blog">
          Your usage of the platform is at your sole risk hence, you agree to not hold HomeMatch or its owners and
          employees for any possible claims arising out of, or in connection with your use of the platform.​<br />
        </p>
      </div>

      <div className="spacer-section"></div>
    </div>
  );
}
