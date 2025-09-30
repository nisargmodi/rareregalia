import pandas as pd

df = pd.read_excel(r'D:\rareregalia\vendor-data\Batch-19\Batch 19 Excel.xlsx')

# Group by SKU and count
sku_counts = df.groupby('SKU Code').size()
print(f'Total unique SKUs: {len(sku_counts)}')
print(f'SKUs with 4 rows: {len(sku_counts[sku_counts == 4])}')
print(f'SKUs with other counts: {len(sku_counts[sku_counts != 4])}')

# Get SKUs that start with SR-19
sr_skus = df[df['SKU Code'].str.startswith('SR-19', na=False)]['SKU Code'].unique()
print(f'\nSKUs starting with SR-19: {len(sr_skus)}')
print(f'First 10: {sorted(sr_skus)[:10]}')

# Check if these match our generated SKUs
orig = pd.read_csv('inventory_master_all_batches_ORIGINAL.csv')
b19_orig = orig[orig['batch'] == 'Batch-19']
orig_skus = b19_orig['sku_numeric'].unique()
print(f'\nOriginal CSV has {len(orig_skus)} unique SKUs')
print(f'First 10: {sorted(orig_skus)[:10]}')
