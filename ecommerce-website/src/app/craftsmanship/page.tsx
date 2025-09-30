import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Exceptional Craftsmanship | Rare Regalia',
  description: 'Discover the artistry and precision behind every Rare Regalia piece. Learn about our master craftsmen, traditional techniques, and modern innovations.',
};

export default function CraftsmanshipPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Exceptional Craftsmanship</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Where centuries-old traditions meet modern precision to create extraordinary jewelry
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-amber-800 mb-2">Our Commitment to Excellence</h2>
          <p className="text-amber-700 mb-0">
            Every piece of Rare Regalia jewelry represents hundreds of hours of meticulous craftsmanship, 
            combining time-honored techniques with cutting-edge technology to achieve perfection in every detail.
          </p>
        </div>

        <h2>Master Artisans</h2>
        
        <h3>Heritage of Excellence</h3>
        <p>
          Our team of master craftsmen brings together decades of experience, with many having trained 
          under legendary jewelry artisans. Each craftsman specializes in specific techniques, from 
          stone setting and engraving to metalwork and finishing, ensuring that every aspect of 
          creation meets our exacting standards.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-3">Traditional Expertise</h4>
            <ul className="mb-0">
              <li>Hand engraving and milgrain work</li>
              <li>Traditional stone setting techniques</li>
              <li>Classical metalsmithing methods</li>
              <li>Antique restoration skills</li>
              <li>Historical jewelry reproduction</li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-3">Modern Innovation</h4>
            <ul className="mb-0">
              <li>CAD/CAM design and prototyping</li>
              <li>Laser welding and cutting</li>
              <li>Advanced alloy formulations</li>
              <li>Precision machining techniques</li>
              <li>Quality control microscopy</li>
            </ul>
          </div>
        </div>

        <h2>The Creation Process</h2>
        
        <h3>Design and Conceptualization</h3>
        <p>
          Every piece begins with inspiration - whether from historical artifacts, natural forms, 
          or contemporary art. Our designers work closely with clients to translate vision into 
          reality, using both traditional sketching and advanced 3D modeling to perfect every detail 
          before production begins.
        </p>

        <h3>Material Selection</h3>
        <p>
          We source only the finest materials from trusted suppliers worldwide. Each gemstone is 
          hand-selected for its exceptional beauty, cut, and clarity. Our precious metals are 
          refined to the highest purity standards, ensuring longevity and brilliance that will 
          last generations.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h4 className="font-semibold text-blue-800 mb-3">Quality Standards</h4>
          <ul className="text-blue-700 mb-0">
            <li><strong>Gemstones:</strong> Only top 5% quality grades accepted</li>
            <li><strong>Diamonds:</strong> Minimum VS clarity, F color for white diamonds</li>
            <li><strong>Gold:</strong> 18K minimum, with options up to 22K</li>
            <li><strong>Platinum:</strong> 950 platinum for durability and purity</li>
            <li><strong>Silver:</strong> Sterling silver (.925) with anti-tarnish treatment</li>
          </ul>
        </div>

        <h3>Precision Manufacturing</h3>
        
        <h4>Metalwork Excellence</h4>
        <p>
          Our metalwork combines traditional forging and forming techniques with modern precision. 
          Each piece is carefully shaped, ensuring proper proportions and structural integrity. 
          We employ techniques such as:
        </p>
        <ul>
          <li><strong>Hand Forging:</strong> Creating unique textures and forms</li>
          <li><strong>Lost Wax Casting:</strong> For complex designs with fine detail</li>
          <li><strong>Fabrication:</strong> Building pieces from individual components</li>
          <li><strong>Hydraulic Press Work:</strong> For uniform forming and texture</li>
          <li><strong>Laser Welding:</strong> Invisible joins with minimal heat distortion</li>
        </ul>

        <h4>Stone Setting Mastery</h4>
        <p>
          Our stone setters are among the most skilled in the industry, capable of executing 
          even the most challenging settings with precision and artistry:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Setting Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Technique</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialty</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Prong Setting</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Hand-cut and shaped prongs</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Maximum light transmission</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Bezel Setting</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Precision-fitted metal rim</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Ultimate security</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Pavé Setting</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Micro-drilling and setting</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Seamless diamond surface</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Channel Setting</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Precise groove cutting</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Continuous stone line</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Invisible Setting</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Groove-cut gemstones</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No visible metal</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Finishing Excellence</h2>
        
        <h3>Surface Treatments</h3>
        <p>
          The final appearance of each piece depends on meticulous finishing work. Our craftsmen 
          employ a variety of techniques to achieve the perfect surface:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-3">Polishing</h4>
            <ul className="mb-0">
              <li>High-polish mirror finish</li>
              <li>Satin brush finish</li>
              <li>Matte oxidized finish</li>
              <li>Antique patina effects</li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-3">Texturing</h4>
            <ul className="mb-0">
              <li>Hand-hammered surfaces</li>
              <li>Florentine engraving</li>
              <li>Milgrain beading</li>
              <li>Diamond-cut patterns</li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-3">Specialized Coatings</h4>
            <ul className="mb-0">
              <li>Rhodium plating</li>
              <li>Rose gold plating</li>
              <li>Black ruthenium</li>
              <li>Anti-tarnish treatments</li>
            </ul>
          </div>
        </div>

        <h2>Quality Assurance</h2>
        
        <h3>Multi-Stage Inspection</h3>
        <p>
          Every piece undergoes rigorous quality control at multiple stages of production. 
          Our inspection process includes:
        </p>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <h4 className="font-semibold text-green-800 mb-3">Inspection Checkpoints</h4>
          <ol className="text-green-700 mb-0">
            <li><strong>Design Review:</strong> CAD model verification and approval</li>
            <li><strong>Material Inspection:</strong> Gemstone and metal quality verification</li>
            <li><strong>Production Monitoring:</strong> In-process quality checks</li>
            <li><strong>Setting Verification:</strong> Stone security and alignment</li>
            <li><strong>Finish Inspection:</strong> Surface quality and consistency</li>
            <li><strong>Final Approval:</strong> Comprehensive quality assessment</li>
          </ol>
        </div>

        <h3>Testing and Certification</h3>
        <ul>
          <li><strong>Stress Testing:</strong> Durability and wear resistance</li>
          <li><strong>Dimensional Accuracy:</strong> Precision measurement verification</li>
          <li><strong>Metal Purity Testing:</strong> Alloy composition verification</li>
          <li><strong>Gemstone Authentication:</strong> Independent laboratory certification</li>
          <li><strong>Photo Documentation:</strong> Complete visual record of finished piece</li>
        </ul>

        <h2>Specialized Techniques</h2>
        
        <h3>Hand Engraving</h3>
        <p>
          Our master engravers create intricate patterns and personal inscriptions using 
          traditional hand tools. This centuries-old art form adds a unique, personal 
          touch that cannot be replicated by machine.
        </p>

        <h3>Micro Setting</h3>
        <p>
          For pieces requiring the smallest diamonds and gemstones, our micro-setting 
          specialists work under high-powered microscopes to achieve precision measured 
          in hundredths of millimeters.
        </p>

        <h3>Antique Reproduction</h3>
        <p>
          We specialize in recreating historical jewelry pieces using period-appropriate 
          techniques and materials, ensuring authenticity in every detail while meeting 
          modern durability standards.
        </p>

        <h2>Innovation and Tradition</h2>
        
        <h3>Technology Integration</h3>
        <p>
          While honoring traditional methods, we embrace technology that enhances precision 
          and enables new creative possibilities:
        </p>
        <ul>
          <li><strong>3D Printing:</strong> Rapid prototyping and complex geometries</li>
          <li><strong>Laser Technology:</strong> Precise cutting and welding</li>
          <li><strong>Digital Microscopy:</strong> Enhanced quality control</li>
          <li><strong>Computer Modeling:</strong> Stress analysis and optimization</li>
          <li><strong>Virtual Reality:</strong> Design visualization and client consultation</li>
        </ul>

        <h3>Continuous Learning</h3>
        <p>
          Our craftsmen regularly attend workshops, seminars, and training programs to 
          stay current with new techniques and technologies. We also collaborate with 
          jewelry schools and industry experts to advance the art of fine jewelry making.
        </p>

        <h2>Sustainability in Craftsmanship</h2>
        
        <h3>Responsible Practices</h3>
        <ul>
          <li><strong>Material Efficiency:</strong> Minimizing waste through precise planning</li>
          <li><strong>Recycling:</strong> Reclaiming and reusing precious metals</li>
          <li><strong>Energy Conservation:</strong> Efficient workshop design and equipment</li>
          <li><strong>Tool Longevity:</strong> Maintaining and restoring rather than replacing</li>
          <li><strong>Knowledge Preservation:</strong> Training the next generation of craftsmen</li>
        </ul>

        <h2>Custom Craftsmanship Services</h2>
        
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-purple-800 mb-2">Bespoke Creation</h3>
          <p className="text-purple-700 mb-3">
            Experience the ultimate in personalized jewelry with our bespoke creation service:
          </p>
          <ul className="text-purple-700 mb-0">
            <li>✓ One-on-one designer consultation</li>
            <li>✓ Custom CAD design and modeling</li>
            <li>✓ Hand-selected materials</li>
            <li>✓ Regular progress updates</li>
            <li>✓ Lifetime craftsmanship warranty</li>
          </ul>
        </div>

        <h2>Visit Our Workshop</h2>
        <p>
          Experience our craftsmanship firsthand with a guided tour of our workshop. 
          See master artisans at work, learn about traditional techniques, and gain 
          appreciation for the skill and dedication that goes into every piece.
        </p>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-2">Workshop Tours</h3>
          <p className="mb-2">Schedule a private tour to see exceptional craftsmanship in action:</p>
          <p className="mb-1"><strong>Tours Available:</strong> Tuesday - Thursday, 2PM - 4PM</p>
          <p className="mb-1"><strong>Duration:</strong> 90 minutes</p>
          <p className="mb-1"><strong>Group Size:</strong> Maximum 6 people</p>
          <p className="mb-1"><strong>Booking:</strong> tours@rareregalia.com</p>
          <p className="mb-0"><strong>Advance Notice:</strong> 1 week minimum</p>
        </div>
      </div>
    </div>
  );
}