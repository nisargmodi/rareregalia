# Missing Product Images Fix Guide

## Issue Summary
Products 19012-19024 (13 products) are missing their image folders in:
`ecommerce-website/public/images/products/`

This causes:
- 404 errors when loading product pages
- Broken images in product listings
- Server log spam
- Poor user experience
- Potentially contributes to dev server crashes

## Missing Product IDs
```
19012, 19013, 19014, 19015, 19016, 19017, 19018, 19019, 19020, 19021, 19022, 19023, 19024
```

## Solution Options

### Option 1: Check Source Vendor Data
These products are likely from Batch-19. Check if images exist in vendor data:

```bash
cd d:\rareregalia
dir "vendor-data\Batch-19" /s /b
```

If images exist there, run the fix script:
```bash
python fix_image_paths.py
```

### Option 2: Regenerate Website Data
Regenerate all website data which should include copying images:

```bash
cd d:\rareregalia
python generate_website_data.py
```

### Option 3: Check if Products Should Exist
Verify these products are in the product data:

```bash
cd d:\rareregalia\ecommerce-website\src\data
# Check if products.json contains products with IDs 19012-19024
```

If they're not supposed to have images yet, consider:
- Adding placeholder images
- Hiding these products from the listing
- Marking them as "Coming Soon"

### Option 4: Manual Investigation
Check the vendor data for Batch-19:

```bash
cd d:\rareregalia\vendor-data\Batch-19
dir /s
```

Look for image files for products 19012-19024.

## Temporary Fix: Placeholder Images
If you need to proceed with testing before getting real images:

1. Create placeholder folders:
```powershell
cd d:\rareregalia\ecommerce-website\public\images\products
19012..19024 | ForEach-Object { New-Item -ItemType Directory -Force -Path $_ }
```

2. Copy a placeholder image to each folder:
```powershell
# Assuming you have a placeholder image
19012..19024 | ForEach-Object { 
    Copy-Item "path\to\placeholder.jpg" "$_\$_-R1.jpg"
}
```

## Verification After Fix

```bash
cd d:\rareregalia\ecommerce-website\public\images\products
dir | Where-Object { $_.Name -match '^190(1[2-9]|2[0-4])$' }
```

Should show all 13 folders (19012-19024).

## Next Steps After Fixing Images

1. Restart the development server:
```bash
cd d:\rareregalia
start-website.bat
```

2. Verify images load:
```bash
# Check one product
curl http://localhost:3000/images/products/19012/19012-R1.jpg -UseBasicParsing
# Should return 200, not 404
```

3. Re-run E2E tests:
```bash
cd d:\rareregalia\ecommerce-website
npm test
```

## Root Cause Investigation

Check which batch these products belong to:
```bash
cd d:\rareregalia
# Search in inventory or product data
findstr /s "19012 19013 19014" *.csv
```

This will help identify:
- Which batch folder to look in
- Whether the image script missed these
- If they need special handling
