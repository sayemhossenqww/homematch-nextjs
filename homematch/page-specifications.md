# Page-by-Page Specifications — HomeMatch × Sixides Combined Platform

> Every page is specified with: exact sections in order · content inside each section · features/interactivity · data required · CTAs · SEO metadata · smart UX decisions.

---

## Navigation (Global — appears on all pages)

### Desktop Navbar
```
[Logo: HomeMatch]    [Find Firms ▾] [Inspiration ▾] [Vendors ▾] [Articles ▾] [Stories ▾] [Tools ▾]    [Find My ID →] [Login]
```

**Dropdowns**:
- **Find Firms**: Browse All Firms · Browse by Badge · Browse by Style · CaseTrust Firms Only
- **Inspiration**: Browse All Projects · HDB Projects · Condo Projects · By Design Style · By Room Type
- **Vendors**: Browse All Brands · Materials · Furniture · Smart Home · Appliances · Lighting
- **Articles**: All Articles · House Hacks · HDB Guides · Design Trends · Smart Home · Consumer Protection · Budget Guides
- **Stories**: All Videos · The Designer Show · OpenHouse · Project Diaries · Reno Roadblock · Special Features
- **Tools**: Budget Calculator · Style Quiz

### Mobile Navbar
- Hamburger → full-screen drawer
- Sticky top bar: `[HomeMatch Logo]` `☰`
- Sticky bottom bar (mobile only): `[🏠 Home]` `[🔍 Firms]` `[📸 Photos]` `[📰 Articles]` `[📋 Find My ID]`

### Persistent Elements (All Screens)
- **WhatsApp Floating Button** (bottom-right, always visible): Opens WhatsApp with pre-filled message "Hi, I'd like help finding an interior designer for my home."
- **Find My ID Floating Bar** (appears after 300px scroll on homepage): compact "Match with 6 top firms → [Start Free]"

---

## Page 1: Homepage (`/`)

> **Purpose**: Convert first-time homeowners from discovery → Find My ID form. Bridge trust (CaseTrust) with richness (inspiration, articles, firms).

### SEO
- `<title>`: HomeMatch — Singapore's Most Trusted Interior Design Matching Platform
- `<description>`: Free matching with CaseTrust-certified interior designers in Singapore. Browse 100+ verified firms, 1,400+ renovation projects, and renovation guides.
- OG image: Hero photo with HomeMatch logo overlay

---

### Section 1 — Hero (Above the Fold)

**Layout**: Full-screen (100vh) with background photo + overlay

**Background**: High-quality Singapore home renovation photo (modern living room, natural light)

**Content**:
```
[Trust badge row: 🏆 CaseTrust Certified  ·  ✓ 100+ Verified Firms  ·  ⭐ 4.9/5 Rating]

H1: Find Your Perfect Interior Designer in Singapore

Subheadline: Singapore's only platform with CaseTrust-assured firms.
             Match with 6 top designers — free, in 24 hours.

[Find My ID — Free]    [Browse Inspiration →]

↓ Trusted by 3,000+ Singapore homeowners
```

**Features**:
- Hero photo: parallax scroll effect (slow background movement on desktop)
- CTA primary button: navy with gold border — links to `/find-my-id`
- CTA secondary button: transparent with white border — links to `/inspirations`
- Trust stat counter: animates up on page load (3,000 → 3,247 over 1s)

---

### Section 2 — Social Proof Strip

**Layout**: Full-width horizontal strip, dark navy background

**Content**:
```
⭐⭐⭐⭐⭐  Rated 4.9/5 by homeowners    |    🏅 CaseTrust Association Member    |    📋 100+ Verified Firms    |    📸 1,400+ Projects    |    🆓 Always Free for Homeowners
```

**Features**: Auto-scrolling marquee animation (no JS, CSS only)

---

### Section 3 — Why Choose HomeMatch (3 Cards)

**Layout**: 3-column card grid

**Card 1 — CaseTrust Assurance**:
- Icon: Government shield badge
- Title: "CaseTrust Certified Only"
- Body: "Every firm on HomeMatch is HDB-registered and CaseTrust-certified — Singapore's highest consumer protection standard for renovation."
- Link: "What is CaseTrust? →"

**Card 2 — You Pay Nothing**:
- Icon: Dollar sign with ×
- Title: "Free. Always."
- Body: "We never charge homeowners, never take commissions from your renovation contract. Our incentive is your satisfaction."

**Card 3 — Matched in 24 Hours**:
- Icon: Clock with checkmark
- Title: "6 Firms Matched in 24 Hours"
- Body: "Tell us your needs once. Our team personally shortlists 6 firms that match your budget, style, and property type."

---

### Section 4 — How It Works (6 Steps)

**Layout**: Alternating left-right (desktop) / vertical stack (mobile)

**Steps with visual**:
1. 🔍 **Browse** — Explore 100+ verified firms, 1,400+ project photos, and renovation guides to get ideas
2. 📝 **Tell Us Your Needs** — Fill the 5-minute Find My ID form (property type, budget, style, timeline)
3. 📞 **We Contact You** — Our team calls within 24 hours to refine your requirements
4. 🏆 **Get 6 Matched Firms** — We shortlist 6 CaseTrust-certified firms that fit your needs
5. 🤝 **Meet & Compare** — Meet designers, compare proposals, ask questions
6. 🏠 **Renovate & Review** — Engage your chosen firm, track progress, leave a review

**Feature**: Step number animates in on scroll one by one (GSAP ScrollTrigger staggered reveal)

**CTA below**: `[Start the Process — It's Free →]`

---

### Section 5 — Featured Firms (6 Cards)

**Layout**: Horizontal scroll row (desktop: 4 visible + scroll; mobile: 2 visible)

**Each FirmCard contains**:
- Firm logo/banner photo (16:9 aspect ratio)
- Firm name (bold)
- Star rating: ★ 4.8/5 (24 reviews)
- Property badges: `[HDB]` `[Condo]` `[Landed]`
- Trust badges (top 2): e.g. `[CaseTrust]` `[HDB Specialist]`
- `[View Profile]` button

**Section header**: "Top-Rated Firms on HomeMatch"
**Section CTA**: `[Browse All 100+ Firms →]` — links to `/firms`

**Data**: Pull `isFeatured: true` firms from data layer, show 6 max

---

### Section 6 — Inspiration Gallery (12 Photos, Masonry)

**Layout**: Masonry grid (Pinterest-style) — 4-col desktop, 2-col mobile

**Each InspirationCard contains**:
- Full project photo
- Hover overlay: budget badge (e.g. "S$70,000") + sqft ("1,200 sqft") + style tag ("Contemporary")
- Firm name linked to profile
- Property type badge ("HDB")

**Section header**: "Real Renovation Projects by Real Homeowners"
**Filter pills** (quick filter): All · HDB · Condo · Contemporary · Japandi · Minimalist
**Section CTA**: `[See All 1,400+ Projects →]` — links to `/inspirations`

**Feature**: Clicking a photo opens lightbox with enlarged image + project details panel

---

### Section 7 — Featured Vendors (Horizontal Brand Row)

**Layout**: Logo strip, 6 brands visible in horizontal scroll

**Each VendorLogo contains**: Brand logo + category label below (e.g. "Paints", "Laminates", "Smart Home")

**Section header**: "Trusted Home Brands on HomeMatch"
**Section CTA**: `[Explore All Brands →]` — links to `/vendors`

---

### Section 8 — Testimonials (Real Reviews)

**Layout**: 3-column card grid (desktop) / horizontal scroll (mobile)

**Each Testimonial contains**:
- ⭐⭐⭐⭐⭐ star rating
- Review text (2–4 sentences)
- Reviewer name (e.g. Ivan Ong)
- Property type + firm used (e.g. "HDB 4-room · Calibrate Design")
- Date

**8 reviews minimum** — pre-filled from data

**Feature**: Auto-rotate carousel on mobile (swipeable)

**Below testimonials**: Google Reviews badge strip: "4.9/5 on Google" + CaseTrust badge + MCI Approved

---

### Section 9 — Latest Articles (3 Cards)

**Layout**: 3-column card grid

**Each ArticleCard contains**:
- Article thumbnail image
- Category pill (e.g. "House Hacks")
- Article title (H3)
- Short excerpt (2 lines max)
- Read time (e.g. "5 min read")
- Date

**Section header**: "Renovation Tips & Design Guides"
**Section CTA**: `[Read All Articles →]` — links to `/articles`

---

### Section 10 — CaseTrust Trust Stamp

**Layout**: Full-width, dark navy background with gold accents

**Content**:
```
[CaseTrust Logo — large, centred]

"HomeMatch is Singapore's only renovation matching platform
 exclusively featuring CaseTrust-certified interior design firms."

[Shield Icon] Govt-Backed Certification
[Shield Icon] Consumer Right Protection
[Shield Icon] Licensed HDB Renovators
[Shield Icon] Dispute Resolution Available

[Learn About CaseTrust →]        [See All CaseTrust Firms →]
```

---

### Section 11 — FAQ

**Layout**: 2-column accordion (desktop) / full-width accordion (mobile)

**10 FAQs**:
1. What is HomeMatch and is it free?
2. How is HomeMatch different from other platforms?
3. What is CaseTrust and why does it matter?
4. How does the Find My ID matching work?
5. How many firms will I be matched with?
6. How much does renovation cost in Singapore?
7. How long does a typical renovation take?
8. Can I browse firms without submitting a form?
9. I'm not ready to renovate yet — can I still use HomeMatch?
10. How do I get on the CaseTrust Renovation List?

---

### Section 12 — Bottom CTA Banner

**Layout**: Bold full-width banner with gradient background

**Content**:
```
Ready to find your perfect interior designer?

Get matched with 6 CaseTrust-certified firms — free, in 24 hours.

[Start for Free — Find My ID →]
```

---

## Page 2: Find My ID (`/find-my-id`)

> **Purpose**: Primary lead-generation page. Collect homeowner details → send to admin + matched firms.

### SEO
- `<title>`: Find My Interior Designer — Free Matching | HomeMatch
- `<description>`: Get matched with 6 CaseTrust-certified interior designers in Singapore. Free, no commissions. Takes 5 minutes.

---

### Layout: Split-screen

**Left (sticky)**: Trust panel + testimonial
**Right**: Multi-step form

---

### Left Panel (sticky on desktop)

```
Why HomeMatch?

✅ 100% Free — We charge zero commissions
✅ CaseTrust Certified Firms Only
✅ Matched in 24 hours
✅ Our team personally reviews your needs
✅ No spam, we respect your privacy

[Quote with photo]
"Submitted the form at 9pm and had a call by 10am the next day.
 Got matched with 3 excellent firms." — Priya R., 5-room HDB

[CaseTrust badge]
```

---

### Right Panel: 3-Step Form with Progress Bar

**Progress**: [Step 1: Property ●●○ Step 2: Reno Details ●○○ Step 3: Contact ○○○]

#### Step 1 — Property Details
- Property Type: `[HDB]` `[Condo]` `[Landed]` `[Commercial]` (large toggle buttons)
- HDB flat type (if HDB): `[2-room]` `[3-room]` `[4-room]` `[5-room]` `[Executive]`
- Property Status: `[New (BTO/Launch)]` `[Resale]`
- Keys Collected: `[Yes]` `[Not Yet]`
- If "Not Yet": Month picker + Year picker for expected collection
- Location: Singapore postal code or estate/district dropdown

#### Step 2 — Renovation Details
- Renovation Scope: Checkboxes (multi-select):
  `☐ Full Home` `☐ Living Room` `☐ Kitchen` `☐ Master Bedroom` `☐ Common Bedroom(s)` `☐ Bathroom(s)` `☐ Study` `☐ Balcony`
- Budget Range: Slider from S$20,000 to S$500,000+ (snap to S$5K intervals)
  Shows range label: "S$50,000 – S$80,000"
- Design Style Preference: Visual cards with style name + small thumbnail image (single select):
  Contemporary · Modern · Minimalist · Japandi · Scandinavian · Industrial · Luxury · Peranakan · Other
- Upload Inspiration Photos (optional): Drag-and-drop, max 3 files, max 3MB each

#### Step 3 — Contact Details
- Full Name (required)
- Email Address (required, validated)
- Mobile Number (required, Singapore +65 prefix)
- Additional Info: textarea ("Any special requirements?")
- Newsletter opt-in toggle: "Send me renovation tips and design inspiration"
- Privacy note: "Your details are shared only with matched firms. See our privacy policy."

**Submit CTA**: `[Get My 6 Matches →]` — navy button, full width

**On Submit**:
- Show loading spinner + "Finding your perfect matches..."
- Send email to admin via Resend API
- Send confirmation email to homeowner
- Redirect to `/find-my-id/thank-you`

---

### Thank You Page (`/find-my-id/thank-you`)
```
🎉 You're on your way to your dream home!

We've received your details and our team will contact you
within 24 hours on [phone number] with your 6 matched firms.

While you wait:
[Browse Renovation Projects →]    [Read Our Guides →]    [Explore Firms →]
```

---

## Page 3: Firms Directory (`/firms`)

> **Purpose**: Let homeowners explore all vetted firms, filter by their needs, and land on profiles.

### SEO
- `<title>`: Interior Design Firms in Singapore | HomeMatch
- `<description>`: Browse 100+ CaseTrust-certified interior design firms in Singapore. Filter by badge, style, property type, and reviews.

---

### Layout: Sidebar filter (desktop) / Filter sheet (mobile) + content grid

---

### Top Section
```
H1: Find Your Interior Designer

[Search bar: "Search by firm name..."]

[Active filters: Clear All] [HDB Specialist ×] [4.5+ Stars ×]

Showing 87 firms
```

---

### Sidebar Filters (desktop — left sticky column; mobile — bottom sheet)

**Filter groups**:
1. **Sort By**: Rating (High→Low) · Review Count · Newest Listed
2. **Accreditation**: `☐ CaseTrust` `☐ HDB Registered` `☐ BCA Registered` `☐ RCMA` `☐ bizSAFE3`
3. **HomeMatch Badges**: `☐ Verified Firm` `☐ Consumers Choice` `☐ Boutique Firm` `☐ People's Choice`
4. **Specialisation**: `☐ HDB Specialist` `☐ Condo Specialist` `☐ Landed Specialist` `☐ Commercial`
5. **Project Types**: `☐ HDB` `☐ Condo` `☐ Landed` `☐ Commercial`
6. **Design Styles**: Dropdown checklist of all 19 styles
7. **Min Rating**: Slider 3.0→5.0
8. `[Apply Filters]` button

---

### Firm Grid (main content)

**Grid**: 3-col desktop, 2-col tablet, 1-col mobile

**Each FirmCard**:
```
[FEATURED] label (if featured)
[Firm banner photo — 16:9]
[CaseTrust badge] [HDB Specialist badge]
Firm Name                                   ★ 4.8/5 (42 reviews)
Address area (e.g. "Ubi, East Singapore")
Project types: [HDB 50%] [Condo 30%] [Landed 20%]
Speciality styles: Contemporary · Modern · Japandi
[View Profile →]   [Enquire →]
```

---

### Sticky Bottom Bar (mobile)
When filter is active: `[87 Firms Match Your Filters — View Results]`

---

### Right Sidebar CTA (desktop)
```
📋 Not sure who to pick?

Let us match you with 6 perfect firms.
It's free and takes 5 minutes.

[Find My ID →]
```

---

## Page 4: Individual Firm Profile (`/firms/[slug]`)

> **Purpose**: Convince homeowner this is the right firm. Drive enquiry submission.

### SEO
- `<title>`: [Firm Name] — Interior Design Singapore | HomeMatch
- `<description>`: [Firm Name] is a CaseTrust-certified interior design firm in Singapore. View [X] completed projects, [X] reviews, and submit a free enquiry.
- JSON-LD: LocalBusiness + Review Aggregator schema

---

### Layout: Two-column (main content | sticky sidebar)

---

### A — Breadcrumb
`Home > Firms > [Firm Name]`

---

### B — Hero Header Block
```
[Firm Banner Photo — wide]

[Logo]  Firm Name
        📍 Full address
        ★ 4.8 / 5.0   (42 reviews)   ·   38 completed projects

[CaseTrust Badge] [HDB Registered] [RCMA]        [🔗 Website] [📞 Call]
```

---

### C — Quick Stats Bar
```
[Projects Done: 38]   [Avg Budget: S$65K]   [HDB: 50%]   [Est. 2014]   [Response: < 2 hrs]
```

---

### D — About the Firm
- Full bio text (3–5 paragraphs)
- "Read More" collapse for longer bios

---

### E — Project Type Breakdown (Pie Chart)
```
Visual donut chart:
● HDB — 50%
● Condo — 30%
● Landed — 15%
● Commercial — 5%
```
Built with Recharts `PieChart`

---

### F — HomeMatch Badges (graded)
Each badge: Icon + "Verified Interior Design Firm (Annual Audit) — Grade III" + tooltip "What does this mean?" → popover explaining the badge

---

### G — Government Accreditations
Logo blocks: CaseTrust · HDB Registered · RCMA · bizSAFE3 · BCA
Each logo has a tooltip with a 1-line explanation

---

### H — Featured Projects (Gallery Strip)
- 6 photos in horizontal scroll row
- Each photo: thumbnail with hover date + style overlay
- `[See Full Gallery →]` link → `/firms/[slug]/gallery`

---

### I — Client Reviews

**Sorting**: Most Recent · Highest Rated · Most Helpful

**Review header**:
```
★★★★★  4.8 / 5.0   based on 42 reviews
[★★★★★ 38] [★★★★☆ 3] [★★★☆☆ 1] [★★☆☆☆ 0] [★☆☆☆☆ 0]
```

**Each Review card**:
```
★★★★★   5.0 / 5.0
Reviewer: Shari Dipu                          7 February 2025
Renovation: 4-room HDB · S$62,000 · Designer: Kelvin Ser

"My husband and I had an incredible experience working with Kelvin Ser from 9 Creations.
 He is very professional, knowledgeable, responsive & prompt in following up. As first-time
 owners, we were clueless... [Read More]"

[👍 Helpful (3)]
```

**Load more**: "Show 5 more reviews" button

---

### J — Related Firms
"Other Firms You Might Like" — 3 firm cards with similar badges

---

### K — Sticky Sidebar (right column)

**Enquiry Form**:
```
Submit An Enquiry to [Firm Name]

Property Type:      [HDB ▾]
Property Status:    [New BTO ▾]
Area Size:          [___] sqft
Estimated Budget:   S$ [_____]
Style Preference:   [Contemporary ▾]
Keys Collected:     [Yes / No]
Key Collection:     [Month ▾] [Year ▾]
Full Name:          [_________]
Email Address:      [_________]
Contact Number: +65 [_________]
Upload Files:       [📎 Click or drag — max 3MB]
Additional Info:    [_________________]

☐ Also send to 3 similar firms (speeds up search)

[Send Enquiry →]
```

**Below form**:
```
⚡ Avg response time: 2 hours
🔒 Your data is only shared with matched firms
```

**Below form — Find My ID upsell**:
```
Want 6 options instead of 1?
[Use Find My ID — Free →]
```

---

## Page 5: Firm Gallery (`/firms/[slug]/gallery`)

> **Purpose**: Showcase completed work. One of the strongest conversion drivers.

### Layout: Full-width masonry grid + filter bar

### Top Section
```
← Back to [Firm Name]
[Firm Name] — Project Gallery
38 completed projects

Filters: [All] [Living Room] [Kitchen] [Bedroom] [Bathroom] [Before & After]
Styles:  [All] [Contemporary] [Japandi] [Modern] [Industrial]
Types:   [All] [HDB] [Condo] [Landed]
```

### Photo Grid
- Masonry grid, 4-col desktop, 2-col mobile
- Each photo: room tag + style tag on hover
- Click → full-screen lightbox:
  - Left/Right arrow navigation
  - Photo counter (7/38)
  - Side panel: Project name, budget, sqft, property type, style, "View full project →"

---

## Page 6: Vendor Directory (`/vendors`)

> **Purpose**: Help homeowners discover home brands across 8 categories.

### SEO
- `<title>`: Trusted Home Brands in Singapore | HomeMatch
- `<description>`: Browse 50+ trusted interior and home brands in Singapore — paints, furniture, smart home, lighting, appliances and more.

---

### Top Section
```
H1: Explore Trusted Home Brands

Singapore's best home brands, all verified by HomeMatch.

[Search: "Search brands..."]

[Materials] [Furniture] [Smart Home] [Appliances] [Bathroom] [Furnishing] [Home Services] [Lighting]
```

**Category tabs**: pill-style tabs with icons, horizontally scrollable on mobile

---

### Vendor Grid
**3 columns desktop, 2 tablet, 1 mobile**

**Each VendorCard**:
```
[Brand Logo — white bg card]
[Category pill: "Smart Home"]
Brand Name
[Consumers Choice III] [Green Firm I]
★ 4.9/5 (18 reviews)
Brief bio (1 sentence)
[View Brand →]
```

---

## Page 7: Vendor Profile (`/vendors/[slug]`)

> **Purpose**: Introduce the brand and drive enquiries from homeowners + firms.

### Layout: Same two-column as firm profile (main content + sticky sidebar)

### Sections

**A — Header**:
```
← Back to Vendors     [Category: Materials]

[Brand Logo — large]
Brand Name
Founded: 1913
📍 Address (if physical showroom)
★ 4.9/5 (18 reviews)
```

**B — Badges**:
Verified Vendor III · Consumers Choice III · Equipped I · Green Firm III

*(Green Firm badge shown with leaf icon + tooltip: "This brand practices sustainable manufacturing with certified eco-friendly materials.")*

**C — About**:
Full brand bio text

**D — Products & Services** (if available):
Category pills showing what they sell/offer

**E — Reviews**
Same review structure as firm profiles

**F — Related Articles**:
"Articles featuring [Brand Name]" — pull articles tagged with this vendor

**G — Sidebar Enquiry Form**:
```
Enquire with [Brand Name]

Full Name:      [_________]
Email:          [_________]
Phone:      +65 [_________]
I'm a:      [Homeowner / Interior Designer / Architect]
Message:        [________________]

[Send Enquiry →]
```

---

## Page 8: Inspirations Gallery (`/inspirations`)

> **Purpose**: The #1 SEO driver and conversion engine. Real projects = trust + aspiration.

### SEO
- `<title>`: Home Renovation Ideas & Interior Design Inspiration | Singapore | HomeMatch
- `<description>`: Browse 1,400+ real Singapore renovation projects with actual budgets. Filter by style, room type, property type, and budget range.

---

### Sticky Filter Bar (top, becomes sticky on scroll past hero)

```
[🔍 Search projects...]    [Property: All ▾]  [Style: All ▾]  [Room: All ▾]  [Budget: All ▾]  [Bedrooms: All ▾]

Active: [HDB ×] [Contemporary ×]  — Showing 246 projects    [Clear All]
```

**Filter dropdowns**:

**Property Type**: HDB · Condo · Landed · Executive HDB · Penthouse

**Style**: All 19 design styles (with style thumbnail preview in dropdown)

**Room**: Living Room · Kitchen · Master Bedroom · Common Bedroom · Bathroom · Study · Balcony · Dining · Entire Home

**Budget Range**:
- Under S$40K
- S$40K – S$70K
- S$70K – S$100K
- S$100K – S$150K
- S$150K – S$200K
- Above S$200K

**Bedrooms**: 1 / 2 / 3 / 4 / 5+

---

### Masonry Photo Grid
**4 columns desktop, 2 columns tablet, 1 column mobile**

**Each InspirationCard**:
```
[Project Photo]

[Hover overlay]:
  Budget: S$70,000        Sqft: 1,200
  Style: Contemporary
  [HDB] [5 Bedroom]

Firm: 96 Designers Group ★ 4.3
```

---

### Load More
"Show 12 more projects" button — infinite scroll or pagination

---

### Right Sidebar (desktop)
```
💡 Need this look?

Get matched with firms who specialize
in this style — free.

[Find My ID →]

──────────────────
📐 Not sure of budget?

[Try Budget Calculator →]
```

---

## Page 9: Individual Project Page (`/inspirations/[slug]`)

> **Purpose**: Deepen inspiration, show what's possible at real budgets. Drive firm enquiry.

### SEO
- `<title>`: [Style] [Property Type] Renovation by [Firm] — [Location] | HomeMatch
- `<description>`: See how [Firm] transformed this [Property Type] in [Location] with a S$[Budget] renovation. [Style] design with [Sqft] sqft.
- JSON-LD: ImageGallery + BreadcrumbList schema

---

### Layout: Full-width photos top, detail panel + sidebar below

---

### A — Hero Photo Gallery
- Large feature photo (full width, 70vh)
- Thumbnail strip below (horizontal scroll)
- Click thumbnail → changes main photo
- `[View All X Photos]` → opens lightbox slide show

---

### B — Project Quick-Detail Bar
```
🏠 HDB — 5 Bedroom    📐 1,200 sqft    💰 S$70,000    🎨 Contemporary    📅 Completed 2025
```

---

### C — Project Description (if available)
"This 5-room HDB flat in Bishan was transformed with a clean Contemporary palette..."

---

### D — Designed By (Firm Card — inline)
```
[Firm Logo]
96 Designers Group
★ 4.3/5.0  ·  4 projects  ·  BCA · CaseTrust · RCMA

[Verified Firm II] [HDB Specialist]

[View Full Profile →]    [Enquire with This Firm →]
```

---

### E — Room-by-Room Breakdown (if photos tagged by room)
Tabs: `[Living Room] [Kitchen] [Bedroom] [Bathroom]`
Each tab shows photos specific to that room

---

### F — Related Tags
```
🏷 [5 Bedroom] [HDB] [Contemporary] [S$60K–S$80K] [Bishan]
```
All tags are clickable → filter the inspirations gallery

---

### G — Similar Projects (4 cards)
"More Contemporary HDB Projects"
4 InspirationCards with similar style/property type

---

### H — Full-Width CTA
```
Love this look? Find a firm who can do this for your home.

[Find My ID — Free →]           [Try Budget Calculator →]
```

---

## Page 10: Articles Hub (`/articles`)

> **Purpose**: SEO content engine. Rank for long-tail Singapore renovation keywords.

### SEO
- `<title>`: Interior Design & Renovation Articles | Singapore | HomeMatch
- `<description>`: Expert renovation tips, interior design guides, HDB rules, smart home guides, and more — written for Singapore homeowners.

---

### Top Section
```
H1: Renovation Tips & Design Guides

[🔍 Search articles...]

Categories (pill tabs):
[All] [House Hacks] [HDB Guides] [Design Trends] [Smart Home] [Consumer Protection] [Budget Guides] [Designer Spotlight]
```

---

### Featured Article (1 full-width card)
```
[Hero Image — large]
Category: "House Hacks"
H2: 7 Red Flags That Scream Designer Danger!
Excerpt: Before you sign that renovation contract, read this...
[Read More →]              5 min read · Oct 2024
```

---

### Article Grid (3-column)
Each ArticleCard:
```
[Thumbnail Image — 4:3]
[Category pill]
H3: Article Title
Brief excerpt (2 lines)
🕐 5 min read    📅 Mar 2025
[Read →]
```

---

### Tags Cloud (sidebar or below grid)
Popular tags: HDB · CaseTrust · Budget · Smart Home · Feng Shui · Renovation Tips · Find an ID

---

### Newsletter Signup Strip
```
📬 Get renovation tips in your inbox

Join 10,000+ Singapore homeowners who get our weekly guides.

[Email address...]   [Subscribe — Free]
```

---

## Page 11: Individual Article Page (`/articles/[slug]`)

> **Purpose**: Rank on Google for specific renovation keywords. Convert reading → Find My ID.

### Layout: Article body (main col) + sticky sidebar

---

### A — Breadcrumb
`Home > Articles > House Hacks > Article Title`

---

### B — Article Header
```
[Category pill: House Hacks]
H1: 7 Red Flags That Scream Designer Danger!
Subtitle: Before you sign any renovation contract, read this guide on avoiding scam designers.

[Author: HomeMatch Editorial]    📅 Oct 2024    🕐 5 min read

[Facebook Share] [X Share] [WhatsApp Share] [Copy Link]
```

---

### C — Hero Image (full article width)

---

### D — Article Body (MDX rendered)
- Headings H2/H3 for sections
- Bullet and numbered lists
- Bold key terms
- Inline CTA blocks (mid-article):
  ```
  💡 Quick Tip: Always check if your firm is on the CaseTrust Renovation List.
  [View CaseTrust Firms on HomeMatch →]
  ```
- Embedded related articles (at relevant points)

---

### E — Tags
`[House Hacks]` `[Consumer Protection]` `[CaseTrust]` `[Find an ID]`

---

### F — Article Footer
```
Found this helpful? Share it:
[Facebook] [WhatsApp] [X] [Copy Link]

──────────────
About HomeMatch
HomeMatch is Singapore's only renovation platform exclusively featuring
CaseTrust-certified interior design firms. All articles are written for
Singapore homeowners navigating renovation for the first time.
```

---

### G — Related Articles (4 cards, full width, below article)
"You Might Also Like"

---

### H — Sticky Sidebar

**Box 1 — Match CTA**:
```
🏠 Find Your Perfect Firm

Get matched with 6 CaseTrust firms
for your renovation — free.

[Find My ID — 5 Minutes →]
```

**Box 2 — Popular Articles**:
1. Guide to Choosing an ID
2. How Much Does Renovation Cost?
3. What is CaseTrust?
4. HDB Renovation Rules
5. 7 Red Flags (current)

**Box 3 — Budget Calculator mini-widget**:
```
📐 Quick Budget Estimate

[HDB ▾] [4-room ▾] [Full Home ▾]

Estimated: S$50,000 – S$80,000

[Get Detailed Estimate →]
```

---

## Page 12: Stories Hub (`/stories`)

> **Purpose**: Video-first content that builds brand identity and expertise.

### Top Section
```
H1: Interior Design Videos

Expert interviews · Real home tours · Celebrity renovations

Filter by series:
[All] [The Designer Show] [OpenHouse] [Project Diaries] [Reno Roadblock] [BTW] [Special Features]
```

---

### Featured Episode (1 full-width card with YouTube thumbnail)
```
[YouTube thumbnail — large]
Series: The Designer Show | Episode 17
H2: "Design Without Function Is Just Drama"
Guest: Calvin Chen, Founder of C.A.L Design (25+ years)
"In this episode, we explore what truly elevates interior design beyond trends — into timeless, meaningful spaces."
[Watch Now →]     🕐 28 min
```

---

### Video Grid (3-column)
Each VideoCard:
```
[YouTube thumbnail] [▶ Play icon overlay]
[Series pill: "OpenHouse"]
Title
Guest / Designer (if applicable)
🕐 Duration    📅 Date
```

---

## Page 13: Individual Story Episode (`/stories/[series]/[slug]`)

### Layout: Video top + text below + sidebar

**A — YouTube Embed (responsive 16:9)**

**B — Episode Details**
```
The Designer Show | Episode 17

H1: Design Without Function Is Just Drama — Calvin Chen

Published: March 2025

Host:  HomeMatch Team
Guest: Calvin Chen, Founder of C.A.L Design (25+ years of experience)
```

**C — Full Episode Description**
All topics covered, structured as:
- What we discuss in this episode...
- Bullet list of key topics
- Quote from guest (pull quote styled)

**D — Guest Bio** (if expert interview)
```
Calvin Chen is the founder of C.A.L Design with over 25 years of experience
in Singapore's interior design industry. Known for [...]
[View C.A.L Design on HomeMatch →]
```

**E — Related Episodes (4 cards)**
"More from The Designer Show"

**F — Sidebar**
Same "Find My ID" CTA + Popular videos list

---

## Page 14: Budget Calculator (`/tools/budget-calculator`)

> **Purpose**: Useful interactive tool. Drives Find My ID conversions.

### Layout: Full-page interactive tool

---

### Top
```
H1: Singapore Renovation Budget Calculator

Get a realistic estimate for your renovation.
No registration needed — adjust and recalculate instantly.
```

---

### Calculator Interface

**Step 1 — Property Type** (button group):
`[HDB]` `[Condo]` `[Landed]` `[Executive HDB]`

**Step 2 — Flat Type** (if HDB, show this):
`[2-room]` `[3-room]` `[4-room]` `[5-room]` `[Executive/Jumbo]`

OR Size input: `[_____] sqft` (for Condo/Landed)

**Step 3 — Renovation Scope** (checkboxes):
```
☐ Full Home Renovation
──── OR select rooms individually ────
☐ Living + Dining Room
☐ Kitchen
☐ Master Bedroom + Bathroom
☐ Common Bedroom(s)   How many? [2 ▾]
☐ Common Bathroom(s)
☐ Study Room
☐ Balcony
```

**Step 4 — Finishes**:
```
Basic       Budget-conscious materials
            (laminate, vinyl, basic fittings)

Mid-range   Good quality materials
            (semi-solid wood, quality tiles)

Premium     High-end materials
            (solid wood, marble, custom)
```

---

### Output Panel (live updates as user changes inputs)

```
📊 Your Estimated Renovation Budget

Based on a 4-room HDB, full home, mid-range finishes:

                  Low         High
Living Room:   S$4,000 —  S$8,000
Kitchen:       S$8,000 — S$15,000
Master BR+Bath: S$9,000 — S$16,000
2× Common BR:  S$6,000 — S$10,000
Common Bath:   S$3,000 —  S$5,000
─────────────────────────────────
TOTAL:        S$30,000 — S$54,000

⚠️ This is an estimate. Actual cost depends on
   your chosen firm, materials, and design complexity.
```

---

### Below Calculator

Cost breakdown table (reference):
| Room | Basic | Mid | Premium |
|---|---|---|---|
| Living Room | S$3K–6K | S$5K–10K | S$10K–20K |
| Kitchen | S$6K–12K | S$10K–18K | S$18K–40K |
| ... | | | |

**CTA**:
```
Want an accurate quote for your renovation?

[Get 6 Free Quotes from Matched Firms →]    (→ Find My ID)
```

---

## Page 15: Style Quiz (`/tools/style-quiz`)

> **Purpose**: Fun + useful. Personalises the homeowner's journey, pre-fills Find My ID.

### Layout: Full-screen quiz UX

```
H1: What's Your Interior Design Style?

Answer 8 quick questions and we'll reveal your perfect design style.

[Start Quiz →]
```

---

### Quiz Questions (8 questions, visual A/B choice)

Each question shows 2 photos side by side. User picks one.

| Q | A | B |
|---|---|---|
| 1 | Warm, natural wood tones | Cool grey concrete finishes |
| 2 | Clean, open minimal space | Rich, layered, cosy space |
| 3 | Pops of colour | Mostly neutral palette |
| 4 | High-gloss shiny surfaces | Matte, textured surfaces |
| 5 | Traditional heritage elements | Sleek modern elements |
| 6 | Plants + natural elements | Geometric art + prints |
| 7 | Soft, warm lighting | Bright, crisp white lighting |
| 8 | Statement furniture (1 hero piece) | Many layered décor pieces |

**Progress**: `Question 3 of 8` [Progress bar]

---

### Result Page

```
🎉 Your style is: Japandi

You love the harmony of Japanese simplicity and Scandinavian warmth.
Your ideal home is uncluttered yet cosy, natural yet intentional.

Key elements of your style:
✦ Natural wood, linen, and stone materials
✦ Low, functional furniture
✦ Earthy neutral palette with muted greens and terracotta
✦ Negative space — less is more

[📸 See Japandi Projects →]  (→ /inspirations?style=japandi)
[🏠 Find a Japandi Specialist →]  (→ /find-my-id?style=japandi)

──────────────────────────────
Also consider: Scandinavian · Wabi Sabi · Minimalist
[Retake Quiz]
```

---

## Page 16: Badges (`/badges`)

> **Purpose**: Build trust by explaining the audit system fully.

### Sections

**A — Intro**:
```
H1: The HomeMatch Badge System

Every badge on HomeMatch is earned through an independent annual audit
— not self-proclaimed. Our Verification Committee reviews credentials,
homeowner feedback, project quality, and accreditation status every year.

Badges progress through Grade I → II → III as firms demonstrate
consistent excellence over multiple years.
```

**B — ID Firm Badges** (table + description per badge):
Each row: Badge Icon · Badge Name · Grade · What It Means · How It's Earned

**C — Vendor Badges** (same structure):
Including Green Firm explained: "Awarded to brands that demonstrate verifiable sustainable manufacturing, responsible sourcing, or eco-certified products."

**D — Government Accreditations** (4 cards):
CaseTrust · HDB Registered · RCMA · bizSAFE3 — each with: logo + issuing body + what it means + link to official site

**E — CTA**:
```
[Browse Firms by Badge →]    [Browse Verified Vendors →]
```

---

## Page 17: Styles Explained (`/styles-explained`)

> **Purpose**: SEO + guide for homeowners who know they like "something" but don't know the name.

### Top
```
H1: 19 Interior Design Styles Explained

Not sure what style you want? Browse all 19 styles,
see real examples, and find firms who specialise in yours.

[🔍 Jump to style...]    [Take Style Quiz →]
```

---

### Each Style Block (19 sections)
```
## [Style Name]

[Hero Image — real Singapore project example]

[Short tagline: "Clean lines. Open spaces. Effortless calm."]

[2-paragraph description: what this style is, where it came from, 
 why it works well in Singapore homes]

Key design elements:
✦ Element 1
✦ Element 2
✦ Element 3
✦ Element 4

[📸 Browse [Style] Projects →]    [🏠 Find a [Style] Specialist →]
```

---

## Page 18: CaseTrust Page (`/casetrust`)

**Sections**:
1. What Is CaseTrust? (Government-backed explanation)
2. Why CaseTrust Matters for Renovation
3. What CaseTrust Protects You Against
4. The Advantages: Dispute resolution, mandatory insurance, ethical conduct
5. CaseTrust vs Non-CaseTrust (comparison table)
6. The HomeMatch + CaseTrust Promise
7. Full CaseTrust Renovation List (filterable table of all CaseTrust firms)
8. CTA: "All HomeMatch Firms Are CaseTrust Certified"

---

## Page 19: Safest-Smartest Assurance (`/safest-smartest`)

> **HomeMatch's unique differentiator — keep and amplify from existing site**

**Sections**:
1. "What is the Safest-Smartest Assurance?"
2. The 5 Safest-Smartest Guarantees (icon + title + explanation each)
3. Why CaseTrust Alone Isn't Enough
4. What HomeMatch Adds on Top of CaseTrust
5. Our Screening Process (step by step)
6. Testimonials specifically about safety/trust
7. CTA: "Only be matched with Safest-Smartest certified firms"

---

## Page 20: About (`/about`)

**Sections**:
1. Our Story (why we built HomeMatch)
2. Our Mission statement
3. The Problem We Solve (renovation scams, information asymmetry)
4. How We're Different (vs Qanvast, Renozone, Renovoo, Sixides)
5. Press Coverage (AsiaOne, Yahoo Finance article embeds)
6. Our Partnerships (CaseTrust logo + statement)
7. Team section (optional — if team photos available)
8. CTA: "Join 3,000+ Homeowners Who Found Their Perfect Firm"

---

## Page 21: Contact (`/contact`)

### Two-channel layout

**Left — For Homeowners**:
```
For Homeowners
──────────────
📞 WhatsApp / Phone: +65 8332 6708
📧 Email: hello@homematch.sg
⏰ Mon–Fri, 9am–6pm Singapore Time

[WhatsApp Us Now →]
[Send Email →]
```

**Right — For Partners (IDs & Vendors)**:
```
For Interior Design Firms & Brands
────────────────────────────────────
📞 WhatsApp / Phone: +65 8XXX XXXX
📧 Email: partners@homematch.sg
⏰ Mon–Fri, 9am–6pm Singapore Time

[Partner With Us →]
[Learn More →]
```

**General Enquiry Form** (middle, below split):
Name · Email · Phone · I am: [Homeowner / Firm / Vendor / Press / Other] · Message · Send

---

## Page 22: How It Works / Partner With Us (`/how-it-works`)

**Audience**: Interior design firms and vendors who want to join

**Sections**:
1. "Why List Your Firm on HomeMatch?"
2. The 6-Step Homeowner Journey (so firms see how leads come to them)
3. The Badge & Audit System (what firms must meet to earn badges)
4. Listing Packages (Basic · Verified · Featured) — pricing if applicable
5. Requirements to Join (CaseTrust, HDB Registered, real reviews)
6. Testimonials from current member firms
7. Application form: Firm name · Contact person · Email · Phone · CaseTrust number · [Submit Application]

---

## Universal UX Rules (Apply To All Pages)

| Rule | Implementation |
|---|---|
| Mobile-first | Build mobile layout first, then expand for desktop |
| WhatsApp button | Fixed bottom-right on all pages, all screens |
| Breadcrumb | Every inner page has a breadcrumb (Home > Section > Page) |
| Find My ID CTA | At minimum 1 CTA per page linked to `/find-my-id` |
| Article sidebar CTA | On all article and story pages |
| 404 page | Custom branded 404 with "Browse Firms" and "Find My ID" CTAs |
| Loading state | Skeleton loaders on all data-fetched sections |
| Error state | Friendly error messages with retry + contact link |
| Empty state | When filters return 0 results: "No firms match. Try adjusting filters or [Find My ID]" |
| Image fallback | Placeholder image if firm/project photo fails to load |
| Form validation | Inline validation (not on submit — real-time as user types) |
| Form success | Show success toast + redirect to thank you page |
| GSAP animations | Staggered reveal on scroll for cards/lists. Fade-in for headers |
| OG image | Auto-generated using Next.js OG API — include page title + HomeMatch logo |
