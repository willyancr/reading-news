import { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from '../services/stripe';
import { getSession } from 'next-auth/react';

const subscribe = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const session = await getSession({ req });
    const email = session?.user?.email ?? undefined;
    const stripeCustumer = await stripe.customers.create({
      email,
    });
    const stripeCheckoutSession = stripe.checkout.sessions.create({
      customer: stripeCustumer.id,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [
        { price: 'price_1PVX1ARrH3ggrWH5BujbYNY2' },
        { quantity: 1 },
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    });
    return res
      .status(200)
      .json({ sessionId: (await stripeCheckoutSession).id });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed');
  }
};

export default subscribe;
