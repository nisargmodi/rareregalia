'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBagIcon, HeartIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useCartStore } from '@/store/cartStore';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { getTotalItems, toggleCart } = useCartStore();

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
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  {item.name}
                </Link>
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
            
            <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
              <HeartIcon className="h-5 w-5" />
            </button>
            
            <button
              onClick={toggleCart}
              className="p-2 text-gray-600 hover:text-primary-600 transition-colors relative"
            >
              <ShoppingBagIcon className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:text-primary-600"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="border-t border-gray-200 py-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search jewelry..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
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
                <span>Wishlist</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}