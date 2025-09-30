'use client';

import { useState } from 'react';
import { ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { ProductGroup, ProductVariant } from '@/utils/productVariants';
import { VariantSelector } from '@/components/products/VariantSelector';
import { VariantImageGallery } from '@/components/products/VariantImageGallery';
import { BasicProductImage } from './BasicProductImage';

interface ProductDetailClientProps {
  productGroup: ProductGroup;
  relatedProducts: Product[];
}

export function ProductDetailClient({ productGroup, relatedProducts }: ProductDetailClientProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(productGroup.baseVariant);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    // Convert variant back to product format for cart
    const productForCart: Product = {
      ...selectedVariant,
      productId: productGroup.productId,
      name: productGroup.name,
      category: productGroup.category,
      description: productGroup.description || '',
      status: 'active',
      featured: productGroup.featured,
      size: 'Standard',
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
      totalImages: selectedVariant.allImages.length
    };
    
    addItem(productForCart, quantity);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    // TODO: Implement wishlist functionality
  };

  const handleVariantChange = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    setQuantity(1); // Reset quantity when variant changes
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Product Images */}
      <div className="space-y-4">
        <VariantImageGallery
          allImages={selectedVariant.allImages}
          selectedMetalType={selectedVariant.metalType}
          productName={productGroup.name}
          className="w-full"
        />
      </div>

      {/* Product Details */}
      <div className="space-y-6">
        {/* Product Title */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{productGroup.name}</h1>
          <p className="text-lg text-gray-600 mt-2">{selectedVariant.variantName}</p>
          <p className="text-sm text-gray-500 mt-1">{productGroup.category}</p>
          {productGroup.styleNumber && (
            <p className="text-sm text-gray-500">Style: {productGroup.styleNumber}</p>
          )}
        </div>

        {/* Price Display */}
        <div className="space-y-2">
          <p className="text-3xl font-bold text-gray-900">
            ₹{selectedVariant.priceINR.toLocaleString('en-IN')}
          </p>
          {productGroup.variants.length > 1 && (
            <p className="text-sm text-gray-500">
              Price range: ₹{productGroup.priceRange.min.toLocaleString('en-IN')} - ₹{productGroup.priceRange.max.toLocaleString('en-IN')}
            </p>
          )}
        </div>

        {/* Product Description */}
        {productGroup.description && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-700">{productGroup.description}</p>
          </div>
        )}

        {/* Variant Selection */}
        {productGroup.variants.length > 1 && (
          <VariantSelector
            variants={productGroup.variants}
            selectedVariant={selectedVariant}
            onVariantChange={handleVariantChange}
          />
        )}

        {/* Product Specifications */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Specifications</h3>
          <dl className="grid grid-cols-1 gap-3 text-sm">
            <div className="flex justify-between">
              <dt className="font-medium text-gray-900">Metal:</dt>
              <dd className="text-gray-700">{selectedVariant.metalType}</dd>
            </div>
            {selectedVariant.goldPurity && (
              <div className="flex justify-between">
                <dt className="font-medium text-gray-900">Gold Purity:</dt>
                <dd className="text-gray-700">{selectedVariant.goldPurity}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="font-medium text-gray-900">Karat:</dt>
              <dd className="text-gray-700">{selectedVariant.metalKarat}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-medium text-gray-900">SKU:</dt>
              <dd className="text-gray-700">{selectedVariant.sku}</dd>
            </div>
          </dl>
        </div>

        {/* Quantity and Actions */}
        <div className="space-y-4">
          {/* Quantity Selector */}
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-3">
              Quantity
            </label>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50"
                disabled={quantity <= 1}
              >
                −
              </button>
              
              <input
                type="number"
                id="quantity"
                min="1"
                max="10"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                className="w-20 text-center border border-gray-300 rounded-md py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              
              <button
                type="button"
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50"
                disabled={quantity >= 10}
              >
                +
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Maximum 10 items per order</p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleAddToCart}
              disabled={selectedVariant.stockQuantity === 0}
              className="flex-1 bg-amber-600 text-white px-6 py-3 rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center space-x-2"
            >
              <ShoppingCartIcon className="h-5 w-5" />
              <span>{selectedVariant.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
            </button>
            
            <button
              onClick={handleWishlist}
              className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            >
              {isWishlisted ? (
                <HeartSolidIcon className="h-6 w-6 text-red-500" />
              ) : (
                <HeartIcon className="h-6 w-6 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Stock Status */}
        <div className="bg-gray-50 rounded-lg p-4">
          {selectedVariant.stockQuantity > 0 ? (
            <div className="flex items-center text-sm text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              In Stock ({selectedVariant.stockQuantity} available)
            </div>
          ) : (
            <div className="flex items-center text-sm text-red-600">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
              Out of Stock
            </div>
          )}
          <p className="text-xs text-gray-500 mt-1">Estimated delivery: 2-8 days</p>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="lg:col-span-2 mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="group">
                <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-md mb-4">
                  <a href={`/products/${relatedProduct.productId}`}>
                    <BasicProductImage
                      src={relatedProduct.primaryImage || `/images/products/${relatedProduct.id.split('-')[0]}/main.jpg`}
                      alt={relatedProduct.name}
                      className="group-hover:scale-105 transition-transform duration-300"
                    />
                  </a>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">
                    <a href={`/products/${relatedProduct.productId}`} className="hover:text-amber-600">
                      {relatedProduct.name}
                    </a>
                  </h3>
                  <p className="text-sm text-gray-600">{relatedProduct.category}</p>
                  <p className="font-bold text-gray-900">
                    ₹{relatedProduct.priceINR.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}