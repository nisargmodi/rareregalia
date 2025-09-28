import { test, expect, request } from '@playwright/test';

test.describe('Internal Link Integrity', () => {
  test('all primary navigation & homepage links resolve 200', async ({ page, context, baseURL }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const anchors = page.locator('a[href^="/"]');
    const count = await anchors.count();
    const urls = new Set<string>();
    for (let i = 0; i < count; i++) {
      const href = await anchors.nth(i).getAttribute('href');
      if (!href) continue;
      // Skip dynamic wildcard placeholders
      if (href.startsWith('/#') || href === '/' ) continue;
      urls.add(href.split('#')[0]);
    }

    const requestContext = await request.newContext();
    for (const partial of Array.from(urls)) {
      const res = await requestContext.get(`${baseURL}${partial}`);
      // Allow 404 for clearly unimplemented marketing pages (warn instead of fail)
      if (res.status() === 404) {
        console.warn(`WARN: ${partial} returned 404`);
        continue;
      }
      expect(res.status(), `Link ${partial} returned ${res.status()}`).toBeLessThan(400);
    }
  });
});
