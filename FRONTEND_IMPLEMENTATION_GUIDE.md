# Frontend Implementation Examples

## 🚀 Complete Code Examples for Database Integration

### **React Component Examples**

#### **1. Product Page Component**
```jsx
// ProductPage.jsx
import React, { useState, useEffect } from 'react';

const ProductPage = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [images, setImages] = useState([]);
  const [specs, setSpecs] = useState([]);

  // Load product data
  useEffect(() => {
    loadProductData();
  }, [productId]);

  const loadProductData = async () => {
    try {
      // 1. Get main product
      const productRes = await fetch(`/api/products/${productId}`);
      const productData = await productRes.json();
      setProduct(productData);

      // 2. Get variants
      const variantsRes = await fetch(`/api/products/${productId}/variants`);
      const variantsData = await variantsRes.json();
      setVariants(variantsData);

      // 3. Set default variant (first one)
      if (variantsData.length > 0) {
        setSelectedVariant(variantsData[0]);
        loadVariantData(variantsData[0].variant_id);
      }
    } catch (error) {
      console.error('Error loading product:', error);
    }
  };

  const loadVariantData = async (variantId) => {
    try {
      // Load images for this variant
      const imagesRes = await fetch(`/api/variants/${variantId}/images`);
      const imagesData = await imagesRes.json();
      setImages(imagesData);

      // Load specifications
      const specsRes = await fetch(`/api/variants/${variantId}/specs`);
      const specsData = await specsRes.json();
      setSpecs(specsData);
    } catch (error) {
      console.error('Error loading variant data:', error);
    }
  };

  const handleColorChange = (metalType) => {
    const newVariant = variants.find(v => v.metal_type === metalType);
    if (newVariant) {
      setSelectedVariant(newVariant);
      loadVariantData(newVariant.variant_id);
    }
  };

  if (!product || !selectedVariant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-page">
      {/* Product Header */}
      <h1>{product.product_name}</h1>
      <p className="price">₹{selectedVariant.price.toLocaleString()}</p>
      
      {/* Image Gallery */}
      <ImageGallery images={images} />
      
      {/* Color Selector */}
      <ColorSelector 
        variants={variants}
        selectedMetal={selectedVariant.metal_type}
        onColorChange={handleColorChange}
      />
      
      {/* Price Breakdown */}
      <PriceBreakdown specs={specs} variant={selectedVariant} />
      
      {/* Technical Specifications */}
      <TechnicalSpecs specs={specs} />
    </div>
  );
};
```

#### **2. Image Gallery Component**
```jsx
// ImageGallery.jsx
import React, { useState } from 'react';

const ImageGallery = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!images || images.length === 0) {
    return <div>No images available</div>;
  }

  const primaryImage = images.find(img => img.is_primary) || images[0];
  const thumbnails = images.filter(img => !img.is_primary);

  return (
    <div className="image-gallery">
      {/* Main Image */}
      <div className="main-image">
        <img 
          src={images[currentImageIndex]?.image_url} 
          alt={images[currentImageIndex]?.alt_text}
          className="product-image"
        />
      </div>
      
      {/* Thumbnail Images */}
      <div className="thumbnails">
        {images.map((image, index) => (
          <img
            key={image.image_id}
            src={image.image_url}
            alt={image.alt_text}
            className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
```

#### **3. Color Selector Component**
```jsx
// ColorSelector.jsx
import React from 'react';

const ColorSelector = ({ variants, selectedMetal, onColorChange }) => {
  const uniqueMetalTypes = [...new Set(variants.map(v => v.metal_type))];

  const getMetalDisplayName = (metalType) => {
    const names = {
      'Yellow Gold': 'YELLOW GOLD',
      'White Gold': 'WHITE GOLD', 
      'Rose Gold': 'ROSE GOLD'
    };
    return names[metalType] || metalType;
  };

  return (
    <div className="color-selector">
      <h4>Color</h4>
      <div className="color-options">
        {uniqueMetalTypes.map(metalType => (
          <button
            key={metalType}
            className={`color-btn ${selectedMetal === metalType ? 'active' : ''}`}
            onClick={() => onColorChange(metalType)}
          >
            {getMetalDisplayName(metalType)}
          </button>
        ))}
      </div>
    </div>
  );
};
```

#### **4. Price Breakdown Component**
```jsx
// PriceBreakdown.jsx
import React, { useState, useEffect } from 'react';

const PriceBreakdown = ({ specs, variant }) => {
  const [rates, setRates] = useState({
    gold_18kt: 8000,
    gold_14kt: 6000,
    diamond_rate: 15000
  });

  // Load current rates (this could be from a rates API)
  useEffect(() => {
    loadCurrentRates();
  }, []);

  const loadCurrentRates = async () => {
    try {
      const response = await fetch('/api/rates/current');
      const ratesData = await response.json();
      setRates(ratesData);
    } catch (error) {
      console.error('Error loading rates:', error);
    }
  };

  const calculateBreakdown = () => {
    const goldWeight = parseFloat(specs.find(s => s.spec_name === '18kt Gold wt (gms)')?.spec_value || 0);
    const diamondWeight = parseFloat(specs.find(s => s.spec_name === 'Diamond wt (Ct)')?.spec_value || 0);
    const makingCharges = parseFloat(specs.find(s => s.spec_name === 'Making Charges')?.spec_value || 0);

    const goldRate = variant.metal_karat === '18kt' ? rates.gold_18kt : rates.gold_14kt;
    
    const goldCost = goldWeight * goldRate;
    const diamondCost = diamondWeight * rates.diamond_rate;
    const total = goldCost + diamondCost + makingCharges;

    return {
      goldWeight,
      diamondWeight,
      goldCost,
      diamondCost,
      makingCharges,
      total
    };
  };

  const breakdown = calculateBreakdown();

  return (
    <div className="price-breakdown">
      <h4>Price Breakdown</h4>
      <table className="breakdown-table">
        <thead>
          <tr>
            <th>Component</th>
            <th>Rate</th>
            <th>Weight</th>
            <th>Final Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Gold {variant.metal_karat}</td>
            <td>₹{rates[`gold_${variant.metal_karat.replace('kt', 'kt')}`].toLocaleString()}</td>
            <td>{breakdown.goldWeight} gm</td>
            <td>₹{breakdown.goldCost.toLocaleString()}</td>
          </tr>
          <tr>
            <td>FG VVS VS - 0.01 - 0.20</td>
            <td>₹{rates.diamond_rate.toLocaleString()}</td>
            <td>{breakdown.diamondWeight} carat</td>
            <td>₹{breakdown.diamondCost.toLocaleString()}</td>
          </tr>
          <tr>
            <td>Making Charges</td>
            <td>-</td>
            <td>-</td>
            <td>₹{breakdown.makingCharges.toLocaleString()}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr className="total-row">
            <td colSpan="3"><strong>Grand Total</strong></td>
            <td><strong>₹{breakdown.total.toLocaleString()}</strong></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
```

### **API Endpoints (Node.js/Express Examples)**

#### **1. Product API Routes**
```javascript
// routes/products.js
const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get single product
router.get('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    
    const [rows] = await db.execute(
      'SELECT * FROM products WHERE product_id = ?',
      [productId]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get product variants
router.get('/:productId/variants', async (req, res) => {
  try {
    const { productId } = req.params;
    
    const [rows] = await db.execute(
      'SELECT * FROM product_variants WHERE product_id = ? ORDER BY metal_type, metal_karat',
      [productId]
    );
    
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

#### **2. Variant API Routes**
```javascript
// routes/variants.js
const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get variant images
router.get('/:variantId/images', async (req, res) => {
  try {
    const { variantId } = req.params;
    
    const [rows] = await db.execute(
      'SELECT * FROM product_images WHERE variant_id = ? ORDER BY sort_order',
      [variantId]
    );
    
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get variant specifications
router.get('/:variantId/specs', async (req, res) => {
  try {
    const { variantId } = req.params;
    
    const [rows] = await db.execute(
      'SELECT * FROM technical_specs WHERE variant_id = ?',
      [variantId]
    );
    
    // Convert to key-value object for easier frontend use
    const specs = {};
    rows.forEach(row => {
      specs[row.spec_name] = row.spec_value;
    });
    
    res.json(specs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get variant with all related data
router.get('/:variantId/complete', async (req, res) => {
  try {
    const { variantId } = req.params;
    
    // Get variant info
    const [variantRows] = await db.execute(
      'SELECT * FROM product_variants WHERE variant_id = ?',
      [variantId]
    );
    
    if (variantRows.length === 0) {
      return res.status(404).json({ error: 'Variant not found' });
    }
    
    const variant = variantRows[0];
    
    // Get images
    const [imageRows] = await db.execute(
      'SELECT * FROM product_images WHERE variant_id = ? ORDER BY sort_order',
      [variantId]
    );
    
    // Get specs
    const [specRows] = await db.execute(
      'SELECT * FROM technical_specs WHERE variant_id = ?',
      [variantId]
    );
    
    // Get diamond details
    const [diamondRows] = await db.execute(
      'SELECT * FROM diamond_details WHERE variant_id = ?',
      [variantId]
    );
    
    res.json({
      variant,
      images: imageRows,
      specifications: specRows,
      diamonds: diamondRows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

### **Database Connection Example**
```javascript
// config/database.js
const mysql = require('mysql2/promise');

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'rare_regalia',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

module.exports = pool;
```

### **CSS Styling Examples**
```css
/* ProductPage.css */
.product-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.image-gallery {
  display: flex;
  flex-direction: column;
}

.main-image img {
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 8px;
}

.thumbnails {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.thumbnail {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  border: 2px solid transparent;
}

.thumbnail.active {
  border-color: #007bff;
}

.color-selector {
  margin: 20px 0;
}

.color-options {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.color-btn {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  border-radius: 4px;
}

.color-btn.active {
  background: #007bff;
  color: white;
}

.breakdown-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

.breakdown-table th,
.breakdown-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.total-row {
  background: #000;
  color: white;
}
```

This implementation ensures that **any database change automatically reflects on the website** through the API-driven architecture!