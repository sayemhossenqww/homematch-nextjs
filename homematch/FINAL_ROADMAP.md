# HomeMatch — Final Master Roadmap

> **Project**: Combined HomeMatch.sg + Sixides.com → Singapore's #1 renovation platform
> **Stack**: Next.js 15 (App Router) · TypeScript · Tailwind CSS · GSAP · Resend · Vercel
> **Target**: 41 pages · 100+ firms · 1,400+ projects · 150+ articles

---

## 1. Tech Stack

| Layer | Tool | Purpose |
|---|---|---|
| Framework | Next.js 15 (App Router) | SSR, ISR, file routing |
| Language | TypeScript | Type-safe data layer |
| Styling | Tailwind CSS v4 | Utility-first responsive CSS |
| Animation | GSAP 3 + ScrollTrigger | Premium scroll animations |
| Fonts | Plus Jakarta Sans + Inter | Modern premium typography |
| Icons | Lucide React | Consistent icon set |
| Charts | Recharts | Firm project-type pie charts |
| Forms | React Hook Form + Zod | Validated, real-time forms |
| Articles | MDX + gray-matter | Markdown-based CMS |
| Email | Resend | Form submission emails |
| Auth | NextAuth.js | User accounts |
| Deploy | Vercel | Edge, ISR, CI/CD |
| Analytics | GTM + GA4 | Tracking |

---

## 2. Folder Structure

```
src/
├── app/                   ← All 41 pages
├── components/
│   ├── layout/            ← Navbar, Footer, FloatingButtons
│   ├── home/              ← 12 homepage sections
│   ├── firms/             ← FirmCard, Profile, Gallery, Chart, Reviews
│   ├── vendors/           ← VendorCard, Profile
│   ├── inspirations/      ← InspirationCard, Grid, Filters, Detail
│   ├── articles/          ← ArticleCard, Body, Related
│   ├── stories/           ← VideoCard, Embed
│   ├── tools/             ← Calculator, Quiz, Checklist, Compare, Board
│   └── shared/            ← Badge, StarRating, Breadcrumb, SidebarCta
├── data/
│   ├── firms.ts           ← 100+ firm records
│   ├── vendors.ts         ← 50+ vendor records
│   ├── projects.ts        ← 1,400+ inspiration projects
│   └── stories.ts         ← Video episode records
├── content/articles/      ← *.mdx article files
├── lib/                   ← getFirms, getProjects, email helpers
└── types/                 ← firm.ts, vendor.ts, project.ts, article.ts
```

---

## 3. All 41 Pages

### Core Traffic Pages
| Page | URL | Key Sections |
|---|---|---|
| **Homepage** | `/` | Hero · Trust strip · Why Us · How It Works · Featured Firms · Masonry Gallery · Vendors · Articles · Testimonials · CaseTrust stamp · FAQ · Bottom CTA |
| **Find My ID** | `/find-my-id` | Trust left panel · 3-step form (Property → Reno → Contact) · Thank you page |
| **Firm Directory** | `/firms` | Search · 7-group sidebar filters · 3-col card grid |
| **Firm Profile** | `/firms/[slug]` | Stats bar · Bio · Pie chart · Graded badges · Accreditations · Gallery strip · Reviews · Enquiry form sidebar |
| **Firm Gallery** | `/firms/[slug]/gallery` | Filter bar · Masonry grid · Lightbox with project details |
| **Vendor Directory** | `/vendors` | Search · 8 category tabs · Brand card grid |
| **Vendor Profile** | `/vendors/[slug]` | Header · Graded badges · Bio · Reviews · Related articles · Enquiry form |
| **Inspirations Gallery** | `/inspirations` | Sticky 5-filter bar · Masonry grid · Load more |
| **Project Detail** | `/inspirations/[slug]` | Photo gallery · Stats bar · Room tabs · Firm card · Tags · Similar projects · CTA |
| **Before & After** | `/before-after` | Drag-slider transformations grid |

### Content Pages
| Page | URL | Key Sections |
|---|---|---|
| **Articles Hub** | `/articles` | Search · Category tabs · Featured article · 3-col grid · Newsletter |
| **Article Page** | `/articles/[slug]` | Breadcrumb · MDX body + inline CTAs · Tags · Sidebar (match CTA + budget widget) · Related articles |
| **Stories Hub** | `/stories` | Series filter tabs · Featured episode · 3-col video grid |
| **Story Episode** | `/stories/[series]/[slug]` | YouTube embed · Episode details · Guest bio · Related episodes |
| **Reviews Hub** | `/reviews` | Platform aggregate stats · Filterable review feed · Verified badge explanation |

### Tools Pages
| Page | URL | Feature |
|---|---|---|
| **Budget Calculator** | `/tools/budget-calculator` | Property/room/finishes inputs → live S$ estimate output |
| **Style Quiz** | `/tools/style-quiz` | 8 visual A/B questions → style result → pre-fills Find My ID |
| **Renovation Checklist** | `/tools/renovation-checklist` | Interactive checklist · Save to dashboard · PDF export |
| **Compare Firms** | `/tools/compare` | Select 2–3 firms → side-by-side table |
| **Inspiration Board** | `/tools/inspiration-board` | Save photos into named boards · Share link with firms |

### SEO Landing Pages
| Page | URL | Target keyword |
|---|---|---|
| **HDB Guide Hub** | `/guides/hdb-renovation` | "hdb renovation singapore guide" |
| **Renovation Timeline** | `/guides/renovation-timeline` | "how long does renovation take singapore" |
| **Renovation Cost Guide** | `/guides/renovation-cost` | "renovation cost singapore 2025" |
| **HDB Landing** | `/renovate/hdb` | "hdb renovation singapore" |
| **Condo Landing** | `/renovate/condo` | "condo renovation singapore" |
| **Landed Landing** | `/renovate/landed` | "landed property renovation singapore" |
| **Location Pages (×20)** | `/renovate/[district]` | "interior designer [estate] singapore" |
| **Style Pages (×19)** | `/styles/[slug]` | "[japandi] interior design singapore" |
| **Styles Explained** | `/styles-explained` | "interior design styles singapore" |

### Trust & Info Pages
| Page | URL | Purpose |
|---|---|---|
| **Badges** | `/badges` | Full badge system + government accreditations explained |
| **CaseTrust** | `/casetrust` | CaseTrust meaning + full firm list |
| **Safest-Smartest** | `/safest-smartest` | HomeMatch's unique 5-guarantee differentiator |
| **Showroom Finder** | `/showrooms` | Map + showroom hours for all firms/vendors |

### Platform Pages
| Page | URL | Purpose |
|---|---|---|
| **About** | `/about` | Story, mission, press, partnerships |
| **Contact** | `/contact` | Two channels: homeowners vs partners |
| **How It Works / Partner** | `/how-it-works` | ID/vendor onboarding, badge requirements, listing packages |
| **Partner Apply** | `/partner/apply` | Application form for ID firms and vendors |
| **Help Center** | `/help` | FAQ by category + search |
| **Awards** | `/awards` | Press coverage, DOTM archive |
| **Press / Media** | `/press` | Press kit, releases, contact |
| **Newsletter** | `/community` | Subscribe, past issues |
| **Login / Sign Up** | `/login` | NextAuth email + Google/Facebook |
| **Dashboard** | `/dashboard` | Shortlist · Enquiries · Saved projects · Profile |

### Legal Pages
| Page | URL |
|---|---|
| Privacy Policy | `/privacy-policy` |
| Terms of Use | `/terms-of-use` |
| Cookie Policy | (embedded in privacy policy) |
| Sitemap (human) | `/sitemap` |
| 404 | `/not-found` (custom branded) |
| 500 | `error.tsx` (custom branded) |

---

## 4. Global UX Rules (Every Page)

| Rule | Detail |
|---|---|
| **WhatsApp button** | Fixed bottom-right, all screens — pre-filled message |
| **Mobile bottom nav bar** | Home · Firms · Photos · Articles · Find My ID |
| **Breadcrumb** | Every inner page: `Home > Section > Page` |
| **Min 1 Find My ID CTA** | At least one CTA per page linking to `/find-my-id` |
| **GSAP animations** | Staggered card reveals on scroll, header fade-ins |
| **Form validation** | Real-time inline, not on submit |
| **Loading states** | Skeleton loaders on all data sections |
| **Empty filter state** | "No results. Try adjusting filters or [Find My ID]" |
| **OG image** | Auto-generated per page via `/api/og` |
| **ISR on data pages** | `revalidate: 3600` on firm/vendor/project pages |

---

## 5. Key API Routes

| Route | Method | Function |
|---|---|---|
| `/api/find-my-id` | POST | Send lead to admin + confirmation to user |
| `/api/enquiry` | POST | Firm/vendor enquiry to firm email |
| `/api/newsletter` | POST | Add to mailing list |
| `/api/review` | POST | Submit homeowner review |
| `/api/og` | GET | Dynamic OG image generation |
| `/api/auth/[...nextauth]` | ALL | Auth (NextAuth) |

---

## 6. TypeScript Core Types

```typescript
// Firm
interface Firm {
  id: string; slug: string; name: string
  address: string; district: string; bio: string
  established: number; rating: number; reviewCount: number
  avgBudget: number; responseTime: string
  projectTypes: { hdb: number; condo: number; landed: number; commercial: number }
  styles: DesignStyle[]; badges: FirmBadge[]
  accreditations: Accreditation[]; reviews: Review[]
  isCaseTrust: boolean; isFeatured: boolean
}

// Project
interface Project {
  id: string; slug: string; title: string
  firmSlug: string; photos: ProjectPhoto[]
  propertyType: 'HDB'|'Condo'|'Landed'|'Commercial'
  bedrooms: number; sqft: number; budget: number
  style: DesignStyle; rooms: RoomType[]; tags: string[]
}

// Article (MDX frontmatter)
interface Article {
  slug: string; title: string; category: ArticleCategory
  tags: string[]; publishDate: string; readTime: number
  heroImage: string; excerpt: string; isFeatured: boolean
}

// Review
interface Review {
  id: string; reviewerName: string; rating: number
  body: string; date: string; designerName?: string
  propertyType?: string; renovationBudget?: number; isVerified: boolean
}
```

---

## 7. SEO Strategy

| Type | Implementation |
|---|---|
| Metadata | `export const metadata` per page file |
| OG images | `/api/og` — dynamic, branded per page |
| JSON-LD | Per page type (LocalBusiness, Article, FAQPage, HowTo, etc.) |
| Sitemap | `next-sitemap` — auto-generates XML |
| Canonical | Set on all pages |
| Priority pages | `/guides/renovation-cost` · `/guides/hdb-renovation` · `/firms` · `/inspirations` · `/styles/[slug]` · `/renovate/[district]` |

---

## 8. Development Phases & Timeline

| Phase | Work | Time |
|---|---|---|
| **1** | Next.js init · design tokens · Navbar · Footer · floating buttons | Week 1 |
| **2** | Homepage — all 12 sections | Week 1–2 |
| **3** | Firm directory + profile page + sidebar enquiry form | Week 2–3 |
| **4** | Firm gallery page · lightbox · room filters | Week 3 |
| **5** | Inspirations gallery · project detail page · all 5 filters | Week 3–4 |
| **6** | Articles — MDX setup · hub · article page · categories | Week 4 |
| **7** | Stories hub · episode page · YouTube embed | Week 4–5 |
| **8** | Vendor directory · vendor profile | Week 5 |
| **9** | Find My ID form — 3 steps · Resend email · thank you page | Week 5 |
| **10** | Budget Calculator · Style Quiz · Renovation Checklist | Week 5–6 |
| **11** | Compare Firms · Inspiration Board | Week 6 |
| **12** | Trust pages: Badges · CaseTrust · Safest-Smartest | Week 6 |
| **13** | Style pages (×19) · Styles Explained · Before & After | Week 6–7 |
| **14** | HDB/Condo/Landed landing pages · Location SEO pages (×20) | Week 7 |
| **15** | Cost Guide · Timeline Guide · HDB Guide Hub · Reviews Hub | Week 7 |
| **16** | Supporting pages: About · Contact · Partner Apply · Help · Press | Week 7–8 |
| **17** | Auth (NextAuth) · Dashboard + all sub-pages | Week 8 |
| **18** | SEO: metadata · sitemaps · JSON-LD · OG images | Week 8 |
| **19** | GSAP animations · micro-interactions · mobile polish | Week 8–9 |
| **20** | Data population: 20 firms · 50 projects · 15 articles | Week 9 |
| **21** | QA · performance audit · Core Web Vitals fixes | Week 9–10 |
| **22** | Deploy to Vercel · GTM/GA4 · custom domain · launch | Week 10 |

---

## 9. Data Population Priority

### Launch-Critical (must have before go-live)
- [ ] 20 firm profiles (full: bio, photos, badges, reviews, project split)
- [ ] 60 inspiration project photos (3 per firm)
- [ ] 15 priority articles (cost guide, timeline, HDB rules, style guides, red flags)
- [ ] 8 vendor profiles (1 per category)
- [ ] 5 video episodes (YouTube IDs + descriptions)
- [ ] All FAQ content
- [ ] All badge descriptions
- [ ] All 19 style descriptions + sample photos

### Post-Launch Scale-Up (3 months)
- [ ] Grow to 100+ firm profiles
- [ ] Grow to 500+ inspiration projects
- [ ] Grow to 60+ articles
- [ ] Grow to 30+ vendor profiles
- [ ] Add 20+ location SEO pages
- [ ] Add all 19 style landing pages

---

## 10. Launch Checklist

**Functionality**
- [ ] Find My ID form sends email + confirmation
- [ ] All firm enquiry forms working
- [ ] Budget calculator gives correct ranges
- [ ] Style quiz pre-fills Find My ID
- [ ] Login, sign-up, dashboard working
- [ ] Inspiration board save/share working

**Content**
- [ ] 20+ firm profiles with real data
- [ ] 60+ project photos uploaded
- [ ] 15+ articles published
- [ ] All trust pages complete

**SEO & Performance**
- [ ] Unique title + meta description on every page
- [ ] OG image on every page
- [ ] Sitemap.xml submitted to Google Search Console
- [ ] Core Web Vitals: LCP < 2.5s · CLS < 0.1 · INP < 200ms
- [ ] All JSON-LD schemas validated

**Compliance**
- [ ] Privacy Policy + Terms of Use live
- [ ] Cookie consent banner working
- [ ] PDPA-compliant data handling

**Deployment**
- [ ] Vercel deployment live
- [ ] Custom domain connected (homematch.sg)
- [ ] GTM + GA4 firing correctly
- [ ] WhatsApp button with correct number
