#!/usr/bin/env python3
"""
Copy Videos to Public Folder
Copies product videos from vendor-data to public/videos/products
"""

import shutil
from pathlib import Path

def copy_videos():
    """Copy all product videos to public folder"""
    # Get paths relative to project root
    base_dir = Path(__file__).resolve().parent.parent  # Go up to rareregalia root
    vendor_data_dir = base_dir / 'vendor-data'
    public_videos_dir = base_dir / 'public' / 'videos' / 'products'
    
    # Create public/videos/products directory if it doesn't exist
    public_videos_dir.mkdir(parents=True, exist_ok=True)
    
    print(f"Copying videos from {vendor_data_dir} to {public_videos_dir}...")
    
    # Find all mp4 files in vendor-data
    video_files = list(vendor_data_dir.rglob('*.mp4'))
    
    if not video_files:
        print("⚠️ No video files found in vendor-data")
        return
    
    copied_count = 0
    skipped_count = 0
    
    for video_file in video_files:
        # Extract product ID and variant from path
        # Example: vendor-data/Batch-1/0016/0016-White.mp4 -> 0016/0016-White.mp4
        parts = video_file.parts
        
        # Find the batch folder index
        batch_idx = None
        for i, part in enumerate(parts):
            if part.startswith('Batch-'):
                batch_idx = i
                break
        
        if batch_idx is None or batch_idx + 2 >= len(parts):
            print(f"⚠️ Skipping {video_file}: unexpected path structure")
            skipped_count += 1
            continue
        
        # Get product ID folder and video filename
        product_id = parts[batch_idx + 1]
        video_filename = parts[-1]
        
        # Create destination path: public/videos/products/0016/0016-White.mp4
        dest_folder = public_videos_dir / product_id
        dest_folder.mkdir(exist_ok=True)
        dest_path = dest_folder / video_filename
        
        # Copy the video file
        if not dest_path.exists() or video_file.stat().st_mtime > dest_path.stat().st_mtime:
            shutil.copy2(video_file, dest_path)
            copied_count += 1
        else:
            skipped_count += 1
    
    print(f"✅ Video copy complete!")
    print(f"   Copied: {copied_count} videos")
    print(f"   Skipped: {skipped_count} videos (already up to date)")
    print(f"   Total: {len(video_files)} videos")

if __name__ == '__main__':
    copy_videos()
