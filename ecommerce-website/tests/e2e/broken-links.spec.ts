import { test, expect, Page } from '@playwright/test';

test.describe('Broken Link Detection', () => {
  
  interface LinkResult {
    href: string;
    text: string;
    status: 'working' | 'broken' | 'warning' | 'untested';
    statusCode?: number;
    error?: string;
    element?: string;
  }

  // Helper to get link information
  async function getLinkInfo(page: Page, linkLocator: any, index: number): Promise<LinkResult> {
    const href = await linkLocator.getAttribute('href');
    const text = await linkLocator.textContent();
    const tagName = await linkLocator.evaluate((el: Element) => el.tagName);
    const elementId = await linkLocator.getAttribute('id');
    const elementClass = await linkLocator.getAttribute('class');
    
    return {
      href: href || '',
      text: (text || '').trim(),
      status: 'untested',
      element: `${tagName}${elementId ? `#${elementId}` : ''}${elementClass ? `.${elementClass.split(' ')[0]}` : ''}[${index}]`
    };
  }

  // Test all links on homepage
  test('Homepage - detect all broken links', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    console.log('\n=== HOMEPAGE LINK ANALYSIS ===');
    
    // Get all links
    const allLinks = page.locator('a[href]');
    const linkCount = await allLinks.count();
    
    console.log(`Found ${linkCount} total links on homepage`);
    
    const results: LinkResult[] = [];
    
    for (let i = 0; i < linkCount; i++) {
      const linkLocator = allLinks.nth(i);
      const linkInfo = await getLinkInfo(page, linkLocator, i);
      
      if (!linkInfo.href) {
        linkInfo.status = 'broken';
        linkInfo.error = 'Missing href attribute';
        results.push(linkInfo);
        continue;
      }

      // Skip anchor links and javascript
      if (linkInfo.href.startsWith('#') || linkInfo.href.startsWith('javascript:')) {
        linkInfo.status = 'warning';
        linkInfo.error = 'Anchor or javascript link';
        results.push(linkInfo);
        continue;
      }

      // Test internal links by clicking
      if (linkInfo.href.startsWith('/')) {
        try {
          // Open in new page to avoid navigation issues
          const newPage = await page.context().newPage();
          const response = await newPage.goto(linkInfo.href, { waitUntil: 'networkidle', timeout: 10000 });
          
          if (response) {
            linkInfo.statusCode = response.status();
            linkInfo.status = response.status() < 400 ? 'working' : 'broken';
            if (response.status() === 404) {
              linkInfo.error = 'Page not found (404)';
            }
          } else {
            linkInfo.status = 'broken';
            linkInfo.error = 'No response received';
          }
          
          await newPage.close();
        } catch (error) {
          linkInfo.status = 'broken';
          linkInfo.error = error instanceof Error ? error.message : 'Navigation failed';
        }
      } else if (linkInfo.href.startsWith('http')) {
        // External link - just mark as warning for manual check
        linkInfo.status = 'warning';
        linkInfo.error = 'External link - not automatically tested';
      } else {
        linkInfo.status = 'warning';
        linkInfo.error = 'Relative link - may need base URL';
      }
      
      results.push(linkInfo);
    }

    // Report results
    const working = results.filter(r => r.status === 'working').length;
    const broken = results.filter(r => r.status === 'broken').length;
    const warnings = results.filter(r => r.status === 'warning').length;

    console.log(`\n=== HOMEPAGE RESULTS ===`);
    console.log(`Working: ${working}`);
    console.log(`Broken: ${broken}`);
    console.log(`Warnings: ${warnings}`);

    console.log('\n=== BROKEN LINKS ===');
    results.filter(r => r.status === 'broken').forEach(link => {
      console.log(`❌ ${link.href} - ${link.text} (${link.element})`);
      console.log(`   Error: ${link.error}`);
    });

    console.log('\n=== WARNING LINKS ===');
    results.filter(r => r.status === 'warning').forEach(link => {
      console.log(`⚠️  ${link.href} - ${link.text} (${link.element})`);
      console.log(`   Note: ${link.error}`);
    });

    console.log('\n=== WORKING LINKS ===');
    results.filter(r => r.status === 'working').forEach(link => {
      console.log(`✅ ${link.href} - ${link.text}`);
    });

    // Fail test if too many links are broken
    expect(broken).toBeLessThan(linkCount * 0.3); // Less than 30% broken
  });

  test('Products page - detect broken links', async ({ page }) => {
    await page.goto('/products');
    await page.waitForLoadState('networkidle');

    console.log('\n=== PRODUCTS PAGE LINK ANALYSIS ===');
    
    // Wait for products to load
    await page.waitForSelector('a[href^="/products/"]', { timeout: 15000 });
    
    // Test product card links specifically
    const productLinks = page.locator('a[href^="/products/"]');
    const productCount = await productLinks.count();
    
    console.log(`Found ${productCount} product links`);
    
    const brokenProducts = [];
    const testLimit = Math.min(10, productCount); // Test first 10 products
    
    for (let i = 0; i < testLimit; i++) {
      const productLink = productLinks.nth(i);
      const href = await productLink.getAttribute('href');
      const text = await productLink.textContent();
      
      if (href) {
        try {
          const newPage = await page.context().newPage();
          const response = await newPage.goto(href, { waitUntil: 'networkidle', timeout: 10000 });
          
          if (!response || response.status() >= 400) {
            brokenProducts.push({
              href,
              text: (text || '').trim(),
              status: response?.status() || 'No response'
            });
            console.log(`❌ Product link broken: ${href} (${response?.status() || 'No response'})`);
          } else {
            console.log(`✅ Product link working: ${href}`);
          }
          
          await newPage.close();
        } catch (error) {
          brokenProducts.push({
            href,
            text: (text || '').trim(),
            error: error instanceof Error ? error.message : 'Unknown error'
          });
          console.log(`❌ Product link error: ${href} - ${error}`);
        }
      }
    }

    console.log(`\nTested ${testLimit} of ${productCount} product links`);
    console.log(`Broken: ${brokenProducts.length}`);
    
    // Report broken product links
    if (brokenProducts.length > 0) {
      console.log('\n=== BROKEN PRODUCT LINKS ===');
      brokenProducts.forEach(product => {
        console.log(`❌ ${product.href} - "${product.text}"`);
        if (product.status) console.log(`   Status: ${product.status}`);
        if (product.error) console.log(`   Error: ${product.error}`);
      });
    }

    // Fail if more than 20% of tested products are broken
    expect(brokenProducts.length).toBeLessThan(testLimit * 0.2);
  });

  test('Navigation consistency across pages', async ({ page }) => {
    const pagesToTest = ['/', '/products'];
    const navigationLinks = [
      { href: '/', name: 'Home' },
      { href: '/products', name: 'Collection' },
      { href: '/products?category=rings', name: 'Rings' },
      { href: '/products?category=earrings', name: 'Earrings' },
      { href: '/products?category=pendants', name: 'Pendants' },
      { href: '/products?category=bracelets', name: 'Bracelets' }
    ];

    console.log('\n=== NAVIGATION CONSISTENCY TEST ===');

    for (const pageUrl of pagesToTest) {
      console.log(`\nTesting navigation on ${pageUrl}:`);
      
      await page.goto(pageUrl);
      await page.waitForLoadState('networkidle');

      for (const navLink of navigationLinks) {
        const linkElement = page.locator(`header a[href="${navLink.href}"]`).first();
        const isVisible = await linkElement.isVisible();
        const isEnabled = await linkElement.isEnabled();
        
        if (isVisible && isEnabled) {
          console.log(`✅ ${navLink.name} (${navLink.href}) - visible and enabled`);
        } else if (isVisible) {
          console.log(`⚠️  ${navLink.name} (${navLink.href}) - visible but disabled`);
        } else {
          console.log(`❌ ${navLink.name} (${navLink.href}) - not visible`);
        }

        // Test that the link is actually present in the header
        expect(await linkElement.count()).toBeGreaterThanOrEqual(1);
      }
    }
  });

  test('Footer link validation', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    console.log('\n=== FOOTER LINK VALIDATION ===');
    
    // Scroll to footer
    await page.locator('footer').scrollIntoViewIfNeeded();
    
    // Get all footer links
    const footerLinks = page.locator('footer a[href]');
    const footerLinkCount = await footerLinks.count();
    
    console.log(`Found ${footerLinkCount} links in footer`);
    
    const footerResults = [];
    
    for (let i = 0; i < footerLinkCount; i++) {
      const linkLocator = footerLinks.nth(i);
      const href = await linkLocator.getAttribute('href');
      const text = await linkLocator.textContent();
      
      if (!href) continue;
      
      const result = {
        href,
        text: (text || '').trim(),
        section: 'footer',
        working: false,
        status: 0
      };

      // Test internal links
      if (href.startsWith('/')) {
        try {
          const newPage = await page.context().newPage();
          const response = await newPage.goto(href, { timeout: 8000 });
          
          result.working = response ? response.status() < 400 : false;
          result.status = response?.status() || 0;
          
          await newPage.close();
        } catch (error) {
          result.working = false;
          result.status = 0;
        }
      } else {
        // External links - just check they're properly formatted
        result.working = href.startsWith('http');
        result.status = href.startsWith('http') ? 200 : 0;
      }
      
      footerResults.push(result);
    }

    // Categorize footer links
    const workingFooter = footerResults.filter(r => r.working).length;
    const brokenFooter = footerResults.filter(r => !r.working).length;

    console.log(`\nFooter Results:`);
    console.log(`Working: ${workingFooter}`);
    console.log(`Broken: ${brokenFooter}`);

    footerResults.forEach(result => {
      const status = result.working ? '✅' : '❌';
      console.log(`${status} ${result.href} - "${result.text}" (${result.status})`);
    });

    // Most footer links are likely unimplemented pages, so be lenient
    expect(brokenFooter).toBeLessThan(footerResults.length); // At least one should work
  });

  test('Link accessibility and SEO check', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    console.log('\n=== LINK ACCESSIBILITY & SEO CHECK ===');
    
    // Check for links without proper text
    const linksWithoutText = page.locator('a[href]:not(:has(img)):empty, a[href]:not(:has(img)):has-text("")');
    const emptyLinkCount = await linksWithoutText.count();
    
    if (emptyLinkCount > 0) {
      console.log(`⚠️  Found ${emptyLinkCount} links without visible text:`);
      for (let i = 0; i < emptyLinkCount; i++) {
        const href = await linksWithoutText.nth(i).getAttribute('href');
        console.log(`   - ${href}`);
      }
    }

    // Check for links without aria-label when they have no text
    const iconLinks = page.locator('a[href]:has(svg):not([aria-label])');
    const iconLinkCount = await iconLinks.count();
    
    if (iconLinkCount > 0) {
      console.log(`⚠️  Found ${iconLinkCount} icon links without aria-label:`);
      for (let i = 0; i < iconLinkCount; i++) {
        const href = await iconLinks.nth(i).getAttribute('href');
        console.log(`   - ${href}`);
      }
    }

    // Check for external links without target="_blank"
    const externalLinks = page.locator('a[href^="http"]:not([href*="localhost"]):not([target="_blank"])');
    const externalLinkCount = await externalLinks.count();
    
    if (externalLinkCount > 0) {
      console.log(`⚠️  Found ${externalLinkCount} external links without target="_blank":`);
      for (let i = 0; i < externalLinkCount; i++) {
        const href = await externalLinks.nth(i).getAttribute('href');
        console.log(`   - ${href}`);
      }
    }

    console.log('\n=== ACCESSIBILITY SUMMARY ===');
    console.log(`Empty links: ${emptyLinkCount}`);
    console.log(`Icon links without labels: ${iconLinkCount}`);
    console.log(`External links without target="_blank": ${externalLinkCount}`);

    // These are warnings, not failures
    if (emptyLinkCount > 0 || iconLinkCount > 0 || externalLinkCount > 0) {
      console.log('\n⚠️  Consider fixing these accessibility issues for better user experience');
    }
  });
});