import { Hero } from '@/components/home/Hero';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { CategoryShowcase } from '@/components/home/CategoryShowcase';
import { Features } from '@/components/home/Features';

export default function HomePage() {
  return (
    <div className="space-y-16">
      <Hero />
      <CategoryShowcase />
      <FeaturedProducts />
      <Features />
    </div>
  );
}