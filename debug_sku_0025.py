#!/usr/bin/env python3
import pandas as pd
import re
import os

def extract_sku_from_image_url(images_str):
    """Extract SKU from image URL."""
    if pd.isna(images_str) or not images_str:
        return None
    
    # Look for patterns like 0025-Render-R1.jpg
    match = re.search(r'/(\d{4})-', str(images_str))
    return match.group(1) if match else None

def standardize_sku(sku_value):
    """Standardize vendor SKUs for matching."""
    if pd.isna(sku_value):
        return None
    
    sku_str = str(sku_value).strip()
    
    # Extract numeric part from patterns like "DOC - 0025", "ER-16003", etc.
    sku_match = re.search(r'(\d{4,})', sku_str)
    if sku_match:
        return sku_match.group(1)
    
    return None

# Debug SKU 0025 specifically
def debug_sku_0025():
    print("🔍 DEBUGGING SKU 0025 ISSUE")
    print("=" * 50)
    
    # Load website data
    website_file = 'converted_csv_files/kshitij_wc-product-export-29-8-2025.csv'
    print(f"Loading website data from: {website_file}")
    
    try:
        website_df = pd.read_csv(website_file)
        # Filter for main products only
        main_products = website_df[website_df['Type'] == 'variable'].copy()
        print(f"Found {len(main_products)} main products in website data")
        
        # Find products with SKU 0025
        products_with_0025 = []
        for idx, product in main_products.iterrows():
            extracted_sku = extract_sku_from_image_url(product['Images'])
            if extracted_sku == '0025':
                products_with_0025.append({
                    'Index': idx,
                    'Name': product['Name'],
                    'Images': product['Images'][:100] + '...' if len(str(product['Images'])) > 100 else product['Images'],
                    'Extracted_SKU': extracted_sku
                })
        
        print(f"\n📋 PRODUCTS WITH EXTRACTED SKU 0025:")
        print(f"Found {len(products_with_0025)} products")
        for i, product in enumerate(products_with_0025):
            print(f"{i+1}. Index {product['Index']}: '{product['Name']}'")
            print(f"   Images: {product['Images']}")
            print(f"   Extracted SKU: {product['Extracted_SKU']}")
            print()
        
        # Now check vendor data
        print("\n📦 VENDOR DATA CHECK:")
        batch_files = [
            {'file': 'converted_csv_files/Batch-1_Batch-1_Excel.csv', 'sku_col': 'Style no'},
        ]
        
        for batch_info in batch_files:
            try:
                batch_df = pd.read_csv(batch_info['file'])
                if batch_info['sku_col'] in batch_df.columns:
                    batch_df['standardized_sku'] = batch_df[batch_info['sku_col']].apply(standardize_sku)
                    sku_0025_records = batch_df[batch_df['standardized_sku'] == '0025']
                    
                    print(f"In {batch_info['file']}:")
                    print(f"  Found {len(sku_0025_records)} records with standardized SKU 0025")
                    if len(sku_0025_records) > 0:
                        for idx, record in sku_0025_records.iterrows():
                            print(f"    {record[batch_info['sku_col']]} -> {record['standardized_sku']}")
                            
            except Exception as e:
                print(f"Error loading {batch_info['file']}: {e}")
        
        # Check the current database 
        print("\n💾 CURRENT DATABASE CHECK:")
        try:
            products_df = pd.read_csv('ecommerce_database/products.csv')
            sku_0025_in_db = products_df[products_df['product_id'].str.contains('0025', na=False)]
            print(f"Found {len(sku_0025_in_db)} products with 0025 in product_id:")
            for idx, product in sku_0025_in_db.iterrows():
                print(f"  {product['product_id']}: '{product['product_name']}'")
        except Exception as e:
            print(f"Error reading database: {e}")
            
    except Exception as e:
        print(f"Error loading website data: {e}")

if __name__ == "__main__":
    debug_sku_0025()