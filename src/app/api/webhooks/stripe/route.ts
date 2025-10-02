/**
 * Stripe Webhook Handler
 * Handles Stripe events like payment success, failure, etc.
 */

import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    console.error('Webhook signature verification failed:', error.message);
    return NextResponse.json(
      { error: `Webhook Error: ${error.message}` },
      { status: 400 }
    );
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('✅ Payment succeeded:', paymentIntent.id);
        
        // TODO: Save order to database
        // TODO: Send confirmation email
        // TODO: Update inventory
        
        await handlePaymentSuccess(paymentIntent);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('❌ Payment failed:', paymentIntent.id);
        
        await handlePaymentFailure(paymentIntent);
        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge;
        console.log('🔄 Refund processed:', charge.id);
        
        await handleRefund(charge);
        break;
      }

      case 'payment_intent.created': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('🆕 Payment intent created:', paymentIntent.id);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

/**
 * Handle successful payment
 */
async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  const orderId = paymentIntent.metadata.orderId;
  const customerEmail = paymentIntent.metadata.customerEmail;
  
  console.log('Processing successful order:', {
    orderId,
    customerEmail,
    amount: paymentIntent.amount,
    currency: paymentIntent.currency,
  });

  // TODO: Implement your order processing logic here:
  // 1. Save order to database with status 'paid'
  // 2. Send confirmation email to customer
  // 3. Update product inventory
  // 4. Notify admin/warehouse
  
  // Example structure for order data:
  const orderData = {
    orderId,
    customerEmail,
    paymentIntentId: paymentIntent.id,
    amount: paymentIntent.amount,
    currency: paymentIntent.currency,
    status: 'paid',
    createdAt: new Date().toISOString(),
    metadata: paymentIntent.metadata,
  };

  // You can save to a file, database, or external service
  // For now, just logging
  console.log('Order data to save:', orderData);
}

/**
 * Handle payment failure
 */
async function handlePaymentFailure(paymentIntent: Stripe.PaymentIntent) {
  const orderId = paymentIntent.metadata.orderId;
  
  console.log('Processing failed payment:', {
    orderId,
    error: paymentIntent.last_payment_error?.message,
  });

  // TODO: Implement your failure handling logic:
  // 1. Log the failure
  // 2. Send notification email to customer
  // 3. Update order status to 'failed'
}

/**
 * Handle refund
 */
async function handleRefund(charge: Stripe.Charge) {
  console.log('Processing refund:', {
    chargeId: charge.id,
    amount: charge.amount_refunded,
  });

  // TODO: Implement your refund logic:
  // 1. Update order status to 'refunded'
  // 2. Restore inventory
  // 3. Send refund confirmation email
}
