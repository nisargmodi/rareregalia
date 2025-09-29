'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HeartIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { formatPrice, getMetalTypeColor } from '@/utils/productUtils';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className = '' }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { addItem } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    toast.success(isLiked ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const productImage = imageError || !product.primaryImage
    ? `/images/products/${product.sku}/placeholder.jpg`
    : product.primaryImage;

  return (
    <Link href={`/products/${product.id}`} className={`product-card ${className}`}>
      <div className="relative">
        {/* Product Image */}
        <div className="aspect-square overflow-hidden bg-gray-100 rounded-t-lg">
          <Image
            src={productImage}
            alt={product.name}
            width={400}
            height={400}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
          
          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={handleAddToCart}
                className="p-2 bg-white rounded-full shadow-lg hover:bg-primary-50 transition-colors"
                title="Add to Cart"
              >
                <ShoppingBagIcon className="h-5 w-5 text-primary-600" />
              </button>
              
              <button
                onClick={handleLike}
                className="p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors"
                title={isLiked ? "Remove from Wishlist" : "Add to Wishlist"}
              >
                {isLiked ? (
                  <HeartSolidIcon className="h-5 w-5 text-red-500" />
                ) : (
                  <HeartIcon className="h-5 w-5 text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col space-y-1">
            {product.featured && (
              <span className="badge badge-primary text-xs">Featured</span>
            )}
            {product.stockQuantity <= 5 && product.stockQuantity > 0 && (
              <span className="badge badge-warning text-xs">Low Stock</span>
            )}
            {product.stockQuantity === 0 && (
              <span className="badge bg-red-100 text-red-800 text-xs">Out of Stock</span>
            )}
          </div>

          {/* Metal Type Indicator */}
          <div className="absolute top-2 right-2">
            <div className={`w-4 h-4 rounded-full ${getMetalTypeColor(product.metalType)} border-2 border-white shadow-sm`} 
                 title={product.metalType} />
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-900 truncate group-hover:text-primary-600 transition-colors">
                {product.name}
              </h3>
              
              <p className="text-xs text-gray-500 mt-1">
                {product.metalType} • {product.metalKarat}
              </p>
              
              {(product.diamondWeight && product.diamondWeight > 0) && (
                <p className="text-xs text-gray-500">
                  {product.diamondWeight} ct diamonds
                </p>
              )}
              
              <div className="flex items-center justify-between mt-2">
                <div>
                  {product.priceINR > 0 ? (
                    <p className="text-lg font-semibold text-gray-900">
                      {formatPrice(product.priceINR)}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-500">Price on request</p>
                  )}
                </div>
                
                <div className="text-right">
                  <p className="text-xs text-gray-500">{product.category}</p>
                  {product.styleNumber && (
                    <p className="text-xs text-gray-400">#{product.styleNumber}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Specs */}
          {(product.goldWeight > 0 || (product.diamondCount && product.diamondCount > 0)) && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex text-xs text-gray-500 space-x-4">
                {product.goldWeight > 0 && (
                  <span>{product.goldWeight.toFixed(1)}g gold</span>
                )}
                {(product.diamondCount && product.diamondCount > 0) && (
                  <span>{product.diamondCount} diamonds</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}