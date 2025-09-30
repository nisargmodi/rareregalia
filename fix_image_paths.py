#!/usr/bin/env python3
"""
Fix image paths in products.json to use local vendor images instead of external URLs
"""

import json
import os
from pathlib import Path
import re

def find_local_images_for_sku(sku, vendor_data_path):
    """Find local images for a given SKU in the vendor data"""
    
    # Clean SKU to match folder names (remove variant suffixes)
    base_sku = sku.split('-')[0]  # Get base SKU like "0111" from "0111-Ro-1"
    
    # Also try with prefix removal for special cases
    clean_sku = base_sku
    if base_sku.startswith('SR-'):
        clean_sku = base_sku[3:]  # Remove SR- prefix
    elif base_sku.startswith('R-'):
        clean_sku = base_sku[2:]  # Remove R- prefix
    
    possible_skus = [base_sku, clean_sku]
    
    # Search in all batch folders
    for batch_folder in vendor_data_path.glob('Batch-*'):
        if not batch_folder.is_dir():
            continue
            
        for sku_candidate in possible_skus:
            # Look for exact match
            product_folder = batch_folder / sku_candidate
            if product_folder.exists() and product_folder.is_dir():
                return find_images_in_folder(product_folder, sku_candidate)
            
            # Look for folders starting with the SKU
            for product_folder in batch_folder.glob(f'{sku_candidate}*'):
                if product_folder.is_dir():
                    return find_images_in_folder(product_folder, sku_candidate)
    
    return []

def find_images_in_folder(product_folder, sku):
    """Find all images in a product folder and return local paths"""
    images = []
    
    image_extensions = ['.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG', '.PNG', '.WEBP']
    
    for image_file in product_folder.iterdir():
        if image_file.suffix in image_extensions:
            # Create relative path from public directory
            relative_path = f"/images/products/{sku}/{image_file.name}"
            images.append(relative_path)
    
    # Sort images to have a consistent order (render images first)
    def sort_key(img_path):
        filename = Path(img_path).name.lower()
        if 'render' in filename or 'r1' in filename:
            return 0
        elif 'r2' in filename:
            return 1
        elif 'r3' in filename:
            return 2
        elif 'r4' in filename:
            return 3
        elif 'model' in filename:
            return 4
        elif 'details' in filename:
            return 5
        else:
            return 6
    
    return sorted(images, key=sort_key)

def copy_images_to_public(vendor_data_path, website_path):
    """Copy vendor images to website public directory organized by SKU"""
    
    print("Copying vendor images to website...")
    
    # Create images directory
    images_dir = website_path / 'public' / 'images' / 'products'
    images_dir.mkdir(parents=True, exist_ok=True)
    
    copied_count = 0
    
    # Process each batch folder
    for batch_folder in vendor_data_path.glob('Batch-*'):
        if not batch_folder.is_dir():
            continue
            
        print(f"Processing {batch_folder.name}...")
        
        # Process each product folder within the batch
        for product_folder in batch_folder.glob('*/'):
            if not product_folder.is_dir() or product_folder.name.endswith('.xlsx'):
                continue
                
            product_id = product_folder.name
            
            # Create destination folder
            dest_folder = images_dir / product_id
            dest_folder.mkdir(exist_ok=True)
            
            # Copy all image files
            image_extensions = ['.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG', '.PNG', '.WEBP']
            for image_file in product_folder.iterdir():
                if image_file.suffix in image_extensions:
                    dest_path = dest_folder / image_file.name
                    try:
                        if not dest_path.exists():  # Only copy if not already exists
                            import shutil
                            shutil.copy2(image_file, dest_path)
                            copied_count += 1
                    except Exception as e:
                        print(f"Error copying {image_file}: {e}")
    
    print(f"Copied {copied_count} images to website directory")
    return copied_count

def fix_product_image_paths():
    """Fix image paths in products.json to use local vendor images"""
    
    # Paths
    vendor_data_path = Path('vendor-data')
    website_path = Path('ecommerce-website')
    products_file = website_path / 'src' / 'data' / 'products.json'
    
    if not vendor_data_path.exists():
        print(f"Vendor data path not found: {vendor_data_path}")
        return False
    
    if not products_file.exists():
        print(f"Products file not found: {products_file}")
        return False
    
    # Copy images first
    copy_images_to_public(vendor_data_path, website_path)
    
    # Load products data
    with open(products_file, 'r', encoding='utf-8') as f:
        products = json.load(f)
    
    print(f"Processing {len(products)} products...")
    
    updated_count = 0
    
    for product in products:
        sku = product.get('sku', '')
        if not sku:
            continue
        
        # Find local images for this SKU
        local_images = find_local_images_for_sku(sku, vendor_data_path)
        
        if local_images:
            # Update product with local image paths
            product['primaryImage'] = local_images[0]  # First image as primary
            product['allImages'] = local_images
            product['totalImages'] = len(local_images)
            updated_count += 1
        else:
            print(f"No local images found for SKU: {sku}")
    
    # Save updated products data
    backup_file = products_file.with_suffix('.backup.json')
    import shutil
    shutil.copy2(products_file, backup_file)
    print(f"Created backup: {backup_file}")
    
    with open(products_file, 'w', encoding='utf-8') as f:
        json.dump(products, f, indent=2, ensure_ascii=False)
    
    print(f"Updated {updated_count} products with local image paths")
    print(f"Products data saved to: {products_file}")
    
    return True

if __name__ == "__main__":
    success = fix_product_image_paths()
    if success:
        print("\n✅ Successfully fixed image paths!")
        print("The website will now use local vendor images instead of external URLs.")
    else:
        print("\n❌ Failed to fix image paths. Please check the error messages above.")