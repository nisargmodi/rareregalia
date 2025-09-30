#!/usr/bin/env python3
"""
Generate Inventory Master from Vendor Data
Processes Excel files and media files from vendor-data folders to create a master inventory CSV
"""

import pandas as pd
import re
from pathlib import Path
from typing import Dict, List, Optional, Tuple

def extract_sku_from_style(style_no: str) -> str:
    """Extract numeric SKU from style number like 'DOC - SR 0016' -> '0016' or 'ER-17001' -> '17001'"""
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
            return match.group(1)
    
    return ""

def extract_size_from_style(style_no: str) -> str:
    """Extract size from style number like 'S R-19001(0.50)' -> '0.50'"""
    if pd.isna(style_no) or not style_no:
        return ""
    
    style_str = str(style_no).strip()
    
    # Look for size in parentheses
    match = re.search(r'\((\d+\.?\d*)\)', style_str)
    if match:
        return match.group(1)
    
    return ""

def parse_diamond_specs(row: pd.Series) -> Tuple[float, int, List[Dict]]:
    """
    Parse diamond specifications from Excel row
    Returns: (total_weight, num_types, diamond_details_list)
    """
    diamond_weight = 0.0
    diamond_types = []
    
    # Column patterns for different diamond shapes
    shape_columns = [
        'Round Dimond (mm)', 'Round Diamond (mm)', 'Cushion (mm)', 'Pear (mm)', 
        'Emerald (mm)', 'Princess (mm)', 'Oval (mm)', 'Trillion (mm)', 
        'Baguette (mm)', 'Marquise (mm)', 'Heart (mm)', 'Rose Cut (mm)'
    ]
    
    # Try to get total diamond weight - try multiple column name patterns
    weight_cols = [
        'Diamond wt (Ct)', 'Diamond wt(Ct)', 'Total Diamond wt (Ct)',
        'Full Bracelet Diamond wt (Ct)', 'Diamond wt (ct)', 'Diamond Weight (Ct)'
    ]
    for col in weight_cols:
        # Try exact match and partial match
        for row_col in row.index:
            row_col_clean = str(row_col).replace('\n', ' ').strip()
            if col.lower() in row_col_clean.lower() and pd.notna(row[row_col]):
                try:
                    diamond_weight = float(row[row_col])
                    break
                except (ValueError, TypeError):
                    pass
        if diamond_weight > 0:
            break
    
    # Parse each diamond type
    for shape_col in shape_columns:
        if shape_col not in row.index:
            continue
        
        shape_name = shape_col.replace(' (mm)', '').replace(' Dimond', '').strip()
        
        # Get dimensions and count
        dimensions = row[shape_col] if pd.notna(row[shape_col]) else None
        
        # Find corresponding count column (usually next column or named 'Count', 'Count.1', etc.)
        count_col = None
        col_index = list(row.index).index(shape_col)
        
        # Check next column for count
        if col_index + 1 < len(row.index):
            next_col = row.index[col_index + 1]
            if 'Count' in next_col or next_col == 'Count':
                count_col = next_col
        
        count = 0
        if count_col and pd.notna(row[count_col]):
            try:
                count = int(float(row[count_col]))
            except (ValueError, TypeError):
                pass
        
        if dimensions and count > 0:
            diamond_types.append({
                'shape': shape_name,
                'dimensions': str(dimensions).strip(),
                'count': count
            })
    
    return diamond_weight, len(diamond_types), diamond_types

def get_media_files(sku: str, batch_path: Path) -> Tuple[List[str], List[str], Dict[str, List[str]]]:
    """
    Get all media files for a SKU
    Returns: (all_images, all_videos, images_by_variant)
    """
    all_images = []
    all_videos = []
    images_by_variant = {'White': [], 'Rose': [], 'Yellow': []}
    
    # Extract batch number from path (e.g., "Batch-16" -> "16")
    batch_num = re.search(r'Batch-(\d+)', str(batch_path))
    batch_prefix = batch_num.group(1) if batch_num else ""
    
    # Try multiple directory patterns - order matters!
    possible_dirs = [
        batch_path / sku,                     # Direct: "0016" or "2201"
    ]
    
    # Try batch-prefixed versions with different padding
    if batch_prefix and len(sku) <= 3:
        # For short SKUs like "35", try "16035" (batch + zero-padded SKU)
        possible_dirs.append(batch_path / f"{batch_prefix}{sku.zfill(3)}")
        # Also try without padding: "1635"
        possible_dirs.append(batch_path / f"{batch_prefix}{sku}")
    elif batch_prefix:
        possible_dirs.append(batch_path / f"{batch_prefix}{sku}")
    
    # Add prefix patterns
    possible_dirs.extend([
        batch_path / f"SR-{sku}",           # SR prefix: "SR-19001"
        batch_path / f"ER-{sku}",           # ER prefix: "ER-17001"  
        batch_path / f"TB-{sku}",           # TB prefix: "TB-14078"
        batch_path / f"PD-{sku}",           # PD prefix
        batch_path / f"R-{sku}",            # R prefix: "R-2201"
        batch_path / f"S R-{sku}",          # S R prefix with space
    ])
    
    # Also check if the sku itself might be a full code like "R-2201"
    # and we should try just the numeric part
    if '-' in sku:
        # Extract just the numeric part: "R-2201" -> "2201"
        numeric_only = re.search(r'(\d+)$', sku)
        if numeric_only:
            num_sku = numeric_only.group(1)
            possible_dirs.insert(0, batch_path / num_sku)
            # Also try batch-prefixed version
            if batch_prefix:
                possible_dirs.insert(1, batch_path / f"{batch_prefix}{num_sku}")
    
    sku_dir = None
    for possible_dir in possible_dirs:
        if possible_dir.exists():
            sku_dir = possible_dir
            break
    
    if not sku_dir:
        return all_images, all_videos, images_by_variant
    
    # Get all files
    for file_path in sorted(sku_dir.iterdir()):
        if file_path.is_file():
            # Calculate path relative to the rareregalia root directory
            base_dir = Path(__file__).resolve().parent.parent
            try:
                rel_path = str(file_path.relative_to(base_dir)).replace('\\', '\\')
            except ValueError:
                # If relative path fails, just use the full path
                rel_path = str(file_path).replace('\\', '\\')
            
            if file_path.suffix.lower() in ['.jpg', '.jpeg', '.png']:
                all_images.append(rel_path)
                
                # Categorize by variant
                filename = file_path.stem
                if '-W' in filename or 'White' in filename:
                    images_by_variant['White'].append(rel_path)
                elif '-R' in filename or 'Rose' in filename:
                    images_by_variant['Rose'].append(rel_path)
                elif '-Y' in filename or 'Yellow' in filename:
                    images_by_variant['Yellow'].append(rel_path)
                    
            elif file_path.suffix.lower() in ['.mp4', '.mov', '.avi']:
                all_videos.append(rel_path)
    
    return all_images, all_videos, images_by_variant

def process_excel_file(excel_path: Path, batch_name: str) -> pd.DataFrame:
    """
    Process a single Excel file and extract product data
    """
    # Read Excel file
    try:
        df = pd.read_excel(excel_path)
    except Exception as e:
        print(f"Error reading {excel_path}: {e}")
        return pd.DataFrame()
    
    # Clean column names (remove newlines, extra spaces)
    df.columns = [str(col).replace('\n', ' ').strip() for col in df.columns]
    
    # Find style number column - try multiple patterns
    style_col = None
    for col in df.columns:
        col_lower = str(col).lower()
        # Accept "Style no", "Style code", "SKU Code", "SKU no"
        if ('style' in col_lower or 'sku' in col_lower) and \
           ('no' in col_lower or 'code' in col_lower):
            style_col = col
            break
    
    if not style_col:
        print(f"Warning: No style column found in {excel_path}")
        print(f"Available columns: {list(df.columns[:5])}")
        return pd.DataFrame()
    
    # Find gold weight column - try multiple patterns
    gold_col = None
    preferred_gold_col = None
    
    for col in df.columns:
        col_str = str(col).lower()
        # Try different patterns
        if ('gold' in col_str and 'wt' in col_str) or \
           ('gold' in col_str and 'weight' in col_str) or \
           ('18kt' in col_str and 'wt' in col_str):
            # Prioritize certain column types
            if 'final' in col_str or 'est' in col_str:
                preferred_gold_col = col
                break
            elif 'full' in col_str or 'bracelet' in col_str:
                preferred_gold_col = col  # Don't break, keep looking for "final"
            elif gold_col is None and 'single' not in col_str:
                gold_col = col
    
    # Use preferred if found, otherwise use gold_col
    gold_col = preferred_gold_col if preferred_gold_col else gold_col
    
    records = []
    batch_path = excel_path.parent
    
    # Special handling for Batch-19: group by base SKU (without size)
    is_batch_19 = batch_name == 'Batch-19'
    
    if is_batch_19:
        # For Batch-19, group all size variants together
        sku_groups = {}
        
        for idx, row in df.iterrows():
            style_no = row[style_col]
            
            # Skip empty rows
            if pd.isna(style_no) or str(style_no).strip() == '':
                continue
            
            # Extract base SKU (without size)
            base_sku = extract_sku_from_style(style_no)
            if not base_sku:
                continue
            
            # Get size from style
            size = extract_size_from_style(style_no)
            
            # Group by base SKU
            if base_sku not in sku_groups:
                sku_groups[base_sku] = {
                    'style_base': style_no,  # Use first occurrence as base style
                    'gold_weight': row[gold_col] if gold_col and pd.notna(row[gold_col]) else 0,
                    'sizes': {},
                    'diamond_rows': []
                }
            
            # Store size-specific data
            if size:
                sku_groups[base_sku]['sizes'][size] = row
            sku_groups[base_sku]['diamond_rows'].append(row)
        
        # Process each SKU group
        for base_sku, group_data in sku_groups.items():
            records.extend(create_variant_records(
                batch_name, group_data['style_base'], group_data['gold_weight'],
                group_data['diamond_rows'], batch_path, size_data=group_data['sizes']
            ))
    else:
        # Original logic for other batches: group consecutive rows by style number
        current_style = None
        current_gold_weight = None
        current_diamond_rows = []
        
        for idx, row in df.iterrows():
            style_no = row[style_col]
            
            # Skip empty rows
            if pd.isna(style_no) or str(style_no).strip() == '':
                # This might be a continuation row for diamond details
                if current_style:
                    current_diamond_rows.append(row)
                continue
            
            # Process previous style if we have one
            if current_style and current_gold_weight:
                records.extend(create_variant_records(
                    batch_name, current_style, current_gold_weight,
                    current_diamond_rows, batch_path
                ))
            
            # Start new style
            current_style = style_no
            current_gold_weight = row[gold_col] if gold_col and pd.notna(row[gold_col]) else 0
            current_diamond_rows = [row]
        
        # Process last style
        if current_style and current_gold_weight:
            records.extend(create_variant_records(
                batch_name, current_style, current_gold_weight,
                current_diamond_rows, batch_path
            ))
    
    return pd.DataFrame(records)

def create_variant_records(batch_name: str, style_no: str, gold_weight: float,
                          diamond_rows: List[pd.Series], batch_path: Path, 
                          size_data: Optional[Dict] = None) -> List[Dict]:
    """
    Create variant records (White, Rose, Yellow) for a single style
    For Batch-19, also create size variants (0.50, 1.00, 1.50, 2.00 ct) using size_data
    """
    sku = extract_sku_from_style(style_no)
    if not sku:
        return []
    
    # Get media files FIRST - skip products without media
    all_images, all_videos, images_by_variant = get_media_files(sku, batch_path)
    
    # Skip products that have no media files at all
    if not all_images and not all_videos:
        return []
    
    # Parse diamond specs from all rows
    total_diamond_weight = 0
    all_diamond_types = []
    
    for row in diamond_rows:
        weight, num_types, diamond_details = parse_diamond_specs(row)
        if weight > 0:
            total_diamond_weight = max(total_diamond_weight, weight)
        all_diamond_types.extend(diamond_details)
    
    # Remove duplicates while preserving order
    seen = set()
    unique_diamond_types = []
    for dt in all_diamond_types:
        key = (dt['shape'], dt['dimensions'], dt['count'])
        if key not in seen:
            seen.add(key)
            unique_diamond_types.append(dt)
    
    # Determine size variants
    if size_data and batch_name == 'Batch-19':
        # Use the actual sizes from the Excel data
        size_variants = sorted(size_data.keys())
    else:
        size_variants = ['']
    
    # Create variant records
    variants = []
    variant_colors = ['White', 'Rose', 'Yellow']
    variant_suffixes = ['W', 'RG', 'Y']
    
    for color, suffix in zip(variant_colors, variant_suffixes):
        # Get variant-specific images
        variant_imgs = images_by_variant.get(color, [])
        
        # Get variant-specific videos
        variant_vids = [v for v in all_videos if color in v]
        
        # Create records for each size variant
        for size in size_variants:
            # Adjust product_id to include size if applicable
            if size:
                product_id = f"{sku}-{suffix}-{size}"
            else:
                product_id = f"{sku}-{suffix}"
            
            # Create record
            record = {
                'batch': batch_name,
                'style_no': style_no,
                'sku_numeric': sku,
                'product_id': product_id,
                'gold_weight_gms': gold_weight,
                'diamond_weight_ct': total_diamond_weight,
                'diamond_type_total': len(unique_diamond_types),
                'variant_color': color,
                'variant_size': size,
                'variant_images': ' | '.join(variant_imgs),
                'variant_image_count': len(variant_imgs),
                'variant_videos': ' | '.join(variant_vids),
                'variant_video_count': len(variant_vids),
                'variant_total': 3 * len(size_variants),  # 3 colors × number of sizes
                'image_file_count': len(all_images),
                'video_file_count': len(all_videos),
            }
            
            # Add diamond type details (up to 13 types)
            for i in range(13):
                if i < len(unique_diamond_types):
                    dt = unique_diamond_types[i]
                    record[f'diamond_type{i+1}'] = dt['shape']
                    record[f'diamond_type{i+1}_count'] = dt['count']
                    record[f'diamond_type{i+1}_dimensions'] = dt['dimensions']
                else:
                    record[f'diamond_type{i+1}'] = ''
                    record[f'diamond_type{i+1}_count'] = ''
                    record[f'diamond_type{i+1}_dimensions'] = ''
            
            variants.append(record)
    
    return variants

def build_master_dataframe(batch_name: str) -> pd.DataFrame:
    """
    Main function to build master dataframe for a single batch
    Called by test_inventory_gen.py
    """
    base_dir = Path(__file__).resolve().parent.parent  # Go up to rareregalia root
    vendor_dir = base_dir / "vendor-data"
    batch_path = vendor_dir / batch_name
    
    if not batch_path.exists():
        print(f"Warning: Batch path not found: {batch_path}")
        return pd.DataFrame()
    
    # Find Excel file in batch directory
    excel_files = list(batch_path.glob("*.xlsx")) + list(batch_path.glob("*.xls"))
    
    if not excel_files:
        print(f"Warning: No Excel files found in {batch_path}")
        return pd.DataFrame()
    
    # Process first Excel file found
    excel_path = excel_files[0]
    print(f"Processing: {excel_path.name}")
    
    df = process_excel_file(excel_path, batch_name)
    
    return df

if __name__ == "__main__":
    # Test with one batch
    print("Testing with Batch-1...")
    df = build_master_dataframe("Batch-1")
    print(f"Generated {len(df)} records")
    if not df.empty:
        print(f"Columns: {list(df.columns)}")
        print("\nFirst record:")
        print(df.iloc[0].to_dict())
