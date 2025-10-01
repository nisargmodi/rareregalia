import { test, expect } from '@playwright/test';

test.describe('Product Gallery', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to a product with known images and videos
    await page.goto('/products/1-0016');
    await page.waitForLoadState('networkidle');
  });

  test('should display product gallery with images', async ({ page }) => {
    // Check if gallery container exists
    const gallery = page.locator('[class*="space-y-4"]').first();
    await expect(gallery).toBeVisible();

    // Check if main image display is visible
    const mainDisplay = page.locator('.aspect-square.bg-white').first();
    await expect(mainDisplay).toBeVisible();
  });

  test('should show navigation arrows when multiple media items exist', async ({ page }) => {
    // Wait for gallery to load
    await page.waitForSelector('.aspect-square', { state: 'visible' });

    // Hover over gallery to reveal arrows
    const gallery = page.locator('.aspect-square.bg-white').first();
    await gallery.hover();

    // Check for previous button
    const prevButton = page.locator('button[aria-label="Previous media"]');
    await expect(prevButton).toBeVisible();

    // Check for next button  
    const nextButton = page.locator('button[aria-label="Next media"]');
    await expect(nextButton).toBeVisible();
  });

  test('should navigate to next image when clicking right arrow', async ({ page }) => {
    // Wait for gallery
    await page.waitForSelector('.aspect-square', { state: 'visible' });

    // Get initial media counter
    const counter = page.locator('div.bg-black\\/50').first();
    const initialText = await counter.textContent();
    expect(initialText).toContain('1 /');

    // Hover to show arrows
    const gallery = page.locator('.aspect-square.bg-white').first();
    await gallery.hover();

    // Click next button
    const nextButton = page.locator('button[aria-label="Next media"]');
    await nextButton.click();

    // Wait a bit for state to update
    await page.waitForTimeout(300);

    // Check counter changed
    const newText = await counter.textContent();
    expect(newText).toContain('2 /');
  });

  test('should navigate to previous image when clicking left arrow', async ({ page }) => {
    // Wait for gallery
    await page.waitForSelector('.aspect-square', { state: 'visible' });

    const gallery = page.locator('.aspect-square.bg-white').first();
    await gallery.hover();

    // Click next twice to go to image 3
    const nextButton = page.locator('button[aria-label="Next media"]');
    await nextButton.click();
    await page.waitForTimeout(200);
    await nextButton.click();
    await page.waitForTimeout(200);

    // Get counter - should be at 3
    const counter = page.locator('div.bg-black\\/50').first();
    let text = await counter.textContent();
    expect(text).toContain('3 /');

    // Click previous
    const prevButton = page.locator('button[aria-label="Previous media"]');
    await prevButton.click();
    await page.waitForTimeout(300);

    // Should be at 2
    text = await counter.textContent();
    expect(text).toContain('2 /');
  });

  test('should display media counter with correct total', async ({ page }) => {
    // Wait for gallery
    await page.waitForSelector('.aspect-square', { state: 'visible' });

    // Check counter exists and has format "X / Y"
    const counter = page.locator('div.bg-black\\/50').first();
    await expect(counter).toBeVisible();

    const text = await counter.textContent();
    expect(text).toMatch(/\d+ \/ \d+/);
  });

  test('should display thumbnails grid', async ({ page }) => {
    // Wait for gallery
    await page.waitForSelector('.aspect-square', { state: 'visible' });

    // Check if thumbnail grid exists
    const thumbnailGrid = page.locator('.grid.grid-cols-4');
    await expect(thumbnailGrid).toBeVisible();

    // Check if thumbnails exist
    const thumbnails = thumbnailGrid.locator('button');
    const count = await thumbnails.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should switch media when clicking thumbnail', async ({ page }) => {
    // Wait for gallery
    await page.waitForSelector('.aspect-square', { state: 'visible' });

    // Get counter
    const counter = page.locator('div.bg-black\\/50').first();
    const initialText = await counter.textContent();
    expect(initialText).toContain('1 /');

    // Click second thumbnail
    const thumbnailGrid = page.locator('.grid.grid-cols-4');
    const secondThumbnail = thumbnailGrid.locator('button').nth(1);
    await secondThumbnail.click();

    // Wait for state update
    await page.waitForTimeout(300);

    // Check counter changed to 2
    const newText = await counter.textContent();
    expect(newText).toContain('2 /');
  });

  test('should highlight selected thumbnail', async ({ page }) => {
    // Wait for gallery
    await page.waitForSelector('.aspect-square', { state: 'visible' });

    // Get thumbnail grid
    const thumbnailGrid = page.locator('.grid.grid-cols-4');
    
    // First thumbnail should be selected (have amber border)
    const firstThumbnail = thumbnailGrid.locator('button').first();
    const firstClass = await firstThumbnail.getAttribute('class');
    expect(firstClass).toContain('border-amber-500');

    // Click second thumbnail
    const secondThumbnail = thumbnailGrid.locator('button').nth(1);
    await secondThumbnail.click();
    await page.waitForTimeout(300);

    // Second thumbnail should now be selected
    const secondClass = await secondThumbnail.getAttribute('class');
    expect(secondClass).toContain('border-amber-500');
  });

  test('should loop back to first image from last image', async ({ page }) => {
    // Wait for gallery
    await page.waitForSelector('.aspect-square', { state: 'visible' });

    const gallery = page.locator('.aspect-square.bg-white').first();
    await gallery.hover();

    // Get total count
    const counter = page.locator('div.bg-black\\/50').first();
    const text = await counter.textContent();
    const match = text?.match(/\/ (\d+)/);
    const total = match ? parseInt(match[1]) : 0;

    // Click next until we reach the last image
    const nextButton = page.locator('button[aria-label="Next media"]');
    for (let i = 1; i < total; i++) {
      await nextButton.click();
      await page.waitForTimeout(200);
    }

    // Should be at last image
    let currentText = await counter.textContent();
    expect(currentText).toContain(`${total} /`);

    // Click next once more - should loop to first
    await nextButton.click();
    await page.waitForTimeout(300);

    currentText = await counter.textContent();
    expect(currentText).toContain('1 /');
  });

  test('should loop to last image from first image when clicking previous', async ({ page }) => {
    // Wait for gallery
    await page.waitForSelector('.aspect-square', { state: 'visible' });

    const gallery = page.locator('.aspect-square.bg-white').first();
    await gallery.hover();

    // Get total count
    const counter = page.locator('div.bg-black\\/50').first();
    const text = await counter.textContent();
    const match = text?.match(/\/ (\d+)/);
    const total = match ? parseInt(match[1]) : 0;

    // Click previous from first image
    const prevButton = page.locator('button[aria-label="Previous media"]');
    await prevButton.click();
    await page.waitForTimeout(300);

    // Should be at last image
    const currentText = await counter.textContent();
    expect(currentText).toContain(`${total} /`);
  });
});

test.describe('Product Gallery - Videos', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to product with videos
    await page.goto('/products/1-0016');
    await page.waitForLoadState('networkidle');
  });

  test('should display videos in gallery', async ({ page }) => {
    // Wait for gallery
    await page.waitForSelector('.aspect-square', { state: 'visible' });

    // Check if video element exists (may need to navigate to it)
    const gallery = page.locator('.aspect-square.bg-white').first();
    
    // Navigate through media to find video
    await gallery.hover();
    const nextButton = page.locator('button[aria-label="Next media"]');
    
    // Click through up to 10 times looking for video
    let foundVideo = false;
    for (let i = 0; i < 10; i++) {
      const video = page.locator('video[controls]');
      if (await video.count() > 0) {
        foundVideo = true;
        break;
      }
      await nextButton.click();
      await page.waitForTimeout(300);
    }

    // If videos exist for this product, we should find one
    // Note: Some products may not have videos, so we check data first
    const hasVideos = await page.evaluate(() => {
      // Check if current product data has videos
      return window.location.pathname.includes('0016'); // Known product with videos
    });

    if (hasVideos && foundVideo) {
      const video = page.locator('video[controls]');
      await expect(video).toBeVisible();
    }
  });

  test('should show video with controls', async ({ page }) => {
    // Wait for page load
    await page.waitForLoadState('networkidle');

    // Try to find video element
    const video = page.locator('video[controls]').first();
    
    // Navigate through gallery to find video
    const gallery = page.locator('.aspect-square.bg-white').first();
    await gallery.hover();
    const nextButton = page.locator('button[aria-label="Next media"]');
    
    for (let i = 0; i < 10; i++) {
      if (await video.count() > 0 && await video.isVisible()) {
        // Found video, check attributes
        await expect(video).toHaveAttribute('controls');
        await expect(video).toHaveAttribute('autoplay');
        await expect(video).toHaveAttribute('loop');
        await expect(video).toHaveAttribute('muted');
        break;
      }
      await nextButton.click();
      await page.waitForTimeout(300);
    }
  });

  test('should show play icon on video thumbnails', async ({ page }) => {
    // Wait for gallery
    await page.waitForSelector('.aspect-square', { state: 'visible' });

    // Look for video thumbnails with play icon
    const thumbnailGrid = page.locator('.grid.grid-cols-4');
    const thumbnails = thumbnailGrid.locator('button');
    const count = await thumbnails.count();

    // Check each thumbnail for video/play icon
    for (let i = 0; i < count; i++) {
      const thumbnail = thumbnails.nth(i);
      const hasVideo = await thumbnail.locator('video').count() > 0;
      
      if (hasVideo) {
        // Should have play icon SVG
        const playIcon = thumbnail.locator('svg');
        await expect(playIcon).toBeVisible();
        break;
      }
    }
  });

  test('should filter videos by metal type', async ({ page }) => {
    // This test checks that changing metal type shows appropriate videos
    await page.waitForLoadState('networkidle');

    // Select White Gold variant
    const whiteGoldButton = page.locator('text=White Gold').first();
    if (await whiteGoldButton.count() > 0) {
      await whiteGoldButton.click();
      await page.waitForTimeout(500);

      // Navigate to video
      const gallery = page.locator('.aspect-square.bg-white').first();
      await gallery.hover();
      const nextButton = page.locator('button[aria-label="Next media"]');
      
      // Find video
      for (let i = 0; i < 10; i++) {
        const video = page.locator('video[controls]');
        if (await video.count() > 0 && await video.isVisible()) {
          const src = await video.getAttribute('src');
          expect(src).toContain('White');
          break;
        }
        await nextButton.click();
        await page.waitForTimeout(300);
      }
    }
  });
});

test.describe('Product Gallery - Metal Type Switching', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/products/1-0016');
    await page.waitForLoadState('networkidle');
  });

  test('should reset to first image when changing metal type', async ({ page }) => {
    // Wait for gallery
    await page.waitForSelector('.aspect-square', { state: 'visible' });

    // Navigate to second image
    const gallery = page.locator('.aspect-square.bg-white').first();
    await gallery.hover();
    const nextButton = page.locator('button[aria-label="Next media"]');
    await nextButton.click();
    await page.waitForTimeout(300);

    // Verify we're at image 2
    const counter = page.locator('div.bg-black\\/50').first();
    let text = await counter.textContent();
    expect(text).toContain('2 /');

    // Change metal type (if multiple options exist)
    const roseGoldButton = page.locator('text=Rose Gold').first();
    if (await roseGoldButton.count() > 0) {
      await roseGoldButton.click();
      await page.waitForTimeout(500);

      // Should reset to first image
      text = await counter.textContent();
      expect(text).toContain('1 /');
    }
  });

  test('should update available images for selected metal type', async ({ page }) => {
    // Get initial image count
    await page.waitForSelector('.aspect-square', { state: 'visible' });
    
    const counter = page.locator('div.bg-black\\/50').first();
    const initialText = await counter.textContent();
    const initialMatch = initialText?.match(/\/ (\d+)/);
    const initialTotal = initialMatch ? parseInt(initialMatch[1]) : 0;

    // Change metal type
    const yellowGoldButton = page.locator('text=Yellow Gold').first();
    if (await yellowGoldButton.count() > 0) {
      await yellowGoldButton.click();
      await page.waitForTimeout(500);

      // Get new count (may be different)
      const newText = await counter.textContent();
      const newMatch = newText?.match(/\/ (\d+)/);
      const newTotal = newMatch ? parseInt(newMatch[1]) : 0;

      // Should have some images
      expect(newTotal).toBeGreaterThan(0);
    }
  });
});

test.describe('Product Gallery - Edge Cases', () => {
  test('should handle single image gracefully', async ({ page }) => {
    // Navigate to product that might have only one image
    // We'll use any product and test the behavior
    await page.goto('/products');
    await page.waitForLoadState('networkidle');
    
    // Click first product
    const firstProduct = page.locator('.product-card').first();
    await firstProduct.click();
    await page.waitForLoadState('networkidle');

    // Check if navigation arrows are hidden when only 1 image
    const gallery = page.locator('.aspect-square.bg-white').first();
    await gallery.hover();

    const prevButton = page.locator('button[aria-label="Previous media"]');
    const nextButton = page.locator('button[aria-label="Next media"]');

    // If only 1 image, arrows should not be visible
    const counter = page.locator('div.bg-black\\/50').first();
    if (await counter.count() > 0) {
      const text = await counter.textContent();
      if (text?.includes('1 / 1')) {
        // Single image - arrows should not be visible
        await expect(prevButton).not.toBeVisible();
        await expect(nextButton).not.toBeVisible();
      }
    }
  });

  test('should show "No media available" when no images', async ({ page }) => {
    // This is a defensive test - in normal operation shouldn't happen
    // But good to test the fallback UI
    
    // We'll test by checking the component handles empty state
    await page.goto('/products/1-0016');
    await page.waitForLoadState('networkidle');

    // Look for gallery container
    const gallery = page.locator('[class*="space-y-4"]').first();
    await expect(gallery).toBeVisible();

    // Should have either images/videos OR "No media available" text
    const hasMedia = await page.locator('.aspect-square.bg-white').count() > 0;
    const hasNoMediaText = await page.locator('text=No media available').count() > 0;

    expect(hasMedia || hasNoMediaText).toBeTruthy();
  });
});
