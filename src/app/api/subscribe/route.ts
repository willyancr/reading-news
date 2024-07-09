import { stripe } from '@/app/services/stripe';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import { fauna } from '@/app/services/fauna';
import { query as q } from 'faunadb';

type User = {
  ref: {
    id: string;
  };
  data: {
    stripe_customer_id: string;
  };
};

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

  // Consulta o usuário no banco de dados FaunaDB pelo seu email
  const user = await fauna.query<User>(
    q.Get(q.Match(q.Index('user_by_email'), q.Casefold(userEmail))),
  );

  // Busca o ID do cliente Stripe do usuário no banco de dados
  let customerId = user.data.stripe_customer_id;

  // Se o cliente não tiver um ID, cria um novo cliente no Stripe e salva o ID no banco de dados
  if (!customerId) {
    // Cria um novo cliente no Stripe com o email do usuário
    const stripeCustomer = await stripe.customers.create({
      email: userEmail,
    });

    // Atualiza o usuário no banco de dados com o ID do cliente Stripe
    await fauna.query(
      q.Update(q.Ref(q.Collection('users'), user.ref.id), {
        data: {
          stripe_customer_id: stripeCustomer.id,
        },
      }),
    );

    // Salva o ID do cliente Stripe para uso posterior
    customerId = stripeCustomer.id;
  }

  const stripeCheckoutSession = await stripe.checkout.sessions.create({
    customer: customerId,
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
