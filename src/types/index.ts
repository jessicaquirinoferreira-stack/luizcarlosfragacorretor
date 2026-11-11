export type TransactionType = 'venda' | 'locacao';

export type PropertyType = 
  | 'apartamento' 
  | 'casa' 
  | 'cobertura' 
  | 'terreno' 
  | 'comercial' 
  | 'flat' 
  | 'outro';

export type PropertyStatus = 'published' | 'draft' | 'sold' | 'rented';

export interface MediaItem {
  id: string;
  url: string;
  type: 'image' | 'video';
  caption?: string;
  isCover?: boolean;
  order?: number;
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  code: string;
  type: PropertyType;
  transactionType: TransactionType;
  price: number;
  condoFee?: number;
  iptuFee?: number;
  neighborhood: string;
  city: string;
  state: string;
  addressPrivate?: string; // Visible only to authenticated admin
  areaM2: number;
  bedrooms: number;
  suites: number;
  bathrooms: number;
  parkingSpots: number;
  description: string;
  features: string[];
  images: MediaItem[];
  videoUrl?: string;
  isFeatured: boolean;
  status: PropertyStatus;
  developmentId?: string;
  developmentName?: string;
  pendingConfirmation: boolean;
  viewsCount?: number;
  createdAt: string;
  updatedAt: string;
}

export type DevelopmentStatus = 'lancamento' | 'em_construcao' | 'pronto_para_morar' | 'entregue';

export interface Development {
  id: string;
  name: string;
  slug: string;
  code: string;
  neighborhood: string;
  city: string;
  status: DevelopmentStatus;
  startingPrice?: number;
  condoFee?: number;
  description: string;
  features: string[];
  unitsAvailable?: number;
  totalFloors?: number;
  unitsPerFloor?: number;
  images: MediaItem[];
  videoUrl?: string;
  isFeatured: boolean;
  pendingConfirmation: boolean;
  isPublished: boolean;
  viewsCount?: number;
  createdAt: string;
  updatedAt: string;
}

export type LeadStatus = 
  | 'novo' 
  | 'em_atendimento' 
  | 'visita_solicitada' 
  | 'visita_confirmada' 
  | 'aguardando_retorno' 
  | 'proposta' 
  | 'convertido' 
  | 'nao_convertido';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  interestType: 'property' | 'development' | 'general' | 'evaluation' | 'management';
  propertyId?: string;
  propertyTitle?: string;
  developmentId?: string;
  developmentName?: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  originPage?: string;
  status: LeadStatus;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface LandingPage {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  heroImage: string;
  targetType: 'property' | 'development' | 'custom';
  targetId?: string;
  customPrice?: string;
  highlightPoints: string[];
  description: string;
  images: MediaItem[];
  whatsappCustomMessage?: string;
  isActive: boolean;
  viewsCount: number;
  leadsCount: number;
  utmPreset?: {
    source: string;
    campaign: string;
    medium?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface SiteSettings {
  brokerName: string;
  creci: string;
  bio: string;
  aboutText: string;
  address: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  instagramUser: string;
  primaryColor: string;
  secondaryColor: string;
  heroTitle: string;
  heroSubtitle: string;
  updatedAt?: string;
}

export interface SearchFilterState {
  searchQuery: string;
  transactionType: 'all' | 'venda' | 'locacao';
  type: string;
  neighborhood: string;
  minPrice: number;
  maxPrice: number;
  minBedrooms: number;
  minSuites: number;
  minParking: number;
  onlyFeatured: boolean;
  sortBy: 'recent' | 'price_asc' | 'price_desc' | 'area_desc';
}
