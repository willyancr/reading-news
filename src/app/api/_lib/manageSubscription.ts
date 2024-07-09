import { fauna } from '@/app/services/fauna';
import { stripe } from '@/app/services/stripe';
import { query as q } from 'faunadb';

/**
 * Guarda a subscription no banco de dados FaunaDB.
 *
 * Recebe o ID da subscription e o ID do customer que a possui.
 * Busca o ref do usuário que possui a subscription no banco de dados FaunaDB
 * e cria um novo documento na coleção 'subscription' com os dados da subscription.
 * 
 */
export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
) {
  // Busca o ref do usuário que possui a subscription no banco de dados FaunaDB
  const userRef = await fauna.query(
    q.Select(
      'ref',
      q.Get(q.Match(q.Index('user_by_stripe_customer_id'), customerId)),
    ),
  );
  // Busca os dados da subscription no Stripe
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  // Cria um novo documento na coleção 'subscription' com os dados da subscription
  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
  };

  await fauna.query(
    q.Create(q.Collection('subscription'), {
      data: subscriptionData,
    }),
  );
}
