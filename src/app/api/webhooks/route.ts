import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/app/services/stripe';
import { Readable } from 'stream';
import Stripe from 'stripe';
import { saveSubscription } from '../_lib/manageSubscription';

const endpointSecret = process.env.STRIPE_WEBHOOKS_SECRET as string;

export const config = {
  api: {
    bodyParser: false,
  },
};

async function buffer(readable: Readable) {
  const chunks = [];

  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }

  return Buffer.concat(chunks);
}

const relevantEvents = new Set(['checkout.session.completed']);

export async function POST(req: NextRequest) {
  try {
    const buf = await buffer(req.body as unknown as Readable);
    const secret = req.headers.get('stripe-signature') as string;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(buf, secret, endpointSecret);
    } catch (err: any) {
      return NextResponse.json(
        { error: `Webhook Error: ${err.message}` },
        { status: 400 },
      );
    }

    const { type } = event;

    if (relevantEvents.has(type)) {
      switch (type) {
        case 'checkout.session.completed':
          const checkoutSession = event.data.object as Stripe.Checkout.Session;

          await saveSubscription(
            checkoutSession.subscription?.toString() || '',
            checkoutSession.customer?.toString() || '',
          );

          break;
        default:
          console.log(`🤷‍♀️ Unhandled event type: ${type}`);
          break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
