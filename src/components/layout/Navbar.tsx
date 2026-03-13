"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <div className="navbar w-nav" role="banner" id="topofpage">
      <header className="nav-container w-container">

        {/* ── Hamburger ── */}
        <div
          className="menu-icon"
          onClick={() => setMenuOpen(true)}
          style={{ cursor: "pointer", position: "relative", zIndex: 10001 }}
        >
          <div className="line" />
          <div className="line" />
          <div className="line" />
        </div>

        {/* ── Backdrop overlay ── */}
        <div
          onClick={close}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            zIndex: 10000,
            opacity: menuOpen ? 1 : 0,
            pointerEvents: menuOpen ? "auto" : "none",
            transition: "opacity 0.3s ease",
          }}
        />

        {/* ── Slide-out drawer ── */}
        <nav
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: "560px",
            maxWidth: "95vw",
            zIndex: 10001,
            background: "#fff",
            boxShadow: "4px 0 24px rgba(0,0,0,0.18)",
            borderTopRightRadius: "30px",
            transform: menuOpen ? "translateX(0)" : "translateX(-100%)",
            transition: "transform 0.3s ease",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Close button — sticky header bar */}
          <div
            className="menu-icon close"
            onClick={close}
            style={{
              cursor: "pointer",
              background: "#E2F5F7",
              width: "100%",
              height: "60px",
              boxSizing: "border-box",
              display: "flex",
              alignItems: "center",
              position: "sticky",
              top: 0,
              zIndex: 2,
              flexShrink: 0,
            }}
          >
            <div className="close-button menu" style={{ color: "#49a9cb", paddingBottom: "24px" }}>X Close</div>
          </div>

          <div className="menu-contents-div menu-divider" style={{ flex: 1 }}>
            <div className="services-div">
              <div className="jessica-speech-wrapper menu">
                <Image
                  src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/6384663494b18fa506d74cfa_Jessica-speech.svg"
                  loading="eager"
                  alt=""
                  width={40}
                  height={40}
                  className="jessica-speech-icon menu"
                />
                <p className="d-p jessica-speech">
                  Make Safer &amp; Smarter Reno Decisions 😊
                </p>
              </div>

              <div className="services-button-wrapper menu">
                <a
                  href="https://get.homematch.sg/?utm_source=Website&utm_medium=menu&utm_campaign=Get+Matched"
                  className="services-button bottom menu w-inline-block"
                  onClick={close}
                >
                  <div className="services-icon-wrapper bottom">
                    <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/63832640210b95c7a58ca4e2_Get%20Matched.svg" loading="lazy" alt="" width={30} height={30} className="services-icon bottom" />
                  </div>
                  <p className="d-p services-header bottom">Match me w/ Renovators</p>
                </a>

                <Link href="/renovation-reviews/interior-design-renovation-reviews-singapore" className="services-button bottom menu w-inline-block" onClick={close}>
                  <div className="services-icon-wrapper bottom">
                    <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/6989c2aaeb7711ce6a042d96_50f3d24c963aa5124492ffb51ad7528c_reviews-icon.svg" loading="lazy" alt="" width={30} height={30} className="services-icon bottom" />
                  </div>
                  <p className="d-p services-header bottom">Search &amp; Read Reviews</p>
                </Link>

                <Link href="/safest-smartest-assurance" className="services-button bottom menu w-inline-block" onClick={close}>
                  <div className="services-icon-wrapper bottom">
                    <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/638476e9759e4dc32567a057_safest.svg" loading="lazy" alt="" width={30} height={30} className="services-icon bottom" />
                  </div>
                  <p className="d-p services-header bottom">Safest-Smartest Assurance</p>
                </Link>

                <Link href="/interior-designers-contractors-list/casetrust-renovation-list" target="_blank" className="services-button bottom menu w-inline-block" onClick={close}>
                  <div className="services-icon-wrapper bottom">
                    <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/63d7376a318b0b0827a90aa0_casetrust%20ids.svg" loading="lazy" alt="" width={30} height={30} className="services-icon bottom" />
                  </div>
                  <p className="d-p services-header bottom">CaseTrust IDs List</p>
                </Link>

                <Link href="/guides" className="services-button bottom menu w-inline-block" onClick={close}>
                  <div className="services-icon-wrapper bottom">
                    <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/64e767683a9a55f7eb3f32aa_renovation%20guide.svg" loading="lazy" alt="" width={30} height={30} className="services-icon bottom" />
                  </div>
                  <p className="d-p services-header bottom">Renovation Guides</p>
                </Link>

                <a href="https://ask.homematch.sg/?utm_source=Website&utm_medium=menu" className="services-button bottom menu w-inline-block" onClick={close}>
                  <div className="services-icon-wrapper bottom">
                    <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/6383264073b91e982d86a7d7_Ask%20HomeMatch.svg" loading="lazy" alt="" width={30} height={30} className="services-icon bottom" />
                  </div>
                  <p className="d-p services-header bottom">Ask a Reno Question</p>
                </a>
              </div>
            </div>

            {/* Social links — inside scroll area */}
            <div className="social-div">
              <div className="social-wrapper">
                <a href="https://www.instagram.com/homematch.sg/" target="_blank" rel="noopener noreferrer" className="menu-social-icon-link w-inline-block">
                  <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/637611d3c0c96d84fbc1b2dd_insta.svg" loading="lazy" alt="HomeMatch Instagram" width={24} height={24} className="menu-social-icons" />
                </a>
                <a href="https://hello.homematch.sg" target="_blank" rel="noopener noreferrer" className="menu-social-icon-link w-inline-block">
                  <Image src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/637611d290751efd5ae85449_mail.svg" loading="lazy" alt="HomeMatch Email" width={24} height={24} className="menu-social-icons" />
                </a>
              </div>
            </div>

            {/* Site links — inside scroll area */}
            <div className="sitelinks-div">
              <Link href="/about" className="site-links" onClick={close}>About Us</Link>
              <Link href="/terms-of-use" className="site-links" onClick={close}>Terms of Use</Link>
              <Link href="/privacy-policy" className="site-links" onClick={close}>Privacy Policy</Link>
            </div>
          </div>
        </nav>

        {/* ── Logo ── */}
        <Link href="/" className="logo-link w-inline-block">
          <Image
            width={1500}
            height={24}
            src="https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/636b7d5673e0934554793abf_HomeMatch%20Long.png"
            alt="HomeMatch - Safest Smartest Way to Find Interior Designers"
            className="logo-image"
            priority
          />
        </Link>

        <div className="cta-wrapper" />
      </header>
    </div>
  );
}
