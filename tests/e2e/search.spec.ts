import { test, expect, Page } from '@playwright/test';

// Utility to get product card titles
async function getProductTitles(page: Page) {
  const titles = page.locator('.product-card h3');
  const count = await titles.count();
  const out: string[] = [];
  for (let i = 0; i < count; i++) {
    out.push((await titles.nth(i).innerText()).trim());
  }
  return out;
}

test.describe('Product Search', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/products');
    await page.waitForLoadState('networkidle');
  });

  test('search overlay opens when magnifying glass clicked', async ({ page }) => {
    // Search input should not be visible initially
    const searchInput = page.getByTestId('search-input');
    await expect(searchInput).not.toBeVisible();
    
    // Click magnifying glass icon (it's in the header actions area)
    const searchButton = page.locator('header button').filter({ has: page.locator('svg') }).first();
    await searchButton.click();
    await page.waitForTimeout(500);
    
    // Now search input should be visible
    await expect(searchInput).toBeVisible({ timeout: 5000 });
    await expect(searchInput).toHaveAttribute('placeholder', /Search jewelry/i);
    
    // Should show initial empty state
    await expect(page.locator('text=Start typing to search')).toBeVisible();
  });

  test('products load on page', async ({ page }) => {
    // Wait for products to load
    await expect(page.locator('.product-card').first()).toBeVisible({ timeout: 15000 });
    const productCount = await page.locator('.product-card').count();
    console.log(`Initial product count: ${productCount}`);
    expect(productCount).toBeGreaterThan(0);
  });

  test('dynamic search shows results as you type', async ({ page }) => {
    // Open search overlay
    const searchButton = page.locator('header button').filter({ has: page.locator('svg') }).first();
    await searchButton.click();
    await page.waitForTimeout(300);

    // Type in search
    const searchInput = page.getByTestId('search-input');
    await searchInput.fill('Eterna');
    await page.waitForTimeout(500);

    // Results should appear dynamically in overlay
    const searchResults = page.locator('a[href*="/products/"]').filter({ hasText: /Eterna/i });
    await expect(searchResults.first()).toBeVisible({ timeout: 3000 });
    
    // Should show multiple results
    const resultsCount = await searchResults.count();
    console.log(`Dynamic search results for "Eterna": ${resultsCount}`);
    expect(resultsCount).toBeGreaterThan(0);
    
    // Click on first result
    await searchResults.first().click();
    
    // Should navigate to product detail page
    await page.waitForURL('**/products/*');
    await expect(page.locator('h1, h2').filter({ hasText: /Eterna/i }).first()).toBeVisible({ timeout: 5000 });
  });

  test('search by category shows relevant results', async ({ page }) => {
    // Open search
    const searchButton = page.locator('header button').filter({ has: page.locator('svg') }).first();
    await searchButton.click();
    await page.waitForTimeout(300);
    
    const searchInput = page.getByTestId('search-input');
    await searchInput.fill('Rings');
    await page.waitForTimeout(500);

    // Should show ring products
    const searchResults = page.locator('a[href*="/products/"]');
    await expect(searchResults.first()).toBeVisible({ timeout: 3000 });
    
    const count = await searchResults.count();
    console.log(`Dynamic results for "Rings": ${count}`);
    expect(count).toBeGreaterThan(0);
  });

  test('search by metal type shows relevant results', async ({ page }) => {
    // Open search
    const searchButton = page.locator('header button').filter({ has: page.locator('svg') }).first();
    await searchButton.click();
    await page.waitForTimeout(300);
    
    const searchInput = page.getByTestId('search-input');
    await searchInput.fill('White Gold');
    await page.waitForTimeout(500);

    // Should show white gold products
    const searchResults = page.locator('a[href*="/products/"]');
    await expect(searchResults.first()).toBeVisible({ timeout: 3000 });
    
    const count = await searchResults.count();
    console.log(`Dynamic results for "White Gold": ${count}`);
    expect(count).toBeGreaterThan(0);
  });

  test('invalid search shows no results message', async ({ page }) => {
    // Open search
    const searchButton = page.locator('header button').filter({ has: page.locator('svg') }).first();
    await searchButton.click();
    await page.waitForTimeout(300);
    
    const searchInput = page.getByTestId('search-input');
    await searchInput.fill('xyznonexistent123');
    await page.waitForTimeout(500);

    // Should show no results message
    await expect(page.locator('text=No products found')).toBeVisible({ timeout: 3000 });
    
    // Should not show "View all results" link
    await expect(page.locator('text=View all')).not.toBeVisible();
  });

  test('clear search button works on products page', async ({ page }) => {
    // Navigate with search parameter
    await page.goto('/products?search=ring');
    await page.waitForLoadState('networkidle');
    
    // Clear button should be visible
    const clearButton = page.getByTestId('clear-search-button');
    await expect(clearButton).toBeVisible({ timeout: 2000 });

    // Click clear
    await clearButton.click();
    await page.waitForTimeout(500);
    
    // Should show all products now
    const count = await page.locator('.product-card').count();
    expect(count).toBeGreaterThan(100); // Should be back to showing most/all products
  });

  test('search with URL parameter', async ({ page }) => {
    await page.goto('/products?search=Eterna');
    await page.waitForLoadState('networkidle');

    // Should show search query badge
    await expect(page.locator('text=Searching for:')).toBeVisible();
    await expect(page.locator('.bg-primary-50 .font-medium', { hasText: 'Eterna' })).toBeVisible();

    // Products should be filtered
    await expect(page.locator('.product-card').first()).toBeVisible({ timeout: 15000 });
    const count = await page.locator('.product-card').count();
    console.log(`Count with URL param: ${count}`);
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThan(50); // Should be filtered
    
    const productTitles = await getProductTitles(page);
    const hasMatchingProduct = productTitles.some(title => 
      title.toLowerCase().includes('eterna')
    );
    expect(hasMatchingProduct).toBeTruthy();
  });

  test('case insensitive search', async ({ page }) => {
    // Open search
    const searchButton = page.locator('header button').filter({ has: page.locator('svg') }).first();
    await searchButton.click();
    await page.waitForTimeout(300);
    
    const searchInput = page.getByTestId('search-input');
    
    // Test lowercase
    await searchInput.fill('eterna');
    await page.waitForTimeout(500);
    const lowerResults = page.locator('a[href*="/products/"]');
    const lowerCount = await lowerResults.count();

    // Clear and test uppercase
    await searchInput.clear();
    await searchInput.fill('ETERNA');
    await page.waitForTimeout(500);
    const upperResults = page.locator('a[href*="/products/"]');
    const upperCount = await upperResults.count();

    expect(lowerCount).toBe(upperCount);
    expect(lowerCount).toBeGreaterThan(0);
  });

  test('view all results link works', async ({ page }) => {
    // Open search
    const searchButton = page.locator('header button').filter({ has: page.locator('svg') }).first();
    await searchButton.click();
    await page.waitForTimeout(300);
    
    const searchInput = page.getByTestId('search-input');
    await searchInput.fill('ring');
    await page.waitForTimeout(500);

    // Should show "View all results" link
    const viewAllLink = page.locator('text=View all').first();
    await expect(viewAllLink).toBeVisible({ timeout: 3000 });
    
    // Click it
    await viewAllLink.click();
    
    // Should navigate to products page with search
    await page.waitForURL('**/products?search=*');
    await page.waitForLoadState('networkidle');
    
    // Should show filtered products
    await expect(page.locator('.product-card').first()).toBeVisible({ timeout: 15000 });
    const count = await page.locator('.product-card').count();
    expect(count).toBeGreaterThan(0);
  });
});

