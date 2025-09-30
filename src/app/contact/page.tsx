import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Rare Regalia',
  description: 'Get in touch with Rare Regalia for questions about our jewelry collection, custom pieces, or customer service.',
};

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          We'd love to hear from you. Get in touch with our team for any questions or assistance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a message</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              >
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="orders">Order Status</option>
                <option value="custom">Custom Jewelry</option>
                <option value="care">Jewelry Care</option>
                <option value="returns">Returns & Exchanges</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Tell us how we can help you..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-primary-600 text-white py-3 px-6 rounded-md font-medium hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get in touch</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Customer Service</h3>
              <p className="text-gray-600 mb-2">
                Our customer service team is here to help with any questions about our jewelry collection.
              </p>
              <p className="text-gray-600">
                <strong>Hours:</strong> Monday - Friday, 9AM - 6PM EST<br />
                <strong>Email:</strong> support@rareregalia.com<br />
                <strong>Phone:</strong> +1 (555) 123-4567
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Custom Orders</h3>
              <p className="text-gray-600 mb-2">
                Interested in a custom piece? Our design team can help bring your vision to life.
              </p>
              <p className="text-gray-600">
                <strong>Email:</strong> custom@rareregalia.com<br />
                <strong>Consultation:</strong> By appointment only
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Showroom Visits</h3>
              <p className="text-gray-600 mb-2">
                Experience our jewelry collection in person at our flagship showroom.
              </p>
              <p className="text-gray-600">
                <strong>Address:</strong><br />
                123 Diamond District<br />
                New York, NY 10001<br />
                <strong>Hours:</strong> Tuesday - Saturday, 10AM - 7PM
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Care & Maintenance</h3>
              <p className="text-gray-600 mb-2">
                Questions about caring for your jewelry or need professional cleaning?
              </p>
              <p className="text-gray-600">
                <strong>Email:</strong> care@rareregalia.com
              </p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Quick Response Guarantee</h3>
            <p className="text-gray-600 text-sm">
              We respond to all inquiries within 24 hours during business days. 
              For urgent matters, please call our customer service line.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}