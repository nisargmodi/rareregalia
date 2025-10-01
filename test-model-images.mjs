// Test script to verify Model images are included for product variants
import products from './src/data/products.json';
import { getImagesForMetalType } from './src/utils/productVariants';

// Find a product with Model images
const sampleProduct = products.find(p => 
  p.allImages.some(img => img.toLowerCase().includes('model'))
);

if (sampleProduct) {
  console.log('Testing Product:', sampleProduct.id);
  console.log('Metal Type:', sampleProduct.metalType);
  console.log('\nAll Images:', sampleProduct.allImages.length);
  
  // Get images for this metal type
  const metalTypeImages = getImagesForMetalType(
    sampleProduct.allImages, 
    sampleProduct.metalType
  );
  
  console.log('\nFiltered Images for', sampleProduct.metalType, ':', metalTypeImages.length);
  
  // Show first few images
  console.log('\nFirst images (should include Model image):');
  metalTypeImages.slice(0, 5).forEach((img, idx) => {
    console.log(`  ${idx + 1}. ${img.split('/').pop()}`);
  });
  
  // Count Model images
  const modelCount = metalTypeImages.filter(img => 
    img.toLowerCase().includes('model')
  ).length;
  console.log('\nModel Images Found:', modelCount);
  
  if (modelCount > 0) {
    console.log('✓ SUCCESS: Model images are included!');
  } else {
    console.log('✗ FAILED: No model images found!');
  }
} else {
  console.log('No products with Model images found in data');
}
