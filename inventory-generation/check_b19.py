import pandas as pd

gen = pd.read_csv('../inventory_master_all_batches.csv')
b19 = gen[gen['batch'] == 'Batch-19']

print('Generated Batch-19 unique sizes:')
print(sorted(b19['variant_size'].unique()))
print(f'\nTotal B19 records: {len(b19)}')
print(f'Unique SKUs: {len(b19["sku_numeric"].unique())}')
print(f'Records per SKU: {len(b19) / len(b19["sku_numeric"].unique()):.1f}')

# Show a sample SKU
sample_sku = b19['sku_numeric'].iloc[0]
sample_records = b19[b19['sku_numeric'] == sample_sku]
print(f'\nSample SKU {sample_sku}:')
print(sample_records[['variant_color', 'variant_size', 'product_id']].to_string(index=False))
