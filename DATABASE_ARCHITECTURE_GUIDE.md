# Rare Regalia E-Commerce Database Architecture Guide

## 📋 Table of Contents
1. [Database Schema Overview](#database-schema-overview)
2. [Table Relationships](#table-relationships)
3. [Frontend Integration Examples](#frontend-integration-examples)
4. [Database-to-Website Mapping](#database-to-website-mapping)
5. [Real-time Updates Implementation](#real-time-updates-implementation)
6. [Troubleshooting Guide](#troubleshooting-guide)

---

## 🗄️ Database Schema Overview

### **5-Table Normalized Architecture**

```
┌─────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   PRODUCTS  │    │ PRODUCT_VARIANTS │    │ PRODUCT_IMAGES  │
│             │◄──┤                  │◄──┤                 │
│ product_id  │    │ variant_id       │    │ image_id        │
│ name        │    │ product_id (FK)  │    │ variant_id (FK) │
│ description │    │ sku              │    │ image_url       │
│ category    │    │ metal_type       │    │ is_primary      │
│ base_price  │    │ price            │    │ sort_order      │
└─────────────┘    │ weight_gold      │    └─────────────────┘
                   │ weight_diamond   │    
                   └──────────────────┘    
                            │              
                   ┌────────┴─────────┐    
                   ▼                  ▼    
        ┌─────────────────┐    ┌─────────────────┐
        │ TECHNICAL_SPECS │    │ DIAMOND_DETAILS │
        │                 │    │                 │
        │ spec_id         │    │ diamond_id      │
        │ variant_id (FK) │    │ variant_id (FK) │
        │ spec_name       │    │ cut_type        │
        │ spec_value      │    │ size_mm         │
        └─────────────────┘    │ count           │
                               │ quality_grade   │
                               └─────────────────┘
```

---

## 🔗 Table Relationships

### **Primary Relationships**

| **Parent Table** | **Child Table** | **Relationship** | **Foreign Key** |
|------------------|-----------------|------------------|-----------------|
| `products` | `product_variants` | 1:Many | `product_id` |
| `product_variants` | `product_images` | 1:Many | `variant_id` |
| `product_variants` | `technical_specs` | 1:Many | `variant_id` |
| `product_variants` | `diamond_details` | 1:Many | `variant_id` |

### **Table Purposes**

| **Table** | **Purpose** | **Key Data** |
|-----------|-------------|--------------|
| `products` | Main product catalog | Product families, base info |
| `product_variants` | Product variations | Metal types, sizes, pricing |
| `product_images` | Image management | URLs, primary/secondary images |
| `technical_specs` | Detailed specifications | Weights, dimensions, materials |
| `diamond_details` | Diamond information | Cut, carat, quality grades |

---

## 🌐 Frontend Integration Examples

### **Example: Tennis Bracelet Product Page**

Let's walk through how **TB-14078 (Lumière Gold Tennis Bracelet)** displays on your website:

#### **Step 1: Product Page Load**
```sql
-- Get main product info
SELECT * FROM products WHERE product_id = 4;
```
**Result:**
```
product_id: 4
product_name: "Lumière Gold Tennis Bracelet"
category: "Bracelets"
base_price: 168177
```

#### **Step 2: Load Product Variants**
```sql
-- Get all variants for this product
SELECT * FROM product_variants WHERE product_id = 4;
```
**Result:**
```
variant_id: 51, metal_type: "Rose Gold", metal_karat: "14kt", price: 168177
variant_id: 52, metal_type: "White Gold", metal_karat: "14kt", price: 168177  
variant_id: 53, metal_type: "Yellow Gold", metal_karat: "14kt", price: 168177
```

#### **Step 3: Load Images for Current Variant**
```sql
-- Get images for Yellow Gold variant (variant_id = 53)
SELECT * FROM product_images 
WHERE variant_id = 53 
ORDER BY sort_order;
```
**Result:**
```
image_id: 65, image_url: "TB-14078-Y1.jpg", is_primary: 1, sort_order: 1
image_id: 66, image_url: "TB-14078-Y2.jpg", is_primary: 0, sort_order: 2
image_id: 67, image_url: "TB-14078-Y3.jpg", is_primary: 0, sort_order: 3
image_id: 68, image_url: "TB-14078-Y4.jpg", is_primary: 0, sort_order: 4
```

#### **Step 4: Load Technical Specifications**
```sql
-- Get technical specs for pricing breakdown
SELECT spec_name, spec_value 
FROM technical_specs 
WHERE variant_id = 53;
```
**Result:**
```
"18kt Gold wt (gms)": "14.19"
"Diamond wt (Ct)": "3.36"
"Making Charges": "25542.0"
```

#### **Step 5: Load Diamond Details**
```sql
-- Get diamond information
SELECT * FROM diamond_details WHERE variant_id = 53;
```
**Result:**
```
cut_type: "Round", size_mm: "2.5", count: 10, quality_grade: "VS"
```

---

## 🎯 Database-to-Website Mapping

### **Frontend Component ↔ Database Mapping**

#### **1. Product Header Section**
```javascript
// Frontend Component: ProductHeader.jsx
const ProductHeader = ({ productId }) => {
  // Database Query:
  const product = SELECT product_name, product_description 
                  FROM products WHERE product_id = ${productId};
  
  return (
    <h1>{product.product_name}</h1>
    <p>{product.product_description}</p>
  );
};
```

#### **2. Color Selection Buttons**
```javascript
// Frontend Component: ColorSelector.jsx
const ColorSelector = ({ productId, onColorChange }) => {
  // Database Query:
  const colors = SELECT DISTINCT metal_type, metal_karat 
                 FROM product_variants 
                 WHERE product_id = ${productId};
  
  return colors.map(color => (
    <button onClick={() => onColorChange(color.metal_type)}>
      {color.metal_type}
    </button>
  ));
};
```

#### **3. Image Gallery**
```javascript
// Frontend Component: ImageGallery.jsx
const ImageGallery = ({ variantId }) => {
  // Database Query:
  const images = SELECT image_url, is_primary, sort_order 
                 FROM product_images 
                 WHERE variant_id = ${variantId} 
                 ORDER BY sort_order;
  
  return (
    <div className="image-gallery">
      {images.map(img => (
        <img src={img.image_url} className={img.is_primary ? 'primary' : 'secondary'} />
      ))}
    </div>
  );
};
```

#### **4. Price Breakdown Table**
```javascript
// Frontend Component: PriceBreakdown.jsx
const PriceBreakdown = ({ variantId }) => {
  // Database Queries:
  const specs = SELECT spec_name, spec_value 
                FROM technical_specs 
                WHERE variant_id = ${variantId};
  
  const goldWeight = specs.find(s => s.spec_name === '18kt Gold wt (gms)').spec_value;
  const diamondWeight = specs.find(s => s.spec_name === 'Diamond wt (Ct)').spec_value;
  const makingCharges = specs.find(s => s.spec_name === 'Making Charges').spec_value;
  
  return (
    <table>
      <tr><td>Gold 18kt</td><td>₹{goldWeight * currentGoldRate}</td></tr>
      <tr><td>Diamond</td><td>₹{diamondWeight * currentDiamondRate}</td></tr>
      <tr><td>Making Charges</td><td>₹{makingCharges}</td></tr>
    </table>
  );
};
```

#### **5. Size Dropdown**
```javascript
// Frontend Component: SizeSelector.jsx
const SizeSelector = ({ productId }) => {
  // Database Query:
  const sizes = SELECT DISTINCT 
                  SUBSTRING(variant_name, LOCATE('SIZE', variant_name), 5) as size_option
                FROM product_variants 
                WHERE product_id = ${productId} 
                AND variant_name LIKE '%SIZE%';
  
  return (
    <select>
      {sizes.map(size => <option value={size}>{size}</option>)}
    </select>
  );
};
```

---

## ⚡ Real-time Updates Implementation

### **Automatic Database-to-Website Sync**

#### **1. Price Updates**
```javascript
// When you update prices in database:
UPDATE product_variants SET price = 175000 WHERE variant_id = 53;

// Frontend automatically reflects this via:
const useProductPrice = (variantId) => {
  const [price, setPrice] = useState(0);
  
  useEffect(() => {
    fetch(`/api/variants/${variantId}`)
      .then(res => res.json())
      .then(data => setPrice(data.price));
  }, [variantId]);
  
  return price;
};
```

#### **2. New Images Addition**
```sql
-- Add new image to database:
INSERT INTO product_images (variant_id, image_url, sort_order) 
VALUES (53, 'TB-14078-Y5.jpg', 5);
```
```javascript
// Frontend automatically shows new image:
const ImageGallery = ({ variantId }) => {
  const [images, setImages] = useState([]);
  
  useEffect(() => {
    fetch(`/api/variants/${variantId}/images`)
      .then(res => res.json())
      .then(setImages);
  }, [variantId]);
  
  return images.map(img => <img src={img.image_url} />);
};
```

#### **3. Specification Updates**
```sql
-- Update gold weight:
UPDATE technical_specs 
SET spec_value = '15.25' 
WHERE variant_id = 53 AND spec_name = '18kt Gold wt (gms)';
```
```javascript
// Price breakdown automatically recalculates:
const calculatePrice = (specs, rates) => {
  const goldWeight = parseFloat(specs['18kt Gold wt (gms)']);
  const diamondWeight = parseFloat(specs['Diamond wt (Ct)']);
  
  return {
    goldCost: goldWeight * rates.gold_18kt,
    diamondCost: diamondWeight * rates.diamond_rate,
    total: goldWeight * rates.gold_18kt + diamondWeight * rates.diamond_rate
  };
};
```

---

## 🔧 Cross-Verification Checklist

### **Database Change → Website Verification**

#### **✅ Product Information Changes**
| **Database Update** | **Frontend Verification** | **Expected Result** |
|---------------------|---------------------------|---------------------|
| Update `product_name` | Refresh product page | New name appears in header |
| Update `product_description` | Check product details | New description shows |
| Update `category` | Check navigation/breadcrumbs | Product appears in new category |

#### **✅ Variant Changes**
| **Database Update** | **Frontend Verification** | **Expected Result** |
|---------------------|---------------------------|---------------------|
| Add new `metal_type` | Check color selector | New color button appears |
| Update `price` | Check price display | New price shows |
| Update `weight_gold` | Check price breakdown | Gold cost recalculates |

#### **✅ Image Changes**
| **Database Update** | **Frontend Verification** | **Expected Result** |
|---------------------|---------------------------|---------------------|
| Add new image | Refresh gallery | New image appears in sequence |
| Update `is_primary` | Check main image | Primary image changes |
| Update `sort_order` | Check image order | Gallery reorders correctly |

#### **✅ Specification Changes**
| **Database Update** | **Frontend Verification** | **Expected Result** |
|---------------------|---------------------------|---------------------|
| Update gold weight | Check price breakdown | Gold cost updates |
| Update diamond weight | Check diamond info | Carat weight changes |
| Add new spec | Check additional info tab | New specification appears |

---

## 🚨 Troubleshooting Guide

### **Common Issues & Solutions**

#### **1. Images Not Displaying**
**Problem**: Image URLs not showing on website
**Check**: 
```sql
SELECT image_url FROM product_images WHERE variant_id = X;
```
**Solution**: Ensure URLs are complete and accessible

#### **2. Wrong Prices Displaying**
**Problem**: Price doesn't match database
**Check**:
```sql
SELECT price FROM product_variants WHERE variant_id = X;
```
**Solution**: Clear frontend cache, verify API endpoint

#### **3. Missing Product Variants**
**Problem**: Color options not showing
**Check**:
```sql
SELECT COUNT(*) FROM product_variants WHERE product_id = X;
```
**Solution**: Ensure variants exist and have valid `product_id`

#### **4. Broken Relationships**
**Problem**: Data not connecting properly
**Check**:
```sql
-- Verify foreign key relationships
SELECT v.variant_id, v.product_id, p.product_name 
FROM product_variants v 
LEFT JOIN products p ON v.product_id = p.product_id 
WHERE p.product_id IS NULL;
```
**Solution**: Fix orphaned records or missing relationships

---

## 🎯 Best Practices for Database Updates

### **1. Always Update in This Order:**
1. Update `products` table first
2. Update `product_variants` 
3. Update related tables (`images`, `specs`, `diamonds`)
4. Test frontend immediately

### **2. Maintain Data Consistency:**
```sql
-- Always verify relationships after updates
SELECT 
  p.product_id,
  p.product_name,
  COUNT(v.variant_id) as variant_count,
  COUNT(i.image_id) as image_count
FROM products p
LEFT JOIN product_variants v ON p.product_id = v.product_id
LEFT JOIN product_images i ON v.variant_id = i.variant_id
GROUP BY p.product_id;
```

### **3. Backup Before Major Changes:**
```bash
# Backup database before changes
mysqldump -u username -p rare_regalia > backup_$(date +%Y%m%d).sql
```

---

## 📝 Summary

Your database is designed for **automatic frontend synchronization**. Any change in the database will immediately reflect on the website through:

1. **API-driven architecture** - Frontend queries database in real-time
2. **Normalized relationships** - Changes propagate correctly through foreign keys  
3. **Component-based updates** - Each UI component maps to specific database queries

**Key Takeaway**: Change the database → Website updates automatically. No manual frontend modifications needed!

---

*Last Updated: September 15, 2025*
*Database Version: v1.0*