import { test, expect } from '@playwright/test';

test.describe('Test Navigation Page', () => {
  
  test('Isolated navigation test', async ({ page }) => {
    console.log('🔍 Testing isolated navigation page...');
    
    // Go to test page
    await page.goto('/test-navigation');
    await page.waitForLoadState('networkidle');
    console.log('✅ Test navigation page loaded');
    
    // Test simple link
    console.log('🖱️ Clicking Products link...');
    const productsLink = page.locator('a:has-text("Link to Products Page")');
    await productsLink.click();
    await page.waitForLoadState('networkidle');
    
    const urlAfterClick = page.url();
    console.log(`URL after products link click: ${urlAfterClick}`);
    
    const success = urlAfterClick.includes('/products');
    console.log(`Navigation to products successful: ${success}`);
    
    // Go back to test page
    await page.goto('/test-navigation');
    await page.waitForLoadState('networkidle');
    
    // Test button style link
    console.log('🖱️ Clicking Products button...');
    const productsButton = page.locator('a:has-text("Products Button")');
    await productsButton.click();
    await page.waitForLoadState('networkidle');
    
    const urlAfterButton = page.url();
    console.log(`URL after products button click: ${urlAfterButton}`);
    
    const buttonSuccess = urlAfterButton.includes('/products');
    console.log(`Button navigation to products successful: ${buttonSuccess}`);
    
    // Go back to test page
    await page.goto('/test-navigation');
    await page.waitForLoadState('networkidle');
    
    // Test router.push button
    console.log('🖱️ Clicking Router Push button...');
    const routerPushButton = page.locator('button:has-text("Router Push to Products")');
    await routerPushButton.click();
    await page.waitForLoadState('networkidle');
    
    const urlAfterRouterPush = page.url();
    console.log(`URL after router push: ${urlAfterRouterPush}`);
    
    const routerSuccess = urlAfterRouterPush.includes('/products');
    console.log(`Router push navigation successful: ${routerSuccess}`);
    
    // Go back to test page
    await page.goto('/test-navigation');
    await page.waitForLoadState('networkidle');
    
    // Test window.location
    console.log('🖱️ Clicking Window Location button...');
    const windowLocationButton = page.locator('button:has-text("Window Location Change")');
    await windowLocationButton.click();
    await page.waitForLoadState('networkidle');
    
    const urlAfterWindowLocation = page.url();
    console.log(`URL after window location: ${urlAfterWindowLocation}`);
    
    const windowSuccess = urlAfterWindowLocation.includes('/products');
    console.log(`Window location navigation successful: ${windowSuccess}`);
  });
  
});