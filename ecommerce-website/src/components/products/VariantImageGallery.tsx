'use client';

import { useState, useEffect } from 'react';
import { BasicProductImage } from '@/app/products/[id]/BasicProductImage';
import { getImagesForMetalType } from '@/utils/productVariants';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface VariantImageGalleryProps {
  allImages: string[];
  selectedMetalType: string;
  productName: string;
  className?: string;
}

export function VariantImageGallery({ 
  allImages, 
  selectedMetalType, 
  productName,
  className = ''
}: VariantImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [currentImages, setCurrentImages] = useState<string[]>([]);

  // Update images when metal type changes
  useEffect(() => {
    const imagesForType = getImagesForMetalType(allImages, selectedMetalType);
    setCurrentImages(imagesForType);
    setSelectedImageIndex(0); // Reset to first image when variant changes
  }, [allImages, selectedMetalType]);

  const handlePrevious = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? currentImages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setSelectedImageIndex((prev) => 
      prev === currentImages.length - 1 ? 0 : prev + 1
    );
  };

  const currentImage = currentImages[selectedImageIndex] || allImages[0];

  if (!currentImages.length) {
    return (
      <div className={`bg-gray-200 rounded-lg flex items-center justify-center ${className}`}>
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Image Display */}
      <div className="relative aspect-square bg-white rounded-lg overflow-hidden shadow-lg group">
        <BasicProductImage
          src={currentImage}
          alt={`${productName} - ${selectedMetalType}`}
          className="w-full h-full"
        />
        
        {/* Image Navigation Arrows */}
        {currentImages.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Previous image"
            >
              <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
            </button>
            
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Next image"
            >
              <ChevronRightIcon className="w-5 h-5 text-gray-600" />
            </button>
          </>
        )}
        
        {/* Image Counter */}
        {currentImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {selectedImageIndex + 1} / {currentImages.length}
          </div>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {currentImages.length > 1 && (
        <div className="grid grid-cols-2 gap-4">
          {currentImages.map((image, index) => (
            <button
              key={`${image}-${index}`}
              onClick={() => setSelectedImageIndex(index)}
              className={`
                aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200
                ${index === selectedImageIndex
                  ? 'border-amber-500 ring-2 ring-amber-200'
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              <BasicProductImage
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                className="w-full h-full opacity-90 hover:opacity-100 transition-opacity"
              />
            </button>
          ))}
        </div>
      )}

      {/* Metal Type Indicator */}
      <div className="text-center">
        <p className="text-sm font-medium text-gray-700">{selectedMetalType}</p>
        <p className="text-xs text-gray-500">
          {currentImages.length} {currentImages.length === 1 ? 'image' : 'images'} available
        </p>
      </div>
    </div>
  );
}