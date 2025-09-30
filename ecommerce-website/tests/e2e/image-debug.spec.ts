import { test, expect } from '@playwright/test';

test.describe('Image Loading Debug Tests', () => {
  test('debug product image loading', async ({ page }) => {
    // Enable console logging
    page.on('console', msg => {
      if (msg.type() === 'log' || msg.type() === 'error') {
        console.log(`[${msg.type().toUpperCase()}] ${msg.text()}`);
      }
    });

    // Track network requests
    const imageRequests: string[] = [];
    const failedRequests: string[] = [];
    
    page.on('request', request => {
      if (request.url().includes('.jpg') || request.url().includes('.jpeg') || request.url().includes('.png')) {
        imageRequests.push(`REQUEST: ${request.url()}`);
      }
    });
    
    page.on('response', response => {
      if (response.url().includes('.jpg') || response.url().includes('.jpeg') || response.url().includes('.png')) {
        if (response.ok()) {
          console.log(`✓ Image loaded: ${response.status()} ${response.url()}`);
        } else {
          console.log(`✗ Image failed: ${response.status()} ${response.url()}`);
          failedRequests.push(`${response.status()} ${response.url()}`);
        }
      }
    });

    console.log('=== Navigating to product page ===');
    await page.goto('/products/0111-Ro-1');
    
    console.log('=== Waiting for page load ===');
    await page.waitForLoadState('networkidle');
    
    // Wait for any async image loading
    await page.waitForTimeout(5000);
    
    console.log('=== Image requests made ===');
    imageRequests.forEach(req => console.log(req));
    
    console.log('=== Failed requests ===');
    failedRequests.forEach(req => console.log(req));
    
    // Check if image elements exist
    const imageContainer = page.locator('.aspect-square').first();
    await expect(imageContainer).toBeVisible();
    
    // Take a screenshot for debugging
    await page.screenshot({ path: 'debug-product-page.png', fullPage: true });
    console.log('Screenshot saved as debug-product-page.png');
  });

  test('test direct image access', async ({ page }) => {
    console.log('=== Testing direct image access ===');
    
    const imageUrl = '/images/products/0111/0111-Render-R1.jpg';
    const response = await page.goto(imageUrl);
    
    console.log(`Direct image access: ${response?.status()} for ${imageUrl}`);
    expect(response?.status()).toBe(200);
  });
});