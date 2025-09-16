#!/usr/bin/env python3
"""
Product Export Tool
Creates comprehensive product export with detailed vendor data extraction.
Exports 10 unique products with complete specifications including gold weights,
diamond details, and all technical specifications.
"""

import pandas as pd
import os
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
    
    # Get 10 unique products that have variants
    products_with_variants = products_df[products_df['product_id'].isin(variants_df['product_id'])].head(10)
    
    comprehensive_data = []
    
    for _, product in products_with_variants.iterrows():
        # Get the first variant for this product
        product_variants = variants_df[variants_df['product_id'] == product['product_id']]
        if len(product_variants) == 0:
            continue
            
        variant = product_variants.iloc[0]
        
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
            elif 'making' in spec_name and 'charge' in spec_name:
                making_charges = spec_value
        
        # Get diamond details from diamond_details table (comprehensive)
        variant_diamonds = diamonds_df[diamonds_df['variant_id'] == variant['variant_id']]
        
        # Extract detailed diamond information
        diamond_cuts = "; ".join(variant_diamonds['cut_type'].dropna().astype(str).unique().tolist())
        diamond_sizes = "; ".join(variant_diamonds['size_mm'].dropna().astype(str).unique().tolist())
        diamond_qualities = "; ".join(variant_diamonds['quality_grade'].dropna().astype(str).unique().tolist())
        
        # Sum up diamond counts from diamond_details table
        diamond_count_from_table = variant_diamonds['count'].sum() if len(variant_diamonds) > 0 else 0
        
        # Create detailed diamond breakdown by shape
        diamond_breakdown = []
        if len(variant_diamonds) > 0:
            shape_summary = variant_diamonds.groupby('cut_type').agg({
                'count': 'sum',
                'size_mm': lambda x: ', '.join(x.dropna().astype(str).unique())
            }).reset_index()
            
            for _, shape_row in shape_summary.iterrows():
                diamond_breakdown.append(f"{shape_row['cut_type']}: {shape_row['count']} ({shape_row['size_mm']})")
        
        diamond_shape_details = "; ".join(diamond_breakdown) if diamond_breakdown else ""
        
        # Use the higher count between extracted specs and normalized table data
        final_diamond_count = max(diamond_count_total, diamond_count_from_table)
        
        # If table has more comprehensive data, prefer it
        if diamond_count_from_table > 0:
            final_diamond_count = diamond_count_from_table
        
        # Fill missing gold purity from variant metal_karat if not found in specs
        if not gold_purity_extracted and pd.notna(variant['metal_karat']):
            gold_purity_extracted = variant['metal_karat']
        
        # Intelligent category deduction based on product name
        def deduce_category(product_name, original_category):
            """Deduce product category from name if original is generic, and standardize Necklaces to Pendants"""
            # Special case: Always change "Necklaces" to "Pendants"
            if original_category and original_category.lower() == 'necklaces':
                return 'Pendants'
            
            # For other existing categories, keep them as-is unless they're generic
            if original_category and original_category.lower() not in ['uncategorized', 'other', '']:
                return original_category
            
            name_lower = product_name.lower()
            
            # Earrings patterns
            earring_patterns = ['earring', 'earrings', 'hoop', 'hoops', 'stud', 'studs', 'dangler', 'chandelier', 'drop']
            if any(pattern in name_lower for pattern in earring_patterns):
                return 'Earrings'
            
            # Ring patterns
            ring_patterns = ['ring', 'solitaire', 'engagement', 'wedding', 'band']
            if any(pattern in name_lower for pattern in ring_patterns):
                return 'Rings'
            
            # Bracelet patterns
            bracelet_patterns = ['bracelet', 'tennis', 'bangle', 'chain bracelet']
            if any(pattern in name_lower for pattern in bracelet_patterns):
                return 'Bracelets'
            
            # Necklace patterns
            necklace_patterns = ['necklace', 'chain', 'pendant', 'choker', 'collar']
            if any(pattern in name_lower for pattern in necklace_patterns):
                return 'Pendants'
            
            # Set patterns
            set_patterns = ['set', 'suite', 'collection']
            if any(pattern in name_lower for pattern in set_patterns):
                return 'Jewelry Sets'
            
            return original_category or 'Uncategorized'
        
        # Apply intelligent categorization
        deduced_category = deduce_category(product['product_name'], product['category'])
        
        # Create comprehensive record
        record = {
            # Basic Product Info
            'SKU': variant['sku'],
            'Product_ID': variant['product_id'],
            'Variant_ID': variant['variant_id'],
            'Product_Name': product['product_name'],
            'Variant_Name': variant['variant_name'],
            'Category': deduced_category,
            'Status': variant['status'],
            
            # Metal & Design Info
            'Metal_Type': variant['metal_type'],
            'Metal_Karat': variant['metal_karat'],
            'Size': variant['size'],
            
            # Pricing Info
            'Price_INR': variant['price'],
            'Base_Price': product['base_price'],
            'Featured': product['featured'],
            
            # Gold Details (Enhanced)
            'Gold_Weight_Grams': gold_weight_vendor if gold_weight_vendor else variant['weight_gold'],
            'Gold_Purity': gold_purity_extracted,
            'Gold_Weight_From_Variant': variant['weight_gold'],
            
            # Diamond Details (Enhanced)
            'Diamond_Weight_Carats': diamond_weight_vendor if diamond_weight_vendor else variant['weight_diamond'],
            'Diamond_Weight_From_Variant': variant['weight_diamond'],
            'Diamond_Count_Total': final_diamond_count,
            'Diamond_Count_Other': diamond_count_other,
            'Diamond_Cuts': diamond_cuts,
            'Diamond_Sizes_MM': diamond_sizes,
            'Diamond_Quality_Grades': diamond_qualities,
            'Diamond_Shape_Details': diamond_shape_details,
            
            # Manufacturing Info
            'Making_Charges': making_charges,
            'Stock_Quantity': variant['stock_quantity'],
            
            # Image Info
            'Primary_Image_URL': primary_image,
            'All_Images': all_images,
            'Total_Images': len(variant_images),
            
            # Additional Info
            'Style_Number': style_no,
            'Product_Description': product['product_description'],
            'Created_Date': product['created_date'],
            'Total_Specs_Available': len(variant_specs)
        }
        
        comprehensive_data.append(record)
    
    # Create DataFrame and save
    df = pd.DataFrame(comprehensive_data)
    
    # Save as CSV
    csv_filename = "Product_Export.csv"
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
        for column in ws.columns:
            max_length = 0
            column_letter = column[0].column_letter
            for cell in column:
                try:
                    if len(str(cell.value)) > max_length:
                        max_length = len(str(cell.value))
                except:
                    pass
            adjusted_width = min(max_length + 2, 50)  # Cap at 50 chars
            ws.column_dimensions[column_letter].width = adjusted_width
        
        excel_filename = "Product_Export.xlsx"
        wb.save(excel_filename)
        print(f"✅ Saved Excel file to {excel_filename}")
        
    except ImportError:
        print("⚠️ openpyxl not available, skipping Excel export")
    
    # Display summary
    print(f"\n📊 Export Summary:")
    print(f"Total products exported: {len(df)}")
    print(f"Products with vendor gold weight: {len(df[df['Gold_Weight_Grams'].notna() & (df['Gold_Weight_Grams'] != '')])}")
    print(f"Products with vendor diamond weight: {len(df[df['Diamond_Weight_Carats'].notna() & (df['Diamond_Weight_Carats'] != '')])}")
    print(f"Products with diamond counts: {len(df[df['Diamond_Count_Total'] > 0])}")
    print(f"Products with gold purity data: {len(df[df['Gold_Purity'].notna() & (df['Gold_Purity'] != '')])}")
    
    # Show sample data
    print(f"\n🔍 Sample Records:")
    display_cols = ['SKU', 'Product_Name', 'Gold_Weight_Grams', 'Gold_Purity', 'Diamond_Weight_Carats', 'Diamond_Count_Total']
    print(df[display_cols].head().to_string(index=False))

if __name__ == "__main__":
    main()