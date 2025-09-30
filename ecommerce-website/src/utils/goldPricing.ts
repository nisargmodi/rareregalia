// Gold Pricing Configuration - Now loads from centralized JSON
import goldPricingData from '@/data/goldPricing.json';

export interface GoldPurityConfig {
  karat: number;
  purity: number; // percentage purity
  pricePerGram: number; // INR per gram
  makingChargesPercent: number; // percentage for making charges
  displayName: string;
  description: string;
}

export interface GoldPricingConfig {
  lastUpdated: string;
  marketSource: string;
  diamondPricePerCarat: number;
  currency: string;
  goldPricing: {
    [key: string]: {
      karat: number;
      purity: number;
      pricePerGram: number;
      makingChargesPercent: number;
      displayName: string;
      description: string;
    };
  };
}

// Load centralized gold pricing configuration
export const goldPricingConfig: GoldPricingConfig = goldPricingData;

/**
 * Get available gold purity options from centralized config
 */
export function getAvailableGoldPurities(): GoldPurityConfig[] {
  return Object.values(goldPricingConfig.goldPricing).map(config => ({
    karat: config.karat,
    purity: config.purity,
    pricePerGram: config.pricePerGram,
    makingChargesPercent: config.makingChargesPercent,
    displayName: config.displayName,
    description: config.description
  }));
}

/**
 * Get gold purity config by karat from centralized config
 */
export function getGoldPurityConfig(karat: number): GoldPurityConfig | null {
  const config = goldPricingConfig.goldPricing[`${karat}kt`];
  if (!config) return null;
  
  return {
    karat: config.karat,
    purity: config.purity,
    pricePerGram: config.pricePerGram,
    makingChargesPercent: config.makingChargesPercent,
    displayName: config.displayName,
    description: config.description
  };
}

/**
 * Calculate dynamic price using centralized gold pricing
 * This is the main pricing function that uses gold_weight_gms from inventory
 */
export function calculateDynamicPrice(
  goldWeightGrams: number,
  diamondWeightCarats: number,
  selectedKarat: number
): { goldPrice: number; diamondPrice: number; makingCharges: number; finalPrice: number } {
  const purityConfig = getGoldPurityConfig(selectedKarat);
  if (!purityConfig) {
    throw new Error(`Unsupported gold purity: ${selectedKarat}kt`);
  }
  
  // Calculate gold price based on weight and purity
  const goldContent = goldWeightGrams * (purityConfig.purity / 100);
  const goldPrice = goldContent * purityConfig.pricePerGram;
  
  // Calculate diamond price
  const diamondPrice = diamondWeightCarats * goldPricingConfig.diamondPricePerCarat;
  
  // Calculate making charges
  const makingCharges = (goldPrice + diamondPrice) * (purityConfig.makingChargesPercent / 100);
  
  // Calculate final price
  const finalPrice = goldPrice + diamondPrice + makingCharges;
  
  return {
    goldPrice: Math.round(goldPrice),
    diamondPrice: Math.round(diamondPrice),
    makingCharges: Math.round(makingCharges),
    finalPrice: Math.round(finalPrice)
  };
}

/**
 * Get price from product data using simplified inventory approach
 * Uses gold_weight_gms and diamond_weight_ct for calculation
 */
export function getPriceFromEnhancedProduct(
  product: any,
  selectedKarat: number = 18
): number {
  const goldWeight = product.goldWeight || product.gold_weight_gms || 0;
  const diamondWeight = product.diamondWeight || product.diamond_weight_ct || 0;
  
  if (goldWeight === 0) {
    // Fallback for products without weight data
    return Math.round(product.priceINR || product.basePrice || 0);
  }
  
  const pricing = calculateDynamicPrice(goldWeight, diamondWeight, selectedKarat);
  return pricing.finalPrice;
}

/**
 * Legacy function for backward compatibility
 */
export function calculatePriceWithGoldPurity(
  basePrice: number,
  selectedKarat: number
): number {
  const purityConfig = getGoldPurityConfig(selectedKarat);
  if (!purityConfig) {
    return Math.round(basePrice);
  }
  
  // Simple multiplier approach for legacy products
  const multiplier = purityConfig.pricePerGram / goldPricingConfig.goldPricing['18kt'].pricePerGram;
  return Math.round(basePrice * multiplier);
}

/**
 * Get current gold pricing configuration info
 */
export function getGoldPricingInfo() {
  return {
    lastUpdated: goldPricingConfig.lastUpdated,
    marketSource: goldPricingConfig.marketSource,
    currency: goldPricingConfig.currency,
    diamondPricePerCarat: goldPricingConfig.diamondPricePerCarat,
    availableKarats: Object.keys(goldPricingConfig.goldPricing)
  };
}

/**
 * Update gold pricing (for admin use - updates the centralized config)
 */
export function updateGoldPricing(karat: number, newPricePerGram: number): boolean {
  try {
    // In a real application, this would make an API call to update the backend
    console.warn('updateGoldPricing called - this should update the centralized goldPricing.json file');
    console.log(`Updating ${karat}kt gold price to ₹${newPricePerGram}/gram`);
    
    // For now, just log the update request
    // In production, this would update the goldPricing.json file and trigger price recalculation
    return true;
  } catch (error) {
    console.error('Error updating gold pricing:', error);
    return false;
  }
}