import pandas as pd
import json
import os
import shutil
from pathlib import Path
import re

def process_inventory_data():
    """Process the CSV inventory data and convert it to JSON format for the website"""
    
    # Read the CSV file
    df = pd.read_csv('Complete_Product_Export_All_Variants.csv')
    
    # Clean column names (remove spaces)
    df.columns = df.columns.str.strip()
    
    products = []
    
    for index, row in df.iterrows():
        # Parse image URLs
        all_images = []
        if pd.notna(row['All_Images']):
            all_images = [img.strip() for img in str(row['All_Images']).split(';') if img.strip()]
        
        # Create product object
        product = {
            'id': str(row['SKU']).strip(),
            'sku': str(row['SKU']).strip(),
            'productId': str(row['Product_ID']).strip(),
            'variantId': int(row['Variant_ID']) if pd.notna(row['Variant_ID']) else 0,
            'name': str(row['Product_Name']).strip() if pd.notna(row['Product_Name']) else '',
            'variantName': str(row['Variant_Name']).strip() if pd.notna(row['Variant_Name']) else '',
            'category': str(row['Category']).strip() if pd.notna(row['Category']) else 'Uncategorized',
            'status': 'active' if str(row['Status']).strip().lower() == 'active' else 'inactive',
            'metalType': str(row['Metal_Type']).strip() if pd.notna(row['Metal_Type']) else '',
            'metalKarat': str(row['Metal_Karat']).strip() if pd.notna(row['Metal_Karat']) else '',
            'size': str(row['Size']).strip() if pd.notna(row['Size']) else 'Standard',
            'priceINR': float(row['Price_INR']) if pd.notna(row['Price_INR']) and row['Price_INR'] != '' else 0,
            'basePrice': float(row['Base_Price']) if pd.notna(row['Base_Price']) and row['Base_Price'] != '' else None,
            'featured': bool(row['Featured']) if pd.notna(row['Featured']) else False,
            'stockQuantity': int(row['Stock_Quantity']) if pd.notna(row['Stock_Quantity']) else 0,
            'goldWeight': float(row['Gold_Weight_Grams']) if pd.notna(row['Gold_Weight_Grams']) else 0,
            'goldPurity': str(row['Gold_Purity']).strip() if pd.notna(row['Gold_Purity']) else '',
            'goldWeightVendor': float(row['Gold_Weight_Vendor']) if pd.notna(row['Gold_Weight_Vendor']) else 0,
            'diamondWeight': float(row['Diamond_Weight_Carats']) if pd.notna(row['Diamond_Weight_Carats']) else 0,
            'diamondWeightVendor': float(row['Diamond_Weight_Vendor']) if pd.notna(row['Diamond_Weight_Vendor']) else 0,
            'diamondCount': int(row['Diamond_Count_Total']) if pd.notna(row['Diamond_Count_Total']) else 0,
            'diamondCountOther': int(row['Diamond_Count_Other']) if pd.notna(row['Diamond_Count_Other']) else 0,
            'diamondShapes': str(row['Diamond_Shapes']).strip() if pd.notna(row['Diamond_Shapes']) else '',
            'diamondSizes': str(row['Diamond_Sizes_MM']).strip() if pd.notna(row['Diamond_Sizes_MM']) else '',
            'diamondCuts': str(row['Diamond_Cuts']).strip() if pd.notna(row['Diamond_Cuts']) else '',
            'diamondQuality': str(row['Diamond_Quality_Grades']).strip() if pd.notna(row['Diamond_Quality_Grades']) else '',
            'diamondShapeDetails': str(row['Diamond_Shape_Details']).strip() if pd.notna(row['Diamond_Shape_Details']) else '',
            'makingCharges': float(row['Making_Charges']) if pd.notna(row['Making_Charges']) and row['Making_Charges'] != '' else None,
            'primaryImage': str(row['Primary_Image_URL']).strip() if pd.notna(row['Primary_Image_URL']) else '',
            'allImages': all_images,
            'totalImages': int(row['Total_Images']) if pd.notna(row['Total_Images']) else len(all_images),
            'styleNumber': str(row['Style_Number']).strip() if pd.notna(row['Style_Number']) else '',
            'description': str(row['Product_Description']).strip() if pd.notna(row['Product_Description']) else '',
            'createdDate': str(row['Created_Date']).strip() if pd.notna(row['Created_Date']) else '',
            'totalSpecs': int(row['Total_Specs_Available']) if pd.notna(row['Total_Specs_Available']) else 0,
        }
        
        products.append(product)
    
    # Create the ecommerce website data directory
    data_dir = Path('ecommerce-website/src/data')
    data_dir.mkdir(parents=True, exist_ok=True)
    
    # Save products as JSON
    with open(data_dir / 'products.json', 'w', encoding='utf-8') as f:
        json.dump(products, f, indent=2, ensure_ascii=False)
    
    print(f"Processed {len(products)} products")
    
    # Generate categories
    categories = {}
    for product in products:
        cat = product['category']
        if cat not in categories:
            categories[cat] = {
                'id': cat.lower().replace(' ', '-').replace(',', '').replace('>', '-'),
                'name': cat,
                'slug': cat.lower().replace(' ', '-').replace(',', '').replace('>', '-'),
                'productCount': 0
            }
        categories[cat]['productCount'] += 1
    
    categories_list = list(categories.values())
    
    # Save categories as JSON
    with open(data_dir / 'categories.json', 'w', encoding='utf-8') as f:
        json.dump(categories_list, f, indent=2, ensure_ascii=False)
    
    print(f"Generated {len(categories_list)} categories")
    
    # Generate summary statistics
    stats = {
        'totalProducts': len(products),
        'totalCategories': len(categories_list),
        'priceRange': {
            'min': min([p['priceINR'] for p in products if p['priceINR'] > 0], default=0),
            'max': max([p['priceINR'] for p in products], default=0),
            'average': sum([p['priceINR'] for p in products if p['priceINR'] > 0]) / len([p for p in products if p['priceINR'] > 0]) if len([p for p in products if p['priceINR'] > 0]) > 0 else 0
        },
        'metalTypes': list(set([p['metalType'] for p in products if p['metalType']])),
        'metalKarats': list(set([p['metalKarat'] for p in products if p['metalKarat']])),
        'categories': [cat['name'] for cat in categories_list]
    }
    
    # Save stats as JSON
    with open(data_dir / 'stats.json', 'w', encoding='utf-8') as f:
        json.dump(stats, f, indent=2, ensure_ascii=False)
    
    print("Generated statistics:")
    print(f"  - Total products: {stats['totalProducts']}")
    print(f"  - Price range: ₹{stats['priceRange']['min']:,.0f} - ₹{stats['priceRange']['max']:,.0f}")
    print(f"  - Average price: ₹{stats['priceRange']['average']:,.0f}")
    print(f"  - Metal types: {', '.join(stats['metalTypes'])}")
    print(f"  - Categories: {', '.join(stats['categories'])}")
    
    return products, categories_list, stats

def copy_vendor_images():
    """Copy and organize vendor images for the website"""
    
    print("\\nProcessing vendor images...")
    
    # Create images directory
    images_dir = Path('ecommerce-website/public/images')
    images_dir.mkdir(parents=True, exist_ok=True)
    
    products_images_dir = images_dir / 'products'
    products_images_dir.mkdir(exist_ok=True)
    
    vendor_data_path = Path('vendor-data/18-06-2025_Rare Regalia_Jayesh ji')
    
    if not vendor_data_path.exists():
        print(f"Vendor data path not found: {vendor_data_path}")
        return
    
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
            product_images_folder = products_images_dir / product_id
            product_images_folder.mkdir(exist_ok=True)
            
            # Copy all image files
            for image_file in product_folder.glob('*'):
                if image_file.suffix.lower() in ['.jpg', '.jpeg', '.png', '.webp']:
                    dest_path = product_images_folder / image_file.name
                    try:
                        shutil.copy2(image_file, dest_path)
                        copied_count += 1
                    except Exception as e:
                        print(f"Error copying {image_file}: {e}")
    
    print(f"Copied {copied_count} images to website directory")

def generate_api_routes():
    """Generate Next.js API routes for the website"""
    
    api_dir = Path('ecommerce-website/src/app/api')
    api_dir.mkdir(parents=True, exist_ok=True)
    
    # Products API route
    products_api_dir = api_dir / 'products'
    products_api_dir.mkdir(exist_ok=True)
    
    products_api_content = '''import { NextRequest, NextResponse } from 'next/server';
import products from '@/data/products.json';
import { Product } from '@/types';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  const category = searchParams.get('category');
  const metalType = searchParams.get('metalType');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const search = searchParams.get('search');
  const limit = searchParams.get('limit');
  const offset = searchParams.get('offset');
  
  let filteredProducts: Product[] = products;
  
  // Apply filters
  if (category) {
    filteredProducts = filteredProducts.filter(p => 
      p.category.toLowerCase().includes(category.toLowerCase())
    );
  }
  
  if (metalType) {
    filteredProducts = filteredProducts.filter(p => 
      p.metalType.toLowerCase() === metalType.toLowerCase()
    );
  }
  
  if (minPrice) {
    filteredProducts = filteredProducts.filter(p => p.priceINR >= parseInt(minPrice));
  }
  
  if (maxPrice) {
    filteredProducts = filteredProducts.filter(p => p.priceINR <= parseInt(maxPrice));
  }
  
  if (search) {
    const searchLower = search.toLowerCase();
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(searchLower) ||
      p.category.toLowerCase().includes(searchLower) ||
      p.metalType.toLowerCase().includes(searchLower)
    );
  }
  
  // Apply pagination
  const totalCount = filteredProducts.length;
  if (limit) {
    const limitNum = parseInt(limit);
    const offsetNum = offset ? parseInt(offset) : 0;
    filteredProducts = filteredProducts.slice(offsetNum, offsetNum + limitNum);
  }
  
  return NextResponse.json({
    products: filteredProducts,
    totalCount,
    hasMore: limit ? (parseInt(offset || '0') + parseInt(limit)) < totalCount : false
  });
}'''
    
    with open(products_api_dir / 'route.ts', 'w', encoding='utf-8') as f:
        f.write(products_api_content)
    
    # Categories API route
    categories_api_dir = api_dir / 'categories'
    categories_api_dir.mkdir(exist_ok=True)
    
    categories_api_content = '''import { NextResponse } from 'next/server';
import categories from '@/data/categories.json';

export async function GET() {
  return NextResponse.json(categories);
}'''
    
    with open(categories_api_dir / 'route.ts', 'w', encoding='utf-8') as f:
        f.write(categories_api_content)
    
    print("Generated API routes")

if __name__ == "__main__":
    print("=== Rare Regalia Ecommerce Data Processor ===\\n")
    
    # Process the inventory data
    products, categories, stats = process_inventory_data()
    
    # Copy vendor images
    copy_vendor_images()
    
    # Generate API routes
    generate_api_routes()
    
    print(f"\\n✅ Data processing complete!")
    print(f"✅ Website structure created in: ecommerce-website/")
    print(f"✅ {len(products)} products processed")
    print(f"✅ {len(categories)} categories created")
    print(f"\\nNext steps:")
    print(f"1. cd ecommerce-website")
    print(f"2. npm install")
    print(f"3. npm run dev")
    print(f"4. Open http://localhost:3000")