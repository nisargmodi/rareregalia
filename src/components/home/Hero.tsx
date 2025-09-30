'use client';

import Link from 'next/link';
import Image from 'next/image';
import { WorkingLink } from '@/utils/navigation';

export function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-primary-50 to-gold-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-bold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Exquisite Jewelry</span>{' '}
                <span className="block text-gradient xl:inline">
                  Crafted to Perfection
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Discover our exclusive collection of handcrafted jewelry featuring 
                premium diamonds, gold, and precious stones. Each piece tells a story 
                of elegance and sophistication.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <WorkingLink
                    href="/products"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10 transition-colors"
                  >
                    Shop Collection
                  </WorkingLink>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <WorkingLink
                    href="/about"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 md:py-4 md:text-lg md:px-10 transition-colors"
                  >
                    Our Story
                  </WorkingLink>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full relative">
          <div className="absolute inset-0 bg-gradient-to-l from-primary-600/20 to-transparent z-10"></div>
          <Image
            className="h-full w-full object-cover"
            src="/images/hero-jewelry.jpg"
            alt="Luxury jewelry collection"
            width={800}
            height={600}
            priority
            onError={(e) => {
              // Fallback to a gradient background if image fails to load
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          {/* Fallback background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gold-200 to-primary-300 opacity-50"></div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gold-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-16 h-16 bg-primary-200 rounded-full opacity-30 animate-pulse delay-1000"></div>
    </div>
  );
}