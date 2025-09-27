# Rare Regalia - Luxury Jewelry Ecommerce Website

A modern, responsive ecommerce website for luxury jewelry built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **699 Premium Products**: Complete inventory with detailed specifications
- **Product Filtering**: By category, metal type, price range, and more
- **Shopping Cart**: Full cart functionality with persistent storage
- **Responsive Design**: Mobile-first design with beautiful jewelry aesthetics
- **Image Galleries**: High-quality product images from vendor data
- **Product Search**: Advanced search and filtering capabilities
- **Modern UI/UX**: Clean, elegant design focused on luxury jewelry

## Product Categories

- **Rings** (328 items) - Engagement rings, wedding bands, cocktail rings
- **Pendants** (278 items) - Necklaces, pendants, chains
- **Earrings** (63 items) - Studs, hoops, danglers
- **Bracelets** (6 items) - Tennis bracelets, bangles
- **Uncategorized** (24 items) - Specialty pieces

## Technical Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom jewelry theme
- **State Management**: Zustand for cart management
- **Icons**: Heroicons
- **Image Optimization**: Next.js Image component
- **Data Processing**: Python scripts for CSV to JSON conversion

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd ecommerce-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
ecommerce-website/
├── src/
│   ├── app/                 # Next.js 13+ app directory
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Home page
│   │   └── products/        # Products pages
│   ├── components/          # Reusable components
│   │   ├── home/           # Homepage components
│   │   ├── products/       # Product-related components
│   │   ├── cart/           # Shopping cart components
│   │   └── layout/         # Layout components
│   ├── data/               # JSON data files
│   │   ├── products.json   # All products
│   │   ├── categories.json # Product categories
│   │   └── stats.json      # Statistics
│   ├── store/              # State management
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   └── styles/             # Global styles
├── public/
│   └── images/             # Product images and assets
└── vendor-data/            # Original vendor data and images
```

## Product Data

The website uses processed data from the original CSV inventory:

- **699 total products** with complete specifications
- **2,267 product images** organized by SKU
- **Detailed specifications**: Gold weight, diamond details, pricing
- **Multiple variants**: Different metal types and karats per product

## Features Overview

### Product Catalog
- Grid and list view modes
- Advanced filtering by category, metal type, price range
- Sort by name, price, newest
- Search functionality

### Product Details
- High-quality image galleries
- Complete specifications
- Variant selection (metal type, karat)
- Add to cart functionality

### Shopping Cart
- Persistent cart storage
- Quantity management
- Price calculations
- Checkout process

### Responsive Design
- Mobile-first approach
- Professional jewelry store aesthetics
- Optimized for all device sizes

## Data Processing

The inventory data is processed using Python scripts:

1. **CSV Processing**: Converts the original CSV to structured JSON
2. **Image Organization**: Copies and organizes vendor images
3. **API Generation**: Creates Next.js API routes for data access

## Deployment

To deploy the website:

1. Build the project:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## Environment Variables

Create a `.env.local` file for environment-specific settings:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="Rare Regalia"
```

## Testing

A small Playwright end-to-end test suite is included to smoke-test the site (homepage and product listing).

To install test dependencies and browsers, run:

```bash
npm install
npm run test:install-browsers
```

Run the tests (make sure the dev server is running at http://localhost:3000):

```bash
npm run test
```

By default tests run headless. You can run them headed for debugging with PLAYWRIGHT_HEADLESS=false or use the HTML report generated under playwright-report/ after a run.

## License

This project is proprietary and confidential.

## Support

For technical support or questions about the website, please contact the development team.