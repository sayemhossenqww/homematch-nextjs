import Link from "next/link";
import { Home, Search, ArrowRight, BookOpen, Building2, Sparkles } from "lucide-react";

const QUICK_LINKS = [
  { label: "Browse Firms",       href: "/firms",        icon: Building2 },
  { label: "Renovation Guides",  href: "/articles",     icon: BookOpen  },
  { label: "Get Inspiration",    href: "/inspirations", icon: Sparkles  },
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#05080f] flex items-center justify-center px-4 pt-20 pb-20">

      {/* Ambient glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-125 h-125 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(200,136,31,0.08) 0%, transparent 60%)", filter: "blur(100px)" }} />
        <div className="absolute bottom-1/3 right-1/4 w-100 h-100 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(96,165,250,0.05) 0%, transparent 60%)", filter: "blur(90px)" }} />
        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center">

        {/* 404 number */}
        <div className="relative mb-8 select-none">
          <span
            className="block font-black text-center leading-none"
            style={{
              fontSize: "clamp(7rem, 20vw, 14rem)",
              background: "linear-gradient(135deg, rgba(200,136,31,0.15) 0%, rgba(200,136,31,0.04) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.05em",
            }}
          >
            404
          </span>
          {/* Overlaid search icon */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-20 h-20 rounded-3xl bg-[#c8881f]/10 border border-[#c8881f]/20 flex items-center justify-center">
              <Search className="w-9 h-9 text-[#c8881f]/60" />
            </div>
          </div>
        </div>

        {/* Glass card */}
        <div className="bg-[#0a0e1a]/80 backdrop-blur-xl border border-white/8 rounded-3xl p-8 md:p-12 mb-8">

          <div className="inline-flex items-center gap-2 bg-[#c8881f]/10 border border-[#c8881f]/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c8881f]" />
            <span className="text-[#c8881f] text-xs font-semibold tracking-wide uppercase">Page Not Found</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-3">
            Looks like this page doesn't exist
          </h1>
          <p className="text-white/45 text-base leading-relaxed mb-8 max-w-md mx-auto">
            The page you're looking for may have moved, been renamed, or never existed.
            Let's get you back on track.
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <Link href="/" className="btn-accent text-sm py-3 px-7 inline-flex items-center justify-center gap-2">
              <Home className="w-4 h-4" /> Return Home
            </Link>
            <Link href="/find-my-id"
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold py-3 px-7 rounded-full bg-white/6 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-all">
              Find My ID <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Quick links */}
          <div className="pt-8 border-t border-white/6">
            <p className="text-white/30 text-xs font-bold uppercase tracking-[0.15em] mb-4">Or explore</p>
            <div className="flex flex-wrap justify-center gap-3">
              {QUICK_LINKS.map(({ label, href, icon: Icon }) => (
                <Link key={href} href={href}
                  className="flex items-center gap-2 px-4 py-2 bg-white/4 hover:bg-white/8 border border-white/8 hover:border-[#c8881f]/30 rounded-xl text-white/55 hover:text-white text-sm font-medium transition-all">
                  <Icon className="w-3.5 h-3.5 text-[#c8881f]" />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <p className="text-white/20 text-xs">
          If you think this is a mistake, email us at{" "}
          <a href="mailto:ask@homematch.sg" className="text-[#c8881f]/60 hover:text-[#c8881f] transition-colors">
            ask@homematch.sg
          </a>
        </p>
      </div>
    </div>
  );
}
