import { test, expect } from '@playwright/test';

test.describe('Product Group Card Interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/products');
    await page.waitForLoadState('networkidle');
  });

  test('wishlist toggle changes icon state', async ({ page }) => {
    const heartButton = page.locator('.product-card button[aria-label*="wishlist"]').first();
    if (await heartButton.count() === 0) test.skip();
    await heartButton.click();
    // After click aria-label should invert
    const labelAfter = await heartButton.getAttribute('aria-label');
    expect(labelAfter).toMatch(/Remove|Added/);
  });

  test('add to cart button adds item and shows toast', async ({ page }) => {
    const addBtn = page.locator('.product-card button:has-text("Add to Cart")').first();
    if (await addBtn.count() === 0) test.skip();
    await addBtn.click();
    // Toast expectation (react-hot-toast default role alert)
    const toast = page.locator('[role="status"], [data-sonner-toast], div:has-text("added to cart")');
    await expect(toast.first()).toBeVisible({ timeout: 5000 });
  });

  test('clicking a product card navigates to detail page', async ({ page }) => {
    const firstCard = page.locator('.product-card').first();
    await firstCard.click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/\/products\//);
    await expect(page.locator('h1')).toBeVisible();
  });
});
