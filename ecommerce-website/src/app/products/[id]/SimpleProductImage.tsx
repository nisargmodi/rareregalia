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
  const [attempts, setAttempts] = useState(0);

  console.log('SimpleProductImage render:', { src, imgSrc, hasError, isLoading, attempts });

  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
    setIsLoading(true);
    setAttempts(0);
  }, [src]);

  const handleError = () => {
    console.error('Image failed to load:', imgSrc, 'Attempt:', attempts + 1);
    
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    
    if (newAttempts === 1) {
      // First error - try with a slight delay
      setTimeout(() => {
        setImgSrc(src + '?retry=1');
      }, 100);
    } else if (newAttempts === 2 && imgSrc !== fallbackSrc) {
      // Second error - use fallback
      console.log('Using fallback image:', fallbackSrc);
      setHasError(true);
      setImgSrc(fallbackSrc);
    } else {
      // Final error - show error state
      setIsLoading(false);
    }
  };

  const handleLoad = () => {
    console.log('Image loaded successfully:', imgSrc);
    setIsLoading(false);
    setHasError(false);
  };

  return (
    <div className={`relative w-full h-full ${className}`} style={{ minHeight: '400px' }}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center z-10">
          <div className="text-center p-4">
            <div className="text-4xl mb-2">📷</div>
            <span className="text-gray-400 block mb-2">Loading image...</span>
            <span className="text-xs text-gray-500 break-all">{imgSrc}</span>
            {attempts > 0 && (
              <div className="text-xs text-orange-500 mt-1">Attempt: {attempts + 1}</div>
            )}
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
          display: isLoading ? 'none' : 'block',
          maxWidth: '100%',
          height: '100%'
        }}
      />
      
      {hasError && imgSrc === fallbackSrc && !isLoading && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center p-4">
            <div className="text-4xl text-gray-400 mb-2">📷</div>
            <p className="text-gray-500 text-sm mb-2">Image not available</p>
            <p className="text-xs text-gray-400 break-all mb-1">Original: {src}</p>
            <p className="text-xs text-gray-400 break-all">Fallback: {fallbackSrc}</p>
            <p className="text-xs text-red-400 mt-1">Attempts: {attempts}</p>
          </div>
        </div>
      )}
    </div>
  );
}