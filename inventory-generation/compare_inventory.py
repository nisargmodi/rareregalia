"""Compare generated CSV with the original backup"""
import pandas as pd
from pathlib import Path

# Define paths relative to script location
base_dir = Path(__file__).resolve().parent.parent  # rareregalia root
original_file = Path(__file__).resolve().parent / 'inventory_master_all_batches_ORIGINAL.csv'
generated_file = base_dir / 'inventory_master_all_batches.csv'

# Load both files
original = pd.read_csv(original_file)
generated = pd.read_csv(generated_file)

print("=" * 80)
print("INVENTORY CSV COMPARISON REPORT")
print("=" * 80)

print(f"\nOriginal file: {len(original)} rows")
print(f"Generated file: {len(generated)} rows")
print(f"Difference: {len(original) - len(generated)} rows ({((len(original) - len(generated))/len(original)*100):.1f}%)")

print("\n" + "=" * 80)
print("RECORDS PER BATCH")
print("=" * 80)

orig_by_batch = original.groupby('batch').size().sort_index()
gen_by_batch = generated.groupby('batch').size().sort_index()

comparison_df = pd.DataFrame({
    'Original': orig_by_batch,
    'Generated': gen_by_batch
}).fillna(0).astype(int)
comparison_df['Difference'] = comparison_df['Original'] - comparison_df['Generated']
comparison_df['Match'] = comparison_df['Difference'] == 0

print(comparison_df)

print("\n" + "=" * 80)
print("BATCHES WITH DIFFERENCES")
print("=" * 80)

for batch in comparison_df[comparison_df['Match'] == False].index:
    orig_count = comparison_df.loc[batch, 'Original']
    gen_count = comparison_df.loc[batch, 'Generated']
    diff = orig_count - gen_count
    
    print(f"\n{batch}:")
    print(f"  Original: {orig_count} rows")
    print(f"  Generated: {gen_count} rows")
    print(f"  Missing: {diff} rows")
    
    # Show sample SKUs
    orig_skus = set(original[original['batch'] == batch]['sku_numeric'].unique())
    gen_skus = set(generated[generated['batch'] == batch]['sku_numeric'].unique())
    missing_skus = orig_skus - gen_skus
    extra_skus = gen_skus - orig_skus
    
    if missing_skus:
        print(f"  Missing SKUs ({len(missing_skus)}): {sorted(list(missing_skus))[:10]}")
    if extra_skus:
        print(f"  Extra SKUs ({len(extra_skus)}): {sorted(list(extra_skus))[:10]}")

print("\n" + "=" * 80)
print("SUMMARY")
print("=" * 80)

matching_batches = len(comparison_df[comparison_df['Match'] == True])
total_batches = len(comparison_df)
print(f"Matching batches: {matching_batches}/{total_batches}")
print(f"Coverage: {len(generated)/len(original)*100:.1f}%")

# Check if columns match
if list(original.columns) == list(generated.columns):
    print("Columns: MATCH")
else:
    print("Columns: DIFFERENT")
    print(f"  Original has: {len(original.columns)} columns")
    print(f"  Generated has: {len(generated.columns)} columns")
