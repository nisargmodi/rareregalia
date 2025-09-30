import pandas as pd

df = pd.read_excel(r'D:\rareregalia\vendor-data\Batch-19\Batch 19 Excel.xlsx')

print('First 20 SKU Code values:')
print(df['SKU Code'].head(20).tolist())

# Check the data type
print(f'\nSKU Code dtype: {df["SKU Code"].dtype}')

# Check for patterns
print(f'\nUnique SKU Codes (first 30):')
print(sorted(df['SKU Code'].unique())[:30])
