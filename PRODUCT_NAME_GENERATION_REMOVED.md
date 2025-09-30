# Product Name Generation Logic Removed

## Date: September 30, 2025

## Change Summary

Removed the automatic product name generation logic that was creating generic names like "Elegant Ring", "Stunning Earrings", etc.

## What Changed

### Before
Products without names in the CSV or database would get **generated generic names**:
- ❌ "Elegant Ring"
- ❌ "Stunning Earrings" 
- ❌ "Diamond Bracelet"
- ❌ "Classic Pendant"

### After
Products without names now get **temporary placeholders with SKU**:
- ✅ "Product 35"
- ✅ "Product 1201"
- ✅ "Product 19006"

This makes it **obvious which products need real names** and prevents generic names from appearing on the website.

## Code Changes

### File: `generate_website_data.py`

**Removed Function**:
```python
def generate_product_name(style_no: str, category: str, sku_numeric: int) -> str:
    # Entire function removed (28 lines)
```

**Updated Logic**:
```python
# OLD
if not product_name:
    product_name = generate_product_name(style_no, category, sku_numeric)

# NEW
if not product_name:
    product_name = f"Product {style_num}"  # Temporary placeholder using SKU
```

## Current Status

After regenerating website data:

| Status | Count | Percentage |
|--------|-------|------------|
| **Real Names** (from CSV or database) | 549 | 61.2% |
| **Placeholder Names** (need names) | 348 | 38.8% |
| **Total Products** | 897 | 100% |

### Sample Products

**With Real Names** (from WooCommerce):
```
0016-W: Eterna Oval
0024-W: Radiant Whisper
0111-W: Celesto Ring
14078-W: Lumière Gold Tennis Bracelet
17026-W: Infinity Grace Dangler Earrings
```

**With Placeholder Names** (awaiting real names):
```
35-Y-1.50: Product 35
1201-W: Product 1201
19006-W: Product 19006
```

## Benefits

### 1. **Clarity**
- Easy to identify which products need names
- Placeholder format "Product [SKU]" is clearly temporary
- No confusion with real product names

### 2. **Quality Control**
- Forces explicit naming decisions
- Prevents generic names from going live
- Clear action items for content team

### 3. **Simpler Code**
- Removed 28 lines of generation logic
- No more category-based name arrays
- Cleaner, more maintainable code

### 4. **Better User Experience**
- Real names from WooCommerce are authentic
- No misleading generic names
- Professional naming across the board

## Next Steps

### To Add Real Names

**Option 1 - Add to Inventory CSV**:
```bash
# Edit inventory_master_all_batches.csv
# Add names to product_name column for missing products
python run.py --website  # Regenerate website data
```

**Option 2 - Add to WooCommerce Database**:
```bash
# Add products to ecommerce_database/products.csv
python run.py --populate  # Populate names from database
python run.py --website   # Regenerate website data
```

**Option 3 - Bulk Update Script**:
Create a CSV with SKU → Name mappings and run a bulk update script.

## Finding Products That Need Names

### List All Placeholder Products:
```bash
cd inventory-generation
python -c "import json; data = json.load(open('../src/data/products.json')); unnamed = [p for p in data if 'Product ' in p['name']]; skus = sorted(set([p['sku'].split('-')[0] for p in unnamed])); print(f'SKUs needing names ({len(skus)} unique):'); print('\n'.join(skus))"
```

This will output unique SKUs like:
```
35
1201
19006
...
```

### Get List from Inventory CSV:
```bash
python -c "import pandas as pd; df = pd.read_csv('../inventory_master_all_batches.csv'); unnamed = df[(df['product_name'].isna()) | (df['product_name'] == '')]; skus = sorted(unnamed['sku_numeric'].unique()); print(f'SKUs needing names: {len(skus)}'); print('\n'.join([str(s) for s in skus]))"
```

## Documentation Updates

- ✅ Updated `inventory-generation/README.md`
- ✅ Changed priority description to show placeholder logic
- ✅ Updated statistics to show 348 products need names
- ✅ Created this summary document

## Verification

Run the check script to verify current state:
```bash
cd inventory-generation
python check_names.py
```

**Expected Output**:
```
Total: 897
With real names: 549 (61.2%)
With placeholder: 348 (38.8%)
```

## Migration Notes

### For Frontend
If the frontend displays product names, it should:
1. Check if name starts with "Product "
2. If yes, show a generic placeholder or hide the name
3. Or filter out products with placeholder names from listings

### For Testing
Placeholder names make it easy to:
- Identify incomplete product data
- Track progress of name population
- Generate reports of missing information

## Timeline

1. ✅ **Removed generic name generation** (September 30, 2025)
2. ⏳ **Awaiting 348 real product names** (TBD)
3. ⏳ **Final regeneration with all names** (After names provided)

---

**Status**: ✅ **COMPLETE**

Generic name generation logic removed. 348 products now have placeholder names "Product [SKU]" and await real product names from the content team.
