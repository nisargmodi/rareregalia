import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Rare Regalia',
  description: 'Learn about Rare Regalia\'s commitment to creating exquisite handcrafted jewelry with premium diamonds and precious stones.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Story</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Crafting exceptional jewelry with passion, precision, and timeless elegance
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Heritage</h2>
          <p className="text-gray-600 mb-4">
            Since our founding, Rare Regalia has been dedicated to creating extraordinary jewelry pieces 
            that celebrate life's most precious moments. Each piece in our collection represents the 
            perfect marriage of traditional craftsmanship and contemporary design.
          </p>
          <p className="text-gray-600">
            Our master artisans work with the finest diamonds, gold, and precious stones to create 
            jewelry that not only adorns but tells a story of elegance, sophistication, and enduring beauty.
          </p>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Commitment</h2>
          <p className="text-gray-600 mb-4">
            We believe that every piece of jewelry should be as unique as the person who wears it. 
            That's why we source only the highest quality materials and employ the most skilled 
            craftspeople to bring our designs to life.
          </p>
          <p className="text-gray-600">
            From ethically sourced diamonds to responsibly mined precious metals, we are committed 
            to sustainable practices that honor both our craft and our planet.
          </p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💎</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Quality</h3>
            <p className="text-gray-600 text-sm">
              We use only the finest materials and employ rigorous quality standards in every piece we create.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🌱</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Sustainability</h3>
            <p className="text-gray-600 text-sm">
              Our commitment to ethical sourcing and sustainable practices guides every decision we make.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Craftsmanship</h3>
            <p className="text-gray-600 text-sm">
              Our master artisans bring decades of experience to create pieces of extraordinary beauty.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Experience the Difference</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Discover jewelry that transcends trends and becomes a treasured part of your story. 
          Each piece is crafted to be worn, loved, and passed down through generations.
        </p>
        <a
          href="/products"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors"
        >
          Explore Our Collection
        </a>
      </div>
    </div>
  );
}