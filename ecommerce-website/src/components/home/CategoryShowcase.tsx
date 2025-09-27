'use client';

import Link from 'next/link';
import { getCategoryIcon } from '@/utils/productUtils';

const categories = [
  {
    name: 'Rings',
    href: '/products?category=rings',
    image: '/images/categories/rings.jpg',
    description: 'Elegant rings for every occasion',
    count: 328,
  },
  {
    name: 'Earrings',
    href: '/products?category=earrings',
    image: '/images/categories/earrings.jpg',
    description: 'Stunning earrings to complement your style',
    count: 63,
  },
  {
    name: 'Pendants',
    href: '/products?category=pendants',
    image: '/images/categories/pendants.jpg',
    description: 'Beautiful pendants and necklaces',
    count: 278,
  },
  {
    name: 'Bracelets',
    href: '/products?category=bracelets',
    image: '/images/categories/bracelets.jpg',
    description: 'Exquisite bracelets and bangles',
    count: 6,
  },
];

export function CategoryShowcase() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover our curated collections of fine jewelry, each piece crafted with 
          exceptional attention to detail and premium materials.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={category.href}
            className="group relative overflow-hidden rounded-lg bg-gray-100 aspect-square"
          >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-gold-100 opacity-80" />
            
            {/* Category Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center transform group-hover:scale-110 transition-transform duration-300">
                <div className="text-6xl mb-4 filter drop-shadow-lg">
                  {getCategoryIcon(category.name)}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2 px-4">
                  {category.description}
                </p>
                <span className="inline-block px-3 py-1 bg-white bg-opacity-90 rounded-full text-xs font-medium text-gray-700">
                  {category.count} items
                </span>
              </div>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Call to Action */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-white bg-opacity-95 rounded-lg p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-primary-600 font-medium text-sm">
                  Shop {category.name} →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* View All Link */}
      <div className="text-center mt-12">
        <Link
          href="/products"
          className="inline-flex items-center px-6 py-3 border border-primary-600 text-primary-600 font-medium rounded-lg hover:bg-primary-600 hover:text-white transition-colors"
        >
          View All Products
          <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}