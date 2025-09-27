'use client';

import { useState, useEffect } from 'react';

interface SimpleProductImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
}

export function SimpleProductImage({ 
  src, 
  alt, 
  fallbackSrc = '/images/hero-jewelry.jpg',
  className = ''
}: SimpleProductImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  console.log('SimpleProductImage render:', { src, imgSrc, hasError, isLoading });

  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
    setIsLoading(true);
  }, [src]);

  const handleError = () => {
    console.error('Image failed to load:', imgSrc);
    if (!hasError && imgSrc !== fallbackSrc) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
    setIsLoading(false);
  };

  const handleLoad = () => {
    console.log('Image loaded successfully:', imgSrc);
    setIsLoading(false);
  };

  return (
    <div className={`relative w-full h-full ${className}`} style={{ minHeight: '400px' }}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center z-10">
          <div className="text-center">
            <div className="text-4xl mb-2">📷</div>
            <span className="text-gray-400">Loading image...</span>
          </div>
        </div>
      )}
      
      <img
        src={imgSrc}
        alt={alt}
        className="w-full h-full object-cover rounded-lg"
        onError={handleError}
        onLoad={handleLoad}
        style={{ 
          display: 'block',
          maxWidth: '100%',
          height: '100%'
        }}
      />
      
      {hasError && imgSrc === fallbackSrc && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center p-4">
            <div className="text-4xl text-gray-400 mb-2">📷</div>
            <p className="text-gray-500 text-sm">Image not available</p>
            <p className="text-xs text-gray-400 mt-1">{src}</p>
          </div>
        </div>
      )}
    </div>
  );
}