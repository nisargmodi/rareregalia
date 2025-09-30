'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HeartIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { ProductGroup } from '@/utils/productVariants';
import { useCartStore } from '@/store/cartStore';
import { formatPrice, getMetalTypeColor } from '@/utils/productUtils';
import { BasicProductImage } from '@/app/products/[id]/BasicProductImage';
import { WorkingLink } from '@/utils/navigation';
import toast from 'react-hot-toast';

interface ProductGroupCardProps {
  productGroup: ProductGroup;
  className?: string;
}

export function ProductGroupCard({ productGroup, className = '' }: ProductGroupCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const { addItem } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Add the base variant to cart
    const productForCart = {
      ...productGroup.baseVariant,
      name: productGroup.name,
      category: productGroup.category,
      description: productGroup.description || '',
      status: 'active' as const,
      featured: productGroup.featured,
      basePrice: null,
      goldWeightVendor: 0,
      diamondWeightVendor: 0,
      diamondCount: 0,
      diamondCountOther: 0,
      diamondShapes: '',
      diamondSizes: '',
      diamondCuts: '',
      diamondQuality: '',
      diamondShapeDetails: '',
      makingCharges: null,
      styleNumber: productGroup.styleNumber,
      createdDate: '',
      totalSpecs: 0,
      goldWeight: 0,
      diamondWeight: 0,
      totalImages: productGroup.totalImages,
      productId: productGroup.productId,
      size: ''
    };
    addItem(productForCart);
    toast.success(`${productGroup.name} added to cart!`);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    toast.success(isLiked ? 'Removed from wishlist' : 'Added to wishlist');
  };

  // Use only actual images from inventory - no fallback to non-existent files
  const primaryImage = productGroup.baseVariant?.primaryImage || '/images/placeholder.jpg';

  return (
    // Added `product-card` class for test selectors consistency with ProductCard component
    <WorkingLink href={`/products/${productGroup.productId}`} className={`product-card group block ${className}`} data-testid="product-group-card">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <BasicProductImage
            src={primaryImage}
            alt={productGroup.name}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Wishlist Button */}
          <button
            onClick={handleLike}
            className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
            aria-label={isLiked ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            {isLiked ? (
              <HeartSolidIcon className="h-5 w-5 text-red-500" />
            ) : (
              <HeartIcon className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors" />
            )}
          </button>

          {/* Metal Type Indicators */}
          {productGroup.variants && productGroup.variants.length > 1 && productGroup.availableMetalTypes && (
            <div className="absolute bottom-3 left-3">
              <div className="flex space-x-1">
                {productGroup.availableMetalTypes.slice(0, 3).map((metalType) => (
                  <div
                    key={metalType}
                    className={`w-4 h-4 rounded-full border-2 border-white shadow-md ${getMetalTypeColor(metalType) || 'bg-gray-400'}`}
                    title={metalType}
                  />
                ))}
                {productGroup.availableMetalTypes.length > 3 && (
                  <div className="w-4 h-4 rounded-full bg-gray-400 border-2 border-white shadow-md flex items-center justify-center">
                    <span className="text-[8px] text-white font-bold">
                      +{productGroup.availableMetalTypes.length - 3}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="p-4">
          <div className="mb-2">
            <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-amber-600 transition-colors">
              {productGroup.name.replace(/\s+\d+$/, '')}
            </h3>
            {productGroup.productId && (
              <p className="text-xs text-gray-400">{productGroup.productId}</p>
            )}
          </div>

          {/* Price Display */}
          <div className="mb-3">
            {productGroup.variants && productGroup.variants.length === 1 ? (
              <p className="text-xl font-bold text-gray-900">
                {formatPrice(productGroup.baseVariant?.priceINR || 0)}
              </p>
            ) : (
              <p className="text-xl font-bold text-gray-900">
                {formatPrice(productGroup.priceRange?.min || 0)} - {formatPrice(productGroup.priceRange?.max || 0)}
              </p>
            )}
            {productGroup.variants && productGroup.variants.length > 1 && (
              <p className="text-sm text-gray-500">
                {productGroup.variants.length} variations available
              </p>
            )}
          </div>

          {/* Metal Type and Stock Info */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                {productGroup.baseVariant?.metalType || 'Unknown'}
              </span>
              <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                {productGroup.baseVariant?.metalKarat || 'Unknown'}
              </span>
            </div>
            
            {(productGroup.baseVariant?.stockQuantity || 0) > 0 ? (
              <span className="text-xs text-green-600 font-medium">In Stock</span>
            ) : (
              <span className="text-xs text-red-600 font-medium">Out of Stock</span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={(productGroup.baseVariant?.stockQuantity || 0) === 0}
            className="w-full bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2 font-medium"
          >
            <ShoppingBagIcon className="h-4 w-4" />
            <span>
              {(productGroup.baseVariant?.stockQuantity || 0) === 0 ? 'Out of Stock' : 'Add to Cart'}
            </span>
          </button>
        </div>
      </div>
    </WorkingLink>
  );
}