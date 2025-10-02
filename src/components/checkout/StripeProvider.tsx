/**
 * Stripe Elements Provider Component
 * Wraps the checkout page with Stripe Elements context
 */

'use client';

import { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { getStripe } from '@/lib/stripe';
import type { StripeElementsOptions } from '@stripe/stripe-js';

interface StripeProviderProps {
  children: React.ReactNode;
  clientSecret: string | null;
}

export function StripeProvider({ children, clientSecret }: StripeProviderProps) {
  const [stripePromise] = useState(() => getStripe());

  if (!clientSecret) {
    return <>{children}</>;
  }

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#7c3aed', // Purple-600 to match your brand
        colorBackground: '#ffffff',
        colorText: '#1f2937',
        colorDanger: '#ef4444',
        fontFamily: 'ui-sans-serif, system-ui, sans-serif',
        spacingUnit: '4px',
        borderRadius: '8px',
      },
      rules: {
        '.Input': {
          border: '1px solid #d1d5db',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        },
        '.Input:focus': {
          border: '1px solid #7c3aed',
          boxShadow: '0 0 0 3px rgba(124, 58, 237, 0.1)',
        },
        '.Label': {
          fontWeight: '500',
          fontSize: '14px',
        },
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
}
