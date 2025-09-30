import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jewelry Care Instructions | Rare Regalia',
  description: 'Learn how to properly care for your precious jewelry to maintain its beauty and value for generations.',
};

export default function CarePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Jewelry Care Guide</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Preserve the beauty and brilliance of your precious jewelry with proper care and maintenance
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-amber-800 mb-2">General Care Principles</h2>
          <p className="text-amber-700 mb-0">
            Proper care extends the life of your jewelry and maintains its value. Handle with care, 
            store properly, and clean regularly for lasting beauty.
          </p>
        </div>

        <h2>Daily Care Tips</h2>
        
        <h3>Before You Wear</h3>
        <ul>
          <li>Put jewelry on last, after applying makeup, perfume, and lotions</li>
          <li>Ensure clasps and settings are secure before wearing</li>
          <li>Avoid wearing jewelry during sports or physical activities</li>
          <li>Remove rings when washing hands or using cleaning products</li>
        </ul>

        <h3>While Wearing</h3>
        <ul>
          <li>Avoid contact with chemicals, including household cleaners</li>
          <li>Remove jewelry before swimming (chlorine can damage metals)</li>
          <li>Be mindful of snagging on clothing or other objects</li>
          <li>Avoid extreme temperatures that can damage gemstones</li>
        </ul>

        <h3>After Wearing</h3>
        <ul>
          <li>Wipe gently with a soft, lint-free cloth</li>
          <li>Store immediately in appropriate containers</li>
          <li>Check for loose stones or damaged settings</li>
          <li>Remove jewelry first, before undressing</li>
        </ul>

        <h2>Cleaning Your Jewelry</h2>

        <h3>Gold Jewelry</h3>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-yellow-800 mb-3">At-Home Cleaning</h4>
          <ol className="text-yellow-700">
            <li>Mix warm water with a few drops of mild dish soap</li>
            <li>Soak jewelry for 10-15 minutes</li>
            <li>Gently scrub with a soft-bristled toothbrush</li>
            <li>Rinse thoroughly with clean water</li>
            <li>Dry completely with a soft cloth</li>
          </ol>
        </div>

        <h3>Diamond Care</h3>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-blue-800 mb-3">Maintaining Brilliance</h4>
          <ul className="text-blue-700 mb-0">
            <li>Clean weekly with warm soapy water and soft brush</li>
            <li>Avoid touching the diamond with fingers (oils reduce sparkle)</li>
            <li>Professional cleaning every 6 months recommended</li>
            <li>Check prongs and settings regularly for security</li>
          </ul>
        </div>

        <h3>Silver Jewelry</h3>
        <ul>
          <li>Use silver polishing cloth for regular maintenance</li>
          <li>Store in anti-tarnish pouches or cloth</li>
          <li>Clean with silver-specific cleaners when tarnished</li>
          <li>Avoid rubber and latex contact (causes tarnishing)</li>
        </ul>

        <h3>Gemstone Care</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 my-6">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gemstone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hardness</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Care Instructions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Diamond</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10 (Hardest)</td>
                <td className="px-6 py-4 text-sm text-gray-500">Very durable, clean with soap and water</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Ruby/Sapphire</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">9</td>
                <td className="px-6 py-4 text-sm text-gray-500">Durable, avoid harsh chemicals</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Emerald</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">7.5-8</td>
                <td className="px-6 py-4 text-sm text-gray-500">Fragile, clean gently, avoid ultrasonic</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Pearl</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2.5-4.5</td>
                <td className="px-6 py-4 text-sm text-gray-500">Very delicate, wipe with damp cloth only</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Storage Guidelines</h2>

        <h3>Proper Storage Prevents Damage</h3>
        <ul>
          <li><strong>Separate Storage:</strong> Store each piece individually to prevent scratching</li>
          <li><strong>Soft Pouches:</strong> Use velvet or fabric-lined compartments</li>
          <li><strong>Dry Environment:</strong> Store in low-humidity conditions</li>
          <li><strong>Temperature Control:</strong> Avoid extreme temperature fluctuations</li>
        </ul>

        <h3>Storage Solutions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-2">For Daily Wear Items</h4>
            <ul className="text-gray-700 mb-0">
              <li>Jewelry box with padded compartments</li>
              <li>Individual soft pouches</li>
              <li>Ring holders or stands</li>
              <li>Necklace hooks to prevent tangling</li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-2">For Special Occasion Pieces</h4>
            <ul className="text-gray-700 mb-0">
              <li>Home safe or safety deposit box</li>
              <li>Original jewelry boxes when possible</li>
              <li>Anti-tarnish storage for silver</li>
              <li>Climate-controlled environment</li>
            </ul>
          </div>
        </div>

        <h2>Professional Maintenance</h2>

        <h3>When to See a Jeweler</h3>
        <ul>
          <li><strong>Annual Inspection:</strong> Check prongs, clasps, and settings</li>
          <li><strong>Professional Cleaning:</strong> Deep cleaning every 6-12 months</li>
          <li><strong>Repairs:</strong> Address issues immediately to prevent further damage</li>
          <li><strong>Appraisal Updates:</strong> Every 3-5 years for insurance purposes</li>
        </ul>

        <h3>Professional Services We Offer</h3>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <ul className="text-green-700 mb-0">
            <li>✓ Complimentary cleaning for Rare Regalia jewelry</li>
            <li>✓ Professional inspection and maintenance</li>
            <li>✓ Prong tightening and setting repair</li>
            <li>✓ Rhodium plating for white gold pieces</li>
            <li>✓ Stone replacement and setting services</li>
            <li>✓ Resizing and alterations</li>
          </ul>
        </div>

        <h2>What to Avoid</h2>

        <h3>Chemical Exposure</h3>
        <ul>
          <li>Bleach and ammonia-based cleaners</li>
          <li>Swimming pool chlorine</li>
          <li>Perfumes and hairsprays (apply before jewelry)</li>
          <li>Abrasive cleaning materials</li>
        </ul>

        <h3>Physical Damage</h3>
        <ul>
          <li>Dropping or impact against hard surfaces</li>
          <li>Sleeping in jewelry (especially earrings)</li>
          <li>Gardening or manual work while wearing rings</li>
          <li>Extreme temperature changes</li>
        </ul>

        <h2>Travel Care</h2>
        <p>
          When traveling with jewelry, use a dedicated travel case with individual 
          compartments. Carry valuable pieces in your carry-on luggage, never in 
          checked baggage. Consider travel insurance for high-value items.
        </p>

        <h2>Emergency Care</h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-800 mb-2">If Something Goes Wrong</h3>
          <ul className="text-red-700 mb-0">
            <li><strong>Lost Stone:</strong> Stop wearing immediately, save any fragments</li>
            <li><strong>Broken Chain:</strong> Don't attempt DIY repairs</li>
            <li><strong>Allergic Reaction:</strong> Remove jewelry and consult a doctor</li>
            <li><strong>Severe Tarnishing:</strong> Bring to professional for assessment</li>
          </ul>
        </div>

        <h2>Contact Our Care Specialists</h2>
        <div className="bg-gray-50 rounded-lg p-6">
          <p className="mb-2">
            For specific care questions about your Rare Regalia jewelry, our care specialists 
            are here to help:
          </p>
          <p className="mb-1"><strong>Email:</strong> care@rareregalia.com</p>
          <p className="mb-1"><strong>Phone:</strong> +1 (555) 123-4567</p>
          <p className="mb-0"><strong>Hours:</strong> Monday - Friday, 9AM - 5PM EST</p>
        </div>
      </div>
    </div>
  );
}