export interface Product {
  id: string;
  sku: string;
  productId: string;
  variantId: number;
  name: string;
  variantName: string;
  category: string;
  status: string; // More flexible to handle any status string
  metalType: string;
  metalKarat: string;
  size: string;
  priceINR: number;
  basePrice?: number | null;
  featured: boolean;
  stockQuantity: number;
  goldWeight: number;
  goldPurity?: string;
  goldWeightVendor: number;
  diamondWeight?: number;
  diamondWeightVendor?: number;
  diamondCount?: number;
  diamondCountOther?: number;
  diamondShapes?: string;
  diamondSizes?: string;
  diamondCuts?: string;
  diamondQuality?: string;
  diamondShapeDetails?: string;
  makingCharges?: number | null;
  primaryImage?: string;
  allImages?: string[];
  totalImages?: number;
  styleNumber?: string;
  description?: string;
  createdDate?: string;
  totalSpecs?: number;
}

export interface ProductFilters {
  category?: string[];
  metalType?: string[];
  priceRange?: [number, number];
  metalKarat?: string[];
  diamondQuality?: string[];
  inStock?: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedVariant?: {
    metalType: string;
    metalKarat: string;
  };
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export interface Order {
  id: string;
  customerId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  createdAt: string;
  updatedAt: string;
  shippingAddress: Customer['address'];
  billingAddress: Customer['address'];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  productCount: number;
}