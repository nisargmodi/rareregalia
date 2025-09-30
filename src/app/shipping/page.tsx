import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping Information | Rare Regalia',
  description: 'Learn about our shipping options, delivery times, and international shipping for luxury jewelry orders.',
};

export default function ShippingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Shipping Information</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Fast, secure, and insured delivery for your precious jewelry worldwide
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">Free Shipping Available</h2>
          <p className="text-blue-700 mb-0">
            Complimentary shipping on all orders over $500. Express shipping options available for faster delivery.
          </p>
        </div>

        <h2>Shipping Options</h2>
        
        <h3>Domestic Shipping (United States)</h3>
        <ul>
          <li><strong>Standard Shipping:</strong> 3-5 business days - $15</li>
          <li><strong>Express Shipping:</strong> 1-2 business days - $25</li>
          <li><strong>Overnight Shipping:</strong> Next business day - $50</li>
          <li><strong>Free Standard Shipping:</strong> On orders over $500</li>
        </ul>

        <h3>International Shipping</h3>
        <ul>
          <li><strong>International Standard:</strong> 7-14 business days - $35</li>
          <li><strong>International Express:</strong> 3-5 business days - $65</li>
          <li><strong>Free International Shipping:</strong> On orders over $1,000</li>
        </ul>

        <h2>Processing Time</h2>
        <p>
          All orders are carefully processed and packaged with security and care in mind:
        </p>
        <ul>
          <li><strong>In-Stock Items:</strong> 1-2 business days processing</li>
          <li><strong>Custom Jewelry:</strong> 2-4 weeks depending on complexity</li>
          <li><strong>Engraved Items:</strong> Additional 3-5 business days</li>
          <li><strong>Special Orders:</strong> 4-8 weeks (timing confirmed at order)</li>
        </ul>

        <h2>Packaging & Security</h2>
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Premium Packaging</h3>
          <ul className="mb-0">
            <li>Luxury gift boxes included with every order</li>
            <li>Discrete, unmarked packaging for security</li>
            <li>Tamper-evident sealing and tracking</li>
            <li>Eco-friendly packaging materials when possible</li>
          </ul>
        </div>

        <h3>Insurance & Tracking</h3>
        <ul>
          <li>All shipments fully insured for their full value</li>
          <li>Signature required for all deliveries over $500</li>
          <li>Real-time tracking provided for all orders</li>
          <li>Adult signature required for high-value items</li>
        </ul>

        <h2>International Considerations</h2>
        
        <h3>Customs & Duties</h3>
        <p>
          International customers are responsible for any customs duties, taxes, or fees 
          imposed by their country. These charges are separate from shipping costs and 
          are collected by the customs authority upon delivery.
        </p>

        <h3>Restricted Countries</h3>
        <p>
          Due to security and legal restrictions, we cannot ship to certain countries. 
          Please contact us to verify if we can ship to your location.
        </p>

        <h2>Delivery Requirements</h2>
        <ul>
          <li><strong>Signature Required:</strong> All jewelry orders require adult signature</li>
          <li><strong>Valid Address:</strong> We cannot deliver to P.O. boxes for high-value items</li>
          <li><strong>Age Verification:</strong> Recipient must be 18+ years old</li>
          <li><strong>Availability:</strong> Someone must be available to receive package</li>
        </ul>

        <h2>Shipping Calendar</h2>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Holiday Shipping</h3>
          <p className="text-yellow-700 mb-2">
            During peak holiday seasons, shipping times may be extended. We recommend 
            ordering by these dates to ensure delivery:
          </p>
          <ul className="text-yellow-700 mb-0">
            <li><strong>Christmas:</strong> Order by December 15th for standard delivery</li>
            <li><strong>Valentine's Day:</strong> Order by February 7th for standard delivery</li>
            <li><strong>Mother's Day:</strong> Order by May 1st for standard delivery</li>
          </ul>
        </div>

        <h2>Order Tracking</h2>
        <p>
          Once your order ships, you'll receive a tracking number via email. You can track 
          your package through our website or directly with the carrier. For any shipping 
          questions or concerns, our customer service team is here to help.
        </p>

        <h2>Delivery Issues</h2>
        <h3>Failed Delivery Attempts</h3>
        <ul>
          <li>Carrier will attempt delivery 3 times</li>
          <li>Package will be held at local facility after failed attempts</li>
          <li>Customer has 5 business days to arrange pickup</li>
          <li>Unclaimed packages will be returned to us</li>
        </ul>

        <h3>Damaged or Lost Packages</h3>
        <p>
          If your package arrives damaged or is lost in transit, please contact us 
          immediately. All shipments are fully insured, and we'll work quickly to 
          resolve any issues and ensure you receive your jewelry in perfect condition.
        </p>

        <h2>Contact Information</h2>
        <div className="bg-gray-50 rounded-lg p-6">
          <p className="mb-2"><strong>Shipping Department</strong></p>
          <p className="mb-1">Email: shipping@rareregalia.com</p>
          <p className="mb-1">Phone: +1 (555) 123-4567</p>
          <p className="mb-1">Hours: Monday - Friday, 9AM - 5PM EST</p>
          <p className="mb-0">For urgent shipping questions: support@rareregalia.com</p>
        </div>
      </div>
    </div>
  );
}