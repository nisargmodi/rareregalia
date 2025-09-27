#!/usr/bin/env python3
"""
WooCommerce Product Import Converter
Converts Rare Regalia product export to WooCommerce CSV import format

WooCommerce CSV Format for Variable Products:
- Parent products with Type = 'variable'
- Child variations with Type = 'variation'
- Attributes defined for variations
- Categories, images, and all WooCommerce fields
"""

import pandas as pd
import os
import sys
from collections import defaultdict
import re

def clean_text(text):
    """Clean text for WooCommerce compatibility"""
    if pd.isna(text) or text == '':
        return ''
    return str(text).strip().replace('\n', ' ').replace('\r', ' ')

def format_price(price):
    """Format price for WooCommerce"""
    if pd.isna(price) or price == '' or price == 0:
        return ''
    return str(float(price))

def format_weight(weight):
    """Format weight in grams for WooCommerce"""
    if pd.isna(weight) or weight == '':
        return ''
    try:
        return str(round(float(weight), 2))
    except:
        return ''

def format_images(image_urls):
    """Format multiple images for WooCommerce"""
    if pd.isna(image_urls) or image_urls == '':
        return ''
    # Split by semicolon and clean up
    images = [img.strip() for img in str(image_urls).split(';') if img.strip()]
    return ', '.join(images)

def create_slug(name):
    """Create URL-friendly slug from product name"""
    slug = str(name).lower()
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    slug = re.sub(r'\s+', '-', slug)
    slug = re.sub(r'-+', '-', slug)
    return slug.strip('-')

def convert_to_woocommerce(input_file, output_file):
    """Convert Rare Regalia export to WooCommerce format"""
    
    print("🔄 Loading product data...")
    df = pd.read_csv(input_file)
    
    print(f"📊 Processing {len(df)} product variants from {df['Product_ID'].nunique()} unique products...")
    
    # Group by Product_ID to create parent and variation products
    products = df.groupby('Product_ID')
    
    woo_products = []
    
    for product_id, variants in products:
        # Get the first variant for parent product information
        parent_data = variants.iloc[0]
        
        print(f"📦 Processing: {parent_data['Product_Name']} ({len(variants)} variants)")
        
        # Create parent product (variable product)
        parent_product = create_parent_product(parent_data, variants)
        woo_products.append(parent_product)
        
        # Create variation products
        for idx, variant in variants.iterrows():
            variation_product = create_variation_product(variant, parent_data)
            woo_products.append(variation_product)
    
    # Convert to DataFrame and save
    woo_df = pd.DataFrame(woo_products)
    
    # Reorder columns to match WooCommerce import format
    column_order = [
        'Type', 'SKU', 'Name', 'Published', 'Is featured?', 'Visibility in catalog',
        'Short description', 'Description', 'Date sale price starts', 'Date sale price ends',
        'Tax status', 'Tax class', 'In stock?', 'Stock', 'Low stock amount', 'Backorders allowed?',
        'Sold individually?', 'Weight (g)', 'Length (cm)', 'Width (cm)', 'Height (cm)',
        'Allow customer reviews?', 'Purchase note', 'Sale price', 'Regular price', 'Categories',
        'Tags', 'Shipping class', 'Images', 'Download limit', 'Download expiry days',
        'Parent', 'Grouped products', 'Upsells', 'Cross-sells', 'External URL', 'Button text',
        'Position', 'Attribute 1 name', 'Attribute 1 value(s)', 'Attribute 1 visible',
        'Attribute 1 global', 'Attribute 1 default', 'Attribute 2 name', 'Attribute 2 value(s)',
        'Attribute 2 visible', 'Attribute 2 global', 'Attribute 2 default', 'Attribute 3 name',
        'Attribute 3 value(s)', 'Attribute 3 visible', 'Attribute 3 global', 'Attribute 3 default',
        'Meta: _custom_product_text_field'
    ]
    
    # Add any missing columns
    for col in column_order:
        if col not in woo_df.columns:
            woo_df[col] = ''
    
    # Reorder columns
    woo_df = woo_df[column_order]
    
    # Save to CSV
    woo_df.to_csv(output_file, index=False)
    
    print(f"✅ WooCommerce import file created: {output_file}")
    print(f"📊 Total rows: {len(woo_df)} (Parents: {df['Product_ID'].nunique()}, Variations: {len(df)})")
    
    return woo_df

def create_parent_product(parent_data, variants):
    """Create parent variable product for WooCommerce"""
    
    # Get all unique values for attributes
    metal_types = variants['Metal_Type'].dropna().unique()
    metal_karats = variants['Metal_Karat'].dropna().unique()
    sizes = variants['Size'].dropna().unique()
    
    # Price range for parent
    prices = variants['Price_INR'].dropna()
    min_price = prices.min() if len(prices) > 0 else 0
    max_price = prices.max() if len(prices) > 0 else 0
    
    # Create comprehensive description
    description = create_product_description(parent_data, variants)
    
    parent = {
        'Type': 'variable',
        'SKU': f"PARENT-{parent_data['Product_ID']}",
        'Name': clean_text(parent_data['Product_Name']),
        'Published': 1,
        'Is featured?': 1 if parent_data.get('Featured', 0) else 0,
        'Visibility in catalog': 'visible',
        'Short description': create_short_description(parent_data),
        'Description': description,
        'Date sale price starts': '',
        'Date sale price ends': '',
        'Tax status': 'taxable',
        'Tax class': '',
        'In stock?': 1,
        'Stock': '',  # Managed at variation level
        'Low stock amount': '',
        'Backorders allowed?': 0,
        'Sold individually?': 0,
        'Weight (g)': format_weight(parent_data.get('Gold_Weight_Grams', '')),
        'Length (cm)': '',
        'Width (cm)': '',
        'Height (cm)': '',
        'Allow customer reviews?': 1,
        'Purchase note': '',
        'Sale price': '',
        'Regular price': f"{format_price(min_price)} - {format_price(max_price)}" if min_price != max_price else format_price(min_price),
        'Categories': clean_text(parent_data.get('Category', '')),
        'Tags': create_product_tags(parent_data),
        'Shipping class': '',
        'Images': format_images(parent_data.get('All_Images', parent_data.get('Primary_Image_URL', ''))),
        'Download limit': '',
        'Download expiry days': '',
        'Parent': '',
        'Grouped products': '',
        'Upsells': '',
        'Cross-sells': '',
        'External URL': '',
        'Button text': '',
        'Position': 0,
        'Attribute 1 name': 'Metal Type',
        'Attribute 1 value(s)': ' | '.join(metal_types),
        'Attribute 1 visible': 1,
        'Attribute 1 global': 1,
        'Attribute 1 default': metal_types[0] if len(metal_types) > 0 else '',
        'Attribute 2 name': 'Metal Karat',
        'Attribute 2 value(s)': ' | '.join(metal_karats),
        'Attribute 2 visible': 1,
        'Attribute 2 global': 1,
        'Attribute 2 default': metal_karats[0] if len(metal_karats) > 0 else '',
        'Attribute 3 name': 'Size' if len(sizes) > 1 and not all(s == 'Standard' for s in sizes) else '',
        'Attribute 3 value(s)': ' | '.join(sizes) if len(sizes) > 1 and not all(s == 'Standard' for s in sizes) else '',
        'Attribute 3 visible': 1 if len(sizes) > 1 and not all(s == 'Standard' for s in sizes) else 0,
        'Attribute 3 global': 1,
        'Attribute 3 default': sizes[0] if len(sizes) > 0 and not all(s == 'Standard' for s in sizes) else '',
        'Meta: _custom_product_text_field': create_technical_specs(parent_data)
    }
    
    return parent

def create_variation_product(variant_data, parent_data):
    """Create product variation for WooCommerce"""
    
    # Create variation name
    variation_name = f"{parent_data['Product_Name']} - {variant_data['Metal_Type']} {variant_data['Metal_Karat']}"
    if variant_data.get('Size', 'Standard') != 'Standard':
        variation_name += f" - {variant_data['Size']}"
    
    variation = {
        'Type': 'variation',
        'SKU': clean_text(variant_data['SKU']),
        'Name': clean_text(variation_name),
        'Published': 1,
        'Is featured?': 0,
        'Visibility in catalog': 'visible',
        'Short description': '',
        'Description': create_variation_description(variant_data),
        'Date sale price starts': '',
        'Date sale price ends': '',
        'Tax status': 'taxable',
        'Tax class': '',
        'In stock?': 1 if variant_data.get('Stock_Quantity', 0) > 0 else 0,
        'Stock': variant_data.get('Stock_Quantity', 10),
        'Low stock amount': 2,
        'Backorders allowed?': 0,
        'Sold individually?': 0,
        'Weight (g)': format_weight(variant_data.get('Gold_Weight_Grams', '')),
        'Length (cm)': '',
        'Width (cm)': '',
        'Height (cm)': '',
        'Allow customer reviews?': 0,
        'Purchase note': '',
        'Sale price': '',
        'Regular price': format_price(variant_data.get('Price_INR', '')),
        'Categories': '',  # Inherited from parent
        'Tags': '',
        'Shipping class': '',
        'Images': format_images(variant_data.get('All_Images', variant_data.get('Primary_Image_URL', ''))),
        'Download limit': '',
        'Download expiry days': '',
        'Parent': f"PARENT-{parent_data['Product_ID']}",
        'Grouped products': '',
        'Upsells': '',
        'Cross-sells': '',
        'External URL': '',
        'Button text': '',
        'Position': 0,
        'Attribute 1 name': 'Metal Type',
        'Attribute 1 value(s)': clean_text(variant_data.get('Metal_Type', '')),
        'Attribute 1 visible': 0,
        'Attribute 1 global': 1,
        'Attribute 1 default': '',
        'Attribute 2 name': 'Metal Karat',
        'Attribute 2 value(s)': clean_text(variant_data.get('Metal_Karat', '')),
        'Attribute 2 visible': 0,
        'Attribute 2 global': 1,
        'Attribute 2 default': '',
        'Attribute 3 name': 'Size' if variant_data.get('Size', 'Standard') != 'Standard' else '',
        'Attribute 3 value(s)': clean_text(variant_data.get('Size', '')) if variant_data.get('Size', 'Standard') != 'Standard' else '',
        'Attribute 3 visible': 0,
        'Attribute 3 global': 1,
        'Attribute 3 default': '',
        'Meta: _custom_product_text_field': create_technical_specs(variant_data)
    }
    
    return variation

def create_product_description(parent_data, variants):
    """Create comprehensive product description"""
    description_parts = []
    
    # Basic description
    if parent_data.get('Product_Description'):
        description_parts.append(clean_text(parent_data['Product_Description']))
    
    # Diamond details
    if parent_data.get('Diamond_Weight_Carats') and pd.notna(parent_data['Diamond_Weight_Carats']):
        diamond_info = f"<strong>Diamond Details:</strong><br>"
        diamond_info += f"• Total Weight: {parent_data['Diamond_Weight_Carats']} carats<br>"
        
        if parent_data.get('Diamond_Count_Total') and pd.notna(parent_data['Diamond_Count_Total']):
            diamond_info += f"• Count: {int(parent_data['Diamond_Count_Total'])} diamonds<br>"
        
        if parent_data.get('Diamond_Shapes'):
            diamond_info += f"• Shapes: {parent_data['Diamond_Shapes']}<br>"
        
        if parent_data.get('Diamond_Quality_Grades'):
            diamond_info += f"• Quality: {parent_data['Diamond_Quality_Grades']}<br>"
        
        description_parts.append(diamond_info)
    
    # Gold details
    if parent_data.get('Gold_Weight_Grams') and pd.notna(parent_data['Gold_Weight_Grams']):
        gold_info = f"<strong>Gold Specifications:</strong><br>"
        gold_info += f"• Weight: {parent_data['Gold_Weight_Grams']} grams<br>"
        
        if parent_data.get('Gold_Purity'):
            gold_info += f"• Purity: {parent_data['Gold_Purity']}<br>"
        
        description_parts.append(gold_info)
    
    # Available variations
    metal_types = variants['Metal_Type'].dropna().unique()
    karats = variants['Metal_Karat'].dropna().unique()
    
    if len(metal_types) > 1 or len(karats) > 1:
        variation_info = f"<strong>Available Options:</strong><br>"
        if len(metal_types) > 1:
            variation_info += f"• Metal Types: {', '.join(metal_types)}<br>"
        if len(karats) > 1:
            variation_info += f"• Karat Options: {', '.join(karats)}<br>"
        
        description_parts.append(variation_info)
    
    return "<br><br>".join(description_parts)

def create_short_description(product_data):
    """Create short description for product"""
    parts = []
    
    if product_data.get('Category'):
        parts.append(f"Category: {product_data['Category']}")
    
    if product_data.get('Diamond_Weight_Carats') and pd.notna(product_data['Diamond_Weight_Carats']):
        parts.append(f"{product_data['Diamond_Weight_Carats']} ct diamonds")
    
    if product_data.get('Gold_Weight_Grams') and pd.notna(product_data['Gold_Weight_Grams']):
        parts.append(f"{product_data['Gold_Weight_Grams']}g gold")
    
    return " | ".join(parts)

def create_product_tags(product_data):
    """Create product tags"""
    tags = []
    
    if product_data.get('Category'):
        # Add category as tags
        categories = str(product_data['Category']).split(',')
        for cat in categories:
            clean_cat = cat.strip().replace('>', '').strip()
            if clean_cat:
                tags.append(clean_cat)
    
    if product_data.get('Diamond_Shapes'):
        shapes = str(product_data['Diamond_Shapes']).split(',')
        for shape in shapes:
            clean_shape = shape.strip()
            if clean_shape:
                tags.append(f"{clean_shape} Diamond")
    
    if product_data.get('Metal_Type'):
        tags.append(str(product_data['Metal_Type']).strip())
    
    # Add quality indicators
    if product_data.get('Diamond_Quality_Grades'):
        quality = str(product_data['Diamond_Quality_Grades']).strip()
        if quality:
            tags.append(f"{quality} Quality")
    
    return ", ".join(list(set(tags)))  # Remove duplicates

def create_variation_description(variant_data):
    """Create description for specific variation"""
    parts = []
    
    if variant_data.get('Metal_Type') and variant_data.get('Metal_Karat'):
        parts.append(f"Metal: {variant_data['Metal_Type']} {variant_data['Metal_Karat']}")
    
    if variant_data.get('Size') and variant_data['Size'] != 'Standard':
        parts.append(f"Size: {variant_data['Size']}")
    
    if variant_data.get('Gold_Weight_Grams') and pd.notna(variant_data['Gold_Weight_Grams']):
        parts.append(f"Gold Weight: {variant_data['Gold_Weight_Grams']}g")
    
    if variant_data.get('Diamond_Weight_Carats') and pd.notna(variant_data['Diamond_Weight_Carats']):
        parts.append(f"Diamond Weight: {variant_data['Diamond_Weight_Carats']} carats")
    
    return " | ".join(parts)

def create_technical_specs(product_data):
    """Create technical specifications as custom field"""
    specs = {}
    
    if product_data.get('Style_Number'):
        specs['Style Number'] = product_data['Style_Number']
    
    if product_data.get('Gold_Weight_Grams') and pd.notna(product_data['Gold_Weight_Grams']):
        specs['Gold Weight'] = f"{product_data['Gold_Weight_Grams']}g"
    
    if product_data.get('Gold_Purity'):
        specs['Gold Purity'] = product_data['Gold_Purity']
    
    if product_data.get('Diamond_Weight_Carats') and pd.notna(product_data['Diamond_Weight_Carats']):
        specs['Diamond Weight'] = f"{product_data['Diamond_Weight_Carats']} ct"
    
    if product_data.get('Diamond_Count_Total') and pd.notna(product_data['Diamond_Count_Total']):
        specs['Diamond Count'] = str(int(product_data['Diamond_Count_Total']))
    
    if product_data.get('Diamond_Shapes'):
        specs['Diamond Shapes'] = product_data['Diamond_Shapes']
    
    if product_data.get('Diamond_Quality_Grades'):
        specs['Diamond Quality'] = product_data['Diamond_Quality_Grades']
    
    if product_data.get('Making_Charges') and pd.notna(product_data['Making_Charges']):
        specs['Making Charges'] = str(product_data['Making_Charges'])
    
    # Format as JSON-like string for custom field
    if specs:
        spec_text = " | ".join([f"{k}: {v}" for k, v in specs.items()])
        return spec_text
    
    return ""

def main():
    input_file = 'Complete_Product_Export_All_Variants.csv'
    output_file = 'WooCommerce_Product_Import.csv'
    
    if not os.path.exists(input_file):
        print(f"❌ Error: Input file '{input_file}' not found!")
        return
    
    print("🚀 Starting WooCommerce conversion...")
    print("=" * 60)
    
    try:
        woo_df = convert_to_woocommerce(input_file, output_file)
        
        print("\n" + "=" * 60)
        print("✅ CONVERSION COMPLETED SUCCESSFULLY!")
        print(f"📁 Output file: {output_file}")
        print(f"📊 Total products: {len(woo_df)}")
        
        # Show sample of parent products
        parents = woo_df[woo_df['Type'] == 'variable']
        variations = woo_df[woo_df['Type'] == 'variation']
        
        print(f"📦 Parent products: {len(parents)}")
        print(f"🔧 Product variations: {len(variations)}")
        
        print("\n📋 Sample parent products:")
        for i, (_, product) in enumerate(parents.head(3).iterrows()):
            print(f"   {i+1}. {product['Name']} (SKU: {product['SKU']})")
        
        print(f"\n🎯 Ready for WooCommerce import!")
        print(f"   Go to: WooCommerce > Products > Import")
        print(f"   Upload: {output_file}")
        
    except Exception as e:
        print(f"❌ Error during conversion: {str(e)}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()