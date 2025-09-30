"""Test script to debug inventory generation"""
from pathlib import Path
import pandas as pd
import sys

# Add current dir to path
sys.path.insert(0, str(Path(__file__).parent))

try:
    from generate_inventory_master import build_master_dataframe
    
    print("[OK] Successfully imported build_master_dataframe")
    
    # Test with one batch
    print("\n[*] Testing with Batch-1...")
    df = build_master_dataframe("Batch-1")
    print(f"[OK] Batch-1: {len(df)} rows")
    if not df.empty:
        print(f"   Columns: {list(df.columns[:5])}")
    
    # Now try the full regeneration
    print("\n[*] Running full regeneration...")
    base_dir = Path(__file__).resolve().parent.parent  # Go up to rareregalia root
    vendor_dir = base_dir / "vendor-data"
    batch_dirs = sorted(p for p in vendor_dir.iterdir() if p.is_dir())
    
    frames = []
    processed_batches = []
    
    for batch_dir in batch_dirs:
        batch_name = batch_dir.name
        try:
            df = build_master_dataframe(batch_name)
            print(f"   {batch_name}: {len(df)} rows")
            if not df.empty:
                frames.append(df)
                processed_batches.append(batch_name)
        except Exception as e:
            print(f"   [ERROR] {batch_name}: {e}")
    
    if frames:
        combined = pd.concat(frames, ignore_index=True)
        output_path = base_dir / "inventory_master_all_batches.csv"
        combined.to_csv(output_path, index=False)
        print(f"\n[OK] Saved {len(combined)} rows from {len(processed_batches)} batches to {output_path}")
        print(f"   File size: {output_path.stat().st_size / 1024:.2f} KB")
    else:
        print("\n[ERROR] No data frames to combine!")
        
except Exception as e:
    print(f"[ERROR] Error: {e}")
    import traceback
    traceback.print_exc()
