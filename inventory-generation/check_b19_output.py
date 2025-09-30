import pandas as pd

# Read generated CSV
df = pd.read_csv('../inventory_master_all_batches.csv')
b19 = df[df['batch'] == 'Batch-19']

print(f"Batch-19 rows: {len(b19)}")
print(f"Unique SKUs: {b19['sku_numeric'].nunique()}")
print(f"\nFirst 20 product_ids:")
print(b19['product_id'].head(20).tolist())
print(f"\nVariant sizes:")
print(b19['variant_size'].value_counts())
print(f"\nVariant colors:")
print(b19['variant_color'].value_counts())

# Check original
df_orig = pd.read_csv('inventory_master_all_batches_ORIGINAL.csv')
b19_orig = df_orig[df_orig['batch'] == 'Batch-19']
print(f"\n=== ORIGINAL ===")
print(f"Batch-19 rows: {len(b19_orig)}")
print(f"Unique SKUs: {b19_orig['sku_numeric'].nunique()}")
print(f"First 20 product_ids:")
print(b19_orig['product_id'].head(20).tolist())
