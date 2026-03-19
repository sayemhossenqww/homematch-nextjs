export type VendorCategory =
  | "Materials"
  | "Furniture"
  | "Lighting"
  | "Smart Home"
  | "Appliances"
  | "Flooring"
  | "Sanitary Ware"
  | "Outdoor";

export type PriceRange = "Budget" | "Mid-Range" | "Premium" | "Luxury";

export interface VendorBadge {
  id: string;
  name: string;
  grade: "I" | "II" | "III";
  description: string;
  icon: string;
}

export interface VendorReview {
  id: string;
  reviewerName: string;
  rating: number;
  body: string;
  date: string;
  isVerified: boolean;
  projectType?: string;
}

export interface VendorProduct {
  name: string;
  description: string;
  priceFrom?: number;
}

export interface Vendor {
  id: string;
  slug: string;
  name: string;
  logo: string;
  banner: string;
  category: VendorCategory;
  subcategory?: string;
  bio: string;
  established: number;
  rating: number;
  reviewCount: number;
  priceRange: PriceRange;
  website?: string;
  instagram?: string;
  phone?: string;
  email?: string;
  address?: string;
  showrooms?: string[];
  tags: string[];
  badges: VendorBadge[];
  reviews: VendorReview[];
  products?: VendorProduct[];
  isFeatured: boolean;
  partnerFirms?: string[];
}
