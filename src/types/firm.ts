export type BadgeGrade = "I" | "II" | "III";

export interface Badge {
  id: string;
  label: string;
  grade: BadgeGrade;
  description: string;
}

export interface FirmReview {
  id: string;
  reviewerName: string;
  rating: number;
  date: string;
  renovationType: string;
  budget: number;
  designerName?: string;
  body: string;
  helpfulCount: number;
}

export interface FirmProject {
  id: string;
  photoUrl: string;
  style: string;
  roomType: string;
  budget?: number;
  sqft?: number;
  propertyType: string;
}

export interface ProjectTypeSplit {
  hdb: number;
  condo: number;
  landed: number;
  commercial: number;
}

export interface Firm {
  id: string;
  slug: string;
  name: string;
  logo: string;
  bannerPhoto: string;
  address: string;
  district: string;
  bio: string;
  shortBio: string;
  established: number;
  teamSize: number;
  rating: number;
  reviewCount: number;
  responseTime: string;
  avgBudget: number;
  projectTypes: ProjectTypeSplit;
  styles: string[];
  badges: Badge[];
  accreditations: string[];
  reviews: FirmReview[];
  featuredProjects: FirmProject[];
  phone?: string;
  email?: string;
  website?: string;
  whatsapp?: string;
  showroomAddress?: string;
  showroomHours?: string;
  isCaseTrust: boolean;
  isFeatured: boolean;
  isVerified: boolean;
  isBoutique: boolean;
}
