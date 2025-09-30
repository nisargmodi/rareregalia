'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function TestNavigationPage() {
  const router = useRouter();
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Navigation Test Page</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Simple Link Tests</h2>
          <div className="flex flex-col space-y-2">
            <Link href="/products" className="text-blue-600 underline">
              Link to Products Page
            </Link>
            <Link href="/about" className="text-blue-600 underline">
              Link to About Page
            </Link>
            <Link href="/products?category=rings" className="text-blue-600 underline">
              Link to Rings Category
            </Link>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-2">Button Style Links</h2>
          <div className="flex space-x-4">
            <Link
              href="/products"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Products Button
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Contact Button
            </Link>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-2">Router Push Test</h2>
          <div className="flex space-x-4">
            <button
              onClick={() => {
                console.log('Router push to /products');
                router.push('/products');
              }}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Router Push to Products
            </button>
            <button
              onClick={() => {
                console.log('Window location change to /products');
                window.location.href = '/products';
              }}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Window Location Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}