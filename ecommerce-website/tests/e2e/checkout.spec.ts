import { test, expect } from '@playwright/test';

test.describe('Checkout Flow Tests', () => {
  test('checkout page loads and displays form', async ({ page }) => {
    // Go to a product page first
    await page.goto('http://localhost:3003/products/0111-Ro-1');
    
    // Add item to cart
    await page.click('button:has-text("Add to Cart")');
    
    // Wait for cart to update
    await page.waitForTimeout(1000);
    
    // Go to checkout
    await page.goto('http://localhost:3003/checkout');
    
    // Check that the checkout page loads properly
    await expect(page.locator('h1:has-text("Checkout")')).toBeVisible();
    
    // Check for form fields
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[placeholder="First Name"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Last Name"]')).toBeVisible();
    
    // Check for order summary
    await expect(page.locator('h2:has-text("Order Summary")')).toBeVisible();
    
    // Check for submit button
    await expect(page.locator('button:has-text("Complete Order")')).toBeVisible();
    
    console.log('✓ Checkout page loaded successfully with all required elements');
  });

  test('empty cart redirects to products', async ({ page }) => {
    // Go directly to checkout with empty cart
    await page.goto('http://localhost:3003/checkout');
    
    // Should redirect or show empty cart message
    await expect(page.locator('h2:has-text("Your cart is empty")')).toBeVisible();
    await expect(page.locator('button:has-text("Continue Shopping")')).toBeVisible();
    
    console.log('✓ Empty cart properly handled');
  });
});