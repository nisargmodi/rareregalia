import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductDetailClient } from './ProductDetailClient';
import products from '@/data/products.json';
import { getProductGroup, groupProductVariants } from '@/utils/productVariants';

interface ProductPageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  // Generate static params for all product groups (not individual variants)
  const productGroups = groupProductVariants(products);
  
  return productGroups.map((group) => ({
    id: group.productId,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const productGroup = getProductGroup(products, params.id);
  
  if (!productGroup) {
    return {
      title: 'Product Not Found | Rare Regalia',
      description: 'The requested product could not be found.',
    };
  }

  return {
    title: `${productGroup.name} | Rare Regalia`,
    description: productGroup.description || `Shop ${productGroup.name} - Premium jewelry from Rare Regalia`,
    openGraph: {
      title: productGroup.name,
      description: productGroup.description || `Shop ${productGroup.name} - Premium jewelry from Rare Regalia`,
      images: [
        {
          url: productGroup.baseVariant.primaryImage || `/images/products/${productGroup.baseVariant.sku.split('-')[0]}/main.jpg`,
          width: 800,
          height: 800,
          alt: productGroup.name,
        },
      ],
    },
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  // Try to get product group by the provided ID
  let productGroup = getProductGroup(products, params.id);
  
  // If not found, try to find by variant ID (for backward compatibility)
  if (!productGroup) {
    const product = products.find(p => p.id === params.id);
    if (product && product.productId) {
      productGroup = getProductGroup(products, product.productId);
    }
  }
  
  if (!productGroup) {
    notFound();
  }

  // Get related products from the same category (excluding current group)
  const relatedProducts = products
    .filter(product => 
      product.category === productGroup!.category && 
      product.productId !== productGroup!.productId
    )
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ProductDetailClient 
        productGroup={productGroup} 
        relatedProducts={relatedProducts} 
      />
    </div>
  );
}