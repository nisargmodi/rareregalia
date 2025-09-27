import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'Shop': [
      { name: 'All Products', href: '/products' },
      { name: 'Rings', href: '/products?category=rings' },
      { name: 'Earrings', href: '/products?category=earrings' },
      { name: 'Pendants', href: '/products?category=pendants' },
      { name: 'Bracelets', href: '/products?category=bracelets' },
    ],
    'Customer Care': [
      { name: 'Contact Us', href: '/contact' },
      { name: 'Size Guide', href: '/size-guide' },
      { name: 'Care Instructions', href: '/care' },
      { name: 'Returns & Exchanges', href: '/returns' },
      { name: 'Shipping Info', href: '/shipping' },
    ],
    'About': [
      { name: 'Our Story', href: '/about' },
      { name: 'Craftsmanship', href: '/craftsmanship' },
      { name: 'Certifications', href: '/certifications' },
      { name: 'Sustainability', href: '/sustainability' },
    ],
    'Legal': [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <span className="text-2xl font-serif font-bold text-gradient">
                Rare Regalia
              </span>
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              Crafting exquisite jewelry with premium diamonds, gold, and precious stones. 
              Each piece is a testament to exceptional craftsmanship and timeless elegance.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 20.25c-1.037-.074-1.594-.333-1.966-.554-.495-.192-.848-.421-1.219-.792-.37-.37-.599-.724-.792-1.219-.221-.372-.48-.929-.554-1.966-.08-1.12-.099-1.458-.099-4.28 0-2.82.02-3.16.099-4.28.074-1.037.333-1.594.554-1.966.193-.495.422-.848.792-1.219.37-.37.724-.599 1.219-.792.372-.221.929-.48 1.966-.554 1.12-.08 1.458-.099 4.28-.099 2.82 0 3.16.02 4.28.099 1.037.074 1.594.333 1.966.554.495.193.848.422 1.219.792.37.37.599.724.792 1.219.221.372.48.929.554 1.966.08 1.12.099 1.458.099 4.28 0 2.82-.02 3.16-.099 4.28-.074 1.037-.333 1.594-.554 1.966-.193.495-.422.848-.792 1.219-.37.37-.724.599-1.219.792-.372.221-.929.48-1.966.554-1.12.08-1.458.099-4.28.099-2.82 0-3.16-.02-4.28-.099z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Pinterest</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.219-.359-1.219c0-1.141.662-1.992 1.488-1.992.702 0 1.041.527 1.041 1.219 0 .738-.469 1.844-.711 2.87-.203.855.428 1.551 1.269 1.551 1.524 0 2.687-1.615 2.687-3.94 0-2.058-1.463-3.497-3.662-3.497-2.539 0-4.080 1.902-4.080 3.615 0 .736.289 1.175.289 1.175s-.332.527-.707.527c-.18 0-.357-.117-.357-.297 0-.473.234-.941.234-1.473 0-1.941-1.406-3.662-3.662-3.662z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 py-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="max-w-md">
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
                Subscribe to our newsletter
              </h3>
              <p className="text-gray-300 text-sm mb-4">
                Get the latest updates on new collections and exclusive offers.
              </p>
            </div>
            <div className="mt-4 md:mt-0 md:ml-8">
              <form className="sm:flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg sm:rounded-r-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="mt-2 sm:mt-0 w-full sm:w-auto px-6 py-2 bg-primary-600 text-white font-medium rounded-lg sm:rounded-l-none hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="text-gray-400 text-sm">
              <p>&copy; {currentYear} Rare Regalia. All rights reserved.</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex space-x-6">
                <span className="text-gray-400 text-sm">Secure payments with:</span>
                <div className="flex space-x-2">
                  <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                    VISA
                  </div>
                  <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">
                    MC
                  </div>
                  <div className="w-8 h-5 bg-blue-800 rounded text-white text-xs flex items-center justify-center font-bold">
                    AMEX
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}