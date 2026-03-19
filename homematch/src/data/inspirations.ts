import type { Project } from "@/types/firm";

// ─────────────────────────────────────────────────────────────────────────────
// Inspiration / Project data — dedicated source, decoupled from firms.ts
// When integrating a backend, replace these functions with API calls:
//   getAllInspirations()       → GET /api/inspirations
//   getInspirationBySlug(slug) → GET /api/inspirations/:slug
// ─────────────────────────────────────────────────────────────────────────────

export const mockInspirations: Project[] = [
  // ── 96 Designers Group ──
  {
    id: "p1",
    slug: "modern-luxe-condo-marina",
    title: "Modern Luxe 3-Bed Condo",
    firmSlug: "96-designers-group",
    photos: [
      { url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200", caption: "Living Room" },
      { url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1200", caption: "Kitchen" },
      { url: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=1200", caption: "Master Bedroom" },
    ],
    beforePhotoUrl: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&q=80&w=1200",
    propertyType: "Condo",
    bedrooms: 3,
    sqft: 1250,
    budget: 85000,
    style: "Luxury",
    rooms: ["Living Room", "Kitchen", "Master Bedroom"],
    tags: ["Marble", "Cove Lighting", "Island Kitchen", "Feature Wall"],
    completionDays: 90,
    completionDate: "Mar 2025",
    designer: "Kelvin Tan",
  },
  {
    id: "p4",
    slug: "minimalist-4room-hdb-toa-payoh",
    title: "Minimalist 4-Room BTO",
    firmSlug: "96-designers-group",
    photos: [
      { url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1200", caption: "Living Room" },
      { url: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?auto=format&fit=crop&q=80&w=1200", caption: "Kitchen" },
    ],
    beforePhotoUrl: "https://images.unsplash.com/photo-1562184552-997c461abbe6?auto=format&fit=crop&q=80&w=1200",
    propertyType: "HDB",
    bedrooms: 3,
    sqft: 990,
    budget: 52000,
    style: "Minimalist",
    rooms: ["Living Room", "Kitchen", "Master Bedroom"],
    tags: ["Handleless Cabinets", "Vinyl Flooring", "Hidden Storage"],
    completionDays: 60,
    completionDate: "Feb 2025",
    designer: "Kelvin Tan",
  },

  // ── Calibrate Design ──
  {
    id: "p2",
    slug: "japandi-5-room-hdb-punggol",
    title: "Japandi 5-Room Resale",
    firmSlug: "calibrate-design",
    photos: [
      { url: "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?auto=format&fit=crop&q=80&w=1200", caption: "Living Area" },
      { url: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&q=80&w=1200", caption: "Bedroom" },
      { url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=1200", caption: "Kitchen" },
    ],
    beforePhotoUrl: "https://images.unsplash.com/photo-1562184552-997c461abbe6?auto=format&fit=crop&q=80&w=1200",
    propertyType: "HDB",
    bedrooms: 4,
    sqft: 1400,
    budget: 65000,
    style: "Japandi",
    rooms: ["Living Room", "Entire Home"],
    tags: ["Wood Accents", "Minimalist", "Platform Bed", "Open Shelving"],
    completionDays: 75,
    completionDate: "Jan 2025",
    designer: "Sarah Lim",
  },
  {
    id: "p5",
    slug: "scandinavian-3room-hdb-sengkang",
    title: "Scandinavian 3-Room Resale",
    firmSlug: "calibrate-design",
    photos: [
      { url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200", caption: "Living Room" },
      { url: "https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&q=80&w=1200", caption: "Bedroom" },
    ],
    beforePhotoUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1200",
    propertyType: "HDB",
    bedrooms: 2,
    sqft: 753,
    budget: 38000,
    style: "Scandinavian",
    rooms: ["Living Room", "Master Bedroom", "Kitchen"],
    tags: ["Light Wood", "White Palette", "Space-Saving"],
    completionDays: 45,
    completionDate: "Apr 2025",
    designer: "Sarah Lim",
  },

  // ── Oblivion Design ──
  {
    id: "p3",
    slug: "contemporary-landed-east-coast",
    title: "Contemporary Landed Terrace",
    firmSlug: "oblivion-design",
    photos: [
      { url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200", caption: "Facade & Pool" },
      { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200", caption: "Double Volume Living" },
      { url: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&q=80&w=1200", caption: "Master Bedroom" },
    ],
    beforePhotoUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1200",
    propertyType: "Landed",
    bedrooms: 5,
    sqft: 3200,
    budget: 250000,
    style: "Contemporary",
    rooms: ["Entire Home", "Living Room", "Dining"],
    tags: ["Double Volume", "Pool", "Smart Home", "Biophilic Design"],
    completionDays: 180,
    completionDate: "Nov 2024",
    designer: "Marcus Wee",
  },
  {
    id: "p6",
    slug: "industrial-office-tanjong-pagar",
    title: "Industrial Office Fitout",
    firmSlug: "oblivion-design",
    photos: [
      { url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200", caption: "Open Plan Office" },
      { url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1200", caption: "Meeting Room" },
    ],
    beforePhotoUrl: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&q=80&w=1200",
    propertyType: "Commercial",
    bedrooms: 0,
    sqft: 2800,
    budget: 180000,
    style: "Industrial",
    rooms: ["Entire Home"],
    tags: ["Exposed Ceiling", "Concrete Walls", "Glass Partitions", "Custom Joinery"],
    completionDays: 120,
    completionDate: "Dec 2024",
    designer: "Marcus Wee",
  },

  // ── Fuse Concept ──
  {
    id: "p7",
    slug: "contemporary-5room-jurong-east",
    title: "Contemporary 5-Room BTO",
    firmSlug: "fuse-concept",
    photos: [
      { url: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=1200", caption: "Living Room" },
      { url: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?auto=format&fit=crop&q=80&w=1200", caption: "Kitchen" },
      { url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=1200", caption: "Master Bedroom" },
    ],
    beforePhotoUrl: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&q=80&w=1200",
    propertyType: "HDB",
    bedrooms: 4,
    sqft: 1184,
    budget: 58000,
    style: "Contemporary",
    rooms: ["Living Room", "Kitchen", "Master Bedroom", "Dining"],
    tags: ["Feature Wall", "Cove Lighting", "Quartz Countertop", "Built-in Wardrobe"],
    completionDays: 70,
    completionDate: "Jan 2025",
    designer: "Darius Ng",
  },
  {
    id: "p8",
    slug: "modern-4room-hdb-clementi",
    title: "Modern Minimalist 4-Room Resale",
    firmSlug: "fuse-concept",
    photos: [
      { url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200", caption: "Living Room" },
      { url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=1200", caption: "Kitchen" },
    ],
    beforePhotoUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1200",
    propertyType: "HDB",
    bedrooms: 3,
    sqft: 990,
    budget: 52000,
    style: "Modern",
    rooms: ["Living Room", "Kitchen", "Common Bedroom"],
    tags: ["Open Concept", "Herringbone Tile", "Concealed Storage", "LED Strip Lights"],
    completionDays: 55,
    completionDate: "Mar 2025",
    designer: "Darius Ng",
  },

  // ── Meter Square ──
  {
    id: "p9",
    slug: "japandi-4room-bto-woodlands",
    title: "Japandi 4-Room BTO",
    firmSlug: "meter-square",
    photos: [
      { url: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=1200", caption: "Living Room" },
      { url: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&q=80&w=1200", caption: "Bedroom" },
      { url: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=1200", caption: "Bathroom" },
    ],
    beforePhotoUrl: "https://images.unsplash.com/photo-1562184552-997c461abbe6?auto=format&fit=crop&q=80&w=1200",
    propertyType: "HDB",
    bedrooms: 3,
    sqft: 1001,
    budget: 43000,
    style: "Japandi",
    rooms: ["Living Room", "Master Bedroom", "Bathroom"],
    tags: ["Oak Veneer", "Wabi-Sabi", "Tatami Platform", "Shoji Screen"],
    completionDays: 58,
    completionDate: "Feb 2025",
    designer: "Lena Yap",
  },
  {
    id: "p10",
    slug: "minimalist-3room-resale-sembawang",
    title: "Minimalist 3-Room Resale",
    firmSlug: "meter-square",
    photos: [
      { url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=1200", caption: "Living Room" },
      { url: "https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&q=80&w=1200", caption: "Bedroom" },
    ],
    beforePhotoUrl: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&q=80&w=1200",
    propertyType: "HDB",
    bedrooms: 2,
    sqft: 753,
    budget: 35000,
    style: "Minimalist",
    rooms: ["Living Room", "Master Bedroom", "Kitchen"],
    tags: ["Greige Palette", "Fluted Panel", "Vinyl Flooring", "Space-Saving"],
    completionDays: 42,
    completionDate: "Apr 2025",
    designer: "Lena Yap",
  },

  // ── Chapter One Design ──
  {
    id: "p11",
    slug: "contemporary-condo-sengkang",
    title: "Contemporary 2-Bed Condo",
    firmSlug: "chapter-one-design",
    photos: [
      { url: "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&q=80&w=1200", caption: "Living Room" },
      { url: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=1200", caption: "Master Bedroom" },
      { url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=1200", caption: "Kitchen" },
    ],
    beforePhotoUrl: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&q=80&w=1200",
    propertyType: "Condo",
    bedrooms: 2,
    sqft: 850,
    budget: 62000,
    style: "Contemporary",
    rooms: ["Living Room", "Master Bedroom", "Kitchen", "Balcony"],
    tags: ["Marble Look Tiles", "Glass Splashback", "Custom TV Console", "Balcony Deck"],
    completionDays: 80,
    completionDate: "Dec 2024",
    designer: "Alicia Toh",
  },
  {
    id: "p12",
    slug: "japandi-5room-bto-punggol",
    title: "Japandi 5-Room BTO",
    firmSlug: "chapter-one-design",
    photos: [
      { url: "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?auto=format&fit=crop&q=80&w=1200", caption: "Living Room" },
      { url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=1200", caption: "Bedroom" },
    ],
    beforePhotoUrl: "https://images.unsplash.com/photo-1562184552-997c461abbe6?auto=format&fit=crop&q=80&w=1200",
    propertyType: "HDB",
    bedrooms: 4,
    sqft: 1184,
    budget: 55000,
    style: "Japandi",
    rooms: ["Living Room", "Master Bedroom", "Study", "Dining"],
    tags: ["Natural Linen", "Ash Wood", "Track Lighting", "Study Nook"],
    completionDays: 65,
    completionDate: "Feb 2025",
    designer: "Alicia Toh",
  },

  // ── Sky Creation ──
  {
    id: "p13",
    slug: "luxury-penthouse-river-valley",
    title: "Luxury Penthouse River Valley",
    firmSlug: "sky-creation",
    photos: [
      { url: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=1200", caption: "Living Room" },
      { url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200", caption: "Dining" },
      { url: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&q=80&w=1200", caption: "Master Bedroom" },
      { url: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=1200", caption: "Bathroom" },
    ],
    beforePhotoUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1200",
    propertyType: "Condo",
    bedrooms: 4,
    sqft: 2800,
    budget: 280000,
    style: "Luxury",
    rooms: ["Living Room", "Master Bedroom", "Bathroom", "Dining", "Study"],
    tags: ["Italian Marble", "Gold Fixtures", "Wine Cellar", "Smart Home", "Skylights"],
    completionDays: 150,
    completionDate: "Oct 2024",
    designer: "Raymond Chia",
  },
  {
    id: "p14",
    slug: "luxury-landed-bukit-timah",
    title: "Luxury Bungalow Bukit Timah",
    firmSlug: "sky-creation",
    photos: [
      { url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200", caption: "Facade & Pool" },
      { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200", caption: "Living Room" },
    ],
    beforePhotoUrl: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&q=80&w=1200",
    propertyType: "Landed",
    bedrooms: 5,
    sqft: 4500,
    budget: 480000,
    style: "Contemporary",
    rooms: ["Entire Home", "Living Room", "Dining", "Balcony"],
    tags: ["Infinity Pool", "Home Theatre", "Lift", "Landscaping", "BMS System"],
    completionDays: 240,
    completionDate: "Aug 2024",
    designer: "Raymond Chia",
  },

  // ── Starry Homestead ──
  {
    id: "p15",
    slug: "scandinavian-4room-bto-bukit-batok",
    title: "Scandinavian 4-Room BTO",
    firmSlug: "starry-homestead",
    photos: [
      { url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200", caption: "Living Room" },
      { url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1200", caption: "Dining" },
      { url: "https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&q=80&w=1200", caption: "Master Bedroom" },
    ],
    beforePhotoUrl: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&q=80&w=1200",
    propertyType: "HDB",
    bedrooms: 3,
    sqft: 1001,
    budget: 36000,
    style: "Scandinavian",
    rooms: ["Living Room", "Dining", "Master Bedroom", "Kitchen"],
    tags: ["White Oak", "IKEA Integration", "Pendant Lights", "Textured Wall"],
    completionDays: 50,
    completionDate: "Mar 2025",
    designer: "Jasmine Koh",
  },
  {
    id: "p16",
    slug: "minimalist-3room-bto-choa-chu-kang",
    title: "Minimalist 3-Room BTO First Home",
    firmSlug: "starry-homestead",
    photos: [
      { url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=1200", caption: "Living Room" },
      { url: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?auto=format&fit=crop&q=80&w=1200", caption: "Kitchen" },
    ],
    beforePhotoUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1200",
    propertyType: "HDB",
    bedrooms: 2,
    sqft: 753,
    budget: 28000,
    style: "Minimalist",
    rooms: ["Living Room", "Kitchen", "Master Bedroom"],
    tags: ["Budget-Friendly", "White Palette", "Multifunctional Furniture", "DIY Accent"],
    completionDays: 38,
    completionDate: "Apr 2025",
    designer: "Jasmine Koh",
  },

  // ── IDA Interior Design ──
  {
    id: "p17",
    slug: "peranakan-shophouse-tanjong-pagar",
    title: "Peranakan Shophouse Conversion",
    firmSlug: "ida-interior-design",
    photos: [
      { url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1200", caption: "Living Room" },
      { url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200", caption: "Dining" },
      { url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=1200", caption: "Master Bedroom" },
    ],
    beforePhotoUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1200",
    propertyType: "Landed",
    bedrooms: 3,
    sqft: 2200,
    budget: 160000,
    style: "Peranakan",
    rooms: ["Living Room", "Dining", "Master Bedroom", "Entire Home"],
    tags: ["Heritage Tiles", "Nyonya Motifs", "Arched Doorways", "Rattan", "Antique Fixtures"],
    completionDays: 130,
    completionDate: "Nov 2024",
    designer: "Cecilia Tan",
  },
  {
    id: "p18",
    slug: "contemporary-condo-alexandra",
    title: "Contemporary 3-Bed Condo Alexandra",
    firmSlug: "ida-interior-design",
    photos: [
      { url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200", caption: "Living Room" },
      { url: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=1200", caption: "Bathroom" },
    ],
    beforePhotoUrl: "https://images.unsplash.com/photo-1562184552-997c461abbe6?auto=format&fit=crop&q=80&w=1200",
    propertyType: "Condo",
    bedrooms: 3,
    sqft: 1200,
    budget: 88000,
    style: "Contemporary",
    rooms: ["Living Room", "Master Bedroom", "Bathroom", "Kitchen"],
    tags: ["Terrazzo", "Curved Sofa", "Statement Lighting", "Japandi Accents"],
    completionDays: 95,
    completionDate: "Jan 2025",
    designer: "Cecilia Tan",
  },

  // ── Renozone ──
  {
    id: "p19",
    slug: "industrial-hdb-yishun",
    title: "Industrial Chic 5-Room HDB",
    firmSlug: "renozone",
    photos: [
      { url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200", caption: "Living Room" },
      { url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=1200", caption: "Kitchen" },
      { url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=1200", caption: "Master Bedroom" },
    ],
    beforePhotoUrl: "https://images.unsplash.com/photo-1562184552-997c461abbe6?auto=format&fit=crop&q=80&w=1200",
    propertyType: "HDB",
    bedrooms: 4,
    sqft: 1184,
    budget: 48000,
    style: "Industrial",
    rooms: ["Living Room", "Kitchen", "Master Bedroom", "Dining"],
    tags: ["Exposed Brick", "Metal Accents", "Edison Bulbs", "Concrete Screed", "Open Shelving"],
    completionDays: 65,
    completionDate: "Feb 2025",
    designer: "Bryan Ong",
  },
  {
    id: "p20",
    slug: "modern-office-yishun",
    title: "Modern Retail & Office Space",
    firmSlug: "renozone",
    photos: [
      { url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1200", caption: "Open Plan Office" },
      { url: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=1200", caption: "Reception" },
    ],
    beforePhotoUrl: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&q=80&w=1200",
    propertyType: "Commercial",
    bedrooms: 0,
    sqft: 1800,
    budget: 95000,
    style: "Modern",
    rooms: ["Entire Home"],
    tags: ["Branded Signage", "Modular Workstations", "Acoustic Panels", "Feature Ceiling"],
    completionDays: 90,
    completionDate: "Jan 2025",
    designer: "Bryan Ong",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Data access functions — swap these for API calls when backend is ready
// ─────────────────────────────────────────────────────────────────────────────

export function getAllInspirations(): Project[] {
  return mockInspirations;
}

export function getInspirationBySlug(slug: string): Project | undefined {
  return mockInspirations.find((p) => p.slug === slug);
}

export function getInspirationsByFirmSlug(firmSlug: string): Project[] {
  return mockInspirations.filter((p) => p.firmSlug === firmSlug);
}

export function getRelatedInspirations(slug: string, limit = 3): Project[] {
  const project = getInspirationBySlug(slug);
  if (!project) return mockInspirations.slice(0, limit);
  return mockInspirations
    .filter(
      (p) =>
        p.slug !== slug &&
        (p.style === project.style ||
          p.propertyType === project.propertyType ||
          p.firmSlug === project.firmSlug)
    )
    .slice(0, limit);
}

export function getBeforeAfterInspirations(): Project[] {
  return mockInspirations.filter((p) => p.beforePhotoUrl && p.photos[0]?.url);
}
