import { test, expect } from '@playwright/test';

test.describe('Product Search', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/products');
    await page.waitForLoadState('networkidle');
  });

  test('search input exists and is visible', async ({ page }) => {
    const searchInput = page.getByTestId('search-input');
    await expect(searchInput).toBeVisible({ timeout: 5000 });
    await expect(searchInput).toHaveAttribute('placeholder', /Search jewelry/i);
  });

  test('products load on page', async ({ page }) => {
    // Wait for products to load
    await expect(page.locator('.product-card').first()).toBeVisible({ timeout: 15000 });
    const productCount = await page.locator('.product-card').count();
    console.log(`Initial product count: ${productCount}`);
    expect(productCount).toBeGreaterThan(0);
  });

  test('search by known product name shows results', async ({ page }) => {
    // Wait for initial products
    await expect(page.locator('.product-card').first()).toBeVisible({ timeout: 15000 });
    const initialCount = await page.locator('.product-card').count();
    console.log(`Initial count: ${initialCount}`);

    // Type in search
    const searchInput = page.getByTestId('search-input');
    await searchInput.fill('Eterna');
    
    // Wait for filtering to occur
    await page.waitForTimeout(1000);

    // Check filtered results
    const filteredCount = await page.locator('.product-card').count();
    console.log(`Filtered count after "Eterna": ${filteredCount}`);
    
    // Get product titles
    const titles = await page.locator('.product-card h3').allTextContents();
    console.log('Product titles:', titles);

    expect(filteredCount).toBeGreaterThan(0);
    
    // At least one product should match
    const hasMatch = titles.some(title => title.toLowerCase().includes('eterna'));
    expect(hasMatch).toBeTruthy();
  });

  test('search by category', async ({ page }) => {
    await expect(page.locator('.product-card').first()).toBeVisible({ timeout: 15000 });
    
    const searchInput = page.getByTestId('search-input');
    await searchInput.fill('Rings');
    await page.waitForTimeout(1000);

    const count = await page.locator('.product-card').count();
    console.log(`Count after "Rings" search: ${count}`);
    expect(count).toBeGreaterThan(0);
  });

  test('search by metal type', async ({ page }) => {
    await expect(page.locator('.product-card').first()).toBeVisible({ timeout: 15000 });
    
    const searchInput = page.getByTestId('search-input');
    await searchInput.fill('White Gold');
    await page.waitForTimeout(1000);

    const count = await page.locator('.product-card').count();
    console.log(`Count after "White Gold" search: ${count}`);
    expect(count).toBeGreaterThan(0);
  });

  test('invalid search shows no results message', async ({ page }) => {
    await expect(page.locator('.product-card').first()).toBeVisible({ timeout: 15000 });
    
    const searchInput = page.getByTestId('search-input');
    await searchInput.fill('xyznonexistent123');
    await page.waitForTimeout(1000);

    await expect(page.locator('text=No products found')).toBeVisible({ timeout: 3000 });
    const count = await page.locator('.product-card').count();
    expect(count).toBe(0);
  });

  test('clear search button works', async ({ page }) => {
    const searchInput = page.getByTestId('search-input');
    
    // Type search
    await searchInput.fill('ring');
    await page.waitForTimeout(500);

    // Clear button should be visible
    const clearButton = page.getByTestId('clear-search-button');
    await expect(clearButton).toBeVisible({ timeout: 2000 });

    // Click clear
    await clearButton.click();
    await page.waitForTimeout(300);

    // Input should be empty
    await expect(searchInput).toHaveValue('');
    
    // Clear button should be hidden
    await expect(clearButton).not.toBeVisible();
  });

  test('search with URL parameter', async ({ page }) => {
    await page.goto('/products?search=Eterna');
    await page.waitForLoadState('networkidle');

    // Search input should have the value
    const searchInput = page.getByTestId('search-input');
    await expect(searchInput).toHaveValue('Eterna');

    // Products should be filtered
    await expect(page.locator('.product-card').first()).toBeVisible({ timeout: 15000 });
    const count = await page.locator('.product-card').count();
    console.log(`Count with URL param: ${count}`);
    expect(count).toBeGreaterThan(0);
  });

  test('case insensitive search', async ({ page }) => {
    await expect(page.locator('.product-card').first()).toBeVisible({ timeout: 15000 });
    const searchInput = page.getByTestId('search-input');
    
    // Lowercase
    await searchInput.fill('eterna');
    await page.waitForTimeout(500);
    const lowerCount = await page.locator('.product-card').count();

    // Uppercase
    await searchInput.clear();
    await searchInput.fill('ETERNA');
    await page.waitForTimeout(500);
    const upperCount = await page.locator('.product-card').count();

    expect(lowerCount).toBe(upperCount);
    expect(lowerCount).toBeGreaterThan(0);
  });
});
