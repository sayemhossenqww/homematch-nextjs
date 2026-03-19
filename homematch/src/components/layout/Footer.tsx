"use client";
import Link from "next/link";
import { Facebook, Instagram, Youtube, Send, Shield, Phone, Mail, ArrowRight, BadgeCheck, Lock } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";

const NAV_COLS = [
  {
    num: "01",
    title: "Platform",
    links: [
      { label: "Find My ID",          href: "/find-my-id" },
      { label: "Browse Firms",         href: "/firms" },
      { label: "Inspiration Gallery",  href: "/inspirations" },
      { label: "Vendor Directory",     href: "/vendors" },
      { label: "Articles & Guides",    href: "/articles" },
    ],
  },
  {
    num: "02",
    title: "Tools",
    links: [
      { label: "Budget Calculator",    href: "/tools/budget-calculator" },
      { label: "Style Quiz",           href: "/tools/style-quiz" },
      { label: "Compare Firms",        href: "/tools/compare" },
      { label: "Renovation Checklist", href: "/tools/renovation-checklist" },
    ],
  },
  {
    num: "03",
    title: "Learn",
    links: [
      { label: "HDB Guides",           href: "/articles?cat=hdb-guides" },
      { label: "Budget Guides",        href: "/articles?cat=budget-guides" },
      { label: "Design Trends",        href: "/articles?cat=design-trends" },
      { label: "Consumer Protection",  href: "/articles?cat=consumer-protection" },
      { label: "Smart Home",           href: "/articles?cat=smart-home" },
    ],
  },
  {
    num: "04",
    title: "Company",
    links: [
      { label: "About HomeMatch",      href: "/about" },
      { label: "Contact Us",           href: "/contact" },
      { label: "Create Account",       href: "/register" },
      { label: "Sign In",              href: "/login" },
      { label: "Before & After",       href: "/before-after" },
      { label: "Privacy Policy",       href: "/privacy" },
      { label: "Terms of Service",     href: "/terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#050810] overflow-hidden pt-16 pb-8" style={{ borderTop: "1px solid rgba(255,255,255,0.03)" }}>

      {/* ── AMBIENT LIGHTING ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-200 h-200 rounded-full mix-blend-screen"
          style={{ background: "radial-gradient(circle, rgba(200,136,31,0.07) 0%, transparent 60%)", filter: "blur(100px)" }} />
        <div className="absolute bottom-0 left-0 w-150 h-150 rounded-full mix-blend-screen"
          style={{ background: "radial-gradient(circle, rgba(96,165,250,0.04) 0%, transparent 60%)", filter: "blur(100px)" }} />
        <div className="absolute inset-0 opacity-[0.015]"
          style={{ backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
      </div>

      <div className="section-container relative z-10">

        {/* ── TOP: BRANDING & NEWSLETTER ── */}
        <ScrollReveal direction="up" delay={0.1} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center border-b border-white/5 pb-12 mb-12">

          <div className="lg:col-span-7">
            <h2 className="text-white font-black leading-[1.05] tracking-tight mb-6" style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}>
              Singapore's Most <br/>
              <span className="italic font-serif font-light text-[#c8881f]">Trusted</span> Renovation Platform.
            </h2>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[#050810] bg-white/10" />
                ))}
              </div>
              <p className="text-sm text-white/50 leading-tight">
                Joined by <strong className="text-white/80 font-semibold">8,400+</strong> homeowners.<br/>
                Always 100% free.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 w-full flex lg:justify-end">
            <div className="w-full max-w-sm p-8 rounded-[32px] backdrop-blur-md"
              style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1), 0 24px 48px rgba(0,0,0,0.4)" }}>
              <div className="w-12 h-12 rounded-2xl bg-[#c8881f]/10 flex items-center justify-center mb-6">
                <Mail className="w-5 h-5 text-[#c8881f]" />
              </div>
              <h4 className="text-white text-xl font-bold mb-2">Join our Private List</h4>
              <p className="text-white/40 text-sm mb-6">Exclusive design guides, budget actuals, and firm reviews. Zero spam.</p>

              <div className="relative group">
                <input type="email" placeholder="Enter your email"
                  className="w-full bg-[#03050a] text-white text-sm px-6 py-4 rounded-2xl outline-none border border-white/10 focus:border-[#c8881f]/50 transition-colors placeholder:text-white/20" />
                <button className="absolute right-2 top-2 bottom-2 aspect-square rounded-xl flex items-center justify-center bg-white/5 text-white/50 hover:bg-[#c8881f] hover:text-white transition-all">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ── MIDDLE: NAVIGATION + CONTACT ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-12">

          {/* Contact column */}
          <ScrollReveal direction="left" delay={0.2} className="lg:col-span-3 flex flex-col justify-between">
            <div>
              <Link href="/" className="inline-flex items-center gap-4 mb-10 group">
                <div className="w-14 h-14 rounded-[20px] flex items-center justify-center bg-linear-to-br from-[#c8881f] to-[#aa7218] shadow-[0_8px_32px_rgba(200,136,31,0.3)] transition-transform group-hover:-translate-y-1">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-white text-xl font-black block tracking-tight">HomeMatch</span>
                  <span className="text-[#c8881f] text-[10px] font-bold uppercase tracking-[0.3em]">Singapore</span>
                </div>
              </Link>

              <div className="space-y-4 mb-10">
                <a href="tel:+6583326708" className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-[#c8881f]/30 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#c8881f]/20 transition-colors">
                    <Phone className="w-4 h-4 text-white/50 group-hover:text-[#c8881f] transition-colors" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#c8881f] font-bold mb-0.5">Call Us</p>
                    <p className="text-sm font-semibold text-white/80">+65 8332 6708</p>
                  </div>
                </a>
                <a href="mailto:ask@homematch.sg" className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-[#c8881f]/30 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#c8881f]/20 transition-colors">
                    <Mail className="w-4 h-4 text-white/50 group-hover:text-[#c8881f] transition-colors" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#c8881f] font-bold mb-0.5">General Enquiries</p>
                    <p className="text-sm font-semibold text-white/80">ask@homematch.sg</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="flex gap-3">
              {[
                { Icon: Facebook,  href: "https://facebook.com/homematchsg" },
                { Icon: Instagram, href: "https://instagram.com/homematch.sg" },
                { Icon: Youtube,   href: "https://youtube.com/@homematchsg" },
                { Icon: Send,      href: "https://t.me/homematchsg" },
              ].map(({ Icon, href }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-12 h-12 rounded-[18px] border border-white/5 bg-white/[0.01] flex items-center justify-center text-white/40 hover:bg-[#c8881f]/10 hover:border-[#c8881f]/30 hover:text-[#c8881f] hover:-translate-y-1 transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </ScrollReveal>

          {/* Nav columns */}
          <StaggerContainer delay={0.3} staggerDelay={0.1} className="lg:col-span-8 lg:col-start-5 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8">
            {NAV_COLS.map((col) => (
              <StaggerItem key={col.title} className="flex flex-col group">
                <div className="pb-3 mb-5 border-b border-white/5 group-hover:border-[#c8881f]/40 transition-colors flex items-center justify-between">
                  <h4 className="text-white text-[10px] font-black tracking-[0.3em] uppercase">{col.title}</h4>
                  <span className="text-[#c8881f] text-xs font-bold opacity-30 group-hover:opacity-100 transition-opacity">{col.num}</span>
                </div>
                <ul className="space-y-3">
                  {col.links.map(({ label, href }) => (
                    <li key={label}>
                      <Link href={href} className="flex items-center text-white/50 text-sm font-medium hover:text-white transition-all group/link">
                        <span className="w-0 h-px bg-[#c8881f] transition-all duration-300 ease-out group-hover/link:w-3 group-hover/link:mr-2 opacity-0 group-hover/link:opacity-100" />
                        <span className="transition-transform duration-300 group-hover/link:translate-x-1">
                          {label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            ))}
          </StaggerContainer>

        </div>

        {/* ── BOTTOM: LEGAL & TRUST ── */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="flex items-center gap-4 text-xs font-semibold tracking-wide text-white/30">
            <span>© 2026 HomeMatch Singapore.</span>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 group">
              <Shield className="w-4 h-4 text-[#c8881f] opacity-50 group-hover:opacity-100 transition-opacity" />
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] group-hover:text-white/70 transition-colors">CaseTrust</span>
            </div>
            <div className="flex items-center gap-2 group">
              <Lock className="w-4 h-4 text-emerald-500 opacity-50 group-hover:opacity-100 transition-opacity" />
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] group-hover:text-white/70 transition-colors">PDPA Secure</span>
            </div>
            <div className="flex items-center gap-2 group">
              <BadgeCheck className="w-4 h-4 text-blue-500 opacity-50 group-hover:opacity-100 transition-opacity" />
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] group-hover:text-white/70 transition-colors">HDB Registered</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
