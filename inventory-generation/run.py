#!/usr/bin/env python3
"""
Inventory and Website Data Generation - Main Script
Orchestrates the complete data generation pipeline from vendor data to website JSON

Usage:
    python run.py               # Full pipeline: generate inventory + populate names + generate website data
    python run.py --quick       # Quick: just regenerate website data (assumes inventory exists)
    python run.py --inventory   # Only generate inventory from vendor data
    python run.py --populate    # Only populate product names
    python run.py --website     # Only generate website data
"""

import subprocess
import sys
import argparse
from pathlib import Path

def run_command(cmd, description):
    """Run a command and handle errors"""
    print(f"\n{'='*70}")
    print(f"🔄 {description}")
    print(f"{'='*70}\n")
    
    result = subprocess.run(cmd, shell=True)
    
    if result.returncode != 0:
        print(f"\n❌ Error: {description} failed with code {result.returncode}")
        return False
    
    print(f"\n✅ {description} completed successfully!")
    return True

def run_inventory_generation():
    """Generate inventory master from vendor data"""
    return run_command(
        'python generate_inventory_master.py',
        'Step 1: Generating inventory from vendor data'
    )

def run_populate_names():
    """Populate product names and descriptions"""
    return run_command(
        'python populate_product_info.py',
        'Step 2: Populating product names and descriptions'
    )

def run_website_generation():
    """Generate website JSON data"""
    return run_command(
        'python generate_website_data.py',
        'Step 3: Generating website JSON data'
    )

def main():
    parser = argparse.ArgumentParser(
        description='Generate inventory and website data from vendor sources',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python run.py              # Full pipeline (all steps)
  python run.py --quick      # Quick regeneration (skip inventory generation)
  python run.py --inventory  # Only generate inventory
  python run.py --populate   # Only populate product names
  python run.py --website    # Only generate website data
        """
    )
    
    parser.add_argument('--quick', action='store_true',
                        help='Quick mode: skip inventory generation')
    parser.add_argument('--inventory', action='store_true',
                        help='Only generate inventory from vendor data')
    parser.add_argument('--populate', action='store_true',
                        help='Only populate product names')
    parser.add_argument('--website', action='store_true',
                        help='Only generate website data')
    
    args = parser.parse_args()
    
    # Change to inventory-generation directory
    script_dir = Path(__file__).parent
    import os
    os.chdir(script_dir)
    
    print("\n" + "="*70)
    print("🚀 RARE REGALIA DATA GENERATION PIPELINE")
    print("="*70)
    
    success = True
    
    # Determine which steps to run
    if args.inventory:
        success = run_inventory_generation()
    elif args.populate:
        success = run_populate_names()
    elif args.website:
        success = run_website_generation()
    elif args.quick:
        print("\n📦 Running quick regeneration (inventory + names assumed to exist)")
        success = run_website_generation()
    else:
        # Full pipeline
        print("\n📦 Running complete pipeline (all steps)")
        
        # Ask about inventory regeneration
        print("\n⚠️  WARNING: Regenerating inventory will process all vendor Excel files.")
        print("This should only be done if vendor data has changed.")
        response = input("\nRegenerate inventory from vendor data? (y/N): ")
        
        if response.lower() in ['y', 'yes']:
            if not run_inventory_generation():
                sys.exit(1)
        else:
            print("\n⏭️  Skipping inventory generation (using existing file)")
        
        # Always run populate and website generation
        if not run_populate_names():
            sys.exit(1)
        
        if not run_website_generation():
            sys.exit(1)
    
    if success:
        # Final summary
        print("\n" + "="*70)
        print("🎉 PIPELINE COMPLETED SUCCESSFULLY!")
        print("="*70)
        
        print("\n📊 Generated Files:")
        print("  ✅ inventory_master_all_batches.csv (57 columns, ~900 records)")
        print("  ✅ src/data/products.json (~900 products)")
        print("  ✅ src/data/categories.json (4 categories)")
        print("  ✅ src/data/stats.json (statistics)")
        
        print("\n🚀 Next Steps:")
        print("  cd ecommerce-website")
        print("  npm run dev")
        print("\n" + "="*70)
    else:
        print("\n❌ Pipeline failed. Please check the errors above.")
        sys.exit(1)

if __name__ == "__main__":
    main()
