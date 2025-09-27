'use client';

import { useState } from 'react';
import { ShoppingCartIcon, HeartIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    // TODO: Implement wishlist functionality
  };

  return (
    <div className="space-y-6">
      {/* Quantity Selector */}
      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-3">
          Quantity
        </label>
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={quantity <= 1}
          >
            <MinusIcon className="h-4 w-4" />
          </button>
          
          <div className="flex items-center">
            <input
              type="number"
              id="quantity"
              min="1"
              max="10"
              value={quantity}
              onChange={(e) => {
                const value = parseInt(e.target.value) || 1;
                setQuantity(Math.max(1, Math.min(10, value)));
              }}
              className="w-16 text-center border border-gray-300 rounded-md py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>
          
          <button
            type="button"
            onClick={() => setQuantity(Math.min(10, quantity + 1))}
            className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={quantity >= 10}
          >
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">Maximum 10 items per order</p>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleAddToCart}
          className="w-full bg-amber-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-amber-700 transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <ShoppingCartIcon className="h-5 w-5" />
          <span>Add to Cart</span>
        </button>

        <button
          onClick={handleWishlist}
          className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          {isWishlisted ? (
            <HeartSolidIcon className="h-5 w-5 text-red-500" />
          ) : (
            <HeartIcon className="h-5 w-5" />
          )}
          <span>{isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>
        </button>
      </div>

      {/* Product Status */}
      <div className="border-t pt-6">
        <div className="flex items-center space-x-2">
          <div
            className={`h-3 w-3 rounded-full ${
              product.status === 'active' ? 'bg-green-500' : 'bg-red-500'
            }`}
          />
          <span className="text-sm text-gray-600">
            {product.status === 'active' ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>
    </div>
  );
}