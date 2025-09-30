import { test, expect } from '@playwright/test';

test.describe('Navigation Debug', () => {
  
  test('Simple navigation test - debug', async ({ page }) => {
    console.log('🔍 Starting navigation debug test...');
    
    // Go to homepage
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    console.log('✅ Homepage loaded');
    
    // Check current URL
    console.log(`Current URL: ${page.url()}`);
    
    // Find and click the "Shop Collection" button
    const shopButton = page.locator('a:has-text("Shop Collection")').first();
    
    // Check if button exists
    const buttonExists = await shopButton.count() > 0;
    console.log(`Shop Collection button exists: ${buttonExists}`);
    
    if (buttonExists) {
      // Check button href attribute
      const href = await shopButton.getAttribute('href');
      console.log(`Button href: ${href}`);
      
      // Check if button is visible
      const isVisible = await shopButton.isVisible();
      console.log(`Button visible: ${isVisible}`);
      
      // Try to click the button
      console.log('🖱️ Clicking Shop Collection button...');
      await shopButton.click();
      
      // Wait for navigation
      await page.waitForLoadState('networkidle');
      
      // Check new URL
      const newUrl = page.url();
      console.log(`URL after click: ${newUrl}`);
      
      // Check if we're on the products page
      const onProductsPage = newUrl.includes('/products');
      console.log(`Successfully navigated to products: ${onProductsPage}`);
      
      if (!onProductsPage) {
        console.error(`❌ Navigation failed! Expected /products, got ${newUrl}`);
      }
    }
  });
  
  test('Header navigation debug', async ({ page }) => {
    console.log('🔍 Testing header navigation...');
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Test header links
    const headerLinks = [
      { name: 'Collection', href: '/products' },
      { name: 'Rings', href: '/products?category=rings' }
    ];
    
    for (const link of headerLinks) {
      console.log(`\n🧪 Testing ${link.name} link...`);
      
      // Find the link
      const linkElement = page.locator(`header a[href="${link.href}"]`).first();
      const exists = await linkElement.count() > 0;
      console.log(`Link exists: ${exists}`);
      
      if (exists) {
        const isVisible = await linkElement.isVisible();
        console.log(`Link visible: ${isVisible}`);
        
        if (isVisible) {
          console.log(`Clicking ${link.name}...`);
          await linkElement.click();
          await page.waitForLoadState('networkidle');
          
          const currentUrl = page.url();
          console.log(`URL after click: ${currentUrl}`);
          
          const expectedInUrl = link.href.replace('?', '');
          const success = currentUrl.includes(expectedInUrl.split('?')[0]);
          console.log(`Navigation success: ${success}`);
          
          // Go back to home for next test
          await page.goto('/');
          await page.waitForLoadState('networkidle');
        }
      }
    }
  });
  
  test('Product card navigation debug', async ({ page }) => {
    console.log('🔍 Testing product card navigation...');
    
    await page.goto('/products');
    await page.waitForLoadState('networkidle');
    
    // Wait for products to load
    await page.waitForSelector('a[href^="/products/"]', { timeout: 10000 });
    
    const productLinks = page.locator('a[href^="/products/"]');
    const count = await productLinks.count();
    console.log(`Found ${count} product links`);
    
    if (count > 0) {
      const firstProduct = productLinks.first();
      const href = await firstProduct.getAttribute('href');
      console.log(`First product href: ${href}`);
      
      // Check what element we're actually clicking
      const elementInfo = await firstProduct.evaluate((el) => ({
        tagName: el.tagName,
        className: el.className,
        innerHTML: el.innerHTML.slice(0, 100) + '...',
        hasChildren: el.children.length > 0
      }));
      console.log('Element info:', elementInfo);
      
      console.log('Clicking first product...');
      await firstProduct.click();
      await page.waitForLoadState('networkidle');
      
      const newUrl = page.url();
      console.log(`URL after product click: ${newUrl}`);
      
      const isProductDetail = newUrl.includes('/products/') && newUrl !== 'http://localhost:3000/products';
      console.log(`Successfully navigated to product detail: ${isProductDetail}`);
    }
  });
  
});