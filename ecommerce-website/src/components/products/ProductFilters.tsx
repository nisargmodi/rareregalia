'use client';

import { useState } from 'react';
import { Product, Category, ProductFilters as ProductFiltersType } from '@/types';

interface ProductFiltersComponentProps {
  categories: Category[];
  metalTypes: string[];
  priceRange: { min: number; max: number };
  filters: ProductFiltersType;
  onFiltersChange: (filters: ProductFiltersType) => void;
  onReset: () => void;
}

export function ProductFiltersComponent({
  categories,
  metalTypes,
  priceRange,
  filters,
  onFiltersChange,
  onReset,
}: ProductFiltersComponentProps) {
  const [localPriceRange, setLocalPriceRange] = useState({
    min: filters.priceRange?.[0] || priceRange?.min || 0,
    max: filters.priceRange?.[1] || priceRange?.max || 100000,
  });

  const handleCategoryChange = (categoryId: string) => {
    const newCategories = filters.category?.includes(categoryId)
      ? filters.category.filter((c: string) => c !== categoryId)
      : [...(filters.category || []), categoryId];
    
    onFiltersChange({
      ...filters,
      category: newCategories.length > 0 ? newCategories : undefined,
    });
  };

  const handleMetalTypeChange = (metalType: string) => {
    const newMetalTypes = filters.metalType?.includes(metalType)
      ? filters.metalType.filter((m: string) => m !== metalType)
      : [...(filters.metalType || []), metalType];
    
    onFiltersChange({
      ...filters,
      metalType: newMetalTypes.length > 0 ? newMetalTypes : undefined,
    });
  };

  const handlePriceChange = () => {
    const newPriceRange: [number, number] = [localPriceRange.min, localPriceRange.max];
    const isDefaultRange = newPriceRange[0] === priceRange.min && newPriceRange[1] === priceRange.max;
    
    onFiltersChange({
      ...filters,
      priceRange: isDefaultRange ? undefined : newPriceRange,
    });
  };

  const hasActiveFilters = !!(
    filters.category?.length ||
    filters.metalType?.length ||
    filters.priceRange ||
    filters.metalKarat?.length ||
    filters.diamondQuality?.length ||
    filters.inStock
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-sm text-gold-600 hover:text-gold-700"
          >
            Reset All
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Category</h4>
        <div className="space-y-2">
          {categories?.map((category) => (
            <label key={category.id} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.category?.includes(category.id) || false}
                onChange={() => handleCategoryChange(category.id)}
                className="rounded border-gray-300 text-gold-600 focus:ring-gold-500"
              />
              <span className="ml-2 text-sm text-gray-700">
                {category.name} ({category.productCount})
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Metal Types */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Metal Type</h4>
        <div className="space-y-2">
          {metalTypes?.map((metalType) => (
            <label key={metalType} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.metalType?.includes(metalType) || false}
                onChange={() => handleMetalTypeChange(metalType)}
                className="rounded border-gray-300 text-gold-600 focus:ring-gold-500"
              />
              <span className="ml-2 text-sm text-gray-700">{metalType}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Min Price: ₹{(localPriceRange?.min || 0).toLocaleString()}
            </label>
            <input
              type="range"
              min={priceRange?.min || 0}
              max={priceRange?.max || 100000}
              value={localPriceRange?.min || 0}
              onChange={(e) => setLocalPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
              onMouseUp={handlePriceChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Max Price: ₹{(localPriceRange?.max || 100000).toLocaleString()}
            </label>
            <input
              type="range"
              min={priceRange?.min || 0}
              max={priceRange?.max || 100000}
              value={localPriceRange?.max || 100000}
              onChange={(e) => setLocalPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
              onMouseUp={handlePriceChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>₹{(priceRange?.min || 0).toLocaleString()}</span>
            <span>₹{(priceRange?.max || 100000).toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* In Stock Filter */}
      <div className="mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={filters.inStock || false}
            onChange={(e) => onFiltersChange({
              ...filters,
              inStock: e.target.checked || undefined,
            })}
            className="rounded border-gray-300 text-gold-600 focus:ring-gold-500"
          />
          <span className="ml-2 text-sm text-gray-700">In Stock Only</span>
        </label>
      </div>
    </div>
  );
}