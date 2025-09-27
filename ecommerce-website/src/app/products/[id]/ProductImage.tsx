'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ProductImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  priority?: boolean;
}

export function ProductImage({ 
  src, 
  alt, 
  fallbackSrc = '/images/hero-jewelry.jpg',
  className = '',
  priority = false 
}: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [useRegularImg, setUseRegularImg] = useState(false);

  console.log('ProductImage render:', { src, imgSrc, hasError, isLoading, useRegularImg });

  useEffect(() => {
    // Reset state when src changes
    setImgSrc(src);
    setHasError(false);
    setIsLoading(true);
    setUseRegularImg(false);
  }, [src]);

  const handleError = () => {
    console.error('Next.js Image failed to load:', imgSrc);
    if (!hasError) {
      setHasError(true);
      if (!useRegularImg) {
        // Try with regular img tag instead
        setUseRegularImg(true);
        setIsLoading(true);
      } else {
        // Use fallback
        setImgSrc(fallbackSrc);
      }
    }
    setIsLoading(false);
  };

  const handleLoad = () => {
    console.log('Image loaded successfully:', imgSrc);
    setIsLoading(false);
    setHasError(false);
  };

  // If we've had errors with Next.js Image, try regular img tag
  if (useRegularImg) {
    return (
      <div className="relative w-full h-full">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center z-10">
            <span className="text-gray-400">Loading image...</span>
          </div>
        )}
        
        <img
          src={imgSrc}
          alt={alt}
          className={`w-full h-full object-cover ${className}`}
          onError={() => {
            console.error('Regular img failed to load:', imgSrc);
            if (imgSrc !== fallbackSrc) {
              setImgSrc(fallbackSrc);
            } else {
              setHasError(true);
              setIsLoading(false);
            }
          }}
          onLoad={handleLoad}
          style={{ display: isLoading ? 'none' : 'block' }}
        />
        
        {hasError && (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <div className="text-center p-4">
              <div className="text-4xl text-gray-400 mb-2">📷</div>
              <p className="text-gray-500 text-sm">Image not available</p>
              <p className="text-xs text-gray-400 mt-1">Path: {src}</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center z-10">
          <span className="text-gray-400">Loading image...</span>
        </div>
      )}
      
      <Image
        src={imgSrc}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${className}`}
        priority={priority}
        onError={handleError}
        onLoad={handleLoad}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        unoptimized={process.env.NODE_ENV === 'development'}
      />
      
      {hasError && !useRegularImg && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center p-4">
            <div className="text-4xl text-gray-400 mb-2">📷</div>
            <p className="text-gray-500 text-sm">Image not available</p>
            <p className="text-xs text-gray-400 mt-1">Path: {src}</p>
          </div>
        </div>
      )}
    </div>
  );
}