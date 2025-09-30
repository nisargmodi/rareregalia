# Rare Regalia Ecommerce Website - Testing Guide

## Comprehensive Test Cases for Website Functionality

### 🏠 **HOME PAGE TESTS**

#### Navigation Tests
- [ ] Logo click redirects to home page
- [ ] Home navigation link works
- [ ] Products navigation link works  
- [ ] Cart icon is visible and clickable
- [ ] Mobile menu toggle works (responsive)

#### Hero Section Tests
- [ ] Hero image loads correctly
- [ ] Hero title displays
- [ ] Hero description displays
- [ ] "Shop Now" CTA button works and redirects to products

#### Features Section Tests
- [ ] All 6 feature cards display correctly
- [ ] Feature icons load (Heroicons v2)
- [ ] Feature titles and descriptions are readable

#### Product Showcase Tests
- [ ] Featured products section displays
- [ ] Product cards show images from local vendor-data
- [ ] Product prices display correctly
- [ ] Product names display correctly
- [ ] "View All Products" link works

#### Footer Tests
- [ ] Footer displays correctly
- [ ] Social media links work (if any)
- [ ] Company information displays

---

### 🛍️ **PRODUCTS PAGE TESTS**

#### Page Loading Tests
- [ ] Products page loads without errors (GET /products 200)
- [ ] Product grid displays correctly
- [ ] All product images load from local vendor-data paths

#### Product Display Tests
- [ ] Product cards show correct information:
  - [ ] Product image (from vendor-data)
  - [ ] Product name
  - [ ] Product price in INR
  - [ ] Product category
  - [ ] Stock status

#### Filtering Tests
- [ ] Category filters work correctly
- [ ] Metal type filters work correctly
- [ ] Price range sliders function
- [ ] "In Stock Only" filter works
- [ ] "Reset All" filters button works
- [ ] Multiple filter combinations work

#### Search Tests
- [ ] Search functionality works (if implemented)
- [ ] Search results display correctly

#### Pagination/Loading Tests
- [ ] Products load in batches (if pagination implemented)
- [ ] "Load More" works (if implemented)

---

### 🛒 **PRODUCT DETAIL TESTS**

#### Product Detail Page Tests
- [ ] Individual product page loads
- [ ] Product image gallery displays
- [ ] All vendor images load correctly
- [ ] Product information displays:
  - [ ] Name and description
  - [ ] Price
  - [ ] SKU
  - [ ] Metal type and karat
  - [ ] Diamond specifications
  - [ ] Stock status

#### Product Interaction Tests
- [ ] Image gallery navigation works
- [ ] Zoom functionality (if implemented)
- [ ] Add to cart button works
- [ ] Quantity selector works
- [ ] Metal type/karat variants work (if implemented)

---

### 🛒 **CART FUNCTIONALITY TESTS**

#### Cart Operations Tests
- [ ] Add product to cart works
- [ ] Cart icon shows item count
- [ ] Cart sidebar opens/closes
- [ ] Cart displays added products correctly
- [ ] Quantity adjustment in cart works
- [ ] Remove item from cart works
- [ ] Cart total calculation is correct

#### Cart Persistence Tests
- [ ] Cart persists on page refresh
- [ ] Cart persists between sessions (localStorage)

---

### 🔧 **TECHNICAL TESTS**

#### Image Loading Tests
- [ ] All images load from local vendor-data directory
- [ ] No external URL image requests (no https://rareregalia.com/...)
- [ ] Hero image exists and loads
- [ ] Product images display correctly
- [ ] Image paths are correct (/images/products/SKU/...)

#### Performance Tests
- [ ] Home page loads in reasonable time (<5s)
- [ ] Products page loads in reasonable time (<5s)
- [ ] Images load progressively
- [ ] No JavaScript errors in console
- [ ] No 404 errors for resources

#### Responsive Design Tests
- [ ] Mobile view works correctly
- [ ] Tablet view works correctly
- [ ] Desktop view works correctly
- [ ] Navigation adapts to screen size
- [ ] Product grid adapts to screen size

#### Error Handling Tests
- [ ] 404 page displays for invalid routes
- [ ] Error boundaries catch component errors
- [ ] Graceful handling of missing data

---

### 📊 **DATA INTEGRITY TESTS**

#### Product Data Tests
- [ ] All 699 products load correctly
- [ ] Product prices are formatted correctly (₹)
- [ ] Product categories are correct
- [ ] SKU format is consistent
- [ ] Metal types are correctly categorized

#### Image-SKU Mapping Tests
- [ ] Each product SKU maps to correct vendor images
- [ ] Image file naming is consistent
- [ ] All expected image variants exist (R1, R2, R3, etc.)

---

### 🚀 **DEPLOYMENT TESTS**

#### Development Environment Tests
- [ ] `npm run dev` starts without errors
- [ ] Hot reload works for code changes
- [ ] No compilation errors in terminal
- [ ] No TypeScript errors

#### Build Tests
- [ ] `npm run build` completes successfully
- [ ] Production build works
- [ ] All routes accessible in production

---

## 🧪 **AUTOMATED TESTING COMMANDS**

```bash
# Start development server
npm run dev

# Run type checking
npm run type-check

# Build for production
npm run build

# Start production server
npm start
```

---

## 🔍 **MANUAL TESTING CHECKLIST**

### Quick Smoke Test (5 minutes)
1. ✅ Home page loads
2. ✅ Navigate to Products page
3. ✅ Click on a product (if detail page exists)
4. ✅ Add item to cart
5. ✅ Check cart functionality

### Comprehensive Test (30 minutes)
1. Go through all sections above systematically
2. Test on different screen sizes
3. Check browser console for errors
4. Verify all images load from local paths
5. Test all interactive elements

---

## 📝 **ISSUE TRACKING**

### Current Known Issues
- [ ] None (all major issues resolved)

### Recently Fixed
- ✅ Images now load from local vendor-data
- ✅ ProductFilters component errors resolved
- ✅ Heroicons v2 compatibility fixed
- ✅ Hero image 404 error fixed

---

## 🎯 **SUCCESS CRITERIA**

A successful test run should show:
- ✅ All pages load with HTTP 200 status
- ✅ No JavaScript errors in console
- ✅ All images load from local vendor-data
- ✅ All navigation links work
- ✅ Cart functionality works
- ✅ Responsive design works on all devices
- ✅ 699 products display correctly with local images

---

*Last Updated: September 21, 2025*
*Total Products: 699*
*Local Images: 412 products with local vendor images*