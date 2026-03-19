export type DesignStyle =
  | "Contemporary" | "Modern" | "Minimalist" | "Japandi"
  | "Scandinavian" | "Industrial" | "Luxury" | "Peranakan" | "Other";

export type RoomType =
  | "Living Room" | "Kitchen" | "Master Bedroom" | "Common Bedroom"
  | "Bathroom" | "Study" | "Balcony" | "Dining" | "Entire Home";

export type PropertyType = "HDB" | "Condo" | "Landed" | "Commercial";

export interface ProjectPhoto {
  url: string;
  caption?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  firmSlug: string;
  photos: ProjectPhoto[];
  beforePhotoUrl?: string;          // Before state photo for slider
  propertyType: PropertyType;
  bedrooms: number;
  sqft: number;
  budget: number;
  style: DesignStyle;
  rooms: RoomType[];
  tags: string[];
  completionDays?: number;          // How long the reno took
  completionDate?: string;          // e.g. "Jan 2025"
  designer?: string;                // Designer name on this project
}

export interface Review {
  id: string;
  reviewerName: string;
  rating: number;
  body: string;
  date: string;
  designerName?: string;
  propertyType?: string;
  renovationBudget?: number;
  isVerified: boolean;
}

export interface FirmBadge {
  id: string;
  name: string;
  grade: "I" | "II" | "III";
  description: string;
  icon: string;
}

export interface Accreditation {
  id: string;
  name: string;
  logo: string;
  tooltip: string;
}

export interface Firm {
  id: string;
  slug: string;
  name: string;
  logo: string;
  banner: string;
  address: string;
  district: string;
  bio: string;
  established: number;
  rating: number;
  reviewCount: number;
  avgBudget: number;
  responseTime: string;
  projectTypes: { hdb: number; condo: number; landed: number; commercial: number };
  styles: DesignStyle[];
  badges: FirmBadge[];
  accreditations: Accreditation[];
  reviews: Review[];
  isCaseTrust: boolean;
  isFeatured: boolean;
  // ── New contact & social fields ──
  phone?: string;
  whatsapp?: string;
  website?: string;
  instagram?: string;
  email?: string;
  // ── New metadata fields ──
  serviceAreas?: string[];          // Districts served
  teamSize?: number;                // Number of designers
  warranty?: string;                // e.g. "2-year structural warranty"
  totalProjects?: number;           // All-time completed projects
}
