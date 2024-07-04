import { stripe } from '@/app/services/stripe';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req: NextRequest) {
  const session = await getServerSession({ req, ...authOptions });
  if (!session) {
    return NextResponse.json(
      { error: 'Usuário não auenteticado' },
      { status: 401 },
    );
  }
  const userEmail = session.user?.email;
  if (!userEmail) {
    return NextResponse.json(
      { error: 'Email do usuário não encontrado' },
      { status: 400 },
    );
  }
  // Crie um novo customer no Stripe usando o email do usuário logado
  const stripeCustomer = await stripe.customers.create({
    email: userEmail,
  });

  const stripeCheckoutSession = await stripe.checkout.sessions.create({
    customer: stripeCustomer.id,
    payment_method_types: ['card'],
    billing_address_collection: 'required',
    line_items: [{ price: 'price_1PVX1ARrH3ggrWH5BujbYNY2', quantity: 1 }],
    mode: 'subscription',
    allow_promotion_codes: true,
    success_url: process.env.STRIPE_SUCCESS_URL,
    cancel_url: process.env.STRIPE_CANCEL_URL,
  });
  return NextResponse.json({ sessionId: stripeCheckoutSession.id });
}
