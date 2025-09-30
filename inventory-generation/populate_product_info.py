#!/usr/bin/env python3
"""
Populate Product Names and Descriptions in Inventory Master CSV
Reads from ecommerce_database/products.csv and updates inventory_master_all_batches.csv
"""

import pandas as pd
from pathlib import Path
import re

def extract_style_number(style_no: str) -> str:
    """Extract numeric SKU from style number"""
    if pd.isna(style_no) or not style_no:
        return ""
    
    style_str = str(style_no).strip()
    
    # Try different patterns in order of specificity
    patterns = [
        r'R-?(\d{5})\(',          # Batch-19 format: 'S R-19001(0.50)' -> '19001'
        r'TB-?(\d{4,5})',         # TB prefix: 'TB-14078' or 'TB14078' -> '14078'
        r'ER-?(\d{2,5})',         # ER prefix: 'ER-17001' or 'S ER-35' -> '17001' or '35'
        r'PD-?(\d{2,5})',         # PD prefix
        r'SR-?(\d{2,5})',         # SR prefix  
        r'(\d{4,5})$',            # Numbers at end: 'DOC - SR 0016' -> '0016'
        r'(\d{2,5})',             # Any 2-5 digit number
    ]
    
    for pattern in patterns:
        match = re.search(pattern, style_str)
        if match:
            return match.group(1).lstrip('0') or '0'  # Remove leading zeros but keep '0'
    
    return ""

def clean_html_description(desc: str) -> str:
    """Remove HTML tags from description"""
    if pd.isna(desc) or not desc:
        return ""
    
    # Remove HTML tags
    desc = re.sub(r'<[^>]+>', '', str(desc))
    # Remove extra whitespace
    desc = ' '.join(desc.split())
    return desc.strip()

def populate_product_info():
    """Populate product names and descriptions in inventory master CSV"""
    
    base_dir = Path(__file__).resolve().parent.parent  # Go up to rareregalia root
    inventory_path = base_dir / "inventory_master_all_batches.csv"
    products_path = base_dir / "ecommerce_database" / "products.csv"
    
    print(f"Reading inventory from: {inventory_path}")
    print(f"Reading products from: {products_path}")
    
    # Check if files exist
    if not inventory_path.exists():
        print(f"ERROR: Inventory file not found: {inventory_path}")
        return
    
    if not products_path.exists():
        print(f"ERROR: Products database not found: {products_path}")
        return
    
    # Load data
    print("\nLoading data...")
    inventory_df = pd.read_csv(inventory_path)
    products_df = pd.read_csv(products_path)
    
    print(f"Inventory records: {len(inventory_df)}")
    print(f"Products in database: {len(products_df)}")
    
    # Create a mapping of style numbers to product info
    product_map = {}
    for _, product in products_df.iterrows():
        product_id = str(product['product_id'])
        # Extract style number from product_id (format: "1-0111" -> "111")
        match = re.search(r'-(\d+)', product_id)
        if match:
            style_num = match.group(1).lstrip('0') or '0'
            product_map[style_num] = {
                'name': product['product_name'],
                'description': clean_html_description(product.get('product_description', ''))
            }
    
    print(f"\nBuilt product map with {len(product_map)} entries")
    
    # Update inventory with product names and descriptions
    updates = 0
    for idx, row in inventory_df.iterrows():
        style_no = row['style_no']
        sku_numeric = row['sku_numeric']
        
        # Extract style number from style_no
        style_num = extract_style_number(style_no)
        
        # Also try sku_numeric directly
        if not style_num and pd.notna(sku_numeric):
            style_num = str(sku_numeric).lstrip('0') or '0'
        
        # Look up product info
        if style_num in product_map:
            product_info = product_map[style_num]
            
            # Update only if currently empty or whitespace
            current_name = row.get('product_name', '')
            if pd.isna(current_name) or not str(current_name).strip():
                inventory_df.at[idx, 'product_name'] = product_info['name']
                updates += 1
            
            current_desc = row.get('description', '')
            if pd.isna(current_desc) or not str(current_desc).strip():
                inventory_df.at[idx, 'description'] = product_info['description']
    
    print(f"\nUpdated {updates} records with product information")
    
    # Save updated inventory
    backup_path = inventory_path.with_suffix('.csv.backup')
    print(f"\nCreating backup: {backup_path}")
    inventory_df.to_csv(backup_path, index=False)
    
    print(f"Saving updated inventory: {inventory_path}")
    inventory_df.to_csv(inventory_path, index=False)
    
    print("\n✅ Product information populated successfully!")
    
    # Show sample of updated records
    updated_records = inventory_df[inventory_df['product_name'].notna() & (inventory_df['product_name'] != '')]
    if len(updated_records) > 0:
        print(f"\nSample updated records ({len(updated_records)} total with names):")
        print(updated_records[['sku_numeric', 'product_id', 'product_name']].head(10).to_string(index=False))

if __name__ == "__main__":
    populate_product_info()
