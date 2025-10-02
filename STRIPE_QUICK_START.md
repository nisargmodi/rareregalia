# ⚡ Stripe Quick Start Checklist

Follow these steps in order to activate Stripe payments:

## 📋 Setup Checklist

### ☐ Step 1: Create Stripe Account (10 min)
- [ ] Go to https://dashboard.stripe.com/register
- [ ] Sign up with email and password
- [ ] Verify your email
- [ ] Skip business questions (can complete later)
- [ ] You're now in Test Mode!

### ☐ Step 2: Get API Keys (2 min)
- [ ] Go to https://dashboard.stripe.com/test/apikeys
- [ ] Copy **Publishable key** (starts with `pk_test_`)
- [ ] Click "Reveal test key" and copy **Secret key** (starts with `sk_test_`)

### ☐ Step 3: Create .env.local File (3 min)
- [ ] Create file: `d:\rareregalia\.env.local`
- [ ] Add this content (replace with your keys):
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_get_this_in_step4
```
- [ ] Save the file
- [ ] **Important**: Never commit this file to Git!

### ☐ Step 4: Set Up Webhooks Locally (5 min)
- [ ] Install Stripe CLI:
  ```powershell
  winget install stripe.cli
  ```
- [ ] Login to Stripe:
  ```powershell
  stripe login
  ```
- [ ] Start webhook forwarding:
  ```powershell
  stripe listen --forward-to localhost:3000/api/webhooks/stripe
  ```
- [ ] Copy the webhook secret (starts with `whsec_`)
- [ ] Add it to `.env.local` file
- [ ] **Keep this terminal running while testing**

### ☐ Step 5: Test Locally (10 min)
- [ ] Start dev server (in new terminal):
  ```powershell
  npm run dev
  ```
- [ ] Open http://localhost:3000
- [ ] Add a product to cart
- [ ] Go to checkout
- [ ] Fill in shipping info
- [ ] Use test card: `4242 4242 4242 4242`
- [ ] Expiry: `12/25`, CVC: `123`
- [ ] Click "Pay Now"
- [ ] Verify payment succeeds
- [ ] Check Stripe CLI terminal for webhook event
- [ ] Check Stripe Dashboard: https://dashboard.stripe.com/test/payments

### ☐ Step 6: Deploy to Vercel (5 min)
- [ ] Go to https://vercel.com
- [ ] Open your project
- [ ] Go to Settings → Environment Variables
- [ ] Add these 3 variables:
  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` = `pk_test_your_key`
  - `STRIPE_SECRET_KEY` = `sk_test_your_key`
  - `STRIPE_WEBHOOK_SECRET` = (get from production webhook in step 7)
- [ ] Select "All" environments (Production, Preview, Development)

### ☐ Step 7: Set Up Production Webhook (5 min)
- [ ] Go to https://dashboard.stripe.com/test/webhooks
- [ ] Click "Add endpoint"
- [ ] Endpoint URL: `https://your-domain.vercel.app/api/webhooks/stripe`
- [ ] Select these events:
  - [ ] `payment_intent.succeeded`
  - [ ] `payment_intent.payment_failed`
  - [ ] `charge.refunded`
- [ ] Click "Add endpoint"
- [ ] Click "Reveal" on signing secret (starts with `whsec_`)
- [ ] Update `STRIPE_WEBHOOK_SECRET` in Vercel
- [ ] Redeploy your app

### ☐ Step 8: Test on Production (5 min)
- [ ] Visit your Vercel deployment
- [ ] Add items to cart
- [ ] Complete checkout with test card `4242 4242 4242 4242`
- [ ] Verify payment succeeds
- [ ] Check Stripe Dashboard for payment
- [ ] Check Vercel logs for webhook delivery

---

## ✅ Success Criteria

You'll know it's working when:
- ✅ Payment succeeds with test card
- ✅ You're redirected to order confirmation page
- ✅ Cart is cleared after payment
- ✅ Payment appears in Stripe Dashboard
- ✅ Webhook event received (check Stripe CLI or Dashboard)

---

## 🐛 Common Issues

**"Stripe not loaded" error**
→ Check `.env.local` has `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
→ Restart dev server: `npm run dev`

**"Payment failed" error**
→ Verify API keys are correct
→ Check you're using test card: `4242 4242 4242 4242`

**Webhook not received**
→ Make sure Stripe CLI is running: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
→ Check webhook secret in `.env.local` matches CLI output

---

## 📚 Resources

- **Full Setup Guide**: See `STRIPE_SETUP.md`
- **Implementation Summary**: See `STRIPE_IMPLEMENTATION_COMPLETE.md`
- **Test Cards**: https://stripe.com/docs/testing
- **Stripe Dashboard**: https://dashboard.stripe.com
- **Stripe Docs**: https://stripe.com/docs

---

## 🎯 Time Estimates

- **Local setup**: 20-25 minutes
- **Vercel setup**: 10 minutes
- **Total time**: ~35 minutes

---

**Good luck! 🚀**
