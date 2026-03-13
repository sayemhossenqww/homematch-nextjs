"use client";

export default function FloatingButtons() {
  return (
    <div className="floating-button-div">
      <a
        href="https://api.whatsapp.com/send/?phone=6588073534&text=Hello%21+I%27m+renovating+soon.+Can+you+find+me+the+most+Suitable+CaseTrust+renovators%3F&type=phone_number&app_absent=0"
        className="floating-link _2"
      >
        WhatsApp Us
      </a>
      <a
        href="https://feedback.homematch.sg"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-link _2 feedback"
      >
        Feedback
      </a>
    </div>
  );
}
