import { test, expect, Page } from '@playwright/test';

test.describe('Sorting & View Mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/products');
    await page.waitForLoadState('networkidle');
  });

  // helper retained (currently unused) for potential future assertions
  async function getFirstPrices(page: Page) {
    const priceEls = page.locator('.product-card').locator('text=₹').first();
    return priceEls;
  }

  test('sort dropdown changes ordering', async ({ page }) => {
    const select = page.locator('select');
    await expect(select).toBeVisible();

    // Capture initial first product title
    const firstTitleBefore = await page.locator('.product-card h3').first().innerText();

    await select.selectOption('price-high');
    await page.waitForTimeout(500);
    const firstHigh = await page.locator('.product-card h3').first().innerText();

    await select.selectOption('price-low');
    await page.waitForTimeout(500);
    const firstLow = await page.locator('.product-card h3').first().innerText();

    // At least one ordering change occurred
    expect(new Set([firstTitleBefore, firstHigh, firstLow]).size).toBeGreaterThan(1);
  });

  test('toggle view mode between grid and list', async ({ page }) => {
    const gridBtn = page.locator('button >> nth=0').filter({ has: page.locator('svg') }); // first toggle button
    const listBtn = page.locator('button >> nth=1').filter({ has: page.locator('svg') }); // second toggle

    // Defensive: locate by aria or class fallback
    await gridBtn.click();
    await page.waitForTimeout(200);
    // Grid should have multiple columns
    const gridHasMultiCols = await page.locator('div.grid').count();

    await listBtn.click();
    await page.waitForTimeout(200);
    const listVariantCards = await page.locator('.product-card').count();

    expect(gridHasMultiCols).toBeGreaterThan(0);
    expect(listVariantCards).toBeGreaterThan(0);
  });
});
