import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Certifications & Authentication | Rare Regalia',
  description: 'Learn about our gemstone certifications, authentication processes, and quality guarantees. Trust in verified excellence.',
};

export default function CertificationsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Certifications & Authentication</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Verified excellence through rigorous testing and certification by leading gemological institutes
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-green-800 mb-2">Our Certification Promise</h2>
          <p className="text-green-700 mb-0">
            Every gemstone and diamond in our collection comes with independent certification from 
            recognized gemological laboratories, ensuring authenticity, quality, and accurate grading.
          </p>
        </div>

        <h2>Gemological Institutes</h2>
        
        <h3>Primary Certification Partners</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="font-semibold text-blue-800 mb-3">Gemological Institute of America (GIA)</h4>
            <p className="text-blue-700 mb-3">
              The world's most trusted name in gemstone grading, providing unbiased assessment 
              of diamond and colored stone quality.
            </p>
            <ul className="text-blue-700 mb-0">
              <li>Diamond grading reports</li>
              <li>Colored stone identification</li>
              <li>Pearl grading certificates</li>
              <li>Jewelry identification reports</li>
            </ul>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h4 className="font-semibold text-purple-800 mb-3">American Gemological Laboratories (AGL)</h4>
            <p className="text-purple-700 mb-3">
              Specializing in colored gemstone identification and origin determination, 
              particularly for rare and valuable specimens.
            </p>
            <ul className="text-purple-700 mb-0">
              <li>Colored stone reports</li>
              <li>Origin determination</li>
              <li>Treatment identification</li>
              <li>Prestige gemstone documentation</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h4 className="font-semibold text-red-800 mb-3">Gübelin Gem Lab</h4>
            <p className="text-red-700 mb-3">
              Swiss excellence in gemstone identification, renowned for colored stone 
              expertise and provenance research.
            </p>
            <ul className="text-red-700 mb-0">
              <li>Premium colored stone reports</li>
              <li>Provenance determination</li>
              <li>Historical gemstone analysis</li>
              <li>Exceptional stone documentation</li>
            </ul>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <h4 className="font-semibold text-amber-800 mb-3">SSEF (Swiss Gemmological Institute)</h4>
            <p className="text-amber-700 mb-3">
              Leading European authority on gemstone identification and analysis, 
              specializing in natural vs. synthetic determination.
            </p>
            <ul className="text-amber-700 mb-0">
              <li>Natural vs. synthetic identification</li>
              <li>Treatment analysis</li>
              <li>Advanced spectroscopy</li>
              <li>Research-grade documentation</li>
            </ul>
          </div>
        </div>

        <h2>Diamond Certification</h2>
        
        <h3>The 4 C's Grading</h3>
        <p>
          Every diamond is evaluated using the internationally recognized 4 C's standard:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Criteria</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grading Scale</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Cut</td>
                <td className="px-6 py-4 text-sm text-gray-500">Proportions, symmetry, and polish quality</td>
                <td className="px-6 py-4 text-sm text-gray-500">Excellent, Very Good, Good, Fair, Poor</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Color</td>
                <td className="px-6 py-4 text-sm text-gray-500">Absence of color in white diamonds</td>
                <td className="px-6 py-4 text-sm text-gray-500">D (colorless) to Z (light yellow/brown)</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Clarity</td>
                <td className="px-6 py-4 text-sm text-gray-500">Internal and external characteristics</td>
                <td className="px-6 py-4 text-sm text-gray-500">FL, IF, VVS1, VVS2, VS1, VS2, SI1, SI2, I1-I3</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Carat Weight</td>
                <td className="px-6 py-4 text-sm text-gray-500">Precise weight measurement</td>
                <td className="px-6 py-4 text-sm text-gray-500">Measured to the hundredth of a carat</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Advanced Diamond Analysis</h3>
        <ul>
          <li><strong>Fluorescence:</strong> Response to ultraviolet light</li>
          <li><strong>Polish:</strong> Surface smoothness and luster</li>
          <li><strong>Symmetry:</strong> Alignment and placement of facets</li>
          <li><strong>Proportions:</strong> Mathematical relationships between facets</li>
          <li><strong>Origin:</strong> Natural vs. laboratory-grown identification</li>
        </ul>

        <h2>Colored Gemstone Certification</h2>
        
        <h3>Identification and Authentication</h3>
        <p>
          Colored gemstones require specialized analysis to determine their identity, 
          origin, and any treatments they may have received:
        </p>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Testing Methods</h4>
          <ul className="mb-0">
            <li><strong>Spectroscopy:</strong> Chemical composition analysis</li>
            <li><strong>Microscopic Examination:</strong> Internal structure study</li>
            <li><strong>Refractive Index:</strong> Light bending properties</li>
            <li><strong>Specific Gravity:</strong> Density measurement</li>
            <li><strong>UV Fluorescence:</strong> Response to ultraviolet light</li>
            <li><strong>Photoluminescence:</strong> Advanced optical properties</li>
          </ul>
        </div>

        <h3>Origin Determination</h3>
        <p>
          For premium colored gemstones, origin can significantly impact value. 
          Our certification includes geographical origin when determinable:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-red-50 rounded-lg p-6">
            <h4 className="font-semibold text-red-800 mb-3">Ruby Origins</h4>
            <ul className="text-red-700 mb-0">
              <li>Burma (Myanmar)</li>
              <li>Mozambique</li>
              <li>Madagascar</li>
              <li>Thailand</li>
              <li>Sri Lanka</li>
            </ul>
          </div>
          <div className="bg-blue-50 rounded-lg p-6">
            <h4 className="font-semibold text-blue-800 mb-3">Sapphire Origins</h4>
            <ul className="text-blue-700 mb-0">
              <li>Kashmir</li>
              <li>Ceylon (Sri Lanka)</li>
              <li>Madagascar</li>
              <li>Montana</li>
              <li>Australia</li>
            </ul>
          </div>
          <div className="bg-green-50 rounded-lg p-6">
            <h4 className="font-semibold text-green-800 mb-3">Emerald Origins</h4>
            <ul className="text-green-700 mb-0">
              <li>Colombia</li>
              <li>Zambia</li>
              <li>Brazil</li>
              <li>Madagascar</li>
              <li>Afghanistan</li>
            </ul>
          </div>
        </div>

        <h2>Treatment Disclosure</h2>
        
        <h3>Common Gemstone Treatments</h3>
        <p>
          Many gemstones undergo treatments to enhance their appearance. All treatments 
          are fully disclosed in our certifications:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Treatment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permanence</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Common Stones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Heat Treatment</td>
                <td className="px-6 py-4 text-sm text-gray-500">Color and clarity enhancement</td>
                <td className="px-6 py-4 text-sm text-gray-500">Permanent</td>
                <td className="px-6 py-4 text-sm text-gray-500">Ruby, Sapphire, Aquamarine</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Oil/Resin Filling</td>
                <td className="px-6 py-4 text-sm text-gray-500">Clarity enhancement</td>
                <td className="px-6 py-4 text-sm text-gray-500">Stable</td>
                <td className="px-6 py-4 text-sm text-gray-500">Emerald, Ruby</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Irradiation</td>
                <td className="px-6 py-4 text-sm text-gray-500">Color change</td>
                <td className="px-6 py-4 text-sm text-gray-500">Permanent</td>
                <td className="px-6 py-4 text-sm text-gray-500">Topaz, Tourmaline</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Diffusion</td>
                <td className="px-6 py-4 text-sm text-gray-500">Surface color enhancement</td>
                <td className="px-6 py-4 text-sm text-gray-500">Permanent</td>
                <td className="px-6 py-4 text-sm text-gray-500">Sapphire, Ruby</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Authentication Technology</h2>
        
        <h3>Advanced Testing Equipment</h3>
        <p>
          Modern gemological laboratories use sophisticated equipment to ensure 
          accurate identification and grading:
        </p>
        <ul>
          <li><strong>FTIR Spectroscopy:</strong> Molecular structure analysis</li>
          <li><strong>UV-Vis Spectroscopy:</strong> Color cause determination</li>
          <li><strong>Photoluminescence:</strong> Origin indication</li>
          <li><strong>X-Ray Fluorescence:</strong> Chemical composition</li>
          <li><strong>Raman Spectroscopy:</strong> Molecular identification</li>
          <li><strong>High-Resolution Photography:</strong> Inclusion documentation</li>
        </ul>

        <h3>Digital Verification</h3>
        <p>
          Many certificates now include digital security features:
        </p>
        <ul>
          <li><strong>QR Codes:</strong> Direct verification through laboratory databases</li>
          <li><strong>Security Holograms:</strong> Anti-counterfeiting measures</li>
          <li><strong>Unique Serial Numbers:</strong> Individual certificate tracking</li>
          <li><strong>Digital Signatures:</strong> Cryptographic authentication</li>
        </ul>

        <h2>Metal Authentication</h2>
        
        <h3>Precious Metal Testing</h3>
        <p>
          All precious metals in our jewelry are tested and verified for purity:
        </p>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
          <h4 className="font-semibold text-yellow-800 mb-3">Gold Purity Standards</h4>
          <ul className="text-yellow-700 mb-0">
            <li><strong>24K Gold:</strong> 99.9% pure (hallmarked 999)</li>
            <li><strong>22K Gold:</strong> 91.7% pure (hallmarked 916)</li>
            <li><strong>18K Gold:</strong> 75.0% pure (hallmarked 750)</li>
            <li><strong>14K Gold:</strong> 58.3% pure (hallmarked 585)</li>
            <li><strong>10K Gold:</strong> 41.7% pure (hallmarked 417)</li>
          </ul>
        </div>

        <h3>Platinum and Silver</h3>
        <ul>
          <li><strong>Platinum 950:</strong> 95% pure platinum</li>
          <li><strong>Platinum 900:</strong> 90% pure platinum</li>
          <li><strong>Sterling Silver:</strong> 92.5% pure silver (925 standard)</li>
          <li><strong>Fine Silver:</strong> 99.9% pure silver</li>
        </ul>

        <h2>Certificate Reading Guide</h2>
        
        <h3>Understanding Your Certificate</h3>
        <p>
          Gemstone certificates contain detailed technical information. Here's how to 
          interpret the key sections:
        </p>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Certificate Components</h4>
          <ul className="mb-0">
            <li><strong>Header:</strong> Laboratory name, logo, and certificate type</li>
            <li><strong>Stone Details:</strong> Species, variety, and measurements</li>
            <li><strong>Grading Information:</strong> Color, clarity, cut (if applicable)</li>
            <li><strong>Treatment Information:</strong> Any enhancements disclosed</li>
            <li><strong>Origin:</strong> Geographical source (when determinable)</li>
            <li><strong>Comments:</strong> Additional observations or special notes</li>
            <li><strong>Photographs:</strong> Visual documentation of the stone</li>
          </ul>
        </div>

        <h2>Rare Regalia Quality Guarantee</h2>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Our Certification Promise</h3>
          <ul className="text-blue-700 mb-0">
            <li>✓ Independent third-party certification for all significant gemstones</li>
            <li>✓ Full disclosure of any treatments or enhancements</li>
            <li>✓ Accurate representation of all grading characteristics</li>
            <li>✓ Certificate replacement service if lost or damaged</li>
            <li>✓ Re-evaluation service for insurance updates</li>
            <li>✓ Lifetime authenticity guarantee</li>
          </ul>
        </div>

        <h2>Insurance and Appraisal</h2>
        
        <h3>Insurance Documentation</h3>
        <p>
          For insurance purposes, we provide comprehensive documentation including:
        </p>
        <ul>
          <li><strong>Detailed Appraisals:</strong> Current replacement value assessment</li>
          <li><strong>High-Resolution Photography:</strong> Visual documentation</li>
          <li><strong>Technical Specifications:</strong> Complete measurement data</li>
          <li><strong>Market Analysis:</strong> Current price justification</li>
          <li><strong>Update Service:</strong> Periodic value reassessment</li>
        </ul>

        <h3>Certified Appraisers</h3>
        <p>
          Our appraisals are conducted by certified professionals holding credentials from:
        </p>
        <ul>
          <li>American Society of Appraisers (ASA)</li>
          <li>American Gem Society (AGS)</li>
          <li>International Society of Appraisers (ISA)</li>
          <li>National Association of Jewelry Appraisers (NAJA)</li>
        </ul>

        <h2>Digital Records</h2>
        
        <h3>Secure Storage</h3>
        <p>
          All certification and authentication records are securely stored in our 
          digital archive, ensuring permanent access to your jewelry's documentation.
        </p>

        <h3>Client Portal Access</h3>
        <p>
          Access your jewelry's complete certification history through our secure 
          client portal, including original certificates, appraisal updates, and 
          service records.
        </p>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-2">Certification Services</h3>
          <p className="mb-2">Questions about certifications or need additional documentation?</p>
          <p className="mb-1"><strong>Email:</strong> certifications@rareregalia.com</p>
          <p className="mb-1"><strong>Phone:</strong> +1 (555) 123-4567</p>
          <p className="mb-1"><strong>Laboratory Verification:</strong> Direct certificate lookup available</p>
          <p className="mb-0"><strong>Appraisal Updates:</strong> Schedule through client portal</p>
        </div>
      </div>
    </div>
  );
}