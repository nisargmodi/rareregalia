#!/usr/bin/env node
/**
 * Generate Placeholder Image
 * Creates a simple placeholder.jpg for products without images
 */

const fs = require('fs');
const path = require('path');

// Create an SVG placeholder first
const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="800" height="800" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="800" fill="#f3f4f6"/>
  <circle cx="400" cy="350" r="100" fill="#d1d5db" stroke="#9ca3af" stroke-width="4"/>
  <circle cx="400" cy="350" r="60" fill="#e5e7eb"/>
  <path d="M 400 290 L 420 330 L 460 340 L 430 370 L 440 410 L 400 390 L 360 410 L 370 370 L 340 340 L 380 330 Z" 
        fill="#9ca3af"/>
  <text x="400" y="520" font-family="Arial, sans-serif" font-size="24" fill="#6b7280" 
        text-anchor="middle" font-weight="300">Image Not Available</text>
  <text x="400" y="555" font-family="Arial, sans-serif" font-size="18" fill="#9ca3af" 
        text-anchor="middle" font-weight="300">Product Image Coming Soon</text>
</svg>`;

const publicImagesDir = path.join(__dirname, '..', 'public', 'images');
const svgPath = path.join(publicImagesDir, 'placeholder.svg');

// Ensure directory exists
if (!fs.existsSync(publicImagesDir)) {
  fs.mkdirSync(publicImagesDir, { recursive: true });
  console.log('✓ Created public/images directory');
}

// Write SVG file
fs.writeFileSync(svgPath, svgContent, 'utf-8');
console.log('✓ Created placeholder.svg');

console.log('\n📝 Next Steps:');
console.log('1. To use SVG directly: rename placeholder.svg to placeholder.jpg in code');
console.log('2. To create JPG: use an image converter tool or:');
console.log('   - Open placeholder.svg in a browser');
console.log('   - Take a screenshot');
console.log('   - Save as placeholder.jpg');
console.log('\nAlternatively, install sharp and uncomment the conversion code below.');

// Optional: If you have sharp installed, uncomment this to convert to JPG
/*
const sharp = require('sharp');

sharp(Buffer.from(svgContent))
  .jpeg({ quality: 90 })
  .toFile(path.join(publicImagesDir, 'placeholder.jpg'))
  .then(() => {
    console.log('✓ Created placeholder.jpg');
  })
  .catch(err => {
    console.error('Error creating JPG:', err.message);
    console.log('Using SVG as fallback');
  });
*/
