#!/usr/bin/env python3
"""
Master Data Join Script
Joins image links from the main WooCommerce export file with SKU/Style data from batch files.
Creates a master file with all relevant product information.
"""

import pandas as pd
import re
import os
from pathlib import Path

def extract_sku_from_image_url(image_url):
    """Extract SKU from image URL"""
    if pd.isna(image_url) or not image_url:
        return None
    
    # Look for patterns like 0111, 14078, 17026, etc. in the URL
    patterns = [
        r'/(\d{4,5})-',  # 4-5 digits followed by hyphen (like 0111-, 14078-, 17026-)
        r'/TB-(\d{4,5})-',  # TB- prefix (like TB-14078-)
        r'/ER-(\d{4,5})-',  # ER- prefix (for earrings)
        r'/(\d{4,5})\.jpg',  # 4-5 digits before .jpg
        r'/(\d{4,5})\.png',  # 4-5 digits before .png
    ]
    
    for pattern in patterns:
        match = re.search(pattern, image_url)
        if match:
            return match.group(1)
    
    return None

def standardize_sku(sku_from_batch):
    """Standardize SKU from batch file to match image patterns"""
    if pd.isna(sku_from_batch) or not sku_from_batch:
        return None
    
    sku_str = str(sku_from_batch).strip()
    
    # Extract numeric part from different formats
    patterns = [
        r'DOC - SR (\d{4})',  # Batch-1 format: DOC - SR 0001
        r'TB-(\d{4,5})',      # Batch-14 format: TB-14001
        r'ER-(\d{4,5})',      # Batch-17 format: ER-17001
        r'(\d{4,5})',         # Pure numeric: 0111, 14078, etc.
    ]
    
    for pattern in patterns:
        match = re.search(pattern, sku_str)
        if match:
            return match.group(1)
    
    return None

def create_sample_master_join():
    """Create a sample master join with 1-2 records"""
    
    print("Creating sample master join...")
    
    # Read main file
    main_file = r'D:\rareregalia\converted_csv_files\kshitij_wc-product-export-29-8-2025.csv'
    main_df = pd.read_csv(main_file)
    
    # Filter main file to get only variable products (parent products with images)
    main_products = main_df[
        (main_df['Type'] == 'variable') & 
        (main_df['Images'].notna()) & 
        (main_df['Images'] != '')
    ].copy()
    
    # Extract SKU from image URLs
    main_products['extracted_sku'] = main_products['Images'].apply(extract_sku_from_image_url)
    
    # Read batch files
    batch_files = [
        {'file': r'D:\rareregalia\converted_csv_files\Batch-1_Batch-1_Excel.csv', 'sku_col': 'Style no'},
        {'file': r'D:\rareregalia\converted_csv_files\Batch-14_Batch-14_Excel.csv', 'sku_col': 'Style no'},
        {'file': r'D:\rareregalia\converted_csv_files\Batch-17_Vol.1_Batch-17_Vol._1.csv', 'sku_col': 'SKU Code'},
    ]
    
    batch_data_list = []
    
    for batch_info in batch_files:
        try:
            batch_df = pd.read_csv(batch_info['file'])
            if batch_info['sku_col'] in batch_df.columns:
                batch_df['batch_source'] = os.path.basename(batch_info['file'])
                batch_df['standardized_sku'] = batch_df[batch_info['sku_col']].apply(standardize_sku)
                batch_df = batch_df[batch_df['standardized_sku'].notna()]
                batch_data_list.append(batch_df)
                print(f"Loaded {len(batch_df)} records from {batch_info['file']}")
        except Exception as e:
            print(f"Error reading {batch_info['file']}: {e}")
    
    # Combine all batch data
    if batch_data_list:
        combined_batch_df = pd.concat(batch_data_list, ignore_index=True)
        print(f"Total batch records: {len(combined_batch_df)}")
    else:
        print("No batch data loaded!")
        return
    
    # Create sample join
    sample_products = main_products[main_products['extracted_sku'].notna()].head(2)
    
    joined_data = []
    
    for idx, main_row in sample_products.iterrows():
        main_sku = main_row['extracted_sku']
        
        # Find matching batch data
        batch_matches = combined_batch_df[combined_batch_df['standardized_sku'] == main_sku]
        
        if not batch_matches.empty:
            for batch_idx, batch_row in batch_matches.iterrows():
                # Create master record - proper SQL-style join with all columns
                master_record = {
                    # Main product data
                    'Product_ID': main_row['ID'],
                    'Product_Name': main_row['Name'],
                    'SKU_Extracted': main_sku,
                    'Main_Image_URL': main_row['Images'],
                    'Product_Description': main_row['Description'],
                    'Regular_Price': main_row['Regular price'],
                    'Categories': main_row['Categories'],
                    'Batch_Source': batch_row['batch_source']
                }
                
                # Add ALL batch data columns with proper prefixes to avoid conflicts
                for col_name, col_value in batch_row.items():
                    if col_name not in ['batch_source', 'standardized_sku']:
                        # Use original column name but clean it up
                        clean_col_name = str(col_name).replace('\n', '_').replace(' ', '_').strip()
                        master_record[f'Batch_{clean_col_name}'] = col_value
                
                joined_data.append(master_record)
        else:
            # No match found
            master_record = {
                'Product_ID': main_row['ID'],
                'Product_Name': main_row['Name'],
                'SKU_Extracted': main_sku,
                'Main_Image_URL': main_row['Images'],
                'Product_Description': main_row['Description'],
                'Regular_Price': main_row['Regular price'],
                'Categories': main_row['Categories'],
                'Batch_Source': 'NO_MATCH_FOUND'
                # Note: No batch columns added for unmatched records
            }
            joined_data.append(master_record)
    
    # Create master DataFrame
    master_df = pd.DataFrame(joined_data)
    
    # Save sample
    output_file = r'D:\rareregalia\converted_csv_files\SAMPLE_Master_Product_Data.csv'
    master_df.to_csv(output_file, index=False)
    
    print(f"\nSample master file created: {output_file}")
    print(f"Records in sample: {len(master_df)}")
    print(f"Columns in master file: {len(master_df.columns)}")
    
    # Display sample with key columns
    print("\n" + "="*100)
    print("SAMPLE MASTER DATA PREVIEW (SQL-STYLE JOIN)")
    print("="*100)
    
    # Show column names
    print(f"\nTotal Columns: {len(master_df.columns)}")
    print("Main Columns:", [col for col in master_df.columns if not col.startswith('Batch_')][:8])
    print("Batch Columns:", [col for col in master_df.columns if col.startswith('Batch_')][:10], "...")
    
    for idx, row in master_df.iterrows():
        print(f"\n{'='*50} Record {idx + 1} {'='*50}")
        print(f"Product ID: {row['Product_ID']}")
        print(f"Product Name: {row['Product_Name']}")
        print(f"Extracted SKU: {row['SKU_Extracted']}")
        print(f"Image URL: {str(row['Main_Image_URL'])[:80]}...")
        print(f"Batch Source: {row['Batch_Source']}")
        print(f"Match Status: {'✓ MATCHED' if row['Batch_Source'] != 'NO_MATCH_FOUND' else '✗ NO MATCH'}")
        
        # Show key batch data if matched
        if row['Batch_Source'] != 'NO_MATCH_FOUND':
            batch_cols = [col for col in master_df.columns if col.startswith('Batch_')]
            print(f"\nKey Batch Data:")
            for col in batch_cols[:8]:  # Show first 8 batch columns
                if pd.notna(row.get(col)):
                    print(f"  {col}: {row[col]}")
            if len(batch_cols) > 8:
                print(f"  ... and {len(batch_cols) - 8} more batch columns")
    
    return master_df

def analyze_data_quality():
    """Analyze data quality issues"""
    
    print("\n" + "="*80)
    print("DATA QUALITY ANALYSIS")
    print("="*80)
    
    # Read main file
    main_file = r'D:\rareregalia\converted_csv_files\kshitij_wc-product-export-29-8-2025.csv'
    main_df = pd.read_csv(main_file)
    
    # Get all unique SKUs from image URLs
    main_products = main_df[
        (main_df['Type'] == 'variable') & 
        (main_df['Images'].notna()) & 
        (main_df['Images'] != '')
    ].copy()
    
    main_products['extracted_sku'] = main_products['Images'].apply(extract_sku_from_image_url)
    main_skus = set(main_products['extracted_sku'].dropna().unique())
    
    print(f"Unique SKUs found in main file: {len(main_skus)}")
    print(f"Sample SKUs: {list(main_skus)[:10]}")
    
    # Get all SKUs from batch files
    batch_files = [
        {'file': r'D:\rareregalia\converted_csv_files\Batch-1_Batch-1_Excel.csv', 'sku_col': 'Style no'},
        {'file': r'D:\rareregalia\converted_csv_files\Batch-14_Batch-14_Excel.csv', 'sku_col': 'Style no'},
        {'file': r'D:\rareregalia\converted_csv_files\Batch-17_Vol.1_Batch-17_Vol._1.csv', 'sku_col': 'SKU Code'},
    ]
    
    all_batch_skus = set()
    
    for batch_info in batch_files:
        try:
            batch_df = pd.read_csv(batch_info['file'])
            if batch_info['sku_col'] in batch_df.columns:
                standardized_skus = batch_df[batch_info['sku_col']].apply(standardize_sku)
                batch_skus = set(standardized_skus.dropna().unique())
                all_batch_skus.update(batch_skus)
                print(f"\nBatch file: {os.path.basename(batch_info['file'])}")
                print(f"  SKUs found: {len(batch_skus)}")
                print(f"  Sample SKUs: {list(batch_skus)[:5]}")
        except Exception as e:
            print(f"Error analyzing {batch_info['file']}: {e}")
    
    print(f"\nTotal unique SKUs in batch files: {len(all_batch_skus)}")
    
    # Find matches and mismatches
    matched_skus = main_skus.intersection(all_batch_skus)
    main_only_skus = main_skus - all_batch_skus
    batch_only_skus = all_batch_skus - main_skus
    
    print(f"\n📊 MATCHING SUMMARY:")
    print(f"  ✓ Matched SKUs: {len(matched_skus)}")
    print(f"  ⚠️  SKUs in main file only: {len(main_only_skus)}")
    print(f"  ⚠️  SKUs in batch files only: {len(batch_only_skus)}")
    
    if main_only_skus:
        print(f"\n🔍 SKUs in main file but not in batch files:")
        print(f"  {list(main_only_skus)[:10]}")
    
    if batch_only_skus:
        print(f"\n🔍 SKUs in batch files but not in main file:")
        print(f"  {list(batch_only_skus)[:10]}")

if __name__ == "__main__":
    # Create sample master join
    master_df = create_sample_master_join()
    
    # Analyze data quality
    analyze_data_quality()