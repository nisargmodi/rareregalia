import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jewelry Size Guide | Rare Regalia',
  description: 'Find your perfect fit with our comprehensive jewelry sizing guide for rings, bracelets, necklaces, and earrings.',
};

export default function SizeGuidePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Jewelry Size Guide</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Find your perfect fit with our comprehensive sizing guide for all types of jewelry
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">Professional Sizing Available</h2>
          <p className="text-blue-700 mb-0">
            Visit our showroom for professional sizing, or order a ring sizer kit to measure at home. 
            We offer complimentary resizing for most jewelry within 30 days of purchase.
          </p>
        </div>

        <h2>Ring Sizing</h2>
        
        <h3>How to Measure Your Ring Size</h3>
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Method 1: Using a Ring You Own</h4>
          <ol>
            <li>Take a ring that fits the desired finger comfortably</li>
            <li>Measure the inside diameter in millimeters</li>
            <li>Use our conversion chart below to find your size</li>
            <li>Ensure the ring slides over your knuckle easily but doesn't slip off</li>
          </ol>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Method 2: Using String or Paper</h4>
          <ol>
            <li>Wrap a strip of paper or string around your finger</li>
            <li>Mark where the ends meet</li>
            <li>Measure the length in millimeters</li>
            <li>Divide by 3.14 to get the diameter</li>
            <li>Use our chart to find your ring size</li>
          </ol>
        </div>

        <h3>Ring Size Chart</h3>
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">US Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UK Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EU Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diameter (mm)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Circumference (mm)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">3</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">F</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">44</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">14.1</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">44.2</td></tr>
              <tr><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">4</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">H</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">47</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">14.9</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">46.8</td></tr>
              <tr><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">5</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">J</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">49</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">15.7</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">49.3</td></tr>
              <tr><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">6</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">L</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">52</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">16.5</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">51.9</td></tr>
              <tr><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">7</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">N</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">54</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">17.3</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">54.4</td></tr>
              <tr><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">8</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">P</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">57</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">18.2</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">57.0</td></tr>
              <tr><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">9</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">R</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">59</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">19.0</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">59.5</td></tr>
              <tr><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">10</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">T</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">62</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">19.8</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">62.1</td></tr>
            </tbody>
          </table>
        </div>

        <h3>Ring Sizing Tips</h3>
        <ul>
          <li>Measure at the end of the day when fingers are largest</li>
          <li>Consider the width of the band (wider bands fit tighter)</li>
          <li>Account for knuckle size - the ring must pass over it</li>
          <li>Cold weather makes fingers smaller, hot weather makes them larger</li>
          <li>Pregnancy and medication can affect finger size</li>
        </ul>

        <h2>Bracelet Sizing</h2>
        
        <h3>How to Measure Wrist Size</h3>
        <ol>
          <li>Use a flexible measuring tape around your wrist</li>
          <li>Measure just below the wrist bone</li>
          <li>Add comfort allowance based on desired fit:</li>
        </ol>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Bracelet Fit Guide</h4>
          <ul className="mb-0">
            <li><strong>Snug Fit:</strong> Wrist measurement + 0.5 inches</li>
            <li><strong>Comfortable Fit:</strong> Wrist measurement + 0.75 inches</li>
            <li><strong>Loose Fit:</strong> Wrist measurement + 1 inch</li>
            <li><strong>Very Loose Fit:</strong> Wrist measurement + 1.25 inches</li>
          </ul>
        </div>

        <h3>Standard Bracelet Sizes</h3>
        <ul>
          <li><strong>Extra Small:</strong> 6.5 inches (16.5 cm)</li>
          <li><strong>Small:</strong> 7 inches (17.8 cm)</li>
          <li><strong>Medium:</strong> 7.5 inches (19.1 cm)</li>
          <li><strong>Large:</strong> 8 inches (20.3 cm)</li>
          <li><strong>Extra Large:</strong> 8.5 inches (21.6 cm)</li>
        </ul>

        <h2>Necklace Length Guide</h2>
        
        <h3>Standard Necklace Lengths</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-3">Classic Lengths</h4>
            <ul className="mb-0">
              <li><strong>Choker:</strong> 14-16 inches - Sits at base of neck</li>
              <li><strong>Princess:</strong> 17-19 inches - Sits below collar bone</li>
              <li><strong>Matinee:</strong> 20-24 inches - Sits at chest</li>
              <li><strong>Opera:</strong> 28-34 inches - Sits at breastbone</li>
              <li><strong>Rope:</strong> 36+ inches - Hangs below chest</li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-3">Style Recommendations</h4>
            <ul className="mb-0">
              <li><strong>Petite Frame:</strong> 14-18 inches</li>
              <li><strong>Average Frame:</strong> 18-22 inches</li>
              <li><strong>Tall Frame:</strong> 22+ inches</li>
              <li><strong>Layering:</strong> Vary by 2-4 inches</li>
            </ul>
          </div>
        </div>

        <h3>How to Measure Necklace Length</h3>
        <ol>
          <li>Use a flexible measuring tape or string</li>
          <li>Wrap around your neck at the desired position</li>
          <li>Add or subtract length based on pendant size</li>
          <li>Consider neckline of clothing you'll wear it with</li>
        </ol>

        <h2>Earring Guide</h2>
        
        <h3>Earring Types & Fit</h3>
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Standard Measurements</h4>
          <ul className="mb-0">
            <li><strong>Stud Earrings:</strong> 3-8mm diameter typical</li>
            <li><strong>Hoop Earrings:</strong> 10-80mm diameter range</li>
            <li><strong>Drop Earrings:</strong> 15-50mm length typical</li>
            <li><strong>Ear Wire:</strong> 20 gauge standard thickness</li>
          </ul>
        </div>

        <h3>Hoop Size Guide</h3>
        <ul>
          <li><strong>Small Hoops:</strong> 10-20mm - Subtle, everyday wear</li>
          <li><strong>Medium Hoops:</strong> 25-40mm - Versatile, noticeable</li>
          <li><strong>Large Hoops:</strong> 45-60mm - Statement pieces</li>
          <li><strong>Extra Large:</strong> 65mm+ - Bold fashion statement</li>
        </ul>

        <h2>Professional Sizing Services</h2>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-green-800 mb-2">Complimentary Services</h3>
          <ul className="text-green-700 mb-0">
            <li>✓ In-store professional sizing consultation</li>
            <li>✓ Ring sizer kit mailed to your home</li>
            <li>✓ Virtual sizing consultation via video call</li>
            <li>✓ First resize within 30 days at no charge</li>
            <li>✓ Custom sizing for special requirements</li>
          </ul>
        </div>

        <h2>Sizing for Special Occasions</h2>
        
        <h3>Engagement Ring Sizing</h3>
        <p>
          Planning a surprise proposal? We offer discreet sizing options including 
          borrowing a ring she currently wears, consulting with family or friends, 
          or choosing a popular size (size 6-7 for most women) with complimentary 
          resizing after the proposal.
        </p>

        <h3>Gift Sizing</h3>
        <p>
          Purchasing jewelry as a gift? Consider these average sizes:
        </p>
        <ul>
          <li><strong>Women's Ring:</strong> Size 6-7 most common</li>
          <li><strong>Men's Ring:</strong> Size 9-10 most common</li>
          <li><strong>Bracelet:</strong> 7-7.5 inches most common</li>
          <li><strong>Necklace:</strong> 18 inches most versatile</li>
        </ul>

        <h2>International Sizing</h2>
        <p>
          Our jewelry sizes follow US standards, but we provide international 
          conversion charts and can accommodate international sizing requirements. 
          Contact us for specific conversions or custom sizing needs.
        </p>

        <h2>Contact Our Sizing Specialists</h2>
        <div className="bg-gray-50 rounded-lg p-6">
          <p className="mb-2">
            Need help determining your size? Our sizing specialists are here to assist:
          </p>
          <p className="mb-1"><strong>Email:</strong> sizing@rareregalia.com</p>
          <p className="mb-1"><strong>Phone:</strong> +1 (555) 123-4567</p>
          <p className="mb-1"><strong>Virtual Consultation:</strong> Available by appointment</p>
          <p className="mb-0"><strong>Showroom Visits:</strong> Tuesday - Saturday, 10AM - 7PM</p>
        </div>
      </div>
    </div>
  );
}