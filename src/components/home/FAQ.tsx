"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const faqs = [
  {
    question: "What is HomeMatch?",
    answer: `HomeMatch is a Renovation Platform / Portal in Singapore — The Safest &amp; Smartest way to meet Renovators.<br/><br/>Every renovator you meet on HomeMatch is <a href="/safest-smartest#s-s-casetrust" target="_blank">CaseTrust-accredited w/ at least 4 star reviews on neutral platforms like Facebook or Google</a>. We also individually screen renovators for transparency — you can watch a video about them, look at their reviews and even past projects.<br/><br/>This is also why we're the only platform with the ability to <a href="/safest-smartest#s-s-pmatching">"matchmake" you with specific individuals rather than just the firm</a>. This saves you the headache of trying to find suitable renovators. For example, we can match you with a female mandarin-speaking interior designer, who is a pet owner, able to work within your budget of $50k, and experienced in the wabi-sabi style that you love.<br/><br/>After the "matching making", our <a href="/safest-smartest-assurance" target="_blank">Safest-Smartest Assurance</a> (a free service) will support you before, during, and after renovation. Some highlights include: contract review, 100% deposit protection, warranty, progressive payment, itemised pricing, dispute resolution etc.<br/><br/><a href="https://get.homematch.sg/?utm_source=Website&utm_medium=faq" target="_blank" class="learn-more">Get Matched</a><br/><br/>*HomeMatch is the Official Marketing Partner of CaseTrust`,
  },
  {
    question: "Is HomeMatch Free?! (Spoiler Alert: Yes😏)",
    answer: `There's no catch! Our Matching service is <strong>100% free</strong> for Homeowners. <strong>You don't have to worry about additional mark-ups</strong> when engaging Renovators you meet from HomeMatch.<br/><br/><strong>Here are the facts... HomeMatch works differently by design:</strong><br/>1. We do not charge renovators any listing fees. We only charge renovators a simple upfront advertising fee when a successful match happens, not when you sign anything. As our advertising fees are often lower than the renovator's own advertising costs, they have <strong>zero incentive to sneak in hidden or "creative" mark-ups</strong> into your quote.<br/><br/>2. We <strong>don't</strong> earn from sales commissions when you sign nor charge any listing fees. This allows us to be completely neutral with <strong>zero incentive to push you towards anyone</strong>. Our only goal is to recommend renovators who genuinely fit your needs.<br/><br/>3. Also... all Renovators we recommend are CaseTrust-accredited. So, you'll receive <strong>itemised quotations to prevent hidden costs</strong>`,
  },
  {
    question: "How does the Matching work?",
    answer: `1. We will clarify on your specific renovation needs<br/>‍<br/>2. Our matching algorithm considers your budget, aesthetics, lifestyle, working style, property type, reno timeline and misc. requirements to find you the most suitable renovators.<br/><br/><strong>An example of how accurate our matching can be:</strong><br/>1. <strong>Lifestyle</strong>: Female, Mandarin-speaking renovators who are also pet-owners like yourself.<br/>2. <strong>Budget:</strong> Able to work within your tight budget of $45,000.<br/>3. <strong>Aesthetics &amp; Property Type:</strong> Proven experience in Scandinavian-style designs and maximising storage.<br/>4. <strong>Working Style:</strong> Consultative and non-pushy, matching the traits you value most.<br/>5. <strong>Timeline:</strong> Ready to start work the moment you receive your keys.<br/>‍<br/><a href="/safest-smartest#s-s-pmatching" target="_blank" class="learn-more">Learn More</a>`,
  },
  {
    question: "Why not just search on Instagram, or ask a friend for a recommendation?",
    answer: `You could. But you'd be guessing.<br/>‍<br/>‍<strong>3 reasons why HomeMatch removes the guesswork:</strong><br/>1. Every renovator we recommend is <a href="/casetrust-info">CaseTrust-accredited</a> with at least 4★+reviews, and part of our <a href="/safest-smartest-assurance">Safest-Smartest Assurance</a>.<br/><br/>2. Your friend's renovator might have done a great job but that doesn't mean they are right for your specific needs.<br/><br/>3. Instagram and other directories only show you the firm's best-looking photos. However, it is about the "person" serving you that matters. That's why <a href="/safest-smartest#s-s-individual" target="_blank">we match you with the "exact person" not just firms</a>.<br/><br/><a href="http://www.homematch.sg/homematch-reviews"><strong>We've helped 10,000+ homeowners do this right.</strong></a> You don't have to figure it out alone.`,
  },
  {
    question: "How do you screen the Renovators? Can they just pay to be listed?",
    answer: `Unlike most platforms, <strong>we do not collect sales commissions or charge a listing fee</strong>. We profit by charging Renovators an upfront advertising fee when a match happens.<br/><br/>As the Official Marketing Partner of CaseTrust, we only Match you with Renovators from CaseTrust-accredited firms that underwent rigorous assessment. They are also required to offer service guarantees such as <strong>100% deposit guarantees, min. 12 month warranty, standard contracts (w/ progressive payment and itemised pricings), and mediation if needed</strong>.<br/><br/>We've made sure that all Renovators are from firms with at least <strong>4+ Stars</strong> on FB or Google.<br/><br/>Also, every single individual personnel have been painstakingly interviewed, filmed, and profiled.<br/><br/><a href="/casetrust-info" target="_blank" class="learn-more">Learn More</a>`,
  },
  {
    question: "What is the HomeMatch's Safest-Smartest Assurance?",
    answer: `The Safest-Smartest Assurance was born out of our commitment to help you avoid renovation nightmares.<br/><br/>It is a free service that is designed to protect you before, during, and after the renovation.<br/><br/><strong>Some highlights are:</strong> 100% Deposit Guarantee, Warranty, Standard CASE contract, Fairer Prices, Dispute Resolution etc.<br/>‍<br/><a href="/safest-smartest-assurance?utm_source=Website&utm_medium=faq" target="_blank" class="learn-more">Learn More</a>`,
  },
  {
    question: "What is the Contract Review service?",
    answer: `<strong>If you were to sign a contract with a Renovator eligible for the Safest-Smartest Assurance, we'll help you vet through the contract to ensure adherence to good consumer policies. This is a free service.</strong><br/><br/>We'll also give you tailored advice on what to look out for, so you can proactively reduce renovation hiccups. You can also tell us anything. We'll keep it confidential and advise you in your best interests.`,
  },
  {
    question: "Can I meet Contractors instead of Interior Designers?",
    answer: `Yes you can! You'll have the option to be Matched with Main Contractors only.`,
  },
  {
    question: "Why not just go directly to an interior designer?",
    answer: `You can. But it often means spending weeks meeting different firms, not knowing if you're getting the right person.<br/><br/><strong>Why it's Safer &amp; Smarter to use HomeMatch:</strong><br/>1. HomeMatch helps you skip that guesswork. We <a href="/safest-smartest#s-s-pmatching" target="_blank">filter across thousands of renovators to match you to the exact person</a> not just a firm.<br/>‍<br/>2. You're also covered by our <a href="/safest-smartest-assurance"><strong>Safest-Smartest Assurance.</strong></a> For example, contract checks, 100% deposit protection, warranty, dispute resolution etc.`,
  },
  {
    question: "I've heard bad things about renovation platforms... like spam calls, mark-ups, or pay-to-play listings",
    answer: `Fair concerns! Many platforms do work that way. This was what motivated us to <a href="/about">start HomeMatch</a>.<br/>‍<br/>1. <strong>You won't get spammed</strong>. We only share your contact info with your consent and only with the renovators we've matched you with.<br/>‍<br/>2. <strong>You don't have to worry about mark-ups</strong>. Unlike most platforms, we do not collect sales commissions or charge a listing fee.<br/>‍<br/>3. <strong>We're not a pay-to-play platform</strong>. Firstly, we have the <a href="/safest-smartest#s-s-casetrust" target="_blank">most stringent screening standards</a> in the industry. Secondly, we don't charge listing fees. Lastly, renovators can't pay to be listed or shown to you.`,
  },
  {
    question: "Can I trust HomeMatch to ensure everything goes smoothly? What if something goes wrong?",
    answer: `Renovation is complex. No one can guarantee that nothing will go wrong. And if someone tells you otherwise, <em>that's your red flag.</em><br/>‍<br/><strong>Think of us as your first line of defence:</strong><br/>1. You won't waste time meeting IDs who aren't a good fit (we match you)<br/>2. You won't have to worry about shady firms (we've screened them)<br/>3. You'll get contract checks, deposit protection, and other fair policies.<br/>‍<br/><strong>If something goes wrong? We don't walk away. We'll help you:</strong><br/>1. Raise the issue with the firm's management<br/>2. Share practical steps that have helped other homeowners resolve issues early<br/>3. If needed, we can even connect you with CaseTrust mediators.`,
  },
  {
    question: "Can I renovate a commercial property with HomeMatch?",
    answer: `Yes, you can! HomeMatch has a dedicated <strong>Commercial Renovation Arm</strong>, where we've handpicked <a href="/casetrust-info" target="_blank"><strong>CaseTrust-accredited renovators</strong></a> with proven expertise in commercial projects.<br/><br/>Whether you're planning a <strong>simple office</strong>, an <strong>F&amp;B outlet</strong>, a <strong>clinic</strong>, a <strong>music school</strong>, or any other type of space, we'll find you trusted &amp; suitable renovators for it.<br/><br/><a href="https://biz.homematch.sg/?utm_source=Website&utm_medium=faq" target="_blank" class="learn-more">Get Matched</a>`,
  },
  {
    question: "How long do you take to get back to me?",
    answer: `Really quick. Usually during the <strong>same working day</strong>.<br/><br/><strong>If you're busy</strong> and prefer us to get back to you on another time, just let us know after <a href="https://get.homematch.sg/?utm_source=Website&utm_medium=FAQ&utm_campaign=how-long-do-you-take">requesting a match</a>. We will accommodate to your needs 👍`,
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="home-faq new">
      <div className="d-container new home-faq w-container">
        <div className="home-faq-div">
          <h2 className="d-h3 faq">Frequently Asked Questions:</h2>
          <div className="home-faq-wrapper">
            {faqs.map((faq, i) => (
              <div key={i} className={`faqdiv home-faq${i === 0 ? " top" : ""}${i === faqs.length - 1 ? " btm" : ""}`}>
                <div
                  className={`faqquestionwrapper home-faq${openIndex === i ? " open" : ""}`}
                  onClick={() => toggle(i)}
                  style={{ cursor: "pointer" }}
                >
                  <h3 className="d-p home-faq qn">{faq.question}</h3>
                  <Image
                    src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/637230747700abb2b0f0d322_down%20arrow.svg"
                    loading="lazy"
                    alt=""
                    width={16}
                    height={16}
                    className="faqicon"
                    style={{
                      transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                    }}
                  />
                </div>
                {openIndex === i && (
                  <div className="faqanswerwrapper">
                    <p
                      className="d-p home-faq ans"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
