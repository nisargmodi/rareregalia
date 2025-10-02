/**
 * Create Payment Intent API Route
 * Handles the creation of Stripe PaymentIntent for checkout
 */

import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, email, metadata } = body;

    // Validate request
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Invalid cart items' },
        { status: 400 }
      );
    }

    // Calculate total
    const subtotal = items.reduce((total: number, item: any) => {
      return total + (item.product.priceINR * item.quantity);
    }, 0);

    const shipping = subtotal > 50000 ? 0 : 1000; // Free shipping over ₹50,000
    const tax = Math.round(subtotal * 0.18); // 18% GST
    const total = subtotal + shipping + tax;

    // Create PaymentIntent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total, // Amount in paise (smallest currency unit for INR)
      currency: 'inr',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        orderId: `ORDER-${Date.now()}`,
        customerEmail: email || 'guest@rareregalia.com',
        itemCount: items.length.toString(),
        subtotal: subtotal.toString(),
        tax: tax.toString(),
        shipping: shipping.toString(),
        ...metadata,
      },
      description: `Rare Regalia Order - ${items.length} item(s)`,
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error: any) {
    console.error('Payment Intent Creation Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}
