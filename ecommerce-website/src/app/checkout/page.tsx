import { Metadata } from 'next';
import { CheckoutPageClient } from './CheckoutPageClient';

export const metadata: Metadata = {
  title: 'Checkout | Rare Regalia',
  description: 'Complete your jewelry purchase with secure checkout.',
};

export default function CheckoutPage() {
  return <CheckoutPageClient />;
}