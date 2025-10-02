'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  LockClosedIcon, 
  ShoppingBagIcon,
} from '@heroicons/react/24/outline';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/utils/productUtils';
import { StripeProvider } from '@/components/checkout/StripeProvider';
import toast from 'react-hot-toast';
import type { CheckoutFormData } from '@/types';

export function CheckoutPageClient() {
  const router = useRouter();
  const { items, getTotalPrice } = useCartStore();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push('/products');
      return;
    }

    // Create PaymentIntent as soon as the page loads
    const createPaymentIntent = async () => {
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items,
            email: '', // Will be collected in the form
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create payment intent');
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error('Error creating payment intent:', error);
        toast.error('Failed to initialize payment. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    createPaymentIntent();
  }, [items, router]);

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <ShoppingBagIcon className="h-16 w-16 mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">Add some items to your cart before checking out.</p>
        <button
          onClick={() => router.push('/products')}
          className="btn-primary"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Initializing secure checkout...</p>
      </div>
    );
  }

  const subtotal = getTotalPrice();
  const shipping = subtotal > 50000 ? 0 : 1000; // Free shipping over ₹50,000
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const total = subtotal + shipping + tax;

  return (
    <StripeProvider clientSecret={clientSecret}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="order-2 lg:order-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>
            <CheckoutForm />
          </div>

          {/* Order Summary */}
          <div className="order-1 lg:order-2">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.quantity}`} className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={item.product.primaryImage || '/images/placeholder.jpg'}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm">{item.product.name}</h3>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {formatPrice(item.product.priceINR * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Totals */}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">
                    {shipping === 0 ? 'Free' : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (GST 18%)</span>
                  <span className="text-gray-900">{formatPrice(tax)}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between text-lg font-semibold">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Security Notice */}
              <div className="mt-6 flex items-center text-sm text-gray-500">
                <LockClosedIcon className="h-4 w-4 mr-2" />
                Your payment information is secure and encrypted.
              </div>
            </div>
          </div>
        </div>
      </div>
    </StripeProvider>
  );
}

// Checkout Form Component with Stripe Payment Element
function CheckoutForm() {
  const router = useRouter();
  const { clearCart } = useCartStore();
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState<CheckoutFormData>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
  });

  const handleInputChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error('Payment system not ready. Please refresh the page.');
      return;
    }

    // Validate form
    if (!formData.email || !formData.firstName || !formData.lastName || !formData.address) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsProcessing(true);

    try {
      // Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/order-confirmation`,
          receipt_email: formData.email,
          shipping: {
            name: `${formData.firstName} ${formData.lastName}`,
            address: {
              line1: formData.address,
              city: formData.city,
              state: formData.state,
              postal_code: formData.postalCode,
              country: 'IN',
            },
          },
        },
        redirect: 'if_required',
      });

      if (error) {
        // Show error to customer
        toast.error(error.message || 'Payment failed. Please try again.');
        console.error('Payment error:', error);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Payment succeeded
        toast.success('Payment successful!');
        clearCart();
        router.push(`/order-confirmation?payment_intent=${paymentIntent.id}`);
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Contact Information */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="your@email.com"
            />
          </div>
        </div>
      </div>

      {/* Shipping Information */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name *
            </label>
            <input
              type="text"
              required
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name *
            </label>
            <input
              type="text"
              required
              value={formData.lastName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address *
            </label>
            <input
              type="text"
              required
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City *
            </label>
            <input
              type="text"
              required
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State
            </label>
            <input
              type="text"
              value={formData.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Postal Code *
            </label>
            <input
              type="text"
              required
              value={formData.postalCode}
              onChange={(e) => handleInputChange('postalCode', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <input
              type="text"
              value={formData.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50"
              disabled
            />
          </div>
        </div>
      </div>

      {/* Stripe Payment Element */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Payment Information
        </h2>
        <div className="bg-white border border-gray-300 rounded-lg p-4">
          <PaymentElement />
        </div>
        <p className="mt-2 text-xs text-gray-500">
          Powered by Stripe. Your payment information is secure and encrypted.
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isProcessing || !stripe || !elements}
        className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
      >
        {isProcessing ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Processing Payment...
          </>
        ) : (
          <>
            <LockClosedIcon className="h-5 w-5 mr-2" />
            Pay Now
          </>
        )}
      </button>
    </form>
  );
}
