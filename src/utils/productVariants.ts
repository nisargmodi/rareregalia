import { Product } from '@/types';

export interface ProductVariant {
  id: string;
  sku: string;
  baseProductId?: string; // Just the numeric part for images
  variantId: number;
  metalType: string;
  metalKarat: string;
  size: string;
  priceINR: number;
  primaryImage: string;
  allImages: string[];
  allVideos?: string[];
  stockQuantity: number;
  goldPurity?: string;
  variantName: string;
}

export interface ProductGroup {
  productId: string;
  name: string;
  category: string;
  description: string;
  styleNumber: string;
  baseVariant: ProductVariant;
  variants: ProductVariant[];
  availableMetalTypes: string[];
  availableSizes: string[];
  priceRange: {
    min: number;
    max: number;
  };
  totalImages: number;
  featured: boolean;
}

/**
 * Groups products by their productId to create product variants
 */
export function groupProductVariants(products: Product[]): ProductGroup[] {
  const productGroups = new Map<string, ProductGroup>();

  products.forEach(product => {
    const { productId } = product;
    
    if (!productGroups.has(productId)) {
      // Create new product group
      const productGroup: ProductGroup = {
        productId,
        name: product.name,
        category: product.category,
        description: product.description || '',
        styleNumber: product.styleNumber || '',
        baseVariant: createVariantFromProduct(product),
        variants: [],
        availableMetalTypes: [],
        availableSizes: [],
        priceRange: { min: product.priceINR, max: product.priceINR },
        totalImages: product.totalImages || 0,
        featured: product.featured || false,
      };
      
      productGroups.set(productId, productGroup);
    }

    const group = productGroups.get(productId)!;
    const variant = createVariantFromProduct(product);
    
    // Add variant to the group
    group.variants.push(variant);
    
    // Update available metal types
    if (!group.availableMetalTypes.includes(product.metalType)) {
      group.availableMetalTypes.push(product.metalType);
    }
    
    // Update available sizes
    if (!group.availableSizes.includes(product.size)) {
      group.availableSizes.push(product.size);
    }
    
    // Update price range
    group.priceRange.min = Math.min(group.priceRange.min, product.priceINR);
    group.priceRange.max = Math.max(group.priceRange.max, product.priceINR);
    
    // Updated featured status (if any variant is featured)
    group.featured = group.featured || product.featured;
    
    // Sort variants by price
    group.variants.sort((a, b) => a.priceINR - b.priceINR);
  });

  return Array.from(productGroups.values());
}

/**
 * Creates a variant object from a product
 */
function createVariantFromProduct(product: Product): ProductVariant {
  return {
    id: product.id,
    sku: product.sku,
    baseProductId: product.baseProductId,
    variantId: product.variantId,
    metalType: product.metalType,
    metalKarat: product.metalKarat,
    size: product.size,
    priceINR: product.priceINR,
    primaryImage: product.primaryImage || '',
    allImages: product.allImages || [],
    stockQuantity: product.stockQuantity,
    goldPurity: product.goldPurity,
    variantName: product.variantName,
  };
}

/**
 * Gets a product group by productId
 */
export function getProductGroup(products: Product[], productId: string): ProductGroup | null {
  const groups = groupProductVariants(products);
  return groups.find(group => group.productId === productId) || null;
}

/**
 * Gets all product groups as an array
 */
export function getAllProductGroups(products: Product[]): ProductGroup[] {
  return groupProductVariants(products);
}

/**
 * Finds a product group that contains a specific variant ID
 */
export function findProductGroupByVariantId(products: Product[], variantId: string): ProductGroup | null {
  const product = products.find(p => p.id === variantId);
  if (!product) return null;
  
  return getProductGroup(products, product.productId);
}

/**
 * Gets images for a specific metal type from all images
 */
export function getImagesForMetalType(allImages: string[], metalType: string): string[] {
  const metalTypeMap: Record<string, string[]> = {
    'Rose Gold': ['R1', 'R2', 'R3', 'R4'],
    'White Gold': ['W1', 'W2', 'W3', 'W4'],
    'Yellow Gold': ['Y1', 'Y2', 'Y3', 'Y4'],
  };

  const suffixes = metalTypeMap[metalType] || ['R1', 'R2', 'R3', 'R4'];
  
  const filteredImages = allImages.filter(image => 
    suffixes.some(suffix => image.includes(`-${suffix}.`))
  );

  // If no specific images found, return model or detail images
  if (filteredImages.length === 0) {
    const fallbackImages = allImages.filter(image => 
      image.includes('Model') || image.includes('Details') || image.includes('Render')
    );
    return fallbackImages.slice(0, 4);
  }

  return filteredImages;
}

/**
 * Gets the primary image for a specific metal type
 */
export function getPrimaryImageForMetalType(allImages: string[], metalType: string): string {
  const imagesForType = getImagesForMetalType(allImages, metalType);
  return imagesForType[0] || allImages[0] || '/images/hero-jewelry.jpg';
}

/**
 * Creates a URL-friendly slug from productId
 */
export function createProductSlug(productId: string, name: string): string {
  const cleanName = name.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
  return `${productId}-${cleanName}`;
}

/**
 * Parses a product slug back to productId
 */
export function parseProductSlug(slug: string): string {
  // Extract productId from slug (everything before the first dash after the number)
  const match = slug.match(/^(\d+-\w+)/);
  return match ? match[1] : slug;
}