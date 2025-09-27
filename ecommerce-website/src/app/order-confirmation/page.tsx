import { Metadata } from 'next';
import { OrderConfirmationClient } from './OrderConfirmationClient';

export const metadata: Metadata = {
  title: 'Order Confirmation | Rare Regalia',
  description: 'Thank you for your jewelry purchase.',
};

export default function OrderConfirmationPage() {
  return <OrderConfirmationClient />;
}