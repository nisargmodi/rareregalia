import { usePathname } from 'next/navigation';

export function useIsProductsPage() {
  const pathname = usePathname();
  // Matches /products or /products?...
  return pathname === '/products';
}
