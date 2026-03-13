"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FAQAccordion from "@/components/FAQAccordion";

const tags = {
  find: [
    { label: "CaseTrust-Accredited Only", anchor: "#s-s-casetrust", cls: "" },
    { label: "4+ Stars Reviews Only", anchor: "#s-s-4stars", cls: "find" },
    { label: "Individual Screening", anchor: "#s-s-individual", cls: "find" },
    { label: "Precision Matching", anchor: "#s-s-pmatching", cls: "find" },
    { label: "1-1 Guidance", anchor: "#s-s-guidance", cls: "find" },
    { label: "100% Deposit Protection", anchor: "#s-s-deposit", cls: "bef" },
    { label: "Contract Checks", anchor: "#s-s-sccontract", cls: "bef" },
    { label: "Standard CaseTrust Contract", anchor: "#s-s-sccontract", cls: "bef" },
    { label: "Fairer Prices", anchor: "#s-s-fairerprices", cls: "bef" },
    { label: "Progressive Payments", anchor: "#s-s-progpayments", cls: "dur" },
    { label: "Feedback Management", anchor: "#s-s-feedbackmgt", cls: "dur" },
    { label: "Service Warranty", anchor: "#s-s-warranty", cls: "aft" },
    { label: "Dispute Resolution", anchor: "#s-s-disputeresol", cls: "aft" },
    { label: "Withholding Payment", anchor: "#s-s-withholding", cls: "aft" },
  ],
  due: [
    { label: "Meet & Compare", anchor: "#s-s-meetcompare", cls: "due" },
    { label: "Set Expectations", anchor: "#s-s-quality", cls: "due" },
  ],
};

function TagCloud({ items }: { items: typeof tags.find }) {
  return (
    <div className="s-s-mechanism-wrapper">
      <Link href="/safest-smartest-assurance#" className="link-block-7 w-inline-block"></Link>
      {items.map((t) => (
        <Link key={t.label} href={`/safest-smartest-assurance${t.anchor}`} className={`tags s-s${t.cls ? " " + t.cls : ""} w-button`}>
          {t.label}
        </Link>
      ))}
    </div>
  );
}

const faqItems = [
  {
    question: "What is HomeMatch?",
    answer: <p className="d-p home-faq ans">HomeMatch is a Renovation Platform / Portal in Singapore — The Safest &amp; Smartest way to meet Renovators.<br /><br />Every renovator you meet on HomeMatch is <Link href="/safest-smartest-assurance#s-s-casetrust" target="_blank">CaseTrust-accredited w/ at least 4 star reviews on neutral platforms like Facebook or Google</Link>. We also individually screen renovators for transparency — you can watch a video about them, look at their reviews and even past projects.<br /><br />This is also why we&apos;re the only platform with the ability to <Link href="/safest-smartest-assurance#s-s-pmatching">&quot;matchmake&quot; you with specific individuals rather than just the firm</Link>. This saves you the headache of trying to find suitable renovators.<br /><br />After the matching, our <Link href="/safest-smartest-assurance" target="_blank">Safest-Smartest Assurance</Link> (a free service) will support you before, during, and after renovation: contract review, 100% deposit protection, warranty, progressive payment, itemised pricing, dispute resolution etc.<br /><br /><a href="https://get.homematch.sg/?utm_source=Website&utm_medium=faq" target="_blank" className="learn-more">Get Matched</a><br /><br />*HomeMatch is the Official Marketing Partner of CaseTrust</p>,
  },
  {
    question: "Is HomeMatch Free?! (Spoiler Alert: Yes😏)",
    answer: <p className="d-p home-faq ans">There&apos;s no catch! Our Matching service is <strong>100% free</strong> for Homeowners. <strong>You don&apos;t have to worry about additional mark-ups</strong> when engaging Renovators you meet from HomeMatch.<br /><br /><strong>Here are the facts... HomeMatch works differently by design:</strong><br />1. We do not charge renovators any listing fees. We only charge renovators a simple upfront advertising fee when a successful match happens, not when you sign anything. As our advertising fees are often lower than the renovator&apos;s own advertising costs, they have <strong>zero incentive to sneak in hidden or &quot;creative&quot; mark-ups</strong> into your quote.<br /><br />2. We <strong>don&apos;t</strong> earn from sales commissions when you sign nor charge any listing fees. This allows us to be completely neutral with <strong>zero incentive to push you towards anyone</strong>. Our only goal is to recommend renovators who genuinely fit your needs.<br /><strong>‍</strong><br />3. Also... all Renovators we recommend are CaseTrust-accredited. So, you&apos;ll receive <strong>itemised quotations to prevent hidden costs</strong></p>,
  },
  {
    question: "How does the Matching work?",
    answer: <p className="d-p home-faq ans">1. We will clarify on your specific renovation needs<br />‍<br />2. Our matching algorithm considers your budget, aesthetics, lifestyle, working style, property type, reno timeline and misc. requirements to find you the most suitable renovators.<br /><br /><strong>An example of how accurate our matching can be:</strong><br />1.<strong> Lifestyle</strong>: Female, Mandarin-speaking renovators who are also pet-owners like yourself.<br />2. <strong>Budget:</strong> Able to work within your tight budget of $45,000.<br />3. <strong>Aesthetics &amp; Property Type:</strong> Proven experience in Scandinavian-style designs and maximising storage.<br />4. <strong>Working Style:</strong> Consultative and non-pushy, matching the traits you value most.<br />5. <strong>Timeline: </strong>Ready to start work the moment you receive your keys.<br />‍<br /><Link href="/safest-smartest-assurance#s-s-pmatching" target="_blank" className="learn-more">Learn More</Link></p>,
  },
  {
    question: "Why not just search on Instagram, or ask a friend for a recommendation?",
    answer: <p className="d-p home-faq ans">You could. But you&apos;d be guessing. <br />‍<br />‍<strong>3 reasons why HomeMatch removes the guesswork:<br /></strong>1. Every renovator we recommend is <Link href="/casetrust-info">CaseTrust-accredited</Link> with at least 4★+ reviews, and part of our <Link href="/safest-smartest-assurance">Safest-Smartest Assurance</Link> — which includes contract review, 100% deposit protection, dispute resolution etc.<br /><br />‍2. Your friend&apos;s renovator might have done a great job but that doesn&apos;t mean they are right for your specific needs. <Link href="/ask/homematchs-surefire-approach-to-finding-you-the-most-suitable-renovator-3-things-we-do" target="_blank">This is why we match you based on your specific needs</Link>.<br />‍<br />3. Instagram and other directories only show you the firm&apos;s best-looking photos. That&apos;s why <Link href="/safest-smartest-assurance#s-s-individual" target="_blank">we match you with the &quot;exact person&quot; not just firms</Link>.<br /><br /><Link href="/homematch-reviews"><strong>We&apos;ve helped 10,000+ homeowners do this right.</strong></Link> You don&apos;t have to figure it out alone.</p>,
  },
  {
    question: "How do you screen the Renovators? Can they just pay to be listed?",
    answer: <p className="d-p home-faq ans">Unlike most platforms, <strong>we do not collect sales commissions or charge a listing fee</strong>. We profit by charging Renovators an upfront advertising fee when a match happens. This enables us to be a neutral party that makes recommendations in your best interest! <br /><br />As the Official Marketing Partner of CaseTrust, we only Match you with Renovators from CaseTrust-accredited firms that underwent rigorous assessment. They are also required to offer service guarantees such as <strong>100% deposit guarantees, min. 12 month warranty, standard contracts (w/ progressive payment and itemised pricings), and mediation if needed</strong>.<br /><br />We&apos;ve made sure that all Renovators are from firms with at least <strong>4+ Stars</strong> on FB or Google.<br /><br />Also, every single individual personnel have been painstakingly interviewed, filmed, and profiled.<br /><br /><Link href="/casetrust-info" target="_blank" className="learn-more">Learn More</Link></p>,
  },
  {
    question: "What is the HomeMatch's Safest-Smartest Assurance?",
    answer: <p className="d-p home-faq ans">The Safest-Smartest Assurance was born out of our commitment to help you avoid renovation nightmares.<br /><br />It is a free service that is designed to protect you before, during, and after the renovation.<br /><br /><strong>Some highlights are:</strong> 100% Deposit Guarantee, Warranty, Standard CASE contract, Fairer Prices, Dispute Resolution etc.<br />‍<br /><Link href="/safest-smartest-assurance" target="_blank" className="learn-more">Learn More</Link></p>,
  },
  {
    question: "What is the Contract Review service?",
    answer: <p className="d-p home-faq ans"><strong>If you were to sign a contract with a Renovator eligible for the Safest-Smartest Assurance, we&apos;ll help you vet through the contract to ensure adherence to good consumer policies. This is a free service.<br /><br />‍</strong>We&apos;ll also give you tailored advice on what to look out for, so you can proactively reduce renovation hiccups. You can also tell us anything. We&apos;ll keep it confidential and advise you in your best interests.</p>,
  },
  {
    question: "Can I meet Contractors instead of Interior Designers?",
    answer: <p className="d-p home-faq ans">Yes you can! You&apos;ll have the option to be Matched with Main Contractors only.</p>,
  },
  {
    question: "Why not just go directly to an interior designer?",
    answer: <p className="d-p home-faq ans">You can. But it often means spending weeks meeting different firms, not knowing if you&apos;re getting the right person.<br /><br /><strong>Why it&apos;s Safer &amp; Smarter to use HomeMatch:</strong><br />1. HomeMatch helps you skip that guesswork. We <Link href="/safest-smartest-assurance#s-s-pmatching" target="_blank">filter across thousands of renovators to match you to the exact person</Link> (who can meet your renovation needs) not just a firm.<br />‍<br />2. You&apos;re also covered by our <Link href="/safest-smartest-assurance"><strong>Safest-Smartest Assurance.</strong></Link> For example, contract checks, 100% deposit protection, warranty, dispute resolution etc.</p>,
  },
  {
    question: "I've heard bad things about renovation platforms... like spam calls, mark-ups, or pay-to-play listings",
    answer: <p className="d-p home-faq ans">Fair concerns! Many platforms do work that way. This was what motivated us to <Link href="/about">start HomeMatch</Link>.<br />‍<br />1. <strong>You won&apos;t get spammed</strong>. We only share your contact info with your consent and only with the renovators we&apos;ve matched you with.<br />‍<br />2. <strong>You don&apos;t have to worry about mark-ups</strong>. Unlike most platforms, we do not collect sales commissions or charge a listing fee. We profit by charging Renovators an upfront advertising fee when a match happens. This enables us to be a neutral party that makes recommendations in your best interest!<br />‍<br />3. <strong>We&apos;re not a pay-to-play platform</strong>. Firstly, we have the <Link href="/safest-smartest-assurance#s-s-casetrust" target="_blank">most stringent screening standards</Link> in the industry. Secondly, we don&apos;t charge listing fees. Lastly, renovators can&apos;t pay to be listed or shown to you.</p>,
  },
  {
    question: "Can I trust HomeMatch to ensure everything goes smoothly? What if something goes wrong?",
    answer: <p className="d-p home-faq ans">Renovation is complex. No one can guarantee that nothing will go wrong. And if someone tells you otherwise, <em>that&apos;s your red flag.<br />‍</em><br /><strong>Think of us as your first line of defence:<br /></strong>1.<strong> </strong>You won&apos;t waste time meeting IDs who aren&apos;t a good fit (we match you)<br />2. You won&apos;t have to worry about shady firms (we&apos;ve screened them)<br />3. You&apos;ll get contract checks, deposit protection, and other fair policies.<br />‍<br /><strong>Here&apos;s what you&apos;ll still need to do:<br /></strong>1.<strong> </strong>Meet and compare the renovators yourself. Like dating, only you&apos;ll know who really feels right.<br />2. Set expectations. We help check the contract, but it&apos;s still your home, your budget, your final say.<br /><br />‍<br /><strong>If something goes wrong? We don&apos;t walk away. We&apos;ll help you:</strong><br />1. Raise the issue with the firm&apos;s management<br />2. Share practical steps that have helped other homeowners resolve issues early<br />3. If needed, we can even connect you with CaseTrust mediators. And yes, any bad actors will be permanently blacklisted from HomeMatch.</p>,
  },
  {
    question: "Can I renovate a commercial property with HomeMatch?",
    answer: <p className="d-p home-faq ans">Yes, you can! HomeMatch has a dedicated <strong>Commercial Renovation Arm</strong>, where we&apos;ve handpicked <Link href="/casetrust-info" target="_blank"><strong>CaseTrust-accredited renovators</strong></Link> with proven expertise in commercial projects. Every renovator in this arm has gone through an <strong>evidence-based audit of their portfolio</strong>, where they must demonstrate a solid track record in commercial works.<br /><br />Whether you&apos;re planning a <strong>simple office</strong>, an <strong>F&amp;B outlet</strong>, a <strong>clinic</strong>, a <strong>music school</strong>, or any other type of space, we&apos;ll find you trusted &amp; suitable renovators for it.<br /><br /><a href="https://biz.homematch.sg/?utm_source=Website&utm_medium=faq" target="_blank" className="learn-more">Get Matched</a></p>,
  },
  {
    question: "How long do you take to get back to me?",
    answer: <p className="d-p home-faq ans">Really quick. Usually during the <strong>same working day</strong>. <br /><br /><strong>If you&apos;re busy</strong> and prefer us to get back to you on another time, just let us know after <a href="https://get.homematch.sg/?utm_source=Website&utm_medium=FAQ&utm_campaign=how-long-do-you-take">requesting a match</a>. We will accommodate to your needs 👍</p>,
    extraClass: "btm",
  },
];

export default function SafestSmartestPage() {
  return (
    <>
      {/* Above fold */}
      <div className="abovefold s-s">
        <div className="d-container above-fold s-s w-container">
          <div className="s-s-h1-wrapper">
            <Image
              className="s-s-logo"
              src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/662bc5e5c8839654a3f0c15a_s-s%20sticker.avif"
              alt="Safest and smartest renovation platform in Singapore"
              width={300}
              height={300}
            />
            <h1 className="d-h1 s-s">Safest-Smartest<br />Assurance</h1>
            <p className="d-p _0btm-padding s-s">
              ...the absolute <strong>1)</strong> most <span className="text-span-45"><strong className="blue-highlighter bold-text-46">stringent</strong> </span>screening, <strong>2)</strong> most <strong className="blue-highlighter">comprehensive</strong> guarantees, <strong>3)</strong> most <strong className="blue-highlighter">accurate</strong> matching
            </p>
            <div className="s-s-tagswrapper">
              <Link href="#what-well-do" className="d-smallp s-s">What&apos;s done for you:</Link>
              <TagCloud items={tags.find} />
            </div>
            <div className="s-s-tagswrapper">
              <Link href="#what-you-need" className="d-smallp s-s">We highly recommend you to:</Link>
              <TagCloud items={tags.due} />
            </div>
            <div className="ad-cta-btn-wrapper ad-version s-s">
              <div className="ad-button-wrapper">
                <a href="https://get.homematch.sg/?utm_source=Website&utm_medium=safest-smartest" className="ad-button w-button">Match Me</a>
              </div>
              <div style={{ opacity: 0 }} className="d-smallp">It&apos;s Free!</div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial + press logos */}
      <div className="testimonial-div">
        <div className="casetrust-wrapper com">
          <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/638459f294b18f9f97d662df_CaseTrust%20Logo.svg" alt="HomeMatch CaseTrust" width={120} height={50} className="casetrust-logo" />
          <p className="d-p d-smallp top-banner">The Official Marketing Partner of CaseTrust</p>
        </div>
        <div className="features-div">
          <div className="features-logo-wrapper">
            <p className="featured-text">Seen on:</p>
            {["6509c178a7888aa5451196a0_cna.avif","66e43500d7645cd47304fa3f_Straits%20Times%20Icon%20bw.png","66e434fb98f18b6a5f67259b_today%20bw.png","6819c7ecd0c761d8593a8e0d_BT.avif","6819c88d01e5b4ee0e3f6421_shinmin.png","6819c907d6c859588c1a886b_moneyfm.png","65450b2492eb3d1c859e155c_asiaone.svg","65450b24d622edbaedf5070c_yahoo.png"].map((f) => (
              <Image key={f} loading="lazy" src={`https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/${f}`} alt="" width={80} height={30} className="feature-logo" />
            ))}
          </div>
        </div>
        <div className="googlereviews-div">
          <a href="https://maps.app.goo.gl/c1gpDw5AxYg8BGB86" target="_blank" rel="noopener noreferrer" className="google-reviews-wrapper stylish w-inline-block">
            <Image loading="lazy" src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/65dd79221c85fee7c34d8a9d_google_g_icon_download.avif" alt="" width={20} height={20} className="google-reviewsicon" />
            <div className="google-black stylish">Google</div>
            <Image loading="lazy" src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/65dd7876afb490c300aef6c6_Google%20Stars.svg" alt="" width={80} height={16} className="google-stars stylish" />
            <div className="google-gray stylish">4.9 Stars | 700+ reviews</div>
          </a>
        </div>
      </div>

      {/* Comparison section */}
      <div className="_50vw-divider"></div>
      <section className="comparison s-s">
        <Image
          src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/662bc5e5c8839654a3f0c15a_s-s%20sticker.avif"
          loading="lazy"
          alt="Safest and smartest renovation platform in Singapore"
          width={200}
          height={200}
          className="s-s-logo s-s-compare"
        />
        <div className="container-5">
          <h2 className="d-h2 serif google s-s">About Safest-Smartest Assurance</h2>
          <div className="s-s-whatwewdo-wrapper">
            <div className="d-p s-s-about-text">The Safest-Smartest Assurance is our commitment to support homeowners before, during, and after renovation:<br /></div>
            <TagCloud items={tags.find} />
          </div>
        </div>
        <div className="comparison-div">
          {/* HomeMatch column */}
          <div className="comparison-wrapper">
            <div className="comparison-header-wrapper">
              <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/63ff229a2c80b3b1f8c6428d_HomeMatch%20Long.png" loading="lazy" alt="" width={120} height={40} className="image-37" />
              <p className="d-h grey"><strong className="bold-text-49">+</strong></p>
              <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/638459f294b18f9f97d662df_CaseTrust%20Logo.svg" loading="lazy" alt="" width={80} height={40} className="image-37 half" />
            </div>
            {[
              ["100% Deposit Protection", "You get a free bond underwritten by NTUC Income to insure your deposits"],
              ["CaseTrust & above 4⭐", "Trustworthy firms that have been rigorously assessed"],
              ["Precision Matching", "Matched based on your exact requirements"],
              ["Individually Vetted", "We're the only platform with access to individual profiles"],
              ["1-1 Guidance", "We'll advise you and follow-up at every step of the way"],
              ["Standard CASE Contract", "Renovators follow the CASE Contract which protects you"],
              ["Service Warranty", "Min. 12-month workmanship warranty"],
              ["Fairer Prices", "Quotes are itemised and broken down clearly with no hidden costs"],
              ["Withholding Payment", "5-10% withholding payment until proper handover of home is done"],
              ["Progressive Payments", "Proper payment schedule and no unnecessary upfront payments"],
              ["Contract Review", "We can help vet your contracts to ensure fairness"],
              ["Dispute Resolution", "Deadlocks? You can request for mediation at CASE"],
              ["Feedback Management", "Systems to manage and resolve complaints"],
            ].map(([title, desc], i, arr) => (
              <div key={title} className={`comparison-item${i === arr.length - 1 ? " last" : ""}`}>
                <p className="d-h"><strong>{title}</strong></p>
                <p className="comparion-item-text">{desc}</p>
              </div>
            ))}
          </div>

          {/* Risks column */}
          <div className="comparison-wrapper neg">
            <div className="comparison-header-wrapper">
              <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/66308267e2422af8196c8cb4_X.png" loading="lazy" alt="" width={40} height={40} className="image-37 half x" />
            </div>
            {[
              ["Deposit Fraud", "You might lose your deposits"],
              ["Reno Nightmares", "Reno is one the industries with the most complaints in SG"],
              ["Wasted Time", "Meeting renovators who cannot meet your needs"],
              ["Extra Work & Headaches", "Most likely assigned to a random unsuitable renovator"],
              ["Reno Anxiety", "Not knowing where to start and confusion along the way"],
              ["One-Sided Contracts", "Unfair policies that puts you at a disadvantage"],
              ["Insufficient Warranty", "Defects are left unrectified"],
              ["Hidden Costs", "Dishonest lump sum quotations leading to unexpected mark-ups"],
              ["Post-Reno Issues", "No guarantees of rectification works and improper handovers"],
              ["Unnecessary Payments", "You're at risk of overpaying and suffering from reno delays"],
              ["Unfairness & Hiccups", "Getting yourself into one-sided contracts and reno hiccups"],
              ["Unresolved Disputes", "Ambiguous and/or unfair methods for resolving disputes"],
              ["Unresolved Complaints", "Silent treatment from dishonest renovators"],
            ].map(([title, desc], i, arr) => (
              <div key={title} className={`comparison-item${i === arr.length - 1 ? " last" : ""}`}>
                <p className="d-h"><strong>{title}</strong></p>
                <p className="comparion-item-text">{desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="ad-cta-btn-wrapper ad-version s-s _2">
          <div className="ad-button-wrapper">
            <a href="https://get.homematch.sg/?utm_source=Website&utm_medium=safest-smartest" className="ad-button w-button">Match Me</a>
          </div>
          <div style={{ opacity: 0 }} className="d-smallp">It&apos;s Free!</div>
        </div>
      </section>

      {/* What we'll do for you */}
      <div className="_50vw-divider"></div>
      <div id="what-well-do" className="d-container blog s-s w-container">
        <h2 className="d-h3 faq s-s">What we&apos;ll do for you</h2>
        <p className="p-blog s-s">Below are the nitty gritties of everything you need for peace of mind from start to dream home — <strong>1. Finding Renovators, 2. Before Renovation, 3. During Renovation, 4. After Renovation</strong>.</p>
        <div className="s-s-whatwewdo-wrapper">
          <TagCloud items={tags.find} />
        </div>

        {/* Finding Renovators */}
        <div className="s-s-substance-wrapper">
          <h3 className="s-s-headers">1. Finding Renovators</h3>
          <h2 className="h2-blog s-s"><strong id="s-s-casetrust" className="bold-text-15">1. CaseTrust-Accredited Only<br /></strong></h2>
          <p className="p-blog s-s"><Link href="/casetrust-info" target="_blank">CaseTrust</Link> is the accreditation arm of CASE (Consumers Association of Singapore).<br /><br />As the <strong>official marketing partner of CaseTrust</strong>, we work exclusively with CaseTrust-accredited renovators who underwent <a href="https://www.case.org.sg/casetrust/wp-content/uploads/2024/01/Info-Kit-CaseTrust-Accreditation-for-Renovation-Businesses-1-Jan-2024.pdf" target="_blank" rel="noopener noreferrer">rigorous assessment</a> which includes the firm&apos;s policies, practices &amp; systems, and professionalism of their staff.<br /><br />You can expect CaseTrust-accredited renovators to follow good consumer practices that will protect you before, during, and after renovation. <Link href="/casetrust-info" target="_blank">Learn More</Link></p>

          <h2 className="h2-blog s-s"><strong id="s-s-4stars" className="bold-text-15">2. At least 4-Star Reviews Only<br /></strong></h2>
          <p className="p-blog s-s">You will work with Renovators who have at least 4 star reviews on neutral platforms like FB or Google.<br /><br /><strong>Fake Reviews are rampant</strong>. Facebook is our preferred source of truth as you can check if users are real people <em>e.g. account activity, no. of friends, profile photo, account creation date etc. Google Reviews comes in 2nd but it is harder to spot fake reviews there.</em></p>

          <h2 className="h2-blog s-s"><strong id="s-s-individual" className="bold-text-15">3. Individual Screening &amp; Profiling<br /></strong></h2>
          <div className="intro-video s-s w-embed w-iframe">
            <div style={{ textAlign: "center" }}>
              <iframe className="videoFrame" src="https://fast.wistia.net/embed/iframe/3a641ktres" title="Individual Screening video" allow="autoplay" scrolling="no" style={{ borderRadius: "10px", width: "27vw", height: "48vw" }}></iframe>
            </div>
          </div>
          <p className="p-blog s-s">Renovation is an intimate process. You want control over the exact individual who works on your project. That&apos;s why in most cases, we don&apos;t just match you to a random firm, we match you to the <strong>right person in the firm</strong>.<br /><br />Every single one of them have been painstakingly interviewed, filmed, and profiled. You have complete transparency over how they&apos;re like, their reviews, and their past projects.<br /><br />We&apos;re the only and largest database of over 800+ Individual Profiles<sup>(Apr&apos;24)</sup>.</p>

          <h2 className="h2-blog s-s"><strong id="s-s-pmatching" className="bold-text-15">4. Precision Matching<br /></strong></h2>
          <div className="intro-video s-s w-embed w-iframe">
            <div style={{ textAlign: "center" }}>
              <iframe className="videoFrame" src="https://fast.wistia.net/embed/iframe/jihfbk0xd4" title="Precision Matching video" allow="autoplay; fullscreen" scrolling="no" style={{ borderRadius: "10px", width: "40vw", height: "40vw" }}></iframe>
            </div>
          </div>
          <p className="p-blog s-s">Choosing a renovator is not just about choosing the company but the right person who can meet your needs. That&apos;s why, in most cases, we <strong>match you to the exact person</strong> instead of companies.<br /><br /><span><strong>An example of how accurate our matching can be:</strong><br />1.<strong> Lifestyle</strong>: Female, Mandarin-speaking renovators who are also pet-owners like yourself.<br />2. <strong>Budget:</strong> Able to work within your tight budget of $45,000.<br />3. <strong>Aesthetics &amp; Property Type:</strong> Proven experience in Scandinavian-style designs and maximising storage.<br />4. <strong>Working Style:</strong> Consultative and non-pushy, matching the traits you value most.<br />5. <strong>Timeline: </strong>Ready to start work the moment you receive your keys.</span><br /><br />The &apos;HomeMatcher&apos;, our proprietary matching tool currently uses 500+ datapoints<sup>(Apr&apos;24)</sup> to find you the most suitable matches based on your budget, aesthetics, lifestyle, working style, property type, reno timeline and misc. requirements.</p>

          <h2 className="h2-blog s-s"><strong id="s-s-guidance" className="bold-text-15">5. 1-to-1 Guidance<br /></strong></h2>
          <p className="p-blog s-s">You will be paired up with one of our team members.<br /><br />Whether you&apos;re completely clueless or well-researched, <strong>we can advise and help you kickstart your search for the most suitable renovators</strong>. You can also expect follow-ups along the way to ensure your experience is good.<br /><br />We&apos;ve done this for 10,000+ of Singaporeans<sup>(Apr&apos;24)</sup> with their own unique sets of specific needs. We can do this for you too.</p>
        </div>

        {/* Before Renovation */}
        <div className="s-s-substance-wrapper bef">
          <h3 className="s-s-headers bef">2. Before Renovation</h3>
          <h2 className="h2-blog s-s"><strong id="s-s-deposit" className="bold-text-15">6. 100% Deposit Protection<br /></strong></h2>
          <p className="p-blog s-s"><strong>All of your deposits will be safeguarded for free.</strong></p>
          <div className="deposit-guarantee-wrapper">
            <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/66a8799947510e617f169f5a_Deposit%20Guarantee%20Sample.avif" loading="lazy" alt="100% deposit guarantee on your renovation deposits" width={600} height={400} className="deposit-guarantee" />
            <div className="deposit-guarantee-text">Sample of 100% Deposit Guarantee Performance Bond provided by CaseTrust-RCMA Renovators</div>
          </div>
          <p className="p-blog s-s">CaseTrust-accredited renovators are required to issue you a deposit performance bond for free.<br /><br />The performance bond acts like an insurance to safeguard 100% of your deposit payments against closure, winding up and/or liquidation.<br /><br />Every performance bond is underwritten by NTUC Income and issued under your name. <br /><br />The bond is free for homeowners. No cost will be transferred to you as there is no incremental cost for the renovator. They only pay a small annual premium to insure their entire business.<br /><br /><em>*Renovators must undergo financial assessment to be eligible</em></p>

          <h2 className="h2-blog s-s"><strong id="s-s-sccontract" className="bold-text-15">7. Standard CaseTrust Contract<br /></strong></h2>
          <p className="p-blog s-s"><strong>Your contract will be transparent and fair.<br /></strong><br />CaseTrust-accredited Renovators must adopt the CaseTrust Standard Renovation Contract, which outlines each party&apos;s obligations, cost breakdowns, schedule of works, defect liability period, delay liability, payment schedules etc.</p>

          <h2 className="h2-blog s-s"><strong id="s-s-fairerprices" className="bold-text-15">8. Fairer Prices<br /></strong></h2>
          <p className="p-blog s-s"><strong>Transparent Pricing:</strong> You&apos;ll be receiving itemised quotations that displays pricing breakdowns clearly when working with CaseTrust-accredited renovators.<br /><br />‍<strong>No Hidden Costs: </strong>Any potential additional costs and edits to the quotation have to be stated upfront under a variation order and agreed in writing between you and the CaseTrust-accredited renovator.</p>

          <h2 className="h2-blog s-s"><strong id="s-s-confidant" className="bold-text-15">9. Contract Checks<br /></strong></h2>
          <p className="p-blog s-s"><strong>If you were to sign a contract with a Renovator eligible for the Safest-Smartest Assurance, we&apos;ll help you vet through the contract to ensure adherence to good consumer policies.<br /></strong><br />We&apos;ll also give you tailored advice on what to look out for, so you can proactively reduce reno hiccups.<br /><br />You can also tell us anything. We&apos;ll keep it confidential and advise you in your best interests.</p>
        </div>

        {/* During Renovation */}
        <div className="s-s-substance-wrapper dur">
          <h3 className="s-s-headers dur">3. During Renovation</h3>
          <h2 className="h2-blog s-s"><strong id="s-s-progpayments" className="bold-text-15">10. Progressive Payments<br /></strong></h2>
          <p className="p-blog s-s"><strong>You&apos;ll never be asked to make unnecessarily huge upfront payments to CaseTrust-accredited renovators. Plus, payments are collected in milestones or phases.<br /></strong><br />For example, a 10% deposit upon contract signing, 30% upon commencement of renovation, 30% upon completion of masonry (wet) work, 25% a week before delivery of carpentry work, and 5% upon completion of renovation. <em>*Initial deposits are capped at a maximum of 20% of total cost</em></p>

          <h2 className="h2-blog s-s"><strong id="s-s-feedbackmgt" className="bold-text-15">11. Feedback Management<br /></strong></h2>
          <p className="p-blog s-s"><strong>Your complaints/feedback will be resolved within 21 working days by CaseTrust-accredited Renovators.<br /></strong><br />One criteria for the CaseTrust-accreditation is to uphold a proper system for handling and resolving complaints. Proper documentations will be kept e.g. nature of complaint, manner in which complaint was resolved, time taken to resolve.</p>
        </div>

        {/* After Renovation */}
        <div className="s-s-substance-wrapper aft">
          <h3 className="s-s-headers aft">4. After Renovation</h3>
          <h2 className="h2-blog s-s"><strong id="s-s-warranty" className="bold-text-15">12. Service Warranty<br /></strong></h2>
          <p className="p-blog s-s"><strong>You will receive a workmanship warranty for a min. period of 12 months when working with CaseTrust-accredited Renovators.<br /></strong><br />In the event of any defects arising from the works during the Warranty Period, the renovator shall at its own cost, conduct the necessary rectifications works.</p>

          <h2 className="h2-blog s-s"><strong id="s-s-disputeresol" className="bold-text-15">13. Dispute Resolution<br /></strong></h2>
          <p className="p-blog s-s">Renovation is complex. No one can guarantee that nothing will go wrong... If someone tells you otherwise, <em>that&apos;s your red flag.</em><br /><br /><strong>If something goes wrong? We don&apos;t walk away. We&apos;ll help you:<br />‍</strong>1. Raise the issue with the firm&apos;s management<br />‍<br />2. Share practical steps that have helped other homeowners resolve issues early<br />‍<br />3. If needed, we can even connect you with CaseTrust mediators. And yes, any bad actors will be permanently blacklisted from HomeMatch.</p>

          <h2 className="h2-blog s-s"><strong id="s-s-withholding" className="bold-text-15">14. Withholding Payment<br /></strong></h2>
          <p className="p-blog s-s"><strong>You will only make the final payment only after rectifications are made. <br /></strong><br />This is usually a pre-agreed amount of 5-10% stated in the payment schedule.</p>
        </div>

        <div className="ad-cta-btn-wrapper ad-version s-s">
          <div className="ad-button-wrapper">
            <a href="https://get.homematch.sg/?utm_source=Website&utm_medium=safest-smartest" className="ad-button w-button">Match Me</a>
          </div>
          <div style={{ opacity: 0 }} className="d-smallp">It&apos;s Free!</div>
        </div>
      </div>

      {/* What you need to do */}
      <div className="_50vw-divider"></div>
      <div id="what-you-need" className="d-container blog s-s w-container">
        <h2 className="d-h3 faq s-s">We highly recommend the following:</h2>
        <p className="p-blog s-s">‍<strong>You must still do your due diligence on: 1) Meeting &amp; Comparing &amp; 2) Setting Expectations.<br /></strong><br />While <Link href="/safest-smartest-assurance#what-well-do">we&apos;ve got your back</Link>, Let&apos;s keep it real — nothing is ever a silver bullet &amp; reno hiccups do happen! Our main role is to set you up for the perfect &apos;dates&apos;, however, we won&apos;t be liable for your &apos;happily ever after.&apos;</p>
        <TagCloud items={tags.due} />
        <div className="s-s-substance-wrapper whatyouneedtodo">
          <h2 className="h2-blog s-s"><strong id="s-s-meetcompare" className="bold-text-15">1. Meeting &amp; Comparing<br /></strong></h2>
          <p className="p-blog s-s">Think of it like dating... You wouldn&apos;t settle down with the first person you meet, right? At the same time, it is a two-way street!</p>
          <div className="s-s-richtext w-richtext">
            <p className="p-blog s-s no-gap"><strong>Golden Rules to follow:</strong></p>
            <ul role="list">
              <li><Link href="/renovation-guides/how-many-interior-designers-should-i-be-meeting" target="_blank" className="s-s-bullets">Meet at least 5 to be extra confident</Link></li>
              <li><Link href="/renovation-guides/can-i-get-an-accurate-renovation-quote-online" target="_blank" className="s-s-bullets">Meet them in-person. You can&apos;t get accurate quotes and proposals online</Link></li>
            </ul>
            <p className="p-blog s-s no-gap"><strong>Must-knows:</strong></p>
            <ul role="list">
              <li><Link href="/renovation-guides/ghosted-by-interior-designers-again-avoid-these-mistakes-to-save-time" target="_blank" className="s-s-bullets">How to avoid getting ghosted</Link></li>
              <li><Link href="/ask/how-to-prepare-for-a-meeting-with-an-interior-designer" target="_blank" className="s-s-bullets">How to prepare for meetings</Link></li>
              <li><Link href="/ask/what-happens-during-each-meeting-with-an-interior-designer" target="_blank" className="s-s-bullets">What happens during each meeting</Link></li>
              <li><Link href="/renovation-guides/how-to-compare-renovation-quotes-and-key-things-to-look-out-for" target="_blank" className="s-s-bullets">How to compare quotes</Link></li>
              <li><Link href="/ask/how-to-choose-the-right-interior-designer-3-must-follow-rules" target="_blank" className="s-s-bullets">How to choose the right renovator</Link></li>
            </ul>
          </div>
          <h2 className="h2-blog s-s"><strong id="s-s-quality" className="bold-text-15">2. Setting Expectations<br /></strong></h2>
          <p className="p-blog">All CaseTrust-accredited firms have both a quality assurance and service staff training system. <br /><br />However, quality and service expectations are highly subjective based on your personal standards.<br /><br />We highly recommend setting expectations with your renovators before signing the contract to ensure you&apos;re on the same page.</p>
        </div>
      </div>

      {/* FAQ */}
      <div className="_50vw-divider"></div>
      <h2 className="d-h3 faq s-s">Homeowners usually ask...</h2>
      <FAQAccordion
        items={faqItems}
        wrapperClass="home-faq-wrapper"
        itemClass="faqdiv home-faq"
        questionClass="faqquestionwrapper home-faq"
        answerClass="faqanswerwrapper"
      />

      <div className="ad-cta-btn-wrapper ad-version s-s _2">
        <div className="ad-button-wrapper">
          <a href="https://get.homematch.sg/?utm_source=Website&utm_medium=safest-smartest" className="ad-button w-button">Match Me</a>
        </div>
        <div style={{ opacity: 0 }} className="d-smallp">It&apos;s Free!</div>
      </div>
    </>
  );
}
