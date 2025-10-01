# Model Images Update - Individual Product Pages

## Summary
Updated the product image display system to ensure that "Model" images are included and displayed on individual product pages alongside the standard detail images (R1-R4, W1-W4, Y1-Y4).

## Changes Made

### File: `src/utils/productVariants.ts`

#### Function: `getImagesForMetalType()`

**Previous Behavior:**
- Only filtered images by specific suffixes (R1-R4, W1-W4, Y1-Y4)
- Model images were only used as a fallback when NO specific images were found
- This meant Model images were excluded when standard product images existed

**Updated Behavior:**
- Filters images by specific suffixes (R1-R4, W1-W4, Y1-Y4) as before
- **NEW:** Additionally filters Model images based on the metal type color (Rose, White, Yellow)
- **NEW:** Combines both Model images and standard images together
- **NEW:** Model images are placed FIRST in the array for better visual presentation
- Fallback behavior remains the same for products with no images

**Implementation Details:**
```typescript
// Determine which color variant to look for in Model images
let modelColorKeyword = '';
if (metalType.includes('Rose')) {
  modelColorKeyword = 'Rose';
} else if (metalType.includes('White')) {
  modelColorKeyword = 'White';
} else if (metalType.includes('Yellow')) {
  modelColorKeyword = 'Yellow';
}

// Get Model images that match the metal type
const modelImages = allImages.filter(image => {
  const imageLower = image.toLowerCase();
  return imageLower.includes('model') && 
         (modelColorKeyword ? imageLower.includes(modelColorKeyword.toLowerCase()) : true);
});

// Combine filtered images with model images
// Put model images first for better display, followed by detail shots
const combinedImages = [...modelImages, ...filteredImages];
```

## Impact

### For Users:
- **Enhanced Product Viewing:** Users can now see Model images (products worn by models) alongside detail shots
- **Better Context:** Model images provide scale and context for how the jewelry looks when worn
- **Improved Gallery:** The image gallery on individual product pages now has more comprehensive media

### For Product Pages:
- Model images appear FIRST in the gallery, followed by detail shots
- All images are properly filtered by metal type (Rose Gold, White Gold, Yellow Gold)
- The `VariantImageGallery` component automatically displays all available images

## Example
For a product like "19007-Radiant-Model-Yellow.jpg":
- **Before:** Only showed Y1-Y4 images (if they existed)
- **After:** Shows the Model image first, then Y1-Y4 detail images

## Testing
To verify the changes:
1. Navigate to any individual product page (e.g., `/products/SR-19007`)
2. Check the image gallery
3. Verify that Model images appear in the gallery for the selected metal type
4. Switch between metal variants to ensure appropriate Model images are shown

## Files Modified
- `src/utils/productVariants.ts` - Updated `getImagesForMetalType()` function

## Related Components
- `src/components/products/VariantImageGallery.tsx` - Uses the updated function to display images
- `src/app/products/[id]/NewProductDetailClient.tsx` - Product detail page client component
- `src/app/products/[id]/page.tsx` - Product detail page server component
