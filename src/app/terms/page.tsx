import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Rare Regalia',
  description: 'Terms and conditions for using Rare Regalia services. Please read these terms carefully before making a purchase.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms & Conditions</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Please read these terms and conditions carefully before using our services or making a purchase.
        </p>
        <p className="text-sm text-gray-500 mt-4">Last updated: January 1, 2024</p>
      </div>

      <div className="prose prose-lg max-w-none">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-amber-800 mb-2">Agreement to Terms</h2>
          <p className="text-amber-700 mb-0">
            By accessing or using Rare Regalia services, you agree to be bound by these terms and conditions. 
            If you do not agree with any part of these terms, you may not use our services.
          </p>
        </div>

        <h2>Definitions</h2>
        
        <p>In these terms and conditions:</p>
        <ul>
          <li><strong>"Company"</strong> refers to Rare Regalia, LLC</li>
          <li><strong>"Services"</strong> includes our website, products, consultations, and all related services</li>
          <li><strong>"You"</strong> refers to the individual or entity accessing our services</li>
          <li><strong>"Products"</strong> refers to jewelry, gemstones, and related items we sell</li>
          <li><strong>"Website"</strong> refers to rareregalia.com and associated domains</li>
        </ul>

        <h2>Use of Services</h2>
        
        <h3>Eligibility</h3>
        <p>
          To use our services, you must:
        </p>
        <ul>
          <li>Be at least 18 years of age or have parental/guardian consent</li>
          <li>Have the legal capacity to enter into binding agreements</li>
          <li>Provide accurate and complete information</li>
          <li>Comply with all applicable laws and regulations</li>
          <li>Not be prohibited from using our services under applicable law</li>
        </ul>

        <h3>Account Registration</h3>
        <p>
          When creating an account, you agree to:
        </p>
        <ul>
          <li>Provide true, accurate, current, and complete information</li>
          <li>Maintain and update your information to keep it accurate</li>
          <li>Maintain the security and confidentiality of your login credentials</li>
          <li>Accept responsibility for all activities under your account</li>
          <li>Notify us immediately of any unauthorized use</li>
        </ul>

        <h3>Prohibited Uses</h3>
        <p>
          You may not use our services to:
        </p>
        <ul>
          <li>Violate any applicable laws or regulations</li>
          <li>Infringe on intellectual property rights</li>
          <li>Transmit harmful, offensive, or inappropriate content</li>
          <li>Attempt to gain unauthorized access to our systems</li>
          <li>Interfere with the proper functioning of our services</li>
          <li>Use automated systems to access our website without permission</li>
        </ul>

        <h2>Products and Pricing</h2>
        
        <h3>Product Information</h3>
        <p>
          We strive to provide accurate product descriptions, but:
        </p>
        <ul>
          <li>Colors may vary due to display settings and photography</li>
          <li>Dimensions are approximate and may vary slightly</li>
          <li>Natural variations in gemstones are expected and not defects</li>
          <li>Custom pieces may differ from initial designs due to material properties</li>
          <li>We reserve the right to correct errors in product information</li>
        </ul>

        <h3>Pricing and Availability</h3>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h4 className="font-semibold text-blue-800 mb-3">Pricing Terms</h4>
          <ul className="text-blue-700 mb-0">
            <li>All prices are in USD unless otherwise specified</li>
            <li>Prices are subject to change without notice</li>
            <li>Quoted prices are valid for 30 days unless otherwise stated</li>
            <li>Custom jewelry quotes are valid for 60 days</li>
            <li>We reserve the right to limit quantities</li>
          </ul>
        </div>

        <h3>Gemstone Grading</h3>
        <p>
          Gemstone grades and characteristics are based on:
        </p>
        <ul>
          <li>Independent laboratory certifications when available</li>
          <li>Our gemologists' professional assessments</li>
          <li>Industry-standard grading practices</li>
          <li>Natural variation expectations for each gemstone type</li>
        </ul>

        <h2>Orders and Payment</h2>
        
        <h3>Order Process</h3>
        <p>
          When you place an order:
        </p>
        <ol>
          <li>Your order constitutes an offer to purchase</li>
          <li>We will send an order confirmation (not acceptance)</li>
          <li>We reserve the right to accept or decline any order</li>
          <li>Order acceptance occurs when we ship your item or confirm production start</li>
          <li>We may require additional verification for large orders</li>
        </ol>

        <h3>Payment Terms</h3>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Schedule</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Terms</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">In-Stock Items</td>
                <td className="px-6 py-4 text-sm text-gray-500">Full payment at order</td>
                <td className="px-6 py-4 text-sm text-gray-500">Immediate processing</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Custom Jewelry</td>
                <td className="px-6 py-4 text-sm text-gray-500">50% deposit, 50% before shipping</td>
                <td className="px-6 py-4 text-sm text-gray-500">4-8 week production</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Special Orders</td>
                <td className="px-6 py-4 text-sm text-gray-500">Varies by item</td>
                <td className="px-6 py-4 text-sm text-gray-500">Specified in order confirmation</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">High-Value Items</td>
                <td className="px-6 py-4 text-sm text-gray-500">Wire transfer required</td>
                <td className="px-6 py-4 text-sm text-gray-500">Items over $25,000</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Accepted Payment Methods</h3>
        <ul>
          <li><strong>Credit Cards:</strong> Visa, MasterCard, American Express, Discover</li>
          <li><strong>Digital Payments:</strong> PayPal, Apple Pay, Google Pay</li>
          <li><strong>Bank Transfers:</strong> Wire transfers for high-value purchases</li>
          <li><strong>Financing:</strong> Third-party financing options available</li>
          <li><strong>Cryptocurrency:</strong> Bitcoin and select cryptocurrencies (by arrangement)</li>
        </ul>

        <h2>Shipping and Delivery</h2>
        
        <h3>Shipping Policies</h3>
        <p>
          Our shipping terms include:
        </p>
        <ul>
          <li>Free shipping on orders over $1,000 within the continental US</li>
          <li>Expedited shipping available for additional cost</li>
          <li>International shipping subject to customs and duties</li>
          <li>Signature required for all jewelry deliveries</li>
          <li>Insurance included on all shipments</li>
        </ul>

        <h3>Delivery Timeframes</h3>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <h4 className="font-semibold text-green-800 mb-3">Standard Delivery Times</h4>
          <ul className="text-green-700 mb-0">
            <li><strong>In-Stock Items:</strong> 1-3 business days processing, 2-5 days shipping</li>
            <li><strong>Custom Jewelry:</strong> 4-8 weeks production, plus shipping time</li>
            <li><strong>Engraving Services:</strong> Add 3-5 business days</li>
            <li><strong>Resizing:</strong> 5-10 business days depending on complexity</li>
            <li><strong>International Orders:</strong> Additional 1-2 weeks for customs clearance</li>
          </ul>
        </div>

        <h3>Risk of Loss</h3>
        <p>
          Title and risk of loss pass to you upon delivery to the shipping carrier. 
          We maintain insurance on all shipments to protect against loss or damage during transit.
        </p>

        <h2>Returns and Exchanges</h2>
        
        <h3>Return Policy</h3>
        <p>
          You may return items subject to the following conditions:
        </p>
        <ul>
          <li><strong>Time Limit:</strong> 30 days from delivery date</li>
          <li><strong>Condition:</strong> Items must be in original, unworn condition</li>
          <li><strong>Packaging:</strong> All original packaging, certificates, and documentation required</li>
          <li><strong>Authorization:</strong> Return authorization required before shipping</li>
          <li><strong>Inspection:</strong> Items subject to inspection upon return</li>
        </ul>

        <h3>Non-Returnable Items</h3>
        <p>
          The following items cannot be returned:
        </p>
        <ul>
          <li>Custom-made or personalized jewelry</li>
          <li>Engraved items</li>
          <li>Resized rings</li>
          <li>Items worn or showing signs of wear</li>
          <li>Special order items</li>
        </ul>

        <h3>Refund Process</h3>
        <p>
          Approved returns will be processed as follows:
        </p>
        <ul>
          <li>Inspection within 5 business days of receipt</li>
          <li>Refund to original payment method within 10 business days</li>
          <li>Original shipping charges are non-refundable</li>
          <li>Return shipping at customer expense unless item is defective</li>
          <li>Restocking fee may apply to certain items</li>
        </ul>

        <h2>Warranties and Guarantees</h2>
        
        <h3>Limited Warranty</h3>
        <p>
          We provide the following warranties:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Warranty Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coverage</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Craftsmanship</td>
                <td className="px-6 py-4 text-sm text-gray-500">Lifetime</td>
                <td className="px-6 py-4 text-sm text-gray-500">Manufacturing defects</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Gemstone Setting</td>
                <td className="px-6 py-4 text-sm text-gray-500">1 Year</td>
                <td className="px-6 py-4 text-sm text-gray-500">Loose stones from normal wear</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Metal Quality</td>
                <td className="px-6 py-4 text-sm text-gray-500">Lifetime</td>
                <td className="px-6 py-4 text-sm text-gray-500">Metal purity and composition</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Watch Movements</td>
                <td className="px-6 py-4 text-sm text-gray-500">2 Years</td>
                <td className="px-6 py-4 text-sm text-gray-500">Mechanical functionality</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Warranty Exclusions</h3>
        <p>
          Our warranty does not cover:
        </p>
        <ul>
          <li>Normal wear and tear</li>
          <li>Damage from misuse or accidents</li>
          <li>Modifications by third parties</li>
          <li>Exposure to chemicals or extreme conditions</li>
          <li>Loss or theft</li>
        </ul>

        <h2>Intellectual Property</h2>
        
        <h3>Our Rights</h3>
        <p>
          All content on our website and in our materials is protected by intellectual property laws:
        </p>
        <ul>
          <li><strong>Trademarks:</strong> Rare Regalia name, logo, and designs</li>
          <li><strong>Copyrights:</strong> Website content, images, and descriptions</li>
          <li><strong>Design Rights:</strong> Original jewelry designs and patterns</li>
          <li><strong>Trade Secrets:</strong> Manufacturing processes and techniques</li>
        </ul>

        <h3>Limited License</h3>
        <p>
          We grant you a limited, non-exclusive license to:
        </p>
        <ul>
          <li>Access and use our website for personal, non-commercial purposes</li>
          <li>Download product images for personal reference</li>
          <li>Share links to our products on social media</li>
        </ul>

        <h2>Limitation of Liability</h2>
        
        <h3>Disclaimer</h3>
        <p>
          To the maximum extent permitted by law:
        </p>
        <ul>
          <li>Our services are provided "as is" without warranties</li>
          <li>We disclaim all implied warranties of merchantability and fitness</li>
          <li>We do not warrant uninterrupted or error-free service</li>
          <li>Natural variations in gemstones are not defects</li>
        </ul>

        <h3>Limitation of Damages</h3>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <h4 className="font-semibold text-red-800 mb-3">Liability Limits</h4>
          <p className="text-red-700 mb-3">
            Our total liability for any claim related to our services will not exceed:
          </p>
          <ul className="text-red-700 mb-0">
            <li>The amount paid by you for the specific item or service in question</li>
            <li>$100 for general website or service issues</li>
            <li>We are not liable for indirect, incidental, or consequential damages</li>
            <li>We are not liable for lost profits, data, or business interruption</li>
          </ul>
        </div>

        <h2>Indemnification</h2>
        
        <p>
          You agree to indemnify and hold us harmless from any claims, damages, or expenses 
          arising from your use of our services, violation of these terms, or infringement 
          of any third-party rights.
        </p>

        <h2>Dispute Resolution</h2>
        
        <h3>Governing Law</h3>
        <p>
          These terms are governed by the laws of the State of New York, without regard 
          to conflict of law principles.
        </p>

        <h3>Arbitration Agreement</h3>
        <p>
          Any disputes arising from these terms or our services will be resolved through 
          binding arbitration administered by the American Arbitration Association under 
          its Commercial Arbitration Rules.
        </p>

        <h3>Class Action Waiver</h3>
        <p>
          You agree that any arbitration will be limited to the dispute between you and us individually. 
          You waive any right to participate in class action lawsuits or class-wide arbitrations.
        </p>

        <h2>Termination</h2>
        
        <h3>Termination Rights</h3>
        <p>
          We may terminate or suspend your access to our services:
        </p>
        <ul>
          <li>Immediately for violation of these terms</li>
          <li>For suspected fraudulent activity</li>
          <li>Upon closure of your account</li>
          <li>At our discretion with reasonable notice</li>
        </ul>

        <h3>Effect of Termination</h3>
        <p>
          Upon termination:
        </p>
        <ul>
          <li>Your right to use our services ceases immediately</li>
          <li>Outstanding orders may be completed or cancelled at our discretion</li>
          <li>Warranty obligations on delivered items remain in effect</li>
          <li>These terms continue to apply to past transactions</li>
        </ul>

        <h2>Miscellaneous</h2>
        
        <h3>Severability</h3>
        <p>
          If any provision of these terms is found unenforceable, the remaining provisions 
          will continue in full force and effect.
        </p>

        <h3>Entire Agreement</h3>
        <p>
          These terms constitute the entire agreement between you and us regarding our services, 
          superseding any prior agreements or understandings.
        </p>

        <h3>Amendments</h3>
        <p>
          We may modify these terms at any time by posting updated terms on our website. 
          Your continued use of our services constitutes acceptance of the modified terms.
        </p>

        <h3>Assignment</h3>
        <p>
          You may not assign your rights or obligations under these terms. We may assign 
          our rights and obligations to any party without restriction.
        </p>

        <h2>Contact Information</h2>
        
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-2">Legal Inquiries</h3>
          <p className="mb-3">
            For questions about these terms and conditions or legal matters:
          </p>
          <p className="mb-1"><strong>Legal Department:</strong> legal@rareregalia.com</p>
          <p className="mb-1"><strong>Phone:</strong> +1 (555) 123-4567</p>
          <p className="mb-1"><strong>Address:</strong> Rare Regalia Legal Department</p>
          <p className="mb-1">123 Luxury Lane, Suite 100</p>
          <p className="mb-1">New York, NY 10001</p>
          <p className="mb-0"><strong>Business Hours:</strong> Monday - Friday, 9AM - 5PM EST</p>
        </div>
      </div>
    </div>
  );
}