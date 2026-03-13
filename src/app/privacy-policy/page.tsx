import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | HomeMatch",
  description:
    "Looking to Renovate? HomeMatch will match you with Renovators based on your unique needs w/ 100% Deposit Guarantee, Service Warranty, Price Transparency, Escrow. It's Free! We're the official marketing partner of CaseTrust.",
  openGraph: { title: "Privacy Policy", type: "website" },
  alternates: { canonical: "https://www.homematch.sg/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="d-section">
      <div className="d-container blog w-container">
        <h3 className="h3-blog">
          <strong className="bold-text-25">Gathering of Personal Data<br /></strong>
        </h3>
        <p className="p-blog">
          You may interact with our website in ways that requires us to gather personal data{" "}
          <em>(e.g. requesting to be matched with Renovators, contacting us, subscribing to our newsletter etc.)</em>.
          {" "}In each case, we only collect and use personal data we deem necessary or appropriate to fulfil your request.
          We will not disclose or misuse your data without consent. When requesting to be matched with Renovators,
          we will only disclose your personal data to the Renovators upon receiving your consent.
        </p>

        <h3 className="h3-blog">
          <strong className="bold-text-26">Use of Cookies<br /></strong>
        </h3>
        <p className="p-blog">
          We use cookies and similar tracking technologies on our website and when providing our services.
          We track your behaviours on our site{" "}
          <em>(e.g. clicks, duration of use, general page behaviours etc.) </em>
          to improve your user experience and learn how users interact with our website.
          The data we collect are aggregated and are NOT directly traceable to you, any single individual or group.
          Learn how to disable cookies{" "}
          <a href="https://www.cookiesandyou.com/disable-cookies/" target="_blank" rel="noopener noreferrer">here</a>.
          <br />
        </p>

        <h3 className="h3-blog">
          <strong className="bold-text-27">Recommendations Or Information Provided By The Platform<br /></strong>
        </h3>
        <p className="p-blog">
          Any recommendations or information provided on the platform are catered for mass consumption and are not
          tailored towards your specific needs. It is important for you and also your own due diligence to assess if
          any recommendations or information are applicable. If you decide to take up any recommendations or information
          provided, HomeMatch assumes no liability for any damages (whether direct or speculative) of any kind that may
          arise out of it.<br />
        </p>

        <h3 className="h3-blog">
          <strong className="bold-text-28">Third-Party Links<br /></strong>
        </h3>
        <p className="p-blog">
          We are not responsible for the privacy practices of any third-party links on our website unless otherwise
          stated.<br />
        </p>

        <p className="p-blog small-details centered">
          <em>
            This Privacy Policy shall be governed by and construed in accordance with the‍
            Personal Data Protection Act 2012 (PDPA) of The Republic of Singapore.
          </em>
          <br />
        </p>
      </div>
      <div className="spacer-section"></div>
    </div>
  );
}
