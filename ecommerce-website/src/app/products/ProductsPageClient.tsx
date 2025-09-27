'use client';

import { useState, useMemo } from 'react';
import { FunnelIcon, Squares2X2Icon, ListBulletIcon } from '@heroicons/react/24/outline';
import { Product, Category, ProductFilters } from '@/types';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductGroupCard } from '@/components/products/ProductGroupCard';
import { ProductFiltersComponent } from '@/components/products/ProductFilters';
import { filterProducts, getPriceRange } from '@/utils/productUtils';
import { groupProductVariants, ProductGroup } from '@/utils/productVariants';

interface ProductsPageClientProps {
  initialProducts: Product[];
  categories: Category[];
  initialFilters?: Partial<ProductFilters & { searchQuery?: string }>;
}

export function ProductsPageClient({ 
  initialProducts, 
  categories, 
  initialFilters = {} 
}: ProductsPageClientProps) {
  const [filters, setFilters] = useState<ProductFilters & { searchQuery?: string }>(initialFilters);
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high' | 'newest'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const filteredProductGroups = useMemo(() => {
    // First group products into variants
    const productGroups = groupProductVariants(initialProducts);
    
    // Filter the groups based on filters applied to their base variant
    let filteredGroups = productGroups.filter(group => {
      // Use the base variant to check against filters
      const baseVariant = group.baseVariant;
      
      // Apply search query filter
      if (filters.searchQuery) {
        const searchLower = filters.searchQuery.toLowerCase();
        const matchesSearch = 
          group.name.toLowerCase().includes(searchLower) ||
          group.category.toLowerCase().includes(searchLower) ||
          (group.description && group.description.toLowerCase().includes(searchLower)) ||
          baseVariant.metalType.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }
      
      // Apply category filter
      if (filters.category && filters.category.length > 0) {
        if (!filters.category.includes(group.category)) return false;
      }
      
      // Apply metal type filter - check if ANY variant matches
      if (filters.metalType && filters.metalType.length > 0) {
        const hasMatchingMetal = group.variants.some(variant => 
          filters.metalType!.includes(variant.metalType)
        );
        if (!hasMatchingMetal) return false;
      }
      
      // Apply price range filter - check if ANY variant falls in range
      if (filters.priceRange) {
        const [minPrice, maxPrice] = filters.priceRange;
        const hasMatchingPrice = group.variants.some(variant => 
          variant.priceINR >= minPrice && variant.priceINR <= maxPrice
        );
        if (!hasMatchingPrice) return false;
      }
      
      return true;
    });
    
    // Apply sorting
    switch (sortBy) {
      case 'name':
        filteredGroups.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-low':
        filteredGroups.sort((a, b) => a.priceRange.min - b.priceRange.min);
        break;
      case 'price-high':
        filteredGroups.sort((a, b) => b.priceRange.max - a.priceRange.max);
        break;
      case 'newest':
        // Sort by the newest variant in each group (use variantId as proxy for creation order)
        filteredGroups.sort((a, b) => {
          const aNewest = Math.max(...a.variants.map(v => v.variantId));
          const bNewest = Math.max(...b.variants.map(v => v.variantId));
          return bNewest - aNewest;
        });
        break;
    }
    
    return filteredGroups;
  }, [initialProducts, filters, sortBy]);

  const priceRange = getPriceRange(initialProducts);
  const priceRangeObj = { min: priceRange[0], max: priceRange[1] };
  
  // Get unique metal types from products
  const metalTypes = Array.from(new Set(initialProducts.map(p => p.metalType).filter(Boolean)));

  const handleFilterChange = (newFilters: Partial<ProductFilters & { searchQuery?: string }>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Jewelry Collection</h1>
        <p className="text-gray-600 max-w-2xl">
          Discover our exquisite collection of handcrafted jewelry featuring premium diamonds, 
          gold, and precious stones. Each piece is crafted with meticulous attention to detail.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors w-full justify-center"
            >
              <FunnelIcon className="h-5 w-5" />
              <span>Filters</span>
            </button>
          </div>

          <div className={`${isFiltersOpen ? 'block' : 'hidden'} lg:block`}>
            <ProductFiltersComponent
              filters={filters}
              categories={categories}
              metalTypes={metalTypes}
              priceRange={priceRangeObj}
              onFiltersChange={handleFilterChange}
              onReset={clearFilters}
            />
          </div>
        </div>

        {/* Products Area */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <p className="text-sm text-gray-600">
                {filteredProductGroups.length} product groups found
              </p>
            </div>

            <div className="flex items-center space-x-4">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="name">Name A-Z</option>
                <option value="price-low">Price Low to High</option>
                <option value="price-high">Price High to Low</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors`}
                >
                  <Squares2X2Icon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors`}
                >
                  <ListBulletIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProductGroups.length > 0 ? (
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-6'
            }>
              {filteredProductGroups.map((productGroup) => (
                <ProductGroupCard
                  key={productGroup.productId}
                  productGroup={productGroup}
                  className={viewMode === 'list' ? 'flex' : ''}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-4 4-4-4m1 4l-3 3-3-3" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your filters or search terms.</p>
              <button
                onClick={clearFilters}
                className="btn-primary"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}