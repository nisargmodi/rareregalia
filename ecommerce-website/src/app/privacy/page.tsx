import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Rare Regalia',
  description: 'Our commitment to protecting your privacy and personal information. Learn how we collect, use, and safeguard your data.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
        </p>
        <p className="text-sm text-gray-500 mt-4">Last updated: January 1, 2024</p>
      </div>

      <div className="prose prose-lg max-w-none">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">Privacy Commitment</h2>
          <p className="text-blue-700 mb-0">
            Rare Regalia is committed to protecting your privacy and ensuring the security of your personal 
            information. We follow industry best practices and comply with applicable privacy laws.
          </p>
        </div>

        <h2>Information We Collect</h2>
        
        <h3>Personal Information</h3>
        <p>
          We collect personal information that you voluntarily provide when using our services:
        </p>
        <ul>
          <li><strong>Contact Information:</strong> Name, email address, phone number, mailing address</li>
          <li><strong>Account Information:</strong> Username, password, account preferences</li>
          <li><strong>Purchase Information:</strong> Billing address, shipping address, payment information</li>
          <li><strong>Communication:</strong> Messages, inquiries, and correspondence with us</li>
          <li><strong>Consultation Data:</strong> Preferences, requirements, and design specifications</li>
        </ul>

        <h3>Automatically Collected Information</h3>
        <p>
          When you visit our website or use our services, we automatically collect certain information:
        </p>
        <ul>
          <li><strong>Technical Information:</strong> IP address, browser type, operating system, device information</li>
          <li><strong>Usage Data:</strong> Pages visited, time spent, clicks, search queries</li>
          <li><strong>Cookies and Tracking:</strong> Website preferences, session information, analytics data</li>
          <li><strong>Location Data:</strong> General geographic location (country/city level)</li>
        </ul>

        <h2>How We Use Your Information</h2>
        
        <h3>Primary Uses</h3>
        <p>
          We use your personal information for the following purposes:
        </p>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Service Provision</h4>
          <ul className="mb-0">
            <li>Processing and fulfilling orders</li>
            <li>Managing your account and preferences</li>
            <li>Providing customer support</li>
            <li>Scheduling appointments and consultations</li>
            <li>Creating custom jewelry designs</li>
          </ul>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Communication</h4>
          <ul className="mb-0">
            <li>Responding to inquiries and requests</li>
            <li>Sending order confirmations and updates</li>
            <li>Providing care and maintenance information</li>
            <li>Sharing relevant product information</li>
            <li>Sending newsletters (with consent)</li>
          </ul>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h4 className="font-semibant text-gray-900 mb-3">Business Operations</h4>
          <ul className="mb-0">
            <li>Improving our products and services</li>
            <li>Analyzing website usage and performance</li>
            <li>Preventing fraud and ensuring security</li>
            <li>Complying with legal obligations</li>
            <li>Conducting business analysis and research</li>
          </ul>
        </div>

        <h2>Information Sharing and Disclosure</h2>
        
        <h3>When We Share Information</h3>
        <p>
          We do not sell your personal information. We may share your information in limited circumstances:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Information Shared</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Service Providers</td>
                <td className="px-6 py-4 text-sm text-gray-500">Payment processing, shipping, customer support</td>
                <td className="px-6 py-4 text-sm text-gray-500">Necessary for service delivery</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Legal Authorities</td>
                <td className="px-6 py-4 text-sm text-gray-500">Legal compliance, court orders, investigations</td>
                <td className="px-6 py-4 text-sm text-gray-500">As required by law</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Business Partners</td>
                <td className="px-6 py-4 text-sm text-gray-500">Authorized repairs, certifications, appraisals</td>
                <td className="px-6 py-4 text-sm text-gray-500">Relevant to specific services</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Successors</td>
                <td className="px-6 py-4 text-sm text-gray-500">Business sale, merger, or acquisition</td>
                <td className="px-6 py-4 text-sm text-gray-500">As part of business transfer</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Third-Party Service Providers</h3>
        <p>
          We work with trusted service providers who assist us in operating our business:
        </p>
        <ul>
          <li><strong>Payment Processors:</strong> Secure credit card and payment processing</li>
          <li><strong>Shipping Companies:</strong> Order fulfillment and delivery services</li>
          <li><strong>Cloud Services:</strong> Data storage and computing infrastructure</li>
          <li><strong>Analytics Providers:</strong> Website performance and usage analysis</li>
          <li><strong>Marketing Platforms:</strong> Email delivery and campaign management</li>
        </ul>

        <h2>Data Security</h2>
        
        <h3>Security Measures</h3>
        <p>
          We implement comprehensive security measures to protect your personal information:
        </p>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <h4 className="font-semibold text-green-800 mb-3">Technical Safeguards</h4>
          <ul className="text-green-700 mb-0">
            <li>SSL/TLS encryption for data transmission</li>
            <li>AES-256 encryption for data storage</li>
            <li>Multi-factor authentication for system access</li>
            <li>Regular security audits and penetration testing</li>
            <li>Firewall protection and intrusion detection</li>
          </ul>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <h4 className="font-semibold text-green-800 mb-3">Administrative Safeguards</h4>
          <ul className="text-green-700 mb-0">
            <li>Employee background checks and training</li>
            <li>Access controls and least privilege principles</li>
            <li>Data handling policies and procedures</li>
            <li>Incident response and breach notification plans</li>
            <li>Regular policy reviews and updates</li>
          </ul>
        </div>

        <h3>Payment Security</h3>
        <p>
          We never store complete credit card information on our servers. All payment processing 
          is handled by PCI DSS compliant payment processors using industry-standard encryption.
        </p>

        <h2>Your Privacy Rights</h2>
        
        <h3>Access and Control</h3>
        <p>
          You have various rights regarding your personal information:
        </p>
        <ul>
          <li><strong>Access:</strong> Request copies of your personal information</li>
          <li><strong>Correction:</strong> Request correction of inaccurate information</li>
          <li><strong>Deletion:</strong> Request deletion of your personal information</li>
          <li><strong>Portability:</strong> Request transfer of your data to another service</li>
          <li><strong>Objection:</strong> Object to certain uses of your information</li>
          <li><strong>Restriction:</strong> Request limitation of data processing</li>
        </ul>

        <h3>Communication Preferences</h3>
        <p>
          You can control how we communicate with you:
        </p>
        <ul>
          <li><strong>Email Preferences:</strong> Update subscription preferences in your account</li>
          <li><strong>Unsubscribe:</strong> Use unsubscribe links in our emails</li>
          <li><strong>Account Settings:</strong> Modify notification preferences</li>
          <li><strong>Contact Us:</strong> Request changes by contacting our privacy team</li>
        </ul>

        <h2>Cookies and Tracking</h2>
        
        <h3>Types of Cookies We Use</h3>
        <p>
          Our website uses various types of cookies to enhance your experience:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cookie Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Essential</td>
                <td className="px-6 py-4 text-sm text-gray-500">Website functionality and security</td>
                <td className="px-6 py-4 text-sm text-gray-500">Session/Necessary</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Functional</td>
                <td className="px-6 py-4 text-sm text-gray-500">Remember preferences and settings</td>
                <td className="px-6 py-4 text-sm text-gray-500">1-24 months</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Analytics</td>
                <td className="px-6 py-4 text-sm text-gray-500">Usage analysis and performance monitoring</td>
                <td className="px-6 py-4 text-sm text-gray-500">1-24 months</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Marketing</td>
                <td className="px-6 py-4 text-sm text-gray-500">Personalized content and advertising</td>
                <td className="px-6 py-4 text-sm text-gray-500">1-24 months</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Managing Cookies</h3>
        <p>
          You can control cookies through your browser settings:
        </p>
        <ul>
          <li><strong>Browser Settings:</strong> Disable or delete cookies in your browser preferences</li>
          <li><strong>Cookie Preferences:</strong> Use our cookie preference center</li>
          <li><strong>Do Not Track:</strong> We respect Do Not Track browser signals</li>
          <li><strong>Third-Party Cookies:</strong> Opt out of third-party tracking</li>
        </ul>

        <h2>International Data Transfers</h2>
        
        <h3>Cross-Border Processing</h3>
        <p>
          We may transfer your personal information to countries outside your residence for processing. 
          We ensure appropriate safeguards are in place:
        </p>
        <ul>
          <li><strong>Adequacy Decisions:</strong> Transfers to countries with adequate protection</li>
          <li><strong>Standard Contractual Clauses:</strong> EU-approved data transfer agreements</li>
          <li><strong>Certification Programs:</strong> Privacy Shield and similar frameworks</li>
          <li><strong>Binding Corporate Rules:</strong> Internal data protection standards</li>
        </ul>

        <h2>Data Retention</h2>
        
        <h3>Retention Periods</h3>
        <p>
          We retain personal information only as long as necessary for legitimate business purposes:
        </p>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
          <h4 className="font-semibold text-yellow-800 mb-3">Retention Guidelines</h4>
          <ul className="text-yellow-700 mb-0">
            <li><strong>Account Information:</strong> Until account deletion or 7 years after last activity</li>
            <li><strong>Purchase Records:</strong> 7 years for tax and warranty purposes</li>
            <li><strong>Communication Records:</strong> 3 years or until resolution of issues</li>
            <li><strong>Analytics Data:</strong> 2 years in aggregated, anonymized form</li>
            <li><strong>Marketing Data:</strong> Until unsubscribed or 3 years of inactivity</li>
          </ul>
        </div>

        <h3>Secure Deletion</h3>
        <p>
          When personal information is no longer needed, we securely delete it using industry-standard 
          data destruction methods to prevent unauthorized recovery.
        </p>

        <h2>Children's Privacy</h2>
        
        <h3>Age Restrictions</h3>
        <p>
          Our services are not intended for children under 16 years of age. We do not knowingly 
          collect personal information from children under 16. If we become aware that we have 
          collected such information, we will promptly delete it.
        </p>

        <h3>Parental Controls</h3>
        <p>
          If you are a parent or guardian and believe your child has provided us with personal 
          information, please contact us immediately so we can remove the information.
        </p>

        <h2>Changes to This Policy</h2>
        
        <h3>Policy Updates</h3>
        <p>
          We may update this privacy policy periodically to reflect changes in our practices 
          or applicable laws. We will notify you of material changes through:
        </p>
        <ul>
          <li><strong>Website Notice:</strong> Prominent notice on our homepage</li>
          <li><strong>Email Notification:</strong> Direct notification to registered users</li>
          <li><strong>Account Dashboard:</strong> Notification in your account area</li>
          <li><strong>Version Control:</strong> Clear indication of policy version and date</li>
        </ul>

        <h2>Legal Basis for Processing</h2>
        
        <h3>GDPR Compliance</h3>
        <p>
          For users in the European Union, we process personal information based on:
        </p>
        <ul>
          <li><strong>Contract Performance:</strong> Processing necessary to fulfill our services</li>
          <li><strong>Legitimate Interests:</strong> Business operations, fraud prevention, analytics</li>
          <li><strong>Legal Obligation:</strong> Compliance with applicable laws</li>
          <li><strong>Consent:</strong> Marketing communications and optional services</li>
        </ul>

        <h2>Contact Information</h2>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">Privacy Inquiries</h3>
          <p className="mb-3">
            If you have questions about this privacy policy or want to exercise your privacy rights:
          </p>
          <p className="mb-1"><strong>Privacy Officer:</strong> privacy@rareregalia.com</p>
          <p className="mb-1"><strong>Data Protection Officer:</strong> dpo@rareregalia.com</p>
          <p className="mb-1"><strong>Phone:</strong> +1 (555) 123-4567</p>
          <p className="mb-1"><strong>Mail:</strong> Rare Regalia Privacy Team, 123 Luxury Lane, Suite 100, New York, NY 10001</p>
          <p className="mb-0"><strong>Response Time:</strong> We respond to privacy requests within 30 days</p>
        </div>

        <h3>Supervisory Authority</h3>
        <p>
          If you are in the European Union and have concerns about our data processing, 
          you have the right to lodge a complaint with your local data protection authority.
        </p>

        <h2>Effective Date</h2>
        <p>
          This privacy policy is effective as of January 1, 2024, and will remain in effect 
          until updated. Your continued use of our services after any changes indicates your 
          acceptance of the updated policy.
        </p>
      </div>
    </div>
  );
}