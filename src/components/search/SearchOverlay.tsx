'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import products from '@/data/products.json';
import { groupProductVariants, ProductGroup } from '@/utils/productVariants';
import Link from 'next/link';

interface SearchOverlayProps {
  isOpen: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, searchQuery, onSearchChange, onClose }: SearchOverlayProps) {
  const router = useRouter();
  const [productGroups, setProductGroups] = useState<ProductGroup[]>([]);

  useEffect(() => {
    // Group products once on mount
    const grouped = groupProductVariants(products);
    setProductGroups(grouped);
  }, []);

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }

    const searchLower = searchQuery.trim().toLowerCase();
    
    return productGroups
      .filter(group => {
        const baseVariant = group.baseVariant;
        return (
          group.name.toLowerCase().includes(searchLower) ||
          group.category.toLowerCase().includes(searchLower) ||
          (group.description && group.description.toLowerCase().includes(searchLower)) ||
          baseVariant.metalType.toLowerCase().includes(searchLower)
        );
      })
      .slice(0, 8); // Limit to 8 results for performance
  }, [searchQuery, productGroups]);

  const handleProductClick = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Search Modal */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4">
        <div className="bg-white rounded-lg shadow-2xl max-h-[80vh] overflow-hidden flex flex-col">
          {/* Search Input */}
          <div className="relative p-4 border-b border-gray-200">
            <input
              type="text"
              placeholder="Search jewelry by name, category, or metal type..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
              autoFocus
              data-testid="search-input"
            />
            <MagnifyingGlassIcon className="absolute left-7 top-7 h-5 w-5 text-gray-400" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-7 top-7 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Search Results */}
          <div className="overflow-y-auto flex-1">
            {searchQuery.trim() === '' ? (
              <div className="p-8 text-center text-gray-500">
                <MagnifyingGlassIcon className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>Start typing to search for products...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <p className="text-lg font-medium text-gray-900 mb-2">No products found</p>
                <p className="text-sm">Try searching with different keywords</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredProducts.map((group) => (
                  <Link
                    key={group.productId}
                    href={`/products/${group.productId}`}
                    onClick={handleProductClick}
                    className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
                  >
                    {/* Product Image */}
                    <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                      {group.baseVariant.primaryImage ? (
                        <img
                          src={group.baseVariant.primaryImage}
                          alt={group.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <MagnifyingGlassIcon className="h-8 w-8" />
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {group.name}
                      </h3>
                      <p className="text-sm text-gray-600">{group.category}</p>
                      <p className="text-sm font-medium text-primary-600 mt-1">
                        ₹{Math.round(group.baseVariant.priceINR).toLocaleString('en-IN')}
                      </p>
                    </div>

                    {/* Arrow Icon */}
                    <div className="flex-shrink-0 text-gray-400">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* View All Results Link */}
            {filteredProducts.length > 0 && (
              <div className="border-t border-gray-200 p-4">
                <Link
                  href={`/products?search=${encodeURIComponent(searchQuery.trim())}`}
                  onClick={handleProductClick}
                  className="block text-center text-primary-600 hover:text-primary-700 font-medium"
                >
                  View all {filteredProducts.length === 8 ? '8+' : filteredProducts.length} results →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
