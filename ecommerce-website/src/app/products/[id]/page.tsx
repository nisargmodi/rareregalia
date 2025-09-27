import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ProductDetailClient } from './ProductDetailClient';
import { SimpleProductImage } from './SimpleProductImage';
import products from '@/data/products.json';

interface ProductPageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  // Generate static params for all product IDs
  return products.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = products.find((p) => p.id === params.id);
  
  if (!product) {
    return {
      title: 'Product Not Found | Rare Regalia',
    };
  }

  return {
    title: `${product.name} | Rare Regalia`,
    description: product.description || `${product.name} - ${product.category}`,
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  // Find related products (same category, excluding current product)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square relative bg-white rounded-lg overflow-hidden shadow-lg min-h-[400px]">
              <SimpleProductImage
                src={product.primaryImage || `/images/products/${product.id}/main.jpg`}
                alt={product.name}
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              {product.variantName && product.variantName !== product.name && (
                <p className="text-lg text-gray-600 mt-2">{product.variantName}</p>
              )}
              <p className="text-sm text-gray-500 mt-1">{product.category}</p>
            </div>

            <div className="space-y-2">
              <p className="text-3xl font-bold text-gray-900">
                ₹{product.priceINR.toLocaleString('en-IN')}
              </p>
            </div>

            {product.description && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700">{product.description}</p>
              </div>
            )}

            {/* Product Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Details</h3>
              <dl className="grid grid-cols-1 gap-3 text-sm">
                {product.metalType && (
                  <div className="flex justify-between">
                    <dt className="font-medium text-gray-900">Metal:</dt>
                    <dd className="text-gray-700">{product.metalType}</dd>
                  </div>
                )}
                {product.goldPurity && (
                  <div className="flex justify-between">
                    <dt className="font-medium text-gray-900">Gold Purity:</dt>
                    <dd className="text-gray-700">{product.goldPurity}</dd>
                  </div>
                )}
                {product.metalKarat && (
                  <div className="flex justify-between">
                    <dt className="font-medium text-gray-900">Karat:</dt>
                    <dd className="text-gray-700">{product.metalKarat}</dd>
                  </div>
                )}
                {product.goldWeight && (
                  <div className="flex justify-between">
                    <dt className="font-medium text-gray-900">Gold Weight:</dt>
                    <dd className="text-gray-700">{product.goldWeight}g</dd>
                  </div>
                )}
                {product.diamondWeight && (
                  <div className="flex justify-between">
                    <dt className="font-medium text-gray-900">Diamond Weight:</dt>
                    <dd className="text-gray-700">{product.diamondWeight} ct</dd>
                  </div>
                )}
                {product.size && (
                  <div className="flex justify-between">
                    <dt className="font-medium text-gray-900">Size:</dt>
                    <dd className="text-gray-700">{product.size}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="font-medium text-gray-900">SKU:</dt>
                  <dd className="text-gray-700">{product.sku}</dd>
                </div>
              </dl>
            </div>

            <ProductDetailClient product={product as any} />
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="aspect-square relative">
                    <Image
                      src={relatedProduct.primaryImage || `/images/products/${relatedProduct.id}/main.jpg`}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{relatedProduct.name}</h3>
                    <p className="text-lg font-bold text-gray-900">
                      ₹{relatedProduct.priceINR.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}