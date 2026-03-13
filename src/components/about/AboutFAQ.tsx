"use client";

import { useState } from "react";
import Image from "next/image";

interface AboutFAQProps {
  wish: string;
  title: string;
  answer: React.ReactNode;
}

export default function AboutFAQ({ wish, title, answer }: AboutFAQProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="faqdiv tips about">
      <div
        className={`faqquestionwrapper tips about${open ? " open" : ""}`}
        onClick={() => setOpen(!open)}
        style={{ cursor: "pointer" }}
      >
        <p className="p-blog about header">
          <em>How we made that a reality</em><br />
        </p>
        <p className="d-h faq about">
          🎁 <strong>{wish}:</strong> {title}
        </p>
        <Image
          src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/637230747700abb2b0f0d322_down%20arrow.svg"
          loading="lazy"
          alt=""
          width={20}
          height={20}
          className="faqicon about"
          style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.3s" }}
        />
      </div>
      {open && (
        <div className="faqanswerwrapper about">
          {answer}
        </div>
      )}
    </div>
  );
}
