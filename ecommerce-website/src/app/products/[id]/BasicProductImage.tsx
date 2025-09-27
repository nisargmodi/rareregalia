'use client';

export function BasicProductImage({ 
  src, 
  alt, 
  fallbackSrc = '/images/hero-jewelry.jpg',
  className = ''
}: {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
}) {
  return (
    <div className={`relative w-full h-full ${className}`} style={{ minHeight: '400px' }}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover rounded-lg"
        onError={(e) => {
          console.error('Primary image failed, trying fallback:', src);
          e.currentTarget.src = fallbackSrc;
        }}
        onLoad={() => {
          console.log('Image loaded successfully:', src);
        }}
        style={{ 
          display: 'block',
          maxWidth: '100%',
          height: '100%'
        }}
      />
    </div>
  );
}