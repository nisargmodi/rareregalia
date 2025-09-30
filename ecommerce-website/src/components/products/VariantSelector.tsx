'use client';

import { useState } from 'react';
import { ProductVariant } from '@/utils/productVariants';

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariant: ProductVariant;
  onVariantChange: (variant: ProductVariant) => void;
}

export function VariantSelector({ 
  variants, 
  selectedVariant, 
  onVariantChange 
}: VariantSelectorProps) {
  const [hoveredVariant, setHoveredVariant] = useState<ProductVariant | null>(null);

  // Group variants by metal type for better organization
  const metalTypeGroups = variants.reduce((acc, variant) => {
    const metalType = variant.metalType;
    if (!acc[metalType]) {
      acc[metalType] = [];
    }
    acc[metalType].push(variant);
    return acc;
  }, {} as Record<string, ProductVariant[]>);

  // Get color mapping for visual representation
  const getMetalColor = (metalType: string) => {
    switch (metalType.toLowerCase()) {
      case 'rose gold':
        return 'bg-gradient-to-br from-pink-300 to-rose-400';
      case 'white gold':
        return 'bg-gradient-to-br from-gray-100 to-gray-300';
      case 'yellow gold':
        return 'bg-gradient-to-br from-yellow-300 to-yellow-500';
      case 'platinum':
        return 'bg-gradient-to-br from-gray-200 to-gray-400';
      default:
        return 'bg-gradient-to-br from-gray-100 to-gray-300';
    }
  };

  const getMetalDisplayName = (metalType: string) => {
    return metalType.replace('Gold', '').trim() + (metalType.includes('Gold') ? ' Gold' : '');
  };

  return (
    <div className="space-y-6">
      {/* Color Selection */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Color</h3>
        <div className="flex flex-wrap gap-3">
          {Object.entries(metalTypeGroups).map(([metalType, typeVariants]) => {
            const isSelected = selectedVariant.metalType === metalType;
            const variant = typeVariants[0]; // Use first variant of this metal type
            const displayVariant = hoveredVariant?.metalType === metalType ? hoveredVariant : variant;
            
            return (
              <div
                key={metalType}
                className={`
                  relative group cursor-pointer border-2 rounded-lg p-1 transition-all duration-200
                  ${isSelected 
                    ? 'border-amber-500 bg-amber-50' 
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
                onClick={() => onVariantChange(variant)}
                onMouseEnter={() => setHoveredVariant(variant)}
                onMouseLeave={() => setHoveredVariant(null)}
              >
                <div className="flex items-center space-x-3 px-3 py-2 min-w-[120px]">
                  {/* Color Circle */}
                  <div className={`
                    w-6 h-6 rounded-full border-2 border-white shadow-sm
                    ${getMetalColor(metalType)}
                    ${isSelected ? 'ring-2 ring-amber-500' : ''}
                  `} />
                  
                  {/* Metal Type Name */}
                  <div>
                    <div className={`font-medium text-sm ${isSelected ? 'text-amber-900' : 'text-gray-700'}`}>
                      {getMetalDisplayName(metalType)}
                    </div>
                    {typeVariants.length > 1 && (
                      <div className="text-xs text-gray-500">
                        {typeVariants.length} options
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Selected indicator */}
                {isSelected && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center">
                    <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Gold Purity Selection (if multiple purities available for selected metal type) */}
      {/* REMOVED: Gold purity selection is now handled by dedicated GoldPuritySelector component */}

      {/* Price Display */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Selected Metal</p>
            <p className="font-medium text-gray-900">
              {getMetalDisplayName(selectedVariant.metalType)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">
              ₹{Math.round(selectedVariant.priceINR).toLocaleString('en-IN')}
            </p>
            <p className="text-sm text-gray-500">
              {selectedVariant.sku}
            </p>
          </div>
        </div>
        
        {/* Stock Status */}
        <div className="mt-2">
          {selectedVariant.stockQuantity > 0 ? (
            <div className="flex items-center text-sm text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              In Stock ({selectedVariant.stockQuantity} available)
            </div>
          ) : (
            <div className="flex items-center text-sm text-red-600">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
              Out of Stock
            </div>
          )}
        </div>
      </div>
    </div>
  );
}