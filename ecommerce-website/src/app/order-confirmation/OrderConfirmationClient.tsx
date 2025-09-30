'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircleIcon, PrinterIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

export function OrderConfirmationClient() {
  const router = useRouter();
  const [orderNumber] = useState(() => 
    'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase()
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      {/* Success Icon */}
      <div className="mb-8">
        <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
        <p className="text-lg text-gray-600">
          Thank you for your purchase. We've received your order and will process it shortly.
        </p>
      </div>

      {/* Order Details */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Details</h2>
        <div className="space-y-2 text-left">
          <div className="flex justify-between">
            <span className="text-gray-600">Order Number:</span>
            <span className="font-semibold text-gray-900">{orderNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Order Date:</span>
            <span className="text-gray-900">{new Date().toLocaleDateString('en-IN')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Estimated Delivery:</span>
            <span className="text-gray-900">
              {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN')}
            </span>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">What happens next?</h3>
        <div className="text-left space-y-2 text-blue-800">
          <p>✓ You'll receive an order confirmation email shortly</p>
          <p>✓ We'll prepare your jewelry with care and attention</p>
          <p>✓ You'll get a tracking number when your order ships</p>
          <p>✓ Your beautiful jewelry will be delivered to your address</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => router.push('/products')}
          className="btn-secondary flex items-center justify-center"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Continue Shopping
        </button>
        
        <button
          onClick={() => window.print()}
          className="btn-primary flex items-center justify-center"
        >
          <PrinterIcon className="h-5 w-5 mr-2" />
          Print Order Details
        </button>
      </div>

      {/* Contact Info */}
      <div className="mt-12 text-sm text-gray-600">
        <p>
          Have questions about your order? 
          <br />
          Contact us at <a href="mailto:support@rareregalia.com" className="text-primary-600 hover:text-primary-700">support@rareregalia.com</a> or call us at +91-XXXX-XXXX-XX
        </p>
      </div>
    </div>
  );
}