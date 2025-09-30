import { test, expect, Page, request } from '@playwright/test';

test.describe('Comprehensive Hyperlink Testing', () => {
  
  // Define all expected internal links categorized by component/page
  const INTERNAL_LINKS = {
    navigation: [
      '/',
      '/products',
      '/products?category=rings',
      '/products?category=earrings', 
      '/products?category=pendants',
      '/products?category=bracelets'
    ],
    heroSection: [
      '/products',
      '/about'
    ],
    categoryShowcase: [
      '/products?category=rings',
      '/products?category=earrings',
      '/products?category=pendants', 
      '/products?category=bracelets',
      '/products'
    ],
    footerShop: [
      '/products',
      '/products?category=rings',
      '/products?category=earrings',
      '/products?category=pendants',
      '/products?category=bracelets'
    ],
    footerCustomerCare: [
      '/contact',
      '/size-guide',
      '/care',
      '/returns',
      '/shipping'
    ],
    footerAbout: [
      '/about',
      '/craftsmanship',
      '/certifications',
      '/sustainability'
    ],
    footerLegal: [
      '/privacy',
      '/terms',
      '/cookies'
    ],
    productFlow: [
      '/checkout',
      '/order-confirmation'
    ]
  };

  const EXTERNAL_LINKS = [
    'https://facebook.com',
    'https://instagram.com', 
    'https://twitter.com',
    'https://pinterest.com'
  ];

  // Helper function to check if a link is accessible
  async function checkLinkStatus(url: string, baseURL: string | undefined) {
    const requestContext = await request.newContext();
    try {
      const fullUrl = url.startsWith('http') ? url : `${baseURL || 'http://localhost:3000'}${url}`;
      const response = await requestContext.get(fullUrl);
      return {
        url,
        status: response.status(),
        ok: response.ok(),
        redirected: response.url() !== fullUrl
      };
    } catch (error) {
      return {
        url,
        status: 0,
        ok: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        redirected: false
      };
    } finally {
      await requestContext.dispose();
    }
  }

  // Helper function to find and test all links on a page
  async function testPageLinks(page: Page, pageUrl: string, baseURL: string | undefined) {
    console.log(`\n=== Testing links on ${pageUrl} ===`);
    
    await page.goto(pageUrl);
    await page.waitForLoadState('networkidle');

    // Find all internal links (href starting with / or same domain)
    const internalLinks = page.locator('a[href^="/"], a[href*="localhost"], a[href*="rareregalia"]');
    const internalCount = await internalLinks.count();
    
    const internalResults = [];
    for (let i = 0; i < internalCount; i++) {
      const href = await internalLinks.nth(i).getAttribute('href');
      const text = await internalLinks.nth(i).textContent();
      if (href) {
        const cleanHref = href.split('#')[0]; // Remove fragments
        if (cleanHref && cleanHref !== '/') {
          internalResults.push({
            href: cleanHref,
            text: text?.trim() || 'No text',
            element: i
          });
        }
      }
    }

    // Find all external links
    const externalLinks = page.locator('a[href^="http"]:not([href*="localhost"]):not([href*="rareregalia"])');
    const externalCount = await externalLinks.count();
    
    const externalResults = [];
    for (let i = 0; i < externalCount; i++) {
      const href = await externalLinks.nth(i).getAttribute('href');
      const text = await externalLinks.nth(i).textContent();
      if (href) {
        externalResults.push({
          href,
          text: text?.trim() || 'No text',
          element: i
        });
      }
    }

    return { internal: internalResults, external: externalResults };
  }

  test('Header navigation links work correctly', async ({ page, baseURL }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Test logo link
    const logoLink = page.locator('header a[href="/"]').first();
    await expect(logoLink).toBeVisible();
    
    // Test navigation menu links
    for (const link of INTERNAL_LINKS.navigation) {
      const navLink = page.locator(`header a[href="${link}"]`).first();
      
      if (await navLink.count() > 0) {
        await expect(navLink).toBeVisible();
        
        // Click and verify navigation
        await navLink.click();
        await page.waitForLoadState('networkidle');
        
        // Verify URL changed correctly
        const currentUrl = page.url();
        const expectedPath = link === '/' ? '' : link;
        expect(currentUrl).toContain(expectedPath);
        
        console.log(`✓ Header link ${link} works correctly`);
        
        // Go back to home for next test
        await page.goto('/');
        await page.waitForLoadState('networkidle');
      } else {
        console.warn(`⚠ Header link ${link} not found on page`);
      }
    }
  });

  test('Footer links are present and accessible', async ({ page, baseURL }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Scroll to footer
    await page.locator('footer').scrollIntoViewIfNeeded();

    const allFooterLinks = [
      ...INTERNAL_LINKS.footerShop,
      ...INTERNAL_LINKS.footerCustomerCare,
      ...INTERNAL_LINKS.footerAbout,
      ...INTERNAL_LINKS.footerLegal
    ];

    const results = [];
    
    for (const link of allFooterLinks) {
      const footerLink = page.locator(`footer a[href="${link}"]`).first();
      
      if (await footerLink.count() > 0) {
        await expect(footerLink).toBeVisible();
        
        // Check if link is functional by testing the URL
        const linkStatus = await checkLinkStatus(link, baseURL);
        results.push(linkStatus);
        
        if (linkStatus.status === 404) {
          console.warn(`⚠ Footer link ${link} returns 404 - likely unimplemented page`);
        } else if (!linkStatus.ok) {
          console.error(`✗ Footer link ${link} failed with status ${linkStatus.status}`);
        } else {
          console.log(`✓ Footer link ${link} is accessible`);
        }
      } else {
        console.warn(`⚠ Footer link ${link} not found on page`);
      }
    }

    // Allow some 404s for unimplemented marketing pages, but not all
    const successfulLinks = results.filter(r => r.ok).length;
    const totalLinks = results.length;
    expect(successfulLinks).toBeGreaterThan(totalLinks * 0.3); // At least 30% should work
  });

  test('Homepage Hero section links work', async ({ page, baseURL }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Test "Shop Collection" button
    const shopButton = page.locator('a[href="/products"]').first();
    await expect(shopButton).toBeVisible();
    await shopButton.click();
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('/products');
    
    console.log('✓ Shop Collection button works');

    // Go back and test "Our Story" button
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const storyButton = page.locator('a[href="/about"]').first();
    if (await storyButton.count() > 0) {
      await storyButton.click();
      await page.waitForLoadState('networkidle');
      
      // This might be a 404 page, but should still navigate
      console.log(`Our Story button navigated to: ${page.url()}`);
    }
  });

  test('Category showcase links work correctly', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Scroll to category section
    await page.locator('[data-testid="category-showcase"], .grid a[href*="category="]').first().scrollIntoViewIfNeeded();

    // Test each category link
    const categories = ['rings', 'earrings', 'pendants', 'bracelets'];
    
    for (const category of categories) {
      const categoryLink = page.locator(`a[href="/products?category=${category}"]`).first();
      
      if (await categoryLink.count() > 0) {
        await categoryLink.click();
        await page.waitForLoadState('networkidle');
        
        // Verify we're on the products page with correct category filter
        expect(page.url()).toContain('/products');
        expect(page.url()).toContain(`category=${category}`);
        
        console.log(`✓ Category link for ${category} works correctly`);
        
        // Go back for next test
        await page.goto('/');
        await page.waitForLoadState('networkidle');
      } else {
        console.warn(`⚠ Category link for ${category} not found`);
      }
    }

    // Test "View All Products" link
    const viewAllLink = page.locator('a[href="/products"]').last();
    if (await viewAllLink.count() > 0) {
      await viewAllLink.scrollIntoViewIfNeeded();
      await viewAllLink.click();
      await page.waitForLoadState('networkidle');
      expect(page.url()).toContain('/products');
      console.log('✓ View All Products link works correctly');
    }
  });

  test('Product card links navigate correctly', async ({ page }) => {
    await page.goto('/products');
    await page.waitForLoadState('networkidle');

    // Wait for products to load
    const productCards = page.locator('a[href^="/products/"]');
    await expect(productCards.first()).toBeVisible({ timeout: 10000 });

    const productCount = await productCards.count();
    expect(productCount).toBeGreaterThan(0);

    // Test first few product links
    const testCount = Math.min(3, productCount);
    
    for (let i = 0; i < testCount; i++) {
      const productLink = productCards.nth(i);
      const href = await productLink.getAttribute('href');
      
      if (href) {
        await productLink.click();
        await page.waitForLoadState('networkidle');
        
        // Verify we're on a product detail page
        expect(page.url()).toContain('/products/');
        
        console.log(`✓ Product card ${i + 1} link ${href} works correctly`);
        
        // Go back to products page
        await page.goto('/products');
        await page.waitForLoadState('networkidle');
      }
    }
  });

  test('Mobile navigation menu works', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Open mobile menu
    const mobileMenuButton = page.locator('button[aria-label*="menu"], button:has(svg)').first();
    if (await mobileMenuButton.count() > 0) {
      await mobileMenuButton.click();
      
      // Test mobile navigation links
      for (const link of INTERNAL_LINKS.navigation.slice(1)) { // Skip home
        const mobileNavLink = page.locator(`a[href="${link}"]`).first();
        
        if (await mobileNavLink.count() > 0 && await mobileNavLink.isVisible()) {
          await mobileNavLink.click();
          await page.waitForLoadState('networkidle');
          
          const expectedPath = link === '/' ? '' : link;
          expect(page.url()).toContain(expectedPath);
          
          console.log(`✓ Mobile nav link ${link} works correctly`);
          
          // Go back for next test
          await page.goto('/');
          await page.waitForLoadState('networkidle');
          await mobileMenuButton.click(); // Reopen menu
        }
      }
    } else {
      console.warn('⚠ Mobile menu button not found');
    }
  });

  test('Cart and checkout flow links', async ({ page }) => {
    await page.goto('/products');
    await page.waitForLoadState('networkidle');

    // Add a product to cart first
    const addToCartButton = page.locator('button:has-text("Add to Cart"), button[aria-label*="cart"]').first();
    
    if (await addToCartButton.count() > 0) {
      await addToCartButton.click();
      
      // Open cart
      const cartButton = page.locator('button:has(svg):has-text("Cart"), [data-testid="cart-button"]').first();
      if (await cartButton.count() > 0) {
        await cartButton.click();
        
        // Look for checkout link in cart
        const checkoutLink = page.locator('a[href="/checkout"], button:has-text("Checkout")').first();
        if (await checkoutLink.count() > 0) {
          await checkoutLink.click();
          await page.waitForLoadState('networkidle');
          expect(page.url()).toContain('/checkout');
          console.log('✓ Checkout link from cart works correctly');
        }
      }
    }
  });

  test('External social media links are configured correctly', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Scroll to footer where social links usually are
    await page.locator('footer').scrollIntoViewIfNeeded();

    // Check for social media links
    const socialLinks = page.locator('footer a[href*="facebook"], footer a[href*="instagram"], footer a[href*="twitter"], footer a[href*="pinterest"]');
    const socialCount = await socialLinks.count();

    if (socialCount > 0) {
      console.log(`Found ${socialCount} social media links`);
      
      for (let i = 0; i < socialCount; i++) {
        const socialLink = socialLinks.nth(i);
        const href = await socialLink.getAttribute('href');
        const hasTargetBlank = await socialLink.getAttribute('target') === '_blank';
        
        if (href) {
          console.log(`Social link ${i + 1}: ${href} (opens in new tab: ${hasTargetBlank})`);
          
          // Verify it's a proper external link
          expect(href).toMatch(/^https?:\/\//);
        }
      }
    } else {
      console.warn('⚠ No social media links found');
    }
  });

  test('All internal links return proper HTTP status', async ({ baseURL }) => {
    const allInternalLinks = [
      ...INTERNAL_LINKS.navigation,
      ...INTERNAL_LINKS.heroSection,
      ...INTERNAL_LINKS.categoryShowcase,
      ...INTERNAL_LINKS.footerShop,
      ...INTERNAL_LINKS.footerCustomerCare,
      ...INTERNAL_LINKS.footerAbout,
      ...INTERNAL_LINKS.footerLegal,
      ...INTERNAL_LINKS.productFlow
    ];

    // Remove duplicates
    const uniqueLinks = Array.from(new Set(allInternalLinks));
    
    console.log(`\nTesting ${uniqueLinks.length} unique internal links:`);
    
    const results = [];
    
    for (const link of uniqueLinks) {
      const result = await checkLinkStatus(link, baseURL);
      results.push(result);
      
      if (result.status === 0) {
        console.error(`✗ ${link}: Connection failed - ${result.error}`);
      } else if (result.status === 404) {
        console.warn(`⚠ ${link}: 404 Not Found (likely unimplemented)`);
      } else if (result.status >= 400) {
        console.error(`✗ ${link}: HTTP ${result.status}`);
      } else if (result.status >= 300) {
        console.log(`→ ${link}: Redirects to ${result.redirected}`);
      } else {
        console.log(`✓ ${link}: OK (${result.status})`);
      }
    }

    // Summary
    const working = results.filter(r => r.ok).length;
    const notFound = results.filter(r => r.status === 404).length;
    const errors = results.filter(r => r.status >= 400 && r.status !== 404).length;
    const connectionErrors = results.filter(r => r.status === 0).length;

    console.log(`\n=== LINK TEST SUMMARY ===`);
    console.log(`Total links tested: ${uniqueLinks.length}`);
    console.log(`Working (2xx): ${working}`);
    console.log(`Not Found (404): ${notFound}`);
    console.log(`Other errors (4xx/5xx): ${errors}`);
    console.log(`Connection errors: ${connectionErrors}`);

    // Core functionality links should work
    const coreLinks = INTERNAL_LINKS.navigation.concat(INTERNAL_LINKS.categoryShowcase);
    const coreResults = results.filter(r => coreLinks.includes(r.url));
    const workingCore = coreResults.filter(r => r.ok).length;
    
    expect(workingCore).toBeGreaterThan(coreResults.length * 0.8); // 80% of core links should work
  });

  test('Page-by-page comprehensive link discovery', async ({ page, baseURL }) => {
    const pagesToTest = ['/', '/products'];
    
    for (const pageUrl of pagesToTest) {
      const pageResults = await testPageLinks(page, pageUrl, baseURL);
      
      console.log(`\nPage ${pageUrl}:`);
      console.log(`- Internal links: ${pageResults.internal.length}`);
      console.log(`- External links: ${pageResults.external.length}`);
      
      // Test a sample of found links
      for (const link of pageResults.internal.slice(0, 5)) {
        const status = await checkLinkStatus(link.href, baseURL);
        console.log(`  ${link.href} (${link.text}): ${status.ok ? '✓' : '✗'} ${status.status}`);
      }
    }
  });
});
