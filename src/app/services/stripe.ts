import Stripe from 'stripe';

const strileApiKey = process.env.STRIPE_API_KEY || 'default-api-key';

export const stripe = new Stripe(strileApiKey, {
  apiVersion: '2024-06-20',
  appInfo: {
    name: 'Reading.news',
    version: '1.0',
  },
});
