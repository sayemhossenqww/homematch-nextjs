# Page Specifications — Extended (Part 2)

> Continuation of [page-specifications.md](file:///C:/Users/Sayem%20Hossen/.gemini/antigravity/brain/7c59cd19-e8f6-4e6f-9651-754fffb4ad5d/page-specifications.md). Covers new pages + deeper detail layers.

---

## Page 23: User Dashboard (`/dashboard`)

> After login, homeowners get a personal renovation hub.

### Sub-pages
- `/dashboard` — Overview
- `/dashboard/shortlist` — Saved firms
- `/dashboard/enquiries` — Sent enquiries + status
- `/dashboard/projects` — Saved inspiration projects
- `/dashboard/articles` — Bookmarked articles
- `/dashboard/profile` — Personal settings

### Dashboard Overview Layout
```
Welcome back, [Name] 👋

Your Renovation Journey
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Not Started] → [Finding Firms] → [Comparing] → [Signed] → [Renovating] → [Done]
                      ▲ You are here

Quick Actions:
[📋 Find My ID]  [📸 Browse Projects]  [📐 Budget Calc]  [🎨 Style Quiz]
```

### Shortlist Panel
- Saved firm cards with: logo · rating · badge count · `[View]` `[Enquire]` `[Remove]`
- "Compare 2 firms side-by-side" button (appears when 2+ saved)

### Firm Comparison Modal
Table comparing 2 firms side by side:
| Field | Firm A | Firm B |
|---|---|---|
| Rating | ★ 4.8 | ★ 4.6 |
| Reviews | 42 | 18 |
| HDB Specialist | ✅ | ✅ |
| CaseTrust | ✅ | ✅ |
| Avg Budget | S$65K | S$55K |
| Response Time | < 2hr | < 4hr |

### Enquiries Panel
Each sent enquiry:
- Firm name + logo
- Date sent
- Status: `[Sent]` `[Replied]` `[Meeting Booked]` `[Proposal Received]`
- `[View Firm]` button

### Profile Settings
- Name, email, phone (editable)
- Property details (saved from Find My ID form)
- Notification preferences: Email · WhatsApp
- Delete account option

---

## Page 24: Login / Sign Up (`/login`)

### Layout: Centred card, split tabs

```
[Sign In]    [Create Account]

──── Sign In ────
Email:    [_____________]
Password: [_____________]
          [Forgot password?]

[Sign In →]

────────── or ──────────
[Continue with Google]
[Continue with Facebook]

Don't have an account? [Create one →]
```

### Create Account tab
```
Full Name:        [_____________]
Email:            [_____________]
Password:         [_____________]
Confirm Password: [_____________]
I am a:  [Homeowner]  [Interior Designer]  [Vendor]

☐ I agree to the Terms of Use and Privacy Policy
☐ Send me helpful renovation tips (optional)

[Create Account →]
```

### Post-login redirect
- If homeowner → `/dashboard`
- If firm/vendor → `/partner-portal` (future)

---

## Page 25: Renovation Timeline Guide (`/guides/renovation-timeline`)

> One of the most searched renovation questions. High SEO value.

### SEO
- `<title>`: Singapore HDB Renovation Timeline — How Long Does It Take? | HomeMatch
- `<description>`: Full month-by-month renovation timeline for Singapore homeowners. From BTO key collection to move-in — everything you need to know.

### Page Sections

**A — Hero**
```
H1: Your Complete Singapore Renovation Timeline

From key collection to move-in — here's exactly what to expect,
month by month.

Average renovation time: 8–16 weeks
```

**B — Interactive Timeline (horizontal scroll on mobile)**

| Stage | When | Duration | What Happens |
|---|---|---|---|
| 🔑 Keys Collected | Month 0 | 1 day | Pick up keys from HDB/developer |
| 📐 Planning | Month 0–1 | 2–4 weeks | Meet IDs, review proposals, sign contract |
| 📋 Permits | Month 1 | 1–2 weeks | ID submits HDB renovation permit |
| 🔨 Hacking | Month 1–2 | 1–2 weeks | Demolition, hacking existing structures |
| 🧱 Structure | Month 2 | 2–3 weeks | Masonry, waterproofing, tiling |
| ⚡ M&E Works | Month 2–3 | 2–3 weeks | Electrical, plumbing, air-con trunking |
| 🪵 Carpentry | Month 3–4 | 3–4 weeks | Cabinets, wardrobes, built-ins |
| 🎨 Painting | Month 4 | 1 week | Painting walls + ceilings |
| 🚿 Fittings | Month 4–5 | 1 week | Install fixtures, sanitary fittings, doors |
| ✨ Finishing | Month 5 | 1 week | Touch-ups, cleaning, snagging list |
| 🏠 Move In | Month 5–6 | 1 day | Move furniture, accessorise |

**C — Step-by-Step Explainer**
For each stage, a collapsible section with:
- What work happens
- What homeowner needs to do
- Common delays to watch out for
- Cost incurred at this stage

**D — Timeline Calculator Widget**
```
When do you collect your keys?
[Month ▾] [Year ▾]

Your estimated move-in date: October 2025

[📋 Find an ID to Start Planning →]
```

**E — Common Delays**
- HDB permit processing: +1–2 weeks
- Material lead times (custom carpentry): +2–4 weeks
- Contractor availability: +1–3 weeks
- Defect rectification: +1–2 weeks

**F — Renovation Permit Info**
- What requires an HDB permit
- How long it takes
- Who submits it (your ID)
- Link to HDB official portal

**G — CTA bottom**
`[Find a Firm to Manage Your Timeline →]`

---

## Page 26: HDB Renovation Guide Hub (`/guides/hdb-renovation`)

### Sections

**A — Hero**
```
H1: The Complete HDB Renovation Guide for Singapore Homeowners

Everything you need to know before, during, and after renovating your HDB flat.
```

**B — Guide Index (card grid)**
| Guide | Description |
|---|---|
| HDB Renovation Permit | What needs approval, how to apply |
| HDB Approved Contractors | Only registered firms can do structural work |
| What You Can and Cannot Do | BTO restrictions, floor, walls, windows |
| Understanding the OCS | HDB's Optional Component Scheme |
| Noise Rules & Work Hours | Legal renovation hours in Singapore |
| HDB Defect Liability Period | What HDB covers, what you must fix |
| Fire Safety Requirements | Sprinklers, hose reels, false ceilings |
| Waterproofing Rules | Bathroom waterproofing requirements |

**C — HDB Rules Quick Reference**

| Action | Allowed? | Permit Needed? |
|---|---|---|
| Hack non-structural walls | ✅ | ✅ Yes |
| Hack structural walls | ❌ Never | — |
| Change flooring | ✅ | ❌ No |
| Install false ceiling | ✅ | ✅ Yes |
| Change window grilles | ✅ | ✅ Yes |
| Enclose balcony | ✅ | ✅ Yes |
| Change main door | ✅ | ✅ Yes |
| Install split-unit aircon | ✅ | ❌ No |
| Add electrical points | ✅ | ✅ Yes |

**D — CTA**
```
Working with an HDB Registered firm handles all permits for you.

[Browse HDB-Registered Firms →]    [Find My ID — Free →]
```

---

## Page 27: Property-Type Landing Pages

> Three SEO landing pages targeting specific homeowner segments.

### `/renovate/hdb`
**H1**: HDB Renovation in Singapore — Find Your Designer

**Unique sections**:
- HDB-specific cost table (2-room to Executive)
- HDB permit process explained briefly
- Filter showing only HDB-specialist firms
- HDB project inspiration grid
- "3 things to check before hiring for HDB renovation"
- CaseTrust + HDB Registered requirement call-out

### `/renovate/condo`
**H1**: Condo Renovation in Singapore — Premium Interior Designers

**Unique sections**:
- Condo-specific cost table (1BR to penthouse)
- MCST approval process (condo management committee)
- What's different about condo renovation vs HDB
- Condo project inspiration grid
- Condo-specialist firm cards

### `/renovate/landed`
**H1**: Landed Property Renovation in Singapore — Find Specialist Designers

**Unique sections**:
- Landed property types (terrace, semi-D, bungalow)
- Structural vs non-structural works
- Cost ranges (S$150K–S$800K+)
- A&A (Additions & Alterations) permit process
- Landed specialist firm directory

---

## Page 28: Location-Based SEO Pages (`/renovate/[district]`)

> Target "interior designer [estate]" keywords — highest commercial intent.

### URL pattern: `/renovate/bishan` `/renovate/tampines` etc.

### Locations to cover (top 20 HDB estates):
Ang Mo Kio · Bedok · Bishan · Bukit Batok · Bukit Merah · Buona Vista · Clementi · Hougang · Jurong East · Jurong West · Kallang · Marine Parade · Pasir Ris · Punggol · Queenstown · Sembawang · Sengkang · Tampines · Toa Payoh · Woodlands · Yishun

### Each Location Page Template
```
H1: Interior Designers in [Bishan], Singapore

Find CaseTrust-certified interior design firms serving [Bishan]
and nearby estates (Ang Mo Kio, Toa Payoh, Sin Ming).

[Filter: Show firms near Bishan]

[Firm grid filtered to nearby firms]

[Inspiration projects from Bishan, Sin Ming, AMK]

Popular in [Bishan]: Contemporary · Japandi · Minimalist

Avg renovation budget in [Bishan] area: S$55,000 – S$80,000
```

---

## Page 29: Style-Specific Landing Pages (`/styles/[slug]`)

> SEO pages targeting "[style] interior design Singapore".

### URL pattern: `/styles/japandi` `/styles/contemporary` etc.

### Each Style Page Template

```
H1: Japandi Interior Design in Singapore

The perfect blend of Japanese simplicity and Scandinavian warmth.
Discover Japandi-style projects, find specialist firms, and get inspired.

[Key stats: 47 Projects · 12 Specialist Firms]

── Featured Japandi Projects (6-photo masonry grid) ──

── What Is Japandi Style? (description) ──

── Key Design Elements ──
✦ Natural materials: wood, linen, stone
✦ Neutral earthy palette
✦ Low, functional furniture
✦ Negative space

── Japandi vs Similar Styles ──
| vs Minimalism | vs Scandinavian | vs Japanese |

── Firms Specialising in Japandi ──
[3 firm cards]

── Japandi Colours & Materials ──
Colour palette swatches | Material suggestions | Brand recommendations

── Japandi Articles ──
Related article cards

── CTA: Find a Japandi Specialist ──
[Take Style Quiz]    [Find My ID — Japandi Style →]
```

---

## Page 30: Showroom Finder (`/showrooms`)

> Help homeowners plan showroom visits before renovation decisions.

### Sections

**A — Hero**
```
H1: Interior Design Showrooms in Singapore

Plan your showroom visits. See materials, finishes, and furniture in person.

Search: [Location or brand name...]
Filter: [Area ▾] [Category ▾] [Open Now]
```

**B — Showroom Map** (Google Maps embed)
Markers for firm showrooms + vendor showrooms across Singapore

**C — Showroom Listing (card grid)**

Each ShowroomCard:
```
[Showroom Photo]
[Brand/Firm Name]   [Category: Materials / ID Studio]
📍 26 Sin Ming Ln, #01-112
⏰ Mon–Sat: 10am–7pm  |  Sun: By Appointment
📞 +65 xxxx xxxx
[Get Directions →]    [View Profile →]
```

**D — Visit Tips**
- "Bring your floor plan"
- "Ask about lead times for custom pieces"
- "Get material samples to bring home"
- "Book an appointment to avoid wait times"

---

## Page 31: Help Center / FAQ Hub (`/help`)

### Sections

**A — Search**
```
H1: How can we help?
[Search FAQs and guides...]
```

**B — FAQ Categories (card grid with icons)**

| Category | Topics |
|---|---|
| 🔍 About HomeMatch | What it is, how it works, pricing, privacy |
| 📋 Find My ID | Form help, what to expect, timeline |
| 🏠 Renovation Basics | Permits, timeline, what firms do |
| 💰 Costs & Budget | How much things cost, payment terms |
| 🏅 CaseTrust | What it is, why it matters, how to verify |
| 🔐 Accounts | Login, dashboard, privacy, data deletion |
| ⭐ Reviews | How reviews work, how to leave one |
| 🏢 For Firms | How to list, badge requirements, costs |

**C — Popular Questions (quick accordion)**
Top 10 most clicked questions shown immediately on page

**D — Contact Bar**
```
Still need help?
[💬 WhatsApp Us]    [📧 Email Us]    [📞 Call Us]
```

---

## Page 32: Awards & Recognition (`/awards`)

> Social proof through industry recognition. Builds credibility.

### Sections

**A — Hero**
```
H1: Awards & Recognition

HomeMatch's commitment to trust and quality, recognised by
Singapore's home renovation industry.
```

**B — Platform Awards** (if applicable)
- Best Renovation Platform (year)
- CaseTrust Association Member
- MCI-Approved Publication

**C — Featured in Press**
Embedded article thumbnails / screenshots:
- AsiaOne: "Powering Interior Design with AI"
- Yahoo Finance: same article
- Daily Cuts: "A Made in SG Platform"
- 新明日报: CSR coverage

**D — Designer of the Month Archive**
Monthly gallery of featured designers.
Each DOTM entry: Firm name · Month · Style · Featured project photo · `[View Firm →]`

**E — Our Verified Firm Count over time**
Simple stat: "100+ firms verified. 0 blacklisted firms on our platform."

---

## Page 33: Press / Media (`/press`)

### Sections

**A — Press Contact**
```
For press and media inquiries:
📧 press@homematch.sg
📞 +65 xxxx xxxx (Media Hotline)
```

**B — Press Kit Download**
- HomeMatch logo (PNG, SVG, various backgrounds)
- Brand colours + fonts
- Company boilerplate text
- Founder bio + photo
- [Download Press Kit (.zip)]

**C — Press Releases** (chronological list)
Each: Date · Headline · Brief · [Download PDF] [Read Online]

**D — Media Coverage**
Logo wall of publications that covered HomeMatch

---

## Page 34: Newsletter / Community (`/community`)

### Sections

**A — Hero**
```
H1: The HomeMatch Newsletter

Weekly renovation tips, design inspiration, and exclusive firm spotlights
— delivered to 10,000+ Singapore homeowners.

[Email address...]    [Subscribe Free →]

No spam. Unsubscribe anytime.
```

**B — What's Inside Each Edition**
- 1 featured renovation project (with budget + firm)
- 2 renovation tips
- 1 article deep-dive
- 1 featured firm spotlight
- 1 exclusive deal from a partner brand

**C — Past Issues Archive**
List of previous newsletter issues with date + headline

**D — Community Rules / What We Stand For**

---

## Page 35: Partner Application (`/partner/apply`)

> For ID firms and vendors to apply for HomeMatch listing.

### Sections

**A — Why List on HomeMatch?** (benefit bullets)
- Access to 3,000+ homeowners per month looking for IDs
- Lead gen through Find My ID matching
- Free basic listing + paid badge tiers
- Co-marketing opportunities (DOTM, articles, social)

**B — Requirements to Join**
For ID Firms:
- ✅ HDB Registered Renovator number
- ✅ CaseTrust Certification (or in process)
- ✅ Minimum 5 completed projects with photos
- ✅ At least 3 verifiable homeowner reviews
- ✅ Singapore business registration (UEN)

For Vendors/Brands:
- ✅ Singapore business registration
- ✅ Showroom or e-commerce presence
- ✅ At least 3 verifiable customer reviews
- ✅ Product/service relevant to home renovation

**C — Listing Packages**

| Tier | Price | Features |
|---|---|---|
| **Basic** | Free | Profile listing, 5 project photos, 0 badges |
| **Verified** | S$XXX/yr | Annual audit, Verified Badge, unlimited photos, priority listing |
| **Featured** | S$XXX/yr | All Verified + Featured on homepage, Find My ID priority matching, DOTM eligibility |

**D — Application Form**
```
I am applying as: [ID Firm]  [Vendor/Brand]

Company Name:        [_________]
UEN Number:          [_________]
CaseTrust Number:    [_________]  (ID firms only)
HDB Reg Number:      [_________]  (ID firms only)
Website:             [_________]
Contact Person:      [_________]
Email:               [_________]
Phone:           +65 [_________]
How many project photos do you have? [_________]
Brief about your firm: [_____multiline_____]
Upload: Company profile / portfolio PDF [📎]

[Submit Application →]
```

---

## Page 36: Renovation Cost Guide (`/guides/renovation-cost`)

> Highest commercial-intent SEO page. Prime CTA target.

### Structure

**A — Hero**
```
H1: How Much Does Renovation Cost in Singapore? (2025 Guide)

Actual cost ranges from 500+ real projects on HomeMatch, updated quarterly.
```

**B — Quick Cost Table** (top of page for instant value)

| Property Type | Basic | Mid-Range | Premium |
|---|---|---|---|
| HDB 2-room | S$20K–35K | S$35K–55K | S$55K–100K |
| HDB 3-room | S$25K–45K | S$45K–70K | S$70K–130K |
| HDB 4-room | S$35K–60K | S$60K–90K | S$90K–160K |
| HDB 5-room | S$45K–75K | S$75K–120K | S$120K–200K |
| HDB Executive | S$55K–90K | S$90K–140K | S$140K–250K |
| Condo 1BR | S$30K–50K | S$50K–90K | S$90K–180K |
| Condo 2BR | S$40K–70K | S$70K–120K | S$120K–250K |
| Condo 3BR | S$55K–90K | S$90K–150K | S$150K–350K |
| Landed (terrace) | S$100K–200K | S$200K–400K | S$400K–800K |

**C — Room-by-Room Breakdown**
Collapsible sections per room:
- Living + Dining Room: what's included at each tier
- Kitchen: wet/dry kitchen costs, cabinet types, countertop materials
- Master Bedroom: wardrobe, bed platform, accent wall
- Bathroom: waterproofing, fittings, tiles
- Common Bedrooms
- Study

**D — What Affects Cost?**
- Floor area (bigger = more)
- Material finishes (laminate vs solid wood vs marble)
- Complexity of design (bespoke vs standard)
- Amount of hacking required
- ID firm tier (boutique vs large firm)
- Location of property (access difficulty)

**E — Hidden Costs to Budget For**
- Furniture + accessories: +S$10K–50K
- Appliances: +S$5K–20K
- Curtains + blinds: +S$2K–8K
- Air conditioning: +S$3K–8K
- Moving costs: +S$500–2K
- Storage during renovation: +S$300–800/month

**F — Budget Calculator CTA**
```
📐 Get Your Personal Estimate

[Try the Budget Calculator →]    [Get 6 Firm Quotes — Free →]
```

**G — Real Project Cost Examples** (5 case studies)
Each: Property type · Design style · Total cost · What was done · Firm name + link

---

## Page 37: Before & After Gallery (`/before-after`)

> High engagement content. Showes transformation power.

### Sections

**A — Hero**
```
H1: Before & After Renovation Transformations

See how Singapore homes are completely transformed.
Real projects. Real budgets. Real results.
```

**B — Before/After Slider Grid**
Each card: Split-screen drag slider (left = before, right = after)
- Firm name + project details on hover
- Budget badge

**C — Filter by Property Type**
HDB · Condo · Landed

**D — CTA**
```
Want this kind of transformation?
[Find My ID — Get 6 Matched Firms →]
```

---

## Page 38: Renovation Checklist (`/tools/renovation-checklist`)

> Interactive tool that homeowners can use and share/download.

### Interactive Checklist Sections

**Pre-Renovation (6 months before)**
- [ ] Finalise budget range
- [ ] Research design styles
- [ ] Browse 5+ firm profiles
- [ ] Submit Find My ID form
- [ ] Shortlist 3 firms to meet
- [ ] Prepare list of must-haves vs nice-to-haves

**Firm Selection (3–4 months before)**
- [ ] Meet at least 3 firms
- [ ] Request itemised quotations
- [ ] Check all CaseTrust + HDB registrations
- [ ] Verify at least 5 reviews per firm
- [ ] Compare proposals side by side
- [ ] Sign contract with payment schedule

**During Renovation**
- [ ] Take photos of hacking stage (structural reference)
- [ ] Visit site weekly
- [ ] Track payment milestones
- [ ] Create snagging list before final payment

**After Renovation**
- [ ] Complete haze/dust clean-up
- [ ] Check all electrical points
- [ ] Check all plumbing and water flow
- [ ] Test AC units
- [ ] Leave a review for your firm on HomeMatch

**Feature**: Save progress to dashboard (if logged in) | Download as PDF

---

## Page 39: Compare Firms Tool (`/tools/compare`)

> Side-by-side comparison of any 2–3 firms.

### How It Works
1. Search + select Firm A
2. Search + select Firm B (optional Firm C)
3. Comparison table generated

### Comparison Table Fields
- Firm logo + name
- Rating (stars + number)
- Review count
- HDB Specialist · Condo Specialist
- CaseTrust certified
- HDB Registered
- HomeMatch badges (listed)
- Project type split (mini pie charts)
- Estimated average budget
- Avg response time
- Years established
- [Enquire] button per firm

---

## Page 40: Design Inspiration Board (`/tools/inspiration-board`)

> Homeowners can save + organise photos (like a Pinterest board).

### Features
- Browse inspirations and click ❤️ to save to board
- Organise into boards: "Kitchen Ideas" / "Living Room" / "Bathroom"
- Share board as public link
- Share board with firms when enquiring
- Requires login

---

## Page 41: Renovation Reviews Hub (`/reviews`)

> Aggregate all reviews across HomeMatch. Trust signal.

### Sections

**A — Overall Platform Stats**
```
⭐ 4.8 / 5.0 — based on 1,247 verified reviews

★★★★★  1,089 reviews
★★★★☆    132 reviews
★★★☆☆     19 reviews
★★☆☆☆      5 reviews
★☆☆☆☆      2 reviews
```

**B — Review Feed (filterable)**
Filter by: Firm · Property Type · Style · Budget Range · Star Rating

Each review card: reviewer name · date · property type · firm name · review text · star rating

**C — How Reviews Are Verified**
"All reviews on HomeMatch are from homeowners who submitted an enquiry through our platform. Reviews cannot be purchased or posted anonymously."

**D — Leave a Review CTA**
`[Leave a Review for Your Firm →]` → links to `/reviews/submit`

---

## Global Features Deep Spec

### Search (Site-Wide)
**URL**: `/search?q=[query]`

**Searches across**:
- Firm names
- Vendor names
- Article titles
- Project names (style + location)
- Style names

**Results grouped by type**: Firms · Projects · Articles · Vendors

---

### Notification System (Post-Login)
When logged in, bell icon in nav shows notifications:
- "Calibrate Design replied to your enquiry"
- "3 new Japandi projects added"
- "New article: Renovation Timeline Guide"
- "Your Find My ID match is ready"

---

### Cookie Banner
On first visit, bottom-of-screen banner:
```
🍪 We use cookies to improve your experience.
[Accept All]  [Manage Preferences]  [Decline Non-Essential]
```

---

### 404 Page (`/not-found`)
```
[Illustration: confused homeowner in empty room]

Oops! This page is under renovation.

The page you're looking for doesn't exist or has moved.

[Browse Firms →]    [See Projects →]    [Go Home →]

Still can't find what you need?
[Contact Us →]
```

---

### 500 Error Page
```
[Illustration: construction sign]

Something went wrong on our end.

Our team has been notified and we're fixing it.

[Reload Page]    [Go Home →]
```

---

## SEO Infrastructure Pages

### Sitemap Page (`/sitemap`) — HTML version for users
Not the XML sitemap but a human-readable sitemap showing:
- All main sections
- All article categories
- All style pages
- All property-type guides

### Robots.txt
```
User-agent: *
Allow: /
Disallow: /dashboard
Disallow: /api/
Disallow: /admin/
Sitemap: https://www.homematch.sg/sitemap.xml
```

### Structured Data (JSON-LD) per page type
| Page | Schema |
|---|---|
| Homepage | WebSite + Organization |
| Firm Profile | LocalBusiness + ReviewAggregator |
| Article | Article + BreadcrumbList |
| Project Page | ImageGallery + BreadcrumbList |
| FAQ Page | FAQPage |
| How It Works | HowTo |
| Location Pages | LocalBusiness + AreaServed |
| Cost Guide | HowTo |
| Comparison | DataTable |

---

## API Routes (Next.js Route Handlers)

| Route | Method | Purpose |
|---|---|---|
| `/api/enquiry` | POST | Send firm/vendor enquiry email |
| `/api/find-my-id` | POST | Send Find My ID form, email admin |
| `/api/newsletter` | POST | Add email to newsletter list |
| `/api/review` | POST | Submit a new review |
| `/api/auth/[...nextauth]` | GET/POST | NextAuth authentication |
| `/api/og` | GET | Dynamic OG image generation |
| `/api/firms` | GET | Firm data (ISR cached) |
| `/api/projects` | GET | Project data with filters |

---

## TypeScript Data Models (Complete)

### Firm
```typescript
interface Firm {
  id: string
  slug: string
  name: string
  logo: string
  bannerPhoto: string
  address: string
  district: string         // e.g. "Ubi, East Singapore"
  bio: string
  established: number      // Year founded
  teamSize: number
  rating: number           // 0.0 – 5.0
  reviewCount: number
  responseTime: string     // e.g. "< 2 hours"
  avgBudget: number        // S$ average project budget
  projectTypes: {
    hdb: number            // percentage 0-100
    condo: number
    landed: number
    commercial: number
  }
  styles: DesignStyle[]
  badges: FirmBadge[]
  accreditations: Accreditation[]
  reviews: Review[]
  featuredProjects: string[]  // Project slugs
  phone?: string
  email?: string
  website?: string
  whatsapp?: string
  showroomAddress?: string
  showroomHours?: string
  isCaseTrust: boolean
  hdbRegNo?: string
  casetrusNo?: string
  isFeatured: boolean
  isVerified: boolean
}
```

### Project (Inspiration)
```typescript
interface Project {
  id: string
  slug: string
  title: string
  firmSlug: string
  firmName: string
  photos: ProjectPhoto[]
  coverPhoto: string
  propertyType: 'HDB' | 'Condo' | 'Landed' | 'Commercial'
  hdbType?: '2-room' | '3-room' | '4-room' | '5-room' | 'Executive'
  bedrooms: number
  sqft: number
  budget: number
  style: DesignStyle
  rooms: RoomType[]
  location?: string
  district?: string
  completedYear?: number
  completedMonth?: number
  description?: string
  tags: string[]
}

interface ProjectPhoto {
  url: string
  room: RoomType
  alt: string
}
```

### Article
```typescript
interface Article {
  slug: string
  title: string
  subtitle: string
  category: ArticleCategory
  tags: string[]
  author: string
  publishDate: string
  updatedDate?: string
  readTime: number        // minutes
  heroImage: string
  excerpt: string
  content: string         // MDX content
  relatedArticles: string[]  // slugs
  relatedFirms?: string[]    // slugs
  relatedVendors?: string[]  // slugs
  seoTitle: string
  seoDescription: string
  isFeatured: boolean
}
```

### Review
```typescript
interface Review {
  id: string
  reviewerName: string
  reviewerAvatar?: string
  rating: number           // 1 – 5
  title?: string
  body: string
  date: string
  propertyType?: string
  renovationBudget?: number
  designerName?: string    // individual designer named
  isVerified: boolean
  helpfulCount: number
}
```
