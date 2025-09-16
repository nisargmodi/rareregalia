import pandas as pd

def load_database():
    """Load all database tables"""
    print("Loading database files...")
    products_df = pd.read_csv('ecommerce_database/products.csv')
    variants_df = pd.read_csv('ecommerce_database/product_variants.csv')
    images_df = pd.read_csv('ecommerce_database/product_images.csv')
    specs_df = pd.read_csv('ecommerce_database/technical_specs.csv')
    diamonds_df = pd.read_csv('ecommerce_database/diamond_details.csv')
    return products_df, variants_df, images_df, specs_df, diamonds_df

def deduce_category(product_name, original_category):
    """Deduce product category from name if original is generic, and standardize Necklaces to Pendants"""
    # Special case: Always change "Necklaces" to "Pendants"
    if original_category and original_category.lower() == 'necklaces':
        return 'Pendants'
    
    # For other existing categories, keep them as-is unless they're generic
    if original_category and original_category.lower() not in ['uncategorized', 'other', '']:
        return original_category
    
    name_lower = product_name.lower()
    
    # Earrings patterns
    earring_patterns = ['earring', 'earrings', 'hoop', 'hoops', 'stud', 'studs', 'dangler', 'chandelier', 'drop']
    if any(pattern in name_lower for pattern in earring_patterns):
        return 'Earrings'
    
    # Ring patterns
    ring_patterns = ['ring', 'solitaire', 'engagement', 'wedding', 'band']
    if any(pattern in name_lower for pattern in ring_patterns):
        return 'Rings'
    
    # Bracelet patterns
    bracelet_patterns = ['bracelet', 'tennis', 'bangle', 'chain bracelet']
    if any(pattern in name_lower for pattern in bracelet_patterns):
        return 'Bracelets'
    
    # Necklace patterns
    necklace_patterns = ['necklace', 'chain', 'pendant', 'choker', 'collar']
    if any(pattern in name_lower for pattern in necklace_patterns):
        return 'Pendant'
    
    # Set patterns
    set_patterns = ['set', 'suite', 'collection']
    if any(pattern in name_lower for pattern in set_patterns):
        return 'Jewelry Sets'
    
    return original_category or 'Uncategorized'

def main():
    products_df, variants_df, images_df, specs_df, diamonds_df = load_database()
    
    print(f"Loaded {len(products_df)} products, {len(variants_df)} variants")
    
    # Process ALL products that have variants
    products_with_variants = products_df[products_df['product_id'].isin(variants_df['product_id'])]
    
    # Apply intelligent categorization to all products
    category_stats = {
        'total_products': len(products_with_variants),
        'uncategorized_before': len(products_with_variants[products_with_variants['category'].isin(['Uncategorized', '', None])]),
        'categories_before': products_with_variants['category'].value_counts().to_dict(),
        'categories_after': {},
        'uncategorized_after': 0
    }
    
    # Apply categorization
    deduced_categories = []
    for _, product in products_with_variants.iterrows():
        deduced_cat = deduce_category(product['product_name'], product['category'])
        deduced_categories.append(deduced_cat)
    
    products_with_variants = products_with_variants.copy()
    products_with_variants['deduced_category'] = deduced_categories
    
    category_stats['categories_after'] = pd.Series(deduced_categories).value_counts().to_dict()
    category_stats['uncategorized_after'] = len(products_with_variants[products_with_variants['deduced_category'] == 'Uncategorized'])
    
    # Display results
    print("\n🎯 INTELLIGENT CATEGORIZATION ANALYSIS")
    print("=" * 80)
    print(f"Total products analyzed: {category_stats['total_products']}")
    print(f"Uncategorized before: {category_stats['uncategorized_before']}")
    print(f"Uncategorized after: {category_stats['uncategorized_after']}")
    print(f"Improvement: {category_stats['uncategorized_before'] - category_stats['uncategorized_after']} products categorized!")
    
    print(f"\n📊 CATEGORY DISTRIBUTION AFTER INTELLIGENT DEDUCTION:")
    print("-" * 60)
    for category, count in sorted(category_stats['categories_after'].items(), key=lambda x: x[1], reverse=True):
        percentage = (count / category_stats['total_products']) * 100
        print(f"{category:25s}: {count:3d} products ({percentage:5.1f}%)")
    
    # Show sample categorizations
    print(f"\n🔍 SAMPLE CATEGORIZATIONS:")
    print("-" * 60)
    for category in ['Earrings', 'Rings', 'Bracelets', 'Pendants']:
        if category in category_stats['categories_after']:
            samples = products_with_variants[products_with_variants['deduced_category'] == category]['product_name'].head(3).tolist()
            print(f"{category}:")
            for sample in samples:
                print(f"  • {sample}")
            if len(samples) == 3:
                total_in_cat = category_stats['categories_after'][category]
                if total_in_cat > 3:
                    print(f"  ... and {total_in_cat - 3} more")
            print()

if __name__ == "__main__":
    main()