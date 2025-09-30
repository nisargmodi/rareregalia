# Rare Regalia E-Commerce Database

A comprehensive jewelry e-commerce database solution with normalized data structure and frontend integration capabilities.

## 📋 Project Overview

This project contains a complete database architecture for Rare Regalia's jewelry e-commerce website, including:

- **Normalized Database Schema** (5 tables)
- **Product Variant Management** (multiple gold types, sizes)
- **Dynamic Image Mapping** (4+ images per variant)
- **Technical Specifications** (detailed product attributes)
- **Price Calculation Engine** (components breakdown)

## � Documentation

**Comprehensive documentation is available in the `docs/` directory:**

- **[Documentation Index](docs/README.md)** - Complete guide to all documentation
- **[Testing Results](docs/testing/)** - Test execution reports and results
- **[Maintenance Guides](docs/maintenance/)** - Procedures for common tasks
- **[Maintenance Log](docs/maintenance/MAINTENANCE_LOG.md)** - Record of all maintenance actions

For quick reference on testing, data generation, and troubleshooting, start with the documentation index.

## �🗂️ Project Structure

```
├── docs/                       # 📚 Project documentation
│   ├── README.md              # Documentation index and quick reference
│   ├── testing/               # Test results and procedures
│   └── maintenance/           # Maintenance guides and logs
│
├── ecommerce_database/          # Final normalized database (CSV format)
│   ├── products.csv            # Main product catalog (126 products)
│   ├── product_variants.csv    # Product variations (858 variants)
│   ├── product_images.csv      # Image URLs (2,457 images)
│   ├── technical_specs.csv     # Technical specifications (5,108 specs)
│   └── diamond_details.csv     # Diamond information (83 records)
│
├── inventory-generation/        # Inventory CSV generation scripts
│   ├── generate_inventory_master.py  # Core generation logic
│   ├── test_inventory_gen.py        # Main execution script
│   ├── compare_inventory.py         # Comparison/verification tool
│   └── README.md                    # Detailed generation docs
│
├── converted_csv_files/         # Source data (converted from Excel)
│   ├── Batch-*_*.csv          # Batch specification files
│   └── kshitij_wc-product-export-29-8-2025.csv  # WooCommerce export
│
├── vendor-data/                 # Original vendor Excel files & media
│   └── Batch-*/                # Batch folders with Excel & images
│
├── ecommerce-website/          # Next.js frontend application
│
├── inventory_master_all_batches.csv  # Master inventory (897 products)
├── *.py                        # Python processing scripts
├── *.md                        # Documentation files
└── .gitignore                  # Excludes media files
```

## 🎯 Key Features

### **Database Architecture**
- **Products**: Main product families (126 records)
- **Product Variants**: Metal types, sizes, pricing (858 records)  
- **Product Images**: Multiple images per variant (2,457 images)
- **Technical Specs**: Detailed attributes (5,108 specifications)
- **Diamond Details**: Cut, carat, quality information

### **Image Management**
- **Dynamic URLs**: `TB-14078-Y1.jpg`, `TB-14078-Y2.jpg`, etc.
- **Metal-specific Images**: Y=Yellow, R=Rose, W=White gold
- **Primary/Secondary**: Proper image hierarchy
- **Gallery Support**: 4+ images per product variant

### **Price Structure**
- **Component-based Pricing**: Gold + Diamond + Making charges
- **Weight-based Calculations**: Accurate material costs
- **Variant-specific Pricing**: Different prices per metal type
- **Real-time Rate Support**: Ready for live gold/diamond rates

## 🚀 Getting Started

### **Prerequisites**
- Python 3.12+
- pandas, openpyxl libraries
- Database system (MySQL/PostgreSQL recommended)

### **Installation**
1. Clone the repository:
   ```bash
   git clone git@github.com:nisargmodi/rareregalia.git
   cd rareregalia
   ```

2. Install dependencies:
   ```bash
   pip install pandas openpyxl
   ```

3. Generate inventory master file (if needed):
   ```bash
   cd inventory-generation
   python test_inventory_gen.py
   ```
   This reads vendor Excel files and media folders to create `inventory_master_all_batches.csv`

4. Import database:
   ```sql
   -- Import CSV files into your database
   LOAD DATA INFILE 'products.csv' INTO TABLE products;
   LOAD DATA INFILE 'product_variants.csv' INTO TABLE product_variants;
   -- ... (repeat for all tables)
   ```

## 📦 Inventory Generation

The `inventory-generation/` folder contains scripts to generate the master inventory CSV from vendor data:

- **`generate_inventory_master.py`** - Core logic for parsing Excel files and discovering media
- **`test_inventory_gen.py`** - Main script to process all batches
- **`compare_inventory.py`** - Compare generated output with original

### Usage:
```bash
cd inventory-generation
python test_inventory_gen.py  # Generates ../inventory_master_all_batches.csv
python compare_inventory.py   # Verify output matches original
```

See `inventory-generation/README.md` for detailed documentation.

## 📊 Database Schema

### **Table Relationships**
```
PRODUCTS (1) → (Many) PRODUCT_VARIANTS (1) → (Many) PRODUCT_IMAGES
                                      ↓
                            TECHNICAL_SPECS & DIAMOND_DETAILS
```

### **Sample Queries**

**Get product with all variants:**
```sql
SELECT p.product_name, v.metal_type, v.price 
FROM products p 
JOIN product_variants v ON p.product_id = v.product_id 
WHERE p.product_id = 4;
```

**Get images for yellow gold variant:**
```sql
SELECT image_url, sort_order 
FROM product_images 
WHERE variant_id = 53 
ORDER BY sort_order;
```

## 🔧 Scripts Description

| **File** | **Purpose** | **Input** | **Output** |
|----------|-------------|-----------|------------|
| `excel_to_csv_converter.py` | Convert Excel files to CSV | Excel files | CSV files |
| `analyze_batch_columns.py` | Analyze data structure | CSV files | Column analysis |
| `master_data_join.py` | Join and merge data | Multiple CSVs | Master dataset |
| `ecommerce_database_generator.py` | Create normalized DB | All source data | Final database |

## 📖 Documentation

- **[DATABASE_ARCHITECTURE_GUIDE.md](DATABASE_ARCHITECTURE_GUIDE.md)**: Complete database documentation
- **[FRONTEND_IMPLEMENTATION_GUIDE.md](FRONTEND_IMPLEMENTATION_GUIDE.md)**: React/API implementation examples

## 💎 Product Examples

### **Tennis Bracelet (TB-14078)**
- **Variants**: Rose Gold, White Gold, Yellow Gold
- **Images**: `TB-14078-R1.jpg` to `TB-14078-R4.jpg` (per variant)
- **Specifications**: Gold weight, diamond weight, making charges
- **Price Range**: ₹146,892 - ₹174,092

### **Pendant (DOC-PD-15045)**
- **Variants**: Multiple sizes (SIZE1-SIZE4) × 3 gold types
- **Images**: `DOC-PD-15045-Y1.jpg` to `DOC-PD-15045-Y4.jpg`
- **Technical Specs**: Diamond details, measurements

## 🔄 Data Updates

**To add new products:**
1. Update `products.csv` with main product info
2. Add variants to `product_variants.csv`
3. Generate images in `product_images.csv`
4. Add specifications to `technical_specs.csv`

**Frontend automatically reflects database changes via API queries.**

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -m 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Open Pull Request

## 📝 License

This project is proprietary to Rare Regalia.

## 📞 Contact

For questions about the database structure or implementation, refer to the documentation files or create an issue.

---

**Last Updated**: September 16, 2025  
**Database Version**: v1.0  
**Total Records**: 9,632 across 5 tables