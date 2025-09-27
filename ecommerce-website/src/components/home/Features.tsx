import { 
  ShieldCheckIcon, 
  TruckIcon, 
  CurrencyDollarIcon, 
  SparklesIcon,
  HeartIcon,
  GlobeAltIcon 
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Premium Quality',
    description: 'Handcrafted jewelry with the finest diamonds and precious metals',
    icon: SparklesIcon,
  },
  {
    name: 'Certified Diamonds',
    description: 'All diamonds come with proper certification and quality guarantee',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Free Shipping',
    description: 'Complimentary shipping on all orders above ₹25,000',
    icon: TruckIcon,
  },
  {
    name: 'Best Price Guarantee',
    description: 'Competitive pricing with transparent and fair pricing policy',
    icon: CurrencyDollarIcon,
  },
  {
    name: 'Lifetime Service',
    description: 'Free cleaning, polishing, and maintenance for life',
    icon: HeartIcon,
  },
  {
    name: 'Worldwide Delivery',
    description: 'Secure delivery to your doorstep anywhere in the world',
    icon: GlobeAltIcon,
  },
];

export function Features() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Rare Regalia</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're committed to providing exceptional quality, service, and value 
            in every piece of jewelry we create.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="relative bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary-100">
                  <feature.icon className="h-6 w-6 text-primary-600" aria-hidden="true" />
                </div>
                <h3 className="ml-4 text-lg font-semibold text-gray-900">
                  {feature.name}
                </h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Trusted by Thousands</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">10,000+</div>
              <div className="text-sm text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">699+</div>
              <div className="text-sm text-gray-600">Unique Designs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">5⭐</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">15+</div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}