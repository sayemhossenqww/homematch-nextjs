"use client";

import { useState } from "react";
import Image from "next/image";

interface FAQItem {
  question: React.ReactNode;
  answer: React.ReactNode;
  extraClass?: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  wrapperClass?: string;
  itemClass?: string;
  questionClass?: string;
  answerClass?: string;
}

export default function FAQAccordion({
  items,
  wrapperClass = "home-faq-wrapper",
  itemClass = "faqdiv home-faq",
  questionClass = "faqquestionwrapper home-faq",
  answerClass = "faqanswerwrapper",
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className={wrapperClass}>
      {items.map((item, i) => (
        <div key={i} className={`${itemClass}${item.extraClass ? " " + item.extraClass : ""}`}>
          <div
            className={`${questionClass}${openIndex === i ? " open" : ""}`}
            onClick={() => toggle(i)}
            style={{ cursor: "pointer" }}
          >
            {typeof item.question === "string" ? (
              <h3 className="d-p home-faq qn">{item.question}</h3>
            ) : (
              item.question
            )}
            <Image
              src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/637230747700abb2b0f0d322_down%20arrow.svg"
              loading="lazy"
              alt=""
              width={20}
              height={20}
              className="faqicon"
              style={{ transform: openIndex === i ? "rotate(180deg)" : "none", transition: "transform 0.3s" }}
            />
          </div>
          {openIndex === i && (
            <div className={answerClass}>
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
