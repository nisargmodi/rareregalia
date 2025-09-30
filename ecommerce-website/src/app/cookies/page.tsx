import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy | Rare Regalia',
  description: 'Learn about how we use cookies and similar technologies to enhance your browsing experience and improve our services.',
};

export default function CookiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Understanding how we use cookies and similar technologies to improve your experience
        </p>
        <p className="text-sm text-gray-500 mt-4">Last updated: January 1, 2024</p>
      </div>

      <div className="prose prose-lg max-w-none">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">What Are Cookies?</h2>
          <p className="text-blue-700 mb-0">
            Cookies are small text files stored on your device when you visit our website. 
            They help us provide you with a better browsing experience and allow our website to function properly.
          </p>
        </div>

        <h2>Types of Cookies We Use</h2>
        
        <h3>Essential Cookies</h3>
        <p>
          These cookies are necessary for our website to function properly and cannot be disabled:
        </p>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <h4 className="font-semibold text-green-800 mb-3">Essential Functions</h4>
          <ul className="text-green-700 mb-0">
            <li><strong>Session Management:</strong> Keeping you logged in during your visit</li>
            <li><strong>Shopping Cart:</strong> Remembering items in your cart</li>
            <li><strong>Security:</strong> Protecting against fraudulent activity</li>
            <li><strong>Load Balancing:</strong> Ensuring optimal website performance</li>
            <li><strong>Cookie Consent:</strong> Remembering your cookie preferences</li>
          </ul>
        </div>

        <h3>Functional Cookies</h3>
        <p>
          These cookies enhance your user experience by remembering your preferences:
        </p>
        <ul>
          <li><strong>Language Preferences:</strong> Your selected language and regional settings</li>
          <li><strong>Display Settings:</strong> Font size, color themes, and layout preferences</li>
          <li><strong>Location Services:</strong> Your preferred shipping location</li>
          <li><strong>Previous Searches:</strong> Recently viewed products and search history</li>
          <li><strong>Form Data:</strong> Auto-filling contact and shipping information</li>
        </ul>

        <h3>Analytics Cookies</h3>
        <p>
          We use analytics cookies to understand how visitors interact with our website:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Collected</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Retention</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Google Analytics</td>
                <td className="px-6 py-4 text-sm text-gray-500">Website usage analysis</td>
                <td className="px-6 py-4 text-sm text-gray-500">Page views, session duration, bounce rate</td>
                <td className="px-6 py-4 text-sm text-gray-500">26 months</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Hotjar</td>
                <td className="px-6 py-4 text-sm text-gray-500">User behavior analysis</td>
                <td className="px-6 py-4 text-sm text-gray-500">Click patterns, scroll behavior</td>
                <td className="px-6 py-4 text-sm text-gray-500">12 months</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Internal Analytics</td>
                <td className="px-6 py-4 text-sm text-gray-500">Performance optimization</td>
                <td className="px-6 py-4 text-sm text-gray-500">Load times, error rates</td>
                <td className="px-6 py-4 text-sm text-gray-500">24 months</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Marketing Cookies</h3>
        <p>
          These cookies help us deliver relevant advertisements and measure campaign effectiveness:
        </p>
        <ul>
          <li><strong>Retargeting:</strong> Showing relevant ads on other websites</li>
          <li><strong>Conversion Tracking:</strong> Measuring advertising effectiveness</li>
          <li><strong>Personalization:</strong> Customizing content based on your interests</li>
          <li><strong>Social Media:</strong> Enabling social sharing and integration</li>
          <li><strong>Email Marketing:</strong> Tracking email campaign performance</li>
        </ul>

        <h2>Third-Party Cookies</h2>
        
        <h3>External Services</h3>
        <p>
          We work with trusted third-party services that may set their own cookies:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h4 className="font-semibold text-purple-800 mb-3">Payment Services</h4>
            <ul className="text-purple-700 mb-0">
              <li><strong>Stripe:</strong> Payment processing and fraud prevention</li>
              <li><strong>PayPal:</strong> Alternative payment options</li>
              <li><strong>Apple Pay:</strong> Mobile payment integration</li>
              <li><strong>Google Pay:</strong> Digital wallet services</li>
            </ul>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <h4 className="font-semibold text-amber-800 mb-3">Social Media & Communication</h4>
            <ul className="text-amber-700 mb-0">
              <li><strong>Facebook Pixel:</strong> Social media advertising</li>
              <li><strong>Instagram Integration:</strong> Social content embedding</li>
              <li><strong>YouTube:</strong> Video content embedding</li>
              <li><strong>Live Chat:</strong> Customer support widget</li>
            </ul>
          </div>
        </div>

        <h3>Advertising Partners</h3>
        <p>
          We work with advertising partners who may use cookies to deliver targeted ads:
        </p>
        <ul>
          <li><strong>Google Ads:</strong> Search and display advertising</li>
          <li><strong>Facebook Ads:</strong> Social media advertising campaigns</li>
          <li><strong>Microsoft Advertising:</strong> Bing search advertising</li>
          <li><strong>Criteo:</strong> Personalized retargeting campaigns</li>
        </ul>

        <h2>Cookie Management</h2>
        
        <h3>Cookie Consent</h3>
        <p>
          When you first visit our website, we'll ask for your consent to use non-essential cookies. You can:
        </p>
        <ul>
          <li>Accept all cookies for the full website experience</li>
          <li>Customize your preferences by cookie category</li>
          <li>Reject non-essential cookies (essential cookies will still be used)</li>
          <li>Change your preferences at any time through our cookie settings</li>
        </ul>

        <h3>Browser Controls</h3>
        <p>
          You can control cookies through your browser settings:
        </p>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Browser Cookie Settings</h4>
          <ul className="mb-0">
            <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</li>
            <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
            <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
            <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
            <li><strong>Mobile Browsers:</strong> Settings → Privacy → Cookies (varies by browser)</li>
          </ul>
        </div>

        <h3>Opting Out of Tracking</h3>
        <p>
          You can opt out of specific tracking services:
        </p>
        <ul>
          <li><strong>Google Analytics:</strong> <a href="https://tools.google.com/dlpage/gaoptout" className="text-blue-600 hover:text-blue-800">Google Analytics Opt-out Browser Add-on</a></li>
          <li><strong>Facebook Pixel:</strong> Facebook Ad Preferences settings</li>
          <li><strong>Do Not Track:</strong> Enable in your browser settings (we honor this signal)</li>
          <li><strong>Industry Opt-outs:</strong> <a href="http://optout.aboutads.info/" className="text-blue-600 hover:text-blue-800">Digital Advertising Alliance</a></li>
        </ul>

        <h2>Cookie Lifespan</h2>
        
        <h3>Session vs. Persistent Cookies</h3>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cookie Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lifespan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Session Cookies</td>
                <td className="px-6 py-4 text-sm text-gray-500">Until browser closes</td>
                <td className="px-6 py-4 text-sm text-gray-500">Shopping cart, login session</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Short-term Persistent</td>
                <td className="px-6 py-4 text-sm text-gray-500">1-30 days</td>
                <td className="px-6 py-4 text-sm text-gray-500">Preferences, recent searches</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Long-term Persistent</td>
                <td className="px-6 py-4 text-sm text-gray-500">1-24 months</td>
                <td className="px-6 py-4 text-sm text-gray-500">Analytics, marketing campaigns</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Specific Cookie Details</h2>
        
        <h3>Essential Cookies</h3>
        <div className="bg-green-50 rounded-lg p-6 mb-6">
          <h4 className="font-semibold text-green-800 mb-3">Required Cookies</h4>
          <ul className="text-green-700 mb-0">
            <li><strong>PHPSESSID:</strong> Session identifier (expires when browser closes)</li>
            <li><strong>csrf_token:</strong> Security token to prevent cross-site request forgery</li>
            <li><strong>cart_id:</strong> Shopping cart identification (7 days)</li>
            <li><strong>cookie_consent:</strong> Your cookie preference settings (1 year)</li>
            <li><strong>site_currency:</strong> Selected currency preference (30 days)</li>
          </ul>
        </div>

        <h3>Analytics Cookies</h3>
        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <h4 className="font-semibold text-blue-800 mb-3">Analytics Tracking</h4>
          <ul className="text-blue-700 mb-0">
            <li><strong>_ga:</strong> Google Analytics user identification (2 years)</li>
            <li><strong>_gid:</strong> Google Analytics session identification (24 hours)</li>
            <li><strong>_hjid:</strong> Hotjar user identification (1 year)</li>
            <li><strong>_hjSessionUser:</strong> Hotjar session data (1 year)</li>
            <li><strong>rr_analytics:</strong> Internal analytics tracking (2 years)</li>
          </ul>
        </div>

        <h3>Marketing Cookies</h3>
        <div className="bg-purple-50 rounded-lg p-6 mb-6">
          <h4 className="font-semibold text-purple-800 mb-3">Advertising Tracking</h4>
          <ul className="text-purple-700 mb-0">
            <li><strong>_fbp:</strong> Facebook Pixel browser identification (3 months)</li>
            <li><strong>_gcl_au:</strong> Google Ads conversion tracking (3 months)</li>
            <li><strong>rr_campaign:</strong> Campaign source tracking (30 days)</li>
            <li><strong>utm_source:</strong> Traffic source identification (30 days)</li>
            <li><strong>retargeting_id:</strong> Personalized advertising (1 year)</li>
          </ul>
        </div>

        <h2>Impact of Disabling Cookies</h2>
        
        <h3>Essential Cookies</h3>
        <p>
          Disabling essential cookies will affect website functionality:
        </p>
        <ul>
          <li>You may not be able to log into your account</li>
          <li>Shopping cart will not work properly</li>
          <li>Security features may be compromised</li>
          <li>Some pages may not load correctly</li>
        </ul>

        <h3>Functional Cookies</h3>
        <p>
          Disabling functional cookies will impact your user experience:
        </p>
        <ul>
          <li>Preferences will not be remembered between visits</li>
          <li>You'll need to re-enter information repeatedly</li>
          <li>Language and region settings will reset</li>
          <li>Recently viewed products won't be saved</li>
        </ul>

        <h3>Analytics Cookies</h3>
        <p>
          Disabling analytics cookies affects our ability to improve the website:
        </p>
        <ul>
          <li>We can't measure website performance</li>
          <li>User experience improvements are limited</li>
          <li>Popular content identification is reduced</li>
          <li>Technical issues may go undetected longer</li>
        </ul>

        <h3>Marketing Cookies</h3>
        <p>
          Disabling marketing cookies affects advertising relevance:
        </p>
        <ul>
          <li>Ads may be less relevant to your interests</li>
          <li>You may see duplicate advertisements</li>
          <li>Special offers may not be personalized</li>
          <li>Social media integration may be limited</li>
        </ul>

        <h2>International Cookie Laws</h2>
        
        <h3>GDPR Compliance (EU)</h3>
        <p>
          For European Union visitors, we comply with GDPR requirements:
        </p>
        <ul>
          <li>Clear consent for non-essential cookies</li>
          <li>Easy withdrawal of consent</li>
          <li>Detailed information about cookie purposes</li>
          <li>Data minimization principles</li>
          <li>Right to object to processing</li>
        </ul>

        <h3>CCPA Compliance (California)</h3>
        <p>
          For California residents, we provide additional rights:
        </p>
        <ul>
          <li>Right to know what data is collected</li>
          <li>Right to delete personal information</li>
          <li>Right to opt-out of sale of personal information</li>
          <li>Non-discrimination for exercising rights</li>
        </ul>

        <h2>Updates to Cookie Policy</h2>
        
        <h3>Policy Changes</h3>
        <p>
          We may update this cookie policy to reflect:
        </p>
        <ul>
          <li>Changes in cookie usage</li>
          <li>New third-party services</li>
          <li>Legal requirement updates</li>
          <li>Technology improvements</li>
          <li>User feedback and requests</li>
        </ul>

        <h3>Notification of Changes</h3>
        <p>
          When we update this policy, we will:
        </p>
        <ul>
          <li>Update the "Last modified" date</li>
          <li>Display a notification banner for significant changes</li>
          <li>Email registered users about material changes</li>
          <li>Require new consent for new cookie types</li>
        </ul>

        <h2>Contact Information</h2>
        
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-2">Cookie Questions</h3>
          <p className="mb-3">
            If you have questions about our use of cookies or want to exercise your rights:
          </p>
          <p className="mb-1"><strong>Privacy Team:</strong> privacy@rareregalia.com</p>
          <p className="mb-1"><strong>Data Protection Officer:</strong> dpo@rareregalia.com</p>
          <p className="mb-1"><strong>Phone:</strong> +1 (555) 123-4567</p>
          <p className="mb-1"><strong>Address:</strong> Rare Regalia Privacy Team, 123 Luxury Lane, Suite 100, New York, NY 10001</p>
          <p className="mb-0"><strong>Response Time:</strong> We respond to cookie inquiries within 5 business days</p>
        </div>

        <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Manage Your Cookie Preferences</h3>
          <p className="text-blue-700 mb-3">
            You can update your cookie preferences at any time by using our cookie management tool.
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Manage Cookie Settings
          </button>
        </div>
      </div>
    </div>
  );
}