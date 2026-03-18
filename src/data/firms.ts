import type { Firm, FirmProject, FirmReview } from "@/types/firm";

// ---------------------------------------------------------------------------
// Shared project photos (Unsplash — stable URLs)
// ---------------------------------------------------------------------------
const PHOTOS = {
  living1: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200",
  living2: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1200",
  living3: "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?auto=format&fit=crop&q=80&w=1200",
  kitchen1: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=1200",
  kitchen2: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=1200",
  bedroom1: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&q=80&w=1200",
  bedroom2: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=1200",
  bathroom1: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=1200",
  landed1: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200",
  study1: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
  dining1: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200",
  facade1: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200",
};

// Logos — Webflow CDN logos from the live site
const LOGOS = {
  ovon: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/6376086e1c11e453e84b9d59_ovon-design.png",
  eight: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/6376086e1c11e453e84b9d59_eight-design.png",
  forefront: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/6376086e1c11e453e84b9d59_forefront-interior.png",
  ecasa: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/6376086e1c11e453e84b9d59_ecasa-studio.png",
  oasis: "https://cdn.prod.website-files.com/635ea81b96e6ef55a169584c/6376086e1c11e453e84b9d59_great-oasis.png",
  fallback: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&h=150&fit=crop&q=80",
};

// ---------------------------------------------------------------------------
// Firm data
// ---------------------------------------------------------------------------
export const firms: Firm[] = [
  // ── 1. OVON Design ────────────────────────────────────────────────────────
  {
    id: "f1",
    slug: "ovon-design",
    name: "OVON Design",
    logo: LOGOS.fallback,
    bannerPhoto: PHOTOS.living1,
    address: "150 Ubi Avenue 4, #08-01 Lam Soon Building, Singapore 408600",
    district: "East",
    bio: "Founded in 2014, OVON Design has transformed over 600 Singapore homes with a signature blend of contemporary aesthetics and practical living. Our team of 28 designers and project managers brings unmatched expertise to every project — from compact 3-room HDB flats to sweeping penthouse condos. We are proud to be among Singapore's top-rated CaseTrust-accredited firms, recognised year after year by homeowners for our transparent pricing, on-time delivery, and meticulous craftsmanship.",
    shortBio: "Contemporary & Modern specialists. 600+ homes transformed since 2014.",
    established: 2014,
    teamSize: 28,
    rating: 4.8,
    reviewCount: 67,
    responseTime: "< 1 hour",
    avgBudget: 72000,
    projectTypes: { hdb: 45, condo: 35, landed: 15, commercial: 5 },
    styles: ["Contemporary", "Modern", "Luxury"],
    badges: [
      { id: "verified-iii", label: "Verified Firm", grade: "III", description: "Passed HomeMatch's annual financial, contractual, and operational audit for 3 consecutive years." },
      { id: "choice-ii", label: "Consumers Choice", grade: "II", description: "Ranked in the top 15% of all HomeMatch firms by verified homeowner satisfaction scores." },
    ],
    accreditations: ["CaseTrust", "HDB Registered", "RCMA"],
    reviews: [
      { id: "r1", reviewerName: "Ivan Ong", rating: 5, date: "2025-02-14", renovationType: "4-Room HDB", budget: 68000, designerName: "Jason", body: "OVON completely transformed our Punggol flat. Jason was incredibly patient, walked us through every material choice, and delivered two weeks early. The cove lighting in the living room is exactly what we envisioned. Highly recommend.", helpfulCount: 12 },
      { id: "r2", reviewerName: "Priya Ramasamy", rating: 5, date: "2025-01-08", renovationType: "3-Bed Condo", budget: 95000, designerName: "Sheena", body: "Sheena from OVON nailed the contemporary look we wanted. The open-concept kitchen island was tricky but she managed it within our budget. Very professional from start to finish.", helpfulCount: 7 },
      { id: "r3", reviewerName: "Daniel Lim", rating: 4, date: "2024-11-20", renovationType: "5-Room BTO", budget: 72000, body: "Great workmanship overall. Minor hiccup with carpentry lead times but they communicated proactively and resolved it. Would use again.", helpfulCount: 3 },
    ],
    featuredProjects: [
      { id: "p1", photoUrl: PHOTOS.living1, style: "Contemporary", roomType: "Living Room", budget: 68000, sqft: 1100, propertyType: "HDB" },
      { id: "p2", photoUrl: PHOTOS.kitchen1, style: "Contemporary", roomType: "Kitchen", budget: 68000, sqft: 1100, propertyType: "HDB" },
      { id: "p3", photoUrl: PHOTOS.bedroom1, style: "Modern", roomType: "Master Bedroom", budget: 95000, sqft: 1350, propertyType: "Condo" },
      { id: "p4", photoUrl: PHOTOS.dining1, style: "Luxury", roomType: "Dining Room", budget: 120000, sqft: 1800, propertyType: "Condo" },
      { id: "p5", photoUrl: PHOTOS.bathroom1, style: "Contemporary", roomType: "Bathroom", budget: 68000, sqft: 1100, propertyType: "HDB" },
    ],
    phone: "+65 6284 8600",
    whatsapp: "https://wa.me/6591234567",
    website: "https://www.ovon-d.com",
    showroomAddress: "150 Ubi Avenue 4, #08-01, Singapore 408600",
    showroomHours: "Mon–Sat: 10am–7pm | Sun: By Appointment",
    isCaseTrust: true,
    isFeatured: true,
    isVerified: true,
    isBoutique: false,
  },

  // ── 2. Eight Design ───────────────────────────────────────────────────────
  {
    id: "f2",
    slug: "eight-design",
    name: "Eight Design",
    logo: LOGOS.fallback,
    bannerPhoto: PHOTOS.living3,
    address: "140 Tanjong Pagar Road, #03-02, Singapore 088537",
    district: "Central",
    bio: "Eight Design is a boutique interior design studio at the heart of Tanjong Pagar. Since 2017 our tight-knit team of 12 has built a reputation for delivering calm, purposeful spaces rooted in Japandi and Minimalist principles. We believe great interiors start with listening — every project begins with an in-depth home study to understand how you actually live before a single moodboard is created. Our small size means the principal designer is on your project from concept to handover.",
    shortBio: "Boutique Japandi & Minimalist studio. Principal-led from concept to handover.",
    established: 2017,
    teamSize: 12,
    rating: 4.9,
    reviewCount: 34,
    responseTime: "< 3 hours",
    avgBudget: 58000,
    projectTypes: { hdb: 30, condo: 50, landed: 20, commercial: 0 },
    styles: ["Japandi", "Minimalist", "Scandinavian"],
    badges: [
      { id: "verified-ii", label: "Verified Firm", grade: "II", description: "Passed HomeMatch's annual financial, contractual, and operational audit for 2 consecutive years." },
      { id: "boutique-i", label: "Boutique Firm", grade: "I", description: "Small-team studio where the principal designer personally leads every project." },
    ],
    accreditations: ["CaseTrust", "HDB Registered"],
    reviews: [
      { id: "r4", reviewerName: "Mei Lin Chen", rating: 5, date: "2025-02-01", renovationType: "3-Room HDB", budget: 48000, designerName: "Wei Ling", body: "Wei Ling from Eight Design truly understood what we meant by 'Japandi' when we could barely articulate it ourselves. She sourced natural oak elements and kept the palette so restrained. Our home feels like a retreat now. Worth every cent.", helpfulCount: 18 },
      { id: "r5", reviewerName: "Siti Norzahra", rating: 5, date: "2024-12-15", renovationType: "2-Bed Condo", budget: 72000, designerName: "Wei Ling", body: "Incredibly detail-oriented team. The concealed storage solutions they designed for our compact condo are genius. No clutter, everything has a place. 10/10.", helpfulCount: 9 },
      { id: "r6", reviewerName: "Marcus Tay", rating: 5, date: "2024-10-03", renovationType: "4-Room Resale HDB", budget: 55000, body: "The quality of carpentry work is noticeably better than 2 other quotes we got. Principal designer was always reachable on WhatsApp. Absolutely fuss-free experience.", helpfulCount: 5 },
    ],
    featuredProjects: [
      { id: "p6", photoUrl: PHOTOS.living3, style: "Japandi", roomType: "Living Room", budget: 48000, sqft: 900, propertyType: "HDB" },
      { id: "p7", photoUrl: PHOTOS.bedroom2, style: "Minimalist", roomType: "Master Bedroom", budget: 72000, sqft: 1100, propertyType: "Condo" },
      { id: "p8", photoUrl: PHOTOS.study1, style: "Scandinavian", roomType: "Study", budget: 55000, sqft: 960, propertyType: "HDB" },
      { id: "p9", photoUrl: PHOTOS.kitchen2, style: "Japandi", roomType: "Kitchen", budget: 48000, sqft: 900, propertyType: "HDB" },
    ],
    phone: "+65 9123 4567",
    whatsapp: "https://wa.me/6591234568",
    showroomAddress: "140 Tanjong Pagar Road, #03-02, Singapore 088537",
    showroomHours: "Tue–Sat: 11am–6pm | By Appointment Preferred",
    isCaseTrust: true,
    isFeatured: true,
    isVerified: true,
    isBoutique: true,
  },

  // ── 3. Forefront Interior ─────────────────────────────────────────────────
  {
    id: "f3",
    slug: "forefront-interior",
    name: "Forefront Interior",
    logo: LOGOS.fallback,
    bannerPhoto: PHOTOS.kitchen1,
    address: "211 Hougang Street 21, #02-324, Singapore 530211",
    district: "North-East",
    bio: "Established in 2011, Forefront Interior is one of Singapore's most experienced HDB renovation specialists. With over 700 completed HDB projects, our 19-strong team has mastered every quirk of BTO layouts, resale flat constraints, and HDB permit processes. We are known for delivering practical, stylish homes on budget — with no surprise costs. Our Consumers Choice and People's Choice badges reflect what matters most to us: homeowner satisfaction.",
    shortBio: "HDB renovation veterans. 700+ completed BTO & resale projects since 2011.",
    established: 2011,
    teamSize: 19,
    rating: 4.7,
    reviewCount: 89,
    responseTime: "< 2 hours",
    avgBudget: 48000,
    projectTypes: { hdb: 70, condo: 25, landed: 5, commercial: 0 },
    styles: ["Contemporary", "Modern", "Industrial"],
    badges: [
      { id: "verified-iii-ff", label: "Verified Firm", grade: "III", description: "Passed HomeMatch's annual financial, contractual, and operational audit for 3 consecutive years." },
      { id: "peoples-iii", label: "People's Choice", grade: "III", description: "Top 10% most-reviewed firm on HomeMatch with an average rating above 4.5." },
      { id: "choice-i", label: "Consumers Choice", grade: "I", description: "Ranked in the top 25% of all HomeMatch firms by verified homeowner satisfaction scores." },
    ],
    accreditations: ["CaseTrust", "HDB Registered", "bizSAFE3"],
    reviews: [
      { id: "r7", reviewerName: "Raymond Koh", rating: 5, date: "2025-01-22", renovationType: "5-Room BTO", budget: 58000, designerName: "Billy", body: "Billy handled our entire renovation from HDB permit to final touch-up. Zero stress for us. He even flagged a minor structural issue during hacking and resolved it without drama. Excellent.", helpfulCount: 14 },
      { id: "r8", reviewerName: "Nurul Huda", rating: 4, date: "2024-09-17", renovationType: "4-Room Resale HDB", budget: 45000, body: "Good value for money. The industrial-style kitchen turned out exactly as planned. Slight delay on wardrobe delivery but they communicated well. Happy with the end result.", helpfulCount: 6 },
      { id: "r9", reviewerName: "Thomas Wee", rating: 5, date: "2024-07-30", renovationType: "3-Room HDB", budget: 35000, designerName: "Billy", body: "Unbeatable price-to-quality ratio. Forefront was the most competitive quote we received and delivered better than two pricier alternatives we met. Will recommend to everyone.", helpfulCount: 11 },
      { id: "r10", reviewerName: "Grace Loh", rating: 5, date: "2024-06-12", renovationType: "Executive HDB", budget: 72000, body: "Their experience with HDB layouts really shows. They optimised our space in ways we never thought of and kept strictly to our timeline.", helpfulCount: 8 },
    ],
    featuredProjects: [
      { id: "p10", photoUrl: PHOTOS.kitchen1, style: "Contemporary", roomType: "Kitchen", budget: 45000, sqft: 960, propertyType: "HDB" },
      { id: "p11", photoUrl: PHOTOS.living2, style: "Modern", roomType: "Living Room", budget: 58000, sqft: 1100, propertyType: "HDB" },
      { id: "p12", photoUrl: PHOTOS.bedroom1, style: "Industrial", roomType: "Master Bedroom", budget: 35000, sqft: 850, propertyType: "HDB" },
      { id: "p13", photoUrl: PHOTOS.bathroom1, style: "Contemporary", roomType: "Bathroom", budget: 45000, sqft: 960, propertyType: "HDB" },
      { id: "p14", photoUrl: PHOTOS.dining1, style: "Modern", roomType: "Dining Room", budget: 58000, sqft: 1100, propertyType: "HDB" },
    ],
    phone: "+65 6385 2110",
    whatsapp: "https://wa.me/6591234569",
    showroomAddress: "211 Hougang Street 21, #02-324, Singapore 530211",
    showroomHours: "Mon–Sat: 10am–7pm",
    isCaseTrust: true,
    isFeatured: false,
    isVerified: true,
    isBoutique: false,
  },

  // ── 4. eCasa Studio ───────────────────────────────────────────────────────
  {
    id: "f4",
    slug: "ecasa-studio",
    name: "eCasa Studio",
    logo: LOGOS.fallback,
    bannerPhoto: PHOTOS.landed1,
    address: "1 Boon Lay Way, #12-07 Tradehub 21, Singapore 609954",
    district: "West",
    bio: "eCasa Studio was founded in 2016 with one goal: bring resort-style luxury to Singapore's private residences. Our 9-person boutique team specialises in condominiums and landed properties, with particular expertise in open-plan living, concealed lighting systems, and bespoke joinery. Each project is treated as a long-term relationship — we provide aftercare support up to two years post-handover, ensuring your home remains exactly as you envisioned.",
    shortBio: "Condo & landed luxury specialists. Resort-style aesthetics, bespoke joinery.",
    established: 2016,
    teamSize: 9,
    rating: 4.6,
    reviewCount: 27,
    responseTime: "< 4 hours",
    avgBudget: 95000,
    projectTypes: { hdb: 10, condo: 55, landed: 35, commercial: 0 },
    styles: ["Luxury", "Transitional", "Contemporary"],
    badges: [
      { id: "verified-i-ec", label: "Verified Firm", grade: "I", description: "Passed HomeMatch's annual financial, contractual, and operational audit." },
      { id: "boutique-ii-ec", label: "Boutique Firm", grade: "II", description: "Small-team studio with a high-touch, principal-led service model." },
    ],
    accreditations: ["CaseTrust", "BCA Registered"],
    reviews: [
      { id: "r11", reviewerName: "Alicia Fernandez", rating: 5, date: "2025-02-05", renovationType: "3-Bed Condo", budget: 110000, designerName: "Edwin", body: "Edwin and the eCasa team turned our Jurong West condo into something that looks like a 5-star hotel suite. The marble finishes and cove lighting are stunning. The post-handover support has been phenomenal.", helpfulCount: 10 },
      { id: "r12", reviewerName: "Patrick Goh", rating: 4, date: "2024-11-11", renovationType: "Semi-D Landed", budget: 280000, body: "Very high-end finishes and strong project management. Budget was on the higher side but fully justified by the quality. Their structural expertise on our semi-D was reassuring.", helpfulCount: 4 },
      { id: "r13", reviewerName: "Clara Ng", rating: 5, date: "2024-08-22", renovationType: "2-Bed Condo", budget: 78000, designerName: "Edwin", body: "Absolutely worth every dollar. The customised TV console and hidden storage they designed is something I show off to every guest. Very responsive team.", helpfulCount: 7 },
    ],
    featuredProjects: [
      { id: "p15", photoUrl: PHOTOS.landed1, style: "Luxury", roomType: "Facade & Pool", budget: 280000, sqft: 3500, propertyType: "Landed" },
      { id: "p16", photoUrl: PHOTOS.living1, style: "Transitional", roomType: "Living Room", budget: 110000, sqft: 1400, propertyType: "Condo" },
      { id: "p17", photoUrl: PHOTOS.bedroom2, style: "Luxury", roomType: "Master Bedroom", budget: 110000, sqft: 1400, propertyType: "Condo" },
      { id: "p18", photoUrl: PHOTOS.bathroom1, style: "Luxury", roomType: "Bathroom", budget: 110000, sqft: 1400, propertyType: "Condo" },
      { id: "p19", photoUrl: PHOTOS.dining1, style: "Transitional", roomType: "Dining Room", budget: 78000, sqft: 1050, propertyType: "Condo" },
    ],
    phone: "+65 6316 9540",
    whatsapp: "https://wa.me/6591234570",
    website: "https://www.ecasastudio.sg",
    showroomAddress: "1 Boon Lay Way, #12-07 Tradehub 21, Singapore 609954",
    showroomHours: "Mon–Fri: 10am–6pm | Sat: 10am–3pm",
    isCaseTrust: true,
    isFeatured: false,
    isVerified: true,
    isBoutique: true,
  },

  // ── 5. Great Oasis ────────────────────────────────────────────────────────
  {
    id: "f5",
    slug: "great-oasis",
    name: "Great Oasis",
    logo: LOGOS.fallback,
    bannerPhoto: PHOTOS.living2,
    address: "21 Jurong East Street 13, #04-01, Singapore 609484",
    district: "West",
    bio: "Great Oasis has been a cornerstone of Singapore's renovation industry since 2009. With a 35-person team spread across residential and commercial divisions, we bring the depth of a large firm with the heart of a family business. Over 1,000 completed projects — from HDB makeovers to hotel lobbies — have sharpened our operational excellence. Our transparent two-week design consultation process ensures every homeowner fully understands the scope, timeline, and cost before a single wall is touched.",
    shortBio: "Full-service firm with 1,000+ projects across residential and commercial.",
    established: 2009,
    teamSize: 35,
    rating: 4.5,
    reviewCount: 112,
    responseTime: "< 2 hours",
    avgBudget: 65000,
    projectTypes: { hdb: 40, condo: 30, landed: 10, commercial: 20 },
    styles: ["Contemporary", "Modern", "Industrial"],
    badges: [
      { id: "verified-iii-go", label: "Verified Firm", grade: "III", description: "Passed HomeMatch's annual financial, contractual, and operational audit for 3 consecutive years." },
      { id: "choice-iii", label: "Consumers Choice", grade: "III", description: "Consistently top-rated across the HomeMatch platform." },
    ],
    accreditations: ["CaseTrust", "HDB Registered", "BCA Registered", "bizSAFE3"],
    reviews: [
      { id: "r14", reviewerName: "Jason Tan", rating: 5, date: "2025-01-30", renovationType: "4-Room HDB", budget: 62000, designerName: "Mark", body: "Great Oasis handled everything professionally — from demo all the way to final clean-up. Mark's project tracking kept us informed at every milestone. Would definitely use again for our next property.", helpfulCount: 16 },
      { id: "r15", reviewerName: "Emily Chua", rating: 4, date: "2024-12-02", renovationType: "Office Fitout", budget: 130000, body: "Very efficient for the commercial project. Large team meant faster turnaround. Minor finishing touches needed rework but was addressed promptly.", helpfulCount: 5 },
      { id: "r16", reviewerName: "David Seah", rating: 5, date: "2024-10-19", renovationType: "5-Room BTO", budget: 75000, designerName: "Mark", body: "We were nervous about a big renovation with a large team but Great Oasis was organised and on schedule the entire way through. The industrial-modern look they created is exactly us.", helpfulCount: 9 },
      { id: "r17", reviewerName: "Farah Ismail", rating: 4, date: "2024-08-05", renovationType: "2-Bed Condo", budget: 68000, body: "Solid firm. Not the flashiest designs but practical and durable. They completed on time and within budget which is exactly what we needed.", helpfulCount: 3 },
    ],
    featuredProjects: [
      { id: "p20", photoUrl: PHOTOS.living2, style: "Contemporary", roomType: "Living Room", budget: 62000, sqft: 1050, propertyType: "HDB" },
      { id: "p21", photoUrl: PHOTOS.kitchen2, style: "Modern", roomType: "Kitchen", budget: 75000, sqft: 1200, propertyType: "HDB" },
      { id: "p22", photoUrl: PHOTOS.study1, style: "Industrial", roomType: "Study", budget: 130000, sqft: 2200, propertyType: "Commercial" },
      { id: "p23", photoUrl: PHOTOS.facade1, style: "Contemporary", roomType: "Facade", budget: 200000, sqft: 2800, propertyType: "Landed" },
      { id: "p24", photoUrl: PHOTOS.bedroom1, style: "Modern", roomType: "Master Bedroom", budget: 68000, sqft: 1100, propertyType: "Condo" },
    ],
    phone: "+65 6315 2100",
    whatsapp: "https://wa.me/6591234571",
    website: "https://www.greatoasis.com.sg",
    showroomAddress: "21 Jurong East Street 13, #04-01, Singapore 609484",
    showroomHours: "Mon–Sat: 10am–7pm | Sun: 11am–5pm",
    isCaseTrust: true,
    isFeatured: true,
    isVerified: true,
    isBoutique: false,
  },
];

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------
export function getAllFirms(): Firm[] {
  return firms;
}

export function getFirmBySlug(slug: string): Firm | undefined {
  return firms.find((f) => f.slug === slug);
}

export function getFeaturedFirms(): Firm[] {
  return firms.filter((f) => f.isFeatured);
}

export function getRelatedFirms(firm: Firm, limit = 3): Firm[] {
  return firms
    .filter((f) => f.id !== firm.id && f.accreditations.some((a) => firm.accreditations.includes(a)))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}
