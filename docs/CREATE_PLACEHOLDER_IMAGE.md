# Creating Placeholder Image

## Quick Solution: Use the SVG Generator

Run the script to create a placeholder image:

```bash
node scripts/generate-placeholder.js
```

This will create `public/images/placeholder.svg`.

## Option 1: Use SVG Directly (Recommended)

Browsers support SVG images perfectly. Simply rename the file:

```bash
# Windows PowerShell
Move-Item public/images/placeholder.svg public/images/placeholder.jpg

# Or just use .svg in code
# SVG works great and is smaller in size!
```

## Option 2: Create JPG Manually

1. Open `public/images/placeholder.svg` in a browser
2. Take a screenshot (800x800px)
3. Save as `public/images/placeholder.jpg`

## Option 3: Use Online Converter

1. Go to https://cloudconvert.com/svg-to-jpg
2. Upload `public/images/placeholder.svg`
3. Download converted `placeholder.jpg`
4. Place in `public/images/`

## Option 4: Use Sharp (Node.js)

Install sharp and convert programmatically:

```bash
npm install --save-dev sharp
```

Then uncomment the sharp conversion code in `scripts/generate-placeholder.js` and run:

```bash
node scripts/generate-placeholder.js
```

## Option 5: Simple Gray Placeholder

If you just need something quick, create a 1x1 gray pixel and let CSS scale it:

```bash
# Create a simple gray image using ImageMagick (if installed)
magick -size 800x800 xc:#f3f4f6 public/images/placeholder.jpg
```

## Current Status

After running the generator script:
- ✓ `placeholder.svg` exists
- ⚠️ `placeholder.jpg` needs to be created (use one of the options above)

## Testing

After creating the image, run:

```bash
npm run test:images
```

Or manually verify:
1. Start the dev server: `npm run dev`
2. Visit: http://localhost:3000/images/placeholder.jpg
3. Should see the placeholder image (not 404)
