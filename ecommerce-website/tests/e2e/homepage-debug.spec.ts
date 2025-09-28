import { test, expect } from '@playwright/test';

test.describe('Homepage Debug Tests', () => {
  test('debug homepage product loading', async ({ page }) => {
    // Listen to console logs
    const consoleLogs: string[] = [];
    page.on('console', msg => {
      consoleLogs.push(`${msg.type()}: ${msg.text()}`);
    });

    // Listen to errors
    const errors: string[] = [];
    page.on('pageerror', err => {
      errors.push(`Page Error: ${err.message}`);
    });

    // Navigate to homepage
  await page.goto('/');

    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');

    // Wait for the featured products section
    await page.waitForSelector('h2:has-text("Featured Collection")', { timeout: 30000 });

    // Wait a bit more for any async operations
    await page.waitForTimeout(5000);

    // Check for product cards
    const productCards = page.locator('.product-card');
    const cardCount = await productCards.count();
    console.log(`Found ${cardCount} product cards`);

    // Check the HTML content of the featured section
    const featuredSection = page.locator('section:has(h2:has-text("Featured Collection"))');
    const htmlContent = await featuredSection.innerHTML();
    console.log('Featured section HTML:', htmlContent.substring(0, 500));

    // Print console logs and errors
    if (consoleLogs.length > 0) {
      console.log('Console logs:');
      consoleLogs.forEach(log => console.log(log));
    }

    if (errors.length > 0) {
      console.log('Page errors:');
      errors.forEach(error => console.log(error));
    }

    // Take a screenshot
    await page.screenshot({ path: 'homepage-debug.png', fullPage: true });
  });
});