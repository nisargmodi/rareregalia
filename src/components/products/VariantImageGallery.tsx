'use client';

import { useState, useEffect } from 'react';
import { BasicProductImage } from '@/app/products/[id]/BasicProductImage';
import { getImagesForMetalType } from '@/utils/productVariants';
import { ChevronLeftIcon, ChevronRightIcon, PlayIcon } from '@heroicons/react/24/outline';

interface MediaItem {
  type: 'image' | 'video';
  url: string;
}

interface VariantImageGalleryProps {
  allImages: string[];
  allVideos?: string[];
  selectedMetalType: string;
  productName: string;
  className?: string;
}

export function VariantImageGallery({ 
  allImages, 
  allVideos = [],
  selectedMetalType, 
  productName,
  className = ''
}: VariantImageGalleryProps) {
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [currentMedia, setCurrentMedia] = useState<MediaItem[]>([]);

  // Update media when metal type or videos change
  useEffect(() => {
    const imagesForType = getImagesForMetalType(allImages, selectedMetalType);
    const videosForType = allVideos.filter(video => {
      const videoLower = video.toLowerCase();
      if (selectedMetalType.includes('White')) {
        return videoLower.includes('white') || videoLower.includes('-w.') || videoLower.includes('-w-');
      } else if (selectedMetalType.includes('Rose')) {
        return videoLower.includes('rose') || videoLower.includes('-r.') || videoLower.includes('-r-') || videoLower.includes('-rg.');
      } else if (selectedMetalType.includes('Yellow')) {
        return videoLower.includes('yellow') || videoLower.includes('-y.') || videoLower.includes('-y-');
      }
      return false;
    });
    
    // Combine images and videos
    const mediaItems: MediaItem[] = [
      ...imagesForType.map(url => ({ type: 'image' as const, url })),
      ...videosForType.map(url => ({ type: 'video' as const, url }))
    ];
    
    setCurrentMedia(mediaItems);
    setSelectedMediaIndex(0); // Reset to first item when variant changes
  }, [allImages, allVideos, selectedMetalType]);

  const handlePrevious = () => {
    setSelectedMediaIndex((prev) => 
      prev === 0 ? currentMedia.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setSelectedMediaIndex((prev) => 
      prev === currentMedia.length - 1 ? 0 : prev + 1
    );
  };

  const currentMediaItem = currentMedia[selectedMediaIndex] || { type: 'image' as const, url: allImages[0] };

  if (!currentMedia.length) {
    return (
      <div className={`bg-gray-200 rounded-lg flex items-center justify-center aspect-square ${className}`}>
        <p className="text-gray-500">No media available</p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Media Display */}
      <div className="relative aspect-square bg-white rounded-lg overflow-hidden shadow-lg group">
        {currentMediaItem.type === 'image' ? (
          <BasicProductImage
            src={currentMediaItem.url}
            alt={`${productName} - ${selectedMetalType}`}
            className="w-full h-full"
          />
        ) : (
          <video
            key={currentMediaItem.url}
            src={currentMediaItem.url}
            controls
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            Your browser does not support the video tag.
          </video>
        )}
        
        {/* Media Navigation Arrows */}
        {currentMedia.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
              aria-label="Previous media"
            >
              <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
            </button>
            
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
              aria-label="Next media"
            >
              <ChevronRightIcon className="w-5 h-5 text-gray-600" />
            </button>
          </>
        )}
        
        {/* Media Counter */}
        {currentMedia.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm z-10">
            {selectedMediaIndex + 1} / {currentMedia.length}
          </div>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {currentMedia.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {currentMedia.map((item, index) => (
            <button
              key={`${item.url}-${index}`}
              onClick={() => setSelectedMediaIndex(index)}
              className={`
                relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200
                ${index === selectedMediaIndex
                  ? 'border-amber-500 ring-2 ring-amber-200'
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              {item.type === 'image' ? (
                <BasicProductImage
                  src={item.url}
                  alt={`${productName} thumbnail ${index + 1}`}
                  className="w-full h-full opacity-90 hover:opacity-100 transition-opacity"
                />
              ) : (
                <>
                  <video
                    src={item.url}
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-black/50 rounded-full p-2">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Metal Type Indicator */}
      <div className="text-center">
        <p className="text-sm font-medium text-gray-700">{selectedMetalType}</p>
        <p className="text-xs text-gray-500">
          {currentMedia.length} {currentMedia.length === 1 ? 'item' : 'items'} available
        </p>
      </div>
    </div>
  );
}