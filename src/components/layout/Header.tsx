'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBagIcon, HeartIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { WorkingLink } from '@/utils/navigation';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const { getTotalItems, toggleCart } = useCartStore();
  const { getTotalItems: getWishlistTotalItems } = useWishlistStore();

  useEffect(() => {
    setIsClient(true);
    // Manually trigger hydration for cart store
    useCartStore.persist.rehydrate();
    useWishlistStore.persist.rehydrate();
  }, []);

  const cartItemCount = isClient ? getTotalItems() : 0;
  const wishlistItemCount = isClient ? getWishlistTotalItems() : 0;

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Rings', href: '/products?category=rings' },
    { name: 'Earrings', href: '/products?category=earrings' },
    { name: 'Pendants', href: '/products?category=pendants' },
    { name: 'Bracelets', href: '/products?category=bracelets' },
    { name: 'Collection', href: '/products' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-serif font-bold text-gradient">
                Rare Regalia
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigation.map((item) => (
                <WorkingLink
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  {item.name}
                </WorkingLink>
              ))}
            </div>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>
            
            <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors relative">
              <HeartIcon className="h-5 w-5" />
              {wishlistItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistItemCount}
                </span>
              )}
            </button>
            
            <button
              onClick={toggleCart}
              className="p-2 text-gray-600 hover:text-primary-600 transition-colors relative"
            >
              <ShoppingBagIcon className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:text-primary-600"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              data-testid="mobile-menu-button"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Search Overlay */}
        {isSearchOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => {
                setIsSearchOpen(false);
                setSearchQuery('');
              }}
            />
            
            {/* Search Modal */}
            <div className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4">
              <div className="bg-white rounded-lg shadow-2xl">
                <form 
                  className="relative p-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (searchQuery.trim()) {
                      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }
                  }}
                >
                  <input
                    type="text"
                    placeholder="Search jewelry by name, category, or metal type..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
                    autoFocus
                    data-testid="search-input"
                  />
                  <MagnifyingGlassIcon className="absolute left-7 top-7 h-5 w-5 text-gray-400" />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-7 top-7 text-gray-400 hover:text-gray-600"
                      aria-label="Clear search"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  )}
                </form>
                
                {/* Search hint */}
                <div className="px-4 pb-4 text-sm text-gray-500">
                  {searchQuery ? (
                    <p>Press Enter to search for "{searchQuery}"</p>
                  ) : (
                    <p>Type to search for products...</p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <WorkingLink
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </WorkingLink>
            ))}
          </div>
          
          <div className="border-t border-gray-200 px-4 py-3">
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleCart}
                className="flex items-center space-x-2 text-gray-700 hover:text-primary-600"
              >
                <ShoppingBagIcon className="h-5 w-5" />
                <span>Cart ({getTotalItems()})</span>
              </button>
              
              <button className="flex items-center space-x-2 text-gray-700 hover:text-primary-600">
                <HeartIcon className="h-5 w-5" />
                <span>Wishlist ({getWishlistTotalItems()})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}