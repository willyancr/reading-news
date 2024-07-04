import { loadStripe } from '@stripe/stripe-js';

/**
 * Retorna a instância do Stripe.js carregada com a chave pública do Stripe.
 * Se a chave pública não estiver definida, a chave padrão 'default-api-key' será usada.
 */
export async function getStripeJs() {
  // Carrega o Stripe.js com a chave pública do Stripe
  const stripeJs = await loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || 'default-api-key',
  );

  return stripeJs;
}
