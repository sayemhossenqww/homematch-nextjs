"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Replicates all Webflow scroll/load animations from the original homematch.sg homepage.
 *
 * Original animation data extracted from the inline style attributes in index.html:
 *  • .jessica-hi          → starts: translateY(73px)  → ends: translateY(0)    [load, 0.2s delay]
 *  • .wave                → starts: translateY(73px), opacity:0 → ends: 0,1     [load, 1.1s delay]
 *  • .homepage-headline   → starts: translateY(65px), opacity:0                  [load, 0.5s delay]
 *  • .abovefold .services-div → starts: translateY(15px), opacity:0             [load, 0.8s delay]
 *  • .testimonial-grid (all) → scroll fadeUp 65px
 *  • .testimonial-card    → scroll fadeUp 65px
 *  • .homepage-transition-div → scroll fadeUp 65px
 *  • .ss-transition-icon  → scroll rotate 0→360 + scale 0.8→1 (sticker spin)
 *  • .steps-div           → scroll fadeRight from translateX(-40px)
 *  • .step1/2/3.content   → scroll stagger fade-up from 40px
 *  • .company-project-preview-wrapper.reviews → scroll fade-in from right (translateX 80px)
 *  • .stringent-point-wrapper → scroll stagger fade-up from 40px
 *  • .comparison-div      → scroll fadeUp 65px
 *  • .faqdiv.home-faq     → scroll fadeUp 40px
 *  • .guide-herodiv       → scroll fadeUp 40px
 *  • .reco-reads          → scroll stagger fadeUp 25px
 */
export function useGSAPAnimations() {
  useEffect(() => {
    // Give React a moment to paint DOM before animating
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {

        // ── LOAD ANIMATIONS (hero section fires immediately) ──

        gsap.fromTo(".jessica-hi",
          { y: 73, opacity: 1 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power2.out", delay: 0.2 }
        );

        gsap.fromTo(".wave",
          { y: 73, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", delay: 1.1 }
        );

        gsap.fromTo(".homepage-headline",
          { y: 65, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.5 }
        );

        gsap.fromTo(".abovefold .services-div",
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", delay: 0.8 }
        );

        // ── SCROLL ANIMATIONS ──

        const fadeUp = (selector: string, yFrom = 65, delay = 0, stagger = 0) => {
          const els = gsap.utils.toArray<Element>(selector);
          if (!els.length) return;
          gsap.fromTo(els,
            { y: yFrom, opacity: 0 },
            {
              y: 0, opacity: 1,
              duration: 0.7, ease: "power2.out",
              delay, stagger,
              scrollTrigger: {
                trigger: els[0],
                start: "top 88%",
                toggleActions: "play none none none",
              },
            }
          );
        };

        const fadeUpEach = (selector: string, yFrom = 40, staggerDelay = 0.15) => {
          gsap.utils.toArray<Element>(selector).forEach((el, i) => {
            gsap.fromTo(el,
              { y: yFrom, opacity: 0 },
              {
                y: 0, opacity: 1, duration: 0.6, ease: "power2.out",
                delay: i * staggerDelay,
                scrollTrigger: {
                  trigger: el,
                  start: "top 88%",
                  toggleActions: "play none none none",
                },
              }
            );
          });
        };

        // Testimonial grids — fade up from 65px
        fadeUp(".testimonial-grid");
        gsap.utils.toArray<Element>(".testimonial-grid._2nd").forEach((el, i) => {
          gsap.fromTo(el,
            { y: 65, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.7, ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
            }
          );
        });
        fadeUpEach(".testimonial-card", 65, 0.1);

        // SS transition
        fadeUp(".homepage-transition-div", 65);

        // SS sticker — spins + scales in (original is a rotation animation on scroll)
        gsap.fromTo(".ss-transition-icon",
          { rotation: -15, scale: 0.8, opacity: 0 },
          {
            rotation: 0, scale: 1, opacity: 1, duration: 1.2, ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: ".homepage-transition-div",
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );

        // How It Works — video comes from left, steps from right (original uses X translation)
        gsap.fromTo(".intro-video-wrapper",
          { x: -50, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.8, ease: "power2.out",
            scrollTrigger: { trigger: ".intro-video-wrapper", start: "top 88%", toggleActions: "play none none none" },
          }
        );

        gsap.fromTo(".steps-div",
          { x: 50, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.8, ease: "power2.out",
            scrollTrigger: { trigger: ".steps-div", start: "top 88%", toggleActions: "play none none none" },
          }
        );

        gsap.utils.toArray<Element>(".step1.content, .step2.content, .step3.content").forEach((el, i) => {
          gsap.fromTo(el,
            { y: 40, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.55, ease: "power2.out", delay: i * 0.15,
              scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
            }
          );
        });

        // Review cards — slide in from right (original scrolls horizontally, cards appear from right edge)
        gsap.utils.toArray<Element>(".company-project-preview-wrapper.reviews.home").forEach((wrapper) => {
          const cards = wrapper.querySelectorAll(".link-block.preview.reviews");
          gsap.fromTo(cards,
            { x: 60, opacity: 0 },
            {
              x: 0, opacity: 1, duration: 0.5, ease: "power2.out",
              stagger: 0.07,
              scrollTrigger: {
                trigger: wrapper,
                start: "top 90%",
                toggleActions: "play none none none",
              },
            }
          );
        });

        // Stringent section
        fadeUp(".home-main-wrapper", 65);
        fadeUpEach(".stringent-point-wrapper", 40, 0.15);

        // Comparison table
        fadeUp(".comparison-div.home", 65);

        // FAQ rows
        fadeUpEach(".faqdiv.home-faq", 40, 0.04);

        // Guides
        fadeUp(".guide-herodiv.homepage", 40);
        gsap.utils.toArray<Element>(".reco-reads").forEach((el, i) => {
          gsap.fromTo(el,
            { y: 25, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.5, ease: "power2.out", delay: i * 0.08,
              scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
            }
          );
        });

      });

      return () => ctx.revert();
    }, 300); // 300ms after mount

    return () => clearTimeout(timer);
  }, []);
}
