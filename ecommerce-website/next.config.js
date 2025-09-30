/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rareregalia.com',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
    ],
    // Allow unoptimized images for development
    unoptimized: process.env.NODE_ENV === 'development',
    // Add formats for better compatibility
    formats: ['image/webp', 'image/avif'],
  },
}

module.exports = nextConfig