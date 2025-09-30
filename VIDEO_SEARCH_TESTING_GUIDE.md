# Video Gallery & Search Testing Guide

## Quick Test Checklist

### ✅ Video Gallery Testing

#### Test 1: Product with Videos
1. **Navigate to:** http://localhost:3001/products
2. **Click on:** Any product (e.g., Product 0016)
3. **Expected Results:**
   - ✅ Gallery shows both images and videos
   - ✅ Videos autoplay with controls
   - ✅ Videos loop continuously
   - ✅ Navigation arrows work for both media types
   - ✅ Media counter shows total items (e.g., "3 / 5 items")

#### Test 2: Metal Type Video Filtering
1. **Select different metal types:** White Gold → Rose Gold → Yellow Gold
2. **Expected Results:**
   - ✅ Videos change based on metal type
   - ✅ White Gold shows `-White.mp4` video
   - ✅ Rose Gold shows `-Rose.mp4` video
   - ✅ Yellow Gold shows `-Yellow.mp4` video

#### Test 3: Video Thumbnails
1. **Scroll to thumbnail grid** at bottom of gallery
2. **Expected Results:**
   - ✅ Video thumbnails show play icon (▶) overlay
   - ✅ Image thumbnails show no play icon
   - ✅ Clicking video thumbnail switches to that video
   - ✅ Clicking image thumbnail switches to that image

#### Test 4: Video Controls
1. **Interact with video player**
2. **Expected Results:**
   - ✅ Play/Pause button works
   - ✅ Volume control works
   - ✅ Fullscreen button works
   - ✅ Video timeline scrubbing works
   - ✅ Video loops when finished

---

### ✅ Search Functionality Testing

#### Test 1: Basic Search
1. **Click search icon** in header (magnifying glass)
2. **Type:** "ring"
3. **Press Enter**
4. **Expected Results:**
   - ✅ Redirects to `/products?search=ring`
   - ✅ Shows filtered products containing "ring"
   - ✅ Search bar closes after submission
   - ✅ Input clears after submission

#### Test 2: Search by Metal Type
1. **Open search bar**
2. **Type:** "gold"
3. **Press Enter**
4. **Expected Results:**
   - ✅ Shows all products with gold metal type
   - ✅ Results include "18kt Gold", "Yellow Gold", etc.

#### Test 3: Search by Category
1. **Open search bar**
2. **Type:** "earring"
3. **Press Enter**
4. **Expected Results:**
   - ✅ Shows all earring category products
   - ✅ Filters work correctly

#### Test 4: Empty Search
1. **Open search bar**
2. **Press Enter** without typing
3. **Expected Results:**
   - ✅ Search bar stays open
   - ✅ No navigation occurs
   - ✅ No errors in console

#### Test 5: Search with Special Characters
1. **Type:** "ring & earring"
2. **Press Enter**
3. **Expected Results:**
   - ✅ Query properly encoded in URL
   - ✅ Search works correctly
   - ✅ No errors

---

## Manual Browser Testing

### Video Products to Test

Products known to have videos (from vendor-data):
- **Product 0016** - Has White, Rose, Yellow videos
- **Product 0024** - Has Rose, White videos
- **Product 0032** - Has videos
- **Product 0045** - Has videos

### Search Terms to Test

Good search terms based on inventory data:
- **"ring"** - Should return ~500+ products
- **"earring"** - Should return ~200+ products
- **"gold"** - Should return most products
- **"diamond"** - Should return products with diamond details
- **"18kt"** - Should return 18kt gold products
- **"white"** - Should return white gold products

---

## Automated Testing (Future)

### Video Gallery Tests
```typescript
// tests/e2e/video-gallery.test.ts
test('should display videos in gallery', async ({ page }) => {
  await page.goto('/products/0016');
  const video = page.locator('video');
  await expect(video).toBeVisible();
  await expect(video).toHaveAttribute('controls');
  await expect(video).toHaveAttribute('autoplay');
});

test('should filter videos by metal type', async ({ page }) => {
  await page.goto('/products/0016');
  await page.click('text=Rose Gold');
  const video = page.locator('video');
  await expect(video).toHaveAttribute('src', /-Rose\.mp4$/);
});

test('should show play icon on video thumbnails', async ({ page }) => {
  await page.goto('/products/0016');
  const playIcon = page.locator('.thumbnail video + svg');
  await expect(playIcon).toBeVisible();
});
```

### Search Tests
```typescript
// tests/e2e/search.test.ts
test('should search and filter products', async ({ page }) => {
  await page.goto('/');
  await page.click('[aria-label="Search"]');
  await page.fill('input[placeholder="Search jewelry..."]', 'ring');
  await page.press('input[placeholder="Search jewelry..."]', 'Enter');
  await expect(page).toHaveURL(/\/products\?search=ring/);
  const products = page.locator('.product-card');
  await expect(products.first()).toBeVisible();
});

test('should clear search input after submission', async ({ page }) => {
  await page.goto('/');
  await page.click('[aria-label="Search"]');
  await page.fill('input[placeholder="Search jewelry..."]', 'test');
  await page.press('input[placeholder="Search jewelry..."]', 'Enter');
  await page.click('[aria-label="Search"]');
  const input = page.locator('input[placeholder="Search jewelry..."]');
  await expect(input).toHaveValue('');
});
```

---

## Known Issues

### Videos
1. **Not all products have videos** - Only 159 out of 897 products (~18%) have video files
2. **Video file sizes** - Some videos may be large and slow to load
3. **No video poster images** - Videos don't have thumbnail/poster images yet

### Search
1. **No autocomplete** - Search doesn't show suggestions as you type
2. **No search history** - Previous searches aren't saved
3. **Case sensitive** - Search is case-insensitive but may need refinement

---

## Performance Considerations

### Video Loading
- Videos autoplay but are muted by default
- Videos use native browser controls
- Consider adding lazy loading for off-screen videos
- Consider video compression for faster loading

### Search
- Search filters 897 products client-side
- Consider debouncing search input
- Consider server-side search for large datasets
- Consider adding search index/cache

---

## Browser Compatibility

Tested on:
- ✅ Chrome 120+ (full support)
- ✅ Firefox 121+ (full support)
- ✅ Safari 17+ (full support)
- ✅ Edge 120+ (full support)

Video formats supported:
- ✅ MP4 (H.264) - Universal support
- ⚠️ WebM - Not used (but supported by most browsers)

---

## Troubleshooting

### Videos Not Playing
1. Check video files exist: `public/videos/products/0016/`
2. Check browser console for 404 errors
3. Verify video format is MP4
4. Check video codec compatibility

### Search Not Working
1. Check browser console for errors
2. Verify products.json is loaded correctly
3. Check URL shows `?search=` parameter
4. Verify ProductsPageClient receives searchQuery prop

### Videos Not Filtered by Metal Type
1. Check video filename format: `0016-White.mp4`
2. Verify metal type selector is working
3. Check console for filtering errors
4. Verify `allVideos` array in product data

---

## Data Verification

### Check Products.json
```bash
# Count products with videos
Select-String -Path "src/data/products.json" -Pattern '"allVideos"' | Measure-Object

# Check video paths
Get-Content "src/data/products.json" | Select-String -Pattern '"allVideos"' -Context 0,3 | Select-Object -First 5
```

### Check Video Files
```bash
# Count video files
Get-ChildItem -Path "public/videos/products" -Filter "*.mp4" -Recurse | Measure-Object

# List videos for a product
Get-ChildItem -Path "public/videos/products/0016" -Filter "*.mp4"
```

---

## Next Steps

### Video Gallery
- [ ] Add video poster images (thumbnails)
- [ ] Implement lazy loading for videos
- [ ] Add video compression pipeline
- [ ] Add fullscreen mode
- [ ] Add zoom/360° view support
- [ ] Record videos for remaining 738 products

### Search
- [ ] Add autocomplete/suggestions
- [ ] Add search history (localStorage)
- [ ] Add search results count
- [ ] Highlight matching terms
- [ ] Add advanced filters (price, availability, etc.)
- [ ] Add "no results" messaging with suggestions

### Testing
- [ ] Add Playwright E2E tests for videos
- [ ] Add Playwright tests for search
- [ ] Add unit tests for video filtering
- [ ] Add performance tests for video loading
- [ ] Add accessibility tests (ARIA labels, keyboard nav)
