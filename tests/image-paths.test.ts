/**
 * Image Path Tests
 * 
 * Tests to ensure:
 * 1. No hardcoded references to non-existent images (main.jpg, etc.)
 * 2. Required placeholder images exist
 * 3. All product images reference actual files from inventory
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const SRC_DIR = path.join(process.cwd(), 'src');
const ECOMMERCE_DIR = path.join(process.cwd(), 'ecommerce-website', 'src');

test.describe('Image Path Validation', () => {
  
  test('placeholder.jpg should exist in public/images/', async () => {
    const placeholderPath = path.join(PUBLIC_DIR, 'images', 'placeholder.jpg');
    const exists = fs.existsSync(placeholderPath);
    
    expect(exists).toBeTruthy();
    if (!exists) {
      console.error('❌ Missing: public/images/placeholder.jpg');
      console.log('This file is required as a fallback for products without images');
    }
  });

  test('no main.jpg references in source code', async () => {
    const filesToCheck = [
      // Components
      path.join(SRC_DIR, 'components', 'products', 'ProductCard.tsx'),
      path.join(SRC_DIR, 'components', 'products', 'ProductGroupCard.tsx'),
      path.join(ECOMMERCE_DIR, 'components', 'products', 'ProductCard.tsx'),
      path.join(ECOMMERCE_DIR, 'components', 'products', 'ProductGroupCard.tsx'),
      // Product detail pages
      path.join(SRC_DIR, 'app', 'products', '[id]', 'page.tsx'),
      path.join(SRC_DIR, 'app', 'products', '[id]', 'ProductDetailClient.tsx'),
      path.join(SRC_DIR, 'app', 'products', '[id]', 'NewProductDetailClient.tsx'),
      path.join(ECOMMERCE_DIR, 'app', 'products', '[id]', 'page.tsx'),
      path.join(ECOMMERCE_DIR, 'app', 'products', '[id]', 'ProductDetailClient.tsx'),
      path.join(ECOMMERCE_DIR, 'app', 'products', '[id]', 'NewProductDetailClient.tsx'),
    ];

    const mainJpgPattern = /\/main\.jpg/;
    let foundIssues: string[] = [];

    for (const filePath of filesToCheck) {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        if (mainJpgPattern.test(content)) {
          foundIssues.push(filePath);
        }
      }
    }

    if (foundIssues.length > 0) {
      console.error('❌ Found main.jpg references in:');
      foundIssues.forEach(file => console.error(`   ${file}`));
    }

    expect(foundIssues).toHaveLength(0);
  });

  test('no style-specific placeholder references', async () => {
    const filesToCheck = [
      path.join(SRC_DIR, 'components', 'products', 'ProductCard.tsx'),
      path.join(ECOMMERCE_DIR, 'components', 'products', 'ProductCard.tsx'),
    ];

    // Pattern like: /images/products/${sku}/placeholder.jpg
    const styleSpecificPattern = /\/images\/products\/\$\{[^}]+\}\/placeholder\.jpg/;
    let foundIssues: string[] = [];

    for (const filePath of filesToCheck) {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        if (styleSpecificPattern.test(content)) {
          foundIssues.push(filePath);
        }
      }
    }

    if (foundIssues.length > 0) {
      console.error('❌ Found style-specific placeholder references in:');
      foundIssues.forEach(file => console.error(`   ${file}`));
      console.log('Should use: /images/placeholder.jpg instead');
    }

    expect(foundIssues).toHaveLength(0);
  });

  test('generate_website_data.py should not create main.jpg fallbacks', async () => {
    const scriptPath = path.join(process.cwd(), 'generate_website_data.py');
    
    if (!fs.existsSync(scriptPath)) {
      console.warn('⚠️ generate_website_data.py not found, skipping');
      return;
    }

    const content = fs.readFileSync(scriptPath, 'utf-8');
    const mainJpgPattern = /main\.jpg/;

    if (mainJpgPattern.test(content)) {
      const lines = content.split('\n');
      const issueLines: string[] = [];
      
      lines.forEach((line, index) => {
        if (line.includes('main.jpg')) {
          issueLines.push(`Line ${index + 1}: ${line.trim()}`);
        }
      });

      if (issueLines.length > 0) {
        console.error('❌ Found main.jpg references in generate_website_data.py:');
        issueLines.forEach(line => console.error(`   ${line}`));
      }

      expect(issueLines).toHaveLength(0);
    }
  });

  test('products.json should not contain main.jpg references', async () => {
    const productsJsonPath = path.join(SRC_DIR, 'data', 'products.json');
    
    if (!fs.existsSync(productsJsonPath)) {
      console.warn('⚠️ products.json not found, skipping');
      return;
    }

    const content = fs.readFileSync(productsJsonPath, 'utf-8');
    const mainJpgPattern = /main\.jpg/;

    expect(mainJpgPattern.test(content)).toBeFalsy();
    
    if (mainJpgPattern.test(content)) {
      console.error('❌ Found main.jpg references in products.json');
      console.log('Run: python generate_website_data.py to regenerate clean data');
    }
  });
});

test.describe('Image Accessibility Tests', () => {
  
  test('placeholder image should be accessible', async ({ page }) => {
    await page.goto('/');
    
    // Try to access placeholder directly
    const response = await page.goto('/images/placeholder.jpg');
    expect(response?.status()).toBe(200);
  });

  test('products page should not trigger 404s for images', async ({ page }) => {
    // Listen for 404 responses
    const failed404s: string[] = [];
    
    page.on('response', response => {
      if (response.status() === 404 && response.url().includes('/images/')) {
        failed404s.push(response.url());
      }
    });

    await page.goto('/products');
    await page.waitForLoadState('networkidle');

    if (failed404s.length > 0) {
      console.error('❌ Found 404 errors for images:');
      failed404s.forEach(url => console.error(`   ${url}`));
    }

    expect(failed404s).toHaveLength(0);
  });

  test('product detail page should not trigger 404s for images', async ({ page }) => {
    const failed404s: string[] = [];
    
    page.on('response', response => {
      if (response.status() === 404 && response.url().includes('/images/')) {
        failed404s.push(response.url());
      }
    });

    // Navigate to a product detail page
    await page.goto('/products');
    await page.waitForLoadState('networkidle');
    
    // Click first product
    const firstProduct = page.locator('[data-testid="product-group-card"]').first();
    if (await firstProduct.count() > 0) {
      await firstProduct.click();
      await page.waitForLoadState('networkidle');
    }

    if (failed404s.length > 0) {
      console.error('❌ Found 404 errors for images on product detail:');
      failed404s.forEach(url => console.error(`   ${url}`));
    }

    expect(failed404s).toHaveLength(0);
  });
});
