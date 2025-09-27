import { Product } from '@/types';

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const formatWeight = (weight: number): string => {
  return `${weight.toFixed(2)}g`;
};

export const formatDiamondWeight = (weight: number): string => {
  return `${weight.toFixed(2)} ct`;
};

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const parseImageUrls = (imageString: string): string[] => {
  if (!imageString) return [];
  return imageString.split(';').map(url => url.trim()).filter(Boolean);
};

export const getMetalTypeColor = (metalType: string): string => {
  switch (metalType.toLowerCase()) {
    case 'rose gold':
      return 'bg-rose-400';
    case 'yellow gold':
      return 'bg-yellow-400';
    case 'white gold':
      return 'bg-gray-300';
    default:
      return 'bg-gray-400';
  }
};

export const getCategoryIcon = (category: string): string => {
  const cat = category.toLowerCase();
  if (cat.includes('ring')) return '💍';
  if (cat.includes('earring')) return '💎';
  if (cat.includes('pendant') || cat.includes('necklace')) return '📿';
  if (cat.includes('bracelet')) return '💫';
  return '✨';
};

export const filterProducts = (
  products: Product[],
  filters: {
    category?: string[];
    metalType?: string[];
    priceRange?: [number, number];
    metalKarat?: string[];
    inStock?: boolean;
    searchQuery?: string;
  }
): Product[] => {
  return products.filter(product => {
    // Category filter
    if (filters.category && filters.category.length > 0) {
      if (!filters.category.some(cat => product.category.toLowerCase().includes(cat.toLowerCase()))) {
        return false;
      }
    }

    // Metal type filter
    if (filters.metalType && filters.metalType.length > 0) {
      if (!filters.metalType.includes(product.metalType)) {
        return false;
      }
    }

    // Price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      if (product.priceINR < min || product.priceINR > max) {
        return false;
      }
    }

    // Metal karat filter
    if (filters.metalKarat && filters.metalKarat.length > 0) {
      if (!filters.metalKarat.includes(product.metalKarat)) {
        return false;
      }
    }

    // Stock filter
    if (filters.inStock) {
      if (product.stockQuantity <= 0) {
        return false;
      }
    }

    // Search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const searchableText = [
        product.name,
        product.category,
        product.metalType,
        product.styleNumber,
        product.description,
      ].join(' ').toLowerCase();
      
      if (!searchableText.includes(query)) {
        return false;
      }
    }

    return true;
  });
};

export const getUniqueValues = (products: Product[], field: keyof Product): string[] => {
  const values = products.map(product => String(product[field])).filter(Boolean);
  return Array.from(new Set(values)).sort();
};

export const getPriceRange = (products: Product[]): [number, number] => {
  const prices = products.map(p => p.priceINR).filter(price => price > 0);
  return [Math.min(...prices), Math.max(...prices)];
};