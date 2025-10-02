# Stripe Integration Setup Guide

## ✅ What's Already Done

The Stripe payment integration has been implemented with the following components:

- ✅ Stripe packages installed (`stripe`, `@stripe/stripe-js`, `@stripe/react-stripe-js`)
- ✅ Stripe utility functions (`src/lib/stripe.ts`)
- ✅ Payment Intent API route (`src/app/api/create-payment-intent/route.ts`)
- ✅ Webhook handler (`src/app/api/webhooks/stripe/route.ts`)
- ✅ Checkout page with Stripe Payment Element (`src/app/checkout/CheckoutPageClient.tsx`)
- ✅ Order confirmation page (`src/app/order-confirmation/page.tsx`)
- ✅ TypeScript types updated with checkout and order interfaces

## 🔧 What You Need to Do Manually

### Step 1: Create Stripe Account (10 minutes)

1. **Go to Stripe**: https://dashboard.stripe.com/register
2. **Sign up** with your email and create a password
3. **Verify your email** address
4. **Answer business questions** (you can skip some for now)
5. **Access Test Mode**: You'll automatically be in Test Mode (no business verification required)

### Step 2: Get Your API Keys (2 minutes)

1. **Go to**: https://dashboard.stripe.com/test/apikeys
2. **Find your keys**:
   - **Publishable key**: Starts with `pk_test_...` (safe for frontend)
   - **Secret key**: Click "Reveal test key" - starts with `sk_test_...` (keep secret!)

### Step 3: Add Keys to Your Project (3 minutes)

#### For Local Development:

1. **Create `.env.local` file** in your project root (`d:\rareregalia\.env.local`)
2. **Add your keys**:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

3. **Save the file**

#### For Vercel Deployment:

1. **Go to your Vercel project**: https://vercel.com/your-username/rareregalia
2. **Click "Settings"** → **"Environment Variables"**
3. **Add these 3 variables**:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_test_xxxxx` | All (Production, Preview, Development) |
| `STRIPE_SECRET_KEY` | `sk_test_xxxxx` | All (Production, Preview, Development) |
| `STRIPE_WEBHOOK_SECRET` | `whsec_xxxxx` (get this in Step 4) | All (Production, Preview, Development) |

4. **Redeploy** your application after adding environment variables

### Step 4: Set Up Webhooks (5 minutes)

Webhooks allow Stripe to notify your server when payments succeed or fail.

#### For Local Testing:

1. **Install Stripe CLI**: https://stripe.com/docs/stripe-cli
   
   **Windows (PowerShell as Admin)**:
   ```powershell
   winget install stripe.cli
   ```

2. **Login to Stripe CLI**:
   ```powershell
   stripe login
   ```

3. **Forward webhooks to your local server**:
   ```powershell
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

4. **Copy the webhook secret** (starts with `whsec_`) and add it to `.env.local`

5. **Test a payment** while Stripe CLI is running to see webhook events

#### For Production (Vercel):

1. **Go to**: https://dashboard.stripe.com/test/webhooks
2. **Click "Add endpoint"**
3. **Endpoint URL**: `https://your-vercel-domain.vercel.app/api/webhooks/stripe`
   - Example: `https://rareregalia.vercel.app/api/webhooks/stripe`
4. **Select events to listen to**:
   - ✅ `payment_intent.succeeded`
   - ✅ `payment_intent.payment_failed`
   - ✅ `charge.refunded`
5. **Click "Add endpoint"**
6. **Reveal signing secret** (starts with `whsec_`) and add it to Vercel environment variables
7. **Redeploy** your Vercel app

### Step 5: Test the Integration (10 minutes)

#### Test Cards (Use these in Test Mode):

| Card Number | Scenario | CVC | Expiry |
|-------------|----------|-----|--------|
| `4242 4242 4242 4242` | ✅ Successful payment | Any 3 digits | Any future date |
| `4000 0025 0000 3155` | 🔐 Requires 3D Secure authentication | Any 3 digits | Any future date |
| `4000 0000 0000 0002` | ❌ Card declined (generic) | Any 3 digits | Any future date |
| `4000 0000 0000 9995` | ❌ Insufficient funds | Any 3 digits | Any future date |

#### Testing Steps:

1. **Start your development server**:
   ```powershell
   npm run dev
   ```

2. **Add items to cart** and go to checkout

3. **Fill in shipping information**:
   - Use real-looking email (e.g., `test@example.com`)
   - Fill in all required fields

4. **Enter test card**:
   - Card Number: `4242 4242 4242 4242`
   - Expiry: Any future date (e.g., `12/25`)
   - CVC: Any 3 digits (e.g., `123`)

5. **Complete payment** and verify:
   - ✅ Payment succeeds
   - ✅ Redirected to order confirmation page
   - ✅ Cart is cleared
   - ✅ Webhook received (check Stripe CLI output)

6. **Check Stripe Dashboard**:
   - Go to: https://dashboard.stripe.com/test/payments
   - You should see your test payment

### Step 6: Verify Webhooks are Working

1. **While Stripe CLI is running**, make a test payment
2. **Check your terminal** - you should see webhook events like:
   ```
   [200] POST /api/webhooks/stripe [evt_xxxxxxxxxxxxx]
   ```
3. **Check your browser console** for logs from the webhook handler
4. **Go to Stripe Dashboard** → **Developers** → **Webhooks** to see delivery attempts

### Step 7: Go Live (When Ready)

⚠️ **Only do this when you're ready to accept real payments!**

1. **Complete Stripe account activation**:
   - Business details
   - Bank account information
   - Identity verification

2. **Get live API keys**:
   - Go to: https://dashboard.stripe.com/apikeys
   - Copy your **Live** keys (start with `pk_live_` and `sk_live_`)

3. **Update environment variables**:
   - Replace test keys with live keys in Vercel
   - Update `STRIPE_WEBHOOK_SECRET` with live webhook secret

4. **Set up live webhook endpoint**:
   - Go to: https://dashboard.stripe.com/webhooks (not /test/)
   - Add endpoint: `https://your-domain.com/api/webhooks/stripe`
   - Select same events as test mode

5. **Test with real card** (small amount first!)

6. **Monitor payments** in Stripe Dashboard

## 📋 Quick Reference

### Test Card Numbers
```
Success: 4242 4242 4242 4242
3D Secure: 4000 0025 0000 3155
Declined: 4000 0000 0000 0002
```

### API Routes
- **Create Payment**: `POST /api/create-payment-intent`
- **Webhook**: `POST /api/webhooks/stripe`

### Stripe Dashboard Links
- **Test Payments**: https://dashboard.stripe.com/test/payments
- **Test API Keys**: https://dashboard.stripe.com/test/apikeys
- **Test Webhooks**: https://dashboard.stripe.com/test/webhooks
- **Live Dashboard**: https://dashboard.stripe.com (when ready)

### Environment Variables Required
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

## 🐛 Troubleshooting

### "Payment failed" error
- ✅ Check API keys are correct in `.env.local`
- ✅ Restart dev server after adding environment variables
- ✅ Check browser console for errors
- ✅ Verify you're using test cards in test mode

### Webhook not receiving events
- ✅ Make sure Stripe CLI is running (`stripe listen --forward-to localhost:3000/api/webhooks/stripe`)
- ✅ Check webhook secret in `.env.local` matches Stripe CLI output
- ✅ Restart dev server after updating webhook secret
- ✅ Check Stripe Dashboard → Webhooks for delivery attempts

### "Stripe not loaded" error
- ✅ Check `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is set
- ✅ Restart dev server
- ✅ Clear browser cache and reload

### TypeScript errors
- ✅ Run `npm install` to ensure all packages are installed
- ✅ Check that `@stripe/stripe-js` and `@stripe/react-stripe-js` are installed
- ✅ Restart VS Code TypeScript server

## 📚 Additional Resources

- **Stripe Documentation**: https://stripe.com/docs
- **Stripe Testing**: https://stripe.com/docs/testing
- **Stripe Webhooks**: https://stripe.com/docs/webhooks
- **Stripe Dashboard**: https://dashboard.stripe.com
- **Stripe Support**: https://support.stripe.com

## 🎉 Success Checklist

Before considering the integration complete, verify:

- [ ] Stripe account created and verified
- [ ] API keys added to `.env.local`
- [ ] Environment variables added to Vercel
- [ ] Webhook endpoint configured (local + production)
- [ ] Test payment successful with `4242 4242 4242 4242`
- [ ] Webhook received and logged
- [ ] Order confirmation page displays correctly
- [ ] Cart clears after successful payment
- [ ] Payment visible in Stripe Dashboard

---

## Need Help?

If you encounter any issues:

1. Check the troubleshooting section above
2. Review Stripe documentation: https://stripe.com/docs
3. Check Stripe Dashboard for error messages
4. Review browser console and server logs
5. Contact Stripe support if needed

Good luck with your payment integration! 🚀
