# Rare Regalia Documentation

This directory contains comprehensive documentation for the Rare Regalia ecommerce project.

## Directory Structure

```
docs/
├── README.md                    # This file - documentation index
├── testing/                     # Testing documentation and reports
│   └── TEST_RESULTS_SUMMARY_20250929.md
└── maintenance/                 # Maintenance guides and procedures
    └── MISSING_IMAGES_FIX_GUIDE.md
```

## Testing Documentation

### Latest Test Results
**File:** `testing/TEST_RESULTS_SUMMARY_20250929.md`  
**Date:** September 29, 2025  
**Summary:** Comprehensive test execution results including:
- Python tests (inventory generation, website data)
- TypeScript type checking
- Next.js build verification
- Playwright E2E tests
- Issues found and fixes applied

**Key Findings:**
- ✅ Core functionality working (TypeScript, builds, data generation)
- ✅ Fixed missing product images for products 19012-19024
- ⚠️ Server stability issues under load testing
- 📋 Accessibility improvements needed

## Maintenance Documentation

### Image Management
**File:** `maintenance/MISSING_IMAGES_FIX_GUIDE.md`  
**Purpose:** Step-by-step guide for resolving missing product images  
**Use Case:** When products show 404 errors for images

**Quick Fix Commands:**
```bash
# Check for missing images
python -c "import os; products = os.listdir('ecommerce-website/public/images/products'); missing = [str(i) for i in range(19012, 19025) if str(i) not in products]; print('Missing:', missing)"

# Fix using existing script
python fix_image_paths.py

# Regenerate all website data
python generate_website_data.py
```

## Project Scripts Reference

### Data Generation Scripts
- `generate_website_data.py` - Main website data generator from inventory
- `fix_image_paths.py` - Copies vendor images to website structure
- `process_ecommerce_data.py` - Processes ecommerce database files
- `inventory-generation/generate_inventory_master.py` - Creates master inventory

### Test Scripts
- `test_website.py` - Website functionality tests (requires dev server)
- `inventory-generation/test_inventory_gen.py` - Inventory generation tests
- `ecommerce-website/npm test` - Playwright E2E tests

### Development Scripts
- `start-website.bat` - Starts Next.js development server
- `ecommerce-website/npm run build` - Production build
- `ecommerce-website/npm run dev` - Development server

## Common Maintenance Tasks

### 1. Regenerate Website Data
When inventory changes or new products are added:
```bash
cd d:\rareregalia
python generate_website_data.py
```

### 2. Fix Missing Images
When products show broken images:
```bash
cd d:\rareregalia
python fix_image_paths.py
# Check maintenance/MISSING_IMAGES_FIX_GUIDE.md for details
```

### 3. Run Full Test Suite
Before deployment or after major changes:
```bash
# Python tests
python test_website.py
python inventory-generation/test_inventory_gen.py

# TypeScript and build
cd ecommerce-website
npm run type-check
npm run build

# E2E tests (requires server running)
npm run dev  # In separate terminal
npm test
```

### 4. Check for TypeScript Errors
```bash
cd ecommerce-website
npm run type-check
```

### 5. Production Deployment
```bash
cd ecommerce-website
npm run build
npm start  # Production server
```

## Troubleshooting

### Common Issues

1. **Missing Product Images (404 errors)**
   - See: `maintenance/MISSING_IMAGES_FIX_GUIDE.md`
   - Run: `python fix_image_paths.py`

2. **TypeScript Errors**
   - Check: `src/types/index.ts` for interface definitions
   - Run: `npm run type-check`

3. **Build Failures**
   - Check: TypeScript errors first
   - Verify: All required files exist in `src/data/`

4. **E2E Test Failures**
   - Ensure: Development server is running
   - Check: No missing images (causes cascade failures)
   - Consider: Using production build for stability

5. **Server Crashes During Tests**
   - Use: Production build instead of dev server
   - Run: Tests in smaller batches
   - Increase: Node.js memory limit

## File Locations

### Key Configuration Files
- `ecommerce-website/src/types/index.ts` - TypeScript interfaces
- `ecommerce-website/src/data/goldPricing.json` - Gold pricing configuration
- `ecommerce-website/src/data/products.json` - Main product data
- `inventory_master_all_batches.csv` - Master inventory file

### Data Sources
- `vendor-data/Batch-*/` - Original vendor images and data
- `ecommerce_database/*.csv` - Processed ecommerce data
- `converted_csv_files/*.csv` - Converted batch data

### Generated Files
- `ecommerce-website/src/data/products.json` - Website product data
- `ecommerce-website/src/data/categories.json` - Product categories
- `ecommerce-website/src/data/stats.json` - Website statistics

## Version History

- **2025-09-29:** Initial comprehensive testing and documentation
  - Fixed TypeScript errors
  - Resolved missing images issue
  - Created testing framework
  - Established documentation structure

## Contacts and References

- **Repository:** https://github.com/nisargmodi/rareregalia
- **Branch:** master
- **Last Updated:** September 29, 2025
- **Maintainer:** Development Team

For technical issues, refer to the specific documentation files in this directory or the main project README.md.