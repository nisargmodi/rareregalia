'use client';

import { useState } from 'react';
import { getAvailableGoldPurities, calculatePriceWithGoldPurity, getPriceFromEnhancedProduct, GoldPurityConfig } from '@/utils/goldPricing';

interface GoldPuritySelectorProps {
  basePrice: number;
  selectedKarat: number;
  onKaratChange: (karat: number, newPrice: number) => void;
  className?: string;
  product?: any; // Enhanced product data for dynamic pricing
}

export function GoldPuritySelector({ 
  basePrice, 
  selectedKarat, 
  onKaratChange, 
  className = '',
  product
}: GoldPuritySelectorProps) {
  const [hoveredKarat, setHoveredKarat] = useState<number | null>(null);
  const availablePurities = getAvailableGoldPurities();

  const handleKaratSelection = (karat: number) => {
    // Use enhanced pricing if product data is available
    const newPrice = product 
      ? getPriceFromEnhancedProduct(product, karat)
      : calculatePriceWithGoldPurity(basePrice, karat);
    onKaratChange(karat, newPrice);
  };

  const getKaratStyle = (purityConfig: GoldPurityConfig, isSelected: boolean) => {
    const baseClasses = "px-3 py-2 rounded-lg border-2 transition-all duration-200 cursor-pointer";
    
    if (isSelected) {
      return `${baseClasses} border-amber-500 bg-amber-50 text-amber-900`;
    }
    
    return `${baseClasses} border-gray-200 hover:border-amber-300 hover:bg-amber-25 text-gray-700`;
  };

  const getPriceDisplay = (karat: number) => {
    // Use enhanced pricing if product data is available
    const price = product 
      ? getPriceFromEnhancedProduct(product, karat)
      : calculatePriceWithGoldPurity(basePrice, karat);
    return `₹${Math.round(price).toLocaleString('en-IN')}`;
  };

  const getPriceDifference = (karat: number) => {
    // Use enhanced pricing if product data is available
    const price = product 
      ? getPriceFromEnhancedProduct(product, karat)
      : calculatePriceWithGoldPurity(basePrice, karat);
    const baseKaratPrice = product 
      ? getPriceFromEnhancedProduct(product, 18)
      : calculatePriceWithGoldPurity(basePrice, 18); // 18kt as reference
    const difference = price - baseKaratPrice;
    
    if (difference === 0) return null;
    
    const sign = difference > 0 ? '+' : '';
    return `${sign}₹${Math.round(Math.abs(difference)).toLocaleString('en-IN')}`;
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-2">Gold Purity</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {availablePurities.map((purityConfig) => {
          const isSelected = selectedKarat === purityConfig.karat;
          const isHovered = hoveredKarat === purityConfig.karat;
          const displayKarat = isHovered || isSelected ? purityConfig.karat : selectedKarat;
          
          return (
            <div
              key={purityConfig.karat}
              className={getKaratStyle(purityConfig, isSelected)}
              onClick={() => handleKaratSelection(purityConfig.karat)}
              onMouseEnter={() => setHoveredKarat(purityConfig.karat)}
              onMouseLeave={() => setHoveredKarat(null)}
            >
              {/* Karat Display */}
              <div className="text-center">
                <div className={`text-sm font-medium ${isSelected ? 'text-amber-900' : 'text-gray-900'}`}>
                  {purityConfig.displayName}
                </div>
              </div>

              {/* Price Display */}
              <div className="mt-1 text-center">
                <div className={`text-sm font-medium ${isSelected ? 'text-amber-900' : 'text-gray-900'}`}>
                  {getPriceDisplay(purityConfig.karat)}
                </div>
                {getPriceDifference(purityConfig.karat) && (
                  <div className={`text-xs ${
                    calculatePriceWithGoldPurity(basePrice, purityConfig.karat) > calculatePriceWithGoldPurity(basePrice, 18)
                      ? 'text-red-600' 
                      : 'text-green-600'
                  }`}>
                    {getPriceDifference(purityConfig.karat)}
                  </div>
                )}
              </div>

              {/* Selected Indicator */}
              {isSelected && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selection Summary */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-amber-800">Selected Gold Purity</p>
            <p className="text-lg font-bold text-amber-900">
              {selectedKarat}kt Gold
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-amber-700">Final Price</p>
            <p className="text-2xl font-bold text-amber-900">
              {getPriceDisplay(selectedKarat)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}