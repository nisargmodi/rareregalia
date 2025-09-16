#!/usr/bin/env python3
"""
Batch File Column Analysis Script
Analyzes the column structure of all batch files to understand data schema differences.
"""

import pandas as pd
import os
from pathlib import Path

def analyze_batch_file_columns():
    """Analyze column structures across all batch files"""
    
    batch_files_dir = Path(r'd:\rareregalia\converted_csv_files')
    
    # Find all batch CSV files
    batch_files = list(batch_files_dir.glob('Batch-*_*.csv'))
    
    print(f"Found {len(batch_files)} batch files to analyze:")
    print("="*80)
    
    file_columns = {}
    
    for batch_file in sorted(batch_files):
        try:
            df = pd.read_csv(batch_file)
            columns = list(df.columns)
            file_columns[batch_file.name] = columns
            
            print(f"\n📁 {batch_file.name}")
            print(f"   Columns: {len(columns)}")
            print(f"   Sample columns: {columns[:5]}...")
            if len(columns) > 5:
                print(f"   ... and {len(columns) - 5} more")
                
        except Exception as e:
            print(f"\n❌ Error reading {batch_file.name}: {e}")
    
    # Find common and unique columns
    print("\n" + "="*80)
    print("COLUMN STRUCTURE ANALYSIS")
    print("="*80)
    
    all_columns = set()
    for cols in file_columns.values():
        all_columns.update(cols)
    
    print(f"\nTotal unique columns across all files: {len(all_columns)}")
    
    # Check for common patterns
    common_patterns = {
        'Style/SKU': ['Style no', 'SKU Code'],
        'Gold Weight': [col for col in all_columns if 'Gold' in str(col) and 'wt' in str(col)],
        'Diamond Weight': [col for col in all_columns if 'Diamond' in str(col) and ('wt' in str(col) or 'Wt' in str(col))],
        'Count/Quantity': [col for col in all_columns if 'Count' in str(col)],
        'Dimensions': [col for col in all_columns if any(dim in str(col) for dim in ['mm', 'length', 'width', 'height'])]
    }
    
    print(f"\n🔍 COLUMN PATTERNS:")
    for pattern_name, pattern_cols in common_patterns.items():
        if pattern_cols:
            print(f"\n{pattern_name} ({len(pattern_cols)} columns):")
            for col in sorted(pattern_cols)[:10]:  # Show first 10
                print(f"  - {col}")
            if len(pattern_cols) > 10:
                print(f"  ... and {len(pattern_cols) - 10} more")
    
    # Compare specific files
    print(f"\n" + "="*80)
    print("FILE-BY-FILE COMPARISON")
    print("="*80)
    
    for filename, columns in file_columns.items():
        print(f"\n📋 {filename}")
        print(f"   Total columns: {len(columns)}")
        
        # Identify SKU column
        sku_col = None
        if 'Style no' in columns:
            sku_col = 'Style no'
        elif 'SKU Code' in columns:
            sku_col = 'SKU Code'
        
        if sku_col:
            print(f"   SKU Column: '{sku_col}'")
        else:
            print(f"   ⚠️  No standard SKU column found!")
        
        # Show all columns for detailed comparison
        print(f"   All columns:")
        for i, col in enumerate(columns, 1):
            print(f"     {i:2d}. {col}")
    
    return file_columns

if __name__ == "__main__":
    file_columns = analyze_batch_file_columns()