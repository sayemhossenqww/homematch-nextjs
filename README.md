# HomeMatch.sg — Developer Documentation

> **Live site**: [https://www.homematch.sg](https://www.homematch.sg)
> **Stack**: Next.js 16 · TypeScript · Tailwind CSS v4 · GSAP 3
> **Purpose**: Singapore renovation matchmaking platform — connects homeowners to CaseTrust-accredited interior designers & contractors.

---

## Table of Contents

1. [Tech Stack](#1-tech-stack)
2. [Project Structure](#2-project-structure)
3. [Getting Started](#3-getting-started)
4. [Configuration](#4-configuration)
5. [Root Layout](#5-root-layout)
6. [Routes & Pages](#6-routes--pages)
7. [Components](#7-components)
   - [Layout](#layout-components)
   - [Homepage](#homepage-components)
   - [Contractor Profile](#contractor-profile-component)
   - [Guides & Other](#guides--other-components)
8. [Lib Utilities](#8-lib-utilities)
9. [Hooks](#9-hooks)
10. [Data Layer](#10-data-layer)
11. [Types](#11-types)
12. [External Integrations](#12-external-integrations)
13. [Key Architecture Notes](#13-key-architecture-notes)

---

## 1. Tech Stack

| Layer | Technology |
|---|---|
| Framework | **Next.js 16.1.6** (App Router) |
| Language | **TypeScript 5** |
| Styling | **Tailwind CSS v4** (via `@tailwindcss/postcss`) |
| Animation | **GSAP 3.14** + ScrollTrigger |
| Runtime | **React 19** |
| Fonts | **Montserrat** (Google Fonts — all 9 weights) |
| Analytics | **Google Tag Manager** (`GTM-TJLXMGC`) |
| Legacy JS | Webflow JS bundles + jQuery 3.5.1 (loaded via CDN) |
| Forms | **Wized** (no-code form tool, embedded in Webflow pages) |
| Filtering | **Finsweet CMS Filter/Sort** (custom HTML attributes) |
| Images | All hosted on Webflow CDN (`cdn.prod.website-files.com`) |

---

## 2. Project Structure

```
homematch-nextjs/
├── src/
│   ├── app/                  ← Next.js App Router pages & routes
│   │   ├── layout.tsx        ← Root layout (Navbar, Footer, GTM, scripts)
│   │   ├── page.tsx          ← Homepage
│   │   ├── globals.css       ← Global styles
│   │   └── [routes]/         ← One folder per route (see §6)
│   ├── components/           ← React UI components
│   │   ├── layout/           ← Navbar, Footer, FloatingButtons
│   │   ├── home/             ← 11 homepage section components
│   │   ├── contractors/      ← FirmProfileClient (contractor profile UI)
│   │   ├── guides/           ← GuidesContent
│   │   ├── about/            ← AboutFAQ
│   │   └── safest-smartest/  ← SSContent (~40KB)
│   ├── data/
│   │   └── guides.ts         ← Static guide metadata
│   ├── hooks/
│   │   └── useGSAPAnimations.ts
│   ├── lib/
│   │   ├── parseContractorHtml.ts  ← HTML parser for contractor profiles
│   │   └── guideContent.ts          ← HTML extractor for guides & firm pages
│   └── types/
│       └── wized.d.ts        ← Global custom HTML attribute types
├── public/                   ← Static assets (only placeholder SVGs)
├── next.config.ts            ← Image domains + URL redirects
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

---

## 3. Getting Started

### Prerequisites
- Node.js 18+
- The base Webflow site HTML files must be present on disk at:
  ```
  M:\www.homematch.sg - Copy (3)\www.homematch.sg\
  ```
  *(See [§13 Key Architecture Notes](#13-key-architecture-notes))*

### Install & Run

```bash
# Install dependencies
npm install

# Start development server → http://localhost:3000
npm run dev

# Production build
npm run build

# Start production server (after build)
npm run start

# Lint
npm run lint
```

---

## 4. Configuration

### `next.config.ts`

**Image domains whitelisted:**
- `cdn.prod.website-files.com` (Webflow CDN — all images)
- `lh3.googleusercontent.com` / `**.googleusercontent.com` (Google profile photos)
- `unoptimized: true` — Next.js image optimization is disabled since images come from a CDN.

**Redirects:**

| From | To | Permanent |
|---|---|---|
| `/safest-smartest` | `/safest-smartest-assurance` | ✅ |
| `/guides.1` | `/guides` | ✅ |
| `/interior-designers-contractors-list/casetrust-renovation-list` | `/casetrust-renovation-list` | ✅ |
| `/interior-designers-contractors-list/directory-of-hdb-approved-...` | `/casetrust-renovation-list` | ✅ |
| `/interior-designers-contractors-list/:slug` | `/casetrust-renovation-list` | ❌ |
| `/renovation-reviews` | `/renovation-reviews/interior-design-renovation-reviews-singapore` | ❌ |

---

## 5. Root Layout

**File**: `src/app/layout.tsx`

| Responsibility | Detail |
|---|---|
| **Font** | Montserrat via `next/font/google`, CSS var `--font-montserrat` |
| **Metadata** | Site title, description, Open Graph, Twitter card, Google/Pinterest verification |
| **Favicon** | Served from Webflow CDN |
| **GTM** | `GTM-TJLXMGC` script (afterInteractive) + noscript iframe |
| **Shell** | `<Navbar>` → `<main>{children}</main>` → `<Footer>` → `<FloatingButtons>` |
| **Webflow JS** | jQuery 3.5.1 (beforeInteractive) + 2 Webflow JS chunks (afterInteractive) |

---

## 6. Routes & Pages

| Route | File | Description |
|---|---|---|
| `/` | `app/page.tsx` | Homepage — all sections assembled here |
| `/interior-designers-contractors/[slug]` | `app/interior-designers-contractors/[slug]/page.tsx` | Dynamic contractor profile page |
| `/interior-designers-contractors-list/[slug]` | `app/interior-designers-contractors-list/[slug]/` | Dynamic CRL listing page |
| `/casetrust-renovation-list` | `app/casetrust-renovation-list/` | CaseTrust Renovation List index |
| `/renovation-reviews` | Redirects → sub-path below | — |
| `/renovation-reviews/interior-design-renovation-reviews-singapore` | `app/renovation-reviews/interior-design-renovation-reviews-singapore/` | Full reviews page |
| `/guides` | `app/guides/page.tsx` | Guides index |
| `/renovation-guides` | `app/renovation-guides/` | Individual renovation guide articles |
| `/safest-smartest-assurance` | `app/safest-smartest-assurance/` | HomeMatch Protection program details |
| `/about` | `app/about/` | About page |
| `/ask` | `app/ask/` | Ask-a-reno-question page |
| `/casetrust-info` | `app/casetrust-info/` | CaseTrust info |
| `/featured-interior-firms` | `app/featured-interior-firms/` | Featured firm profiles |
| `/homematch-reviews` | `app/homematch-reviews/` | HomeMatch reviews |
| `/renovation-packages` | `app/renovation-packages/` | Renovation packages |
| `/privacy-policy` | `app/privacy-policy/` | Privacy policy |
| `/terms-of-use` | `app/terms-of-use/` | Terms of use |

---

## 7. Components

### Layout Components
`src/components/layout/`

#### `Navbar.tsx` — Client Component
- **Hamburger → slide-out drawer** (560px, CSS `translateX` transition, 0.3s ease)
- **Backdrop overlay** — dims page when menu open
- **Scroll lock** — `body.style.overflow = "hidden"` when drawer open
- **Nav items**: Get Matched, Reviews, Safest-Smartest Assurance, CaseTrust IDs List, Guides, Ask a Question
- **Social links**: Instagram, Email (`hello.homematch.sg`)
- **Logo** links to `/`

#### `Footer.tsx`
Instagram + Email social links. About Us, Terms of Use, Privacy Policy text links.

#### `FloatingButtons.tsx`
Persistent floating CTA button(s) on every page.

---

### Homepage Components
`src/components/home/` — all assembled in `app/page.tsx`

| Component | Size | Purpose |
|---|---|---|
| `AboveFold.tsx` | 5.7KB | Hero section — Jessica, headline, CTA services |
| `TestimonialSection.tsx` | 11.8KB | Review grid + CaseTrust logos + Google reviews banner |
| `SSTransition.tsx` | 2.1KB | Safest-Smartest transition banner |
| `HowItWorks.tsx` | 4.8KB | Video + 3-step process |
| `MostStringent.tsx` | 5KB | Screening criteria section |
| `MostComprehensive.tsx` | 5.4KB | Guarantee comparison table |
| `FAQ.tsx` | 12.5KB | FAQ accordion |
| `CtaBottom.tsx` | 3.9KB | Bottom CTA bar |
| `GuidesSection.tsx` | 4.2KB | Guide cards + newsletter |
| `GoogleReviews.tsx` | 6KB | Google Reviews widget |
| `ReviewCards.tsx` | 10.7KB | Horizontally scrollable review cards |

---

### Contractor Profile Component

#### `src/components/contractors/FirmProfileClient.tsx` (23KB) — Client Component

Renders the premium contractor profile page. Accepts a `ContractorFirm` object as props (parsed server-side from raw HTML).

**Sections rendered:**
- Cover photo header
- Firm logo + name + star rating + review count
- Review platform badges (Google / Facebook with scores & links)
- Social links (website, Instagram, Facebook, TikTok, XHS/小红书)
- Showrooms (region + address)
- Accreditations (CaseTrust & HDB status)
- About text
- Individual designer photos
- FAQ accordion
- CTA buttons

---

### Guides & Other Components

| Component | Path | Purpose |
|---|---|---|
| `GuidesContent.tsx` | `components/guides/` | Guides listing page |
| `AboutFAQ.tsx` | `components/about/` | About page FAQ |
| `SSContent.tsx` | `components/safest-smartest/` | Full SafestSmartest Assurance page content (~40KB) |
| `AnimationProvider.tsx` | `components/` | Renders nothing; calls `useGSAPAnimations()` |
| `FAQAccordion.tsx` | `components/` | Reusable `{q, a}[]` accordion |
| `CRLCtaBlock.tsx` | `components/` | CaseTrust list CTA block |
| `PageLayout.tsx` | `components/` | Consistent page padding/max-width wrapper |

---

## 8. Lib Utilities

Both files are **server-side only** and read from the local Webflow site HTML files.
`SITE_ROOT` is hardcoded to `M:\www.homematch.sg - Copy (3)\www.homematch.sg`.

### `src/lib/parseContractorHtml.ts`

Core HTML-parsing engine for contractor profiles.

**Main export:** `parseContractorHtml(slug: string): ContractorFirm | null`

Reads `interior-designers-contractors/{slug}[.html]`, extracts structured data via regex on Webflow CSS class names:

| Field | Source selector |
|---|---|
| `name` | `<h1 class="company-details-name">` |
| `logoUrl` | `<img class="firm-logo">` |
| `coverPhotoUrl` | `<meta property="og:image">` |
| `rating` | `.crl-review-rating` |
| `reviewCount` | `.crl-review-text` |
| `reviewPlatforms` | `.company-review-platform-set` anchor blocks |
| `social` | `.company-btn-social-wrapper` links (classified by domain) |
| `showrooms` | `.company-accred-wrapper.location.firm` blocks |
| `casetrust` / `hdb` | `firm-bio-wrapper` accreditation section |
| `about` | `<p class="d-p faq profile page firm">` |
| `indivDesigners` | `.firm-indv-icons-wrapper img.firm-indv-icons` |
| `featuredSlug` | `href` containing `featured-interior-firms/` |
| `faqs` | `.company-faq-qa-wrapper` (`<h3>` = Q, `.firm-faq-a` = A) |

**Exported types:** `ShowRoom`, `SocialLinks`, `ReviewPlatform`, `IndivDesigner`, `ContractorFirm`

---

### `src/lib/guideContent.ts`

Async HTML extractor for guides, ask pages, contractor profiles, and featured firms.

| Export | Reads from | Purpose |
|---|---|---|
| `readRenovationGuide(slug)` | `renovation-guides/{slug}` | Extracts `<aside class="blog-content-div">` article body |
| `readAskGuide(slug)` | `ask/{slug}` | Same extraction for Ask articles |
| `readContractorProfile(slug)` | `interior-designers-contractors/{slug}` | Extracts `company-nav` → `<footer>` as page body |
| `readFeaturedFirmContent(slug)` | `featured-interior-firms/{slug}` | Extracts page body for featured pages |

**Internal helpers (not exported):**
- `extractGuideContent` — targets `blog-content-div` aside, falls back to all `.blog-rich` sections
- `cleanLinks` — rewrites `../relative` → `/absolute`, strips Wized/Webflow data attrs
- `extractDivContent` — depth-counting `<div>` extractor by class name
- `extractPageBody` — slices HTML from `company-nav` div to `<footer>`

---

## 9. Hooks

### `src/hooks/useGSAPAnimations.ts`

Replicates all Webflow scroll/load animations from the original site using GSAP 3 + ScrollTrigger.

- Runs inside `useEffect` with a **300ms mount delay** (ensures DOM is painted)
- All animations scoped in `gsap.context()` — cleaned up on unmount via `ctx.revert()`
- ScrollTrigger: `start: "top 88%"`, `toggleActions: "play none none none"` (fire once)

**Animation inventory:**

| Selector | Trigger | Animation |
|---|---|---|
| `.jessica-hi` | Load | `y: 73 → 0`, delay 0.2s |
| `.wave` | Load | `y: 73, opacity: 0 → 1`, delay 1.1s |
| `.homepage-headline` | Load | `y: 65, opacity: 0 → 1`, delay 0.5s |
| `.abovefold .services-div` | Load | `y: 15, opacity: 0 → 1`, delay 0.8s |
| `.testimonial-grid` | Scroll | Fade up 65px |
| `.testimonial-card` | Scroll | Stagger fade up 65px (0.1s) |
| `.homepage-transition-div` | Scroll | Fade up 65px |
| `.ss-transition-icon` | Scroll | Rotate -15°→0, scale 0.8→1 (`back.out`) |
| `.intro-video-wrapper` | Scroll | Slide from left `x: -50` |
| `.steps-div` | Scroll | Slide from right `x: 50` |
| `.step1/2/3.content` | Scroll | Stagger fade up 40px (0.15s) |
| `.link-block.preview.reviews` | Scroll | Slide from right `x: 60` (stagger 0.07s) |
| `.home-main-wrapper` | Scroll | Fade up 65px |
| `.stringent-point-wrapper` | Scroll | Stagger fade up 40px (0.15s) |
| `.comparison-div.home` | Scroll | Fade up 65px |
| `.faqdiv.home-faq` | Scroll | Stagger fade up 40px (0.04s) |
| `.guide-herodiv.homepage` | Scroll | Fade up 40px |
| `.reco-reads` | Scroll | Stagger fade up 25px (0.08s) |

---

## 10. Data Layer

### `src/data/guides.ts` (~18KB)
Static TypeScript data — all renovation guide metadata (titles, slugs, hero images, descriptions, tags). Used by `GuidesSection` on the homepage and the `/guides` index page.

---

## 11. Types

### `src/types/wized.d.ts`
Extends React's HTML attribute types to allow Wized and Finsweet custom attributes in JSX without TypeScript errors.

| Attribute | Applied to | Purpose |
|---|---|---|
| `wized` | All elements | Wized data binding identifier |
| `wized-cloak` | All elements | Hides element until Wized populates it |
| `wized-loader` | All elements | Loading spinner indicator |
| `filter`, `sort` | HTML + anchor | Finsweet CMS filter/sort controls |
| `precision`, `count` | HTML + anchor | Numeric display helpers |
| `crl`, `params` | HTML + anchor | CRL-specific Wized params |
| `qb-filter` | All elements | Query-builder filter |
| `fs-cmsload-element` | All elements | Finsweet CMS load |
| `fs-cmssort-field` | All elements | Finsweet CMS sort field |
| `fs-cmsfilter-element` | All elements | Finsweet CMS filter element |

---

## 12. External Integrations

| Service | Purpose | How |
|---|---|---|
| **Google Tag Manager** `GTM-TJLXMGC` | Analytics & conversion tracking | Inline `<Script>` in root layout |
| **Webflow JS** | Legacy interactions (tabs, sliders, etc.) | 2 CDN chunks in root layout |
| **jQuery 3.5.1** | Required by Webflow JS | CDN `<Script>` (beforeInteractive) |
| **Wized** | Form handling & CMS data binding | Custom HTML attrs + CDN script |
| **Finsweet** | CMS filter/sort on CRL pages | Custom HTML attrs |
| **Webflow CDN** | All site images | `next/image` with domain whitelist |
| **Google Fonts** | Montserrat | `next/font/google` |
| **Google Search Console** | Site verification | Meta verification tag |
| **Pinterest** | Domain verify | `p:domain_verify` meta tag |
| **Instagram** | Social | `https://www.instagram.com/homematch.sg/` |
| **Email/Contact** | Contact | `https://hello.homematch.sg` |
| **Get Matched form** | Lead gen CTA | `https://get.homematch.sg/?utm_source=Website&...` |
| **Ask HomeMatch** | Q&A | `https://ask.homematch.sg/` |

---

## 13. Key Architecture Notes

### Base-Site-as-Database Pattern
The app uses the original Webflow site's HTML files as its content source:
- Webflow HTML files live on disk at `SITE_ROOT`
- `lib/parseContractorHtml.ts` and `lib/guideContent.ts` read those files at request time (server-side)
- Parsed/extracted data becomes props passed to React client components

> ⚠️ **Deployment note**: `SITE_ROOT` is hardcoded to a local Windows path in both lib files. For production deployment, the base HTML files must be bundled into the app or migrated to a proper CMS/database, and the path updated accordingly.

### Webflow CSS Class Preservation
Webflow-originated class names (e.g. `w-nav`, `w-container`, `w-inline-block`) are preserved throughout JSX to maintain compatibility with the loaded Webflow JS bundles. Tailwind utility classes are layered on top where needed.

### Image Strategy
All images are served from Webflow's CDN. `next/image` is used with `unoptimized: true`. The `public/` directory only contains default Next.js placeholder SVGs.

### Animation Strategy
All GSAP animations are centralized in `useGSAPAnimations.ts`. The hook is invoked once via `<AnimationProvider>` at the top of the homepage. CSS selectors mirror the original Webflow class names exactly.

### UTM Tracking on CTAs
All primary CTA links include UTM parameters:
```
https://get.homematch.sg/?utm_source=Website&utm_medium=menu&utm_campaign=Get+Matched
```
