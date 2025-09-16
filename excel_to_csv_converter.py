#!/usr/bin/env python3
"""
Excel to CSV Converter Script
Recursively finds all .xlsx files in the workspace and converts them to CSV format.
All CSV files are saved in a dedicated 'converted_csv_files' folder.
"""

import os
import pandas as pd
from pathlib import Path
import re

def sanitize_filename(filename):
    """Remove or replace invalid characters for filename"""
    # Replace spaces and special characters with underscores
    sanitized = re.sub(r'[<>:"/\\|?*\s]', '_', filename)
    # Remove multiple consecutive underscores
    sanitized = re.sub(r'_+', '_', sanitized)
    # Remove leading/trailing underscores
    sanitized = sanitized.strip('_')
    return sanitized

def convert_excel_to_csv(excel_file_path, output_dir):
    """Convert an Excel file to CSV format"""
    try:
        print(f"Processing: {excel_file_path}")
        
        # Read Excel file
        df = pd.read_excel(excel_file_path, engine='openpyxl')
        
        # Generate output filename
        excel_filename = Path(excel_file_path).stem
        sanitized_name = sanitize_filename(excel_filename)
        
        # Get relative path from workspace root to maintain some structure info
        workspace_root = Path(r'd:\rareregalia')
        relative_path = Path(excel_file_path).relative_to(workspace_root)
        
        # Create a descriptive filename that includes folder context
        folder_context = sanitized_name
        if len(relative_path.parts) > 1:
            # Include parent folder name for context
            parent_folder = sanitize_filename(relative_path.parts[-2])
            folder_context = f"{parent_folder}_{sanitized_name}"
        
        csv_filename = f"{folder_context}.csv"
        csv_path = output_dir / csv_filename
        
        # Handle duplicate filenames by adding a counter
        counter = 1
        original_csv_path = csv_path
        while csv_path.exists():
            name_part = original_csv_path.stem
            csv_path = output_dir / f"{name_part}_{counter}.csv"
            counter += 1
        
        # Save as CSV
        df.to_csv(csv_path, index=False, encoding='utf-8')
        print(f"  ✓ Converted to: {csv_path.name}")
        
        return True, str(csv_path)
        
    except Exception as e:
        print(f"  ✗ Error converting {excel_file_path}: {str(e)}")
        return False, str(e)

def main():
    """Main function to convert all Excel files to CSV"""
    workspace_root = Path(r'd:\rareregalia')
    output_dir = workspace_root / 'converted_csv_files'
    
    # Ensure output directory exists
    output_dir.mkdir(exist_ok=True)
    
    # Find all Excel files recursively
    excel_files = list(workspace_root.rglob('*.xlsx'))
    
    print(f"Found {len(excel_files)} Excel files to convert:")
    print("-" * 60)
    
    successful_conversions = 0
    failed_conversions = 0
    conversion_log = []
    
    for excel_file in excel_files:
        success, result = convert_excel_to_csv(excel_file, output_dir)
        if success:
            successful_conversions += 1
            conversion_log.append(f"✓ {excel_file.name} → {Path(result).name}")
        else:
            failed_conversions += 1
            conversion_log.append(f"✗ {excel_file.name} → Error: {result}")
    
    print("\n" + "=" * 60)
    print("CONVERSION SUMMARY")
    print("=" * 60)
    print(f"Total files processed: {len(excel_files)}")
    print(f"Successful conversions: {successful_conversions}")
    print(f"Failed conversions: {failed_conversions}")
    print(f"Output directory: {output_dir}")
    
    if conversion_log:
        print(f"\nDetailed log:")
        for log_entry in conversion_log:
            print(f"  {log_entry}")

if __name__ == "__main__":
    main()