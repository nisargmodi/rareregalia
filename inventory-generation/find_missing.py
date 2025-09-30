import pandas as pd

orig = pd.read_csv('inventory_master_all_batches_ORIGINAL.csv')
gen = pd.read_csv('../inventory_master_all_batches.csv')

b19_orig = orig[orig['batch'] == 'Batch-19']
b19_gen = gen[gen['batch'] == 'Batch-19']

orig_skus = set(b19_orig['sku_numeric'].unique())
gen_skus = set(b19_gen['sku_numeric'].unique())

missing = sorted(orig_skus - gen_skus)
print('Missing SKUs:', missing)

print('\nOriginal records for missing SKUs:')
for sku in missing:
    records = b19_orig[b19_orig['sku_numeric'] == sku]
    print(f"\nSKU {sku}:")
    print(records[['style_no', 'sku_numeric', 'variant_color', 'variant_size']].to_string(index=False))
    
    # Check the complete variant details
    print("\nFull details:")
    for idx, row in records.iterrows():
        print(f"  Color: {row['variant_color']}, Size: {row['variant_size']}, Product ID: {row['product_id']}")
