'use client';

import React from 'react';
import { ProductVariant } from '@/utils/productVariants';

interface SizeSelectorProps {
  variants: ProductVariant[];
  selectedVariant: ProductVariant;
  selectedMetalType: string;
  onVariantChange: (variant: ProductVariant) => void;
  className?: string;
}

export function SizeSelector({ 
  variants, 
  selectedVariant, 
  selectedMetalType,
  onVariantChange, 
  className = '' 
}: SizeSelectorProps) {
  // Filter variants by the currently selected metal type to get available sizes
  const availableSizesForMetal = variants
    .filter(variant => variant.metalType === selectedMetalType)
    .map(variant => variant.size)
    .filter((size, index, arr) => arr.indexOf(size) === index) // Remove duplicates
    .sort((a, b) => {
      // Sort sizes properly - handle both numeric and string sizes
      const aNum = parseFloat(a);
      const bNum = parseFloat(b);
      if (!isNaN(aNum) && !isNaN(bNum)) {
        return aNum - bNum;
      }
      return a.localeCompare(b);
    });

  // If there's only one size or no size variations, don't show the selector
  if (availableSizesForMetal.length <= 1) {
    return null;
  }

  const handleSizeChange = (size: string) => {
    // Find the variant with the selected metal type and size
    const newVariant = variants.find(
      variant => variant.metalType === selectedMetalType && variant.size === size
    );
    
    if (newVariant && onVariantChange) {
      onVariantChange(newVariant);
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900">Size</h3>
      
      <div className="flex flex-wrap gap-2">
        {availableSizesForMetal.map(size => {
          const isSelected = selectedVariant.size === size;
          const variant = variants.find(
            v => v.metalType === selectedMetalType && v.size === size
          );
          const isAvailable = variant && variant.stockQuantity > 0;
          
          return (
            <button
              key={size}
              onClick={() => handleSizeChange(size)}
              disabled={!isAvailable}
              className={`
                px-4 py-2 rounded-lg border-2 font-medium transition-all duration-200
                ${isSelected
                  ? 'border-amber-500 bg-amber-50 text-amber-700'
                  : isAvailable
                    ? 'border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50'
                    : 'border-gray-100 text-gray-400 cursor-not-allowed bg-gray-50'
                }
              `}
            >
              {size === 'Standard' ? 'One Size' : size}
            </button>
          );
        })}
      </div>
      
      {/* Selected Size Info */}
      <div className="text-sm text-gray-600">
        Selected size: <span className="font-medium text-gray-900">
          {selectedVariant.size === 'Standard' ? 'One Size' : selectedVariant.size}
        </span>
      </div>
    </div>
  );
}