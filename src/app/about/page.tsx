import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import CRLCtaBlock from "@/components/CRLCtaBlock";
import AboutFAQ from "@/components/about/AboutFAQ";

export const metadata: Metadata = {
  title: "About HomeMatch",
  description:
    "HomeMatch is the manifestation of my renovation wishlist. Here's how we got started and why we're the Safest & Smartest Way to meet Renovators.",
  openGraph: {
    title: "About HomeMatch",
    description:
      "HomeMatch is the manifestation of my renovation wishlist. Here's how we got started and why we're the Safest & Smartest Way to meet Renovators.",
    type: "website",
  },
  twitter: {
    title: "About HomeMatch",
    description:
      "HomeMatch is the manifestation of my renovation wishlist. Here's how we got started and why we're the Safest & Smartest Way to meet Renovators.",
    card: "summary_large_image",
  },
  alternates: { canonical: "https://www.homematch.sg/about" },
};

export default function AboutPage() {
  return (
    <>
      {/* Part 1 — Intro */}
      <div className="d-section">
        <div className="d-container blog about w-container">
          <div className="blog-quote-wrapper">
            <div className="blog-quote-line"></div>
            <p>
              <strong className="blog-quote">HomeMatch was literally my Renovation Wishlist</strong>
            </p>
          </div>
          <h2 className="blog-title sub no-padding">
            <strong className="bold-text-10">
              HomeMatch is what I wished for when I attempted to renovate my room.
              <br />‍<br />
              Searching for the right Renovator was Frustrating 😤
              <br />‍<br />
              Here&apos;s my story...
            </strong>
          </h2>
          <p className="p-blog small-details centered">
            <em className="italic-text">Disclaimer: Yours may seem eerily similar :X</em>
            <br />
          </p>

          {/* Instagram embed */}
          <div className="w-embed w-script">
            <blockquote
              className="instagram-media"
              data-instgrm-permalink="https://www.instagram.com/reel/DIGhL9TzSMH/"
              data-instgrm-version="14"
              style={{ background: "#FFF", border: 0, margin: "1px", maxWidth: 540, minWidth: 326, padding: 0, width: "99.375%" }}
            ></blockquote>
          </div>
        </div>
      </div>

      {/* Part 1 — Reno Anxiety */}
      <div className="d-container blog chapters w-container">
        <h3 className="label blog about">
          <strong>Part 1: </strong>Reno Anxiety<strong><br /></strong>
        </h3>
        <p className="p-blog">
          Sat down infront of my laptop. Didn&apos;t know where to start. <br /><br />
          Frantically googled.<br /><br />
          Started learning that the reno industry is kinda shady.<br /><br />
          <strong>Got Anxious. <br />‍</strong>
          Overwhelmed by the vast number of interior design firms out there making similar claims... How am I supposed to tell who&apos;s good and who&apos;s bad?<br /><br />
          <strong>That&apos;s why HomeMatch has a zero-tolerance policy towards unrealiable and unprofessional renovators! 👇</strong>
        </p>

        <AboutFAQ
          wish="Wish 1"
          title="A simple way to filter out unrealiable renovators"
          answer={
            <p className="d-p faq about">
              It is super easy to find <strong>Trusted </strong>Renovators on HomeMatch.<br />‍<br />
              We&apos;ve developed the{" "}
              <Link href="/safest-smartest-assurance" target="_blank">Safest-Smartest Assurance</Link>{" "}
              — the most <strong>stringent screening</strong> and most <strong>comprehensive guarantees</strong> in the industry.<br /><br />
              Any platform can make similar claims, but... we can back it up!<br /><br />
              <strong>In a nutshell...<br />1. </strong>We only work with <strong>CaseTrust</strong>-Accredited Renovators with at least 4 star reviews<br />‍<br />
              <strong>2.</strong> We painstakingly interview and profile <strong>every single personnel</strong> for full transparency<br />‍<br />
              <strong>3. </strong>You&apos;re <strong>protected before, during, and after renovation</strong> with guarantees like 100% deposit safeguard, warranty, standard CASE contract, progressive payments, transparent pricing, dispute resolution, withholding payment etc.<br /><br />
              Full Details <Link href="/safest-smartest-assurance" target="_blank">here</Link><br />‍<br />
            </p>
          }
        />
      </div>

      {/* Part 2 — Time Wasted */}
      <div className="d-container blog chapters w-container">
        <h3 className="label blog about"><strong>Part 2:</strong> Time Wasted</h3>
        <p className="p-blog">
          Tried 3 different renovation platforms which promised to simplify the search by recommending firms to me. <br /><br />
          <strong>🤨 </strong>After entering my details, <strong>I received 18 calls </strong>from interior firms over the next 4 days.<strong> <br /><br /></strong>
          The renovators I spoke with didn&apos;t understand my needs and/or we couldn&apos;t vibe well. I also <strong>got ghosted</strong> by some of them. <strong><br /><br />Each meeting was 1-3 hours long! 😔<br /></strong>
          Thankfully, they were on Zoom because this was during COVID-19.<br /><strong>‍</strong><br />
          Not all interactions were pleasant or professional. It got me thinking &quot;Why am I being assigned to seemingly random firms?&quot;<br /><br />
          I wasted a lot of time. <strong>I hate wasting time</strong>. Anyone who know me personally would agree 😂<br />‍<br />
          <strong>That&apos;s why HomeMatch was designed with the intention of helping you save time! 👇</strong><br />
        </p>

        <AboutFAQ
          wish="Wish 2"
          title="A simple way to filter out unsuitable renovators"
          answer={
            <p className="d-p faq about">
              It is super easy to find <strong>Suitable </strong>Renovators on HomeMatch.<br /><br />
              We are able to find you the EXACT renovators who meet your EXACT needs.<br /><br />
              Any platform can make similar claims, but... we can back it up!<br /><br />
              <strong>In a nutshell...<br />1. </strong>We start by <strong>understanding </strong>your renovation needs. The whole process is guided :)<br />‍<br />
              <strong>2.</strong> Then... We use the <strong>&apos;HomeMatcher,&apos;</strong> our proprietary matching tool (500+ datapoints<sup>(Apr&apos;24)</sup>) to find you the most suitable renovators based on <strong>your budget, aesthetics, lifestyle, working style, property type, reno timeline and misc. requirements</strong>.<br />‍<br />
              <strong>3. </strong>Our high level of accuracy is possible because we&apos;re the <strong>only and largest database</strong> of over 800+ Individual Profiles<sup>(Apr&apos;24)</sup>. This means that we can match you to the EXACT renovators most suitable for your needs.<br />‍<br />
              Full Details{" "}
              <Link href="/ask/homematchs-surefire-approach-to-finding-you-the-most-suitable-renovator-3-things-we-do" target="_blank">here</Link>
              <br /><br />
            </p>
          }
        />
      </div>

      {/* Part 3 — HomeMatch */}
      <div className="d-container blog chapters w-container">
        <h3 className="label blog about blue-label"><strong>Part 3: HomeMatch</strong></h3>
        <p className="p-blog">
          Eventually, I GAVE UP and decided to shelve my reno plans for the time being.<br /><br />
          But... I also decided to act on my wishlist and built the product of our dreams.
        </p>
        <p className="p-blog">‍<strong>Now, we proudly present to you HomeMatch!<br /></strong></p>

        <div className="founders-icon-wrapper">
          <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/6388932661788c6d8d314fce_1656125292036.jpeg" loading="lazy" alt="Mervin" width={80} height={80} className="founder-icon" />
          <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/6388932661788cd9af314fcd_1569912409296.jpeg" loading="lazy" alt="Pengjin" width={80} height={80} className="founder-icon" />
        </div>
        <p className="p-blog"><strong>- Mervin &amp; Pengjin (Co-Founders)</strong></p>

        <div className="jessica-speech-icon-wrapper about">
          <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/6388932661788c6d8d314fce_1656125292036.jpeg" loading="eager" alt="" width={50} height={50} className="jessica-speech-icon about mervin" />
          <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/6388932661788cd9af314fcd_1569912409296.jpeg" loading="eager" alt="" width={50} height={50} className="jessica-speech-icon about mervin" />
          <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/638895f5a5b6d96e5a69dee3_1620363749218.jpeg" loading="eager" alt="" width={50} height={50} className="jessica-speech-icon about" />
        </div>
        <p className="p-blog about"><strong>Mervin, Pengjin &amp; Kaizer<br />‍</strong>Co-Founders</p>

        <div className="services-div about"></div>

        <CRLCtaBlock utmMedium="crl-btm" />
      </div>
      {/* Instagram embed script */}
      <Script src="https://www.instagram.com/embed.js" strategy="lazyOnload" />
    </>
  );
}
