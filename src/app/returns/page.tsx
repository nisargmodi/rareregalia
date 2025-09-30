import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Returns & Exchanges | Rare Regalia',
  description: 'Learn about our return and exchange policy for jewelry purchases from Rare Regalia.',
};

export default function ReturnsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Returns & Exchanges</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your satisfaction is our priority. Learn about our flexible return and exchange policy.
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-green-800 mb-2">30-Day Return Policy</h2>
          <p className="text-green-700 mb-0">
            We offer a 30-day return window for most items. Returns must be in original condition 
            with all packaging and documentation included.
          </p>
        </div>

        <h2>Return Eligibility</h2>
        <ul>
          <li><strong>Timeframe:</strong> Items must be returned within 30 days of delivery</li>
          <li><strong>Condition:</strong> Items must be unworn, undamaged, and in original packaging</li>
          <li><strong>Documentation:</strong> Original receipt or order confirmation required</li>
          <li><strong>Tags:</strong> All original tags and certificates must be attached</li>
        </ul>

        <h2>Non-Returnable Items</h2>
        <ul>
          <li>Custom or personalized jewelry pieces</li>
          <li>Engraved items</li>
          <li>Earrings (for hygiene reasons)</li>
          <li>Items damaged due to normal wear</li>
          <li>Items returned after 30 days</li>
        </ul>

        <h2>How to Return an Item</h2>
        <ol>
          <li><strong>Contact Us:</strong> Email returns@rareregalia.com or call +1 (555) 123-4567</li>
          <li><strong>Return Authorization:</strong> Receive your return authorization number (RMA)</li>
          <li><strong>Package Securely:</strong> Use original packaging and include all documentation</li>
          <li><strong>Ship:</strong> Send to our returns processing center using provided label</li>
          <li><strong>Processing:</strong> Allow 5-7 business days for inspection and refund</li>
        </ol>

        <h2>Exchange Policy</h2>
        <p>
          We gladly exchange items for different sizes or similar items of equal or lesser value. 
          For exchanges to higher-value items, you'll pay the difference. If exchanging for a 
          lower-value item, we'll refund the difference.
        </p>

        <h3>Size Exchanges</h3>
        <ul>
          <li>Free size exchanges within 30 days of purchase</li>
          <li>One free size exchange per item</li>
          <li>Additional exchanges subject to shipping charges</li>
        </ul>

        <h2>Refund Information</h2>
        
        <h3>Processing Time</h3>
        <ul>
          <li><strong>Inspection:</strong> 2-3 business days after we receive your return</li>
          <li><strong>Refund Processing:</strong> 3-5 business days after approval</li>
          <li><strong>Bank Processing:</strong> Additional 3-5 business days depending on your bank</li>
        </ul>

        <h3>Refund Methods</h3>
        <ul>
          <li>Refunds issued to original payment method</li>
          <li>Credit card refunds: 5-10 business days</li>
          <li>PayPal refunds: 3-5 business days</li>
          <li>Bank transfers: 7-10 business days</li>
        </ul>

        <h2>Shipping Costs</h2>
        <ul>
          <li><strong>Defective Items:</strong> We cover all shipping costs</li>
          <li><strong>Wrong Item Sent:</strong> We cover all shipping costs</li>
          <li><strong>Change of Mind:</strong> Customer covers return shipping</li>
          <li><strong>Size Exchange:</strong> We cover shipping for first exchange</li>
        </ul>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Custom Jewelry Policy</h3>
          <p className="text-blue-700 mb-2">
            Custom and personalized jewelry pieces are generally non-returnable. However, if there's 
            a defect in craftsmanship or the item doesn't match the approved design, we'll gladly 
            remake the piece at no charge.
          </p>
          <p className="text-blue-700 mb-0">
            <strong>Custom pieces require 50% deposit, with final approval before completion.</strong>
          </p>
        </div>

        <h2>Warranty Information</h2>
        <p>
          All Rare Regalia jewelry comes with our limited warranty covering manufacturing defects. 
          This warranty does not cover normal wear, damage from misuse, or loss of stones due to 
          impact or harsh treatment.
        </p>

        <ul>
          <li><strong>Manufacturing Defects:</strong> Covered for 1 year from purchase</li>
          <li><strong>Stone Setting:</strong> Covered for 6 months from purchase</li>
          <li><strong>Plating/Finish:</strong> Covered for 3 months with proper care</li>
        </ul>

        <h2>Contact Information</h2>
        <div className="bg-gray-50 rounded-lg p-6">
          <p className="mb-2"><strong>Returns Department</strong></p>
          <p className="mb-1">Email: returns@rareregalia.com</p>
          <p className="mb-1">Phone: +1 (555) 123-4567</p>
          <p className="mb-1">Hours: Monday - Friday, 9AM - 5PM EST</p>
          <p className="mb-0">Average response time: Within 24 hours</p>
        </div>
      </div>
    </div>
  );
}