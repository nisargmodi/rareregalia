import { NextRequest, NextResponse } from 'next/server';
import products from '@/data/products.json';
import { Product } from '@/types';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  const category = searchParams.get('category');
  const metalType = searchParams.get('metalType');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const search = searchParams.get('search');
  const limit = searchParams.get('limit');
  const offset = searchParams.get('offset');
  
  let filteredProducts: Product[] = products;
  
  // Apply filters
  if (category) {
    filteredProducts = filteredProducts.filter(p => 
      p.category.toLowerCase().includes(category.toLowerCase())
    );
  }
  
  if (metalType) {
    filteredProducts = filteredProducts.filter(p => 
      p.metalType.toLowerCase() === metalType.toLowerCase()
    );
  }
  
  if (minPrice) {
    filteredProducts = filteredProducts.filter(p => p.priceINR >= parseInt(minPrice));
  }
  
  if (maxPrice) {
    filteredProducts = filteredProducts.filter(p => p.priceINR <= parseInt(maxPrice));
  }
  
  if (search) {
    const searchLower = search.toLowerCase();
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(searchLower) ||
      p.category.toLowerCase().includes(searchLower) ||
      p.metalType.toLowerCase().includes(searchLower)
    );
  }
  
  // Apply pagination
  const totalCount = filteredProducts.length;
  if (limit) {
    const limitNum = parseInt(limit);
    const offsetNum = offset ? parseInt(offset) : 0;
    filteredProducts = filteredProducts.slice(offsetNum, offsetNum + limitNum);
  }
  
  return NextResponse.json({
    products: filteredProducts,
    totalCount,
    hasMore: limit ? (parseInt(offset || '0') + parseInt(limit)) < totalCount : false
  });
}