# Inventory Master CSV Structure

## Overview
The `inventory_master_all_batches.csv` file is the single source of truth for all product inventory data. It contains 898 product variants across multiple batches with comprehensive details about each item.

## File Location
- **Path**: `d:\rareregalia\inventory_master_all_batches.csv`
- **Total Lines**: 899 (1 header + 898 data rows)
- **Columns**: 55

## Column Descriptions

### Core Identification (Columns 1-6)
1. **batch**: Batch identifier (e.g., "Batch-1", "Batch-13")
2. **style_no**: Vendor style number (e.g., "DOC - SR 0016")
3. **sku_numeric**: Numeric SKU identifier (e.g., "0016")
4. **product_id**: Product variant ID (e.g., "0016-W" for white gold variant)
5. **product_name**: ⭐ **NEW** - Human-readable product name (e.g., "Celesto Ring", "Lumière Gold Tennis Bracelet")
6. **description**: ⭐ **NEW** - Product description text for marketing/display

### Physical Specifications (Columns 7-9)
7. **gold_weight_gms**: Weight of gold in grams
8. **diamond_weight_ct**: Total diamond weight in carats
9. **diamond_type_total**: Total count of diamonds across all types

### Variant Details (Columns 10-17)
10. **variant_color**: Metal color (e.g., "White", "Rose", "Yellow")
11. **variant_size**: Ring/bracelet size if applicable
12. **variant_images**: Pipe-separated list of image file paths
13. **variant_image_count**: Number of images for this variant
14. **variant_videos**: Pipe-separated list of video file paths
15. **variant_video_count**: Number of videos for this variant
16. **variant_total**: Total variants for this style
17. **image_file_count**: Count of physical image files found
18. **video_file_count**: Count of physical video files found

### Diamond Specifications (Columns 19-55)
The CSV supports up to 13 different diamond types per product. Each diamond type has three columns:
- **diamond_typeN**: Type/shape of diamond (e.g., "Round", "Princess", "Baguette")
- **diamond_typeN_count**: Number of diamonds of this type
- **diamond_typeN_dimensions**: Size/dimensions (e.g., "2.5mm", "3.0x2.0mm")

Where N ranges from 1 to 13.

## NEW: Product Name and Description Columns

### Purpose
Added in latest version to make the inventory CSV fully self-contained:
- Previously, product names were either generated algorithmically or looked up from separate `products.csv`
- Now product names and descriptions can be stored directly in the inventory master
- This eliminates dependencies on external files and makes data management simpler

### Usage in generate_website_data.py
The data generation script follows this priority order:

1. **First Priority**: Read from `product_name` column in inventory CSV
2. **Second Priority**: Lookup from `products.csv` based on style number match
3. **Third Priority**: Generate algorithmically using `generate_product_name()` function

```python
# Priority 1: Inventory CSV
if 'product_name' in group.columns and pd.notna(group['product_name'].iloc[0]):
    product_name = str(group['product_name'].iloc[0]).strip()

# Priority 2: Products database
if not product_name and products_df is not None:
    matching_products = products_df[products_df['product_id'].str.contains(f'-{style_num}')]
    if len(matching_products) > 0:
        product_name = matching_products['product_name'].iloc[0]

# Priority 3: Generated fallback
if not product_name:
    product_name = generate_product_name(style_no, category, sku_numeric)
```

### Populating Product Names
To add product names to the CSV:

1. **Manual Entry**: Open CSV in Excel and add names directly
2. **From WooCommerce**: Use the product export and match by style numbers
3. **From Script**: Create a script to lookup and populate from `ecommerce_database/products.csv`

Example row with product name:
```csv
Batch-1,DOC - SR 0016,0016,0016-W,Celesto Ring,"Elegant diamond ring with brilliant cut stones",3.04,1.01,1,White,,vendor-data\Batch-1\0016\0016-Model-White.jpg|...
```

### Description Field
The description field is optional and can be used for:
- Marketing copy
- Product features
- Material details
- Care instructions
- Any additional context needed for the website

## Data Validation

### Required Fields
All rows must have:
- `batch`
- `style_no`
- `sku_numeric`
- `product_id`
- At least one of: `product_name` OR valid `style_no` for generation

### Optional Fields
- `product_name` (will fallback to generation if empty)
- `description` (will be empty string if not provided)
- `variant_size` (will default to "Standard")
- All diamond type fields (can be empty for non-diamond products)

## Image Path Format
Images are stored with vendor-specific paths:
```
vendor-data\Batch-N\XXXX\XXXX-Type-Color.jpg
```

Example:
```
vendor-data\Batch-1\0016\0016-Model-White.jpg
```

These are converted to web paths by `generate_website_data.py`:
```
/images/products/0016/0016-Model-White.jpg
```

## Maintenance Notes

### Adding New Products
1. Add row with all required fields
2. Include `product_name` to avoid generic naming
3. Ensure `variant_images` paths exist in `vendor-data` folder
4. Run `python generate_website_data.py` to regenerate website data

### Updating Existing Products
1. Edit CSV directly (product names, descriptions, specs)
2. Regenerate data: `python generate_website_data.py`
3. Restart website to load new data

### Batch Operations
To update all product names at once, consider creating a Python script:

```python
import pandas as pd

# Load inventory
inventory_df = pd.read_csv('inventory_master_all_batches.csv')

# Load product names from WooCommerce export
products_df = pd.read_csv('ecommerce_database/products.csv')

# Match and update names
for idx, row in inventory_df.iterrows():
    style_num = row['sku_numeric']
    matching = products_df[products_df['product_id'].str.contains(f'-{style_num}')]
    if len(matching) > 0:
        inventory_df.at[idx, 'product_name'] = matching['product_name'].iloc[0]

# Save updated CSV
inventory_df.to_csv('inventory_master_all_batches.csv', index=False)
```

## Version History
- **v1.0** (Initial): 53 columns, names generated or looked up
- **v1.1** (Current): 55 columns, added `product_name` and `description` for self-contained data

## Related Files
- `generate_website_data.py`: Reads this CSV and generates website JSON files
- `ecommerce_database/products.csv`: Fallback source for product names
- `src/data/products.json`: Generated output consumed by website

## Last Updated
2025-01-XX - Added product_name and description columns
