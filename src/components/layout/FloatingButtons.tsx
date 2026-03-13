"use client";

import { usePathname } from "next/navigation";

export default function FloatingButtons() {
  const pathname = usePathname();

  return (
    <div className="floating-button-div">
      <a href="/#how" className="floating-link">
        How It Works
      </a>
      <a
        href={`https://api.whatsapp.com/send/?phone=6588073534&text=Hello%21+I%27m+renovating+soon.+Can+you+find+me+the+most+Suitable+CaseTrust+renovators%3F&type=phone_number&app_absent=0`}
        className="floating-link _2"
      >
        WhatsApp Us
      </a>
      <a
        href={`https://feedback.homematch.sg/?path=${encodeURIComponent(pathname)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-link _2 feedback"
      >
        Feedback
      </a>
    </div>
  );
}
