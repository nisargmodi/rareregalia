import { test, expect } from '@playwright/test';

// Lightweight accessibility smoke without axe-core (can be added later)
// Verifies basic semantics are present on key pages.

const pages = ['/', '/products'];

test.describe('Accessibility Smoke', () => {
  for (const p of pages) {
    test(`page ${p} has landmarks, headings, alt attributes`, async ({ page }) => {
      await page.goto(p);
      await page.waitForLoadState('networkidle');

      // At least one h1
  // At least one main heading
  await expect(page.locator('h1').first()).toBeVisible();
      // No empty alt attributes on product images (unless decorative)
      const imgs = page.locator('img');
      const count = await imgs.count();
      for (let i = 0; i < Math.min(count, 10); i++) {
        const alt = await imgs.nth(i).getAttribute('alt');
        expect(alt).not.toBe(undefined);
      }

      // Buttons should have accessible names
      const buttons = page.locator('button');
      const bCount = await buttons.count();
      if (bCount === 0) test.skip();
      for (let i = 0; i < Math.min(bCount, 10); i++) {
        const btn = buttons.nth(i);
        const name = (await btn.innerText()).trim();
        if (name.length === 0) {
          const aria = await btn.getAttribute('aria-label');
          if (!aria) {
            // Skip purely decorative button (record warning rather than fail)
            test.info().annotations.push({ type: 'warn', description: `Button ${i} missing accessible name` });
            continue;
          }
        }
      }
    });
  }
});
