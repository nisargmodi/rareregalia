#!/usr/bin/env python3
"""
Website Data Generator
Regenerates ecommerce website data from inventory master and database sources.
Creates products.json, categories.json, and stats.json for the frontend.
"""

import pandas as pd
import json
import os
from pathlib import Path
import re
from typing import Dict, List, Any, Optional

def load_source_data():
    """Load all source data files"""
    print("Loading source data files...")
    
    # Get paths relative to project root
    base_dir = Path(__file__).resolve().parent.parent  # Go up to rareregalia root
    
    # Load inventory master
    inventory_df = pd.read_csv(base_dir / 'inventory_master_all_batches.csv')
    print(f"Loaded {len(inventory_df)} inventory records")
    
    # Load ecommerce database files
    products_df = pd.read_csv(base_dir / 'ecommerce_database' / 'products.csv')
    variants_df = pd.read_csv(base_dir / 'ecommerce_database' / 'product_variants.csv')
    print(f"Loaded {len(products_df)} products, {len(variants_df)} variants")
    
    return inventory_df, products_df, variants_df

def extract_style_number(style_no: str) -> str:
    """Extract numeric style number from style_no field"""
    if pd.isna(style_no):
        return ""
    
    # Extract the numeric part from various formats
    # Examples: "DOC - SR 0016" -> "0016", "S R-19006" -> "19006", "TB-14078" -> "14078"
    match = re.search(r'(\d+)', str(style_no))
    return match.group(1) if match else str(style_no)

def deduce_category_from_style(style_no: str, sku_numeric: int) -> str:
    """Deduce product category from style number patterns"""
    if pd.isna(style_no):
        return "Uncategorized"
    
    style_str = str(style_no).upper()
    
    # Ring patterns
    if any(pattern in style_str for pattern in ['SR', 'S R']):
        return "Rings"
    
    # Pendant/Necklace patterns  
    if any(pattern in style_str for pattern in ['PD', 'P ', 'VL']):
        return "Pendants"
    
    # Earring patterns
    if any(pattern in style_str for pattern in ['ER', 'E ']):
        return "Earrings"
    
    # Bracelet patterns
    if any(pattern in style_str for pattern in ['TB', 'B ']):
        return "Bracelets"
    
    # Ring pattern (R prefix)
    if style_str.startswith('R-') or style_str.startswith('R '):
        return "Rings"
    
    # Default based on numeric ranges (legacy logic)
    if isinstance(sku_numeric, (int, float)) and not pd.isna(sku_numeric):
        num = int(sku_numeric)
        if num < 1000:
            return "Rings"
        elif num < 15000:
            return "Pendants" 
        elif num < 17000:
            return "Pendants"
        elif num < 18000:
            return "Earrings"
        elif num < 19000:
            return "Pendants"
        else:
            return "Rings"
    
    return "Uncategorized"

def map_metal_color_to_type(color: str) -> str:
    """Map variant color to metal type"""
    if pd.isna(color):
        return "Yellow Gold"
    
    color_mapping = {
        "White": "White Gold",
        "Rose": "Rose Gold", 
        "Yellow": "Yellow Gold",
        "RG": "Rose Gold",
        "W": "White Gold",
        "Y": "Yellow Gold"
    }
    
    return color_mapping.get(str(color).strip(), "Yellow Gold")

def build_image_paths(style_num: str, variant_images: str) -> tuple:
    """Build image paths from inventory data"""
    if pd.isna(variant_images):
        return "", []
    
    # Split image paths and convert to web paths
    image_paths = str(variant_images).split(' | ')
    web_images = []
    
    for path in image_paths:
        if path.strip():
            # Convert vendor path to web path
            # vendor-data\Batch-1\0016\0016-Model-White.jpg -> /images/products/0016/0016-Model-White.jpg
            parts = Path(path).parts
            if len(parts) >= 3:
                style_folder = parts[-2]
                filename = parts[-1]
                web_path = f"/images/products/{style_folder}/{filename}"
                web_images.append(web_path)
    
    # Only use actual images from inventory - no fallback to non-existent main.jpg
    primary_image = web_images[0] if web_images else ""
    return primary_image, web_images

def build_video_paths(style_num: str, variant_videos: str) -> list:
    """Convert vendor video paths to web paths"""
    web_videos = []
    
    if pd.notna(variant_videos) and variant_videos:
        # Split by pipe separator
        video_list = str(variant_videos).split('|')
        
        for video_path in video_list:
            video_path = video_path.strip()
            if not video_path:
                continue
                
            # Convert backslashes to forward slashes
            video_path = video_path.replace('\\', '/')
            
            # Extract the relevant parts: vendor-data/Batch-N/XXXX/file.mp4
            # Convert to: /videos/products/XXXX/file.mp4
            parts = video_path.split('/')
            if len(parts) >= 2:
                filename = parts[-1]
                # Get the style folder (0016, 0024, etc.)
                style_folder = str(style_num).zfill(4)
                web_path = f"/videos/products/{style_folder}/{filename}"
                web_videos.append(web_path)
    
    return web_videos

def generate_products_data(inventory_df: pd.DataFrame, products_df: pd.DataFrame, variants_df: pd.DataFrame) -> List[Dict[str, Any]]:
    """Generate products data from inventory and database sources"""
    print("Generating products data...")
    
    products_data = []
    variant_id_counter = 1
    
    # Group inventory by style number
    inventory_grouped = inventory_df.groupby('sku_numeric')
    
    for sku_numeric, group in inventory_grouped:
        style_no = group['style_no'].iloc[0]
        style_num = extract_style_number(style_no)
        
        # Deduce category
        category = deduce_category_from_style(style_no, sku_numeric)
        
        # Create product ID
        product_id = f"{len(products_data) + 1}-{style_num}"
        
        # Try to get product name from inventory CSV first, then products.csv, otherwise generate
        product_name = None
        description = ""
        
        # Check if product_name column exists in inventory and has a value
        if 'product_name' in group.columns and pd.notna(group['product_name'].iloc[0]) and str(group['product_name'].iloc[0]).strip():
            product_name = str(group['product_name'].iloc[0]).strip()
            
        # Check if description column exists in inventory
        if 'description' in group.columns and pd.notna(group['description'].iloc[0]):
            description = str(group['description'].iloc[0]).strip()
        
        # Fallback to products.csv if name not in inventory
        if not product_name and products_df is not None and len(products_df) > 0:
            # Look for matching product by style number in product_id column
            matching_products = products_df[products_df['product_id'].str.contains(f'-{style_num}', na=False, regex=False)]
            if len(matching_products) > 0:
                product_name = matching_products['product_name'].iloc[0]
                # Also update category from products.csv if available
                if pd.notna(matching_products['category'].iloc[0]):
                    csv_category = matching_products['category'].iloc[0]
                    # Use first category if multiple are listed
                    if ',' in csv_category:
                        csv_category = csv_category.split(',')[0].strip()
                    # Map common category names
                    if 'Bracelet' in csv_category:
                        category = 'Bracelets'
                    elif 'Earring' in csv_category:
                        category = 'Earrings'
                    elif 'Pendant' in csv_category or 'Necklace' in csv_category:
                        category = 'Pendants'
                    elif 'Ring' in csv_category:
                        category = 'Rings'
        
        # If still no name found, leave it empty (will be populated later)
        if not product_name:
            product_name = f"Product {style_num}"  # Temporary placeholder using SKU
        
        # Get pricing data from variants if available
        existing_variants = variants_df[variants_df['sku'].str.contains(str(style_num), na=False)]
        base_price = existing_variants['price'].mean() if len(existing_variants) > 0 and not existing_variants['price'].isna().all() else 25000
        if pd.isna(base_price):
            base_price = 25000
        
        # Process each variant in the group
        for _, row in group.iterrows():
            variant_color = row['variant_color']
            variant_size = row['variant_size']
            
            metal_type = map_metal_color_to_type(variant_color)
            
            # Build size string
            size_str = str(variant_size) if pd.notna(variant_size) else "Standard"
            
            # Generate SKU
            color_code = {"White Gold": "W", "Rose Gold": "RG", "Yellow Gold": "Y"}.get(metal_type, "Y")
            size_suffix = f"-{size_str}" if size_str != "Standard" else ""
            sku = f"{style_num}-{color_code}{size_suffix}"
            
            # Build images
            primary_image, all_images = build_image_paths(style_num, row['variant_images'])
            
            # Build videos
            all_videos = build_video_paths(style_num, row.get('variant_videos', ''))
            
            # Generate variant name
            variant_name = f"{product_name} - {metal_type}"
            if size_str != "Standard":
                variant_name += f", Size {size_str}"
            
            # Create product variant record
            product_record = {
                "id": sku,
                "sku": sku,
                "productId": product_id,
                "variantId": variant_id_counter,
                "name": product_name,
                "variantName": variant_name,
                "category": category,
                "status": "active",
                "metalType": metal_type,
                "metalKarat": "14kt",
                "size": size_str,
                "priceINR": float(base_price * (0.9 + (hash(sku) % 40) / 100)) if pd.notna(base_price) else 25000.0,  # Add some price variation
                "basePrice": float(base_price) if pd.notna(base_price) else 25000.0,
                "featured": False,
                "stockQuantity": 10,
                "goldWeight": float(row['gold_weight_gms']) if pd.notna(row['gold_weight_gms']) else 0.0,
                "goldPurity": "18kt",
                "goldWeightVendor": float(row['gold_weight_gms']) if pd.notna(row['gold_weight_gms']) else 0.0,
                "diamondWeight": float(row['diamond_weight_ct']) if pd.notna(row['diamond_weight_ct']) else 0.0,
                "diamondWeightVendor": float(row['diamond_weight_ct']) if pd.notna(row['diamond_weight_ct']) else 0.0,
                "diamondCount": int(row['diamond_type_total']) if pd.notna(row['diamond_type_total']) else 0,
                "diamondCountOther": 0,
                "diamondShapes": "Round",
                "diamondSizes": "2.5mm",
                "diamondCuts": "Brilliant",
                "diamondQuality": "VS",
                "diamondShapeDetails": "Round: 1.0 (2.5mm)",
                "makingCharges": None,
                "primaryImage": primary_image,
                "allImages": all_images,
                "totalImages": len(all_images),
                "allVideos": all_videos,
                "totalVideos": len(all_videos),
                "styleNumber": style_no,
                "description": f"Exquisite {category.lower().rstrip('s')} featuring premium diamonds and {metal_type.lower()}.",
                "createdDate": "2025-09-28",
                "totalSpecs": 5
            }
            
            products_data.append(product_record)
            variant_id_counter += 1
    
    print(f"Generated {len(products_data)} product variants")
    return products_data

def generate_categories_data(products_data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Generate categories data from products"""
    print("Generating categories data...")
    
    # Count unique product groups (by productId) per category, not all variations
    category_product_ids = {}
    for product in products_data:
        category = product['category']
        product_id = product.get('productId', product.get('id'))
        
        if category not in category_product_ids:
            category_product_ids[category] = set()
        category_product_ids[category].add(product_id)
    
    categories = []
    for category, product_ids in category_product_ids.items():
        categories.append({
            "id": category.lower().replace(' ', '-'),
            "name": category,
            "slug": category.lower().replace(' ', '-'),
            "productCount": len(product_ids)  # Count unique product IDs
        })
    
    return sorted(categories, key=lambda x: x['productCount'], reverse=True)

def generate_stats_data(products_data: List[Dict[str, Any]], categories_data: List[Dict[str, Any]]) -> Dict[str, Any]:
    """Generate statistics data"""
    print("Generating statistics data...")
    
    prices = [p['priceINR'] for p in products_data if p['priceINR'] > 0]
    metal_types = list(set(p['metalType'] for p in products_data if p['metalType']))
    metal_karats = list(set(p['metalKarat'] for p in products_data if p['metalKarat']))
    
    stats = {
        "totalProducts": len(products_data),
        "totalCategories": len(categories_data),
        "priceRange": {
            "min": min(prices) if prices else 0,
            "max": max(prices) if prices else 0,
            "average": sum(prices) / len(prices) if prices else 0
        },
        "metalTypes": sorted(metal_types),
        "metalKarats": sorted(metal_karats),
        "categories": [cat['name'] for cat in categories_data]
    }
    
    return stats

def save_website_data(products_data: List[Dict[str, Any]], categories_data: List[Dict[str, Any]], stats_data: Dict[str, Any]):
    """Save all data to website directory"""
    print("Saving website data files...")
    
    # Create data directory relative to project root
    base_dir = Path(__file__).resolve().parent.parent  # Go up to rareregalia root
    data_dir = base_dir / 'src' / 'data'
    data_dir.mkdir(parents=True, exist_ok=True)
    
    # Save products
    with open(data_dir / 'products.json', 'w', encoding='utf-8') as f:
        json.dump(products_data, f, indent=2, ensure_ascii=False)
    print(f"Saved {len(products_data)} products to products.json")
    
    # Save categories
    with open(data_dir / 'categories.json', 'w', encoding='utf-8') as f:
        json.dump(categories_data, f, indent=2, ensure_ascii=False)
    print(f"Saved {len(categories_data)} categories to categories.json")
    
    # Save stats
    with open(data_dir / 'stats.json', 'w', encoding='utf-8') as f:
        json.dump(stats_data, f, indent=2, ensure_ascii=False)
    print("Saved statistics to stats.json")

def main():
    """Main function to regenerate all website data"""
    print("=== Website Data Generator ===\n")
    
    try:
        # Load source data
        inventory_df, products_df, variants_df = load_source_data()
        
        # Generate products data
        products_data = generate_products_data(inventory_df, products_df, variants_df)
        
        # Generate categories and stats
        categories_data = generate_categories_data(products_data)
        stats_data = generate_stats_data(products_data, categories_data)
        
        # Save all data
        save_website_data(products_data, categories_data, stats_data)
        
        print(f"\n✅ Website data generation complete!")
        print(f"📊 Summary:")
        print(f"  - Products: {len(products_data)}")
        print(f"  - Categories: {len(categories_data)}")
        print(f"  - Price range: ₹{stats_data['priceRange']['min']:,.0f} - ₹{stats_data['priceRange']['max']:,.0f}")
        print(f"  - Average price: ₹{stats_data['priceRange']['average']:,.0f}")
        
        print(f"\nNext steps:")
        print(f"1. npm run dev  # (already in ecommerce-website directory)")
        print(f"2. Test the website with new data")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        raise

if __name__ == "__main__":
    main()