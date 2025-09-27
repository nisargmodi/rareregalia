import { Metadata } from 'next';
import { ProductsPageClient } from './ProductsPageClient';
import products from '@/data/products.json';
import categories from '@/data/categories.json';

export const metadata: Metadata = {
  title: 'Luxury Jewelry Collection | Rare Regalia',
  description: 'Browse our exquisite collection of handcrafted jewelry featuring diamonds, gold, and precious stones.',
};

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const category = searchParams.category as string;
  const metalType = searchParams.metalType as string;
  const search = searchParams.search as string;

  return (
    <ProductsPageClient
      initialProducts={products}
      categories={categories}
      initialFilters={{
        category: category ? [category] : undefined,
        metalType: metalType ? [metalType] : undefined,
        searchQuery: search,
      }}
    />
  );
}