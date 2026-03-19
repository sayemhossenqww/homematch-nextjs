"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { MessageCircle, ArrowUp } from "lucide-react";

export default function FloatingButtons() {
  const [showUpButton, setShowUpButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past roughly the hero section (e.g. 600px)
      if (window.scrollY > 600) {
        setShowUpButton(true);
      } else {
        setShowUpButton(false);
      }
    };
    
    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* WhatsApp */}
      <a
        href="https://wa.me/6583326708?text=Hi%2C%20I%27d%20like%20help%20finding%20an%20interior%20designer%20in%20Singapore."
        target="_blank"
        rel="noreferrer"
        title="WhatsApp Us"
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 shrink-0"
        style={{ background: "#25D366", boxShadow: "0 8px 24px rgba(37,211,102,0.4)" }}
      >
        <MessageCircle className="w-6 h-6 text-white fill-white" />
      </a>

      {/* Find My ID pill */}
      <Link
        href="/find-my-id"
        className="mt-3 hidden md:flex items-center gap-2 px-4 py-3 rounded-full font-semibold text-sm text-white transition-all duration-300 hover:scale-105 shrink-0"
        style={{
          background: "var(--grad-accent)",
          boxShadow: "0 6px 20px var(--color-accent-glow)",
        }}
      >
        Find My ID ✦
      </Link>

      {/* Scroll to top */}
      <div 
        className={`transition-all duration-500 ease-in-out overflow-hidden flex flex-col justify-end ${
          showUpButton ? "h-[52px] opacity-100 translate-y-0" : "h-0 opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          title="Back to top"
          className="mt-3 w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110 shrink-0"
          style={{
            background: "rgba(9,22,42,0.85)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.15)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
          }}
        >
          <ArrowUp className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
}
