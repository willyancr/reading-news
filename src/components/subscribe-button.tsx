'use client';

import { getStripeJs } from '@/app/services/stripe-js';
import { signIn, useSession } from 'next-auth/react';

interface SubscribeButtonProps {
  priceId: string;
}

export default function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const { data: session } = useSession();

  async function handleClickSubscribe() {
    if (!session) {
      signIn('github');
      return;
    }

    try {
      const response = await fetch('/api/subscribe', { method: 'POST' });

      const data = await response.json();

      const stripe = await getStripeJs();

      await stripe?.redirectToCheckout({ sessionId: data.sessionId });
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        if (err.message.includes('404')) {
          alert('A rota da API não foi encontrada.');
        } else if (err.message.includes('Network Error')) {
          alert('Erro de rede. Verifique sua conexão.');
        } else {
          alert('Ocorreu um erro. Tente novamente mais tarde.');
        }
      }
    }
  }

  return (
    <button
      onClick={handleClickSubscribe}
      className="bg-yellow-500 text-black w-48 font-bold py-2 rounded-full hover:brightness-75 transition-all"
    >
      Subscribe now
    </button>
  );
}
