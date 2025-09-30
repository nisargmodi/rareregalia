import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sustainability & Ethics | Rare Regalia',
  description: 'Our commitment to ethical sourcing, environmental responsibility, and sustainable practices in luxury jewelry.',
};

export default function SustainabilityPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Sustainability & Ethics</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Creating beautiful jewelry while protecting our planet and supporting communities
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-green-800 mb-2">Our Sustainability Promise</h2>
          <p className="text-green-700 mb-0">
            We are committed to creating exceptional jewelry through responsible sourcing, 
            ethical practices, and environmental stewardship, ensuring that beauty never 
            comes at the cost of our planet or its people.
          </p>
        </div>

        <h2>Ethical Sourcing</h2>
        
        <h3>Responsible Supply Chain</h3>
        <p>
          Every gemstone and precious metal in our collection is sourced through carefully 
          vetted suppliers who share our commitment to ethical and sustainable practices.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="font-semibold text-blue-800 mb-3">Diamond Sourcing</h4>
            <ul className="text-blue-700 mb-0">
              <li>Kimberley Process compliant</li>
              <li>Conflict-free certification</li>
              <li>Traceable origin documentation</li>
              <li>Supporting legitimate mining communities</li>
              <li>Canadian and Australian preferred sources</li>
            </ul>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h4 className="font-semibold text-purple-800 mb-3">Colored Gemstone Ethics</h4>
            <ul className="text-purple-700 mb-0">
              <li>Direct relationships with mine operators</li>
              <li>Fair trade certified sources</li>
              <li>Community development programs</li>
              <li>Artisanal mining support</li>
              <li>Environmental impact assessment</li>
            </ul>
          </div>
        </div>

        <h3>Precious Metal Responsibility</h3>
        <p>
          Our gold, platinum, and silver are sourced from certified responsible mining 
          operations that meet strict environmental and social standards.
        </p>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
          <h4 className="font-semibold text-yellow-800 mb-3">Responsible Gold Sourcing</h4>
          <ul className="text-yellow-700 mb-0">
            <li><strong>Certified Sources:</strong> Fairmined and Fairtrade gold suppliers</li>
            <li><strong>Recycled Content:</strong> 40% recycled gold in our alloys</li>
            <li><strong>Mercury-Free:</strong> No mercury amalgamation in our supply chain</li>
            <li><strong>Community Support:</strong> Premium payments to mining communities</li>
            <li><strong>Environmental Standards:</strong> Restoration and rehabilitation requirements</li>
          </ul>
        </div>

        <h2>Environmental Responsibility</h2>
        
        <h3>Carbon Footprint Reduction</h3>
        <p>
          We are committed to minimizing our environmental impact through comprehensive 
          carbon reduction strategies:
        </p>

        <div className="bg-green-50 rounded-lg p-6 mb-6">
          <h4 className="font-semibold text-green-800 mb-3">Our Climate Actions</h4>
          <ul className="text-green-700 mb-0">
            <li><strong>Renewable Energy:</strong> 100% renewable electricity in our workshops</li>
            <li><strong>Carbon Neutral Shipping:</strong> Offset all delivery emissions</li>
            <li><strong>Efficient Operations:</strong> LED lighting and energy-efficient equipment</li>
            <li><strong>Digital First:</strong> Minimizing paper through digital documentation</li>
            <li><strong>Local Sourcing:</strong> Prioritizing suppliers within 500 miles when possible</li>
          </ul>
        </div>

        <h3>Waste Minimization</h3>
        <p>
          Our workshop operates on principles of minimal waste and maximum efficiency:
        </p>
        <ul>
          <li><strong>Metal Recovery:</strong> 98% of precious metal waste is recovered and recycled</li>
          <li><strong>Precision Manufacturing:</strong> CAD design minimizes material waste</li>
          <li><strong>Chemical Management:</strong> Closed-loop systems for cleaning and polishing</li>
          <li><strong>Packaging:</strong> Biodegradable and recyclable materials only</li>
          <li><strong>Water Conservation:</strong> Recirculation systems in all processes</li>
        </ul>

        <h2>Social Impact</h2>
        
        <h3>Community Development</h3>
        <p>
          We believe that beautiful jewelry should create positive impact for the communities 
          that make it possible:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-red-50 rounded-lg p-6">
            <h4 className="font-semibold text-red-800 mb-3">Mining Communities</h4>
            <ul className="text-red-700 mb-0">
              <li>Education funding</li>
              <li>Healthcare initiatives</li>
              <li>Infrastructure development</li>
              <li>Skills training programs</li>
            </ul>
          </div>
          <div className="bg-blue-50 rounded-lg p-6">
            <h4 className="font-semibold text-blue-800 mb-3">Artisan Support</h4>
            <ul className="text-blue-700 mb-0">
              <li>Fair wage guarantees</li>
              <li>Continuing education</li>
              <li>Tool and equipment funding</li>
              <li>Apprenticeship programs</li>
            </ul>
          </div>
          <div className="bg-green-50 rounded-lg p-6">
            <h4 className="font-semibold text-green-800 mb-3">Local Economy</h4>
            <ul className="text-green-700 mb-0">
              <li>Preferential local hiring</li>
              <li>Small business partnerships</li>
              <li>Community event sponsorship</li>
              <li>Scholarship programs</li>
            </ul>
          </div>
        </div>

        <h3>Fair Labor Practices</h3>
        <p>
          We ensure that everyone involved in creating our jewelry is treated with 
          dignity and compensated fairly:
        </p>
        <ul>
          <li><strong>Living Wages:</strong> All workers receive compensation above local living wage standards</li>
          <li><strong>Safe Working Conditions:</strong> Regular safety audits and training programs</li>
          <li><strong>No Child Labor:</strong> Strict age verification and education support</li>
          <li><strong>Gender Equality:</strong> Equal opportunities and pay regardless of gender</li>
          <li><strong>Workers' Rights:</strong> Freedom of association and collective bargaining</li>
        </ul>

        <h2>Sustainable Innovations</h2>
        
        <h3>Laboratory-Grown Alternatives</h3>
        <p>
          We offer laboratory-grown diamonds and gemstones as sustainable alternatives 
          to mined stones, providing identical beauty with reduced environmental impact:
        </p>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
          <h4 className="font-semibold text-purple-800 mb-3">Lab-Grown Benefits</h4>
          <ul className="text-purple-700 mb-0">
            <li><strong>Minimal Environmental Impact:</strong> 99% less environmental impact than mining</li>
            <li><strong>Ethical Certainty:</strong> No concerns about conflict or labor issues</li>
            <li><strong>Quality Excellence:</strong> Identical chemical and physical properties</li>
            <li><strong>Innovation Support:</strong> Funding advanced scientific research</li>
            <li><strong>Cost Effectiveness:</strong> Superior value for exceptional quality</li>
          </ul>
        </div>

        <h3>Recycled Materials Program</h3>
        <p>
          We actively work with clients to recycle existing jewelry into new pieces, 
          extending the life of precious materials:
        </p>
        <ul>
          <li><strong>Heirloom Transformation:</strong> Redesigning inherited jewelry</li>
          <li><strong>Metal Recovery:</strong> Extracting and purifying precious metals</li>
          <li><strong>Gemstone Repurposing:</strong> Resetting stones in new designs</li>
          <li><strong>Credit Programs:</strong> Value credit for materials contributed</li>
          <li><strong>Documentation:</strong> Maintaining provenance of recycled elements</li>
        </ul>

        <h2>Transparency & Certification</h2>
        
        <h3>Third-Party Verification</h3>
        <p>
          Our sustainability practices are verified by independent organizations to ensure 
          accountability and continuous improvement:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certification</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Focus Area</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Responsible Jewellery Council</td>
                <td className="px-6 py-4 text-sm text-gray-500">RJC</td>
                <td className="px-6 py-4 text-sm text-gray-500">Ethical business practices</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Fairmined Certification</td>
                <td className="px-6 py-4 text-sm text-gray-500">Alliance for Responsible Mining</td>
                <td className="px-6 py-4 text-sm text-gray-500">Responsible mining practices</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">B Corp Certification</td>
                <td className="px-6 py-4 text-sm text-gray-500">B Lab</td>
                <td className="px-6 py-4 text-sm text-gray-500">Social and environmental performance</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Carbon Trust Standard</td>
                <td className="px-6 py-4 text-sm text-gray-500">Carbon Trust</td>
                <td className="px-6 py-4 text-sm text-gray-500">Carbon footprint reduction</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Supply Chain Transparency</h3>
        <p>
          We maintain detailed records of our supply chain and make this information 
          available to clients who want to understand the journey of their jewelry:
        </p>
        <ul>
          <li><strong>Source Documentation:</strong> Mine or laboratory of origin</li>
          <li><strong>Chain of Custody:</strong> Complete handling record</li>
          <li><strong>Processing History:</strong> All cutting, treatment, and manufacturing steps</li>
          <li><strong>Impact Assessment:</strong> Environmental and social impact analysis</li>
          <li><strong>Certification Trail:</strong> All relevant certifications and verifications</li>
        </ul>

        <h2>Future Commitments</h2>
        
        <h3>2030 Sustainability Goals</h3>
        <p>
          We have set ambitious goals for the decade ahead:
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h4 className="font-semibold text-blue-800 mb-3">Our 2030 Targets</h4>
          <ul className="text-blue-700 mb-0">
            <li>✓ Carbon neutral operations by 2025 (achieved)</li>
            <li>• 100% traceable supply chain by 2027</li>
            <li>• 75% recycled precious metal content by 2028</li>
            <li>• Zero waste to landfill by 2029</li>
            <li>• Climate positive impact by 2030</li>
            <li>• $1M annual community investment by 2030</li>
          </ul>
        </div>

        <h3>Innovation Investment</h3>
        <p>
          We commit 5% of annual revenue to research and development of more sustainable 
          jewelry technologies and practices:
        </p>
        <ul>
          <li><strong>New Materials:</strong> Research into sustainable alternatives</li>
          <li><strong>Process Innovation:</strong> Cleaner manufacturing techniques</li>
          <li><strong>Technology Development:</strong> Blockchain traceability systems</li>
          <li><strong>Partnership Programs:</strong> Collaborating with universities and NGOs</li>
        </ul>

        <h2>Client Participation</h2>
        
        <h3>Sustainable Choices</h3>
        <p>
          We offer multiple ways for clients to participate in our sustainability mission:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-green-50 rounded-lg p-6">
            <h4 className="font-semibold text-green-800 mb-3">Eco-Friendly Options</h4>
            <ul className="text-green-700 mb-0">
              <li>Laboratory-grown gemstones</li>
              <li>Recycled precious metals</li>
              <li>Vintage and antique pieces</li>
              <li>Minimalist packaging</li>
              <li>Digital certificates only</li>
            </ul>
          </div>
          <div className="bg-amber-50 rounded-lg p-6">
            <h4 className="font-semibold text-amber-800 mb-3">Impact Programs</h4>
            <ul className="text-amber-700 mb-0">
              <li>Tree planting for each purchase</li>
              <li>Education fund contributions</li>
              <li>Artisan support premiums</li>
              <li>Take-back recycling program</li>
              <li>Sustainability reporting</li>
            </ul>
          </div>
        </div>

        <h3>Educational Resources</h3>
        <p>
          We provide comprehensive information to help clients make informed, sustainable choices:
        </p>
        <ul>
          <li><strong>Sustainability Reports:</strong> Annual transparency reports</li>
          <li><strong>Impact Calculators:</strong> Environmental footprint tools</li>
          <li><strong>Educational Workshops:</strong> Sustainable jewelry seminars</li>
          <li><strong>Digital Resources:</strong> Online sustainability library</li>
          <li><strong>Consultation Services:</strong> Personalized sustainability guidance</li>
        </ul>

        <h2>Partnerships for Change</h2>
        
        <h3>Industry Collaboration</h3>
        <p>
          We work with industry partners, NGOs, and government organizations to drive 
          systemic change in the jewelry industry:
        </p>
        <ul>
          <li><strong>Industry Initiatives:</strong> Supporting responsible mining standards</li>
          <li><strong>Research Partnerships:</strong> Funding sustainability research</li>
          <li><strong>Policy Advocacy:</strong> Supporting responsible trade legislation</li>
          <li><strong>Standard Development:</strong> Contributing to new certification programs</li>
          <li><strong>Knowledge Sharing:</strong> Open-source sustainability practices</li>
        </ul>

        <h3>Community Organizations</h3>
        <p>
          We support organizations working to improve conditions in mining communities 
          and advance environmental protection:
        </p>
        <ul>
          <li>Alliance for Responsible Mining</li>
          <li>IMPACT (formerly Partnership Africa Canada)</li>
          <li>Diamond Development Initiative</li>
          <li>Artisanal Gold Council</li>
          <li>Women in Mining organizations</li>
        </ul>

        <h2>Measuring Our Impact</h2>
        
        <h3>Annual Sustainability Report</h3>
        <p>
          Each year, we publish a comprehensive report detailing our progress on 
          sustainability goals, including:
        </p>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Report Contents</h4>
          <ul className="mb-0">
            <li>Carbon footprint analysis and reduction achievements</li>
            <li>Supply chain improvements and new partnerships</li>
            <li>Community investment and impact measurement</li>
            <li>Innovation developments and research outcomes</li>
            <li>Third-party verification results</li>
            <li>Challenges faced and lessons learned</li>
            <li>Goals for the upcoming year</li>
          </ul>
        </div>

        <h2>Get Involved</h2>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-2">Join Our Mission</h3>
          <p className="text-green-700 mb-3">
            Learn more about our sustainability initiatives and how you can participate:
          </p>
          <p className="text-green-700 mb-1"><strong>Sustainability Team:</strong> sustainability@rareregalia.com</p>
          <p className="text-green-700 mb-1"><strong>Impact Reports:</strong> Download at rareregalia.com/impact</p>
          <p className="text-green-700 mb-1"><strong>Educational Workshops:</strong> Monthly sustainability seminars</p>
          <p className="text-green-700 mb-0"><strong>Partnership Inquiries:</strong> partnerships@rareregalia.com</p>
        </div>
      </div>
    </div>
  );
}