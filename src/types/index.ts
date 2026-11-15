export type ProductVariant = {
  id: string;
  size: 'S' | 'M' | 'L' | 'XL' | 'XXL';
  sku: string;
  stock: number;
};

export type Product = {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  backImage?: string;
  gallery?: string[];
  color: string;
  tag: string;
  category: string;
  description: string;
  specifications: {
    fit: string;
    fabric: string;
    weight: string;
    print: string;
    origin: string;
    care: string;
  };
  sizes: ('S' | 'M' | 'L' | 'XL' | 'XXL')[];
  variants?: ProductVariant[];
  sku: string;
  stock: number;
  active: boolean;
  featured?: boolean;
  badge?: string;
  createdAt: string;
};

export type CartItem = {
  key: string;
  productId: string;
  name: string;
  size: string;
  color: string;
  price: number;
  image: string;
  quantity: number;
};

export type Collection = {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  bannerImage: string;
  productIds: string[];
  active: boolean;
  order: number;
};

export type WebsiteSettings = {
  siteName: string;
  tagline: string;
  logoText: string;
  logoUrl?: string;
  mobileLogoUrl?: string;
  faviconUrl?: string;
  announcementText: string;
  announcementSubtext: string;
  announcementLink: string;
  announcementActive: boolean;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  headingFont: string;
  bodyFont: string;
  buttonStyle: 'skewed' | 'sharp' | 'rounded';
  currency: string;
  currencySymbol: string;
  shippingCharge: number;
  freeShippingThreshold: number;
  contactEmail: string;
  businessPhone: string;
  whatsappNumber: string;
  instagramUrl: string;
  youtubeUrl: string;
  businessAddress: string;
  maintenanceMode: boolean;
  headerHeight: number;
};

export type HomepageSection = {
  id: string;
  type: 'hero' | 'featured' | 'new_arrivals' | 'collection_spotlight' | 'manifesto' | 'editorial' | 'instagram' | 'newsletter';
  title: string;
  subtitle: string;
  eyebrow?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  backgroundImage?: string;
  visible: boolean;
  order: number;
  customData?: Record<string, any>;
};

export type NavigationItem = {
  id: string;
  label: string;
  href: string;
  location: 'header' | 'footer' | 'both';
  order: number;
  visible: boolean;
  badge?: string;
};

export type ContentPage = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  content: string;
  metaTitle?: string;
  metaDescription?: string;
  updatedAt: string;
  published: boolean;
};

export type OrderStatus = 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Refunded';

export type Order = {
  id: string;
  orderNumber: string;
  createdAt: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pinCode: string;
  };
  items: {
    productId: string;
    name: string;
    size: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  discountCode?: string;
  total: number;
  status: OrderStatus;
  paymentMethod: 'Razorpay' | 'COD';
  paymentId?: string;
  trackingNumber?: string;
  carrier?: string;
  notes?: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  joinedDate: string;
  defaultAddress?: string;
  status: 'Active' | 'Blocked';
};

export type DiscountCode = {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrderValue: number;
  usageLimit?: number;
  usageCount: number;
  active: boolean;
  expiresAt?: string;
  description: string;
};

export type MediaItem = {
  id: string;
  name: string;
  url: string;
  size: string;
  format: string;
  altText: string;
  category: 'products' | 'banners' | 'lookbook' | 'general';
  uploadedAt: string;
};

export type AuditLog = {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  details: string;
};

export type AdminUser = {
  id: string;
  email: string;
  role: 'Owner' | 'Administrator' | 'Editor' | 'Order Manager';
  name: string;
};
