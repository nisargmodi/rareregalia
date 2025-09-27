#!/usr/bin/env python3
"""
Complete Product Export Tool
Creates comprehensive product export with ALL products, ALL variants, and ALL details.
Exports products with complete specifications including gold weights,
diamond details, and all technical specifications.
"""

import pandas as pd
import os
import sys
from pathlib import Path

def main():
    # Load all database files
    print("Loading database files...")
    products_df = pd.read_csv('ecommerce_database/products.csv')
    variants_df = pd.read_csv('ecommerce_database/product_variants.csv')
    images_df = pd.read_csv('ecommerce_database/product_images.csv')
    specs_df = pd.read_csv('ecommerce_database/technical_specs.csv')
    diamonds_df = pd.read_csv('ecommerce_database/diamond_details.csv')
    
    print(f"Loaded {len(products_df)} products, {len(variants_df)} variants")
    
    # Check if user wants all products
    export_all = False
    limit = 10
    if len(sys.argv) > 1:
        if sys.argv[1].lower() in ['all', 'full', 'complete']:
            export_all = True
            print("Exporting ALL products with ALL variants")
        else:
            try:
                limit = int(sys.argv[1])
                print(f"Exporting {limit} products as requested")
            except ValueError:
                print("Invalid number provided, using default of 10 products")
    
    # Get products to export
    if export_all:
        products_with_variants = products_df[products_df['product_id'].isin(variants_df['product_id'])]
        print(f"Found {len(products_with_variants)} products with variants to export")
    else:
        products_with_variants = products_df[products_df['product_id'].isin(variants_df['product_id'])]
        
        # Always include SKU 0025 if it exists
        sku_0025_product = products_with_variants[products_with_variants['product_id'].str.contains('0025', na=False)]
        if not sku_0025_product.empty:
            # Ensure SKU 0025 is included
            other_products = products_with_variants[~products_with_variants['product_id'].str.contains('0025', na=False)].head(limit-1)
            products_with_variants = pd.concat([sku_0025_product, other_products]).head(limit)
        else:
            products_with_variants = products_with_variants.head(limit)
    
    comprehensive_data = []
    
    for _, product in products_with_variants.iterrows():
        # Get ALL variants for this product
        product_variants = variants_df[variants_df['product_id'] == product['product_id']]
        if len(product_variants) == 0:
            continue
        
        # Process EACH variant separately
        for _, variant in product_variants.iterrows():
            
            # Get images for this variant
            variant_images = images_df[images_df['variant_id'] == variant['variant_id']]
            primary_image = variant_images[variant_images['is_primary'] == 1]['image_url'].iloc[0] if len(variant_images[variant_images['is_primary'] == 1]) > 0 else ""
            all_images = "; ".join(variant_images['image_url'].dropna().astype(str).tolist())
            
            # Get technical specs for this variant
            variant_specs = specs_df[specs_df['variant_id'] == variant['variant_id']]
            
            # Enhanced spec extraction with multiple patterns
            gold_weight_vendor = ""
            diamond_weight_vendor = ""
            making_charges = ""
            diamond_count_total = 0
            diamond_count_other = 0
            gold_purity_extracted = ""
            style_no = ""
            
            # Process all specs for this variant
            for _, spec in variant_specs.iterrows():
                spec_name = str(spec['spec_name']).lower().strip()
                spec_value = str(spec['spec_value']).strip()
                
                # Style number extraction
                if 'style' in spec_name and 'no' in spec_name:
                    style_no = spec_value
                
                # Gold weight patterns (multiple variations)
                elif any(pattern in spec_name for pattern in ['gold wt', 'gold weight', '18kt wt', '14kt wt', '22kt wt']):
                    if 'diamond' not in spec_name:  # Exclude diamond-related gold specs
                        gold_weight_vendor = spec_value
                        # Extract purity from the spec name itself
                        if '18kt' in spec_name or '18k' in spec_name:
                            gold_purity_extracted = "18kt"
                        elif '14kt' in spec_name or '14k' in spec_name:
                            gold_purity_extracted = "14kt"
                        elif '22kt' in spec_name or '22k' in spec_name:
                            gold_purity_extracted = "22kt"
                
                # Diamond weight patterns
                elif any(pattern in spec_name for pattern in ['diamond wt', 'diamond weight']) and 'count' not in spec_name:
                    try:
                        diamond_weight_vendor = float(spec_value)
                    except ValueError:
                        diamond_weight_vendor = spec_value
                
                # Diamond count patterns - be more specific
                elif 'count' in spec_name:
                    try:
                        count_val = float(spec_value)
                        # Check if it's a main diamond count or other count
                        if any(gem in spec_name for gem in ['round', 'cushion', 'oval', 'pear', 'emerald', 'princess', 'marquise', 'heart', 'baguette']):
                            diamond_count_total += count_val
                        elif spec_name == 'count':  # Generic count, likely main diamonds
                            diamond_count_total += count_val
                        else:
                            diamond_count_other += count_val
                    except ValueError:
                        pass
                
                # Making charges
                elif any(pattern in spec_name for pattern in ['making', 'charges', 'labour']):
                    making_charges = spec_value
            
            # Get diamonds for this variant to create detailed summary
            variant_diamonds = diamonds_df[diamonds_df['variant_id'] == variant['variant_id']]
            
            diamond_shapes = []
            diamond_sizes = []
            diamond_cuts = []
            diamond_qualities = []
            diamond_details_summary = []
            
            for _, diamond in variant_diamonds.iterrows():
                if pd.notna(diamond['cut_type']) and diamond['cut_type'] != '':
                    diamond_shapes.append(diamond['cut_type'])
                if pd.notna(diamond['size_mm']) and diamond['size_mm'] != '':
                    diamond_sizes.append(str(diamond['size_mm']))
                if pd.notna(diamond['quality_grade']) and diamond['quality_grade'] != '':
                    diamond_cuts.append(diamond['quality_grade'])
                    diamond_qualities.append(diamond['quality_grade'])
                
                # Create detailed summary for each diamond
                if pd.notna(diamond['cut_type']) and pd.notna(diamond['count']):
                    detail = f"{diamond['cut_type']}: {diamond['count']}"
                    if pd.notna(diamond['size_mm']):
                        detail += f" ({diamond['size_mm']})"
                    diamond_details_summary.append(detail)
            
            # Remove duplicates while preserving order
            diamond_shapes = list(dict.fromkeys(diamond_shapes))
            diamond_sizes = list(dict.fromkeys(diamond_sizes))
            diamond_cuts = list(dict.fromkeys(diamond_cuts))
            diamond_qualities = list(dict.fromkeys(diamond_qualities))
            
            # Create the comprehensive record for this specific variant
            record = {
                'SKU': variant['sku'],
                'Product_ID': product['product_id'],
                'Variant_ID': variant['variant_id'],
                'Product_Name': product['product_name'],
                'Variant_Name': variant['variant_name'],
                'Category': product['category'],
                'Status': product['status'],
                'Metal_Type': variant.get('metal_type', ''),
                'Metal_Karat': variant.get('metal_karat', ''),
                'Size': variant.get('size', ''),
                'Price_INR': variant.get('price', ''),
                'Base_Price': product.get('base_price', ''),
                'Featured': product.get('featured', ''),
                'Stock_Quantity': variant.get('stock_quantity', 0),
                'Gold_Weight_Grams': gold_weight_vendor,
                'Gold_Purity': gold_purity_extracted,
                'Gold_Weight_Vendor': gold_weight_vendor,
                'Diamond_Weight_Carats': diamond_weight_vendor,
                'Diamond_Weight_Vendor': diamond_weight_vendor,
                'Diamond_Count_Total': diamond_count_total,
                'Diamond_Count_Other': diamond_count_other,
                'Diamond_Shapes': ", ".join(diamond_shapes),
                'Diamond_Sizes_MM': ", ".join(diamond_sizes),
                'Diamond_Cuts': ", ".join(diamond_cuts),
                'Diamond_Quality_Grades': ", ".join(diamond_qualities),
                'Diamond_Shape_Details': "; ".join(diamond_details_summary),
                'Making_Charges': making_charges,
                'Primary_Image_URL': primary_image,
                'All_Images': all_images,
                'Total_Images': len(variant_images),
                'Style_Number': style_no,
                'Product_Description': product.get('product_description', ''),
                'Created_Date': product.get('created_date', ''),
                'Total_Specs_Available': len(variant_specs)
            }
            
            comprehensive_data.append(record)
    
    # Create DataFrame and save
    df = pd.DataFrame(comprehensive_data)
    
    # Generate filename based on export type
    if export_all:
        csv_filename = "Complete_Product_Export_All_Variants.csv"
        excel_filename = "Complete_Product_Export_All_Variants.xlsx"
    else:
        csv_filename = "Product_Export_Sample.csv"
        excel_filename = "Product_Export_Sample.xlsx"
    
    # Save as CSV
    df.to_csv(csv_filename, index=False, encoding='utf-8')
    print(f"Saved comprehensive data to {csv_filename}")
    
    # Save as Excel with proper formatting
    try:
        import openpyxl
        from openpyxl.utils.dataframe import dataframe_to_rows
        from openpyxl import Workbook
        
        wb = Workbook()
        ws = wb.active
        ws.title = "Product Details"
        
        # Add data
        for r in dataframe_to_rows(df, index=False, header=True):
            ws.append(r)
        
        # Auto-adjust column widths
        for col in ws.columns:
            max_length = 0
            column = col[0].column_letter
            for cell in col:
                try:
                    if len(str(cell.value)) > max_length:
                        max_length = len(str(cell.value))
                except:
                    pass
            adjusted_width = min(max_length + 2, 50)
            ws.column_dimensions[column].width = adjusted_width
        
        wb.save(excel_filename)
        print(f"✅ Saved Excel file to {excel_filename}")
        
    except ImportError:
        print("⚠️ openpyxl not available, skipping Excel export")
    
    # Print summary statistics
    print(f"\n📊 Export Summary:")
    print(f"Total products exported: {len(df['Product_ID'].unique())}")
    print(f"Total variants exported: {len(df)}")
    
    if not df.empty:
        print(f"Products with vendor gold weight: {len(df[df['Gold_Weight_Grams'].notna() & (df['Gold_Weight_Grams'] != '')])}")
        print(f"Products with vendor diamond weight: {len(df[df['Diamond_Weight_Carats'].notna() & (df['Diamond_Weight_Carats'] != '')])}")
        print(f"Products with diamond counts: {len(df[df['Diamond_Count_Total'] > 0])}")
        print(f"Products with gold purity data: {len(df[df['Gold_Purity'].notna() & (df['Gold_Purity'] != '')])}")
        
        print(f"\n🔍 Sample Records:")
        display_cols = ['SKU', 'Product_Name', 'Metal_Type', 'Gold_Weight_Grams', 'Gold_Purity', 'Diamond_Weight_Carats', 'Diamond_Count_Total']
        sample_df = df[display_cols].head()
        print(sample_df.to_string(index=False, max_cols=7))

if __name__ == "__main__":
    main()