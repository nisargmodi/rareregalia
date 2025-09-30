import pandas as pd

df = pd.read_excel(r'D:\rareregalia\vendor-data\Batch-19\Batch 19 Excel.xlsx')

print(f'Total rows in Excel: {len(df)}')
print(f'Unique SKU Codes: {len(df["SKU Code"].unique())}')
print(f'\nSample SKU Code 19001:')
sample = df[df['SKU Code'].str.contains('19001', na=False)]
print(f'Number of rows: {len(sample)}')
print('\nAll Shape values for SKU 19001:')
print(sample['Shape'].tolist())
print('\nAll Diamond Wt values for SKU 19001:')
print(sample['Diamond Wt'].tolist())
