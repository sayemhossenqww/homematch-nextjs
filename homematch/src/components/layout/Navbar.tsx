"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, ChevronDown, Sparkles, User, LogOut, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  {
    label: "Find Firms",
    href: "/firms",
    dropdown: [
      { label: "Browse All Firms", href: "/firms" },
      { label: "CaseTrust Firms Only", href: "/firms?badge=casetrust" },
      { label: "HDB Specialists", href: "/firms?badge=hdb-specialist" },
      { label: "By Design Style", href: "/firms?open=styles" },
    ],
  },
  {
    label: "Inspiration",
    href: "/inspirations",
    dropdown: [
      { label: "Browse All Projects", href: "/inspirations" },
      { label: "HDB Projects", href: "/inspirations?type=hdb" },
      { label: "Condo Projects", href: "/inspirations?type=condo" },
      { label: "By Design Style", href: "/inspirations" },
      { label: "Before & After", href: "/before-after" },
    ],
  },
  {
    label: "Vendors",
    href: "/vendors",
    dropdown: [
      { label: "Browse All Brands", href: "/vendors" },
      { label: "Materials", href: "/vendors?cat=materials" },
      { label: "Furniture", href: "/vendors?cat=furniture" },
      { label: "Smart Home", href: "/vendors?cat=smart-home" },
      { label: "Lighting", href: "/vendors?cat=lighting" },
    ],
  },
  {
    label: "Articles",
    href: "/articles",
    dropdown: [
      { label: "All Articles",          href: "/articles" },
      { label: "HDB Guides",            href: "/articles?cat=hdb-guides" },
      { label: "Budget Guides",         href: "/articles?cat=budget-guides" },
      { label: "Design Trends",         href: "/articles?cat=design-trends" },
      { label: "House Hacks",           href: "/articles?cat=house-hacks" },
      { label: "Consumer Protection",   href: "/articles?cat=consumer-protection" },
      { label: "Smart Home",            href: "/articles?cat=smart-home" },
    ],
  },
  {
    label: "Tools",
    href: "/tools",
    dropdown: [
      { label: "Budget Calculator", href: "/tools/budget-calculator" },
      { label: "Style Quiz", href: "/tools/style-quiz" },
      { label: "Renovation Checklist", href: "/tools/renovation-checklist" },
      { label: "Compare Firms", href: "/tools/compare" },
    ],
  },
];

const ACCENT_COLORS = ["#c8881f", "#60a5fa", "#4ade80", "#f472b6", "#a78bfa"];

function UserAvatar({ name, picture, id, size = 32 }: { name: string; picture?: string; id: string; size?: number }) {
  const initials = name.split(" ").map(n => n[0]).filter(Boolean).join("").slice(0, 2).toUpperCase();
  const color = ACCENT_COLORS[(id.charCodeAt(id.length - 1) ?? 0) % ACCENT_COLORS.length];
  if (picture) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={picture} alt={name} width={size} height={size}
        className="rounded-full object-cover border border-white/10"
        style={{ width: size, height: size }} />
    );
  }
  return (
    <div className="rounded-full flex items-center justify-center font-bold text-white border border-white/10"
      style={{ width: size, height: size, background: color, fontSize: size * 0.35 }}>
      {initials}
    </div>
  );
}

export default function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const [scrolled,        setScrolled]        = useState(false);
  const [mobileOpen,      setMobileOpen]       = useState(false);
  const [activeDropdown,  setActiveDropdown]   = useState<string | null>(null);
  const [userMenuOpen,    setUserMenuOpen]     = useState(false);
  const [mounted,         setMounted]          = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close user menu on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    logout();
    setUserMenuOpen(false);
    setMobileOpen(false);
    router.push("/");
  }

  const roleLabel: Record<string, string> = { homeowner: "Homeowner", firm: "ID Firm", brand: "Brand" };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "py-2" : "py-3"
        )}
      >
        {/* Glass bar */}
        <div
          className={cn(
            "absolute inset-0 transition-all duration-500",
            scrolled
              ? "bg-[rgba(9,22,42,0.88)] backdrop-blur-2xl border-b border-white/8 shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
              : "bg-transparent"
          )}
        />

        <div className="section-container relative z-10">
          <nav className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:scale-110"
                style={{ background: "var(--grad-accent)", boxShadow: "0 4px 16px var(--color-accent-glow)" }}
              >
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-extrabold text-lg text-white tracking-tight leading-none block">
                  HomeMatch
                </span>
                <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em" }}>
                  SINGAPORE
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <ul className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <li
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm transition-all duration-200 text-white/75 hover:text-white hover:bg-white/8"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, letterSpacing: "0.015em" }}
                  >
                    {link.label}
                    {link.dropdown && (
                      <ChevronDown
                        className={cn("w-3.5 h-3.5 transition-transform", activeDropdown === link.label ? "rotate-180" : "")}
                        style={{ opacity: 0.5 }}
                      />
                    )}
                  </Link>

                  {link.dropdown && activeDropdown === link.label && (
                    <div className="absolute top-full left-0 pt-1.5 z-50">
                      <div
                        className="p-2 min-w-57.5"
                        style={{
                          background: "rgba(9,22,42,0.96)",
                          backdropFilter: "blur(24px)",
                          WebkitBackdropFilter: "blur(24px)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "16px",
                          boxShadow: "0 12px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.07)",
                        }}
                      >
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="block px-5 py-3 text-sm transition-all duration-150"
                            style={{ color: "rgba(255,255,255,0.62)", borderRadius: "9px", fontFamily: "'DM Sans', sans-serif", fontWeight: 400, letterSpacing: "0.01em" }}
                            onMouseEnter={(e) => { e.currentTarget.style.color = "white"; e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.62)"; e.currentTarget.style.background = "transparent"; }}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-2.5">
              {mounted && user ? (
                <>
                  {/* User menu */}
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setUserMenuOpen(v => !v)}
                      className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl transition-all hover:bg-white/8"
                    >
                      <UserAvatar name={user.name} picture={user.picture} id={user.id} size={32} />
                      <div className="text-left">
                        <p className="text-sm font-semibold text-white/90 leading-none max-w-[120px] truncate">{user.name}</p>
                        <p className="text-[10px] text-white/40 mt-0.5">{roleLabel[user.role]}</p>
                      </div>
                      <ChevronDown className={cn("w-3.5 h-3.5 text-white/40 transition-transform", userMenuOpen && "rotate-180")} />
                    </button>

                    {userMenuOpen && (
                      <div className="absolute top-full right-0 pt-1.5 z-50">
                        <div className="p-1.5 min-w-48"
                          style={{ background: "rgba(9,22,42,0.97)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", boxShadow: "0 16px 48px rgba(0,0,0,0.5)" }}>
                          {/* User info header */}
                          <div className="px-4 py-3 border-b border-white/5 mb-1">
                            <p className="text-xs font-semibold text-white/80 truncate">{user.name}</p>
                            <p className="text-[11px] text-white/40 truncate">{user.email}</p>
                          </div>
                          <Link href="/profile"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/65 hover:text-white hover:bg-white/7 transition-all">
                            <User className="w-4 h-4" />
                            My Profile
                          </Link>
                          <div className="my-1 border-t border-white/5" />
                          <button onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-400/75 hover:text-red-400 hover:bg-red-500/8 transition-all">
                            <LogOut className="w-4 h-4" />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <Link href="/find-my-id" className="btn-accent text-sm py-2.5 px-5">
                    Find My ID →
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/login"
                    className="text-sm font-medium px-3.5 py-2 rounded-xl transition-all text-white/60 hover:text-white hover:bg-white/8">
                    Login
                  </Link>
                  <Link href="/register"
                    className="text-sm font-semibold px-3.5 py-2 rounded-xl transition-all border text-white/70 hover:text-white hover:border-white/25"
                    style={{ border: "1px solid rgba(255,255,255,0.12)" }}>
                    Register
                  </Link>
                  <Link href="/find-my-id" className="btn-accent text-sm py-2.5 px-5">
                    Find My ID →
                  </Link>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 rounded-xl text-white hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0"
            style={{ background: "rgba(9,22,42,0.6)", backdropFilter: "blur(8px)" }}
            onClick={() => setMobileOpen(false)}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-75 overflow-y-auto"
            style={{ background: "rgba(9,22,42,0.97)", backdropFilter: "blur(40px)", borderLeft: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <Link href="/" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "var(--grad-accent)" }}>
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-extrabold text-white">HomeMatch</span>
                </Link>
                <button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/8 transition-colors" aria-label="Close navigation menu">
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              {/* Mobile user profile strip */}
              {mounted && user && (
                <div className="flex items-center gap-3 p-3 rounded-2xl mb-6"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <UserAvatar name={user.name} picture={user.picture} id={user.id} size={40} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate">{user.name}</p>
                    <p className="text-[11px] text-white/40 truncate">{user.email}</p>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg"
                    style={{ background: "rgba(200,136,31,0.15)", color: "#c8881f", border: "1px solid rgba(200,136,31,0.2)" }}>
                    {roleLabel[user.role]}
                  </span>
                </div>
              )}

              <nav className="space-y-1">
                {navLinks.map((link) => (
                  <div key={link.label}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-3.5 py-3 rounded-xl text-white font-semibold text-sm transition-all"
                      style={{ color: "rgba(255,255,255,0.85)" }}
                    >
                      {link.label}
                    </Link>
                    {link.dropdown && (
                      <div className="pl-4 space-y-0.5">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="block px-3.5 py-2 rounded-lg text-xs font-medium transition-all"
                            style={{ color: "rgba(255,255,255,0.45)" }}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              <div className="mt-8 space-y-3">
                <Link href="/find-my-id" onClick={() => setMobileOpen(false)} className="btn-accent w-full justify-center">
                  Find My ID — Free →
                </Link>

                {mounted && user ? (
                  <>
                    <Link href="/profile" onClick={() => setMobileOpen(false)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white/70 transition-all hover:text-white hover:bg-white/5"
                      style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                      <Settings className="w-4 h-4" />
                      My Profile
                    </Link>
                    <button onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-red-400/70 hover:text-red-400 transition-colors">
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/register" onClick={() => setMobileOpen(false)} className="btn-glass w-full justify-center">
                      Create Account
                    </Link>
                    <Link href="/login" onClick={() => setMobileOpen(false)}
                      className="w-full flex items-center justify-center text-sm font-medium text-white/50 hover:text-white/80 transition-colors py-2">
                      Already have an account? Sign in →
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
