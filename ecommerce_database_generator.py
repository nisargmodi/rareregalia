#!/usr/bin/env python3
"""
E-Commerce Database Generator
Creates an optimal database structure for jewelry e-commerce website
with support for product variations, dynamic images, and technical specifications.
"""

import pandas as pd
import re
import os
import json
from pathlib import Path
from urllib.parse import urlparse

def deduce_category(product_name, original_category, vendor_file_info=None):
    """Deduce product category from name if original is generic, and standardize Necklaces to Pendants"""
    # Special case: Always change "Necklaces" to "Pendants"
    if original_category and original_category.lower() == 'necklaces':
        return 'Pendants'
    
    # Check vendor file for category hints
    if vendor_file_info:
        vendor_file_lower = vendor_file_info.lower()
        # If vendor file contains earring-related terms, categorize as Earrings
        if any(term in vendor_file_lower for term in ['earring', 'solitaire_earring', 'hoop', 'stud']):
            return 'Earrings'
        # If vendor file contains bracelet-related terms
        elif any(term in vendor_file_lower for term in ['bracelet', 'tennis', 'bangle']):
            return 'Bracelets'
        # If vendor file contains pendant/necklace-related terms
        elif any(term in vendor_file_lower for term in ['pendant', 'necklace', 'chain']):
            return 'Pendants'
        # If vendor file contains ring-related terms
        elif any(term in vendor_file_lower for term in ['ring', 'band']):
            return 'Rings'
    
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
    
    # Necklace patterns - NOW RETURNS "Pendants"
    necklace_patterns = ['necklace', 'chain', 'pendant', 'choker', 'collar']
    if any(pattern in name_lower for pattern in necklace_patterns):
        return 'Pendants'
    
    # Set patterns
    set_patterns = ['set', 'suite', 'collection']
    if any(pattern in name_lower for pattern in set_patterns):
        return 'Jewelry Sets'
    
    return original_category or 'Uncategorized'

def design_ecommerce_database():
    """Design and create optimal e-commerce database structure"""
    
    print("DESIGNING E-COMMERCE DATABASE STRUCTURE")
    print("="*80)
    
    # Database schema design
    schema = {
        "products": {
            "description": "Main product catalog - one record per product family",
            "columns": [
                "product_id", "product_name", "product_description", "category", 
                "subcategory", "base_price", "featured", "status", "created_date"
            ]
        },
        "product_variants": {
            "description": "Product variations (gold type, size, etc.) - multiple per product",
            "columns": [
                "variant_id", "product_id", "sku", "variant_name", "metal_type", 
                "metal_karat", "size", "price", "weight_gold", "weight_diamond", 
                "stock_quantity", "status"
            ]
        },
        "product_images": {
            "description": "Images linked to specific variants",
            "columns": [
                "image_id", "variant_id", "image_url", "image_type", 
                "is_primary", "alt_text", "sort_order"
            ]
        },
        "technical_specs": {
            "description": "Detailed technical specifications per variant",
            "columns": [
                "spec_id", "variant_id", "spec_type", "spec_name", 
                "spec_value", "unit_of_measure"
            ]
        },
        "diamond_details": {
            "description": "Diamond specifications per variant",
            "columns": [
                "diamond_id", "variant_id", "cut_type", "size_mm", 
                "count", "total_weight", "quality_grade"
            ]
        }
    }
    
    print("DATABASE SCHEMA:")
    for table_name, table_info in schema.items():
        print(f"\n-  {table_name.upper()}")
        print(f"   Purpose: {table_info['description']}")
        print(f"   Columns: {', '.join(table_info['columns'])}")
    
    return schema

def generate_multiple_images(base_sku, metal_type, main_product_name):
    """Generate multiple image URLs based on SKU and metal type"""
    if not base_sku:
        return []
    
    # Extract clean SKU from various formats
    clean_sku = base_sku
    
    # Handle different SKU patterns found in batch files
    if 'DOC' in str(base_sku):
        # For DOC patterns like "DOC - 15045" -> "DOC-PD-15045"
        if ' - ' in str(base_sku):
            number_part = str(base_sku).split(' - ')[-1]
            clean_sku = f"DOC-PD-{number_part}"
        else:
            clean_sku = str(base_sku)
    elif str(base_sku).startswith('TB-'):
        # Tennis bracelet pattern like "TB-14078" stays as is
        clean_sku = str(base_sku)
    elif str(base_sku).isdigit():
        # Plain numbers need different prefixes based on pattern
        sku_num = str(base_sku)
        if len(sku_num) == 5:
            if sku_num.startswith('140'):
                clean_sku = f"TB-{sku_num}"  # Tennis bracelets
            elif sku_num.startswith('15'):
                clean_sku = f"DOC-PD-{sku_num}"  # Pendants
            elif sku_num.startswith('16'):
                clean_sku = sku_num  # Earrings  
            elif sku_num.startswith('17'):
                clean_sku = sku_num  # Various
            elif sku_num.startswith('18'):
                clean_sku = sku_num  # Various
            else:
                clean_sku = sku_num
        else:
            clean_sku = sku_num
    
    # Determine metal prefix
    metal_mapping = {
        'Yellow Gold': 'Y',
        '14k-yellow-gold': 'Y', 
        'White Gold': 'W',
        '14k-white-gold': 'W',
        'Rose Gold': 'R',
        '14k-rose-gold': 'R'
    }
    
    metal_prefix = metal_mapping.get(metal_type, 'Y')  # Default to Yellow
    
    # Generate 4 images per variant (Y1, Y2, Y3, Y4 etc.)
    images = []
    for i in range(1, 5):
        image_url = f"https://rareregalia.com/wp-content/uploads/2025/07/{clean_sku}-{metal_prefix}{i}.jpg"
        images.append({
            'url': image_url,
            'alt_text': f"{main_product_name} - {metal_type} - Image {i}",
            'is_primary': 1 if i == 1 else 0,
            'sort_order': i
        })
    
    return images

def extract_sku_from_image_url(image_url):
    """Extract SKU from image URL"""
    if pd.isna(image_url) or not image_url:
        return None
    
    patterns = [
        r'/DOC-PD-(\d{4,5})-',  # DOC-PD-15045-R2-1.jpg format
        r'/(\d{4,5})-',         # 17026-Y3.jpg format
        r'/TB-(\d{4,5})-',      # TB-14078-Y1.jpg format
        r'/ER-(\d{4,5})-',      # ER-17001-Y1.jpg format
        r'/(\d{4,5})\.jpg',     # 17033.jpg format
        r'/(\d{4,5})\.png',     # 17033.png format
    ]
    
    for pattern in patterns:
        match = re.search(pattern, image_url)
        if match:
            return match.group(1)
    return None

def standardize_sku(sku_from_batch):
    """Standardize SKU from batch file"""
    if pd.isna(sku_from_batch) or not sku_from_batch:
        return None
    
    sku_str = str(sku_from_batch).strip()
    patterns = [
        r'DOC-PD-(\d{4,5})',     # DOC-PD-15045 format
        r'DOC - SR (\d{4})',     # DOC - SR 0001 format
        r'TB-(\d{4,5})',         # TB-14078 format
        r'ER-(\d{4,5})',         # ER-17001 format
        r'SR-(\d{4,5})',         # SR-xxxx format
        r'R-(\d{4,5})',          # R-xxxx format
        r'(\d{4,5})',            # Pure numeric: 0111, 14078, etc.
    ]
    
    for pattern in patterns:
        match = re.search(pattern, sku_str)
        if match:
            return match.group(1)
    return None

def extract_metal_info(variant_name, images_url):
    """Extract metal type from variant name or images"""
    if not variant_name:
        variant_name = ""
    if not images_url or pd.isna(images_url):
        images_url = ""
    
    text = f"{variant_name} {images_url}".lower()
    
    if 'rose' in text or '-r' in str(images_url).lower():
        return 'Rose Gold', '14kt'
    elif 'yellow' in text or '-y' in str(images_url).lower():
        return 'Yellow Gold', '14kt'
    elif 'white' in text or '-w' in str(images_url).lower():
        return 'White Gold', '14kt'
    elif '22ct' in text or '22k' in text:
        return 'Gold', '22kt'
    elif '18kt' in text or '18k' in text:
        return 'Gold', '18kt'
    elif '14kt' in text or '14k' in text:
        return 'Gold', '14kt'
    else:
        return 'Gold', '18kt'  # Default

def create_ecommerce_database():
    """Create the complete e-commerce database"""
    
    print("\nINFO: CREATING E-COMMERCE DATABASE")
    print("="*80)
    
    # Load main WooCommerce data
    main_file = r'd:\rareregalia\converted_csv_files\kshitij_wc-product-export-29-8-2025.csv'
    main_df = pd.read_csv(main_file)
    
    # Get variable products (main products)
    main_products = main_df[
        (main_df['Type'] == 'variable') & 
        (main_df['Images'].notna()) & 
        (main_df['Images'] != '')
    ].copy()
    
    # Get variations
    variations = main_df[main_df['Type'] == 'variation'].copy()
    
    print(f"Found {len(main_products)} main products and {len(variations)} variations")
    
    # Load all batch files
    batch_files = [
        {'file': r'd:\rareregalia\converted_csv_files\Batch-1_Batch-1_Excel.csv', 'sku_col': 'Style no'},
        {'file': r'd:\rareregalia\converted_csv_files\Batch-2_Batch-2_Excel.csv', 'sku_col': 'Style no'},
        {'file': r'd:\rareregalia\converted_csv_files\Batch-7_Batch-7_Excel.csv', 'sku_col': 'Style no'},
        {'file': r'd:\rareregalia\converted_csv_files\Batch-13_Batch-13_Excel.csv', 'sku_col': 'Style no'},
        {'file': r'd:\rareregalia\converted_csv_files\Batch-14_Batch-14_Excel.csv', 'sku_col': 'Style no'},
        {'file': r'd:\rareregalia\converted_csv_files\Batch-15_Batch-15_excel.csv', 'sku_col': 'SKU Code'},
        {'file': r'd:\rareregalia\converted_csv_files\Batch-16_Batch-16_solitaire_earring.csv', 'sku_col': 'SKU Code'},
        {'file': r'd:\rareregalia\converted_csv_files\Batch-17_Vol.1_Batch-17_Vol._1.csv', 'sku_col': 'SKU Code'},
        {'file': r'd:\rareregalia\converted_csv_files\Batch-17_Vol.2_Batch-17_Vol._2.csv', 'sku_col': 'SKU Code'},
        {'file': r'd:\rareregalia\converted_csv_files\Batch-18_Batch-18_Excel.csv', 'sku_col': 'SKU Code'},
        {'file': r'd:\rareregalia\converted_csv_files\Batch-19_Batch_19_Excel.csv', 'sku_col': 'SKU Code'},
        {'file': r'd:\rareregalia\converted_csv_files\Batch-22_Batch-22_Excel_new.csv', 'sku_col': 'SKU Code'},
    ]
    
    # Combine batch data
    all_batch_data = []
    for batch_info in batch_files:
        try:
            batch_df = pd.read_csv(batch_info['file'])
            if batch_info['sku_col'] in batch_df.columns:
                batch_df['batch_source'] = os.path.basename(batch_info['file'])
                batch_df['standardized_sku'] = batch_df[batch_info['sku_col']].apply(standardize_sku)
                batch_df = batch_df[batch_df['standardized_sku'].notna()]
                all_batch_data.append(batch_df)
                print(f"Loaded {len(batch_df)} records from {os.path.basename(batch_info['file'])}")
        except Exception as e:
            print(f"Error loading {batch_info['file']}: {e}")
    
    combined_batch_df = pd.concat(all_batch_data, ignore_index=True) if all_batch_data else pd.DataFrame()
    
    # Create database tables
    products_data = []
    variants_data = []
    images_data = []
    specs_data = []
    diamonds_data = []
    
    product_id_counter = 1
    variant_id_counter = 1
    image_id_counter = 1
    spec_id_counter = 1
    diamond_id_counter = 1
    
    # Process main products - ONLY include products with vendor data
    for idx, main_product in main_products.iterrows():
        extracted_sku = extract_sku_from_image_url(main_product['Images'])
        
        # CRITICAL FILTER: Skip products without vendor data
        if not extracted_sku:
            print(f"WARNING: SKIPPING '{main_product['Name']}' - No vendor SKU found in image URL")
            continue
            
        # Check if vendor data exists for this SKU
        if combined_batch_df.empty:
            print(f"WARNING: SKIPPING '{main_product['Name']}' - No batch data available")
            continue
            
        batch_match = combined_batch_df[combined_batch_df['standardized_sku'] == extracted_sku]
        if batch_match.empty:
            print(f"WARNING: SKIPPING '{main_product['Name']}' - No vendor data found for SKU {extracted_sku}")
            continue
        
        print(f"OK: PROCESSING '{main_product['Name']}' - Found vendor data for SKU {extracted_sku}")
        
        # Get vendor file information for intelligent categorization
        vendor_file_info = batch_match.iloc[0]['batch_source'] if not batch_match.empty else None
        
        # Use website categories with intelligent deduction for generic categories
        website_category = main_product.get('Categories', 'Uncategorized')
        intelligent_category = deduce_category(main_product['Name'], website_category, vendor_file_info)
        
        # Create main product record using vendor SKU in product_id
        product_record = {
            'product_id': f"{product_id_counter}-{extracted_sku}" if extracted_sku else product_id_counter,
            'product_name': main_product['Name'],
            'product_description': main_product.get('Description', ''),
            'category': intelligent_category,  # Use intelligent categorization
            'subcategory': '',  # Leave empty since Categories contains full path
            'base_price': main_product.get('Regular price', 0),
            'featured': 1 if main_product.get('Is featured?') == 1 else 0,
            'status': 'active',
            'created_date': '2025-09-15'
        }
        products_data.append(product_record)
        
        # Get variations for this product
        product_variations = variations[variations['Parent'] == f"id:{main_product['ID']}"]
        
        if not product_variations.empty:
            # Process each variation
            for var_idx, variation in product_variations.iterrows():
                metal_type, metal_karat = extract_metal_info(variation['Name'], variation.get('Images', ''))
                
                # Create variant record with vendor SKU
                variant_record = {
                    'variant_id': variant_id_counter,
                    'product_id': f"{product_id_counter}-{extracted_sku}" if extracted_sku else product_id_counter,
                    'sku': f"{extracted_sku}-{metal_type.replace(' ', '').replace('Gold', 'G')[:2]}-{variant_id_counter}" if extracted_sku else f"SKU-{variant_id_counter}",
                    'variant_name': variation['Name'],
                    'metal_type': metal_type,
                    'metal_karat': metal_karat,
                    'size': 'Standard',  # Extract from variation name if needed
                    'price': variation.get('Regular price', 0),
                    'weight_gold': 0,  # Will be filled from batch data
                    'weight_diamond': 0,  # Will be filled from batch data
                    'stock_quantity': 10,  # Default stock
                    'status': 'active'
                }
                
                # Find matching batch data
                if extracted_sku and not combined_batch_df.empty:
                    batch_match = combined_batch_df[combined_batch_df['standardized_sku'] == extracted_sku]
                    if not batch_match.empty:
                        batch_row = batch_match.iloc[0]
                        
                        # Update weights from batch data
                        gold_weight = batch_row.get('18kt Gold wt (gms)', batch_row.get('18KT wt.(Gm)', 0))
                        diamond_weight = batch_row.get('Diamond wt (Ct)', batch_row.get('Diamond Wt', 0))
                        
                        if pd.notna(gold_weight):
                            variant_record['weight_gold'] = gold_weight
                        if pd.notna(diamond_weight):
                            variant_record['weight_diamond'] = diamond_weight
                        
                        # Create technical specs
                        for col_name, col_value in batch_row.items():
                            if pd.notna(col_value) and col_name not in ['batch_source', 'standardized_sku']:
                                spec_record = {
                                    'spec_id': spec_id_counter,
                                    'variant_id': variant_id_counter,
                                    'spec_type': 'technical',
                                    'spec_name': col_name,
                                    'spec_value': str(col_value),
                                    'unit_of_measure': 'various'
                                }
                                specs_data.append(spec_record)
                                spec_id_counter += 1
                        
                        # Create comprehensive diamond details for ALL shapes
                        available_cols = list(batch_row.index)
                        
                        # Define all possible diamond shapes and their column patterns
                        diamond_shape_patterns = [
                            # Primary working patterns - MUST come first to avoid false matches
                            {'shapes': ['Round Dimond (mm)'], 'type': 'Round', 'count_col': 'Count'},
                            {'shapes': ['Cushion (mm)'], 'type': 'Cushion', 'count_col': 'Count.1'},
                            {'shapes': ['Pear (mm)'], 'type': 'Pear', 'count_col': 'Count.2'},
                            {'shapes': ['Emerald (mm)'], 'type': 'Emerald', 'count_col': 'Count.3'},
                            {'shapes': ['Princess (mm)'], 'type': 'Princess', 'count_col': 'Count.4'},
                            {'shapes': ['Oval (mm)'], 'type': 'Oval', 'count_col': 'Count.5'},
                            {'shapes': ['Trillion (mm)'], 'type': 'Trillion', 'count_col': 'Count.6'},
                            {'shapes': ['Baguette (mm)'], 'type': 'Baguette', 'count_col': 'Count.7'},
                            {'shapes': ['Marquise (mm)'], 'type': 'Marquise', 'count_col': 'Count.8'},
                            {'shapes': ['Heart (mm)'], 'type': 'Heart', 'count_col': 'Count.9'},
                            
                            # Fallback patterns - generic names
                            {'shapes': ['Round (mm)', 'Round'], 'type': 'Round', 'count_col': 'Count'},
                            {'shapes': ['Cushion'], 'type': 'Cushion', 'count_col': 'Count.1'},
                            {'shapes': ['Pear'], 'type': 'Pear', 'count_col': 'Count.2'},
                            {'shapes': ['Emerald'], 'type': 'Emerald', 'count_col': 'Count.3'},
                            {'shapes': ['Princess'], 'type': 'Princess', 'count_col': 'Count.4'},
                            {'shapes': ['Oval'], 'type': 'Oval', 'count_col': 'Count.5'},
                            {'shapes': ['Trillion'], 'type': 'Trillion', 'count_col': 'Count.6'},
                            {'shapes': ['Baguette'], 'type': 'Baguette', 'count_col': 'Count.7'},
                            {'shapes': ['Marquise'], 'type': 'Marquise', 'count_col': 'Count.8'},
                            {'shapes': ['Heart'], 'type': 'Heart', 'count_col': 'Count.9'},
                            
                            # Alternative patterns found in different batches - LAST to avoid false matches
                            {'shapes': ['Diamond Size(Round) mm', 'Diamond Size\n(Round) mm'], 'type': 'Round', 'count_col': 'Count'},
                            {'shapes': ['Diamond Size(Cushion) mm', 'Diamond Size\n(Cushion) mm'], 'type': 'Cushion', 'count_col': 'Count.1'},
                            {'shapes': ['Diamond Size(Oval) mm', 'Diamond Size\n(Oval) mm'], 'type': 'Oval', 'count_col': 'Count.2'},
                            {'shapes': ['Diamond Size(Emerald) mm', 'Diamond Size\n(Emerald) mm'], 'type': 'Emerald', 'count_col': 'Count.3'},
                            {'shapes': ['Diamond Size(Princess) mm', 'Diamond Size\n(Princess) mm'], 'type': 'Princess', 'count_col': 'Count.4'},
                            {'shapes': ['Diamond Size(Heart) mm', 'Diamond Size\n(Heart) mm'], 'type': 'Heart', 'count_col': 'Count.5'},
                            {'shapes': ['Diamond Size(Marquise) mm', 'Diamond Size\n(Marquise) mm'], 'type': 'Marquise', 'count_col': 'Count.6'},
                            {'shapes': ['Diamond Size(Pear) mm', 'Diamond Size\n(Pear) mm'], 'type': 'Pear', 'count_col': 'Count.7'},
                            {'shapes': ['Diamond Size (Baguette) mm'], 'type': 'Baguette', 'count_col': 'Count.8'},
                        ]
                        
                        # Process each diamond shape
                        for shape_info in diamond_shape_patterns:
                            # Find matching column for this shape
                            shape_col = None
                            for shape_pattern in shape_info['shapes']:
                                if shape_pattern in available_cols:
                                    shape_col = shape_pattern
                                    break
                            
                            if shape_col:
                                # Get size and count data
                                diamond_size = batch_row.get(shape_col, '')
                                diamond_count = batch_row.get(shape_info['count_col'], 0)
                                
                                # Debug logging for SKU 0111
                                if str(batch_row.get('Style no', '')).strip() == 'DOC -  0111':
                                    print(f"  DEBUG SKU 0111 - {shape_info['type']} diamond:")
                                    print(f"    Shape column: {shape_col} = '{diamond_size}'")
                                    print(f"    Count column: {shape_info['count_col']} = '{diamond_count}'")
                                    print(f"    Available columns: {available_cols}")
                                
                                # Debug logging for SKU 0111 - detailed condition check
                                if str(batch_row.get('Style no', '')).strip() == 'DOC -  0111':
                                    print(f"    Condition check for {shape_info['type']}:")
                                    print(f"      pd.notna(diamond_size): {pd.notna(diamond_size)} (size='{diamond_size}')")
                                    print(f"      pd.notna(diamond_count): {pd.notna(diamond_count)} (count='{diamond_count}')")
                                    print(f"      diamond_size != '': {diamond_size != ''}")
                                    try:
                                        count_float = float(diamond_count or 0)
                                        print(f"      float(diamond_count or 0) > 0: {count_float > 0} (value={count_float})")
                                    except:
                                        print(f"      float(diamond_count or 0) > 0: ERROR converting '{diamond_count}' to float")
                                
                                # Only create record if both size and count are meaningful
                                if pd.notna(diamond_size) and pd.notna(diamond_count) and diamond_size != '' and float(diamond_count or 0) > 0:
                                    try:
                                        count_val = float(diamond_count)
                                        if count_val > 0:
                                            diamond_record = {
                                                'diamond_id': diamond_id_counter,
                                                'variant_id': variant_id_counter,
                                                'cut_type': shape_info['type'],
                                                'size_mm': str(diamond_size).strip(),
                                                'count': count_val,
                                                'total_weight': variant_record['weight_diamond'],
                                                'quality_grade': 'VS'
                                            }
                                            diamonds_data.append(diamond_record)
                                            
                                            # Debug logging for SKU 0111
                                            if str(batch_row.get('Style no', '')).strip() == 'DOC -  0111':
                                                print(f"    CREATED {shape_info['type']} diamond record: ID={diamond_id_counter}, Count={count_val}")
                                            
                                            diamond_id_counter += 1
                                    except (ValueError, TypeError) as e:
                                        # Debug logging for SKU 0111
                                        if str(batch_row.get('Style no', '')).strip() == 'DOC -  0111':
                                            print(f"    ERROR processing {shape_info['type']}: {e}")
                                        # Skip invalid count values
                                        pass
                                else:
                                    # Debug logging for SKU 0111
                                    if str(batch_row.get('Style no', '')).strip() == 'DOC -  0111':
                                        print(f"    SKIPPED {shape_info['type']}: size='{diamond_size}', count='{diamond_count}'")
                
                variants_data.append(variant_record)
                
                # Create multiple image records based on metal type and SKU
                sku_for_images = extracted_sku
                
                # If no SKU found, try to extract from variation or main product images
                if not sku_for_images:
                    if variation.get('Images'):
                        sku_for_images = extract_sku_from_image_url(variation['Images'])
                    elif main_product.get('Images'):
                        sku_for_images = extract_sku_from_image_url(main_product['Images'])
                
                # Generate multiple images based on SKU pattern and metal type
                if sku_for_images:
                    generated_images = generate_multiple_images(sku_for_images, metal_type, main_product['Name'])
                    for img_info in generated_images:
                        image_record = {
                            'image_id': image_id_counter,
                            'variant_id': variant_id_counter,
                            'image_url': img_info['url'],
                            'image_type': 'product',
                            'is_primary': img_info['is_primary'],
                            'alt_text': img_info['alt_text'],
                            'sort_order': img_info['sort_order']
                        }
                        images_data.append(image_record)
                        image_id_counter += 1
                else:
                    # Fallback: Create single image record from existing data
                    if variation.get('Images'):
                        image_record = {
                            'image_id': image_id_counter,
                            'variant_id': variant_id_counter,
                            'image_url': variation['Images'],
                            'image_type': 'product',
                            'is_primary': 1,
                            'alt_text': f"{main_product['Name']} - {metal_type}",
                            'sort_order': 1
                        }
                        images_data.append(image_record)
                        image_id_counter += 1
                
                variant_id_counter += 1
        else:
            # No variations, create single variant (also with vendor data requirement)
            metal_type, metal_karat = extract_metal_info('', main_product.get('Images', ''))
            
            # Find matching batch data for single variant as well
            batch_row = batch_match.iloc[0]
            gold_weight = batch_row.get('18kt Gold wt (gms)', batch_row.get('18KT wt.(Gm)', 0))
            diamond_weight = batch_row.get('Diamond wt (Ct)', batch_row.get('Diamond Wt', 0))
            
            variant_record = {
                'variant_id': variant_id_counter,
                'product_id': f"{product_id_counter}-{extracted_sku}",
                'sku': f"{extracted_sku}-{metal_type.replace(' ', '').replace('Gold', 'G')[:2]}-{variant_id_counter}",
                'variant_name': main_product['Name'],
                'metal_type': metal_type,
                'metal_karat': metal_karat,
                'size': 'Standard',
                'price': main_product.get('Regular price', 0),
                'weight_gold': gold_weight if pd.notna(gold_weight) else 0,
                'weight_diamond': diamond_weight if pd.notna(diamond_weight) else 0,
                'stock_quantity': 10,
                'status': 'active'
            }
            variants_data.append(variant_record)
            
            # Create technical specs for single variant
            for col_name, col_value in batch_row.items():
                if pd.notna(col_value) and col_name not in ['batch_source', 'standardized_sku']:
                    spec_record = {
                        'spec_id': spec_id_counter,
                        'variant_id': variant_id_counter,
                        'spec_type': 'technical',
                        'spec_name': col_name,
                        'spec_value': str(col_value),
                        'unit_of_measure': 'various'
                    }
                    specs_data.append(spec_record)
                    spec_id_counter += 1
            
            # Create image record
            if main_product.get('Images'):
                image_record = {
                    'image_id': image_id_counter,
                    'variant_id': variant_id_counter,
                    'image_url': main_product['Images'],
                    'image_type': 'product',
                    'is_primary': 1,
                    'alt_text': main_product['Name'],
                    'sort_order': 1
                }
                images_data.append(image_record)
                image_id_counter += 1
            
            variant_id_counter += 1
        
        # Only increment product counter for successfully processed products
        product_id_counter += 1
    
    # Create DataFrames
    products_df = pd.DataFrame(products_data)
    variants_df = pd.DataFrame(variants_data)
    images_df = pd.DataFrame(images_data)
    specs_df = pd.DataFrame(specs_data)
    diamonds_df = pd.DataFrame(diamonds_data)
    
    # Save to CSV files
    output_dir = Path(r'd:\rareregalia\ecommerce_database')
    output_dir.mkdir(exist_ok=True)
    
    products_df.to_csv(output_dir / 'products.csv', index=False)
    variants_df.to_csv(output_dir / 'product_variants.csv', index=False)
    images_df.to_csv(output_dir / 'product_images.csv', index=False)
    specs_df.to_csv(output_dir / 'technical_specs.csv', index=False)
    diamonds_df.to_csv(output_dir / 'diamond_details.csv', index=False)
    
    print(f"\nOK: E-COMMERCE DATABASE CREATED - VENDOR DATA ONLY!")
    print(f"  Output directory: {output_dir}")
    print(f"  FILTERING RESULTS:")
    print(f"     Total website products found: {len(main_products)}")
    print(f"     Products WITH vendor data: {len(products_df)}")
    print(f"     Products SKIPPED (no vendor data): {len(main_products) - len(products_df)}")
    print(f"Statistics: Database Statistics:")
    print(f"     Products: {len(products_df)}")
    print(f"     Product Variants: {len(variants_df)}")
    print(f"     Images: {len(images_df)}")
    print(f"     Technical Specs: {len(specs_df)}")
    print(f"     Diamond Details: {len(diamonds_df)}")
    
    return {
        'products': products_df,
        'variants': variants_df,
        'images': images_df,
        'specs': specs_df,
        'diamonds': diamonds_df
    }

def recommend_tech_stack():
    """Recommend optimal technology stack for e-commerce website"""
    
    recommendations = {
        "Backend Framework": {
            "Recommended": "Next.js 14 + TypeScript",
            "Alternative": "WooCommerce (WordPress)",
            "Reason": "Better performance, modern React, full-stack capabilities"
        },
        "Database": {
            "Recommended": "PostgreSQL",
            "Alternative": "MySQL",
            "Reason": "Better JSON support, scalability, advanced indexing"
        },
        "Frontend": {
            "Recommended": "React 18 + Tailwind CSS",
            "Alternative": "Vue.js + Bootstrap",
            "Reason": "Component-based, excellent ecosystem, responsive design"
        },
        "E-commerce Features": {
            "Recommended": "Stripe + Custom Cart",
            "Alternative": "WooCommerce + PayPal",
            "Reason": "Modern payments, better customization, performance"
        },
        "Image Management": {
            "Recommended": "Cloudinary + Next.js Image Optimization",
            "Alternative": "AWS S3 + CloudFront",
            "Reason": "Automatic optimization, responsive images, CDN"
        },
        "Hosting": {
            "Recommended": "Vercel (for Next.js) + Railway (for DB)",
            "Alternative": "AWS + RDS",
            "Reason": "Easy deployment, auto-scaling, cost-effective"
        }
    }
    
    print(f"\nINFO: RECOMMENDED TECHNOLOGY STACK")
    print("="*80)
    
    for category, details in recommendations.items():
        print(f"\n-  {category.upper()}")
        print(f"   Recommended: {details['Recommended']}")
        print(f"   Alternative: {details['Alternative']}")
        print(f"   Why: {details['Reason']}")
    
    return recommendations

if __name__ == "__main__":
    # Design schema
    schema = design_ecommerce_database()
    
    # Create database
    database = create_ecommerce_database()
    
    # Tech stack recommendations
    tech_stack = recommend_tech_stack()
    
    print(f"\nSUCCESS: E-COMMERCE DATABASE READY FOR DEVELOPMENT!")
    print(f"Next steps: Import CSV files into your chosen database system")