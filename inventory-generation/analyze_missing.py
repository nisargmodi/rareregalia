import pandas as pd

orig = pd.read_csv('inventory_master_all_batches_ORIGINAL.csv')
gen = pd.read_csv('../inventory_master_all_batches.csv')

b19_orig = orig[orig['batch'] == 'Batch-19']
b19_gen = gen[gen['batch'] == 'Batch-19']

print(f"Original Batch-19: {len(b19_orig)} records")
print(f"Generated Batch-19: {len(b19_gen)} records")
print(f"Difference: {len(b19_orig) - len(b19_gen)} records\n")

# Check if there are different variant combinations
orig_combos = set(b19_orig.apply(lambda x: f"{x['sku_numeric']}-{x['variant_color']}-{x.get('variant_size', 'N/A')}", axis=1))
gen_combos = set(b19_gen.apply(lambda x: f"{x['sku_numeric']}-{x['variant_color']}-{x.get('variant_size', 'N/A')}", axis=1))

missing_combos = orig_combos - gen_combos
extra_combos = gen_combos - orig_combos

if missing_combos:
    print(f"Missing combinations ({len(missing_combos)}):")
    for combo in sorted(missing_combos):
        sku, color, size = combo.split('-')
        print(f"  SKU {sku}, Color: {color}, Size: {size}")
        # Show the original record
        mask = (b19_orig['sku_numeric'] == sku) & (b19_orig['variant_color'] == color)
        if size != 'N/A':
            mask = mask & (b19_orig['variant_size'] == size)
        record = b19_orig[mask].iloc[0] if len(b19_orig[mask]) > 0 else None
        if record is not None:
            print(f"    Product ID: {record['product_id']}, Style: {record['style_no']}")

if extra_combos:
    print(f"\nExtra combinations ({len(extra_combos)}):")
    for combo in sorted(extra_combos):
        sku, color, size = combo.split('-')
        print(f"  SKU {sku}, Color: {color}, Size: {size}")

# Check specific SKUs with size variations
print("\n" + "="*80)
print("SKUs with size variations in original:")
size_skus = b19_orig[b19_orig['variant_size'].notna()]['sku_numeric'].unique()
print(f"Found {len(size_skus)} SKUs with sizes")
for sku in sorted(size_skus)[:5]:
    sku_records = b19_orig[b19_orig['sku_numeric'] == sku]
    sizes = sku_records['variant_size'].unique()
    colors = sku_records['variant_color'].unique()
    print(f"  SKU {sku}: {len(sku_records)} records, Colors: {list(colors)}, Sizes: {list(sizes)}")
